import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { Container } from '../components/ui/layout';
import { PROGRAM_KEYS } from '../i18n/routes';
import { PROGRAM_IMAGES } from '../lib/programImages';
import { usePages } from '../lib/usePages';

/**
 * Programs overview, laid out like the reference: a huge title on the left with a short paragraph on
 * the right, then large two-column photo cards. Each card: statement headline bottom-left, supporting
 * line under it, and a small dark label with the program name.
 */
export function ProgramsPage() {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <>
      <Seo title={t('nav.programs')} description={tp('programsPage.seoDescription')} />

      <header className="bg-grey-50 pt-12 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <h1 className="text-hero font-extrabold lg:col-span-7">{tp('programsPage.eyebrow')}</h1>
            <p className="max-w-xl text-ink-700 lg:col-span-5">{tp('programsPage.lead')}</p>
          </div>
        </Container>
      </header>

      <section className="bg-grey-50 px-3 pb-3 sm:px-4 sm:pb-4">
        <ul className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {PROGRAM_KEYS.map((program) => (
            <li key={program}>
              <article className="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-2xl bg-black p-6 pt-24 md:min-h-[40rem] md:p-10 lg:min-h-[42rem]">
                <Img
                  name={PROGRAM_IMAGES[program]}
                  decorative
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 -z-20 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-black/20 bg-linear-to-t from-black/90 via-black/45 to-transparent"
                />
                <span className="absolute top-6 left-6 rounded-xl bg-black px-5 py-3 text-center text-eyebrow font-semibold text-white uppercase md:top-10 md:left-10 lg:top-auto lg:right-10 lg:bottom-10 lg:left-auto lg:max-w-52 lg:py-4">
                  {t(`programs.names.${program}`)}
                </span>
                <h2 className="max-w-xl font-serif text-h2 leading-tight font-extrabold text-white lg:max-w-[60%] lg:text-h2">
                  <LocalizedLink
                    to={{ key: 'program', program }}
                    className="after:absolute after:inset-0"
                    aria-label={t(`programs.names.${program}`)}
                  >
                    {tp(`program.items.${program}.summary`)}
                  </LocalizedLink>
                </h2>
                <p className="mt-4 max-w-xl text-white/85 lg:max-w-[60%]">
                  {tp(`program.items.${program}.tagline`)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
