import type { ReactNode } from 'react';
import { Img } from '../ui/Img';

interface CTAPanelProps {
  title: string;
  text?: string;
  /** Usually a `light` <ButtonLink>. */
  action: ReactNode;
}

/**
 * Closing call-to-action, laid out like the reference: a tall dark photo with the person in the
 * lower half, the text block centered above the face, the top fading in from black and the bottom
 * fading into the footer colour (espresso-900) so photo and footer read as one block.
 */
export function CTAPanel({ title, text, action }: CTAPanelProps) {
  return (
    <section className="relative isolate flex min-h-[44rem] items-center justify-center overflow-hidden bg-wall px-5 text-center sm:px-8 md:min-h-[48rem] lg:px-10">
      {/* The photo is shifted up 18% so the face sits above the text; its top edge dissolves into the wall colour. */}
      <Img
        name="portrait-armchair"
        decorative
        sizes="100vw"
        className="absolute inset-x-0 -top-[18%] -z-30 h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-black/55" />
      {/* Bottom: from the photo into the footer colour, low in the panel. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-linear-to-t from-espresso-900 via-espresso-900/80 to-transparent"
      />
      <div className="flex max-w-4xl flex-col items-center gap-5">
        <h2 className="text-display font-extrabold text-white">{title}</h2>
        {text && <p className="max-w-xl text-white/90">{text}</p>}
        <div className="mt-4">{action}</div>
      </div>
    </section>
  );
}
