# Fase M6 — Pendientes antes de abrir a indexación

Estado a 26 de septiembre de 2026.

**M6 ejecutada: el sitio está abierto a buscadores.** Las 49 páginas emiten
`index, follow` y `robots.txt` permite el rastreo con el `Sitemap:` enlazado.
Lo que queda está en [Post-M6](#post-m6-pendientes).

La apertura se hizo con el frente de RGPD cerrado (política de privacidad y
casilla de consentimiento) pero **con los placeholders de datos todavía
puestos**, por decisión de Jesús: el teléfono visible sigue siendo
`+34 000 000 000`, marcado como provisional, y las imágenes siguen siendo los
SVG de marca. Es la primera versión que Google va a rastrear y cachear.

---

## Por qué robots.txt está abierto

Hasta el 21/09 tenía `Disallow: /` además del noindex, y Google indexó la home
igualmente: Search Console la mostraba como «Indexed, though blocked by
robots.txt». `robots.txt` impide rastrear, no indexar: si Google encuentra la URL
enlazada puede indexarla sin haberla leído, y con el rastreo cerrado nunca llega
a ver el noindex. La documentación de Google lo dice expresamente: para que
`noindex` funcione, la página no puede estar bloqueada en `robots.txt`.

**No volver a cerrarlo para «reforzar» un bloqueo: produce justo lo contrario.**
Si algún día hay que ocultar el sitio, se hace solo con `noindex` y con el
rastreo abierto.

El incidente se cerró el 21/09 abriendo el rastreo, y el 26/09 se quitó el
`noindex`: la home ya no tiene que salir del índice, tiene que entrar bien. Eso
es el punto 7.

---

## 1. Crear la propiedad de GA4 y pasar el Measurement ID

**Quién:** Jesús. **Bloquea a:** nada.

1. Entrar en `analytics.google.com`, crear propiedad para `atarjearedes.es`.
2. Crear el flujo de datos web y copiar el Measurement ID (formato `G-` + 10
   caracteres).
3. Sustituir el placeholder en [`src/data/site.ts`](../src/data/site.ts):

   ```ts
   export const GA4_ID: string = 'G-XXXXXXXXX';   // <- aquí
   ```

**No hay que tocar nada más.** El snippet ya está escrito en
[`src/layouts/Base.astro`](../src/layouts/Base.astro) y se enciende solo:
`GA4_ACTIVO` comprueba el formato del ID y, mientras valga el placeholder, el
HTML no emite ni una línea de gtag. Ni peticiones a Google, ni cookies.

Al desplegar con el ID real, comprobar en el HTML de producción que aparece
`googletagmanager.com/gtag/js` y que Tiempo real de GA4 registra la visita.

> **Aviso antes de encenderlo.** Al activar GA4 se empiezan a plantar cookies de
> analítica. Eso obliga a banner de consentimiento con rechazo efectivo (RGPD +
> LSSI). Hoy el sitio no pone ninguna cookie, y por eso no lleva banner.
> Encender GA4 sin resolver el consentimiento es meterse en un incumplimiento.
> Decidir antes: o banner con Consent Mode, o analítica sin cookies
> (Plausible / Umami), que para un sitio de lead gen da la misma información útil.

---

## 2. Crear la propiedad de Search Console con archivo HTML de verificación

**Quién:** Jesús. **Bloquea a:** puntos 3 y 7.

**Estado: verificada** (el 21/09 Search Console ya mostraba el estado de
indexación de la home).
[`public/google27674563e2f594f1.html`](../public/google27674563e2f594f1.html) está
desplegado, copiado byte a byte del que entregó Google (53 bytes, sin salto de
línea final).

1. `search.google.com/search-console` → Añadir propiedad → **Prefijo de URL**,
   con `https://atarjearedes.es` (no la versión `www`: esa redirige). Hecho.
2. Método de verificación: **archivo HTML**. Hecho.
3. Copiar el archivo que da Google **tal cual** en `public/`, sin renombrarlo ni
   editarlo, y desplegar. Hecho.
4. Pulsar **Verificar** en Search Console. Hecho.

**Ojo:** el archivo se queda en `public/` para siempre. Si se borra, Google
revoca la verificación en la siguiente comprobación. No editarlo: con
`core.autocrlf` activo en este equipo no le afecta porque no tiene saltos de
línea, pero añadirle uno cambiaría su contenido.

**Comportamiento esperado, no es un error:** `vercel.json` tiene
`cleanUrls: true`, así que cualquier `.html` de `public/` responde con un 308 a
su versión sin extensión (`/google1a2b3c.html` → `/google1a2b3c`, que sí da 200
con el contenido íntegro). Comprobado con el propio placeholder. La ayuda de
Search Console indica que, con los archivos de verificación, Google no sigue
redirecciones a otro dominio pero sí dentro del mismo, así que no debería
bloquear. Si aun así la verificación fallara, **no tocar `cleanUrls`**, que
afecta al enrutado de las 49 páginas: pasar al método de etiqueta HTML en
`Base.astro` o al registro TXT del punto 3.

---

## 3. Sitemap y propiedad de dominio

**Depende de:** punto 2.

- **El sitemap ya se puede enviar.** Con el `noindex` retirado el 26/09, las 49
  URLs son indexables. El envío en Search Console es el punto 7.
- Lo que sí conviene hacer ya: dar de alta también la propiedad de **dominio**
  (verificación por registro TXT en el DNS de Banahosting), que agrega `www`,
  subdominios y ambos protocolos en una sola vista.

---

## 4. Formulario de `/contacto` con Telegram y Resend

**Estado: hecho en la Fase RR3 (16/09).** Endpoint en `src/pages/api/contact.ts`,
lógica en `src/lib/leads.ts` y variables de entorno en Vercel (Production,
marcadas como *sensitive*). El detalle técnico está en el README.

**RGPD cerrado el 26/09.** [`/privacidad`](../src/pages/privacidad.astro)
identifica al responsable con su NIF, y el formulario tiene casilla de
consentimiento obligatoria, validada también en el servidor (400 si no llega
`consentimiento: true`). La aceptación queda registrada con su fecha en el propio
aviso del lead: no hay base de datos donde guardarla.

Queda pendiente:

- **Dominio verificado en Resend.** Hoy los avisos salen del remitente compartido
  `onboarding@resend.dev`. Para enviar desde `@atarjearedes.es` hay que añadir en
  el DNS de Banahosting los registros SPF y DKIM que indique Resend (y DMARC), y
  después cambiar `LEADS.remitente` en `src/data/site.ts`.

Conviene tener en cuenta:

- **No hay límite de envíos.** El honeypot frena a los bots simples, pero uno
  dirigido puede mandar muchos leads falsos. Si ocurre, las salidas baratas son un
  límite por IP o un captcha sin fricción, como Cloudflare Turnstile.
- **Cambiar una variable de entorno obliga a volver a desplegar.** En Vercel, los
  cambios de variables solo se aplican a los despliegues nuevos.

---

## 5. Sustituir los placeholders de `src/data/`

**Quién:** Jesús y el operador. **Estado:** pendiente; ya no bloquea.

El 26/09 se abrió la indexación sin esperar a estos datos, por decisión de Jesús.
La consecuencia asumida: la primera versión que Google rastrea y cachea es la
incompleta, y el teléfono visible no es real hasta que llegue la SIM. Cuanto
antes se cierren, menos tiempo con esa versión indexada.

| Dato | Dónde | Estado |
|---|---|---|
| Teléfono real (SIM prepago propia) | `site.ts` → `telefono`, `telefonoHref`, y bajar `telefonoPendiente` | pendiente |
| Dirección exacta del operador | `site.ts` → `direccion.calle`, y bajar `direccion.pendiente` | pendiente |
| Caudal del hidrojet | `site.ts` → `capacidades.hidrojetCaudal` | pendiente |
| Capacidad de la cuba | `site.ts` → `capacidades.cubaCapacidad` | pendiente |
| Diámetros de cámara | `site.ts` → `capacidades.camaraDiametros` | pendiente |
| Nº de autorización de gestor de residuos | `site.ts` → `capacidades.gestorResiduos` | pendiente |
| Precios del operador | `site.ts` → `precios` | pendiente |
| Poblaciones INE/SIMA | `municipios.ts` → 10 campos `poblacion: null` | pendiente |
| Articulado del Reglamento de EMASESA | `src/pages/hosteleria/index.astro` y `src/pages/separadores-de-grasas-sevilla/index.astro` (texto en la página, no en `src/data/`) | pendiente |

Los 10 municipios sin población: Camas, San Juan de Aznalfarache, Tomares,
Castilleja de la Cuesta, Gelves, Bormujos, Valencina de la Concepción, La Algaba,
Coria del Río y La Puebla del Río. `agent.txt` cuenta 11 porque añade Sevilla
capital, que hoy no tiene campo de población en ninguna página: si se quiere
publicar el dato, hay que crear el campo primero.

Teléfono y dirección son además los dos que hay que cuadrar con la ficha de
Google Business Profile carácter a carácter.

En `site.ts`, `direccion.calle` y el teléfono se **omiten del JSON-LD** mientras
sean placeholder (ver `src/lib/schema.ts`). Al rellenarlos hay que bajar los
flags `pendiente`, o el schema seguirá sin publicarlos.

**Regla que no se rompe:** ningún placeholder se sustituye por un dato inventado.
Si el operador no lo confirma, se queda como pendiente.

---

## 6. Quitar el `meta noindex` — HECHO el 26/09

[`src/layouts/Base.astro`](../src/layouts/Base.astro) emite ahora

   ```astro
   <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
   ```

en las 49 páginas. Los directivos `max-*` son los que ya usan los demás sitios
del manual. `robots.txt` no se tocó: sigue abierto desde el 21/09.

Se abrió con el frente de RGPD cerrado (punto 4) y con los puntos 5 pendientes,
por decisión de Jesús.

**Duplicado de Vercel: resuelto el 16/09.** `https://atarjearedes.vercel.app`
redirige con 301 a la misma ruta de `https://atarjearedes.es`, raíz incluida,
con la regla `redirects` de [`vercel.json`](../vercel.json) condicionada por
host. Los demás alias de Vercel (la URL de cada despliegue, el alias del team y
el de la rama `main`) ya estaban detrás del login de Vercel: no son públicos.
Al abrir la indexación basta con volver a comprobarlo:

```bash
curl -sI https://atarjearedes.vercel.app/particulares
```

Tiene que devolver `301` con `Location: https://atarjearedes.es/particulares`.

Dos detalles de esa regla que no admiten comentario dentro del JSON:

- **`source` es `/:path(.*)` y no `/:path*` a propósito.** Vercel compila
  `/:path*` en modo estricto y la expresión resultante no captura la raíz:
  `https://atarjearedes.vercel.app/` seguiría sirviendo la home con 200.
- **Lleva `statusCode: 301` y no `permanent: true`**, que en Vercel devuelve
  308. Los dos campos no se pueden combinar.

Verificación sobre producción, comprobada el 26/09:

```bash
curl -s https://atarjearedes.es/ | grep -c noindex
```

Devuelve `0`.

---

## 7. Enviar el sitemap y solicitar indexación de la home

**Listo para ejecutar: le toca a Jesús en Search Console.** El código ya está
desplegado; esto son cuatro clics en la interfaz, no hay nada que programar.

1. Search Console → Sitemaps → enviar `sitemap-index.xml`.
2. Inspección de URL sobre `https://atarjearedes.es/` → Solicitar indexación.
3. Repetir con las páginas de dinero, sin quemar la cuota diaria de golpe:
   `/inspeccion-camara-tuberias`, `/rehabilitacion-tuberias-sin-obra`,
   `/administradores-de-fincas`.
4. A los 3-4 días, revisar Páginas: que las 49 salgan rastreadas y que no quede
   ninguna excluida por `noindex` residual.

El sitemap se genera solo con `@astrojs/sitemap` a partir de las rutas reales del
build. No hay archivo estático que mantener.

---

## Post-M6 pendientes

Nada de esto bloquea la indexación, pero cuanto antes se cierre, mejor.

### 1. Sustituir los placeholders cuando lleguen los datos del operador

Todo el detalle está en el punto 5. Resumen de lo que sigue publicado como
provisional: teléfono `+34 000 000 000`, dirección exacta, caudal del hidrojet,
capacidad de cuba, diámetros de cámara, número de gestor de residuos, precios,
poblaciones del SIMA de 10 municipios y articulado del Reglamento de EMASESA.
**Es lo más urgente:** el teléfono visible no es un número real y el sitio ya
está indexándose.

### 2. Revocar y rotar las credenciales del formulario

El token del bot de Telegram y la API key de Resend se pegaron en una
conversación, así que hay que darlos por comprometidos:

1. Telegram: `/revoke` en BotFather y copiar el token nuevo.
2. Resend: crear una API key nueva **con permiso solo de envío** (la actual
   también puede leer los correos enviados) y borrar la antigua.
3. `vercel env rm` y `vercel env add` para las dos variables en Production.
4. **Volver a desplegar**: en Vercel, las variables solo se aplican a los
   despliegues nuevos.
5. Comprobar con un envío de prueba desde el formulario que siguen llegando los
   dos avisos.

### 3. Verificar el dominio en Resend

Ver punto 4. Hoy los avisos salen de `onboarding@resend.dev`.

### 4. Completar el domicilio en la política de privacidad

La LSSI pide el domicilio del responsable; hoy figura solo «Estepa (Sevilla)».
Si Jesús quiere, se pone la dirección completa.

### 5. Otros

- Decidir la analítica (punto 1) y, con ella, el consentimiento de cookies.
- Límite de envíos del formulario si aparece spam dirigido (punto 4).
- Imágenes reales en lugar de los 36 SVG de marca (Fase RR2).
- Espacios pegados entre elementos en línea: hay una tarea aparte abierta.

---

## Recordatorio: la URL de producción vive en dos sitios

Si algún día cambia el dominio, hay que tocar **los dos**:

- [`astro.config.mjs`](../astro.config.mjs) → `const SITE`, alimenta el sitemap.
- [`src/data/site.ts`](../src/data/site.ts) → `SITE.url`, alimenta el canonical,
  el `og:url` y todos los `@id` del JSON-LD.

Cambiar solo el primero deja el sitemap declarando un dominio y las 49 páginas
declarándose canónicas en otro.

---

## Fuera del alcance de M6

No bloquea la indexación, es de M7 en adelante: ficha de Google Business Profile,
imágenes reales (los 36 SVG de `public/img/` son placeholders de marca generados
por `scripts/gen-placeholders.mjs`), perfiles de redes sociales, citaciones y
directorios locales.
