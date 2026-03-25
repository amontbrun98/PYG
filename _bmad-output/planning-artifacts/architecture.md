---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - product-brief-PYG-2026-03-11.md
  - prd.md
  - prd-validation-report.md
  - prd-validation-report-v2.md
  - ux-design-specification.md
  - research/domain-hot-dip-galvanizing-industry-research-2026-03-12.md
  - research/market-galvanizing-venezuela-research-2026-03-12.md
  - research/market-venezuela-investment-climate-research-2026-03-13.md
  - research/technical-venezuela-oil-sector-steel-demand-research-2026-03-13.md
  - research/market-venezuela-construction-infrastructure-research-2026-03-13.md
  - research/domain-copper-electroplated-ground-rods-research-2026-03-13.md
  - docs/galvanizing-pricing-cost-research.md
  - docs/competitive-analysis-venezuela-galvanizing.md
  - docs/client-prospecting-plan.md
  - docs/product-market-fit-analysis.md
  - docs/plant-equipment-registry.md
  - docs/owner-talking-points-mobile.md
workflowType: 'architecture'
project_name: 'PYG'
user_name: 'Sir'
date: '2026-03-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

34 functional requirements organized into 9 categories:

| Category | FRs | Architectural Implication |
|---|---|---|
| Content Presentation (Bilingual) | FR1-FR6e | Route-based i18n (`/es/`, `/en/`), content collections in markdown, bilingual content sync process |
| Client Communication | FR7-FR10c | WhatsApp redirect links (`pyglara.com/wa?from=[page]`), context-aware pre-fills per page, transactional email for form submissions, confirmation pages with response time expectations |
| Investor/Partner Inquiry | FR11-FR13 | Separate form with distinct email notification routing, discreet footer placement, no financial data on-site |
| Notification & Administration | FR14-FR17b | Email notification separation by type (quote vs. investor), code-level content updates for MVP, privacy policy page |
| Search & Discovery | FR18-FR21 | Sitemap generation, LocalBusiness structured data, hreflang tags, Google Business Profile integration |
| Responsive & Mobile | FR22-FR24b | Bottom tab bar (4 items, no hamburger), 44px touch targets, mobile-first at 320px+, WhatsApp button above fold |
| Investor Document (Offline) | FR25-FR31 | Separate deliverable — not part of website build. Professional PDF, 25-35 pages, bilingual (separate versions), DocSend delivery |
| Printed Materials | FR32 | Separate deliverable — Canva/InDesign templates. Print-optimized for Carta paper, B&W compatible, WhatsApp QR codes |
| WhatsApp Business | FR33-FR34 | WhatsApp Business profile configuration (auto-reply, quick replies, catalog). Domain redirect for contact links. |

**Non-Functional Requirements:**

19 NFRs across 5 categories that drive architecture:

| Category | Key NFRs | Architectural Impact |
|---|---|---|
| Performance | NFR1-NFR6 | <2.4s LCP, <500KB/page, Lighthouse 90+, <1.5s FCP, <0.1 CLS — mandates SSG, zero JS default, system fonts, WebP images |
| Security | NFR7-NFR10 | HTTPS (Vercel auto), spam protection (honeypot + rate limiting), no sensitive data in source code or API routes |
| Accessibility | NFR11-NFR12 | WCAG 2.1 AA — semantic HTML, alt text, keyboard nav, focus indicators, color contrast (copper accent restricted to 24px+) |
| Integration | NFR13-NFR16 | WhatsApp click-to-chat (mobile + desktop), transactional email <5min delivery, Google Sheets fallback for failed emails, Google Business Profile |
| Reliability | NFR17-NFR19 | 99.9% uptime via CDN, fallback contact info when integrations fail, GA4 analytics tracking page views/forms/language toggle/WhatsApp clicks |

**Scale & Complexity:**

- Primary domain: Static web (SSG) + Print design + WhatsApp Business configuration
- Complexity level: Medium — bilingual static site with form handling, no database, no auth, no real-time features
- Estimated architectural components: 7 Astro components, 4 pages (x2 languages = 8 routes), 2 forms, 1 API route for email, 1 WhatsApp redirect route

### Technical Constraints & Dependencies

| Constraint | Source | Impact |
|---|---|---|
| Zero client-side JS (default) | UX Spec ADR-001 | All components server-rendered HTML + Tailwind CSS. Only exception: ~700 bytes inline for scroll animations (IntersectionObserver + counter) |
| Astro framework (locked) | UX Spec ADR-001 | Framework decision already made with weighted scoring (4.25 vs 4.15 for Next.js). Migration trigger defined. |
| Vercel free tier hosting | PRD + Product Brief | Global CDN, auto HTTPS, zero server maintenance. Free tier limits apply. |
| System fonts only | UX Spec | No Google Fonts — saves 200-400ms. Font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| Venezuelan internet conditions | PRD NFR1 | 3G/4G with drops. <500KB pages, progressive image loading, fault-tolerant rendering, critical paths in raw HTML |
| Ley de Precios Justos | PRD Domain Requirements | Zero pricing on website. No financial data in source or API routes. 30% regulated margin in all public materials. |
| No investor data on-site | FR28 | Investor document never published on website. Shared only after qualification via DocSend. |
| Bilingual accuracy | FR24b | Human-reviewed translations, not machine-translated. Standard industrial terminology in each language. |
| Print-first design priority | UX Spec | Printed materials and investor document are Priority 1/1b. Website is Priority 2. Architecture must support PDF generation/export. |

### Cross-Cutting Concerns Identified

| Concern | Affected Components | Resolution Approach |
|---|---|---|
| **Bilingual content sync** | All pages, forms, meta tags, structured data | Content collections in `/content/es/` and `/content/en/` with markdown. Components never hardcode text. |
| **Brand consistency** | Website, printed materials, investor document | Single brand kit (color palette, typography) defined in Tailwind config, enforced in Canva and print templates |
| **WhatsApp integration** | Every page (floating button + page-specific CTAs) | Domain redirect route (`/wa`) with `from` parameter for context-aware pre-fills |
| **SEO (dual language)** | All pages | Hreflang tags, separate language URLs, sitemap with both languages, LocalBusiness structured data |
| **Spam protection** | 2 forms (international quote + partnership inquiry) | Honeypot fields + rate limiting. No CAPTCHA (friction). |
| **Email deliverability** | Form submissions | Transactional email service (Resend/SendGrid) + Google Sheets fallback (NFR15) |
| **Accessibility** | All interactive elements | WCAG 2.1 AA: 44px touch targets, focus indicators, semantic HTML, heading hierarchy, alt text |
| **Fault tolerance** | Critical contact paths | WhatsApp link, phone, address in raw HTML. Page must be usable on partial load. |
| **Analytics** | All pages | GA4 tracking: page views, form submissions by type, language toggle, WhatsApp click-through rates |

## Starter Template Evaluation

### Primary Technology Domain

Static web (SSG) -- bilingual marketing site with serverless form handling. 4 pages x 2 languages = 8 routes, 2 forms, 1 WhatsApp redirect.

### First Principles Analysis

**Why a framework is justified (not plain HTML):**

The project produces 8+ HTML files across 2 languages. Plain HTML would mean 16+ duplicate header/footer copies that drift independently. Shared layouts and content collections solve this. A framework is warranted not for dynamic features, but for DRY content management across bilingual pages.

**Rejected alternative -- Path A (Plain HTML + Tailwind CLI):** Viable for a monolingual 2-page site. Fails at 8+ bilingual pages due to header/footer duplication drift. Fails the "AI agent consistency" test -- agents would produce inconsistent markup across duplicated files.

### Starter Options Considered

| Option | Description | Verdict |
| --- | --- | --- |
| `npm create astro@latest` (blank) | Astro 6.0.8, Node 22+, blank template | **Selected** -- cleanest base |
| Astro blog template | Pre-built blog with content collections | Over-scoped for 4-page marketing site |
| Community i18n starter (astro-i18n-aut) | Pre-built i18n with locale routing | Overkill -- 2 languages, 4 pages. Built-in Astro i18n config is sufficient |

### Selected Starter: Astro 6.0.8 (pinned) + Manual Integrations

**Rationale:** Astro 6.0.8 is already at patch 8 (stabilizing rapidly since March 10, 2026 release). Node 22 is current LTS. All first-party integrations (Vercel, sitemap) support Astro 6. Tailwind v4 is the only version with active Astro documentation.

**Initialization Command:**

```bash
npm create astro@latest pyglara-site -- --template minimal
cd pyglara-site
npx astro add tailwind
npx astro add sitemap
npx astro add vercel
npm install resend googleapis
```

**Note:** `googleapis` is for Google Sheets dual-write on form submissions (ADR-002).

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript (Astro default), Node 22+ (Astro 6 requirement)
- All dependencies pinned exactly in `package.json` (no `^` ranges) to prevent version drift

**Styling Solution:**
- Tailwind CSS v4 via Vite plugin (NOT the deprecated `@astrojs/tailwind` integration)
- Design tokens defined with `@theme {}` in `src/styles/global.css` -- NOT in `tailwind.config.mjs` (Tailwind v4 config model change)
- **CORRECTION to UX Spec:** UX spec references `tailwind.config.mjs` for design tokens. This is superseded. Tailwind v4 uses `@theme` in CSS.

**Build Tooling:**
- Vite (Astro 6 uses Vite Environment API for dev/prod parity)
- SSG output by default -- static HTML + CSS files
- `astro build && astro preview` for production verification before deploy

**Testing Framework:**
- Not included in starter (add Vitest post-MVP if needed)

**Code Organization:**
- Astro convention: `src/pages/`, `src/components/`, `src/layouts/`, `src/content/`

**Development Experience:**
- Astro 6 dev server runs exact production runtime (fewer dev/prod discrepancies)
- HMR via Vite

**Integrations Added:**

| Integration | Purpose | Notes |
| --- | --- | --- |
| Tailwind CSS v4 (Vite plugin) | Utility-first styling, zero runtime CSS | `@theme` for design tokens |
| `@astrojs/sitemap` | Auto-generate sitemap.xml with i18n hreflang support | Configure with `defaultLocale: 'es'` |
| `@astrojs/vercel` | Vercel adapter for serverless endpoints (forms) + static output | Handles Build Output API v3 format |
| `resend` | Transactional email for form notifications (free: 1,000/day) | resend.com |
| `googleapis` | Google Sheets API for form submission data store | Primary record; email is notification |

**Note:** Project initialization using this command should be the first implementation story.

### Pre-mortem Findings (Incorporated)

| Risk | Architectural Prevention |
| --- | --- |
| Version instability (Astro 6 is new) | Pin ALL dependency versions exactly. No `^` ranges. Commit `package-lock.json`. |
| Silent form failures (leads lost) | Google Sheets as primary data store, Resend email as notification layer. Dual-write on every submission. Form error state shows direct contact info (WhatsApp, phone, email). |
| Bilingual content drift | Build-time validation: if an `/es/` content file exists, corresponding `/en/` file must exist. Warn on mismatched `lastUpdated` timestamps. |
| WhatsApp redirect abuse | Rate limit `/wa` route (10 req/min/IP via Vercel Edge Middleware). |
| Tailwind v4 config confusion | Explicit `@theme` block in architecture. All brand colors defined once. UX spec's `tailwind.config.mjs` references superseded. |
| SEO not activated post-deploy | Post-deploy checklist: submit sitemap to Google Search Console, claim Google Business Profile, verify hreflang, test structured data. |

### Architecture Decision Records

| ADR | Decision | Rationale |
| --- | --- | --- |
| **ADR-001: Framework** | Astro 6.0.8, pinned exactly | Stable (patch 8), Node 22 LTS, first-party integrations. UX spec decision confirmed. |
| **ADR-002: Form Handling** | Dual-write: Google Sheets (primary data store) + Resend (email notification). Form error state shows WhatsApp/phone/email as human fallback. | Sheets is record of truth. Email is alert. No leads lost even if one service fails. Fallback is human, not JS. |
| **ADR-003: Bilingual Routing** | Astro built-in i18n config. `defaultLocale: 'es'`, `locales: ['es', 'en']`. Route-based (`/es/`, `/en/`). | SEO-friendly, automatic hreflang via sitemap integration, framework-native. |
| **ADR-004: Deployment** | Static output + 2 serverless endpoints via `@astrojs/vercel`. Auto-deploy from Git push. | CDN for static pages, serverless for forms only. Zero server maintenance. |
| **ADR-005: Static Boundary** | ONLY server-side code: 2 form handler endpoints + `/wa` redirect. Everything else is static HTML. No SSR, no dynamic routes, no middleware except `/wa` rate limiting. | Prevents scope creep. Static pages serve from CDN regardless of serverless health. |
| **ADR-006: Content Architecture** | **OPEN -- resolve in Step 4.** Hybrid (JSON for UI strings + markdown for page body) vs. pure markdown. Both have trade-offs for a 4-page site. | Hybrid: better AI agent consistency, enforced UI string sync. Pure markdown: simpler, fewer files. |
| **ADR-007: Component Props** | Every `.astro` component receives text as props. Components never import content directly. Pages load content and pass to components. | Language-agnostic components. Content changes never require component changes. AI agents build components without i18n knowledge. |
| **ADR-008: Deliverable Independence** | Website, investor document, and printed materials are architecturally independent. Share only brand kit + domain/redirect. Implementation parallelizable on two tracks. | Track A (Sir + designer): investor doc + printed materials, no code dependency. Track B (developer + AI): website. Shared prerequisite: domain + brand kit. |
| **ADR-009: Brand Kit Source of Truth** | Brand kit defined once in standalone file before implementation. Tailwind `@theme` tokens, Canva kit, and InDesign swatches all derived from this source. Color validation must complete before visual implementation begins. | Prevents brand inconsistency across deliverables. Content writing can start immediately; visual design waits for validated brand kit. |

### Implementation Sequencing (from War Room)

```
Phase 0 (Immediate, parallel):
  - Secure domain (pyglara.com + variants, register 2+ years, stable payment method)
  - Begin investor document CONTENT (writing, not design)
  - Begin printed materials CONTENT (writing, not design)

Phase 1 (Brand kit):
  - Finalize brand kit (colors, typography, logo, photography guidelines)
  - Validate colors: budget Android phones, outdoor light, B&W print test
  - Lock Tailwind @theme tokens + Canva brand kit + designer swatches

Phase 2 (Parallel implementation):
  Track A: Investor document design + printed materials design (designer + Sir)
  Track B: Website build (developer + AI, Astro stack)
  Shared: Printed QR codes point directly to wa.me (no domain dependency for WhatsApp)

Phase 3 (Post-deploy):
  - SEO activation checklist
  - Google Business Profile
  - WhatsApp Business profile configuration
```

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Form handling: Google Forms hidden POST with branded confirmation UX
- Content architecture: hybrid JSON (UI strings) + markdown (page body)
- 100% static output -- zero serverless functions

**Important Decisions (Shape Architecture):**
- Image optimization rules for Venezuelan 3G
- GA4 inline with custom event tracking
- Bilingual commit workflow rule
- Node engine pinning

**Deferred Decisions (Post-MVP):**
- CI/CD pipeline (GitHub Actions) -- Vercel Git Integration is sufficient
- Rate limiting / Edge Middleware -- add only if abuse observed
- CSP headers -- negligible attack surface on static site
- Build-time bilingual validation -- workflow rule is sufficient for 5 content files per language
- Server-side analytics -- add if ad blocker impact exceeds expectations
- Custom email notifications (Resend) -- add when form volume >100/month

### Data Architecture

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Primary data store** | Google Sheets (2 tabs: "Quote Requests", "Partnership Inquiries") | Zero cost, Sir already uses Google ecosystem, queryable, exportable |
| **Form backend** | Google Forms (hidden POST via `fetch()`, branded confirmation UX) | Zero backend code, zero credentials, zero npm dependencies. Google handles spam detection + CAPTCHA. |
| **Form confirmation** | Custom branded success message (~15 lines inline JS per form). Google branding never visible. Success message sets 24hr response expectation. | Professional UX. Fallback contact info (WhatsApp, phone, email) shown on error. |
| **Credential storage** | None required for MVP. GA4 measurement ID is public (in script tag). Google Forms URLs are public. | Occam's Razor: eliminated all server-side secrets. |

### Authentication & Security

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Authentication** | None | No user accounts, no protected content on MVP website |
| **HTTPS** | Vercel automatic | Zero configuration |
| **Spam protection** | Google Forms built-in CAPTCHA (enable in Form settings) + honeypot field + time-based bot check (~5 lines JS: reject submissions <3s after page load) | Layered defense, zero infrastructure cost |
| **Rate limiting** | Deferred. No server endpoints exist to rate limit. Google Forms handles its own abuse protection. | Occam's Razor: no attack surface to protect |
| **CSP headers** | Deferred. Static site with no user content rendering. Negligible XSS surface. | Add when third-party scripts or dynamic content are introduced |
| **Financial data** | Zero pricing, margins, or revenue projections on website or in source code | Ley de Precios Justos compliance. Investor data shared only via DocSend. |
| **Domain security** | Secure `pyglara.com` + at least one variant (`pyglarasa.com`). Register 2+ years. Use non-Venezuelan payment method for renewal. | Prevents domain squatting and brand confusion. |
| **Account security** | 2FA on business Google account (pre-launch checklist) | Protects Google Sheets lead data and Forms administration |

### API & Communication Patterns

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Form submission** | Client-side `fetch()` POST to Google Forms endpoint. No server-side API routes. | 100% static architecture. Google handles storage + notifications. |
| **WhatsApp contact** | Direct `wa.me` links with page-specific pre-fill messages. Built at build time from `ui.json`. No `/wa` route. | Zero server code. Pre-fills make it effortless for Venezuelan clients who don't fill forms. |
| **Printed material QR codes** | Point directly to `wa.me` URL (not to website domain). | WhatsApp contact works even before website is live. Domain-independent. |
| **Error handling** | Form error state shows inline message with WhatsApp button, phone, email. "If you don't hear from us within 24 hours, contact us directly." | Human fallback. No retry logic. No JS-dependent error handling. |
| **Email notifications** | Google Forms built-in email notifications (configured in Form settings) | Zero code. Sir receives email on each submission. |

### Frontend Architecture

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Rendering** | 100% SSG (Static Site Generation). Zero client-side JS by default. | Maximum performance. CDN-served. Works on Venezuelan 3G. |
| **Inline JS** | ~15 lines per form (hidden POST + confirmation) + ~700 bytes (IntersectionObserver scroll animations + counter). Total: ~2KB JS. | Forms require JS for submission. Animations are progressive enhancement. |
| **Image optimization** | Astro `<Image />` for plant photos. Explicit `width`/`height` on all images. Hero: `loading="eager"` + `fetchpriority="high"`. Non-hero: lazy load. `quality={70}`. CSS `background-color` placeholder matching dominant color. | Prevents CLS. Optimizes LCP on 3G. Aggressive compression for Venezuelan internet. |
| **Fonts** | System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Zero network cost. 200-400ms saved vs Google Fonts. |
| **Component count** | 7 Astro components, all server-rendered: WhatsAppButton, BottomTabBar, LanguageToggle, StatusIndicator, ServiceGrid, QuoteForm, PartnershipForm. Plus Footer and BaseLayout. | Each 30-50 lines. Extraction keeps pages clean. |
| **Content architecture** | Hybrid: `ui.json` for ~20 UI strings (nav, buttons, footer, meta, WhatsApp pre-fills) + markdown files for page body content. Helper function `t(key, lang)`. | ADR-007 consistency (components never hardcode text). Weighted score trade-off: slightly more complex than pure markdown but better AI agent consistency. |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Hosting** | Vercel free tier | CDN, auto HTTPS, preview deploys. Zero cost. |
| **CI/CD** | Vercel Git Integration only. Push to `main` = production. Branch push = preview. | No GitHub Actions for MVP. `astro build` is the only validation needed. |
| **Node version** | Pinned: `"engines": { "node": "22.x" }` in `package.json` + Vercel project setting | Prevents silent runtime changes from breaking builds. |
| **Environment config** | None. Zero server-side secrets. GA4 measurement ID is public in script tag. Google Forms URLs are public. | Occam's Razor eliminated all env vars. |
| **Monitoring** | GA4 inline in BaseLayout. Custom events: `form_submit`, `whatsapp_click`, `language_toggle`. Sir checks Google Sheet daily. | Single analytics tool. Human monitoring for form submission health. |
| **Domain** | TBD -- `pyglara.com` or similar. Register 2+ years with stable payment method. Secure variant domains. | Pre-implementation blocker for website. NOT a blocker for WhatsApp contact (QR codes point to wa.me directly). |
| **Migration path** | Astro supports `output: 'hybrid'` for incremental SSR. Individual pages can become dynamic without rewriting the site. | Phase 3 (investor portal, client tracking) can add auth + database to specific routes. Not built for, but not blocked. |

### Development Workflow Rules

| Rule | Rationale |
| --- | --- |
| **All content changes must include both ES and EN versions in the same commit** | Prevents bilingual drift. High-likelihood risk confirmed by both pre-mortem and Chaos Monkey analysis. |
| **All dependency versions pinned exactly (no `^` ranges)** | Deterministic builds. Prevents surprise breaking changes from upstream. |
| **`package-lock.json` committed to git** | Ensures identical installs across environments. |
| **`astro build && astro preview` before merge to main** | Production verification. Catches build-time errors before deploy. |

### Validated Risk Register

| Threat | Likelihood | Impact | Mitigation | Residual Risk |
| --- | --- | --- | --- | --- |
| Form spam | Low | Medium | Google Forms CAPTCHA + honeypot + time-check | Low |
| Email/phone harvesting | Certain | Low (by design) | Dedicated business email | Accepted |
| Domain squatting | Medium | Medium | Secure primary + variant domains | Low |
| Silent form failure | Low | High | Error UX + 24hr expectation + daily Sheet check | Low-Medium |
| Bilingual content drift | High | Medium | Workflow rule: both languages per commit | Low |
| Astro/Tailwind version conflict | Medium | None (Vercel serves last build) | Pinned versions + Node engine lock | Negligible |
| Heavy images on 3G | Medium | Medium | Astro `<Image />`, quality=70, eager hero, placeholders | Low |
| GA4 blocked by ad blocker | High (desktop) / Low (mobile) | Low | Target audience is mobile Venezuela (~95% unblocked) | Accepted |
| Domain expiry | Low | High | 2+ year registration, stable payment method | Negligible |
| Google account compromise | Low-Medium | High | 2FA on business Google account | Low |

### Pre-Launch Checklist

1. Secure `pyglara.com` + variant domains (2+ year registration, non-Venezuelan payment)
2. Enable 2FA on business Google account
3. Create Google Forms (Quote Requests + Partnership Inquiries) with CAPTCHA enabled
4. Configure Google Forms email notifications
5. Finalize brand kit and validate colors (budget Android, outdoor, B&W print)
6. Submit sitemap.xml to Google Search Console
7. Claim and verify Google Business Profile
8. Verify hreflang tags with checker tool
9. Test structured data with Google Rich Results Test
10. Configure WhatsApp Business profile (auto-reply, quick replies)

### Comparative Validation (Weighted Scoring)

All decisions scored against: Simplicity (30%), Cost (25%), Speed (20%), Reliability (15%), Extensibility (10%).

| Decision | Selected | Score | Runner-up | Score |
| --- | --- | --- | --- | --- |
| Framework | Astro 6.0.8 | 8.75 | Plain HTML | 8.00 |
| Form Backend | Google Forms | 8.70 | Formspree | 7.95 |
| Styling | Tailwind v4 | 8.55 | Plain CSS | 7.75 |
| Content | Hybrid JSON+MD | 8.05 | Pure markdown | 8.60 |
| Analytics | GA4 inline | 8.65 | No analytics | 8.50 |

**Architecture average: 8.54 / 10.** Content architecture is a deliberate trade-off (ADR-007 consistency over raw simplicity).
