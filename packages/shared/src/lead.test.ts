import { describe, expect, it } from 'vitest';
import { leadInputSchema } from './lead.js';

const valid = {
  type: 'free_session',
  name: 'Ana Popescu',
  email: 'ana@example.com',
  message: 'Vreau să discutăm despre succesiune.',
  locale: 'ro',
  consent: true,
} as const;

describe('leadInputSchema', () => {
  it('accepts a valid lead', () => {
    expect(leadInputSchema.safeParse(valid).success).toBe(true);
  });

  it('requires explicit consent', () => {
    expect(leadInputSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it('rejects a filled honeypot', () => {
    expect(leadInputSchema.safeParse({ ...valid, website: 'http://spam.test' }).success).toBe(
      false,
    );
  });

  it('rejects unknown locales', () => {
    expect(leadInputSchema.safeParse({ ...valid, locale: 'fr' }).success).toBe(false);
  });
});
