import { Section } from '../ui/layout';
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
    <Section aria-label={label}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.label} className="flex flex-col gap-4">
            <dt className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold text-ink-900 [font-variant-numeric:lining-nums]">
              {stat.value}
            </dt>
            <dd className="max-w-[18rem] text-small text-ink-700">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
