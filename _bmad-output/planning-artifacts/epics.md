---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# PYG - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for PYG, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Visitors can view all site content in Spanish (default language)
- FR2: Visitors can switch the entire site to English via a language toggle available on every page
- FR3: Visitors can view galvanizing service specifications including kettle dimensions, capacity, turnaround times, and quality certification process
- FR4: Visitors can view copper ground rod product specifications including available sizes, coating thickness (with UL 467 compliance reference), applications, production capacity, and per-rod pricing model
- FR5: Visitors can view PYGLARA's equipment manufacturer references (Pilling, Honeywell, Allen Bradley)
- FR6: Visitors can view the company's location, RIF number, contact information, and operating details on the homepage, services page, copper rod page, contact page, and partnership page
- FR6b: Visitors can view facility photographs showing the plant, equipment, and warehouses on the homepage and services page
- FR6c: Visitors can view maximum workpiece dimensions (length, width, weight) for each operational kettle on the services page
- FR6d: Visitors can view an HSE commitment statement on a dedicated page or within the services section
- FR6e: Visitors can download a one-page capability statement PDF (bilingual) summarizing PYGLARA's services, capacity, equipment, and contact information
- FR7: Visitors can initiate a WhatsApp conversation with PYGLARA via a click-to-chat button with a pre-filled message (works on mobile app and desktop web)
- FR8: Venezuelan clients can initiate a structured quote request via WhatsApp with context-aware pre-filled messages. International clients (EN) can submit a quote request form with name, email, message, and optional company/title fields via progressive disclosure.
- FR9: International quote form supports file attachment for technical drawings. Venezuelan clients send attachments via WhatsApp natively.
- FR10: Footer displays phone, WhatsApp, email, and physical address on every page, providing persistent contact access. Desktop WhatsApp buttons include "or email us" fallback text.
- FR10b: Visitors see a confirmation page after submitting any form, displaying thank-you message, expected response timeframe, next-steps sequence for partnership inquiries, and fallback contact information.
- FR10c: Visitors receive an automatic confirmation email after submitting any form.
- FR11: Visitors can access a "Partnership Opportunities" section that describes PYGLARA's openness to strategic partnerships and investment
- FR12: Visitors can submit a partnership inquiry form with name, organization, email, phone, and message
- FR13: The system separates investor inquiries from client quote requests in notifications
- FR14: Sir receives email notifications when a new quote request is submitted
- FR15: Sir receives email notifications when a new partnership inquiry is submitted
- FR16: Email notifications identify the submission type (quote vs. investor inquiry)
- FR17: Sir can update site content (text, images) within 24 hours via code-level edits and deployment
- FR17b: The site includes a privacy policy page (in both languages) disclosing data collection, usage, storage, retention, and file attachment handling
- FR18: The site is indexable by search engines with proper meta tags, heading hierarchy, and sitemap
- FR19: The site provides structured data (LocalBusiness schema) for Google search results
- FR20: Each page exists at a unique, language-specific URL with proper hreflang tags
- FR21: The site is linked to a claimed Google Business Profile
- FR22: Visitors can access all site content on mobile (320px+) with 44px touch targets and bottom tab bar (4 tabs: Galvanizado, Varillas de Cobre, Calidad y Seguridad, Contacto)
- FR23: WhatsApp click-to-chat button above fold on mobile, in header on desktop
- FR24: Forms usable on mobile with correct HTML input types, 44px touch targets, no horizontal scrolling on 320px
- FR24b: All site content in both Spanish and English with human-reviewed, technically accurate translations
- FR25: Standalone investor document as professionally designed PDF with 11 sections in specified order, plus 2-page standalone executive summary
- FR26: Investor document exists as two separate language versions (ES and EN)
- FR27: Ing. Miriam reviews and signs off on all technical specifications via structured review process
- FR28: Investor document never published on website -- shared only after qualification
- FR29: Investor document addresses international investor concerns (USD repatriation, BOD exchange, OFAC compliance, Venezuelan corporate governance)
- FR30: Investor document includes version number and date with defined update process
- FR31: Investor document target 25-35 pages per language version with professional typography, data visualizations, plant photography
- FR32: Printed meeting kit: one-page capability statement (bilingual), 3-page sales kit, one-page copper rod spec sheet. Print-optimized for Carta paper, readable in grayscale, WhatsApp QR code on every page.
- FR33: WhatsApp Business profile configured with auto-reply, quick reply templates, and product catalog
- FR34: WhatsApp contact links use domain redirect for context-aware pre-filled messages per page
- FR35: A pitch deck (15-20 slides) exists as a presentation-ready PDF/PPTX summarizing the investment thesis, plant capabilities, financial projections, and deal structure -- designed for in-person or virtual investor meetings with both domestic and international audiences
- FR36: A bank-ready documentation package exists with replacement cost valuation of assets, projected cash flows, collateral inventory (real estate + equipment), and SENIAT-confirmed historical P&L -- formatted for Venezuelan bank working capital or credit line applications (BNC, Banesco, Mercantil)
- FR37: A replacement cost valuation document exists showing what it would cost to build PYGLARA from zero today: land acquisition, warehouse construction (~3,640 m2), Pilling kettle procurement (7m + 9m), copper line equipment, installation, permitting, and regulatory compliance -- proving the $1M asking price is below replacement value
- FR38: Financial projection documents exist in multiple scenarios: (a) conservative (300 TM/month, 30% margin, 7m kettle only), (b) moderate (300 TM + copper line at capacity), (c) aggressive (all kettles + copper at full capacity = ~9,000 TM/year galvanizing + 280,800 rods/year) -- with break-even analysis, ROI timeline, and capital deployment waterfall per scenario
- FR39: An international investor version of the pitch deck exists in English addressing OFAC compliance under GL 50A, USD repatriation via BOD exchange mechanism, Venezuelan corporate governance structure, political/regulatory risk mitigation, and tailored for Miami/Houston family offices and EPC strategic partners
- FR40: Minimum 3 Letters of Intent or written purchase commitments (WhatsApp confirmations accepted) collected from historical clients expressing volume and product type before investor document is finalized -- to serve as proof of demand in investor, pitch, and bank materials
- FR41: Contact reports exist for each outreach target documenting: company name, contact person, date of contact, galvanizing needs expressed, estimated monthly volume, timeline for first order, and any conditions or requirements
- FR42: A "Confirmed Demand" section exists in the investor document (Epic 4) and pitch deck (Epic 5) showcasing collected LOIs, estimated pipeline volume, and client profiles (without revealing proprietary contact details to competitors)

### NonFunctional Requirements

- NFR1: Pages load in under 3 seconds on Venezuelan 4G (Lighthouse throttled 4G profile)
- NFR2: Largest Contentful Paint (LCP) under 2.5 seconds
- NFR3: Total page weight does not exceed 500KB per page
- NFR4: Lighthouse Performance score 90 or above
- NFR5: Cumulative Layout Shift (CLS) under 0.1
- NFR6: First Contentful Paint (FCP) under 1.5 seconds
- NFR7: All pages served over HTTPS with valid SSL certificate
- NFR8: Form submissions protected against spam with less than 1% spam reaching inbox
- NFR9: No sensitive business data accessible via website, source code, or API routes
- NFR10: Contact form data transmitted securely and not stored in browser-accessible locations
- NFR11: WCAG 2.1 Level AA compliance (color contrast, alt text, keyboard nav, heading hierarchy)
- NFR12: All interactive elements have visible focus indicators
- NFR13: WhatsApp click-to-chat links open correctly on mobile (native app) and desktop (WhatsApp Web)
- NFR14: Form submission emails deliver within 5 minutes via transactional email service
- NFR15: Failed email deliveries trigger fallback notification and backup logging to Google Sheets
- NFR16: Google Business Profile linked and reflects accurate business information
- NFR17: 99.9% uptime via static hosting on global CDN
- NFR18: Site displays fallback contact information when any external integration is temporarily unavailable
- NFR19: Analytics infrastructure (GA4) tracking page views, form submissions by type, language toggle usage, and WhatsApp click-through rates

### Additional Requirements

**From Architecture:**
- Astro 6.0.8 (pinned) as framework with Node 22 engine lock (ADR-001)
- Google Forms hidden POST with branded confirmation UX for zero backend code (ADR-002)
- 100% static output with zero serverless functions (ADR-005)
- Hybrid content architecture: JSON for UI strings + markdown for page body (ADR-006)
- Components receive text as props, never import content directly (ADR-007)
- Website, investor document, and printed materials are architecturally independent deliverables (ADR-008)
- Brand kit source of truth defined in standalone file before implementation (ADR-009)
- All dependency versions pinned exactly (no caret ranges), package-lock.json committed
- Bilingual content changes must be in same commit (workflow rule)
- Image optimization: Astro Image component, quality=70, eager hero, lazy rest, CSS placeholder
- GA4 inline in BaseLayout with custom events: form_submit, whatsapp_click, language_toggle
- Starter initialization: npm create astro@latest with minimal template + tailwind + sitemap + vercel integrations
- Google Sheets as primary data store, email as notification layer (dual-write)
- Honeypot fields + time-based bot check for spam protection (no CAPTCHA)

**From UX Design:**
- Print-first, WhatsApp-connected, website-backed priority hierarchy
- Bottom tab bar (not hamburger) for mobile navigation (4 always-visible tabs)
- Photo-first homepage with operational status indicator (kettle timeline)
- System fonts only (no Google Fonts) -- saves 200-400ms
- Real plant photos only (no stock imagery), phone quality acceptable
- DocSend delivery for investor document with engagement tracking
- Context-aware WhatsApp pre-fills per page (different messages for galvanizing vs copper vs general)
- Physical form factor differentiation for meeting kit (bound investor doc, folded sales kit, colored copper sheet)
- Open Graph meta tags optimized for LinkedIn/Slack unfurls on English pages
- "Real Over Polished" design principle -- authentic photos, named people, verifiable address/RIF
- Operational status indicator on homepage showing kettle timeline (3m active, 7m Q2 2026, 9m 2027)
- Coverage map (simple SVG) showing geographic advantage over ALF in Valencia
- Ing. Miriam's story as trust differentiator on Quality and Safety page

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 7 | Spanish default language |
| FR2 | Epic 7 | English language toggle |
| FR3 | Epic 7 | Galvanizing service specs |
| FR4 | Epic 7 | Copper rod product specs |
| FR5 | Epic 7 | Equipment manufacturer references |
| FR6 | Epic 7 | Company info on all pages |
| FR6b | Epic 7 | Facility photographs |
| FR6c | Epic 7 | Max workpiece dimensions |
| FR6d | Epic 7 | HSE commitment statement |
| FR6e | Epic 7 | Capability statement PDF download |
| FR7 | Epic 8 | WhatsApp click-to-chat |
| FR8 | Epic 8 | Structured quote flows |
| FR9 | Epic 8 | File attachment support |
| FR10 | Epic 8 | Persistent footer contact info |
| FR10b | Epic 8 | Form confirmation pages |
| FR10c | Epic 8 | Automatic confirmation emails |
| FR11 | Epic 7 | Partnership Opportunities section |
| FR12 | Epic 7 | Partnership inquiry form |
| FR13 | Epic 8 | Notification type separation |
| FR14 | Epic 8 | Quote request email notification |
| FR15 | Epic 8 | Partnership inquiry email notification |
| FR16 | Epic 8 | Notification type identification |
| FR17 | Epic 7 | Code-level content updates |
| FR17b | Epic 7 | Privacy policy page |
| FR18 | Epic 7 | Search engine indexability |
| FR19 | Epic 7 | LocalBusiness structured data |
| FR20 | Epic 7 | Language-specific URLs + hreflang |
| FR21 | Epic 7 | Google Business Profile |
| FR22 | Epic 7 | Mobile bottom tab bar |
| FR23 | Epic 7 | WhatsApp button placement |
| FR24 | Epic 7 | Mobile form usability |
| FR24b | Epic 7 | Human-reviewed bilingual translations |
| FR25 | Epic 4 | Investor document structure |
| FR26 | Epic 4 | Bilingual separate versions |
| FR27 | Epic 4 | Ing. Miriam review process |
| FR28 | Epic 4, 8 | Never published on website |
| FR29 | Epic 4 | International investor concerns |
| FR30 | Epic 4 | Version control + update process |
| FR31 | Epic 4 | Professional typography + data viz |
| FR32 | Epic 3 | Printed meeting kit |
| FR33 | Epic 8 | WhatsApp Business profile config |
| FR34 | Epic 8 | Domain redirect for WhatsApp |
| FR35 | Epic 5 | Pitch deck (domestic) |
| FR36 | Epic 6 | Bank-ready documentation |
| FR37 | Epic 2 | Replacement cost valuation |
| FR38 | Epic 2 | Multi-scenario financial projections |
| FR39 | Epic 5 | International investor pitch deck |
| FR40 | Epic 0 | LOIs / written purchase commitments from clients |
| FR41 | Epic 0 | Contact reports per outreach target |
| FR42 | Epic 0, 4, 5 | Confirmed Demand section in investor doc and pitch deck |

NFRs (NFR1-NFR19) are cross-cutting -- addressed within Epic 1 (foundation), Epic 7 (performance, accessibility, security, SEO), and Epic 8 (integration, reliability, analytics).

## Priority Scoring Matrix

Epics ranked by weighted score: Revenue Impact (30%), Time to Deliver (25%), Dependency Risk (20%), Effort (15%), Strategic Leverage (10%).

| Rank | Epic | Score | Rationale |
|---|---|---|---|
| 0 | Epic 0: Commercial Outreach & Demand Validation | 9.50 | Zero cost, starts today, strengthens EVERY capital-raising document. LOIs convert projections into proof. |
| 1 | Epic 2: Financial Projections & Replacement Cost | 8.65 | No dependencies, fast, feeds 3 epics. THE seed. |
| 2 | Epic 5: Pitch Deck | 8.00 | The hook. Reused 50+ times. Highest strategic leverage. |
| 3 | Epic 3: Printed Materials | 7.00 | Only needs brand kit. Works before website exists. |
| 4 | Epic 4: Investor Document | 6.85 | The deep dive. Unlocks capital. High effort but highest single-epic revenue impact. |
| 5 | Epic 6: Bank Package | 6.55 | Opens debt path for zinc. Sir keeps equity. |
| 6 | Epic 8: WhatsApp & Comms | 6.05 | WhatsApp IS the platform. Blocked by website. |
| 7 | Epic 1: Foundation & Brand | 5.95 | Enabler. No direct revenue but unblocks everything. |
| 8 | Epic 7: Website Core | 4.95 | Credibility layer, not sales engine. Highest effort. |

## Epic List

### Epic 0: Commercial Outreach & Demand Validation (ZERO COST, START IMMEDIATELY)

Sir contacts the 6 confirmed-interest historical clients -- 3 of which are in Zona Industrial I (walking distance) -- to collect Letters of Intent or written purchase commitments. These LOIs become proof of demand embedded in the investor document, pitch deck, and bank package. This epic costs $0 and transforms every subsequent capital-raising deliverable from "we project demand" to "we HAVE buyers waiting."

**FRs covered:** FR40, FR41, FR42
**Priority score:** 9.50 -- Highest score. Zero cost, zero dependencies, starts today, massively strengthens every capital-raising document.
**Dependencies:** None. Can begin before any other epic.

**Tier 1 Targets (Zona Industrial I -- walking distance):**

| Company | Sector | Est. Volume | Why First |
|---|---|---|---|
| SASGO | Electrical poles & towers | HIGH | Same complex. Active CORPOELEC contracts. |
| Industrias Marullo | Agroindustrial machinery | HIGH | Same complex. Founded 1955. Very active Mar 2026. |
| GEDISA | Electrical distributor | MEDIUM | Same zone. Just reopened Jan 2026. |

**Tier 2 Targets (confirmed interest, requires calls/travel):**

| Company | Sector | Est. Volume | Approach |
|---|---|---|---|
| Freyssinet/Geoquest | Geotechnical (VINCI subsidiary) | HIGH | Call + Caracas visit |
| DISMACA | EPC/O&G | MEDIUM | Partnership framing (overflow capacity) |
| CORPOELEC Lara | National electric utility | HIGH | Warehouse visit -- same zone |

**Deliverables per client:**
- Contact report (FR41): who, what they need, estimated monthly volume, timeline, conditions
- LOI or written commitment (FR40): signed letter, WhatsApp screenshot, or email confirmation
- These feed into Epic 4 (Investor Doc "Confirmed Demand" section) and Epic 5 (Pitch Deck "Clients Ready to Order" slide)

**What an LOI looks like in Venezuelan B2B:**
- Formal: Signed letter on company letterhead stating intent to purchase X tons/month of galvanizing services upon PYGLARA reactivation
- Informal (equally valid for pitch purposes): WhatsApp message from purchasing manager confirming "we would send you X tons/month if you're operational"
- Either format works. The point is DOCUMENTED demand from REAL companies.

**Why this changes everything:**
- Bank meeting: "We have 3 signed LOIs totaling 120 TM/month" vs "We think we can sell 300 TM/month"
- Investor meeting: "SASGO, Marullo, and CORPOELEC are waiting for us to reactivate" vs "There are potential clients in the area"
- Pitch deck Slide 8: Company logos + "Confirmed pipeline: 120+ TM/month before plant restart"

**Ing. Miriam parallel-review strategy (applies to Epic 4):**
Rather than sending Miriam the full 35-page investor document for review at once, send sections incrementally as they're written:
- Week 1: Technical specs section (she can validate in 1-2 days -- she already gave us the data)
- Week 2: Financial projections section (she confirmed the numbers in the formulario)
- Week 3: Full draft for final read-through (she's already seen 60% of it)
This converts a 1-2 week blocking review into parallel 2-day incremental reviews.

#### Story 0.1: Kit de Ventas y Plantillas (Sales Toolkit & Templates)
**As a** commercial representative visiting potential clients,
**I want** a complete sales toolkit with talking points, templates, and forms in Spanish,
**so that** every client visit follows a consistent professional process and produces documented commitments.

**Deliverables:**
- Guion de Visita (Sales Script) -- Spanish talking points, objection handling, key value propositions per client type
- Ficha de Contacto (Contact Report Form) -- structured form to fill during/after each visit (FR41)
- Carta de Intencion (Formal LOI Template) -- letter on company letterhead for client signature (FR40)
- Modelo WhatsApp (Informal LOI Template) -- pre-written message the client can send via WhatsApp as commitment (FR40)
- Matriz de Prioridad (Visit Priority Matrix) -- which clients to visit first, why, and what to emphasize with each

**Acceptance Criteria:**
1. All documents in Spanish
2. Sales script covers galvanizing services AND copper ground rods
3. Contact report captures: company name, contact person, RIF, sector, galvanizing needs, estimated monthly TM, timeline for first order, conditions/requirements, follow-up actions
4. LOI template is simple enough that a purchasing manager signs it on the spot
5. WhatsApp template is copy-paste ready for the client to send
6. Visit priority matrix includes all 6 confirmed-interest targets + CORPOELEC Lara

#### Story 0.2: SASGO Outreach
**As a** commercial representative,
**I want** to visit SASGO (same complex, Zona Industrial I) and collect a contact report and LOI,
**so that** we have documented demand from the highest-volume Tier 1 prospect.

**Target:** Suministros Electricos SASGO, C.A. | RIF: J-31248868-9 | Tel: +58 251-237-1610 / +58 412-536-3346 | importacion@sasgo.com.ve
**Sector:** Electrical poles & towers, active CORPOELEC contracts
**Expected volume:** HIGH
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.3: Industrias Marullo Outreach
**As a** commercial representative,
**I want** to visit Industrias Marullo (same complex, Zona Industrial I) and collect a contact report and LOI,
**so that** we have documented demand from a 70-year-old industrial manufacturer.

**Target:** Industrias Marullo, S.A. | RIF: J-07504626-9 | Tel: +58 424-514-3859 / +58 251-237-2203 | marullo@hotmail.com
**Sector:** Agroindustrial machinery & steel structures
**Expected volume:** HIGH
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.4: GEDISA Outreach
**As a** commercial representative,
**I want** to visit GEDISA (same zone, Zona Industrial I) and collect a contact report and LOI,
**so that** we have documented demand from a recently reactivated 60-year electrical distributor.

**Target:** General Distribuidora, S.A. (GEDISA) | RIF: J-00046849-4 | Tel: +58 251-237-0193 / +58 414-503-2546 | gedisa@gedisa.com.ve
**Sector:** Electrical distribution
**Expected volume:** MEDIUM
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.5: CORPOELEC Lara Outreach
**As a** commercial representative,
**I want** to visit the CORPOELEC Lara warehouse (same zone, Zona Industrial I) and collect a contact report and LOI,
**so that** we have documented demand from the national electric utility with historical ground rod purchase data.

**Target:** CORPOELEC Lara | Almacen N01, Zona Industrial I, C.16, Bqto | Tel: 0251-239-4050
**Sector:** National electric utility
**Expected volume:** HIGH
**Key talking point:** ENELVEN (now CORPOELEC Zulia) bought 20,000 copper ground rods from PYGLARA in 2004-2005 (~$168K)
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.6: Freyssinet/Geoquest Outreach
**As a** commercial representative,
**I want** to contact Freyssinet/Geoquest Venezuela (VINCI subsidiary) by phone and schedule a Caracas visit to collect a contact report and LOI,
**so that** we have documented demand from a multinational geotechnical company.

**Target:** Freyssinet / Geoquest Venezuela | RIF: J-00133672-9 | Tel: +58 212-238-8285 / +58 414-133-0406 | consultas@tierra-armada.com.ve | Contact: Ramon Paz Besada (Dir. Gral.)
**Sector:** Geotechnical retaining walls (VINCI Group)
**Expected volume:** HIGH
**Approach:** Phone call first, then Caracas visit
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.7: DISMACA Outreach
**As a** commercial representative,
**I want** to contact DISMACA and propose a partnership/overflow capacity arrangement,
**so that** we have documented demand from an EPC company with its own galvanizing that needs overflow capacity.

**Target:** DISMACA | RIF: J-40468528-6 | Tel: +58 426-580-0942 | dismaca@dismaca.com | Contact: Christian Villegas (Purchasing Mgr)
**Sector:** EPC/O&G, Barcelona, Anzoategui
**Expected volume:** MEDIUM
**Approach:** Partnership framing -- overflow capacity partner, not competitor
**Deliverables:** Completed contact report + signed LOI or WhatsApp commitment

#### Story 0.8: Compile Confirmed Demand Package
**As a** commercial representative preparing investor materials,
**I want** to aggregate all collected LOIs and contact reports into a "Confirmed Demand" section,
**so that** Epic 4 (Investor Document) and Epic 5 (Pitch Deck) can showcase real, documented client commitments.

**Deliverables:**
- Summary table: company name, sector, committed volume (TM/month), LOI type (formal/WhatsApp)
- Total confirmed pipeline in TM/month
- Client logos (with permission) for pitch deck
- Anonymized version for public materials (no proprietary contact details)
- Feed into FR42 (Confirmed Demand section)

### Epic 1: Project Foundation & Brand Kit
Establish the shared brand identity, domain, and development environment so all deliverable tracks work from one consistent visual foundation.
**FRs covered:** Architectural prerequisites (ADR-001, ADR-009)
**Priority score:** 5.95 -- Enabler epic, no direct revenue, but unblocks all other work.
**Dependencies:** None.
**User outcome:** Brand kit locked, domain secured, Astro project initialized, all tracks can begin visual work.

#### Story 1.1: Brand Kit Definition
**As a** project owner establishing visual identity,
**I want** a complete brand kit document defining PYGLARA's visual language,
**so that** all deliverables (website, pitch deck, investor doc, printed materials) share consistent branding.

**Format:** Brand kit document (markdown) + Canva Brand Kit configuration
**Deliverables:**
- Primary and secondary color palette with hex codes (industrial: dark charcoal, copper/bronze accent, zinc silver, safety yellow)
- Typography: system font stack for web, professional fonts for print/Canva (suggested: Montserrat headings, Open Sans body)
- Logo usage rules (if logo exists) or text-mark specification
- Photography guidelines: real plant photos only, no stock imagery, phone quality acceptable
- Tone: "Real Over Polished" -- authentic, industrial, verifiable
- Color validation: tested on budget Android phone screen, outdoor sunlight, B&W grayscale print

**Acceptance Criteria:**
1. Colors pass WCAG 2.1 AA contrast ratio (4.5:1 body text, 3:1 large text)
2. Brand kit works in B&W (grayscale printed materials requirement from FR32)
3. Canva Brand Kit configured with colors, fonts, and logo
4. Tailwind @theme tokens defined (for future website Epic 7)
5. At least 5 real plant photos selected and optimized

#### Story 1.2: Domain Registration & Digital Setup
**As a** project owner,
**I want** the pyglara.com domain secured and digital accounts established,
**so that** the website, email, and WhatsApp all point to a professional, owned domain.

**Deliverables:**
- Domain registered: pyglara.com (+ pyglarasa.com variant), 2+ year registration, non-Venezuelan payment method
- Google Workspace or business email configured: info@pyglara.com
- Google Analytics (GA4) property created
- Google Business Profile claimed and verified
- WhatsApp Business account configured with business profile

**Acceptance Criteria:**
1. Domain resolves (even if to parking page initially)
2. Business email sends/receives
3. GA4 measurement ID available for website implementation
4. Google Business Profile shows correct address, phone, hours

#### Story 1.3: Astro Project Initialization
**As a** developer setting up the website codebase,
**I want** the Astro 6.0.8 project initialized with all integrations pinned,
**so that** Epic 7 (Website) has a clean, ready-to-build foundation.

**Deliverables:**
- Astro 6.0.8 project initialized with minimal template
- Integrations added: Tailwind CSS v4 (Vite plugin), @astrojs/sitemap, @astrojs/vercel
- Dependencies added: resend, googleapis
- All versions pinned exactly (no ^ ranges), package-lock.json committed
- Node 22 engine lock in package.json
- Brand kit @theme tokens in src/styles/global.css
- BaseLayout with system font stack, GA4 inline script
- Bilingual routing configured: defaultLocale 'es', locales ['es', 'en']
- Content architecture: ui.json (UI strings) + markdown (page body) per ADR-006/007
- Deployed to Vercel (blank site, proves pipeline works)

**Acceptance Criteria:**
1. `astro build && astro preview` succeeds with zero errors
2. Deployed to Vercel, accessible via domain
3. All dependency versions pinned exactly
4. Bilingual routes work (/es/, /en/)
5. GA4 fires page_view event

### Epic 2: Financial Projections & Replacement Cost Valuation (CRITICAL PATH)
Multi-scenario financial projections and a replacement cost valuation proving PYGLARA's $1M asking price is 50-60% below the $2M-$2.5M it would cost to build from scratch. Break-even analysis, ROI timelines, capital deployment waterfalls. This epic produces the numerical foundation consumed by Epics 4, 5, and 6.
**FRs covered:** FR37, FR38
**Priority score:** 8.65 -- Highest score. No dependencies, fast to produce, feeds 3 other epics.
**Dependencies:** None.
**User outcome:** Three projection scenarios (conservative/moderate/aggressive) with charts. Replacement cost headline: land ($691K-$990K) + Pilling kettles ($800K+) + copper line ($100K+) + installation = $2M-$2.5M+ vs $1M asking price. THE number for every investor conversation.

#### Story 2.1: Replacement Cost Valuation
**As a** commercial representative presenting to investors and banks,
**I want** a detailed replacement cost valuation showing what it would cost to build PYGLARA from zero today,
**so that** investors and banks immediately see the $1M asking price is 50-60% below replacement value.

**Deliverables:**
- Line-item replacement cost breakdown: land acquisition, warehouse construction (~3,640 m2), Pilling kettle procurement (7m + 9m), copper line equipment, installation, permitting, regulatory compliance
- Market comps for each category with sources
- Summary headline: replacement cost vs asking price
- Formatted for direct inclusion in Epic 4 (Investor Document) and Epic 6 (Bank Package)

**Acceptance Criteria:**
1. Every cost line has a source or market reference
2. Land valued using documented market comps ($190-$272/m2)
3. Pilling kettle replacement costs based on manufacturer pricing or comparable industrial equipment
4. Total replacement cost clearly exceeds $2M
5. Document usable standalone and as a section in the investor document

#### Story 2.2: Multi-Scenario Financial Projections
**As a** commercial representative presenting to investors and banks,
**I want** three financial projection scenarios with break-even analysis, ROI timelines, and capital deployment waterfalls,
**so that** investors can evaluate returns under conservative, moderate, and aggressive assumptions.

**Scenarios:**
- (a) Conservative: 300 TM/month, 30% margin, 7m kettle only
- (b) Moderate: 300 TM/month galvanizing + copper line at capacity (936 rods/day)
- (c) Aggressive: All kettles at capacity (~9,000 TM/year galvanizing) + copper at full capacity (280,800 rods/year)

**Deliverables:**
- Per-scenario P&L projection (Year 1-5)
- Break-even analysis per scenario (months to break-even)
- ROI timeline per scenario
- Capital deployment waterfall (phased investment schedule)
- Key assumptions table
- Formatted for direct inclusion in Epic 4 (Investor Document), Epic 5 (Pitch Deck), and Epic 6 (Bank Package)

**Acceptance Criteria:**
1. Uses 30% regulated margin as base case (Ley de Precios Justos compliance)
2. Variable cost per ton uses $345 from CLAUDE.md
3. Fixed costs use $5,600/month from CLAUDE.md
4. Zinc costs use $4,220/TM delivered from CLAUDE.md
5. No double-counting of cost categories
6. All three scenarios clearly differentiated with assumptions stated
7. Break-even expressed in months from first production
8. Capital deployment waterfall matches phased startup plan from CLAUDE.md

### Epic 3: Printed Materials & Meeting Kit
A physical meeting kit: one-page capability statement (bilingual), 3-page sales kit with WhatsApp QR, copper rod spec sheet. Print-optimized for Carta paper, readable in grayscale. Distinct form factors for quick access.
**FRs covered:** FR32
**Priority score:** 7.00 -- Only needs brand kit. Works before website exists.
**Dependencies:** Epic 1 (brand kit).
**User outcome:** Sir carries a designed system of printed assets to every meeting. Each piece works standalone. WhatsApp QR means it works without a website.

#### Story 3.1: One-Page Capability Statement (Bilingual)
**As a** commercial representative handing materials to a potential client or partner,
**I want** a professional one-page capability statement in both Spanish and English,
**so that** anyone can understand PYGLARA's services, capacity, and contact info at a glance.

**Format:** Canva-designed PDF, print-optimized for Carta paper (216x279mm), readable in B&W grayscale
**Content (one side per language, or two separate sheets):**
- Company name, RIF, address, phone, WhatsApp, email
- Services: Hot-dip galvanizing (kettle dimensions, capacity) + Copper ground rods (specs, capacity)
- Equipment: Pilling kettles (Germany), key specs per kettle
- Quality: COVENIN 1212-81, ASTM A123, ASTM A153, per-lot certificates
- Capacity: 1,440 TM/month installed, 936 rods/day copper
- WhatsApp QR code (links to wa.me with pre-filled message)
- Operational status: 3.5m active, 7m Q2 2026, 9m 2027

**Acceptance Criteria:**
1. Fits on one Carta-size page per language
2. Readable when printed in grayscale (no color-dependent info)
3. WhatsApp QR code scans correctly to +58 424 571 5349
4. No pricing information (Ley de Precios Justos compliance)
5. Real plant photo included (not stock)
6. Designed in Canva with brand kit colors/fonts

#### Story 3.2: Three-Page Sales Kit
**As a** commercial representative at a client meeting or trade event,
**I want** a 3-page sales kit that explains PYGLARA's value proposition with visuals,
**so that** clients understand why to galvanize with us and what we can handle.

**Format:** Canva-designed PDF, tri-fold or 3 separate pages, Carta paper, B&W compatible
**Content:**
- Page 1: Company overview, 50-year history, Ing. Miriam (trust signal), only 2 active galvanizers in Venezuela
- Page 2: Services detail -- galvanizing process explained simply, kettle sizes with max workpiece dimensions, turnaround times, quality certification process
- Page 3: Why PYGLARA -- geographic advantage (coverage map), Pilling equipment, capacity headroom, client sectors served, WhatsApp QR + all contact info

**Acceptance Criteria:**
1. 3 pages, Carta paper, print-ready
2. Readable in B&W grayscale
3. Includes at least 3 real plant photos
4. WhatsApp QR on every page
5. No pricing (zero-price culture + regulatory)
6. Physical form factor: designed to be folded (distinct from capability statement)

#### Story 3.3: Copper Ground Rod Spec Sheet
**As a** commercial representative selling copper ground rods to electrical companies,
**I want** a one-page technical spec sheet for copper-clad ground rods,
**so that** electrical engineers and purchasing managers have the specs they need to place an order.

**Format:** Canva-designed PDF, one page, Carta paper, B&W compatible
**Content:**
- Product: Copper electroplated ground rods (Copperweld-type)
- Available diameters: 5/8", 3/4", 1"
- Available lengths: 1.2m, 1.8m, 2.4m, 3.0m
- Copper coating thickness: 300 um +/- 50
- Steel core: AISI/SAE C1045, cold-drawn
- Standards compliance: UL 467 reference, COVENIN
- Production capacity: 936 units/day (continuous 24hr cycle)
- Applications: electrical grounding, telecommunications, lightning protection
- "Zero domestic competitors" differentiator
- Historical reference: 20,000 units sold to ENELVEN/CORPOELEC 2004-2005
- WhatsApp QR + contact info

**Acceptance Criteria:**
1. One page, Carta paper, print-ready
2. Technical specs accurate per Ing. Miriam's data
3. Printed on colored paper (e.g., copper/salmon) to physically differentiate from other kit pieces (UX spec requirement)
4. WhatsApp QR code present
5. No per-unit pricing

### Epic 4: Investor Document (Bilingual Offline PDF) -- The Deep Dive
A 25-35 page investor-grade document in both Spanish and English. Consumes Epic 2's financial projections and Epic 0's LOIs. Professional typography, data visualizations, plant photography. Reviewed and signed off by Ing. Miriam. Distributed via DocSend with engagement tracking.
**FRs covered:** FR25, FR26, FR27, FR28, FR29, FR30, FR31, FR42
**Priority score:** 6.85 -- Highest single-epic revenue impact (unlocks capital).
**Dependencies:** Epic 1 (brand kit), Epic 2 (financial projections). Epic 0 LOIs feed into Story 4.5.

#### Story 4.1: Investor Document Structure & Design Template
**As a** document designer,
**I want** the investor document's master template created in Canva with section layouts, typography, and visual style,
**so that** all content sections can be dropped into a consistent, professional design.

**Format:** Canva document template, 25-35 pages
**Design specifications (from UX spec):**
- Professional typography: serif headings, sans-serif body
- Data visualizations: charts, tables with brand colors
- Full-bleed plant photography on section dividers
- Version number and date on cover + footer (FR30)
- Dark cover page with copper/bronze accent
- Clean margin system for print + screen reading
- Page numbers, table of contents

**Section order (FR25 specified order):**
1. Cover page (company name, tagline, version, date, confidentiality notice)
2. Executive Summary (2 pages -- also exists as standalone, Story 4.2)
3. Financial Projections & ROI (from Epic 2, Story 4.3)
4. Plant Capabilities & Equipment (Story 4.4)
5. Market Thesis & Opportunity (Story 4.5)
6. Confirmed Demand & Client Pipeline (from Epic 0, Story 4.6)
7. Competitive Landscape (Story 4.7)
8. Deal Structure & Terms (Story 4.8)
9. Risk Analysis & Mitigation (Story 4.9)
10. International Considerations: OFAC, USD repatriation, Venezuelan corporate governance (Story 4.9)
11. Appendices: historical P&L, equipment photos, quality certifications, team bios (Story 4.10)

**Acceptance Criteria:**
1. Canva template with placeholder content for all 11 sections
2. Consistent header/footer/page numbering
3. Minimum 3 data visualization placeholders (charts/graphs)
4. Photography placeholders sized for real plant photos
5. Both ES and EN versions use same template (content differs)
6. Confidentiality notice on cover: "This document is confidential and intended solely for the recipient"

#### Story 4.2: Executive Summary (2-Page Standalone)
**As an** investor receiving PYGLARA materials for the first time,
**I want** a 2-page executive summary that captures the entire opportunity,
**so that** I can decide in 3 minutes whether to read the full document.

**Format:** Canva-designed PDF, 2 pages, exists both inside the investor doc AND as a standalone handout
**Content:**
- The opportunity: $1M for a 50-year industrial plant with $2.2M+ replacement value
- Market timing: Venezuela oil sector reopening, $183B capex through 2040
- Plant capabilities: 4 Pilling kettles, 1,440 TM/month installed, copper line (zero domestic competitors)
- Financial snapshot: Scenario A headline numbers (300 TM/month, $171K/month profit, 7.4-month payback)
- Confirmed demand: LOI count + total pipeline TM/month (from Epic 0)
- The ask: $1M acquisition + $336K startup = operational in 3 months
- Contact info + "next step: schedule a plant visit"

**Acceptance Criteria:**
1. Exactly 2 pages
2. Contains all headline numbers from Epic 2
3. Works standalone (given to someone who won't read the full doc)
4. Bilingual: ES and EN versions
5. No sensitive data that shouldn't be shared early in qualification

#### Story 4.3: Financial Projections Section
**As an** investor evaluating the deal,
**I want** professionally formatted financial projections with charts and tables,
**so that** I can assess ROI under different scenarios.

**Format:** 4-6 pages within investor document
**Content (sourced from Epic 2 deliverables):**
- Replacement cost valuation summary with visual breakdown (bar chart or waterfall)
- 3-scenario comparison table (Conservative/Moderate/Aggressive)
- Capital deployment waterfall (phased investment chart)
- Break-even analysis visualization
- 5-year projection summary per scenario
- Key assumptions table
- Risk-adjusted returns note

**Acceptance Criteria:**
1. All numbers match Epic 2 deliverables exactly (no rounding errors)
2. At least 3 data visualizations (charts/graphs, not just tables)
3. Uses 30% regulated margin as base case
4. No double-counting of cost categories
5. Capital deployment waterfall clearly shows phased approach

#### Story 4.4: Plant Capabilities & Equipment Section
**As an** investor or banker assessing physical assets,
**I want** a detailed section showing the plant's equipment, capacity, and condition,
**so that** I can verify the asset base justifies the valuation.

**Format:** 4-6 pages within investor document
**Content:**
- Plant overview: location, total area (3,640 m2), 2 warehouses
- Equipment inventory with photos:
  - 7m Pilling kettle (installed, burners verified, awaiting zinc)
  - 9m Pilling kettle (pending install, valued $570K)
  - 3.5m kettle (active for small work)
  - 65cm centrifuge (active, galvanizing nails)
  - Copper electroplating line (6 rectifiers, 10 tanks)
  - Overhead cranes (2x, 2-5 TM), forklifts (3x Clark)
- Capacity breakdown per kettle with max workpiece dimensions
- Quality certifications: COVENIN 1212-81, ASTM A123, ASTM A153
- Maintenance status and pre-startup requirements ($25K-$50K)
- Ing. Miriam bio (36 years, institutional knowledge as asset)
- Real plant photographs (minimum 6)

**Acceptance Criteria:**
1. Every piece of equipment listed with current condition
2. Minimum 6 real plant photos
3. Capacity figures match CLAUDE.md (1,440 TM/month installed, 300 TM best actual, 936 rods/day copper)
4. Maintenance estimates match CLAUDE.md ($25K-$50K)
5. Ing. Miriam presented as key human asset (not just employee)

#### Story 4.5: Market Thesis & Opportunity Section
**As an** investor evaluating market timing,
**I want** a compelling market analysis showing why NOW is the right time to invest in Venezuelan galvanizing,
**so that** I understand the macro tailwinds driving demand.

**Format:** 3-4 pages within investor document
**Content:**
- Venezuela oil sector reopening (post-January 2026)
- Rystad Energy $183B capex projection through 2040
- Fabrication & construction as #1 service segment ($41B)
- PDVSA pipeline infrastructure (50 years without updates)
- Only 2 active galvanizers in all of Venezuela
- Zero domestic competitors for copper ground rods
- Electrical infrastructure modernization (CORPOELEC)
- Geographic advantage: Barquisimeto covers centro-occidente
- Coverage map (simple visual showing PYGLARA vs competitor in Valencia)

**Acceptance Criteria:**
1. Rystad Energy data cited with source
2. Competitor count accurate (2 active, verified March 2026)
3. Geographic advantage visualized (map or infographic)
4. No speculative claims without data backing
5. Bilingual versions use same data, localized language

#### Story 4.6: Confirmed Demand Section
**As an** investor assessing whether there are real buyers,
**I want** a section showcasing actual LOIs and client commitments,
**so that** I see proof of demand, not just projections.

**Format:** 2-3 pages within investor document
**Content (sourced from Epic 0, Story 0.8):**
- Summary table: company name (with permission), sector, committed volume TM/month, LOI type
- Total confirmed pipeline headline: "X TM/month committed before plant restart"
- Client profile cards (company, sector, history with PYGLARA, why they want to return)
- Client logos (with permission)
- Anonymized version available for wider distribution
- Quote from at least one client (if permission granted)

**Acceptance Criteria:**
1. Minimum 3 LOIs referenced (FR40 requirement)
2. Total pipeline volume calculated and displayed
3. No proprietary contact details (phone, email) in the document
4. Each LOI type identified (formal letter, WhatsApp, email)
5. Feeds FR42 (Confirmed Demand in investor doc)

**Note:** This section is populated AFTER Epic 0 field work produces LOIs. Can be placeholder initially.

#### Story 4.7: Competitive Landscape & SWOT Section
**As an** investor comparing PYGLARA to alternatives,
**I want** an honest competitive analysis and SWOT,
**so that** I understand PYGLARA's positioning and risks.

**Format:** 2-3 pages within investor document
**Content:**
- Competitive landscape: only 2 active galvanizers in Venezuela, all others in installation phase
- Competitor comparison (if data available): location, capacity, equipment, client base
- PYGLARA advantages: Pilling kettles, copper monopoly, 50-year history, location, Ing. Miriam
- SWOT matrix (visual format):
  - Strengths: equipment, location, history, monopoly in copper, Ing. Miriam
  - Weaknesses: requires capital restart, no recent continuous operation (since 2015)
  - Opportunities: oil sector reopening, infrastructure investment, zero copper rod competition
  - Threats: zinc price volatility, regulatory changes, new entrants
- Barrier to entry analysis: why a new competitor can't easily replicate PYGLARA

**Acceptance Criteria:**
1. SWOT presented as visual matrix (not paragraph text)
2. Competitor data accurate per CLAUDE.md (2 active)
3. Weaknesses honestly stated (builds credibility)
4. Barrier to entry quantified (replacement cost, lead times, Pilling relationship)

#### Story 4.8: Deal Structure & Terms Section
**As an** investor ready to discuss terms,
**I want** a clear deal structure section,
**so that** I understand what I'm buying, the price, and how the transaction works.

**Format:** 2-3 pages within investor document
**Content:**
- Asking price: $1,000,000 USD (price negotiable)
- What's included: 100% equity, 2 warehouses (clean title), all equipment, brand, client relationships, active permits
- Legal entity: Sociedad Anonima, 100% Venezuelan capital
- Current shareholders: Francisco Ballesteros Zamorano (84%) & Nelly Alvarado de Ballesteros (16%)
- Known liabilities: PDVSA Gas payable (amount TBD)
- Startup capital required: $336K minimum (zinc + chemicals + gas)
- Phased investment option (per capital deployment waterfall)
- Venezuelan corporate governance overview
- Due diligence checklist: what buyer should verify
- Transaction timeline: LOI > due diligence > closing > zinc order > 3 months to production

**Acceptance Criteria:**
1. Price clearly stated with "negotiable" qualifier
2. Known liabilities disclosed (PDVSA Gas payable)
3. Startup capital separate from acquisition price
4. Legal structure accurately described
5. Transaction timeline realistic (3-6 months to close + 3 months to production)

#### Story 4.9: Risk Analysis, OFAC & International Considerations
**As an** international investor (Miami/Houston family office),
**I want** a section addressing Venezuela-specific risks and compliance,
**so that** my legal team can evaluate whether this investment is viable.

**Format:** 3-4 pages within investor document
**Content:**
- Political/regulatory risk assessment (post-January 2026 context)
- OFAC compliance: General License 50A framework, what activities are permitted
- USD repatriation: BOD (Banco de Desarrollo) exchange mechanism
- Venezuelan corporate governance: Sociedad Anonima structure, minority protections
- Currency risk: USD-equivalent pricing model, how revenue is denominated
- Operational risks: zinc supply, utilities, labor, security
- Mitigation strategies for each risk category
- Legal counsel recommendation: "consult with Venezuela-experienced counsel"

**Acceptance Criteria:**
1. OFAC GL 50A referenced accurately (FR29)
2. BOD exchange mechanism explained (FR29)
3. Does NOT constitute legal advice (explicit disclaimer)
4. Risk/mitigation pairs presented (not just risk list)
5. Tone: honest but constructive (risks are manageable, not disqualifying)

#### Story 4.10: Appendices, Review & Finalization
**As an** investor doing deep due diligence,
**I want** appendices with supporting data and certifications,
**so that** I can verify claims in the main document.

**Format:** 5-8 pages of appendices + review process
**Content:**
- Appendix A: SENIAT-confirmed historical P&L summary (2005-2019, top years highlighted)
- Appendix B: Equipment photographs (high-resolution, labeled)
- Appendix C: Quality certification samples (COVENIN, ASTM references)
- Appendix D: Team bios (Ing. Miriam, Sir, ownership)
- Appendix E: Glossary of galvanizing terms (for non-technical investors)
- Version control: v1.0 + date on cover and footer

**Process:**
- Ing. Miriam structured review: technical specs section first, then financials, then full draft (incremental, not blocking)
- Sir final review before distribution
- DocSend upload with engagement tracking enabled

**Acceptance Criteria:**
1. P&L data matches SENIAT-confirmed figures from Ing. Miriam (FR27)
2. All photos are real plant photos, labeled with descriptions
3. Version number and date on document (FR30)
4. DocSend account created and document uploaded
5. Ing. Miriam has reviewed and approved technical sections (FR27)
6. Both ES and EN versions complete (FR26)
7. Total page count: 25-35 pages per language (FR31)

### Epic 5: Pitch Deck & Presentation Materials -- The Hook
A 15-20 slide presentation-ready pitch deck. Industrial visual identity -- dark backgrounds, copper accents, full-bleed plant photography. Domestic (Spanish) and international (English) versions. The international version adds OFAC, BOD, and risk sections for Miami/Houston family offices.
**FRs covered:** FR35, FR39, FR42
**Priority score:** 8.00 -- The hook. Reused in 50+ meetings. Highest strategic leverage.
**Dependencies:** Epic 1 (brand kit), Epic 2 (numbers). Epic 4 content feeds slide content. Epic 0 LOIs feed Slide 8.

#### Story 5.1: Pitch Deck Slide Outline & Content Draft
**As a** presenter walking into an investor meeting,
**I want** the complete slide-by-slide content written before design begins,
**so that** the narrative flow is locked and every slide has a clear purpose.

**Format:** Markdown document with slide-by-slide content
**Slide structure (15-20 slides):**

| Slide | Title | Content | Visual |
|---|---|---|---|
| 1 | Cover | PYGLARA logo/name, tagline "Venezuela's Galvanizing Powerhouse", date | Full-bleed plant photo, dark overlay |
| 2 | The Opportunity | $1M for a 50-year plant worth $2.2M+. 3 months to revenue. | Replacement cost vs asking price graphic |
| 3 | Market Timing | Venezuela oil reopening, $183B capex, PDVSA pipeline backlog | Rystad data visualization |
| 4 | The Plant | 3,640 m2, 2 warehouses, Zona Industrial I, 50 years | Aerial/exterior plant photo |
| 5 | Equipment | 4 Pilling kettles (Germany), capacity breakdown | Equipment photos with specs overlay |
| 6 | Copper Line | 936 rods/day, zero domestic competitors, $561K-$1.05M/yr potential | Copper rod product photo |
| 7 | Quality & Team | COVENIN/ASTM certifications, Ing. Miriam (36 years) | Miriam photo + certification badges |
| 8 | Confirmed Demand | LOI count, pipeline TM/month, client logos | Client logo grid + pipeline number |
| 9 | Competitive Position | Only 2 active galvanizers in Venezuela, coverage map | Map graphic |
| 10 | Financial Projections | 3-scenario comparison table, headline ROI | Chart: ROI comparison |
| 11 | Break-Even | 21 TM/month (7% of capacity), profitable from month 1 | Break-even visualization |
| 12 | Capital Deployment | Phased waterfall, each phase self-funds the next | Waterfall chart |
| 13 | Deal Structure | $1M asking, what's included, startup capital | Clean summary table |
| 14 | The Ask | What we're looking for, next steps, plant visit invitation | Bold CTA slide |
| 15 | Contact | Sir's info, WhatsApp QR, plant address | Contact card layout |

**International version adds (slides 16-18):**
| 16 | OFAC Compliance | GL 50A framework, permitted activities | Legal framework visual |
| 17 | USD Repatriation | BOD exchange mechanism, currency handling | Flow diagram |
| 18 | Risk & Mitigation | Key risks with mitigation strategies | Risk matrix |

**Acceptance Criteria:**
1. Narrative flows logically: opportunity > proof > financials > ask
2. Every slide has ONE key message (not overloaded)
3. Data points match Epic 2 deliverables exactly
4. Confirmed Demand slide has placeholder for Epic 0 LOIs
5. International slides address FR39 requirements

#### Story 5.2: Domestic Pitch Deck (Spanish, Canva)
**As a** presenter at Cowork, a bank, or a local investor meeting,
**I want** a professionally designed Spanish pitch deck in Canva,
**so that** I control the narrative in 15 minutes with polished visuals.

**Format:** Canva presentation, exportable as PDF and PPTX, 15-16 slides
**Design:**
- Dark backgrounds (charcoal/navy), copper/bronze accent color
- Full-bleed plant photography on section divider slides
- System of data visualizations: bar charts, waterfall, pie charts in brand colors
- Large typography for key numbers ($1M, $2.2M, 163% ROI, 7.4 months)
- Real photos only, no stock imagery
- Slide dimensions: 16:9 widescreen

**Acceptance Criteria:**
1. All content from Story 5.1 implemented in Canva
2. Consistent visual style across all slides
3. Exportable as PDF (for DocSend/email) and PPTX (for live presentation)
4. All data visualizations accurate and readable
5. Plant photos included (minimum 4)
6. WhatsApp QR on contact slide
7. Presentation mode works (slide transitions, no broken elements)

#### Story 5.3: International Pitch Deck (English, Canva)
**As a** presenter at a Miami/Houston family office meeting or Zoom call,
**I want** an English version of the pitch deck with OFAC/BOD/risk slides,
**so that** international investors get the same polished presentation plus their specific compliance concerns addressed.

**Format:** Canva presentation, exportable as PDF and PPTX, 18-20 slides
**Additional content beyond domestic version:**
- OFAC compliance slide (GL 50A)
- USD repatriation mechanism (BOD exchange)
- Political/regulatory risk mitigation
- Venezuelan corporate governance
- Open Graph meta optimized for LinkedIn/Slack unfurls (when PDF shared)

**Acceptance Criteria:**
1. Same design template as Spanish version (brand consistency)
2. All 18-20 slides with English content
3. OFAC/BOD/risk content accurate per FR39
4. Human-reviewed translation (not just machine-translated)
5. Exportable as PDF and PPTX
6. Tailored language for family office audience ("capital deployment", "risk-adjusted returns")

### Epic 6: Bank-Ready Documentation Package -- The Follow-Through
Complete bank application package for Venezuelan bank working capital or credit line applications (BNC, Banesco, Mercantil). Formatted for Venezuelan banking requirements.
**FRs covered:** FR36
**Priority score:** 6.55 -- Opens debt path for zinc financing. Sir keeps equity.
**Dependencies:** Epic 2 (projections + replacement cost).

#### Story 6.1: Collateral Inventory & Asset Valuation
**As a** bank credit analyst reviewing a loan application,
**I want** a formal collateral inventory with valuations,
**so that** I can assess the asset base supporting the credit request.

**Format:** Professional document (Canva or Word), 3-5 pages
**Content:**
- Real estate inventory: 2 warehouses, total area, address, clean title confirmation
- Real estate valuation: market comps ($190-$272/m2), total value range
- Equipment inventory: each kettle, copper line, cranes, forklifts with condition and estimated value
- Total asset valuation summary (from Epic 2 replacement cost)
- Photos of key assets
- Legal status: RIF, municipal license, PDVSA gas contract

**Acceptance Criteria:**
1. Every asset listed with estimated value and condition
2. Values consistent with Epic 2 replacement cost valuation
3. Clean title on properties stated explicitly
4. Known liabilities disclosed (PDVSA Gas payable)
5. Formatted for Venezuelan banking standards

#### Story 6.2: Historical P&L Summary (SENIAT-Confirmed)
**As a** bank credit analyst,
**I want** SENIAT-confirmed historical financial data,
**so that** I can assess the company's track record.

**Format:** Professional document, 2-3 pages
**Content:**
- P&L summary 2005-2019 (provided by company accountant, declared to SENIAT)
- Top 3 years highlighted:
  - 2009: $1,739,091 sales / $315,552 profit (18.1%)
  - 2012: $1,726,168 sales / $203,333 profit (11.8%)
  - 2006: $1,712,464 sales / $287,573 profit (16.8%)
- Exchange rate context for each year (Bs.F/USD)
- Explanation of 2015 shutdown (zinc supply, not financial distress)
- Best production year: 2015 (675 TM of pletinas)
- Note: figures confirmed by Ing. Miriam as SENIAT-declared

**Acceptance Criteria:**
1. All figures match Ing. Miriam's formulario data
2. Exchange rates correctly applied
3. SENIAT-declared status explicitly stated
4. 2015 shutdown reason explained (zinc, not insolvency)

#### Story 6.3: Projected Cash Flows & Bank Application
**As a** bank officer processing a working capital application,
**I want** projected cash flows formatted for Venezuelan bank requirements,
**so that** I can process the credit application.

**Format:** Professional document, 3-5 pages + cover letter
**Content:**
- Cover letter to bank (formal, Venezuelan banking style)
- Loan request: amount, purpose (zinc procurement for 7m kettle reactivation), repayment timeline
- 12-month projected cash flow (based on Scenario A from Epic 2)
- Collateral summary (from Story 6.1)
- Repayment capacity: monthly operating profit vs loan service
- Business plan summary: phased startup, each phase self-funds the next
- Applicant information: company details, shareholders, legal status

**Acceptance Criteria:**
1. Cash flows derived from Scenario A (conservative) -- 30% margin
2. Loan repayment schedule realistic
3. Cover letter in formal Venezuelan business Spanish
4. All required bank application fields covered
5. Formatted consistently with bank expectations (BNC, Banesco, Mercantil)

### Epic 7: Bilingual Website -- Core Pages, Navigation, SEO & Analytics
Venezuelan and international visitors browse a professional, bilingual, mobile-first website with galvanizing services, copper rod specs, quality/HSE info, capability PDF download, partnership inquiry, SEO, and analytics tracking.
**FRs covered:** FR1-FR6e, FR11, FR12, FR17, FR17b, FR18-FR24b
**Priority score:** 4.95 -- Credibility layer, not sales engine. Highest effort but lowest urgency.
**Dependencies:** Epic 1 (foundation + brand kit).

#### Story 7.1: Homepage (Spanish + English)
**As a** visitor landing on PYGLARA's website,
**I want** a photo-first homepage that immediately communicates what PYGLARA does and how to contact them,
**so that** I understand the company in 10 seconds and can take action.

**Format:** Astro page, bilingual (/es/, /en/), mobile-first
**Content:**
- Hero: full-bleed plant photo, headline "Galvanizado en caliente y varillas de cobre", WhatsApp CTA above fold
- Operational status indicator: kettle timeline (3.5m active, 7m Q2 2026, 9m 2027)
- Services grid: galvanizing + copper rods (2 cards, link to detail pages)
- Company snapshot: 50 years, Pilling equipment, COVENIN/ASTM, only 2 active in Venezuela
- Facility photo section (minimum 3 photos)
- Footer: phone, WhatsApp, email, address, RIF, partnership link

**Acceptance Criteria:**
1. WhatsApp button above fold on mobile, in header on desktop (FR23)
2. Page weight under 500KB (NFR3)
3. LCP under 2.5s on throttled 4G (NFR2)
4. Both ES and EN versions with identical layout
5. Real plant photos only (no stock)
6. Bottom tab bar visible on mobile (FR22)
7. All interactive elements 44px+ touch targets (FR24)

#### Story 7.2: Galvanizing Services Page
**As a** potential client evaluating galvanizing services,
**I want** detailed service specifications including kettle dimensions, capacity, and quality process,
**so that** I can determine if PYGLARA can handle my workpieces.

**Format:** Astro page, bilingual
**Content (FR3, FR5, FR6c):**
- Galvanizing process explained (pickling > fluxing > immersion > cooling)
- Kettle specifications table: dimensions, max workpiece size, weight limits per kettle
- Equipment manufacturer: W. Pilling Riepe GmbH (Germany)
- Quality certification: COVENIN 1212-81, ASTM A123, ASTM A153, per-lot certificates
- Facility photos (kettle areas, chemical processing)
- HSE commitment statement (FR6d)
- WhatsApp CTA: "Solicite una cotizacion" with galvanizing-specific pre-fill
- Company info: address, RIF, contact (FR6)

**Acceptance Criteria:**
1. Max workpiece dimensions per kettle clearly displayed (FR6c)
2. Equipment manufacturer referenced (FR5)
3. HSE statement present (FR6d)
4. Context-aware WhatsApp pre-fill for galvanizing inquiries
5. Page weight under 500KB

#### Story 7.3: Copper Ground Rods Page
**As a** potential buyer of copper ground rods,
**I want** product specifications, available sizes, and applications,
**so that** I can determine if PYGLARA's products meet my needs.

**Format:** Astro page, bilingual
**Content (FR4):**
- Product overview: copper-clad ground rods (Copperweld-type)
- Specifications table: diameters (5/8", 3/4", 1"), lengths (1.2m-3.0m), coating (300um +/- 50)
- Steel core: AISI/SAE C1045
- Standards: UL 467 compliance reference
- Applications: electrical grounding, telecommunications, lightning protection
- Production capacity: 936 units/day
- "Zero domestic competitors" differentiator
- WhatsApp CTA: copper-specific pre-fill
- Company info (FR6)

**Acceptance Criteria:**
1. All product specs accurate per Ing. Miriam data (FR4)
2. No per-unit pricing on website
3. Context-aware WhatsApp pre-fill for copper rod inquiries
4. Product photos included
5. Page weight under 500KB

#### Story 7.4: Quality, Safety & About Page
**As a** visitor wanting to verify PYGLARA's credibility,
**I want** information about quality standards, safety commitment, and the team,
**so that** I trust this is a legitimate, professional operation.

**Format:** Astro page, bilingual
**Content (FR6d):**
- Quality standards: COVENIN 1212-81, ASTM A123, ASTM A153
- Quality certification process: per-lot certificates issued by Ing. Miriam
- Thickness measurement equipment and process
- HSE commitment statement
- Ing. Miriam's story: 36+ years, trust differentiator (UX spec)
- Company history: founded by Francisco Ballesteros Zamorano, 50 years
- Facility overview: 3,640 m2, 2 warehouses, Zona Industrial I

**Acceptance Criteria:**
1. Ing. Miriam featured as trust signal (name, experience, photo if available)
2. Quality standards listed with certification reference
3. HSE commitment present (FR6d)
4. Real photos of quality process if available

#### Story 7.5: Contact & Partnership Page
**As a** visitor wanting to reach PYGLARA or explore partnership,
**I want** all contact methods and a partnership inquiry form,
**so that** I can easily initiate communication through my preferred channel.

**Format:** Astro page, bilingual
**Content (FR6, FR10, FR11, FR12):**
- All contact methods: phone, WhatsApp (with QR), email, physical address with map
- Operating hours
- Partnership Opportunities section: describes openness to strategic partnerships and investment (FR11)
- Partnership inquiry form: name, organization, email, phone, message (FR12)
- Capability statement PDF download link (FR6e)
- WhatsApp CTA for general inquiries

**Acceptance Criteria:**
1. Partnership form fields per FR12
2. Capability statement PDF downloadable (FR6e)
3. Form submissions route to partnership Google Sheet tab (separate from quotes, FR13)
4. Map or address clearly visible
5. WhatsApp QR code present

#### Story 7.6: Privacy Policy & Legal Pages
**As a** visitor or regulator,
**I want** a privacy policy page disclosing data practices,
**so that** the site complies with data protection expectations.

**Format:** Astro page, bilingual (FR17b)
**Content:**
- Data collection: what forms collect
- Data usage: quote processing, partnership evaluation
- Data storage: Google Sheets, transactional email
- Data retention policy
- File attachment handling (if applicable)
- Contact for data requests

**Acceptance Criteria:**
1. Both ES and EN versions (FR17b)
2. Accurate description of actual data practices
3. Linked from footer on every page

#### Story 7.7: SEO, Structured Data & Sitemap
**As a** search engine crawler,
**I want** proper meta tags, structured data, sitemap, and hreflang tags,
**so that** PYGLARA appears in relevant search results.

**Format:** Technical implementation within Astro
**Content (FR18, FR19, FR20, FR21):**
- Sitemap.xml with hreflang for ES/EN pages
- LocalBusiness structured data (JSON-LD) with address, phone, coordinates
- Meta titles and descriptions per page per language
- Open Graph tags for LinkedIn/Slack unfurls (EN pages)
- Heading hierarchy (h1 > h2 > h3)
- Google Business Profile linked (FR21)

**Acceptance Criteria:**
1. Sitemap validates with Google Search Console
2. Structured data passes Google Rich Results Test
3. Hreflang tags correct on all pages (FR20)
4. Each page has unique, language-specific URL (FR20)
5. OG tags render correctly when EN pages shared on LinkedIn

#### Story 7.8: Mobile Responsive & Accessibility
**As a** mobile user on a Venezuelan 4G connection,
**I want** the site to work perfectly on my phone with fast loading,
**so that** I can browse services and contact PYGLARA without frustration.

**Format:** Cross-cutting implementation across all pages
**Requirements (FR22, FR24, NFR1-NFR6, NFR11-NFR12):**
- Bottom tab bar: 4 tabs always visible (Galvanizado, Varillas de Cobre, Calidad y Seguridad, Contacto)
- 44px minimum touch targets on all interactive elements
- No horizontal scrolling on 320px width
- Correct HTML input types on forms
- WCAG 2.1 AA: color contrast 4.5:1, alt text, keyboard nav, focus indicators, heading hierarchy
- Performance: LCP < 2.5s, FCP < 1.5s, CLS < 0.1, Lighthouse 90+

**Acceptance Criteria:**
1. Bottom tab bar renders correctly on 320px (FR22)
2. Lighthouse Performance score 90+ (NFR4)
3. All pages under 500KB (NFR3)
4. WCAG 2.1 AA compliance verified (NFR11)
5. Focus indicators visible on all interactive elements (NFR12)
6. Forms usable on 320px without horizontal scroll (FR24)

#### Story 7.9: GA4 Analytics Setup
**As a** business owner tracking website performance,
**I want** GA4 analytics tracking page views, form submissions, WhatsApp clicks, and language toggles,
**so that** I can measure site effectiveness and user behavior.

**Format:** GA4 inline in BaseLayout + custom events
**Events (NFR19):**
- page_view (automatic)
- form_submit (with type: quote | partnership)
- whatsapp_click (with page context)
- language_toggle (ES > EN, EN > ES)
- capability_pdf_download

**Acceptance Criteria:**
1. GA4 fires on all pages
2. Custom events tracked per specification
3. Events visible in GA4 real-time dashboard
4. No PII sent to GA4

### Epic 8: WhatsApp Integration & All Communication Flows
Venezuelan clients initiate structured quote requests via WhatsApp. International clients submit formal forms. Partnership inquiries route separately. Sir receives typed notifications. Google Sheets captures everything. WhatsApp Business profile configured.
**FRs covered:** FR7-FR10c, FR13-FR16, FR28, FR33, FR34
**Priority score:** 6.05 -- WhatsApp IS the platform. Completes the website's conversion capability.
**Dependencies:** Epic 7 (website pages must exist for forms and WhatsApp links).

#### Story 8.1: WhatsApp Business Profile & Auto-Reply
**As a** potential client contacting PYGLARA via WhatsApp,
**I want** a professional business profile with auto-reply,
**so that** I know I've reached a legitimate company and will get a response.

**Format:** WhatsApp Business configuration
**Content (FR33):**
- Business profile: company name, address, description, website, hours, profile photo (plant)
- Auto-reply message (away hours): "Gracias por contactar a PYGLARA. Le responderemos en horario laborable..."
- Quick reply templates: quote request, availability, directions to plant
- Product catalog (if WhatsApp Business supports it): galvanizing services, copper rods

**Acceptance Criteria:**
1. Business profile complete with all fields
2. Auto-reply works outside business hours
3. Quick reply templates ready for common inquiries
4. Profile photo is real plant photo

#### Story 8.2: Context-Aware WhatsApp Pre-Fills
**As a** website visitor clicking the WhatsApp button,
**I want** a pre-filled message specific to the page I'm on,
**so that** PYGLARA immediately knows what I'm interested in.

**Format:** wa.me links with page-specific pre-fill text (FR34)
**Pre-fill messages:**
- Homepage: "Hola, vi su pagina web y me gustaria informacion sobre sus servicios"
- Galvanizing page: "Hola, necesito cotizar galvanizado en caliente para [tipo de pieza]"
- Copper rods page: "Hola, necesito cotizar varillas de aterramiento de cobre"
- Contact page: "Hola, me gustaria contactar a PYGLARA"
- EN versions: equivalent English messages

**Acceptance Criteria:**
1. Different pre-fill per page (not generic)
2. Works on mobile (opens WhatsApp app) and desktop (opens WhatsApp Web) (NFR13)
3. Phone number correct: +58 424 571 5349
4. Bilingual pre-fills match page language

#### Story 8.3: Quote Request Form (International Clients)
**As an** international client wanting to request a quote,
**I want** a structured web form with file attachment support,
**so that** I can submit my inquiry professionally with technical drawings.

**Format:** Astro form component, Google Forms hidden POST (ADR-002)
**Fields (FR8, FR9):**
- Name (required)
- Email (required)
- Company (optional, progressive disclosure)
- Title (optional, progressive disclosure)
- Message (required)
- File attachment for technical drawings (FR9)

**Acceptance Criteria:**
1. Form POSTs to Google Forms (hidden, branded confirmation UX)
2. Submissions appear in "Quote Requests" Google Sheet tab
3. File attachment works (FR9)
4. Honeypot + time-based bot check active (NFR8)
5. Error state shows WhatsApp/phone/email fallback (NFR18)
6. 44px touch targets, correct input types on mobile (FR24)
7. Confirmation page shows expected response timeframe (FR10b)

#### Story 8.4: Partnership Inquiry Form
**As an** investor or potential partner,
**I want** a dedicated partnership inquiry form,
**so that** my inquiry is routed separately from client quote requests.

**Format:** Astro form component, separate Google Forms endpoint
**Fields (FR12):**
- Name (required)
- Organization (required)
- Email (required)
- Phone (required)
- Message (required)

**Acceptance Criteria:**
1. Submissions go to separate "Partnership Inquiries" Google Sheet tab (FR13)
2. Sir receives email notification identifying submission as partnership inquiry (FR15, FR16)
3. Confirmation page shows partnership-specific next steps and 24hr response expectation (FR10b)
4. Honeypot + time-based bot check active

#### Story 8.5: Email Notifications & Google Sheets Dual-Write
**As a** business owner,
**I want** email notifications for every form submission with type identification,
**so that** I never miss a lead and can prioritize partnership inquiries.

**Format:** Google Forms built-in notifications + Google Sheets
**Requirements (FR14-FR16, NFR14-NFR15):**
- Email notification on every quote request submission (FR14)
- Email notification on every partnership inquiry submission (FR15)
- Email identifies submission type: "New Quote Request" vs "New Partnership Inquiry" (FR16)
- All submissions dual-written to Google Sheets (primary data store)
- Failed email deliveries: fallback logging to Google Sheets (NFR15)
- Email delivery within 5 minutes (NFR14)
- Automatic confirmation email to submitter (FR10c)

**Acceptance Criteria:**
1. Sir receives email within 5 minutes of submission
2. Email subject identifies type (quote vs partnership)
3. Google Sheets has complete record of all submissions
4. Confirmation email sent to submitter
5. If email fails, submission still recorded in Sheets

## Implementation Sequence

Three parallel tracks. Epic 0 starts immediately, costs nothing, and feeds everything.

```
Epic 0 (Commercial Outreach & LOIs) -- Starts TODAY, runs continuously
   |  $0 cost. Walk across Zona Industrial I. Collect LOIs.
   |  LOIs feed into --> Epic 4, Epic 5, Epic 6
   |
Epic 1 (Foundation & Brand Kit) -- Week 1
   |
   |--[OFFLINE MATERIALS TRACK]------------|--[WEBSITE TRACK]--------
   |                                       |
   Epic 2 (Financial Projections)          Epic 7 (Website Core)
   Week 2-3, no blockers                  Week 2-5, parallel
   |         |          |                        |
   Epic 4    Epic 6     Epic 3                Epic 8
   (Investor) (Bank)   (Printed)             (WhatsApp/Comms)
   Week 3-5  Week 4    Week 2-3              Week 5-6
   |
   Epic 5 (Pitch Deck)
   Week 5-6
```

**Critical path:** E0 (LOIs) + E1 > E2 > E4 > E5 (Outreach + Foundation > Financials > Investor Doc > Pitch Deck)
**Parallel track:** E1 > E7 > E8 (Foundation > Website > Communications)
**Early wins:** E0 starts today ($0), E3 (Printed Materials) gives Sir physical assets by Week 3.
**Key insight:** Epic 0 runs in parallel with EVERYTHING and costs nothing. By the time Epic 4 (Investor Doc) is ready for its "Confirmed Demand" section, Sir has 3-6 LOIs to embed. This transforms every capital-raising conversation.