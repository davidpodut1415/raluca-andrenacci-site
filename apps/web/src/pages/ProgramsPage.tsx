import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { PageIntro, ProgramTilesGrid } from '../components/tiles/Sections';
import { SectionLabel } from '../components/tiles/Tiles';
import { PROGRAM_KEYS } from '../i18n/routes';
import { usePages } from '../lib/usePages';

const FAMILY = PROGRAM_KEYS.filter((key) => key !== 'audit');

/** Programs overview: the family-business programs first, the individual audit as its own block. */
export function ProgramsPage() {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <>
      <Seo title={t('nav.programs')} description={tp('programsPage.seoDescription')} />
      <PageIntro title={tp('programsPage.eyebrow')} lead={tp('programsPage.lead')} />

      <div className="flex flex-col gap-16">
        <section>
          <SectionLabel title={tp('programsPage.familyTitle')} />
          <ProgramTilesGrid programs={FAMILY} />
        </section>
        <section>
          <SectionLabel title={tp('programsPage.individualEyebrow')} />
          <ProgramTilesGrid programs={['audit']} />
        </section>
      </div>
    </>
  );
}
