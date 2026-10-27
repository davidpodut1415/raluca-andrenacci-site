import type { Locale } from '@raluca/shared';
import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../app/LocaleContext';
import { buildPath, type RouteTarget } from '../../i18n/routes';

export interface LocalizedLinkProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  to: RouteTarget;
  /** Defaults to the locale of the current page. */
  locale?: Locale;
  /** Query string including the leading `?`, e.g. `?type=free-session`. */
  search?: string;
  hash?: string;
}

/** Link to a route key; the URL is resolved from the localized route table. */
export function LocalizedLink({ to, locale, search = '', hash = '', ...rest }: LocalizedLinkProps) {
  const current = useLocale();
  return <Link to={`${buildPath(locale ?? current, to)}${search}${hash}`} {...rest} />;
}
