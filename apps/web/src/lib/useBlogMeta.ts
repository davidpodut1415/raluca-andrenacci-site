import { useLocale } from '../app/LocaleContext';
import type { CategoryKey } from '../content/blog';
import { formatMonthYear } from './formatDate';
import { usePages } from './usePages';

/** Localized labels for blog categories and dates. */
export function useBlogMeta() {
  const { t } = usePages();
  const locale = useLocale();
  return {
    category: (key: CategoryKey) => t(`blogCategories.${key}`),
    date: (iso: string) => formatMonthYear(iso, locale),
  };
}
