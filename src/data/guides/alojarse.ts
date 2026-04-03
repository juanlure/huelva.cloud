import type { AlojarseGuideData } from '@/types/guides';

export const alojarseGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium · flagship',
    title: 'Dónde alojarse en Huelva sin cagarla: la zona correcta según tu viaje',
    subtitle:
      'La decisión no es hotel vs apartamento. La decisión de verdad es elegir una base que juegue a favor de tu plan. Si eliges mal la zona, el viaje se vuelve más lento, más caro y bastante más torpe.',
    quickFacts: [
      { label: 'Si vienes por primera vez', value: 'Huelva capital' },
      { label: 'Si vienes por playa', value: 'Costa de Huelva' },
      { label: 'Verdad incómoda', value: 'La base manda más que la foto' },
    ],
  },
  toc: [
    { id: 'decision-rapida', label: 'Decisión rápida' },
    { id: 'capital-o-costa', label: 'Capital o costa' },
    { id: 'segun-tu-viaje', label: 'Según tu viaje' },
    { id: 'mi-recomendacion', label: 'Mi recomendación' },
    { id: 'errores-tipicos', label: 'Errores típicos' },
    { id: 'tipos-alojamiento', label: 'Tipos de alojamiento' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reservar', label: 'Reservar' },
  ],
  quickDecision: {
    sectionId: 'decision-rapida',
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
    title: 'Mi recomendación editorial, sin quedar bien con todo el mundo',
    body:
      'Si vienes por primera vez y no tienes un motivo clarísimo para dormir en la costa, quédate en Huelva capital. Es la base que te deja más margen, menos fricción y mejores decisiones durante todo el viaje.',
    highlight:
      'La mayoría no necesita la opción más fotogénica. Necesita la opción que evita un viaje torpe.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
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
    title: 'Siguiente paso: cierra la base y luego monta el resto del viaje',
    body:
      'Si ya sabes qué tipo de base te encaja, el siguiente movimiento útil no es seguir mareando opciones. Es validar zona, cerrar una shortlist corta y seguir con las decisiones que de verdad ordenan la escapada.',
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
