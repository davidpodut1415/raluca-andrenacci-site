import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ScrollFill } from './ScrollFill';

/**
 * Spacing standards (8px grid):
 * - container: up to 1920px wide, gutters 20 / 32 / 40px (same as the header and carousels)
 * - section rhythm: 48 / 64 / 80px vertical padding
 * - section heading → content: 32 / 48px
 * - grid gaps: 24 / 32px; card padding: 24 / 32px
 */
export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[120rem] px-5 sm:px-8 lg:px-10', className)}
      {...rest}
    />
  );
}

/** One vertical rhythm for every band: 48 / 64 / 80 px on light, 64 / 80 / 96 px on black. */
const sectionStyles = cva('py-12 md:py-16 lg:py-20', {
  variants: {
    tone: {
      light: 'bg-grey-50',
      muted: 'bg-grey-50',
      black: 'py-16 md:py-20 lg:py-24 bg-black text-white/85 [&_h2]:text-white',
      dark: 'py-16 md:py-20 lg:py-24 bg-black text-white/85 [&_h2]:text-white [&_h3]:text-white',
    },
  },
  defaultVariants: { tone: 'light' },
});

export function Section({
  tone,
  className,
  children,
  ...rest
}: ComponentProps<'section'> & VariantProps<typeof sectionStyles>) {
  return (
    <section
      data-tone={tone ?? 'light'}
      className={cn(sectionStyles({ tone }), className)}
      {...rest}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Light band without a Container, for full-bleed content (carousels); same rhythm as <Section>. */
export function FullBleedSection({ className, ...rest }: ComponentProps<'section'>) {
  return (
    <section
      data-tone="light"
      className={cn('bg-grey-50 py-12 md:py-16 lg:py-20', className)}
      {...rest}
    />
  );
}

export function Eyebrow({ className, ...rest }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-eyebrow font-semibold text-burgundy-700 uppercase', className)}
      {...rest}
    />
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 flex max-w-3xl flex-col gap-4 md:mb-12',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {Tag === 'h1' ? (
        <h1>{title}</h1>
      ) : (
        <ScrollFill as="h2" text={title} className="font-extrabold" />
      )}
      {lead && <p className="max-w-prose text-ink-500">{lead}</p>}
    </div>
  );
}

export function Card({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-xl border border-line bg-white p-6 shadow-card md:p-8', className)}
      {...rest}
    />
  );
}

export function Chip({ className, ...rest }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-burgundy-100 px-3 py-1 text-small font-medium text-burgundy-800',
        className,
      )}
      {...rest}
    />
  );
}
