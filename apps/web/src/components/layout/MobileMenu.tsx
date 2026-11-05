import { LOCALES } from '@raluca/shared';
import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../app/LocaleContext';
import { alternatePath, PROGRAM_KEYS, type StaticRouteKey } from '../../i18n/routes';
import { cn } from '../../lib/cn';
import { ButtonLink } from '../ui/Button';
import { ChevronDownIcon } from '../ui/icons';
import { LocalizedLink } from '../ui/LocalizedLink';

interface MobileMenuProps {
  id: string;
  items: StaticRouteKey[];
  active: StaticRouteKey | null;
}

const rowClass =
  'flex min-h-14 w-full items-center justify-between font-serif text-h3 font-semibold';

/**
 * Full-screen mobile navigation ("meganav"): large tap rows, the Programs row expands into the
 * program list, the free-session button and the language switch stay pinned at the bottom.
 * The page behind does not scroll while it is open.
 */
export function MobileMenu({ id, items, active }: MobileMenuProps) {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const current = useLocale();
  const [programsOpen, setProgramsOpen] = useState(active === 'programs');
  const panelId = useId();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      id={id}
      className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-grey-50 lg:hidden"
    >
      <nav aria-label={t('nav.label')} className="flex-1 px-5 pt-4 pb-8 sm:px-8">
        <ul className="flex flex-col">
          {items.map((key) => (
            <li key={key}>
              {key === 'programs' ? (
                <>
                  <button
                    type="button"
                    aria-expanded={programsOpen}
                    aria-controls={panelId}
                    onClick={() => setProgramsOpen((v) => !v)}
                    className={cn(rowClass, active === key ? 'text-burgundy-700' : 'text-ink-900')}
                  >
                    {t(`nav.${key}`)}
                    <ChevronDownIcon
                      className={cn('size-6 transition-transform', programsOpen && 'rotate-180')}
                    />
                  </button>
                  {programsOpen && (
                    <ul id={panelId} className="mb-3 flex flex-col pl-1">
                      {PROGRAM_KEYS.map((program) => (
                        <li key={program}>
                          <LocalizedLink
                            to={{ key: 'program', program }}
                            className="flex min-h-12 items-center text-button text-ink-700"
                          >
                            {t(`programs.names.${program}`)}
                          </LocalizedLink>
                        </li>
                      ))}
                      <li>
                        <LocalizedLink
                          to={{ key: 'programs' }}
                          className="flex min-h-12 items-center text-button font-semibold text-burgundy-700"
                        >
                          {t('nav.allPrograms')}
                        </LocalizedLink>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <LocalizedLink
                  to={{ key }}
                  aria-current={active === key ? 'page' : undefined}
                  className={cn(rowClass, active === key ? 'text-burgundy-700' : 'text-ink-900')}
                >
                  {t(`nav.${key}`)}
                </LocalizedLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sticky bottom-0 flex flex-col gap-5 bg-grey-50 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
        <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
          {t('cta.freeSession')}
        </ButtonLink>
        <nav aria-label={t('languageNav')}>
          <ul className="flex justify-center gap-2">
            {LOCALES.map((locale) => (
              <li key={locale}>
                <Link
                  to={`${alternatePath(pathname, locale)}${search}`}
                  lang={locale}
                  hrefLang={locale}
                  aria-label={t(`languages.${locale}`)}
                  aria-current={locale === current ? 'true' : undefined}
                  className={cn(
                    'inline-flex size-12 items-center justify-center rounded-md text-button font-semibold',
                    locale === current ? 'bg-ink-900 text-white' : 'text-ink-900 hover:bg-grey-100',
                  )}
                >
                  {locale.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
