import { useState } from 'react';
import { NumberedList } from '../components/blocks/NumberedList';
import { PageHeader } from '../components/blocks/PageHeader';
import { StatsBand } from '../components/blocks/StatsBand';
import { StepCards } from '../components/blocks/StepCards';
import { Seo } from '../components/Seo';
import { Button, ButtonLink } from '../components/ui/Button';
import { Checkbox, FormField, Input, Select, Textarea } from '../components/ui/form';
import { Card, Chip, Eyebrow, Section, SectionHeading } from '../components/ui/layout';
import { cn } from '../lib/cn';

/** Dev-only reference page (route registered only when `import.meta.env.DEV`). Not translated on purpose. */
const SWATCHES = [
  ['burgundy-700', 'bg-burgundy-700'],
  ['burgundy-800', 'bg-burgundy-800'],
  ['burgundy-100', 'bg-burgundy-100'],
  ['ink-900', 'bg-ink-900'],
  ['espresso-900 (footer)', 'bg-espresso-900'],
  ['ink-700', 'bg-ink-700'],
  ['ink-500', 'bg-ink-500'],
  ['grey-50', 'bg-grey-50'],
  ['grey-100', 'bg-grey-100'],
  ['line', 'bg-line'],
  ['success', 'bg-success'],
  ['error', 'bg-error'],
] as const;

const TYPE_SCALE = [
  ['Display', 'text-display font-serif font-bold text-ink-900'],
  ['h2', 'text-h2 font-serif font-bold text-ink-900'],
  ['h3', 'text-h3 font-serif font-semibold text-ink-900'],
  ['h4', 'text-h4 font-serif font-semibold text-ink-900'],
  ['Body', 'text-body'],
  ['Small', 'text-small'],
  ['Eyebrow', 'text-eyebrow font-semibold text-burgundy-700 uppercase'],
] as const;

export function Styleguide() {
  const [showError, setShowError] = useState(true);

  return (
    <>
      <Seo title="Styleguide" noindex />
      <PageHeader
        eyebrow="Design system"
        title="Styleguide"
        lead="Tokens and components from docs/03-DESIGN-SYSTEM.md. Dev only."
      />

      <Section>
        <SectionHeading title="Colour" />
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {SWATCHES.map(([name, cls]) => (
            <li key={name}>
              <div className={cn('h-16 rounded-xl border border-line', cls)} />
              <p className="mt-2 text-small">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Typography" />
        <dl className="mt-8 flex flex-col gap-6">
          {TYPE_SCALE.map(([label, cls]) => (
            <div key={label} className="grid gap-1 md:grid-cols-[8rem_1fr] md:items-baseline">
              <dt className="text-small text-ink-500">{label}</dt>
              <dd className={cls}>Succesiune fără conflict ăâîșț</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading title="Buttons and chips" />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button size="lg">Large</Button>
          <ButtonLink to={{ key: 'contact' }} variant="secondary">
            Link button
          </ButtonLink>
          <Chip>Chip</Chip>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Cards" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <Eyebrow>Eyebrow</Eyebrow>
            <h3 className="mt-2">Card title</h3>
            <p className="mt-2 text-ink-500">
              Cards use the 16px radius, a 1px line border and one shadow token.
            </p>
          </Card>
          <Card>
            <h3>Second card</h3>
            <p className="mt-2 text-ink-500">Body copy is 16–18px in ink-700 / ink-500.</p>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Form controls" />
        <form
          className="mt-8 grid max-w-2xl gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setShowError((v) => !v);
          }}
        >
          <FormField label="Name" required hint="As you want to be addressed.">
            {(p) => <Input {...p} autoComplete="name" />}
          </FormField>
          <FormField
            label="Email"
            required
            error={showError ? 'Enter a valid email address.' : undefined}
          >
            {(p) => <Input {...p} type="email" autoComplete="email" />}
          </FormField>
          <FormField label="I am a…">
            {(p) => (
              <Select {...p} defaultValue="">
                <option value="" disabled>
                  Choose
                </option>
                <option>Founder</option>
                <option>Successor</option>
              </Select>
            )}
          </FormField>
          <FormField label="Message" required>
            {(p) => <Textarea {...p} />}
          </FormField>
          <Checkbox label="I agree to the processing of my data." />
          <div>
            <Button type="submit">Toggle error state</Button>
          </div>
        </form>
      </Section>

      <Section>
        <SectionHeading title="Numbered list" />
        <NumberedList items={['First direction', 'Second direction', 'Third direction']} />
      </Section>

      <Section>
        <SectionHeading title="Step cards" />
        <StepCards
          steps={[
            { title: 'Step one', text: 'Short supporting text.' },
            { title: 'Step two', text: 'Short supporting text.' },
            { title: 'Step three' },
            { title: 'Step four' },
          ]}
        />
      </Section>

      <StatsBand
        stats={[
          { value: '20+', label: 'years' },
          { value: '3', label: 'industries' },
          { value: '90', label: 'days' },
          { value: '1:1', label: 'sessions' },
        ]}
      />
    </>
  );
}
