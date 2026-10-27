import { useTranslation } from 'react-i18next';
import { CredibilityBar } from '../components/blocks/CredibilityBar';
import { CTABand } from '../components/blocks/CTABand';
import { HomeHero } from '../components/blocks/HomeHero';
import { ProgramCard } from '../components/blocks/ProgramCard';
import { Steps } from '../components/blocks/Steps';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Card, Container, Eyebrow, Section, SectionHeading } from '../components/ui/layout';
import { PROGRAM_KEYS } from '../i18n/routes';
import { usePages } from '../lib/usePages';

const FAMILY_PROGRAMS = PROGRAM_KEYS.filter((key) => key !== 'audit');

interface Item {
  title: string;
  text: string;
}

export function Home() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();

  return (
    <>
      <Seo description={tp('home.seoDescription')} />
      <HomeHero />
      <CredibilityBar />

      <Section tone="muted">
        <SectionHeading
          eyebrow={tp('home.challenge.eyebrow')}
          title={tp('home.challenge.title')}
          lead={tp('home.challenge.lead')}
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {items<Item>('home.challenge.items').map((item) => (
            <li key={item.title}>
              <Card className="h-full">
                <h3 className="text-h4">{item.title}</h3>
                <p className="mt-3 text-ink-500">{item.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={tp('home.programs.eyebrow')}
          title={tp('home.programs.title')}
          lead={tp('home.programs.lead')}
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FAMILY_PROGRAMS.map((program) => (
            <li key={program}>
              <ProgramCard program={program} />
            </li>
          ))}
        </ul>
        <div className="mt-8 md:mt-12">
          <ButtonLink to={{ key: 'programs' }} variant="secondary" size="lg">
            {tp('home.programs.cta')}
          </ButtonLink>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={tp('home.process.eyebrow')} title={tp('home.process.title')} />
        <Steps steps={items<Item>('home.process.steps')} />
      </Section>

      <Section>
        <Eyebrow className="mb-8">{tp('home.testimonials.eyebrow')}</Eyebrow>
        <h2 className="sr-only">{tp('home.testimonials.title')}</h2>
        <Testimonials indexes={[0, 1, 2]} />
      </Section>

      <section className="bg-grey-50 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-2">
            <div className="relative aspect-3/2 lg:aspect-auto">
              <Img
                name="desk-notebook"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-6 p-8 sm:p-12 lg:p-16">
              <Eyebrow>{tp('home.audit.eyebrow')}</Eyebrow>
              <h2>{tp('home.audit.title')}</h2>
              <p className="text-ink-700">{tp('home.audit.text')}</p>
              <ButtonLink to={{ key: 'program', program: 'audit' }} variant="secondary" size="lg">
                {tp('home.audit.cta')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl">
              <Img
                name="portrait-headshot"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <Eyebrow>{tp('home.about.eyebrow')}</Eyebrow>
            <h2>{tp('home.about.title')}</h2>
            <p className="max-w-prose text-ink-700">{tp('home.about.text')}</p>
            <ButtonLink to={{ key: 'about' }} variant="secondary" size="lg">
              {tp('home.about.cta')}
            </ButtonLink>
          </div>
        </div>
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
