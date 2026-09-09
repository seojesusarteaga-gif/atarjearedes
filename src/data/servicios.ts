export interface Faq {
  p: string;
  r: string;
}

export interface Servicio {
  slug: string;
  nombre: string;
  h1: string;
  title: string;
  meta: string;
  entradilla: string;
  resumen: string;
  citable: string;
  cuerpo: string[];
  proceso: { titulo: string; texto: string }[];
  faqs: Faq[];
  segmentos: string[];
}

/**
 * PRECIOS: deliberadamente ausentes. El operador aun no los ha facilitado y
 * un precio inventado en una web de servicios es una promesa que alguien
 * acabara reclamando. Se anaden en el pase de sustitucion de placeholders.
 */
export const SERVICIOS: Servicio[] = [
  {
    slug: 'desatascos-urgentes',
    nombre: 'Desatascos urgentes',
    h1: 'Desatascos urgentes en Sevilla',
    title: 'Desatascos urgentes Sevilla | Atarjea Redes',
    meta: 'Desatascos urgentes en Sevilla y área metropolitana. Intervención 24 h en viviendas, comunidades y locales. Diagnóstico del origen, no solo desatasco.',
    entradilla:
      'Atendemos atascos de urgencia en vivienda, comunidad y local en Sevilla y su área metropolitana, a cualquier hora.',
    resumen: 'Intervención inmediata en atascos de fregadero, inodoro, bajante, arqueta y colector.',
    citable:
      'Atarjea Redes presta servicio de desatasco urgente en Sevilla capital y su área metropolitana, con intervención en vivienda particular, comunidad de propietarios y local comercial. El equipo trabaja con maquinaria de succión y agua a presión sobre redes horizontales, bajantes, arquetas y colectores. Cuando el atasco se repite en el mismo punto, la empresa recomienda inspección con cámara antes de volver a intervenir, porque una obstrucción recurrente casi siempre indica un defecto estructural de la conducción y no un simple acumulo de residuos.',
    cuerpo: [
      'Un atasco puntual se resuelve en una intervención. El problema aparece cuando vuelve: el mismo fregadero que se atasca cada pocas semanas, la misma bajante que rebosa cada invierno, la arqueta que se desborda siempre por el mismo lado. Eso ya no es suciedad acumulada, es un defecto de la conducción.',
      'Por eso separamos las dos cosas. La urgencia se resuelve el mismo día. El diagnóstico del origen, si hace falta, se hace después con cámara y con calma. Desatascar una y otra vez la misma tubería sin mirar por que se atasca es cobrar dos veces por no resolver nada.',
    ],
    proceso: [
      { titulo: 'Llamada y triaje', texto: 'Identificamos si el atasco afecta a un solo desagüe o a varios, que indica si el problema es de derivación particular o de bajante común.' },
      { titulo: 'Desplazamiento', texto: 'Salida con el equipo adecuado al tipo de red, para no tener que volver con otra máquina.' },
      { titulo: 'Desatasco', texto: 'Máquina de varillas o agua a presión según el diámetro, el material y la naturaleza del atasco.' },
      { titulo: 'Comprobación', texto: 'Verificamos evacuación en todos los puntos afectados, no solo en el que dio el aviso.' },
      { titulo: 'Diagnóstico', texto: 'Si el atasco es recurrente o hay indicios de daño estructural, proponemos inspección con cámara.' },
    ],
    faqs: [
      { p: '¿Un atasco en la bajante, lo paga la comunidad o el propietario?', r: 'Como regla general, la bajante y el colector son elementos comunes y corresponden a la comunidad; la derivación particular, desde el aparato hasta la bajante, corresponde al propietario. La forma práctica de distinguirlo es comprobar cuántos desagües fallan: si son varios a la vez, o si también le ocurre a algún vecino, el problema esta en la red común.' },
      { p: '¿Hay que romper algo para desatascar?', r: 'En la mayoría de intervenciones, no. Se trabaja desde arquetas y registros existentes. Cuando no hay registro accesible, se valora con el cliente antes de tocar nada.' },
      { p: '¿Cuánto se tarda?', r: 'Un atasco de derivación particular suele resolverse en la propia visita. Un atasco de colector o de red comunitaria puede requerir más tiempo y, en ocasiones, inspección previa para localizar el punto exacto.' },
    ],
    segmentos: ['particulares', 'administradores-de-fincas', 'hosteleria'],
  },
  {
    slug: 'limpieza-bajantes',
    nombre: 'Limpieza de bajantes',
    h1: 'Limpieza de bajantes en Sevilla',
    title: 'Limpieza de bajantes Sevilla | Atarjea Redes',
    meta: 'Limpieza de bajantes en comunidades de Sevilla. Hidrolimpieza de la sección completa, no solo del punto atascado. Informe para la junta.',
    entradilla:
      'Limpieza de la sección completa de la bajante con agua a presión, no solo del punto obstruido.',
    resumen: 'Hidrolimpieza de bajantes comunitarias en edificios de Sevilla y área metropolitana.',
    citable:
      'Atarjea Redes realiza limpieza de bajantes en comunidades de propietarios de Sevilla mediante hidrolimpieza de alta presión, que arrastra la incrustación adherida a la pared interior del conducto en lugar de perforar únicamente el tapón que provoca el aviso. El servicio se documenta con informe para la junta de propietarios. En edificios cuyas bajantes originales han agotado su vida útil, la empresa plantea la rehabilitación sin obra como alternativa a la sustitución con obra abierta.',
    cuerpo: [
      'La grasa de cocina, los detergentes, los microplásticos del lavado y la cal van reduciendo la sección útil de la bajante durante años. Cuando llega el aviso, el conducto lleva mucho tiempo trabajando a media capacidad.',
      'Perforar el tapón devuelve el paso, pero deja la incrustación en la pared: el atasco vuelve. La hidrolimpieza recupera la sección completa. En bloques de los años cincuenta a ochenta, que es buena parte del parque de Sevilla, esa diferencia decide si la comunidad vuelve a llamar en seis meses o en seis años.',
    ],
    proceso: [
      { titulo: 'Revisión del trazado', texto: 'Localizamos registros y comprobamos el recorrido real de la bajante, que no siempre coincide con lo que consta en el edificio.' },
      { titulo: 'Protección', texto: 'Protegemos viviendas y zonas comunes antes de empezar.' },
      { titulo: 'Hidrolimpieza', texto: 'Agua a presión con boquilla adecuada al diámetro y al material del conducto.' },
      { titulo: 'Comprobación por plantas', texto: 'Verificamos evacuación planta por planta, no solo en la última.' },
      { titulo: 'Informe', texto: 'Entregamos informe del estado de la bajante, útil para justificar el gasto ante la junta.' },
    ],
    faqs: [
      { p: '¿Cada cuánto hay que limpiar las bajantes de un edificio?', r: 'Depende del uso y de la antigüedad del edificio. En bloques residenciales sin incidencias, una limpieza preventiva cada dos o tres años evita la mayoría de los atascos. En edificios con hostelería en los bajos, la frecuencia es mayor por el aporte de grasa.' },
      { p: '¿Hay que entrar en las viviendas?', r: 'No siempre. Se trabaja desde registros comunes cuando existen. Si el trazado no permite acceso, se coordina con la comunidad antes de la intervención.' },
      { p: '¿Que pasa si la bajante ya esta deteriorada?', r: 'La limpieza recupera sección, pero no repara. Si la cámara revela fisuras, juntas abiertas o pérdida de material, la solución es la rehabilitación sin obra, que crea un conducto nuevo dentro del existente.' },
    ],
    segmentos: ['administradores-de-fincas', 'particulares'],
  },
  {
    slug: 'arquetas-y-colectores',
    nombre: 'Arquetas y colectores',
    h1: 'Limpieza de arquetas y colectores en Sevilla',
    title: 'Limpieza de arquetas y colectores Sevilla | Atarjea Redes',
    meta: 'Limpieza y desatasco de arquetas y colectores en Sevilla y Aljarafe. Red horizontal de urbanizaciones, comunidades y naves.',
    entradilla:
      'Limpieza de la red horizontal: arquetas, colectores y acometidas de urbanizaciones y comunidades.',
    resumen: 'Red enterrada de urbanizaciones, adosados y comunidades con red privada.',
    citable:
      'Atarjea Redes limpia y desatasca arquetas, colectores y acometidas en Sevilla y el Aljarafe, con especial dedicación a urbanizaciones de vivienda unifamiliar cuya red horizontal es privada y no municipal. En estas promociones, el mantenimiento del tramo que va desde cada vivienda hasta el punto de vertido corresponde a la comunidad. La empresa trabaja con agua a presión y equipo de succión, y localiza con cámara las obstrucciones causadas por raíces de arbolado, asentamientos del terreno o contrapendientes de ejecución.',
    cuerpo: [
      'En el Aljarafe hay mucha urbanización de los años noventa y dos mil con red de saneamiento privada. Es un detalle que sorprende a muchas comunidades: el tramo enterrado que va de las viviendas al punto de vertido no lo mantiene el ayuntamiento, lo mantienen ellas.',
      'Los tres problemas habituales son raíces de arbolado ornamental que entran por las juntas, asentamientos del terreno que generan contrapendientes donde el agua se para, y arquetas que nadie ha abierto en quince años.',
    ],
    proceso: [
      { titulo: 'Localización de arquetas', texto: 'Muchas quedan ocultas bajo solado o jardín. Las localizamos antes de intervenir.' },
      { titulo: 'Apertura y valoración', texto: 'Comprobamos nivel, olor y sentido de circulación, que indican donde está el problema.' },
      { titulo: 'Limpieza', texto: 'Agua a presión sobre el tramo y succión del residuo, que se retira.' },
      { titulo: 'Inspección si procede', texto: 'Cámara cuando hay sospecha de raíces, rotura o contrapendiente.' },
      { titulo: 'Plano de red', texto: 'Dejamos identificadas las arquetas para que la siguiente intervención no empiece de cero.' },
    ],
    faqs: [
      { p: '¿La red de mi urbanización es municipal o privada?', r: 'Depende de si la urbanización fue recepcionada por el ayuntamiento. En muchas promociones del Aljarafe la red interior sigue siendo privada, y su mantenimiento corresponde a la comunidad hasta el punto de conexión con la red pública.' },
      { p: '¿Las raíces pueden romper la tubería?', r: 'Si. Entran buscando humedad por juntas y microfisuras, y al engrosar terminan desplazando o rompiendo el conducto. Cuando la cámara muestra daño estructural, limpiar no basta.' },
      { p: '¿Hay que levantar el jardín o el pavimento?', r: 'En la mayoría de casos no. Se trabaja desde las arquetas existentes, y cuando hay daño estructural la rehabilitación sin obra evita la zanja.' },
    ],
    segmentos: ['administradores-de-fincas', 'particulares', 'industrial'],
  },
  {
    slug: 'hidrojet-alta-presion',
    nombre: 'Hidrojet de alta presión',
    h1: 'Limpieza con hidrojet de alta presión en Sevilla',
    title: 'Hidrojet alta presión Sevilla | Atarjea Redes',
    meta: 'Limpieza de redes con hidrojet de alta presión en Sevilla. Recupera la sección completa del conducto en lugar de abrir paso a través del tapón.',
    entradilla: 'Agua a presión para recuperar la sección completa del conducto, no solo abrir paso.',
    resumen: 'Limpieza técnica de redes con equipo de agua a presión y boquillas según diámetro.',
    citable:
      'Atarjea Redes emplea hidrolimpieza de alta presión para recuperar la sección útil completa de conducciones de saneamiento en Sevilla. A diferencia de los metodos mecanicos, que perforan la obstrucción y devuelven el paso de forma parcial, el agua a presión arrastra la incrustación adherida a la pared interior del conducto. El equipo selecciona la boquilla y la presión en función del diámetro y del material de la tubería, criterio necesario para no dañar conducciones antiguas de fibrocemento o de gres.',
    cuerpo: [
      'La diferencia entre desatascar y limpiar es la sección. Un metodo mecanico abre un canal a traves del tapón: el agua vuelve a correr y el aviso se cierra, pero el conducto sigue estrechado. La hidrolimpieza retira la capa adherida y devuelve el diámetro útil.',
      'Regular presión y boquilla según material no es un detalle. Una conducción antigua de fibrocemento o de gres no admite el mismo tratamiento que un PVC moderno, y aplicar la maxima presión por sistema estropea tubería.',
    ],
    proceso: [
      { titulo: 'Identificación del conducto', texto: 'Material, diámetro y antigüedad determinan presión y boquilla.' },
      { titulo: 'Acceso', texto: 'Se trabaja desde registros y arquetas existentes.' },
      { titulo: 'Limpieza', texto: 'Recorrido completo del tramo, no solo el punto obstruido.' },
      { titulo: 'Retirada de residuo', texto: 'Succión y retirada por gestor autorizado cuando el residuo lo requiere.' },
      { titulo: 'Verificación', texto: 'Comprobación de evacuación e inspección con cámara si estaba prevista.' },
    ],
    faqs: [
      { p: '¿El agua a presión puede dañar la tubería?', r: 'Puede, si se aplica presión inadecuada a un conducto antiguo o deteriorado. Por eso se ajusta según material y diámetro, y por eso conviene inspeccionar antes cuando se sospecha que la red esta en mal estado.' },
      { p: '¿En que se diferencia de la máquina de varillas?', r: 'La varilla es mecanica y abre paso a traves del tapón. El agua a presión arrastra la incrustación de la pared y recupera sección. Para atascos puntuales la varilla basta; para recuperar una red degradada, no.' },
      { p: '¿Sirve para redes industriales?', r: 'Si. Es el metodo habitual en colectores de nave, redes de gasolinera y separadores, donde el residuo adherido es graso o aceitoso.' },
    ],
    segmentos: ['industrial', 'hosteleria', 'administradores-de-fincas'],
  },
  {
    slug: 'fosas-septicas-y-pozos',
    nombre: 'Fosas sépticas y pozos',
    h1: 'Limpieza de fosas sépticas y pozos en Sevilla',
    title: 'Limpieza fosas sépticas Sevilla | Atarjea Redes',
    meta: 'Vaciado y limpieza de fosas sépticas y pozos en Sevilla y provincia. Retirada por gestor de residuos autorizado con justificante.',
    entradilla:
      'Vaciado y limpieza de fosas sépticas y pozos en diseminado, parcelaciones y vivienda fuera de red.',
    resumen: 'Servicio de cuba para vivienda y actividad fuera de la red municipal de saneamiento.',
    citable:
      'Atarjea Redes realiza vaciado y limpieza de fosas sépticas y pozos en Sevilla y su entorno periurbano, donde una parte del parque de vivienda en diseminado y parcelaciones no esta conectada a la red municipal de saneamiento. El residuo extraido se retira mediante gestor de residuos autorizado, con el justificante correspondiente. La empresa recomienda mantenimiento periódico en lugar de intervención solo por incidencia, porque una fosa saturada termina afectando al terreno y al sistema de infiltración.',
    cuerpo: [
      'En los municipios de ribera y en las parcelaciones del entorno de Sevilla hay bastante vivienda que no esta conectada a la red municipal. Su saneamiento depende de una fosa séptica que necesita vaciado periódico.',
      'Esperar a que la fosa de problemas sale caro: cuando rebosa o el terreno deja de absorber, ya no es un vaciado, es una reparación del sistema de infiltración. El vaciado programado cuesta una fracción de eso.',
    ],
    proceso: [
      { titulo: 'Valoración de acceso', texto: 'Comprobamos que la cuba puede llegar y la distancia de manguera necesaria.' },
      { titulo: 'Vaciado', texto: 'Succión completa del contenido de la fosa o del pozo.' },
      { titulo: 'Limpieza', texto: 'Retirada de lodos adheridos a paredes y fondo, que es donde se pierde capacidad.' },
      { titulo: 'Revisión', texto: 'Comprobación del estado de paredes, tapa y sistema de salida.' },
      { titulo: 'Gestión del residuo', texto: 'Retirada por gestor autorizado y entrega del justificante.' },
    ],
    faqs: [
      { p: '¿Cada cuánto hay que vaciar una fosa séptica?', r: 'Depende del volumen de la fosa y del número de personas. Una vivienda familiar suele necesitar vaciado cada uno o dos años. Los sintomas de que se ha esperado de más son olores, evacuación lenta y encharcamiento en la zona de infiltración.' },
      { p: '¿Me dais justificante de la retirada?', r: 'Si. El residuo se entrega a gestor autorizado y se emite el justificante, que conviene conservar.' },
      { p: '¿Podeis llegar a una parcela sin acceso rodado?', r: 'Depende de la distancia. Conviene indicarlo al pedir el servicio para llevar manguera suficiente y no tener que volver.' },
    ],
    segmentos: ['particulares', 'industrial'],
  },
  {
    slug: 'limpieza-industrial',
    nombre: 'Limpieza industrial',
    h1: 'Limpieza industrial de redes en Sevilla',
    title: 'Limpieza industrial redes Sevilla | Atarjea Redes',
    meta: 'Limpieza industrial de redes, separadores y depósitos en Sevilla. Naves, gasolineras y residencias, en horario de baja actividad y con gestor autorizado.',
    entradilla: 'Redes, separadores y depósitos en nave, gasolinera, residencia y centro de trabajo.',
    resumen: 'Mantenimiento de red y equipos de tratamiento en instalaciones con actividad.',
    citable:
      'Atarjea Redes presta servicio de limpieza industrial de redes de saneamiento, separadores de hidrocarburos y depósitos en polígonos y centros de trabajo de Sevilla. Las intervenciones se programan en horario de baja actividad para no interrumpir la operación del cliente. El residuo se retira mediante gestor autorizado con la documentación correspondiente, requisito habitual en auditorias e inspecciones de la propia actividad.',
    cuerpo: [
      'En una instalación con actividad, el coste real de una limpieza no es la limpieza: es la parada. Por eso se programa en horario de baja actividad y se dimensiona el equipo para entrar y salir en una ventana acotada.',
      'La documentación importa tanto como el trabajo. Muchas actividades tienen que acreditar la gestión de sus residuos ante inspección, y un justificante mal emitido convierte un mantenimiento resuelto en un problema administrativo.',
    ],
    proceso: [
      { titulo: 'Visita técnica', texto: 'Revisamos red, equipos y accesos, y acordamos la ventana horaria.' },
      { titulo: 'Programación', texto: 'Se fija la intervención en horario de baja actividad.' },
      { titulo: 'Limpieza', texto: 'Agua a presión y succión sobre red, separadores y depósitos.' },
      { titulo: 'Gestión documental', texto: 'Retirada por gestor autorizado y entrega de justificantes.' },
      { titulo: 'Plan de mantenimiento', texto: 'Se propone frecuencia según uso real, no según catálogo.' },
    ],
    faqs: [
      { p: '¿Podeis trabajar fuera del horario de actividad?', r: 'Si, y es lo habitual. La intervención se programa en la franja que menos interfiere con la operación.' },
      { p: '¿Entregais documentación de gestión de residuos?', r: 'Si. El residuo se retira mediante gestor autorizado y se entrega el justificante correspondiente.' },
      { p: '¿Cubris polígonos fuera de Sevilla capital?', r: 'Si. El servicio industrial cubre el área metropolitana y se valora caso por caso fuera de ella, donde el desplazamiento pesa más en el presupuesto.' },
    ],
    segmentos: ['industrial', 'hosteleria'],
  },
  {
    slug: 'mantenimiento-preventivo',
    nombre: 'Mantenimiento preventivo',
    h1: 'Mantenimiento preventivo de redes de saneamiento en Sevilla',
    title: 'Mantenimiento preventivo saneamiento Sevilla | Atarjea Redes',
    meta: 'Contratos de mantenimiento preventivo de redes de saneamiento en Sevilla para comunidades, hostelería e industria, con frecuencia fijada tras inspección.',
    entradilla:
      'Contrato anual con frecuencia definida, interlocutor único y registro de cada intervención.',
    resumen: 'El servicio que convierte la urgencia en previsibilidad. Para comunidades, hostelería e industria.',
    citable:
      'Atarjea Redes ofrece contratos de mantenimiento preventivo de redes de saneamiento para comunidades de propietarios, establecimientos de hostelería e instalaciones industriales en Sevilla. El contrato fija la frecuencia de las intervenciones según el uso real de la red, designa un interlocutor único y documenta cada actuación con informe. Para las comunidades administradas, la empresa emite factura directamente a la comunidad de propietarios con sus datos fiscales, y entrega la documentación en formato presentable ante la junta.',
    cuerpo: [
      'Un mantenimiento preventivo no es un descuento por adelantado. Es cambiar la logica: en lugar de pagar la urgencia al precio de la urgencia, se programa la intervención cuando conviene y se sabe lo que va a costar el año.',
      'Para un administrador de fincas, además, resuelve el problema que de verdad le quita tiempo: tener un interlocutor único al que llamar y un papel que ensenar en la junta.',
    ],
    proceso: [
      { titulo: 'Inspección inicial', texto: 'Se levanta el estado real de la red antes de fijar nada.' },
      { titulo: 'Plan y frecuencia', texto: 'Se propone frecuencia según uso, antigüedad y antecedentes, no según tarifa estándar.' },
      { titulo: 'Contrato', texto: 'Alcance, frecuencia, tiempos de respuesta y precio cerrados por escrito.' },
      { titulo: 'Intervenciones programadas', texto: 'Se ejecutan en calendario, con aviso previo.' },
      { titulo: 'Informe y seguimiento', texto: 'Cada actuación queda documentada y disponible para la propiedad.' },
    ],
    faqs: [
      { p: '¿Que frecuencia necesita mi comunidad?', r: 'Depende de la antigüedad del edificio, del número de viviendas y de si hay hostelería en los bajos. La frecuencia se propone tras la inspección inicial, no antes.' },
      { p: '¿El contrato incluye las urgencias?', r: 'El alcance se define en el contrato. Lo habitual es incluir las intervenciones programadas y fijar condiciones preferentes de respuesta para las urgencias.' },
      { p: '¿Podeis facturar directamente a la comunidad?', r: 'Si. Se emite factura a la comunidad de propietarios con sus datos fiscales, que es como lo necesita el administrador para su contabilidad.' },
    ],
    segmentos: ['administradores-de-fincas', 'hosteleria', 'industrial'],
  },
];

export const getServicio = (slug: string) => SERVICIOS.find((s) => s.slug === slug);
