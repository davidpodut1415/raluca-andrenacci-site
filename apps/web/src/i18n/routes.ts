import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from '@raluca/shared';

/**
 * Localized route table (docs/02-PRODUCT-SPEC.md §3). Single source of truth for every public URL:
 * the router, <LocalizedLink>, the language switcher, hreflang tags and the sitemap all read from here.
 * RO is served at `/`; EN and IT are prefixed (`/en`, `/it`).
 */
export const STATIC_ROUTES = {
  home: { ro: '', en: '', it: '' },
  about: { ro: 'despre-mine', en: 'about', it: 'chi-sono' },
  programs: { ro: 'programe', en: 'programs', it: 'programmi' },
  blog: { ro: 'blog', en: 'blog', it: 'blog' },
  contact: { ro: 'contact', en: 'contact', it: 'contatti' },
  privacy: { ro: 'confidentialitate', en: 'privacy', it: 'privacy' },
  cookies: { ro: 'cookies', en: 'cookies', it: 'cookie' },
} as const satisfies Record<string, Record<Locale, string>>;

export type StaticRouteKey = keyof typeof STATIC_ROUTES;
export const STATIC_ROUTE_KEYS = Object.keys(STATIC_ROUTES) as StaticRouteKey[];

export const PROGRAM_KEYS = [
  'coLeadership',
  'nextgenMentoring',
  'successorIntegration',
  'entrepreneurInResidence',
  'governanceBoard',
  'audit',
] as const;
export type ProgramKey = (typeof PROGRAM_KEYS)[number];

export const PROGRAM_SLUGS: Record<ProgramKey, Record<Locale, string>> = {
  coLeadership: {
    ro: 'co-leadership-fondator-nextgen',
    en: 'co-leadership-founder-nextgen',
    it: 'co-leadership-fondatore-nextgen',
  },
  nextgenMentoring: {
    ro: 'mentorat-succesori-nextgen',
    en: 'nextgen-successor-mentoring',
    it: 'mentoring-successori-nextgen',
  },
  successorIntegration: {
    ro: 'integrarea-succesorului',
    en: 'successor-integration',
    it: 'integrazione-del-successore',
  },
  entrepreneurInResidence: {
    ro: 'entrepreneur-in-residence',
    en: 'entrepreneur-in-residence',
    it: 'entrepreneur-in-residence',
  },
  governanceBoard: {
    ro: 'guvernanta-family-office-board',
    en: 'governance-family-office-board',
    it: 'governance-family-office-board',
  },
  // EN/IT titles of the Audit are still to be confirmed (docs/00-DECISIONS.md Q9); slugs follow the draft.
  audit: {
    ro: 'auditul-prezentului-tau',
    en: 'your-present-audit',
    it: 'audit-del-presente',
  },
};

export type RouteTarget =
  { key: StaticRouteKey } | { key: 'program'; program: ProgramKey } | { key: 'post'; slug: string };

export interface RouteMatch {
  locale: Locale;
  target: RouteTarget;
}

const prefixFor = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);

export function buildPath(locale: Locale, target: RouteTarget): string {
  const prefix = prefixFor(locale);
  switch (target.key) {
    case 'program':
      return `${prefix}/${STATIC_ROUTES.programs[locale]}/${PROGRAM_SLUGS[target.program][locale]}`;
    case 'post':
      return `${prefix}/${STATIC_ROUTES.blog[locale]}/${target.slug}`;
    case 'home':
      return prefix || '/';
    default:
      return `${prefix}/${STATIC_ROUTES[target.key][locale]}`;
  }
}

/** react-router path pattern for a route (post/program slugs become `:slug`). */
export function routePattern(locale: Locale, key: StaticRouteKey | 'program' | 'post'): string {
  const prefix = prefixFor(locale);
  if (key === 'program') return `${prefix}/${STATIC_ROUTES.programs[locale]}/:slug`;
  if (key === 'post') return `${prefix}/${STATIC_ROUTES.blog[locale]}/:slug`;
  return buildPath(locale, { key });
}

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

export function programKeyFromSlug(locale: Locale, slug: string | undefined): ProgramKey | null {
  return PROGRAM_KEYS.find((key) => PROGRAM_SLUGS[key][locale] === slug) ?? null;
}

/** Resolves a URL path to its locale and route, or `null` for unknown paths (404). */
export function matchPath(pathname: string): RouteMatch | null {
  const locale = localeFromPath(pathname);
  const segments = pathname.split('/').filter(Boolean);
  if (locale !== DEFAULT_LOCALE) segments.shift();

  const [first, second, ...rest] = segments;
  if (first === undefined) return { locale, target: { key: 'home' } };
  if (rest.length > 0) return null;

  const key = STATIC_ROUTE_KEYS.find((k) => k !== 'home' && STATIC_ROUTES[k][locale] === first);
  if (!key) return null;
  if (second === undefined) return { locale, target: { key } };

  if (key === 'programs') {
    const program = programKeyFromSlug(locale, second);
    return program ? { locale, target: { key: 'program', program } } : null;
  }
  if (key === 'blog') return { locale, target: { key: 'post', slug: second } };
  return null;
}

/**
 * Equivalent URL in another locale (used by the language switcher and hreflang).
 * Blog posts have per-locale slugs that live in the database, so until the API provides alternates
 * (Phase 5) a post falls back to the blog index of the target locale.
 */
export function alternatePath(pathname: string, locale: Locale): string {
  const match = matchPath(pathname);
  if (!match) return buildPath(locale, { key: 'home' });
  if (match.target.key === 'post') return buildPath(locale, { key: 'blog' });
  return buildPath(locale, match.target);
}

export { LOCALES };
