import { Seo } from '../components/Seo';
import { Cell, Box, SectionLabel, TextTile, Tile, TileGrid } from '../components/tiles/Tiles';
import { PageIntro } from '../components/tiles/Sections';
import { Button } from '../components/ui/Button';
import { Checkbox, FormField, Input, Textarea } from '../components/ui/form';
import { cn } from '../lib/cn';

/** Dev-only reference page (route registered only when `import.meta.env.DEV`). Not translated on purpose. */
const SWATCHES = [
  ['black', 'bg-black'],
  ['ink-700', 'bg-ink-700'],
  ['ink-500', 'bg-ink-500'],
  ['tint-100 (active)', 'bg-tint-100'],
  ['badge', 'bg-badge'],
  ['grey-100', 'bg-grey-100'],
  ['success', 'bg-success'],
  ['error', 'bg-error'],
] as const;

const TYPE_SCALE = [
  ['Display', 'text-display font-extrabold'],
  ['h2', 'text-h2 font-extrabold'],
  ['h3', 'text-h3 font-bold'],
  ['h4', 'text-h4 font-bold'],
  ['Body', 'text-body'],
  ['Small', 'text-small'],
] as const;

export function Styleguide() {
  return (
    <>
      <Seo title="Styleguide" noindex />
      <PageIntro title="Styleguide" lead="Tokens and tile components. Dev only." />

      <div className="flex flex-col gap-12">
        <section>
          <SectionLabel title="Colour" />
          <ul className="grid grid-cols-2 gap-0.5 md:grid-cols-4">
            {SWATCHES.map(([name, cls]) => (
              <li key={name}>
                <div className={cn('h-16 border border-black', cls)} />
                <p className="mt-1 text-small">{name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel title="Type" />
          <ul className="flex flex-col gap-3">
            {TYPE_SCALE.map(([name, cls]) => (
              <li key={name} className="flex items-baseline gap-6">
                <span className="w-20 shrink-0 text-small text-ink-500">{name}</span>
                <span className={cls}>Succesiune fără conflict</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel title="Cells and tiles" />
          <TileGrid>
            <li>
              <Tile
                title="Tile with a headline over media"
                meta="Meta line"
                badge="Badge"
                media={<div className="size-full bg-grey-100" />}
              />
            </li>
            <li>
              <TextTile className="h-full">Text tile for quotes and numbers.</TextTile>
            </li>
            <li>
              <Box className="h-full">Outlined box for lead text and forms.</Box>
            </li>
          </TileGrid>
          <div className="mt-0.5 flex gap-0.5">
            <Cell>Cell</Cell>
            <Cell className="bg-tint-100 text-black">Active cell</Cell>
          </div>
        </section>

        <section>
          <SectionLabel title="Buttons and form" />
          <Box className="flex max-w-xl flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="light">Accent</Button>
              <Button disabled>Disabled</Button>
            </div>
            <FormField label="Name" required>
              {(p) => <Input {...p} />}
            </FormField>
            <FormField label="Message" error="Required">
              {(p) => <Textarea {...p} />}
            </FormField>
            <Checkbox label="Consent" />
          </Box>
        </section>
      </div>
    </>
  );
}
