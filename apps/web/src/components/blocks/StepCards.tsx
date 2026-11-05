import { cn } from '../../lib/cn';

interface StepCard {
  title: string;
  text?: string;
}

/** "How it works" cards: numeral, title, optional text. */
export function StepCards({
  steps,
  numbered = true,
  columns = 4,
}: {
  steps: StepCard[];
  numbered?: boolean;
  columns?: 3 | 4;
}) {
  return (
    <ol
      className={cn(
        'grid gap-4 md:grid-cols-2 lg:gap-6',
        columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex min-h-56 flex-col rounded-2xl border border-line bg-white p-6 md:p-8"
        >
          {numbered && (
            <span
              aria-hidden="true"
              className="font-serif text-h2 leading-none font-extrabold text-burgundy-700 [font-variant-numeric:lining-nums]"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className={cn('text-h4 leading-snug', numbered && 'mt-auto pt-8')}>{step.title}</h3>
          {step.text && <p className="mt-3 text-ink-500">{step.text}</p>}
        </li>
      ))}
    </ol>
  );
}
