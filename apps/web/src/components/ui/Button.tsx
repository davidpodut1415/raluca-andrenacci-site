import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { LocalizedLink, type LocalizedLinkProps } from './LocalizedLink';

export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-button whitespace-nowrap font-semibold hover-zoom disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-ink-700',
        secondary: 'border border-black bg-white text-black hover:bg-tint-100',
        ghost: 'text-black hover:bg-grey-100',
        /** For dark / image backgrounds. */
        /** On a brown / dark background. */
        light: 'bg-badge text-black hover:brightness-95',
        inverted: 'border border-white text-white hover:bg-white/15',
      },
      size: {
        sm: 'px-4 py-2 text-small',
        md: 'px-5 py-2.5',
        lg: 'px-7 py-3.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type StyleProps = VariantProps<typeof buttonStyles>;

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...rest
}: ComponentProps<'button'> & StyleProps) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...rest} />
  );
}

export function ButtonLink({ variant, size, className, ...rest }: LocalizedLinkProps & StyleProps) {
  return <LocalizedLink className={cn(buttonStyles({ variant, size }), className)} {...rest} />;
}
