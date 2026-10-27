import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { LocalizedLink, type LocalizedLinkProps } from './LocalizedLink';

export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-button whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-burgundy-700 text-white hover:bg-burgundy-800',
        secondary: 'border border-burgundy-700 text-burgundy-700 hover:bg-burgundy-100',
        ghost: 'text-burgundy-700 hover:bg-grey-100',
        /** For dark / image backgrounds. */
        /** On a brown / dark background. */
        light: 'bg-white text-burgundy-700 hover:bg-grey-100',
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
