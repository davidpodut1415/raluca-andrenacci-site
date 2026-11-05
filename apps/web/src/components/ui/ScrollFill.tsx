import type { ElementType } from 'react';

/**
 * Section heading. Formerly filled in word by word on scroll; the text is now always fully
 * opaque (no loading effect). The name and props are kept so call sites did not need to change.
 */
export function ScrollFill({
  text,
  as: Tag = 'h2',
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={className}>{text}</Tag>;
}
