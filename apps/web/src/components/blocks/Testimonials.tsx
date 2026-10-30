import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { usePages } from '../../lib/usePages';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const initials = (name: string) =>
  name
    .split(',')[0]!
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Showcase on a black full-width banner (the parent section): one large quote at a time, a row of attributions underneath; the selected
 * person is bright, the others dimmed (tabs pattern, arrow keys move the selection).
 * Short excerpts only: full testimonials need the client's written approval (docs/00-DECISIONS.md Q3).
 */
export function Testimonials({ indexes }: { indexes?: number[] }) {
  const { items } = usePages();
  const all = items<Testimonial>('testimonials.items');
  const shown = indexes ? indexes.map((i) => all[i]).filter((x): x is Testimonial => !!x) : all;
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  if (shown.length === 0) return null;
  const current = shown[active] ?? shown[0]!;

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + shown.length) % shown.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${active}`}
        className="min-h-56 max-w-5xl md:min-h-72"
      >
        <blockquote key={active} className="animate-fade-in">
          <p className="font-serif text-h2 leading-tight font-bold text-balance text-white lg:text-display">
            “{current.quote}”
          </p>
        </blockquote>
      </div>

      <div
        role="tablist"
        aria-orientation="horizontal"
        className="mt-10 grid max-w-5xl gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6"
      >
        {shown.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                'flex items-center gap-4 rounded-xl py-3 text-left transition-opacity sm:flex-col sm:items-start sm:pr-3',
                selected ? 'opacity-100' : 'opacity-65 hover:opacity-90',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex size-14 shrink-0 items-center justify-center rounded-full border font-serif text-h4 font-semibold',
                  selected
                    ? 'border-white bg-white text-black'
                    : 'border-white/40 bg-white/10 text-white',
                )}
              >
                {initials(item.name)}
              </span>
              <span>
                <span className="block font-semibold">{item.name}</span>
                <span className="mt-1 block text-small text-white/70">{item.role}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
