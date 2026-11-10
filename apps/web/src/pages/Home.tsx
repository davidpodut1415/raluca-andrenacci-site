import { useTranslation } from 'react-i18next';
import { CredibilityBar } from '../components/blocks/CredibilityBar';
import { Seo } from '../components/Seo';
import {
  BlogTilesGrid,
  PageIntro,
  PressTiles,
  ProgramTilesGrid,
  QuoteTiles,
  SeeAll,
  StatTiles,
} from '../components/tiles/Sections';
import { SectionLabel } from '../components/tiles/Tiles';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { PROGRAM_KEYS } from '../i18n/routes';
import { usePages } from '../lib/usePages';

/** Landing page: intro → partner logos → programs → testimonials → numbers → press → blog. All tiles. */
export function Home() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();

  return (
    <>
      <Seo description={tp('home.seoDescription')} />
      <PageIntro
        eyebrow={tp('home.hero.eyebrow')}
        title={tp('home.hero.title')}
        lead={tp('home.hero.lead')}
      >
        <ul className="flex flex-col gap-1 text-small">
          {list('home.hero.trust').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PageIntro>

      <CredibilityBar />

      <div className="mt-16 flex flex-col gap-16">
        <section>
          <SectionLabel
            title={tp('home.programs.title')}
            action={<SeeAll to="programs" label={t('shell.seeAll')} />}
          />
          <ProgramTilesGrid
            programs={PROGRAM_KEYS.filter((key) => key !== 'audit')}
            extra={
              <LocalizedLink
                to={{ key: 'programs' }}
                className="flex h-full min-h-48 items-end justify-between bg-black p-3 text-h3 font-extrabold text-white hover:bg-ink-700 md:p-4"
              >
                {t('nav.allPrograms')}
                <span aria-hidden="true">→</span>
              </LocalizedLink>
            }
          />
        </section>

        <section>
          <SectionLabel title={tp('home.testimonials.eyebrow')} />
          <QuoteTiles />
        </section>

        <section>
          <StatTiles stats={items<{ value: string; label: string }>('about.stats')} />
        </section>

        <section>
          <SectionLabel
            title={tp('home.media.title')}
            action={<SeeAll to="about" label={tp('home.media.all')} />}
          />
          <PressTiles />
        </section>

        <section>
          <SectionLabel
            title={tp('home.blog.title')}
            action={<SeeAll to="blog" label={tp('home.blog.all')} />}
          />
          <BlogTilesGrid />
        </section>
      </div>
    </>
  );
}
