import { cn } from '../../lib/cn';
import { ArrowRightIcon } from './icons';

/**
 * Round arrow in a card's corner: the "this is tappable" cue. Always visible on touch devices
 * (no hover there); on hover-capable screens it appears when the card is hovered.
 * Decorative: the card's link carries the accessible name. The parent needs `group relative`.
 */
export function CardArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute right-4 bottom-4 inline-flex size-11 items-center justify-center rounded-full bg-white text-ink-900 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100',
        className,
      )}
    >
      <ArrowRightIcon className="size-5" />
    </span>
  );
}
