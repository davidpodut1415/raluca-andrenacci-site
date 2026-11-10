import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../i18n';
import { renderApp, resetBrowserState } from '../test/utils';

beforeEach(resetBrowserState);

describe('routing and i18n', () => {
  it('renders the Romanian home at /', async () => {
    renderApp('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /succesiune fără conflict/i }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('ro');
  });

  it('switches to English at /en', async () => {
    renderApp('/en');
    expect(
      await screen.findByRole('heading', { level: 1, name: /succession without conflict/i }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    expect(i18n.language).toBe('en');
  });

  it('switches to Italian at /it', async () => {
    renderApp('/it');
    expect(
      await screen.findByRole('heading', { level: 1, name: /successione senza conflitti/i }),
    ).toBeInTheDocument();
  });

  it('serves localized inner pages with title, canonical and hreflang tags', async () => {
    renderApp('/en/about');
    expect(
      await screen.findByRole('heading', { level: 1, name: /mentor, coach/i }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe('About — Raluca Andrenacci'));
    const alternates = [...document.querySelectorAll('link[rel="alternate"]')].map((l) => [
      l.getAttribute('hreflang'),
      new URL(l.getAttribute('href') ?? '').pathname,
    ]);
    expect(alternates).toEqual([
      ['ro', '/despre-mine'],
      ['en', '/en/about'],
      ['it', '/it/chi-sono'],
      ['x-default', '/despre-mine'],
    ]);
  });

  it('resolves program detail pages by localized slug', async () => {
    renderApp('/it/programmi/audit-del-presente');
    expect(
      await screen.findByRole('heading', { level: 1, name: "L'Audit del Tuo Presente" }),
    ).toBeInTheDocument();
  });

  it('shows a 404 for unknown paths and unknown program slugs', async () => {
    const { unmount } = renderApp('/nu-exista');
    expect(
      await screen.findByRole('heading', { level: 1, name: /nu am găsit ce căutai/i }),
    ).toBeInTheDocument();
    unmount();
    renderApp('/programe/nu-exista');
    expect(
      await screen.findByRole('heading', { level: 1, name: /nu am găsit ce căutai/i }),
    ).toBeInTheDocument();
  });
});

describe('sidebar', () => {
  it('marks the current section in the main navigation', async () => {
    renderApp('/en/programs');
    await screen.findByRole('heading', { level: 1, name: /mentoring programs/i });
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'Programs' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('switches language from the sidebar to the equivalent page', async () => {
    renderApp('/en/programs');
    await screen.findByRole('heading', { level: 1, name: /mentoring programs/i });

    const group = screen.getByRole('group', { name: 'Language' });
    expect(within(group).getByRole('link', { name: 'RO' })).toHaveAttribute('href', '/programe');
    expect(within(group).getByRole('link', { name: 'IT' })).toHaveAttribute(
      'href',
      '/it/programmi',
    );
    expect(within(group).getByRole('link', { name: 'EN' })).toHaveAttribute('aria-current', 'page');

    await userEvent.click(within(group).getByRole('link', { name: 'IT' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: /programmi di mentoring/i }),
    ).toBeInTheDocument();
  });

  it('navigates between pages and keeps the free-session CTA pointing at contact', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const cta = screen.getAllByRole('link', { name: 'Programează sesiunea' })[0];
    expect(cta).toHaveAttribute('href', '/contact?type=free-session');

    await userEvent.click(screen.getAllByRole('link', { name: 'Despre mine' })[0]!);
    expect(
      await screen.findByRole('heading', { level: 1, name: /mentor, coach/i }),
    ).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const toggle = screen.getByRole('button', { name: /^Meniu/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).toBeNull();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();

    await userEvent.keyboard('{Escape}');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});
