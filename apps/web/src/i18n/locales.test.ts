import { describe, expect, it } from 'vitest';
import enCommon from './locales/en/common.json';
import enConsent from './locales/en/consent.json';
import enPages from './locales/en/pages.json';
import itCommon from './locales/it/common.json';
import itConsent from './locales/it/consent.json';
import itPages from './locales/it/pages.json';
import roCommon from './locales/ro/common.json';
import roConsent from './locales/ro/consent.json';
import roPages from './locales/ro/pages.json';

/** Flattens an object into dotted key paths; array items become `key[]` with their own shape. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((v) => keyPaths(v, `${prefix}[]`))];
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

const namespaces = {
  common: [roCommon, enCommon, itCommon],
  consent: [roConsent, enConsent, itConsent],
  pages: [roPages, enPages, itPages],
} as const;

describe('translations', () => {
  for (const [name, [roFile, enFile, itFile]] of Object.entries(namespaces)) {
    it(`${name}: EN and IT have exactly the same keys (and list lengths) as RO`, () => {
      const expected = keyPaths(roFile).sort();
      expect(keyPaths(enFile).sort()).toEqual(expected);
      expect(keyPaths(itFile).sort()).toEqual(expected);
    });
  }

  it('has no empty strings', () => {
    for (const files of Object.values(namespaces)) {
      for (const file of files) {
        const empties = JSON.stringify(file).match(/:\s*""/g);
        expect(empties).toBeNull();
      }
    }
  });
});
