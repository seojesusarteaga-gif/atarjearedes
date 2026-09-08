/**
 * Tarjetas de segmento y de ticket alto para la home y los pies de pagina.
 * El contenido completo de cada landing vive en su propio .astro: cada una
 * responde a objeciones distintas y no comparten estructura.
 */

export interface Tarjeta {
  slug: string;
  nombre: string;
  href: string;
  etiqueta: string;
  titular: string;
  resumen: string;
  imagen: string;
  alt: string;
}

/** Los cuatro segmentos por tipo de cliente (patron NetJet). */
export const SEGMENTOS: Tarjeta[] = [
  {
    slug: 'particulares',
    nombre: 'Particulares',
    href: '/particulares',
    etiqueta: 'Vivienda',
    titular: 'Atasco en casa',
    resumen:
      'Intervención de urgencia en vivienda, con diagnóstico del origen cuando el atasco se repite.',
    imagen: '/img/paginas/particulares.svg',
    alt: 'Desatascos para particulares en Sevilla',
  },
  {
    slug: 'administradores-de-fincas',
    nombre: 'Administradores de Fincas',
    href: '/administradores-de-fincas',
    etiqueta: 'Comunidades',
    titular: 'Comunidades de propietarios',
    resumen:
      'Interlocutor único, factura a la comunidad e informe presentable ante la junta.',
    imagen: '/img/paginas/administradores-de-fincas.svg',
    alt: 'Mantenimiento de saneamiento para administradores de fincas en Sevilla',
  },
  {
    slug: 'hosteleria',
    nombre: 'Hostelería',
    href: '/hosteleria',
    etiqueta: 'Bares y restaurantes',
    titular: 'Cocinas y separadores de grasas',
    resumen:
      'Cumplimiento del Reglamento de Saneamiento de EMASESA y trabajo en horario de cierre.',
    imagen: '/img/paginas/hosteleria.svg',
    alt: 'Limpieza de separadores de grasas para hostelería en Sevilla',
  },
  {
    slug: 'industrial',
    nombre: 'Industrial',
    href: '/industrial',
    etiqueta: 'Empresas',
    titular: 'Naves, gasolineras y residencias',
    resumen:
      'Redes de uso intensivo, separadores y gestión documental del residuo.',
    imagen: '/img/paginas/industrial.svg',
    alt: 'Limpieza industrial de redes de saneamiento en Sevilla',
  },
];

/** Ticket alto: primer nivel, fuera de /servicios. */
export const TICKET_ALTO: Tarjeta[] = [
  {
    slug: 'inspeccion-camara-tuberias',
    nombre: 'Inspección con Cámara de Tuberías',
    href: '/inspeccion-camara-tuberias',
    etiqueta: 'Diagnóstico',
    titular: 'Ver antes de presupuestar',
    resumen:
      'Sin diagnóstico no hay presupuesto real. La cámara dice que pasa y donde, antes de tocar nada.',
    imagen: '/img/paginas/inspeccion-camara-tuberias.svg',
    alt: 'Inspección con cámara de tuberías en Sevilla',
  },
  {
    slug: 'rehabilitacion-tuberias-sin-obra',
    nombre: 'Rehabilitación sin obra',
    href: '/rehabilitacion-tuberias-sin-obra',
    etiqueta: 'Reparación',
    titular: 'Reparar sin abrir zanja',
    resumen:
      'Manga continua curada in situ: un conducto nuevo dentro del existente, sin picar.',
    imagen: '/img/paginas/rehabilitacion-tuberias-sin-obra.svg',
    alt: 'Rehabilitación de tuberías sin obra en Sevilla',
  },
  {
    slug: 'separadores-de-grasas-sevilla',
    nombre: 'Separadores de grasas',
    href: '/separadores-de-grasas-sevilla',
    etiqueta: 'Normativa',
    titular: 'Cumplir con EMASESA',
    resumen:
      'La arqueta separadora de grasas es obligatoria para la actividad hostelera en Sevilla.',
    imagen: '/img/paginas/separadores-de-grasas-sevilla.svg',
    alt: 'Separadores de grasas y Reglamento de Saneamiento de EMASESA en Sevilla',
  },
];

export const TODAS_LAS_TARJETAS = [...SEGMENTOS, ...TICKET_ALTO];
