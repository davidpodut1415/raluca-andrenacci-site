import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Our font-size tokens (`text-small`, `text-h4`, …) must be known to tailwind-merge, otherwise it
// treats them as text *colors* and drops e.g. `text-white` when both are present.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'h2', 'h3', 'h4', 'body', 'small', 'eyebrow', 'button', 'nav'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
