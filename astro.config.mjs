import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
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
