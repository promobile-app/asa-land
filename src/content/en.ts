/** English source copy. The shape is pinned by `Content` in ./types. */
import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Promobile — paid installs and organic rank on one chart",
    description:
      "Apple Ads and ASO in one workspace. One plan with every feature and no spend gates — $149/mo + 2% of managed ad spend.",
    ogAlt: "Promobile — Apple Ads and ASO in one workspace",
  },

  nav: {
    links: [
      { href: "#dataset", label: "Data" },
      { href: "#why", label: "Why us" },
      { href: "#product", label: "Product" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    bookDemo: "Book a demo",
    languageGroup: "Language",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },

  hero: {
    eyebrow: "Apple Ads & ASO · one workspace",
    title: "Paid installs and organic rank on one chart",
    subtitle:
      "One plan with every feature and no spend gates — $149/mo + 2% of managed ad spend",
    primary: "Book a demo",
    secondary: "Join the wait list",
    facts: [
      { strong: "No signup", rest: "for the live demo account" },
      { strong: "Official", rest: "Apple Ads Campaign Management API" },
      { strong: "Revoke access", rest: "in one click" },
    ],
    loopCaption: "Live product dashboard",
  },

  proof: {
    eyebrow: "The chart the headline is about",
    title: "One keyword, thirty days, both numbers.",
    keyword: "photo editor · US",
    range: "Last 30 days",
    placement: "Search results",
    legendPaid: "Paid installs",
    legendRank: "Organic rank",
    axisInstalls: "INSTALLS",
    axisRank: "RANK",
    launched: "CAMPAIGN LAUNCHED",
    ruleFired: "RULE FIRED · BID −18%",
    footA: "ORGANIC RANK AXIS INVERTED — UP IS BETTER",
    footB: "EVERY BID CHANGE PINNED TO THE DAY IT HAPPENED",
    tipPaid: "Paid installs",
    tipRank: "Organic rank",
    chartAria:
      "Paid installs plotted against the keyword's organic rank over thirty days",
  },

  trusted: {
    label: "Trusted by",
    parked: "Parked · no client logos yet",
  },

  dataset: {
    eyebrow: "Full-funnel reporting",
    title: "Three sources. One dataset. Nothing stitched together by hand.",
    funnel: ["SPEND", "INSTALL", "TRIAL", "PAID"],
    per: "per keyword, per geo",
    sources: [
      {
        kind: "Source 01",
        tone: "brand",
        title: "Apple Ads",
        claim: "Official API. Access granted by you, revoked in one click.",
        groups: [
          {
            label: null,
            items: [
              "Spend",
              "Impressions",
              "Taps",
              "Installs",
              "CPA",
              "Share of voice",
              "Search terms",
              "CPP performance",
            ],
          },
        ],
      },
      {
        kind: "Source 02",
        tone: "purple",
        title: "ASO data · App Insights",
        claim: "Our own index. Not a reseller's API.",
        groups: [
          {
            label: null,
            items: [
              "Search volume",
              "Difficulty",
              "Organic rank, daily",
              "Competitors on the keyword",
              "Suggested keywords",
              "Live rank updates",
            ],
          },
        ],
      },
      {
        kind: "Source 03",
        tone: "ok",
        title: "Your product data",
        claim: "13 event sources. Connected by us, not by your backend team.",
        groups: [
          {
            label: "Sources",
            items: [
              "App Store Connect",
              "MMP",
              "Subscription analytics",
              "Custom S2S",
              "RevenueCat",
              "Adapty",
              "Apphud",
              "Qonversion",
            ],
          },
          {
            label: "Events",
            items: [
              "Install",
              "Trial start",
              "Trial → paid",
              "Renewal",
              "Revenue",
              "Refund",
            ],
          },
        ],
      },
    ],
    node: { title: "One dataset", sub: "promobile.app" },
  },

  why: {
    eyebrow: "In order of what matters most",
    title: "Eight things you get here that you don't get elsewhere",
    items: [
      {
        title: "Paid and organic on one chart",
        body: "Paid installs plotted against the keyword's organic rank. See where paid is cannibalizing organic and where it's lifting it.",
      },
      {
        title: "Every change marked on the chart",
        body: "Rule triggers, manual edits and launches, all pinned to the metric line. See what happened that day without digging for it.",
      },
      {
        title: "Transparent automations",
        body: "Dry-run any rule against your own history first — see what it would have done over the last 7 days. Safety limits and a conflict checker built in.",
      },
      {
        title: "Per-app team access",
        body: "A media buyer at an agency sees only their app. Unlimited seats, and inviting someone takes ten seconds.",
      },
      {
        title: "Facts, not scores",
        body: "No App Power. No KEI. No Chance score. No auto-insight that can't explain itself. We show you the data and hand you the controls.",
      },
      {
        title: "13 event sources",
        body: "Four subscription analytics platforms — RevenueCat, Adapty, Apphud, Qonversion — plus Custom S2S for your own backend.",
      },
      {
        title: "Your own ASO data, inside the ad account",
        body: "Search volume, difficulty and organic rank from App Insights — right in keyword suggestions and rule conditions.",
      },
      {
        title: "Nothing locked behind a higher tier",
        body: "$149 a month plus 2% of spend. Unlimited apps, keywords and automations. There's no higher tier to upgrade to.",
      },
    ],
  },

  box: {
    eyebrow: "What's in the box",
    title: "The whole Apple Ads surface, in editable tables",
    items: [
      {
        title: "All four Apple Ads placements, one workspace",
        body: "Today tab, Search tab, Search results, and Product pages; campaigns, ad groups, keywords, and negative keywords in editable tables with bulk actions.",
        wide: false,
      },
      {
        title: "Launch wizard with structure presets",
        body: "Standard, Campaign per Keyword (SKAC), and Ad Group per Keyword (SKAG), plus campaign cloning and draft saving.",
        wide: false,
      },
      {
        title: "Automation rules",
        body: "An IF/THEN rule builder plus 18 ready-made templates for bids, keyword hygiene, budgets, and alerts.",
        wide: false,
      },
      {
        title: "Goal-based optimization",
        body: "tCPA and tROAS targets, plus Ramp-Up for zero-history launches (our take on Quick Start).",
        wide: false,
      },
      {
        title: "Custom Product Pages",
        body: "Pick CPPs at launch, swap them at the ad group level, and A/B test them (Split and Rotation modes).",
        wide: false,
      },
      {
        title: "One Activity log for everything",
        body: "Rule triggers, manual edits, bulk jobs with live progress, and account syncs — plus one-click retry for anything that fails.",
        wide: false,
      },
      {
        title: "Reporting that fits your workflow",
        body: "Time-series charts, entity comparison, pivot tables, and scheduled reports delivered via email, Slack, or a webhook.",
        wide: true,
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "One plan for everyone",
    amount: 149,
    per: "/ month",
    plusPre: "+",
    plusStrong: "2%",
    plusPost: "of ad spend you manage through us",
    annual: "$1,490 / YEAR — TWO MONTHS FREE",
    facts: [
      {
        title: "The same plan for everyone",
        body: "Same product, same features, same price.",
      },
      {
        title: "Your plan never changes as you scale",
        body: "No spend threshold that moves you to a higher tier.",
      },
      {
        title: "Nothing is locked",
        body: "Unlimited apps, keywords, automations and seats.",
      },
    ],
    meta: [
      { label: "Tiers available", value: "1" },
      { label: "Spend gates", value: "0" },
      { label: "Seats", value: "unlimited" },
    ],
    cta: "Book a demo",
  },

  faq: {
    eyebrow: "The questions you were going to ask anyway",
    title: "FAQ",
    items: [
      {
        q: "Do you have a deal with Apple?",
        a: "Access comes from you, not from Apple. The Apple Ads Campaign Management API is public and open to third-party platforms, so there is no private deal to have, for us or for anyone else in this category. You grant access from inside your own Apple Ads account, and you revoke it from the same screen in one click. Every tool you are comparing us with runs on the same API.",
      },
      {
        q: "What happens to my campaigns if you go down?",
        a: "They keep spending. Campaigns, budgets, keywords and negatives live in your Apple Ads account. Promobile is a control layer on top of it, not a host. If our service is unavailable, automations stop firing and Apple's console keeps working exactly as before. Nothing is deleted, nothing stops delivering. The same is true on the day you cancel.",
      },
      {
        q: "What am I not getting at $149 + 2%?",
        a: "Nothing is held back. Every feature is on every account: unlimited apps, keywords, automations and seats, at 2% of managed spend from the first dollar. The rate is lower because we own our ASO dataset instead of licensing somebody else's API. Other vendors pay for that access and pass the cost on to you. There is no higher tier to move you into.",
      },
      {
        q: "How do I know your numbers are right?",
        a: "Check them against your own. Install Match % is built into the product: it reconciles our installs against your MMP, campaign by campaign, so you can see where the two disagree instead of taking our word for it. The demo account runs on live data and there is no signup. Check it before you talk to us.",
      },
      {
        q: "What stops a robot from burning through my budget?",
        a: "Four limits, and the first one runs before the rule is ever live. Dry-run any rule against your own last 7 days and you get the exact list of bids it would have changed on your own keywords. After that, floor and cap bids bound every change and a daily limit caps how many it can make. The conflict checker blocks two rules fighting over the same keyword. Every action lands in the Activity log, and you can roll it back by hand.",
      },
    ],
  },

  cta: {
    eyebrow: "Next step",
    title: "Open the demo account first. Talk to us after.",
    lede: "It runs on live data and there's no signup. If the numbers hold up against your own, book thirty minutes.",
    primary: "Book a demo",
    secondary: "Join the wait list",
  },

  waitlist: {
    title: "Join the wait list",
    lede: "We open accounts in batches. Leave an email and we'll tell you when yours is up.",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    submit: "Join the wait list",
    submitting: "Sending…",
    done: "You're on the list. We'll be in touch.",
    errorEmail: "That doesn't look like an email address.",
    errorGeneric: "Something broke on our side. Try again in a minute.",
    close: "Close",
  },

  footer: {
    rights: "© 2026 Promobile.app",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    email: "hello@promobile.app",
  },

  mock: {
    nav: [
      "Overview",
      "Apple Ads",
      "Keywords",
      "Automations",
      "App Insights",
      "Reports",
      "Activity log",
      "Settings",
    ],
    activeNav: "Apple Ads",
    chips: ["Photo Editor · iOS", "United States", "Jul 1 – Jul 30", "Search results"],
    launch: "Launch campaign",
    kpis: [
      { label: "Spend", value: "$48,214", delta: "+6.2%", dir: "up" },
      { label: "Installs", value: "12,845", delta: "+9.4%", dir: "up" },
      { label: "CPA", value: "$3.75", delta: "−2.8%", dir: "down" },
      { label: "Trials", value: "3,120", delta: "+11.0%", dir: "up" },
      { label: "Trial to paid", value: "41.2%", delta: "+1.6pp", dir: "up" },
      { label: "Install match", value: "97.4%", delta: "MMP reconciled", dir: "up" },
    ],
    chartTitle: "Paid installs vs organic rank",
    chartTag: "KEYWORD: PHOTO EDITOR",
    activityTitle: "Activity log",
    activityTag: "LIVE",
    activity: [
      { tone: "purple", text: "Rule **Bid guard** lowered bids on 12 keywords", meta: "2 min ago · automation" },
      { tone: "ok", text: "Bulk edit applied to 48 keywords", meta: "14 min ago · k.orlova" },
      { tone: "sky", text: "Apple Ads account synced", meta: "1 h ago · system" },
      { tone: "warn", text: "CPP swapped on ad group **US / broad**", meta: "3 h ago · d.petrov" },
      { tone: "purple", text: "Rule **Pause zero-install** dry-run finished", meta: "5 h ago · automation" },
    ],
    tableHead: ["Keyword", "Rank", "Volume", "Spend", "Installs", "CPA", "Status"],
    rows: [
      { kw: "photo editor", rank: "#9", vol: "42,800", spend: "$12,480", inst: "3,204", cpa: "$3.90", status: "Active", tone: "on" },
      { kw: "photo editing app", rank: "#14", vol: "28,150", spend: "$8,940", inst: "2,410", cpa: "$3.71", status: "Active", tone: "on" },
      { kw: "collage maker", rank: "#6", vol: "19,720", spend: "$6,210", inst: "1,988", cpa: "$3.12", status: "Rule held", tone: "rule" },
      { kw: "background remover", rank: "#23", vol: "15,940", spend: "$5,870", inst: "1,204", cpa: "$4.88", status: "Active", tone: "on" },
      { kw: "picture editor", rank: "#31", vol: "11,300", spend: "$3,410", inst: "742", cpa: "$4.60", status: "Paused", tone: "pause" },
      { kw: "photo retouch", rank: "#48", vol: "7,880", spend: "$1,960", inst: "396", cpa: "$4.95", status: "Active", tone: "on" },
    ],
  },
};
