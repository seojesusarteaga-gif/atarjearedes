import { defineConfig } from 'astro/config';

// URL de produccion CONFIRMADA en el primer deploy (M4.4, 2026-09-08).
// Vercel tenia libre el alias limpio, asi que coincide con el placeholder previo.
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
});
