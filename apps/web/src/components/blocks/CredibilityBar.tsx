import { cn } from '../../lib/cn';
import { LOGO_MANIFEST, type LogoName } from '../../lib/images.generated';
import { usePages } from '../../lib/usePages';
import { Container } from '../ui/layout';

/** Logo + display height. Heights are tuned so each mark has a similar visual weight. */
const LOGOS: { name: LogoName; height: string }[] = [
  { name: 'forbes', height: 'h-8 md:h-9' },
  { name: 'zf', height: 'h-6 md:h-7' },
  { name: 'emcc', height: 'h-12 md:h-14' },
  { name: 'ffi', height: 'h-10 md:h-12' },
  { name: 'elian', height: 'h-7 md:h-8' },
];

/** Press, accreditation and partner logos spread evenly across the container, with a centered label. */
export function CredibilityBar() {
  const { t } = usePages();

  return (
    <section aria-labelledby="featured-in" className="bg-grey-50">
      <Container className="py-10 md:py-14">
        <p id="featured-in" className="mb-8 text-center text-body text-ink-700">
          {t('home.credibility.label')}
        </p>
        <ul className="grid grid-cols-6 items-center justify-items-center gap-x-6 gap-y-10 md:flex md:flex-wrap md:justify-center md:gap-x-12 lg:flex-nowrap lg:justify-between lg:gap-x-8">
          {LOGOS.map(({ name, height }, i) => {
            const { src, width, height: h } = LOGO_MANIFEST[name];
            return (
              <li key={name} className={cn('md:col-auto', i < 3 ? 'col-span-2' : 'col-span-3')}>
                <img
                  src={src}
                  width={width}
                  height={h}
                  alt={t(`home.credibility.logos.${name}`)}
                  loading="lazy"
                  decoding="async"
                  className={cn('w-auto', height)}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
