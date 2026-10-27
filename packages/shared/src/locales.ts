export const LOCALES = ['ro', 'en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];

/** Romanian is served at `/`; other locales are prefixed (`/en`, `/it`). */
export const DEFAULT_LOCALE: Locale = 'ro';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
