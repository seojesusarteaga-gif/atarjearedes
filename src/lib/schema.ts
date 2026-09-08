import { SITE, AREA_SERVIDA_EXTRA } from '../data/site';
import { MUNICIPIOS } from '../data/municipios';
import type { Faq } from '../data/servicios';

/**
 * Constructor del @graph JSON-LD.
 *
 * Un solo grafo por pagina con @id enlazados, para que Google y los modelos
 * entiendan que Organization, LocalBusiness, WebSite y Service son la misma
 * entidad y no cuatro negocios distintos.
 *
 * NAP: sale integro de site.ts. Cuando cambie el telefono o la direccion,
 * cambia aqui tambien sin tocar nada mas.
 */

const ID = {
  org: `${SITE.url}/#organization`,
  negocio: `${SITE.url}/#localbusiness`,
  web: `${SITE.url}/#website`,
};

/** areaServed: los 18 municipios con pagina mas los que solo se cubren. */
const AREA_SERVIDA = [
  ...MUNICIPIOS.map((m) => m.nombre),
  'Sevilla',
  ...AREA_SERVIDA_EXTRA,
].map((nombre) => ({ '@type': 'City', name: nombre }));

function organizacion() {
  return {
    '@type': 'Organization',
    '@id': ID.org,
    name: SITE.nombre,
    url: SITE.url,
    email: SITE.email,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/logo.svg`,
      caption: SITE.nombre,
    },
    description:
      'Empresa de redes de saneamiento y canalizaciones en Sevilla y su área metropolitana: inspección con cámara, rehabilitación de tuberías sin obra, mantenimiento preventivo para comunidades, hostelería e industria, y desatascos de urgencia.',
  };
}

function negocioLocal() {
  const dir = SITE.direccion;
  return {
    '@type': ['LocalBusiness', 'Plumber'],
    '@id': ID.negocio,
    name: SITE.nombre,
    url: SITE.url,
    email: SITE.email,
    // El telefono es placeholder hasta que exista la SIM propia.
    ...(SITE.telefonoPendiente ? {} : { telephone: SITE.telefono }),
    parentOrganization: { '@id': ID.org },
    address: {
      '@type': 'PostalAddress',
      // La calle se omite mientras sea placeholder: un NAP incompleto es
      // preferible a un NAP falso, que rompe la coherencia con la ficha de GBP.
      ...(dir.pendiente ? {} : { streetAddress: dir.calle }),
      addressLocality: dir.localidad,
      addressRegion: dir.provincia,
      postalCode: dir.cp,
      addressCountry: dir.pais,
    },
    areaServed: AREA_SERVIDA,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    knowsAbout: [
      'Redes de saneamiento',
      'Inspección de tuberías con cámara CCTV',
      'Rehabilitación de tuberías sin obra',
      'Encamisado con manga continua',
      'Separadores de grasas',
      'Fosas sépticas',
      'Mantenimiento preventivo de saneamiento',
    ],
  };
}

function sitioWeb() {
  return {
    '@type': 'WebSite',
    '@id': ID.web,
    url: SITE.url,
    name: SITE.nombre,
    inLanguage: 'es-ES',
    publisher: { '@id': ID.org },
  };
}

export interface Miga {
  nombre: string;
  href: string;
}

function migas(items: Miga[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE.url}/#breadcrumb`,
    itemListElement: items.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre,
      item: `${SITE.url}${m.href}`,
    })),
  };
}

function paginaFaq(faqs: Faq[], url: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
}

function servicio(opts: { nombre: string; descripcion: string; url: string; tipo?: string }) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.nombre,
    description: opts.descripcion,
    serviceType: opts.tipo ?? opts.nombre,
    provider: { '@id': ID.negocio },
    areaServed: AREA_SERVIDA,
    url: opts.url,
  };
}

function entrada(opts: {
  titulo: string;
  descripcion: string;
  url: string;
  fecha: string;
  imagen?: string;
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#post`,
    headline: opts.titulo,
    description: opts.descripcion,
    datePublished: opts.fecha,
    dateModified: opts.fecha,
    inLanguage: 'es-ES',
    mainEntityOfPage: opts.url,
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
    ...(opts.imagen ? { image: `${SITE.url}${opts.imagen}` } : {}),
  };
}

export interface OpcionesGrafo {
  ruta: string;
  migas?: Miga[];
  faqs?: Faq[];
  servicio?: { nombre: string; descripcion: string; tipo?: string };
  entrada?: { titulo: string; descripcion: string; fecha: string; imagen?: string };
}

/** Devuelve el @graph completo listo para serializar. */
export function construirGrafo(o: OpcionesGrafo) {
  const url = `${SITE.url}${o.ruta === '/' ? '' : o.ruta}`;
  const nodos: unknown[] = [organizacion(), negocioLocal(), sitioWeb()];

  if (o.migas?.length) nodos.push(migas(o.migas));
  if (o.faqs?.length) nodos.push(paginaFaq(o.faqs, url));
  if (o.servicio) nodos.push(servicio({ ...o.servicio, url }));
  if (o.entrada) nodos.push(entrada({ ...o.entrada, url }));

  return { '@context': 'https://schema.org', '@graph': nodos };
}
