export type Tone = "brand" | "purple" | "ok" | "sky" | "warn";
export type Dir = "up" | "down";
export type RowTone = "on" | "pause" | "rule";

export type Content = {
  meta: { title: string; description: string; ogAlt: string };

  nav: {
    links: { href: string; label: string }[];
    bookDemo: string;
    languageGroup: string;
    themeToLight: string;
    themeToDark: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    facts: { strong: string; rest: string }[];
    loopCaption: string;
  };

  proof: {
    eyebrow: string;
    title: string;
    keyword: string;
    range: string;
    placement: string;
    legendPaid: string;
    legendRank: string;
    axisInstalls: string;
    axisRank: string;
    launched: string;
    ruleFired: string;
    footA: string;
    footB: string;
    tipPaid: string;
    tipRank: string;
    chartAria: string;
  };

  trusted: { label: string; parked: string };

  dataset: {
    eyebrow: string;
    title: string;
    funnel: string[];
    per: string;
    sources: {
      kind: string;
      tone: Tone;
      title: string;
      claim: string;
      groups: { label: string | null; items: string[] }[];
    }[];
    node: { title: string; sub: string };
  };

  why: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };

  box: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; wide: boolean }[];
  };

  pricing: {
    eyebrow: string;
    title: string;
    amount: number;
    per: string;
    plusPre: string;
    plusStrong: string;
    plusPost: string;
    annual: string;
    facts: { title: string; body: string }[];
    meta: { label: string; value: string }[];
    cta: string;
  };

  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };

  cta: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
  };

  waitlist: {
    title: string;
    lede: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    done: string;
    errorEmail: string;
    errorGeneric: string;
    close: string;
  };

  footer: { rights: string; privacy: string; terms: string; email: string };

  /** Copy for the rebuilt dashboard that stands in for the video loop. */
  mock: {
    nav: string[];
    activeNav: string;
    chips: string[];
    launch: string;
    kpis: { label: string; value: string; delta: string; dir: Dir }[];
    chartTitle: string;
    chartTag: string;
    activityTitle: string;
    activityTag: string;
    /** `**bold**` is the only markup honoured here. */
    activity: { tone: Tone; text: string; meta: string }[];
    tableHead: string[];
    rows: {
      kw: string;
      rank: string;
      vol: string;
      spend: string;
      inst: string;
      cpa: string;
      status: string;
      tone: RowTone;
    }[];
  };
};
