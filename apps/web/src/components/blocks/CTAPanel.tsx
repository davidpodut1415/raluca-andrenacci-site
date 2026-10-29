import type { ReactNode } from 'react';
import { Img } from '../ui/Img';

interface CTAPanelProps {
  title: string;
  text?: string;
  /** Usually a `light` <ButtonLink>. */
  action: ReactNode;
}

/**
 * Closing call-to-action: a tall full-width photo with the face in the upper half and the text
 * below it. The bottom fades into the footer colour so the two read as one block.
 */
export function CTAPanel({ title, text, action }: CTAPanelProps) {
  return (
    <section className="relative isolate flex min-h-[40rem] items-end justify-center overflow-hidden bg-black px-5 pt-16 pb-20 text-center sm:px-8 md:min-h-[46rem] lg:px-10">
      <Img
        name="portrait-armchair"
        decorative
        sizes="100vw"
        className="absolute inset-0 -z-30 size-full object-cover object-[center_20%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-black/35" />
      {/* Smooth fade into the footer's colour (espresso-900) over the lower part of the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-linear-to-t from-espresso-900 via-espresso-900/70 to-transparent"
      />
      <div className="flex max-w-3xl flex-col items-center gap-6">
        <h2 className="font-extrabold text-white">{title}</h2>
        {text && <p className="max-w-xl text-white/90">{text}</p>}
        <div className="mt-2">{action}</div>
      </div>
    </section>
  );
}
