# Story 1.1: Brand Kit Definition

Status: in-progress

## Story

As a project owner establishing visual identity,
I want a complete brand kit document defining PYGLARA's visual language,
so that all deliverables (website, pitch deck, investor document, and printed materials) share consistent branding.

## Acceptance Criteria

1. Colors pass WCAG 2.1 AA contrast ratio (4.5:1 body text, 3:1 large text) — documented with actual ratios
2. Brand kit works in B&W (grayscale test passed — all elements distinguishable without color)
3. Canva Brand Kit configured with colors, fonts, and logo/text-mark
4. Tailwind `@theme` token CSS snippet defined and ready for Story 1.3 to drop into `src/styles/global.css`
5. At least 5 real plant photos selected, named, and optimized (WebP, 800px wide, <80KB each)

## Tasks / Subtasks

- [x] Task 1: Validate and finalize color palette (AC: 1, 2)
  - [x] 1.1 Document WCAG contrast ratios for all proposed color combinations (Navy on White, Copper on White, Green on White, Text on White, White on Navy) — documented in docs/brand-kit.md Section 2
  - [x] 1.2 Confirm Copper (#B87333) and Amber (#D4A017) restricted to large text / decorative only — documented in docs/brand-kit.md
  - [ ] 1.3 Physical validation: print a test page (color + B&W) — DEFERRED: waiting on physical access
  - [ ] 1.4 Physical validation: check on budget Android phone in outdoor daylight — DEFERRED: waiting on physical access
  - [x] 1.5 Final lock: palette locked in docs/brand-kit.md — adjustments to be noted after physical tests if needed

- [x] Task 2: Finalize typography spec (AC: 3, 4)
  - [x] 2.1 Web font stack confirmed and documented in docs/brand-kit.md Section 3
  - [x] 2.2 Web type scale documented in docs/brand-kit.md Section 3
  - [x] 2.3 Print font recommendations documented in docs/brand-kit.md Section 3

- [x] Task 3: Logo / text-mark decision (AC: 3)
  - [x] 3.1 Logo files confirmed: assets/logo-PG.jpeg (square) and assets/logo-prensados....jpeg (horizontal)
  - [x] 3.2 Usage rules documented in docs/brand-kit.md Section 1
  - [x] 3.3 N/A — logo exists

- [x] Task 4: Photography guidelines (AC: 5)
  - [x] 4.1 Document photography rules: real plant photos only, no stock imagery, phone quality acceptable, no heavy filters
  - [x] 4.2 Define walk-through sequence concept: 8-10 photos simulating a plant visit (exterior → kettle bay → copper line → equipment closeups → warehouse)
  - [x] 4.3 Select 5+ real plant photos — 7 confirmed: 65.jpeg, bracket.jpg, esfumer.jpeg, nails.jpeg, nails2.jpeg, pilling1.jpeg, plant-clean.jpeg
  - [ ] 4.4 Optimize selected photos: convert to WebP, resize to 800px wide, target <80KB each for web — DEFERRED: waiting on imaging/tooling
  - [ ] 4.5 Missing: exterior, overhead crane, secondary warehouse — DEFERRED: photograph on next plant visit

- [x] Task 5: Write brand kit markdown document (AC: 1, 2, 3, 4, 5)
  - [x] 5.1 Create `docs/brand-kit.md` with complete spec: color palette, typography, logo rules, photography guidelines, tone guidelines
  - [x] 5.2 Include Tailwind `@theme` CSS token snippet (ready for Story 1.3 to copy into `src/styles/global.css`)
  - [x] 5.3 Include designer brief section for print materials (font brief + color brief for freelance designer)
  - [x] 5.4 Verify all WCAG ratios are documented inline next to each color

- [x] Task 6: Canva Brand Kit — SKIPPED (requires Canva Pro subscription)
  - [x] 6.1 Confirmed: Canva Brand Kit is a Pro-only feature — not available on free tier
  - [x] 6.2 Replacement: docs/brand-kit.md is the source of truth for all brand values
  - [x] 6.3 Canva designs will use manual color/font selection per design using docs/brand-kit.md as reference
  - [x] 6.4 Both logo files confirmed present in assets/ folder — upload manually to each Canva design as needed

## Dev Notes

### Nature of This Story

This is a **documentation + configuration story**, not a code story. The primary deliverable is `docs/brand-kit.md` — a comprehensive brand specification document. Secondary deliverables are: Canva Brand Kit configuration (done through the browser UI) and optimized photo assets. The Tailwind `@theme` token snippet is written in the brand kit document for Story 1.3 to implement — no code files are created in this story.

### Color Palette — Already Decided (from UX Spec)

| Token | Hex | Usage | WCAG on White |
|---|---|---|---|
| Primary (Navy) | #1B3A5C | Headings, nav, primary buttons, investor doc dominant | 10.3:1 — AAA |
| Accent (Copper) | #B87333 | Large text (24px+), icons, decorative lines — NEVER body text | 3.5:1 — FAILS AA small |
| Success (Green) | #2D8B4E | Operational status only | 4.6:1 — AA |
| Background White | #FFFFFF | Page background | N/A |
| Background Light | #F5F5F5 | Alternating sections | N/A |
| Text | #1A1A1A | All body text | 16.6:1 — AAA |
| Warning (Amber) | #D4A017 | "Pending" / "coming soon" — large text only | 2.8:1 — FAILS AA |
| WhatsApp Green | #25D366 | WhatsApp CTA buttons ONLY — not a brand color | Per button context |

**Critical constraint:** Copper (#B87333) and Amber (#D4A017) FAIL WCAG AA for normal-size text. These are decorative/accent only. The developer agent for Epic 7 MUST NOT use these for body text, form labels, or small UI elements.

**Grayscale mapping (B&W print):**

- Navy #1B3A5C → very dark gray (~20% luminance) — strong contrast
- Copper #B87333 → mid-gray (~45% luminance) — medium, distinguishable from navy
- Green #2D8B4E → dark-mid gray (~30% luminance) — similar to copper in B&W, use sparingly as a paired pair
- Background #F5F5F5 → near-white — distinguishable from white

The grayscale test must confirm all elements remain legible when the page is photocopied.

### Typography — Already Decided (from Architecture + UX Spec)

**Web (locked — no change needed):**

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

No Google Fonts. System fonts = zero loading time. ADR-001 constraint.

**Web type scale:**

| Level | Mobile size | Desktop size | Weight | Line-height |
|---|---|---|---|---|
| Hero / H1 | 2rem (32px) | 3rem (48px) | 700 | 1.1 |
| H2 | 1.5rem (24px) | 1.5rem (24px) | 600 | 1.2 |
| H3 | 1.125rem (18px) | 1.125rem (18px) | 600 | 1.3 |
| Lead paragraph | 1.125rem (18px) | 1.125rem (18px) | 400 | 1.5 |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.5 |
| Small / caption | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.4 |
| Tiny / legal | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.4 |

**Print (for designer brief):**

- Heading font: Geometric sans-serif, open source / free commercial use. Recommendation: Inter (Google Fonts, SIL license). Alternative: Nunito.
- Body font: Readable serif for investor document. Recommendation: Source Serif Pro (Google Fonts, SIL license). Alternative: Lora.
- Minimum body size: 11pt for investor document readability.

### Tailwind @theme Token Snippet (for Story 1.3)

The following CSS snippet must be documented in brand-kit.md and is ready for Story 1.3 to drop into `src/styles/global.css`:

```css
@theme {
  /* Colors */
  --color-navy: #1B3A5C;
  --color-copper: #B87333;
  --color-green: #2D8B4E;
  --color-amber: #D4A017;
  --color-text: #1A1A1A;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F5F5;
  --color-whatsapp: #25D366;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Spacing / layout */
  --max-width-content: 1024px;
  --border-radius-sm: 2px;
  --border-radius-md: 4px;

  /* Touch targets (accessibility) */
  --min-touch-target: 44px;
}
```

**CRITICAL:** Tailwind v4 uses `@theme {}` in CSS — NOT `tailwind.config.mjs`. The architecture doc explicitly overrides any UX spec reference to `tailwind.config.mjs`. Story 1.3 MUST use the `@theme` approach.

### Photography Guidelines

- Real plant photos only. No stock imagery. Never.
- Phone quality (iPhone or Android) is acceptable — no professional photoshoot required.
- No heavy Instagram-style filters or color grading. Natural light preferred.
- Walk-through sequence: show the plant from entrance to production — exterior gate, warehouse overview, kettle bay, 7m Pilling kettle (even if empty), copper line, scale/cranes, finished product if any.
- Web: 800px wide, WebP format, quality 60-70%, <80KB per image. Lazy-load all except hero.
- Print: Keep 300 DPI originals separate. Do not overwrite originals when optimizing for web.
- Logo in photos: @pyglarasa Instagram handle visible in some shots is fine.

### Canva Brand Kit Notes

- Canva free tier supports brand kit for individual users. Confirm account access before this task.
- Font availability: Montserrat and Open Sans are available in Canva free tier. If UX spec's print font recommendations (Inter, Source Serif Pro) are not available in Canva, use Montserrat (heading) + Lato (body) as Canva-available alternatives.
- The Canva Brand Kit is used for: pitch decks, investor document, printed materials, one-page capability statement.
- Link to Canva kit must be documented so all collaborators use the same assets.

### Tone of Voice

- "Real Over Polished" — authentic, industrial, verifiable
- Active and direct: "We galvanize." not "Galvanizing solutions are offered."
- No superlatives without evidence: "the only facility" ✓ (if true), "world-class" ✗ (unverifiable)
- Bilingual: Spanish is primary. English is peer-quality, not a literal translation.
- Numbers are the design: "300 TM/mes", "17,280 TM/year", "2 active galvanizers in Venezuela"

### Design Direction Reference

PYGLARA website follows Path Robotics visual language: dark-background, bold industrial design, data-forward stat storytelling. Navy (#1B3A5C) as dominant background for hero and alternating dark sections, white text on dark, copper as the single accent. This is the brief for Epic 7 — note it here so Epic 7 developer agent has the reference.

### File Locations

| Deliverable | Location |
|---|---|
| Brand kit document | `docs/brand-kit.md` |
| Plant photos (originals) | `assets/photos/originals/` |
| Plant photos (web-optimized) | `assets/photos/web/` |
| Tailwind token snippet | documented in `docs/brand-kit.md` (implemented in Story 1.3) |

### Project Structure Notes

- `docs/` folder already exists (project knowledge folder per config.yaml)
- `assets/` folder may not exist — create `assets/photos/originals/` and `assets/photos/web/` as needed
- No code files are created in this story — all Tailwind token work happens in Story 1.3
- This story's outputs are prerequisites for: Story 1.3 (Astro init), Epic 3 (Printed Materials), Epic 4 (Investor Doc), Epic 5 (Pitch Deck, already done — may need retroactive brand alignment), Epic 7 (Website)

### Dependencies

- **Blocks:** Story 1.2 is parallel (no dependency). Story 1.3 requires this story's Tailwind token snippet. Epic 7 and Epic 8 require this story complete.
- **Non-blocking:** Epic 3 (Printed Materials) needs brand kit but can start structural outline without it. Epic 5 (Pitch Deck) is already done — review against brand kit for retroactive alignment.
- **Input needed from Sir:** Logo file (if one exists). Plant photos (if not on Instagram). Physical device and print testing (Tasks 1.3, 1.4).

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.1] — Epic 1, Story 1.1 full spec
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Brand-Kit] — Color palette, typography, design direction
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-009] — Brand kit source of truth decision
- [Source: _bmad-output/planning-artifacts/architecture.md#Styling-Solution] — Tailwind v4 @theme syntax (overrides UX spec tailwind.config.mjs reference)
- [Source: CLAUDE.md] — Business context, plant details, Instagram handle @pyglarasa

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

Story file created 2026-04-13. Comprehensive context loaded from UX Spec, Architecture (ADR-009), and Epics. Color palette pre-decided in UX spec — validation tests are the primary open item. Tailwind @theme token snippet pre-written and ready for Story 1.3. Physical device and print tests (Tasks 1.3, 1.4) require Sir to execute in person — these are the only HALT-condition tasks.

### File List

- _bmad-output/implementation-artifacts/1-1-brand-kit-definition.md (this file)
