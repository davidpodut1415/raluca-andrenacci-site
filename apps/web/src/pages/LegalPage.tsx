import { useTranslation } from 'react-i18next';
import { useLocale } from '../app/LocaleContext';
import { LegalContent, type LegalBlock } from '../components/blocks/LegalContent';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { Section } from '../components/ui/layout';
import cookies from '../content/legal/ro/cookies.json';
import privacy from '../content/legal/ro/privacy.json';
import { usePages } from '../lib/usePages';

const DOCUMENTS = { privacy, cookies } as const;

/**
 * The legal text is carried over from the current site in Romanian and still needs a legal review
 * (it dates from 2023 and predates this site's consent flow). EN/IT show it with a notice.
 */
export function LegalPage({ document }: { document: keyof typeof DOCUMENTS }) {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  const locale = useLocale();
  const content = DOCUMENTS[document];
  const title = t(`footer.${document}`);

  return (
    <>
      <Seo title={title} noindex />
      <PageHeader
        title={title}
        lead={locale !== 'ro' ? tp('legal.translationNotice') : undefined}
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <LegalContent blocks={content.blocks as LegalBlock[]} />
      </Section>
    </>
  );
}
