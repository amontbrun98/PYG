# Story 0.1: Kit de Ventas y Plantillas (Sales Toolkit & Templates)

Status: ready-for-dev

## Story

As a commercial representative visiting potential clients,
I want a complete sales toolkit with talking points, templates, and forms in Spanish,
so that every client visit follows a consistent professional process and produces documented commitments.

## Acceptance Criteria

1. All documents in Spanish
2. Sales script covers galvanizing services AND copper ground rods
3. Contact report captures: company name, contact person, RIF, sector, galvanizing needs, estimated monthly TM, timeline for first order, conditions/requirements, follow-up actions
4. LOI template is simple enough that a purchasing manager signs it on the spot
5. WhatsApp template is copy-paste ready for the client to send
6. Visit priority matrix includes all 6 confirmed-interest targets + CORPOELEC Lara

## Deliverables

### Deliverable 1: Guion de Visita (Sales Script)
- Spanish talking points for face-to-face client meetings
- Opening pitch, key value propositions, objection handling
- Customized talking points per client type (electrical, industrial, EPC)
- What to emphasize: 50 years, only 2 active galvanizers in Venezuela, ASTM/COVENIN standards, Pilling kettles

### Deliverable 2: Ficha de Contacto (Contact Report Form)
- Structured form to fill during/after each visit (FR41)
- Fields: company, contact person, RIF, phone, email, sector, current galvanizing supplier, galvanizing needs, estimated monthly volume TM, timeline for first order, conditions/requirements, copper rod interest, follow-up actions, date, notes

### Deliverable 3: Carta de Intencion (Formal LOI Template)
- Simple one-page letter for client signature (FR40)
- States intent to purchase X tons/month of galvanizing services upon PYGLARA reactivation
- Space for company letterhead, signer name, title, date
- Non-binding but documented

### Deliverable 4: Modelo WhatsApp (Informal LOI Template)
- Pre-written WhatsApp message the client can copy-paste and send (FR40)
- Equally valid for pitch purposes
- Short, professional, includes volume commitment

### Deliverable 5: Matriz de Prioridad (Visit Priority Matrix)
- Which clients to visit first, why, and what to emphasize with each
- All 7 targets with priority order, approach strategy, key talking points per company

## Tasks / Subtasks

- [ ] Task 1: Create Guion de Visita (AC: #1, #2)
  - [ ] General opening pitch
  - [ ] Galvanizing value propositions
  - [ ] Copper ground rod value propositions
  - [ ] Objection handling (plant was inactive, competitors, pricing)
  - [ ] Closing / ask for LOI
- [ ] Task 2: Create Ficha de Contacto (AC: #3)
  - [ ] Design form fields
  - [ ] Create printable format
- [ ] Task 3: Create Carta de Intencion (AC: #4)
  - [ ] Draft formal letter template
  - [ ] Include signature block and date
- [ ] Task 4: Create Modelo WhatsApp (AC: #5)
  - [ ] Draft copy-paste message
  - [ ] Test readability on mobile
- [ ] Task 5: Create Matriz de Prioridad (AC: #6)
  - [ ] Rank all 7 targets
  - [ ] Add per-company talking points and approach strategy

## Dev Notes

- This is a business execution story, not a code story
- All outputs are documents (markdown/printable) that Sir carries to meetings
- Language: ALL documents in Spanish -- Sir's clients speak Spanish
- Tone: Professional but warm, Venezuelan business culture (personal relationship matters)
- Do NOT mention that the plant is currently inactive -- position as "reactivando produccion" or "ampliando capacidad"
- Emphasize: 50 years of operations, only 2 active galvanizers in all of Venezuela, German Pilling kettles, COVENIN/ASTM quality standards
- Key numbers to use: 1,440 TM/month installed capacity, 300 TM/month proven best, 936 ground rods/day copper capacity

### References

- [Source: CLAUDE.md] -- All company data, financial parameters, client research findings
- [Source: _bmad-output/planning-artifacts/epics.md#Epic-0] -- Epic 0 story definitions and target list
- [Source: PYGLARA_Seguimiento_Clientes.xlsx] -- Client tracker with contact details
- [Source: PYGLARA_Client_Brief.docx / PYGLARA_Ficha_Clientes_ES.docx] -- Full client research

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Completion Notes List

Story file created 2026-03-31. Ready for document generation.

### File List

- _bmad-output/implementation-artifacts/0-1-kit-de-ventas-y-plantillas.md (this file)
