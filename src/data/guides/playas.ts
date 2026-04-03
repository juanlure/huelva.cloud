import type { AlojarseGuideData } from '@/types/guides';

export const playasGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium · capital',
    title: 'Playas de Huelva: cuál elegir sin acabar en la que menos te convenía',
    subtitle:
      'No todas las playas te sirven para lo mismo. Aquí tienes una guía pensada para decidir según el tipo de día que buscas: más salvaje, más cómodo, más familiar o más de paseo y desconexión.',
    quickFacts: [
      { label: 'Si quieres ir a tiro hecho', value: 'Elige por tipo de plan' },
      { label: 'Error típico', value: 'Elegir por fama y no por encaje' },
      { label: 'Clave real', value: 'La mejor playa depende del día' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Decisión rápida' },
    { id: 'capital-o-costa', label: 'Qué cambia de verdad' },
    { id: 'segun-tu-viaje', label: 'Según tu plan' },
    { id: 'mi-recomendacion', label: 'Mi recomendación' },
    { id: 'errores-tipicos', label: 'Errores típicos' },
    { id: 'tipos-alojamiento', label: 'Tipos de playa' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reservar', label: 'Siguiente paso' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    title: 'La respuesta rápida, antes de liarte con listas infinitas',
    intro: 'Si quieres acertar antes de abrir veinte pestañas, empieza aquí.',
    items: [
      {
        title: 'Elige por experiencia, no por nombre',
        description:
          'Una playa famosa no siempre es la mejor para ti. Lo que manda es el tipo de día que quieres tener.',
      },
      {
        title: 'No todas compensan igual según la logística',
        description:
          'Acceso, ambiente, comodidad y ritmo cambian mucho más de lo que parece cuando comparas playas sobre el mapa.',
      },
      {
        title: 'Menos ambición, mejor elección',
        description:
          'Intentar probar muchas playas en poco tiempo suele dejarte con trayectos, cansancio y menos disfrute real.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    title: 'Qué cambia de verdad entre unas playas y otras',
    intro:
      'La diferencia no es solo estética. Cambian el ritmo, el acceso, el tipo de gente, la comodidad y lo bien que encajan con tu día.',
    cards: [
      {
        name: 'Playas para ir cómodo',
        bestFor: 'Días fáciles, familia, logística sencilla y cero complicaciones',
        good: ['Más accesibles', 'Más cómodas para pasar horas', 'Menos fricción al llegar y montar el día'],
        tradeoffs: ['Pueden sentirse menos salvajes', 'A veces tienen menos sensación de descubrimiento'],
        mobility: 'Alta. Son las que mejor funcionan cuando quieres un día fluido y poco drama.',
        verdict:
          'Son la mejor jugada cuando quieres disfrutar sin convertir la playa en una operación logística.',
      },
      {
        name: 'Playas con más carácter',
        bestFor: 'Quien busca una sensación más abierta, más natural o menos domesticada',
        good: ['Más personalidad', 'Más sensación de escapada', 'Más premio si conectan contigo'],
        tradeoffs: ['No siempre son las más cómodas', 'Exigen encajar mejor expectativas y plan'],
        mobility: 'Media. Funcionan mejor cuando ya sabes qué tipo de experiencia estás persiguiendo.',
        verdict:
          'Pueden ser memorables, pero no son automáticamente mejores: solo ganan cuando encajan con el día correcto.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    title: 'Qué playa te encaja según el tipo de día que quieres tener',
    intro: 'La mejor playa no es una medalla universal. Es la que hace bien el trabajo que tú necesitas ese día.',
    options: [
      {
        label: 'Día fácil y sin complicarte',
        audience: 'Quieres comodidad, acceso sencillo y un plan que fluya solo',
        recommendation: 'Prioriza playas cómodas y fáciles de gestionar. En este caso, la fricción importa más que la épica.',
      },
      {
        label: 'Día más salvaje o abierto',
        audience: 'Buscas más sensación de naturaleza y menos domesticación',
        recommendation: 'Ve a playas con más carácter, pero hazlo sabiendo que cambias comodidad por atmósfera.',
      },
      {
        label: 'Plan en pareja o escapada tranquila',
        audience: 'Te importa tanto el ritmo y el ambiente como la propia arena',
        recommendation: 'Elige playas que permitan pasear, bajar revoluciones y cerrar el día con buena sensación, no solo tumbarte al sol.',
      },
      {
        label: 'Poco tiempo y cero margen de error',
        audience: 'Necesitas una apuesta segura y defendible',
        recommendation: 'No experimentes de más. Elige una playa simple, agradable y sin peajes logísticos raros.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    title: 'Mi recomendación editorial, sin venderte “la mejor playa” como si fuera universal',
    body:
      'Empieza decidiendo qué tipo de día quieres tener y luego elige la playa. Huelva tiene costa potente, pero la decisión buena no sale de buscar la más famosa: sale de encajar bien comodidad, atmósfera y tipo de plan.',
    highlight:
      'La mejor playa no es la más nombrada. Es la que hace que tu día salga redondo.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    title: 'Errores típicos al elegir playa en Huelva',
    intro: 'Aquí es donde mucha gente se monta un día peor del que podría haber tenido.',
    mistakes: [
      {
        title: 'Elegir por fama',
        description: 'La playa más conocida no siempre es la más adecuada para tu ritmo, tu compañía o tu logística.',
      },
      {
        title: 'No pensar el acceso y el peaje real',
        description: 'Lo que parece una gran idea en el mapa puede convertirse en más roce del que te apetece ese día.',
      },
      {
        title: 'Querer encadenar demasiadas playas',
        description: 'Eso suele producir un día fragmentado y cansino. Mejor una buena elección que tres medias.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué tipo de playa te interesa de verdad',
    intro: 'No todas sirven para lo mismo, aunque en fotos muchas parezcan competir en la misma liga.',
    cards: [
      {
        title: 'Playa cómoda',
        bestFor: 'Días fáciles, familia y planes donde importa la logística',
        pros: ['Más sencilla', 'Más previsible', 'Más fácil de disfrutar sin esfuerzo'],
        cons: ['Puede sentirse menos especial si buscas algo más abierto'],
      },
      {
        title: 'Playa con carácter',
        bestFor: 'Quien quiere más sensación de escapada o naturaleza',
        pros: ['Más personalidad', 'Más atmósfera', 'Más premio si buscas eso exactamente'],
        cons: ['Suele exigir más tolerancia a incomodidades o peajes'],
      },
      {
        title: 'Playa de paseo y ritmo',
        bestFor: 'Planes tranquilos donde importa tanto el ambiente como bañarse',
        pros: ['Más disfrutable como experiencia completa', 'Mejor para bajar revoluciones', 'Encaja bien en escapadas con más capas'],
        cons: ['No siempre es la opción más práctica si vas con idea muy funcional'],
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
          'La pregunta buena no es esa. La pregunta buena es qué tipo de día quieres tener. La mejor cambia según busques comodidad, ambiente, naturaleza o facilidad.',
      },
      {
        question: '¿Compensa visitar varias playas en un mismo día?',
        answer:
          'Normalmente no. Salvo que tengas muy claro el plan, suele funcionar mejor elegir una bien y disfrutarla de verdad.',
      },
      {
        question: '¿Hay mucha diferencia entre unas y otras?',
        answer:
          'Sí. Cambian bastante el tono del día, la comodidad, el ambiente y la sensación final. Elegir bien importa más de lo que parece.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    title: 'Siguiente paso: elige el tipo de día y cierra el plan',
    body:
      'Si ya sabes qué experiencia quieres, no necesitas más ruido. Necesitas una decisión limpia, una playa que encaje y una escapada sin trayectos absurdos.',
    primaryAction: {
      label: 'Dónde alojarse en Huelva',
      href: '/alojarse',
    },
    secondaryAction: {
      label: 'Qué ver en Huelva',
      href: '/que-ver',
    },
  },
  relatedGuides: {
    title: 'Sigue montando bien la escapada',
    guides: [
      {
        title: 'Dónde alojarse en Huelva',
        description: 'La base correcta cambia todo el viaje.',
        href: '/alojarse',
      },
      {
        title: 'Fin de semana en Huelva',
        description: 'Para encajar la costa dentro de una escapada que no se rompa.',
        href: '/fin-de-semana',
      },
      {
        title: 'Dónde comer en Huelva',
        description: 'Porque el día bueno no acaba solo en la arena.',
        href: '/donde-comer',
      },
    ],
  },
};
