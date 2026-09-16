# Atarjea Redes

Web de captacion para redes de saneamiento y canalizaciones en Sevilla y area
metropolitana. Proyecto **Modalidad B (R&R Completo)** segun el Manual Maestro
de Webs Agenticas v2.2.

> **Estado: SCAFFOLDING.** No hay paginas construidas. La Fase RR1
> (construccion) esta pendiente del informe consolidado de auditoria y del
> cierre de las tareas paralelas.

## Arquitectura

El menu responde a **quien eres**, no a **que te hacemos**. Decision estructural
tomada en el Bloque 7 de la auditoria, sobre el patron de NetJet (Barcelona) y
Abacus (Houston).

```
/particulares                       Segmento
/administradores-de-fincas          Segmento - capa 1, el margen
/hosteleria                         Segmento - capa 1, via EMASESA
/industrial                         Segmento
/inspeccion-camara-tuberias         Ticket alto, primer nivel - el gancho
/rehabilitacion-tuberias-sin-obra   Ticket alto, primer nivel
/separadores-de-grasas-sevilla      Landing normativa EMASESA
/servicios                          Pilar + servicios individuales
/zonas                              Pilar + 14 municipios + 5 barrios
/blog                               Contenido sintomatico
/por-que-nosotros
/contacto
```

`/inspeccion-camara-tuberias` y `/rehabilitacion-tuberias-sin-obra` **no cuelgan de
`/servicios`**: van en primer nivel. Si el ticket alto queda enterrado a dos
niveles, el sitio comunica que es una web de desatascos baratos.

## Stack

- Astro 7, `output: static` con el adaptador `@astrojs/vercel`. Las 48 páginas
  se prerenderizan; la única ruta bajo demanda es `/api/contact`
  (`export const prerender = false`).
- Despliegue en Vercel (`cleanUrls: true`, `trailingSlash: false`). **Un push a
  `main` no despliega**: el proyecto no tiene Git conectado en Vercel. Se
  despliega con `vercel deploy --prod --yes`.
- Formulario de `/contacto`: `src/pages/api/contact.ts` y `src/lib/leads.ts`.
  Aviso por Telegram y por email (Resend) en paralelo; si falla uno, el otro
  sigue. Los secretos son variables de entorno de Vercel (`TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`), declaradas con `astro:env`. Para probar
  en local, un `.env` en la raíz (ignorado por git).
- Cero JavaScript externo: el menú y el envío del formulario son scripts inline.

## Comandos

| Comando | Que hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Compila a `./dist/` |
| `npm run preview` | Previsualiza el build |

## Pendientes que bloquean la Fase RR1

- [ ] Telefono real (SIM prepago propia). El placeholder `+34 000 000 000` esta
      en `public/agent.txt` y hay que sustituirlo antes de M6.2.
- [ ] Direccion postal del operador (Casco Antiguo) para NAP y schema.
- [x] Dominio propio conectado: `https://atarjearedes.es`, con `www` redirigido
      con 301 permanente al apex. La URL vive en dos sitios y los dos estan
      actualizados: `astro.config.mjs` (sitemap) y `src/data/site.ts` (canonical,
      og:url y los @id del JSON-LD).
- [ ] Poblaciones INE/SIMA de los municipios de las paginas de zona.
- [ ] Verificacion del PDF del Reglamento de Saneamiento de EMASESA antes de
      escribir la landing normativa.
- [ ] Captura de pack local con PlePer (Bloque 2 de la auditoria).

## Nota sobre indexacion

`public/robots.txt` **bloquea todo el sitio a proposito**, y las 48 paginas
llevan ademas `meta robots noindex`. Se abren los dos a la vez en la Fase M6.
El listado completo de lo que falta esta en [`_docs/PENDIENTES_M6.md`](_docs/PENDIENTES_M6.md).
