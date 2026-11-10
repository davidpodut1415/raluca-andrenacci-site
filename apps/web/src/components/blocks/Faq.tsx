import { ChevronDownIcon } from '../ui/icons';

interface FaqItem {
  q: string;
  a: string;
}

/** Native <details>: keyboard and screen-reader accessible without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item) => (
        <details key={item.q} className="group border border-black bg-white px-3">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-2 text-h4 font-extrabold text-ink-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDownIcon className="size-6 shrink-0 text-black transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-4 text-ink-700">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
