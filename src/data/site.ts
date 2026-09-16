/**
 * Fuente unica de verdad de marca, NAP y placeholders.
 *
 * Los campos marcados PENDIENTE se sustituyen en un solo pase cuando Jesus
 * cierre las tareas paralelas. NO inventar ninguno de estos valores: acaban
 * en el schema JSON-LD y en la ficha de GBP, y un NAP inconsistente arruina
 * el posicionamiento local.
 */

export const PENDIENTE = 'Pendiente de confirmar' as const;

export const SITE = {
  nombre: 'Atarjea Redes',
  claim: 'Redes de saneamiento y canalizaciones',
  // Origen canonico. Debe coincidir con el SITE de astro.config.mjs,
  // que es el que alimenta el sitemap.
  url: 'https://atarjearedes.es',

  // --- NAP ---
  telefono: '+34 000 000 000',
  telefonoHref: 'tel:+34000000000',
  telefonoPendiente: true, // PENDIENTE: SIM prepago propia
  email: 'seo.jesusarteaga@gmail.com',

  direccion: {
    calle: PENDIENTE, // PENDIENTE: direccion exacta del operador
    barrio: 'Casco Antiguo',
    localidad: 'Sevilla',
    provincia: 'Sevilla',
    cp: '41001',
    region: 'Andalucía',
    pais: 'ES',
    pendiente: true,
  },

  horario: 'Urgencias 24 h, todos los días del año',

  /**
   * Capacidades tecnicas. PENDIENTE: las tiene que dar el operador.
   * Se muestran como dato pendiente en la web; nunca se inventan, porque
   * son exactamente el criterio con el que un administrador de fincas
   * evalua a un proveedor (ver Bloque 6 de la auditoria).
   */
  capacidades: {
    hidrojetCaudal: PENDIENTE,
    cubaCapacidad: PENDIENTE,
    camaraDiametros: PENDIENTE,
    gestorResiduos: PENDIENTE, // numero de autorizacion
  },

  precios: {
    pendiente: true,
    nota: 'Precios pendientes de confirmar con el operador.',
  },
} as const;

/* ---------------------------------------------------------------------------
 * ANALITICA - PREPARADA, NO ACTIVA. Se enciende en la Fase M6.
 *
 * Jesus crea la propiedad en analytics.google.com y sustituye el placeholder
 * de abajo por el Measurement ID real. No hay que tocar nada mas: Base.astro
 * emite el snippet automaticamente en cuanto el ID tiene formato valido.
 *
 * Mientras valga el placeholder NO se imprime nada en el HTML. Cargar gtag.js
 * con un ID invalido son dos peticiones a Google en cada una de las 48 paginas
 * que no miden nada y encima plantan cookies sin contrapartida.
 *
 * ANTES DE PONER EL ID REAL: resolver el consentimiento de cookies. Hoy el
 * sitio no planta ninguna y por eso no lleva banner; con GA4 activo, si.
 * Ver _docs/PENDIENTES_M6.md, punto 1.
 * ------------------------------------------------------------------------- */
export const GA4_ID: string = 'G-XXXXXXXXX';

/**
 * Un Measurement ID real es G- seguido de 10 alfanumericos en mayusculas.
 * El placeholder (nueve equis) no pasa el formato; el segundo test cubre
 * ademas cualquier variante del marcador escrita con mas equis.
 */
export const GA4_ACTIVO = /^G-[A-Z0-9]{10}$/.test(GA4_ID) && !GA4_ID.includes('XXX');

/**
 * Notificaciones de leads del formulario de /contacto (Fase RR3).
 *
 * Separado de SITE.email a proposito: en Rank & Rent el lead le llega primero a
 * quien gestiona la web, y cambiar el email publico no debe desviar los avisos.
 *
 * El remitente es el compartido de Resend para dominios sin verificar. Cuando
 * atarjearedes.es este verificado en Resend (SPF y DKIM en Banahosting), se
 * cambia por una direccion propia del dominio.
 */
export const LEADS = {
  destinatario: 'seo.jesusarteaga@gmail.com',
  remitente: 'Atarjea Redes <onboarding@resend.dev>',
} as const;

/** Municipios donde se compite en Maps + los que solo se cubren. Alimenta areaServed. */
export const AREA_SERVIDA_EXTRA = [
  'Espartinas',
  'Almensilla',
  'Bollullos de la Mitación',
  'Salteras',
  'Alcalá del Río',
  'Umbrete',
] as const;

export const MENU = [
  { texto: 'Particulares', href: '/particulares' },
  { texto: 'Administradores', href: '/administradores-de-fincas' },
  { texto: 'Hostelería', href: '/hosteleria' },
  { texto: 'Industrial', href: '/industrial' },
  { texto: 'Inspección CCTV', href: '/inspeccion-camara-tuberias' },
  { texto: 'Zonas', href: '/zonas' },
  { texto: 'Blog', href: '/blog' },
  { texto: 'Contacto', href: '/contacto' },
] as const;
