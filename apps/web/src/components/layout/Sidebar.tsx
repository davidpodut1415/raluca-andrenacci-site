import { LOCALES } from '@raluca/shared';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../app/LocaleContext';
import { alternatePath, matchPath, PROGRAM_KEYS } from '../../i18n/routes';
import { cn } from '../../lib/cn';
import { site } from '../../lib/site';
import { LocalizedLink } from '../ui/LocalizedLink';

const cellClass =
  'flex min-h-11 items-center bg-black px-2 py-2 text-small font-bold text-white hover:bg-ink-700 aria-[current=page]:bg-tint-100 aria-[current=page]:text-black lg:min-h-9 lg:py-1.5';

/** A label cell on the left and its options stacked on the right, as in the reference menu. */
function Group({
  label,
  labelNode,
  children,
}: {
  label: string;
  labelNode?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-cols-2 items-start gap-0.5">
      {labelNode ?? (
        <div className="flex min-h-11 items-center bg-black px-2 py-2 text-small font-bold text-white lg:min-h-9 lg:py-1.5">
          {label}
        </div>
      )}
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  );
}

/** All navigation cells; used by the desktop sidebar and the mobile menu panel. */
function SidebarNav() {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const locale = useLocale();
  const target = matchPath(pathname)?.target;
  const section = target?.key;
  const program = target?.key === 'program' ? target.program : null;
  const programsOpen = section === 'programs' || section === 'program';
  const current = (on: boolean) => (on ? ('page' as const) : undefined);

  return (
    <nav aria-label={t('nav.label')} className="flex flex-col gap-0.5">
      {programsOpen ? (
        <Group
          label={t('nav.programs')}
          labelNode={
            <LocalizedLink
              to={{ key: 'programs' }}
              aria-current={current(section === 'programs')}
              className={cellClass}
            >
              {t('nav.programs')}
            </LocalizedLink>
          }
        >
          {PROGRAM_KEYS.map((key) => (
            <li key={key}>
              <LocalizedLink
                to={{ key: 'program', program: key }}
                aria-current={current(program === key)}
                className={cellClass}
              >
                {t(`programs.names.${key}`)}
              </LocalizedLink>
            </li>
          ))}
        </Group>
      ) : (
        <LocalizedLink to={{ key: 'programs' }} className={cellClass}>
          {t('nav.programs')}
        </LocalizedLink>
      )}
      <LocalizedLink
        to={{ key: 'about' }}
        aria-current={current(section === 'about')}
        className={cellClass}
      >
        {t('nav.about')}
      </LocalizedLink>
      <LocalizedLink
        to={{ key: 'blog' }}
        aria-current={current(section === 'blog' || section === 'post')}
        className={cellClass}
      >
        {t('nav.blog')}
      </LocalizedLink>
      <LocalizedLink
        to={{ key: 'contact' }}
        aria-current={current(section === 'contact')}
        className={cellClass}
      >
        {t('nav.contact')}
      </LocalizedLink>
      <LocalizedLink
        to={{ key: 'contact' }}
        search="?type=free-session"
        className="flex min-h-11 items-center bg-badge px-2 py-2 text-small font-bold text-black hover:brightness-95 lg:min-h-9 lg:py-1.5"
      >
        {t('cta.freeSession')}
      </LocalizedLink>

      <div className="mt-4">
        <Group label={t('shell.language')}>
          {LOCALES.map((code) => (
            <li key={code}>
              <Link
                to={`${alternatePath(pathname, code)}${search}`}
                lang={code}
                hrefLang={code}
                aria-current={current(code === locale)}
                className={cellClass}
              >
                {code.toUpperCase()}
              </Link>
            </li>
          ))}
        </Group>
      </div>
      <div className="mt-0.5">
        <Group label={t('shell.social')}>
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cellClass}
            >
              Instagram
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={cellClass}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={cellClass}>
              {t('shell.email')}
            </a>
          </li>
        </Group>
      </div>
    </nav>
  );
}

/**
 * Site navigation. Desktop: a fixed left column of black cells. Mobile: a black bar with the name and
 * a Menu cell that opens the same cells full screen.
 */
export function Sidebar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  // The panel is bound to the path it was opened on, so navigating closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenedAt(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const brand = (
    <LocalizedLink
      to={{ key: 'home' }}
      className="flex min-h-11 items-center bg-black px-2 py-2 text-button font-extrabold text-white"
    >
      {t('brand')}
    </LocalizedLink>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-svh flex-col gap-0.5 overflow-y-auto p-1.5 lg:flex">
        {brand}
        <div className="mt-2">
          <SidebarNav />
        </div>
      </aside>

      <div className="sticky top-0 z-40 bg-white p-1.5 lg:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-0.5">
          {brand}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenedAt(open ? null : pathname)}
            className={cn(cellClass, 'min-w-28 justify-between')}
          >
            {t('shell.menu')}
            <span aria-hidden="true">{open ? '×' : '+'}</span>
          </button>
        </div>
        {open && (
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-[3.5rem] bottom-0 overflow-y-auto overscroll-contain bg-white p-1.5"
          >
            <SidebarNav />
          </div>
        )}
      </div>
    </>
  );
}
