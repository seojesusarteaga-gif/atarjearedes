import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// URL de produccion DEFINITIVA: dominio propio. Sustituye a la URL de Vercel
// desde el 2026-09-16; www.atarjearedes.es redirige con 301 a este origen.
//
// OJO: este valor alimenta el sitemap. El canonical, el og:url y todos los @id
// del JSON-LD salen de SITE.url en src/data/site.ts. Los dos tienen que
// apuntar al mismo origen; si divergen, el sitemap declara una URL y la pagina
// se autodeclara canonica en otra.
const SITE = 'https://atarjearedes.es';

export default defineConfig({
  site: SITE,

  // Sigue siendo un sitio estatico: las 48 paginas se prerenderizan como antes.
  // El adaptador solo entra en juego en las rutas con `prerender = false`, que
  // hoy son una: /api/contact. Es lo que Astro llamaba modo 'hybrid' (la opcion
  // desaparecio en la v5 porque paso a ser el comportamiento por defecto).
  // No cambiar a output: 'server': renderizaria bajo demanda las 48 paginas.
  output: 'static',
  adapter: vercel(),

  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  env: {
    schema: {
      // Secretos del formulario (Fase RR3). Se leen en tiempo de ejecucion de
      // las variables de entorno de Vercel: no van en el repo ni en el bundle.
      // Opcionales a proposito: si falta uno, ese canal falla y el otro sigue.
      TELEGRAM_BOT_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      TELEGRAM_CHAT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  integrations: [
    // Genera sitemap-index.xml + sitemap-0.xml a partir de las rutas reales.
    // Sustituye al public/sitemap.xml estatico, que se ha borrado.
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
