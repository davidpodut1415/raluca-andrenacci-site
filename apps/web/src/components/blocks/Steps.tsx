interface Step {
  title: string;
  text: string;
}

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-4">
          <span
            aria-hidden="true"
            className="inline-flex size-12 items-center justify-center rounded-full border border-burgundy-700 font-serif text-h4 font-semibold text-burgundy-700"
          >
            {i + 1}
          </span>
          <h3 className="text-h4">{step.title}</h3>
          <p className="text-ink-500">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
