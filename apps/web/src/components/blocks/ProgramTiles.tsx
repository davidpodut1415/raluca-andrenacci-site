import { useTranslation } from 'react-i18next';
import type { ProgramKey } from '../../i18n/routes';
import { PROGRAM_IMAGES } from '../../lib/programImages';
import { usePages } from '../../lib/usePages';
import { Img } from '../ui/Img';
import { CardArrow } from '../ui/CardArrow';
import { LocalizedLink } from '../ui/LocalizedLink';

/** Tall photo tiles (same look as the media carousel cards), one per program, whole tile clickable. */
export function ProgramTiles({ programs }: { programs: ProgramKey[] }) {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {programs.map((program) => (
        <li key={program}>
          <article className="group relative isolate flex aspect-2/3 flex-col items-center justify-end overflow-hidden rounded-2xl bg-ink-900 px-6 pb-10 text-center text-white transition-transform duration-500 hover:scale-[1.03]">
            <Img
              name={PROGRAM_IMAGES[program]}
              decorative
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
              className="absolute inset-0 -z-20 size-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-black/30 bg-linear-to-t from-black/90 via-black/60 to-transparent"
            />
            <h3 className="font-serif text-h4 leading-tight font-extrabold text-white uppercase">
              <LocalizedLink
                to={{ key: 'program', program }}
                className="after:absolute after:inset-0"
              >
                {t(`programs.names.${program}`)}
              </LocalizedLink>
            </h3>
            <p className="mt-3 text-small text-white/90">
              {tp(`program.items.${program}.summary`)}
            </p>
            <CardArrow />
          </article>
        </li>
      ))}
    </ul>
  );
}
