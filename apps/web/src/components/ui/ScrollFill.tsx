import { useLayoutEffect, useRef, type ElementType } from 'react';

const DIM = 0.25;
const START = 0.9; // fill starts when the heading's top reaches 90% of the viewport height
const END = 0.45; // and is complete at 45%

/**
 * Heading whose words start dimmed and fill in, word by word, as it scrolls into view.
 * The full text is always in the DOM (screen readers and search engines read it normally);
 * with `prefers-reduced-motion` it is shown fully filled.
 */
export function ScrollFill({
  text,
  as: Tag = 'h2',
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLElement>('[data-w]'));
    const paint = (progress: number) => {
      spans.forEach((span, i) => {
        const t = Math.min(1, Math.max(0, progress * (spans.length + 2) - i));
        span.style.opacity = String(DIM + (1 - DIM) * t);
      });
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      paint(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const top = root.getBoundingClientRect().top;
      const progress = (vh * START - top) / (vh * (START - END));
      paint(Math.min(1, Math.max(0, progress)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span data-w className="transition-opacity duration-150">
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
