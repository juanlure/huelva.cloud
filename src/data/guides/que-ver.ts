import type { AlojarseGuideData } from '@/types/guides';

export const queVerGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía local · Huelva capital',
    title: 'Qué ver en Huelva si no quieres tragarte una ruta de relleno',
    subtitle:
      'Huelva no se visita bien acumulando “imprescindibles”. Se visita bien cuando entiendes qué zonas tienen sentido, qué paradas dan contexto y qué cosas se pueden saltar sin drama. Aquí va la versión útil, no la de folleto.',
    quickFacts: [
      { label: 'Primera visita', value: 'Centro, muelle y paseo con cabeza' },
      { label: 'Si vas justo', value: 'Recorta sin pena' },
      { label: 'Verdad útil', value: 'No todo lo famoso compensa' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Si vas justo' },
    { id: 'capital-o-costa', label: 'Dónde está el valor' },
    { id: 'segun-tu-viaje', label: 'Qué encaja contigo' },
    { id: 'mi-recomendacion', label: 'Mi lectura' },
    { id: 'errores-tipicos', label: 'Qué te fastidia la ruta' },
    { id: 'tipos-alojamiento', label: 'Formas de visitar' },
    { id: 'faq', label: 'Dudas útiles' },
    { id: 'reservar', label: 'Cerrar el plan' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    eyebrow: 'Si vienes con poco tiempo',
    title: 'La respuesta corta, sin hacerte perder la tarde leyendo obviedades',
    intro: 'Si quieres una respuesta usable de verdad, empieza aquí.',
    items: [
      {
        title: 'Haz una ruta corta y defendible',
        description:
          'Huelva funciona mejor cuando unes pocas piezas buenas que cuando intentas justificar cada parada que viste en internet.',
      },
      {
        title: 'Empieza por el centro y remata en el frente de agua',
        description:
          'Ahí entiendes rápido el tono de la ciudad y evitas empezar la visita con desvíos que no aportan gran cosa.',
      },
      {
        title: 'No intentes “cubrir” Huelva en una mañana',
        description:
          'La obsesión por verlo todo solo sirve para que acabes caminando mucho, recordando poco y rematando peor el plan.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    eyebrow: 'Dónde está el valor real',
    title: 'Qué sí compensa ver y qué solo parece obligatorio',
    intro:
      'Aquí no se trata de tachar monumentos por inercia, sino de distinguir entre lo que aporta contexto, paseo o experiencia y lo que apenas suma.',
    cards: [
      {
        name: 'Imprescindibles funcionales',
        bestFor: 'Primera visita y poco tiempo',
        good: ['Te dan contexto rápido', 'Ordenan bien la visita', 'Dejan sensación de ciudad entendida'],
        tradeoffs: ['Si los haces sin criterio, pueden sentirse demasiado correctos'],
        mobility: 'Muy buena. Permiten una visita compacta y caminable.',
        verdict:
          'Aquí está el núcleo que sí conviene hacer primero antes de empezar a añadir capas.',
      },
      {
        name: 'Extras selectivos',
        bestFor: 'Quien ya ha visto lo principal o quiere hilar más fino',
        good: ['Añaden matiz', 'Pueden elevar la experiencia si eliges bien', 'Sirven para personalizar la visita'],
        tradeoffs: ['No todos justifican desvío', 'Algunos parecen más interesantes de lo que luego son'],
        mobility: 'Correcta si se eligen pocos y con sentido. Mala si se meten por ansiedad de cobertura.',
        verdict:
          'No son obligatorios. Son buenos cuando rematan una visita ya bien montada, no cuando sustituyen la base.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    eyebrow: 'Si vienes por una cosa concreta',
    resultEyebrow: 'La jugada que mejor encaja',
    title: 'Qué te conviene ver según el tipo de visita que quieres hacer',
    intro: 'La misma ciudad cambia mucho según vayas a pasear, descubrir, comer o simplemente aprovechar unas horas.',
    options: [
      {
        label: 'Primera visita rápida',
        audience: 'Quieres quedarte con una visión clara sin saturarte',
        recommendation: 'Centro, paseo bien hilado y uno o dos puntos con contexto real. Menos cantidad, más limpieza de ruta.',
      },
      {
        label: 'Escapada tranquila',
        audience: 'Prefieres ritmo amable, paseo y sensación de ciudad',
        recommendation: 'Combina calles con personalidad, frente de agua y alguna parada para comer sin convertir la visita en una gymkhana.',
      },
      {
        label: 'Viaje con foco cultural',
        audience: 'Quieres entender mejor el lugar y no quedarte en la postal',
        recommendation: 'Prioriza sitios que te den narrativa y contexto antes que listas decorativas de cosas “para ver”.',
      },
      {
        label: 'Solo unas horas',
        audience: 'Necesitas impacto rápido y cero desvíos absurdos',
        recommendation: 'Haz un circuito muy corto y defendible. Intentar exprimir demasiado poco tiempo solo empeora la experiencia.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    eyebrow: 'Mi lectura de la ciudad',
    title: 'Mi recomendación, sin intentar venderte una ciudad que no necesita maquillaje',
    body:
      'Si es tu primera vez, haz una ruta sobria: centro, una o dos paradas con contexto real, paseo con aire y cierre con algo de comer o de tomar. Huelva no gana cuando la fuerzas; gana cuando la lees bien.',
    highlight:
      'La visita buena no es la que más sitios mete. Es la que deja una sensación clara de ciudad y cero relleno.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    eyebrow: 'Lo que suele estropear la visita',
    title: 'Errores típicos al montar una ruta por Huelva',
    intro: 'Aquí es donde una visita decente se convierte en una sucesión de desvíos innecesarios.',
    mistakes: [
      {
        title: 'Querer verlo todo',
        description: 'Eso suele producir una ruta cansada, poco memorable y peor contada mentalmente al final del día.',
      },
      {
        title: 'Copiar listas sin jerarquía',
        description: 'Una lista de veinte sitios no es una ruta. Sin orden ni criterio, solo suma fricción.',
      },
      {
        title: 'No dejar espacio al ritmo de la ciudad',
        description: 'Si conviertes todo en checkboxes, matas justo lo que hace agradable una visita urbana.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué tipo de visita encaja mejor contigo',
    intro: 'No todo el mundo necesita el mismo tipo de plan para “ver Huelva” bien.',
    cards: [
      {
        title: 'Ruta esencial',
        bestFor: 'Primera vez y tiempo limitado',
        pros: ['Más claridad', 'Menos cansancio', 'Mejor sensación final'],
        cons: ['Te obliga a renunciar a parte del catálogo'],
      },
      {
        title: 'Ruta con capas',
        bestFor: 'Quien ya ha visto lo obvio o quiere hilar más fino',
        pros: ['Más personalidad', 'Más contexto', 'Visita menos estándar'],
        cons: ['Si la estiras demasiado, pierde tensión'],
      },
      {
        title: 'Ruta suave con paradas',
        bestFor: 'Escapadas tranquilas donde importa tanto el ritmo como los sitios',
        pros: ['Más disfrutable', 'Mejor para pareja o plan relajado', 'Se siente menos turística'],
        cons: ['Puede quedarse corta si buscas cobertura máxima'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    eyebrow: 'Dudas normales, respuestas sin rodeos',
    title: 'Preguntas frecuentes que sí importan aquí',
    items: [
      {
        question: '¿Se puede ver Huelva bien en una visita corta?',
        answer:
          'Sí, si recortas bien. El error no es ir poco tiempo; el error es intentar meter demasiadas cosas en ese tiempo.',
      },
      {
        question: '¿Hace falta una lista larguísima de sitios?',
        answer:
          'No. Hace falta una secuencia buena. Una ruta breve y bien resuelta suele ganar a una acumulación de “imprescindibles”.',
      },
      {
        question: '¿Qué pesa más: monumentos o ambiente?',
        answer:
          'En Huelva pesa mucho cómo se vive el recorrido. El ambiente, el ritmo y la selección suelen importar más que tachar piezas aisladas.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    eyebrow: 'Cuando ya lo tienes medio claro',
    title: 'Deja de mirar listas y cierra un plan que se sostenga solo',
    body:
      'Si ya tienes claro qué tipo de visita quieres, ahora toca unir bien base, comida y ritmo. Ahí es donde un día en Huelva pasa de correcto a redondo.',
    kicker: 'La diferencia no la marca abrir otra pestaña. La marca enlazar bien dos o tres decisiones buenas.',
    primaryAction: {
      label: 'Ver más guías útiles',
      href: '/guias',
    },
    secondaryAction: {
      label: 'Resolver dónde alojarse',
      href: '/alojarse',
    },
  },
  relatedGuides: {
    eyebrow: 'Si quieres hilar mejor el día',
    title: 'Sigue afinando la escapada',
    guides: [
      {
        title: 'Dónde alojarse en Huelva',
        description: 'La base correcta cambia todo el viaje.',
        href: '/alojarse',
      },
      {
        title: 'Dónde comer en Huelva',
        description: 'Para que la parte gastronómica no quede resuelta por inercia.',
        href: '/donde-comer',
      },
      {
        title: 'Fin de semana en Huelva',
        description: 'Convierte esta selección en una escapada corta con ritmo.',
        href: '/fin-de-semana',
      },
    ],
  },
};
