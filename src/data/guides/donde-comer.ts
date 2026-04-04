import type { AlojarseGuideData } from '@/types/guides';

export const dondeComerGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía local · Huelva para comer bien',
    title: 'Dónde comer en Huelva si quieres una recomendación y no otra lista tibia',
    subtitle:
      'Aquí no venimos a hablar de “gastronomía local” como si eso resolviera algo. Venimos a separar desayunos, tapeo, producto y mesas serias para que sepas por dónde empezar y qué sitios sí compensan según el momento.',
    quickFacts: [
      { label: 'Error típico', value: 'Elegir por fama o por foto' },
      { label: 'Si quieres acertar', value: 'Decide primero el momento' },
      { label: 'Referencias base', value: 'Gran Vía Uno · Azabache · centro/mercado' }
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Si quieres resolver ya' },
    { id: 'capital-o-costa', label: 'Dónde se gana la comida' },
    { id: 'segun-tu-viaje', label: 'Qué mesa te conviene' },
    { id: 'mi-recomendacion', label: 'Mi filtro' },
    { id: 'errores-tipicos', label: 'Cómo comer peor de lo necesario' },
    { id: 'tipos-alojamiento', label: 'Tipos de experiencia' },
    { id: 'faq', label: 'Dudas que sí cambian algo' },
    { id: 'reservar', label: 'Recortar la lista' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    eyebrow: 'Si quieres comer bien y pasar página',
    title: 'La versión corta para no perder una comida por no saber elegir',
    intro: 'Si quieres una respuesta rápida, empieza por esto y deja de comparar ruido.',
    items: [
      {
        title: 'Si quieres mesa con más intención',
        description:
          'Empieza por Azabache. Es la referencia más clara si buscas producto y una comida con algo más de peso.',
      },
      {
        title: 'Si quieres resolver bien en el centro',
        description:
          'Gran Vía Uno encaja mejor cuando buscas una apuesta sólida, cómoda y defendible sin montar una odisea gastronómica.',
      },
      {
        title: 'Si el plan es desayuno o pausa amable',
        description:
          'Mejor priorizar cafeterías y bares con movimiento real en centro y mercado; Macha puede encajar, pero aquí pesa más la zona y el momento que un nombre único.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    eyebrow: 'Dónde se gana una comida y dónde se pierde',
    title: 'Qué tipo de sitio compensa más según el plan que lleves',
    intro:
      'No necesitas veinte nombres: necesitas distinguir cuándo conviene una mesa seria, cuándo basta con resolver bien y cuándo el tapeo manda más que el restaurante.',
    cards: [
      {
        name: 'Resolver bien sin inventarte una película',
        bestFor: 'Quien quiere una apuesta clara, rica y funcional',
        good: ['Gran Vía Uno encaja bien aquí', 'Más fácil de acertar', 'Encaja mejor en escapadas con plan apretado'],
        tradeoffs: ['Puede tener menos efecto wow', 'No será la comida más épica del viaje'],
        mobility: 'Alta. Es la opción más sólida cuando quieres que todo fluya.',
        verdict:
          'Muy buena jugada si priorizas seguridad, ritmo y una experiencia sin tonterías.',
      },
      {
        name: 'Comer con más intención y producto',
        bestFor: 'Quien quiere que sentarse a la mesa sí marque el día',
        good: ['Azabache entra mejor aquí', 'Más personalidad', 'Más premio si eliges bien'],
        tradeoffs: ['Aquí equivocarte duele más', 'Conviene reservar y no ir a ciegas'],
        mobility: 'Media. Conviene ir con criterio y no por simple ruido social.',
        verdict:
          'Compensa cuando la comida es parte central del plan, no solo una parada técnica.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    eyebrow: 'Según el momento que quieras montar',
    resultEyebrow: 'La mesa que más sentido tiene',
    title: 'Qué sitio te conviene según el plan que llevas',
    intro: 'Aquí sí toca mojarse: no todo el mundo necesita el mismo restaurante ni la misma experiencia.',
    options: [
      {
        label: 'Comer bien sin drama',
        audience: 'Quieres un sitio sólido y una decisión rápida',
        recommendation: 'Gran Vía Uno es la salida más defendible si quieres centro, solvencia y poca tontería alrededor.',
      },
      {
        label: 'Comida protagonista del día',
        audience: 'Quieres que sentarte a comer sea una parte fuerte de la escapada',
        recommendation: 'Azabache tiene más sentido cuando quieres una comida con más intención, producto y sensación de haber elegido algo de verdad.',
      },
      {
        label: 'Tapeo o varias paradas',
        audience: 'Prefieres más movimiento y menos comida larga de mesa fija',
        recommendation: 'Mejor dos o tres bares con barra viva por el centro y el entorno del mercado que una ruta infinita de sitios flojos.',
      },
      {
        label: 'Desayuno o primera parada amable',
        audience: 'Quieres empezar el día bien antes de seguir con paseo o visitas',
        recommendation: 'Aquí manda más elegir bien la zona —centro vivo o entorno del mercado— que casarte con un solo nombre. Macha puede encajar, pero no la vendería como verdad absoluta.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    eyebrow: 'Mi forma de filtrar aquí',
    title: 'Si me pidieras tres nombres para empezar, no te daría una lista de veinte',
    body:
      'Empezaría por Gran Vía Uno si buscas una apuesta práctica y sólida en el centro, por Azabache si quieres comer con más intención y por el eje centro-mercado si el plan es desayuno, tapeo o una parada rápida con movimiento real. A partir de ahí, ya afinas por producto y tipo de día.',
    highlight:
      'La mejor recomendación no es “el mejor restaurante”. Es el sitio correcto para el momento correcto.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    eyebrow: 'Cómo acabar comiendo peor de lo necesario',
    title: 'Errores típicos al decidir dónde comer en Huelva',
    intro: 'Aquí es donde se van muchas comidas que podrían haber salido bastante mejor.',
    mistakes: [
      {
        title: 'Elegir por hype o por listas recicladas',
        description: 'Mucho ruido gastronómico solo sirve para llevarte a sitios correctos pero intercambiables.',
      },
      {
        title: 'No separar desayuno, tapeo y mesa seria',
        description: 'Si comparas una cafetería de mañana con Azabache o una ruta de bares con una comida sentada, te estás haciendo trampas tú solo.',
      },
      {
        title: 'Buscar “el mejor” como si existiera una respuesta única',
        description: 'La mejor opción depende del plan, del hambre, del momento y del nivel de exigencia que traigas.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué tipo de experiencia gastronómica te interesa',
    intro: 'No todo sitio compite en la misma categoría, aunque internet lo meta todo en el mismo saco.',
    cards: [
      {
        title: 'Comida resolutiva buena',
        bestFor: 'Quien quiere acertar sin complicarse',
        pros: ['Más fiable', 'Más ágil', 'Mejor para viajes con agenda'],
        cons: ['Puede tener menos recuerdo emocional'],
      },
      {
        title: 'Comida con producto y más intención',
        bestFor: 'Quien quiere que la mesa sea parte fuerte del viaje',
        pros: ['Más personalidad', 'Más potencial de recuerdo', 'Más premio si das con el sitio correcto'],
        cons: ['Más fácil equivocarse si eliges por ruido'],
      },
      {
        title: 'Tapeo con criterio',
        bestFor: 'Planes más dinámicos o con ganas de probar sin atascarse en una sola mesa',
        pros: ['Más flexible', 'Más divertido si se hace bien', 'Permite jugar mejor con el ritmo del día'],
        cons: ['Mal hecho se convierte en dispersión y fatiga'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    eyebrow: 'Las dudas que sí cambian una comida',
    title: 'Preguntas frecuentes que sí sirven para decidir',
    items: [
      {
        question: '¿Hace falta reservar siempre para comer bien en Huelva?',
        answer:
          'No siempre, pero si apuntas a sitios concretos o a horas cómodas, prever un poco evita decisiones peores por prisa o saturación.',
      },
      {
        question: '¿Qué funciona mejor: sentarse en un sitio o hacer varias paradas?',
        answer:
          'Depende del plan. Si quieres foco y menos fricción, una buena mesa. Si quieres ritmo y variedad, pocas paradas bien elegidas.',
      },
      {
        question: '¿Cómo evitar comer en un sitio “correcto” pero sin gracia?',
        answer:
          'Definiendo antes qué esperas del momento. Cuando sabes si buscas producto, rapidez o ambiente, filtras mucho mejor el ruido.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    eyebrow: 'Cuando ya sabes qué tipo de comida buscas',
    title: 'Quédate con dos o tres referencias y deja de marearte',
    body:
      'Si quieres resolver bien en el centro, empieza por Gran Vía Uno. Si buscas una mesa con más intención, mira Azabache. Si el plan arranca por la mañana, quédate en el eje centro-mercado y elige donde veas movimiento real. Luego ordena el resto del día alrededor de esa decisión.',
    kicker: 'La comida buena empieza bastante antes del primer plato: empieza cuando dejas de comparar tonterías.',
    primaryAction: {
      label: 'Ver qué hacer en Huelva',
      href: '/que-ver',
    },
    secondaryAction: {
      label: 'Montar el fin de semana',
      href: '/fin-de-semana',
    },
  },
  relatedGuides: {
    eyebrow: 'Si quieres que la comida encaje con el resto del día',
    title: 'Sigue afinando el viaje',
    guides: [
      {
        title: 'Dónde alojarse en Huelva',
        description: 'El sitio donde duermes condiciona mucho mejor el plan de lo que parece.',
        href: '/alojarse',
      },
      {
        title: 'Qué ver en Huelva',
        description: 'Para no llenar el día de relleno turístico flojo.',
        href: '/que-ver',
      },
      {
        title: 'Fin de semana en Huelva',
        description: 'Para integrar bien comida, paseo y ritmo de escapada.',
        href: '/fin-de-semana',
      },
    ],
  },
};
