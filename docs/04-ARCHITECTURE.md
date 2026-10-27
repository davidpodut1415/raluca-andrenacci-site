# 04 — Architecture

## 1. Stack

| Layer        | Choice                                                                                                                                                                      | Notes                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Frontend     | **React 19 + TypeScript + Vite 8**, **Tailwind CSS 4** (tokens in `@theme`), React Router, `react-i18next`, `react-helmet-async`, `react-hook-form` + `zod`, TanStack Query | Pin exact versions at scaffold time |
| Backend      | **Node 22 + Express 5 + TypeScript 5.9**, `zod`, `helmet`, `express-rate-limit`, `pino`                                                                                     |                                     |
| Database     | **PostgreSQL** (Render managed) + **Prisma**                                                                                                                                |                                     |
| Auth (admin) | Email+password, Argon2id, signed httpOnly `SameSite=Lax` session cookie (`express-session` + Postgres store or JWT cookie), CSRF token on mutating routes                   |                                     |
| Email        | **Resend** via `EmailService` interface (swap to SMTP possible)                                                                                                             |                                     |
| Spam         | Cloudflare Turnstile + honeypot + per-IP rate-limit                                                                                                                         |                                     |
| Storage      | Cloudflare R2 (S3 API) for blog images; presigned upload from admin                                                                                                         | Render disk is ephemeral            |
| Testing      | Vitest + Testing Library (web), Vitest + Supertest (api), Playwright (e2e smoke)                                                                                            |                                     |
| Quality      | ESLint, Prettier, `tsc --noEmit`, Husky + lint-staged, GitHub Actions CI                                                                                                    |                                     |
| Hosting      | **Render**: 1 Web Service + 1 PostgreSQL, defined in `render.yaml`                                                                                                          |                                     |

## 2. Repository layout

```
/
├─ apps/
│  ├─ web/                    # Vite React SPA
│  │  ├─ src/
│  │  │  ├─ app/              # router, providers, layouts
│  │  │  ├─ components/       # ui/ (primitives), blocks/ (sections), layout/
│  │  │  ├─ pages/            # Home, About, Programs, ProgramDetail, Blog, Post, Contact, Legal, NotFound
│  │  │  ├─ admin/            # admin routes (lazy-loaded chunk)
│  │  │  ├─ features/         # contact-form, consent, blog, auth
│  │  │  ├─ i18n/             # config, route table, locales/{ro,en,it}/*.json
│  │  │  ├─ lib/              # api client, analytics, seo helpers
│  │  │  └─ styles/           # index.css (tokens via Tailwind)
│  │  ├─ public/              # favicons, robots.txt, og images
│  │  └─ tailwind.config.ts
│  └─ api/
│     ├─ src/
│     │  ├─ server.ts         # express app, static SPA fallback
│     │  ├─ config/env.ts     # zod-validated env
│     │  ├─ routes/           # health, leads, posts, auth, admin-posts, admin-leads, uploads, sitemap
│     │  ├─ services/         # email, turnstile, storage
│     │  ├─ middleware/       # auth, rateLimit, errorHandler, csrf
│     │  └─ db/               # prisma client
│     ├─ prisma/              # schema.prisma, migrations/, seed.ts
│     └─ scripts/             # import-wordpress.ts, create-admin.ts
├─ packages/
│  └─ shared/                 # zod schemas + TS types shared by web & api (Lead, Post DTOs, locales)
├─ docs/                      # these documents
├─ render.yaml
├─ package.json               # npm workspaces
├─ CLAUDE.md  README.md  ROADMAP.md
└─ .github/workflows/ci.yml
```

## 3. Data model (Prisma, abridged)

```prisma
enum Locale { ro en it }
enum PostStatus { draft published }
enum LeadType { contact free_session }
enum LeadStatus { new handled spam }

model AdminUser   { id String @id @default(cuid()) email String @unique passwordHash String createdAt DateTime @default(now()) }

model Category    { id String @id @default(cuid()) key String @unique translations CategoryTranslation[] posts Post[] }
model CategoryTranslation { categoryId String locale Locale name String slug String
                            category Category @relation(fields:[categoryId], references:[id])
                            @@id([categoryId, locale]) @@unique([locale, slug]) }

model Post        { id String @id @default(cuid()) status PostStatus @default(draft) publishedAt DateTime?
                    coverImageUrl String? categoryId String? category Category? @relation(fields:[categoryId], references:[id])
                    translations PostTranslation[] createdAt DateTime @default(now()) updatedAt DateTime @updatedAt }
model PostTranslation { postId String locale Locale slug String title String excerpt String bodyMd String
                        seoTitle String? seoDescription String? coverAlt String?
                        post Post @relation(fields:[postId], references:[id], onDelete: Cascade)
                        @@id([postId, locale]) @@unique([locale, slug]) }

model Lead        { id String @id @default(cuid()) type LeadType name String email String phone String?
                    audience String? program String? message String locale Locale consentAt DateTime
                    ipHash String? userAgent String? status LeadStatus @default(new) emailSent Boolean @default(false)
                    createdAt DateTime @default(now()) }
```

## 4. API (all under `/api`, JSON)

| Method & path                                                                                       | Auth                              | Purpose                                                                                 |
| --------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------- |
| `GET /health`                                                                                       | –                                 | Render health check (DB ping)                                                           |
| `POST /leads`                                                                                       | Turnstile + rate-limit (5/min/IP) | Validate (zod), store, send notification (+ optional confirmation) email; returns `201` |
| `GET /posts?locale=&category=&page=`                                                                | –                                 | Published posts list (paginated)                                                        |
| `GET /posts/:slug?locale=`                                                                          | –                                 | Single post + alternates (other locales' slugs) + related                               |
| `GET /categories?locale=`                                                                           | –                                 | Category list                                                                           |
| `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`                                             | – / session                       | Admin session                                                                           |
| `GET/POST/PUT/DELETE /admin/posts[/:id]`                                                            | session + CSRF                    | Post CRUD incl. translations, publish/unpublish                                         |
| `POST /admin/uploads/sign`                                                                          | session                           | Presigned R2 URL for image upload                                                       |
| `GET/PATCH/DELETE /admin/leads[/:id]`, `GET /admin/leads.csv`                                       | session                           | Lead management                                                                         |
| `GET /sitemap.xml`, `GET /robots.txt`                                                               | –                                 | Generated (static routes × locales + published posts)                                   |
| Error shape: `{ error: { code, message, fields? } }`. All inputs validated with shared zod schemas. |

## 5. Serving & routing on Render

- Single Node service: `/api/*` → Express routes; everything else → `apps/web/dist` static with SPA fallback (`index.html`), long-cache for hashed assets.
- Old-URL **301 redirects** handled in Express before the SPA fallback (static map + DB lookup for legacy `/<post-slug>/`).
- Canonical host redirect (`www` → apex or vice versa) + HTTPS enforcement.

### ADR-1: SEO for a SPA — **Accepted: option A** (2026-10-27)

| Option                                                                                           | Pros                                                                                                                  | Cons                                                                        |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **A. Build-time prerender of static routes + server-injected meta for blog posts** (Recommended) | Keeps simple SPA; marketing pages are fully static HTML; blog `<head>` + content snapshot injected by Express from DB | Small custom code in server                                                 |
| B. `vite-react-ssg` / prerender at build for all pages                                           | Pure static output                                                                                                    | Blog posts added via admin need a rebuild/webhook                           |
| C. Switch to Next.js                                                                             | Best SEO story                                                                                                        | Departs from requested "React + TS + Tailwind + backend" structure; heavier |
| Default: **A**. Revisit if Search Console shows indexing problems.                               |

## 6. `render.yaml` (blueprint, sketch)

```yaml
databases:
  - name: raluca-db
    plan: basic-256mb # verify current plan names/prices at deploy time
    databaseName: raluca
services:
  - type: web
    name: raluca-site
    runtime: node
    plan: starter # avoid free tier: it sleeps (slow first request)
    buildCommand: npm ci && npm run build # builds shared, web, api
    preDeployCommand: npm run db:migrate # prisma migrate deploy
    startCommand: npm run start # node apps/api/dist/server.js
    healthCheckPath: /api/health
    autoDeploy: true
    envVars:
      - { key: NODE_ENV, value: production }
      - { key: DATABASE_URL, fromDatabase: { name: raluca-db, property: connectionString } }
      - { key: SESSION_SECRET, generateValue: true }
      - { key: PUBLIC_SITE_URL, value: https://ralucaandrenacci.com }
      - { key: RESEND_API_KEY, sync: false }
      - { key: LEAD_NOTIFY_EMAIL, sync: false }
      - { key: TURNSTILE_SECRET_KEY, sync: false }
      - { key: VITE_TURNSTILE_SITE_KEY, sync: false }
      - {
          key: R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET / R2_PUBLIC_URL,
          sync: false,
        }
      - { key: VITE_GTM_ID, sync: false }
```

Environments: `staging` (Render preview/second service on `staging.` subdomain, `noindex`) and `production`. Secrets only in Render dashboard; `.env.example` committed, `.env` git-ignored.

## 7. Cross-cutting design

- **Consent:** `ConsentProvider` stores choice in a first-party cookie/localStorage (12 months), sets Consent Mode v2 defaults to `denied`, injects GTM only after analytics/marketing consent, exposes `openPreferences()` for the footer link.
- **i18n routing:** route table `routes.ts` maps route key → localized path per locale; `<LocalizedLink to="programs.detail" params={…}>`; language switcher resolves the alternate via the same table (and via API for posts).
- **Security headers:** helmet with CSP allowing only self, GTM/GA/Meta/LinkedIn (post-consent), Turnstile, R2 image host. `X-Frame-Options: DENY`, referrer policy, `Permissions-Policy`.
- **Observability:** pino JSON logs (Render log stream), error handler, optional Sentry later; uptime check on `/api/health`.
- **Backups:** Render Postgres backups on a paid plan; monthly lead CSV export reminder.

## 8. Frontend conventions (as built in Phase 2)

- **Routing:** `apps/web/src/i18n/routes.ts` is the only place URLs are defined. Use `<LocalizedLink to={{ key: 'about' }}>` / `buildPath()`; never hard-code paths. Router patterns are generated from the table in `app/App.tsx`.
- **Layout:** `LocaleLayout` provides the locale context, skip link, header, footer, cookie banner and preferences dialog; pages render only their own content. Pages are lazy-loaded chunks.
- **SEO tags:** every page renders `<Seo />` (React 19 hoists `<title>`, `<meta>`, `<link>` into `<head>`): canonical, hreflang alternates (+ `x-default` = RO), Open Graph. Blog posts omit alternates until the API supplies per-locale slugs (Phase 5).
- **Consent:** `features/consent` (storage → `gtag` Consent Mode v2 → provider → banner/dialog). Defaults are pushed as `denied` on mount; GTM (`VITE_GTM_ID`) is injected only after analytics or marketing is granted. Choice expires after 12 months.
- **Env (web, build-time):** `VITE_SITE_URL`, `VITE_GTM_ID` — must be set in Render before the build.
