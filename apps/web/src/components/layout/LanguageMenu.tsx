import { LOCALES } from '@raluca/shared';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../app/LocaleContext';
import { alternatePath } from '../../i18n/routes';
import { cn } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon, GlobeIcon } from '../ui/icons';

interface LanguageMenuProps {
  /** Which way the list opens: `down` in the header, `up` in the footer. */
  placement?: 'down' | 'up';
  /** Light text for dark backgrounds. */
  tone?: 'default' | 'inverted';
  /** Show the short code (RO) instead of the language name. */
  compact?: boolean;
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Language dropdown (disclosure pattern): the items are real links to the equivalent page in
 * each locale, so it works with middle-click/copy-link and keeps the query string.
 */
export function LanguageMenu({
  placement = 'down',
  tone = 'default',
  compact,
  align = 'right',
  className,
}: LanguageMenuProps) {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const current = useLocale();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const items = () => Array.from(root.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      button.current?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => items()[0]?.focus());
      return;
    }
    const links = items();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? links.length - 1
          : (index + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
    links[next]?.focus();
  };

  const inverted = tone === 'inverted';

  return (
    // Keyboard handler on the wrapper only moves focus between its own interactive children.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={root} className={cn('relative', className)} onKeyDown={onKeyDown}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('languageNav')}: ${t(`languages.${current}`)}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2 rounded-md px-3 font-medium transition-colors',
          compact ? 'min-h-10 text-small' : 'min-h-11 text-button',
          inverted ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-grey-100',
        )}
      >
        <GlobeIcon className="size-5" />
        <span aria-hidden="true">
          {compact ? current.toUpperCase() : t(`languages.${current}`)}
        </span>
        <ChevronDownIcon className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <nav
          id={listId}
          aria-label={t('languageNav')}
          className={cn(
            'absolute z-50 min-w-48 rounded-xl border border-line bg-white p-1.5 shadow-card',
            placement === 'down' ? 'top-full mt-2' : 'bottom-full mb-2',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          <ul>
            {LOCALES.map((locale) => {
              const isCurrent = locale === current;
              return (
                <li key={locale}>
                  <Link
                    to={`${alternatePath(pathname, locale)}${search}`}
                    lang={locale}
                    hrefLang={locale}
                    aria-current={isCurrent ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex min-h-11 items-center justify-between gap-4 rounded-md px-3 text-button text-ink-900 hover:bg-grey-100',
                      isCurrent && 'bg-grey-50 font-semibold',
                    )}
                  >
                    {t(`languages.${locale}`)}
                    {isCurrent && <CheckIcon className="size-4 text-burgundy-700" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
