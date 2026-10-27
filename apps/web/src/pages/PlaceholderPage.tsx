import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/blocks/PageHero';
import { Seo } from '../components/Seo';
import type { StaticRouteKey } from '../i18n/routes';

const TITLE_KEYS: Record<Exclude<StaticRouteKey, 'home'>, string> = {
  about: 'nav.about',
  programs: 'nav.programs',
  blog: 'nav.blog',
  contact: 'nav.contact',
  privacy: 'footer.privacy',
  cookies: 'footer.cookies',
};

/** Stand-in for pages built in Phase 3+ (so routes, SEO tags and layout can be verified now). */
export function PlaceholderPage({ routeKey }: { routeKey: Exclude<StaticRouteKey, 'home'> }) {
  const { t } = useTranslation();
  const title = t(TITLE_KEYS[routeKey]);

  return (
    <>
      <Seo title={title} noindex />
      <PageHero title={title} lead={t('placeholder.soon')} />
    </>
  );
}

export function TitledPlaceholder({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={title} noindex />
      <PageHero title={title} lead={t('placeholder.soon')} />
    </>
  );
}
