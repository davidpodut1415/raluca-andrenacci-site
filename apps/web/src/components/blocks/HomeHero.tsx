import { useTranslation } from 'react-i18next';
import { usePages } from '../../lib/usePages';
import { ButtonLink } from '../ui/Button';
import { Eyebrow } from '../ui/layout';
import { HeroVideo } from './HeroVideo';

/**
 * Hero: a large rounded video panel inset from the viewport edges, filling the space below the
 * header. Centered text block with supporting facts beneath, black scrim for contrast.
 */
export function HomeHero() {
  const { t } = useTranslation();
  const { t: tp, list } = usePages();

  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate flex min-h-[calc(100svh-4.25rem)] items-center justify-center overflow-hidden rounded-2xl bg-black p-6 sm:min-h-[calc(100svh-4.5rem)] sm:p-10 lg:min-h-[calc(100svh-5rem)] lg:p-12">
        <HeroVideo />
        {/* Even black scrim behind the centered text. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
        <div className="flex w-full flex-col items-center gap-10 text-center">
          <div className="flex max-w-6xl flex-col items-center gap-5 md:gap-6">
            <Eyebrow className="text-white/85">{tp('home.hero.eyebrow')}</Eyebrow>
            <h1 className="font-bold text-white uppercase">
              {tp('home.hero.title')
                .split(/(?<=\.)\s+/)
                .map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
                {t('cta.freeSession')}
              </ButtonLink>
            </div>
          </div>
          <ul className="flex flex-col items-center gap-2 text-small text-white/90 sm:flex-row sm:gap-x-8">
            {list('home.hero.trust').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
