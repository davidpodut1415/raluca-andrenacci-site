# 01 — Site Analysis: ralucaandrenacci.com

> Analysis date: 2026-10-26. Sources: live page text, computed styles read from the DOM, and screenshots of the home page (mobile width) and the Programs page (desktop width).
> **Limits of this analysis:** I did not capture every page at both breakpoints, did not see the contact form's fields (they did not appear in the extracted text), and did not inspect the Italian pages. Items marked _(verify)_ need a second look before we rely on them.

## 1. What the site is

Personal brand site of **Raluca Andrenacci** — certified coach & mentor (EMCC-accredited), 20+ years of entrepreneurship (media/advertising, real estate & construction, HoReCa), currently based in Milan. Audience: entrepreneurs, family-business owners and successors, senior professionals. Goal of the site: generate **"first free session"** bookings for mentoring programs.

### Tech (current)

| Layer     | Finding                                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CMS       | WordPress, theme "Redux", Elementor page builder, Polylang (RO/EN/IT), Cookie Notice plugin, Autoptimize                                                          |
| JS        | jQuery + jquery-migrate, Elementor/Swiper                                                                                                                         |
| Tracking  | Google Tag Manager `GTM-TLZ64RRB`, GA4 `G-ZSP4N2JGDR`, Google Ads `AW-17013990593`, Google Site Kit `GT-P3NNTWV4`, Meta Pixel `594771570241815`, LinkedIn Insight |
| Languages | RO at `/` (default), EN at `/en/`, IT at `/it/`                                                                                                                   |

## 2. Sitemap (current)

| URL             | Label (RO)           | Purpose                                                                                 |
| --------------- | -------------------- | --------------------------------------------------------------------------------------- |
| `/`             | Home                 | Landing page for the **"Auditul Prezentului Tău"** individual mentoring program         |
| `/despre-mine/` | Despre mine          | Bio, EMCC certificate photo, 3 certifications                                           |
| `/servicii/`    | Programe de mentorat | **Family-business** mentoring programs (5 programs)                                     |
| `/latest-news/` | Blog                 | 13 posts, 10 per page, all "Uncategorized"                                              |
| `/contacte/`    | Contact Coaching     | Email + form, benefits list                                                             |
| `/en/`, `/it/`  | Language versions    | EN confirmed; IT _(verify depth of translation)_                                        |
| Blog posts      | `/<slug>/` at root   | e.g. `/cat-este-suficient-despre-bani-viata-familie-si-mostenirea-pe-care-o-construim/` |

Global elements: sticky header (logo wordmark + 5 links + language switcher), a **"Top Posts"** block (3 posts) that appears before the main content of every page in the DOM _(verify: likely an off-canvas/menu widget)_, footer with "Copyright © 2025" + LinkedIn/Instagram icons, cookie banner.

## 3. Page-by-page content inventory

### Home (`/`)

1. **Hero** — "RALUCA ANDRENACCI / AUDITUL PREZENTULUI TĂU / PROGRAM DE MENTORAT PERSONALIZAT / CLARITATE, REZILIENȚĂ, BANI și ECHILIBRU / într-o lume în continuă schimbare" · CTA **PRIMA SESIUNE GRATUITĂ** · footnote "*Locuri limitate…"
2. **"Recunoști aceste provocări?"** — 6 testimonials (long, italic, in cards): Elena 42 (C-level exec), Mihai D. 38 (real-estate investor), Andreea 28 (medical tech), Remus 29 (restaurant owner), Ana D. 28 (family-business successor), Ioana 38 (interior-design entrepreneur).
3. **"De ce este esențial un audit al prezentului?"** — 4 outcomes: manage emotions/actions in crisis · turn frustration into progress · build an antifragile mindset · make smart, sustainable financial decisions.
4. **"Ce primești în programul de mentorat?"** — weekly 1:1 sessions (60 min) · resources/exercises · email support between sessions · personalized 90-day plan.
5. **"De ce să te înscrii acum?"** — Limited spots · Free gift agenda · Free MiniAudit.
6. **"Despre mine"** — 20+ yrs experience, certified coach/mentor, FFI member, EMCC accredited, **ForbesLife cover**, speaker at Forbes CEE Forum, Forbes Power Breakfast, ZF Live.

### Despre mine (`/despre-mine/`)

Certificate photo (captioned "Certificate EMCC") · one bio paragraph (Milan, 20+ years, 1:1 and remote programs) · certifications: **Mentor EIA Practitioner (EMCC Romania)**, **Professional Coach (One2Coach București)**, **Coach Formator (ANC, COR 242401)**. _The ForbesLife / speaker credentials are only on the home page, not here._

### Programe de mentorat (`/servicii/`)

Intro: confidential mentoring for family-business members and successors (values, reputation, capital). Five programs, each with "Direcții" bullets and an outcome line:

1. **Co-Leadership: Fondator & NextGen** — shared vision, gradual handover, clear roles, joint decisions.
2. **Mentorat pentru Succesori NextGen** — strategic thinking, autonomy, values-based leadership identity, emotional balance, family dynamics.
3. **Integrarea Succesorului în Business** — gradual exposure, pilot projects, objectives & KPIs, decision mentoring.
4. **Entrepreneur-in-Residence** — launching a new venture inside the family ecosystem.
5. **Guvernanță Advisory & Family-Office Board** — independent advisory board design, member selection, mandate, periodic evaluation.
   CTA: **PRIMA SESIUNE GRATUITĂ** → scheduling link. **No pricing, no process, no FAQ.** A strong portrait photo of Raluca is used here (desktop) — the best photo on the site, not used on the home page.

### Blog (`/latest-news/`) — 13 posts

Newest: _Cât este suficient?!…_ (ian 2026), _Cea mai grea lecție pe care o înveți după ce ai succes_ (oct 2025), _Ce mai înseamnă AUTORITATE…_ (oct 2025), _Cum ne asumăm educația copiilor…_ (apr 2025), _Cum pot cei mai bogați oameni din România să își protejeze averea…_ (apr 2025), _2025: Un An al Rezilienței…_, _Cum poate ajuta guvernanța familială…_, _Validarea ca monedă socială…_, _Un moment de reflecție…_ (all apr 2025), _Interviu SMARK.RO_ (mai 2023); older: _De ce nu pot lucra cu membrii familiei mele?!_ (dec 2022), _MENTORING NOTES_ (ian 2023), _Viața e perversă…_ (iul 2015). Format: numbered list, date, category, "0 Comments", title only. English versions of the latest posts exist.

### Contact (`/contacte/`)

"Programează o sesiune de coaching" · benefits bullets (clarity, confidence, overcoming blocks, career direction, work-life balance) · email `mentoringshop@gmail.com` · LinkedIn `linkedin.com/in/raluca-andrenacci-41499142` · Instagram `instagram.com/ralucaandrenacci` · link to icf.com. No phone, no address.

## 4. Visual system (as found)

| Aspect            | Finding                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Heading colour    | `#3E1D16` (dark espresso brown) on home                                                                             |
| Primary CTA       | bg `#812816` (burgundy), white text, Roboto 600/18px                                                                |
| Programs headings | lighter red/burgundy, **Roboto** (not the serif used on home)                                                       |
| Body text         | **`#777777`**, Poppins 13px (home); `rgb(125,119,137)` (`#7D7789`, purple-grey) set on `<body>`; Roboto on Programs |
| Links / nav       | `#333333`, Poppins 600; active nav item = solid dark rectangle (desktop)                                            |
| Section bg        | warm cream/blush (~`#FDF7F2`) alternating with white _(exact value: verify)_                                        |
| Eyebrow labels    | Poppins, uppercase, very wide tracking (`PROGRAME DE MENTORAT`)                                                     |
| Cards             | large-radius white cards with thin border (testimonials)                                                            |
| Fonts loaded      | **Poppins, Open Sans, Playfair Display, Roboto** (4 families)                                                       |

## 5. Problems found (what we are fixing)

### Visual / branding

1. **Four font families with no rule** — serif headings on Home, Roboto headings on Programs, Poppins for nav, Open Sans somewhere else. `Playfair Display, sans-serif` is the fallback stack (should be `serif`).
2. **Type scale is broken** — `h2` (42px) is larger than `h1` (40px); body copy is **13px**.
3. **Three different greys for body text** (`#777`, `#7D7789`, `#333`) and two different "reds" for headings. `#777` on white is 4.48:1 — under WCAG AA (4.5:1) — and at 13px it is hard to read.
4. **Inconsistent shapes** — sharp-cornered dark nav pill, rounded-rect hero button, fully-round cookie "Accept" pill, large-radius cards. No radius system.
5. **Hero** — text sits on a washed-out, blurred photo with a mix of burgundy serif and Roboto sans; low contrast on mobile and no clear focal point. The portrait photo (Programs page) is not used where it would build trust.
6. **Blank gaps while scrolling** (home, mobile) — sections render as empty white space between content (reveal/lazy animations not firing in screenshots). _(verify on real devices)_
7. **Testimonials** — six very long italic paragraphs in tall cards, no photo/logo, no pull-quote or result highlight; most of the home page height is this block. Impossible to scan.

### Organization / UX

8. **Positioning mismatch** — Home sells an individual "Audit" program; Programs page is 100% family-business/succession. Visitors from the home CTA don't land on the offer that the rest of the site describes. _(Decision: Family business becomes the flagship — see `docs/00-DECISIONS.md`.)_
9. **About page is thin** — one paragraph + a certificate photo, while the strongest trust signals (ForbesLife cover, Forbes CEE Forum, ZF Live, 20+ yrs, SMARK interview) live only on the home page.
10. **Programs page has no pricing hints, process, timeline, FAQ or per-program pages**, and the CTA only appears once.
11. **Blog** — all posts "Uncategorized", no excerpts, no images, no reading time, "0 Comments" shown on every post, numbered list layout, month-year dates only. Not useful for discovery.
12. **"Top Posts" block** is rendered before the main content on every page (DOM order) — noise for screen readers and crawlers.
13. **Language switcher** lists the current language twice in the DOM; EN uses "An Audit of Your **Presence**" while RO says "Prezentului" (= _Present_) — inconsistent translation. EN `<title>` is the generic "Homepage - Raluca Andrenacci".
14. **Brand naming** — header says "Raluca Andrenacci", footer says "© 2025 Auditul Prezentului Tău". Pick one master brand.
15. **Contact** — only a personal Gmail; no response-time promise, no what-happens-next, form fields not visible in extraction _(verify)_.
16. **Footer** — social icons without labels (a11y), no legal links, no sitemap, no contact.

### Compliance / performance

17. **Cookie banner** — only an **Accept** button was visible (no Reject / Manage). It overlays ~25% of the mobile viewport and covers the footer. Marketing tags (GTM, Meta Pixel, LinkedIn Insight) were present in the page scripts while the banner was still showing _(verify whether they are consent-gated)_. Needs a GDPR-grade consent flow (Google Consent Mode v2).
18. **Heavy stack** — WordPress + Elementor + jQuery + 6 tracking scripts.
19. **Scarcity copy** ("Locuri limitate") without any concrete number or date — weak/low-trust urgency.

## 6. What to keep (references worth copying)

- The **burgundy + espresso + cream** warm palette — distinctive and fitting for family-office/legacy topics.
- **Playfair Display** serif for headlines — gives the "editorial/Forbes" feel that matches her positioning.
- Wide-tracked uppercase **eyebrow labels** and the uppercase wordmark in the header.
- Clear, single, repeated primary CTA: **"Prima sesiune gratuită"**.
- The program copy structure on `/servicii/` (Direcții → Obiectiv) — strong, concrete, reusable as per-program page layout.
- Trilingual presence (RO/EN/IT) and the URL scheme with RO at the root.
- Content: testimonials, outcomes list, credentials, 13 blog posts.

## 7. Reference sites to study (patterns, not to copy)

To be collected during Phase 0 — suggested set: a family-office advisory site, a premium executive-coach site, an editorial personal brand site. Look for: hero with portrait, credibility bar ("As seen in Forbes / ZF"), program cards with outcome-first copy, short testimonial carousels with results, article cards with category chips.
