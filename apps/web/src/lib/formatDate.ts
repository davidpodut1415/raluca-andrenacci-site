import type { Locale } from '@raluca/shared';

/** "ianuarie 2026" / "January 2026" / "gennaio 2026". */
export function formatMonthYear(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}
