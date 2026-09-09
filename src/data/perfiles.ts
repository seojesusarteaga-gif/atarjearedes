/**
 * Perfiles de red de saneamiento.
 *
 * Los municipios se agrupan por el tipo de red que tienen, que es la
 * clasificacion del eje 1 del Bloque 7 de la auditoria. Cada perfil aporta
 * contenido tecnico que es cierto para ese tipo de red, sin inventar datos
 * concretos de cada pueblo.
 *
 * Es la forma honesta de dar profundidad a las paginas municipales mientras
 * siguen pendientes las poblaciones del INE y la confirmacion del operador
 * sobre a que municipios manda cuba.
 */

export type Perfil =
  | 'bloque-antiguo'
  | 'urbanizacion'
  | 'mixto'
  | 'diseminado'
  | 'industrial'
  | 'ciudad';

export interface ContenidoPerfil {
  titulo: string;
  intro: string;
  fallos: { que: string; por: string }[];
  enfoque: string;
  /** Claves de src/data/articulos.ts: el blog debe recibir enlaces, no solo darlos. */
  articulos: string[];
}

export const PERFILES: Record<Perfil, ContenidoPerfil> = {
  'bloque-antiguo': {
    titulo: 'Qué falla en un parque de bloque antiguo',
    intro:
      'La edificación en bloque construida entre los años cincuenta y ochenta comparte un problema de fondo: las bajantes originales llevan cinco o seis décadas en servicio y han ido perdiendo sección por dentro. La grasa de cocina, los detergentes, los microplásticos del lavado y la cal forman una capa adherida a la pared del conducto que reduce el diámetro útil de forma gradual y silenciosa.',
    fallos: [
      {
        que: 'El atasco vuelve cada pocos meses',
        por: 'Se ha perforado el tapón pero no se ha retirado la incrustación de la pared. La sección sigue reducida y el conducto vuelve a cerrarse.',
      },
      {
        que: 'Sube agua por un desagüe al usar otro',
        por: 'La obstrucción está en la bajante o en el colector, y el agua busca la salida más baja de la columna. No es un atasco de vivienda.',
      },
      {
        que: 'Olor persistente que cambia de estancia',
        por: 'Suele indicar ventilación de la bajante obstruida en cubierta: la depresión vacía los sifones de las viviendas.',
      },
      {
        que: 'Humedad en el techo del vecino de abajo',
        por: 'Fisura o junta abierta en la bajante. Aquí ya no basta con limpiar: la conducción ha perdido integridad.',
      },
    ],
    enfoque:
      'En este parque el trabajo útil es la limpieza de la sección completa con agua a presión, no el desatasco puntual, y la inspección con cámara cuando la incidencia se repite. Si la cámara revela fisuras o pérdida de material, la rehabilitación sin obra evita picar en las viviendas.',
    articulos: ['vater', 'olor', 'bajante'],
  },

  urbanizacion: {
    titulo: 'Qué falla en una urbanización con red privada',
    intro:
      'Las promociones de vivienda adosada y unifamiliar de los años noventa y dos mil suelen conservar red de saneamiento privada: el tramo que va desde las viviendas hasta el punto de conexión con la red pública lo mantiene la comunidad, no el ayuntamiento. Es un detalle que sorprende a muchas comunidades el día que hay un problema.',
    fallos: [
      {
        que: 'Raíces dentro del conducto',
        por: 'El arbolado ornamental busca la humedad de las juntas. Entra por una fisura mínima y, al engrosar, ocupa la tubería desde dentro.',
      },
      {
        que: 'Un tramo donde el agua se queda parada',
        por: 'Contrapendiente por asentamiento del terreno. El conducto ha dejado de caer y deposita ahí todo lo que arrastra.',
      },
      {
        que: 'Arquetas que nadie ha abierto en años',
        por: 'En una urbanización, nadie levanta una arqueta si no hay incidencia. Es habitual encontrar sedimento de una década.',
      },
      {
        que: 'Encharcamiento en zonas comunes con lluvia fuerte',
        por: 'La red evacúa lo justo con caudal normal. Cuando llega una tormenta, no da abasto.',
      },
    ],
    enfoque:
      'Aquí el trabajo es sobre la red horizontal enterrada, no sobre bajantes. Localizar todas las arquetas, limpiar el tramo completo e inspeccionar con cámara donde haya sospecha de raíz o de tramo hundido. Es también el escenario donde más rentabilidad tiene el mantenimiento programado, porque la revisión anual cuesta una fracción de la urgencia en plena tormenta.',
    articulos: ['arquetas', 'vater'],
  },

  mixto: {
    titulo: 'Qué falla cuando conviven bloque y urbanización',
    intro:
      'En municipios con las dos tipologías, el mismo síntoma tiene causas distintas según dónde viva quien llama. Confundirlas es la razón habitual de que una intervención no resuelva: se manda el equipo equivocado al problema equivocado.',
    fallos: [
      {
        que: 'En bloque: la bajante comunitaria',
        por: 'Conducto vertical compartido con la sección reducida por incrustación. Se resuelve con hidrolimpieza de la bajante completa.',
      },
      {
        que: 'En urbanización: la red horizontal',
        por: 'Tramo enterrado privado con arquetas, raíces y posibles contrapendientes. Otro planteamiento y otra maquinaria.',
      },
      {
        que: 'En ambas: quién es el responsable',
        por: 'La bajante y el colector son elementos comunes; la derivación particular es del propietario. La forma práctica de saberlo es contar cuántos desagües fallan.',
      },
    ],
    enfoque:
      'La primera pregunta al recibir el aviso no es qué se ha atascado, sino qué tipo de edificación es y cuántos puntos fallan. Eso decide el equipo que sale y evita una segunda visita.',
    articulos: ['arquetas', 'vater', 'bajante'],
  },

  diseminado: {
    titulo: 'Qué falla fuera de la red municipal',
    intro:
      'Una parte del parque de vivienda en diseminado, parcelaciones y entorno agrícola no está conectada a la red municipal de saneamiento. Su sistema depende de una fosa séptica o un pozo que necesita vaciado periódico, y que rara vez se mantiene hasta que da problemas.',
    fallos: [
      {
        que: 'Olores alrededor de la vivienda',
        por: 'Primera señal de fosa saturada. La capa acumulada ha llenado la cámara y el sistema ha dejado de funcionar como debería.',
      },
      {
        que: 'Evacuación lenta en toda la casa a la vez',
        por: 'No es un atasco de un aparato: la fosa no admite más volumen y el problema es aguas abajo de todo.',
      },
      {
        que: 'Encharcamiento en la zona de infiltración',
        por: 'El terreno ha dejado de absorber. Cuando se llega aquí, ya no es un vaciado: es una reparación del sistema.',
      },
      {
        que: 'La cuba no puede acercarse',
        por: 'Problema de acceso, no de saneamiento. Se resuelve indicando la distancia al pedir el servicio, para llevar manguera suficiente.',
      },
    ],
    enfoque:
      'El vaciado programado cuesta una fracción de lo que cuesta reparar un sistema de infiltración agotado. El residuo se retira mediante gestor de residuos autorizado y se entrega el justificante, que conviene conservar.',
    articulos: ['olor', 'arquetas'],
  },

  industrial: {
    titulo: 'Qué falla en instalaciones con actividad',
    intro:
      'En suelo industrial la red no se parece a la doméstica: caudales mayores, vertidos con carga grasa o aceitosa, separadores que hay que mantener y obligaciones documentales de gestión de residuo. Y una restricción que manda sobre todo lo demás: la instalación no puede parar.',
    fallos: [
      {
        que: 'El separador ha dejado de separar',
        por: 'Cuando la capa acumulada llena la cámara, el equipo deja de retener y todo pasa a la red sin tratar.',
      },
      {
        que: 'Atasco en el colector de nave',
        por: 'Residuo adherido en conductos de uso intensivo. Requiere agua a presión, no método mecánico.',
      },
      {
        que: 'Falta el justificante de retirada',
        por: 'El trabajo se hizo, pero sin gestor autorizado no hay documento. A efectos de inspección, es como si no se hubiera hecho.',
      },
    ],
    enfoque:
      'La intervención se programa en la franja de menor actividad y se dimensiona para entrar y salir dentro de esa ventana. El residuo se retira por gestor autorizado con su justificante, que es lo que se exige en auditoría.',
    articulos: ['separador', 'arquetas'],
  },

  ciudad: {
    titulo: 'Qué falla en una ciudad con parque heterogéneo',
    intro:
      'Un municipio grande no tiene un solo tipo de red: convive el bloque consolidado con la promoción reciente y con el suelo industrial. Eso significa que la incidencia típica no existe, y que el planteamiento tiene que ajustarse al edificio, no al municipio.',
    fallos: [
      {
        que: 'Bajantes al final de su vida útil',
        por: 'En el parque más antiguo, conducciones que han cumplido su ciclo y que la limpieza ya no recupera del todo.',
      },
      {
        que: 'Redes de urbanización sin mantenimiento',
        por: 'Promociones con red privada donde la comunidad no sabe que el tramo enterrado es suyo.',
      },
      {
        que: 'Separadores en hostelería y actividad',
        por: 'Locales con cocina cuya acometida acumula grasa hasta obstruirse, casi siempre en fin de semana.',
      },
    ],
    enfoque:
      'Trabajamos aquí en programado: inspección, mantenimiento preventivo y rehabilitación. La urgencia a esta distancia la resuelve mejor alguien que esté más cerca, y preferimos decirlo.',
    articulos: ['bajante', 'separador'],
  },
};

export const getPerfil = (p: Perfil) => PERFILES[p];
