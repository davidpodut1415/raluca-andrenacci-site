import { useEffect, useRef } from 'react';

interface LoopVideoProps {
  /** Base name of the clip in /video (`<name>.mp4`, `<name>.webm`, `<name>-poster.jpg`). */
  name: string;
  className?: string;
}

/**
 * Decorative silent looping clip with a poster frame. It plays only while on screen and never
 * plays when the visitor prefers reduced motion (the poster stays visible).
 */
export function LoopVideo({ name, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        // Autoplay can be refused (low-power mode, data saver): the poster simply stays visible.
        void Promise.resolve(video.play()).catch(() => undefined);
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={`/video/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
