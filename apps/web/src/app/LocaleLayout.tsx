import type { Locale } from '@raluca/shared';
import { Suspense, useLayoutEffect, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { PersistentCTA } from '../components/blocks/PersistentCTA';
import { Footer } from '../components/layout/Footer';
import { Sidebar } from '../components/layout/Sidebar';
import { CookieBanner } from '../features/consent/CookieBanner';
import { PreferencesDialog } from '../features/consent/PreferencesDialog';
import { localeFromPath } from '../i18n/routes';
import { LocaleContext } from './LocaleContext';

/** Page chrome for one locale: sets language, skip link, header, footer and consent UI. */
export function LocaleLayout({ locale: localeProp }: { locale?: Locale }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeProp ?? localeFromPath(pathname);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  // On client-side navigation: scroll to top and move focus to <main> so screen readers announce the change.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <LocaleContext.Provider value={locale}>
      <a
        href="#main"
        className="sr-only bg-white px-4 py-2 font-bold text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {t('skipToContent')}
      </a>
      <div className="lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <Sidebar />
        <div className="min-w-0 px-1.5 pt-1.5 pb-1.5 lg:pl-0">
          <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              <Outlet />
            </Suspense>
          </main>
          <PersistentCTA />
          <Footer />
        </div>
      </div>
      <CookieBanner />
      <PreferencesDialog />
    </LocaleContext.Provider>
  );
}
