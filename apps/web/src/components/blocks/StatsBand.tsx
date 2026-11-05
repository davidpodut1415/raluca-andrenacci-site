import { Section } from '../ui/layout';

interface Stat {
  value: string;
  label: string;
}

/** Big-number band on black (typographic, no photos). Only use facts the client confirmed. */
export function StatsBand({ stats, label }: { stats: Stat[]; label?: string }) {
  return (
    <Section tone="black" className="py-16 md:py-20 lg:py-24" aria-label={label}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-white/25 pt-6">
            <dt className="font-serif text-display leading-none font-extrabold text-white [font-variant-numeric:lining-nums]">
              {stat.value}
            </dt>
            <dd className="mt-4 text-small text-white/70">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
