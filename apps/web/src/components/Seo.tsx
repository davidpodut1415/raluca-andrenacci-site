import { LOCALES } from '@raluca/shared';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { alternatePath, matchPath } from '../i18n/routes';
import { absoluteUrl, site } from '../lib/site';

interface SeoProps {
  /** Page title without the brand suffix. Omit on the home page. */
  title?: string;
  description?: string;
  noindex?: boolean;
}

const OG_LOCALE = { ro: 'ro_RO', en: 'en_US', it: 'it_IT' } as const;

/** Uses React 19 document-metadata hoisting: <title>, <meta> and <link> are moved into <head>. */
export function Seo({ title, description, noindex }: SeoProps) {
  const { pathname } = useLocation();
  const locale = useLocale();
  const fullTitle = title ? `${title} — ${site.name}` : site.name;
  // Blog posts have per-locale slugs; alternates for them are added in Phase 5.
  const hasAlternates = matchPath(pathname)?.target.key !== 'post';

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={absoluteUrl(pathname)} />
      {hasAlternates &&
        LOCALES.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={absoluteUrl(alternatePath(pathname, l))}
          />
        ))}
      {hasAlternates && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(alternatePath(pathname, 'ro'))}
        />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={absoluteUrl(pathname)} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
    </>
  );
}
