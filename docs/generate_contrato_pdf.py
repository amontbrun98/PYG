"""
Generate PYGLARA Commercial Representation Agreement PDF
Run: python docs/generate_contrato_pdf.py
"""
from fpdf import FPDF


class ContratoPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "I", 7)
            self.set_text_color(120, 120, 120)
            self.cell(0, 5, "Contrato de Representacion Comercial -- PYGLARA", align="R")
            self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Pagina {self.page_no()}/{{nb}}", align="C")

    def clausula(self, title):
        # Ensure at least 35mm for heading + first content block
        if self.get_y() + 35 > self.h - 20:
            self.add_page()
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(0, 51, 102)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(0, 51, 102)
        self.set_line_width(0.5)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(3)

    def sub_clausula(self, title):
        # Ensure at least 25mm for sub-heading + content
        if self.get_y() + 25 > self.h - 20:
            self.add_page()
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(0, 70, 130)
        self.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body(self, text, bold=False):
        self.set_text_color(30, 30, 30)
        self.set_font("Helvetica", "B" if bold else "", 9)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def note_text(self, text):
        self.set_text_color(80, 80, 80)
        self.set_font("Helvetica", "I", 8)
        self.multi_cell(0, 4, text)
        self.ln(2)

    def reference_box(self, text):
        self.set_fill_color(245, 248, 252)
        self.set_draw_color(0, 51, 102)
        self.set_text_color(60, 60, 90)
        self.set_font("Helvetica", "I", 8)
        x = self.get_x()
        w = self.w - self.l_margin - self.r_margin
        inner_w = w - 6
        # Calculate actual height by measuring wrapped text
        line_count = 0
        for paragraph in text.split('\n'):
            if paragraph.strip() == '':
                line_count += 1
            else:
                line_count += max(1, int(self.get_string_width(paragraph) / inner_w) + 1)
        h = line_count * 4.5 + 6
        h = max(h, 10)
        # Page break check
        if self.get_y() + h + 4 > self.h - 20:
            self.add_page()
        y = self.get_y()
        self.rect(x, y, w, h, style="DF")
        self.set_xy(x + 3, y + 2)
        self.multi_cell(inner_w, 4, text)
        self.set_y(y + h + 3)

    def bullet(self, text, indent=10):
        self.set_text_color(30, 30, 30)
        self.set_font("Helvetica", "", 9)
        x = self.get_x()
        self.cell(indent, 5, "  -")
        self.multi_cell(self.w - self.l_margin - self.r_margin - indent, 5, text)
        self.ln(1)

    def add_table(self, headers, rows, col_widths=None, highlight_last=False, bold_col=None):
        if col_widths is None:
            avail = self.w - self.l_margin - self.r_margin
            col_widths = [avail / len(headers)] * len(headers)
        needed = 7 + len(rows) * 6 + 4
        if self.get_y() + needed > self.h - 25:
            self.add_page()
        self.set_font("Helvetica", "B", 8)
        self.set_fill_color(0, 51, 102)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 7, h, border=1, fill=True, align="C")
        self.ln()
        self.set_text_color(30, 30, 30)
        for ri, row in enumerate(rows):
            is_last = ri == len(rows) - 1
            if is_last and highlight_last:
                self.set_fill_color(230, 245, 230)
                self.set_font("Helvetica", "B", 8)
            else:
                self.set_fill_color(245, 245, 250) if ri % 2 == 0 else self.set_fill_color(255, 255, 255)
                self.set_font("Helvetica", "", 8)
            for ci, cell in enumerate(row):
                if bold_col and ci in bold_col:
                    self.set_font("Helvetica", "B", 8)
                elif not (is_last and highlight_last):
                    self.set_font("Helvetica", "", 8)
                self.cell(col_widths[ci], 6, str(cell), border=1, fill=True,
                          align="C" if ci > 0 else "L")
            self.ln()
        self.ln(3)

    def signature_line(self, label):
        self.set_font("Helvetica", "", 9)
        self.set_text_color(30, 30, 30)
        self.cell(30, 6, label + ":")
        self.set_draw_color(150, 150, 150)
        self.cell(130, 6, "", border="B")
        self.ln(8)


def build_pdf():
    pdf = ContratoPDF(orientation="P", unit="mm", format="Letter")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)

    # ===== COVER =====
    pdf.add_page()
    pdf.ln(40)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 12, "CONTRATO DE REPRESENTACION", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 12, "COMERCIAL Y SERVICIOS", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 12, "DE CONSULTORIA", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(8)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.8)
    mid = pdf.w / 2
    pdf.line(mid - 50, pdf.get_y(), mid + 50, pdf.get_y())
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, "Prensados y Galvanizados de Lara, S.A.", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "PYGLARA", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)
    pdf.set_font("Helvetica", "I", 10)
    pdf.cell(0, 6, "Barquisimeto, Estado Lara, Venezuela", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, "2026", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(30)
    pdf.set_font("Helvetica", "I", 8)
    pdf.set_text_color(120, 120, 120)
    pdf.cell(0, 5, "Marco legal: Codigo de Comercio de Venezuela (Arts. 376-409)", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 5, "Codigo Civil de Venezuela (Arts. 1684-1712)", align="C", new_x="LMARGIN", new_y="NEXT")

    # ===== PARTIES =====
    pdf.add_page()
    pdf.clausula("PARTES CONTRATANTES")

    pdf.body("LA EMPRESA: Prensados y Galvanizados de Lara, S.A. (PYGLARA), sociedad anonima inscrita en el Registro Mercantil de la Circunscripcion Judicial del Estado Lara, con domicilio en Calle 26, entre Av. 1ra y 2da, Galpon No. 25-90, Zona Industrial I, Barquisimeto, Estado Lara, 3001, Venezuela.", bold=True)
    pdf.body("Representada por: _________________________")

    pdf.body("EL REPRESENTANTE: _________________________, titular de la cedula de identidad No. _____________, domiciliado en _________________________, actuando en nombre propio como contratista independiente.", bold=True)

    pdf.body("Fecha de suscripcion: ______ de _____________ de 2026")

    # ===== CLAUSE 1: OBJECT =====
    pdf.clausula("CLAUSULA PRIMERA: OBJETO DEL CONTRATO")
    pdf.body("LA EMPRESA contrata los servicios de EL REPRESENTANTE para las siguientes actividades:")
    pdf.body("A. Representacion Comercial:", bold=True)
    pdf.body("Captacion, prospeccion y cierre de clientes para los servicios de galvanizado en caliente y cobreado electrolitico que ofrece LA EMPRESA.")
    pdf.body("B. Servicios de Consultoria y Documentacion:", bold=True)
    pdf.body("Elaboracion de materiales para inversionistas, documentacion financiera, analisis de mercado, presentaciones comerciales y cualquier material estrategico que facilite la captacion de capital o clientes.")
    pdf.body("C. Facilitacion de Inversiones:", bold=True)
    pdf.body("Identificacion, contacto y presentacion de inversionistas potenciales interesados en participar en la reactivacion y operacion de LA EMPRESA.")

    # ===== CLAUSE 2: NATURE =====
    pdf.clausula("CLAUSULA SEGUNDA: NATURALEZA DE LA RELACION")
    pdf.body("EL REPRESENTANTE actua como contratista independiente, no como empleado de LA EMPRESA. No existe relacion laboral entre las partes. EL REPRESENTANTE no tiene autoridad para asumir obligaciones, firmar contratos ni comprometer a LA EMPRESA sin autorizacion escrita previa.", bold=True)
    pdf.reference_box("Fundamento legal: Codigo de Comercio de Venezuela, Articulos 376 al 409 (comisionistas mercantiles) y Codigo Civil, Articulos 1684 al 1712 (mandato).")

    # ===== CLAUSE 3: CLIENT COMMISSIONS =====
    pdf.clausula("CLAUSULA TERCERA: COMISIONES POR CLIENTES")
    pdf.sub_clausula("3.1 Tasa de Comision")
    pdf.body("EL REPRESENTANTE recibira una comision del ___% (entre 7% y 15%) sobre los ingresos netos de facturacion generados por cada cliente introducido, prospectado y cerrado por EL REPRESENTANTE.", bold=True)

    pdf.add_table(
        ["Nivel de Involucramiento", "Tasa Sugerida", "Justificacion"],
        [
            ["Solo introduccion/referido", "5% - 7%", "Presenta al cliente, LA EMPRESA cierra"],
            ["Prospeccion + cierre", "7% - 10%", "Gestiona el ciclo completo de ventas"],
            ["Ciclo completo + gestion de cuenta", "10% - 15%", "Mantiene relacion comercial activa"],
        ],
        col_widths=[60, 35, 80],
        bold_col={1},
    )

    pdf.reference_box("Referencia de mercado: La tasa estandar de comision para representantes comerciales en manufactura y servicios industriales B2B es del 7% al 15% de las ventas netas (CaptivateIQ, Salesforce, RepHunter, 2025-2026).")

    pdf.sub_clausula("3.2 Base de Calculo")
    pdf.body("La comision se calcula sobre el ingreso neto facturado al cliente: monto facturado menos devoluciones, descuentos y cargos por flete cuando aplique.")

    pdf.sub_clausula("3.3 Periodo y Forma de Pago")
    pdf.bullet("Las comisiones se liquidan mensualmente, dentro de los quince (15) dias habiles siguientes al cierre de cada mes.")
    pdf.bullet("Pago mediante transferencia bancaria o metodo acordado.")
    pdf.bullet("LA EMPRESA proporcionara reporte mensual detallando: clientes atendidos, tonelaje procesado, montos facturados y comision generada.")

    pdf.sub_clausula("3.4 Comisiones Residuales (Post-Terminacion)")
    pdf.body("Las comisiones sobre clientes introducidos por EL REPRESENTANTE sobreviven la terminacion de este contrato. EL REPRESENTANTE continuara recibiendo comisiones sobre todos los clientes que haya introducido y que mantengan relacion comercial activa con LA EMPRESA, por un periodo de veinticuatro (24) meses posteriores a la terminacion del contrato.", bold=True)

    pdf.reference_box("Referencia de mercado: La practica estandar en acuerdos de representacion comercial industrial es que las comisiones residuales sobrevivan la terminacion del contrato por 12 a 24 meses (LegalZoom, RepHunter, SEC filings).")

    # ===== CLAUSE 4: CONSULTING =====
    pdf.clausula("CLAUSULA CUARTA: SERVICIOS DE CONSULTORIA")
    pdf.sub_clausula("4.1 Honorarios por Documentacion")

    pdf.body("Opcion A -- Honorario por proyecto:", bold=True)
    pdf.add_table(
        ["Entregable", "Honorario"],
        [
            ["Documento de capacidades y talking points", "$_______"],
            ["Modelo financiero / proyecciones", "$_______"],
            ["Analisis competitivo de mercado", "$_______"],
            ["Presentacion para inversionistas (deck)", "$_______"],
            ["Actualizaciones y revisiones (por sesion)", "$_______"],
        ],
        col_widths=[120, 55],
    )

    pdf.body("Opcion B -- Retencion mensual:", bold=True)
    pdf.body("EL REPRESENTANTE recibira un honorario mensual de $_______ USD por disponibilidad continua para actualizaciones de documentacion, respuestas a consultas de inversionistas y soporte estrategico.")

    pdf.reference_box("Referencia de mercado: Honorarios de consultoria para desarrollo de negocios y documentacion estrategica en el sector industrial: $1.000-$5.000 USD/mes en mercados latinoamericanos.")

    # ===== CLAUSE 5: FINDER'S FEE =====
    pdf.clausula("CLAUSULA QUINTA: FACILITACION DE INVERSIONES")
    pdf.sub_clausula("5.1 Honorario por Capital Facilitado")
    pdf.body("Cuando EL REPRESENTANTE identifique, contacte y presente a un inversionista que efectivamente aporte capital a LA EMPRESA, EL REPRESENTANTE recibira un honorario equivalente al ___% (entre 3% y 5%) del capital efectivamente recibido.", bold=True)

    pdf.add_table(
        ["Monto de Capital Facilitado", "Tasa Sugerida"],
        [
            ["Hasta $100.000", "5%"],
            ["$100.001 -- $500.000", "4%"],
            ["Mas de $500.000", "3%"],
        ],
        col_widths=[100, 75],
        bold_col={1},
    )

    pdf.reference_box("Referencia de mercado: El honorario estandar por facilitacion de capital (finder's fee) para inversiones de capital es del 3%-5% del monto invertido (Kalungi, PipelineRoad, American Association of Private Lenders, 2025-2026).")

    pdf.sub_clausula("5.2 Condiciones de Pago")
    pdf.bullet("Pago dentro de los treinta (30) dias siguientes al desembolso efectivo del capital.")
    pdf.bullet("Si el capital se desembolsa en etapas, el honorario se paga proporcionalmente.")
    pdf.bullet("No se genera honorario si la inversion no se materializa.")

    pdf.sub_clausula("5.3 Exclusion")
    pdf.body("Este honorario es independiente de las comisiones por clientes. Si un inversionista tambien se convierte en cliente, ambas compensaciones aplican de forma independiente.")

    # ===== CLAUSE 6: PROSPECT REGISTRY =====
    pdf.clausula("CLAUSULA SEXTA: REGISTRO DE CLIENTES E INVERSIONISTAS")
    pdf.sub_clausula("6.1 Registro de Prospectos")
    pdf.body("EL REPRESENTANTE mantendra un registro escrito de todos los prospectos contactados, incluyendo:")
    pdf.bullet("Nombre de la persona o empresa")
    pdf.bullet("Fecha del primer contacto")
    pdf.bullet("Canal de contacto (correo, telefono, reunion presencial)")
    pdf.bullet("Estado de la gestion (prospecto, en negociacion, cerrado)")

    pdf.sub_clausula("6.2 Reconocimiento de Origen")
    pdf.body("LA EMPRESA reconoce que el derecho a comision se activa desde el primer contacto documentado con un prospecto. Si un prospecto contactado por EL REPRESENTANTE se convierte en cliente o inversionista dentro de los doce (12) meses siguientes al primer contacto, se reconoce la gestion de EL REPRESENTANTE.", bold=True)

    # ===== CLAUSE 7: EXCLUSIVITY =====
    pdf.clausula("CLAUSULA SEPTIMA: EXCLUSIVIDAD Y TERRITORIO")
    pdf.sub_clausula("7.1 Exclusividad")
    pdf.body("[ ] Exclusivo: EL REPRESENTANTE es el unico representante comercial autorizado en el territorio definido.")
    pdf.body("[ ] No exclusivo: LA EMPRESA puede contratar a otros representantes. Comisiones asignadas al representante que documento el primer contacto.")

    pdf.sub_clausula("7.2 Territorio")
    pdf.body("Territorio de accion: _________________________ (estado, region, sector, o nacional)")

    pdf.sub_clausula("7.3 Sectores Asignados")
    pdf.body("[ ] Petroleo y gas  [ ] Construccion e infraestructura  [ ] Telecomunicaciones")
    pdf.body("[ ] Energia solar  [ ] Otro: _________________________")

    # ===== CLAUSE 8: COMPANY OBLIGATIONS =====
    pdf.clausula("CLAUSULA OCTAVA: OBLIGACIONES DE LA EMPRESA")
    pdf.bullet("Pagar las comisiones y honorarios en los plazos estipulados.")
    pdf.bullet("Proporcionar reportes mensuales de facturacion por cliente.")
    pdf.bullet("Mantener la calidad de los servicios de galvanizado y cobreado.")
    pdf.bullet("Suministrar informacion tecnica actualizada para la gestion comercial.")
    pdf.bullet("No contactar directamente a prospectos introducidos por EL REPRESENTANTE sin su conocimiento.")
    pdf.bullet("Notificar cambios en precios, capacidades o condiciones de servicio.")

    # ===== CLAUSE 9: REP OBLIGATIONS =====
    pdf.clausula("CLAUSULA NOVENA: OBLIGACIONES DEL REPRESENTANTE")
    pdf.bullet("Actuar de buena fe y en el mejor interes comercial de LA EMPRESA.")
    pdf.bullet("Mantener confidencialidad sobre informacion financiera, tecnica y comercial.")
    pdf.bullet("No representar a empresas competidoras directas durante la vigencia del contrato.")
    pdf.bullet("Reportar mensualmente la gestion comercial realizada.")
    pdf.bullet("Utilizar unicamente materiales aprobados por LA EMPRESA.")

    # ===== CLAUSE 10: SWEAT EQUITY =====
    pdf.clausula("CLAUSULA DECIMA: PARTICIPACION ACCIONARIA (SWEAT EQUITY)")

    pdf.body("Dado que LA EMPRESA puede no disponer de liquidez inmediata, la compensacion por servicios prestados (Clausulas 3, 4 y 5) puede convertirse total o parcialmente en participacion accionaria.", bold=True)

    pdf.sub_clausula("10.1 Metodo de Valoracion del Trabajo (Market Rate Method)")
    pdf.body("Valor de Servicios = Horas Trabajadas x Tasa de Mercado por Hora", bold=True)

    pdf.add_table(
        ["Tipo de Servicio", "Tasa (USD/hora)", "Referencia"],
        [
            ["Consultoria estrategica y documentacion", "$50-$100", "Rango LATAM consultor industrial"],
            ["Gestion comercial y ventas B2B", "$40-$75", "Rango LATAM desarrollo de negocios"],
            ["Facilitacion de inversiones", "$75-$150", "Rango LATAM asesoria de capital"],
        ],
        col_widths=[70, 40, 65],
        bold_col={1},
    )

    pdf.reference_box("Referencia de mercado: El Market Rate Method es el estandar para valorar sweat equity en startups y empresas en reactivacion (Corporate Finance Institute, Eqvista, 2025-2026).")

    pdf.sub_clausula("10.2 Conversion a Acciones")
    pdf.body("Porcentaje de Participacion = Valor de Servicios / Valor de LA EMPRESA", bold=True)
    pdf.body("Valoracion acordada de LA EMPRESA: $_____________ USD")
    pdf.body("Referencia: Activos fisicos $691K-$990K (inmuebles) + $570K (cuba 9m) = $1.26M-$1.56M. Precio de venta solicitado: $1.000.000.")

    pdf.add_table(
        ["Ejemplo Ilustrativo", "Calculo"],
        [
            ["Horas trabajadas (6 meses)", "400 horas"],
            ["Tasa promedio", "$75/hora"],
            ["Valor total de servicios", "$30.000"],
            ["Valoracion de la empresa", "$1.000.000"],
            ["PARTICIPACION RESULTANTE", "3,0%"],
        ],
        col_widths=[90, 85],
        highlight_last=True,
        bold_col={1},
    )

    pdf.sub_clausula("10.3 Vesting (Adquisicion Gradual)")
    pdf.bullet("Periodo de vesting: ______ meses (recomendado: 24 meses)")
    pdf.bullet("Cliff: Los primeros ______ meses (recomendado: 6 meses) no generan participacion.")
    pdf.bullet("Despues del cliff: participacion se acumula mensualmente de forma proporcional.")

    pdf.reference_box("Referencia: Vesting de 24 meses con cliff de 6 meses es el estandar para sweat equity en empresas en etapa temprana (Cake Equity, OpenVC, Eqvista, 2025-2026).")

    pdf.sub_clausula("10.4 Formalizacion Legal")
    pdf.bullet("Inscripcion en el Libro de Accionistas de LA EMPRESA, firmada por ambas partes.")
    pdf.bullet("Registro ante el Registro Mercantil de la Circunscripcion Judicial del Estado Lara.")
    pdf.bullet("Emision de acta de asamblea de accionistas autorizando la cesion.")

    pdf.reference_box("Fundamento legal: Codigo de Comercio de Venezuela, Art. 296 -- la cesion de acciones nominativas se perfecciona con inscripcion en el Libro de Accionistas. Registro mercantil requerido para oponibilidad frente a terceros (RVLJ, Omnia Legal).")

    pdf.sub_clausula("10.5 Derechos del Accionista")
    pdf.bullet("Derecho a voto en asambleas (proporcional a su participacion).")
    pdf.bullet("Derecho a dividendos cuando se declaren.")
    pdf.bullet("Derecho de informacion sobre la situacion financiera.")
    pdf.bullet("Derecho de preferencia en futuras emisiones de acciones.")

    # ===== CLAUSE 11: DEFERRED COMPENSATION =====
    pdf.clausula("CLAUSULA DECIMO PRIMERA: COMPENSACION DIFERIDA CON INTERESES")

    pdf.body("Como alternativa o complemento a la participacion accionaria (Clausula 10), las partes pueden optar por compensacion diferida con intereses acumulados.", bold=True)

    pdf.sub_clausula("11.1 Registro de Deuda")
    pdf.body("Todo servicio no compensado en efectivo se registra como deuda exigible. Monto calculado con las tasas de la Clausula 10.1. Documentado mensualmente en Estado de Cuenta firmado por ambas partes.")

    pdf.sub_clausula("11.2 Tasa de Interes")
    pdf.body("La deuda acumulada devengara un interes del ___% anual (recomendado: 12%-18%), capitalizable mensualmente.", bold=True)

    pdf.add_table(
        ["Tasa Sugerida", "Justificacion"],
        [
            ["12% anual", "Tasa minima -- riesgo startup"],
            ["15% anual", "Tasa media -- empresa en reactivacion"],
            ["18% anual", "Tasa alta -- pago puede demorar significativamente"],
        ],
        col_widths=[50, 125],
        bold_col={0},
    )

    pdf.reference_box("Referencia: Para compensacion diferida en startups sin liquidez, tasas de 12%+ son estandar, reflejando el riesgo del prestador de servicios (Eight One Partners, PwC, AccountingTools, 2025-2026).")

    pdf.sub_clausula("11.3 Ejemplo de Acumulacion")
    pdf.add_table(
        ["Mes", "Servicios", "Acumulado", "Interes (15%)", "Saldo Total"],
        [
            ["1", "$2.500", "$2.500", "$31", "$2.531"],
            ["3", "$2.500", "$7.594", "$95", "$7.689"],
            ["6", "$2.500", "$15.768", "$197", "$15.965"],
            ["12", "$2.500", "$33.097", "$414", "$33.511"],
        ],
        col_widths=[20, 35, 35, 40, 45],
        bold_col={4},
    )
    pdf.note_text("$30.000 en servicios (12 meses x $2.500) se convierten en ~$33.511 con intereses al 15% anual.")

    pdf.sub_clausula("11.4 Condiciones de Pago")
    pdf.body("Seleccionar una o mas opciones:")
    pdf.bullet("[ ] Pago al inicio de operaciones de la cuba de 7m (dentro de ___ dias).")
    pdf.bullet("[ ] Pago por cuotas: ___% de los ingresos netos mensuales hasta saldar.")
    pdf.bullet("[ ] Pago al cierre de inversion (dentro de ___ dias del desembolso).")
    pdf.bullet("[ ] Conversion a acciones: EL REPRESENTANTE puede convertir el saldo total (capital + intereses) en participacion accionaria segun Clausula 10.2 en cualquier momento.")

    pdf.sub_clausula("11.5 Garantia")
    pdf.bullet("LA EMPRESA reconoce la deuda como pasivo exigible en su contabilidad.")
    pdf.bullet("Emision de pagare por el monto acumulado cada ______ meses.")
    pdf.bullet("En caso de venta de LA EMPRESA o sus activos, el saldo pendiente se paga con prioridad antes de distribuir el precio entre accionistas.", )

    # ===== CLAUSE 12: TERM =====
    pdf.clausula("CLAUSULA DECIMO SEGUNDA: VIGENCIA Y TERMINACION")
    pdf.sub_clausula("12.1 Vigencia")
    pdf.body("Vigencia de doce (12) meses, renovable automaticamente por periodos iguales salvo notificacion escrita con treinta (30) dias de anticipacion.")

    pdf.sub_clausula("12.2 Terminacion Anticipada")
    pdf.body("Cualquiera de las partes puede terminar con treinta (30) dias de preaviso escrito, sin necesidad de expresar causa.")

    pdf.sub_clausula("12.3 Efectos de la Terminacion")
    pdf.body("Tras la terminacion:", bold=True)
    pdf.bullet("Las comisiones residuales (Clausula 3.4) permanecen vigentes por 24 meses adicionales.")
    pdf.bullet("Los honorarios por facilitacion de inversiones en proceso se pagan al cerrarse la inversion, sin limite de tiempo.")
    pdf.bullet("La participacion accionaria adquirida (Clausula 10) es permanente e irrevocable.")
    pdf.bullet("La deuda diferida acumulada (Clausula 11) sigue devengando intereses hasta su pago total.")
    pdf.bullet("LA EMPRESA liquidara cualquier comision u honorario pendiente dentro de los 30 dias siguientes.")

    pdf.reference_box("Fundamento legal: El Codigo de Comercio de Venezuela no establece normas sobre indemnizacion post-terminacion para agentes comerciales. Las partes tienen amplia libertad contractual (AgentLaw.co.uk -- Venezuela).")

    # ===== CLAUSE 13: CONFIDENTIALITY =====
    pdf.clausula("CLAUSULA DECIMO TERCERA: CONFIDENCIALIDAD")
    pdf.body("Ambas partes se comprometen a mantener estricta confidencialidad sobre toda informacion comercial, financiera, tecnica y estrategica compartida. Esta obligacion sobrevive la terminacion por tres (3) anos.", bold=True)

    # ===== CLAUSE 14: DISPUTES =====
    pdf.clausula("CLAUSULA DECIMO CUARTA: RESOLUCION DE CONTROVERSIAS")
    pdf.bullet("Negociacion directa entre las partes (30 dias).")
    pdf.bullet("Mediacion ante un centro de mediacion en Barquisimeto, Estado Lara.")
    pdf.bullet("Arbitraje conforme a las reglas del CEDCA, cuyo laudo sera definitivo y vinculante.")

    # ===== CLAUSE 15: GOVERNING LAW =====
    pdf.clausula("CLAUSULA DECIMO QUINTA: LEY APLICABLE")
    pdf.body("Este contrato se rige por las leyes de la Republica Bolivariana de Venezuela, en particular el Codigo de Comercio (Articulos 376-409) y el Codigo Civil (Articulos 1684-1712).")

    # ===== SIGNATURES =====
    pdf.add_page()
    pdf.clausula("FIRMAS")
    pdf.ln(5)

    pdf.body("POR LA EMPRESA:", bold=True)
    pdf.signature_line("Nombre")
    pdf.signature_line("Cargo")
    pdf.signature_line("C.I. / RIF")
    pdf.signature_line("Firma")
    pdf.signature_line("Fecha")

    pdf.ln(8)
    pdf.body("POR EL REPRESENTANTE:", bold=True)
    pdf.signature_line("Nombre")
    pdf.signature_line("C.I.")
    pdf.signature_line("Firma")
    pdf.signature_line("Fecha")

    pdf.ln(8)
    pdf.body("TESTIGOS:", bold=True)
    pdf.signature_line("Testigo 1 - Nombre y C.I.")
    pdf.signature_line("Testigo 1 - Firma")
    pdf.ln(4)
    pdf.signature_line("Testigo 2 - Nombre y C.I.")
    pdf.signature_line("Testigo 2 - Firma")

    # ===== ANNEX A =====
    pdf.add_page()
    pdf.clausula("ANEXO A: TABLA DE COMISIONES ACORDADAS")

    pdf.add_table(
        ["Concepto", "Tasa Acordada", "Notas"],
        [
            ["Comision clientes -- introduccion", "_______%", ""],
            ["Comision clientes -- ciclo completo", "_______%", ""],
            ["Honorario mensual consultoria", "$_______", ""],
            ["Finder's fee -- hasta $100K", "_______%", ""],
            ["Finder's fee -- $100K-$500K", "_______%", ""],
            ["Finder's fee -- mayor a $500K", "_______%", ""],
            ["Comision residual post-terminacion", "_______ meses", ""],
            ["Sweat equity -- tasa por hora", "$_______/hora", ""],
            ["Sweat equity -- valoracion empresa", "$_______", ""],
            ["Sweat equity -- periodo de vesting", "_______ meses", ""],
            ["Sweat equity -- cliff", "_______ meses", ""],
            ["Comp. diferida -- tasa de interes", "_______ % anual", ""],
            ["Comp. diferida -- trigger de pago", "Ver Cl. 11.4", ""],
        ],
        col_widths=[75, 45, 55],
    )

    # ===== REFERENCES =====
    pdf.clausula("REFERENCIAS DE MERCADO UTILIZADAS")
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(50, 50, 50)

    refs = [
        "1. Comisiones de representacion comercial industrial (7%-15%): CaptivateIQ, 'Sales Commission Rates by Industry' (2026); Salesforce, 'Average Sales Commission' (2025); RepHunter, 'Determining Commissions for Independent Sales Reps' (2025).",
        "2. Finder's fee por facilitacion de capital (3%-5%): Kalungi, 'Finders Fees for Raising Capital' (2025); PipelineRoad, 'Finder's Fee for Raising Capital' (2026); American Association of Private Lenders (2025).",
        "3. Comisiones residuales post-terminacion (12-24 meses): LegalZoom, 'Exclusive Sales Representative Agreement' (2025); SEC Filing -- Sales Representative Agreement; RepHunter Agreement Template.",
        "4. Sweat equity -- valoracion y vesting (Market Rate Method): Corporate Finance Institute, 'Sweat Equity' (2025); Eqvista, 'Sweat Equity Agreement' (2026); Cake Equity, 'How it Works' (2025); OpenVC, 'Sweat Equity for Beginners' (2025).",
        "5. Compensacion diferida con intereses (12%+): Eight One Partners, 'Deferred Payments Guide for Founders' (2025); PwC, 'Accounting for Deferred Compensation Plans' (2025); AccountingTools (2025).",
        "6. Cesion de acciones en Venezuela (Art. 296 C.Com.): RVLJ, 'La Cesion de Acciones de Sociedades Anonimas' (2023); Omnia Legal, 'Compra y Venta de Acciones' (2021); Odreman & Asociados.",
        "7. Marco legal venezolano: Codigo de Comercio de Venezuela, Arts. 376-409; Codigo Civil, Arts. 1684-1712; AgentLaw.co.uk -- Venezuela Country Guide.",
    ]
    for ref in refs:
        pdf.multi_cell(0, 4, ref)
        pdf.ln(2)

    # Save
    output_path = "c:/Users/amont/Desktop/PYG/docs/PYGLARA-Contrato-Representacion-Comercial.pdf"
    pdf.output(output_path)
    print(f"PDF generado: {output_path}")


if __name__ == "__main__":
    build_pdf()
