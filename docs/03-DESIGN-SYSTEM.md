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
- **Header (reference-based):** full-width gutters (16 / 24 / 32px), 56px (64px desktop) high, three columns on desktop — uppercase wordmark with wide tracking (left), links centered (Poppins 500, 14px), language dropdown + small primary button (right). It **hides when scrolling down and returns on scroll up** (always visible near the top, while the mobile menu is open, and on keyboard focus).
- **Hero (reference-based):** a rounded-2xl video panel inset 12–16px from the viewport edges, filling the space under the header; headline block bottom-left, supporting facts bottom-right, black gradient from the bottom; video aligned to the top on desktop so the face stays in frame. **No pause button** (client decision). Note: WCAG 2.2.2 asks for a way to pause auto-playing motion longer than 5 s; the video is silent, decorative and stops under `prefers-reduced-motion`. If an accessibility statement is required, reconsider adding a control.
- **CTA band** uses the `light` button variant (white on burgundy).
