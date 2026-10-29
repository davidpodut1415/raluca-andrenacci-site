import { useTranslation } from 'react-i18next';
import { BlogShowcase } from '../components/blocks/BlogShowcase';
import { CredibilityBar } from '../components/blocks/CredibilityBar';
import { CTAPanel } from '../components/blocks/CTAPanel';
import { HomeHero } from '../components/blocks/HomeHero';
import { MediaCarousel } from '../components/blocks/MediaCarousel';
import { ProgramShowcase } from '../components/blocks/ProgramShowcase';
import { Testimonials } from '../components/blocks/Testimonials';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Eyebrow, Section } from '../components/ui/layout';
import { usePages } from '../lib/usePages';

/** Landing page: hero → partner logos → programs → testimonials → Despre mine → blog → closing CTA. */
export function Home() {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <>
      <Seo description={tp('home.seoDescription')} />
      <HomeHero />
      <CredibilityBar />

      <Section>
        <ProgramShowcase />
      </Section>

      <Section>
        <Eyebrow className="mb-8">{tp('home.testimonials.eyebrow')}</Eyebrow>
        <h2 className="sr-only">{tp('home.testimonials.title')}</h2>
        <Testimonials indexes={[0, 1, 2]} />
      </Section>

      <div className="bg-grey-50 py-12 md:py-16 lg:py-20">
        <MediaCarousel />
      </div>

      <Section>
        <BlogShowcase />
      </Section>

      <CTAPanel
        title={tp('home.cta.title')}
        text={tp('home.cta.text')}
        action={
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" variant="light" size="lg">
            {t('cta.freeSession')}
          </ButtonLink>
        }
      />
    </>
  );
}
