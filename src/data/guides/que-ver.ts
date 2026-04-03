import type { AlojarseGuideData } from '@/types/guides';

export const queVerGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium · capital',
    title: 'Qué ver en Huelva sin perder tiempo en relleno turístico',
    subtitle:
      'Si quieres quedarte con lo que de verdad compensa, aquí tienes una selección pensada para separar lo interesante de lo prescindible según el tipo de visita que quieras hacer.',
    quickFacts: [
      { label: 'Si es tu primera vez', value: 'Centro + muelle + paseo' },
      { label: 'Si vas justo de tiempo', value: 'Menos sitios, mejor elegidos' },
      { label: 'Clave real', value: 'No todo merece el mismo tiempo' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Decisión rápida' },
    { id: 'capital-o-costa', label: 'Qué compensa más' },
    { id: 'segun-tu-viaje', label: 'Según tu plan' },
    { id: 'mi-recomendacion', label: 'Mi selección' },
    { id: 'errores-tipicos', label: 'Errores típicos' },
    { id: 'tipos-alojamiento', label: 'Tipos de visita' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reservar', label: 'Siguiente paso' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    title: 'La respuesta corta, sin postureo de guía eterna',
    intro: 'Si quieres una respuesta usable ya, empieza aquí.',
    items: [
      {
        title: 'Haz una ruta corta pero bien elegida',
        description:
          'Huelva se disfruta mejor con criterio que con acumulación. Pocos sitios buenos ganan a una lista larga mal priorizada.',
      },
      {
        title: 'Empieza por el centro y el frente de agua',
        description:
          'Es la forma más limpia de entender rápido el tono de la ciudad sin empezar dispersándote.',
      },
      {
        title: 'No intentes verlo todo en una visita corta',
        description:
          'La obsesión por cubrirlo todo mata el ritmo. Mejor salir con sensación redonda que con agenda rota.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
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
    title: 'Mi selección editorial, sin venderte humo de folleto',
    body:
      'Si es tu primera vez, haz una ruta sobria y bien resuelta: centro, uno o dos puntos con contexto, paseo agradable y cierre con algo de comida o café. Huelva no necesita sobreactuación; necesita criterio.',
    highlight:
      'La visita buena no es la más larga. Es la que te deja con sensación de “esto sí ha tenido sentido”.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
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
    title: 'Siguiente paso: convierte esta selección en una ruta real',
    body:
      'Si ya tienes claro qué tipo de visita te encaja, el siguiente movimiento no es abrir diez pestañas más. Es montar una ruta corta, coherente y con buenas transiciones.',
    primaryAction: {
      label: 'Ver más guías de Huelva',
      href: '/guias',
    },
    secondaryAction: {
      label: 'Dónde alojarse en Huelva',
      href: '/alojarse',
    },
  },
  relatedGuides: {
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
