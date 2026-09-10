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
  url: 'https://atarjearedes.vercel.app',

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
