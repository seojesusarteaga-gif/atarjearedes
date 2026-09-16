# Fase M6 — Pendientes antes de abrir a indexación

Estado a 16 de septiembre de 2026.

El sitio está **desplegado y cerrado a buscadores a propósito**, con doble
candado: `public/robots.txt` con `Disallow: /` y `meta robots noindex, nofollow`
en las 48 páginas. Nada de lo que sigue está activo todavía.

**Regla de orden:** los puntos 1 a 5 se pueden hacer en cualquier momento y en
cualquier orden. El punto 6 es la puerta: hasta que no se abra, el 7 no puede
funcionar. La dependencia está explicada en el punto 3.

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

1. `search.google.com/search-console` → Añadir propiedad → **Prefijo de URL**,
   con `https://atarjearedes.es` (no la versión `www`: esa redirige).
2. Método de verificación: **archivo HTML**.
3. Copiar el archivo que da Google **tal cual** en `public/`, sin renombrarlo ni
   editarlo. Google comprueba nombre y contenido exactos. Desplegar.
4. El hueco está marcado en
   [`public/google-verification-placeholder.html`](../public/google-verification-placeholder.html),
   que se borra en cuanto el archivo real esté en su sitio.

**Ojo:** el archivo se queda en `public/` para siempre. Si se borra, Google
revoca la verificación en la siguiente comprobación.

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

## 3. Verificar la propiedad y enviar el sitemap

**Depende de:** punto 2. **El envío del sitemap depende además del punto 6.**

- Verificar en Search Console. Esto sí funciona con el sitio bloqueado: la
  comprobación del archivo HTML no pasa por `robots.txt`.
- **El envío del sitemap no funciona todavía.** Con `Disallow: /`, Googlebot no
  puede descargar `https://atarjearedes.es/sitemap-index.xml`, porque el propio
  sitemap está dentro de lo bloqueado: Search Console devuelve error de lectura.
  Por eso el envío real está en el punto 7, después de abrir. Enviarlo antes no
  adelanta nada y deja un error registrado en la propiedad.
- Lo que sí conviene hacer aquí: dar de alta también la propiedad de **dominio**
  (verificación por registro TXT en el DNS de Banahosting), que agrega `www`,
  subdominios y ambos protocolos en una sola vista.

---

## 4. Integrar Telegram y Resend en `/api/contact`

**Quién:** Jesús aporta el token del bot y la API key. **Bloquea a:** nada del SEO.

Estado real hoy: **la ruta `/api/contact` no existe**. El formulario de
[`/contacto`](../src/pages/contacto/index.astro) está con `action="#"` y los
campos deshabilitados, con su aviso visible. No hay ningún endpoint que escribir
encima: hay que crearlo.

Antes de escribir código hay una decisión técnica. El proyecto es
`output: 'static'` y no tiene adaptador:

| Opción | Qué implica |
|---|---|
| **Función de Vercel suelta** en `api/contact.js`, en la raíz del repo | El sitio sigue 100% estático. No toca la build de Astro. **Recomendada.** |
| Adaptador `@astrojs/vercel` con renderizado por ruta | Más integrado, pero cambia el modelo de build de las 48 páginas por un único endpoint. Desproporcionado. |

Secretos: **nunca en el repo.** Van como variables de entorno del proyecto en
Vercel (`vercel env add`). El `.gitignore` ya excluye `.env*`.

- `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` → aviso instantáneo del lead.
- `RESEND_API_KEY` → copia por correo y acuse a quien rellena el formulario.

Resend exige **dominio verificado** para enviar desde `@atarjearedes.es`:
registros SPF, DKIM y DMARC en el DNS de Banahosting. Eso es otro ticket al
proveedor, conviene pedirlo con antelación.

Al activar el formulario hay que publicar además política de privacidad y
casilla de consentimiento: se recogen datos personales.

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

## 6. Abrir la indexación: `robots.txt` y el `meta noindex`

**Depende de:** punto 5. **Bloquea a:** punto 7.

Son dos candados y hay que quitar los dos **en el mismo despliegue**:

1. [`public/robots.txt`](../public/robots.txt): sustituir `Disallow: /` por
   `Allow: /` y añadir la línea `Sitemap:`. El bloque de reemplazo ya está
   escrito como comentario al final del propio archivo.
2. [`src/layouts/Base.astro`](../src/layouts/Base.astro): borrar la línea

   ```astro
   <meta name="robots" content="noindex, nofollow" />
   ```

   Está en el layout, así que esa única línea cubre las 48 páginas.

Quitar solo uno no sirve: con el `meta` puesto, abrir `robots.txt` deja el sitio
igual de invisible; y quitar el `meta` con `robots.txt` cerrado impide que Google
llegue a leerlo.

**Requisito previo: cerrar el duplicado de Vercel.**
`https://atarjearedes.vercel.app` sigue sirviendo el sitio completo con 200
(comprobado el 16/09). Hoy no molesta: lleva el `noindex` y su canonical ya
apunta a `atarjearedes.es`. Pero en cuanto se quite el `noindex` pasa a ser una
copia íntegra e indexable, y el canonical es una indicación para Google, no una
orden. Hay que redirigirla con 301 al dominio propio, en este mismo despliegue o
antes: una regla `redirects` en `vercel.json` condicionada por host (`has` de
tipo `host` con valor `atarjearedes.vercel.app`).

Verificación después, sobre producción:

```bash
curl -s https://atarjearedes.es/robots.txt
```

```bash
curl -s https://atarjearedes.es/ | grep -c noindex
```

El segundo tiene que devolver `0`.

---

## 7. Enviar el sitemap y solicitar indexación de la home

**Depende de:** puntos 2, 3 y 6. Este es el último.

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
