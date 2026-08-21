import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * next-intl handles locale detection and prefixed routing for us. Copy itself
 * lives in typed modules under src/content — richer than a message catalogue,
 * fully type-checked, and only the strings a client component actually needs
 * cross the server/client boundary.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
