import { useEffect, useRef } from 'react';

/**
 * Decorative silent looping background video with a poster frame.
 * It does not autoplay when the visitor prefers reduced motion (the poster stays visible).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    // Autoplay can be refused (low-power mode, data saver): the poster simply stays visible.
    void Promise.resolve(video.play()).catch(() => undefined);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 size-full object-cover object-center lg:object-top"
      poster="/video/hero-poster.jpg"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/video/hero.webm" type="video/webm" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
