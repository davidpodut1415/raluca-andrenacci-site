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
      await screen.findByRole('heading', { level: 1, name: 'Raluca Andrenacci' }),
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
      await screen.findByRole('heading', { level: 1, name: /pagina nu a fost găsită/i }),
    ).toBeInTheDocument();
    unmount();
    renderApp('/programe/nu-exista');
    expect(
      await screen.findByRole('heading', { level: 1, name: /pagina nu a fost găsită/i }),
    ).toBeInTheDocument();
  });
});

describe('header', () => {
  it('marks the current section in the main navigation', async () => {
    renderApp('/en/programs');
    await screen.findByRole('heading', { level: 1, name: /personalized mentoring/i });
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'Programs' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('switches language from a dropdown that links to the equivalent page', async () => {
    renderApp('/en/programs');
    await screen.findByRole('heading', { level: 1, name: /personalized mentoring/i });

    const toggle = screen.getAllByRole('button', { name: 'Language: English' })[0]!;
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'Română' })).not.toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('navigation', { name: 'Language' });
    expect(within(menu).getByRole('link', { name: 'Română' })).toHaveAttribute('href', '/programe');
    expect(within(menu).getByRole('link', { name: 'Italiano' })).toHaveAttribute(
      'href',
      '/it/programmi',
    );
    expect(within(menu).getByRole('link', { name: 'English' })).toHaveAttribute(
      'aria-current',
      'true',
    );

    await userEvent.click(within(menu).getByRole('link', { name: 'Italiano' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: /mentoring personalizzato/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Lingua' })).not.toBeInTheDocument();
  });

  it('closes the language dropdown with Escape and returns focus to the button', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const toggle = screen.getAllByRole('button', { name: /Limba: Română/ })[0]!;
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('link', { name: 'Română' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('navigates between pages and keeps the free-session CTA pointing at contact', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const cta = screen.getAllByRole('link', { name: 'Programează sesiunea' })[0];
    expect(cta).toHaveAttribute('href', '/contact?type=free-session');

    await userEvent.click(screen.getAllByRole('link', { name: 'Despre mine' })[0]!);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Raluca Andrenacci' }),
    ).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const toggle = screen.getByRole('button', { name: 'Deschide meniul' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Închide meniul' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.getElementById('mobile-menu')).not.toBeNull();

    await userEvent.keyboard('{Escape}');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});
