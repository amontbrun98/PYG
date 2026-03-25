"""
Generate PYGLARA Capacidades y Capital de Trabajo PDF
Run: python docs/generate_capacidades_pdf.py
"""
from fpdf import FPDF

class PyglaPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(120, 120, 120)
            self.cell(0, 5, "PYGLARA -- Capacidades de Planta y Capital de Trabajo en Zinc", align="R")
            self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Pagina {self.page_no()}/{{nb}}", align="C")

    def section_title(self, title, level=1):
        if level == 1:
            # Ensure at least 70mm for heading + first table/content block
            if self.get_y() + 70 > self.h - 20:
                self.add_page()
            self.ln(2)
            self.set_font("Helvetica", "B", 14)
            self.set_text_color(0, 51, 102)
            self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
            self.set_draw_color(0, 51, 102)
            self.set_line_width(0.8)
            self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
            self.ln(4)
        elif level == 2:
            # Ensure at least 55mm for subheading + table
            if self.get_y() + 55 > self.h - 20:
                self.add_page()
            self.set_font("Helvetica", "B", 11)
            self.set_text_color(0, 70, 130)
            self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
            self.ln(2)
        elif level == 3:
            if self.get_y() + 30 > self.h - 20:
                self.add_page()
            self.set_font("Helvetica", "B", 10)
            self.set_text_color(50, 50, 50)
            self.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
            self.ln(1)

    def body_text(self, text, bold=False):
        self.set_text_color(30, 30, 30)
        self.set_font("Helvetica", "B" if bold else "", 9)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def note_text(self, text):
        self.set_text_color(80, 80, 80)
        self.set_font("Helvetica", "I", 8)
        self.multi_cell(0, 4, text)
        self.ln(2)

    def key_point(self, text):
        self.set_fill_color(240, 248, 255)
        self.set_draw_color(0, 51, 102)
        self.set_text_color(0, 51, 102)
        self.set_font("Helvetica", "B", 9)
        x = self.get_x()
        w = self.w - self.l_margin - self.r_margin
        inner_w = w - 6
        # Calculate actual height needed
        line_count = 1
        for line in text.split('\n'):
            line_count += max(1, int(self.get_string_width(line) / inner_w) + 1)
        h = max(line_count * 5 + 4, 14)
        # Page break check
        if self.get_y() + h + 4 > self.h - 20:
            self.add_page()
        y = self.get_y()
        self.rect(x, y, w, h, style="DF")
        self.set_xy(x + 3, y + 2)
        self.multi_cell(inner_w, 5, text)
        self.set_y(y + h + 4)

    def add_table(self, headers, rows, col_widths=None, highlight_last=False, bold_col=None):
        if col_widths is None:
            avail = self.w - self.l_margin - self.r_margin
            col_widths = [avail / len(headers)] * len(headers)

        # Check if table fits on current page
        needed = 7 + len(rows) * 6 + 4
        if self.get_y() + needed > self.h - 25:
            self.add_page()

        # Header row
        self.set_font("Helvetica", "B", 8)
        self.set_fill_color(0, 51, 102)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 7, h, border=1, fill=True, align="C")
        self.ln()

        # Data rows
        self.set_text_color(30, 30, 30)
        for ri, row in enumerate(rows):
            is_last = ri == len(rows) - 1
            if is_last and highlight_last:
                self.set_fill_color(230, 245, 230)
                self.set_font("Helvetica", "B", 8)
            else:
                alt = ri % 2 == 0
                self.set_fill_color(245, 245, 250) if alt else self.set_fill_color(255, 255, 255)
                self.set_font("Helvetica", "", 8)

            for ci, cell in enumerate(row):
                style = ""
                if bold_col and ci in bold_col:
                    self.set_font("Helvetica", "B", 8)
                elif is_last and highlight_last:
                    self.set_font("Helvetica", "B", 8)
                else:
                    self.set_font("Helvetica", "", 8)
                self.cell(col_widths[ci], 6, str(cell), border=1, fill=True, align="C" if ci > 0 else "L")
            self.ln()
        self.ln(3)


def build_pdf():
    pdf = PyglaPDF(orientation="P", unit="mm", format="Letter")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)

    # ========== COVER / TOC PAGE ==========
    pdf.add_page()
    pdf.ln(30)
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 12, "PYGLARA", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, "Prensados y Galvanizados de Lara, S.A.", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(0, 70, 130)
    pdf.cell(0, 10, "Capacidades de Planta y Capital de Trabajo en Zinc", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 6, "Documento de referencia para conversaciones con inversionistas", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "Marzo 2026", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.5)
    mid = pdf.w / 2
    pdf.line(mid - 40, pdf.get_y(), mid + 40, pdf.get_y())
    pdf.ln(10)

    # TOC
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, "CONTENIDO", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    toc_items = [
        ("1.", "Lineas de Produccion y Estado Actual"),
        ("2.", "Activos Fisicos"),
        ("3.", "Precio del Zinc -- Promedios LME"),
        ("4.", "Desglose de Costo Variable por Tonelada"),
        ("5.", "Consumo de Zinc por Cuba (Churning)"),
        ("6.", "Capital de Trabajo para 60 Dias"),
        ("7.", "Costos Fijos Mensuales"),
        ("8.", "Ingresos Potenciales por Fase"),
        ("9.", "Resumen de Inversion Total por Fase"),
        ("10.", "Punto Clave: El Zinc es un Activo"),
    ]
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(30, 30, 30)
    for num, title in toc_items:
        pdf.cell(10, 7, num, align="R")
        pdf.cell(5, 7, "")
        pdf.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(10)
    pdf.note_text("Fuentes: Registro de equipos PYGLARA, Ing. Miriam (entrevista 2026-03-20), LME, TradingEconomics, Fastmarkets")

    # ========== PAGE 2: LINEAS DE PRODUCCION ==========
    pdf.add_page()
    pdf.section_title("1. Lineas de Produccion y Estado Actual")

    widths = [38, 32, 32, 88]
    pdf.add_table(
        ["Equipo", "Estado", "Capacidad", "Productos / Servicios"],
        [
            ["Cuba centrifuga 65cm", "ACTIVA", "Piezas pequenas", "Galvanizado de clavos -- operando ahora"],
            ["Cuba de 3m", "INACTIVA", "~100-170 ton/mes", "Bandejas de cables, soportes solares, barreras viales"],
            ["Cuba 7m (Pilling)", "INSTALADA", "400 ton/mes", "Estructuras, torres, postes, tuberias -- capacidad industrial"],
            ["Cuba 9m (Pilling)", "ALMACENADA", "Superior a 7m", "Piezas sobredimensionadas -- sin competidor regional"],
            ["Linea de cobre", "REQUIERE REACT.", "936 varillas/dia", "Varillas cobreadas 5/8\"-1\", 1.2-3m, 300um cobre"],
        ],
        col_widths=widths,
        bold_col={1},
    )

    pdf.body_text("Fabricante de cubas 7m y 9m: W. Pilling Riepe GmbH & Co. KG (Alemania)")
    pdf.body_text("Certificacion de calidad: Medicion de espesores por lote segun ASTM B499, certificados emitidos por Ing. Miriam.", bold=True)

    # ========== ACTIVOS FISICOS ==========
    pdf.section_title("2. Activos Fisicos")
    widths2 = [55, 65, 55]
    pdf.add_table(
        ["Activo", "Detalle", "Valor Estimado"],
        [
            ["Galpon principal", "2.500 m2 -- galvanizado + cobre", "$475.000-$680.000"],
            ["Galpon secundario", "~1.140 m2", "$216.600-$310.080"],
            ["Cuba 9m Pilling (almacenada)", "Activo de expansion, fabricante aleman", "$570.000"],
            ["Equipos de calidad", "Medicion de espesores ASTM B499", "En operacion"],
            ["TOTAL INMUEBLES", "~3.640 m2 + equipos", "$691.600-$990.080"],
        ],
        col_widths=widths2,
        highlight_last=True,
    )
    pdf.body_text("Ubicacion: Zona Industrial I, Barquisimeto, Lara. Entrada por Carrera 2, carga por Carrera 1.")

    # ========== PRECIO DEL ZINC ==========
    pdf.section_title("3. Precio del Zinc -- Promedios LME (USD/tonelada metrica)")

    widths3 = [70, 50, 55]
    pdf.add_table(
        ["Periodo", "Precio Promedio", "Fuente"],
        [
            ["Marzo 2026 (spot actual)", "~$3.034", "TradingEconomics / LME"],
            ["Ultimos 3 meses (ene-mar 2026)", "~$3.180", "Promedio LME Q1 2026"],
            ["Ultimos 6 meses (oct 2025-mar 2026)", "~$3.200", "Promedio LME"],
            ["Ultimos 12 meses (mar 2025-mar 2026)", "~$3.100", "Promedio anual LME 2025"],
        ],
        col_widths=widths3,
        bold_col={1},
    )
    pdf.note_text("Nota: Los precios LME son referencias internacionales. El precio real en Venezuela incluye fletes, impuestos de importacion y margenes del intermediario. Este documento usa $3.200/ton como referencia conservadora para calculos.")

    # ========== DESGLOSE COSTO VARIABLE ==========
    pdf.section_title("4. Desglose del Costo Variable por Tonelada Galvanizada")

    widths4 = [65, 40, 35, 35]
    pdf.add_table(
        ["Componente", "Consumo", "Costo Unitario", "Costo/Ton"],
        [
            ["Zinc (absorcion 10%)", "100 kg/ton acero", "$3,20/kg", "$320,00"],
            ["Acido clorhidrico (HCl)", "12,5 kg/ton", "$1,17/kg", "$14,68"],
            ["Cloruro de amonio (NH4Cl)", "2,5 kg/ton", "$2,30/kg", "$5,75"],
            ["Gas natural", "Proporcional", "Incluido fijo", "$4,50"],
            ["Consumibles (jigs, cadenas)", "Variable", "Reposicion", "~$0,50"],
            ["TOTAL VARIABLE POR TONELADA", "", "", "$345,00"],
        ],
        col_widths=widths4,
        highlight_last=True,
        bold_col={3},
    )
    pdf.note_text("Calculo basado en 400 ton/mes de produccion en cuba de 7m. HCl: 5 ton/mes a $1.174/ton. NH4Cl: 1 ton/mes a $2.300/ton.")

    # ========== CONSUMO DE ZINC / CHURNING ==========
    pdf.section_title("5. Consumo de Zinc por Cuba (Churning / Reposicion)")

    pdf.body_text("La absorcion de zinc es del 10% del peso del acero galvanizado. Por cada tonelada de acero procesada, se consumen ~100 kg de zinc del bano.", bold=True)

    widths5 = [30, 30, 28, 28, 28, 32]
    pdf.add_table(
        ["Cuba", "Llenado Inicial", "Reposicion/Ciclo", "Consumo/Mes", "Costo/Mes", "Ciclos/Mes"],
        [
            ["65cm", "Minimo", "Minimo", "~0,5-1 ton", "$1.600-$3.200", "Continuo"],
            ["3m", "20 ton ($64K)", "5 ton ($16K)", "~10-17 ton", "$32K-$54K", "~2-3"],
            ["7m", "50 ton ($160K)", "20 ton ($64K)", "~40 ton", "$128K", "~2"],
        ],
        col_widths=widths5,
        bold_col={1, 4},
    )

    pdf.section_title("Detalle de ciclos de reposicion", level=3)
    pdf.body_text("Cuba de 3m: A capacidad estimada de 100-170 ton/mes, el zinc del bano se depleta cada ~12-15 dias. Cada reposicion = 5 toneladas ($16.000).")
    pdf.body_text("Cuba de 7m: A 400 ton/mes, el zinc se depleta cada ~15 dias. Cada reposicion = 20 toneladas ($64.000). Se necesitan ~2 reposiciones/mes.")

    # ========== CAPITAL DE TRABAJO 60 DIAS ==========
    pdf.section_title("6. Capital de Trabajo para 60 Dias de Operacion Continua")
    pdf.key_point("SUPUESTO CRITICO: Plazo de entrega de zinc importado = 45-60 dias. Se requiere inventario de zinc para 60 dias de operacion continua mientras llega el proximo despacho.")

    pdf.section_title("Cuba de 3m -- Fase 1", level=2)
    widths6 = [75, 35, 35, 35]
    pdf.add_table(
        ["Concepto", "Toneladas", "Costo Unitario", "Subtotal"],
        [
            ["Llenado inicial (unico)", "20 ton", "$3.200/ton", "$64.000"],
            ["Refractory + reparacion cuba", "--", "Materiales", "$5.000-$10.000"],
            ["Zinc operacion mes 1", "10-17 ton", "$3.200/ton", "$32.000-$54.400"],
            ["Zinc operacion mes 2", "10-17 ton", "$3.200/ton", "$32.000-$54.400"],
            ["TOTAL FASE 1 (60 dias)", "40-54 ton", "", "$133.000-$182.800"],
        ],
        col_widths=widths6,
        highlight_last=True,
        bold_col={3},
    )

    pdf.section_title("Cuba de 7m -- Fase 2", level=2)
    pdf.add_table(
        ["Concepto", "Toneladas", "Costo Unitario", "Subtotal"],
        [
            ["Llenado inicial (unico)", "50 ton", "$3.200/ton", "$160.000"],
            ["Mantenimiento gruas", "--", "Preventivo", "$5.000-$10.000"],
            ["Zinc operacion mes 1", "40 ton", "$3.200/ton", "$128.000"],
            ["Zinc operacion mes 2", "40 ton", "$3.200/ton", "$128.000"],
            ["TOTAL FASE 2 (60 dias)", "130 ton", "", "$421.000-$426.000"],
        ],
        col_widths=widths6,
        highlight_last=True,
        bold_col={3},
    )

    pdf.section_title("Ambas cubas operando (3m + 7m)", level=2)
    pdf.add_table(
        ["Concepto", "Toneladas", "Costo Unitario", "Subtotal"],
        [
            ["Llenados iniciales (3m+7m)", "70 ton", "$3.200/ton", "$224.000"],
            ["Mantenimiento (gruas+refract.)", "--", "Materiales", "$10.000-$20.000"],
            ["Zinc operacion 60 dias (3m)", "20-34 ton", "$3.200/ton", "$64.000-$108.800"],
            ["Zinc operacion 60 dias (7m)", "80 ton", "$3.200/ton", "$256.000"],
            ["TOTAL COMBINADO (60 dias)", "170-184 ton", "", "$554.000-$608.800"],
        ],
        col_widths=widths6,
        highlight_last=True,
        bold_col={3},
    )

    # ========== COSTOS FIJOS ==========
    pdf.section_title("7. Costos Fijos Mensuales")

    widths7 = [80, 45, 45]
    pdf.add_table(
        ["Concepto", "Costo Mensual", "Costo Anual"],
        [
            ["Gas natural", "$1.800", "$21.600"],
            ["Seguridad", "$1.200", "$14.400"],
            ["Salarios", "$2.300", "$27.600"],
            ["Electricidad", "$200", "$2.400"],
            ["Limpieza / Mantenimiento", "$100", "$1.200"],
            ["TOTAL FIJOS", "$5.600", "$67.200"],
        ],
        col_widths=widths7,
        highlight_last=True,
        bold_col={1, 2},
    )
    pdf.note_text("Los costos fijos son independientes del volumen de produccion. Se mantienen aun con la planta a baja capacidad.")

    # ========== INGRESOS POR FASE ==========
    pdf.section_title("8. Ingresos Potenciales por Fase")

    pdf.body_text("Base de calculo: margen regulado del 30% (Ley de Precios Justos / SUNDDE). Precio por tonelada = $345 / 0,70 = $493/ton. Utilidad bruta = $148/ton.", bold=True)

    pdf.section_title("Fase 0 -- Cuba centrifuga 65cm (AHORA)", level=2)
    widths8 = [60, 55, 55]
    pdf.add_table(
        ["Parametro", "Valor", "Notas"],
        [
            ["Estado", "ACTIVA", "Operando ahora mismo"],
            ["Producto", "Clavos galvanizados", "Pequenas piezas"],
            ["Inversion adicional", "$0", "Ya operativa"],
            ["Ingreso mensual estimado", "Variable -- bajo volumen", "Genera caja inmediata"],
        ],
        col_widths=widths8,
        bold_col={1},
    )

    pdf.section_title("Fase 1 -- Cuba de 3m", level=2)
    pdf.add_table(
        ["Parametro", "Conservador (100 ton/mes)", "Optimista (170 ton/mes)"],
        [
            ["Produccion mensual", "100 toneladas", "170 toneladas"],
            ["Ingreso bruto mensual", "$49.300", "$83.810"],
            ["Costo variable mensual", "$34.500", "$58.650"],
            ["Costos fijos mensual", "$5.600", "$5.600"],
            ["UTILIDAD NETA MENSUAL", "$9.200", "$19.560"],
            ["UTILIDAD NETA ANUAL", "$110.400", "$234.720"],
            ["Inversion requerida", "$133K-$183K", "$133K-$183K"],
            ["Recuperacion de inversion", "~12-17 meses", "~7-10 meses"],
        ],
        col_widths=widths8,
        highlight_last=False,
        bold_col={1, 2},
    )

    pdf.section_title("Fase 2 -- Cuba de 7m (capacidad industrial)", level=2)
    pdf.add_table(
        ["Parametro", "Al 50% capacidad", "Al 100% capacidad"],
        [
            ["Produccion mensual", "200 toneladas", "400 toneladas"],
            ["Ingreso bruto mensual", "$98.600", "$197.200"],
            ["Costo variable mensual", "$69.000", "$138.000"],
            ["Costos fijos mensual", "$5.600", "$5.600"],
            ["UTILIDAD NETA MENSUAL", "$24.000", "$53.600"],
            ["UTILIDAD NETA ANUAL", "$288.000", "$643.200"],
            ["Inversion requerida", "$421K-$426K", "$421K-$426K"],
            ["Recuperacion de inversion", "~18 meses", "~8 meses"],
        ],
        col_widths=widths8,
        highlight_last=False,
        bold_col={1, 2},
    )

    pdf.section_title("Fase 3 -- Linea de cobre (electroplating)", level=2)
    pdf.add_table(
        ["Parametro", "Conservador", "Optimista"],
        [
            ["Produccion diaria", "936 varillas/dia", "936 varillas/dia"],
            ["Ingreso anual", "$561.000", "$1.050.000"],
            ["Inversion requerida", "$15.000", "$30.000"],
            ["Recuperacion de inversion", "<1 mes", "<1 mes"],
        ],
        col_widths=widths8,
        highlight_last=False,
        bold_col={1, 2},
    )

    # ========== RESUMEN TOTAL ==========
    pdf.section_title("9. Resumen de Inversion Total por Fase")

    widths9 = [25, 50, 35, 35, 35]
    pdf.add_table(
        ["Fase", "Que Se Activa", "Inversion", "Ingreso Anual", "Utilidad Anual"],
        [
            ["0", "65cm centrifuga (activa)", "$0", "Variable", "Caja inmediata"],
            ["1", "Cuba 3m + 60 dias zinc", "$133K-$183K", "$592K-$1.006K", "$110K-$235K"],
            ["2", "Cuba 7m + 60 dias zinc", "$421K-$426K", "$1.183K-$2.366K", "$288K-$643K"],
            ["3", "Linea de cobre", "$15K-$30K", "$561K-$1.050K", "Alto margen"],
            ["4", "Cuba 9m (expansion)", "TBD", "Capacidad superior", "Sin competidor"],
            ["TOTAL (Fases 1-3)", "Planta completa", "$569K-$639K", "$2.3M-$4.4M", "$398K-$878K+"],
        ],
        col_widths=widths9,
        highlight_last=True,
        bold_col={2, 4},
    )

    # ========== PUNTO CLAVE ==========
    pdf.ln(4)
    pdf.section_title("10. Punto Clave: El Zinc es un Activo, No un Gasto")

    pdf.key_point("El llenado inicial de las cubas PERMANECE EN LA CUBA. Es un activo recuperable, no un gasto operativo.")

    pdf.body_text("Lo que se consume en cada lote es unicamente el zinc que se adhiere al acero del cliente (10% del peso procesado). Este costo de reposicion se cubre directamente con los ingresos de cada trabajo de galvanizado.")

    pdf.body_text("En caso de cierre o liquidacion, el zinc en las cubas se puede vender como commodity al precio de mercado vigente.", bold=True)

    pdf.ln(6)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.3)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(4)

    pdf.note_text("Precios de zinc: TradingEconomics, LME, Investing News, Fastmarkets (marzo 2026)")
    pdf.note_text("Datos tecnicos: Ing. Miriam, Planta PYGLARA (entrevista 2026-03-20)")
    pdf.note_text("Margen de calculo: 30% regulado (Ley de Precios Justos / SUNDDE) -- caso conservador")

    # Save
    output_path = "c:/Users/amont/Desktop/PYG/docs/PYGLARA-Capacidades-y-Capital-de-Zinc.pdf"
    pdf.output(output_path)
    print(f"PDF generado: {output_path}")

if __name__ == "__main__":
    build_pdf()
