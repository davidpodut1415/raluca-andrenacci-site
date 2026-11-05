import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn';
import type { ImageName } from '../../lib/images.generated';
import { PROGRAM_KEYS, type ProgramKey } from '../../i18n/routes';
import { usePages } from '../../lib/usePages';
import { ButtonLink } from '../ui/Button';
import { Img } from '../ui/Img';
import { LocalizedLink } from '../ui/LocalizedLink';
import { ArrowRightIcon } from '../ui/icons';
import { Eyebrow } from '../ui/layout';

const PROGRAMS = PROGRAM_KEYS.filter((key) => key !== 'audit');

/** Photo shown for each program (placeholders chosen from the available shots). */
const IMAGES: Record<Exclude<ProgramKey, 'audit'>, ImageName> = {
  coLeadership: 'desk-notebook',
  nextgenMentoring: 'portrait-armchair',
  successorIntegration: 'working-laptop',
  entrepreneurInResidence: 'marble-table',
  governanceBoard: 'portrait-leaning',
};

/**
 * Programs as a large typographic index: a stacked list of program names (active one dark, the
 * others dimmed) next to a rounded photo panel that follows hover/focus. Every name is a link.
 * Below `lg` the photo is dropped and each name shows its one-line summary instead.
 */
export function ProgramShowcase() {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  const [active, setActive] = useState<(typeof PROGRAMS)[number]>(PROGRAMS[0]!);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <Eyebrow>{tp('home.programs.eyebrow')}</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-extrabold">{tp('home.programs.title')}</h2>
        <p className="mt-3 max-w-xl text-ink-500">{tp('home.programs.lead')}</p>

        <ul className="mt-8 flex flex-col">
          {PROGRAMS.map((program) => {
            const isActive = program === active;
            return (
              <li key={program}>
                <LocalizedLink
                  to={{ key: 'program', program }}
                  onMouseEnter={() => setActive(program)}
                  onFocus={() => setActive(program)}
                  className="group flex items-center justify-between gap-6 py-4 [@media(max-height:820px)]:py-3"
                >
                  <span>
                    <span
                      className={cn(
                        'block font-serif text-h3 leading-tight font-extrabold transition-colors duration-300',
                        'text-ink-900',
                      )}
                    >
                      {t(`programs.names.${program}`)}
                    </span>
                    <span className="mt-1 block text-small text-ink-500 lg:hidden">
                      {tp(`program.items.${program}.summary`)}
                    </span>
                  </span>
                  <ArrowRightIcon
                    className={cn(
                      'size-6 shrink-0 text-burgundy-700 transition-all duration-300',
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : 'opacity-100 lg:-translate-x-2 lg:opacity-0',
                    )}
                  />
                </LocalizedLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <ButtonLink to={{ key: 'programs' }} size="lg">
            {tp('home.programs.cta')}
          </ButtonLink>
        </div>
      </div>

      <div className="hidden lg:col-span-5 lg:block">
        <div>
          <div className="relative h-[min(34rem,calc(100svh-12rem))] overflow-hidden rounded-2xl bg-ink-900 shadow-card">
            {PROGRAMS.map((program) => (
              <Img
                key={program}
                name={IMAGES[program]}
                decorative
                sizes="(min-width: 1024px) 38vw, 0px"
                className={cn(
                  'absolute inset-0 size-full object-cover object-top transition-opacity duration-500',
                  program === active ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
            />
            <p className="absolute inset-x-0 bottom-0 p-8 font-serif text-h4 leading-snug font-semibold text-white">
              {tp(`program.items.${active}.summary`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
