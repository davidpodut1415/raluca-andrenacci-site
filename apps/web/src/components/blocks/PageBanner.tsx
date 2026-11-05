import type { ReactNode } from 'react';
import type { ImageName } from '../../lib/images.generated';
import { Img } from '../ui/Img';
import { Eyebrow } from '../ui/layout';

interface PageBannerProps {
  image: ImageName;
  eyebrow?: string;
  /** The page's single <h1>. */
  title: string;
  lead?: string;
  /** CSS object-position of the photo, e.g. "center 20%". */
  position?: string;
  children?: ReactNode;
}

/**
 * Inner-page opener (photo variant): the landing hero's rounded inset panel at ~60% height, with a
 * black scrim and centered title. Use `PageHeader` instead on text-led pages.
 */
export function PageBanner({
  image,
  eyebrow,
  title,
  lead,
  position = 'center top',
  children,
}: PageBannerProps) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden rounded-2xl bg-black px-6 py-16 text-center md:min-h-[min(34rem,62svh)] lg:px-10">
        <Img
          name={image}
          priority
          decorative
          sizes="100vw"
          style={{ objectPosition: position }}
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
        <div className="flex max-w-5xl flex-col items-center gap-5">
          {eyebrow && <Eyebrow className="text-white/85">{eyebrow}</Eyebrow>}
          <h1 className="font-bold text-white uppercase">{title}</h1>
          {lead && <p className="max-w-2xl text-white/90">{lead}</p>}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
