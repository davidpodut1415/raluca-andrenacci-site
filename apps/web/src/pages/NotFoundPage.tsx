import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { ProgramTilesGrid } from '../components/tiles/Sections';
import { SectionLabel } from '../components/tiles/Tiles';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { PROGRAM_KEYS } from '../i18n/routes';

/** Page not found: a black message cell, a yellow way back, and the programs to explore. */
export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t('notFound.title')} noindex />
      <header className="grid gap-0.5 lg:grid-cols-3">
        <div className="bg-black p-3 text-white md:p-4 lg:col-span-2">
          <h1 className="text-display text-white">{t('notFound.headline')}</h1>
        </div>
        <LocalizedLink
          to={{ key: 'home' }}
          className="flex min-h-24 items-end justify-between bg-badge p-3 text-h3 font-extrabold text-black hover:brightness-95 md:p-4"
        >
          {t('notFound.back')}
          <span aria-hidden="true">→</span>
        </LocalizedLink>
      </header>
      <section className="mt-16">
        <SectionLabel title={t('notFound.explore')} />
        <ProgramTilesGrid programs={PROGRAM_KEYS.slice(0, 3)} />
      </section>
    </>
  );
}
