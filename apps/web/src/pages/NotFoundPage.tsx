import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t('notFound.title')} noindex />
      <PageHeader title={t('notFound.title')} lead={t('notFound.text')}>
        <ButtonLink to={{ key: 'home' }} size="lg">
          {t('notFound.back')}
        </ButtonLink>
      </PageHeader>
    </>
  );
}
