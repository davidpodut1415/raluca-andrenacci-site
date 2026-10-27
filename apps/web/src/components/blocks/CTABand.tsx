import type { ReactNode } from 'react';
import { Container } from '../ui/layout';

interface CTABandProps {
  title: string;
  text?: string;
  /** Usually a <ButtonLink>. */
  action: ReactNode;
}

/** Closing call-to-action: light cream band (original shade) with a primary button. */
export function CTABand({ title, text, action }: CTABandProps) {
  return (
    <section className="bg-cream-100 py-12 md:py-16">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2>{title}</h2>
          {text && <p className="mt-3 text-ink-700">{text}</p>}
        </div>
        {action}
      </Container>
    </section>
  );
}
