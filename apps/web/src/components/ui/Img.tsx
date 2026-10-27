import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGE_MANIFEST, type ImageName } from '../../lib/images.generated';

interface ImgProps extends Omit<
  ComponentProps<'img'>,
  'src' | 'srcSet' | 'alt' | 'width' | 'height'
> {
  name: ImageName;
  /** CSS `sizes` hint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  /** Eager-load and prioritize (LCP image only). */
  priority?: boolean;
  /** Decorative images get an empty alt. Otherwise the alt text comes from `images.<name>` in common.json. */
  decorative?: boolean;
}

/** Responsive image from the generated manifest: explicit width/height (no layout shift) + srcset. */
export function Img({ name, sizes, priority, decorative, ...rest }: ImgProps) {
  const { t } = useTranslation();
  const { width, height, widths } = IMAGE_MANIFEST[name];
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');

  return (
    <img
      src={`/images/${name}-${widths[widths.length - 1]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={decorative ? '' : t(`images.${name}`)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  );
}
