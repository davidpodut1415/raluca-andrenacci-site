import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Form control borders use ink-500 (6:1 on white) so controls meet the 3:1 non-text contrast rule. */
const controlStyles =
  'w-full rounded-md border border-ink-500 bg-white px-4 py-3 text-body text-ink-700 placeholder:text-ink-500 aria-[invalid=true]:border-error disabled:opacity-60';

export function Input({ className, ...rest }: ComponentProps<'input'>) {
  return <input className={cn(controlStyles, className)} {...rest} />;
}

export function Textarea({ className, rows = 5, ...rest }: ComponentProps<'textarea'>) {
  return <textarea rows={rows} className={cn(controlStyles, className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<'select'>) {
  return (
    <select className={cn(controlStyles, className)} {...rest}>
      {children}
    </select>
  );
}

export function Checkbox({
  className,
  label,
  id: idProp,
  ...rest
}: Omit<ComponentProps<'input'>, 'type'> & { label: ReactNode }) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className={cn(
          'mt-1 size-5 shrink-0 rounded-md border-ink-500 accent-burgundy-700',
          className,
        )}
        {...rest}
      />
      <label htmlFor={id} className="text-small text-ink-700">
        {label}
      </label>
    </div>
  );
}

interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  required?: boolean;
}

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
}

/** Label + control + hint/error wiring (`aria-describedby`, `aria-invalid`). */
export function FormField({ label, hint, error, required, className, children }: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-medium text-ink-900">
        {label}
        {required && (
          <span aria-hidden="true" className="text-burgundy-700">
            {' '}
            *
          </span>
        )}
      </label>
      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        required,
      })}
      {hint && (
        <p id={hintId} className="text-small text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}
