import { useEffect, useState } from 'react';

const TOP_OFFSET = 80;
const MIN_DELTA = 8;

/**
 * Collapse-on-scroll: hidden while scrolling down, shown again as soon as the visitor scrolls up
 * or is near the top. Pass `disabled` to pin it open (e.g. while the mobile menu is open).
 */
export function useHidingHeader(disabled: boolean) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= TOP_OFFSET) setHidden(false);
      else if (delta > MIN_DELTA) setHidden(true);
      else if (delta < -MIN_DELTA) setHidden(false);
      if (Math.abs(delta) > MIN_DELTA) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { hidden: hidden && !disabled, reveal: () => setHidden(false) };
}
