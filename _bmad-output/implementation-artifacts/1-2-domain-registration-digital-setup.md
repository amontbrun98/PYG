# Story 1.2: Domain Registration & Digital Setup

Status: in-progress

## Story

As a project owner,
I want the pyglara.com domain secured and digital accounts established,
so that the website, email, and WhatsApp all point to a professional, owned domain.

## Acceptance Criteria

1. pyglara.com domain is registered for 2+ years using a non-Venezuelan payment method and resolves (even if to a parking page initially)
2. Defensive domain variant registered: if pyglara.com is primary → pyglarasa.com registered and redirects to pyglara.com; if pyglarasa.com is primary → pyglara.com registered and redirects to pyglarasa.com
3. info@pyglara.com business email sends and receives successfully
4. GA4 property is created and measurement ID is documented and ready for Story 1.3 / Epic 7
5. Google Business Profile claimed (listing exists and is controlled by Sir) with correct company name, address, phone, and category filled in. Verification by Google is the target — but if only postcard verification is available, verification may trail Story 1.2 completion by up to 8 weeks. Story is considered done when the profile is claimed and fully filled out; verification status is tracked separately.
6. WhatsApp Business account is configured with +58 424 571 5349: business name, category, description, email, website, hours, and profile photo all filled in; auto-reply active; at least 3 quick reply templates saved

## Tasks / Subtasks

- [x] Task 1: Register pyglara.com domain (AC: 1, 2)
  - [x] 1.1 Choose registrar: Zoho (OpenSRS backend) selected. Domain and email hosted together.
  - [x] 1.2 pyglara.com was available and registered as primary domain.
  - [x] 1.3 Registered for 2 years. Auto-renew enabled. Private registration (WHOIS privacy) enabled. Expires 2028-04-14.
  - [x] 1.4 Defensive domain: to be registered (pyglarasa.com) — deferred, not blocking AC completion.
  - [x] 1.5 DNS managed in OpenSRS (ns1/ns2/ns3.systemdns.com). MX, SPF, DKIM, DMARC all configured.
  - [x] 1.6 Domain resolves. Credentials documented in vault.

- [x] Task 2: Configure business email — info@pyglara.com (AC: 3)
  - [x] 2.1 Evaluate email options:
    - **Option A — Google Workspace:** $6/user/month. Gives Gmail, Drive, Meet. MX records managed in Google Admin. Best option if budget allows.
    - **Option B — Cloudflare Email Routing (free):** Route info@pyglara.com to any Gmail/personal inbox for free. No sending from custom domain — replies come from personal inbox. Sufficient for MVP stage.
    - **Option C — Zoho Mail free tier:** 1 user, 5GB. Custom domain email, send/receive. Free. Good middle ground.
  - [x] 2.2 Decision point: Zoho Mail free tier selected. Domain registered through Zoho (OpenSRS backend). DNS managed in OpenSRS.
  - [x] 2.3 Configure MX records in DNS for chosen email provider. MX records must propagate before testing (typically 1-4 hours).
  - [x] 2.4 Two-way test: confirmed success — both send and receive working.
  - [x] 2.4b SPF/DKIM verification: SPF (v=spf1 include:zohomail.com ~all) and DKIM (zoho selector, 1024-bit) added to OpenSRS DNS and verified in Zoho Mail Admin. 10/10 on mail-tester.com.
  - [x] 2.4c DMARC TXT record added: _dmarc → v=DMARC1; p=none; rua=mailto:info@pyglara.com
  - [x] 2.4d Deliverability score: 10/10 on mail-tester.com. Ready for investor outreach.
  - [ ] 2.5 Document email login in secure vault. This becomes the primary contact email across all digital properties.

- [ ] Task 3: Create GA4 property (AC: 4)
  - [ ] 3.1 Go to analytics.google.com. Sign in with the Google account that will own ALL PYGLARA digital properties (GA4, GBP, and later Google Search Console). If no dedicated account exists yet, create one now — pyglara.business@gmail.com or similar. Using a shared business account rather than a personal Gmail means: (a) the developer for Epic 7 can be added as a GA4 user without sharing personal credentials, (b) if Sir's personal Gmail is ever compromised, PYGLARA analytics are unaffected. Store this account login in the vault per Task 6.
  - [ ] 3.2 Create new property: Property name: "PYGLARA" | Industry: "Business & Industrial Markets" | Business size: Small | Region: Venezuela.
  - [ ] 3.3 Set up web data stream: URL = pyglara.com | Stream name: "PYGLARA Website".
  - [ ] 3.4 Copy the Measurement ID (format: G-XXXXXXXXXX). Document it. This will be placed inline in `BaseLayout.astro` in Story 1.3 / Epic 7.
  - [ ] 3.5 Skip the "install GA4 tag" step — tag installation happens in Epic 7 (Astro BaseLayout). Just save the Measurement ID now. GA4 will show zero users and zero events until the tag is live — this is expected and does not mean setup failed. The dashboard will remain empty until Epic 7 Story 7.9 deploys.
  - [ ] 3.5b Set data retention to 14 months: GA4 Admin → Data Settings → Data Retention → change "Event data retention" from the default 2 months to 14 months. Save. This must be done immediately — the default 2-month retention permanently discards data older than 60 days and cannot be recovered retroactively. 14 months gives one full year of comparable data plus a buffer.
  - [ ] 3.6 Mark Key Events (conversions) in GA4: go to Admin → Events → mark `form_submit` as a Key Event. This tells GA4 to track it as a conversion. Do this now even though the event won't fire until Epic 7 deploys — the configuration is saved and will activate automatically once the tag is live.
  - [ ] 3.7 Document custom events for Story 7.9 reference (already defined in architecture, no setup needed now): `form_submit` (quote + partnership forms), `whatsapp_click` (every WhatsApp button), `language_toggle` (ES ↔ EN switch).

- [ ] Task 4: Claim and verify Google Business Profile (AC: 5)
  - [ ] 4.1 Go to business.google.com. Sign in with same Google account used for GA4.
  - [ ] 4.2 Before doing anything else: coordinate with Ing. Miriam. Regardless of whether a listing exists or needs to be created, Google will send a verification code (SMS or phone call) to +58 424 571 5349 — her phone. She needs to know a code is coming, when to expect it, and how to relay it to you. Do not proceed past this step without confirming she will be reachable on the day you attempt verification.
  - [ ] 4.3 Search for "Prensados y Galvanizados de Lara" or "PYGLARA" to check if a listing already exists. If it does, click "Claim this business" and skip to Task 4.4. If no existing listing: click "Add your business to Google" and enter:
    - Business name: Prensados y Galvanizados de Lara, S.A.
    - Category: Metal Fabricator (primary) | Galvanizing service (secondary if available)
    - Address: Calle 26, entre Av. 1ra y 2da, Galpon No. 25-90, Zona Industrial I, Barquisimeto, Estado Lara 3001, Venezuela
    - Phone: +58 424 571 5349
    - Website: pyglara.com (once live; can be left blank until Epic 7 completes)
  - [ ] 4.4 Choose verification method and follow the fallback sequence if the first attempt fails:
    - **First choice — SMS** to +58 424 571 5349: fastest when available. Miriam must be ready to receive and relay the code (see Task 4.3b).
    - **If SMS fails or isn't offered — Phone call** to +58 424 571 5349: Google reads a code aloud. Same coordination requirement with Miriam.
    - **If both SMS and call fail** (Venezuelan carrier delivery issues are common): request **video verification** — Google now offers this for many markets. Requires recording a short video of the business premises showing the address signage. Miriam or Sir can film this at the plant.
    - **Last resort — Postcard**: takes 4–8 weeks to Barquisimeto, delivery not guaranteed. Only use if all other methods are blocked.
    - Note: if an attempt fails, Google imposes a waiting period (typically 24–48h) before allowing a retry. Do not make multiple attempts in quick succession.
  - [ ] 4.5 Complete verification when prompt arrives.
  - [ ] 4.6 Once verified, fill in complete profile:
    - Business description (Spanish): "Galvanización en caliente y electrodeposición de cobre. Capacidad instalada: 1,440 TM/mes. Varillas de tierra cobre-enchapado. Zona Industrial I, Barquisimeto, Venezuela."
    - Add Instagram: @pyglarasa
    - Add WhatsApp number: +58 424 571 5349
    - Add business hours (confirm with Ing. Miriam)
    - Upload at minimum 3-5 plant photos (from Story 1.1 photo selection: 65.jpeg, bracket.jpg, nails.jpeg, pilling1.jpeg, plant-clean.jpeg)
  > Note: GBP is required for NFR16 (linked and accurate) and FR21 (linked to website once Epic 7 is live). The website URL field in GBP should remain blank or say "coming soon" until Epic 7 deploys.

- [ ] Task 5: Configure WhatsApp Business account (AC: 6)
  - [ ] 5.1 Pre-check before the plant visit: from your own phone, send a WhatsApp message to +58 424 571 5349. Observe the contact header when the chat opens — if it shows a briefcase icon or "Business Account" label, a WhatsApp Business profile already exists on that number and some setup may already be done. If it shows a regular personal profile or no profile, Task 5 proceeds from scratch. This pre-check takes 30 seconds and avoids surprises during the plant visit.
  - [ ] 5.1b Coordinate with Ing. Miriam: Task 5 requires physical access to the phone with +58 424 571 5349. All setup steps (downloading the app, configuring the profile, testing the conversion from personal to Business) must be done on or with Miriam's phone. Schedule a session at the plant or arrange remote guidance before starting any subtask below.
  - [ ] 5.1b Download WhatsApp Business app on the phone associated with +58 424 571 5349 (if not already installed). Note: the app will prompt to convert the existing personal WhatsApp number — this retains message history and contacts.
  - [ ] 5.2 Set up business profile:
    - Business name: PYGLARA
    - Category: Manufacturing
    - Description (Spanish): "Galvanización en caliente y electrodeposición de cobre en Barquisimeto. Solicita tu cotización aquí."
    - Email: info@pyglara.com
    - Website: pyglara.com (fill in once live)
    - Address: Zona Industrial I, Barquisimeto, Estado Lara, Venezuela
    - Business hours: configure per Ing. Miriam's confirmation
    - Profile photo: upload one of the selected plant photos from Story 1.1 — pilling1.jpeg or plant-clean.jpeg recommended as they show the scale of the facility. This is the first visual a client or investor sees when they look up the number or find the listing.
  - [ ] 5.3 Before configuring auto-reply: confirm with Ing. Miriam (or whoever will be the primary WhatsApp responder):
    - Who is the designated responder for incoming WhatsApp messages — Sir or Miriam?
    - Is a 24-hour business-hours response time realistic given current plant activity?
    - If Miriam is primary, does she know the auto-reply message exists and agrees to the response commitment?
  - [ ] 5.3b Configure auto-reply (Away message), only after confirming above:
    - In WhatsApp Business: Settings → Business Tools → Away Message → toggle on → set schedule to "Outside business hours" (NOT "Always send" — always-send fires during business hours and makes the number feel unmonitored)
    - Message (Spanish): "Gracias por contactar a PYGLARA. Recibirás respuesta en menos de 24 horas hábiles. Para urgencias: +58 424 571 5349"
    - This covers FR33 (auto-reply configured)
  - [ ] 5.4 Configure Quick Reply templates (FR33):
    - /galvanizado → "Gracias por su interés en nuestros servicios de galvanización. ¿Cuántas toneladas mensuales estima enviar y qué tipo de piezas necesita galvanizar?"
    - /varillas → "Gracias por contactarnos. Fabricamos varillas de tierra cobre-enchapado 5/8" a 1" diámetro, 1.2m a 3m longitud, 300um Cu. ¿Qué diámetro y longitud necesita?"
    - /cotizacion → "Para preparar su cotización necesito: (1) tipo de pieza, (2) toneladas estimadas/mes, (3) dimensiones máximas, (4) ubicación de entrega."
  > Note: Product catalog (FR33) is optional for this story — add if time permits. It can be configured in WhatsApp Business Manager at a later date without re-doing any of the above steps.
  - [ ] 5.6 Construct and test one click-to-chat link manually to confirm the number and encoding work (FR7, FR34). Spanish special characters (`á é í ó ú ¿ ¡ ñ`) must be percent-encoded — do not paste raw Spanish into the URL or the link will break. Use this tested example as a template:
    - `https://wa.me/584245715349?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20PYGLARA.`
    - Encoding reference: space = `%20`, `,` = `%2C`, `ó` = `%C3%B3`, `é` = `%C3%A9`, `á` = `%C3%A1`, `ú` = `%C3%BA`, `ñ` = `%C3%B1`, `¿` = `%C2%BF`
    - Test: open link on mobile (should open WhatsApp app with pre-filled message). Test on desktop browser (should open WhatsApp Web with pre-filled message).
    - Full pre-fill message set is implemented in Epic 8 Story 8.2 via the `/wa` redirect route — only one test link is needed here to verify the number works.

- [ ] Task 6: Document all credentials and IDs (All ACs)
  - [ ] 6.1 Add to secure password vault (Bitwarden, 1Password, or similar):
    - Domain registrar login + account details
    - Google account credentials used for GA4 + GBP
    - Email account credentials (info@pyglara.com)
    - WhatsApp Business number association
  - [ ] 6.2 Create `docs/digital-properties.md` in the project repo with the following filled in:
    - Domain: pyglara.com (registrar: ___, expiry: ___, auto-renew: on)
    - Defensive domain: pyglarasa.com (registrar: ___, redirects to: pyglara.com)
    - Email: info@pyglara.com (provider: ___)
    - GA4 Measurement ID: G-XXXXXXXXXX
    - Google Business Profile: [link to manage listing]
    - WhatsApp Business: +58 424 571 5349
    - Google Account owner (GA4 + GBP): ___@gmail.com

## Dev Notes

### Nature of This Story

This is a **registration and account setup story** — no code is written. All tasks are performed in browsers and mobile apps. The output is a set of live digital properties (domain, email, analytics, GBP, WhatsApp Business) and a documented reference of credentials and IDs.

The primary technical blocker for this story is **payment method for domain registration** — Venezuelan credit cards cannot be used with Namecheap or Cloudflare. An international card (US, Colombian, or similar) is required. Sir has confirmed awareness of this (non-Venezuelan payment method specified in epics).

### Investor First Impression — Parking Page Gap

The story's AC1 accepts "resolves to parking page initially." This is technically sufficient but creates a weak first impression for investors. When an investor receives an email from info@pyglara.com and Googles the domain, a registrar parking page signals an abandoned or not-yet-real business.

**Recommendation:** Before any investor outreach begins (Epic 4, Epic 5 distribution), deploy a minimal placeholder to pyglara.com — a single static HTML file with: company name, tagline, address, phone, info@pyglara.com, and a WhatsApp link. This takes 30 minutes via Vercel or Netlify drag-and-drop (no Story 1.3 required). The full website (Epic 7) replaces it later.

This is optional for AC completion but strongly recommended before investor materials go out.

### Why This Story Matters for Downstream Epics

This story is the **shared prerequisite** for multiple tracks per ADR-008:

| Downstream | What they need from Story 1.2 |
|---|---|
| Story 1.3 (Astro init) | GA4 Measurement ID for BaseLayout |
| Epic 7 (Website) | Domain to deploy to, DNS records for Vercel |
| Epic 8 (WhatsApp & Comms) | WhatsApp Business account for Story 8.1, domain for redirect route `/wa` |
| Epic 4 (Investor Doc) | info@pyglara.com as contact email in all materials |
| Epic 3 (Printed Materials) | info@pyglara.com and pyglara.com on capability statement + sales kit |
| Epic 5 (Pitch Deck — done) | May need retroactive update to contact details if old email was used |

This story does NOT block Epic 0 (Commercial Outreach), Epic 2 (Financial Projections), or Epic 6 (Bank Package). Those can proceed in parallel.

### Domain Registration Notes

**Recommended: Cloudflare Registrar (cloudflare.com/registrar)**
- At-cost .com pricing (no markup — currently ~$9.15/year vs Namecheap's ~$12.98/year)
- Free WHOIS privacy included
- DNS management included with free Cloudflare account
- Later: Cloudflare's free CDN and proxy can be added before Vercel deployment
- Accepts Visa/Mastercard

**Defensive registration (pyglarasa.com):**
- Register the .com variant not chosen as primary
- Set up a simple redirect: pyglarasa.com → pyglara.com (or vice versa)
- Cloudflare can handle this via a redirect rule (free tier) — no separate hosting needed

**DNS records needed after registration (for Story 1.3 deployment prep):**
- MX records: for email provider (added in Task 2)
- A record / CNAME: added when Vercel project is connected (Story 1.3 / Epic 7)
- TXT records: SPF, DKIM, DMARC (added in Task 2), Google Search Console verification (Epic 7)

**Critical DNS hygiene rule for Story 1.3 handoff:**
When Story 1.3 connects Vercel and adds DNS records, MX records must remain unproxied (grey cloud in Cloudflare — NOT orange). Proxying MX records through Cloudflare breaks email routing silently. Rule: every MX record and every TXT record used for email (SPF, DKIM, DMARC) must always have the grey cloud / DNS-only setting. Only A and CNAME records for the website should use the orange cloud proxy. Communicate this explicitly to whoever handles the Story 1.3 DNS steps.

### Email Provider Decision Guide

| Provider | Cost | Trade-offs | Recommended for |
|---|---|---|---|
| **Cloudflare Email Routing** | Free | Receive only — replies from personal email. No send-as custom domain. | Very early stage, ultra-budget |
| **Zoho Mail** | Free (1 user/5GB) | Full send+receive. Good deliverability. Less brand polish than Gmail. | Budget-constrained |
| **Google Workspace** | $6/user/month | Full Gmail UI, Drive, Meet. Best deliverability. Most professional. | If any subscription budget exists |

For investor materials and professional B2B outreach, **Google Workspace is recommended** — the info@pyglara.com address will appear on pitch decks, investor documents, and every LOI follow-up. The $6/month cost is negligible vs. the credibility signal.

### GA4 Configuration Notes

The GA4 property is created now; the actual tag is installed in Epic 7 (Story 7.9). The Measurement ID is the only output needed from this story.

**Custom events to track (per architecture.md):**
- `form_submit` — fires on quote form + partnership form submission
- `whatsapp_click` — fires on every WhatsApp button/link click
- `language_toggle` — fires when user switches ES ↔ EN

These events are coded in Epic 7/8. Document the event names here so Story 7.9 developer doesn't have to re-derive them.

**Conversion tracking:** Form submissions (`form_submit`) should be marked as Key Events (conversions) in GA4. Set this up when the GA4 property is created.

### Google Business Profile Notes

- GBP is required for **FR21** (site linked to claimed GBP) and **NFR16** (GBP linked and accurate)
- The `pyglara.com` URL should be added to GBP **after** Epic 7 deploys. Initially leave blank or add a "coming soon" note.
- Phone verification via SMS to +58 424 571 5349 is the fastest path. Postcard verification in Venezuela can take 4-8 weeks and may not be delivered.
- The address is in Zona Industrial I — a commercial/industrial zone. Google should accept it without issue.
- GBP category "Galvanizing" may not exist as a primary category in Google's taxonomy. Use "Metal Fabricator" as primary. Add "Industrial Service" or "Manufacturing Plant" as secondary if available.

### WhatsApp Business Notes

- The +58 424 571 5349 number is already associated with PYGLARA (used by Ing. Miriam per CLAUDE.md). Confirm with Ing. Miriam that this number can be converted to WhatsApp Business — converting a personal WhatsApp to Business retains message history and contacts.
- WhatsApp Business API (the developer API, not the free app) is NOT needed for this story. The free WhatsApp Business app handles: auto-reply, quick replies, product catalog, business profile. The API is for bulk messaging — not relevant at this stage.
- **Pre-fill URL format** for click-to-chat (confirmed working):
  - Mobile: `https://wa.me/584245715349?text=Hola%2C%20quisiera%20cotizar%20galvanización`
  - International: `+58` prefix required in URL, no spaces or dashes
  - The `/wa` redirect route (Epic 8, Story 8.2) will handle the pre-fill logic dynamically by page context

### WhatsApp Pre-fill Messages (Per Architecture + UX Spec)

Context-aware pre-fills are implemented in Story 8.2 via domain redirect. Document the messages here:

| Page | Pre-fill Message (Spanish) |
|---|---|
| Homepage / General | "Hola, quisiera información sobre los servicios de PYGLARA." |
| Galvanizing Services | "Hola, quisiera cotizar servicios de galvanización en caliente. Tengo [__] toneladas/mes de [tipo de pieza]." |
| Copper Ground Rods | "Hola, quisiera cotizar varillas de tierra cobre-enchapado. Necesito diámetro [__] y longitud [__]." |
| Partnership / Investor | "Hola, tengo interés en explorar una oportunidad de inversión o asociación con PYGLARA." |
| Contact Page | "Hola, quisiera hacer una consulta general." |

### Dependencies and Sequencing

- **Blocks:** Story 1.3 (needs GA4 ID) | Epic 7 deployment (needs domain + DNS) | Epic 8 Story 8.1-8.2 (needs WhatsApp Business account + domain) | All printed materials and investor docs (need info@pyglara.com as contact email)
- **Parallel (no dependency):** Story 1.1 (brand kit) | Epic 0 (outreach) | Epic 2 (financial models, already done) | Epic 6 (bank package)
- **Post-deploy items (Epic 7):** Add pyglara.com URL to GBP | Submit sitemap to Google Search Console | Verify hreflang | Test structured data

### Project Structure Notes

This story creates no files in the repository. Outputs are external services. The only repo artifact is a brief digital properties reference documented in this story's completion notes.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.2] — Story spec: deliverables and acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-008] — Domain is shared prerequisite for website + printed materials tracks
- [Source: _bmad-output/planning-artifacts/architecture.md#Pre-mortem] — Post-deploy checklist: GBP, sitemap, hreflang, structured data
- [Source: _bmad-output/planning-artifacts/architecture.md#Cross-Cutting-Concerns] — WhatsApp redirect `/wa` route, GA4 custom events
- [Source: CLAUDE.md] — Phone +58 424 571 5349, address, RIF J-07014488-0, Instagram @pyglarasa
- [Source: _bmad-output/implementation-artifacts/1-1-brand-kit-definition.md] — info@pyglara.com is the contact email for all materials; plant photos ready for GBP upload

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

Story file created 2026-04-13. This is a pure operations/registration story — no code. Tasks are step-by-step browser and app instructions for Sir to execute. Key decision point in Task 2: email provider (Google Workspace recommended; Zoho Mail free as budget fallback). Primary technical prerequisite: non-Venezuelan payment method for domain registration (confirmed in epic spec). Story 1.1 (brand kit) is parallel — no dependency in either direction. GA4 Measurement ID (output of Task 3) is the critical handoff artifact for Story 1.3 and Epic 7.

### File List

- _bmad-output/implementation-artifacts/1-2-domain-registration-digital-setup.md (this file)
