# 03 — Design System

Direction (D3): **keep the identity — burgundy / espresso / cream + Playfair Display — and make it consistent.** Every value below is a Tailwind token; no raw hex, px radius or font-family outside `tailwind.config.ts` / `index.css`.

## 1. What was inconsistent (and the fix)

| Problem on the current site                                     | Fix                                                                                                         |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 4 font families (Poppins, Open Sans, Playfair, Roboto)          | **2 families only**: Playfair Display (headings) + Poppins (everything else). Roboto and Open Sans removed. |
| Serif headings on Home, Roboto headings on Programs             | One heading rule: all `h1–h4` = Playfair Display.                                                           |
| `h2` (42px) bigger than `h1` (40px); body 13px                  | Defined modular scale (below); body minimum **16px**.                                                       |
| 3 body greys (`#777`, `#7D7789`, `#333`) — `#777` fails AA      | One body colour `ink-700`; one muted colour `ink-500` (AA-safe).                                            |
| Two reds (heading red on Programs vs CTA burgundy)              | One brand colour scale `burgundy` (CTA, links, accents). Headings use `espresso`.                           |
| Radii: sharp nav, rounded button, pill cookie button, big cards | One radius scale; pills only for chips/tags/language switch.                                                |
| Dark filled rectangle for active nav                            | Underline indicator in burgundy.                                                                            |

## 2. Colour tokens

Contrast values are computed against the stated background (WCAG 2.x). **Final hex values for cream/blush to be confirmed against the original files** — they are estimates from screenshots.

| Token               | Hex                   | Use                                                          | Contrast              |
| ------------------- | --------------------- | ------------------------------------------------------------ | --------------------- |
| `burgundy-700`      | `#812816`             | Primary buttons, links, accents (**kept from current site**) | 9.4:1 with white text |
| `burgundy-800`      | `#661E10`             | Button hover / pressed                                       | —                     |
| `burgundy-100`      | `#F6E4DF`             | Tinted badges, subtle highlights                             | —                     |
| `espresso-900`      | `#3E1D16`             | Headings, footer bg (**kept**)                               | 14:1 on white         |
| `ink-700`           | `#4A3F3B`             | Body text                                                    | ≈ 9.8:1 on white      |
| `ink-500`           | `#6B5F5A`             | Secondary/muted text, captions                               | ≈ 6:1 on white        |
| `cream-50`          | `#FDF7F2`             | Alternate section background (~current)                      | —                     |
| `cream-100`         | `#F7EBE1`             | Card/border tint, quotes                                     | —                     |
| `white`             | `#FFFFFF`             | Page background, cards                                       | —                     |
| `line`              | `#E8DCD3`             | 1px borders, dividers                                        | —                     |
| `success` / `error` | `#2F6B4F` / `#B3261E` | Form states only                                             | ≥ 4.5:1               |

Rules: max **one** saturated colour per screen region (burgundy). Backgrounds alternate `white` ↔ `cream-50`; one dark section (`espresso-900`) max per page (CTA band or footer). Never place text on photos without a scrim.

## 3. Typography

| Token        | Spec                                                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font-serif` | `"Playfair Display", Georgia, "Times New Roman", serif` — weights 600, 700 (+ 400 italic for quotes)                                                                         |
| `font-sans`  | `"Poppins", system-ui, -apple-system, "Segoe UI", sans-serif` — weights 400, 500, 600                                                                                        |
| Loading      | Self-hosted via `@fontsource`, `font-display: swap`, **latin + latin-ext** (Romanian ă â î ș ț, Italian accents) — check the `ș/ț` glyphs render (comma-below, not cedilla). |

Scale (fluid with `clamp`), strict hierarchy `h1 > h2 > h3`:

| Role              | Mobile → Desktop | Font / weight / leading                                                                 |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------- |
| Display (hero h1) | 36 → 64px        | serif 700, 1.1                                                                          |
| h2                | 30 → 44px        | serif 700, 1.15                                                                         |
| h3                | 22 → 28px        | serif 600, 1.25                                                                         |
| h4 / card title   | 18 → 20px        | serif 600, 1.3                                                                          |
| Body              | 16 → 18px        | sans 400, 1.7                                                                           |
| Small / caption   | 14px             | sans 400, 1.5                                                                           |
| Eyebrow           | 12–13px          | sans 600, uppercase, tracking `0.18em` (**not** the current extreme `0.4em+`), burgundy |
| Button            | 16px             | sans 600                                                                                |
| Nav               | 15px             | sans 500 (600 active)                                                                   |

Max measure for prose: `65ch`. Romanian copy is long — test headings at 360px width.

## 4. Shape, spacing, elevation

| Token          | Value                                                                                                              | Use                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `rounded-md`   | 8px                                                                                                                | Buttons, inputs, selects                   |
| `rounded-xl`   | 16px                                                                                                               | Cards, testimonials, images                |
| `rounded-full` | 9999px                                                                                                             | Chips/tags, language switcher, avatar only |
| Corners rule   | **No sharp rectangles on interactive elements; no pills on buttons.**                                              |
| Spacing        | 4px base; section padding `py-16 md:py-24`; container `max-w-6xl`, gutters `px-5 md:px-8`                          |
| Border         | 1px `line`                                                                                                         |
| Shadow         | one token: `shadow-card` = `0 8px 24px -12px rgb(62 29 22 / .18)`                                                  |
| Motion         | 200ms ease-out; reveal-on-scroll **must degrade to visible** (no blank sections); respect `prefers-reduced-motion` |

## 5. Components (v1 inventory)

Primitives: `Button` (primary / secondary / ghost, sizes), `Link`, `Eyebrow`, `Heading`, `Container`, `Section` (bg variants), `Card`, `Chip`, `Input`, `Textarea`, `Select`, `Checkbox`, `FormField` (label, hint, error), `Alert/Toast`.
Layout: `Header` (sticky, mobile drawer, **language switcher**, CTA button), `Footer` (brand, nav, legal, contact, social with labels, "Manage cookies"), `PageHero`, `CTABand`.
Content blocks: `Hero` (portrait + headline + CTA + credibility), `CredibilityBar` (Forbes, ZF, EMCC, FFI logos), `ProgramCard`, `ProgramDetail` (Directions → Outcome), `ProcessSteps`, `TestimonialCarousel` (short quote + result + name/role), `QuoteCard`, `PostCard`, `PostList`, `FAQ` (accordion), `AuthorBio`, `ContactForm`, `CookieBanner` + `PreferencesModal`.

## 6. Layout principles (organization fixes)

1. **One job per section**, max ~7 sections on the home page; no section taller than ~1.5 viewports on mobile.
2. **Primary CTA** ("Prima sesiune gratuită") in header, hero, after programs, and in the closing band — same label, same style, same destination (`/contact?type=free-session`).
3. **Trust early**: credibility bar directly under hero; portrait in hero.
4. Mobile-first; test at 360, 768, 1024, 1440.
5. Cookie banner: bottom card on desktop (max-width 420px, not full-width), compact bottom sheet on mobile that does not cover the primary CTA; remembers the choice.

## 7. Accessibility baseline

WCAG 2.2 AA: contrast per tokens above, visible focus ring (`2px burgundy-700`, offset 2px), skip-link, semantic landmarks, labelled icon links, `lang` attribute per locale, keyboard-operable carousel/accordion/drawer, 44×44px touch targets, form errors tied to inputs (`aria-describedby`).

## 8. Imagery

Portrait-led, warm natural light. Single art direction: consistent crop ratios (hero 4:5, cards 16:10, avatars 1:1), WebP/AVIF with `srcset`, explicit `width/height` (no layout shift), `alt` text in all 3 languages.

## 9. Implementation notes (Phase 2)

- Tokens live in the `@theme` block of `apps/web/src/styles/index.css`; Tailwind's default palette, type scale, radii and shadows are reset, so **only these tokens exist**. Additions to the doc table: `text-button` (16px), `text-nav` (15px), `tracking-wordmark` (0.14em for the header/footer wordmark).
- **Form control borders use `ink-500`** (6:1), not `line` (≈1.4:1), to meet the 3:1 non-text contrast rule; `line` is for decorative dividers and card borders only.
- **Header switches to the desktop layout at `lg` (1024px)**; below that the menu drawer is used, so "Despre mine" / the CTA never wrap on tablets.
- Language switcher is the one place pills (`rounded-full`) are used with interactive elements, as allowed by the shape rules.
- Cookie banner: "Accept all" and "Reject all" use the same style and size; "Customize" opens a native `<dialog>`.
- Reference page: `/styleguide` (dev only) renders every token and component.

## 10. Layout standards (Phase 3 revision)

Based on the reference footer/hero screenshots from the client (airy, large rounded panels, generous gutters):

- **Header:** 64px mobile / 80px desktop, container-width, brand wordmark in **Poppins 600, sentence case** (no uppercase tracking), nav links Poppins 500 16px with a burgundy active state, language **dropdown** + primary CTA on the right. Below `lg` the menu drawer lists links in 56px rows.
- **Language dropdown:** globe icon + current language + chevron; list of real links with the current one checked; keyboard: Arrow/Home/End, Escape returns focus to the button. Header shows the short code (RO), footer the full name and opens upward.
- **Footer (dark espresso):** top row `3 / 4 / 2 / 3` columns — brand + tagline, programs (48px link rows), site links, and two info blurbs (title + chevron, muted description). Bottom bar: language dropdown (left), legal links + copyright (centre), social icons (right). Top padding 64 / 80 / 96px.
- **Hero:** full-bleed, fills the viewport below the sticky header (`100svh` − 64/80px), looping silent background video (poster frame, left-to-right espresso scrim for contrast, white text, visible pause button, still image under reduced motion). Text left-aligned in the container.
- **Credibility bar:** centered row of partner/press logos (greyscale at 75% opacity, colour on hover), no visible heading (aria-label only).
- **Split sections:** media on one side in a rounded-2xl panel; alternate left/right down the page. Alternate section backgrounds white ↔ cream-50; max one dark block (footer).

## 11. Revision 2026-10-27 (client feedback)

- **Palette:** brown is now only a highlight. Brown/burgundy appears on **buttons, eyebrows/small accents, the closing CTA band (burgundy-700 background) and the footer (espresso-900)**. Everything else is neutral: page/section backgrounds `grey-50` `#F7F7F7` and `grey-100` `#EEEEEE` (never pure white; white is only for cards and inputs), headings `ink-900` `#1A1A1A`, body `ink-700` `#444`, muted `ink-500` `#666`, lines `#E0E0E0`. The cream tokens were removed. The hero scrim is pure black.
- **Header (reference-based):** full-width gutters (16 / 24 / 32px), 56px (64px desktop) high, three columns on desktop — uppercase wordmark with wide tracking (left), links centered (Poppins 500, 14px), language dropdown + small primary button (right). It is **fixed (sticky) and always visible** — the earlier hide-on-scroll behaviour was removed at the client's request.
- **Hero (reference-based):** a rounded-2xl video panel inset 12–16px from the viewport edges, filling the space under the header; headline block bottom-left, supporting facts bottom-right, black gradient from the bottom; video aligned to the top on desktop so the face stays in frame. **No pause button** (client decision). Note: WCAG 2.2.2 asks for a way to pause auto-playing motion longer than 5 s; the video is silent, decorative and stops under `prefers-reduced-motion`. If an accessibility statement is required, reconsider adding a control.
- **CTA band** uses the `light` button variant (white on burgundy).

## 12. Landing page structure (2026-10-29)

Order: hero (video) → "Featured in" logos → **programs** → testimonials → **Despre mine** (media carousel) → **blog** → **closing CTA photo panel** → footer.

- **Side padding** follows tonyrobbins.com (measured: 40px at 1440px for header and sections): 20 / 32 / 40px on mobile / tablet / desktop for the header, `Container`, carousels and footer; hero and CTA panels are inset 12–16px from the viewport edge.
- **Programs** (inspired by their "pillars" block): a large typographic index of the five programs (active name dark, others dimmed, arrow on the active one) with a sticky rounded photo panel that follows hover/focus; below `lg` the photo is dropped and each name shows its summary. One button leads to the Programs page.
- **Blog:** one featured article (square image, centered category · date, large title) beside a list of four latest with thumbnails and a "Citește" action. Placeholder content until Phase 5.
- **Closing CTA:** rounded photo panel, black 60% overlay, centered title + line + white button to the contact page.
- **Token note:** `--color-black` is now defined; before, `bg-black/…` utilities silently produced nothing because the default palette is reset (so some overlays were missing).

## 13. Section template library (2026-11-05)

Modelled on tonyrobbins.com's page templates so every page shares one visual language. **Persistent on every page:** the header, the closing CTA photo panel (`PersistentCTA`, rendered by `LocaleLayout`, page-specific headline, hidden only on Contact) and the footer.

| Template (component)        | What it is                                                                                   | Used on                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `PageBanner`                | Inset rounded photo panel ~60% high, black scrim, centered uppercase title + line (+ button) | Programs, program pages, About                          |
| `PageHeader`                | Text-led opener: eyebrow, large title, line, hairline                                        | Contact, Blog, post, legal, 404                         |
| `FeatureSplit` ("Part 01…") | Large numeral, ScrollFill title, text, photo; alternates left/right                          | Programs overview, About story                          |
| `NumberedList`              | Large-numeral rows between hairlines                                                         | Program directions, About credentials, Contact benefits |
| `StepCards`                 | "How it works" cards with numeral, title, text                                               | Programs, program format, Audit perks, press items      |
| `StatsBand`                 | Full-width black band of big numerals (lining figures)                                       | Programs, About                                         |
| Outcome block               | Full-width black band with one large serif statement                                         | Program pages                                           |
| `ProgramTiles`              | Tall photo tiles (same look as the media carousel)                                           | "Other programs"                                        |
| `BlogCard` / featured split | Photo, category · date, title                                                                | Blog index, post page, home                             |
| `Testimonials`              | Black banner showcase                                                                        | Home, About, Audit                                      |

Rules: alternate light and black bands, never two black bands next to each other; one h1 per page (banner or header); numerals use `font-variant-numeric: lining-nums` (Playfair defaults to old-style figures). Inner-page opener style depends on the content: photo banner where the page sells or introduces; text-led where the page is a form, an archive or a document.

## 14. Programs and About layouts (2026-11-05, from client references)

- **Programs overview:** the page title (`text-display`, same as every H1) on the left with a short paragraph on the right, then two-column large photo cards (about 640px tall): statement headline bottom-left, supporting line beneath, a small dark label with the program name bottom-right. Every card links to its program page. No other sections on this page (the stats, steps and FAQ blocks were removed to match the reference).
- **About:** `AboutHero` — one black inset panel containing a small photo card (top-left), a tall portrait (right) and a dot eyebrow + two-line headline (bottom-left), one screen tall; then the story, numbers band, credentials, press, and `QuoteBand` (full-width photo, large centered quote, author chip) as the closing statement.
- **Blog index (client reference):** page title (`text-display`); a large featured photo card (category, title, excerpt over a black gradient) beside a list of the three next articles (thumbnail, category, title, two-line excerpt); topic filter pills (all topics + categories, `aria-pressed`, filter the grid); a three-column grid of article cards with excerpt. Excerpts and categories are placeholders until Phase 5.

## 15. Media pass (new photo/video pool)

- **Footer is black** (`black`), and the closing CTA photo fades into pure black. The `espresso-900` token was removed.
- **Hero**: no video. `HeroSlides` cross-fades three zoomed dark portraits (`pro-dark`, `pro-medium`, `pro-closeup`) with a slow zoom, pure CSS (`.hero-slide`, 18 s cycle). Reduced motion shows the first photo only.
- **Key figures** (`StatsStagger`): four equal columns (two on mobile), no containers, no dark band; numeral over caption on the page background. On the landing page right after the testimonials; also on About. Facts: 20+, 3, EMCC, 40+ (placeholder — confirm).
- **Placements** (one main use per page where possible): About hero `event-mic` + `event-audience`; About story `library-chairs`; About quote `pro-closeup`; CTA `studio-stool`; programs `event-fullbody` (co-leadership). "Despre mine" carousel cards play short clips (`LoopVideo`: forbes-collage, podcast, studio-talk, notebook) and stills (`forbes-cover`, `event-audience`); 404 background clip `fashion-2`. Unused so far: `forbes-cover`-style group shot variants, `event-stage`, `shelf`, `shelf-wide`, `fashion-1`, `walk`. `Forbes_Life_Cover Print` is a third-party magazine cover and is not used. The podcast clip has a burned-in third-party logo (bottom-left) — crop or confirm usage.
- Catalog of every file: `docs/media-catalog.md` (generated by a vision sub-agent; orientations of the video rows are approximate).

## 16. Type scale rule (one scale for every page)

Every page title (H1) is `text-display` (36→56px), every section heading (H2) is `text-h2` (30→44px; quotes and the closing CTA step up to `text-display`), card titles are `text-h3`, list/card sub-titles `text-h4`, body `text-body`. No arbitrary `text-[…]` sizes for headings, and the former `text-hero` token was removed. Only the key-figure numerals (`StatsStagger`) use a larger display size on purpose.

## 17. Base interaction for clickable elements

Buttons, button links, topic pills, carousel arrows and the menu toggle use the `hover-zoom` utility (index.css): scale 1.05 on hover (hover-capable devices only), 0.98 while pressed, 200 ms; disabled with reduced motion. Photo cards zoom as a whole (scale 1.03). Use `hover-zoom` for any new clickable control.

Dividers: no horizontal rules between rows or sections anywhere (lists, FAQ, footer, header menu, page headers); separation comes from spacing only. Outlines around cards, inputs and pills stay.

## 18. Mobile pass

- Mobile menu (`MobileMenu`): full-screen below the header, large serif rows, "Programe" expands into the program list ("Toate programele" at the end), the free-session button and RO/EN/IT switch pinned at the bottom; page scroll is locked while open.
- Mobile footer shows only the site links, language, legal links and social icons (programs list and blurbs are desktop-only).
- Tap targets are at least 44 px (brand link, "see all" links, carousel dots 36 px, legal links). No page has horizontal overflow at 360 px.
- No videos anywhere: the hero cross-fades photos, cards and the 404 use stills. `public/video`, `LoopVideo` and the video script were removed.
