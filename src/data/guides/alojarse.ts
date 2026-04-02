import type { AlojarseGuideData } from '@/types/guides';

export const alojarseGuideData: AlojarseGuideData = {
  hero: {
    eyebrow: 'Guía premium',
    title: 'Dónde alojarse en Huelva: qué zona elegir según tu viaje',
    subtitle:
      'Si no quieres perder tiempo comparando opciones mediocres, aquí tienes la forma más rápida de decidir si te conviene dormir en Huelva capital, en la costa o en una base más práctica según tu plan, presupuesto y forma de moverte.',
    quickFacts: [
      { label: 'Mejor para primera vez', value: 'Huelva capital' },
      { label: 'Mejor para playa', value: 'Costa de Huelva' },
      { label: 'Clave real', value: 'La base condiciona todo el viaje' },
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
    title: 'Decisión rápida',
    intro: 'Si no quieres leerte media internet para decidir bien, empieza aquí.',
    items: [
      {
        title: 'Quédate en Huelva capital',
        description:
          'Si vienes por primera vez, quieres base práctica y prefieres moverte fácil sin hipotecar el viaje a una sola zona.',
      },
      {
        title: 'Quédate en la costa',
        description:
          'Si tu prioridad absoluta es playa, descanso y ritmo vacacional. No si quieres mezclar demasiados planes.',
      },
      {
        title: 'No elijas solo por precio',
        description:
          'El alojamiento barato mal situado parece ahorro, pero luego te lo cobra en tiempo, coche y cansancio.',
      },
    ],
  },
  zoneComparison: {
    sectionId: 'capital-o-costa',
    title: 'Capital o costa: qué cambia de verdad',
    intro:
      'No es una diferencia decorativa. Cambian la logística, el ritmo del viaje y lo que realmente aprovechas cada día.',
    cards: [
      {
        name: 'Huelva capital',
        bestFor: 'Primera visita, escapadas mixtas y base más eficiente',
        good: ['Más central', 'Más servicios', 'Mejor para combinar planes'],
        tradeoffs: ['Menos sensación vacacional', 'No duermes junto al mar'],
        mobility: 'Muy buena para entrar, salir y reorganizar el día sin drama.',
        verdict:
          'Es la base más inteligente para la mayoría. No la más aspiracional en foto, sí la más útil.',
      },
      {
        name: 'Costa de Huelva',
        bestFor: 'Viajes centrados en playa, descanso y ambiente costero',
        good: ['Más ambiente vacacional', 'Mejor acceso a playa', 'Más desconexión'],
        tradeoffs: ['Peor como base mixta', 'Más dependencia del coche'],
        mobility: 'Correcta si tu viaje gira alrededor de costa y no quieres complicarte con más frentes.',
        verdict:
          'Tiene sentido cuando vienes claramente a costa. Si no, te puede encorsetar el viaje.',
      },
    ],
  },
  bestFor: {
    sectionId: 'segun-tu-viaje',
    title: 'Qué te conviene según tu viaje',
    intro: 'Aquí se corta el ruido. No todo el mundo necesita la misma base.',
    options: [
      {
        label: 'Primera vez en Huelva',
        audience: 'Quien quiere una base fácil y sin errores tontos',
        recommendation: 'Huelva capital.',
      },
      {
        label: 'Viaje de playa',
        audience: 'Quien prioriza mar, paseo y chiringuito',
        recommendation: 'Costa de Huelva.',
      },
      {
        label: 'Escapada corta',
        audience: 'Quien necesita optimizar tiempos',
        recommendation: 'Base céntrica y práctica.',
      },
      {
        label: 'Ruta en coche',
        audience: 'Quien va a moverse entre varios puntos',
        recommendation: 'Elige conectividad, no postal bonita.',
      },
    ],
  },
  recommendation: {
    sectionId: 'mi-recomendacion',
    title: 'Mi recomendación',
    body:
      'Si vienes por primera vez y no tienes un motivo muy claro para dormir en la costa, quédate en Huelva capital. Es la base más flexible, la que menos fricción genera y la que mejor te deja corregir sobre la marcha.',
    highlight:
      'La mayoría no necesita la opción más bonita. Necesita la opción que hace que el viaje salga bien.',
  },
  commonMistakes: {
    sectionId: 'errores-tipicos',
    title: 'Errores típicos al elegir alojamiento',
    intro: 'Aquí es donde mucha gente la lía sin darse cuenta.',
    mistakes: [
      {
        title: 'Elegir solo por precio',
        description: 'Lo barato mal ubicado se paga en desplazamientos, cansancio y peor experiencia.',
      },
      {
        title: 'Comprar una foto de portada',
        description: 'Una imagen bonita no corrige una base torpe ni una mala logística.',
      },
      {
        title: 'No pensar el viaje entero',
        description: 'Dormir lejos de lo que realmente vas a hacer te rompe el ritmo del plan.',
      },
    ],
  },
  accommodationTypes: {
    sectionId: 'tipos-alojamiento',
    title: 'Qué tipo de alojamiento te encaja',
    intro: 'No todo es hotel. El formato también cambia la experiencia.',
    cards: [
      {
        title: 'Hotel urbano',
        bestFor: 'Escapadas prácticas y primeras visitas',
        pros: ['Más sencillo', 'Mejor logística', 'Menos fricción'],
        cons: ['Puede sentirse genérico si eliges sin criterio'],
      },
      {
        title: 'Apartamento',
        bestFor: 'Parejas, familias o estancias algo más largas',
        pros: ['Más flexibilidad', 'Más espacio', 'Mejor autonomía'],
        cons: ['La calidad es muy desigual'],
      },
      {
        title: 'Alojamiento en costa',
        bestFor: 'Vacaciones centradas en mar y descanso',
        pros: ['Más ambiente vacacional', 'Cercanía a playa'],
        cons: ['Peor base si quieres mezclar muchos planes'],
      },
    ],
  },
  faq: {
    sectionId: 'faq',
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Es mejor dormir en Huelva capital o en la costa?',
        answer:
          'Para la mayoría que viene por primera vez, Huelva capital suele ser la base más útil. La costa compensa cuando el viaje gira claramente alrededor de la playa.',
      },
      {
        question: '¿Cuántas noches conviene quedarse?',
        answer:
          'Para una primera toma de contacto, una escapada corta bien planteada ya permite ver bastante sin saturarte.',
      },
      {
        question: '¿Conviene reservar con antelación?',
        answer:
          'Sí. Sobre todo si no quieres quedarte con lo mediocre en fechas de más demanda.',
      },
    ],
  },
  cta: {
    sectionId: 'reservar',
    title: 'Reserva con criterio, no por impulso',
    body:
      'Si ya tienes claro qué tipo de base necesitas, el siguiente paso es filtrar bien y descartar rápido lo que solo parece buena idea en fotos.',
    primaryAction: {
      label: 'Explorar alojamientos',
      href: '#',
    },
    secondaryAction: {
      label: 'Seguir planificando el viaje',
      href: '/guias',
    },
  },
  relatedGuides: {
    title: 'Sigue afinando tu viaje',
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
