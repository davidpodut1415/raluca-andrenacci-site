import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import type { ImageName } from '../../lib/images.generated';
import { usePages } from '../../lib/usePages';
import { ChevronDownIcon, ChevronRightIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import { LocalizedLink } from '../ui/LocalizedLink';

interface MediaItem {
  type: 'press' | 'event' | 'video' | 'interview' | 'article';
  source: string;
  title: string;
  image: ImageName;
}

const roundButton =
  'inline-flex size-12 items-center justify-center rounded-full bg-ink-900 text-white transition-opacity hover:bg-ink-700 disabled:opacity-30 disabled:hover:bg-ink-900';

/**
 * "Featured in the media" carousel (scroll-snap). Placeholder content: every card links to the
 * blog until the real article/video URLs are collected (docs/00-DECISIONS.md).
 */
export function MediaCarousel() {
  const { t, items } = usePages();
  const entries = items<MediaItem>('home.media.items');
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const total = el.clientWidth
      ? Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05))
      : 1;
    const max = el.scrollWidth - el.clientWidth;
    setPages(total);
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (total - 1)));
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const behavior = (): ScrollBehavior =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  const scrollByPage = (direction: 1 | -1) =>
    track.current?.scrollBy?.({
      left: direction * track.current.clientWidth * 0.9,
      behavior: behavior(),
    });

  const goTo = (index: number) => {
    const el = track.current;
    if (!el?.scrollTo) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: pages > 1 ? (max * index) / (pages - 1) : 0, behavior: behavior() });
  };

  return (
    <section aria-roledescription="carousel" aria-label={t('home.media.label')}>
      <div>
        <div className="mb-8 flex items-center justify-between gap-6 px-5 sm:px-8 md:mb-10 lg:px-10">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="font-extrabold">{t('home.media.title')}</h2>
            <LocalizedLink
              to={{ key: 'about' }}
              className="inline-flex items-center gap-1 font-medium text-ink-500 hover:text-ink-900"
            >
              {t('home.media.all')}
              <ChevronRightIcon className="size-4" />
            </LocalizedLink>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              aria-label={t('home.media.prev')}
              disabled={edges.start}
              onClick={() => scrollByPage(-1)}
              className={roundButton}
            >
              <ChevronDownIcon className="size-5 rotate-90" />
            </button>
            <button
              type="button"
              aria-label={t('home.media.next')}
              disabled={edges.end}
              onClick={() => scrollByPage(1)}
              className={roundButton}
            >
              <ChevronDownIcon className="size-5 -rotate-90" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          onScroll={measure}
          className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {entries.map((item) => (
            <li key={item.title} className="w-[72vw] shrink-0 snap-start sm:w-[38vw] lg:w-[21.4vw]">
              <article className="group relative isolate flex aspect-2/3 flex-col items-center justify-end overflow-hidden rounded-2xl bg-ink-900 px-6 pb-12 text-center text-white">
                <Img
                  name={item.image}
                  decorative
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 38vw, 72vw"
                  className="absolute inset-0 -z-20 size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-black/30 bg-linear-to-t from-black/90 via-black/60 to-transparent"
                />
                <p className="text-eyebrow font-semibold text-white/85 uppercase">
                  {t(`home.media.types.${item.type}`)}
                </p>
                <h3 className="mt-3 font-serif text-h3 leading-tight font-extrabold text-white uppercase">
                  <LocalizedLink
                    to={{ key: 'blog' }}
                    className="after:absolute after:inset-0"
                    aria-label={`${t('home.media.open')}: ${item.source} — ${item.title}`}
                  >
                    {item.source}
                  </LocalizedLink>
                </h3>
                <p className="mt-4 text-small text-white/90">{item.title}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-2" role="group">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={t('home.media.goTo', { n: i + 1 })}
              aria-current={i === page ? 'true' : undefined}
              onClick={() => goTo(i)}
              className="inline-flex size-6 items-center justify-center"
            >
              <span
                className={cn('size-2 rounded-full', i === page ? 'bg-ink-900' : 'bg-ink-500/40')}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
