import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronDownIcon, ChevronRightIcon } from '../ui/icons';
import { LocalizedLink } from '../ui/LocalizedLink';
import type { RouteTarget } from '../../i18n/routes';

/** Width classes for a card inside <CardCarousel> (about 4.4 cards visible on desktop). */
export const CAROUSEL_ITEM = 'w-[72vw] shrink-0 snap-start sm:w-[38vw] lg:w-[21.4vw]';

interface CardCarouselProps {
  label: string;
  title: string;
  /** Optional muted link next to the title. */
  seeAll?: { to: RouteTarget; label: string };
  prevLabel: string;
  nextLabel: string;
  /** Dot label with `{{n}}` already interpolated by the caller. */
  goToLabel: (n: number) => string;
  /** Show the page dots under the track (default true). */
  dots?: boolean;
  /** <li> cards, each using CAROUSEL_ITEM. */
  children: ReactNode;
}

const roundButton =
  'inline-flex size-12 items-center justify-center rounded-full bg-ink-900 text-white hover-zoom hover:bg-ink-700 disabled:opacity-30 disabled:hover:bg-ink-900';

/** Scroll-snap card carousel: header with title, optional link and arrows; full-bleed track; dots. */
export function CardCarousel({
  label,
  title,
  seeAll,
  prevLabel,
  nextLabel,
  goToLabel,
  dots = true,
  children,
}: CardCarouselProps) {
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
    <section aria-roledescription="carousel" aria-label={label}>
      <div>
        <div className="mb-8 flex items-center justify-between gap-6 px-5 sm:px-8 md:mb-10 lg:px-10">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="font-extrabold">{title}</h2>
            {seeAll && (
              <LocalizedLink
                to={seeAll.to}
                className="inline-flex min-h-11 items-center gap-1 font-medium text-ink-500 hover:text-ink-900"
              >
                {seeAll.label}
                <ChevronRightIcon className="size-4" />
              </LocalizedLink>
            )}
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              aria-label={prevLabel}
              disabled={edges.start}
              onClick={() => scrollByPage(-1)}
              className={roundButton}
            >
              <ChevronDownIcon className="size-5 rotate-90" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
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
          className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-5 px-5 py-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </ul>

        {dots && (
          <div className="mt-6 flex justify-center gap-2" role="group">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={goToLabel(i + 1)}
                aria-current={i === page ? 'true' : undefined}
                onClick={() => goTo(i)}
                className="inline-flex size-9 items-center justify-center"
              >
                <span
                  className={cn('size-2 rounded-full', i === page ? 'bg-ink-900' : 'bg-ink-500/40')}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
