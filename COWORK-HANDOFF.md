# PYGLARA — Claude Cowork Handoff Brief

> **Project:** Investor-ready document package for PYGLARA (galvanizing plant acquisition)
> **Handoff date:** 2026-03-25
> **Working directory:** c:\Users\amont\Desktop\PYG\

---

## HOW TO WORK

**You MUST use professional document generation tools and skills.** Do NOT just create markdown files -- people read PDFs and DOCX files, not markdown.

### Document Generation Process
1. **For each document:** First write the content as clean, professional markdown
2. **Then convert to PDF:** Use Python with libraries like `reportlab`, `fpdf2`, `weasyprint`, or `markdown2` + `pdfkit` to generate real PDF files. If those aren't available, use `python-docx` to create DOCX files.
3. **For DOCX files:** Use `python-docx` library to create properly formatted Word documents with headers, tables, page breaks, and embedded images
4. **For charts:** Use `matplotlib` to create high-quality PNG charts, then embed them in the PDFs/DOCX files
5. **Check what's available first:** Run `pip list` to see what Python packages are installed. Install what you need with `pip install`.

### Quality Standards for Documents
- Professional title pages with company name, document title, date, and "Confidential" marking
- Consistent headers, fonts, and spacing throughout
- Tables must be properly formatted (not raw markdown)
- Charts embedded directly into the documents, not as separate files
- Page numbers on every page
- Footer: "Prensados y Galvanizados de Lara, S.A. -- Zona Industrial I, Barquisimeto"
- NO emojis anywhere
- Spanish language for all investor-facing documents
- Clean, corporate look -- this goes to real investors and business owners

### Preferred Output Formats
- **PDFs** for documents that will be shared via WhatsApp/email (most people can open these)
- **DOCX** as backup format in case PDF generation fails
- **PNG** for charts (high resolution, 300 DPI)
- Keep the markdown source files too as working copies

## YOUR MISSION

Create a professional investor-ready document folder at `investor-ready/` with **PDF files, DOCX files, charts, and email drafts**. This is for a family-first review by the agent's cousin **Jorge Christian** and his wife **Ana Brillembourg**, before being formalized and sent to the plant owners.

---

## CRITICAL RULES

1. **DO NOT include the client list or client contact details anywhere.** The files `PYGLARA_Client_Brief.docx`, `PYGLARA_Client_Brief.pdf`, `docs/historical-clients-registry.md`, and `docs/client-prospecting-plan.md` are PROPRIETARY — they are the agent's competitive advantage for acquiring clients. Instead, mention: *"We have identified and profiled 34 historical clients, 6 of which have confirmed interest in reactivating orders. A detailed outreach campaign is underway."*

2. **DO NOT use emojis** in any deliverable. The user has explicitly requested clean, professional documents.

3. **Use 30% regulated margin** (Ley de Precios Justos) as the base case for all pricing, NOT 50%.

4. **Use 300 TM/month** as the realistic capacity for the 7m kettle (best actual month), NOT 1,440 TM/month (nameplate).

5. **The contract should feel FRIENDLY** — it's going to cousin Jorge Christian and his wife Ana first. Keep the legal structure but make the tone warm and collaborative, not adversarial.

---

## TASK LIST

### Task 1: Financial Charts (Python + matplotlib)
Create charts and save as PNG in `investor-ready/`:

**Chart 1: `top-3-years-bar.png`** — Bar chart of the 3 best years (SENIAT-confirmed):
| Year | Sales USD | Profit USD | Margin |
|---|---|---|---|
| 2006 | $1,712,464 | $287,573 | 16.8% |
| 2009 | $1,739,091 | $315,552 | 18.1% |
| 2012 | $1,726,168 | $203,333 | 11.8% |
- Subtitle: "Cifras declaradas ante el SENIAT, suministradas por la contadora de la empresa"
- Dual bars: blue for Sales, green for Profit
- Clean, professional style, no emojis

**Chart 2: `phased-investment.png`** — Stacked/stepped bar chart showing phased investment:
| Phase | Investment | Cumulative | What It Unlocks |
|---|---|---|---|
| Phase 0 (now) | $0 | $0 | 65cm centrifuge — nails |
| Phase 1 | ~$94K | ~$94K | 3.5m kettle |
| Phase 2 | ~$221K | ~$315K | 7m production (300 TM/mo) |
| Phase 3 | $15-30K | ~$345K | Copper line (936 rods/day) |

**Chart 3: `revenue-projection.png`** — Revenue projection at 300 TM/month:
- Monthly revenue at $448.50/TM (30% margin on $345 variable cost)
- Show ramp-up: Month 1 = 50 TM, Month 2 = 100 TM, Month 3 = 150 TM, Month 6 = 250 TM, Month 12 = 300 TM
- Add copper line revenue starting Month 7 at $46,750/month ($561K/yr / 12)
- Y-axis in USD, X-axis months 1-12

**Chart 4: `capacity-by-kettle.png`** — Pie or horizontal bar showing capacity per kettle:
- 65cm: ~5 TM/mo
- 3.5m: ~50 TM/mo
- 7m: 300 TM/mo
- 9m: ~400 TM/mo (future)
- Show which are active/inactive

### Task 2: Investor-Ready PDFs
Generate well-formatted markdown documents in `investor-ready/` that can be converted to PDF. Each should have a title page header, professional formatting, and include relevant charts where applicable.

**Doc 1: `01-PYGLARA-Resumen-Ejecutivo.md`**
- Executive summary in Spanish (2-3 pages max)
- What PYGLARA is, where it is, what it does
- The opportunity (only 2 competitors, oil sector reopening)
- Key numbers: capacity, investment needed, timeline to revenue
- Quality standards: COVENIN 1212-81, ASTM A123, ASTM A153
- Embed `top-3-years-bar.png` and `phased-investment.png`
- DO NOT include client names or contacts
- Mention: "34 clientes historicos identificados, 6 con interes confirmado en reactivar pedidos"

**Doc 2: `02-PYGLARA-Capacidades-y-Zinc.md`**
- Updated copy of `docs/capacidades-y-capital-de-zinc.md` (already updated with COVENIN/ASTM, corrected 300 TM capacity)
- Embed `capacity-by-kettle.png`
- Add the COVENIN 1212-81 / ASTM A123 / A153 standards table

**Doc 3: `03-PYGLARA-Historico-Financiero.md`**
- Source: `docs/financial-history-2005-2019.md`
- Add SENIAT confirmation note prominently at the top
- Embed `top-3-years-bar.png`
- Include the full P&L table in Bolivares
- Add the USD conversion table for top 3 years

**Doc 4: `04-PYGLARA-Analisis-Competitivo.md`**
- Source: `docs/competitive-analysis-venezuela-galvanizing.md`
- Clean copy, professional formatting
- Key message: only 2 active competitors, zero copper rod competitors

**Doc 5: `05-PYGLARA-Propuesta-Agente-Comercial.md`**
- Source: `docs/commercial-agent-deliverables-proposal.md`
- This is YOUR proposal to the owners showing what you'll do
- Remove any internal notes, keep it presentation-ready
- Embed `revenue-projection.png`
- DO NOT include client names/contacts — reference "34 clients identified, outreach campaign ready"

**Doc 6: `06-PYGLARA-Contrato-Representacion.md`**
- Source: `docs/contrato-representacion-comercial-PYGLARA.md`
- Make it FRIENDLY in tone — this goes to cousin Jorge Christian and his wife Ana Brillembourg first
- Pre-fill what you can:
  - EL REPRESENTANTE: Andres Montbrun
  - Territory: Nacional (Venezuela)
  - Commission: 5% (introduction level — as discussed in our conversations)
  - Keep the sweat equity and deferred compensation clauses but frame them as "options to discuss"
  - Add a cover note: "Jorge, Ana — este es un borrador para su revision. Los terminos son negociables y quiero que se sientan comodos antes de formalizarlo. Cualquier sugerencia es bienvenida."
- Remove or soften the most aggressive legal language

### Task 3: Email Drafts

**Email 1: `email-jorge-ana.md`** — For cousin Jorge Christian and his wife Ana Brillembourg
- Tone: Warm, family, collaborative
- In Spanish
- Subject line suggestion included
- Attach list: Docs 1-6 from above
- Key message: "I've been working on this opportunity and want your eyes on it before I formalize anything. Here's what I've found, what I'm proposing, and the contract draft. Tell me what you think."
- Mention the client pipeline exists but don't share the list — say "tengo una lista de 34 empresas investigadas y 6 con interes confirmado, que les compartire en persona"
- Ask them to review the contract especially

**Email 2: `email-owners-miriam.md`** — For Ing. Miriam / Don Francisco (plant owners)
- Tone: Professional, respectful, confident
- In Spanish
- Subject line suggestion included
- Attach list: Docs 1, 2, 3, 4 only (NOT the contract or proposal yet)
- Key message: "Here are the results of my investigation. I've documented your plant, your financials, your market position, and I'm ready to present a formal proposal for commercial representation. When can we meet?"
- Mention: "Estoy trabajando en la reactivacion de la cartera de clientes y pronto estare contactando empresas directamente"
- DO NOT reveal the full client list or the deliverables plan

### Task 4: Folder Index
Create `investor-ready/INDEX.md` listing all files with descriptions and who each is intended for.

---

## SOURCE FILES REFERENCE

| Source | Location | Notes |
|---|---|---|
| Capacidades y zinc (updated) | `docs/capacidades-y-capital-de-zinc.md` | Updated 2026-03-25 with COVENIN/ASTM, corrected 300 TM |
| Plant equipment registry | `docs/plant-equipment-registry.md` | Updated 2026-03-25 with standards, 3.5m/copper reconfirmed |
| Financial history | `docs/financial-history-2005-2019.md` | Updated 2026-03-25 with SENIAT confirmation |
| Competitive analysis | `docs/competitive-analysis-venezuela-galvanizing.md` | Current |
| Deliverables proposal | `docs/commercial-agent-deliverables-proposal.md` | Current |
| Contract | `docs/contrato-representacion-comercial-PYGLARA.md` | Needs friendly tone adaptation |
| CLAUDE.md | `CLAUDE.md` | Master reference for all project data |
| Financial chart (existing) | `docs/PYGLARA-Financial-Top3-Years-USD.png` | Can be used as reference |

## KEY DATA POINTS (quick reference)

- **Asking price:** $1,000,000 USD (negotiable)
- **Real estate value:** $691,600-$990,080
- **9m Pilling kettle value:** $570,000
- **Minimum startup investment:** $336,000 (per Ing. Miriam)
- **Variable cost per ton:** $345
- **Service price per ton (30% margin):** $448.50
- **7m best actual month:** 300 TM
- **Copper line potential:** $561K-$1.05M/year
- **Active competitors:** 2 (copper rod competitors: 0)
- **Quality standards:** COVENIN 1212-81, ASTM A123, ASTM A153
- **Zinc delivered cost:** $4,220/TM
- **Workers needed at full capacity:** 15
- **Historical clients:** 34 (6 interested in reactivating) — DO NOT LIST THEM
- **Financial data:** SENIAT-declared, provided by company accountant
- **Top 3 years:** 2006 ($1.71M), 2009 ($1.74M), 2012 ($1.73M)
- **Zinc lead time:** 60 days order-to-plant
- **Reactivation time:** 3 weeks after zinc arrives

---

## OUTPUT STRUCTURE

```
investor-ready/
  INDEX.md                                        -- Master file list with descriptions
  01-PYGLARA-Resumen-Ejecutivo.pdf                -- Executive summary with charts embedded
  01-PYGLARA-Resumen-Ejecutivo.docx               -- DOCX backup
  02-PYGLARA-Capacidades-y-Zinc.pdf               -- Plant capacity + zinc analysis
  02-PYGLARA-Capacidades-y-Zinc.docx              -- DOCX backup
  03-PYGLARA-Historico-Financiero.pdf              -- SENIAT-confirmed financial history
  03-PYGLARA-Historico-Financiero.docx             -- DOCX backup
  04-PYGLARA-Analisis-Competitivo.pdf              -- Competitive landscape
  04-PYGLARA-Analisis-Competitivo.docx             -- DOCX backup
  05-PYGLARA-Propuesta-Agente-Comercial.pdf        -- Agent deliverables pitch
  05-PYGLARA-Propuesta-Agente-Comercial.docx       -- DOCX backup
  06-PYGLARA-Contrato-Representacion.pdf           -- Friendly contract for Jorge & Ana
  06-PYGLARA-Contrato-Representacion.docx          -- DOCX backup (editable for revisions)
  charts/
    top-3-years-bar.png                            -- 300 DPI
    phased-investment.png                          -- 300 DPI
    revenue-projection.png                         -- 300 DPI
    capacity-by-kettle.png                         -- 300 DPI
  emails/
    email-jorge-ana.md                             -- Draft for cousin (copy/paste into Gmail)
    email-owners-miriam.md                         -- Draft for plant owners
  source/
    *.md                                           -- Markdown source files (working copies)
```

**Priority:** PDF first (this is what gets sent via WhatsApp/email). DOCX as backup (editable). If PDF generation fails for a document, DOCX is acceptable as the primary output — do NOT skip a document just because one format fails. Charts must always be PNG.

---

## WHEN DONE

- Verify every PDF/DOCX opens correctly and looks professional
- Verify charts are embedded in documents, not just separate files
- Verify every document for: no client names/contacts leaked, no emojis, 30% margin used, 300 TM capacity used
- Verify the contract has the friendly tone and cover note for Jorge and Ana
- Update INDEX.md with final file list and file sizes
- Leave a summary of what was created, what format each is in, and any issues found
- If any PDF generation failed, explain why and confirm DOCX backup exists
