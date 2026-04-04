import type { AlojarseGuideData } from '@/types/guides';

export const dondeComerGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía local · Huelva para comer bien',
    title: 'Dónde comer en Huelva sin acabar en un sitio correcto y ya',
    subtitle:
      'En Huelva se come muy bien si sabes qué estás buscando. El problema no es que falten sitios; el problema es mezclar bares, mesas serias, tapeo y producto como si todo jugara en la misma liga. Aquí va el filtro útil.',
    quickFacts: [
      { label: 'Error típico', value: 'Elegir por fama vacía' },
      { label: 'Si quieres acertar', value: 'Elige por momento y expectativa' },
      { label: 'Clave real', value: 'No todo “recomendado” merece desvío' },
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
    title: 'La versión corta para comer bien sin comerte el día decidiendo',
    intro: 'Si no quieres abrir veinte pestañas ni tragarte listas blandas, empieza aquí.',
    items: [
      {
        title: 'Decide primero qué tipo de comida quieres',
        description:
          'No se elige igual un sitio para resolver bien una comida que uno para montar una experiencia más tranquila o más de producto.',
      },
      {
        title: 'No confundas sitio famoso con sitio que compensa',
        description:
          'Hay lugares muy nombrados que están bien y ya. Lo interesante es detectar cuáles justifican de verdad el tiempo, el precio o el desvío.',
      },
      {
        title: 'Menos opciones, mejor filtro',
        description:
          'Una buena selección corta vale más que una guía kilométrica que no te ayuda a decidir nada.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    eyebrow: 'Dónde se gana una comida y dónde se pierde',
    title: 'Qué compensa más según el tipo de comida que buscas',
    intro:
      'Lo importante no es solo comer, sino acertar con el contexto: rapidez, producto, ambiente, pausa o plan de escapada.',
    cards: [
      {
        name: 'Comer bien sin complicarte',
        bestFor: 'Quien quiere una apuesta clara, rica y funcional',
        good: ['Más fácil de acertar', 'Menos desgaste decidiendo', 'Encaja mejor en escapadas con plan apretado'],
        tradeoffs: ['Puede tener menos efecto wow', 'No siempre será la comida más memorable del viaje'],
        mobility: 'Alta. Es la opción más sólida cuando quieres que todo fluya.',
        verdict:
          'Muy buena jugada si priorizas seguridad, ritmo y una experiencia sin tonterías.',
      },
      {
        name: 'Comer con más intención',
        bestFor: 'Quien quiere producto, contexto o una comida más protagonista',
        good: ['Más personalidad', 'Más posibilidad de recuerdo fuerte', 'Más premio si eliges bien'],
        tradeoffs: ['Aquí equivocarte duele más', 'No todo sitio con nombre entrega de verdad'],
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
    title: 'Qué tipo de sitio te conviene según el plan que llevas',
    intro: 'La decisión buena cambia mucho si vas a resolver, disfrutar, celebrar o simplemente no perder tiempo comiendo mediocre.',
    options: [
      {
        label: 'Comer bien sin drama',
        audience: 'Quieres un sitio sólido y una decisión rápida',
        recommendation: 'Busca sitios honestos, fluidos y con propuesta clara. Aquí gana el filtro, no la espectacularidad artificial.',
      },
      {
        label: 'Comida protagonista del día',
        audience: 'Quieres que sentarte a comer sea una parte fuerte de la escapada',
        recommendation: 'Prioriza lugares con producto, intención y contexto. Si vas a darle peso al momento, no lo resuelvas con algo simplemente correcto.',
      },
      {
        label: 'Tapeo o varias paradas',
        audience: 'Prefieres más movimiento y menos comida larga de mesa fija',
        recommendation: 'Elige bien dos o tres decisiones buenas. Encadenar demasiadas solo convierte el plan en dispersión.',
      },
      {
        label: 'Poco tiempo y tolerancia cero al fallo',
        audience: 'Necesitas una apuesta defendible y sin experimentos raros',
        recommendation: 'No persigas hype. Ve a algo claro, bien ejecutado y que no dependa de que “ese día” salga fino.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    eyebrow: 'Mi forma de filtrar aquí',
    title: 'Mi recomendación, sin repartir medallas por ruido ni por postureo gastronómico',
    body:
      'Para comer bien en Huelva, primero decide el momento: resolver, disfrutar, tapear o sentarte en serio. Cuando haces esa separación, caen solas muchas recomendaciones infladas y se quedan las que de verdad tienen sentido.',
    highlight:
      'Comer bien aquí no va de perseguir el nombre más repetido. Va de elegir el sitio correcto para el momento correcto.',
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
        title: 'No decidir el tipo de comida antes',
        description: 'Si no sabes si quieres resolver rápido, comer con calma o tapear, acabarás comparando cosas que no compiten entre sí.',
      },
      {
        title: 'Buscar “el mejor” como si fuera una respuesta única',
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
    title: 'Elige el momento y recorta la lista sin piedad',
    body:
      'Si ya sabes qué tipo de comida quieres, no sigas comparando sitios que no compiten entre sí. Quédate con dos o tres opciones buenas y construye el resto del día alrededor de eso.',
    kicker: 'La comida buena empieza bastante antes del primer plato: empieza al dejar de comparar ruido.',
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
