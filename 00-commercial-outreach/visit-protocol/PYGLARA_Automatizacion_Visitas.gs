/**
 * PYGLARA — Sistema Integrado de Visitas a Clientes
 * ===================================================
 * UN SOLO SCRIPT — CREA TODO:
 *   📋 Google Form    — empleados lo llenan después de cada visita
 *   📄 Google Doc     — protocolo paso a paso, siempre accesible
 *   📊 Google Sheet   — CRM con clientes, historial, dashboard
 *
 * INSTRUCCIONES (una sola vez):
 *   1. Ve a https://script.google.com → Nuevo proyecto → llámalo "PYGLARA Visitas"
 *   2. Pega TODO este código reemplazando lo que haya
 *   3. Cambia MANAGER_EMAIL por tu correo real (línea ~35)
 *   4. Ejecutar → selecciona "setup" → autoriza permisos
 *   5. Revisa tu correo — llegan los 3 links listos para compartir
 *
 * TODO QUEDA CONECTADO:
 *   Form        → muestra link al Protocolo y al Sheet CRM
 *   Protocolo   → muestra link al Form y al Sheet CRM
 *   Sheet CRM   → Dashboard con links al Form y al Protocolo
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACION — EDITA ESTOS VALORES
// ─────────────────────────────────────────────────────────────────────────────
var CONFIG = {
  MANAGER_EMAIL:   "tucorreo@gmail.com",       // ← PON TU CORREO AQUÍ
  MANAGER_NAME:    "Coordinador PYGLARA",
  WHATSAPP_NUMBER: "584245715349",             // sin + ni espacios
  FORM_TITLE:      "PYGLARA — Registro de Visita a Cliente",
  SHEET_NAME:      "PYGLARA — CRM y Visitas",
  DOC_NAME:        "PYGLARA — Protocolo de Visitas",
  SENDER_NAME:     "PYGLARA — Sistema de Visitas",
};

// ─────────────────────────────────────────────────────────────────────────────
// SETUP — EJECUTAR UNA SOLA VEZ
// ─────────────────────────────────────────────────────────────────────────────
function setup() {

  // 1. Crear el Sheet (CRM) primero — necesitamos su URL para los otros
  var ss = SpreadsheetApp.create(CONFIG.SHEET_NAME);
  var sheetUrl = ss.getUrl();

  // 2. Crear el Form
  var form = createForm(sheetUrl);
  var formUrl  = form.getPublishedUrl();
  var shortUrl = form.shortenFormUrl(formUrl);

  // 3. Crear el Protocolo Doc (necesita URL del form y del sheet)
  var doc = buildProtocolDoc(shortUrl, sheetUrl);
  var docUrl = doc.getUrl();

  // 4. Actualizar la descripción del Form con el link al Protocolo y al Sheet
  form.setDescription(
    "Llena este formulario después de cada visita. Tarda 3 minutos.\n\n" +
    "📋 PROTOCOLO (pasos a seguir antes y durante la visita):\n" + docUrl + "\n\n" +
    "📊 CRM / Historial de visitas:\n" + sheetUrl + "\n\n" +
    "Guarda AMBOS links en favoritos en tu teléfono."
  );

  // 5. Vincular Form al Sheet y construir las pestañas del CRM
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  Utilities.sleep(2500);
  buildCRMSheet(ss, shortUrl, docUrl);

  // 6. Instalar trigger de notificación
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onVisitSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("onVisitSubmit").forForm(form).onFormSubmit().create();

  // 7. Log y correo de confirmación
  Logger.log("=== CONFIGURACIÓN COMPLETA ===");
  Logger.log("Formulario:  " + shortUrl);
  Logger.log("Protocolo:   " + docUrl);
  Logger.log("Sheet CRM:   " + sheetUrl);

  GmailApp.sendEmail(
    CONFIG.MANAGER_EMAIL,
    "✅ PYGLARA — Sistema de visitas listo | 3 links incluidos",
    "Sistema configurado. Abre en HTML.",
    { htmlBody: buildSetupEmail(shortUrl, docUrl, sheetUrl), name: CONFIG.SENDER_NAME }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CREAR FORMULARIO
// ─────────────────────────────────────────────────────────────────────────────
function createForm(sheetUrl) {
  var form = FormApp.create(CONFIG.FORM_TITLE);
  // Descripción se actualiza después cuando tengamos la URL del Protocolo
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    "✅ Visita registrada. El coordinador fue notificado al instante.\n\n" +
    "¿Necesitas revisar el protocolo o el historial?\n" +
    "Usa los links en la descripción del formulario (arriba al inicio)."
  );

  // ── Sección 1: Datos de la visita ──────────────────────────
  form.addSectionHeaderItem()
    .setTitle("1. DATOS DE LA VISITA")
    .setHelpText("Información básica sobre la visita realizada hoy.");

  form.addTextItem()
    .setTitle("Tu nombre completo *")
    .setRequired(true);

  form.addDateItem()
    .setTitle("Fecha de la visita *")
    .setRequired(true);

  var empresaItem = form.addListItem();
  empresaItem.setTitle("Empresa visitada *")
    .setRequired(true)
    .setChoices([
      empresaItem.createChoice("SASGO — Zona Industrial I"),
      empresaItem.createChoice("Industrias Marullo, S.A. — Zona Industrial I"),
      empresaItem.createChoice("GEDISA — Zona Industrial I"),
      empresaItem.createChoice("CORPOELEC Lara — Almacén N°01, Calle 16"),
      empresaItem.createChoice("MANPEG — Zona Industrial I"),
      empresaItem.createChoice("GEMACA — Zona Industrial I"),
      empresaItem.createChoice("Otra empresa (especifica abajo)"),
    ]);

  form.addTextItem()
    .setTitle("Si marcaste 'Otra empresa', escribe el nombre aquí")
    .setRequired(false);

  // ── Sección 2: Contacto ────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("2. PERSONA CONTACTADA")
    .setHelpText("Si no encontraste a nadie, igual continúa y marca la opción correspondiente.");

  var dispItem = form.addMultipleChoiceItem();
  dispItem.setTitle("¿Había alguien disponible para atenderte? *")
    .setRequired(true)
    .setChoices([
      dispItem.createChoice("Sí — me atendieron"),
      dispItem.createChoice("No había nadie — dejé tarjeta/nota"),
      dispItem.createChoice("No quisieron atenderme"),
    ]);

  form.addTextItem()
    .setTitle("Nombre de la persona que te atendió")
    .setHelpText("Si no había nadie, escribe el nombre del vigilante o quien te recibió.")
    .setRequired(false);

  form.addTextItem()
    .setTitle("Cargo de esa persona")
    .setHelpText("Ej: Encargado de compras, Gerente de planta, Vigilante, etc.")
    .setRequired(false);

  form.addTextItem()
    .setTitle("Teléfono / WhatsApp del contacto")
    .setRequired(false);

  form.addTextItem()
    .setTitle("Correo electrónico del contacto")
    .setHelpText("Si te lo dieron. Si no, déjalo vacío.")
    .setRequired(false);

  // ── Sección 3: Resultado ───────────────────────────────────
  form.addPageBreakItem()
    .setTitle("3. RESULTADO DE LA VISITA")
    .setHelpText("¿Qué dijeron? ¿Tienen necesidad?");

  var galvItem = form.addMultipleChoiceItem();
  galvItem.setTitle("¿Tienen interés en GALVANIZADO? *")
    .setRequired(true)
    .setChoices([
      galvItem.createChoice("Sí — tienen necesidad activa"),
      galvItem.createChoice("Tal vez — depende de precios/disponibilidad"),
      galvItem.createChoice("No — no tienen necesidad ahora"),
      galvItem.createChoice("No se pudo determinar"),
    ]);

  var varItem = form.addMultipleChoiceItem();
  varItem.setTitle("¿Tienen interés en VARILLAS DE TIERRA COBREADAS? *")
    .setRequired(true)
    .setChoices([
      varItem.createChoice("Sí — tienen necesidad activa"),
      varItem.createChoice("Tal vez — depende de precios/disponibilidad"),
      varItem.createChoice("No — no tienen necesidad ahora"),
      varItem.createChoice("No se pudo determinar"),
    ]);

  form.addTextItem()
    .setTitle("Volumen estimado de galvanizado (TM por mes)")
    .setHelpText("Si lo mencionaron. Ej: 10, 20, 50. Si no saben, escribe 'no mencionaron'.")
    .setRequired(false);

  form.addTextItem()
    .setTitle("Cantidad estimada de varillas (unidades por mes)")
    .setHelpText("Si lo mencionaron. Ej: 200, 500, 1000.")
    .setRequired(false);

  // ── Sección 4: Seguimiento ─────────────────────────────────
  form.addPageBreakItem()
    .setTitle("4. SEGUIMIENTO ACORDADO")
    .setHelpText("¿Qué quedó acordado para el próximo paso?");

  var seguimItem = form.addMultipleChoiceItem();
  seguimItem.setTitle("¿Qué seguimiento quedó acordado? *")
    .setRequired(true)
    .setChoices([
      seguimItem.createChoice("Reunión agendada — con fecha y hora"),
      seguimItem.createChoice("Llamada acordada — llamar en los próximos días"),
      seguimItem.createChoice("WhatsApp enviado / a enviar hoy"),
      seguimItem.createChoice("Volver a visitar — me indicaron cuándo"),
      seguimItem.createChoice("Sin acuerdo — no hubo respuesta"),
    ]);

  form.addTextItem()
    .setTitle("Fecha y hora del seguimiento (si quedó acordado)")
    .setHelpText("Ej: Jueves 10 de abril, 10am. Si no aplica, déjalo vacío.")
    .setRequired(false);

  // ── Sección 5: Notas ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle("5. NOTAS FINALES")
    .setHelpText("Lo más importante de la visita en tus propias palabras.");

  form.addParagraphTextItem()
    .setTitle("Notas de la visita *")
    .setHelpText(
      "Qué dijeron, cómo reaccionaron, qué necesitan, si conocen a PYGLARA, " +
      "cualquier dato útil."
    )
    .setRequired(true);

  var potItem = form.addMultipleChoiceItem();
  potItem.setTitle("¿Cómo calificarías el potencial de este cliente?")
    .setRequired(false)
    .setChoices([
      potItem.createChoice("🔥 Alto — hay negocio concreto, seguir de cerca"),
      potItem.createChoice("🟡 Medio — hay interés pero no urgencia"),
      potItem.createChoice("⬇️ Bajo — poca probabilidad de negocio pronto"),
      potItem.createChoice("❓ Sin datos suficientes"),
    ]);

  return form;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIGGER — SE EJECUTA AUTOMÁTICAMENTE AL RECIBIR CADA ENVÍO
// ─────────────────────────────────────────────────────────────────────────────
function onVisitSubmit(e) {
  var itemResponses = e.response.getItemResponses();
  var data = {};
  for (var i = 0; i < itemResponses.length; i++) {
    data[itemResponses[i].getItem().getTitle()] = itemResponses[i].getResponse();
  }

  var empleado     = data["Tu nombre completo *"]                         || "No indicado";
  var fecha        = formatDate(data["Fecha de la visita *"])             || "No indicada";
  var empresa      = data["Empresa visitada *"]                           || "No indicada";
  var otraEmpresa  = data["Si marcaste 'Otra empresa', escribe el nombre aquí"] || "";
  var disponible   = data["¿Había alguien disponible para atenderte? *"]  || "No indicado";
  var contacto     = data["Nombre de la persona que te atendió"]          || "No indicado";
  var cargo        = data["Cargo de esa persona"]                         || "No indicado";
  var telefono     = data["Teléfono / WhatsApp del contacto"]             || "";
  var emailCliente = data["Correo electrónico del contacto"]              || "";
  var galv         = data["¿Tienen interés en GALVANIZADO? *"]            || "No indicado";
  var varilla      = data["¿Tienen interés en VARILLAS DE TIERRA COBREADAS? *"] || "No indicado";
  var volGalv      = data["Volumen estimado de galvanizado (TM por mes)"] || "No mencionado";
  var volVar       = data["Cantidad estimada de varillas (unidades por mes)"] || "No mencionado";
  var seguimiento  = data["¿Qué seguimiento quedó acordado? *"]           || "No indicado";
  var fechaSeguim  = data["Fecha y hora del seguimiento (si quedó acordado)"] || "";
  var notas        = data["Notas de la visita *"]                         || "";
  var potencial    = data["¿Cómo calificarías el potencial de este cliente?"] || "Sin datos";

  if (otraEmpresa) empresa = otraEmpresa;

  var urgente = galv.indexOf("activa") > -1 || varilla.indexOf("activa") > -1;

  // Correo al manager
  var asunto = urgente
    ? "🔥 PYGLARA — INTERES ACTIVO: " + empresa + " | " + empleado
    : "📋 PYGLARA — Nueva visita: " + empresa + " | " + empleado + " | " + fecha;

  GmailApp.sendEmail(
    CONFIG.MANAGER_EMAIL, asunto,
    "Nueva visita registrada — abre en HTML para ver el resumen.",
    {
      htmlBody: buildManagerEmail({
        empleado: empleado, fecha: fecha, empresa: empresa,
        disponible: disponible, contacto: contacto, cargo: cargo,
        telefono: telefono, emailCliente: emailCliente,
        galv: galv, varilla: varilla, volGalv: volGalv, volVar: volVar,
        seguimiento: seguimiento, fechaSeguim: fechaSeguim,
        notas: notas, potencial: potencial, urgente: urgente
      }),
      name: CONFIG.SENDER_NAME
    }
  );

  // Correo automático al cliente si dejaron email
  if (emailCliente && emailCliente.indexOf("@") > -1) {
    GmailApp.sendEmail(
      emailCliente,
      "PYGLARA — Galvanizado en Caliente | Reactivación 2026 | Solicitud de Reunión",
      buildClientEmailPlain(empresa, contacto),
      {
        htmlBody: buildClientEmail(empresa, contacto),
        name:     "PYGLARA — Prensados y Galvanizados de Lara",
        replyTo:  CONFIG.MANAGER_EMAIL,
        cc:       CONFIG.MANAGER_EMAIL,
      }
    );
  }

  // Actualizar pestaña CRM en el Sheet con el nuevo contacto (si es nuevo)
  updateCRMFromSubmission(empresa, contacto, cargo, telefono, emailCliente, galv, varilla, notas, fecha);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTRUIR EL SHEET CRM (Dashboard + Clientes + Guía rápida)
// ─────────────────────────────────────────────────────────────────────────────
function buildCRMSheet(ss, formUrl, docUrl) {

  // ── Pestaña: DASHBOARD ────────────────────────────────────
  var dash = ss.insertSheet("DASHBOARD", 0);
  dash.setTabColor("#1A2E4A");

  // Título
  dash.getRange("A1:F1").merge()
    .setValue("PYGLARA — Sistema de Visitas Comerciales")
    .setBackground("#1A2E4A").setFontColor("#C89B2F")
    .setFontWeight("bold").setFontSize(16)
    .setVerticalAlignment("middle").setHorizontalAlignment("center");
  dash.setRowHeight(1, 40);

  dash.getRange("A2:F2").merge()
    .setValue("Prensados y Galvanizados de Lara, S.A. | Zona Industrial I, Barquisimeto")
    .setBackground("#1A2E4A").setFontColor("#8FA8C8")
    .setFontSize(10).setHorizontalAlignment("center");
  dash.setRowHeight(2, 20);

  dash.getRange("A3:F3").merge().setBackground("#1A2E4A");
  dash.setRowHeight(3, 8);

  // Links section
  var linkData = [
    ["📋  FORMULARIO PARA EMPLEADOS", formUrl,
     "Comparte este link con los empleados por WhatsApp. Lo llenan después de cada visita."],
    ["📄  PROTOCOLO DE VISITAS",      docUrl,
     "Guía paso a paso: qué decir, cómo presentarse, mensajes de seguimiento."],
    ["📊  ESTE SHEET — CRM",          ss.getUrl(),
     "Historial de visitas, clientes, contactos. Ver pestaña 'Clientes CRM' y 'Visitas'."],
  ];

  var bgColors = ["#EAF4EA", "#FFF8E7", "#EAF0FA"];
  var iconColors = ["#1A7A1A", "#C8760A", "#1A4EA0"];

  linkData.forEach(function(row, i) {
    var baseRow = 4 + (i * 4);
    dash.setRowHeight(baseRow,     32);
    dash.setRowHeight(baseRow + 1, 20);
    dash.setRowHeight(baseRow + 2, 16);
    dash.setRowHeight(baseRow + 3, 6);

    dash.getRange(baseRow, 1, 1, 6).merge()
      .setValue(row[0])
      .setBackground(bgColors[i]).setFontColor(iconColors[i])
      .setFontWeight("bold").setFontSize(12)
      .setVerticalAlignment("middle");

    dash.getRange(baseRow + 1, 1, 1, 6).merge()
      .setValue(row[1])
      .setBackground(bgColors[i]).setFontColor("#1A6AB0")
      .setFontSize(10).setFontLine("underline");

    dash.getRange(baseRow + 2, 1, 1, 6).merge()
      .setValue(row[2])
      .setBackground(bgColors[i]).setFontColor("#666666")
      .setFontSize(9).setFontStyle("italic");

    dash.getRange(baseRow + 3, 1, 1, 6).merge()
      .setBackground("#FFFFFF");
  });

  // Stats header
  var statsRow = 17;
  dash.getRange(statsRow, 1, 1, 6).merge()
    .setValue("RESUMEN DE VISITAS (se actualiza automáticamente)")
    .setBackground("#1A2E4A").setFontColor("#FFFFFF")
    .setFontWeight("bold").setFontSize(10)
    .setHorizontalAlignment("center");
  dash.setRowHeight(statsRow, 28);

  var statsLabels = [
    ["Total visitas registradas",     "=COUNTA('Visitas'!A:A)-1"],
    ["Con interés activo (galv.)",    "=COUNTIF('Visitas'!I:I,\"Sí — tienen necesidad activa\")"],
    ["Con interés activo (varillas)", "=COUNTIF('Visitas'!J:J,\"Sí — tienen necesidad activa\")"],
    ["Reuniones agendadas",           "=COUNTIF('Visitas'!M:M,\"Reunión agendada — con fecha y hora\")"],
    ["Sin seguimiento acordado",      "=COUNTIF('Visitas'!M:M,\"Sin acuerdo — no hubo respuesta\")"],
    ["Contactos con email capturado", "=COUNTA('Visitas'!H:H)-1"],
  ];

  statsLabels.forEach(function(stat, i) {
    var r = statsRow + 1 + i;
    dash.setRowHeight(r, 22);
    dash.getRange(r, 1, 1, 4).merge()
      .setValue(stat[0])
      .setBackground(i % 2 === 0 ? "#F4F7FB" : "#FFFFFF")
      .setFontSize(10);
    dash.getRange(r, 5, 1, 2).merge()
      .setFormula(stat[1])
      .setBackground(i % 2 === 0 ? "#F4F7FB" : "#FFFFFF")
      .setFontWeight("bold").setFontSize(11)
      .setFontColor("#1A2E4A").setHorizontalAlignment("center");
  });

  dash.setColumnWidth(1, 200);
  for (var c = 2; c <= 6; c++) dash.setColumnWidth(c, 120);

  // ── Pestaña: CLIENTES CRM ─────────────────────────────────
  var crm = ss.insertSheet("Clientes CRM", 1);
  crm.setTabColor("#C89B2F");

  var crmHeaders = [
    "Prior.", "#", "Empresa", "RIF", "Zona",
    "Qué producen / necesitan",
    "Teléfono principal", "Teléfono 2", "Email",
    "Contacto clave", "Cargo contacto",
    "Último interés galv.", "Último interés varillas",
    "Última visita", "Próximo seguimiento", "Estado", "Notas CRM"
  ];
  var crmRow1 = crm.getRange(1, 1, 1, crmHeaders.length);
  crmRow1.setValues([crmHeaders])
    .setBackground("#1A2E4A").setFontColor("#FFFFFF")
    .setFontWeight("bold").setFontSize(9)
    .setVerticalAlignment("middle").setHorizontalAlignment("center");
  crm.setFrozenRows(1);
  crm.setRowHeight(1, 30);

  // Prioridad | # | Empresa | RIF | Zona | Descripción | Tel1 | Tel2 | Email | Contacto | Cargo | Int.Galv | Int.Varillas | Última visita | Próx.seguimiento | Estado | Notas
  var crmData = [
    // ── PRIORIDAD 1: Reactivación confirmada ─────────────────────────────────
    ["P1", "1", "SASGO (Suministros Eléctricos SASGO, C.A.)",
     "J-31248868-9", "Zona Industrial I — misma zona",
     "Fabrica torres y postes eléctricos para CORPOELEC. Contratos CORPOELEC activos. ALTA necesidad de galvanizado.",
     "+58 251-237-1610", "+58 412-536-3346", "importacion@sasgo.com.ve",
     "", "", "", "", "", "", "Por contactar", "Mismo complejo que PYGLARA. TOP PRIORITY."],

    ["P1", "2", "Industrias Marullo, S.A.",
     "J-07504626-9", "Zona Industrial I — misma zona",
     "Maquinaria agroindustrial y estructuras de acero. Fundada 1955. Muy activa marzo 2026.",
     "+58 424-514-3859", "+58 251-237-2203", "marullo@hotmail.com",
     "", "", "", "", "", "", "Por contactar", "Mismo complejo. Fundada 1955 — conocen a PYGLARA."],

    ["P1", "3", "Freyssinet / Geoquest Venezuela",
     "J-00133672-9", "Caracas (nacional)",
     "Geotecnia, muros de contención. Filial del Grupo VINCI. Rebranding a GEOQUEST Venezuela (mayo 2025).",
     "+58 212-238-8285", "+58 414-133-0406", "consultas@tierra-armada.com.ve",
     "Ramón Paz Besada", "Director General", "", "", "", "", "Por contactar", "Filial de VINCI Group. Alta capacidad de pago."],

    ["P1", "4", "GEDISA (General Distribuidora, S.A.)",
     "J-00046849-4", "Zona Industrial I — misma zona",
     "Distribuidor eléctrico con 60 años de trayectoria. Reabrió enero 19 de 2026 (@gedisaoficial).",
     "+58 251-237-0193", "+58 414-503-2546", "gedisa@gedisa.com.ve",
     "", "", "", "", "", "", "Por contactar", "Reabrieron enero 2026. Mismo complejo."],

    ["P1", "5", "DISMACA",
     "J-40468528-6", "Barcelona, Anzoátegui",
     "EPC / Oil & Gas. Tiene galvanizado propio — abordar como socio para capacidad adicional (overflow).",
     "+58 426-580-0942", "", "dismaca@dismaca.com",
     "Christian Villegas", "Gerente de Compras", "", "", "", "", "Por contactar", "Tienen galvanizado propio. Pitch = socio de capacidad, no competencia."],

    ["P1", "6", "MEICA G&L",
     "Por verificar", "Zona Industrial I (sin confirmar)",
     "Empresa industrial — detalles a verificar antes del primer contacto.",
     "", "", "",
     "", "", "", "", "", "", "Verificar primero", "No está en lista histórica. Verificar dirección antes de visitar."],

    // ── PRIORIDAD 2A: Sector eléctrico ────────────────────────────────────────
    ["P2A", "7", "CORPOELEC Lara — Almacén N°01",
     "G-20010014-1", "Zona Industrial I, Calle 16 — misma zona",
     "Almacén regional empresa eléctrica del Estado. Absorbió ENELVEN, ENELBAR, Electricidad de Caracas.",
     "0251-239-4050", "", "corpoelecresponde@corpoelec.gob.ve",
     "", "Encargado de almacén", "", "", "", "", "Por contactar", "ENELVEN compró 20.000 varillas de tierra a PYGLARA (2004-2005). Referencia clave. Mismo complejo."],

    ["P2A", "8", "CORPOELEC Zulia (ex-ENELVEN)",
     "G-20010014-1", "Av. Fuerzas Armadas, Maracaibo",
     "Región Zulia. ENELVEN compró 20.000 varillas de tierra cobreadas a PYGLARA 2004-2005.",
     "0416-100-000", "", "",
     "", "", "", "", "", "", "Por contactar", "Precedente de $168K en varillas. Usar este historial como referencia en el pitch."],

    ["P2A", "9", "INDUESCA",
     "", "Zona Industrial III, Barquisimeto",
     "Fabrica bandejas portacables, postes y torres eléctricas.",
     "0251-269-2076", "", "induesca@induesca.com",
     "Vanessa Varela", "Gerente de Planta", "", "", "", "", "Por contactar", ""],

    ["P2A", "10", "MANPEG",
     "", "Zona Industrial I — misma zona",
     "Fabrica postes hexagonales y eléctricos hasta 40m. Alta necesidad de galvanizado.",
     "+58 424-561-2759", "", "",
     "", "", "", "", "", "", "Por contactar", "Instagram: @manpeg.ca — verificar contacto por IG."],

    ["P2A", "11", "SUGEVEN",
     "", "Zona Industrial II, Barquisimeto",
     "Tubos de acero y postes eléctricos. Muy activa 2025-2026.",
     "0251-269-2324", "", "SUGEVEN2020@gmail.com",
     "", "", "", "", "", "", "Por contactar", "Instagram: @sugeven.ca"],

    ["P2A", "12", "CATECA",
     "", "Cabimas, Zulia",
     "EPC en región petrolera. Actividad reducida post-2015.",
     "0264-261-2866", "", "info@cateca.com",
     "", "", "", "", "", "", "Por contactar", "Zona petrolera. Verificar actividad actual antes de visitar."],

    ["P2A", "13", "Eléctrica Industrial Lara",
     "", "Barquisimeto",
     "Distribuidor e instalador eléctrico local.",
     "+58 424-585-0955", "", "",
     "", "", "", "", "", "", "Por contactar", "Instagram: @electrica.industrial"],

    // ── PRIORIDAD 2B: Tornillería / Metal / Industrial ─────────────────────────
    ["P2B", "14", "Tornillos Falcón (TORNIFAL)",
     "", "Coro, Falcón",
     "Tornillería industrial. Empresa más profesional del sector fasteners en Venezuela.",
     "", "", "ventas@tornifal.com",
     "Elkins Restrepo", "", "", "", "", "", "Por contactar", "Email directo: erestrepo@tornifal.com"],

    ["P2B", "15", "Tornillos Avila (TORNAVICA)",
     "", "Cagua, Aragua",
     "40+ años importando tornillería a nivel nacional.",
     "", "", "",
     "", "", "", "", "", "", "Por contactar", "Instagram: @tornavica"],

    ["P2B", "16", "Taller Chama",
     "", "Mérida (~3h de Barquisimeto)",
     "55+ años en metal fab. Taller metalmecánico con historia.",
     "", "", "tallerchama@gmail.com",
     "", "", "", "", "", "", "Por contactar", "Instagram: @tallerchama"],

    ["P2B", "17", "INAMECA",
     "", "Zona Industrial III, Barquisimeto",
     "Abrazaderas metálicas y fijaciones industriales.",
     "0251-269-2069", "", "",
     "", "", "", "", "", "", "Por contactar", ""],

    ["P2B", "18", "Comercial Ornelara",
     "", "Barquisimeto Centro",
     "Ferretería industrial. Activa en 2026.",
     "0251-446-6124", "", "ventas@comercialornelara.com",
     "", "", "", "", "", "", "Por contactar", "Instagram: @comercialornelara_oficial"],

    ["P2B", "19", "GEMACA",
     "", "Zona Industrial I — misma zona",
     "Tubería PEAD e industrial. Necesidad de galvanizado baja.",
     "+58 251-237-6922", "", "",
     "Antonio Mesa", "", "", "", "", "", "Por contactar", "gemaca.com — baja prioridad pero misma zona."],

    ["P2B", "20", "Torni Roda Barquisimeto",
     "", "Zona Industrial I — misma zona",
     "Distribuidor local de tornillería.",
     "+58 251-446-0661", "", "",
     "", "", "", "", "", "", "Por contactar", "Mismo complejo. Bajo volumen pero fácil visitar."],

    // ── A VERIFICAR ───────────────────────────────────────────────────────────
    ["Verificar", "21", "VENHETOCA",
     "", "Por verificar",
     "Empresa histórica — probable cierre.",
     "", "", "",
     "", "", "", "", "", "", "Verificar — posible cierre", "Sin información actual. Verificar via contactos locales antes de visitar."],
  ];

  crm.getRange(2, 1, crmData.length, crmHeaders.length).setValues(crmData);

  // Formato por fila
  for (var r = 2; r <= crmData.length + 1; r++) {
    crm.setRowHeight(r, 24);
    var prior = crmData[r - 2][0];
    var rowBg = prior === "P1"       ? (r % 2 === 0 ? "#FFF0F0" : "#FFF8F8") :
                prior === "P2A"      ? (r % 2 === 0 ? "#F0F4FF" : "#F8FAFF") :
                prior === "P2B"      ? (r % 2 === 0 ? "#F4F8FF" : "#FAFCFF") :
                                       (r % 2 === 0 ? "#F8F8F8" : "#FFFFFF");
    crm.getRange(r, 1, 1, crmHeaders.length).setBackground(rowBg).setFontSize(9)
      .setVerticalAlignment("middle");
    // Color de prioridad en col A
    var priorColor = prior === "P1" ? "#C02020" : prior === "P2A" ? "#1A4EA0" :
                     prior === "P2B" ? "#1A6B1A" : "#888888";
    crm.getRange(r, 1).setFontColor(priorColor).setFontWeight("bold");
    crm.getRange(r, 2).setFontWeight("bold").setFontColor("#1A2E4A");
  }

  // Anchos de columna
  var crmWidths = [55, 35, 200, 110, 140, 260, 130, 130, 160, 130, 120, 120, 130, 95, 130, 110, 220];
  crmWidths.forEach(function(w, i) { crm.setColumnWidth(i + 1, w); });

  // Formato condicional: interés activo en verde (columnas L y M)
  var crmRules = crm.getConditionalFormatRules();
  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("activa")
    .setBackground("#D4EDDA").setFontColor("#1A7A1A").setBold(true)
    .setRanges([crm.getRange("L2:M100")])
    .build();
  // Estado: resaltar reuniones agendadas
  var meetingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Reunión")
    .setBackground("#FFF3CD").setFontColor("#856404").setBold(true)
    .setRanges([crm.getRange("O2:O100")])
    .build();
  crmRules.push(greenRule, meetingRule);
  crm.setConditionalFormatRules(crmRules);

  // ── Pestaña: VISITAS ──────────────────────────────────────
  // (Google Forms crea su propia pestaña — la renombramos y formateamos)
  Utilities.sleep(1500);
  var sheets = ss.getSheets();
  var respSheet = null;
  for (var s = 0; s < sheets.length; s++) {
    if (sheets[s].getName() !== "DASHBOARD" && sheets[s].getName() !== "Clientes CRM") {
      respSheet = sheets[s];
      break;
    }
  }
  if (respSheet) {
    try { respSheet.setName("Visitas"); } catch(e) {}
    respSheet.setTabColor("#25D366");
    respSheet.setFrozenRows(1);
    var hdr = respSheet.getRange(1, 1, 1, respSheet.getLastColumn());
    hdr.setBackground("#1A2E4A").setFontColor("#FFFFFF").setFontWeight("bold").setFontSize(9);
    respSheet.setRowHeight(1, 30);

    // Formato condicional en la hoja de visitas
    var visitRules = respSheet.getConditionalFormatRules();
    var hotRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains("activa")
      .setBackground("#D4EDDA").setFontColor("#1A7A1A").setBold(true)
      .setRanges([respSheet.getRange("A1:Z1000")])
      .build();
    visitRules.push(hotRule);
    respSheet.setConditionalFormatRules(visitRules);
  }

  // ── Pestaña: GUIA RAPIDA ──────────────────────────────────
  var guia = ss.insertSheet("Guía Rápida", 3);
  guia.setTabColor("#8FA8C8");

  guia.getRange("A1:B1").merge()
    .setValue("PYGLARA — GUÍA RÁPIDA DE VISITAS")
    .setBackground("#1A2E4A").setFontColor("#C89B2F")
    .setFontWeight("bold").setFontSize(13)
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  guia.setRowHeight(1, 30);
  guia.setColumnWidth(1, 220);
  guia.setColumnWidth(2, 500);

  var guiaData = [
    ["PASO 1 — Preparación",      "Lleva: tarjeta PYGLARA, formulario (este link), bolígrafo, teléfono cargado"],
    ["PASO 2 — Al llegar",        "Pide hablar con el encargado de compras o gerente de planta"],
    ["PASO 3 — Mensaje clave",    "\"PYGLARA se reactiva en 2026 — queremos coordinar pedidos de galvanizado y varillas de tierra\""],
    ["PASO 4 — Objetivo",         "Conseguir nombre del contacto de compras y agendar reunión (NO cerrar pedido hoy)"],
    ["PASO 5 — Retirarse",        "Deja tarjeta. Escribe: PYGLARA — próxima reactivación 2026"],
    ["PASO 6 — Llena el form",    "Abre este link y llena el formulario antes de salir de la zona industrial"],
    ["PASO 7 — Seguimiento",      "Envía WhatsApp o correo al contacto dentro de las 24 horas"],
    ["", ""],
    ["SI PREGUNTAN PRECIOS",       "$1.50 – $1.70 por kg galvanizado. Precio formal: requiere tipo de pieza y volumen"],
    ["SI PREGUNTAN CUÁNDO",        "Zinc tarda ~60 días. Luego 3 semanas de puesta en marcha. En gestión ahora"],
    ["SI YA TIENEN PROVEEDOR",     "Solo hay 2 galvanizadores activos en Venezuela. Para capacidad adicional, nos llaman"],
    ["", ""],
    ["WHATSAPP DE SEGUIMIENTO",    "\"Buenas [nombre]. Le escribo de PYGLARA — estuvimos hoy en [empresa]. Queremos coordinar una reunión para presentarles nuestras capacidades. Reactivación 2026. ¿Disponibilidad esta semana?\""],
    ["", ""],
    ["📋 PROTOCOLO COMPLETO",      formUrl],
    ["📊 VER HISTORIAL CRM",       ss.getUrl()],
  ];

  guia.getRange(2, 1, guiaData.length, 2).setValues(guiaData);
  guiaData.forEach(function(row, i) {
    var r = i + 2;
    guia.setRowHeight(r, row[0] ? 22 : 8);
    var isStep = row[0].indexOf("PASO") > -1;
    var isQna  = row[0].indexOf("SI ") > -1 || row[0].indexOf("WHATS") > -1;
    var isLink = row[0].indexOf("📋") > -1 || row[0].indexOf("📊") > -1;
    guia.getRange(r, 1)
      .setFontWeight("bold").setFontSize(9)
      .setFontColor(isStep ? "#1A2E4A" : (isQna ? "#C8760A" : (isLink ? "#1A6AB0" : "#333")))
      .setBackground(isStep ? "#EEF2F8" : "#FFFFFF");
    guia.getRange(r, 2)
      .setFontSize(9).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
      .setBackground(isStep ? "#EEF2F8" : "#FFFFFF")
      .setFontColor(isLink ? "#1A6AB0" : "#333333");
  });

  // Ocultar la hoja "Hoja 1" vacía que crea Google Sheets por defecto
  var defaultSheet = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1");
  if (defaultSheet) ss.deleteSheet(defaultSheet);
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALIZAR CRM DESDE EL ENVÍO DEL FORMULARIO
// ─────────────────────────────────────────────────────────────────────────────
function updateCRMFromSubmission(empresa, contacto, cargo, tel, email, galv, varilla, notas, fecha) {
  try {
    var files = DriveApp.getFilesByName(CONFIG.SHEET_NAME);
    if (!files.hasNext()) return;
    var ss  = SpreadsheetApp.open(files.next());
    var crm = ss.getSheetByName("Clientes CRM");
    if (!crm) return;

    var data     = crm.getDataRange().getValues();
    var empresaLow = empresa.toLowerCase().substring(0, 10);
    var matchRow  = -1;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).toLowerCase().indexOf(empresaLow) > -1) {
        matchRow = i + 1; // 1-indexed sheet row
        break;
      }
    }

    if (matchRow > -1) {
      // Columnas: Prior(1) #(2) Empresa(3) RIF(4) Zona(5) Desc(6)
      //           Tel1(7) Tel2(8) Email(9) Contacto(10) Cargo(11)
      //           IntGalv(12) IntVar(13) UltimaVisita(14) ProxSeguim(15) Estado(16) Notas(17)
      if (contacto && contacto !== "No indicado") {
        crm.getRange(matchRow, 10).setValue(contacto);
        crm.getRange(matchRow, 11).setValue(cargo);
      }
      if (tel)   crm.getRange(matchRow, 7).setValue(tel);
      if (email) crm.getRange(matchRow, 9).setValue(email);
      crm.getRange(matchRow, 12).setValue(galv);
      crm.getRange(matchRow, 13).setValue(varilla);
      crm.getRange(matchRow, 14).setValue(fecha);
      // Actualizar estado automáticamente si hay interés activo
      if (galv.indexOf("activa") > -1 || varilla.indexOf("activa") > -1) {
        crm.getRange(matchRow, 16).setValue("Interés activo — dar seguimiento");
      } else if (crm.getRange(matchRow, 16).getValue() === "Por contactar") {
        crm.getRange(matchRow, 16).setValue("Contactado — sin interés claro");
      }
      if (notas) {
        var existingNotes = crm.getRange(matchRow, 17).getValue();
        crm.getRange(matchRow, 17).setValue(
          (existingNotes ? existingNotes + "\n---\n" : "") + fecha + ": " + notas
        );
      }
    }
    // Si no se encuentra la empresa, se queda solo en la hoja de Visitas
  } catch(e) {
    Logger.log("updateCRM error: " + e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CREAR PROTOCOLO COMO GOOGLE DOC
// ─────────────────────────────────────────────────────────────────────────────
function buildProtocolDoc(formUrl, sheetUrl) {
  var doc  = DocumentApp.create(CONFIG.DOC_NAME);
  var body = doc.getBody();
  body.clear();

  // Estilos
  var titleStyle = {};
  titleStyle[DocumentApp.Attribute.FONT_SIZE]   = 18;
  titleStyle[DocumentApp.Attribute.BOLD]        = true;
  titleStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = "#1A2E4A";

  var h2Style = {};
  h2Style[DocumentApp.Attribute.FONT_SIZE]  = 12;
  h2Style[DocumentApp.Attribute.BOLD]       = true;
  h2Style[DocumentApp.Attribute.FOREGROUND_COLOR] = "#1A2E4A";

  var bodyStyle = {};
  bodyStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  bodyStyle[DocumentApp.Attribute.BOLD]      = false;

  var linkStyle = {};
  linkStyle[DocumentApp.Attribute.FONT_SIZE]       = 10;
  linkStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = "#1A6AB0";
  linkStyle[DocumentApp.Attribute.UNDERLINE]        = true;

  // Título
  body.appendParagraph("PYGLARA — Protocolo de Visitas a Clientes")
    .setAttributes(titleStyle).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph("Prensados y Galvanizados de Lara, S.A. | Zona Industrial I, Barquisimeto | Abril 2026")
    .setAttributes(bodyStyle).setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    .setForegroundColor("#888888");

  body.appendParagraph("─".repeat(80)).setAttributes(bodyStyle).setForegroundColor("#CCCCCC");

  // Links de navegación
  body.appendParagraph("ACCESOS RÁPIDOS — guarda estos links en favoritos:")
    .setAttributes(h2Style);
  body.appendParagraph("📋 Formulario de visitas (llenar después de cada visita): " + formUrl)
    .setAttributes(linkStyle);
  body.appendParagraph("📊 CRM y historial de visitas (Google Sheets): " + sheetUrl)
    .setAttributes(linkStyle);
  body.appendParagraph(" ").setAttributes(bodyStyle);

  // Objetivo
  body.appendParagraph("OBJETIVO").setAttributes(h2Style);
  body.appendParagraph(
    "Retomar el contacto con clientes históricos y empresas vecinas para informarles de la " +
    "próxima reactivación de PYGLARA y levantar intenciones de pedidos antes de que llegue el zinc."
  ).setAttributes(bodyStyle);
  body.appendParagraph(" ").setAttributes(bodyStyle);

  // Clientes prioritarios
  body.appendParagraph("CLIENTES PRIORITARIOS — ZONA INDUSTRIAL I").setAttributes(h2Style);
  var clients = [
    "1. SASGO — Torres y postes eléctricos para CORPOELEC. ALTA necesidad. Tel: +58 412-536-3346",
    "2. Industrias Marullo, S.A. — Maquinaria agroindustrial. Fundada 1955. Tel: +58 424-514-3859",
    "3. GEDISA — Distribuidor eléctrico 60 años. Reabrió enero 2026. Tel: +58 414-503-2546",
    "4. CORPOELEC Lara (Almacén N°01, Calle 16) — Compraron 20.000 varillas en 2004-2005. Tel: 0251-239-4050",
    "5. MANPEG — Postes hexagonales hasta 40m. Tel: +58 424-561-2759",
    "6. GEMACA — Tubería PEAD. Tel: +58 251-237-6922",
  ];
  clients.forEach(function(c) {
    body.appendParagraph(c).setAttributes(bodyStyle);
  });
  body.appendParagraph(" ").setAttributes(bodyStyle);

  // Pasos
  var steps = [
    ["PASO 1 — PREPARACIÓN (10 minutos antes de salir)",
     "Llevar: tarjeta de PYGLARA (o hoja con nombre, cargo, teléfono), bolígrafo, teléfono cargado con este link guardado.\n" +
     "Repasar: nombre de la empresa, qué producen (ver lista arriba), y el mensaje clave del Paso 3."],
    ["PASO 2 — LLEGADA A LA EMPRESA",
     "Preséntate en recepción o con el vigilante:\n" +
     "\"Buenos días. Soy [TU NOMBRE] de PYGLARA — Prensados y Galvanizados de Lara. Estamos aquí mismo en la Zona Industrial. " +
     "Vengo a hablar con el encargado de compras o el gerente de planta.\"\n\n" +
     "Si no hay nadie: solicita el nombre del responsable, anota cuándo regresar y deja una tarjeta."],
    ["PASO 3 — EL MENSAJE (versión corta, 2 minutos)",
     "\"PYGLARA — el galvanizador de la Zona Industrial — está próximo a reactivarse. Paramos en 2015 por falta de zinc, " +
     "pero ya estamos gestionando la compra. Queremos contactar a clientes para coordinar pedidos cuando arranquemos. " +
     "¿Tienen alguna necesidad de galvanizado o varillas de puesta a tierra cobreadas?\"\n\n" +
     "Si preguntan precios: \"Trabajamos por kg galvanizado, rango de mercado $1.50–$1.70/kg. Para precio formal necesitamos tipo de pieza y volumen.\"\n" +
     "Si preguntan cuándo: \"El zinc tarda ~60 días en llegar, luego 3 semanas de puesta en marcha. En gestión ahora.\"\n" +
     "Si ya tienen proveedor: \"Solo hay 2 galvanizadores activos en Venezuela. Para capacidad adicional, nos llaman.\""],
    ["PASO 4 — OBJETIVO: CONSEGUIR UNA REUNIÓN",
     "NO es cerrar un pedido hoy. El objetivo es:\n" +
     "  a) Saber si tienen necesidad (sí / no / cuánto)\n" +
     "  b) Conseguir nombre y datos del responsable de compras o mantenimiento\n" +
     "  c) Agendar reunión de seguimiento — en persona, por teléfono o WhatsApp\n\n" +
     "\"¿Podríamos coordinar 20 minutos con usted esta semana?\"\n" +
     "\"¿Le parece si le escribo por WhatsApp? ¿Cuál es el mejor número?\""],
    ["PASO 5 — ANTES DE RETIRARSE",
     "Agradece el tiempo. Deja tarjeta con: nombre PYGLARA, tu nombre, teléfono de contacto.\n" +
     "Escribe en la nota: \"PYGLARA — próxima reactivación 2026\""],
    ["PASO 6 — LLENA EL FORMULARIO",
     "Llena el formulario ANTES de salir de la zona industrial, mientras todo está fresco:\n" +
     formUrl],
    ["PASO 7 — MENSAJE DE SEGUIMIENTO (dentro de 24 horas)",
     "WhatsApp:\n" +
     "\"Buenas [nombre]. Le escribo de PYGLARA — estuvimos hoy en [empresa]. Queremos coordinar " +
     "una reunión breve para presentarles nuestras capacidades de galvanizado en caliente y " +
     "varillas de tierra cobreadas. Reactivación 2026. ¿Disponibilidad esta semana o la próxima? Gracias.\"\n\n" +
     "Si tienen email: el sistema envía automáticamente un correo profesional al cliente cuando llenas el formulario."],
  ];

  steps.forEach(function(step) {
    body.appendParagraph(step[0]).setAttributes(h2Style);
    body.appendParagraph(step[1]).setAttributes(bodyStyle);
    body.appendParagraph(" ").setAttributes(bodyStyle);
  });

  // Footer
  body.appendParagraph("─".repeat(80)).setAttributes(bodyStyle).setForegroundColor("#CCCCCC");
  body.appendParagraph("Documento interno PYGLARA | Cualquier duda: contactar al coordinador.")
    .setAttributes(bodyStyle).setForegroundColor("#AAAAAA")
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph("📋 Formulario: " + formUrl + "   |   📊 CRM: " + sheetUrl)
    .setAttributes(linkStyle).setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  doc.saveAndClose();
  return DocumentApp.openById(doc.getId());
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAILS HTML
// ─────────────────────────────────────────────────────────────────────────────
function buildSetupEmail(formUrl, docUrl, sheetUrl) {
  return [
    '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f0f2f5;margin:0;padding:0;">',
    '<div style="max-width:580px;margin:30px auto;background:#fff;border-radius:10px;overflow:hidden;',
    'box-shadow:0 2px 12px rgba(0,0,0,.10);">',
    '<div style="background:#1A2E4A;padding:22px 28px;">',
    '<div style="color:#C89B2F;font-size:20px;font-weight:bold;">PYGLARA</div>',
    '<div style="color:#fff;font-size:15px;font-weight:bold;margin-top:8px;">',
    '✅ Sistema de visitas configurado — 3 links listos</div>',
    '</div>',
    '<div style="padding:24px 28px;">',
    '<p style="font-size:14px;color:#333;line-height:1.7;">Todo está conectado. ',
    'Cada envío del formulario te llega al correo al instante.</p>',

    linkBlock("📋", "Formulario para empleados", formUrl,
      "Comparte este link por WhatsApp con los empleados. Lo llenan después de cada visita."),
    linkBlock("📄", "Protocolo de visitas (Google Doc)", docUrl,
      "Guía paso a paso. Los empleados lo tienen en el mismo formulario. Puedes compartirlo por separado también."),
    linkBlock("📊", "CRM y historial (Google Sheets)", sheetUrl,
      "Dashboard, clientes pre-cargados, historial de visitas, estadísticas automáticas."),

    '<p style="font-size:13px;color:#555;line-height:1.8;margin-top:16px;">',
    '<strong>Todo conectado:</strong><br>',
    '· El formulario muestra links al Protocolo y al Sheet<br>',
    '· El Protocolo muestra links al Formulario y al Sheet<br>',
    '· El Sheet tiene dashboard con links al Formulario y al Protocolo<br>',
    '· Cada visita actualiza automáticamente el CRM de clientes',
    '</p>',
    '</div>',
    '<div style="background:#F4F4F4;padding:12px 28px;text-align:center;font-size:11px;color:#aaa;">',
    'PYGLARA — Sistema de Visitas Automatizado | Abril 2026',
    '</div></div></body></html>',
  ].join('');
}

function linkBlock(icon, label, url, desc) {
  return '<div style="background:#F4F7FB;border-radius:8px;padding:14px 18px;margin-bottom:12px;">' +
    '<div style="font-size:13px;font-weight:bold;color:#1A2E4A;">' + icon + ' ' + label + '</div>' +
    '<div style="font-size:12px;margin:4px 0;"><a href="' + url + '" style="color:#1A6AB0;">' + url + '</a></div>' +
    '<div style="font-size:11px;color:#666;font-style:italic;">' + desc + '</div>' +
    '</div>';
}

function buildManagerEmail(d) {
  var waLink = d.telefono
    ? "https://wa.me/" + d.telefono.replace(/[^0-9]/g, "") +
      "?text=" + encodeURIComponent(
        "Buenas, " + d.contacto.split(" ")[0] + ". Le escribo de PYGLARA — Prensados y Galvanizados de Lara. " +
        "Nuestro equipo pasó hoy por " + d.empresa + ". Estamos en proceso de reactivación 2026 y queremos " +
        "coordinar una reunión breve. ¿Tiene disponibilidad esta semana o la próxima? Gracias."
      )
    : null;

  var urgBanner = d.urgente
    ? '<div style="background:#C02020;color:#fff;padding:12px 20px;border-radius:6px;margin-bottom:18px;font-size:14px;font-weight:bold;">' +
      '🔥 INTERÉS ACTIVO DETECTADO — Dar seguimiento HOY</div>' : '';

  var potColor = {"🔥 Alto — hay negocio concreto, seguir de cerca": "#1A7A1A",
                  "🟡 Medio — hay interés pero no urgencia": "#C8760A",
                  "⬇️ Bajo — poca probabilidad de negocio pronto": "#888"}[d.potencial] || "#333";
  var galvColor = d.galv.indexOf("activa") > -1 ? "#1A7A1A" : d.galv.indexOf("vez") > -1 ? "#C8760A" : "#333";
  var varColor  = d.varilla.indexOf("activa") > -1 ? "#1A7A1A" : d.varilla.indexOf("vez") > -1 ? "#C8760A" : "#333";

  return [
    '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">',
    '<div style="max-width:620px;margin:30px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.12);">',
    '<div style="background:#1A2E4A;padding:24px 28px;">',
    '<div style="color:#C89B2F;font-size:22px;font-weight:bold;">PYGLARA</div>',
    '<div style="color:#8FA8C8;font-size:12px;">Prensados y Galvanizados de Lara, S.A.</div>',
    '<div style="color:#fff;font-size:16px;font-weight:bold;margin-top:10px;">Nueva visita registrada</div>',
    '</div>',
    '<div style="padding:24px 28px;">', urgBanner,
    '<table style="width:100%;margin-bottom:18px;"><tr>',
    '<td style="vertical-align:top;width:60%;">',
    '<div style="font-size:11px;color:#888;text-transform:uppercase;">Empresa</div>',
    '<div style="font-size:20px;font-weight:bold;color:#1A2E4A;margin-top:3px;">', d.empresa, '</div>',
    '<div style="font-size:12px;color:#666;">', d.fecha, ' | ', d.empleado, '</div>',
    '</td><td style="text-align:right;vertical-align:top;">',
    '<div style="font-size:11px;color:#888;">Potencial</div>',
    '<div style="color:', potColor, ';font-weight:bold;font-size:13px;">', d.potencial, '</div>',
    '</td></tr></table>',
    fmtBox("Contacto", [
      fmtRow("Disponibilidad", d.disponible), fmtRow("Nombre", d.contacto),
      fmtRow("Cargo", d.cargo), fmtRow("Teléfono/WA", d.telefono || "No capturado"),
      fmtRow("Email", d.emailCliente || "No capturado"),
    ]),
    fmtBox("Interés Comercial", [
      fmtRowC("Galvanizado", d.galv, galvColor),
      fmtRowC("Varillas de Tierra", d.varilla, varColor),
      fmtRow("Vol. Galv. (TM/mes)", d.volGalv),
      fmtRow("Vol. Varillas (uds/mes)", d.volVar),
    ]),
    fmtBox("Seguimiento", [
      fmtRow("Acordado", d.seguimiento),
      fmtRow("Cuándo", d.fechaSeguim || "No especificado"),
    ]),
    '<div style="background:#FFFBF0;border-left:4px solid #C89B2F;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:20px;">',
    '<div style="font-size:11px;font-weight:bold;color:#1A2E4A;margin-bottom:6px;text-transform:uppercase;">Notas del empleado</div>',
    '<div style="font-size:13px;color:#333;line-height:1.6;">', escHtml(d.notas), '</div>',
    '</div>',
    '<div style="text-align:center;margin-bottom:8px;">',
    waLink ? '<a href="' + waLink + '" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;font-size:14px;margin-right:12px;">💬 WhatsApp al Contacto</a>' : '',
    d.emailCliente ? '<span style="display:inline-block;background:#EEF2F8;color:#1A2E4A;padding:12px 20px;border-radius:6px;font-size:13px;">✉️ Correo al cliente enviado automáticamente</span>' : '',
    '</div>',
    '</div>',
    '<div style="background:#F4F4F4;padding:14px 28px;text-align:center;font-size:11px;color:#aaa;">',
    'PYGLARA | Zona Industrial I, Barquisimeto | +58 424 571 5349',
    '</div></div></body></html>',
  ].join('');
}

function buildClientEmail(empresa, contacto) {
  var nombre = contacto && contacto !== "No indicado" ? contacto.split(" ")[0] : "estimado/a";
  return [
    '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">',
    '<div style="max-width:580px;margin:30px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.10);">',
    '<div style="background:#1A2E4A;padding:22px 28px;">',
    '<div style="color:#C89B2F;font-size:20px;font-weight:bold;">PYGLARA</div>',
    '<div style="color:#8FA8C8;font-size:11px;">Prensados y Galvanizados de Lara, S.A.</div>',
    '</div>',
    '<div style="padding:26px 28px;">',
    '<p style="font-size:14px;color:#333;line-height:1.7;">Estimado/a ', nombre, ',</p>',
    '<p style="font-size:14px;color:#333;line-height:1.7;">Hoy nuestro equipo visitó <strong>', escHtml(empresa), '</strong>. ',
    'Queremos formalizarle el motivo de nuestra visita.</p>',
    '<p style="font-size:14px;color:#333;line-height:1.7;"><strong>PYGLARA</strong> es una empresa con más de 50 años de trayectoria ',
    'en galvanizado en caliente y electrodepositado de cobre, ubicada en Zona Industrial I, Barquisimeto.</p>',
    '<div style="background:#F4F7FB;border-radius:8px;padding:16px 20px;margin:20px 0;">',
    '<div style="font-size:11px;font-weight:bold;color:#1A2E4A;margin-bottom:10px;text-transform:uppercase;">Nuestros servicios</div>',
    '<ul style="margin:0;padding-left:18px;font-size:13px;color:#333;line-height:2;">',
    '<li><strong>Galvanizado en caliente</strong> — hasta 7 metros, capacidad 1.440 TM/mes</li>',
    '<li><strong>Galvanizado de herrajes</strong> — cuba centrífuga 65cm (activa)</li>',
    '<li><strong>Varillas de tierra cobreadas</strong> — 5/8" a 1", de 1.2m a 3m</li>',
    '</ul>',
    '<p style="font-size:11px;color:#666;margin-top:8px;margin-bottom:0;">Normas COVENIN 1212-81, ASTM A123 y ASTM A153. Certificados de calidad por lote.</p>',
    '</div>',
    '<p style="font-size:14px;color:#333;line-height:1.7;">Estamos en proceso de reactivación para 2026 y queremos coordinar una reunión breve. ',
    '¿Le sería posible recibirnos esta semana o la próxima?</p>',
    '<p style="font-size:14px;color:#333;line-height:1.7;">Quedamos atentos.<br><br>Cordialmente,<br>',
    '<strong>Prensados y Galvanizados de Lara, S.A.</strong><br>',
    '<span style="color:#888;font-size:12px;">Tel: +58 424 571 5349 | Zona Industrial I, Barquisimeto</span></p>',
    '</div>',
    '<div style="background:#F4F4F4;padding:12px 28px;text-align:center;font-size:11px;color:#aaa;">',
    'Este correo fue generado automáticamente tras una visita de cortesía de PYGLARA.',
    '</div></div></body></html>',
  ].join('');
}

function buildClientEmailPlain(empresa, contacto) {
  var n = contacto && contacto !== "No indicado" ? contacto.split(" ")[0] : "estimado/a";
  return "Estimado/a " + n + ",\n\nHoy nuestro equipo visitó " + empresa + ". PYGLARA — 50+ años en galvanizado en caliente y varillas de tierra cobreadas, Zona Industrial I, Barquisimeto.\n\nEstamos en reactivación 2026 y queremos coordinar una reunión breve. ¿Disponibilidad esta semana?\n\nCordialmente,\nPYGLARA | Tel: +58 424 571 5349";
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────────────────────────────────────
function fmtBox(title, rows) {
  return '<div style="background:#F4F7FB;border-radius:8px;padding:14px 18px;margin-bottom:16px;">' +
    '<div style="font-size:11px;font-weight:bold;color:#1A2E4A;margin-bottom:8px;text-transform:uppercase;">' + title + '</div>' +
    rows.join('') + '</div>';
}
function fmtRow(label, value) {
  return '<div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px;">' +
    '<span style="color:#888;min-width:160px;">' + label + '</span>' +
    '<span style="color:#1A2E4A;font-weight:600;text-align:right;">' + escHtml(String(value || "—")) + '</span></div>';
}
function fmtRowC(label, value, color) {
  return '<div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px;">' +
    '<span style="color:#888;min-width:160px;">' + label + '</span>' +
    '<span style="color:' + color + ';font-weight:700;text-align:right;">' + escHtml(String(value || "—")) + '</span></div>';
}
function escHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function formatDate(d) {
  if (!d) return "";
  if (typeof d === "string") return d;
  try { return Utilities.formatDate(new Date(d), Session.getScriptTimeZone(), "dd/MM/yyyy"); }
  catch(e) { return String(d); }
}
