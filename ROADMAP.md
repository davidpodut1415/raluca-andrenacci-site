# Roadmap

Sizes: **S** ≈ ½–1 day · **M** ≈ 2–3 days · **L** ≈ 4–6 days (single developer + Claude). Phases can overlap where noted. Tick boxes as we go.

## Phase 0 — Decisions & inputs _(blocks Phase 3 content, not Phase 1)_

- [ ] Answer open questions in `docs/00-DECISIONS.md` (assets, consent for testimonials, inbox/domain, Render plan) — **S**
- [ ] Collect originals: portraits, logo, Forbes cover, certificates, press logos — **S**
- [ ] Export WordPress content (13 posts × RO/EN/IT, page texts, media) — **S**
- [ ] Confirm final hex values (cream/blush) from originals; confirm EN/IT program titles — **S**
- [ ] Gather 3 reference sites + moodboard — **S**
- **Done when:** all "blocking" questions answered; asset folder `assets-source/` populated.

## Phase 1 — Repo scaffold & tooling — **M**

- [x] Monorepo (npm workspaces): `apps/web`, `apps/api`, `packages/shared`
- [x] Vite + React + TS + Tailwind + ESLint/Prettier/Husky; Vitest set up in both apps
- [x] Express + TS skeleton, zod env validation, `/api/health`, Prisma + first migration, local Postgres via Docker Compose
- [x] GitHub Actions CI (lint, typecheck, test, build)
- [x] `.env.example`, `render.yaml` first draft
- [ ] Push to GitHub, connect Render, deploy **staging** from the `staging` branch (needs repo + Render account)
- **Done when:** `npm run dev` starts web+api; CI green; empty app deploys to Render **staging** (proves the pipeline early).

> Phase 1 status: code complete and verified locally (lint, typecheck, 14 tests, production build, migration applied to a scratch Postgres, built server smoke-tested). Only the Render staging deploy remains, which needs a Git remote and a Render account.

## Phase 2 — Design system & app shell — **L**

- [x] Tailwind tokens from `docs/03-DESIGN-SYSTEM.md` (colors, type scale, radii, shadow); self-hosted fonts incl. Romanian glyph check
- [x] Primitives (Button, Input, Card, Chip, Section, Container…) + a `/styleguide` dev page
- [x] Header (sticky, mobile drawer, language switcher), Footer, CTABand, 404
- [x] i18n infrastructure: localized route table, `LocalizedLink`, `hreflang`, language switcher
- [x] Cookie banner + preferences + Consent Mode v2 (GTM loads post-consent)
- [x] **ADR-1 decision** (SEO/prerender approach) recorded
- **Done when:** shell works in RO/EN/IT at 360/768/1440; axe shows 0 critical issues; styleguide reviewed with client.

> Phase 2 status: complete (lint, typecheck, 35 web tests incl. axe on 7 routes, production build; checked visually at 375 / 800 / 1280 px). Still to do with real data/devices: colour-contrast audit in a real browser (axe in jsdom skips it), and a screen-reader pass on the mobile menu and consent dialog (Phase 7). `/styleguide` exists in dev only.

## Phase 3 — Public pages (RO first, strings externalized for EN/IT) — **L**

- [x] Home (sections per spec §4.1) with placeholder-then-real content
- [x] Programs overview + 6 program detail pages (5 family-business + Audit)
- [x] About (credentials, press & speaking)
- [x] Contact page layout + FAQ (form wired in Phase 4)
- [x] Legal pages (privacy, cookies) — text imported from the old site, **needs legal review**
- [x] Short testimonials (grid, not a carousel) and credibility bar — **excerpts need client approval**
- **Done when:** all pages responsive, no blank/hidden sections, content reviewed by client (RO), Lighthouse ≥ 90 on staging.
- [ ] Client review of RO copy; native review of EN/IT; replace web-compressed photos with originals; real client approval of testimonials (see `docs/00-DECISIONS.md` → Phase 3 content notes)
- [ ] Lighthouse run on staging (not possible until deployed)

> Phase 3 status: built and verified locally (57 web tests incl. axe, translation key-parity test for RO/EN/IT, visual check at 375 and 1440 px). Also done in this pass, at the client's request: navbar/footer redesign following the reference screenshots, language dropdown, 8-pt spacing standards (see `docs/03-DESIGN-SYSTEM.md` §10), and site images pulled into the project.

## Phase 4 — Lead capture backend — **M** _(can overlap Phase 3)_

- [ ] `POST /api/leads` with shared zod schema, Turnstile verify, honeypot, rate-limit
- [ ] Resend integration: notification to Raluca (+ optional localized confirmation to sender)
- [ ] ContactForm (react-hook-form) with a11y error handling, success/failure states, `?type=free-session&program=` prefill
- [ ] dataLayer event `lead_submit`; tests (API with Supertest, form with Testing Library)
- **Done when:** a test submission on staging lands in DB + inbox in < 10s; spam test (honeypot / no token / 6 rapid posts) is rejected.

## Phase 5 — Blog + admin — **L**

- [ ] Prisma models for posts/translations/categories; public `GET /posts`, `/posts/:slug`
- [ ] Blog index (filters, pagination), post page (Markdown render, TOC, related, JSON-LD)
- [ ] Admin auth (login/logout/session, CSRF), `create-admin` script
- [ ] Admin: posts list, per-locale editor with Markdown preview, publish/unpublish, cover upload to R2
- [ ] Admin: leads list, mark handled, CSV export
- **Done when:** Raluca can write, preview, publish and unpublish a post in RO/EN/IT without developer help; unauthenticated access to `/api/admin/*` returns 401 (tested).

## Phase 6 — Content migration & redirects — **M**

- [ ] `import-wordpress.ts`: 13 posts × available locales → Markdown, images downloaded to R2, categories assigned
- [ ] Final copy for all pages in RO/EN/IT (translation review by native speakers — IT especially)
- [ ] Redirect map (old → new) with automated test over the old sitemap URLs
- **Done when:** every URL in the old `sitemap.xml` returns 200 or a single 301 to a live page on staging; content parity checklist signed off.

## Phase 7 — Quality: SEO, a11y, performance, compliance — **M**

- [ ] Per-page meta, canonical, OG images, JSON-LD, `sitemap.xml`, `robots.txt`, hreflang audit
- [ ] Lighthouse ≥ 95 (mobile) on Home / Program / Post / Contact; CLS ≈ 0; image pipeline (WebP/AVIF, srcset)
- [ ] WCAG 2.2 AA audit (axe + manual keyboard + screen reader pass on forms and carousel)
- [ ] Security pass: CSP, headers, dependency audit, rate-limit review, PII/retention review
- [ ] Cross-browser/device checks (iOS Safari, Android Chrome, desktop trio)
- [ ] Playwright smoke tests: language switch, form submit (mock), blog read, admin login
- **Done when:** checklist in `docs/05-LAUNCH-CHECKLIST.md` (created in this phase) fully green.

## Phase 8 — Launch on Render — **S–M**

- [ ] Production service + Postgres on paid plans; env vars/secrets set; backups on
- [ ] Custom domain + TLS, `www`/apex canonical, DNS TTL lowered 24h before
- [ ] Staging UAT with client; freeze WordPress content
- [ ] Cutover: DNS switch → verify redirects, forms, GTM events (GA4 DebugView, Meta/LinkedIn test), Search Console sitemap submit
- [ ] Keep WordPress export/backup for 90 days; rollback plan documented
- **Done when:** production live, form tested end-to-end, no 404 spike in Search Console after 7 days.

## Phase 9 — Post-launch (backlog)

- Newsletter signup (Resend audience/Brevo), calendar booking (Cal.com embed) for the free session
- Case studies / press page, testimonials with photos or video
- Blog search, RSS, related-posts by category
- A/B test hero headline & CTA wording; heatmap review after 30 days
- Sentry + uptime alerts; monthly dependency updates

## Risks & mitigations

| Risk                                            | Mitigation                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Missing assets/translations stall content phase | Phase 0 early; build with placeholders; RO first                             |
| SEO loss at migration                           | Redirect map + automated test + Search Console monitoring                    |
| Italian/English copy quality                    | Native review before launch; no machine-only IT                              |
| Tracking breaks conversions (Ads/Meta)          | Keep same IDs; verify events in staging before cutover                       |
| Render free-tier limits (sleep, DB expiry)      | Use paid starter plans from staging-UAT on _(verify current Render pricing)_ |
| GDPR exposure from testimonials/PII             | Written consent, minimal data, retention policy, admin delete                |
