import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type * as SiteModule from '../../lib/site';
import { renderApp, resetBrowserState } from '../../test/utils';
import { loadGtm, toConsentSignals } from './gtag';
import { readConsent, writeConsent } from './storage';

vi.mock('../../lib/site', async (importOriginal) => {
  const original = await importOriginal<typeof SiteModule>();
  return { ...original, site: { ...original.site, gtmId: 'GTM-TEST' } };
});

const dataLayerEntries = () =>
  (window.dataLayer ?? []).map((e) => Array.from(e as ArrayLike<unknown>));

beforeEach(resetBrowserState);

describe('storage', () => {
  it('round-trips a choice', () => {
    writeConsent({ analytics: true, marketing: false }, 1000);
    expect(readConsent(2000)).toEqual({ analytics: true, marketing: false, savedAt: 1000 });
  });

  it('expires after 12 months and ignores corrupt data', () => {
    writeConsent({ analytics: true, marketing: true }, 0);
    expect(readConsent(366 * 24 * 60 * 60 * 1000)).toBeNull();
    window.localStorage.setItem('ra_consent_v1', '{"analytics":"yes"}');
    expect(readConsent()).toBeNull();
  });
});

describe('gtag', () => {
  it('maps categories to Consent Mode v2 signals', () => {
    expect(toConsentSignals({ analytics: true, marketing: false })).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('injects the GTM script only once and only with an id', () => {
    loadGtm(undefined);
    expect(document.getElementById('gtm-script')).toBeNull();
    loadGtm('GTM-ABC');
    loadGtm('GTM-ABC');
    expect(document.querySelectorAll('#gtm-script')).toHaveLength(1);
  });
});

describe('cookie banner', () => {
  it('starts denied and loads no tags before a choice', async () => {
    renderApp('/');
    expect(await screen.findByRole('button', { name: 'Accept toate' })).toBeInTheDocument();
    const defaults = dataLayerEntries().find((e) => e[0] === 'consent' && e[1] === 'default');
    expect(defaults?.[2]).toMatchObject({ analytics_storage: 'denied', ad_storage: 'denied' });
    expect(document.getElementById('gtm-script')).toBeNull();
  });

  it('rejecting keeps tags unloaded and hides the banner', async () => {
    renderApp('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Refuz toate' }));
    expect(screen.queryByRole('button', { name: 'Accept toate' })).not.toBeInTheDocument();
    expect(document.getElementById('gtm-script')).toBeNull();
    expect(readConsent()).toMatchObject({ analytics: false, marketing: false });
  });

  it('accepting stores the choice and loads GTM', async () => {
    renderApp('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Accept toate' }));
    expect(document.getElementById('gtm-script')?.getAttribute('src')).toContain('GTM-TEST');
    const update = dataLayerEntries().find((e) => e[0] === 'consent' && e[1] === 'update');
    expect(update?.[2]).toMatchObject({ analytics_storage: 'granted', ad_storage: 'granted' });
    expect(readConsent()).toMatchObject({ analytics: true, marketing: true });
  });

  it('replays a stored choice without showing the banner', async () => {
    writeConsent({ analytics: true, marketing: false });
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.queryByRole('button', { name: 'Accept toate' })).not.toBeInTheDocument();
    await waitFor(() => expect(document.getElementById('gtm-script')).not.toBeNull());
  });

  it('lets the visitor customize and re-open settings from the footer', async () => {
    renderApp('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Personalizează' }));
    await userEvent.click(screen.getByLabelText('Analiză'));
    await userEvent.click(screen.getByRole('button', { name: 'Salvează alegerile' }));
    expect(readConsent()).toMatchObject({ analytics: true, marketing: false });

    await userEvent.click(screen.getByRole('button', { name: 'Setări cookie-uri' }));
    await waitFor(() => expect(screen.getByLabelText('Analiză')).toBeChecked());
  });
});
