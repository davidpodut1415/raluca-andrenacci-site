import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { NumberedList } from '../components/blocks/NumberedList';
import { PageBanner } from '../components/blocks/PageBanner';
import { ProgramTiles } from '../components/blocks/ProgramTiles';
import { StepCards } from '../components/blocks/StepCards';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Eyebrow, Section, SectionHeading } from '../components/ui/layout';
import { ScrollFill } from '../components/ui/ScrollFill';
import { PROGRAM_KEYS, programKeyFromSlug, type ProgramKey } from '../i18n/routes';
import { PROGRAM_IMAGES } from '../lib/programImages';
import { usePages } from '../lib/usePages';
import { NotFoundPage } from './NotFoundPage';

interface Perk {
  title: string;
  text: string;
}

export function ProgramDetailPage() {
  const { slug } = useParams();
  const locale = useLocale();
  const program = programKeyFromSlug(locale, slug);

  if (!program) return <NotFoundPage />;
  return <ProgramDetail program={program} />;
}

/** Program page: photo banner → numbered directions → outcome on black → how we work → (Audit: perks, testimonials) → other programs. */
function ProgramDetail({ program }: { program: ProgramKey }) {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();
  const base = `program.items.${program}`;
  const isAudit = program === 'audit';
  const name = t(`programs.names.${program}`);
  const perks = items<Perk>(`${base}.perks`);
  const others = PROGRAM_KEYS.filter((key) => key !== program && key !== 'audit');

  return (
    <>
      <Seo title={name} description={tp(`${base}.tagline`)} />
      <PageBanner
        image={PROGRAM_IMAGES[program]}
        eyebrow={isAudit ? tp('programsPage.individualEyebrow') : tp('programsPage.familyTitle')}
        title={name}
        lead={tp(`${base}.tagline`)}
      >
        <ButtonLink to={{ key: 'contact' }} search="?type=free-session" variant="light" size="lg">
          {t('cta.freeSession')}
        </ButtonLink>
      </PageBanner>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <ScrollFill as="h2" text={tp(`${base}.directionsTitle`)} className="font-extrabold" />
            {isAudit && <p className="text-ink-700">{tp(`${base}.intro`)}</p>}
          </div>
          <div className="lg:col-span-8">
            <NumberedList items={list(`${base}.directions`)} />
          </div>
        </div>
      </Section>

      <Section tone="black" className="py-20 md:py-28 lg:py-32">
        <Eyebrow className="mb-8 text-white/70">{tp('program.outcomeLabel')}</Eyebrow>
        <p className="max-w-5xl font-serif text-h2 leading-tight font-bold text-white lg:text-display">
          {tp(`${base}.outcome`)}
        </p>
      </Section>

      {perks.length > 0 && (
        <Section>
          <SectionHeading title={tp(`${base}.perksTitle`)} />
          <StepCards steps={perks} columns={3} />
        </Section>
      )}

      <Section>
        <SectionHeading title={tp('program.formatTitle')} />
        <StepCards steps={list('program.formatItems').map((title) => ({ title }))} />
      </Section>

      {isAudit && (
        <Section tone="black" className="py-20 md:py-28 lg:py-32">
          <Eyebrow className="mb-8 text-white/70">{tp('home.testimonials.eyebrow')}</Eyebrow>
          <h2 className="sr-only">{tp('home.testimonials.title')}</h2>
          <Testimonials indexes={[2, 1, 3]} />
        </Section>
      )}

      <Section>
        <SectionHeading title={tp('program.othersTitle')} />
        <ProgramTiles programs={others} />
      </Section>
    </>
  );
}
