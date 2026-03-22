function addInvestorDDQuestions() {
  // Open the existing PYGLARA form
  var form = FormApp.openById('1Ry2mLdoFz8Ylkve6P5rqcmdtYgbHdwOx4bdsf-mRck8');

  // ============================================================
  // SECTION 8: Cumplimiento Ambiental y Seguridad Industrial
  // ============================================================
  form.addPageBreakItem()
    .setTitle('8. Cumplimiento Ambiental y Seguridad Industrial')
    .setHelpText('Informacion critica para inversionistas sobre riesgos ambientales');

  form.addParagraphTextItem()
    .setTitle('8.1 ¿La planta tiene o tenia permisos ambientales (MINAMB / MinEcoSocialismo)?')
    .setHelpText('Tipo de permiso, fecha de vencimiento, estado actual');

  form.addParagraphTextItem()
    .setTitle('8.2 ¿Como se maneja/manejaba el desecho de acido (HCl usado) y las cenizas de zinc?')
    .setHelpText('Proceso de disposicion, empresa contratada, frecuencia');

  form.addParagraphTextItem()
    .setTitle('8.3 ¿Ha habido alguna sancion, multa o inspeccion ambiental?')
    .setHelpText('Detalle cualquier incidente con autoridades ambientales');

  form.addParagraphTextItem()
    .setTitle('8.4 ¿Que sistema de ventilacion/extraccion de humos tiene la planta?')
    .setHelpText('Descripcion del sistema, estado actual');

  form.addMultipleChoiceItem()
    .setTitle('8.5 ¿La planta cuenta con equipos contra incendios vigentes?')
    .setChoiceValues(['Si, vigentes', 'Si, pero vencidos', 'No tiene', 'No se']);

  // ============================================================
  // SECTION 9: Historial de Seguros
  // ============================================================
  form.addPageBreakItem()
    .setTitle('9. Seguros e Historial de Siniestros')
    .setHelpText('Los inversionistas necesitan evaluar cobertura y riesgos');

  form.addParagraphTextItem()
    .setTitle('9.1 ¿La planta tenia poliza de seguro? ¿Con cual aseguradora?')
    .setHelpText('Tipo de cobertura: incendio, responsabilidad civil, equipos, etc.');

  form.addParagraphTextItem()
    .setTitle('9.2 ¿Ha habido algun siniestro, robo o evento que afectara la planta?')
    .setHelpText('Incendios, inundaciones, robos de material/equipos, vandalismo');

  form.addParagraphTextItem()
    .setTitle('9.3 ¿Cual es el valor estimado de reposicion de toda la planta (equipos + estructura)?')
    .setHelpText('En USD si es posible. Incluya la cuba, centrifugadora, puentes grua, galpones');

  // ============================================================
  // SECTION 10: Obligaciones Fiscales (SENIAT) y Laborales
  // ============================================================
  form.addPageBreakItem()
    .setTitle('10. Obligaciones Fiscales y Laborales')
    .setHelpText('Un inversionista necesita saber que no hereda deudas ocultas');

  form.addParagraphTextItem()
    .setTitle('10.1 ¿La empresa esta al dia con el SENIAT (declaraciones de ISLR, IVA)?')
    .setHelpText('Ultimo año declarado, deudas pendientes, estado del RIF');

  form.addParagraphTextItem()
    .setTitle('10.2 ¿Existen pasivos laborales pendientes con exempleados?')
    .setHelpText('Prestaciones, liquidaciones, demandas laborales en curso');

  form.addTextItem()
    .setTitle('10.3 ¿Cuantos empleados tenia la planta en su mejor momento y cuantos al cerrar?')
    .setHelpText('Ej: "45 en 2008, 12 al cerrar en 2019"');

  form.addParagraphTextItem()
    .setTitle('10.4 ¿Hay deudas pendientes con proveedores (zinc, quimicos, gas, electricidad)?')
    .setHelpText('Detalle montos aproximados y con quien');

  form.addParagraphTextItem()
    .setTitle('10.5 ¿Existen demandas judiciales activas contra PYGLARA o sus accionistas?')
    .setHelpText('Cualquier litigio pendiente, tribunales, montos');

  // ============================================================
  // SECTION 11: Concentracion de Clientes y Contratos
  // ============================================================
  form.addPageBreakItem()
    .setTitle('11. Concentracion de Clientes y Relaciones Comerciales')
    .setHelpText('Los inversionistas evaluan la diversificacion del ingreso');

  form.addParagraphTextItem()
    .setTitle('11.1 ¿Cuales eran los 5 clientes principales y que % del ingreso representaba cada uno?')
    .setHelpText('Ej: "PDVSA 30%, Sidor 20%, Constructora X 15%..."');

  form.addParagraphTextItem()
    .setTitle('11.2 ¿Existian contratos a largo plazo con algun cliente? ¿Siguen vigentes?')
    .setHelpText('Contratos marco, ordenes de compra recurrentes');

  form.addParagraphTextItem()
    .setTitle('11.3 ¿Cual era el ciclo de cobro promedio? (dias desde facturacion hasta pago)')
    .setHelpText('Ej: "Privados 30 dias, gobierno 90-120 dias"');

  form.addParagraphTextItem()
    .setTitle('11.4 ¿Existen cuentas por cobrar pendientes? ¿Montos aproximados?')
    .setHelpText('Facturas sin cobrar, clientes morosos');

  form.addParagraphTextItem()
    .setTitle('11.5 ¿Hay clientes que ya le han preguntado cuando reactivan?')
    .setHelpText('Demanda latente, nombres de empresas interesadas');

  // ============================================================
  // SECTION 12: Personal Clave y Conocimiento Operativo
  // ============================================================
  form.addPageBreakItem()
    .setTitle('12. Personal Clave y Conocimiento Operativo')
    .setHelpText('El "key man risk" es una de las primeras preguntas de cualquier inversionista');

  form.addParagraphTextItem()
    .setTitle('12.1 Ademas de usted, ¿quien mas conoce la operacion completa del galvanizado?')
    .setHelpText('Nombres, roles, disponibilidad para reincorporarse');

  form.addParagraphTextItem()
    .setTitle('12.2 ¿Cuantas personas se necesitan minimo para operar la planta?')
    .setHelpText('Desglose: operadores cuba, puente grua, quimicos, admin, etc.');

  form.addParagraphTextItem()
    .setTitle('12.3 ¿Es facil conseguir operadores de galvanizado en Barquisimeto o hay que entrenarlos?')
    .setHelpText('Disponibilidad de mano de obra calificada en la zona');

  form.addParagraphTextItem()
    .setTitle('12.4 ¿Existen manuales de operacion, fichas tecnicas o documentacion de procesos?')
    .setHelpText('Procedimientos escritos, especificaciones tecnicas, planos');

  // ============================================================
  // SECTION 13: Capacidad Historica y Utilizacion
  // ============================================================
  form.addPageBreakItem()
    .setTitle('13. Capacidad Historica y Utilizacion Real')
    .setHelpText('Datos reales de produccion para proyecciones financieras');

  form.addTextItem()
    .setTitle('13.1 ¿Cual fue el mes de mayor produccion en la historia de la planta? ¿Cuantas toneladas?')
    .setHelpText('Mes/año y toneladas galvanizadas');

  form.addTextItem()
    .setTitle('13.2 En un año normal bueno, ¿cuantas toneladas al mes se galvanizaban en promedio?')
    .setHelpText('Promedio mensual en los mejores años');

  form.addParagraphTextItem()
    .setTitle('13.3 ¿Cuales eran los meses pico y los meses bajos? ¿Hay estacionalidad?')
    .setHelpText('Ej: "Enero-marzo era bajo, julio-octubre era pico por construccion"');

  form.addTextItem()
    .setTitle('13.4 ¿Cuantas varillas de cobre se producian por dia en el mejor momento?')
    .setHelpText('Actualmente sabemos 936/dia - ¿era mas antes?');

  form.addParagraphTextItem()
    .setTitle('13.5 ¿Por que cerro la planta? ¿Fue decision propia o por condiciones externas?')
    .setHelpText('Detalle las razones: falta de materia prima, crisis economica, regulaciones, etc.');

  // ============================================================
  // SECTION 14: Comentarios Finales para Inversionistas
  // ============================================================
  form.addPageBreakItem()
    .setTitle('14. Vision y Comentarios Finales')
    .setHelpText('Su experiencia de 36 años es invaluable para los inversionistas');

  form.addParagraphTextItem()
    .setTitle('14.1 En su opinion profesional, ¿cual es la mayor fortaleza de PYGLARA como negocio?')
    .setHelpText('Lo que hace unica a esta planta vs la competencia');

  form.addParagraphTextItem()
    .setTitle('14.2 ¿Cual es el mayor riesgo o debilidad que un inversionista debe conocer?')
    .setHelpText('Sea honesta - los inversionistas valoran la transparencia');

  form.addParagraphTextItem()
    .setTitle('14.3 Si tuviera los recursos, ¿que haria usted primero para reactivar la planta?')
    .setHelpText('Prioridades en orden: reparaciones, personal, materia prima, etc.');

  form.addParagraphTextItem()
    .setTitle('14.4 ¿Hay algo que no le hayamos preguntado y que un inversionista deberia saber?')
    .setHelpText('Cualquier informacion adicional que considere relevante');

  Logger.log('SUCCESS! Added 7 new investor DD sections (8-14) with 30+ questions');
  Logger.log('FORM URL: ' + form.getPublishedUrl());
}
