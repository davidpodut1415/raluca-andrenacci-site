import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/blocks/PageHero';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t('notFound.title')} noindex />
      <PageHero title={t('notFound.title')} lead={t('notFound.text')}>
        <div>
          <ButtonLink to={{ key: 'home' }}>{t('notFound.back')}</ButtonLink>
        </div>
      </PageHero>
    </>
  );
}
