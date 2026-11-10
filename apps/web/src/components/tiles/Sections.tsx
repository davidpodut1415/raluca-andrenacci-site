import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { POSTS, type BlogPostData } from '../../content/blog';
import { PROGRAM_KEYS, type ProgramKey } from '../../i18n/routes';
import type { ImageName } from '../../lib/images.generated';
import { PROGRAM_IMAGES } from '../../lib/programImages';
import { useBlogMeta } from '../../lib/useBlogMeta';
import { usePages } from '../../lib/usePages';
import { BlogImg } from '../ui/BlogImg';
import { Img } from '../ui/Img';
import { LocalizedLink } from '../ui/LocalizedLink';
import { Box, Tile, TextTile, TileGrid } from './Tiles';

const TILE_SIZES = '(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw';

/** "See all" link that sits inside a section label cell. */
export function SeeAll({ to, label }: { to: 'programs' | 'blog' | 'about'; label: string }) {
  return (
    <LocalizedLink
      to={{ key: to }}
      className="inline-flex min-h-11 items-center text-small font-bold text-white underline-offset-4 hover:underline"
    >
      {label} →
    </LocalizedLink>
  );
}

/** Page opener: a black title cell beside an outlined lead box. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6 grid gap-0.5 lg:grid-cols-3">
      <div className="bg-black p-3 text-white md:p-4 lg:col-span-2">
        {eyebrow && <p className="mb-3 text-small font-medium text-white/80">{eyebrow}</p>}
        <h1 className="text-display text-white">{title}</h1>
      </div>
      {(lead || children) && (
        <Box className="flex flex-col justify-between gap-4">
          {lead && <p>{lead}</p>}
          {children}
        </Box>
      )}
    </header>
  );
}

/** One tile per program; the flagship (first) carries the yellow badge. */
export function ProgramTilesGrid({
  programs = PROGRAM_KEYS,
  extra,
}: {
  programs?: readonly ProgramKey[];
  /** Extra last cell, e.g. a "see all" tile that completes the grid. */
  extra?: ReactNode;
}) {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  return (
    <TileGrid>
      {programs.map((program, i) => (
        <li key={program}>
          <Tile
            to={{ key: 'program', program }}
            meta={t(`programs.names.${program}`)}
            title={tp(`program.items.${program}.summary`)}
            badge={i === 0 && program === PROGRAM_KEYS[0] ? t('shell.featured') : undefined}
            media={
              <Img
                name={PROGRAM_IMAGES[program]}
                decorative
                sizes={TILE_SIZES}
                className="size-full object-cover object-top"
              />
            }
          />
        </li>
      ))}
      {extra && <li>{extra}</li>}
    </TileGrid>
  );
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Quotes as black text tiles. */
export function QuoteTiles({ indexes = [0, 1, 2] }: { indexes?: number[] }) {
  const { items } = usePages();
  const all = items<Testimonial>('testimonials.items');
  return (
    <TileGrid>
      {indexes.map((i) => {
        const item = all[i];
        if (!item) return null;
        return (
          <li key={item.name}>
            <TextTile className="flex h-full min-h-72 flex-col justify-between gap-8">
              <blockquote className="text-h3 font-bold">“{item.quote}”</blockquote>
              <p className="text-small font-medium text-white/80">
                {item.name}, {item.role}
              </p>
            </TextTile>
          </li>
        );
      })}
    </TileGrid>
  );
}

/** Numbers as boxed cells. */
export function StatTiles({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-0.5 lg:grid-cols-4">
      {stats.map((stat) => (
        <Box key={stat.label} className="flex min-h-48 flex-col justify-between gap-6">
          <dt className="order-2 text-small">{stat.label}</dt>
          <dd className="text-display font-extrabold">{stat.value}</dd>
        </Box>
      ))}
    </dl>
  );
}

interface MediaItem {
  type: string;
  source: string;
  title: string;
  image?: ImageName;
  href?: string;
}

/** Press and media features as tiles (external links open in a new tab). */
export function PressTiles() {
  const { items } = usePages();
  const entries = items<MediaItem>('home.media.items');
  return (
    <TileGrid>
      {entries.map((item) => (
        <li key={item.title}>
          <Tile
            title={item.title}
            meta={item.source}
            href={item.href}
            to={item.href ? undefined : { key: 'blog' }}
            media={
              item.image ? (
                <Img
                  name={item.image}
                  decorative
                  sizes={TILE_SIZES}
                  className="size-full object-cover object-top"
                />
              ) : undefined
            }
          />
        </li>
      ))}
    </TileGrid>
  );
}

export function BlogTile({ post }: { post: BlogPostData }) {
  const meta = useBlogMeta();
  return (
    <Tile
      to={{ key: 'post', slug: post.slug }}
      meta={`${meta.category(post.category)} · ${meta.date(post.date)}`}
      title={post.title}
      media={
        <BlogImg
          image={post.cover}
          sizes={TILE_SIZES}
          className="size-full object-cover object-top"
        />
      }
    />
  );
}

export function BlogTilesGrid({ posts = POSTS.slice(0, 3) }: { posts?: BlogPostData[] }) {
  return (
    <TileGrid>
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogTile post={post} />
        </li>
      ))}
    </TileGrid>
  );
}

/** Article-style block: a black label cell on the left, content on the right (two thirds). */
export function ArticleSection({
  title,
  children,
  as: Tag = 'h2',
}: {
  title: string;
  children: ReactNode;
  as?: 'h2' | 'h3';
}) {
  return (
    <section className="mt-16 grid items-start gap-0.5 lg:grid-cols-3">
      <div className="bg-black p-2 text-white lg:sticky lg:top-1.5">
        <Tag className="text-h3 text-white">{title}</Tag>
      </div>
      <div className="lg:col-span-2">{children}</div>
    </section>
  );
}

/** Numbered rows: a black number cell beside an outlined text cell. */
export function NumberedRows({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[3rem_1fr] gap-0.5">
          <span aria-hidden="true" className="flex items-start bg-black p-2 font-bold text-white">
            {String(i + 1).padStart(2, '0')}
          </span>
          <Box className="p-2 md:p-3">{item}</Box>
        </li>
      ))}
    </ol>
  );
}

/** Outlined cells with an optional bold title, in a responsive grid. */
export function BoxGrid({
  items,
  columns = 2,
}: {
  items: { title: string; text?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <ul className={`grid gap-0.5 sm:grid-cols-2 ${columns === 3 ? 'xl:grid-cols-3' : ''}`}>
      {items.map((item) => (
        <li key={item.title}>
          <Box className="h-full">
            <p className="font-extrabold">{item.title}</p>
            {item.text && <p className="mt-2 text-ink-700">{item.text}</p>}
          </Box>
        </li>
      ))}
    </ul>
  );
}
