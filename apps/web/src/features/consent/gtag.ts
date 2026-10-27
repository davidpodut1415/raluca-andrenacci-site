import type { ConsentChoice } from './storage';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Google Consent Mode v2 signals derived from our two user-facing categories. */
export function toConsentSignals(choice: ConsentChoice) {
  const analytics = choice.analytics ? 'granted' : 'denied';
  const marketing = choice.marketing ? 'granted' : 'denied';
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  } as const;
}

// The dataLayer must receive the `arguments` object (not an array) for gtag.js to process commands.
function gtag(..._args: unknown[]): void {
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Must run before any Google tag loads. Everything starts denied. */
export function setConsentDefaults(): void {
  gtag('consent', 'default', {
    ...toConsentSignals({ analytics: false, marketing: false }),
    wait_for_update: 500,
  });
}

export function updateConsent(choice: ConsentChoice): void {
  gtag('consent', 'update', toConsentSignals(choice));
}

/** Injects the GTM container once; callers must only invoke it after the user granted consent. */
export function loadGtm(id: string | undefined, doc: Document = document): void {
  if (!id || doc.getElementById('gtm-script')) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = doc.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  doc.head.appendChild(script);
}
