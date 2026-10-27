# 02 — Product Spec

## 1. Goals

1. Convert visitors (family-business owners, successors, senior professionals) into **"first free session"** requests.
2. Present Raluca as the credible authority on **family-business succession & governance** (flagship), with the **Auditul Prezentului Tău** program as the individual-track offer.
3. Replace WordPress with a fast, maintainable React/TypeScript site + small API, deployable on Render.
4. Keep SEO equity (URLs, content) and be GDPR-compliant.

**Success metrics:** form conversion rate, Lighthouse ≥ 95 (Perf/A11y/Best Practices/SEO) on mobile for home, LCP < 2.5s, zero CLS, 0 broken old URLs (all redirected), all three languages complete.

## 2. Audience

| Persona                          | Needs                                                          | Entry                    |
| -------------------------------- | -------------------------------------------------------------- | ------------------------ |
| **Founder** of a family business | Plan succession without conflict; protect capital & reputation | Home, Programs, blog     |
| **NextGen successor**            | Authority, legitimacy, autonomy                                | Programs → NextGen, blog |
| **Entrepreneur / executive**     | Clarity, resilience, financial decisions                       | Audit program page       |

## 3. Sitemap (v1)

Locale prefix: RO = none (`/`), EN = `/en`, IT = `/it`. Slugs are localized.

| Route (RO)                                 | EN                                              | IT                                              | Page                                     |
| ------------------------------------------ | ----------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| `/`                                        | `/en`                                           | `/it`                                           | Home                                     |
| `/despre-mine`                             | `/en/about`                                     | `/it/chi-sono`                                  | About                                    |
| `/programe`                                | `/en/programs`                                  | `/it/programmi`                                 | Programs overview                        |
| `/programe/co-leadership-fondator-nextgen` | `/en/programs/co-leadership-founder-nextgen`    | `/it/programmi/co-leadership-fondatore-nextgen` | Program 1                                |
| `/programe/mentorat-succesori-nextgen`     | `/en/programs/nextgen-successor-mentoring`      | `/it/programmi/mentoring-successori-nextgen`    | Program 2                                |
| `/programe/integrarea-succesorului`        | `/en/programs/successor-integration`            | `/it/programmi/integrazione-del-successore`     | Program 3                                |
| `/programe/entrepreneur-in-residence`      | `/en/programs/entrepreneur-in-residence`        | `/it/programmi/entrepreneur-in-residence`       | Program 4                                |
| `/programe/guvernanta-family-office-board` | `/en/programs/governance-family-office-board`   | `/it/programmi/governance-family-office-board`  | Program 5                                |
| `/programe/auditul-prezentului-tau`        | `/en/programs/your-present-audit` _(title TBD)_ | `/it/programmi/…` _(TBD)_                       | Individual track                         |
| `/blog`                                    | `/en/blog`                                      | `/it/blog`                                      | Blog index (category filter, pagination) |
| `/blog/:slug`                              | same                                            | same                                            | Post                                     |
| `/contact`                                 | `/en/contact`                                   | `/it/contatti`                                  | Contact + free-session form              |
| `/confidentialitate`, `/cookies`           | `/en/privacy`, `/en/cookies`                    | `/it/privacy`, `/it/cookie`                     | Legal                                    |
| `/admin/*`                                 | —                                               | —                                               | Admin (not indexed, not localized)       |
| `*`                                        |                                                 |                                                 | 404                                      |

Redirects from old site (301): `/servicii/`→`/programe`, `/despre-mine/`→`/despre-mine`, `/latest-news/`→`/blog`, `/contacte/`→`/contact`, `/en/…`, `/it/…` equivalents, and `/<post-slug>/`→`/blog/<post-slug>` (resolved against the DB). Full map generated in Phase 6.

## 4. Page specs

### 4.1 Home (family-business flagship)

1. **Hero** — H1 (draft): _"Succesiune fără conflict. Continuitate cu autoritate."_ · sub: confidential mentoring for founders and NextGen in family businesses · primary CTA _Prima sesiune gratuită_ · secondary _Vezi programele_ · portrait photo.
2. **Credibility bar** — ForbesLife cover · Forbes CEE Forum · ZF Live · EMCC · FFI · "20+ ani în antreprenoriat".
3. **The challenge** — 3–4 concise problem cards (unclear roles founder/NextGen, successor legitimacy, governance & capital protection, family vs business conflicts).
4. **Programs** — 5 `ProgramCard`s (outcome-first one-liner + link).
5. **How it works** — 3–4 steps: free session → diagnostic → tailored plan (90 days) → 1:1 sessions + email support.
6. **Testimonials** — carousel of **short** quotes (2–3 lines + result tag + name/role); "read more" expands.
7. **Individual track teaser** — _Auditul Prezentului Tău_ card (for entrepreneurs/professionals) → program page.
8. **About teaser** — portrait, 3 credentials, link to About.
9. **Latest articles** — 3 `PostCard`s.
10. **CTA band** — "Prima sesiune gratuită" + short reassurance (confidential, no obligation) + response-time promise.

### 4.2 About

Hero portrait + story (Milan, 20+ yrs: media & advertising, real estate & construction, HoReCa; investor in real estate & start-ups) · credentials timeline (EMCC EIA Practitioner, One2Coach Professional Coach, ANC Coach Formator COR 242401, FFI member) · **Press & speaking** (ForbesLife cover, Forbes CEE Forum, Forbes Power Breakfast, ZF Live, SMARK interview) · values/approach · CTA.

### 4.3 Programs overview + program detail

Overview: intro (confidentiality, values/reputation/capital), two groups — **Family business (5)** and **Individual (Audit)**, comparison table (for whom · format · outcome). Detail template: _For whom_ → _Directions_ (bullets, from current copy) → _Outcome_ → _Format_ (1:1 weekly 60 min, resources, email support, 90-day plan) → _FAQ_ → _CTA_. Audit page reuses the current home content (outcomes, "what you get", free agenda, MiniAudit, testimonials).

### 4.4 Blog

Index: featured post, category chips (new categories — see §6), cards with cover, title, excerpt, date, reading time; pagination (9 per page). Post: cover, title, meta, body (Markdown → HTML, headings anchor, TOC for long posts), author box, related posts, CTA, `Article` JSON-LD, share links. **No comments.** Language fallback: if a post has no translation for the active locale, it is hidden from that locale's list.

### 4.5 Contact

Intro + what happens next (3 steps) · form · direct contact (email, LinkedIn, Instagram) · location line ("Milano · online" — confirm) · FAQ (confidentiality, languages, format, fees). Query `?type=free-session&program=<slug>` pre-fills the form variant.

**Form fields:** name*, email*, phone (optional), "I am a…" (founder / successor / executive / other), program of interest (select), message*, preferred language (RO/EN/IT), GDPR consent checkbox*, honeypot, Turnstile token. Success state + email confirmation to the sender (optional, localized) + notification to Raluca.

### 4.6 Legal

Privacy policy, Cookie policy (port & review current text). Footer link "Manage cookies" re-opens preferences.

### 4.7 Admin (`/admin`)

Login · Posts list (status, locale coverage, search) · Post editor (per-locale tabs: title, slug, excerpt, Markdown body with preview, cover image, category, SEO title/description, publish date, draft/published) · Image upload · Leads list (read, mark handled, export CSV) · Change password. Desktop-first, not localized (EN UI), `noindex`.

## 5. Cross-cutting requirements

- **i18n:** `react-i18next`; all copy in `locales/{ro,en,it}/*.json`; route table localized; `<html lang>`, `hreflang` alternates, language switcher keeps the equivalent page; default locale detection **only** as a suggestion banner (no forced redirect).
- **SEO:** unique title/description per page & locale, canonical, OG/Twitter cards, `sitemap.xml` (incl. alternates), `robots.txt`, JSON-LD (`Person`, `ProfessionalService`, `Article`, `BreadcrumbList`, `FAQPage`).
- **Consent & analytics:** GTM container loaded only after consent; Consent Mode v2 defaults to denied; dataLayer events: `lead_submit` (with `type`, `program`, `locale`), `cta_click`, `outbound_click`.
- **Performance:** route-level code splitting, self-hosted fonts, responsive images, no render-blocking third parties.
- **Security/privacy:** HTTPS only, helmet CSP, rate-limit, input validation (zod), store minimal PII, retention policy for leads (e.g. 24 months, admin-deletable), IP stored hashed only.
- **Accessibility:** WCAG 2.2 AA (see design system).
- **Browser support:** last 2 versions of Chrome, Safari (incl. iOS 16+), Firefox, Edge.

## 6. Content model — blog

| Field                     | Notes                                                                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Post`                    | id, status (`draft`/`published`), publishedAt, coverImageUrl, categoryId, createdAt/updatedAt                                                                                                       |
| `PostTranslation`         | postId, locale (`ro`/`en`/`it`), slug (unique per locale), title, excerpt, bodyMd, seoTitle, seoDescription                                                                                         |
| `Category` + translations | Proposed: _Afaceri de familie_, _Succesiune & guvernanță_, _Leadership_, _Bani & echilibru_, _Interviuri & presă_ — current posts are all "Uncategorized", so they get categorized during migration |

Existing 13 RO posts (+ EN/IT where present) are imported via a script (Phase 6); HTML → Markdown conversion + image download.

## 7. Out of scope for v1

Calendar booking, payments, member area, comments, newsletter (nice follow-up: Resend audience / Brevo), page-level CMS editing, search.
