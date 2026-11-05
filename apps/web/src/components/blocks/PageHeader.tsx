import type { ReactNode } from 'react';
import { Container, Eyebrow } from '../ui/layout';

interface PageHeaderProps {
  eyebrow?: string;
  /** The page's single <h1>. */
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}

/** Inner-page opener (text-led variant) for forms, blog and legal pages: large title, no photo. */
export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <header className="bg-grey-50 pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
      <Container>
        <div className="flex max-w-4xl flex-col gap-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-extrabold">{title}</h1>
          {lead && <p className="max-w-2xl text-ink-500">{lead}</p>}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
