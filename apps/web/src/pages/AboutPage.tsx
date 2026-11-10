import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import {
  ArticleSection,
  NumberedRows,
  PressTiles,
  QuoteTiles,
  StatTiles,
} from '../components/tiles/Sections';
import { Box, Cell, SectionLabel } from '../components/tiles/Tiles';
import { Img } from '../components/ui/Img';
import { usePages } from '../lib/usePages';

interface Stat {
  value: string;
  label: string;
}

/** About: article-style opener (cells beside a large photo) → story → numbers → quote → credentials → press. */
export function AboutPage() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();

  return (
    <>
      <Seo title={t('nav.about')} description={tp('about.seoDescription')} />

      <header className="grid gap-0.5 lg:grid-cols-3">
        <div className="flex flex-col gap-0.5">
          <Cell>{tp('about.eyebrow')}</Cell>
          <Box className="flex-1">
            <h1 className="text-display">{tp('home.about.title')}</h1>
            <p className="mt-4">{tp('about.lead')}</p>
          </Box>
        </div>
        <div className="aspect-4/5 overflow-hidden bg-black lg:col-span-2 lg:aspect-auto lg:min-h-[32rem]">
          <Img
            name="event-mic"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="size-full object-cover object-center"
          />
        </div>
      </header>

      <ArticleSection title={tp('about.storyTitle')}>
        <div className="flex flex-col gap-0.5">
          <Box className="flex flex-col gap-4">
            {list('about.bio').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Box>
          <div className="aspect-3/2 overflow-hidden bg-black">
            <Img
              name="library-chairs"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      </ArticleSection>

      <section className="mt-16">
        <StatTiles stats={items<Stat>('about.stats')} />
      </section>

      <section className="mt-16">
        <QuoteTiles indexes={[2]} />
      </section>

      <ArticleSection title={tp('about.credentialsTitle')}>
        <div className="grid gap-0.5 xl:grid-cols-2">
          <NumberedRows items={list('about.credentials')} />
          <Box className="self-start">
            <Img
              name="certificate-emcc"
              sizes="(min-width: 1280px) 25vw, 100vw"
              className="w-full"
            />
          </Box>
        </div>
      </ArticleSection>

      <section className="mt-16">
        <SectionLabel title={tp('about.pressTitle')} />
        <PressTiles />
      </section>
    </>
  );
}
