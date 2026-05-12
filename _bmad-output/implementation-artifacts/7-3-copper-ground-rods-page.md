# Story 7.3: Copper Ground Rods Page (Spanish + English)

Status: done

## Story

As a potential buyer of copper-clad ground rods,
I want product specifications, available sizes, applications, and proof of zero domestic competition,
so that I can confirm PYGLARA's rods meet my technical needs and initiate a quote request.

## Acceptance Criteria

1. Pages exist at `/es/varillas-de-cobre/` (`src/pages/es/varillas-de-cobre.astro`) and `/en/copper-ground-rods/` (`src/pages/en/copper-ground-rods.astro`) — both build and deploy without errors.
2. Product specifications table displays: all diameters (5/8", 3/4", 1"), all lengths (1.2m, 1.8m, 2.4m, 3.0m), copper coating thickness (300 μm ± 50), and steel core specification (AISI/SAE C1045, cold-drawn).
3. UL 467 compliance reference appears on the page.
4. Production capacity (936 units/day, continuous 24hr cycle) is stated on the page.
5. "Zero domestic competitors" differentiator is clearly stated.
6. Historical reference to 20,000 units sold to ENELVEN/CORPOELEC (2004–2005) is included as a trust signal.
7. Applications listed: electrical grounding, telecommunications, lightning protection.
8. WhatsApp CTA uses context `'copper_rods'` pre-fill — `buildWhatsAppUrl(lang, 'copper_rods')` — not the general pre-fill.
9. At least 2 real plant photos on the page (available: `plant-clean.jpeg`, `nails.jpeg`, `nails2.jpeg`).
10. No per-unit pricing anywhere on the page (Ley de Precios Justos + zero-price culture).
11. BottomTabBar copper_rods tab links to the correct route (`/es/varillas-de-cobre/` or `/en/copper-ground-rods/`) — no longer `href="#"`. Tab renders as active (`activePage="copper_rods"`) when on this page.
12. Desktop nav link for copper_rods in `BaseLayout.astro` links to the correct locale-aware route — no longer `href="#"`.
13. Homepage copper card (`es/index.astro` and `en/index.astro`) wraps in an `<a>` tag pointing to the copper rods page — replacing the `<!-- TODO Story 7-3 -->` comment.
14. Both ES and EN pages pass `astro build` with 0 errors and 0 warnings.
15. `activePage="copper_rods"` passed to `BaseLayout` on both page files.
16. All new ui.json strings present in both `es` and `en` objects with full key parity — no missing keys.
17. Page weight under 500KB (HTML + CSS + images combined).
18. All interactive elements have minimum 44px touch targets.
19. A 3-stat strip (936 units/day · 0 domestic competitors · 20,000 delivered to ENELVEN) appears within the first 3 visible sections (above the fold on desktop or within 1 scroll on mobile).
20. A procurement legitimacy note (`procurement_note`) appears both near the ENELVEN reference (Section 4) and within 2 sections of the final WhatsApp CTA.
21. The ENELVEN / CORPOELEC Zulia historical reference appears no later than section 4 of the page.
22. A per-lot quality certificate note (`cert_note`) for ground rods is stated explicitly on the page.
23. The spec table uses a diameter × length matrix format (rows = diameters, columns = lengths, cells = availability indicator) rather than two separate spec rows.

## Tasks / Subtasks

- [x] Task 1: Add copper rods page strings to `src/content/ui.json` (AC: 2, 3, 4, 5, 6, 7, 16, 19, 20, 22, 23)
  - [x] Add `copper_page` namespace under both `es` and `en` objects
  - [x] Strings: `buyers_intro`, `hero_tag`, `hero_heading`, `hero_sub`, `product_heading`, `product_intro`
  - [x] Stat strip: `stat_1_value`, `stat_1_label`, `stat_2_value`, `stat_2_label`, `stat_3_value`, `stat_3_label`
  - [x] Spec matrix column headers: `matrix_col_dia`, `matrix_col_12`, `matrix_col_18`, `matrix_col_24`, `matrix_col_30`, `matrix_avail` — replaces separate `spec_diameters`/`spec_lengths` rows
  - [x] Remaining spec rows (non-matrix): `spec_coating`, `spec_coating_val`, `spec_core`, `spec_core_val`, `spec_standards`, `spec_standards_val`, `spec_capacity`, `spec_capacity_val`
  - [x] Column headers for non-matrix spec rows: `col_spec`, `col_value`
  - [x] History + differentiator: `history_heading`, `history_body` (ENELVEN reference framed as public-sector qualification), `diff_heading`, `diff_body` (zero domestic competitors + no import dependency angle)
  - [x] Quality + process: `cert_note`, `process_heading`, `process_body` (2 sentences max)
  - [x] Applications: `apps_heading`, `app_1`, `app_2`, `app_3` (single lines only, no sub-descriptions)
  - [x] Procurement note: `procurement_note` (rendered in Section 4 and Section 8)
  - [x] Photos: `photos_heading`, `photo_alt_1`, `photo_alt_2`, `photo_alt_3`
  - [x] CTA: `cta_label`
  - [x] SEO: page title + description for both languages
  - [x] Every key in `es` must be mirrored exactly in `en` — bilingual commit rule

- [x] Task 2: Create `src/pages/es/varillas-de-cobre.astro` (AC: 1–10, 15, 17, 18, 19, 20, 21, 22, 23)
  - [x] Frontmatter: import `BaseLayout`, `Image`, `t`, `buildWhatsAppUrl`, `WhatsAppButton`, image assets; define `skuMatrix` static array (`diameters: ['5/8"','3/4"','1"']`, `lengths: ['1.2 m','1.8 m','2.4 m','3.0 m']`)
  - [x] `const lang = 'es' as const;`
  - [x] `BaseLayout` props: `title`, `description`, `lang={lang}`, `activePage="copper_rods"`
  - [x] Section 1 — Hero: `buyers_intro` (small qualifying line, `text-white/40`) + `hero_tag` tag + `<h1>` (`hero_heading`) + `hero_sub` + WhatsApp CTA inline — `plant-clean.jpeg` overlay at 0.22 opacity, `bg-navy`, `min-height: 60svh`
  - [x] Section 2 — Stat strip: `bg-copper`, 3 stat blocks (`stat_1/2/3_value` + `stat_1/2/3_label`) — **`bg-copper` used here only; no other section uses it** — satisfies AC 19
  - [x] Section 3 — Spec matrix + remaining specs: `product_heading` + `product_intro` + diameter × length availability matrix (rows = diameters `['5/8"','3/4"','1"']`, columns = lengths `['1.2m','1.8m','2.4m','3.0m']`, all cells = `t(lang,'copper_page.matrix_avail')`) + remaining spec rows (coating, core, standard, capacity) in a 2-col table below the matrix — satisfies AC 23
  - [x] Section 4 — History + qualification + procurement note: `history_heading` + `history_body` (ENELVEN 20,000 as public-sector qualification), then `diff_heading` + `diff_body`; render `procurement_note` as a small muted line at the bottom of this section; render `footer.phone` as a secondary contact link — satisfies AC 20 (first render), AC 21
  - [x] Section 5 — Applications: `apps_heading` + `app_1`, `app_2`, `app_3` as bullet points — **no sub-descriptions, single lines only**
  - [x] Section 6 — Quality + process: `cert_note` (per-lot certificate statement) + `process_heading` + `process_body` (2 sentences only) — satisfies AC 22
  - [x] Section 7 — Facility photos: `nails.jpeg` + `nails2.jpeg` (actual product photos preferred over plant-exterior) — `loading="lazy"`, `quality={70}`
  - [x] Section 8 — Procurement note + final CTA: `procurement_note` rendered again (second render of same key, satisfies AC 20 near-CTA placement) + `WhatsAppButton` (`copper_rods` context)
  - [x] Use `.fade-up` class on sections; `bg-navy` for sections 1, 4; `bg-bg` / `bg-bg-alt` alternating for 3, 5, 6, 7; `bg-copper` for section 2 only
  - [x] All text from `t(lang, 'copper_page.*')` — zero hardcoded strings in markup (matrix cell values, diameter/length labels may be hardcoded as universal technical notation)
  - [x] No pricing, no per-unit cost, no ROI language

- [x] Task 3: Create `src/pages/en/copper-ground-rods.astro` (AC: 1, 14, 15)
  - [x] Mirror of `/es/varillas-de-cobre.astro` with `lang="en"`
  - [x] Inject Open Graph tags via `<slot name="head">`: `og:title`, `og:description`, `og:image` (`https://pyglara.com/images/og-homepage.jpg`), `og:url` (`https://pyglara.com/en/copper-ground-rods/`), `og:type` (`website`), `og:locale` (`en_US`)
  - [x] English content via `t('en', 'copper_page.*')`

- [x] Task 4: Update `BottomTabBar.astro` — wire copper_rods route (AC: 11)
  - [x] Change copper_rods tab `href` from `'#'` to `lang === 'es' ? '/es/varillas-de-cobre/' : '/en/copper-ground-rods/'`
  - [x] Remove `// TODO Story 7-3: replace href with real route` comment
  - [x] Keep quality and contact tabs as `href: '#'` with their TODO comments

- [x] Task 5: Update `BaseLayout.astro` — wire copper_rods nav link (AC: 12)
  - [x] Change desktop nav copper_rods link from `href="#"` to `lang === 'es' ? '/es/varillas-de-cobre/' : '/en/copper-ground-rods/'`
  - [x] Remove `<!-- TODO Story 7-3: replace href with real route -->` comment
  - [x] Add `aria-current="page"` when `activePage === 'copper_rods'`
  - [x] Keep quality, contact nav links as `href="#"` with their TODO comments

- [x] Task 6: Update homepage copper card link (AC: 13)
  - [x] In `src/pages/es/index.astro`: wrap copper card `<div>` in `<a href="/es/varillas-de-cobre/" class="block">` — remove `<!-- TODO Story 7-3: add href to service page -->` comment
  - [x] In `src/pages/en/index.astro`: wrap copper card `<div>` in `<a href="/en/copper-ground-rods/" class="block">`
  - [x] Note: if Story 7-2 already wrapped the galvanizing card in `<a>`, that `</a>` must be present — do not accidentally break it

- [x] Task 7: Smoke test (AC: 14, 17)
  - [x] `npm run build` — 0 errors, 0 warnings, all pages built
  - [x] Verify `/es/varillas-de-cobre/` and `/en/copper-ground-rods/` appear in build output
  - [x] Verify page weight under 500KB
  - [x] Verify no pricing data in built HTML

## Dev Notes

### Project Structure — Files to Touch

```text
pyglara-site/
  src/
    content/
      ui.json                              ← EXTEND: add copper_page namespace (both es and en)
    pages/
      es/
        varillas-de-cobre.astro            ← CREATE
        index.astro                        ← MODIFY: wire copper card link
      en/
        copper-ground-rods.astro           ← CREATE
        index.astro                        ← MODIFY: wire copper card link
    components/
      BottomTabBar.astro                   ← MODIFY: wire copper_rods href
    layouts/
      BaseLayout.astro                     ← MODIFY: wire copper_rods nav href + active state
```

### Architecture Rules — DO NOT VIOLATE

Identical to Stories 7-1 and 7-2. Key reminders:

1. **ADR-007:** `buildWhatsAppUrl(lang, 'copper_rods')` is called in the page file and the result passed as `href` prop to `WhatsAppButton`. The component never calls `t()` internally.
2. **ADR-005:** 100% static. No SSR, no API routes, no `getStaticPaths()` needed (single static page per locale).
3. **ADR-006:** All page strings in `ui.json` under `copper_page` namespace. The existing `src/content/es/copper-rods.md` and `src/content/en/copper-rods.md` are empty stubs — **do not use them**.
4. **Tailwind v4:** Tokens in `@theme {}` in `global.css`. No `tailwind.config.mjs`.
5. **System fonts only.** No Google Fonts.
6. **`<Image>` for all photos.** Import from `astro:assets`. `loading="lazy"`, `quality={70}`.
7. **No `client:*` directives.** 100% SSG.
8. **No pricing.** Zero financial data — not per-unit, not per-rod, not per batch.
9. **Bilingual commit rule.** ES and EN in same commit.
10. **Do not modify `vercel.json`.**
11. **Do not modify `astro.config.mjs`.**
12. **No new packages.**
13. **`.fade-up` class** on scroll-reveal sections — BaseLayout IntersectionObserver handles it automatically.

### Product Specifications — Confirmed from CLAUDE.md (MUST match exactly)

| Specification | Value |
|---------------|-------|
| Product type | Copper electroplated ground rods (Copperweld-type) |
| Diameters | 5/8", 3/4", 1" |
| Lengths | 1.2 m, 1.8 m, 2.4 m, 3.0 m |
| Copper coating thickness | 300 μm ± 50 |
| Steel core | AISI/SAE C1045, cold-drawn |
| Standards reference | UL 467 |
| Production capacity | 936 units/day (continuous 24 hr cycle) |
| Domestic competitors | **Zero** |

**Critical fact:** There are ZERO domestic competitors for copper-clad ground rods in Venezuela. This is the single strongest differentiator on this page — state it prominently, not buried.

**Historical proof point:** ENELVEN (now CORPOELEC Zulia) purchased 20,000 copper ground rods from PYGLARA in 2004–2005 (~$168K contract). Use this as a trust signal. Do NOT include the dollar amount on the website — show the volume (20,000 units) and the client name (ENELVEN / CORPOELEC Zulia) as proof of industrial-scale delivery.

### Applications (confirmed from CLAUDE.md and epics.md)

1. **Electrical grounding** — Puesta a tierra de instalaciones eléctricas / Electrical grounding for power installations
2. **Telecommunications** — Sistemas de tierra para torres y antenas / Grounding systems for communication towers and antennas
3. **Lightning protection** — Sistemas de protección contra rayos / Lightning protection systems

### Electroplating Process (brief — enough for the page, not a full deep-dive)

The copper electroplating line runs on a continuous 24-hour cycle. Steel rods (AISI C1045 core) are coated in a copper bath using electrodeposition. The 300 μm copper layer bonds metallurgically to the steel core, providing conductivity and corrosion resistance for underground and outdoor grounding applications. Six three-phase rectifiers and 10 process tanks.

**ES version for page:** "Las varillas de tierra se producen mediante electrodeposición de cobre sobre núcleo de acero AISI C1045 en un proceso continuo de 24 horas. La capa de 300 μm de cobre proporciona conductividad eléctrica óptima y resistencia a la corrosión para instalaciones subterráneas y exteriores."

**EN version:** "Ground rods are produced through copper electrodeposition onto an AISI C1045 steel core in a continuous 24-hour process. The 300 μm copper layer provides optimal electrical conductivity and corrosion resistance for underground and outdoor grounding installations."

### Routes to Create

| Language | File path | Built URL | `activePage` value |
|----------|-----------|-----------|-------------------|
| ES | `src/pages/es/varillas-de-cobre.astro` | `/es/varillas-de-cobre/` | `"copper_rods"` |
| EN | `src/pages/en/copper-ground-rods.astro` | `/en/copper-ground-rods/` | `"copper_rods"` |

### Navigation Updates (exact changes)

**BottomTabBar.astro** — copper_rods tab (approx line 23):
```ts
// BEFORE:
href: '#', // TODO Story 7-3: replace href with real route

// AFTER:
href: lang === 'es' ? '/es/varillas-de-cobre/' : '/en/copper-ground-rods/',
```

**BaseLayout.astro** — desktop nav copper_rods link (approx line 109–115):
```html
<!-- BEFORE -->
<a href="#" data-page="copper_rods" ...>
  <!-- TODO Story 7-3: replace href with real route -->

<!-- AFTER -->
<a href={lang === 'es' ? '/es/varillas-de-cobre/' : '/en/copper-ground-rods/'}
   data-page="copper_rods"
   aria-current={activePage === 'copper_rods' ? 'page' : undefined} ...>
```

**es/index.astro** — copper card (approx line 237):
```html
<!-- BEFORE -->
<div class="relative bg-copper text-white rounded overflow-hidden fade-up">
  <!-- TODO Story 7-3: add href to service page -->

<!-- AFTER -->
<a href="/es/varillas-de-cobre/" class="block relative bg-copper text-white rounded overflow-hidden fade-up">
```
Close with `</a>` instead of `</div>`.

**en/index.astro** — same, with `/en/copper-ground-rods/`.

### Page SEO Strings

| | ES | EN |
|-|----|----|
| `<title>` | `PYGLARA — Varillas de Tierra Cobre-Enchapado \| Barquisimeto, Venezuela` | `PYGLARA — Copper-Clad Ground Rods \| Barquisimeto, Venezuela` |
| `description` | `Varillas de tierra cobre-enchapado. Recubrimiento 300 μm ± 50. Diámetros 5/8" a 1", longitudes 1.2m a 3m. Sin competidor doméstico en Venezuela. 936 unidades/día.` | `Copper-clad ground rods. 300 μm ± 50 copper coating. Diameters 5/8" to 1", lengths 1.2m to 3m. Zero domestic competition in Venezuela. 936 units/day production capacity.` |
| OG title (EN only) | — | `PYGLARA — Copper-Clad Ground Rods` |
| OG description (EN only) | — | `Zero domestic competitors in Venezuela for copper-clad ground rods. 300 μm copper coating, AISI C1045 steel core, UL 467 reference. 936 units/day. Serving electrical and telecom sectors since 2004.` |

### Available Image Assets (src/assets/images/)

| File | Suggested use |
|------|---------------|
| `plant-clean.jpeg` | Page hero overlay (copper line / plant interior) |
| `nails.jpeg` | Process / product photo |
| `nails2.jpeg` | Finished product photo |
| `brackets.jpeg` | Finished galvanized hardware (contextual) |
| `65.jpeg` | Centrifuge / production line (contextual) |

Import pattern (same as all other pages):
```ts
import imgPlantClean from '../../assets/images/plant-clean.jpeg';
import imgNails from '../../assets/images/nails.jpeg';
import imgNails2 from '../../assets/images/nails2.jpeg';
```

### Design Token Reference (from `src/styles/global.css`)

| Token | Hex | Tailwind Class | Usage on this page |
|-------|-----|----------------|--------------------|
| `--color-navy` | #1B3A5C | `bg-navy`, `text-navy` | Differentiator callout bg, section headings |
| `--color-copper` | #B87333 | `bg-copper`, `text-copper` | Hero bg accent, spec table labels |
| `--color-whatsapp` | #25D366 | `bg-whatsapp` | WhatsApp CTA buttons ONLY |
| `--color-text` | #1A1A1A | `text-text` | Body text on white sections |
| `--color-bg` | #FFFFFF | `bg-bg` | White section backgrounds |
| `--color-bg-alt` | #F5F5F5 | `bg-bg-alt` | Alternating light sections |

### ui.json Extension — Full Content

Add `copper_page` key under both `es` and `en`. Full bilingual content to use verbatim:

**ES values:**
```json
"copper_page": {
  "buyers_intro": "Para contratistas eléctricos, empresas EPC y distribuidores de materiales",
  "hero_tag": "Varillas de Tierra",
  "hero_heading": "Varillas de Tierra Cobre-Enchapado",
  "hero_sub": "Producción propia en Venezuela. 936 unidades/día. Sin competidor doméstico. Recubrimiento 300 μm conforme a UL 467.",
  "stat_1_value": "936",
  "stat_1_label": "unidades/día",
  "stat_2_value": "0",
  "stat_2_label": "competidores domésticos",
  "stat_3_value": "20.000",
  "stat_3_label": "unidades despachadas a ENELVEN",
  "product_heading": "Especificaciones técnicas",
  "product_intro": "Producidas mediante electrodeposición de cobre sobre núcleo de acero AISI/SAE C1045 en proceso continuo de 24 horas.",
  "matrix_col_dia": "Diámetro",
  "matrix_col_12": "1.2 m",
  "matrix_col_18": "1.8 m",
  "matrix_col_24": "2.4 m",
  "matrix_col_30": "3.0 m",
  "matrix_avail": "✓",
  "col_spec": "Especificación",
  "col_value": "Valor",
  "spec_coating": "Recubrimiento de cobre",
  "spec_coating_val": "300 μm ± 50",
  "spec_core": "Núcleo de acero",
  "spec_core_val": "AISI/SAE C1045, estirado en frío",
  "spec_standards": "Norma de referencia",
  "spec_standards_val": "UL 467",
  "spec_capacity": "Capacidad de producción",
  "spec_capacity_val": "936 unidades/día (ciclo continuo 24 h)",
  "history_heading": "Proveedor con historial en sector público",
  "history_body": "ENELVEN (hoy CORPOELEC Zulia) adquirió 20.000 varillas de tierra a PYGLARA entre 2004 y 2005 para sus proyectos de infraestructura eléctrica. Entrega a escala industrial comprobada, con registro contable declarado ante SENIAT.",
  "diff_heading": "Sin competidor doméstico en Venezuela",
  "diff_body": "PYGLARA es el único productor activo de varillas de tierra cobre-enchapado con fabricación propia en Venezuela. No depende de importaciones. No existe un competidor nacional que ofrezca este producto con producción local.",
  "apps_heading": "Aplicaciones",
  "app_1": "Puesta a tierra de instalaciones eléctricas",
  "app_2": "Sistemas de tierra para torres de telecomunicaciones y antenas",
  "app_3": "Sistemas de protección contra rayos",
  "cert_note": "Cada pedido incluye certificado de calidad por lote bajo ASTM A153 y UL 467.",
  "process_heading": "Proceso de producción",
  "process_body": "Electrodeposición de cobre sobre núcleo AISI C1045 en ciclo continuo de 24 horas. Seis rectificadores trifásicos, diez tanques de proceso, recubrimiento de 300 μm verificado por lote.",
  "photos_heading": "Instalaciones",
  "photo_alt_1": "Línea de electrodeposición de cobre — Planta PYGLARA, Barquisimeto",
  "photo_alt_2": "Varillas de tierra terminadas — proceso de centrifugado",
  "photo_alt_3": "Sala de producción — Planta PYGLARA, Zona Industrial I",
  "procurement_note": "Datos de producción declarados ante SENIAT. Compra ENELVEN registrada en historial de clientes.",
  "cta_label": "Solicitar cotización"
}
```

**EN values:**
```json
"copper_page": {
  "buyers_intro": "For electrical contractors, EPC companies, and materials distributors",
  "hero_tag": "Copper Ground Rods",
  "hero_heading": "Copper-Clad Ground Rods",
  "hero_sub": "In-house production in Venezuela. 936 units/day. Zero domestic competition. 300 μm copper coating per UL 467.",
  "stat_1_value": "936",
  "stat_1_label": "units/day",
  "stat_2_value": "0",
  "stat_2_label": "domestic competitors",
  "stat_3_value": "20,000",
  "stat_3_label": "units delivered to ENELVEN",
  "product_heading": "Technical specifications",
  "product_intro": "Produced by copper electrodeposition onto an AISI/SAE C1045 steel core in a continuous 24-hour process.",
  "matrix_col_dia": "Diameter",
  "matrix_col_12": "1.2 m",
  "matrix_col_18": "1.8 m",
  "matrix_col_24": "2.4 m",
  "matrix_col_30": "3.0 m",
  "matrix_avail": "✓",
  "col_spec": "Specification",
  "col_value": "Value",
  "spec_coating": "Copper coating",
  "spec_coating_val": "300 μm ± 50",
  "spec_core": "Steel core",
  "spec_core_val": "AISI/SAE C1045, cold-drawn",
  "spec_standards": "Reference standard",
  "spec_standards_val": "UL 467",
  "spec_capacity": "Production capacity",
  "spec_capacity_val": "936 units/day (continuous 24 hr cycle)",
  "history_heading": "Proven public-sector delivery record",
  "history_body": "ENELVEN (now CORPOELEC Zulia) purchased 20,000 ground rods from PYGLARA between 2004 and 2005 for its electrical infrastructure projects. Industrial-scale delivery capacity, with accounting records declared to SENIAT.",
  "diff_heading": "Zero domestic competitors in Venezuela",
  "diff_body": "PYGLARA is the only active producer of copper-clad ground rods with in-house manufacturing in Venezuela. No import dependency. No domestic competitor offers this product with local production.",
  "apps_heading": "Applications",
  "app_1": "Electrical grounding for power installations",
  "app_2": "Grounding systems for telecommunications towers and antennas",
  "app_3": "Lightning protection systems",
  "cert_note": "Every order includes a per-lot quality certificate under ASTM A153 and UL 467.",
  "process_heading": "Production process",
  "process_body": "Copper electrodeposition onto an AISI C1045 core in a continuous 24-hour cycle. Six three-phase rectifiers, ten process tanks, 300 μm coating verified per lot.",
  "photos_heading": "Facilities",
  "photo_alt_1": "Copper electroplating line — PYGLARA plant, Barquisimeto",
  "photo_alt_2": "Finished ground rods — centrifuge process line",
  "photo_alt_3": "Production hall — PYGLARA plant, Zona Industrial I",
  "procurement_note": "Production data declared to SENIAT. ENELVEN purchase on record in client history.",
  "cta_label": "Request a quote"
}
```

### Previous Story Intelligence

**From Story 7-1 (Homepage) and Story 7-2 (Galvanizing):**

1. `const lang = 'es' as const;` in frontmatter — never `Astro.currentLocale`. ✓
2. `buildWhatsAppUrl(lang, 'copper_rods')` → passes result as `href` prop to `WhatsAppButton`. The `'copper_rods'` key is confirmed in both `es.whatsapp` and `en.whatsapp` in `ui.json`. ✓
3. `activePage="copper_rods"` must be passed to `BaseLayout` — drives BottomTabBar active state. ✓
4. Hero on inner pages does NOT need `min-height: 100svh` — use `min-height: 60svh` or `min-height: 50svh` to keep it proportional to a content page.
5. Hero does NOT use `rust-vs-metal.png` background-clip text effect — that is homepage-only. Plain `text-white` headline.
6. `<Image>` requires explicit `width` and `height` props. `loading="lazy"`, `quality={70}` for all images below the fold.
7. `.fade-up` on sections — no additional JS needed.
8. `ogImage` prop on `BaseLayout` is optional; for EN pages inject OG tags via `<slot name="head">` following the `en/index.astro` pattern exactly.
9. Desktop nav `<a>` tags: `style="min-height: 44px; display: inline-flex; align-items: center;"` for touch target compliance.
10. When wrapping the homepage copper card `<div>` in `<a>`: check whether Story 7-2 has already been implemented. If 7-2 was implemented, the galvanizing card is already wrapped in `<a>` — do not break that. Only wrap the copper card `<div class="relative bg-copper ...">`.
11. `vercel.json` — DO NOT TOUCH.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 7.3 spec]
- [Source: `_bmad-output/implementation-artifacts/7-1-homepage.md` — Architecture Rules, component patterns]
- [Source: `_bmad-output/implementation-artifacts/7-2-galvanizing-services-page.md` — Navigation update pattern, route pattern]
- [Source: `pyglara-site/src/layouts/BaseLayout.astro` — nav TODO Story 7-3 links to update]
- [Source: `pyglara-site/src/components/BottomTabBar.astro` — copper_rods tab href to update]
- [Source: `pyglara-site/src/content/ui.json` — extend with `copper_page` namespace]
- [Source: `pyglara-site/src/utils/i18n.ts` — `t()` and `buildWhatsAppUrl()` helpers]
- [Source: `pyglara-site/src/styles/global.css` — design tokens, `.fade-up`]
- [Source: `pyglara-site/src/pages/es/index.astro` — copper card TODO 7-3 to resolve]
- [Source: `CLAUDE.md` — copper rod specs, ENELVEN history, production capacity, standards]

## Elicitation Intelligence (2026-05-07)

Five advanced elicitation methods applied before development started. Key findings that shaped this story:

### Pre-Mortem

Failure mode: page treats buyers as uninformed — explains what a ground rod is and what copper does. Real buyer (procurement engineer at CORPOELEC or an EPC firm) arrives already knowing. They need to confirm spec compliance and whether PYGLARA can deliver at volume. Kill the education; lead with proof.

Second failure mode: ENELVEN reference buried in section 6 or later. Every procurement specialist who sees that reference will recognize it. It belongs in the first 3 sections.

### User Persona Focus Group

Three buyer types surface:

1. **Procurement specialist at a state utility (CORPOELEC)** — needs UL 467 reference, SENIAT-declared production data, prior state contract on record. Moves slowly; skeptical of new suppliers.
2. **EPC project manager (private sector)** — needs delivery volume confirmation (936/day) and lead time. Will compare against import price.
3. **Materials distributor** — needs diameters, lengths, reorder MOQ. Spec matrix is the decision tool.

Implication: qualifying opener (`buyers_intro`) names all three. Spec table is non-negotiable above the fold.

### Shark Tank

Investor-mode objection: "You say zero domestic competition — how do I know that's still true?" Answer on the page: ENELVEN bought 20,000 in 2004–2005 when the market was active. We're the same plant with the same line. The competition never materialized because the electroplating investment barrier is high.

Investor-mode objection 2: "Production declared to SENIAT?" Procurement note (`procurement_note`) answers this directly near the CTA.

### SCAMPER

**Substitute:** Replace the process description section with a spec-matrix-first layout. Buyers scan the table; they don't read body paragraphs on a first visit.

**Eliminate:** Remove the problem/solution education section entirely. This page has no equivalent to the galvanizing "problem_heading/problem_body" — copper rod buyers don't need to be sold on grounding.

**Rearrange:** Move ENELVEN reference from section 6 to section 4 (now the history/differentiator combined section). Move 3-stat strip to section 2 (immediately after hero). Page is now 7-8 sections, not 10+.

### Critique and Refine

Original story had no stat strip, no `buyers_intro`, no `procurement_note`. The galvanizing page uses a stat strip pattern (solution stats section) — applying the same pattern here is consistent and proven. The procurement note is copper-specific: state utility buyers need audit-trail signals that are irrelevant on the galvanizing page.

ASTM B227 (standard for hard-drawn copper wire) is a candidate standard to reference alongside UL 467. Hold for Ing. Miriam confirmation before adding to page copy — do not add to AC or ui.json until confirmed.

### WhatsApp pre-fill for copper_rods context

Already in `ui.json` ES: `"copper_rods": "Hola, quisiera cotizar varillas de tierra cobre-enchapado. Necesito diámetro [__] y longitud [__]."` — this is the correct pre-fill. The `[__]` blanks are intentional: buyer fills in their spec. Do not remove them.

---

## Elicitation Intelligence — Session 2 (2026-05-12)

Methods applied: Stakeholder Round Table, Reverse Engineering, Cross-Functional War Room, First Principles Analysis, Self-Consistency Validation.

### Consolidated findings applied to this story

**Critical — applied:**

- `procurement_note` now renders in two locations: Section 4 (near ENELVEN reference) and Section 8 (near final CTA). Same key, two render points. Satisfies both audit-trail and conversion-path needs.

**High — applied:**

- `cert_note` key added — explicitly states per-lot quality certificate under ASTM A153 and UL 467. Carlos (CORPOELEC procurement) asked for this directly. Rendered in Section 6.
- WhatsApp `copper_rods` pre-fill updated in `ui.json` to include `cantidad estimada: [__]`. Rodrigo (EPC PM) would have sent a partial inquiry without quantity. Now prompts for all three key fields.
- Spec table replaced with diameter × length matrix. `matrix_col_dia`, `matrix_col_12/18/24/30`, `matrix_avail` keys added. María (distributor) identified this as the decision tool for purchase orders.
- `history_heading` reframed: ES "Proveedor con historial en sector público" / EN "Proven public-sector delivery record" — ENELVEN is a procurement qualification signal, not just a marketing trust signal.
- `diff_body` updated to include "no import dependency" angle — Rodrigo's EPC framing when SENIAT import permits are unpredictable.

**Medium — applied:**

- `bg-copper` restricted to stat strip (Section 2) only. All other sections use `bg-navy` or `bg-bg`/`bg-bg-alt`. One copper band prevents the page reading as "rusty."
- `process_body` capped at 2 sentences. Ready-to-buy visitors don't need a process explanation; skeptics get just enough to confirm manufacturing is real.
- Applications section: `app_1/2/3` are single-line bullet points only. No sub-descriptions. Momentum preserved.

**Low — noted for dev:**

- Phone number (`footer.phone`) rendered as secondary contact link in Section 4, using the existing key — no new key needed.
- `diff_body` "no import dependency" angle added — resonates with EPC buyers managing SENIAT import permit risk.

### Self-consistency validation outcome

Three independent page strategies were compared. All three agreed on: stat strip in first 3 sections, ENELVEN by section 4, spec table before CTA, no pricing. Current 8-section structure absorbed the best elements of Strategy A (no sub-descriptions in applications) and Strategy B (ENELVEN as anchor narrative heading). Structure validated.

### ASTM B227 — held

ASTM B227 (hard-drawn copper wire) is a candidate additional standard. Not added to page copy or ACs until confirmed by Ing. Miriam. Do not add without confirmation.

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None. Clean build on first pass.

### Completion Notes List

- Task 1: Added full `copper_page` namespace to `src/content/ui.json` under both `es` and `en` objects — 45 keys each, full parity confirmed.
- Task 2: Created `src/pages/es/varillas-de-cobre.astro` — 8 sections, `bg-copper` stat strip section 2 only, `procurement_note` in sections 4 and 8, ENELVEN reference in section 4, spec matrix + 2-col table in section 3, `nails.jpeg` + `nails2.jpeg` in section 7. `activePage="copper_rods"`, `altSlug="copper-ground-rods"`.
- Task 3: Created `src/pages/en/copper-ground-rods.astro` — mirror of ES page with `lang="en"`, OG tags injected via `<meta slot="head">` pattern (matching en/index.astro).
- Task 4: Updated `BottomTabBar.astro` — copper_rods tab now routes to locale-aware route; quality/contact remain `#` with their TODO comments.
- Task 5: Updated `BaseLayout.astro` — copper_rods nav link now routes correctly with `aria-current` support; quality/contact remain `#`.
- Task 6: Updated `es/index.astro` and `en/index.astro` — copper card `<div>` replaced with `<a>` wrapping to the copper rods page.
- Task 7: `npm run build` — 0 errors, 0 warnings. Both pages built at ~25 KB HTML (well under 500 KB). No pricing data in built HTML.

### File List

- `pyglara-site/src/content/ui.json` — extended with `copper_page` namespace (ES + EN); `photo_alt_2` corrected (code review H2)
- `pyglara-site/src/pages/es/varillas-de-cobre.astro` — created; stat strip updated to use `stat-number` counter for 936 (code review M2)
- `pyglara-site/src/pages/en/copper-ground-rods.astro` — created; stat strip updated to use `stat-number` counter for 936 (code review M2)
- `pyglara-site/src/components/BottomTabBar.astro` — copper_rods href wired
- `pyglara-site/src/layouts/BaseLayout.astro` — copper_rods nav link wired + aria-current
- `pyglara-site/src/pages/es/index.astro` — copper card wrapped in `<a>`; nested WhatsAppButton replaced with `<span>` (code review H1)
- `pyglara-site/src/pages/en/index.astro` — copper card wrapped in `<a>`; nested WhatsAppButton replaced with `<span>` (code review H1)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story status updated to done

---

### Senior Developer Review (AI) — 2026-05-12

**Reviewer:** claude-sonnet-4-6
**Outcome:** Changes Requested → Fixed → Approved

**Issues found and resolved:**

**[HIGH] H1 — Nested `<a>` tags in homepage copper cards (invalid HTML)** — FIXED
Both `es/index.astro:244` and `en/index.astro:253` wrapped the copper card in `<a>` (per AC 13) while keeping a `<WhatsAppButton>` (renders as `<a>`) inside. Nested anchors are invalid HTML5 and break the card click-through. Fixed by replacing the `<WhatsAppButton>` inside the card with a non-interactive `<span class="...bg-whatsapp...">` visual affordance. The outer `<a>` wrapper already routes the full card click to the copper page; the WhatsApp CTA is available on the copper page itself.

**[HIGH] H2 — `nails.jpeg` labeled as copper ground rod photos (factually incorrect alt text)** — FIXED
`photo_alt_2` in both ES and EN `ui.json` claimed the image showed "varillas de tierra terminadas / finished ground rods" but `nails.jpeg` is the galvanized nails photo (confirmed by homepage `facility.alt4`). Updated to neutral facility descriptions: ES → "Producción — Planta PYGLARA, Zona Industrial I, Barquisimeto" / EN → "Production line — PYGLARA plant, Zona Industrial I, Barquisimeto".

**[MEDIUM] M1 — Story 7-2 uncommitted changes entangled in working tree** — ACTION REQUIRED
`en/galvanizing.astro` and `es/galvanizacion.astro` (Story 7-2) are modified but never committed. These changes must be committed as a separate Story 7-2 commit before committing Story 7-3 changes, to preserve clean per-story git history.

**[MEDIUM] M2 — Copper stat strip did not use animated counter pattern** — FIXED
Section 2 stat strip in both copper pages was rendering all values as static text. Updated to use `stat-number` + `data-target="936"` for stat_1 (936 units/day), matching the BaseLayout IntersectionObserver counter pattern used on the homepage. stat_2 ("0") and stat_3 (locale-formatted "20.000"/"20,000") remain static — "0" is more impactful as an immediate static value, and locale-formatted thousands separators are incompatible with the raw-numeric counter JS.

**[LOW] L1 — Story Status field not updated to `done` after successful smoke test** — FIXED
Status field and sprint-status.yaml both updated to `done`.

**Build verification post-fixes:** `npm run build` — 0 errors, 0 warnings, 9 pages built in 2.21s. ✓
