/**
 * Referencia estatica a los articulos del blog para el enlazado entrante.
 *
 * El blog solo funciona como distribuidor de autoridad (patron Pociten,
 * Bloque 4) si ademas RECIBE enlaces. En la auditoria M5.6 los cinco
 * articulos tenian 1-2 entrantes, todos desde /blog. Este mapa permite que
 * landings y paginas de zona enlacen al articulo que corresponde a su
 * sintoma dominante.
 *
 * Se mantiene aparte de la content collection a proposito: las plantillas
 * necesitan estos datos de forma sincrona y sin cargar el cuerpo del post.
 */

export interface Articulo {
  slug: string;
  titulo: string;
  /** Frase de entrada al enlace: por que le interesa a quien esta en esa pagina. */
  gancho: string;
}

export const ARTICULOS: Record<string, Articulo> = {
  vater: {
    slug: 'vater-sube-al-ducharse-que-significa',
    titulo: 'El váter sube al ducharse: qué significa',
    gancho: 'Si sube agua por un desagüe al usar otro, la obstrucción no está donde parece.',
  },
  olor: {
    slug: 'olor-alcantarilla-en-casa-causas',
    titulo: 'Olor a alcantarilla en casa: causas reales',
    gancho: 'Cuatro de cada cinco casos se arreglan solos con un vaso de agua. El quinto, no.',
  },
  bajante: {
    slug: 'atasco-bajante-comunidad-o-propietario',
    titulo: '¿El atasco de la bajante lo paga la comunidad o yo?',
    gancho: 'La prueba de dos minutos que zanja la discusión antes de que empiece.',
  },
  separador: {
    slug: 'separador-grasas-hosteleria-emasesa',
    titulo: 'Separador de grasas: qué exige EMASESA',
    gancho: 'Qué obliga el Reglamento de Saneamiento y qué documento acredita el cumplimiento.',
  },
  arquetas: {
    slug: 'arquetas-lluvias-otono-sevilla',
    titulo: 'Antes de las lluvias: por qué se desbordan las arquetas',
    gancho: 'La primera tormenta de otoño no provoca el problema: lo revela.',
  },
};

export const articulos = (...claves: string[]): Articulo[] =>
  claves.map((c) => ARTICULOS[c]).filter(Boolean);
