import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { LOGO_MANIFEST, type LogoName } from '../../lib/images.generated';
import { usePages } from '../../lib/usePages';
import { Container } from '../ui/layout';

/** Logo + display height. Heights are tuned so each mark has a similar visual weight. */
const LOGOS: { name: LogoName; height: string }[] = [
  { name: 'forbes', height: 'h-8 md:h-9' },
  { name: 'zf', height: 'h-6 md:h-7' },
  { name: 'emcc', height: 'h-12 md:h-14' },
  { name: 'ffi', height: 'h-10 md:h-12' },
];

/** Press and accreditation logos spread evenly across the container. The section label is for assistive tech only. */
export function CredibilityBar() {
  const { t } = usePages();
  const list = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Logos start greyed out and fade into colour once the row scrolls into view.
  useEffect(() => {
    const el = list.current;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label={t('home.credibility.label')} className="bg-grey-50">
      <Container className="py-10 md:py-14">
        <ul
          ref={list}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:flex-nowrap lg:justify-between lg:gap-x-8"
        >
          {LOGOS.map(({ name, height }) => {
            const { src, width, height: h } = LOGO_MANIFEST[name];
            return (
              <li key={name}>
                <img
                  src={src}
                  width={width}
                  height={h}
                  alt={t(`home.credibility.logos.${name}`)}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'w-auto transition-[filter,opacity] duration-1000 ease-out',
                    revealed ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale',
                    height,
                  )}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
