import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Faq } from '../components/blocks/Faq';
import { Seo } from '../components/Seo';
import { PageIntro, ArticleSection } from '../components/tiles/Sections';
import { Box, Cell } from '../components/tiles/Tiles';
import { Button } from '../components/ui/Button';
import { Checkbox, FormField, Input, Textarea } from '../components/ui/form';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { site } from '../lib/site';
import { usePages } from '../lib/usePages';

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Minimal, low-friction contact: name, email, message and one consent box in a single column.
 * Submission is wired to POST /api/leads in Phase 4, so the submit button stays disabled until then.
 */
export function ContactPage() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();
  const pendingId = useId();

  return (
    <>
      <Seo title={t('nav.contact')} description={tp('contact.seoDescription')} />
      <PageIntro
        eyebrow={tp('contact.eyebrow')}
        title={tp('contact.title')}
        lead={tp('contact.lead')}
      >
        <a
          href={`mailto:${site.email}`}
          className="font-extrabold break-all underline underline-offset-4"
        >
          {site.email}
        </a>
      </PageIntro>

      <div className="grid items-start gap-0.5 lg:grid-cols-3">
        <Cell className="text-h4">{tp('contact.form.submit')}</Cell>
        <Box className="lg:col-span-2">
          <form
            className="flex max-w-xl flex-col gap-6"
            aria-describedby={pendingId}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField label={tp('contact.form.name')} required>
              {(p) => <Input {...p} name="name" autoComplete="name" />}
            </FormField>
            <FormField label={tp('contact.form.email')} required>
              {(p) => <Input {...p} name="email" type="email" autoComplete="email" />}
            </FormField>
            <FormField label={tp('contact.form.message')} required>
              {(p) => <Textarea {...p} name="message" />}
            </FormField>
            <div className="flex flex-col gap-2">
              <Checkbox name="consent" required label={tp('contact.form.consent')} />
              <LocalizedLink
                to={{ key: 'privacy' }}
                className="ml-8 inline-flex min-h-11 items-center text-small underline underline-offset-4"
              >
                {t('footer.privacy')}
              </LocalizedLink>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Button type="submit" size="lg" disabled>
                  {tp('contact.form.submit')}
                </Button>
              </div>
              <p id={pendingId} className="text-small text-ink-500">
                {tp('contact.form.pending')}
              </p>
            </div>
          </form>
        </Box>
      </div>

      <ArticleSection title={tp('programsPage.faq.title')}>
        <Faq items={items<FaqItem>('programsPage.faq.items')} />
      </ArticleSection>
    </>
  );
}
