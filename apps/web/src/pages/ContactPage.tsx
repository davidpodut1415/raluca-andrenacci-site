import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Faq } from '../components/blocks/Faq';
import { NumberedList } from '../components/blocks/NumberedList';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Checkbox, FormField, Input, Select, Textarea } from '../components/ui/form';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { Card, Section, SectionHeading } from '../components/ui/layout';
import { ScrollFill } from '../components/ui/ScrollFill';
import { PROGRAM_KEYS } from '../i18n/routes';
import { site } from '../lib/site';
import { usePages } from '../lib/usePages';

const AUDIENCES = ['founder', 'successor', 'executive', 'other'] as const;

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Layout and fields are final; submission is wired to POST /api/leads in Phase 4,
 * so the submit button stays disabled until then.
 */
export function ContactPage() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Card className="md:p-10">
              <h2 className="mb-8 text-h3">{tp('contact.form.title')}</h2>
              <form
                className="grid gap-6 sm:grid-cols-2"
                aria-describedby={pendingId}
                onSubmit={(e) => e.preventDefault()}
              >
                <FormField label={tp('contact.form.name')} required>
                  {(p) => <Input {...p} name="name" autoComplete="name" />}
                </FormField>
                <FormField label={tp('contact.form.email')} required>
                  {(p) => <Input {...p} name="email" type="email" autoComplete="email" />}
                </FormField>
                <FormField label={tp('contact.form.phone')}>
                  {(p) => <Input {...p} name="phone" type="tel" autoComplete="tel" />}
                </FormField>
                <FormField label={tp('contact.form.audience')}>
                  {(p) => (
                    <Select {...p} name="audience" defaultValue="">
                      <option value="" disabled>
                        {tp('contact.form.audiencePlaceholder')}
                      </option>
                      {AUDIENCES.map((a) => (
                        <option key={a} value={a}>
                          {tp(`contact.form.audienceOptions.${a}`)}
                        </option>
                      ))}
                    </Select>
                  )}
                </FormField>
                <FormField label={tp('contact.form.program')} className="sm:col-span-2">
                  {(p) => (
                    <Select {...p} name="program" defaultValue="">
                      <option value="">{tp('contact.form.programPlaceholder')}</option>
                      {PROGRAM_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {t(`programs.names.${key}`)}
                        </option>
                      ))}
                    </Select>
                  )}
                </FormField>
                <FormField
                  label={tp('contact.form.message')}
                  hint={tp('contact.form.messageHint')}
                  required
                  className="sm:col-span-2"
                >
                  {(p) => <Textarea {...p} name="message" />}
                </FormField>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Checkbox name="consent" required label={tp('contact.form.consent')} />
                  <LocalizedLink
                    to={{ key: 'privacy' }}
                    className="ml-8 text-small text-burgundy-700 underline underline-offset-4"
                  >
                    {t('footer.privacy')}
                  </LocalizedLink>
                </div>
                <div className="flex flex-col gap-4 sm:col-span-2">
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
            </Card>
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl">
              <Img
                name="mentoring-session"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-3/2 w-full object-cover"
              />
            </div>
            <div>
              <h2 className="mb-6 text-h3">{tp('contact.next.title')}</h2>
              <ol className="flex flex-col gap-4">
                {list('contact.next.steps').map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-burgundy-700 text-small font-semibold text-burgundy-700"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="mb-4 text-h3">{tp('contact.direct.title')}</h2>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-burgundy-700 underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-2 text-ink-500">{t('footer.location')}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollFill as="h2" text={tp('contact.benefits.title')} className="font-extrabold" />
          </div>
          <div className="lg:col-span-8">
            <NumberedList items={list('contact.benefits.items')} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title={tp('programsPage.faq.title')} />
        <Faq items={items<FaqItem>('programsPage.faq.items')} />
      </Section>
    </>
  );
}
