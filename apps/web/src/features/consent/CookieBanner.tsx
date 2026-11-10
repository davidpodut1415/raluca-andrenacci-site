import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { LocalizedLink } from '../../components/ui/LocalizedLink';
import { useConsent } from './ConsentProvider';

/**
 * Compact card (not full-width) so it never hides the page's primary CTA.
 * "Accept all" and "Reject all" share the same style and size (equal prominence).
 */
export function CookieBanner() {
  const { t } = useTranslation('consent');
  const { consent, preferencesOpen, acceptAll, rejectAll, openPreferences } = useConsent();

  if (consent || preferencesOpen) return null;

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-line bg-white p-5 shadow-card md:right-auto md:bottom-6 md:left-6 md:max-w-md"
    >
      <h2 id="cookie-banner-title" className="text-h4">
        {t('bannerTitle')}
      </h2>
      <p className="mt-2 text-small text-ink-700">
        {t('bannerText')}{' '}
        <LocalizedLink to={{ key: 'cookies' }} className="text-black underline underline-offset-4">
          {t('learnMore')}
        </LocalizedLink>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button onClick={rejectAll}>{t('rejectAll')}</Button>
        <Button onClick={acceptAll}>{t('acceptAll')}</Button>
        <Button variant="ghost" onClick={openPreferences} className="col-span-2">
          {t('customize')}
        </Button>
      </div>
    </section>
  );
}
