/** Site-wide constants. Contact details are taken from the current site; confirm them in docs/00-DECISIONS.md (Q5). */
export const site = {
  name: 'Raluca Andrenacci',
  email: 'mentoringshop@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raluca-andrenacci-41499142',
  instagram: 'https://www.instagram.com/ralucaandrenacci',
  /** Absolute origin used for canonical / hreflang URLs. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
  gtmId: import.meta.env.VITE_GTM_ID as string | undefined,
} as const;

export function absoluteUrl(path: string): string {
  const origin = site.url || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${origin}${path}`;
}
