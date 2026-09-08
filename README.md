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

- Astro 5, `output: static`
- Despliegue en Vercel (`cleanUrls: true`, `trailingSlash: false`)
- Sin dependencias de runtime

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
- [ ] Dominio propio. Ahora mismo `astro.config.mjs` apunta a una URL de Vercel
      provisional, y de ahi depende el canonical.
- [ ] Poblaciones INE/SIMA de los municipios de las paginas de zona.
- [ ] Verificacion del PDF del Reglamento de Saneamiento de EMASESA antes de
      escribir la landing normativa.
- [ ] Captura de pack local con PlePer (Bloque 2 de la auditoria).

## Nota sobre indexacion

`public/robots.txt` **bloquea todo el sitio a proposito**. Se abre en la Fase M6,
con el dominio propio ya conectado y la auditoria M5.6 pasada. No tocarlo antes.
