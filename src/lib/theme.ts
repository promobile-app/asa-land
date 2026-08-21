/**
 * Runs before first paint, so a saved choice never flashes the other theme.
 * Kept as a string because it has to be inline in <head> — a module would
 * load too late and the flash would be visible.
 */
export const themeBootScript = `(function(){try{var t=localStorage.getItem("pm-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export type Theme = "light" | "dark";

export function activeTheme(): Theme {
  const stamped = document.documentElement.getAttribute("data-theme");
  if (stamped === "light" || stamped === "dark") return stamped;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("pm-theme", next);
  } catch {
    /* private mode — the choice just won't survive a reload */
  }
}
