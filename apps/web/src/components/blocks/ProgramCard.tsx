import { useTranslation } from 'react-i18next';
import type { ProgramKey } from '../../i18n/routes';
import { usePages } from '../../lib/usePages';
import { ArrowRightIcon } from '../ui/icons';
import { LocalizedLink } from '../ui/LocalizedLink';

/** Whole card is clickable via a stretched link on the title. */
export function ProgramCard({ program }: { program: ProgramKey }) {
  const { t } = useTranslation();
  const { t: tp } = usePages();

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card transition-colors hover:border-burgundy-700 md:p-8">
      <h3 className="text-h4">
        <LocalizedLink
          to={{ key: 'program', program }}
          className="after:absolute after:inset-0 after:rounded-xl"
        >
          {t(`programs.names.${program}`)}
        </LocalizedLink>
      </h3>
      <p className="mt-3 text-ink-500">{tp(`program.items.${program}.summary`)}</p>
      <p className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-burgundy-700">
        {tp('home.programs.learnMore')}
        <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}
