import { BlogShowcase } from '../components/blocks/BlogShowcase';
import { CredibilityBar } from '../components/blocks/CredibilityBar';
import { HomeHero } from '../components/blocks/HomeHero';
import { MediaCarousel } from '../components/blocks/MediaCarousel';
import { StatsStagger } from '../components/blocks/StatsStagger';
import { ProgramShowcase } from '../components/blocks/ProgramShowcase';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { Container, Eyebrow, FullBleedSection, Section } from '../components/ui/layout';
import { usePages } from '../lib/usePages';

/** Landing page: hero → partner logos → programs → testimonials → Despre mine → blog → closing CTA (the CTA lives in the layout). */
export function Home() {
  const { t: tp, items } = usePages();

  return (
    <>
      <Seo description={tp('home.seoDescription')} />
      <HomeHero />
      <CredibilityBar />

      {/* Exactly one screen tall on desktop (below the sticky header): nothing to scroll inside it. */}
      <section className="bg-grey-50 py-12 md:py-16 lg:flex lg:h-[calc(100svh-4rem)] lg:min-h-[32rem] lg:items-center lg:py-0">
        <Container className="w-full">
          <ProgramShowcase />
        </Container>
      </section>

      <Section tone="black" className="relative isolate overflow-hidden">
        <Eyebrow className="mb-8 text-white/70">{tp('home.testimonials.eyebrow')}</Eyebrow>
        <h2 className="sr-only">{tp('home.testimonials.title')}</h2>
        <Testimonials
          indexes={[0, 1, 2]}
          backgrounds={['event-stage', 'event-mic', 'library-chairs']}
        />
      </Section>

      <StatsStagger stats={items<{ value: string; label: string }>('about.stats')} />

      <FullBleedSection>
        <MediaCarousel />
      </FullBleedSection>

      <Section>
        <BlogShowcase />
      </Section>
    </>
  );
}
