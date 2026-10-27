import { cn } from '../../lib/cn';
import { CheckIcon } from '../ui/icons';

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-burgundy-100 text-burgundy-700">
            <CheckIcon className="size-4" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
