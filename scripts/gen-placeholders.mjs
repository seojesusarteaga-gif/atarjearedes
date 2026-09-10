/**
 * Genera los placeholders SVG de marca para tarjetas y heroes.
 *
 * Uso:  node scripts/gen-placeholders.mjs
 *
 * REGLA CRITICA: todos los SVG salen en 16:9 (1200x675).
 * En M5.7 se detecto que los de /img/paginas se generaban a 1600x700 (2.286:1)
 * mientras que .tarjeta img fuerza aspect-ratio 16/9 con object-fit: cover.
 * Eso recortaba un 11,1% por cada lado y se comia el principio de las
 * etiquetas largas ("istradores de fincas") y el final del sello
 * ("IMAGEN PROVISION"). El problema NO era el tamano de fuente: era el ratio.
 *
 * Se sustituyen por imagenes reales en la Fase RR2.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1200;
const H = 675; // 1200/675 = 16/9 exacto. No cambiar sin revisar .tarjeta img.

const MARGEN = 64;
const ANCHO_UTIL = W - MARGEN * 2;

const VARIANTES = [
  { bg: '#12455C', fg: '#C9AE8C', tx: '#F7F4EF' },
  { bg: '#0E2A38', fg: '#C9AE8C', tx: '#F7F4EF' },
  { bg: '#F7F4EF', fg: '#12455C', tx: '#0E2A38' },
  { bg: '#1B5A70', fg: '#E0CDB2', tx: '#F7F4EF' },
  { bg: '#EDE7DD', fg: '#12455C', tx: '#0E2A38' },
  { bg: '#173F4F', fg: '#C9AE8C', tx: '#F7F4EF' },
];

const hash = (s) => [...s].reduce((a, c) => ((a * 31) + c.charCodeAt(0)) >>> 0, 7);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Ajusta el tamano de fuente para que la etiqueta quepa siempre.
 * Ancho medio de glifo en sans-serif bold ~= 0.58em; se usa 0.60 de margen.
 */
function encajar(texto, fontBase, anchoMax, factor = 0.6) {
  const estimado = texto.length * fontBase * factor;
  if (estimado <= anchoMax) return fontBase;
  return Math.max(22, Math.floor((anchoMax / (texto.length * factor)) * 10) / 10);
}

function svg(label, slug) {
  const hv = hash(slug);
  const v = VARIANTES[hv % VARIANTES.length];
  const rot = (hv >> 3) % 4;
  const cx = 180 + ((hv >> 5) % 240);
  const cy = H / 2 + (((hv >> 9) % 120) - 60);
  const rings = 3 + ((hv >> 11) % 3);
  const gap = 26 + ((hv >> 13) % 14);

  let arcs = '';
  for (let i = 0; i < rings; i++) {
    const r = 70 + i * gap;
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${v.fg}" stroke-width="${i === 0 ? 14 : 4}" opacity="${(0.95 - i * 0.18).toFixed(2)}"/>`;
  }

  let flow = '';
  for (let i = 0; i < 4; i++) {
    const y = cy - 36 + i * 24;
    const x1 = cx + 90 + (i % 2) * 40;
    const x2 = Math.min(W - MARGEN, x1 + 150 + ((hv >> (i + 2)) % 120));
    flow += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${v.fg}" stroke-width="3" opacity="${(0.5 - i * 0.08).toFixed(2)}" stroke-linecap="round"/>`;
  }

  const sello = 'IMAGEN PROVISIONAL · FASE RR2';
  const fLabel = encajar(label, 46, ANCHO_UTIL);
  const fSello = encajar(sello, 15, ANCHO_UTIL * 0.42, 0.62);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title>
<defs>
<pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot * 15})">
<path d="M40 0 L0 0 0 40" fill="none" stroke="${v.fg}" stroke-width="0.6" opacity="0.22"/>
</pattern>
</defs>
<rect width="${W}" height="${H}" fill="${v.bg}"/>
<rect width="${W}" height="${H}" fill="url(#g)"/>
${arcs}${flow}
<text x="${MARGEN}" y="${H - 92}" fill="${v.tx}" font-family="Inter, 'IBM Plex Sans', system-ui, sans-serif" font-size="${fLabel}" font-weight="700" letter-spacing="-0.5">${esc(label)}</text>
<text x="${MARGEN}" y="${H - 52}" fill="${v.fg}" font-family="Inter, 'IBM Plex Sans', system-ui, sans-serif" font-size="19" font-weight="600" letter-spacing="4">ATARJEA REDES</text>
<text x="${W - MARGEN}" y="${H - 52}" text-anchor="end" fill="${v.tx}" opacity="0.55" font-family="Inter, system-ui, sans-serif" font-size="${fSello}" letter-spacing="1.5">${esc(sello)}</text>
</svg>`;
}

const ZONAS = {
  sevilla: 'Sevilla capital', 'casco-antiguo': 'Casco Antiguo', triana: 'Triana',
  nervion: 'Nervión', 'sevilla-este': 'Sevilla Este', poligonos: 'Polígonos industriales',
  camas: 'Camas', 'san-juan-de-aznalfarache': 'San Juan de Aznalfarache', tomares: 'Tomares',
  'castilleja-de-la-cuesta': 'Castilleja de la Cuesta', gelves: 'Gelves', santiponce: 'Santiponce',
  'mairena-del-aljarafe': 'Mairena del Aljarafe', bormujos: 'Bormujos', gines: 'Gines',
  'valencina-de-la-concepcion': 'Valencina de la Concepción', 'palomares-del-rio': 'Palomares del Río',
  'la-algaba': 'La Algaba', 'la-rinconada': 'La Rinconada', 'coria-del-rio': 'Coria del Río',
  'la-puebla-del-rio': 'La Puebla del Río', 'dos-hermanas': 'Dos Hermanas',
  'alcala-de-guadaira': 'Alcalá de Guadaíra',
};

const PAGINAS = {
  home: 'Redes de saneamiento', particulares: 'Particulares',
  'administradores-de-fincas': 'Administradores de fincas', hosteleria: 'Hostelería',
  industrial: 'Industrial', 'inspeccion-camara-tuberias': 'Inspección con cámara',
  'rehabilitacion-tuberias-sin-obra': 'Rehabilitación sin obra',
  'separadores-de-grasas-sevilla': 'Separadores de grasas', servicios: 'Servicios',
  zonas: 'Zonas de cobertura', blog: 'Blog', contacto: 'Contacto',
  'por-que-nosotros': 'Por qué nosotros',
};

mkdirSync('public/img/zonas', { recursive: true });
mkdirSync('public/img/paginas', { recursive: true });

let n = 0;
let peorCaso = { label: '', font: 99 };
for (const [dir, set] of [['zonas', ZONAS], ['paginas', PAGINAS]]) {
  for (const [slug, label] of Object.entries(set)) {
    writeFileSync(`public/img/${dir}/${slug}.svg`, svg(label, slug));
    const f = encajar(label, 46, ANCHO_UTIL);
    if (f < peorCaso.font) peorCaso = { label, font: f };
    n++;
  }
}
console.log(`${n} placeholders generados a ${W}x${H} (16:9)`);
console.log(`etiqueta mas larga: "${peorCaso.label}" -> font-size ${peorCaso.font}`);
