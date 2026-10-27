/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin for canonical/hreflang URLs, e.g. https://ralucaandrenacci.com */
  readonly VITE_SITE_URL?: string;
  /** Google Tag Manager container id; loaded only after consent. */
  readonly VITE_GTM_ID?: string;
}
