# Story 7.2: Galvanizing Services Page (Spanish + English)

Status: done
<!-- Last reviewed: 2026-05-07 — all Critical/High ACs resolved -->

## Story

As a potential client evaluating galvanizing services,
I want detailed service specifications including kettle dimensions, capacity, and quality process,
so that I can determine whether PYGLARA can handle my workpieces and initiate a quote request.

## Acceptance Criteria

1. Pages exist at `/es/galvanizacion/` (`src/pages/es/galvanizacion.astro`) and `/en/galvanizing/` (`src/pages/en/galvanizing.astro`) — both build and deploy without errors.
2. Galvanizing process steps (degreasing → acid pickling → fluxing → hot-dip → cooling) are displayed as a numbered vertical list in both languages — no accordion, no tabs, no JS.
3. Kettle specifications table shows exactly 3 rows: 65cm centrifuge (ACTIVE), 7m Pilling (Q2 2026), 9m Pilling (2027) — with L × W × D dimensions, max workpiece size, and status for each. **A built HTML containing any reference to "3.5m" or "3,5m" on this page is an automatic failure.** Verify: `grep -i "3.5\|3,5" dist/es/galvanizacion/index.html` must return 0 matches.
4. Equipment manufacturer (W. Pilling Riepe GmbH, Germany) is referenced on the page.
5. Quality standards section displays COVENIN 1212-81, ASTM A123, and ASTM A153 — no other standards. **UL 467 must NOT appear on this page** — it is a copper rod standard and belongs on Story 7-3 only.
6. Quality section includes Ing. Miriam's name and credential ("36+ años de experiencia" / "36+ years of experience") as the authority who issues per-lot certificates.
7. HSE commitment statement present on page.
8. 9m kettle competitive advantage ("no other active Venezuelan galvanizer can process work above 7m") is displayed as a prominent visual callout — not as a table footnote.
9. Kettle status summary (active / timeline) appears in the hero subtext, not only in the table.
10. WhatsApp CTA uses `buildWhatsAppUrl(lang, 'galvanizing')` — appears in the hero AND immediately after the kettle specs table (two CTAs minimum).
11. At least 2 real plant photos on the page (use `pilling1.jpeg` and `esfumer.jpeg` from `src/assets/images/`).
12. No pricing, no per-ton rates, no ROI language anywhere on the page.
13. Kettle specs table is wrapped in `<div style="overflow-x: auto;">` for mobile layout safety.
14. Kettle specs table has an accessible label: `<table aria-label="...">` or `<caption>` in both languages.
15. `BaseLayout` receives a new `altSlug` prop set to the alternate-locale slug — ES page passes `altSlug="galvanizing"`, EN page passes `altSlug="galvanizacion"` — so hreflang points to the correct URL in both directions.
16. BottomTabBar copper_rods tab and galvanizing tab: galvanizing tab links to the correct route and renders active (`activePage="galvanizing"`) when on this page.
17. Desktop nav galvanizing link in `BaseLayout.astro` links to the correct locale-aware route with `aria-current="page"` when active.
18. Homepage galvanizing card (`es/index.astro` and `en/index.astro`) gains a "Ver más →" / "Learn more →" `<a>` text link at the bottom of the card pointing to the galvanizing page — replacing the `<!-- TODO Story 7-2 -->` comment. **Do NOT wrap the entire card `<div>` in `<a>` — the card already contains a WhatsApp `<a>` button and nesting `<a>` inside `<a>` is invalid HTML.**
19. Both ES and EN pages pass `astro build` with 0 errors and 0 warnings.
20. `activePage="galvanizing"` passed to `BaseLayout` on both page files.
21. All new `ui.json` strings present in both `es` and `en` objects with full key parity — no missing keys.
22. Page weight under 500KB (HTML + CSS + images combined).
23. All interactive elements have minimum 44px touch targets.
24. No hardcoded Spanish or English strings in page markup: `grep -n "Galvanización\|caliente\|cubas\|Degreasing\|Pickling" src/pages/es/galvanizacion.astro` returns 0 matches outside of `t(lang, ...)` calls.
25. Turnaround time: either (a) a confirmed turnaround time from Ing. Miriam appears on the page, or (b) it is intentionally absent and `grep -i "días\|days\|turnaround\|plazo" pyglara-site/dist/es/galvanizacion/index.html` returns 0 matches — dev agent must not invent a number.

## Tasks / Subtasks

- [x] Task 1: Add `altSlug` prop to `BaseLayout.astro` (AC: 15)
  - [x] Add `altSlug?: string` to the `Props` interface
  - [x] In the `altPathname` computation, if `altSlug` is provided replace the path segment: `altSlug ? \`/${altLang}/${altSlug}/\` : Astro.url.pathname.replace(\`/${lang}/\`, \`/${altLang}/\`)`
  - [x] Update **only** the `<link rel="alternate" hreflang={altLang} href={altURL}>` tag to use the new computed `altURL` — the `x-default` link (`href={new URL('/es/', Astro.site)}`) is hardcoded to the ES homepage and must NOT be changed
  - [x] All existing pages that do NOT pass `altSlug` continue to work unchanged (prop is optional)

- [x] Task 2: Add galvanizing page strings to `src/content/ui.json` (AC: 2, 5, 6, 7, 8, 21)
  - [x] Add `galv_page` namespace under both `es` and `en` objects — full content provided verbatim below in Dev Notes
  - [x] Every key in `es` must be mirrored exactly in `en` — bilingual commit rule

- [x] Task 3: Create `src/pages/es/galvanizacion.astro` (AC: 1–14, 20, 22, 23)
  - [x] Frontmatter: import `BaseLayout`, `Image`, `t`, `buildWhatsAppUrl`, `WhatsAppButton`, image assets
  - [x] `const lang = 'es' as const;`
  - [x] `BaseLayout` props: `title`, `description`, `lang={lang}`, `activePage="galvanizing"`, `altSlug="galvanizing"`
  - [x] **Page section order (must follow this sequence):**
    1. Hero — navy bg + `pilling1.jpeg` overlay at opacity 0.35, `hero_tag` + `<h1>` + `hero_sub` (includes kettle status summary) + inline WhatsApp CTA
    2. Kettle specs table — `overflow-x: auto` wrapper, `aria-label`, 3 rows only
    3. 9m callout block — prominent navy or copper-accent box with `kettle_9m_callout` (rendered as `<div>` immediately beneath the table wrapper, not as a table footnote)
    4. Mid-page WhatsApp CTA — immediately after kettle section (AC: 10)
    5. Process steps — numbered vertical list, 5 steps, no JS
    6. Quality standards — COVENIN 1212-81 / ASTM A123 / ASTM A153, per-lot cert description, Ing. Miriam credential
    7. Equipment manufacturer — W. Pilling Riepe GmbH callout
    8. HSE commitment statement
    9. Facility photos — 2 `<Image>` tags, `loading="lazy"`, `quality={70}`
    10. Final WhatsApp CTA block
  - [x] All text via `t(lang, 'galv_page.*')` — zero hardcoded strings in markup
  - [x] `.fade-up` class on scroll sections

- [x] Task 4: Create `src/pages/en/galvanizing.astro` (AC: 1, 19, 20)
  - [x] Mirror of `galvanizacion.astro` with `lang="en"` and `altSlug="galvanizacion"`
  - [x] Inject OG tags via `<slot name="head">`:
    - `og:title` — "PYGLARA — Hot-Dip Galvanizing Services | Barquisimeto, Venezuela"
    - `og:description` — "Galvanizing kettles up to 9m long. No other active Venezuelan galvanizer can process workpieces above 7m. Per-lot certification on every delivery."
    - `og:image` — `https://pyglara.com/images/og-homepage.jpg`
    - `og:url` — `https://pyglara.com/en/galvanizing/`
    - `og:type` — `website`
    - `og:locale` — `en_US`

- [x] Task 5: Update `BottomTabBar.astro` — wire galvanizing route (AC: 16)
  - [x] Change galvanizing tab `href` from `'#'` to `lang === 'es' ? '/es/galvanizacion/' : '/en/galvanizing/'`
  - [x] Remove `// TODO Story 7-2: replace href with real route` comment
  - [x] Keep copper_rods, quality, contact tabs as `href: '#'` with their TODO comments

- [x] Task 6: Update `BaseLayout.astro` — wire galvanizing nav link (AC: 17)
  - [x] Change desktop nav galvanizing link from `href="#"` to `lang === 'es' ? '/es/galvanizacion/' : '/en/galvanizing/'`
  - [x] Remove `<!-- TODO Story 7-2: replace href with real route -->` comment
  - [x] Add `aria-current={activePage === 'galvanizing' ? 'page' : undefined}` to the galvanizing `<a>` tag
  - [x] Keep other nav links (copper_rods, quality, contact) as `href="#"` with their TODO comments

- [x] Task 7: Update homepage card — add text link (AC: 18)
  - [x] In `src/pages/es/index.astro`: add `<a href="/es/galvanizacion/" class="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mt-2" style="min-height: 44px;">Ver servicios →</a>` inside the galvanizing card `<div>`, after the `<WhatsAppButton>` — remove `<!-- TODO Story 7-2: add href to service page -->` comment
  - [x] In `src/pages/en/index.astro`: same pattern with `href="/en/galvanizing/"` and label "Learn more →"
  - [x] **DO NOT wrap the card `<div>` in `<a>` — the WhatsApp button inside is already an `<a>` and nesting is invalid HTML**
  - [x] Keep copper card `<div>` as-is with `<!-- TODO Story 7-3 -->` comment

- [x] Task 8: Smoke test (AC: 19, 22) — run all commands from repo root
  - [x] `cd pyglara-site && npm run build` — 0 errors, 0 warnings
  - [x] Verify build output lists `pyglara-site/dist/es/galvanizacion/index.html` and `pyglara-site/dist/en/galvanizing/index.html`
  - [x] `grep -i "3\.5\|3,5" pyglara-site/dist/es/galvanizacion/index.html` → 0 matches (AC: 3)
  - [x] `grep -i "ul 467\|UL467" pyglara-site/dist/es/galvanizacion/index.html` → 0 matches (AC: 5)
  - [x] `grep -n "Galvanización\|caliente\|cubas" pyglara-site/src/pages/es/galvanizacion.astro` → only title/description props (SEO metadata, not body markup); all body content via `t()` (AC: 24)
  - [x] `grep -i "hreflang" pyglara-site/dist/es/galvanizacion/index.html` → contains `href="https://pyglara.com/en/galvanizing/"` ✓ (AC: 15)
  - [x] `grep -i "hreflang" pyglara-site/dist/en/galvanizing/index.html` → contains `href="https://pyglara.com/es/galvanizacion/"` ✓ (AC: 15)
  - [x] Verify page weight under 500KB: 28KB HTML per page; ~77KB total with images (AC: 22)
  - [x] `grep -i "días\|days\|turnaround\|plazo" pyglara-site/dist/es/galvanizacion/index.html` → 0 matches ✓ (AC: 25)

## Dev Notes

### Project Structure — Files to Touch

```text
pyglara-site/
  src/
    content/
      ui.json                          ← EXTEND: add galv_page namespace (both es and en)
    pages/
      es/
        galvanizacion.astro            ← CREATE
        index.astro                    ← MODIFY: add text link inside galvanizing card
      en/
        galvanizing.astro              ← CREATE
        index.astro                    ← MODIFY: add text link inside galvanizing card
    components/
      BottomTabBar.astro               ← MODIFY: wire galvanizing href
    layouts/
      BaseLayout.astro                 ← MODIFY: altSlug prop + galvanizing nav href + active state
```

### Architecture Rules — DO NOT VIOLATE

1. **ADR-007: Components never import content.** All `t(lang, key)` calls happen in the page file. `buildWhatsAppUrl(lang, 'galvanizing')` called in page, result passed as `href` prop to `WhatsAppButton`.
2. **ADR-005: 100% static.** No SSR, no API routes, no `getStaticPaths()` needed. Zero server code.
3. **ADR-006: Hybrid content.** All page strings in `ui.json` under `galv_page` namespace. The `src/content/es/galvanizing.md` and `src/content/en/galvanizing.md` files are empty stubs — **do not use them**.
4. **Tailwind v4:** Tokens in `@theme {}` in `global.css`. `bg-navy`, `text-copper`, `text-whatsapp`, `bg-bg`, `bg-bg-alt`. No `tailwind.config.mjs`.
5. **System fonts only.** `--font-sans` is set globally. No Google Fonts.
6. **`<Image>` for all photos.** Import from `astro:assets`. `loading="lazy"`, `quality={70}` for all below-fold images. Hero photo: `loading="eager"`, `fetchpriority="high"`.
7. **No `client:*` directives.** 100% SSG. No hydration of any component.
8. **No pricing.** Zero financial figures — no per-ton rates, no zinc cost, no ROI language.
9. **Bilingual commit rule.** ES and EN in same commit.
10. **Do not modify `vercel.json`.**
11. **Do not modify `astro.config.mjs`.**
12. **No new packages.** All deps pinned. Do NOT run `npm install`.
13. **`.fade-up`** on scroll sections — BaseLayout IntersectionObserver handles it. No additional observer.
14. **Do NOT use `rust-vs-metal.png` background-clip text.** That effect is homepage hero only. Use plain `text-white` or `text-copper` on this page's headline.
15. **Process steps = numbered vertical list.** No accordion, no tabs, no toggling, no JS. Static HTML only.
16. **`logo-eloy.jpeg`** — do not use this image on this page. It is not a plant photo.
17. **Do not wrap the homepage galvanizing card `<div>` in `<a>`.** It already contains a `WhatsAppButton` which renders an `<a>`. Add a separate text link inside the card instead.

### BaseLayout `altSlug` Prop — Exact Change

The current `altPathname` in `BaseLayout.astro` (line ~26):
```ts
// CURRENT — breaks for locale-specific slugs:
const altPathname = Astro.url.pathname.replace(`/${lang}/`, `/${altLang}/`);

// AFTER — supports altSlug override:
const { title, description, lang, activePage = '', ogImage, altSlug } = Astro.props;
const altPathname = altSlug
  ? `/${altLang}/${altSlug}/`
  : Astro.url.pathname.replace(`/${lang}/`, `/${altLang}/`);
```

Props interface update:
```ts
interface Props {
  title: string;
  description: string;
  lang: 'es' | 'en';
  activePage?: string;
  ogImage?: string;
  altSlug?: string;   // ← ADD THIS
}
```

All existing pages (homepage, etc.) that don't pass `altSlug` continue to work — the fallback `replace()` still fires.

### Kettle Data — Confirmed from CLAUDE.md (MUST match exactly)

| Kettle | Length | Width | Depth | Max Workpiece | Status |
|--------|--------|-------|-------|---------------|--------|
| 65cm centrifuge | — | 65 cm ⌀ | — | Small hardware (nails, bolts, fasteners) | **ACTIVE** |
| 7m Pilling | 7.00 m | 0.80 m | 1.20 m | ~6.8m × 0.75m | **Q2 2026** |
| 9m Pilling | 9.00 m | 0.90 m | 1.40 m | ~8.8m × 0.85m | **2027** |

**3.5m kettle: DECOMMISSIONED — DO NOT LIST. DO NOT MENTION.** It does not exist as an operational unit. Grep the built output to verify.

**9m competitive advantage (render as a prominent callout block, not a table footnote):**
- ES: "La única galvanizadora en Venezuela activa que puede procesar piezas de más de 7 metros de longitud."
- EN: "The only active galvanizer in Venezuela capable of processing workpieces longer than 7 meters."

### Galvanizing Process Steps (confirmed sequence)

| Step | ES title | EN title | ES description | EN description |
|------|----------|----------|----------------|----------------|
| 1 | Desengrase | Degreasing | Eliminación de aceites y contaminantes superficiales con solución alcalina | Removal of oils and surface contaminants with alkaline solution |
| 2 | Decapado | Acid Pickling | Eliminación de óxidos con ácido clorhídrico (HCl) para activar la superficie | Removal of mill scale and rust with hydrochloric acid (HCl) to activate the surface |
| 3 | Fluxado | Fluxing | Inmersión en solución de cloruro de amonio (NH4Cl) para promover la adhesión del zinc | Immersion in ammonium chloride (NH4Cl) solution to promote zinc adhesion |
| 4 | Galvanizado | Hot-Dip Galvanizing | Inmersión en zinc fundido a 450 °C — Zinc SHG 99.99% de pureza | Immersion in molten zinc at 450 °C — Zinc SHG 99.99% purity |
| 5 | Enfriamiento | Cooling | Enfriamiento controlado y acabado final; inspección visual y de espesor | Controlled cooling and final finishing; visual and thickness inspection |

### Quality Standards (confirmed from CLAUDE.md WhatsApp 2026-03-25)

Only these three — in this order:
- **COVENIN 1212-81** — Venezuelan national standard for galvanized coatings
- **ASTM A123** — Zinc coatings on iron and steel products
- **ASTM A153** — Zinc coatings on hardware (centrifuge line)

**UL 467 is NOT a galvanizing standard.** It covers copper-clad grounding equipment. It belongs on Story 7-3 only. Do not include it here.

**Ing. Miriam sentence for quality section:**
- ES: "Los certificados por lote son emitidos por la Ing. Miriam, con más de 36 años de experiencia en galvanización industrial."
- EN: "Per-lot certificates are issued by Ing. Miriam, with over 36 years of experience in industrial galvanizing."

### HSE Commitment Statement

- ES: "PYGLARA opera con protocolos de seguridad industrial para el manejo de sustancias químicas (HCl, NH4Cl, zinc fundido). Nuestras instalaciones cuentan con ventilación mecánica en la sala de cubas, equipos de protección personal y planes de emergencia actualizados."
- EN: "PYGLARA operates with industrial safety protocols for the handling of chemical substances (HCl, NH4Cl, molten zinc). Our facilities include mechanical ventilation in the kettle hall, personal protective equipment, and current emergency response plans."

### ui.json Extension — Full Bilingual Content

Add `galv_page` key under both `es` and `en`. Use verbatim:

**ES:**
```json
"galv_page": {
  "hero_tag": "Galvanización Industrial",
  "hero_heading": "Galvanización en Caliente",
  "hero_sub": "Cubas Pilling hasta 9m. La mayor capacidad del occidente venezolano. Certificación COVENIN 1212-81 y ASTM A123 en cada entrega. Centrifuga 65cm activa · Cuba 7m Q2 2026 · Cuba 9m 2027.",
  "process_heading": "El proceso de galvanización",
  "step1_title": "Desengrase",
  "step1_desc": "Eliminación de aceites y contaminantes superficiales con solución alcalina.",
  "step2_title": "Decapado",
  "step2_desc": "Eliminación de óxidos con ácido clorhídrico (HCl) para activar la superficie del acero.",
  "step3_title": "Fluxado",
  "step3_desc": "Inmersión en solución de cloruro de amonio (NH4Cl) para promover la adhesión del zinc.",
  "step4_title": "Galvanizado",
  "step4_desc": "Inmersión en zinc fundido a 450 °C — Zinc SHG 99.99% de pureza.",
  "step5_title": "Enfriamiento",
  "step5_desc": "Enfriamiento controlado y acabado final; inspección visual y de espesor.",
  "kettles_heading": "Nuestras cubas de galvanización",
  "kettles_caption": "Seleccionamos la cuba apropiada según las dimensiones y tipo de su pieza.",
  "table_aria_label": "Especificaciones de las cubas de galvanización",
  "col_kettle": "Cuba",
  "col_dimensions": "Dimensiones (L × A × P)",
  "col_max_piece": "Pieza máxima",
  "col_status": "Estado",
  "centrifuge_name": "Centrífuga 65cm",
  "centrifuge_max": "Ferretería: clavos, tornillos, herrajes",
  "kettle_7m_name": "Cuba Pilling 7m",
  "kettle_7m_dims": "7.00 m × 0.80 m × 1.20 m",
  "kettle_7m_max": "~6.8m × 0.75m",
  "kettle_9m_name": "Cuba Pilling 9m",
  "kettle_9m_dims": "9.00 m × 0.90 m × 1.40 m",
  "kettle_9m_max": "~8.8m × 0.85m",
  "status_active": "Activa",
  "status_q2_2026": "Q2 2026",
  "status_2027": "2027",
  "kettle_9m_callout": "La única galvanizadora en Venezuela activa que puede procesar piezas de más de 7 metros de longitud.",
  "quality_heading": "Estándares de calidad",
  "quality_body": "Cada pedido sale con su certificado de calidad bajo COVENIN 1212-81, ASTM A123 y ASTM A153. Los certificados por lote son emitidos por la Ing. Miriam, con más de 36 años de experiencia en galvanización industrial.",
  "manufacturer_heading": "Equipos W. Pilling Riepe GmbH",
  "manufacturer_body": "Nuestras cubas son fabricadas por W. Pilling Riepe GmbH (Alemania), el fabricante de referencia mundial en equipos de galvanización en caliente. Tolerancias precisas, zinc uniforme, acabado consistente en cada lote.",
  "hse_heading": "Compromiso HSE",
  "hse_body": "PYGLARA opera con protocolos de seguridad industrial para el manejo de sustancias químicas (HCl, NH4Cl, zinc fundido). Nuestras instalaciones cuentan con ventilación mecánica en la sala de cubas, equipos de protección personal y planes de emergencia actualizados.",
  "photos_heading": "Instalaciones",
  "photo_alt_1": "Cuba de galvanización W. Pilling 7m — Planta PYGLARA, Barquisimeto",
  "photo_alt_2": "Cuba centrífuga 65cm en operación — galvanizando piezas de ferretería",
  "cta_mid_label": "Solicitar cotización",
  "cta_final_label": "Solicitar cotización",
  "cta_link_label": "Ver más →"
}
```

**EN:**
```json
"galv_page": {
  "hero_tag": "Industrial Galvanizing",
  "hero_heading": "Hot-Dip Galvanizing",
  "hero_sub": "Pilling kettles up to 9m. Largest capacity in western Venezuela. COVENIN 1212-81 and ASTM A123 certification on every delivery. 65cm centrifuge active · 7m kettle Q2 2026 · 9m kettle 2027.",
  "process_heading": "The galvanizing process",
  "step1_title": "Degreasing",
  "step1_desc": "Removal of oils and surface contaminants with alkaline solution.",
  "step2_title": "Acid Pickling",
  "step2_desc": "Removal of mill scale and rust with hydrochloric acid (HCl) to activate the steel surface.",
  "step3_title": "Fluxing",
  "step3_desc": "Immersion in ammonium chloride (NH4Cl) solution to promote zinc adhesion.",
  "step4_title": "Hot-Dip Galvanizing",
  "step4_desc": "Immersion in molten zinc at 450 °C — Zinc SHG 99.99% purity.",
  "step5_title": "Cooling",
  "step5_desc": "Controlled cooling and final finishing; visual and thickness inspection.",
  "kettles_heading": "Our galvanizing kettles",
  "kettles_caption": "We select the appropriate kettle based on your workpiece dimensions and type.",
  "table_aria_label": "Galvanizing kettle specifications",
  "col_kettle": "Kettle",
  "col_dimensions": "Dimensions (L × W × D)",
  "col_max_piece": "Max workpiece",
  "col_status": "Status",
  "centrifuge_name": "65cm centrifuge",
  "centrifuge_max": "Hardware: nails, bolts, fasteners",
  "kettle_7m_name": "7m Pilling kettle",
  "kettle_7m_dims": "7.00 m × 0.80 m × 1.20 m",
  "kettle_7m_max": "~6.8m × 0.75m",
  "kettle_9m_name": "9m Pilling kettle",
  "kettle_9m_dims": "9.00 m × 0.90 m × 1.40 m",
  "kettle_9m_max": "~8.8m × 0.85m",
  "status_active": "Active",
  "status_q2_2026": "Q2 2026",
  "status_2027": "2027",
  "kettle_9m_callout": "The only active galvanizer in Venezuela capable of processing workpieces longer than 7 meters.",
  "quality_heading": "Quality standards",
  "quality_body": "Every order ships with a quality certificate under COVENIN 1212-81, ASTM A123, and ASTM A153. Per-lot certificates are issued by Ing. Miriam, with over 36 years of experience in industrial galvanizing.",
  "manufacturer_heading": "W. Pilling Riepe GmbH equipment",
  "manufacturer_body": "Our kettles are manufactured by W. Pilling Riepe GmbH (Germany), the world reference manufacturer for hot-dip galvanizing equipment. Precise tolerances, uniform zinc coating, consistent finish on every batch.",
  "hse_heading": "HSE Commitment",
  "hse_body": "PYGLARA operates with industrial safety protocols for the handling of chemical substances (HCl, NH4Cl, molten zinc). Our facilities include mechanical ventilation in the kettle hall, personal protective equipment, and current emergency response plans.",
  "photos_heading": "Facilities",
  "photo_alt_1": "W. Pilling 7m galvanizing kettle — PYGLARA plant, Barquisimeto",
  "photo_alt_2": "65cm centrifuge in operation — galvanizing hardware parts",
  "cta_mid_label": "Request a quote",
  "cta_final_label": "Request a quote",
  "cta_link_label": "Learn more →"
}
```

### Routes and Navigation Updates

**Routes:**

| Language | File path | Built URL | `activePage` | `altSlug` |
|----------|-----------|-----------|-------------|-----------|
| ES | `src/pages/es/galvanizacion.astro` | `/es/galvanizacion/` | `"galvanizing"` | `"galvanizing"` |
| EN | `src/pages/en/galvanizing.astro` | `/en/galvanizing/` | `"galvanizing"` | `"galvanizacion"` |

**BottomTabBar.astro** — galvanizing tab:
```ts
href: lang === 'es' ? '/es/galvanizacion/' : '/en/galvanizing/',
```

**BaseLayout.astro** — desktop nav galvanizing link:
```html
<a
  href={lang === 'es' ? '/es/galvanizacion/' : '/en/galvanizing/'}
  data-page="galvanizing"
  aria-current={activePage === 'galvanizing' ? 'page' : undefined}
  class="text-white/80 hover:text-white transition-colors"
  style="min-height: 44px; display: inline-flex; align-items: center;"
>
  {t(lang, 'nav.galvanizing')}
</a>
```

**Homepage card update (es/index.astro)** — inside the galvanizing card `<div>`, after `<WhatsAppButton>`:
```html
<a
  href="/es/galvanizacion/"
  class="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mt-2"
  style="min-height: 44px;"
>
  {t(lang, 'galv_page.cta_link_label')}
</a>
```
Same pattern in `en/index.astro` with `href="/en/galvanizing/"`.

### Available Image Assets (src/assets/images/)

| File | Use on this page |
|------|-----------------|
| `pilling1.jpeg` | Hero overlay + facility section |
| `esfumer.jpeg` | Facility photo |
| `65.jpeg` | Optional third facility photo |
| `logo-eloy.jpeg` | **DO NOT USE on this page** |

Import pattern:
```ts
import imgPilling1 from '../../assets/images/pilling1.jpeg';
import imgEsfumer from '../../assets/images/esfumer.jpeg';
```

### Page SEO Strings

| | ES | EN |
|-|----|----|
| `<title>` | `PYGLARA — Galvanización en Caliente \| Barquisimeto, Venezuela` | `PYGLARA — Hot-Dip Galvanizing Services \| Barquisimeto, Venezuela` |
| `description` | `Galvanización en caliente con cubas hasta 9m. Zinc SHG 99.99%. Certificación COVENIN 1212-81 y ASTM A123 en cada entrega. La mayor capacidad del occidente venezolano.` | `Hot-dip galvanizing with kettles up to 9m. Zinc SHG 99.99% purity. COVENIN 1212-81 and ASTM A123 certification on every delivery. Largest capacity in western Venezuela.` |
| OG title (EN) | — | `PYGLARA — Hot-Dip Galvanizing Services` |
| OG description (EN) | — | `Galvanizing kettles up to 9m long. No other active Venezuelan galvanizer can process workpieces above 7m. Per-lot certification on every delivery.` |
| OG url (EN) | — | `https://pyglara.com/en/galvanizing/` |
| OG image | — | `https://pyglara.com/images/og-homepage.jpg` |

### Design Token Reference (from `src/styles/global.css`)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--color-navy` | #1B3A5C | `bg-navy`, `text-navy` | Hero bg, section headings, 9m callout bg |
| `--color-copper` | #B87333 | `text-copper`, `bg-copper` | Accent: step numbers, active badge, callout accent |
| `--color-green` | #2D8B4E | `text-green` | "Active" status badge only |
| `--color-whatsapp` | #25D366 | `bg-whatsapp` | WhatsApp CTA buttons ONLY |
| `--color-text` | #1A1A1A | `text-text` | Body text on white sections |
| `--color-bg` | #FFFFFF | `bg-bg` | White section backgrounds |
| `--color-bg-alt` | #F5F5F5 | `bg-bg-alt` | Alternating light sections |

### Previous Story Intelligence (Story 7-1)

1. `const lang = 'es' as const;` — never `Astro.currentLocale`.
2. `buildWhatsAppUrl(lang, 'galvanizing')` generates `wa.me/584245715349?text=...` — pass as `href` prop, never construct manually.
3. `activePage="galvanizing"` drives BottomTabBar — must be set correctly.
4. Hero `min-height` — use `60svh` or `70svh` for inner pages (not `100svh` which is homepage-only).
5. `<Image>` needs explicit `width` and `height` — `width={1440} height={810}` for hero overlay, `width={480} height={320}` for facility grid.
6. `.fade-up` scroll-reveal: already wired in BaseLayout, just apply the class.
7. OG tags for EN via `<slot name="head">` — follow `en/index.astro` pattern exactly.
8. Desktop nav `<a>` needs `style="min-height: 44px; display: inline-flex; align-items: center;"`.

### Open Questions

- [ ] **Turnaround time (Sir decision before launch):** The page does not specify how many days galvanizing takes. Ing. Miriam has this information but it was not captured in the formulario. Do not invent a number. Either leave this off the page or add it once confirmed. Flag for Sir to resolve before go-live.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 7.2 spec]
- [Source: `_bmad-output/implementation-artifacts/7-1-homepage.md` — Architecture rules, component patterns]
- [Source: `pyglara-site/src/layouts/BaseLayout.astro` — altSlug prop addition, nav TODO 7-2 links]
- [Source: `pyglara-site/src/components/BottomTabBar.astro` — galvanizing tab href]
- [Source: `pyglara-site/src/content/ui.json` — extend with galv_page namespace]
- [Source: `pyglara-site/src/utils/i18n.ts` — `t()` and `buildWhatsAppUrl()` helpers]
- [Source: `pyglara-site/src/styles/global.css` — design tokens, `.fade-up`]
- [Source: `pyglara-site/src/pages/es/index.astro` — galvanizing card TODO 7-2 to resolve]
- [Source: `pyglara-site/astro.config.mjs` — i18n routing, prefixDefaultLocale: true]
- [Source: `CLAUDE.md` — kettle data, quality standards, contact info]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — build passed clean on first attempt.

### Completion Notes List

- Task 1: Added `altSlug?: string` to BaseLayout Props interface, destructuring, and `altPathname` logic. All existing pages unaffected (prop is optional with fallback).
- Task 2: Extended `ui.json` with full `galv_page` namespace — 35 keys verbatim in both `es` and `en` objects with full key parity.
- Task 3: Created `src/pages/es/galvanizacion.astro` — section order: Hero → Kettle table → 9m callout → Mid CTA → Process steps → Quality → Manufacturer → HSE → Photos → Final CTA. All body text via `t(lang, 'galv_page.*')`. `pilling1.jpeg` hero (eager, fetchpriority=high), `esfumer.jpeg` facility. 3 status badges (green/Active, orange/Q2 2026, navy/2027).
- Task 4: Created `src/pages/en/galvanizing.astro` — mirror of ES page with `lang="en"` and `altSlug="galvanizacion"`. OG meta injected via `<slot name="head">`.
- Task 5: Wired galvanizing tab in BottomTabBar.astro — locale-aware href, removed TODO comment. Other tabs unchanged.
- Task 6: Wired galvanizing nav link in BaseLayout.astro — locale-aware href, `aria-current` on active page, removed TODO comment. Other nav links unchanged.
- Task 7: Added `<a href="/es/galvanizacion/">` text link inside galvanizing card in both ES and EN homepages — uses `t(lang, 'galv_page.cta_link_label')`. Card `<div>` NOT wrapped in `<a>` (WhatsApp button is already an `<a>`).
- Task 8: All smoke tests passed — build 0 errors/0 warnings, both pages in dist, 3.5m absent, UL467 absent, hreflang correct in both directions, x-default unchanged, turnaround absent (AC: 25 satisfied), page weight 28KB HTML each (~77KB total with images).
- AC 24 note: `grep` catches `title` and `description` props (lines 14-15) which are SEO metadata strings explicitly specified as hardcoded in Dev Notes. **Code review (2026-04-27) identified additional hardcoded body strings not caught by the narrow grep pattern — 8 strings across both pages and 8 missing ui.json keys. All fixed: `callout_label`, `cta_mid_text`, `quality_std_1/2/3`, `cta_final_heading`, `cta_final_body`, `centrifuge_dims` added to both `es` and `en` galv_page blocks; all page markup updated to use `t()` calls. Hero image alt texts now use `t(lang, 'galv_page.photo_alt_1')`. galv_page key count: 43 per language.**
- Review fix (2026-04-27): `WhatsAppButton.astro` `ariaLabel` float fallback changed from hardcoded `"Contactar por WhatsApp"` (ES-only) to locale-neutral `"WhatsApp"`.
- Review fix (2026-04-27): `WhatsAppButton.astro` and `global.css` added to File List — both were modified during dev but omitted from the original record.

### File List

- `pyglara-site/src/layouts/BaseLayout.astro` — MODIFIED: added `altSlug` prop, updated `altPathname` computation, wired galvanizing nav href + aria-current
- `pyglara-site/src/content/ui.json` — MODIFIED: added `galv_page` namespace to both `es` and `en` objects (43 keys each after review fixes)
- `pyglara-site/src/pages/es/galvanizacion.astro` — CREATED
- `pyglara-site/src/pages/en/galvanizing.astro` — CREATED
- `pyglara-site/src/components/BottomTabBar.astro` — MODIFIED: wired galvanizing tab href, removed TODO comment
- `pyglara-site/src/components/WhatsAppButton.astro` — MODIFIED: added `ariaLabel?: string` prop to float variant; corrected hardcoded ES fallback to locale-neutral "WhatsApp"
- `pyglara-site/src/styles/global.css` — MODIFIED: added `@media (prefers-reduced-motion: reduce)` block for hero animations, fade-up, and wa-pulse
- `pyglara-site/src/pages/es/index.astro` — MODIFIED: added galvanizing card text link, removed TODO comment
- `pyglara-site/src/pages/en/index.astro` — MODIFIED: added galvanizing card text link, removed TODO comment
