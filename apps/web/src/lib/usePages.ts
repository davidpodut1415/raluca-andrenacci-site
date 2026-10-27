import { useTranslation } from 'react-i18next';

/** `pages` namespace helpers for arrays of strings / objects stored in the locale files. */
export function usePages() {
  const { t } = useTranslation('pages');

  const items = <T>(key: string): T[] => {
    const value = t(key, { returnObjects: true }) as unknown;
    return Array.isArray(value) ? (value as T[]) : [];
  };

  return { t, list: (key: string) => items<string>(key), items };
}
