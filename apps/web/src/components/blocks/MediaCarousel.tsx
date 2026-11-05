import type { ImageName } from '../../lib/images.generated';
import { usePages } from '../../lib/usePages';
import { Img } from '../ui/Img';
import { LoopVideo } from '../ui/LoopVideo';
import { LocalizedLink } from '../ui/LocalizedLink';
import { CAROUSEL_ITEM, CardCarousel } from './CardCarousel';

interface MediaItem {
  type: 'press' | 'event' | 'video' | 'interview' | 'article';
  source: string;
  title: string;
  image?: ImageName;
  /** Looping clip name in /video; shown instead of the still. */
  video?: string;
  /** External article/video URL; without it the card links to the blog until the real URL is known. */
  href?: string;
}

/**
 * "Despre mine" media-features carousel. Placeholder content: every card links to the blog until
 * the real article/video URLs are collected (docs/00-DECISIONS.md).
 */
export function MediaCarousel({
  title,
  showAll = true,
  dots = true,
}: { title?: string; showAll?: boolean; dots?: boolean } = {}) {
  const { t, items } = usePages();
  const entries = items<MediaItem>('home.media.items');

  return (
    <CardCarousel
      label={t('home.media.label')}
      title={title ?? t('home.media.title')}
      seeAll={showAll ? { to: { key: 'about' }, label: t('home.media.all') } : undefined}
      dots={dots}
      prevLabel={t('home.media.prev')}
      nextLabel={t('home.media.next')}
      goToLabel={(n) => t('home.media.goTo', { n })}
    >
      {entries.map((item) => (
        <li key={item.title} className={CAROUSEL_ITEM}>
          <article className="group relative isolate flex aspect-2/3 flex-col items-center justify-end overflow-hidden rounded-2xl bg-ink-900 px-6 pb-12 text-center text-white transition-transform duration-500 hover:scale-[1.03]">
            {item.video ? (
              <LoopVideo
                name={item.video}
                className="absolute inset-0 -z-20 size-full object-cover"
              />
            ) : (
              item.image && (
                <Img
                  name={item.image}
                  decorative
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 38vw, 72vw"
                  className="absolute inset-0 -z-20 size-full object-cover object-top"
                />
              )
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-black/30 bg-linear-to-t from-black/90 via-black/60 to-transparent"
            />
            <p className="text-eyebrow font-semibold text-white/85 uppercase">
              {t(`home.media.types.${item.type}`)}
            </p>
            <h3 className="mt-3 min-h-[2.5em] font-serif text-h3 leading-tight font-extrabold text-white uppercase">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0"
                  aria-label={`${t('home.media.open')}: ${item.source} — ${item.title}`}
                >
                  {item.source}
                </a>
              ) : (
                <LocalizedLink
                  to={{ key: 'blog' }}
                  className="after:absolute after:inset-0"
                  aria-label={`${t('home.media.open')}: ${item.source} — ${item.title}`}
                >
                  {item.source}
                </LocalizedLink>
              )}
            </h3>
            <p className="mt-4 line-clamp-3 min-h-[4.5em] text-small text-white/90">{item.title}</p>
          </article>
        </li>
      ))}
    </CardCarousel>
  );
}
