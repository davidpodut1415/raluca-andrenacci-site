import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { Seo } from '../components/Seo';
import {
  ArticleSection,
  BoxGrid,
  NumberedRows,
  ProgramTilesGrid,
  QuoteTiles,
} from '../components/tiles/Sections';
import { Box, Cell, SectionLabel, TextTile } from '../components/tiles/Tiles';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
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

/**
 * Program page laid out like the reference's article page: a column of cells (kind, outlined title
 * and tagline, action) beside a large photo, then labelled blocks for directions, outcome, perks and format.
 */
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

      <header className="grid gap-0.5 lg:grid-cols-3">
        <div className="flex flex-col gap-0.5">
          <Cell>
            {isAudit ? tp('programsPage.individualEyebrow') : tp('programsPage.familyTitle')}
          </Cell>
          <Box className="flex-1">
            <h1 className="text-display">{name}</h1>
            <p className="mt-4">{tp(`${base}.tagline`)}</p>
            {isAudit && <p className="mt-4 text-ink-700">{tp(`${base}.intro`)}</p>}
          </Box>
          <LocalizedLink
            to={{ key: 'contact' }}
            search="?type=free-session"
            className="flex min-h-14 items-center justify-between bg-badge px-2 py-3 text-h4 font-extrabold text-black hover:brightness-95"
          >
            {t('cta.freeSession')}
            <span aria-hidden="true">→</span>
          </LocalizedLink>
        </div>
        <div className="aspect-4/5 overflow-hidden bg-black lg:col-span-2 lg:aspect-auto lg:min-h-[32rem]">
          <Img
            name={PROGRAM_IMAGES[program]}
            decorative
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="size-full object-cover object-top"
          />
        </div>
      </header>

      <ArticleSection title={tp(`${base}.directionsTitle`)}>
        <NumberedRows items={list(`${base}.directions`)} />
      </ArticleSection>

      <ArticleSection title={tp('program.outcomeLabel')}>
        <TextTile>
          <p className="text-h2 font-bold">{tp(`${base}.outcome`)}</p>
        </TextTile>
      </ArticleSection>

      {perks.length > 0 && (
        <ArticleSection title={tp(`${base}.perksTitle`)}>
          <BoxGrid items={perks} columns={3} />
        </ArticleSection>
      )}

      <ArticleSection title={tp('program.formatTitle')}>
        <BoxGrid items={list('program.formatItems').map((title) => ({ title }))} />
      </ArticleSection>

      {isAudit && (
        <ArticleSection title={tp('home.testimonials.eyebrow')}>
          <QuoteTiles indexes={[2, 1, 3]} />
        </ArticleSection>
      )}

      <section className="mt-16">
        <SectionLabel title={tp('program.othersTitle')} />
        <ProgramTilesGrid programs={others.slice(0, 3)} />
      </section>
    </>
  );
}
