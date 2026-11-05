interface Stat {
  value: string;
  label: string;
}

/**
 * Key figures in four equal columns (two on mobile), straight on the page background with no
 * containers: a numeral over a caption. Only use facts the
 * client confirmed.
 */
export function StatsStagger({ stats, label }: { stats: Stat[]; label?: string }) {
  return (
    <section className="bg-grey-50 py-16 md:py-20 lg:py-24" aria-label={label}>
      <dl className="mx-auto grid max-w-[120rem] grid-cols-2 gap-x-6 gap-y-12 px-5 sm:px-8 lg:grid-cols-4 lg:gap-x-10 lg:px-10">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.label} className="flex flex-col gap-4">
            <dt className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold text-ink-900 [font-variant-numeric:lining-nums]">
              {stat.value}
            </dt>
            <dd className="max-w-[18rem] text-small text-ink-700">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
