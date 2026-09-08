import { defineConfig } from 'astro/config';

// PENDIENTE: sustituir por la URL real de Vercel cuando se cree el proyecto (M4.4),
// y despues por el dominio propio cuando se compre (M4.5).
// De este valor depende el canonical y el sitemap: no dejarlo sin actualizar.
const SITE = 'https://atarjearedes.vercel.app';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
