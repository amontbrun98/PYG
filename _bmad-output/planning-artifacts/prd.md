---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
classification:
  projectType: web_app
  domain: energy_industrial_services
  complexity: medium-high
  projectContext: greenfield
inputDocuments:
  - product-brief-PYG-2026-03-11.md
  - innovation-strategy-2026-03-13.md
  - domain-hot-dip-galvanizing-industry-research-2026-03-12.md
  - domain-copper-electroplated-ground-rods-research-2026-03-13.md
  - market-galvanizing-venezuela-research-2026-03-12.md
  - market-venezuela-construction-infrastructure-research-2026-03-13.md
  - market-venezuela-investment-climate-research-2026-03-13.md
  - technical-venezuela-oil-sector-steel-demand-research-2026-03-13.md
  - competitive-analysis-venezuela-galvanizing.md
  - galvanizing-pricing-cost-research.md
documentCounts:
  briefs: 1
  research: 6
  innovation: 1
  projectDocs: 2
  brainstorming: 0
workflowType: 'prd'
date: '2026-03-13'
author: 'Sir'
lastEdited: '2026-03-24'
editHistory:
  - date: '2026-03-24'
    changes: 'UX spec alignment: investor doc elevated to Priority 1, printed materials added as Deliverable 1b, breakpoints updated (mobile 320-767, tablet 768-1023, desktop 1024+), hamburger replaced with bottom tab bar, FR8-FR10 rewritten for WhatsApp-first Venezuelan flows, FR10b response times updated (24h partnership), FR22 bottom tab bar, FR25 investor doc section reordering (financials to #3), new FR32 (printed materials), FR33-FR34 (WhatsApp Business), NFR15 Google Sheets fallback, Journey 2 WhatsApp-first, new Journey 8 (repeat client + referral loop), Journey Requirements Summary expanded'
  - date: '2026-03-19'
    changes: 'Post-validation edits: operational phasing (3m active), new Journey 6 (investor doc reading), Journey 7 (copper rod buyer), expanded investor doc FRs (FR25-FR31), new website FRs (FR6b-FR6e, FR10b-FR10c, FR17b, FR24b), expanded domain requirements (legal, HSE, privacy), copper SEO keywords, FR measurability fixes, NFR implementation leakage cleanup, analytics NFR19, additional success criteria'
---

# Product Requirements Document - PYG

**Author:** Sir
**Date:** 2026-03-13

## Executive Summary

PYGLARA (Prensados y Galvanizados de Lara, S.A.) is a fully equipped, debt-free hot-dip galvanizing and copper electroplating facility in Barquisimeto, Venezuela — partially operational with its 3m kettle currently active, and positioned at the center of a market vacuum where an estimated 110,000-220,000 tonnes/year of galvanizing demand goes unserved domestically. The January 2026 regime change, authorization of 6 IOCs under OFAC GL 50A, and $183B in projected oil & gas capex through 2040 are accelerating demand for corrosion-protected steel infrastructure that barely exists in-country.

**Operational Status:** The plant is not starting from zero. The 3m kettle is currently operational with active commercial jobs. The 7m Pilling kettle requires burner replacement ($15K-$25K) before restart. The 9m Pilling kettle requires foundation work, crane modifications, and gas line extension — months after 7m restart. Website content must reflect this phased reality: current 3m capability, near-term 7m expansion, and future 9m capacity. Installed capacity figures (400 tons/month) represent full-fleet potential, not day-one availability.

This PRD defines three deliverable categories, prioritized by business impact:

1. **Comprehensive Investor Document (Bilingual, Offline) — PRIORITY 1.** Capital is the bottleneck; client interest already exists through existing relationships and the active 3m kettle. A standalone, investor-grade document covering plant capabilities, current standing, SWOT analysis, competitive landscape, financial projections (at 30% regulated margin per Ley de Precios Justos), asset inventory, and market thesis. Distributed via tracked link (DocSend) or presented in person — completely separate from the website. Never published online. A 2-page standalone executive summary serves as a qualification tool before sharing the full document.

2. **Printed Materials Ecosystem — PRIORITY 1b.** Physical distribution assets that Sir carries to meetings and seeds in ferretería networks: one-page capability statement (bilingual), 3-page sales kit (capability + copper rods + how to order with WhatsApp QR), and one-page copper rod spec sheet. These are the primary viral distribution assets — forwarded on WhatsApp and handed out at events. Designed print-first, then adapted for digital forwarding.

3. **Bilingual Website (Spanish/English) — PRIORITY 2.** A professional digital verification layer with two user funnels:
   - **Client funnel:** Service catalog, galvanizing capacity specs, copper ground rod product pages, WhatsApp-native quote flows for Venezuelan clients, web contact form for international contacts, and WhatsApp Business integration — targeting Venezuelan construction firms, ferreterías, industrial fabricators, and international EPC contractors.
   - **Investor/partner inquiry funnel:** A discreet contact pathway in the footer for individuals or entities interested in investment or partnership opportunities. This captures leads only — no investor materials, financials, or sensitive business data are displayed on the site. Investor documentation is shared privately after qualification.
   - **UX as a first-class concern:** The site requires dedicated UX design — proper user journeys for each funnel, bilingual navigation patterns, mobile-first for Venezuelan internet conditions, and conversion-optimized flows. This warrants its own epic in the implementation plan.

The constraint is not demand — PYGLARA's 4,800 tons/year capacity represents 2-4% of estimated national demand. The constraint is visibility. These deliverables convert an invisible idle asset into a discoverable, credible industrial services provider at the exact moment Venezuela's reconstruction creates captive demand.

### What Makes This Special

- **Only dual-capability plant in Venezuela:** No competitor offers both hot-dip galvanizing and copper electroplated ground rods. The copper line (936 rods/day, 300um coating exceeding UL 467) has zero identified domestic competition — 100% of current demand is import-dependent.
- **Geographic monopoly in western Venezuela:** Barquisimeto sits at the crossroads of Lara, Falcon, Portuguesa, Yaracuy, and western Zulia. The nearest active service galvanizer (ALF in Valencia) is 350km away. Transport cost savings of $50-$150/ton create a natural moat.
- **Quality certification foundation already exists:** Ing. Miriam (36 years plant-specific experience) already issues per-lot quality certificates measuring adherence, appearance, zinc coating weight, and functionality using on-site thickness measurement equipment. This is the foundation for formal ISO 9000 / ASTM A123 certification — not a greenfield certification effort.
- **Ultra-low fixed cost structure:** $5,600/month fixed costs ($67,200/year) vs. $50,000-$80,000/month for a comparable US plant. Breakeven at just 434 tons/year (9% of capacity) at $500/ton pricing.
- **Timing alignment with $183B reconstruction:** 6 IOCs authorized, PDVSA's 3,400km pipeline network unupdated for 50 years, construction materials market growing at 6.8% CAGR. First-mover window is open but finite.
- **Service-only model = zero steel inventory risk:** Clients bring their steel, PYGLARA galvanizes it. Inventory risk is concentrated in zinc and chemicals only.

## Project Classification

| Parameter | Value |
|---|---|
| **Project Type** | Web Application (bilingual marketing website) + Standalone Investor Document (offline) |
| **Domain** | Energy / Industrial Services (oil & gas adjacent, manufacturing) |
| **Complexity** | Medium-High (bilingual, dual funnel UX, regulated pricing, industrial domain) |
| **Project Context** | Greenfield (no existing digital platform) |
| **Primary Language** | Spanish (Venezuelan market) |
| **Secondary Language** | English (international companies, investors) |
| **Investor Materials** | Offline only — never published on website |

## Success Criteria

### User Success

- **Client (referred via word of mouth):** Visits site, immediately understands what PYGLARA does, sees capacity/capabilities, feels confident this is a legitimate professional operation. Can find a phone number or WhatsApp link in under 10 seconds. Leaves thinking "these people are serious."
- **International company (EPC/IOC subcontractor):** Switches to English, sees the same professionalism, finds technical specs (kettle dimensions, capacity, quality certification process), and has a clear path to request a quote or make contact.
- **Potential investor/partner:** Finds the inquiry pathway, submits interest, and receives follow-up with the offline investor document. No sensitive data exposed on-site.

### Business Success

| Metric | Target | Timeframe |
| --- | --- | --- |
| Website live and bilingual | Functional, professional, mobile-optimized | Week 4 |
| First client mentions finding the site after a referral | Validation that credibility layer works | Month 2 |
| Investor document completed and reviewed by Ing. Miriam | Technical accuracy confirmed | Month 1 |
| First investor meeting using the document | Document is presentation-ready | Month 2-3 |
| WhatsApp Business linked and active | Primary sales channel operational | Week 1 |

### Technical Success

- Fully bilingual with clean language switching on every page
- Mobile-first responsive design for Venezuelan B2B browsing (80%+ mobile)
- SEO baseline: appears for "galvanizado Barquisimeto" and "PYGLARA"
- WhatsApp click-to-chat works on both mobile and desktop
- Contact forms deliver reliably via transactional email
- Free/low-cost hosting (Vercel free tier)
- Performance targets: see NFR1-NFR6 for specific metrics

### Measurable Outcomes

| Outcome | How We Know It Worked |
| --- | --- |
| Professional credibility | A referred prospect says "I saw your website" in conversation |
| Investor funnel works | At least 1 investor inquiry comes through the site form |
| Bilingual coverage | English-speaking company can navigate the full site without friction |
| Investor document accepted | Ing. Miriam signs off on technical accuracy; Sir uses it in first meeting |
| Dual-capability messaging | At least 1 client or inquiry references both galvanizing AND copper rods |
| Geographic reach | At least 1 inquiry from outside Lara state (Zulia, Falcon, Portuguesa) |
| Copper line traction | At least 1 copper rod inquiry comes through the site or WhatsApp |

## Product Scope

Two independent deliverables with phased development. See "Project Scoping & Phased Development" for detailed MVP feature set, post-MVP roadmap, and risk mitigation strategy.

**Deliverable 1 — Bilingual Website:** Static marketing site with client quote funnel + investor inquiry funnel. Spanish-first, mobile-first, WhatsApp-integrated. 4-week build.

**Deliverable 2 — Investor Document (Offline PDF):** Plant capabilities, SWOT, competitive landscape, financial projections (30% regulated margin), market thesis. Bilingual. Never published on website.

## User Journeys

### Journey 1: Carlos — Ferretería Owner, Caracas (Referred Client, Spanish, Mobile)

**Opening Scene:** Carlos runs a mid-size ferretería in Caracas that supplies construction contractors. A colleague at a trade meetup mentions "there's a galvanizing plant in Barquisimeto that's operational again — PYGLARA." Carlos pulls out his phone on the spot and Googles "PYGLARA galvanizado."

**Rising Action:** He lands on the homepage — Spanish by default. Clean, professional. Photos of the plant, German kettles, the capacity number (400 tons/month) right there. He thinks "this looks real." He taps "Servicios" and sees galvanizing specs: kettle dimensions, turnaround times, quality certification per lot. He notices they also do copper ground rods — his electrical contractor clients always complain about rod availability. He screenshots the copper rod specs page to forward on WhatsApp.

**Climax:** Carlos taps the WhatsApp button. It opens a chat with PYGLARA's business number, pre-filled with "Hola, me interesa el servicio de galvanizado." He sends a voice note describing what he needs — 5 tons of angle iron for a warehouse project. He gets a response within hours.

**Resolution:** Carlos becomes a repeat client. When other ferretería owners ask where he gets his steel galvanized, he says "PYGLARA — look them up, they have a website." The credibility cycle repeats.

**Requirements revealed:** Spanish-first homepage, WhatsApp click-to-chat with pre-filled message, service specs page, copper rod product page, mobile-optimized (entire journey happens on phone), fast load on Venezuelan 4G.

---

### Journey 2: Ing. Rodriguez — Construction PM, Barquisimeto (Referred Client, Needs Specs)

**Opening Scene:** Rodriguez is managing a warehouse construction project in Zona Industrial II, Barquisimeto. His structural engineer specifies galvanized steel for the roof trusses and support columns — 20 tons total. He calls a colleague who says "try PYGLARA, they're in Zona Industrial I — practically next door." Rodriguez opens the website on his laptop at the job site trailer.

**Rising Action:** He goes straight to Services. He needs to know: Can they handle 7-meter trusses? (Yes — 7m kettle operational.) What's the turnaround? What quality documentation do they provide? He finds the quality certification section — per-lot certificates with adherence, appearance, zinc weight, and functionality measurements, signed by a 36-year veteran engineer. That's more documentation than he's gotten from any galvanizer before.

**Climax:** He taps "Solicitar Cotizacion" which opens WhatsApp with a structured pre-fill: "Necesito cotizacion de galvanizado: Material: ___ Tonelaje: ___ Dimension maxima: ___". He fills in: structural trusses, 20 tons, 6.5m max piece length, needed within 3 weeks. He sends a photo of the truss sketch via WhatsApp. He also checks — can they supply copper ground rods for the building's electrical grounding? Yes, 5/8" x 2.4m, 300um copper coating. He sends a second message asking about rods.

**Resolution:** Rodriguez gets a quote via WhatsApp the next day (Sir forwards to Ing. Miriam for pricing). The price is competitive, the plant is 10 minutes from his job site (no trucking to Valencia), and he can get galvanized trusses AND grounding rods from one supplier. He sends a purchase order screenshot on WhatsApp. When his structural engineer asks about quality certs, he forwards the website link.

**Requirements revealed:** WhatsApp-native quote flow with structured pre-fill, technical specs page (kettle dimensions, workpiece size limits vs. kettle internal dimensions), quality certification details, copper rod cross-sell visibility on services page, desktop-friendly layout for office use.

---

### Journey 3: James — EPC Procurement Manager, Houston (International, English)

**Opening Scene:** James works for an EPC contractor subcontracted to Chevron for pipeline surface infrastructure in western Venezuela. He needs a local galvanizer for pipe supports, platform structures, and grounding rods. His Venezuelan field manager mentions "PYGLARA in Barquisimeto." James opens the website from his Houston office.

**Rising Action:** He hits the language toggle — switches to English. He scans the homepage: "Venezuela's only dual-capability galvanizing and copper electroplating facility." That catches his attention — grounding rods are always a separate procurement headache. He clicks through to Services and sees kettle specs, capacity, and the quality certification process. He notes the Pilling (Germany) equipment — a name he recognizes. He looks for ASTM A123 or ISO 1461 certification — he sees "foundation for formal certification" with existing per-lot QC, but no formal cert yet.

**Climax:** James needs to add PYGLARA to his approved vendor list. He fills out the contact form with specific questions: "Do you plan to pursue ASTM A123 certification? Can you provide coating thickness test reports per ASTM A123 Table 1? What is your capacity for pieces up to 7m?" He also notes the copper ground rod specs — 300um exceeds UL 467 minimum.

**Resolution:** James receives a professional response with technical answers. He adds PYGLARA to his vendor shortlist. The website served its purpose — it made PYGLARA look like a real, capable operation worth engaging with, not a random shop in a developing country. He forwards the English website link to his procurement team.

**Requirements revealed:** Seamless EN/ES language toggle, technical specs in international standards (metric + imperial where relevant), professional English copy (not machine-translated), contact form that accepts detailed technical questions, equipment manufacturer references (Pilling, Honeywell, Allen Bradley).

---

### Journey 4: Maria — Family Office Advisor, Miami (Investor Inquiry)

**Opening Scene:** Maria advises a family office exploring post-sanctions Venezuela investments. An associate mentions "there's an industrial plant for sale in Barquisimeto — galvanizing, something to do with oil infrastructure." Maria Googles "PYGLARA Barquisimeto" and lands on the website.

**Rising Action:** She sees a professional industrial services website — not what she expected for a Venezuelan plant acquisition. She browses the capabilities, notices the dual revenue streams (galvanizing + copper), and sees the "Partnership Opportunities" link in the footer or navigation. She clicks through to a clean, simple page: brief text about PYGLARA welcoming strategic partnerships and investment inquiries, with a contact form.

**Climax:** Maria fills out the form: her name, firm, email, phone, and a brief note: "Representing a family office interested in Venezuelan industrial assets. Would like to receive your investor materials." No sensitive data is shown on the site — she understands this is an inquiry, not a data room.

**Resolution:** Sir receives the inquiry notification, qualifies Maria with a brief call, and sends the comprehensive investor document (PDF) directly. The website did its job — it looked professional enough that a Miami-based advisor took it seriously and submitted an inquiry, rather than dismissing it as amateur.

**Requirements revealed:** "Partnership Opportunities" page — discreet, professional, no financials. Simple inquiry form (name, organization, email, phone, message). Email notification to Sir on submission. No investor data on-site.

---

### Journey 5: Sir — Site Admin (Content Manager, Inquiry Handler)

**Opening Scene:** Sir receives an email notification: "New quote request from Ing. Rodriguez — 20 tons structural trusses + copper rods." Separately, another notification: "New partnership inquiry from Maria, family office in Miami."

**Rising Action:** Sir logs into the site admin panel (or receives structured emails). He can see all form submissions organized by type (client quote vs. investor inquiry). He forwards the quote request to Ing. Miriam for pricing. He reviews Maria's inquiry and schedules a qualification call.

**Climax:** Sir needs to update the copper rod page — a new size (3/4" x 3m) is now available. He makes the edit in the codebase (updating both Spanish and English content files), commits, and deploys via Vercel. The change is live within minutes. In Phase 2, a CMS will make this self-service without code.

**Resolution:** The site runs itself day-to-day. Sir checks form submissions via email, updates content occasionally through code commits, and focuses his time on phone calls and WhatsApp — where the real sales happen. The website is low-maintenance by design.

**Requirements revealed:** Email notifications for form submissions (separated by type: quote vs. investor), code-level content updates for MVP (CMS deferred to Phase 2), bilingual content synchronization process, low-maintenance architecture, no complex admin dashboard needed for MVP.

---

### Journey 6: Maria (continued) — Reading the Investor Document (Offline, English)

**Opening Scene:** Two days after her website inquiry, Maria has a 20-minute qualification call with Sir. He's articulate, knowledgeable, and sends her the investor document PDF (English version) immediately after the call. Maria opens it on her laptop at her Miami office.

**Rising Action:** She scans the table of contents — it's organized logically: executive summary with a clear investment ask, plant capabilities, current operational status (she notes the 3m kettle is already active), market thesis, competitive landscape, financials, SWOT, assets, management team, and deal structure options. She goes straight to the financial projections — 30% regulated margin, conservative case. The capital deployment timeline shows her exactly when money goes in and when revenue starts. She notes the management section covers Ing. Miriam's role and what happens if she retires.

**Climax:** Maria flags three items for her investment committee: (1) the OFAC compliance section confirms US-connected investors can participate under current GL 50A, (2) the USD repatriation section explains the BOD exchange mechanism, and (3) the deal structure section offers both equity and revenue-share options. She forwards the PDF to her committee with a note: "This is the most organized Venezuelan opportunity we've seen. Worth a deeper look."

**Resolution:** The investment committee requests a follow-up call and a plant visit. The investor document did its job — it was professional enough, complete enough, and addressed enough international investor concerns that a Miami-based family office moved to the next stage instead of passing.

**Requirements revealed:** Clear investment ask on page 1, logical section ordering, capital deployment timeline, path-to-first-revenue, OFAC compliance for US-connected investors, USD repatriation mechanisms, deal structure options, management continuity plan, professional design with data visualizations, 25-35 page target length.

---

### Journey 7: Luis — Electrical Contractor, Maracaibo (Copper Rod Buyer, Spanish, Mobile)

**Opening Scene:** Luis runs a mid-size electrical contracting company in Maracaibo, Zulia. He's been awarded a grounding system installation for a new commercial building — 200 copper ground rods, 5/8" x 2.4m, UL 467 compliant. He currently imports rods from Colombia at $18-$22/rod with 3-4 week lead times and customs headaches. A colleague at a trade event mentions "PYGLARA in Barquisimeto makes copper ground rods — check them out." Luis searches "varillas de puesta a tierra Venezuela" on his phone.

**Rising Action:** He lands on the PYGLARA site — Spanish by default. He taps through to the copper ground rod product page. He sees specifications: 5/8" to 1" diameter, 1.2m to 3m length, 300um ± 50 copper coating exceeding UL 467 minimum. He sees the production capacity: 936 rods/day continuous cycle. That's more than enough for his 200-rod order. He checks coating thickness — 300um is well above the 250um UL 467 requires. He screenshots the specs page.

**Climax:** Luis taps the WhatsApp button — pre-filled with "Hola, me interesan las varillas de puesta a tierra." He asks: "¿Cuánto cuesta la varilla de 5/8 x 2.4m? Necesito 200 unidades. ¿Tienen certificado de espesor de recubrimiento?" He needs a per-rod price quote, delivery timeline to Maracaibo, and a copper thickness certificate per lot.

**Resolution:** Luis gets a quote the next day — $12-$15/rod, 30-40% cheaper than Colombian imports, with 1-week production turnaround and per-lot thickness certification. No customs, no import logistics. He places the order and tells every electrical contractor in Zulia. The copper line has found its sales channel.

**Requirements revealed:** Copper ground rod product page with UL 467 compliance details, per-rod pricing model (distinct from galvanizing per-ton), copper-specific WhatsApp pre-filled message, copper thickness certification details, production capacity and lead times for rod orders, delivery/logistics information for out-of-state clients (Zulia, Falcon), copper-specific SEO keywords ("varillas de puesta a tierra Venezuela").

---

### Journey 8: Repeat Client — Returning for More (WhatsApp, Any Language)

**Opening Scene:** Carlos galvanized 5 tons of angle iron two weeks ago. A new project requires 15 tons of roof trusses. He opens his existing WhatsApp conversation with PYGLARA.

**Rising Action:** He sends a voice note: "Necesito galvanizar 15 toneladas de cerchas para un galpón. Mismas condiciones que la vez pasada." No website visit. No form. No browsing. The relationship is already established.

**Climax:** Sir uses a pre-saved "returning client" quick reply template that skips the introduction and goes straight to: specs confirmation, timeline, and pricing. Quote sent within hours.

**Resolution:** Order placed. At delivery, Sir sends a post-delivery message: "Su material está listo. Gracias por confiar en PYGLARA." At Day 30, a check-in: "Cómo le fue? Tiene más material?" And a referral prompt: "Si conoce alguien que necesite galvanizado, con gusto le envío nuestra información" with the capability statement PDF attached as a forwardable message.

**Requirements revealed:** WhatsApp quick reply templates for returning clients, post-delivery WhatsApp sequence (Day 1, Day 30, referral prompt), forwardable capability statement PDF optimized for WhatsApp thumbnail preview, no website dependency for repeat business.

---

### Journey Requirements Summary

| Capability | Revealed By | Priority |
| --- | --- | --- |
| WhatsApp click-to-chat (context-aware pre-filled messages) | Carlos, Rodriguez, Luis | Critical |
| WhatsApp Business optimization (auto-reply, quick replies, catalog) | All Venezuelan clients, repeat clients | Critical |
| Spanish-first, mobile-optimized homepage | Carlos, Rodriguez | Critical |
| Bottom tab bar (4 always-visible tabs, no hamburger) | Carlos, Rodriguez, Luis | Critical |
| Service specs page (kettle dimensions, workpiece limits, capacity, turnaround) | Rodriguez, James | Critical |
| Copper ground rod product page (with sample offer, MOQ, delivery info) | Luis, James | Critical |
| WhatsApp-native quote flow (structured pre-fill, no web form for VE clients) | Carlos, Rodriguez | Critical |
| Language toggle (ES/EN) — seamless, every page | James, Maria | Critical |
| Quality certification details (per-lot QC process) | Rodriguez, James | Critical |
| "Strategic Partnerships" inquiry (footer link, not main nav) | Maria | Critical |
| Vendor qualification pack download (ZIP + individual PDFs) | James | Critical |
| Professional English copy (not machine-translated) | James | Critical |
| Copper rod UL 467 compliance details on product page | Luis, James | Critical |
| Copper-specific pricing model (per rod, not per ton) | Luis | Critical |
| Printed capability statement (bilingual, WhatsApp QR, every page has contact info) | All distribution | Critical |
| Post-delivery WhatsApp sequence (Day 1, Day 30, referral prompt) | Repeat clients | High |
| Copper rod independent go-to-market (electrical contractor networks, spec sheet) | Luis | High |
| Copper production capacity, lead times, and MOQ | Luis | High |
| Delivery/logistics info for out-of-state clients | Luis | High |
| Equipment manufacturer references | James | High |
| Code-level bilingual content updates (CMS Phase 2) | Sir | High |
| Fast page load (<2.4s on Venezuelan 4G) | Carlos, Rodriguez, Luis | High |
| Basic SEO ("galvanizado Barquisimeto", "PYGLARA") | All external users | High |
| Copper-specific SEO ("varillas de puesta a tierra Venezuela") | Luis | High |
| Google Business Profile (claimed, verified, with photos, Week 1) | Carlos, Maria | High |

## Domain-Specific Requirements

### Compliance & Regulatory

- **Ley de Precios Justos:** Any pricing shown or implied on the website must be defensible at 30% regulated margin. No public-facing content should reference the ~50% internal margin. Pricing page (if added later) must use compliant rates.
- **Quality certification claims accuracy:** The site can reference the existing per-lot QC process and the ISO 9000 / ASTM A123 pathway — but must NOT claim formal certification until achieved. Language like "quality certificates issued per lot" and "foundation for ASTM A123 certification" is accurate. "ASTM A123 certified" is not (yet).
- **COVENIN standards:** Venezuelan construction codes (COVENIN) require galvanized coatings in specific applications. The site should reference COVENIN compliance where applicable — this builds credibility with Venezuelan construction clients.
- **No regulated financial data on-site:** Investor materials with financial projections, margin analysis, and asset valuations are never published online. Ley de Precios Justos enforcement could use public pricing/margin data against the company.

### Legal & Registration Prerequisites

- **Registro Mercantil:** PYGLARA's commercial registry must be verified current before the website goes live. Advertising commercial services with a lapsed Registro Mercantil is a legal violation. Pre-launch checklist must include verification.
- **SENIAT/RIF:** The company's RIF (tax registration) must be active and displayed on the website — standard requirement for Venezuelan B2B transactions and international vendor qualification.
- **Municipal tax (Patente de Industria y Comercio):** Publishing a website advertising services may be interpreted as resumption of commercial activity by the Alcaldía de Iribarren. Municipal tax obligations must be verified before launch.
- **SAPI trademark:** The PYGLARA name, logo, and branding should be registered with SAPI (Servicio Autónomo de la Propiedad Intelectual) before publication online. A competitor could register the unprotected name.

### Safety, Environmental & Occupational Health

- **LOPCYMAT compliance:** Venezuelan occupational health and safety law requires documented safety programs for industrial operations. The website should reference PYGLARA's HSE (Health, Safety, Environment) commitment. HSE documentation must be created or updated for the plant's current operations.
- **Environmental compliance:** Galvanizing uses HCl acid baths, generates zinc-bearing wastewater, and produces fumes requiring ventilation. Environmental permits and compliance status should be verified before the website claims operational status. No environmental claims should appear on-site without verified permit status.
- **HSE policy page:** EPC contractors and IOC subcontractors require vendor HSE documentation as a prerequisite for qualification. The website should include an HSE policy summary or commitment statement. This is a blocker for the James (EPC) user journey.

### Data Privacy

- **Privacy policy:** The website collects personal information through 3 forms (quote request, partnership inquiry, general contact) including names, emails, phones, organization names, and file attachments. A privacy policy page is required disclosing: what data is collected, how it is used, where it is stored (US-hosted via Vercel), and data retention practices.
- **Ley de Infogobierno / Constitutional Article 60:** Venezuelan privacy protections apply to personal data collected through the website. Cross-border data transfer (Venezuelan users → US-hosted servers) should be disclosed.
- **File attachment handling:** Quote request attachments (FR9) may contain proprietary client drawings and specifications. The privacy policy must address how uploaded files are handled, stored, and deleted.

### Technical Constraints

- **Venezuelan internet reliability:** Pages must load on 3G/4G with spotty connections. Target <3s load time. Minimal JavaScript, compressed images, static-first architecture. No heavy frameworks or client-side rendering that fails on slow connections.
- **Bilingual technical accuracy:** Industrial terms (galvanizado en caliente, cuba de zinc, espesor de recubrimiento, varilla de puesta a tierra) must be technically correct in Spanish — not machine-translated. English technical copy must use standard international terms (hot-dip galvanizing, zinc kettle, coating thickness, copper ground rod).
- **Mobile-first:** 80%+ of Venezuelan B2B browsing is mobile. The site must be fully functional on small screens with touch-friendly navigation.
- **Hosting outside Venezuela:** Venezuelan hosting infrastructure is unreliable. Host on Vercel/Netlify (US/global CDN) for reliability and speed via edge caching.

### Integration Requirements

- **WhatsApp Business API:** Click-to-chat integration with pre-filled messages. Must work on both mobile (opens WhatsApp app) and desktop (opens WhatsApp Web).
- **Email delivery:** Form submissions must deliver reliably. Use a transactional email service (Resend, SendGrid) rather than relying on SMTP from a Venezuelan server.
- **Google Business Profile:** Claim and link PYGLARA's Google Business listing for local search visibility.

## Technical Architecture

### Project-Type Overview

Static-first bilingual marketing website with form-based lead capture. No dynamic application logic, no user accounts, no real-time features. The site is a digital brochure with two contact funnels (client quotes + investor inquiries) and WhatsApp integration. Content updates happen through a CMS or direct code edits — not through a user-facing dashboard.

### Technical Architecture Considerations

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Rendering** | Static Site Generation (SSG) | Best performance on Venezuelan internet; SEO-friendly; free hosting on Vercel/Netlify |
| **Framework** | Next.js (App Router) or Astro | Both support SSG, i18n, and free Vercel hosting. Astro is lighter; Next.js has broader ecosystem. |
| **Styling** | Tailwind CSS | Utility-first, small bundle, responsive-first, no runtime cost |
| **i18n** | Route-based (`/es/`, `/en/`) | SEO-friendly (each language gets its own URL), clean language switching |
| **Forms** | Server action or API route to email | No database needed for MVP; form data sent via transactional email (Resend/SendGrid) |
| **CMS** | Markdown files in repo OR headless CMS (Contentful free tier) | Markdown = zero cost, version-controlled. Headless CMS = easier for non-dev edits. |
| **Images** | Next.js Image optimization or manual WebP conversion | Compressed, lazy-loaded, responsive sizes for mobile |
| **Hosting** | Vercel (free tier) | Global CDN, automatic HTTPS, zero server maintenance |

### Browser & Device Matrix

| Browser/Device | Support Level | Notes |
| --- | --- | --- |
| Chrome Android | Full | Primary — majority of Venezuelan mobile users |
| Safari iOS | Full | iPhone users |
| Chrome Desktop | Full | Office/desktop users (James, Rodriguez) |
| Edge Desktop | Full | Corporate users |
| Safari Desktop | Full | Mac users |
| Firefox | Functional | Not primary target but should work |
| IE11 | Not supported | Obsolete |

### Responsive Design Requirements

- **Mobile (320-767px):** Primary breakpoint. All content accessible, WhatsApp floating button prominent (above tab bar), forms usable with touch. Bottom tab bar with 4 always-visible tabs (Galvanizado, Varillas de Cobre, Calidad y Seguridad, Contacto). No hamburger menu.
- **Tablet (768-1023px):** Two-column layouts where appropriate. Same bottom tab bar as mobile.
- **Desktop (1024px+):** Full horizontal navigation bar, multi-column service specs, wider form layouts. WhatsApp icon in header. Side-by-side content for services page.

### SEO Strategy

- **Target keywords — Galvanizing (ES):** "galvanizado Barquisimeto", "servicio de galvanizado Venezuela", "galvanizado en caliente Lara", "PYGLARA"
- **Target keywords — Galvanizing (EN):** "galvanizing service Venezuela", "hot-dip galvanizing Barquisimeto", "PYGLARA"
- **Target keywords — Copper Rods (ES):** "varillas de puesta a tierra Venezuela", "varillas de cobre para puesta a tierra", "electrodo de tierra cobreado Venezuela", "jabalinas de cobre Venezuela"
- **Target keywords — Copper Rods (EN):** "copper ground rods Venezuela", "copper bonded ground rods Barquisimeto", "UL 467 ground rods Venezuela"
- **Technical SEO:** Semantic HTML, proper heading hierarchy, meta descriptions per page, Open Graph tags, sitemap.xml, robots.txt
- **Local SEO:** Google Business Profile with address, phone, hours, photos. Structured data (LocalBusiness schema).
- **i18n SEO:** `hreflang` tags linking Spanish and English versions of each page. Separate URLs per language (`/es/servicios`, `/en/services`).

### Implementation Considerations

- **No database required for MVP** — forms submit via email, content is static
- **No authentication required** — no user accounts, no admin login on the public site
- **Bilingual content management** — each page exists in ES and EN; content changes must update both versions
- **Domain:** Secure pyglarasa.com or pyglara.com (check availability)
- **SSL:** Automatic via Vercel (free Let's Encrypt)
- **Analytics:** Google Analytics 4 or Plausible (privacy-friendly) for basic traffic tracking

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Credibility MVP — the minimum digital presence that makes PYGLARA look like a real, professional industrial operation when someone Googles them after a word-of-mouth referral. Not a lead-generation engine; a credibility layer that converts referrals into confidence.

**Resource Requirements:** 1 developer (full-stack/frontend), 1 bilingual content writer (industrial/technical Spanish-English), Sir as product owner, Ing. Miriam as technical reviewer for accuracy. Estimated 4-week build timeline.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

| Journey | MVP Support | Notes |
| --- | --- | --- |
| Carlos (ferretería, mobile, Spanish) | Full | Primary use case — WhatsApp + mobile-first |
| Rodriguez (construction PM, specs) | Full | WhatsApp structured pre-fill + technical specs |
| James (EPC, English) | Full | Language toggle + vendor qualification pack download |
| Maria (investor inquiry) | Full | Footer partnership inquiry form |
| Luis (electrical, copper rods, mobile) | Full | Copper rod page + WhatsApp pre-fill |
| Sir (admin) | Partial | Email notifications only — no CMS dashboard |
| Repeat client (returning) | Full | Existing WhatsApp thread + quick reply templates |

**Must-Have Capabilities:**

- Bilingual homepage (ES/EN) with language toggle on every page
- Services page with galvanizing specs (kettle dimensions, capacity, turnaround, quality certification process)
- Copper ground rod product page (sizes, coating thickness, applications)
- WhatsApp Business click-to-chat with context-aware pre-filled messages per page
- WhatsApp Business optimization: auto-reply, quick reply templates, product catalog
- WhatsApp-native quote flows for Venezuelan clients (no web form required)
- Web contact form for international clients only (EN version with optional company/title fields)
- Partnership inquiry form (discreet, footer-linked, no financials) with separate email notification
- Mobile-first responsive design (<3s load on Venezuelan 4G)
- Basic SEO (meta tags, structured data, Google Business Profile claim)
- Static site on Vercel free tier (global CDN, auto HTTPS)
- Professional English copy (human-reviewed, not machine-translated)

**Manual Initially (Not Automated in MVP):**

- Content updates via code commits (no CMS dashboard)
- Form submissions via email (no database, no admin panel)
- Investor document shared manually after qualification call
- Analytics review via Google Analytics dashboard (no custom reporting)

### Post-MVP Features

**Phase 2 (Growth):**

- Expanded plant photo gallery / virtual tour
- Client testimonials section (once first contracts completed)
- Blog/news section for operational updates (plant restart, certifications achieved)
- Copper rod ordering form with size/quantity selector
- Instagram @pyglarasa feed integration
- Simple CMS for Sir to update content without code changes
- Google Ads campaign for "galvanizado Venezuela" (only if word-of-mouth plateaus)

**Phase 3 (Expansion):**

- Access-controlled investor portal with real revenue data
- Interactive financial scenario models for potential investors
- Client dashboard (order tracking, quality certificate downloads)
- PDVSA/IOC vendor qualification documentation section
- Automated quote generation based on tonnage/piece specs

### Risk Mitigation Strategy

**Technical Risks:**

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Venezuelan internet makes site unusable | Medium | High | SSG + CDN = no server dependency; <500KB pages; works on 3G |
| Bilingual content inconsistency | Medium | Medium | Single source of truth per page; review process before launch |
| Form submissions lost | Low | High | Transactional email service (Resend/SendGrid) + backup to Google Sheets |

**Market Risks:**

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| No one searches for PYGLARA online | Medium | Medium | Site purpose is referral validation, not discovery; Google Business Profile for local search |
| International companies dismiss Venezuelan operation | Medium | High | Professional English copy + equipment manufacturer references (Pilling, Germany) |
| Regulatory changes affect online presence | Low | Medium | No pricing or financials on site; fully compliant content |

**Resource Risks:**

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Content writer unavailable | Medium | Medium | Sir writes draft content; developer polishes. Investor doc separate timeline. |
| Developer unavailable | Low | High | Static site = any web developer can maintain; no proprietary framework lock-in |
| Ing. Miriam unavailable for review | Low | High | Technical specs already documented in input docs; review can happen async |

## Functional Requirements

### Content Presentation (Bilingual)

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

### Client Communication

- FR7: Visitors can initiate a WhatsApp conversation with PYGLARA via a click-to-chat button with a pre-filled message (works on mobile app and desktop web)
- FR8: Venezuelan clients can initiate a structured quote request via WhatsApp with context-aware pre-filled messages (galvanizing page: material/tonnage/dimensions template; copper page: size/quantity/delivery template). International clients (EN) can submit a quote request form with name, email, message, and optional company/title fields via progressive disclosure.
- FR9: International quote form supports file attachment for technical drawings. Venezuelan clients send attachments via WhatsApp natively.
- FR10: Footer displays phone, WhatsApp, email, and physical address on every page, providing persistent contact access without a dedicated general contact form. Desktop WhatsApp buttons include "or email us" fallback text for users without WhatsApp.
- FR10b: Visitors see a confirmation page after submitting any form, displaying a thank-you message, expected response timeframe (24 hours for partnership inquiries, 2 hours during business hours for quotes), a 3-step next-steps sequence for partnership inquiries (review, introductory call, materials shared after qualification), and fallback contact information (phone, WhatsApp).
- FR10c: Visitors receive an automatic confirmation email after submitting any form, confirming receipt, restating the expected response timeframe, and for partnership inquiries, describing the qualification process.

### Investor/Partner Inquiry

- FR11: Visitors can access a "Partnership Opportunities" section that describes PYGLARA's openness to strategic partnerships and investment
- FR12: Visitors can submit a partnership inquiry form with name, organization, email, phone, and message
- FR13: The system separates investor inquiries from client quote requests in notifications

### Notification & Administration

- FR14: Sir receives email notifications when a new quote request is submitted
- FR15: Sir receives email notifications when a new partnership inquiry is submitted
- FR16: Email notifications identify the submission type (quote vs. investor inquiry)
- FR17: Sir can update site content (text, images) within 24 hours of a change decision via code-level edits and deployment
- FR17b: The site includes a privacy policy page (in both languages) disclosing data collection, usage, storage location, retention practices, and file attachment handling

### Search & Discovery

- FR18: The site is indexable by search engines with proper meta tags, heading hierarchy, and sitemap
- FR19: The site provides structured data (LocalBusiness schema) for Google search results
- FR20: Each page exists at a unique, language-specific URL (`/es/servicios`, `/en/services`) with proper `hreflang` tags
- FR21: The site is linked to a claimed Google Business Profile

### Responsive & Mobile Experience

- FR22: Visitors can access all site content and functionality on mobile devices (320px+) with minimum 44px touch targets and a bottom tab bar with 4 always-visible tabs (Galvanizado, Varillas de Cobre, Calidad y Seguridad, Contacto)
- FR23: Visitors can find and tap the WhatsApp click-to-chat button without scrolling on mobile (above the fold or fixed position) and in the site header on desktop
- FR24: Visitors can complete all forms on mobile devices with correct HTML input types (tel, email), minimum 44px touch targets, and no horizontal scrolling on 320px screens
- FR24b: All site content is available in both Spanish and English with human-reviewed, technically accurate translations — not machine-translated. Industrial terminology must use standard terms in each language.

### Investor Document (Offline Deliverable)

- FR25: A standalone investor document exists as a professionally designed PDF with the following sections in order: (1) Executive Summary with clear investment ask on page 1, (2) Current Operational Status (3m kettle active, 7m restart plan, 9m future), (3) Financial Projections at 30% regulated margin with capital deployment timeline and path-to-first-revenue, (4) Market Thesis & Demand Analysis, (5) Competitive Landscape, (6) Plant Capabilities & Equipment, (7) Asset Inventory & Valuation, (8) Management & Operations Team (including Ing. Miriam's role and continuity plan), (9) Deal Structure Options, (10) SWOT Analysis, (11) Contact & Next Steps. A 2-page standalone executive summary is extracted as a separate qualification document.
- FR26: The investor document exists as two separate language versions — one in Spanish, one in English — not a single bilingual document
- FR27: Ing. Miriam reviews and signs off on all technical specifications in the investor document through a structured review process: she receives a marked-up PDF, provides written corrections, and her sign-off is recorded with date. Her corrections override all other content without debate.
- FR28: The investor document is never published on the website — shared only after qualification
- FR29: The investor document addresses international investor concerns: USD repatriation mechanisms, BOD exchange rate risk, OFAC compliance for US-connected investors, and Venezuelan corporate governance structure
- FR30: The investor document includes a version number and date, with a defined update process when material changes occur (certifications achieved, new clients, capacity changes, regulatory updates)
- FR31: The investor document target length is 25-35 pages per language version, with professional typography, data visualizations for financial projections, and plant photography

### Printed Materials (Physical Distribution Assets)

- FR32: A printed meeting kit exists with visually distinct documents: one-page capability statement (bilingual), 3-page sales kit (capability + copper rods + how to order with WhatsApp QR code), and one-page copper rod spec sheet. Each printed page contains complete contact information (phone, WhatsApp, email, address). All documents print-optimized for Carta (Letter) paper, readable in grayscale, with WhatsApp QR code linking to pyglara.com/wa redirect.

### WhatsApp Business (Primary Sales Channel)

- FR33: WhatsApp Business profile is configured with: auto-reply during non-business hours setting response expectations, pre-saved quick reply templates for galvanizing quotes, copper rod specs, and pricing process, and a product catalog showcasing galvanizing services and copper ground rods with specifications.
- FR34: WhatsApp contact links on the website use a domain redirect (pyglara.com/wa?from=[page]) instead of raw wa.me URLs, protecting the phone number from HTML scraping and enabling context-aware pre-filled messages per page.

## Non-Functional Requirements

### Performance

- NFR1: Pages load in under 3 seconds on a 4G mobile connection in Venezuela (measured via Lighthouse throttled 4G profile)
- NFR2: Largest Contentful Paint (LCP) is under 2.5 seconds on all pages
- NFR3: Total page weight does not exceed 500KB per page (HTML + CSS + JS + images)
- NFR4: Lighthouse Performance score is 90 or above on all pages
- NFR5: Cumulative Layout Shift (CLS) is under 0.1 on all pages
- NFR6: First Contentful Paint (FCP) is under 1.5 seconds

### Security

- NFR7: All pages are served over HTTPS with valid SSL certificate
- NFR8: Form submissions are protected against spam and bot abuse with less than 1% spam submissions reaching Sir's inbox
- NFR9: No sensitive business data (financials, margins, investor materials) is accessible via the website, source code, or API routes
- NFR10: Contact form data is transmitted securely and not stored in browser-accessible locations

### Accessibility

- NFR11: Site meets WCAG 2.1 Level AA compliance — sufficient color contrast, alt text on all images, keyboard-navigable forms and navigation, proper heading hierarchy
- NFR12: All interactive elements have visible focus indicators

### Integration

- NFR13: WhatsApp click-to-chat links open correctly on both mobile (native app) and desktop (WhatsApp Web)
- NFR14: Form submission emails deliver within 5 minutes via transactional email service
- NFR15: Failed email deliveries trigger a fallback notification and backup logging to Google Sheets as a persistent fallback store, ensuring zero form submissions are lost
- NFR16: Google Business Profile is linked and reflects accurate business information (address, phone, hours)

### Reliability

- NFR17: Site targets 99.9% uptime via static hosting on global CDN (aspirational — based on platform track record, not a guaranteed SLA at free tier)
- NFR18: Site displays fallback contact information (phone number, WhatsApp link, email address) when any single external integration (WhatsApp API, email service) is temporarily unavailable — core content and navigation remain unaffected
- NFR19: Site includes analytics/measurement infrastructure (Google Analytics 4 or equivalent) tracking page views, form submissions by type, language toggle usage, and WhatsApp click-through rates
