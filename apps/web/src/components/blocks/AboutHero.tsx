import { Img } from '../ui/Img';

interface AboutHeroProps {
  eyebrow: string;
  /** The page's single <h1>. */
  title: string;
}

/**
 * About opener, laid out like the reference: one black inset panel holding a small photo card
 * (top-left), a tall portrait (right) and the eyebrow + large headline (bottom-left).
 */
export function AboutHero({ eyebrow, title }: AboutHeroProps) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="grid gap-3 overflow-hidden rounded-2xl bg-black p-3 sm:gap-4 sm:p-4 lg:h-[calc(100svh-5rem)] lg:min-h-[34rem] lg:grid-cols-12">
        <div className="order-2 flex flex-col justify-between gap-10 lg:order-1 lg:col-span-5">
          <div className="hidden overflow-hidden rounded-2xl lg:block">
            <Img
              name="event-audience"
              decorative
              sizes="40vw"
              className="aspect-16/10 w-full object-cover"
            />
          </div>
          <div className="px-3 pb-6 sm:px-6 lg:px-6 lg:pb-12">
            <p className="flex items-center gap-3 text-small tracking-wide text-white/85 uppercase">
              <span aria-hidden="true" className="size-2 rounded-full bg-white" />
              {eyebrow}
            </p>
            <h1 className="mt-6 text-display font-extrabold text-white lg:text-[clamp(2.75rem,4.4vw,4.5rem)] lg:leading-[1.05]">
              {title}
            </h1>
          </div>
        </div>
        <div className="relative order-1 overflow-hidden rounded-2xl lg:order-2 lg:col-span-7">
          <Img
            name="event-mic"
            priority
            decorative
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-4/5 w-full object-cover object-[30%_20%] sm:aspect-3/2 lg:absolute lg:inset-0 lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </section>
  );
}
