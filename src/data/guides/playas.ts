import type { AlojarseGuideData } from '@/types/guides';

export const playasGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium · costa de Huelva',
    title: 'Playas de Huelva: qué playa elegir según el plan, sin comerte una hora de postureo inútil',
    subtitle:
      'Si dudas entre Punta Umbría, El Portil, Mazagón, Cuesta Maneli, Matalascañas, Islantilla o Isla Canela, deja de elegir por fama. Cada una sirve para un día distinto y aquí va la diferencia de verdad.',
    quickFacts: [
      { label: 'Si quieres ir a tiro hecho', value: 'Punta Umbría o El Portil' },
      { label: 'Si buscas algo más salvaje', value: 'Cuesta Maneli o Mazagón' },
      { label: 'Si vas en escapada larga', value: 'Islantilla o Isla Canela' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Decisión rápida' },
    { id: 'capital-o-costa', label: 'Comparativa real' },
    { id: 'segun-tu-viaje', label: 'Según tu plan' },
    { id: 'mi-recomendacion', label: 'Mi recomendación' },
    { id: 'errores-tipicos', label: 'Errores típicos' },
    { id: 'tipos-alojamiento', label: 'Playas concretas' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reservar', label: 'Siguiente paso' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    title: 'La respuesta rápida, con nombres y apellidos',
    intro: 'Si no quieres tragarte una comparativa eterna, empieza aquí.',
    items: [
      {
        title: 'Para un día fácil desde Huelva capital: Punta Umbría',
        description:
          'Es la opción más obvia por cercanía, logística y comodidad. No siempre es la más bonita, pero sí muchas veces la más práctica.',
      },
      {
        title: 'Para equilibrio entre comodidad y mejor entorno: El Portil',
        description:
          'Suele encajar mejor si quieres costa agradable, menos sensación de agobio y un día más redondo sin complicarte demasiado.',
      },
      {
        title: 'Para sensación más salvaje: Cuesta Maneli o Mazagón',
        description:
          'Aquí sube la épica y baja la comodidad. Compensan cuando buscas naturaleza y no cuando vas con prisas, niños o cero margen de error.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    title: 'Qué cambia de verdad entre unas playas y otras',
    intro:
      'No es solo una cuestión de arena. Cambian accesos, ambiente, servicios, tipo de público y el esfuerzo que exige que el día salga bien.',
    cards: [
      {
        name: 'Punta Umbría y La Bota',
        bestFor: 'Escapadas rápidas desde capital, familias y días donde manda la comodidad',
        good: ['Llegas fácil', 'Mucha oferta alrededor', 'Apuesta simple cuando no quieres experimentar'],
        tradeoffs: ['Pierde encanto frente a opciones más abiertas', 'En días fuertes puede sentirse más masificada'],
        mobility: 'Alta. Sirve muy bien cuando quieres resolver el plan rápido y sin drama.',
        verdict:
          'No gana por mística; gana porque muchas veces hace bien el trabajo práctico.',
      },
      {
        name: 'El Portil y Nuevo Portil',
        bestFor: 'Quien quiere una playa amable, más equilibrada y con mejor sensación de escapada',
        good: ['Más aire de descanso', 'Suele sentirse más agradable', 'Buena mezcla de acceso y atmósfera'],
        tradeoffs: ['No tiene la fuerza salvaje de las más naturales', 'Tampoco es la más diferencial si buscas paisaje bruto'],
        mobility: 'Alta-media. Muy buena cuando buscas comodidad sin caer en lo demasiado obvio.',
        verdict:
          'Si no sabes cuál elegir, El Portil suele ser una decisión bastante defendible.',
      },
      {
        name: 'Mazagón, Cuesta Maneli y entorno de Doñana',
        bestFor: 'Días de naturaleza, amplitud y sensación de playa menos domesticada',
        good: ['Más carácter', 'Más paisaje', 'Más sensación de costa potente de verdad'],
        tradeoffs: ['Acceso menos cómodo', 'No siempre es la mejor jugada para un día rápido o familiar'],
        mobility: 'Media. Compensa cuando el plan es precisamente buscar esa atmósfera.',
        verdict:
          'Cuando encaja, te deja mejor recuerdo. Cuando no encaja, te mete peajes innecesarios.',
      },
      {
        name: 'Matalascañas, Islantilla e Isla Canela',
        bestFor: 'Estancias más largas, escapadas completas o quien quiere combinar playa con más servicios',
        good: ['Más infraestructura', 'Más opciones alrededor', 'Buenas para armar plan de varios días'],
        tradeoffs: ['No todas transmiten autenticidad', 'Algunas funcionan mejor como base que como playa memorable'],
        mobility: 'Alta si haces escapada, menor si solo buscas una playa top sin más.',
        verdict:
          'Funcionan bien cuando la playa es una pieza del viaje, no la única decisión del día.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    title: 'Qué playa te encaja según el tipo de día que quieres tener',
    intro: 'La buena elección sale de tu plan, no del ranking genérico de internet.',
    options: [
      {
        label: 'Voy desde Huelva capital y quiero cero lío',
        audience: 'Buscas una decisión simple, rápida y razonable',
        recommendation: 'Empieza por Punta Umbría. Si quieres un punto más agradable sin complicarte, mira El Portil.',
      },
      {
        label: 'Quiero más naturaleza y menos paseo marítimo',
        audience: 'Te importa más la sensación de costa abierta que la logística',
        recommendation: 'Mazagón y Cuesta Maneli tienen más sentido para ti que una playa urbana o hiper cómoda.',
      },
      {
        label: 'Voy con familia o necesito una apuesta segura',
        audience: 'No quieres jugar a adivinar ni pelearte con un acceso incómodo',
        recommendation: 'Punta Umbría, El Portil o Islantilla suelen darte un día más fácil y más defendible.',
      },
      {
        label: 'Estoy montando una escapada más completa',
        audience: 'La playa es importante, pero también el entorno, la estancia y el ritmo del viaje',
        recommendation: 'Islantilla, Isla Canela o incluso Matalascañas tienen más sentido como parte de una escapada de varios días.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    title: 'Mi recomendación editorial, sin venderte una playa universal porque eso es humo',
    body:
      'Si vienes desde Huelva capital y quieres acertar rápido, empieza por Punta Umbría o El Portil. Si buscas costa con más carácter, mira Mazagón o Cuesta Maneli. Y si estás montando una escapada más larga, Islantilla o Isla Canela suelen tener más sentido que obsesionarte con “la mejor playa”.',
    highlight:
      'La mejor playa de Huelva no existe. Existen playas que encajan mejor o peor con el día que quieres tener.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    title: 'Errores típicos al elegir playa en Huelva',
    intro: 'Aquí es donde mucha gente se fastidia sola el día.',
    mistakes: [
      {
        title: 'Elegir Matalascañas o Punta Umbría solo porque son las más conocidas',
        description: 'La fama no resuelve si tú buscabas otra cosa: menos gente, más paisaje o un acceso más amable.',
      },
      {
        title: 'Ir a Cuesta Maneli como si fuera una playa comodísima para cualquiera',
        description: 'Tiene encanto precisamente porque exige más. Si vas con la expectativa equivocada, la experiencia cae.',
      },
      {
        title: 'No separar “playa bonita” de “playa que me conviene hoy”',
        description: 'Mazagón puede gustarte más sobre el papel, pero para un día rápido quizá te compensa bastante más El Portil.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Playas concretas que sí conviene tener en el radar',
    intro: 'Aquí ya no hablamos en abstracto. Hablamos de playas reales y de cuándo tienen sentido.',
    cards: [
      {
        title: 'Punta Umbría',
        bestFor: 'Día sencillo, familia, cercanía y logística fácil',
        pros: ['Muy práctica', 'Accesible', 'Buena para no fallar en un plan simple'],
        cons: ['Menos especial si buscas paisaje más potente o sensación más salvaje'],
      },
      {
        title: 'El Portil / Nuevo Portil',
        bestFor: 'Quien quiere equilibrio entre comodidad y mejor ambiente de escapada',
        pros: ['Agradable', 'Bastante defendible para casi todo', 'Menos obvia que Punta Umbría'],
        cons: ['No es la más espectacular si buscas una experiencia muy diferencial'],
      },
      {
        title: 'Mazagón',
        bestFor: 'Más amplitud, más costa abierta y más sensación de naturaleza',
        pros: ['Más carácter', 'Más paisaje', 'Mejor recuerdo si ese era tu plan'],
        cons: ['No siempre compensa para un día rápido o muy cómodo'],
      },
      {
        title: 'Cuesta Maneli',
        bestFor: 'Quien prioriza entorno natural y no necesita una playa “fácil”',
        pros: ['Tiene personalidad', 'Se siente distinta', 'Premia si buscas costa menos domesticada'],
        cons: ['No es para cualquiera ni para cualquier día'],
      },
      {
        title: 'Islantilla / Isla Canela',
        bestFor: 'Escapadas más largas y planes donde playa + estancia cuentan juntos',
        pros: ['Buenas como base', 'Más servicios', 'Encajan bien en viajes de varios días'],
        cons: ['No siempre son las que más enamoran si solo valoras la playa aislada'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    title: 'Preguntas frecuentes que sí importan para elegir bien',
    items: [
      {
        question: '¿Cuál es la mejor playa de Huelva?',
        answer:
          'Depende del plan. Para comodidad rápida, Punta Umbría o El Portil. Para más naturaleza, Mazagón o Cuesta Maneli. Para escapada larga, Islantilla o Isla Canela.',
      },
      {
        question: '¿Qué playa está mejor si voy desde Huelva capital?',
        answer:
          'Punta Umbría suele ser la jugada más simple. El Portil también compite muy bien si quieres un punto más agradable.',
      },
      {
        question: '¿Qué playa elegir si quiero algo más salvaje?',
        answer:
          'Mazagón y sobre todo Cuesta Maneli te encajan más que una playa urbana o muy domesticada.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    title: 'Siguiente paso: convierte la playa en un plan bueno de verdad',
    body:
      'Ya tienes claro qué zona de costa te encaja. Ahora toca completar la escapada con una base cómoda, comida decente y un plan que no se caiga por mala logística.',
    primaryAction: {
      label: 'Dónde alojarse en Huelva',
      href: '/alojarse',
    },
    secondaryAction: {
      label: 'Fin de semana en Huelva',
      href: '/fin-de-semana',
    },
  },
  relatedGuides: {
    title: 'Sigue montando bien la escapada',
    guides: [
      {
        title: 'Dónde alojarse en Huelva',
        description: 'La base correcta cambia bastante más de lo que parece.',
        href: '/alojarse',
      },
      {
        title: 'Fin de semana en Huelva',
        description: 'Para encajar costa, ciudad y ritmo sin improvisar mal.',
        href: '/fin-de-semana',
      },
      {
        title: 'Dónde comer en Huelva',
        description: 'Porque una buena playa no arregla una comida mediocre.',
        href: '/donde-comer',
      },
    ],
  },
};
