# Fase M6 — Pendientes antes de abrir a indexación

Estado a 21 de septiembre de 2026.

El sitio está **desplegado y fuera del índice a propósito**. El único bloqueo es
el `meta robots noindex, nofollow` de las 48 páginas, que sale de
[`src/layouts/Base.astro`](../src/layouts/Base.astro). `public/robots.txt` está
abierto (`Allow: /`) para que Google pueda rastrear las páginas y leer ese
noindex.

**Regla de orden:** los puntos 1 a 5 se pueden hacer en cualquier momento y en
cualquier orden. El punto 6, quitar el noindex, es la apertura real de M6 y solo
se hace con tres frentes cerrados: RGPD, datos y operador. El 7 va detrás.

---

## Por qué robots.txt está abierto

Hasta el 21/09 tenía `Disallow: /` además del noindex, y Google indexó la home
igualmente: Search Console la mostraba como «Indexed, though blocked by
robots.txt». `robots.txt` impide rastrear, no indexar: si Google encuentra la URL
enlazada puede indexarla sin haberla leído, y con el rastreo cerrado nunca llega
a ver el noindex. La documentación de Google lo dice expresamente: para que
`noindex` funcione, la página no puede estar bloqueada en `robots.txt`.

**No volver a cerrarlo para «reforzar» el bloqueo: produce justo lo contrario.**

Para que la home salga del índice cuanto antes:

1. [Informe de robots.txt](https://search.google.com/search-console/settings/robots-txt)
   de Search Console → solicitar un nuevo rastreo del archivo. Google guarda
   `robots.txt` en caché hasta 24 horas.
2. Inspección de URL sobre `https://atarjearedes.es/` → **Probar URL publicada**:
   tiene que salir el rastreo permitido y el noindex detectado. Después,
   **Solicitar indexación**: es la vía que indica Google para que vuelva a
   rastrear la página y lea el noindex. Si Search Console rechaza la solicitud
   precisamente por el noindex, no hay que hacer nada más: la home se volverá a
   rastrear sola, ahora que nada lo impide.
3. **No usar la retirada temporal de URLs.** Oculta la home unos seis meses y
   habría que acordarse de cancelarla al abrir en M6, o seguiría oculta.

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
afecta al enrutado de las 48 páginas: pasar al método de etiqueta HTML en
`Base.astro` o al registro TXT del punto 3.

---

## 3. Sitemap y propiedad de dominio

**Depende de:** punto 2.

- **El sitemap no se envía todavía en Search Console.** Ya es legible:
  `robots.txt` lo anuncia y Google puede descargarlo, lo que además le ayuda a
  volver a rastrear las páginas y leer el noindex. Lo que se deja para M6 es
  *enviarlo*: hacerlo con las 48 URLs en noindex solo llenaría el informe de
  páginas excluidas. Se envía en el punto 7, después de quitar el noindex.
- Lo que sí conviene hacer ya: dar de alta también la propiedad de **dominio**
  (verificación por registro TXT en el DNS de Banahosting), que agrega `www`,
  subdominios y ambos protocolos en una sola vista.

---

## 4. Formulario de `/contacto` con Telegram y Resend

**Estado: hecho en la Fase RR3 (16/09).** Endpoint en `src/pages/api/contact.ts`,
lógica en `src/lib/leads.ts` y variables de entorno en Vercel (Production,
marcadas como *sensitive*). El detalle técnico está en el README.

Queda pendiente, y esto sí bloquea la apertura:

- **Política de privacidad y consentimiento.** El formulario ya recoge datos
  personales (nombre, teléfono y email). Antes de abrir la indexación hace falta
  una página de privacidad que identifique al responsable del tratamiento y una
  casilla de aceptación que la enlace. El responsable (razón social, NIF y
  dirección) es un dato que todavía no existe, así que no se puede redactar
  inventándolo.
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

**Quién:** Jesús y el operador. **Bloquea a:** el punto 6, de facto.

Esto es lo que de verdad decide cuándo se abre el sitio. Abrir con el teléfono
falso significa que la primera versión que Google rastrea y cachea es la
incompleta, y que la ficha de GBP y la web no cuadran en el NAP.

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

## 6. Quitar el `meta noindex`: la apertura real de M6

**Depende de:** los tres frentes cerrados. **Bloquea a:** punto 7.

Se quita solo cuando estén cerrados los tres:

1. **RGPD.** Política de privacidad con el responsable del tratamiento
   identificado y casilla de consentimiento en el formulario (punto 4).
2. **Datos.** Placeholders de `src/data/` sustituidos por datos verificados:
   poblaciones del SIMA y articulado del Reglamento de EMASESA (punto 5).
3. **Operador.** Teléfono, dirección, capacidades técnicas y precios confirmados
   por el operador (punto 5).

Es un único cambio: borrar en [`src/layouts/Base.astro`](../src/layouts/Base.astro)
la línea

   ```astro
   <meta name="robots" content="noindex, nofollow" />
   ```

junto con el comentario que la precede. Está en el layout, así que cubre las 48
páginas. **`robots.txt` no se toca:** está abierto desde el 21/09 y así se queda.

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

Verificación después, sobre producción:

```bash
curl -s https://atarjearedes.es/ | grep -c noindex
```

Tiene que devolver `0`.

---

## 7. Enviar el sitemap y solicitar indexación de la home

**Depende de:** punto 6. Este es el último.

1. Search Console → Sitemaps → enviar `sitemap-index.xml`.
2. Inspección de URL sobre `https://atarjearedes.es/` → Solicitar indexación.
3. Repetir con las páginas de dinero, sin quemar la cuota diaria de golpe:
   `/inspeccion-camara-tuberias`, `/rehabilitacion-tuberias-sin-obra`,
   `/administradores-de-fincas`.
4. A los 3-4 días, revisar Páginas: que las 48 salgan rastreadas y que no quede
   ninguna excluida por `noindex` residual.

El sitemap se genera solo con `@astrojs/sitemap` a partir de las rutas reales del
build. No hay archivo estático que mantener.

---

## Recordatorio: la URL de producción vive en dos sitios

Si algún día cambia el dominio, hay que tocar **los dos**:

- [`astro.config.mjs`](../astro.config.mjs) → `const SITE`, alimenta el sitemap.
- [`src/data/site.ts`](../src/data/site.ts) → `SITE.url`, alimenta el canonical,
  el `og:url` y todos los `@id` del JSON-LD.

Cambiar solo el primero deja el sitemap declarando un dominio y las 48 páginas
declarándose canónicas en otro.

---

## Fuera del alcance de M6

No bloquea la indexación, es de M7 en adelante: ficha de Google Business Profile,
imágenes reales (los 36 SVG de `public/img/` son placeholders de marca generados
por `scripts/gen-placeholders.mjs`), perfiles de redes sociales, citaciones y
directorios locales.
