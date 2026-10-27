import { useTranslation } from 'react-i18next';
import { TitledPlaceholder } from './PlaceholderPage';

/** Placeholder until the blog API exists (Phase 5). */
export function PostPage() {
  const { t } = useTranslation();
  return <TitledPlaceholder title={t('nav.blog')} />;
}
