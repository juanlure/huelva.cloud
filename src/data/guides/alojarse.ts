import type { AlojarseGuideData } from '@/types/guides';

export const alojarseGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía local · dónde dormir',
    title: 'Dónde alojarse en Huelva sin elegir una base que te fastidie el viaje',
    subtitle:
      'Aquí la decisión buena no es hotel o apartamento. Es capital o costa, cercanía o peaje, comodidad o foto bonita. Si eliges mal la base, el viaje se vuelve más lento, más caro y bastante más torpe.',
    quickFacts: [
      { label: 'Si vienes por primera vez', value: 'Huelva capital' },
      { label: 'Si vienes por playa', value: 'Costa de Huelva' },
      { label: 'Verdad incómoda', value: 'La base manda más que la foto' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Si quieres cerrar base rápido' },
    { id: 'capital-o-costa', label: 'La decisión que ordena el viaje' },
    { id: 'segun-tu-viaje', label: 'Qué base te sirve' },
    { id: 'mi-recomendacion', label: 'Mi postura' },
    { id: 'errores-tipicos', label: 'Cómo elegir una base mala' },
    { id: 'tipos-alojamiento', label: 'Opciones reales' },
    { id: 'faq', label: 'Dudas antes de reservar' },
    { id: 'reservar', label: 'Cerrar y seguir' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
    eyebrow: 'Si quieres resolver la base sin marearte',
    title: 'La respuesta corta, sin turismo de humo',
    intro: 'Si quieres decidir en 30 segundos y seguir con tu vida, lee esto y ya.',
    items: [
      {
        title: 'Elige Huelva capital',
        description:
          'Si es tu primera vez, si quieres mezclar planes o si valoras una base flexible que no te complique cada desplazamiento.',
      },
      {
        title: 'Elige la costa',
        description:
          'Si vienes a playa de verdad, a bajar revoluciones y a construir el viaje alrededor del mar, no alrededor de una lista de sitios.',
      },
      {
        title: 'No compres una ganga torpe',
        description:
          'Alojamiento barato + mala ubicación = falso ahorro. Luego lo pagas en coche, tiempo, cansancio y peores decisiones.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    eyebrow: 'La decisión que más ordena o estropea el viaje',
    title: 'Huelva capital o costa: aquí se gana o se pierde el viaje',
    intro:
      'Esto no va de gustos abstractos. Va de qué base te deja hacer mejor el viaje que realmente quieres tener, no el que suena bonito en una foto.',
    cards: [
      {
        name: 'Huelva capital',
        bestFor: 'Primera visita, escapadas mixtas y viajes donde manda la eficiencia',
        good: ['Más central para pivotar', 'Más servicios y margen de maniobra', 'Mejor base para combinar planes sin rehacer el día'],
        tradeoffs: ['Menos ambiente de vacaciones puras', 'No sales andando a la arena'],
        mobility: 'Muy buena. Te permite corregir sobre la marcha, entrar y salir fácil y no hipotecar el día a un solo tipo de plan.',
        verdict:
          'Es la decisión más inteligente para la mayoría. No vende la postal más sexy, pero sí el viaje mejor resuelto.',
      },
      {
        name: 'Costa de Huelva',
        bestFor: 'Viajes de playa, descanso y ritmo más lento',
        good: ['Más sensación de escapada', 'Más cerca del mar', 'Mejor para días de playa encadenados'],
        tradeoffs: ['Peor base si quieres mezclar demasiadas cosas', 'Más dependencia del coche y de trayectos'],
        mobility: 'Funciona bien cuando la costa es el plan. Si no, te vuelve menos ágil y más rehén de la geografía.',
        verdict:
          'Compensa cuando vienes claramente a playa. Si tu viaje es mixto, puede parecer buena idea y acabar siendo una molestia cara.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    eyebrow: 'Según el viaje real que vas a hacer',
    resultEyebrow: 'La base que mejor te sirve',
    title: 'Elige la base según el viaje que vas a hacer, no según la foto que te seduce',
    intro: 'Aquí es donde de verdad se limpia el ruido. El mismo alojamiento puede ser perfecto o una mala compra según para qué vengas.',
    options: [
      {
        label: 'Primera vez en Huelva',
        audience: 'Quieres una base simple, útil y sin errores de novato',
        recommendation: 'Huelva capital. Es la opción con más margen para acertar incluso si improvisas parte del viaje.',
      },
      {
        label: 'Viaje de playa serio',
        audience: 'Vienes a mar, paseo, descanso y ritmo vacacional',
        recommendation: 'Costa de Huelva. Aquí sí tiene sentido pagar por cercanía al mar porque esa cercanía es el plan.',
      },
      {
        label: 'Escapada corta de fin de semana',
        audience: 'Necesitas aprovechar bien cada tramo del día',
        recommendation: 'Base práctica y bien conectada. En poco tiempo, la logística manda más que la fantasía.',
      },
      {
        label: 'Ruta en coche y varios frentes',
        audience: 'Vas a moverte mucho y no quieres rehacer trayectos absurdos',
        recommendation: 'Prioriza conectividad y facilidad de entrada/salida. Lo bonito sin eficiencia aquí estorba.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    eyebrow: 'Mi postura aquí es bastante clara',
    title: 'Mi recomendación, sin intentar quedar bien con todas las zonas a la vez',
    body:
      'Si vienes por primera vez y no tienes una razón muy clara para dormir junto al mar, quédate en Huelva capital. Es menos sexy en foto, sí, pero suele darte un viaje bastante mejor resuelto.',
    highlight:
      'La mayoría no necesita la base más bonita. Necesita la base que no le robe tiempo ni energía.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    eyebrow: 'Cómo elegir una base que luego te castiga',
    title: 'Errores típicos que convierten una buena escapada en logística absurda',
    intro: 'Aquí cae mucha gente por querer ahorrar mal, decidir tarde o comprar relato en vez de utilidad.',
    mistakes: [
      {
        title: 'Elegir solo por precio',
        description: 'Lo barato mal colocado casi nunca sale barato. Se convierte en más trayectos, más fricción y menos ganas de hacer cosas.',
      },
      {
        title: 'Comprar la portada y no el viaje',
        description: 'Una foto bonita vende deseo rápido, pero no corrige una base torpe ni una logística mala.',
      },
      {
        title: 'No pensar el viaje completo',
        description: 'Si duermes lejos de lo que realmente vas a hacer, el plan se desgasta antes de empezar.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué formato te encaja de verdad',
    intro: 'No todo es zona. El tipo de alojamiento también cambia cuánto roce o comodidad te llevas en el viaje.',
    cards: [
      {
        title: 'Hotel urbano',
        bestFor: 'Primeras visitas, escapadas cortas y viajes donde importa la facilidad',
        pros: ['Más simple de gestionar', 'Mejor para entrar/salir sin líos', 'Reduce fricción en casi todo el viaje'],
        cons: ['Si eliges uno mediocre, la experiencia se vuelve bastante plana'],
      },
      {
        title: 'Apartamento',
        bestFor: 'Parejas, familias o estancias donde compensa tener más autonomía',
        pros: ['Más espacio', 'Más libertad de horarios', 'Mejor si quieres vivir el viaje a tu ritmo'],
        cons: ['La diferencia entre uno bueno y uno cutre es enorme'],
      },
      {
        title: 'Alojamiento en costa',
        bestFor: 'Vacaciones centradas en playa, paseo y descanso real',
        pros: ['Más sensación de desconexión', 'Más sentido si el mar manda', 'Mejor atmósfera vacacional'],
        cons: ['Si el viaje es mixto, puede volverse una base incómoda'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    eyebrow: 'Las dudas que sí importan antes de reservar',
    title: 'Preguntas frecuentes que sí cambian la decisión',
    items: [
      {
        question: '¿Es mejor dormir en Huelva capital o en la costa?',
        answer:
          'Para la mayoría que viene por primera vez, Huelva capital suele ser la mejor base. La costa gana cuando el viaje está claramente construido alrededor de playa, descanso y ritmo vacacional.',
      },
      {
        question: '¿Cuántas noches conviene quedarse?',
        answer:
          'Para una primera toma de contacto, una escapada corta bien planteada ya da bastante juego. Lo importante no es meter noches por meter, sino elegir una base que no te robe tiempo útil.',
      },
      {
        question: '¿Conviene reservar con antelación?',
        answer:
          'Sí. Especialmente si no quieres quedarte con lo mediocre, con mala ubicación o con precios inflados por decidir tarde.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    eyebrow: 'Cuando la zona ya está decidida',
    title: 'Cierra la base y deja de marear el buscador',
    body:
      'Si ya sabes qué zona te encaja, valida dos o tres opciones decentes y sigue con el resto del viaje. La base buena ordena mucho; perseguir la ganga perfecta solo suele meter ruido.',
    kicker: 'La mayoría de errores aquí no vienen por elegir poco. Vienen por seguir dudando demasiado tarde.',
    primaryAction: {
      label: 'Ver qué ver en Huelva',
      href: '/que-ver',
    },
    secondaryAction: {
      label: 'Planear un fin de semana en Huelva',
      href: '/fin-de-semana',
    },
  },
  relatedGuides: {
    eyebrow: 'Si quieres que dormir bien sirva para algo más',
    title: 'Sigue afinando el viaje para no improvisar mal',
    guides: [
      {
        title: 'Qué ver en Huelva',
        description: 'Lugares que sí merecen tiempo en tu ruta.',
        href: '/que-ver',
      },
      {
        title: 'Playas de Huelva',
        description: 'Dónde compensa ir según el tipo de plan.',
        href: '/playas',
      },
      {
        title: 'Dónde comer en Huelva',
        description: 'Zonas y sitios con más sentido según el momento del viaje.',
        href: '/donde-comer',
      },
    ],
  },
};
