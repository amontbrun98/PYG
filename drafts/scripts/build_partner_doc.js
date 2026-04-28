const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
        WidthType, ShadingType, PageNumber } = require('docx');
const fs = require('fs');

const BLUE = "1F3864";
const LIGHT = "D9E2F3";
const GRAY = "BFBFBF";

const border = { style: BorderStyle.SINGLE, size: 4, color: GRAY };
const borders = { top: border, bottom: border, left: border, right: border };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({ text, bold: opts.bold, color: opts.color, size: opts.size || 22 })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: BLUE, size: 30 })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 180, after: 100 },
    children: [new TextRun({ text, bold: true, color: BLUE, size: 26 })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function cell(text, opts = {}) {
  const widthDxa = opts.width;
  return new TableCell({
    borders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: opts.header ? { fill: BLUE, type: ShadingType.CLEAR } : (opts.alt ? { fill: LIGHT, type: ShadingType.CLEAR } : undefined),
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text,
        bold: opts.header || opts.bold,
        color: opts.header ? "FFFFFF" : undefined,
        size: opts.size || 20
      })]
    })]
  });
}

function table(headers, rows, widths) {
  const totalWidth = widths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { header: true, width: widths[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER }))
  });
  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((c, i) => cell(c, { alt: ri % 2 === 1, width: widths[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER }))
  }));
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows]
  });
}

const CW = 9360; // content width in DXA

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 270 } } } }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "PYGLARA — Prensados y Galvanizados de Lara, S.A.", color: BLUE, bold: true, size: 18 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Confidential — Partnership Proposal  |  Page ", size: 16, color: "808080" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "808080" })
        ]
      })] })
    },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "STRATEGIC PARTNERSHIP PROPOSAL", bold: true, color: BLUE, size: 36 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "PYGLARA  ×  Orinoco Energy Group", bold: true, size: 28 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "Hot-Dip Galvanizing & Copper Electroplating Services — Venezuela", italics: true, color: "595959", size: 22 })]
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 4 } },
        children: [new TextRun({ text: "" })]
      }),

      // Attn
      new Paragraph({
        spacing: { before: 240, after: 80 },
        children: [
          new TextRun({ text: "Attention: ", bold: true }),
          new TextRun({ text: "Daniel Enrique Mendoza" })
        ]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "Company: ", bold: true }),
          new TextRun({ text: "Orinoco Energy Group — Project Cargo & Energy Logistics" })
        ]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "U.S. Incorporated  |  OFAC-Compliant  |  7+ Years of Venezuelan Port Operations", italics: true, color: "595959" })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Date: ", bold: true }),
          new TextRun({ text: "April 8, 2026" })
        ]
      }),

      // Purpose
      h1("1. Purpose of this Proposal"),
      p("PYGLARA is seeking a commercial representation partner to channel galvanizing and copper-plating jobs from Orinoco Energy Group's existing client base (oil & gas, EPC, electrical infrastructure, and project cargo shippers). This document outlines what we can deliver today in Phase 1, our pricing, our strategic location, lead times, and a commission structure for every ton of business the partner brings in."),

      // About PYGLARA
      h1("2. About PYGLARA"),
      p("Prensados y Galvanizados de Lara, S.A. is a turnkey hot-dip galvanizing and copper electroplating facility in Barquisimeto, Venezuela. 100% Venezuelan capital, clean title, founded by Francisco Ballesteros and Nelly Alvarado de Ballesteros. Plant directed by Ing. Miriam, with 36+ years of operational experience. Compliant with COVENIN 1212-81, ASTM A123, and ASTM A153 standards."),
      bullet("2 warehouses, ~3,640 m² total, Zona Industrial I, Barquisimeto"),
      bullet("7m and 9m Pilling (Germany) kettles — installed nameplate capacity 1,440 TM/month"),
      bullet("Copper electroplating line — up to 936 ground rods/day at full cycle"),
      bullet("Only 2 active galvanizers in all of Venezuela. Zero domestic competitors for copper-clad ground rods."),

      // Phase 1 capabilities
      h1("3. What We Can Deliver — Phase 1 (Immediate)"),
      p("Phase 1 is what we can sell today with minimal activation capital. These are the products a partner can quote immediately to their clients:"),
      table(
        ["Kettle / Line", "Status", "Product Focus", "Monthly Capacity"],
        [
          ["65 cm Centrifuge", "ACTIVE NOW", "Nails, small hardware, fasteners", "Continuous"],
          ["3.5 m Kettle", "Phase 1 — ~$94K activation", "Cable trays, solar mounts, crash barriers, brackets", "Up to ~80 TM/month"],
          ["7 m Pilling Kettle", "Phase 2 — 60 day zinc lead", "Pletinas, poles, towers, structural steel", "300 TM/month (best actual)"],
          ["Copper Electroplating", "Phase 3 — $15-30K activation", "Copper-clad ground rods 5/8\"–1\", 1.2–3 m", "Up to 936 rods/day"],
        ],
        [2800, 2200, 2700, 1660]
      ),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),
      p("For an Orinoco-introduced client who only needs small hardware or a pilot batch, we can start this week with the 65 cm centrifuge. For structural steel volume clients, Phase 2 activates in ~11 weeks from the zinc purchase order (60 days shipping + 3 weeks reactivation)."),

      // Pricing
      h1("4. Pricing"),
      p("Service-only model: the client supplies the steel, PYGLARA performs the galvanizing and returns the finished product."),
      table(
        ["Service", "Basis", "Price"],
        [
          ["Hot-dip galvanizing", "Per ton of steel processed (10% zinc absorption)", "Quoted on zinc LME + markup"],
          ["Variable cost floor (internal)", "Per ton", "$345 / TM"],
          ["Target client price range", "Per ton, full service", "$850 – $1,150 / TM"],
          ["Copper-clad ground rod 5/8\" × 2.4 m", "Per unit", "$18 – $28 / unit"],
          ["Copper-clad ground rod 1\" × 3 m", "Per unit", "$45 – $65 / unit"],
          ["Quality standards included", "COVENIN 1212-81 / ASTM A123 / ASTM A153", "No extra charge"],
        ],
        [3800, 3560, 2000]
      ),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),
      p("Firm quotes are issued per RFQ once we know tonnage, piece geometry, and delivery window. Margin cap 30% under Ley de Precios Justos; internal achievable margin ~50% on high-value niches.", { size: 20 }),

      // Location
      h1("5. Strategic Location"),
      p("Calle 26, entre Av. 1ra y 2da, Galpón No. 25-90, Zona Industrial I, Barquisimeto, Estado Lara 3001, Venezuela."),
      bullet("Center of the country — equidistant to Caracas, Maracaibo, Puerto La Cruz, and Puerto Cabello"),
      bullet("~3 hours by truck to Puerto Cabello (main import/export port) — direct match with Orinoco's logistics lanes"),
      bullet("Same industrial complex as CORPOELEC Lara Warehouse N°01, SASGO, GEDISA, Industrias Marullo, MANPEG — walk-in accounts"),
      bullet("Heavy-cargo access via Carrera 1; 3 Clark forklifts (2,500 kg); 2 overhead cranes (2–5 TM)"),

      // Lead times
      h1("6. Lead Times"),
      table(
        ["Scenario", "Lead Time"],
        [
          ["Small hardware job (65 cm centrifuge — active today)", "5 – 10 days from PO"],
          ["3.5 m kettle job (Phase 1 activation required)", "4 – 6 weeks from PO"],
          ["Structural steel — 7 m kettle full capacity", "~11 weeks from PO to first production (60 day zinc lead + 3 week reactivation), then continuous"],
          ["Copper-clad ground rods — initial batch", "3 – 5 weeks from PO"],
          ["Repeat orders once plant is in cycle", "48 – 72 hours per batch"],
        ],
        [6360, 3000]
      ),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      // Partner model
      h1("7. Partnership Model — Raw Material & Sales Commission"),
      p("We are offering Orinoco Energy Group a dual-role partnership:"),
      h2("7.1  Sales Representation (Commission)"),
      bullet("Commission: 3–5% of invoiced value on every job Orinoco sources, paid upon client payment"),
      bullet("Exclusivity available for named accounts (e.g., oil & gas operators Orinoco already services)"),
      bullet("Full co-branding on quotes and technical proposals where appropriate"),
      bullet("PYGLARA handles all technical, compliance (COVENIN / ASTM), and delivery execution"),
      h2("7.2  Raw Material Partner (Zinc & Chemicals Import)"),
      bullet("Orinoco imports zinc SHG 99.99%, HCl, and NH4Cl via its OFAC-compliant logistics lanes to Puerto Cabello"),
      bullet("Reference cost today: ~$4,220/TM delivered (LME ~$3,270 + $590 CIF + 9.32% nationalization)"),
      bullet("Minimum first-order to unlock full Phase 2 production: 70 TM zinc = ~$295K (per Ing. Miriam)"),
      bullet("Structure options: (a) supply-and-settle against production revenue, (b) Orinoco markup on delivered zinc, (c) equity-linked supply contract — all open for discussion"),

      // Why now
      h1("8. Why This Partnership, Why Now"),
      bullet("Venezuela's oil sector is reopening (post-Jan 2026). Rystad projects $183B in O&G capex through 2040; fabrication & construction is the #1 service segment at $41B."),
      bullet("PDVSA pipelines have not been updated in 50 years — enormous pent-up demand for galvanized structural steel and copper grounding."),
      bullet("Only 2 active galvanizers nationwide. PYGLARA has the installed capacity, the standards, and 34 historical clients — 6 already expressed interest in reactivating orders."),
      bullet("Orinoco brings the missing pieces: U.S. incorporation, OFAC compliance, port operations, and a client book in exactly the sectors PYGLARA serves."),

      // Contacts
      h1("9. Contacts"),
      table(
        ["Role", "Name", "Contact"],
        [
          ["Deal Coordinator", "Andrés Montbrún", "amontbrun98@gmail.com"],
          ["Plant Technical Lead", "Ing. Miriam", "Via deal coordinator"],
          ["Plant", "PYGLARA", "+58 424 571 5349  |  @pyglarasa"],
        ],
        [2600, 3000, 3760]
      ),
      new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({ text: "Next step:", bold: true })] }),
      p("A 30-minute call to confirm target accounts, sign a mutual NDA, and draft a one-page Representation & Commission Agreement."),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = "/sessions/laughing-focused-davinci/mnt/PYG/PYGLARA_Orinoco_Partnership_Proposal.docx";
  fs.writeFileSync(out, buffer);
  console.log("Wrote", out);
});
