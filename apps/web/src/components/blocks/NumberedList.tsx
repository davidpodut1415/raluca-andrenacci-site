/** Large-numeral rows separated by hairlines (used for directions, benefits, credentials). */
export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol>
      {items.map((item, i) => (
        <li
          key={item}
          className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[5rem_1fr] md:py-8"
        >
          <span
            aria-hidden="true"
            className="font-serif text-h2 leading-none font-extrabold text-ink-900/25 [font-variant-numeric:lining-nums]"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-serif text-h4 leading-snug font-semibold text-ink-900 md:text-h3">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}
