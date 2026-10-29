import type { ReactNode } from 'react';
import { Img } from '../ui/Img';

interface CTAPanelProps {
  title: string;
  text?: string;
  /** Usually a `light` <ButtonLink>. */
  action: ReactNode;
}

/** Closing call-to-action: rounded dark photo panel, centered text and a single button. */
export function CTAPanel({ title, text, action }: CTAPanelProps) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl bg-black px-6 py-16 text-center md:min-h-[34rem]">
        <Img
          name="portrait-armchair"
          decorative
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover object-top"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <h2 className="font-extrabold text-white">{title}</h2>
          {text && <p className="max-w-xl text-white/90">{text}</p>}
          <div className="mt-2">{action}</div>
        </div>
      </div>
    </section>
  );
}
