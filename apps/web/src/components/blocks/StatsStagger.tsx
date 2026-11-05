import { cn } from '../../lib/cn';

interface Stat {
  value: string;
  label: string;
}

/** Desktop placement per stat (12-col grid): the first is the big one, the rest step down the page. */
const PLACEMENT = [
  'lg:col-span-6 lg:row-span-2 lg:self-center',
  'lg:col-span-3 lg:col-start-7 lg:row-start-1',
  'lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-28',
  'lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:mt-6',
];

/**
 * Staggered key figures, no containers: numerals and captions sit straight on the page. The first
 * stat is oversized (about two cards wide). Only use facts the client confirmed.
 */
export function StatsStagger({ stats, label }: { stats: Stat[]; label?: string }) {
  return (
    <section className="bg-grey-50 py-16 md:py-24 lg:py-28" aria-label={label}>
      <dl className="mx-auto grid max-w-[120rem] grid-cols-2 gap-x-6 gap-y-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 lg:px-10">
        {stats.slice(0, PLACEMENT.length).map((stat, i) => {
          const big = i === 0;
          return (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col gap-3',
                big && 'col-span-2',
                !big && i % 2 === 1 && 'mt-10 sm:mt-14',
                PLACEMENT[i],
              )}
            >
              <dt
                className={cn(
                  'font-serif leading-none font-extrabold [font-variant-numeric:lining-nums]',
                  big
                    ? 'text-[clamp(6rem,17vw,15rem)] text-burgundy-700'
                    : 'text-display text-ink-900',
                )}
              >
                {stat.value}
              </dt>
              <dd
                className={cn(
                  'text-ink-700',
                  big ? 'max-w-sm text-h4' : 'max-w-[16rem] text-small',
                )}
              >
                {stat.label}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
