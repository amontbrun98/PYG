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

### Epic 1: Project Foundation & Brand Kit
Establish the shared brand identity, domain, and development environment so all deliverable tracks work from one consistent visual foundation.
**FRs covered:** Architectural prerequisites (ADR-001, ADR-009)
**Priority score:** 5.95 -- Enabler epic, no direct revenue, but unblocks all other work.
**Dependencies:** None.
**User outcome:** Brand kit locked, domain secured, Astro project initialized, all tracks can begin visual work.

### Epic 2: Financial Projections & Replacement Cost Valuation (CRITICAL PATH)
Multi-scenario financial projections and a replacement cost valuation proving PYGLARA's $1M asking price is 50-60% below the $2M-$2.5M it would cost to build from scratch. Break-even analysis, ROI timelines, capital deployment waterfalls. This epic produces the numerical foundation consumed by Epics 4, 5, and 6.
**FRs covered:** FR37, FR38
**Priority score:** 8.65 -- Highest score. No dependencies, fast to produce, feeds 3 other epics.
**Dependencies:** None.
**User outcome:** Three projection scenarios (conservative/moderate/aggressive) with charts. Replacement cost headline: land ($691K-$990K) + Pilling kettles ($800K+) + copper line ($100K+) + installation = $2M-$2.5M+ vs $1M asking price. THE number for every investor conversation.

### Epic 3: Printed Materials & Meeting Kit
A physical meeting kit: one-page capability statement (bilingual), 3-page sales kit with WhatsApp QR, copper rod spec sheet. Print-optimized for Carta paper, readable in grayscale. Distinct form factors for quick access.
**FRs covered:** FR32
**Priority score:** 7.00 -- Only needs brand kit. Sir has physical assets before website exists.
**Dependencies:** Epic 1 (brand kit).
**User outcome:** Sir carries a designed system of printed assets to every meeting. Each piece works standalone. WhatsApp QR means it works without a website. Seeded in ferreteria networks and trade events.

### Epic 4: Investor Document (Bilingual Offline PDF) -- The Deep Dive
A 25-35 page investor-grade document in both Spanish and English. Consumes Epic 2's financial projections. Covers plant capabilities, market thesis, competitive landscape, SWOT, deal structure, OFAC compliance, USD repatriation. Reviewed and signed off by Ing. Miriam.
**FRs covered:** FR25, FR26, FR27, FR28, FR29, FR30, FR31
**Priority score:** 6.85 -- Highest single-epic revenue impact (unlocks capital). High effort but essential.
**Dependencies:** Epic 2 (financial projections).
**User outcome:** Sir shares this after a qualification call. Maria's family office reads it and moves to next stage. Replacement cost headline ($2M-$2.5M vs $1M) on page 1.

### Epic 5: Pitch Deck & Presentation Materials -- The Hook
A 15-20 slide presentation-ready pitch deck distilled from the investor document. Industrial visual identity -- dark backgrounds, copper accents, full-bleed plant photography. English international version for Miami/Houston audiences with OFAC, BOD, and risk sections.
**FRs covered:** FR35, FR39
**Priority score:** 8.00 -- The hook. Reused in 50+ meetings. Highest strategic leverage of any epic.
**Dependencies:** Epic 2 (numbers), Epic 4 (content to distill).
**User outcome:** Sir walks into Cowork, a bank, or a Zoom call with a polished deck that controls the narrative in 15 minutes. The investor document is the take-home deep dive.

### Epic 6: Bank-Ready Documentation Package -- The Follow-Through
Complete bank application package with collateral inventory, SENIAT-confirmed historical P&L, projected cash flows, and replacement cost valuation. Formatted for Venezuelan bank working capital or credit line applications.
**FRs covered:** FR36
**Priority score:** 6.55 -- Opens a debt path for zinc procurement financing. Sir keeps equity.
**Dependencies:** Epic 2 (projections + replacement cost).
**User outcome:** Sir walks into BNC, Banesco, or Mercantil with a professional package and applies for working capital instead of needing an equity investor for every phase.

### Epic 7: Bilingual Website -- Core Pages, Navigation, SEO & Analytics
Venezuelan and international visitors browse a professional, bilingual, mobile-first website with galvanizing services, copper rod specs, quality/HSE info, capability PDF download, partnership inquiry, SEO, and analytics tracking.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR6b, FR6c, FR6d, FR6e, FR11, FR12, FR17, FR17b, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR24b
**Priority score:** 4.95 -- Credibility layer, not sales engine. Highest effort but lowest urgency.
**Dependencies:** Epic 1 (foundation + brand kit).
**User outcome:** All 4 pages live and bilingual. Bottom tab bar. Partnership inquiry in footer. SEO active. GA4 tracking. Google Business Profile claimed. Runs in parallel with offline materials track.

### Epic 8: WhatsApp Integration & All Communication Flows
Venezuelan clients initiate structured quote requests via WhatsApp. International clients submit formal forms. Partnership inquiries route separately. Sir receives typed notifications. Google Sheets captures everything. WhatsApp Business profile configured.
**FRs covered:** FR7, FR8, FR9, FR10, FR10b, FR10c, FR13, FR14, FR15, FR16, FR28, FR33, FR34
**Priority score:** 6.05 -- WhatsApp IS the platform. Completes the website's conversion capability.
**Dependencies:** Epic 7 (website pages must exist for forms and WhatsApp links).
**User outcome:** Both WhatsApp-native (VE) and web-form (international) paths work. Partnership inquiries separated. Dual-write to Sheets + email. WhatsApp Business auto-reply and quick replies active.

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