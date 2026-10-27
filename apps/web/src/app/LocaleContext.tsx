import { DEFAULT_LOCALE, type Locale } from '@raluca/shared';
import { createContext, useContext } from 'react';

export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
