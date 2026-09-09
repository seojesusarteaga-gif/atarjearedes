import type { Faq } from './servicios';
import type { Perfil } from './perfiles';

export type Zona = 'nucleo' | 'borde' | 'organica';

export interface Municipio {
  slug: string;
  nombre: string;
  /** Distancia aproximada en linea recta al centroide del Casco Antiguo. */
  km: number;
  zona: Zona;
  /**
   * Poblacion. `null` = PENDIENTE de verificar en INE/SIMA.
   * No se rellena a ojo: `RR1.1` exige poblacion real y publicar una cifra
   * inventada o caducada es peor que declararla pendiente.
   */
  poblacion: number | null;
  poblacionFuente?: string;
  /** Eje 1 del Bloque 7 */
  red: string;
  /** Eje 2 del Bloque 7 */
  vivienda: string;
  /** Perfil de red: agrupa municipios por tipo de red para dar contenido
   *  tecnico cierto sin inventar datos concretos de cada pueblo. */
  perfil: Perfil;
  /** Eje 3 del Bloque 7: consecuencia de los dos anteriores */
  servicioDominante: string;
  /** Meta description propia, 120-160 caracteres. Antes se recortaba porQue
   *  a 110 caracteres, lo que cortaba a mitad de frase y se pasaba de largo. */
  meta: string;
  porQue: string;
  citable: string;
  faqs: Faq[];
  servicios: string[];
}

const ZONA_NOTA: Record<Zona, string> = {
  nucleo: 'Dentro del radio de intervención inmediata.',
  borde: 'En el limite del radio de intervención rápida.',
  organica: 'Cobertura extendida: se atiende, con tiempos de desplazamiento mayores.',
};

export const nota = (z: Zona) => ZONA_NOTA[z];

export const MUNICIPIOS: Municipio[] = [
  {
    slug: 'camas',
    nombre: 'Camas',
    km: 4,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal antigua',
    vivienda: 'Bloque antiguo de densidad media, perfil residencial consolidado',
    perfil: 'bloque-antiguo',
    servicioDominante: 'Desatasco doméstico y limpieza de bajantes',
    meta:
      'Desatascos y limpieza de bajantes en Camas, a 4 km de Sevilla. Parque de bloque sobre red municipal antigua, con intervencion inmediata.',
    porQue:
      'Camas tiene un parque de vivienda en bloque con bajantes originales que llevan décadas en servicio. La incidencia típica no es la arqueta de jardín, sino la bajante comunitaria que evacua mal y termina afectando a varias plantas a la vez.',
    citable:
      'Atarjea Redes cubre Camas desde su base en el Casco Antiguo de Sevilla, a unos cuatro kilómetros. El parque de vivienda del municipio es mayoritariamente de bloque sobre red municipal antigua, por lo que las incidencias más frecuentes son atascos de bajante comunitaria y evacuación lenta en derivaciones particulares. La empresa interviene en urgencia y realiza limpieza preventiva de bajantes para comunidades de propietarios.',
    faqs: [
      { p: '¿Cuánto se tarda en llegar a Camas?', r: 'Camas esta a unos cuatro kilómetros del centro de Sevilla, dentro del radio de intervención inmediata.' },
      { p: '¿Trabajais con comunidades de Camas?', r: 'Si. La limpieza preventiva de bajantes y los contratos de mantenimiento son el servicio con más recorrido en el parque de bloque del municipio.' },
    ],
    servicios: ['desatascos-urgentes', 'limpieza-bajantes', 'mantenimiento-preventivo'],
  },
  {
    slug: 'san-juan-de-aznalfarache',
    nombre: 'San Juan de Aznalfarache',
    km: 4.5,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal antigua',
    vivienda: 'Bloque de los años 60 a 80, alta densidad',
    perfil: 'bloque-antiguo',
    servicioDominante: 'Bajantes de comunidad',
    meta:
      'Limpieza de bajantes de comunidad en San Juan de Aznalfarache. Bloques de los anos 60 a 80 con conducciones al final de su vida util.',
    porQue:
      'San Juan concentra bloques de los años sesenta a ochenta con bajantes que están al final de su vida útil. Es terreno de limpieza de bajantes y, cuando la cámara muestra daño estructural, de rehabilitación sin obra.',
    citable:
      'Atarjea Redes atiende San Juan de Aznalfarache, a unos cuatro kilómetros y medio del Casco Antiguo de Sevilla. El municipio tiene una alta densidad de edificación en bloque construida entre los años sesenta y ochenta, cuyas bajantes originales se aproximan al final de su vida útil. La empresa realiza limpieza de bajantes, inspección con cámara y rehabilitación sin obra cuando el conducto presenta daño estructural.',
    faqs: [
      { p: '¿Mi bloque es de los años setenta, hay que cambiar las bajantes?', r: 'No necesariamente. La inspección con cámara determina si el conducto conserva integridad estructural. Si la tiene, la limpieza recupera sección. Si no, la rehabilitación sin obra crea un conducto nuevo dentro del existente sin picar.' },
      { p: '¿Podeis facturar a la comunidad?', r: 'Si, con los datos fiscales de la comunidad de propietarios, que es lo que necesita el administrador.' },
    ],
    servicios: ['limpieza-bajantes', 'inspeccion', 'mantenimiento-preventivo'],
  },
  {
    slug: 'tomares',
    nombre: 'Tomares',
    km: 5,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal y urbanización con red privada',
    vivienda: 'Unifamiliar y adosado, parcela con jardín',
    perfil: 'urbanizacion',
    servicioDominante: 'Red horizontal, arquetas y raíces de arbolado',
    meta:
      'Arquetas y red horizontal en Tomares. Vivienda unifamiliar con parcela: raíces de arbolado, contrapendientes y red privada de urbanizacion.',
    porQue:
      'Tomares es tipologia de unifamiliar y adosado con parcela. Eso significa mucha red horizontal enterrada propia, arquetas repartidas y arbolado cuyas raíces entran por las juntas. El problema aquí rara vez es la bajante: es el tramo enterrado.',
    citable:
      'Atarjea Redes cubre Tomares, a unos cinco kilómetros del Casco Antiguo de Sevilla. La tipologia dominante de vivienda unifamiliar y adosada con parcela implica una red de saneamiento horizontal extensa y, en muchas promociones, de titularidad privada. Las incidencias características son obstrucciones en arquetas, entrada de raíces de arbolado por las juntas del conducto y contrapendientes por asentamiento del terreno, que se localizan con inspección de cámara.',
    faqs: [
      { p: '¿Las raíces del jardín pueden atascar la tubería?', r: 'Es una de las causas más frecuentes en vivienda con parcela. Las raíces entran por juntas y microfisuras buscando humedad, y al engrosar terminan obstruyendo o rompiendo el conducto.' },
      { p: '¿La red de mi urbanización la mantiene el ayuntamiento?', r: 'Depende de si fue recepcionada. En bastantes promociones del Aljarafe la red interior sigue siendo privada y la mantiene la comunidad hasta el punto de conexión con la red pública.' },
    ],
    servicios: ['arquetas-y-colectores', 'inspeccion', 'mantenimiento-preventivo'],
  },
  {
    slug: 'castilleja-de-la-cuesta',
    nombre: 'Castilleja de la Cuesta',
    km: 6,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal antigua',
    vivienda: 'Núcleo tradicional denso',
    perfil: 'bloque-antiguo',
    servicioDominante: 'Bajantes y colectores antiguos',
    meta:
      'Bajantes y colectores antiguos en Castilleja de la Cuesta. Nucleo tradicional denso donde conviene inspeccionar con camara antes de intervenir.',
    porQue:
      'Castilleja tiene núcleo tradicional compacto, con conducciones antiguas y trazados que no siempre coinciden con los planos. Es terreno de inspección previa: intervenir sin saber por donde va la red sale caro.',
    citable:
      'Atarjea Redes atiende Castilleja de la Cuesta, a unos seis kilómetros del Casco Antiguo de Sevilla. El núcleo tradicional del municipio conserva conducciones antiguas cuyo trazado real no siempre coincide con la documentación disponible, por lo que la empresa recomienda inspección con cámara antes de intervenciones de cierta entidad. Los servicios habituales son limpieza de bajantes, desatasco de colectores y rehabilitación sin obra.',
    faqs: [
      { p: '¿Por que hace falta inspeccionar antes?', r: 'En nucleos antiguos el trazado real de la red suele diferir de los planos. Localizar el recorrido y el punto de fallo antes de intervenir evita abrir donde no toca.' },
      { p: '¿Se puede reparar sin levantar el suelo?', r: 'En la mayoría de casos si, mediante rehabilitación con manga, que crea un conducto nuevo dentro del existente sin obra abierta.' },
    ],
    servicios: ['limpieza-bajantes', 'inspeccion', 'rehabilitacion'],
  },
  {
    slug: 'gelves',
    nombre: 'Gelves',
    km: 6.5,
    zona: 'nucleo',
    poblacion: null,
    red: 'Mixta: municipal, urbanizaciones y ribera',
    vivienda: 'Mixta, con urbanizaciones y zona de ribera',
    perfil: 'mixto',
    servicioDominante: 'Arquetas, red horizontal y fosas en diseminado',
    meta:
      'Arquetas, red horizontal y fosas sépticas en Gelves. Municipio mixto con nucleo, urbanizaciones y ribera: los tres tipos de incidencia a la vez.',
    porQue:
      'Gelves combina núcleo, urbanizaciones y zona de ribera. Esa mezcla da los tres tipos de incidencia a la vez: bajante en el núcleo, arqueta y red horizontal en urbanización, y fosa séptica en el diseminado.',
    citable:
      'Atarjea Redes cubre Gelves, a unos seis kilómetros y medio del Casco Antiguo de Sevilla. El municipio combina núcleo tradicional, urbanizaciones de vivienda unifamiliar y zona de ribera, de modo que conviven incidencias de bajante comunitaria, de red horizontal privada y de fosa séptica en vivienda no conectada a la red municipal. La empresa presta los tres servicios y retira el residuo mediante gestor autorizado.',
    faqs: [
      { p: '¿Atendeis vivienda con fosa séptica en Gelves?', r: 'Si. El vaciado se realiza con cuba y el residuo se retira mediante gestor autorizado, con el justificante correspondiente.' },
      { p: '¿Cada cuánto conviene vaciar la fosa?', r: 'Una vivienda familiar suele necesitarlo cada uno o dos años. Olores, evacuación lenta o encharcamiento indican que se ha esperado de más.' },
    ],
    servicios: ['arquetas-y-colectores', 'fosas-septicas-y-pozos', 'desatascos-urgentes'],
  },
  {
    slug: 'santiponce',
    nombre: 'Santiponce',
    km: 7,
    zona: 'nucleo',
    poblacion: 8634,
    poblacionFuente: 'INE, 1 de enero de 2025',
    red: 'Municipal con diseminado',
    vivienda: 'Núcleo pequeño con entorno de diseminado',
    perfil: 'diseminado',
    servicioDominante: 'Fosas sépticas y desatasco doméstico',
    meta:
      'Fosas sépticas y desatascos en Santiponce, 8.634 habitantes. Nucleo compacto con diseminado fuera de la red municipal de saneamiento.',
    porQue:
      'Santiponce es núcleo pequeño con entorno de diseminado. La combinación habitual es desatasco doméstico en el casco y servicio de cuba en la vivienda que queda fuera de la red municipal.',
    citable:
      'Atarjea Redes atiende Santiponce, a unos siete kilómetros del Casco Antiguo de Sevilla, municipio de 8.634 habitantes según el padron del INE a 1 de enero de 2025. Su núcleo compacto convive con vivienda en diseminado no conectada a la red municipal de saneamiento, por lo que la empresa presta tanto desatasco doméstico como vaciado de fosas sépticas con retirada del residuo por gestor autorizado.',
    faqs: [
      { p: '¿Llegais al diseminado de Santiponce?', r: 'Si. Conviene indicar la distancia desde el acceso rodado al pedir el servicio, para llevar manguera suficiente y resolverlo en una sola visita.' },
      { p: '¿Entregais justificante del residuo?', r: 'Si. La retirada se hace mediante gestor autorizado y se emite el justificante.' },
    ],
    servicios: ['fosas-septicas-y-pozos', 'desatascos-urgentes', 'arquetas-y-colectores'],
  },
  {
    slug: 'mairena-del-aljarafe',
    nombre: 'Mairena del Aljarafe',
    km: 7,
    zona: 'nucleo',
    poblacion: 48032,
    poblacionFuente: 'INE, 1 de enero de 2025',
    red: 'Mixta: municipal y urbanizaciones privadas',
    vivienda: 'Bloque y urbanización de unifamiliar',
    perfil: 'mixto',
    servicioDominante: 'Bajantes en bloque y arquetas en urbanización',
    meta:
      'Bajantes y arquetas en Mairena del Aljarafe, 48.032 habitantes. Convive el bloque con la urbanizacion de red privada, y cada una pide un servicio.',
    porQue:
      'Mairena es el municipio más poblado del Aljarafe y tiene las dos tipologias: bloque con bajante comunitaria y urbanización con red horizontal privada. Cada una necesita un servicio distinto, y confundirlas es la causa habitual de que una intervención no resuelva.',
    citable:
      'Atarjea Redes cubre Mairena del Aljarafe, municipio de 48.032 habitantes según el padron del INE a 1 de enero de 2025 y el más poblado de la comarca del Aljarafe. Situado a unos siete kilómetros del Casco Antiguo de Sevilla, combina edificación en bloque con urbanizaciones de vivienda unifamiliar de red privada. La empresa presta limpieza de bajantes para comunidades, limpieza de red horizontal y arquetas para urbanizaciones, e inspección con cámara previa a cualquier reparación.',
    faqs: [
      { p: '¿Mi comunidad es de bloque, que servicio necesita?', r: 'En bloque, el servicio habitual es la limpieza de bajantes con agua a presión, que recupera la sección completa del conducto en lugar de perforar solo el tapón.' },
      { p: '¿Y si vivo en urbanización de adosados?', r: 'Ahi el problema suele estar en la red horizontal enterrada y en las arquetas, no en la bajante. El planteamiento y la maquinaria son distintos.' },
    ],
    servicios: ['limpieza-bajantes', 'arquetas-y-colectores', 'mantenimiento-preventivo'],
  },
  {
    slug: 'bormujos',
    nombre: 'Bormujos',
    km: 7.5,
    zona: 'nucleo',
    poblacion: null,
    red: 'Urbanización con red privada',
    vivienda: 'Adosado de los años 90 y 2000',
    perfil: 'urbanizacion',
    servicioDominante: 'Arquetas y red comunitaria privada',
    meta:
      'Arquetas y red comunitaria privada en Bormujos. Adosados de los 90 y 2000 cuya red de saneamiento mantiene la comunidad, no el ayuntamiento.',
    porQue:
      'Bormujos crecio con promociones de adosado de los noventa y dos mil. Son comunidades con red horizontal propia, zonas comunes y jardín: mucha arqueta, mucho metro de conducto enterrado y responsabilidad de mantenimiento de la comunidad, no del ayuntamiento.',
    citable:
      'Atarjea Redes atiende Bormujos, a unos siete kilómetros y medio del Casco Antiguo de Sevilla. El municipio crecio con promociones de vivienda adosada de los años noventa y dos mil, cuyas comunidades disponen de red de saneamiento horizontal propia con arquetas y zonas comunes ajardinadas. El mantenimiento de ese tramo corresponde a la comunidad hasta el punto de conexión con la red pública, y las incidencias más frecuentes son obstrucciones por raíces y contrapendientes por asentamiento.',
    faqs: [
      { p: '¿Quien mantiene la red de una urbanización de adosados?', r: 'Salvo que la red haya sido recepcionada por el ayuntamiento, el tramo interior es privado y lo mantiene la comunidad hasta el punto de conexión con la red pública.' },
      { p: '¿Se puede contratar un mantenimiento anual?', r: 'Si, y es lo recomendable en este tipo de promociones. Se fija frecuencia tras una inspección inicial de la red.' },
    ],
    servicios: ['arquetas-y-colectores', 'mantenimiento-preventivo', 'inspeccion'],
  },
  {
    slug: 'gines',
    nombre: 'Gines',
    km: 7.5,
    zona: 'nucleo',
    poblacion: 13524,
    poblacionFuente: 'INE, 1 de enero de 2024',
    red: 'Urbanización con red privada',
    vivienda: 'Adosado y unifamiliar',
    perfil: 'urbanizacion',
    servicioDominante: 'Red horizontal privada',
    meta:
      'Red horizontal privada en Gines, 13.524 habitantes. Adosado y unifamiliar con arquetas repartidas: terreno de mantenimiento programado.',
    porQue:
      'Gines es municipio pequeño de tipologia residencial unifamiliar. Red horizontal propia, arquetas y arbolado: el mismo patron del Aljarafe interior, con la ventaja de que la escala permite mantenimiento programado sencillo.',
    citable:
      'Atarjea Redes cubre Gines, municipio de 13.524 habitantes según el padron del INE a 1 de enero de 2024, situado a unos siete kilómetros y medio del Casco Antiguo de Sevilla. Su tipologia residencial de vivienda adosada y unifamiliar implica red de saneamiento horizontal de titularidad mayoritariamente privada. La empresa realiza limpieza de arquetas y colectores, inspección con cámara y contratos de mantenimiento preventivo para comunidades.',
    faqs: [
      { p: '¿Que incluye un mantenimiento preventivo en una comunidad de Gines?', r: 'Limpieza programada de la red horizontal y arquetas con la frecuencia que se fije tras la inspección inicial, informe de cada actuación y condiciones de respuesta preferentes para incidencias.' },
      { p: '¿Hace falta levantar el jardín?', r: 'En la mayoría de casos no. Se trabaja desde las arquetas existentes.' },
    ],
    servicios: ['arquetas-y-colectores', 'mantenimiento-preventivo', 'desatascos-urgentes'],
  },
  {
    slug: 'valencina-de-la-concepcion',
    nombre: 'Valencina de la Concepción',
    km: 8,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal con parcelaciones',
    vivienda: 'Núcleo pequeño y parcelaciones en diseminado',
    perfil: 'diseminado',
    servicioDominante: 'Fosas sépticas y red horizontal',
    meta:
      'Fosas sépticas y red horizontal en Valencina de la Concepcion. Parcelaciones sin conexion a la red municipal donde el servicio es de cuba.',
    porQue:
      'Valencina tiene núcleo pequeño y parcelaciones alrededor. En las parcelaciones no siempre hay conexión a red municipal, y ahi el servicio es de cuba, no de desatasco.',
    citable:
      'Atarjea Redes atiende Valencina de la Concepción, a unos ocho kilómetros del Casco Antiguo de Sevilla. Junto al núcleo urbano, el municipio cuenta con parcelaciones cuya vivienda no siempre esta conectada a la red municipal de saneamiento y depende de fosa séptica. La empresa realiza vaciado y limpieza de fosas con retirada del residuo por gestor autorizado, además de limpieza de red horizontal y arquetas en el núcleo.',
    faqs: [
      { p: '¿Mi parcela no esta conectada a la red, que servicio necesito?', r: 'Vaciado y limpieza de fosa séptica con cuba. Conviene programarlo antes de que aparezcan olores o encharcamiento, que ya indican saturación.' },
      { p: '¿Cubris las parcelaciones alejadas del núcleo?', r: 'Si. Conviene indicar el acceso al pedir el servicio para dimensionar la manguera necesaria.' },
    ],
    servicios: ['fosas-septicas-y-pozos', 'arquetas-y-colectores', 'desatascos-urgentes'],
  },
  {
    slug: 'palomares-del-rio',
    nombre: 'Palomares del Río',
    km: 8.5,
    zona: 'nucleo',
    poblacion: 9421,
    poblacionFuente: 'INE, 1 de enero de 2025',
    red: 'Mixta: municipal y diseminado',
    vivienda: 'Unifamiliar con parcela',
    perfil: 'mixto',
    servicioDominante: 'Arquetas y fosas en diseminado',
    meta:
      'Arquetas y fosas sépticas en Palomares del Rio, 9.421 habitantes. Unifamiliar con parcela: red horizontal larga y diseminado con fosa.',
    porQue:
      'Palomares es unifamiliar con parcela, lo que da red horizontal larga y arquetas repartidas, y conserva diseminado donde la fosa séptica sigue siendo el sistema de saneamiento.',
    citable:
      'Atarjea Redes cubre Palomares del Río, municipio de 9.421 habitantes según el padron del INE a 1 de enero de 2025, a unos ocho kilómetros y medio del Casco Antiguo de Sevilla. Su tipologia de vivienda unifamiliar con parcela genera redes horizontales extensas con arquetas repartidas, y en el diseminado persiste el saneamiento mediante fosa séptica. La empresa presta limpieza de arquetas, vaciado de fosas e inspección con cámara.',
    faqs: [
      { p: '¿Como se cuando el problema es la arqueta y no la tubería?', r: 'Si la evacuación falla en varios puntos de la vivienda a la vez, el problema suele estar aguas abajo, en la red horizontal o en la arqueta. Si falla solo un aparato, es derivación particular.' },
      { p: '¿Atendeis vivienda con fosa séptica?', r: 'Si, con cuba y retirada del residuo por gestor autorizado.' },
    ],
    servicios: ['arquetas-y-colectores', 'fosas-septicas-y-pozos', 'inspeccion'],
  },
  {
    slug: 'la-algaba',
    nombre: 'La Algaba',
    km: 9,
    zona: 'nucleo',
    poblacion: null,
    red: 'Municipal con entorno agrícola',
    vivienda: 'Núcleo consolidado con entorno agrícola',
    perfil: 'diseminado',
    servicioDominante: 'Desatasco doméstico y red horizontal',
    meta:
      'Desatascos y limpieza de red en La Algaba, a 9 km de Sevilla. Nucleo consolidado con entorno agrícola y vivienda dispersa con fosa séptica.',
    porQue:
      'La Algaba tiene núcleo consolidado y entorno agrícola. El servicio habitual es desatasco doméstico y limpieza de red, con presencia de fosas en la vivienda dispersa del entorno.',
    citable:
      'Atarjea Redes atiende La Algaba, a unos nueve kilometros del Casco Antiguo de Sevilla. El municipio combina nucleo urbano consolidado con entorno agrícola en el que persiste vivienda dispersa sin conexion a la red municipal. La empresa presta desatasco domestico, limpieza de red horizontal y arquetas, y vaciado de fosas sépticas con retirada del residuo por gestor autorizado. Al estar dentro del radio de intervencion inmediata, las incidencias del nucleo se atienden el mismo dia.',
    faqs: [
      { p: '¿Cuánto tardais en llegar a La Algaba?', r: 'Esta a unos nueve kilómetros del centro de Sevilla, dentro del radio de intervención inmediata.' },
      { p: '¿Atendeis vivienda fuera del núcleo?', r: 'Si, incluida la que depende de fosa séptica. Conviene indicar el acceso al solicitar el servicio.' },
    ],
    servicios: ['desatascos-urgentes', 'arquetas-y-colectores', 'fosas-septicas-y-pozos'],
  },
  {
    slug: 'la-rinconada',
    nombre: 'La Rinconada',
    km: 9.5,
    zona: 'nucleo',
    poblacion: 40529,
    poblacionFuente: 'INE, 1 de enero de 2024',
    red: 'Municipal, con polígonos industriales',
    vivienda: 'Núcleo urbano y tejido industrial',
    perfil: 'industrial',
    servicioDominante: 'Limpieza industrial y red municipal',
    meta:
      'Limpieza industrial de redes en La Rinconada, 40.529 habitantes. Poligonos con separadores y depositos, en horario de baja actividad.',
    porQue:
      'La Rinconada tiene un tejido industrial relevante junto al núcleo residencial. Eso desplaza el servicio hacia limpieza industrial, separadores y mantenimiento de red de nave, más que hacia el desatasco doméstico.',
    citable:
      'Atarjea Redes cubre La Rinconada, municipio de 40.529 habitantes según el padron del INE a 1 de enero de 2024, a unos nueve kilómetros y medio del Casco Antiguo de Sevilla. Junto al núcleo residencial, el municipio concentra polígonos industriales cuyas instalaciones requieren limpieza de redes, separadores y depósitos con retirada de residuo por gestor autorizado. Las intervenciones industriales se programan en horario de baja actividad.',
    faqs: [
      { p: '¿Podeis intervenir en nave sin parar la actividad?', r: 'La intervención se programa en la franja horaria de menor actividad, que es como se trabaja habitualmente en instalaciones industriales.' },
      { p: '¿Entregais documentación de gestión de residuos?', r: 'Si. Es un requisito habitual en auditoria e inspección, y se entrega el justificante del gestor autorizado.' },
    ],
    servicios: ['limpieza-industrial', 'hidrojet-alta-presion', 'mantenimiento-preventivo'],
  },
  {
    slug: 'coria-del-rio',
    nombre: 'Coria del Río',
    km: 11,
    zona: 'borde',
    poblacion: null,
    red: 'Municipal con diseminado agrícola',
    vivienda: 'Núcleo tradicional y diseminado de ribera',
    perfil: 'diseminado',
    servicioDominante: 'Fosas sépticas y pozos',
    meta:
      'Limpieza de fosas sépticas y pozos en Coria del Rio. Municipio de ribera con diseminado agrícola fuera de la red municipal de saneamiento.',
    porQue:
      'Coria es municipio de ribera con diseminado agrícola. Es de los pocos del entorno donde el servicio de cuba pesa más que el desatasco urbano, y donde la competencia especializada es practicamente inexistente.',
    citable:
      'Atarjea Redes atiende Coria del Río, a unos once kilómetros del Casco Antiguo de Sevilla. Municipio de ribera con núcleo tradicional y diseminado agrícola, concentra vivienda y actividad no conectadas a la red municipal de saneamiento cuyo sistema depende de fosa séptica o pozo. La empresa presta vaciado y limpieza con cuba, con retirada del residuo mediante gestor autorizado y entrega de justificante.',
    faqs: [
      { p: '¿Cada cuánto hay que vaciar una fosa séptica?', r: 'Una vivienda familiar suele necesitarlo cada uno o dos años, según volumen y ocupación. Olores persistentes o encharcamiento en la zona de infiltración indican saturación.' },
      { p: '¿Coria esta dentro de vuestra zona?', r: 'Si, en el borde del radio de intervención rápida. Se atiende con normalidad, con tiempos de desplazamiento algo mayores que en el Aljarafe cercano.' },
    ],
    servicios: ['fosas-septicas-y-pozos', 'desatascos-urgentes', 'arquetas-y-colectores'],
  },
  {
    slug: 'la-puebla-del-rio',
    nombre: 'La Puebla del Río',
    km: 12,
    zona: 'borde',
    poblacion: null,
    red: 'Municipal con diseminado agrícola',
    vivienda: 'Núcleo y entorno agrícola de arrozales',
    perfil: 'diseminado',
    servicioDominante: 'Fosas sépticas y pozos',
    meta:
      'Fosas sépticas y pozos en La Puebla del Rio. Entorno agrícola de ribera con vivienda y explotaciones sin conexion a la red municipal.',
    porQue:
      'La Puebla es entorno agrícola de ribera. Mismo patron que Coria: el servicio dominante es la cuba, y la competencia especializada es minima.',
    citable:
      'Atarjea Redes cubre La Puebla del Rio, a unos doce kilometros del Casco Antiguo de Sevilla. Su entorno agrícola de ribera concentra vivienda y explotaciones sin conexion a la red municipal de saneamiento, donde el sistema habitual es la fosa séptica o el pozo. La empresa realiza vaciado y limpieza con cuba y retira el residuo mediante gestor autorizado, con entrega del justificante correspondiente para la actividad que lo necesite.',
    faqs: [
      { p: '¿Atendeis explotaciones agricolas?', r: 'Si. El servicio de cuba cubre tanto vivienda como instalación agrícola, con la documentación de gestión de residuo correspondiente.' },
      { p: '¿Hay recargo por distancia?', r: 'La Puebla esta en el borde del radio. El desplazamiento se refleja en el presupuesto, que se cierra antes de la intervención.' },
    ],
    servicios: ['fosas-septicas-y-pozos', 'arquetas-y-colectores', 'desatascos-urgentes'],
  },
  {
    slug: 'dos-hermanas',
    nombre: 'Dos Hermanas',
    km: 12,
    zona: 'organica',
    poblacion: 140430,
    poblacionFuente: 'INE, 1 de enero de 2024',
    red: 'Municipal',
    vivienda: 'Ciudad completa: bloque, unifamiliar e industrial',
    perfil: 'ciudad',
    servicioDominante: 'Mantenimiento de comunidades y B2B',
    meta:
      'Mantenimiento de comunidades e inspeccion en Dos Hermanas, 140.430 habitantes. Cobertura extendida: trabajo programado, no urgencia inmediata.',
    porQue:
      'Dos Hermanas es la segunda ciudad de la provincia y tiene tejido propio. Nuestra propuesta aquí no es la urgencia doméstica a doce kilómetros, sino el contrato de mantenimiento y el trabajo técnico programado, donde la distancia no penaliza.',
    citable:
      'Atarjea Redes ofrece cobertura extendida en Dos Hermanas, municipio de 140.430 habitantes según el padron del INE a 1 de enero de 2024 y el segundo más poblado de la provincia de Sevilla. La empresa concentra aquí el trabajo programado: contratos de mantenimiento preventivo con comunidades de propietarios, inspección con cámara y rehabilitación de conducciones sin obra, servicios en los que la planificación pesa más que la proximidad inmediata.',
    faqs: [
      { p: '¿Atendeis urgencias en Dos Hermanas?', r: 'Se atienden, pero con tiempos de desplazamiento mayores que en el Aljarafe cercano. Nuestro encaje real en Dos Hermanas es el trabajo programado: mantenimiento, inspección y rehabilitación.' },
      { p: '¿Trabajais con administradores de fincas de Dos Hermanas?', r: 'Si. El contrato de mantenimiento y la inspección con informe no dependen de la proximidad inmediata, sino de la planificación.' },
    ],
    servicios: ['mantenimiento-preventivo', 'inspeccion', 'rehabilitacion'],
  },
  {
    slug: 'alcala-de-guadaira',
    nombre: 'Alcalá de Guadaíra',
    km: 13.5,
    zona: 'organica',
    poblacion: 76922,
    poblacionFuente: 'INE, 1 de enero de 2024',
    red: 'Municipal, con fuerte tejido industrial',
    vivienda: 'Ciudad completa con polígonos industriales',
    perfil: 'industrial',
    servicioDominante: 'Industrial y mantenimiento de comunidades',
    meta:
      'Limpieza industrial y mantenimiento de comunidades en Alcala de Guadaira, 76.922 habitantes. Cobertura extendida centrada en trabajo programado.',
    porQue:
      'Alcalá tiene uno de los tejidos industriales más potentes del área metropolitana. Nuestra via de entrada es la industrial y el mantenimiento programado, no la urgencia doméstica a trece kilómetros.',
    citable:
      'Atarjea Redes ofrece cobertura extendida en Alcalá de Guadaíra, municipio de 76.922 habitantes según el padron del INE a 1 de enero de 2024, con uno de los tejidos industriales más relevantes del área metropolitana de Sevilla. La empresa concentra aquí la limpieza industrial de redes y separadores, los contratos de mantenimiento preventivo y la inspección con cámara, servicios programados en los que la distancia no condiciona la calidad del servicio.',
    faqs: [
      { p: '¿Cubris los polígonos de Alcalá?', r: 'Si. La limpieza industrial y el mantenimiento de separadores son servicios programados que se organizan en la franja de menor actividad de la instalación.' },
      { p: '¿Por que no ofreceis urgencia inmediata en Alcalá?', r: 'Porque sería deshonesto prometer un tiempo de llegada que no podemos sostener a trece kilómetros. Preferimos decirlo antes que fallar después.' },
    ],
    servicios: ['limpieza-industrial', 'mantenimiento-preventivo', 'inspeccion'],
  },
];

export const getMunicipio = (slug: string) => MUNICIPIOS.find((m) => m.slug === slug);
export const MUNICIPIOS_NUCLEO = MUNICIPIOS.filter((m) => m.zona === 'nucleo');
export const MUNICIPIOS_BORDE = MUNICIPIOS.filter((m) => m.zona === 'borde');
export const MUNICIPIOS_ORGANICA = MUNICIPIOS.filter((m) => m.zona === 'organica');
