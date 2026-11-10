import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { matchPath } from '../../i18n/routes';
import { usePages } from '../../lib/usePages';
import { LocalizedLink } from '../ui/LocalizedLink';

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

/** Closing call to action on every page: a black text cell and a yellow action cell. */
export function PersistentCTA() {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  const { pathname } = useLocation();
  const key = ctaKey(pathname);
  if (!key) return null;

  return (
    <section aria-labelledby="closing-cta" className="mt-16 grid gap-0.5 lg:grid-cols-3">
      <div className="bg-black p-3 text-white md:p-4 lg:col-span-2">
        <h2 id="closing-cta" className="text-h2 text-white">
          {tp(`ctaPanel.${key}.title`)}
        </h2>
        <p className="mt-3 max-w-2xl text-white/85">{tp(`ctaPanel.${key}.text`)}</p>
      </div>
      <LocalizedLink
        to={{ key: 'contact' }}
        search="?type=free-session"
        className="flex min-h-24 items-end justify-between bg-badge p-3 text-h3 font-extrabold text-black hover:brightness-95 md:p-4"
      >
        {t('cta.freeSession')}
        <span aria-hidden="true">→</span>
      </LocalizedLink>
    </section>
  );
}
