import { screen } from '@testing-library/react';
import axe from 'axe-core';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderApp, resetBrowserState } from '../test/utils';

beforeEach(resetBrowserState);

async function violations(container: HTMLElement) {
  // jsdom has no layout/paint, so colour contrast is checked separately (see docs/03-DESIGN-SYSTEM.md).
  const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
  return results.violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
  );
}

describe('accessibility (axe)', () => {
  it.each(['/', '/en', '/it', '/programe', '/en/programs/entrepreneur-in-residence', '/nu-exista'])(
    '%s has no violations with the cookie banner open',
    async (path) => {
      const { container } = renderApp(path);
      await screen.findByRole('heading', { level: 1 });
      expect(await violations(container)).toEqual([]);
    },
  );

  it('has no violations once consent was given', async () => {
    window.localStorage.setItem(
      'ra_consent_v1',
      JSON.stringify({ analytics: false, marketing: false, savedAt: Date.now() }),
    );
    const { container } = renderApp('/en/contact');
    await screen.findByRole('heading', { level: 1 });
    expect(await violations(container)).toEqual([]);
  });
});
