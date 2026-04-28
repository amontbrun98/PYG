const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
        WidthType, ShadingType, PageNumber, ImageRun, PageBreak } = require('docx');
const fs = require('fs');

const BLUE = "0B3D91";      // PYGLARA blue (matches plant facade)
const LIGHT_BLUE = "D6E4F5";
const ACCENT = "C0C0C0";    // silver / galvanized
const DARK = "1A1A1A";

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const allNone = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function tx(text, opts = {}) {
  return new TextRun({
    text,
    bold: opts.bold,
    italics: opts.italics,
    color: opts.color,
    size: opts.size || 22,
    font: opts.font
  });
}

function para(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 0, after: opts.after != null ? opts.after : 120 },
    children: Array.isArray(runs) ? runs : [runs]
  });
}

function h1(text, color = BLUE) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 140 },
    children: [tx(text, { bold: true, color, size: 34 })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: BLUE, space: 4 } }
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 180, after: 100 },
    children: [tx(text, { bold: true, color: BLUE, size: 26 })]
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [tx(text, { size: opts.size || 22 })]
  });
}

function image(path, w, h) {
  const data = fs.readFileSync(path);
  return new ImageRun({
    type: "jpg",
    data,
    transformation: { width: w, height: h },
    altText: { title: "PYGLARA", description: "PYGLARA plant photo", name: "plant" }
  });
}

function imgPara(path, w, h, align = AlignmentType.CENTER) {
  return new Paragraph({
    alignment: align,
    spacing: { before: 80, after: 80 },
    children: [image(path, w, h)]
  });
}

function captionPara(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [tx(text, { italics: true, color: "595959", size: 18 })]
  });
}

// Two-column image+text cell pair
function twoCol(leftChildren, rightChildren, widths = [4680, 4680]) {
  return new Table({
    width: { size: widths[0] + widths[1], type: WidthType.DXA },
    columnWidths: widths,
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: allNone,
          width: { size: widths[0], type: WidthType.DXA },
          margins: { top: 60, bottom: 60, left: 60, right: 120 },
          children: leftChildren
        }),
        new TableCell({
          borders: allNone,
          width: { size: widths[1], type: WidthType.DXA },
          margins: { top: 60, bottom: 60, left: 120, right: 60 },
          children: rightChildren
        }),
      ]
    })]
  });
}

const IMG = "/sessions/laughing-focused-davinci/mnt/PYG/brochure-images";

// --- Logomark (text-based since no logo asset) ---
const logomark = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [tx("PYGLARA", { bold: true, color: BLUE, size: 72 })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [tx("PRENSADOS Y GALVANIZADOS DE LARA, S.A.", { bold: true, color: DARK, size: 20 })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [tx("Hot-Dip Galvanizing  |  Copper Electroplating  |  Barquisimeto, Venezuela", { italics: true, color: "595959", size: 18 })]
  }),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: "Calibri", color: BLUE },
        paragraph: { spacing: { before: 240, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: BLUE },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "■", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 270 } }, run: { color: BLUE } } }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [tx("PYGLARA  |  Company Brochure  |  2026", { color: BLUE, bold: true, size: 16 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          tx("Calle 26, Zona Industrial I, Barquisimeto, Venezuela  |  +58 424 571 5349  |  @pyglarasa  |  Page ", { size: 14, color: "595959" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 14, color: "595959" })
        ]
      })] })
    },
    children: [
      // ============ COVER ============
      ...logomark,
      new Paragraph({ spacing: { before: 200, after: 0 }, children: [tx("")] }),
      imgPara(`${IMG}/facade.jpg`, 560, 265),
      captionPara("PYGLARA facility — Zona Industrial I, Barquisimeto"),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 120 },
        children: [tx("THE LEADING GALVANIZER IN VENEZUELA", { bold: true, color: BLUE, size: 30 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [tx("German Pilling kettles  •  COVENIN 1212-81  •  ASTM A123  •  ASTM A153", { bold: true, color: DARK, size: 20 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [tx("1,440 TM/month installed capacity  •  36+ years of operational expertise", { italics: true, color: "595959", size: 20 })]
      }),

      // Stat band (3-column)
      new Table({
        width: { size: 10080, type: WidthType.DXA },
        columnWidths: [3360, 3360, 3360],
        rows: [new TableRow({
          children: [
            ["1,440 TM", "Installed monthly\ncapacity"],
            ["2 of 2", "Active galvanizers\nin Venezuela"],
            ["50+", "Years of Pilling\nkettle technology"]
          ].map(([big, small]) => new TableCell({
            borders: allNone,
            width: { size: 3360, type: WidthType.DXA },
            shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
            margins: { top: 180, bottom: 180, left: 120, right: 120 },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
                children: [tx(big, { bold: true, color: BLUE, size: 40 })] }),
              new Paragraph({ alignment: AlignmentType.CENTER,
                children: small.split("\n").map((l, i) => tx((i ? " " : "") + l, { color: DARK, size: 18 })) }),
            ]
          }))
        })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ============ PAGE 2 — WHO WE ARE ============
      h1("Who We Are"),
      para([
        tx("Prensados y Galvanizados de Lara, S.A. (PYGLARA) is a turnkey hot-dip galvanizing and copper electroplating facility in the heart of Venezuela's industrial corridor. Founded by the Ballesteros family, 100% Venezuelan capital, with clean title and over three decades of operational history under the technical leadership of "),
        tx("Ing. Miriam", { bold: true }),
        tx(" — a plant engineer with 36+ years of galvanizing experience.")
      ]),
      para([
        tx("Our plant sits on ~3,640 m² across two industrial warehouses in Zona Industrial I, Barquisimeto — the same complex as CORPOELEC Lara, SASGO, GEDISA and Industrias Marullo. We operate under Venezuelan national standard "),
        tx("COVENIN 1212-81", { bold: true }),
        tx(" and international standards "),
        tx("ASTM A123 ", { bold: true }),
        tx("(zinc coatings on iron and steel products) and "),
        tx("ASTM A153 ", { bold: true }),
        tx("(zinc coatings on hardware).")
      ]),

      twoCol(
        [ imgPara(`${IMG}/hall.jpg`, 280, 126), captionPara("Main galvanizing hall — 7 m Pilling kettle installed") ],
        [ imgPara(`${IMG}/kettle.jpg`, 240, 170), captionPara("Furnace and kettle housing — German engineering") ]
      ),

      h2("What Makes Us Different"),
      bullet("German-engineered kettles by W. Pilling Riepe GmbH & Co. KG — the global reference for hot-dip galvanizing equipment"),
      bullet("Only 2 active galvanizers in the entire country. Every other project is still in installation phase."),
      bullet("Zero domestic competitors for copper-clad ground rods — a unique product line we already produced at scale for ENELVEN (now CORPOELEC Zulia)"),
      bullet("36+ years of institutional knowledge retained in the plant's technical leadership"),
      bullet("Strategic location: 3 hours to Puerto Cabello, equidistant to Caracas, Maracaibo, and Puerto La Cruz"),
      bullet("Full COVENIN 1212-81 / ASTM A123 / ASTM A153 compliance — SENIAT-audited financial history 2005-2019"),

      new Paragraph({ children: [new PageBreak()] }),

      // ============ PAGE 3 — WHAT WE DO ============
      h1("What We Do"),
      h2("1. Hot-Dip Galvanizing (Primary Service)"),
      para(tx("A service-only model: the client brings the steel, we galvanize it and return the finished product with certified zinc coating. Our installed capacity of 1,440 TM per month — with a best-actual month of 300 TM — places PYGLARA among the largest active galvanizers in Venezuela.")),

      twoCol(
        [
          bullet("7 m Pilling kettle — structural steel, poles, towers, pletinas", { size: 20 }),
          bullet("9 m Pilling kettle — oversized work, unmatched regionally", { size: 20 }),
          bullet("3.5 m kettle — cable trays, solar mounts, crash barriers", { size: 20 }),
          bullet("65 cm centrifuge — nails, fasteners, small hardware (active now)", { size: 20 }),
          bullet("Pricing based on 10% zinc absorption, charged by weight", { size: 20 }),
        ],
        [
          imgPara(`${IMG}/product.jpg`, 260, 195),
          captionPara("Galvanized structural members — ready for shipment"),
          imgPara(`${IMG}/bracket.jpg`, 150, 330),
          captionPara("Finish quality — ASTM A153 hardware"),
        ],
        [4680, 4680]
      ),

      h2("2. Copper Electroplating (Secondary Service)"),
      para([
        tx("A 24-hour continuous-cycle line producing up to "),
        tx("936 copper-clad ground rods per day", { bold: true }),
        tx(". Copper thickness 300 µm ± 50, with nickel used only as the base adhesion layer. Sizes from 5/8\" to 1\" diameter and 1.2 m to 3 m length. ")
      ]),
      para([
        tx("Historical reference: PYGLARA delivered "),
        tx("20,000 copper-clad ground rods ", { bold: true }),
        tx("to ENELVEN (now CORPOELEC Zulia) in 2004–2005 — approximately $168,000 in a single contract. There is no other domestic producer of this product in Venezuela today.")
      ]),

      twoCol(
        [ imgPara(`${IMG}/copper.jpg`, 280, 210), captionPara("Copper electroplating tanks — 10 tanks, 6 three-phase rectifiers") ],
        [
          h2("Plant Assets"),
          bullet("2 warehouses, ~3,640 m² total"),
          bullet("3 Clark forklifts (2,500 kg)"),
          bullet("2 overhead cranes (2–5 TM)"),
          bullet("Industrial scale + QC lab"),
          bullet("66 kVA contracted power"),
          bullet("PDVSA Gas contract (active)"),
        ]
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // ============ PAGE 4 — WHY US / POSITIONING ============
      h1("Why We Are the Best Positioned in Venezuela"),
      para([
        tx("Venezuela's oil sector is reopening. Rystad Energy projects "),
        tx("$183 billion in oil & gas capex through 2040", { bold: true }),
        tx(", with fabrication and construction as the #1 service segment at $41B. PDVSA's pipelines have not been updated in 50 years. Every kilometer of new infrastructure — transmission towers, pipe racks, platforms, ground grids — requires galvanizing and copper grounding.")
      ]),
      para(tx("PYGLARA is the only Venezuelan galvanizer with all four of the following at the same time:")),

      // Comparison table
      new Table({
        width: { size: 10080, type: WidthType.DXA },
        columnWidths: [4200, 2940, 2940],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              ["Capability", "PYGLARA", "Average Competitor"],
            ][0].map((t, i) => new TableCell({
              width: { size: [4200, 2940, 2940][i], type: WidthType.DXA },
              shading: { fill: BLUE, type: ShadingType.CLEAR },
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              borders: allNone,
              children: [new Paragraph({ alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
                children: [tx(t, { bold: true, color: "FFFFFF", size: 22 })] })]
            }))
          }),
          ...[
            ["German Pilling kettles (7 m + 9 m)", "Yes", "No — smaller local builds"],
            ["Installed capacity 1,440 TM/month", "Yes", "Typically under 500 TM"],
            ["Copper electroplating line", "Yes — unique in country", "None"],
            ["COVENIN 1212-81 + ASTM A123 + A153", "Full compliance", "Partial or informal"],
            ["36+ years institutional know-how", "Yes", "Mostly new entrants"],
            ["3h to Puerto Cabello + central logistics", "Yes", "Coastal / peripheral"],
            ["Active, not in installation phase", "Yes", "Most are still installing"],
          ].map(([cap, us, them], ri) => new TableRow({
            children: [
              new TableCell({ width: { size: 4200, type: WidthType.DXA },
                shading: ri % 2 ? { fill: LIGHT_BLUE, type: ShadingType.CLEAR } : undefined,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                borders: allNone,
                children: [new Paragraph({ children: [tx(cap, { size: 20 })] })] }),
              new TableCell({ width: { size: 2940, type: WidthType.DXA },
                shading: ri % 2 ? { fill: LIGHT_BLUE, type: ShadingType.CLEAR } : undefined,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                borders: allNone,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(us, { bold: true, color: BLUE, size: 20 })] })] }),
              new TableCell({ width: { size: 2940, type: WidthType.DXA },
                shading: ri % 2 ? { fill: LIGHT_BLUE, type: ShadingType.CLEAR } : undefined,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                borders: allNone,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(them, { color: "595959", size: 20 })] })] }),
            ]
          }))
        ]
      }),

      h2("Value Creation for Venezuela"),
      bullet("Import substitution — every ton galvanized domestically saves scarce USD that would otherwise leave the country"),
      bullet("Employment — at full capacity, PYGLARA directly employs 15 skilled workers plus indirect logistics, transport, and supply chains"),
      bullet("Infrastructure reliability — galvanized steel lasts 50+ years without maintenance, essential for remote oil & gas and electrical grids"),
      bullet("National standards leadership — operating under COVENIN, ASTM A123 and A153 raises the quality floor for the entire domestic supply chain"),
      bullet("Strategic sovereignty — Venezuela cannot rebuild its grid, its pipelines, or its ports without a working galvanizer at industrial scale"),

      h2("Contact Us"),
      para([
        tx("PYGLARA  |  Prensados y Galvanizados de Lara, S.A.", { bold: true, color: BLUE, size: 22 }),
      ]),
      para(tx("Calle 26, entre Av. 1ra y 2da, Galpón No. 25-90")),
      para(tx("Zona Industrial I, Barquisimeto, Estado Lara 3001, Venezuela")),
      para([
        tx("Phone: ", { bold: true }),
        tx("+58 424 571 5349     "),
        tx("Instagram: ", { bold: true }),
        tx("@pyglarasa")
      ]),
      para([
        tx("Commercial contact: ", { bold: true }),
        tx("Andrés Montbrún  —  amontbrun98@gmail.com")
      ]),
      para([
        tx("Technical contact: ", { bold: true }),
        tx("Ing. Miriam  —  via commercial contact")
      ]),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = "/sessions/laughing-focused-davinci/mnt/PYG/PYGLARA_Company_Brochure.docx";
  fs.writeFileSync(out, buffer);
  console.log("Wrote", out);
});
