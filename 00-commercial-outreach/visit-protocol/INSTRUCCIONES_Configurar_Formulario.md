# INSTRUCCIONES — Configurar el Formulario Automático de Visitas
## PYGLARA | Tiempo estimado: 10 minutos | Solo se hace una vez

---

## QUÉ VA A QUEDAR FUNCIONANDO

Después de seguir estos pasos, queda activo lo siguiente **de forma permanente y automática**:

| Acción del empleado | Qué pasa automáticamente |
|---|---|
| Empleado visita una empresa y llena el formulario en su teléfono | Tú recibes un correo al instante con el resumen |
| El resumen tiene nombre del contacto, interés en galvanizado/varillas, volumen estimado, notas | Todo formateado — no hay que buscar nada |
| Si el empleado capturó el email del cliente | Se envía automáticamente un correo de seguimiento profesional al cliente (con copia para ti) |
| El correo tiene un botón de WhatsApp | Un clic y se abre WhatsApp con el mensaje ya escrito, listo para enviar |
| Todas las visitas quedan en un Google Sheet | Puedes ver el historial completo en cualquier momento |

---

## PASO 1 — Abre Google Apps Script

1. Ve a **[script.google.com](https://script.google.com)** desde cualquier navegador
2. Inicia sesión con tu cuenta de Google (la misma donde quieres recibir los correos)
3. Haz clic en **"Nuevo proyecto"**
4. El proyecto se va a llamar "Proyecto sin título" — cámbialo a `PYGLARA Visitas`
   (haz clic en el título arriba a la izquierda para editarlo)

---

## PASO 2 — Pega el código

1. En la pantalla del editor, verás un área de texto con el texto:
   ```
   function myFunction() {
   
   }
   ```
2. **Selecciona todo ese texto** (Ctrl+A) y **bórralo**
3. Abre el archivo `PYGLARA_Automatizacion_Visitas.gs` que está en la carpeta `drafts/`
4. **Selecciona todo su contenido** y **cópialo** (Ctrl+A → Ctrl+C)
5. **Pégalo** en el editor de Google Apps Script (Ctrl+V)

---

## PASO 3 — Pon tu correo

En las primeras líneas del código, busca esta sección:

```
var CONFIG = {
  MANAGER_EMAIL:    "tucorreo@gmail.com",    ← CAMBIA ESTO
  MANAGER_NAME:     "Coordinador PYGLARA",   ← Pon tu nombre
  WHATSAPP_NUMBER:  "584245715349",          ← Número sin + ni espacios
  ...
```

Reemplaza `tucorreo@gmail.com` con tu correo real.
Pon el número de WhatsApp del coordinador (formato: código de país + número, sin `+`, sin espacios).
Ejemplo Venezuela: `584241234567`

---

## PASO 4 — Ejecuta la configuración

1. En la parte de arriba del editor, hay un menú desplegable que dice **"myFunction"**
   → Cámbialo a **"setup"** (haz clic en la flecha y selecciona `setup`)
2. Haz clic en el botón **▶ Ejecutar**
3. Google va a pedir que **autorices los permisos** — esto es normal y necesario:
   - Haz clic en **"Revisar permisos"**
   - Selecciona tu cuenta de Google
   - Si aparece una advertencia de "Google no verificó esta app" → haz clic en **"Avanzado"** → **"Ir a PYGLARA Visitas (no seguro)"**
   - Haz clic en **"Permitir"**
4. El script se va a ejecutar — espera 20-30 segundos
5. Cuando termine, revisa tu correo — deberías recibir un correo de confirmación con los links

> **¿Por qué pide permisos?** El script necesita permiso para crear el formulario, la hoja de cálculo, y enviar correos desde tu cuenta. Es un script tuyo — no comparte tu información con nadie.

---

## PASO 5 — Distribuye el formulario

En el correo de confirmación que recibirás encontrarás:
- **Link del formulario** → Envíalo por WhatsApp a los empleados
- **Link de la hoja de respuestas** → Guárdalo para consultar el historial

**Dile a los empleados:**
> *"Guarda este link en favoritos en tu teléfono. Cada vez que visites una empresa, llénalos después de salir de la empresa. Tarda 3 minutos."*

---

## CÓMO FUNCIONA DÍA A DÍA

```
Empleado visita empresa
        ↓
Abre el formulario en su teléfono (link guardado en favoritos)
        ↓
Llena los 5 pasos en ~3 minutos
        ↓
Hace clic en "Enviar"
        ↓
TÚ RECIBES EL CORREO INSTANTÁNEAMENTE
  → Resumen completo con colores (verde = interés activo, amarillo = tal vez)
  → Botón de WhatsApp para contactar al cliente con 1 clic
  → Si capturaron el email del cliente → ya se envió el correo de seguimiento automáticamente
```

---

## PREGUNTAS FRECUENTES

**¿Y si el empleado no tiene teléfono inteligente?**
El formulario funciona en cualquier navegador. Puede llenarlo desde la computadora de la planta después de la visita.

**¿Puedo ver todas las visitas en un solo lugar?**
Sí. Google crea automáticamente un Google Sheet con todas las respuestas. El link te llega en el correo de confirmación.

**¿Y si el empleado comete un error en el formulario?**
Las respuestas quedan en el Sheet — puedes editarlas manualmente ahí.

**¿Qué pasa si no tienen email del cliente?**
No hay problema. Solo se envía el correo automático al cliente si el empleado capturó el email. Si no hay email, solo tú recibes el resumen y usas el botón de WhatsApp.

**¿Puedo agregar más empleados o más empresas después?**
Sí. El formulario se puede editar en Google Forms en cualquier momento.

---

## SOPORTE

Si algo no funciona, escribe a Andres con el error exacto que aparece en pantalla.

---

*PYGLARA — Automatización de Visitas Comerciales | Abril 2026*
