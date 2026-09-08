import { SERVICIOS } from './servicios';

/**
 * Resolutor de enlaces internos.
 *
 * Existe porque el ticket alto NO cuelga de /servicios (decision del Bloque 7):
 * inspeccion, rehabilitacion y separadores son paginas de primer nivel. Los
 * arrays `servicios` de municipios y barrios pueden referirse a cualquiera de
 * los dos grupos, y esta funcion los resuelve sin que cada plantilla tenga que
 * saber donde vive cada pagina.
 */

const ESPECIALES: Record<string, { nombre: string; href: string; resumen: string }> = {
  inspeccion: {
    nombre: 'Inspección con cámara de tuberías',
    href: '/inspeccion-camara-tuberias',
    resumen: 'Diagnóstico previo obligado antes de presupuestar cualquier reparación.',
  },
  rehabilitacion: {
    nombre: 'Rehabilitación de tuberías sin obra',
    href: '/rehabilitacion-tuberias-sin-obra',
    resumen: 'Conducto nuevo dentro del existente, sin zanja ni picar.',
  },
  separadores: {
    nombre: 'Separadores de grasas',
    href: '/separadores-de-grasas-sevilla',
    resumen: 'Cumplimiento del Reglamento de Saneamiento de EMASESA.',
  },
};

export interface EnlaceServicio {
  slug: string;
  nombre: string;
  href: string;
  resumen: string;
}

export function resolverServicio(slug: string): EnlaceServicio | null {
  if (ESPECIALES[slug]) return { slug, ...ESPECIALES[slug] };
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) return null;
  return { slug, nombre: s.nombre, href: `/servicios/${s.slug}`, resumen: s.resumen };
}

export const resolverServicios = (slugs: readonly string[]): EnlaceServicio[] =>
  slugs.map(resolverServicio).filter((x): x is EnlaceServicio => x !== null);
