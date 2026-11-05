# CLAUDE.md — Raluca Andrenacci site rebuild

Rebuild of https://ralucaandrenacci.com (WordPress/Elementor) as **React + TypeScript + Tailwind** with an **Express + Postgres** backend, deployed on **Render**. We are copying the site's content/structure and **improving** its visuals and organization.

## Read first

- `docs/00-DECISIONS.md` — confirmed decisions (D1–D4), assumptions, open questions
- `docs/01-SITE-ANALYSIS.md` — what the current site contains and what is wrong with it
- `docs/02-PRODUCT-SPEC.md` — sitemap, page specs, requirements
- `docs/03-DESIGN-SYSTEM.md` — tokens, type, shapes, components (**source of truth for visuals**)
- `docs/04-ARCHITECTURE.md` — stack, repo layout, data model, API, Render config
- `ROADMAP.md` — phases and acceptance criteria; update checkboxes as work completes

## Non-negotiables

- **Family business is the flagship offer**; "Auditul Prezentului Tău" is the secondary/individual program.
- **RO + EN + IT** from v1. RO is default at `/`, EN `/en`, IT `/it`. No hard-coded user-facing strings in components — use i18n keys.
- **Design tokens only**: 2 font families (Playfair Display headings, Poppins everything else), neutral greys for surfaces and text with burgundy `#812816` only for buttons/accents/CTA band and black for the footer (see `docs/03-DESIGN-SYSTEM.md` §11), radius scale (8px controls, 16px cards, pills only for chips). No raw hex, arbitrary px radii, or extra fonts in components.
- **Accessibility**: WCAG 2.2 AA; body text ≥ 16px; visible focus; labelled icon links.
- **Consent first**: no GTM/GA/Meta/LinkedIn before consent; Consent Mode v2 defaults denied.
- **Reveal animations must never hide content** (current site has blank sections) and must respect `prefers-reduced-motion`.
- Privacy: validate all input with shared zod schemas, hash IPs, never log message bodies or PII.

## Conventions

- TypeScript `strict`; no `any` without a comment. Shared types/schemas live in `packages/shared`.
- Monorepo via npm workspaces: `apps/web`, `apps/api`, `packages/shared`. Run from the root (`npm run dev | build | test | lint | typecheck | db:migrate`).
- Components: function components, named exports, one component per file, co-located tests (`*.test.tsx`). Tailwind classes via `clsx`/`tailwind-merge`; variants with `cva`.
- API: routes thin, logic in `services/`, errors as `{ error: { code, message, fields? } }`.
- Env: validated with zod in `apps/api/src/config/env.ts`; every new variable goes in `.env.example` and `render.yaml`.
- Commits: small, conventional (`feat:`, `fix:`, `docs:`, `chore:`). Don't commit `.env`, source assets over 5 MB, or exported WordPress dumps containing PII.
- Match the surrounding code's style, comment density and naming.

## Definition of done (any task)

Typecheck + lint + tests pass · works at 360 / 768 / 1440 px · works in all 3 locales · no a11y regressions (axe) · docs/roadmap updated if behaviour or scope changed.

## Current status

Phases 0–3 done locally (docs, scaffold, design system & shell, public pages); Render staging deploy pending a Git remote. Next: Phase 4 (lead capture backend) in `ROADMAP.md`.

## Toolchain notes

- Pinned deliberately: **TypeScript 5.9** (typescript-eslint supports < 6.1), **ESLint 9** (jsx-a11y does not support 10 yet), **Prisma 7.10** (client generated to `apps/api/src/generated`, git-ignored; `npm run db:generate` runs automatically in `build`/`typecheck`/`test`). Re-check before upgrading.
- `packages/shared` is built to `dist/` — rebuild after changing it (`npm run dev` watches it).
- Tailwind v4: tokens live in the `@theme` block of `apps/web/src/styles/index.css`; the default palette/radius/type scale is reset, so only brand tokens exist.
- Web: pages are lazy chunks (entry ~74 kB gzip). Routes come only from `apps/web/src/i18n/routes.ts` — use `LocalizedLink`/`buildPath`, never literal paths. UI primitives are in `components/ui`, page chrome in `components/layout`, sections in `components/blocks`; `/styleguide` (dev only) shows them all.
- Lint runs the strict `react-hooks` v7 rules (e.g. no `setState` inside effects) and `jsx-a11y`.
- `apps/web/public/robots.txt` blocks all crawlers until launch.
- Images: originals live in `assets-source/` (git-ignored); `npm run images` regenerates `apps/web/public/images/*` and `src/lib/images.generated.ts`. Use `<Img name="…" sizes="…">` (alt text from `images.<name>` in `common.json`); only the LCP image gets `priority`.
- Copy lives in `apps/web/src/i18n/locales/{ro,en,it}/{common,consent,pages}.json`; a test enforces identical keys across the three languages. Read lists/objects with `usePages()`.
- Legal text: `apps/web/src/content/legal/ro/*.json` (imported from the old site, awaiting legal review).
- Layout standards (container, section rhythm, hero, footer): `docs/03-DESIGN-SYSTEM.md` §10 — use `Container` / `Section` / `SectionHeading` instead of ad-hoc paddings.
- Videos and logos: `npm run video` (ffmpeg: every `assets-source/video/clips/*.mp4` → `public/video/<name>.{mp4,webm}` + `-poster.jpg`; play with `LoopVideo`) and `npm run images` (also builds `public/logos/*` and the `LOGO_MANIFEST`) read from `assets-source/` (git-ignored). Logos are third-party trademarks — see `docs/00-DECISIONS.md`.
- Blog content: `apps/web/src/content/blog/posts.ro.json` (imported by `scripts/import-blog.mjs`; images in `public/blog`, generated by `npm run images` from `assets-source/blog`). Render with `BlogCard` / `PostBody` / `BlogImg`; categories are translated via `blogCategories` in `pages.json`.
