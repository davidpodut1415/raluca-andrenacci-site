import { useTranslation } from 'react-i18next';
import { Faq } from '../components/blocks/Faq';
import { FeatureSplit } from '../components/blocks/FeatureSplit';
import { PageBanner } from '../components/blocks/PageBanner';
import { StatsBand } from '../components/blocks/StatsBand';
import { StepCards } from '../components/blocks/StepCards';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Section, SectionHeading } from '../components/ui/layout';
import { PROGRAM_KEYS } from '../i18n/routes';
import { PROGRAM_IMAGES } from '../lib/programImages';
import { usePages } from '../lib/usePages';

const FAMILY_PROGRAMS = PROGRAM_KEYS.filter((key) => key !== 'audit');

interface Item {
  title: string;
  text: string;
}
interface Stat {
  value: string;
  label: string;
}
interface FaqItem {
  q: string;
  a: string;
}

/** Programs overview: photo banner → intro → one "Part" block per program → facts → individual track → how we work → FAQ. */
export function ProgramsPage() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();

  return (
    <>
      <Seo title={t('nav.programs')} description={tp('programsPage.seoDescription')} />
      <PageBanner
        image="desk-notebook"
        title={tp('programsPage.eyebrow')}
        lead={tp('programsPage.title')}
        position="center 30%"
      />

      <Section className="pb-0 md:pb-0 lg:pb-0">
        <SectionHeading
          title={tp('programsPage.familyTitle')}
          lead={tp('programsPage.lead')}
          className="mb-0 md:mb-0"
        />
      </Section>

      {FAMILY_PROGRAMS.map((program, i) => (
        <Section key={program}>
          <FeatureSplit
            number={String(i + 1).padStart(2, '0')}
            title={t(`programs.names.${program}`)}
            image={PROGRAM_IMAGES[program]}
            reverse={i % 2 === 1}
          >
            <p className="max-w-prose text-ink-700">{tp(`program.items.${program}.tagline`)}</p>
            <p className="max-w-prose font-serif text-h4 leading-snug font-semibold text-ink-900">
              {tp(`program.items.${program}.outcome`)}
            </p>
            <ButtonLink to={{ key: 'program', program }} variant="secondary" size="lg">
              {tp('home.programs.learnMore')}
            </ButtonLink>
          </FeatureSplit>
        </Section>
      ))}

      <StatsBand stats={items<Stat>('programsPage.stats')} />

      <Section>
        <FeatureSplit
          eyebrow={tp('programsPage.individualEyebrow')}
          title={t('programs.names.audit')}
          image={PROGRAM_IMAGES.audit}
        >
          <p className="max-w-prose text-ink-700">{tp('program.items.audit.tagline')}</p>
          <ButtonLink to={{ key: 'program', program: 'audit' }} variant="secondary" size="lg">
            {tp('home.audit.cta')}
          </ButtonLink>
        </FeatureSplit>
      </Section>

      <Section>
        <SectionHeading eyebrow={tp('home.process.eyebrow')} title={tp('programsPage.howTitle')} />
        <StepCards steps={items<Item>('home.process.steps')} />
      </Section>

      <Section>
        <SectionHeading title={tp('programsPage.faq.title')} />
        <Faq items={items<FaqItem>('programsPage.faq.items')} />
      </Section>
    </>
  );
}
