import type { ImageName } from '../../lib/images.generated';
import { Img } from '../ui/Img';

interface QuoteBandProps {
  image: ImageName;
  quote: string;
  name: string;
  role?: string;
}

const initials = (name: string) =>
  name
    .split(',')[0]!
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Full-width photo band with one large centered quote and an author chip (reference: Tony Robbins' quote band). */
export function QuoteBand({ image, quote, name, role }: QuoteBandProps) {
  return (
    <section className="relative isolate flex min-h-[32rem] items-center justify-center overflow-hidden bg-black px-5 py-20 sm:px-8 md:min-h-[40rem] lg:px-10">
      <Img
        name={image}
        decorative
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover object-[left_15%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/55 bg-linear-to-b from-transparent via-black/30 to-black"
      />
      <figure className="flex max-w-5xl flex-col items-center text-center">
        <blockquote>
          <p className="font-serif text-h2 leading-tight font-bold text-balance text-white lg:text-display">
            “{quote}”
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4 text-left text-white">
          <span
            aria-hidden="true"
            className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/10 font-serif text-h4 font-semibold"
          >
            {initials(name)}
          </span>
          <span>
            <span className="block font-semibold">{name}</span>
            {role && <span className="block text-small text-white/70">{role}</span>}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
