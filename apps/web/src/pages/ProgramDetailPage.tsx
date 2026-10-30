import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { CheckList } from '../components/blocks/CheckList';
import { CTABand } from '../components/blocks/CTABand';
import { PageHero } from '../components/blocks/PageHero';
import { ProgramCard } from '../components/blocks/ProgramCard';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Card, Eyebrow, Section, SectionHeading } from '../components/ui/layout';
import { PROGRAM_KEYS, programKeyFromSlug } from '../i18n/routes';
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

function ProgramDetail({ program }: { program: (typeof PROGRAM_KEYS)[number] }) {
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
      <PageHero
        eyebrow={isAudit ? tp('programsPage.individualEyebrow') : tp('programsPage.familyTitle')}
        title={name}
        lead={tp(`${base}.tagline`)}
      >
        <div>
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
            {t('cta.freeSession')}
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {isAudit && <p className="mb-8 max-w-prose text-ink-700">{tp(`${base}.intro`)}</p>}
            <h2 className="mb-8 text-h3">{tp(`${base}.directionsTitle`)}</h2>
            <CheckList items={list(`${base}.directions`)} />
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-xl bg-grey-100 p-8 md:p-10">
              <p className="text-eyebrow font-semibold text-burgundy-700 uppercase">
                {tp('program.outcomeLabel')}
              </p>
              <p className="mt-4 font-serif text-h3 leading-snug text-ink-900">
                {tp(`${base}.outcome`)}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {perks.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={tp(`${base}.perksTitle`)} />
          <ul className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {perks.map((perk) => (
              <li key={perk.title}>
                <Card className="h-full">
                  <h3 className="text-h4">{perk.title}</h3>
                  <p className="mt-3 text-ink-500">{perk.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone={perks.length > 0 ? 'light' : 'muted'}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="mb-8 text-h3">{tp('program.formatTitle')}</h2>
            <CheckList items={list('program.formatItems')} />
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl">
              <Img
                name="mentoring-session"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-3/2 w-full object-cover"
              />
            </div>
          </div>
        </div>
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
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {others.map((key) => (
            <li key={key}>
              <ProgramCard program={key} />
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        title={tp('program.ctaTitle')}
        text={tp('program.ctaText')}
        action={
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
            {t('cta.freeSession')}
          </ButtonLink>
        }
      />
    </>
  );
}
