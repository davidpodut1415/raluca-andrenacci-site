const STORAGE_KEY = 'ra_consent_v1';
/** Choices are re-requested after 12 months. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsent extends ConsentChoice {
  savedAt: number;
}

export function readConsent(now: number = Date.now()): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof (parsed as StoredConsent).analytics !== 'boolean' ||
      typeof (parsed as StoredConsent).marketing !== 'boolean' ||
      typeof (parsed as StoredConsent).savedAt !== 'number'
    ) {
      return null;
    }
    const stored = parsed as StoredConsent;
    return now - stored.savedAt > MAX_AGE_MS ? null : stored;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice, now: number = Date.now()): StoredConsent {
  const stored: StoredConsent = { ...choice, savedAt: now };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage unavailable (private mode): the choice still applies for this page view.
  }
  return stored;
}
