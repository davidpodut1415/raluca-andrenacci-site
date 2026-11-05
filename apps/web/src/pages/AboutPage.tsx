import { useTranslation } from 'react-i18next';
import { FeatureSplit } from '../components/blocks/FeatureSplit';
import { NumberedList } from '../components/blocks/NumberedList';
import { PageBanner } from '../components/blocks/PageBanner';
import { StatsBand } from '../components/blocks/StatsBand';
import { StepCards } from '../components/blocks/StepCards';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { Img } from '../components/ui/Img';
import { Eyebrow, Section } from '../components/ui/layout';
import { ScrollFill } from '../components/ui/ScrollFill';
import { usePages } from '../lib/usePages';

interface Stat {
  value: string;
  label: string;
}

/** About: photo banner → story → numbers → credentials + certificate → public presence → testimonials. */
export function AboutPage() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();

  return (
    <>
      <Seo title={t('nav.about')} description={tp('about.seoDescription')} />
      <PageBanner
        image="portrait-leaning"
        eyebrow={tp('about.eyebrow')}
        title={tp('about.title')}
        lead={tp('about.lead')}
        position="center 12%"
      />

      <Section>
        <FeatureSplit title={tp('about.storyTitle')} image="portrait-headshot" reverse>
          <div className="flex max-w-prose flex-col gap-5 text-ink-700">
            {list('about.bio').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FeatureSplit>
      </Section>

      <StatsBand stats={items<Stat>('about.stats')} />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <ScrollFill as="h2" text={tp('about.credentialsTitle')} className="font-extrabold" />
            <NumberedList items={list('about.credentials')} />
          </div>
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-card">
              <Img
                name="certificate-emcc"
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-8 flex max-w-3xl flex-col gap-4 md:mb-12">
          <Eyebrow>{tp('about.pressTitle')}</Eyebrow>
          <p className="font-serif text-h3 leading-snug font-semibold text-ink-900">
            {tp('about.pressText')}
          </p>
        </div>
        <StepCards steps={list('about.pressItems').map((title) => ({ title }))} numbered={false} />
      </Section>

      <Section tone="black" className="py-20 md:py-28 lg:py-32">
        <Eyebrow className="mb-8 text-white/70">{tp('home.testimonials.eyebrow')}</Eyebrow>
        <h2 className="sr-only">{tp('home.testimonials.title')}</h2>
        <Testimonials indexes={[0, 1, 2]} />
      </Section>
    </>
  );
}
