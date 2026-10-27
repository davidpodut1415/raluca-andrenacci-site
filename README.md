# Raluca Andrenacci — website rebuild

React + TypeScript + Tailwind frontend, Express + PostgreSQL backend, deployable on [Render](https://render.com). Rebuild/improvement of https://ralucaandrenacci.com.

| Doc                                                    | Contents                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`ROADMAP.md`](ROADMAP.md)                             | Phases, tasks, acceptance criteria, risks                              |
| [`CLAUDE.md`](CLAUDE.md)                               | Project rules & conventions for AI-assisted development                |
| [`docs/00-DECISIONS.md`](docs/00-DECISIONS.md)         | Confirmed decisions, assumptions, open questions                       |
| [`docs/01-SITE-ANALYSIS.md`](docs/01-SITE-ANALYSIS.md) | Analysis of the current site: content, visuals, problems, what to keep |
| [`docs/02-PRODUCT-SPEC.md`](docs/02-PRODUCT-SPEC.md)   | Sitemap, page specs, requirements, content model                       |
| [`docs/03-DESIGN-SYSTEM.md`](docs/03-DESIGN-SYSTEM.md) | Colours, typography, shapes, components, accessibility                 |
| [`docs/04-ARCHITECTURE.md`](docs/04-ARCHITECTURE.md)   | Stack, repo layout, data model, API, `render.yaml`                     |

## Status

Phase 1 (repo scaffold) is complete locally; Phase 2 (design system & app shell) is next. See the roadmap.

## Quick start

```bash
npm install
cp .env.example .env
docker compose up -d db      # local Postgres
npm run db:migrate           # applies prisma/migrations to the local DB
npm run dev                  # web on :5173 (proxies /api), api on :3000
```

Requires Node >= 20.19 (`.nvmrc` pins 22 to match Render). Other scripts: `npm run lint`, `typecheck`, `test`, `build`, `format`, `db:migrate:dev` (create a new migration), `db:studio`.

## Layout

```
apps/web         Vite + React + TypeScript + Tailwind v4 (design tokens in src/styles/index.css)
apps/api         Express 5 + Prisma 7 (PostgreSQL); also serves the built SPA in production
packages/shared  zod schemas and types shared by web and api (built to dist/ with tsc)
render.yaml      Render Blueprint (web service + Postgres)
```
