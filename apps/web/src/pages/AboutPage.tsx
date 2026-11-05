import { useTranslation } from 'react-i18next';
import { FeatureSplit } from '../components/blocks/FeatureSplit';
import { NumberedList } from '../components/blocks/NumberedList';
import { AboutHero } from '../components/blocks/AboutHero';
import { QuoteBand } from '../components/blocks/QuoteBand';
import { StatsStagger } from '../components/blocks/StatsStagger';
import { MediaCarousel } from '../components/blocks/MediaCarousel';
import { Seo } from '../components/Seo';
import { Img } from '../components/ui/Img';
import { FullBleedSection, Section } from '../components/ui/layout';
import { ScrollFill } from '../components/ui/ScrollFill';
import { usePages } from '../lib/usePages';

interface Stat {
  value: string;
  label: string;
}

/** About: split opener → story → numbers → credentials + certificate → public presence → testimonials. */
export function AboutPage() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();
  const testimonial = items<{ quote: string; name: string; role: string }>('testimonials.items')[2];

  return (
    <>
      <Seo title={t('nav.about')} description={tp('about.seoDescription')} />
      <AboutHero eyebrow={tp('about.eyebrow')} title={tp('home.about.title')} />

      <Section>
        <FeatureSplit title={tp('about.storyTitle')} image="library-chairs" reverse>
          <div className="flex max-w-prose flex-col gap-5 text-ink-700">
            {list('about.bio').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FeatureSplit>
      </Section>

      <QuoteBand
        image="pro-closeup"
        quote={testimonial?.quote ?? ''}
        name={testimonial?.name ?? ''}
        role={testimonial?.role}
      />

      <StatsStagger stats={items<Stat>('about.stats')} />

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

      <FullBleedSection>
        <MediaCarousel title={tp('about.pressTitle')} showAll={false} dots={false} />
      </FullBleedSection>
    </>
  );
}
