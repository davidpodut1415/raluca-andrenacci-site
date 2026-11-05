import type { ImageName } from '../../lib/images.generated';
import { Img } from '../ui/Img';

/** Hero slides: zoomed portraits, dark and calm enough for the centered headline. `position` keeps the face in frame. */
const SLIDES: { image: ImageName; position: string }[] = [
  { image: 'pro-dark', position: 'object-[50%_18%]' },
  { image: 'pro-medium', position: 'object-[40%_22%]' },
  { image: 'pro-closeup', position: 'object-[50%_14%]' },
];

/** Seconds each slide stays; must match `hero-slide` in index.css (cycle = SLIDES.length × STEP). */
const STEP = 6;
const LEAD = 1.3;

/**
 * Decorative background: portraits cross-fade with a slow zoom (pure CSS, no timers). With reduced
 * motion the first photo simply stays (see index.css) — content is never hidden.
 */
export function HeroSlides() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20">
      {SLIDES.map((slide, i) => (
        <Img
          key={slide.image}
          name={slide.image}
          decorative
          priority={i === 0}
          sizes="100vw"
          className={`hero-slide absolute inset-0 size-full object-cover ${slide.position}`}
          style={{
            animationDuration: `${SLIDES.length * STEP}s`,
            animationDelay: `${i * STEP - LEAD}s`,
          }}
        />
      ))}
    </div>
  );
}
