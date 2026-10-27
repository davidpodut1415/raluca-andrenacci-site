import { useTranslation } from 'react-i18next';
import { CTABand } from '../components/blocks/CTABand';
import { Faq } from '../components/blocks/Faq';
import { PageHero } from '../components/blocks/PageHero';
import { ProgramCard } from '../components/blocks/ProgramCard';
import { Steps } from '../components/blocks/Steps';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Container, Eyebrow, Section, SectionHeading } from '../components/ui/layout';
import { PROGRAM_KEYS } from '../i18n/routes';
import { usePages } from '../lib/usePages';

const FAMILY_PROGRAMS = PROGRAM_KEYS.filter((key) => key !== 'audit');

interface Item {
  title: string;
  text: string;
}
interface FaqItem {
  q: string;
  a: string;
}

export function ProgramsPage() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();

  return (
    <>
      <Seo title={t('nav.programs')} description={tp('programsPage.seoDescription')} />
      <PageHero
        eyebrow={tp('programsPage.eyebrow')}
        title={tp('programsPage.title')}
        lead={tp('programsPage.lead')}
      />

      <Section>
        <SectionHeading title={tp('programsPage.familyTitle')} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FAMILY_PROGRAMS.map((program) => (
            <li key={program}>
              <ProgramCard program={program} />
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-grey-50 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-2">
            <div className="flex flex-col items-start justify-center gap-6 p-8 sm:p-12 lg:p-16">
              <Eyebrow>{tp('programsPage.individualEyebrow')}</Eyebrow>
              <h2>{t('programs.names.audit')}</h2>
              <p className="text-ink-700">{tp('program.items.audit.tagline')}</p>
              <ButtonLink to={{ key: 'program', program: 'audit' }} variant="secondary" size="lg">
                {tp('home.audit.cta')}
              </ButtonLink>
            </div>
            <div className="relative aspect-3/2 lg:aspect-auto">
              <Img
                name="working-laptop"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading eyebrow={tp('home.process.eyebrow')} title={tp('home.process.title')} />
        <Steps steps={items<Item>('home.process.steps')} />
      </Section>

      <Section tone="muted">
        <SectionHeading title={tp('programsPage.faq.title')} />
        <Faq items={items<FaqItem>('programsPage.faq.items')} />
      </Section>

      <CTABand
        title={tp('home.cta.title')}
        text={tp('home.cta.text')}
        action={
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
            {t('cta.freeSession')}
          </ButtonLink>
        }
      />
    </>
  );
}
