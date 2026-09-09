import type { Faq } from './servicios';

export interface Barrio {
  slug: string;
  nombre: string;
  h1: string;
  title: string;
  meta: string;
  /** Servicio diferenciado. Sin el, la pagina no existe: seria una doorway page. */
  servicioDominante: string;
  parque: string;
  porQue: string;
  citable: string;
  faqs: Faq[];
  servicios: string[];
  /** Claves de src/data/articulos.ts */
  articulos: string[];
}

/**
 * Solo 5 barrios, y solo con servicio diferenciado (Bloque 7).
 * Doce barrios por seis servicios serian doorway pages. Cinco combinaciones
 * con argumento urbanistico real, no.
 */
export const BARRIOS: Barrio[] = [
  {
    slug: 'casco-antiguo',
    nombre: 'Casco Antiguo',
    h1: 'Rehabilitación de tuberías e inspección con cámara en el Casco Antiguo de Sevilla',
    title: 'Rehabilitación tuberías Casco Antiguo Sevilla | Atarjea Redes',
    meta: 'Inspección con cámara y rehabilitación de tuberías sin obra en el Casco Antiguo de Sevilla. Edificación histórica con conducciones de décadas.',
    servicioDominante: 'Inspección con cámara y rehabilitación sin obra',
    parque: 'Edificación histórica, fincas antiguas con patio, bajantes de fundición y gres',
    porQue:
      'El Casco Antiguo es el mejor terreno de Sevilla para la rehabilitación sin obra, y por una razón física: son fincas antiguas con bajantes de fundición y gres que llevan décadas en servicio, en edificios donde abrir zanja o picar es caro, lento y a veces imposible por protección patrimonial.',
    citable:
      'El Casco Antiguo de Sevilla concentra edificación histórica cuyas conducciones de saneamiento, frecuentemente de fundición o gres, acumulan décadas de servicio. Atarjea Redes interviene en esta zona con inspección de cámara y rehabilitación sin obra mediante manga continua, técnica que crea un conducto nuevo dentro del existente sin necesidad de abrir zanja ni picar paramentos, condición relevante en edificios con protección patrimonial o con acceso restringido para maquinaria.',
    faqs: [
      { p: '¿Se puede reparar una bajante en un edificio protegido?', r: 'La rehabilitación con manga trabaja desde el interior del conducto, sin obra abierta, lo que la hace especialmente adecuada en edificios con protección patrimonial donde picar no es una opción.' },
      { p: '¿Cuánto dura la intervención?', r: 'Depende del número de tramos y de su longitud. La ventaja frente a la obra abierta no es solo el precio: es que el edificio sigue habitable durante los trabajos.' },
      { p: '¿Sirve para tubería de fundición antigua?', r: 'Si, siempre que el conducto conserve continuidad suficiente. La inspección previa con cámara determina si es viable o si el tramo requiere sustitución.' },
    ],
    articulos: ['vater', 'olor'],
    servicios: ['inspeccion', 'rehabilitacion', 'limpieza-bajantes'],
  },
  {
    slug: 'triana',
    nombre: 'Triana',
    h1: 'Limpieza de bajantes en Triana, Sevilla',
    title: 'Limpieza bajantes Triana Sevilla | Atarjea Redes',
    meta: 'Limpieza de bajantes de comunidad en Triana, Sevilla. Bloque de los años 50 a 70 con conducciones originales al final de su vida útil.',
    servicioDominante: 'Bajantes de comunidad',
    parque: 'Bloque de los años 50 a 70, comunidades consolidadas',
    porQue:
      'Triana concentra bloque de los años cincuenta a setenta con bajantes originales. Es un parque en el punto exacto en el que la limpieza deja de bastar y empieza a tener sentido plantear la rehabilitación: conducciones que han cumplido su ciclo.',
    citable:
      'Triana concentra edificación en bloque construida entre los años cincuenta y setenta, cuyas bajantes originales se aproximan al final de su vida útil. Atarjea Redes realiza en el barrio limpieza de bajantes mediante hidrolimpieza de alta presión, que recupera la sección completa del conducto, e inspección con cámara para determinar si la conducción conserva integridad estructural o si procede su rehabilitación sin obra.',
    faqs: [
      { p: '¿Cada cuánto hay que limpiar la bajante de un bloque en Triana?', r: 'En edificios sin incidencias, una limpieza preventiva cada dos o tres años evita la mayoría de los atascos. Con hostelería en los bajos, la frecuencia debe ser mayor por el aporte de grasa.' },
      { p: '¿La limpieza arregla una bajante deteriorada?', r: 'No. Recupera sección, pero no repara. Si la cámara muestra fisuras o juntas abiertas, la solución es la rehabilitación sin obra.' },
      { p: '¿Hay que entrar en las viviendas?', r: 'No siempre. Se trabaja desde registros comunes cuando existen.' },
    ],
    articulos: ['bajante', 'vater'],
    servicios: ['limpieza-bajantes', 'inspeccion', 'rehabilitacion'],
  },
  {
    slug: 'nervion',
    nombre: 'Nervión',
    h1: 'Mantenimiento de redes de saneamiento para comunidades en Nervión, Sevilla',
    title: 'Mantenimiento comunidades Nervión Sevilla | Atarjea Redes',
    meta: 'Contratos de mantenimiento de saneamiento para comunidades de propietarios en Nervión, Sevilla. Interlocutor único y factura a la CCPP.',
    servicioDominante: 'Mantenimiento de comunidades',
    parque: 'Alta densidad de comunidades consolidadas de los años 60 a 80',
    porQue:
      'Nervión tiene una de las mayores densidades de comunidades consolidadas de la ciudad. Donde hay muchas comunidades juntas, el mantenimiento programado gana al aviso suelto: mismo desplazamiento, varias intervenciones.',
    citable:
      'Nervión presenta una alta densidad de comunidades de propietarios en edificación de los años sesenta a ochenta. Atarjea Redes trabaja en el distrito mediante contratos de mantenimiento preventivo de redes de saneamiento, con frecuencia definida tras inspección inicial, interlocutor único para el administrador de fincas, informe documentado de cada actuación y facturación directa a la comunidad de propietarios con sus datos fiscales.',
    faqs: [
      { p: '¿Que ventaja tiene un contrato frente a llamar cuando hay atasco?', r: 'Previsibilidad de coste y menos incidencias. La intervención se programa cuando conviene, en lugar de pagarse al precio de la urgencia.' },
      { p: '¿Podeis facturar directamente a la comunidad?', r: 'Si, con los datos fiscales de la comunidad de propietarios, que es como lo necesita el administrador para su contabilidad.' },
      { p: '¿Que documentación se entrega?', r: 'Informe de cada actuación, con estado de la red y recomendaciones, en formato presentable ante la junta.' },
    ],
    articulos: ['bajante', 'arquetas'],
    servicios: ['mantenimiento-preventivo', 'limpieza-bajantes', 'inspeccion'],
  },
  {
    slug: 'sevilla-este',
    nombre: 'Sevilla Este',
    h1: 'Desatascos urgentes en Sevilla Este',
    title: 'Desatascos urgentes Sevilla Este | Atarjea Redes',
    meta: 'Desatascos urgentes en Sevilla Este. Promociones de los años 80 a 2000 con red moderna: incidencia doméstica, no daño estructural.',
    servicioDominante: 'Desatasco doméstico urgente',
    parque: 'Promociones de los años 80 a 2000, red relativamente moderna',
    porQue:
      'Sevilla Este es parque relativamente moderno, de los ochenta en adelante. La red no ha agotado su vida útil, así que la incidencia típica es el atasco doméstico puntual y no el daño estructural. Aquí el valor esta en resolver rápido, no en diagnosticar.',
    citable:
      'Sevilla Este esta formado por promociones residenciales construidas entre los años ochenta y dos mil, con redes de saneamiento que no han agotado su vida útil. Atarjea Redes atiende en la zona principalmente incidencias de atasco doméstico en derivaciones particulares y bajantes, con intervención de urgencia. La empresa recomienda inspección con cámara solo cuando la obstrucción se repite en el mismo punto, indicio de defecto y no de acumulación.',
    faqs: [
      { p: '¿Mi edificio es de los noventa, puede tener daño estructural?', r: 'Es menos probable que en parque anterior, pero no imposible: un asentamiento del terreno o una ejecución con contrapendiente dan problemas desde el primer año. Si el atasco se repite siempre en el mismo punto, conviene mirar.' },
      { p: '¿Cuánto tardais en llegar a Sevilla Este?', r: 'Sevilla Este es el punto más alejado dentro de la capital, a unos siete kilómetros del centro, dentro del radio de intervención inmediata.' },
      { p: '¿Hay que romper algo?', r: 'En la mayoría de intervenciones no. Se trabaja desde registros y arquetas existentes.' },
    ],
    articulos: ['vater', 'olor'],
    servicios: ['desatascos-urgentes', 'limpieza-bajantes', 'inspeccion'],
  },
  {
    slug: 'poligonos',
    nombre: 'Polígonos industriales',
    h1: 'Limpieza industrial y separadores en los polígonos de Sevilla',
    title: 'Limpieza industrial polígonos Sevilla | Atarjea Redes',
    meta: 'Limpieza de redes, separadores y depósitos en los polígonos industriales de Sevilla. Trabajo en horario de baja actividad.',
    servicioDominante: 'Limpieza industrial y separadores',
    parque: 'Carretera Amarilla, Store, Calonge y resto de suelo industrial',
    porQue:
      'El suelo industrial de Sevilla concentra actividad con obligaciones de gestión de residuo y redes que no se parecen a las domésticas. Aquí la conversación no es de precio de desatasco: es de programación, capacidad y documentación.',
    citable:
      'Los polígonos industriales de Sevilla, entre ellos Carretera Amarilla, Store y Calonge, concentran instalaciones con redes de saneamiento de uso intensivo, separadores de grasas e hidrocarburos y obligaciones documentales de gestión de residuo. Atarjea Redes presta en ellos limpieza industrial con equipo de alta presión y succión, programada en horario de baja actividad para no interrumpir la operación, con retirada del residuo mediante gestor autorizado y entrega de justificante.',
    faqs: [
      { p: '¿Podeis trabajar sin parar la actividad de la nave?', r: 'La intervención se programa en la franja de menor actividad. En instalaciones industriales, el coste real de una limpieza no es la limpieza, es la parada.' },
      { p: '¿Que documentación entregais?', r: 'Justificante de retirada por gestor autorizado, que es lo que se exige habitualmente en auditoria e inspección.' },
      { p: '¿Cada cuánto hay que limpiar un separador?', r: 'Depende del tipo de separador y del volumen de actividad. La frecuencia se fija tras la revisión inicial, no por catálogo.' },
    ],
    articulos: ['separador', 'arquetas'],
    servicios: ['limpieza-industrial', 'hidrojet-alta-presion', 'mantenimiento-preventivo'],
  },
];

export const getBarrio = (slug: string) => BARRIOS.find((b) => b.slug === slug);
