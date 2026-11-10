import { LOGO_MANIFEST, type LogoName } from '../../lib/images.generated';
import { usePages } from '../../lib/usePages';

/** Logo + display height. Heights are tuned so each mark has a similar visual weight. */
const LOGOS: { name: LogoName; height: string }[] = [
  { name: 'forbes', height: 'h-8 md:h-9' },
  { name: 'zf', height: 'h-6 md:h-7' },
  { name: 'emcc', height: 'h-12 md:h-14' },
  { name: 'ffi', height: 'h-10 md:h-12' },
  { name: 'elian', height: 'h-7 md:h-8' },
];

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  const { t } = usePages();
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-row flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
    >
      {LOGOS.map(({ name, height }) => {
        const { src, width, height: h } = LOGO_MANIFEST[name];
        return (
          <li key={name} className="shrink-0">
            <img
              src={src}
              width={width}
              height={h}
              alt={hidden ? '' : t(`home.credibility.logos.${name}`)}
              loading="lazy"
              decoding="async"
              className={`w-auto ${height}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

/** Press, accreditation and partner logos in one slow, endless row under a centered label. */
export function CredibilityBar() {
  const { t } = usePages();

  return (
    <section aria-labelledby="featured-in">
      <p id="featured-in" className="mb-0.5 bg-black px-2 py-1.5 text-small font-bold text-white">
        {t('home.credibility.label')}
      </p>
      <div className="marquee overflow-hidden border border-black py-8">
        <div className="marquee-track flex w-max">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
