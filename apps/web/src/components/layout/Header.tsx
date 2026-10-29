import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { matchPath, type StaticRouteKey } from '../../i18n/routes';
import { useHidingHeader } from '../../lib/useHidingHeader';
import { cn } from '../../lib/cn';
import { ButtonLink } from '../ui/Button';
import { CloseIcon, MenuIcon } from '../ui/icons';
import { LocalizedLink } from '../ui/LocalizedLink';
import { LanguageMenu } from './LanguageMenu';

const NAV_ITEMS: StaticRouteKey[] = ['programs', 'about', 'blog', 'contact'];

function activeNavKey(pathname: string): StaticRouteKey | null {
  const match = matchPath(pathname);
  if (!match) return null;
  if (match.target.key === 'program') return 'programs';
  if (match.target.key === 'post') return 'blog';
  return match.target.key;
}

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  // The menu is bound to the path it was opened on, so navigating closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const active = activeNavKey(pathname);
  const { hidden, reveal } = useHidingHeader(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenedAt(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const navLinks = NAV_ITEMS.map((key) => (
    <li key={key}>
      <LocalizedLink
        to={{ key }}
        aria-current={active === key ? 'page' : undefined}
        className={cn(
          'inline-flex min-h-10 items-center text-small whitespace-nowrap transition-colors',
          active === key
            ? 'font-semibold text-burgundy-700'
            : 'font-medium text-ink-900 hover:text-burgundy-700',
        )}
      >
        {t(`nav.${key}`)}
      </LocalizedLink>
    </li>
  ));

  return (
    <header
      onFocusCapture={reveal}
      className={cn(
        'sticky top-0 z-40 bg-grey-50 transition-transform duration-300 motion-reduce:transition-none',
        hidden && '-translate-y-full',
      )}
    >
      <div className="flex h-14 items-center justify-between gap-6 px-5 sm:px-8 lg:grid lg:h-16 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <LocalizedLink
          to={{ key: 'home' }}
          className="justify-self-start text-button font-semibold tracking-wordmark whitespace-nowrap text-ink-900 uppercase"
        >
          {t('brand')}
        </LocalizedLink>

        <nav aria-label={t('nav.label')} className="hidden lg:block">
          <ul className="flex items-center gap-8">{navLinks}</ul>
        </nav>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <LanguageMenu compact />
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="sm">
            {t('cta.freeSession')}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-ink-900 hover:bg-grey-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
          onClick={() => setOpenedAt(open ? null : pathname)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-grey-50 lg:hidden">
          <div className="flex flex-col gap-8 px-5 py-8 sm:px-8">
            <nav aria-label={t('nav.label')}>
              <ul className="flex flex-col divide-y divide-line text-button">
                {NAV_ITEMS.map((key) => (
                  <li key={key}>
                    <LocalizedLink
                      to={{ key }}
                      aria-current={active === key ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center',
                        active === key ? 'text-burgundy-700' : 'text-ink-900',
                      )}
                    >
                      {t(`nav.${key}`)}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
              {t('cta.freeSession')}
            </ButtonLink>
            <LanguageMenu align="left" className="-ml-3 self-start" />
          </div>
        </div>
      )}
    </header>
  );
}
