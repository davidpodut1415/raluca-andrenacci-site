import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { site } from '../../lib/site';
import { loadGtm, setConsentDefaults, updateConsent } from './gtag';
import { readConsent, writeConsent, type ConsentChoice, type StoredConsent } from './storage';

interface ConsentContextValue {
  /** `null` until the visitor has made a choice (the banner is shown). */
  consent: StoredConsent | null;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choice: ConsentChoice) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function apply(choice: ConsentChoice) {
  updateConsent(choice);
  if (choice.analytics || choice.marketing) loadGtm(site.gtmId);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(() => readConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Defaults must be pushed before any tag can load; a stored choice is replayed right after.
  useEffect(() => {
    setConsentDefaults();
    if (consent) apply(consent);
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback((choice: ConsentChoice) => {
    setConsent(writeConsent(choice));
    setPreferencesOpen(false);
    apply(choice);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      preferencesOpen,
      acceptAll: () => save({ analytics: true, marketing: true }),
      rejectAll: () => save({ analytics: false, marketing: false }),
      save,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, preferencesOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}
