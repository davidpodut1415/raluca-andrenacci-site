import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

/**
 * Portrait (9:16) clips shown in the landscape hero. `position` / `zoom` keep the head in frame:
 * the clip is cropped to a horizontal band, centered on the face (`origin` = where the face sits
 * in the panel, used as the zoom anchor).
 */
const CLIPS = [
  { name: 'fashion-1', position: 'object-[50%_6%]', origin: '73% 50%', zoom: 1 },
  { name: 'studio-talk', position: 'object-[50%_30%]', origin: '24% 50%', zoom: 1.7 },
  { name: 'fashion-2', position: 'object-[50%_6%]', origin: '52% 50%', zoom: 1 },
] as const;

/**
 * Decorative background: the clips play one after another (each once, then a cross-fade to the
 * next). With reduced motion nothing plays and the first poster frame stays.
 */
export function HeroClips() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    refs.current.forEach((video, i) => {
      if (!video) return;
      if (i !== active || reduced) {
        video.pause();
        return;
      }
      video.currentTime = 0;
      // Autoplay can be refused (low-power mode): the poster simply stays visible.
      void Promise.resolve(video.play()).catch(() => undefined);
    });
  }, [active]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 bg-black">
      {CLIPS.map((clip, i) => (
        <video
          key={clip.name}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-700',
            clip.position,
            i === active ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transformOrigin: clip.origin, transform: `scale(${clip.zoom})` }}
          poster={`/video/${clip.name}-poster.jpg`}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          tabIndex={-1}
          onEnded={() => setActive((a) => (a + 1) % CLIPS.length)}
        >
          <source src={`/video/${clip.name}.webm`} type="video/webm" />
          <source src={`/video/${clip.name}.mp4`} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
