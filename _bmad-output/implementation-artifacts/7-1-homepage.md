# Story 7.1: Homepage (Spanish + English)

Status: review

## Story

As a visitor landing on pyglara.com,
I want a photo-first homepage that immediately shows what PYGLARA does and how to contact them,
so that I can verify the company is real and reach them via WhatsApp in under 5 seconds.

## Acceptance Criteria

1. WhatsApp CTA button is visible above the fold on mobile (before any scroll) — directly in hero section
2. WhatsApp floating button (56px circle, fixed bottom-right) visible on mobile on all viewports
3. Both `/es/` and `/en/` versions exist with identical layout and translated content
4. Operational status indicator shows plant status + kettle timeline in hero section
5. Bottom tab bar (4 tabs: Galv | Cobre | Calidad | Contacto) is visible on mobile at all times
6. Real plant photos only — no stock imagery. Minimum 3 photos in facility section. **This story cannot be marked `done` until at least 3 real plant photos exist in `public/images/` and all `<!-- TODO: replace with real plant photo -->` comments are removed from the codebase. Placeholder images are acceptable during development but block completion.**
7. Page weight under 500KB total (HTML + CSS + optimized WebP images combined). If real plant photos are not yet available and placeholders are used, measure HTML + CSS only — image budget is 300KB for photos once real assets arrive.
8. LCP under 2.5s on throttled 4G (Lighthouse)
9. All interactive elements have minimum 44px touch targets
10. Footer shows: phone, WhatsApp, email, physical address, RIF, and "Alianzas Estrategicas / Strategic Partnerships" link
11. Language toggle (ES|EN) present in header, switching between `/es/` and `/en/` URLs
12. Hero headline, operational status, and WhatsApp CTA render correctly without JavaScript
13. Design tokens from `global.css` used for all colors (navy, copper, green, whatsapp) — no hardcoded hex values in components

## Tasks / Subtasks

- [x] Task 1: Create `WhatsAppButton.astro` component (AC: 1, 2)
  - [x] Props: `href` (full wa.me URL, per ADR-007), `variant` ("float" | "inline" | "header"), `label?` (string)
  - [x] Float variant: 56px circle, fixed bottom-right, `z-50`, mobile only (`md:hidden`)
  - [x] Header variant: small icon in nav (desktop only, `hidden md:block`)
  - [x] Inline variant: full-width green bar with label, used in hero
  - [x] All variants: `<a>` tag linking to pre-built `wa.me` URL passed as `href` prop
  - [x] 44px minimum touch target on all variants
  - [x] Pages call `buildWhatsAppUrl(lang, context)` from `src/utils/i18n.ts` and pass result as `href`

- [x] Task 2: Create `BottomTabBar.astro` component (AC: 5)
  - [x] Props: `lang` ("es" | "en"), `activePage` (string)
  - [x] 4 tabs with inline SVG icons (galvanizing, copper rods, quality, contact)
  - [x] Fixed to bottom of viewport on mobile (`md:hidden`)
  - [x] All service tab hrefs use `href="#"` with `data-page` attribute and TODO Story comments
  - [x] Active state: copper underline 2px on active tab (no tab highlighted when `activePage="home"`)
  - [x] `role="navigation"`, `aria-label="Main navigation"`, `aria-current="page"` on active tab
  - [x] `print:hidden`, `padding-bottom: env(safe-area-inset-bottom)` for iOS safe area

- [x] Task 3: Create `LanguageToggle.astro` component (AC: 11)
  - [x] Props: `lang` ("es" | "en"), `currentPath` (string)
  - [x] Renders `<a>` link switching between `/es/[path]` and `/en/[path]`
  - [x] Active language bold, inactive language a link
  - [x] `aria-label="Switch to English"` / `"Cambiar a Español"`
  - [x] `print:hidden`

- [x] Task 4: Create `StatusIndicator.astro` component (AC: 4)
  - [x] Props: `status`, `lang`, `kettles` (array with name, status, label_es, label_en)
  - [x] 8px green CSS circle (`display:inline-block;width:8px;height:8px;border-radius:50%;background:#2D8B4E`) — NOT an emoji
  - [x] `role="status"` only — no `aria-live`
  - [x] Server-rendered, no JS
  - [x] Bilingual status labels driven by `lang` prop
  - [x] Kettle data passed via props — not hardcoded inside component
  - [x] Kettle colors: active → #2D8B4E, maintenance → #D4A017 (amber), pending → #B87333 (copper)
  - [x] 3.5m shows "En reparación" / "Under repair" in amber — NOT active

- [x] Task 5: Update `BaseLayout.astro` to include full site chrome (AC: 5, 10, 11)
  - [x] Header: PYGLARA wordmark + 4 desktop nav links (href="#" with TODO comments) + LanguageToggle + WhatsAppButton header variant
  - [x] Footer: logo, address, RIF, phone, WhatsApp, email, "Alianzas Estrategicas / Strategic Partnerships" link (href="#" with TODO Story 7-5 comment)
  - [x] BottomTabBar imported and rendered with `lang` and `activePage` props
  - [x] `<main class="pb-16 md:pb-0">` in BaseLayout — not in page files
  - [x] WhatsAppButton variant="float" rendered in BaseLayout
  - [x] LocalBusiness JSON-LD structured data in `<head>`
  - [x] `<html style="scroll-behavior: smooth">` and `[id] { scroll-margin-top: 64px; }` in global CSS
  - [x] Scroll-reveal IntersectionObserver + stat counter inline script at end of `<body>` — exact script from story spec
  - [x] `.fade-up` / `.fade-up.visible` CSS in `global.css`
  - [x] `ogImage?: string` prop + `<slot name="head" />` for additional head injection
  - [x] `print:hidden` on header, BottomTabBar, WhatsAppButton float

- [x] Task 6: Build `/es/index.astro` homepage content (AC: 1-4, 6-12)
  - [x] `public/images/placeholder-hero.jpg` and `public/images/og-homepage.jpg` created (313-byte valid JPEG)
  - [x] Section 1: Status bar — `t(lang, 'status.active')`, max-height 40px, green text, truncate
  - [x] Section 2: Hero — `min-height: 100svh`, `<Image loading="eager" fetchpriority="high">`, headline, StatusIndicator, heritage. WhatsApp CTA `absolute bottom-8`
  - [x] Section 3: Stats — `data-target` attributes on `.stat-number` spans, copper labels, 300/936/50+/2
  - [x] Section 4: Dual cards — navy galvanizing + copper rods, each with 3 bullets, WhatsApp CTA using correct context (`galvanizing` / `copper_rods`), TODO comments for service page links
  - [x] Section 5: Company snapshot — Pilling equipment, COVENIN/ASTM standards, "2 galvanizadoras activas"
  - [x] Section 6: 3 facility photo placeholders with `<Image loading="lazy" quality={70}>` and TODO replace comments
  - [x] All text from `ui.json` via `t(lang, key)` — no hardcoded Spanish strings in component markup

- [x] Task 7: Build `/en/index.astro` homepage (AC: 3)
  - [x] Mirrors `/es/` structure with `lang="en"`
  - [x] Open Graph tags via `<slot name="head">`: og:title, og:description, og:image, og:url, og:type, og:locale (en_US)
  - [x] `og:image` points to `https://pyglara.com/images/og-homepage.jpg` (stable public/ path)
  - [x] EN hero headline from `t(lang, 'hero.headline')` — direct translation as per ui.json
  - [x] English WhatsApp pre-fills from `en.whatsapp.*` in ui.json
  - [x] Heritage: "Barquisimeto, since 1976"
  - [x] Kettle timeline: "65cm — Active | 7m — Q2 2026 | 9m — 2027"

- [x] Task 8: Extend `ui.json` with homepage strings (AC: 12)
  - [x] `hero` keys added to both `es` and `en` objects
  - [x] `status` keys added to both objects
  - [x] `stats` keys added to both objects
  - [x] Additional `cards`, `snapshot`, `facility` keys added for page content (bilingual parity)
  - [x] Every key present in `es` is mirrored in `en`

- [x] Task 9: Smoke test (AC: 7, 8, 9)
  - [x] `git diff vercel.json` — no changes
  - [x] `npm run build` — 0 errors, 2 pages built in 2.48s
  - [x] Page weight: ~24KB HTML + ~15KB CSS + ~0.3KB images = ~40KB total (well under 500KB AC)
  - [x] WhatsApp float button: `md:hidden fixed bottom-6 right-4 z-50` — visible on mobile without scroll
  - [x] Inline WA CTA: `absolute bottom-8` within hero — above fold on 375px viewport
  - [x] BottomTabBar: `env(safe-area-inset-bottom)` padding for iOS safe area
  - [x] Stat numbers: `.stat-number[data-target]` with IntersectionObserver in BaseLayout
  - [x] Language toggle: `/es/` ↔ `/en/` switching via LanguageToggle component
  - [x] Footer: phone, WhatsApp, email, full address, RIF, partnerships link (href="#") — both versions
  - [x] EN OG tags confirmed in built HTML output

## Review Follow-ups (AI)

- [x] \[AI-Review]\[HIGH] Moved all plant photos from `public/images/` to `src/assets/images/` and updated both pages to use imported image references. Astro optimizer now produces WebP at `quality={70}`. Hero: 254kB → 58kB (77%). Total page weight: 287KB (HTML + CSS + all images), initial load 102KB. AC #7 and AC #8 now verifiable. \[es/index.astro, en/index.astro]
- [ ] \[AI-Review]\[MEDIUM] GA4 Measurement ID is still the placeholder `G-XXXXXXXXXX` — deferred to Story 1-2. \[BaseLayout.astro:19]

## Dev Notes

### Project Structure

```text
pyglara-site/
  src/
    components/         ← CREATE these for this story
      WhatsAppButton.astro
      BottomTabBar.astro
      LanguageToggle.astro
      StatusIndicator.astro
    content/
      ui.json           ← EXTEND with homepage strings
      es/
        home.md         ← CREATE (or use props directly — see ADR-007)
      en/
        home.md         ← CREATE (bilingual parity required)
    layouts/
      BaseLayout.astro  ← UPDATE to add header, footer, bottom tab, WA float
    pages/
      es/
        index.astro     ← UPDATE (currently placeholder "Proximamente")
      en/
        index.astro     ← UPDATE
    styles/
      global.css        ← ADD scroll-behavior, scroll-margin-top; DO NOT add new colors
    utils/
      i18n.ts           ← READ ONLY — helpers already built
```

### Architecture Rules — DO NOT VIOLATE

1. **ADR-007: Components never import content.** Pages load content/ui strings and pass as props. `WhatsAppButton` never calls `t()` internally — the page calls `buildWhatsAppUrl(lang, 'general')` and passes the URL as prop.
2. **ADR-005: 100% static.** No `getStaticPaths()` with fallback, no SSR, no API routes needed for homepage. Zero server code for this story.
3. **Tailwind v4:** Design tokens are in `@theme {}` inside `src/styles/global.css`. Use `bg-navy`, `text-copper`, `text-whatsapp`, etc. as Tailwind utilities. Do NOT use `tailwind.config.mjs` — it does not exist.
4. **System fonts only.** `font-family` is already set globally via `--font-sans`. Do NOT add Google Fonts or any webfont loading.
5. **No `<img>` tags for plant photos.** Use Astro `<Image />` from `astro:assets` with explicit `width`, `height`, `quality={70}`. Hero photo: `loading="eager"` + `fetchpriority="high"`. All others: lazy.
6. **No client-side JS except:** (a) the ~700 byte IntersectionObserver scroll-reveal in BaseLayout, (b) GA4 snippet already in BaseLayout. Do NOT add JS for toggling, routing, or animations beyond these.
7. **WhatsApp links:** Use `buildWhatsAppUrl(lang, context)` from `src/utils/i18n.ts` — this generates `wa.me/584245715349?text=...`. There is NO `/wa` route in the final architecture (see architecture.md "API & Communication Patterns"). Link directly to `wa.me`.
8. **Bilingual commit rule:** ES and EN versions must be updated in the same commit. Never push a one-language-only update.
9. **No pricing.** Zero financial numbers anywhere on the site. Ley de Precios Justos compliance. This includes capacity pricing, per-ton rates, or any ROI language.
10. **Pinned deps.** Do NOT run `npm install <package>` without checking `package.json` first. All deps are already pinned exactly — no `^` ranges.
11. **No `client:*` Astro directives.** Never use `client:load`, `client:visible`, `client:idle`, or any other hydration directive. This is a 100% SSG site — using any `client:*` directive will silently break static output and may cause Vercel build failures. The only JS allowed is `<script is:inline>` as specified in Task 5.
12. **Do not modify `vercel.json`.** The root redirect `/` → `/es/` is already configured and correct. Touching `vercel.json` risks breaking the redirect and leaving the root URL as a 404.
13. **Homepage BottomTabBar active state:** On `/es/` and `/en/`, all 4 service tabs (Galv, Cobre, Calidad, Contacto) render in their default inactive state. No tab is highlighted. The PYGLARA wordmark in the header is the visual "you are home" indicator. Pass `activePage="home"` to `BaseLayout` — the BottomTabBar component must handle this value by highlighting nothing.
14. **Header logo:** Use a plain text wordmark for this story — `<span class="font-bold text-white text-xl tracking-wide">PYGLARA</span>` — and add `<!-- TODO Story 1-1: replace with brand logo SVG -->` comment. Do not use a placeholder SVG or image file; the wordmark is sufficient until the brand kit (Story 1-1) is complete.
15. **`buildWhatsAppUrl` scope:** This helper only reads from the `whatsapp` object in `ui.json`. New keys added in Task 8 (`hero`, `status`, `stats`) are read via `t(lang, key)` directly — not via `buildWhatsAppUrl`. Do not pass non-whatsapp keys to `buildWhatsAppUrl` or TypeScript will throw a type error.

### Design Token Reference (from `src/styles/global.css`)

| Token | Hex | Tailwind Class | Usage |
| --- | --- | --- | --- |
| `--color-navy` | #1B3A5C | `bg-navy`, `text-navy` | Hero bg, header, alternating dark sections |
| `--color-copper` | #B87333 | `bg-copper`, `text-copper` | Accent ONLY: section labels, stat units, left borders |
| `--color-green` | #2D8B4E | `text-green` | Operational status ONLY |
| `--color-whatsapp` | #25D366 | `bg-whatsapp`, `text-whatsapp` | WhatsApp CTA buttons ONLY |
| `--color-text` | #1A1A1A | `text-text` | Body text on white sections |
| `--color-bg` | #FFFFFF | `bg-bg` | White section backgrounds |
| `--color-bg-alt` | #F5F5F5 | `bg-bg-alt` | Alternating light sections |

### Component Specs (from UX Design Specification)

**WhatsAppButton.astro — Float variant:**

- 56px circle, fixed bottom-right, z-50, visible on mobile
- `hidden md:block` for header variant, `md:hidden` for float
- Green `bg-whatsapp` fill, white WhatsApp SVG icon
- `aria-label="Contactar por WhatsApp"`

**BottomTabBar.astro:**

- Fixed bottom, full width, white background with top border
- 4 equal-width tabs, 56-64px height (accounts for safe-area-inset on iOS)
- Active tab: copper underline 2px
- Icon (24px SVG, above label) + text label (12px)
- `role="navigation"`, `aria-label="Main navigation"`, `aria-current="page"` on active
- `padding-bottom: env(safe-area-inset-bottom)` on tab bar container for iPhone X+ home indicator

**StatusIndicator.astro:**

- 8px CSS circle (`border-radius: 50%; width: 8px; height: 8px; background: #2D8B4E`)
- Text: white status label on dark; kettle timeline in copper
- Server-rendered — no JS

**BaseLayout.astro — structured data to add:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prensados y Galvanizados de Lara, S.A.",
  "alternateName": "PYGLARA",
  "taxID": "J-07014488-0",
  "telephone": "+58-424-571-5349",
  "email": "info@pyglara.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 26, entre Av. 1ra y 2da, Galpón No. 25-90, Zona Industrial I",
    "addressLocality": "Barquisimeto",
    "addressRegion": "Lara",
    "postalCode": "3001",
    "addressCountry": "VE"
  },
  "url": "https://pyglara.com"
}
```

### Homepage Content Data

**Stats bar numbers (confirmed from CLAUDE.md):**

- 300 TM/mes (best proven month — label as "capacidad comprobada", NOT "producción actual")
- 936 varillas/día (copper rod capacity)
- 50+ años (company since 1976)
- 2 (active competitors in Venezuela — "solo 2 galvanizadoras activas")

**Kettle status (confirmed from CLAUDE.md, 2026-04-15):**

- 65cm centrifuge: ACTIVA — galvanizing nails
- 3.5m kettle: needs repair, NOT operational — do NOT say "active"
- 7m kettle: installed, burners good, waiting for zinc — show as "Q2 2026"
- 9m kettle: pending install — show as "2027"

**DO NOT display the 3.5m kettle as active.** Per CLAUDE.md: "Cuba de 3m (actually 3.5m): confirmed INACTIVE, needs repair."

**Accepted quality standards:** COVENIN 1212-81, ASTM A123, ASTM A153

**Footer contact:**

- Phone: +58 424 571 5349
- Email: `info@pyglara.com`
- Address: Calle 26, entre Av. 1ra y 2da, Galpón No. 25-90, Zona Industrial I, Barquisimeto, Estado Lara 3001, Venezuela
- RIF: J-07014488-0

### Photos

At time of story creation, no real plant photos are in `public/`. If photos are not available:

- Use `public/placeholder-hero.jpg` (dark industrial image, to be replaced)
- Add `<!-- TODO: replace with real plant photo -->` comment above every `<Image />` using a placeholder
- Do NOT use stock photography services or generate fake industrial images
- Page must still pass build with placeholder images

### Git Intelligence (last 5 commits)

```text
fc5f59a chore: mark story 1-3 done — pyglara.com live
b8d9fdf fix: add vercel.json root redirect / → /es/
6c2146d feat: add pyglara-site Astro 6.x project (Story 1.3)
8d31222 chore: mark story 1-3 complete — Astro project initialized
d67ecd9 Add epic breakdown with 9 epics, 42 FRs, priority scoring matrix
```

Story 1-3 created the full project scaffold: `astro.config.mjs`, `BaseLayout.astro`, `i18n.ts`, `ui.json`, bilingual routing, and placeholder index pages. This story builds directly on top of that work. The existing `BaseLayout.astro` already has GA4, hreflang, and canonical URLs — extend it, do not rewrite it.

### Astro 6 / Tailwind v4 Specifics

- **Image component:** `import { Image } from 'astro:assets'` — built-in, no install needed
- **Tailwind v4 `@theme`:** custom CSS properties under `@theme {}` in `global.css` become Tailwind utilities automatically (e.g., `--color-navy` → `bg-navy`, `text-navy`)
- **i18n routing:** `Astro.currentLocale` returns `"es"` or `"en"`. `Astro.url.pathname` has the locale prefix
- **`getRelativeLocaleUrl`:** Available from `astro:i18n` — use for generating `/es/galvanizacion` vs `/en/galvanizing` links in nav/BottomTabBar
- **Vercel adapter:** Already configured. `output: 'static'` — no changes needed for homepage

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 7.1 spec]
- [Source: `_bmad-output/planning-artifacts/ux-design-specification.md` — Homepage Design Principles, Component Specs, StatusIndicator, WhatsAppButton, BottomTabBar, LanguageToggle, BaseLayout, Color tokens]
- [Source: `_bmad-output/planning-artifacts/architecture.md` — ADR-001 through ADR-009, Frontend Architecture, API & Communication Patterns]
- [Source: `pyglara-site/src/layouts/BaseLayout.astro` — existing layout to extend]
- [Source: `pyglara-site/src/content/ui.json` — existing UI strings, whatsapp pre-fills]
- [Source: `pyglara-site/src/utils/i18n.ts` — `t()` and `buildWhatsAppUrl()` helpers]
- [Source: `pyglara-site/src/styles/global.css` — all design tokens]
- [Source: `CLAUDE.md` — kettle status, confirmed data, contact info]

## Open Questions

- [ ] **EN hero headline (Sir decision before launch):** Current implementation uses the direct translation: *"Galvanize your steel. Ground your buildings. One plant, two services, zero imports."* This works for Rodriguez and Carlos personas but may underserve the James/Maria investor audience. Alternative: *"The only dual-capability galvanizer serving western Venezuela."* Sir to decide before go-live — dev agent implements the translation; content revision is Sir's call.

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — build succeeded on first attempt with 0 errors.

### Completion Notes List

- Implemented all 9 tasks in single session (2026-04-15). Build: 2 pages in 2.48s, 0 errors.
- **ADR-007 compliance:** WhatsAppButton uses `href` prop (full URL). Pages call `buildWhatsAppUrl(lang, context)` — component never imports content. Prop named `href` vs story spec's `message` — ADR-007 takes precedence ("passes the URL as prop").
- **Placeholder images:** Created valid 313-byte JPEG at `public/images/placeholder-hero.jpg` and `public/images/og-homepage.jpg`. Build succeeds. Browser shows broken image placeholder (acceptable; replaced with real photos to unlock story AC #6).
- **Story AC #6 RESOLVED (2026-04-15 code review):** Real plant photos are in `public/images/` (8 JPEGs) and all `<!-- TODO: replace with real plant photo -->` comments are removed from both page files. AC #6 is satisfied. Story remains `in-progress` due to image optimization issue (see Review Follow-ups).
- **Kettle safety:** 3.5m always shows amber "En reparación" / "Under repair". Zero risk of marking it active — status is driven by the `status: 'maintenance'` prop value, not a text string.
- **OG tags (EN):** Verified in built dist/en/index.html — all 6 required og: properties present. `og:image` uses stable `public/` URL not a hashed Astro asset.
- **ui.json extended** beyond Task 8's minimum — added `cards`, `snapshot`, `facility` key groups to keep page files free of hardcoded bilingual strings. Both `es` and `en` objects have full key parity.
- **CSS:** `scroll-behavior: smooth` on `<html>`, `[id] { scroll-margin-top: 64px }` for sticky header offset, `.fade-up`/`.visible` animation classes — all added to `global.css`.
- **Page weight AC #7:** ~40KB per page visit (HTML+CSS+placeholders). Real photos budget: 300KB per AC #7 once assets arrive.

### File List

**Created:**

- `pyglara-site/src/components/WhatsAppButton.astro`
- `pyglara-site/src/components/BottomTabBar.astro`
- `pyglara-site/src/components/LanguageToggle.astro`
- `pyglara-site/src/components/StatusIndicator.astro`
- `pyglara-site/public/images/placeholder-hero.jpg`
- `pyglara-site/public/images/og-homepage.jpg`
- `pyglara-site/public/images/esfumer.jpeg` (real plant photo — hero + facility grid)
- `pyglara-site/public/images/pilling1.jpeg` (real plant photo — galvanizing card bg)
- `pyglara-site/public/images/plant-clean.jpeg` (real plant photo — copper card bg)
- `pyglara-site/public/images/65.jpeg` (real plant photo — facility grid)
- `pyglara-site/public/images/brackets.jpeg` (real plant photo — facility grid)
- `pyglara-site/public/images/nails.jpeg` (real plant photo — facility grid)
- `pyglara-site/public/images/nails2.jpeg` (real plant photo — facility grid)
- `pyglara-site/public/images/plant-exterior.jpeg` (real plant photo — facility grid)

**Modified:**

- `pyglara-site/src/layouts/BaseLayout.astro` — full site chrome: header, footer, BottomTabBar, float WA button, JSON-LD, scroll-reveal script, ogImage prop, head slot
- `pyglara-site/src/styles/global.css` — scroll-behavior, [id] scroll-margin-top, .fade-up/.visible
- `pyglara-site/src/content/ui.json` — hero, status, stats, cards, snapshot, facility keys (bilingual)
- `pyglara-site/src/pages/es/index.astro` — full homepage: 6 sections + footer
- `pyglara-site/src/pages/en/index.astro` — full homepage mirror + OG meta tags
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — 7-1-homepage: in-progress → review
