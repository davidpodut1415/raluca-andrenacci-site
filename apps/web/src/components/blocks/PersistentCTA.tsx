import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { matchPath } from '../../i18n/routes';
import { usePages } from '../../lib/usePages';
import { ButtonLink } from '../ui/Button';
import { CTAPanel } from './CTAPanel';

/** Which copy the closing CTA uses for a path; `null` = no CTA (the contact page already is one). */
function ctaKey(pathname: string): string | null {
  const target = matchPath(pathname)?.target;
  if (!target) return 'home';
  switch (target.key) {
    case 'contact':
      return null;
    case 'about':
    case 'programs':
      return target.key;
    case 'program':
      return target.program === 'audit' ? 'audit' : 'program';
    case 'blog':
    case 'post':
      return 'blog';
    default:
      return 'home';
  }
}

/** Closing CTA photo panel rendered by the layout on every page (above the footer) with page-specific copy. */
export function PersistentCTA() {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  const { pathname } = useLocation();
  const key = ctaKey(pathname);
  if (!key) return null;

  return (
    <CTAPanel
      title={tp(`ctaPanel.${key}.title`)}
      text={tp(`ctaPanel.${key}.text`)}
      action={
        <ButtonLink to={{ key: 'contact' }} search="?type=free-session" variant="light" size="lg">
          {t('cta.freeSession')}
        </ButtonLink>
      }
    />
  );
}
