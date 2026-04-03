import type { AlojarseGuideData } from '@/types/guides';

export const finDeSemanaGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium · capital',
    title: 'Fin de semana en Huelva: cómo montarlo sin desperdiciar el viaje',
    subtitle:
      'Si solo tienes un fin de semana, la clave no es meterlo todo. Es combinar bien ciudad, comida, paseo y costa para que el plan tenga ritmo y no parezca una checklist con prisas.',
    quickFacts: [
      { label: 'Clave real', value: 'Ritmo > cantidad' },
      { label: 'Error típico', value: 'Sobrecargar el sábado' },
      { label: 'Si quieres acertar', value: 'Monta el viaje por bloques' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Decisión rápida' },
    { id: 'capital-o-costa', label: 'Qué priorizar' },
    { id: 'segun-tu-viaje', label: 'Según tu fin de semana' },
    { id: 'mi-recomendacion', label: 'Mi recomendación' },
    { id: 'errores-tipicos', label: 'Errores típicos' },
    { id: 'tipos-alojamiento', label: 'Tipos de plan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reservar', label: 'Siguiente paso' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    title: 'La versión corta para no montar un fin de semana torcido',
    intro: 'Si quieres una base defendible en dos minutos, empieza por aquí.',
    items: [
      {
        title: 'No intentes meter toda Huelva en 48 horas',
        description:
          'Eso no produce un gran viaje. Produce una secuencia de traslados, decisiones mediocres y sensación de haber ido con el pie en el acelerador todo el tiempo.',
      },
      {
        title: 'Combina capas, no solo sitios',
        description:
          'Un buen fin de semana mezcla paseo, comida, descanso y uno o dos momentos fuertes. La gracia está en el ritmo, no en el volumen.',
      },
      {
        title: 'El alojamiento manda más de lo que parece',
        description:
          'Dormir bien ubicado simplifica la logística y evita que el plan se rompa en trayectos innecesarios.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    title: 'Qué conviene priorizar en un fin de semana corto',
    intro:
      'La buena decisión no es verlo todo, sino elegir bien qué peso tiene ciudad, comida, costa y descanso según el tipo de escapada que quieres vivir.',
    cards: [
      {
        name: 'Fin de semana más urbano',
        bestFor: 'Quien quiere comodidad, menos coche y una escapada más compacta',
        good: ['Más fluido', 'Más fácil de ordenar', 'Más control sobre tiempos y energía'],
        tradeoffs: ['Puedes quedarte corto si esperabas mucha costa o naturaleza'],
        mobility: 'Alta. Es la opción más estable si priorizas ritmo y cero fricción.',
        verdict:
          'Muy buena elección si quieres una escapada limpia, agradable y sin perder medio viaje en movimientos.',
      },
      {
        name: 'Fin de semana con costa y capas',
        bestFor: 'Quien quiere mezclar ciudad con mar y sensación de escapada más abierta',
        good: ['Más variedad', 'Más sensación de viaje completo', 'Más potencial de recuerdo si está bien montado'],
        tradeoffs: ['Es más fácil sobrecargarlo', 'La logística pesa más y los errores se notan antes'],
        mobility: 'Media. Funciona cuando haces menos cosas pero mejor elegidas.',
        verdict:
          'Compensa mucho si sabes recortar y no conviertes cada media jornada en una misión distinta.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    title: 'Qué tipo de fin de semana te conviene montar',
    intro: 'No todos los fines de semana buenos en Huelva se parecen. Cambia mucho si buscas calma, ciudad, comida o mezcla con costa.',
    options: [
      {
        label: 'Escapada fácil y redonda',
        audience: 'Quieres que todo fluya sin pensar demasiado',
        recommendation: 'Haz un fin de semana compacto: dormir bien ubicado, pocos desplazamientos y bloques que se encadenen solos.',
      },
      {
        label: 'Ciudad + buena comida',
        audience: 'Te interesa más el ritmo urbano y comer bien que cubrir mucho mapa',
        recommendation: 'Prioriza centro, paseo, una selección corta de sitios que sí compensan y una comida bien elegida como momento fuerte.',
      },
      {
        label: 'Ciudad + costa',
        audience: 'Quieres que la escapada tenga más aire y más sensación de salida',
        recommendation: 'Haz hueco al mar, pero no sacrifiques el ritmo del viaje. Mejor una costa bien integrada que un injerto logístico raro.',
      },
      {
        label: 'Primer viaje de reconocimiento',
        audience: 'Quieres entender Huelva bien para luego volver con más criterio',
        recommendation: 'No vayas a por el máximo. Ve a por un mapa mental claro: ciudad, ambiente, comida y una capa costera si entra bien.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    title: 'Mi recomendación editorial, sin montarte un fin de semana de PowerPoint',
    body:
      'Si vas dos días, diseña el viaje como una secuencia corta con aire: base buena, ciudad bien leída, una comida que merezca la pena y, si encaja, una capa de costa sin convertirla en protagonista obligatoria. El viaje gana cuando respira.',
    highlight:
      'Un fin de semana bueno no impresiona por cantidad. Funciona porque todo encaja y nada sobra.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    title: 'Errores típicos al planear un fin de semana en Huelva',
    intro: 'Aquí es donde una escapada prometedora empieza a desinflarse sola.',
    mistakes: [
      {
        title: 'Meter demasiadas cosas en el sábado',
        description: 'Eso te deja cansado justo cuando el viaje debería estar cogiendo forma y disfrute.',
      },
      {
        title: 'Elegir mal la base',
        description: 'Dormir en un punto que complica la logística penaliza todo: tiempos, energía y flexibilidad.',
      },
      {
        title: 'Confundir variedad con calidad de viaje',
        description: 'Un plan con demasiados bloques distintos suele sentirse peor que uno más corto pero mejor unido.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué tipo de fin de semana puedes montar',
    intro: 'La escapada cambia mucho según el peso que le des a ciudad, comida, descanso y costa.',
    cards: [
      {
        title: 'Fin de semana compacto',
        bestFor: 'Quien quiere una escapada fácil, limpia y bien ordenada',
        pros: ['Más fluido', 'Menos desgaste', 'Más fácil de disfrutar de verdad'],
        cons: ['Puede parecer menos ambicioso sobre el papel'],
      },
      {
        title: 'Fin de semana con capas',
        bestFor: 'Quien quiere tocar ciudad, comida y algo de costa sin ir con ansiedad',
        pros: ['Más completo', 'Más sensación de viaje', 'Más memorable si está bien recortado'],
        cons: ['Se rompe rápido si te pasas metiendo bloques'],
      },
      {
        title: 'Fin de semana gastronómico-relajado',
        bestFor: 'Quien prioriza comer bien, pasear y bajar revoluciones',
        pros: ['Más disfrutable', 'Menos necesidad de correr', 'Encaja muy bien con escapadas de pareja'],
        cons: ['Cubre menos territorio si ibas buscando amplitud'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    title: 'Preguntas frecuentes que sí te ayudan a montarlo bien',
    items: [
      {
        question: '¿Da para un fin de semana bueno en Huelva?',
        answer:
          'Sí, perfectamente. Pero la gracia está en no sobrecargarlo. Si recortas bien, dos días dan para una escapada bastante redonda.',
      },
      {
        question: '¿Es mejor centrarse en ciudad o mezclar con costa?',
        answer:
          'Depende del tipo de viaje que quieras. Ciudad sola da más fluidez; mezclar con costa puede dar más sensación de escapada completa si no te pasas de ambición.',
      },
      {
        question: '¿Qué rompe más un fin de semana corto?',
        answer:
          'La mala logística y el exceso de plan. Cuando todo exige moverse, decidir y correr, el viaje pierde valor muy rápido.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    title: 'Siguiente paso: elige base, ritmo y una secuencia corta que sí cierre',
    body:
      'Si ya sabes qué tipo de escapada quieres, el siguiente movimiento no es meter más ideas. Es fijar una base buena y dos o tres decisiones fuertes que ordenen el fin de semana.',
    primaryAction: {
      label: 'Dónde alojarse en Huelva',
      href: '/alojarse',
    },
    secondaryAction: {
      label: 'Dónde comer en Huelva',
      href: '/donde-comer',
    },
  },
  relatedGuides: {
    title: 'Termina de montar el viaje',
    guides: [
      {
        title: 'Dónde alojarse en Huelva',
        description: 'La base correcta te ahorra mucha fricción en solo dos días.',
        href: '/alojarse',
      },
      {
        title: 'Qué ver en Huelva',
        description: 'Para elegir qué sí merece tiempo en una escapada corta.',
        href: '/que-ver',
      },
      {
        title: 'Playas de Huelva',
        description: 'Si quieres meter costa sin romper el ritmo del viaje.',
        href: '/playas',
      },
    ],
  },
};
