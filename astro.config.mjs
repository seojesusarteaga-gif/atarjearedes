import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL de produccion CONFIRMADA en el primer deploy (M4.4, 2026-09-08).
//
// PENDIENTE M4.5: cuando se compre el dominio propio hay que cambiar este valor
// y volver a desplegar. De el dependen el canonical y el sitemap; dejarlo
// apuntando a Vercel con dominio propio ya conectado seria un error de canonical.
const SITE = 'https://atarjearedes.vercel.app';

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
