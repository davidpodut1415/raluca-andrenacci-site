import { LOCALES } from '@raluca/shared';
import { describe, expect, it } from 'vitest';
import {
  alternatePath,
  buildPath,
  matchPath,
  PROGRAM_KEYS,
  PROGRAM_SLUGS,
  routePattern,
  STATIC_ROUTE_KEYS,
  STATIC_ROUTES,
} from './routes';

describe('buildPath', () => {
  it('serves Romanian at the root and prefixes other locales', () => {
    expect(buildPath('ro', { key: 'home' })).toBe('/');
    expect(buildPath('en', { key: 'home' })).toBe('/en');
    expect(buildPath('it', { key: 'home' })).toBe('/it');
  });

  it('localizes static routes', () => {
    expect(buildPath('ro', { key: 'about' })).toBe('/despre-mine');
    expect(buildPath('en', { key: 'about' })).toBe('/en/about');
    expect(buildPath('it', { key: 'contact' })).toBe('/it/contatti');
  });

  it('localizes program and post URLs', () => {
    expect(buildPath('ro', { key: 'program', program: 'coLeadership' })).toBe(
      '/programe/co-leadership-fondator-nextgen',
    );
    expect(buildPath('en', { key: 'post', slug: 'hello' })).toBe('/en/blog/hello');
  });
});

describe('matchPath', () => {
  it('round-trips every route in every locale', () => {
    for (const locale of LOCALES) {
      for (const key of STATIC_ROUTE_KEYS) {
        const path = buildPath(locale, { key });
        expect(matchPath(path)).toEqual({ locale, target: { key } });
      }
      for (const program of PROGRAM_KEYS) {
        const path = buildPath(locale, { key: 'program', program });
        expect(matchPath(path)).toEqual({ locale, target: { key: 'program', program } });
      }
    }
  });

  it('returns null for unknown paths', () => {
    expect(matchPath('/nope')).toBeNull();
    expect(matchPath('/en/despre-mine')).toBeNull(); // RO slug under the EN prefix
    expect(matchPath('/programe/not-a-program')).toBeNull();
    expect(matchPath('/ro/despre-mine')).toBeNull(); // RO has no prefix
    expect(matchPath('/despre-mine/extra/segments')).toBeNull();
  });

  it('treats blog sub-paths as posts', () => {
    expect(matchPath('/blog/cat-este-suficient')).toEqual({
      locale: 'ro',
      target: { key: 'post', slug: 'cat-este-suficient' },
    });
  });
});

describe('alternatePath', () => {
  it('maps a page to its equivalent in another locale', () => {
    expect(alternatePath('/despre-mine', 'en')).toBe('/en/about');
    expect(alternatePath('/en/programs', 'it')).toBe('/it/programmi');
    expect(alternatePath('/it/programmi/audit-del-presente', 'ro')).toBe(
      '/programe/auditul-prezentului-tau',
    );
  });

  it('falls back to the blog index for posts and home for unknown paths', () => {
    expect(alternatePath('/blog/some-post', 'en')).toBe('/en/blog');
    expect(alternatePath('/whatever', 'it')).toBe('/it');
  });
});

describe('route table integrity', () => {
  it('has unique paths within each locale', () => {
    for (const locale of LOCALES) {
      const statics = STATIC_ROUTE_KEYS.map((k) => STATIC_ROUTES[k][locale]);
      expect(new Set(statics).size).toBe(statics.length);
      const programs = PROGRAM_KEYS.map((k) => PROGRAM_SLUGS[k][locale]);
      expect(new Set(programs).size).toBe(programs.length);
    }
  });

  it('builds router patterns with a slug param', () => {
    expect(routePattern('en', 'post')).toBe('/en/blog/:slug');
    expect(routePattern('ro', 'program')).toBe('/programe/:slug');
    expect(routePattern('ro', 'home')).toBe('/');
  });
});
