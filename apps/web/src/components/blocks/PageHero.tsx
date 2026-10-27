import type { ReactNode } from 'react';
import { Eyebrow, Container } from '../ui/layout';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}

/** Top-of-page banner; renders the page's single `<h1>`. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="bg-grey-50 py-12 md:py-16">
      <Container className="flex flex-col gap-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl">{title}</h1>
        {lead && <p className="max-w-prose text-ink-500">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
