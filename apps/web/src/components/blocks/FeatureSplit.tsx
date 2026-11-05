import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { ImageName } from '../../lib/images.generated';
import { Img } from '../ui/Img';
import { Eyebrow } from '../ui/layout';
import { ScrollFill } from '../ui/ScrollFill';

interface FeatureSplitProps {
  /** e.g. "01": large numeral above the title. */
  number?: string;
  eyebrow?: string;
  title: string;
  image: ImageName;
  /** Put the photo on the left (default: right). */
  reverse?: boolean;
  children: ReactNode;
}

/** Alternating photo + text block (the "Part 1 / Part 2" template). */
export function FeatureSplit({
  number,
  eyebrow,
  title,
  image,
  reverse,
  children,
}: FeatureSplitProps) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={cn('flex flex-col items-start gap-6', reverse && 'lg:order-2')}>
        {number && (
          <span
            aria-hidden="true"
            className="font-serif text-display leading-none font-extrabold text-ink-900/20 [font-variant-numeric:lining-nums]"
          >
            {number}
          </span>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <ScrollFill as="h2" text={title} className="font-extrabold" />
        {children}
      </div>
      <div className="overflow-hidden rounded-2xl shadow-card">
        <Img
          name={image}
          decorative
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-4/3 w-full object-cover object-top lg:aspect-5/4"
        />
      </div>
    </article>
  );
}
