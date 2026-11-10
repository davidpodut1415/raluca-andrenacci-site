import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CardArrow } from '../ui/CardArrow';
import { LocalizedLink, type LocalizedLinkProps } from '../ui/LocalizedLink';

/** Three equal columns on desktop with hairline column gaps and generous row gaps, like the reference grid. */
export function TileGrid({ className, ...rest }: ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('grid gap-x-0.5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...rest}
    />
  );
}

/** A black boxed label (section name, meta line). */
export function Cell({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-black px-2 py-1.5 text-small font-bold text-white', className)}
      {...rest}
    />
  );
}

/** A white cell with a black outline, used for lead text, forms and article intros. */
export function Box({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('border border-black bg-white p-3 md:p-4', className)} {...rest} />;
}

/** Black cell that names a block of tiles; the optional action sits on the right. */
export function SectionLabel({
  title,
  action,
  as: Tag = 'h2',
}: {
  title: string;
  action?: ReactNode;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="mb-0.5 flex items-center justify-between gap-4 bg-black px-2 py-1.5 text-white">
      <Tag className="text-h4 font-bold text-white">{title}</Tag>
      {action}
    </div>
  );
}

interface TileProps {
  title: string;
  /** Internal destination, or `href` for an external link. */
  to?: LocalizedLinkProps['to'];
  href?: string;
  /** Small line above the title (category · date). */
  meta?: string;
  /** Photo or other media, filling a 4:5 frame. */
  media?: ReactNode;
  /** Yellow corner badge. */
  badge?: string;
  /** Aspect of the media frame. */
  ratio?: 'portrait' | 'landscape';
  className?: string;
}

/**
 * Reference-style tile: a black headline cell above a photo. The whole tile is one link; the photo
 * zooms on hover. Without media it is just the headline cell.
 */
export function Tile({
  title,
  to,
  href,
  meta,
  media,
  badge,
  ratio = 'portrait',
  className,
}: TileProps) {
  const linkClass = 'after:absolute after:inset-0';
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="min-h-24 bg-black p-2 text-white">
        {meta && <p className="mb-1 text-small font-medium text-white/80">{meta}</p>}
        <h3 className="text-h3 font-bold text-white">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {title}
            </a>
          ) : to ? (
            <LocalizedLink to={to} className={linkClass}>
              {title}
            </LocalizedLink>
          ) : (
            title
          )}
        </h3>
      </div>
      {media && (
        <div
          className={cn(
            'relative overflow-hidden bg-black',
            ratio === 'portrait' ? 'aspect-4/5' : 'aspect-3/2',
          )}
        >
          <div className="size-full transition-transform duration-500 group-hover:scale-105">
            {media}
          </div>
          {badge && (
            <span className="absolute top-2 left-2 bg-badge px-2 py-1 text-small font-bold text-black">
              {badge}
            </span>
          )}
          <CardArrow />
        </div>
      )}
    </article>
  );
}

/** Text-only black tile (quotes, numbers). */
export function TextTile({ children, className, ...rest }: ComponentProps<'div'>) {
  return (
    <div className={cn('bg-black p-3 text-white md:p-4', className)} {...rest}>
      {children}
    </div>
  );
}
