import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Faq } from '../components/blocks/Faq';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Checkbox, FormField, Input, Textarea } from '../components/ui/form';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { Section, SectionHeading } from '../components/ui/layout';
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
      <PageHeader
        eyebrow={tp('contact.eyebrow')}
        title={tp('contact.title')}
        lead={tp('contact.lead')}
      />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="max-w-xl">
          <form
            className="flex flex-col gap-6"
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
                className="ml-8 inline-flex min-h-11 items-center text-small text-burgundy-700 underline underline-offset-4"
              >
                {t('footer.privacy')}
              </LocalizedLink>
            </div>
            <div className="flex flex-col gap-4">
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

          <p className="mt-12">
            <span className="text-ink-500">{tp('contact.direct.title')}: </span>
            <a
              href={`mailto:${site.email}`}
              className="text-burgundy-700 underline underline-offset-4"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading title={tp('programsPage.faq.title')} />
        <Faq items={items<FaqItem>('programsPage.faq.items')} />
      </Section>
    </>
  );
}
