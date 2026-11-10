import { useTranslation } from 'react-i18next';
import { useConsent } from '../../features/consent/ConsentProvider';
import { LocalizedLink } from '../ui/LocalizedLink';

const cellClass =
  'flex min-h-11 items-center bg-black px-2 py-2 text-small font-bold text-white hover:bg-ink-700';

/** Legal row: copyright, privacy, cookies and cookie settings as black cells at the end of the page. */
export function Footer() {
  const { t } = useTranslation();
  const { openPreferences } = useConsent();

  return (
    <footer className="mt-16 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
      <p className="flex min-h-11 items-center bg-black px-2 py-2 text-small font-bold text-white">
        {t('footer.rights', { year: new Date().getFullYear() })}
      </p>
      <LocalizedLink to={{ key: 'privacy' }} className={cellClass}>
        {t('footer.privacy')}
      </LocalizedLink>
      <LocalizedLink to={{ key: 'cookies' }} className={cellClass}>
        {t('footer.cookies')}
      </LocalizedLink>
      <button type="button" onClick={openPreferences} className={`${cellClass} text-left`}>
        {t('footer.manageCookies')}
      </button>
    </footer>
  );
}
