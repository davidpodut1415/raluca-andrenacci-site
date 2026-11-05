# 00 — Decisions, Assumptions & Open Questions

## Confirmed by the client (2026-10-26)

| #   | Topic            | Decision                                                                                                                                                                                      |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Backend scope    | **Forms + blog admin**: contact / "first free session" form (DB + email + spam protection) and a protected blog admin (create/edit/publish posts). No calendar booking in v1.                 |
| D2  | Languages        | **RO + EN + IT from day one.** RO default at `/`, EN at `/en`, IT at `/it` (same scheme as today).                                                                                            |
| D3  | Visual direction | **Keep the brand, polish the layout** — and fix branding inconsistencies: colour consistency, shapes (radius system), fonts (see `03-DESIGN-SYSTEM.md`).                                      |
| D4  | Offer structure  | **Family business is the flagship.** Home leads with family-business succession/governance; "Auditul Prezentului Tău" becomes a secondary program for individual entrepreneurs/professionals. |

## Assumptions I made (change any of these)

| #   | Assumption                                                                                                                                | Why                                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A1  | **Monorepo** (npm workspaces): `apps/web` (Vite + React + TS + Tailwind) and `apps/api` (Node + Express + TS)                             | One repo, one `render.yaml`, shared types.                                                  |
| A2  | **PostgreSQL + Prisma**                                                                                                                   | Render-native managed DB; typed queries; migrations.                                        |
| A3  | **Render deployment = 1 Web Service + 1 Postgres** (the API also serves the built SPA)                                                    | Cheapest, no CORS, simplest cookies for admin auth. Can split into Static Site + API later. |
| A4  | **Public marketing pages are static content in i18n JSON**, not in the DB; only **blog posts** (+ leads, admin users) live in the DB      | Pages rarely change; avoids building a full CMS.                                            |
| A5  | **Email via Resend** (API) to `mentoringshop@gmail.com` (or a new address)                                                                | Simple, free tier; swappable via an `EmailService` interface.                               |
| A6  | **Spam protection: Cloudflare Turnstile + honeypot + rate-limit**                                                                         | Privacy-friendlier than reCAPTCHA.                                                          |
| A7  | **Blog images stored in S3-compatible storage (Cloudflare R2)**                                                                           | Render's disk is ephemeral unless you pay for a persistent disk.                            |
| A8  | **SEO for a SPA**: prerender/serve meta tags for public routes (see ADR-1 in `04-ARCHITECTURE.md`)                                        | Blog + landing pages must be indexable.                                                     |
| A9  | **Cookie consent** custom banner with Accept / Reject / Manage + Google Consent Mode v2; GTM/GA4/Meta/LinkedIn load only after consent    | GDPR (EU + Italy + Romania audience).                                                       |
| A10 | Keep existing blog slugs in RO; **301 redirects** from old URLs (`/servicii/` → `/programe`, `/<post-slug>/` → `/blog/<post-slug>`, etc.) | Preserve SEO.                                                                               |
| A11 | Admin = **single admin user** (email + password, Argon2, httpOnly session cookie), no roles                                               | Client is the only author.                                                                  |

## Open questions (need an answer before / during Phase 0)

1. **Assets** — can you get us original files: portrait photos (the Programs-page portrait is great), ForbesLife cover, EMCC certificate, logo (is the wordmark just text?), event photos? Without originals we'd re-use compressed web images.
2. **Content export** — OK to export WordPress content (WP-admin export, or `/wp-json/wp/v2/posts` if enabled _(verify)_) for the 13 posts + EN/IT versions? Are all three languages complete for pages **and** posts?
3. **Testimonials** — do we have written consent to publish names/ages/industries? Can we get **short versions** (1–2 sentences + a result highlight) and photos/logos? Which ones fit a _family-business_ flagship (only Ana D. clearly does)?
4. **"First free session"** — what happens after the form? (Email reply within X hours? Calendly/Cal.com link she already uses?) The current CTA links to an external scheduling page — keep it as a secondary option?
5. **Notification inbox & sender domain** — where should lead emails go, and can we verify a sending domain (e.g. `noreply@ralucaandrenacci.com`) for Resend?
6. **Domain/DNS access** at cutover (who controls `ralucaandrenacci.com`?) and a **maintenance window**.
7. **Analytics IDs** — keep GTM `GTM-TLZ64RRB`, GA4, Google Ads, Meta Pixel, LinkedIn Insight? Is Ads conversion tracking running (needs events on form submit)?
8. **Brand name** — master brand "Raluca Andrenacci" with "Auditul Prezentului Tău" as a program name? (Assumed yes.)
9. **EN title of the Audit** — "An Audit of Your **Presence**" vs "…**Present**"? Italian title?
10. **Pricing** — keep hidden, or add "Investment: by application" language on program pages?
11. **Legal pages** — do we have the current Privacy and Cookie policy texts to port (and review by her lawyer)?
12. **Render plan** — OK to use paid instances? (Free web services sleep; free Postgres expires — verify current Render pricing before launch.)
13. **Reference sites** — any sites she likes/dislikes?

## Phase 3 content notes (2026-10-27) — need client approval

- **Images:** 9 photos were pulled from the current site's media library (public WP REST API) into `assets-source/` (git-ignored) and optimized into `apps/web/public/images` with `npm run images`. They are web-compressed (max 1200–1667 px wide, already lossy WebP), so the hero/portraits are fine at current sizes but should be replaced by originals (Q1) before launch. Not used yet: the stock blog images (for blog import, Phase 6), a photo with an elderly relative (`my-family.webp`, personal, needs her OK), and the "R" logo mark.
- **Copy sources:** RO program texts, About bio, certifications, contact benefits and the Audit content are taken from the current site. **EN/IT versions of the 5 family programs, home sections and FAQ are my translations/drafts** — the current EN/IT "Services" pages still describe an older 3-month program, so there was nothing to reuse. All EN/IT copy needs native review.
- **Drafted by me (not on the current site):** home hero eyebrow, the 4 "challenge" cards, the 4 process steps, the FAQ answers, credibility-bar labels, "Mentor, coach și antreprenor" section title. Please approve or rewrite.
- **Testimonials:** home/Audit pages show **excerpts** of the existing testimonials (lightly trimmed). Need written consent and approval of the shortened wording (Q3).
- **Contact form:** layout done, submit disabled until Phase 4. The old form also asked for income ranges and 8 unnamed checkboxes; I did not carry those over (privacy-intrusive) — confirm.
- **Legal pages:** text imported from the current RO policies (dated 28 Feb 2023, mention the old cookie banner). They need a legal review and EN/IT translations; EN/IT pages currently show the RO text with a notice.
- **Old URLs for the redirect map (Phase 6):** EN `/en/about/`, `/en/services/`, `/en/latest-news-eng/`, `/en/get-in-touch/`; IT `/it/about-it/`, `/it/servizi/`, `/it/blog-2/`, `/it/contatti-coach-certificato/`; RO `/despre-mine/`, `/servicii/`, `/latest-news/`, `/contacte/`, plus booking pages `/programeaza-prima-sesiune-gratuita/`, `/en/schedule-your-first-free-session/`, `/it/prenota-la-tua-prima-sessione-gratuita/`, and legal `/politica-de-cookie-uri`, `/politica-de-confidentialitate`.

## Logos and hero video (2026-10-27)

- **Logos shown on the home page** (credibility bar): Forbes România, Ziarul Financiar, EMCC Global, FFI. Sources: Forbes România's own SVG (forbes.ro), Ziarul Financiar logo (zf.ro), EMCC Global logo (emccglobal.org), Family Firm Institute logo (Wikimedia Commons copy, **only 174×121 px, so it looks soft; ask FFI/the member portal for a vector**).
- **No separate logos exist for ForbesLife, Forbes CEE Forum, Forbes Power Breakfast or ZF Live** (only promo photos), so the Forbes mark stands for the first three and the ZF mark for ZF Live. The alt texts name the events.
- **Usage rights:** these are third-party trademarks. EMCC and FFI publish usage rules for accredited practitioners/members, and press logos normally need the publisher's OK. Confirm with the client before launch (and swap in the approved artwork).
- **Hero video:** `copy_75C95384…mp4` from the current site (9 s, silent, 724×1280 portrait). It is re-encoded to 720 px wide (`npm run video` → `hero.webm` 630 KB, `hero.mp4` 830 KB, JPG poster). Because it is portrait and low resolution, it is cropped and enlarged on desktop (soft, like on the old site) — **ask for a landscape 1080p original** for a sharper hero. It has a visible pause/play button and does not autoplay with `prefers-reduced-motion`.

## Placeholders added with the section templates (2026-11-05)

- **About stats:** "20+ years", "3 industries" and "EMCC accreditation" are real; **"40+ families and entrepreneurs mentored" is a placeholder** — replace with the real number or remove.
- **Programs stats** (1:1, 60 minutes, 90 days, 5 programs) come from the current site's program format.
- **Blog:** the five articles on the home page, blog index and post pages are the real titles from the old site with placeholder photos, invented categories and a "full article coming soon" body until Phase 5.
- **Program/banner photos** are the nine existing photos reused; several programs share a photo. Replace with dedicated photography.
- **Per-page CTA headlines** (home, about, programs, program, audit, blog) are drafts in `pages.json` → `ctaPanel`.
