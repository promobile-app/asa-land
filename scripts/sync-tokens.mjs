/**
 * Pulls the live design tokens off a Promobile platform build and diffs them
 * against src/styles/tokens.css.
 *
 *   npm run sync-tokens
 *   npm run sync-tokens -- https://some-other-deployment.example
 *
 * It never writes: it prints what moved, so a human decides whether the
 * landing should follow. The landing lags the app by design — a colour that
 * changed mid-sprint in the product should not repaint marketing overnight.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ORIGIN =
  process.argv[2] ?? "https://promobile-ads-production.up.railway.app";

const here = dirname(fileURLToPath(import.meta.url));
const TOKENS_FILE = join(here, "..", "src", "styles", "tokens.css");

/** landing token -> platform token it was lifted from */
const MAP = {
  "--bg": "--ds-color-page-bg",
  "--surface": "--ds-color-card-bg",
  "--surface-2": "--neutral-background-subtle",
  "--line": "--ui-border-secondary-default",
  "--line-soft": "--ui-border-tertiary-default",
  "--brand": "--ds-color-brand",
  "--brand-hi": "--button-brand-primary-bg-hover",
  "--brand-soft": "--step-active-bg",
  "--tx": "--ui-text-primary-default",
  "--tx-2": "--ui-text-secondary-default",
  "--tx-3": "--ui-text-tertiary-default",
  "--tx-4": "--ui-text-caption-default",
  "--ok": "--ds-tone-success-fg",
  "--ok-bg": "--ds-tone-success-bg",
  "--warn": "--ds-tone-warning-fg",
  "--warn-bg": "--ds-tone-warning-bg",
  "--purple": "--ds-tone-03-fg",
  "--sky": "--ds-tone-01-fg",
  "--danger": "--ui-text-primary-error",
  "--r-sm": "--ds-radius-control-small",
  "--r-md": "--ds-radius-control-medium",
  "--r-lg": "--ds-radius-control-large",
  "--r-xl": "--ds-radius-control-extralarge",
  "--r-card": "--ds-radius-card",
  "--r-2xl": "--ds-radius-large",
  "--r-full": "--ds-radius-full",
};

const norm = (v) => v.trim().toLowerCase().replace(/\s+/g, " ");

function declarations(body) {
  const out = {};
  // strip comments first: a trailing /* ... */ after a semicolon would
  // otherwise glue itself to the front of the next declaration's name
  for (const decl of body.replace(/\/\*[\s\S]*?\*\//g, "").split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const name = decl.slice(0, i).trim();
    if (name.startsWith("--")) out[name] = norm(decl.slice(i + 1));
  }
  return out;
}

/**
 * The platform spreads its custom properties over several :root rules across
 * two stylesheets, so take every matching block and merge in source order.
 */
function parseAllBlocks(css, selectorRe) {
  let merged = null;
  const re = new RegExp(selectorRe.source, "g");
  let m;
  while ((m = re.exec(css))) {
    const open = css.indexOf("{", m.index + m[0].length - 1);
    if (open < 0) continue;
    const close = css.indexOf("}", open);
    if (close < 0) continue;
    merged = { ...(merged ?? {}), ...declarations(css.slice(open + 1, close)) };
  }
  return merged;
}

const ROOT_RE = /:root(?![\w-])[^{]*\{/;
/** Only the bare block — our file also carries :root[data-theme="light"]. */
const BARE_ROOT_RE = /:root\s*\{/;
const DARK_RE = /\[data-theme=["']?dark["']?\][^{]*\{/;

async function platformTokens() {
  const html = await (await fetch(ORIGIN)).text();
  const hrefs = [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]);
  if (!hrefs.length) throw new Error("no stylesheet found on " + ORIGIN);

  let merged = {};
  for (const href of hrefs) {
    const url = href.startsWith("http") ? href : new URL(href, ORIGIN).href;
    const css = await (await fetch(url)).text();
    // our base palette is the app's dark theme, so read both
    const root = parseAllBlocks(css, ROOT_RE);
    const dark = parseAllBlocks(css, DARK_RE);
    merged = { ...merged, ...(root ?? {}), ...(dark ?? {}) };
  }
  return merged;
}

const ours = parseAllBlocks(readFileSync(TOKENS_FILE, "utf8"), BARE_ROOT_RE);
if (!ours) {
  console.error("could not parse :root out of", TOKENS_FILE);
  process.exit(1);
}

const rawTheirs = await platformTokens();

/** The platform aliases heavily (--ds-tone-* -> --warning-* -> a hex). */
function resolve(value, table, depth = 0) {
  if (typeof value !== "string" || depth > 8) return value;
  const m = value.match(/^var\(\s*(--[\w-]+)\s*(?:,([^)]*))?\)$/);
  if (!m) return value;
  const next = table[m[1]];
  if (next === undefined) return m[2] !== undefined ? norm(m[2]) : value;
  return resolve(next, table, depth + 1);
}

const theirs = Object.fromEntries(
  Object.entries(rawTheirs).map(([k, v]) => [k, resolve(v, rawTheirs)]),
);

const drift = [];
const missing = [];

for (const [mine, theirName] of Object.entries(MAP)) {
  const a = ours[mine];
  const b = theirs[theirName];
  if (b === undefined) {
    missing.push(`${mine}  <-  ${theirName} (gone from the platform)`);
    continue;
  }
  // our file annotates values with trailing comments; compare the value only
  const clean = (v) => norm(String(v).replace(/\/\*.*?\*\//g, ""));
  if (clean(a) !== clean(b)) {
    drift.push(`${mine}\n    landing:  ${a}\n    platform: ${b}  (${theirName})`);
  }
}

console.log(`platform: ${ORIGIN}`);
console.log(`checked ${Object.keys(MAP).length} tokens\n`);

if (missing.length) {
  console.log("gone from the platform:");
  for (const line of missing) console.log("  " + line);
  console.log("");
}

if (!drift.length) {
  console.log("in sync — nothing to do.");
} else {
  console.log(`${drift.length} token(s) drifted:\n`);
  for (const line of drift) console.log("  " + line + "\n");
  console.log(`Update ${TOKENS_FILE} by hand if the landing should follow.`);
  process.exitCode = 1;
}
