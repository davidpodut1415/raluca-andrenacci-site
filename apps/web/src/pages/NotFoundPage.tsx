import { useTranslation } from 'react-i18next';
import { CAROUSEL_ITEM, CardCarousel } from '../components/blocks/CardCarousel';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { LoopVideo } from '../components/ui/LoopVideo';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { PROGRAM_KEYS } from '../i18n/routes';
import { PROGRAM_IMAGES } from '../lib/programImages';
import { usePages } from '../lib/usePages';

/**
 * Page not found, laid out like the reference: a full-width dark photo band with a centered two-line
 * message and one button, fading into black, then a carousel of programs to explore.
 */
export function NotFoundPage() {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <>
      <Seo title={t('notFound.title')} noindex />

      <section className="relative isolate flex min-h-[32rem] items-center justify-center overflow-hidden bg-black px-5 pt-16 pb-28 text-center sm:px-8 md:min-h-[min(40rem,75svh)] lg:px-10">
        <LoopVideo
          name="fashion-2"
          className="absolute inset-0 -z-20 size-full object-cover object-[50%_30%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/50 bg-linear-to-b from-transparent via-black/30 to-black"
        />
        <div className="flex max-w-4xl flex-col items-center gap-8">
          <h1 className="text-display font-bold text-balance text-white md:text-[clamp(2.75rem,5vw,4.5rem)] md:leading-[1.05]">
            {t('notFound.headline')}
          </h1>
          <ButtonLink to={{ key: 'home' }} variant="light" size="lg">
            {t('notFound.back')}
          </ButtonLink>
        </div>
      </section>

      <div className="bg-grey-50 pt-12 pb-12 md:pt-16 md:pb-16">
        <CardCarousel
          label={t('notFound.explore')}
          title={t('notFound.explore')}
          prevLabel={tp('home.media.prev')}
          nextLabel={tp('home.media.next')}
          goToLabel={(n) => tp('home.media.goTo', { n })}
        >
          {PROGRAM_KEYS.map((program) => (
            <li key={program} className={CAROUSEL_ITEM}>
              <article className="group relative isolate flex aspect-2/3 flex-col items-center justify-end overflow-hidden rounded-2xl bg-ink-900 px-6 pb-12 text-center text-white">
                <Img
                  name={PROGRAM_IMAGES[program]}
                  decorative
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 38vw, 72vw"
                  className="absolute inset-0 -z-20 size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-black/30 bg-linear-to-t from-black/90 via-black/60 to-transparent"
                />
                <h3 className="font-serif text-h3 leading-tight font-extrabold text-white uppercase">
                  <LocalizedLink
                    to={{ key: 'program', program }}
                    className="after:absolute after:inset-0"
                  >
                    {t(`programs.names.${program}`)}
                  </LocalizedLink>
                </h3>
                <p className="mt-4 text-small text-white/90">
                  {tp(`program.items.${program}.summary`)}
                </p>
              </article>
            </li>
          ))}
        </CardCarousel>
      </div>
    </>
  );
}
