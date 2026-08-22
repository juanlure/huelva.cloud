export type QuizOption = {
  id: string;
  label: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  hint: string;
  options: QuizOption[];
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "gamba",
    prompt: "La gamba de Huelva, la de verdad, es…",
    hint: "Si dices roja en una lonja, te miran raro.",
    options: [
      { id: "blanca", label: "Blanca, casi translúcida en crudo", correct: true },
      { id: "roja", label: "Roja, como la de Garrucha o Palamós", correct: false },
      { id: "tigre", label: "Tigre, de acuicultura", correct: false },
    ],
  },
  {
    id: "choco",
    prompt: "Si pides «choco» en Punta Umbría, te traen…",
    hint: "No es el calamar del menú del día.",
    options: [
      { id: "sepia", label: "Sepia, normalmente frita", correct: true },
      { id: "calamar", label: "Calamar romano", correct: false },
      { id: "pulpo", label: "Pulpo a la gallega", correct: false },
    ],
  },
  {
    id: "colon",
    prompt: "Las naves de Colón zarparon de…",
    hint: "No fue Cádiz, por más que lo diga la película.",
    options: [
      { id: "palos", label: "Palos de la Frontera", correct: true },
      { id: "cadiz", label: "El puerto de Cádiz", correct: false },
      { id: "sevilla", label: "Las atarazanas de Sevilla", correct: false },
    ],
  },
  {
    id: "barrio",
    prompt: "El barrio de casas inglesas de las minas se llama…",
    hint: "Los onubenses dicen Barrio Obrero.",
    options: [
      { id: "reina", label: "Reina Victoria", correct: true },
      { id: "carmen", label: "El Carmen", correct: false },
      { id: "orden", label: "La Orden", correct: false },
    ],
  },
  {
    id: "tinto",
    prompt: "El río que baja rojo del norte se llama…",
    hint: "No es un vino, aunque lo parezca.",
    options: [
      { id: "tinto", label: "Tinto", correct: true },
      { id: "odiel", label: "Odiel", correct: false },
      { id: "guadi", label: "Guadiana", correct: false },
    ],
  },
  {
    id: "jamon",
    prompt: "El jamón que se defiende en esta provincia es el de…",
    hint: "Encina, sierra, no denominación de revista.",
    options: [
      { id: "jabugo", label: "Jabugo", correct: true },
      { id: "teruel", label: "Teruel", correct: false },
      { id: "trevelez", label: "Trevélez", correct: false },
    ],
  },
  {
    id: "onuba",
    prompt: "«Onubense» viene de…",
    hint: "Un nombre anterior a Huelva.",
    options: [
      { id: "onuba", label: "Onuba, el nombre romano de la ciudad", correct: true },
      { id: "onu", label: "La ONU, en broma de bar", correct: false },
      { id: "nube", label: "Las nubes del Atlántico", correct: false },
    ],
  },
  {
    id: "donana",
    prompt: "Doñana queda, respecto a Huelva capital…",
    hint: "Hacia Matalascañas, no hacia Portugal.",
    options: [
      { id: "este", label: "Al sureste, pegada al Atlántico", correct: true },
      { id: "norte", label: "Al norte, en la sierra", correct: false },
      { id: "pt", label: "En Portugal, al otro lado del Guadiana", correct: false },
    ],
  },
  {
    id: "fresa",
    prompt: "La fresa de Huelva se cultiva sobre todo en…",
    hint: "Tierra llana, plásticos y Niebla al fondo.",
    options: [
      { id: "palos", label: "Palos, Moguer, Lucena… la tierra llana", correct: true },
      { id: "aracena", label: "Los castañares de Aracena", correct: false },
      { id: "punta", label: "Los arenales de Punta Umbría", correct: false },
    ],
  },
  {
    id: "fiesta",
    prompt: "Las Colombinas, la feria grande de la capital, caen en…",
    hint: "Calor, casetas y el final del verano escolar.",
    options: [
      { id: "verano", label: "Finales de julio y comienzos de agosto", correct: true },
      { id: "mayo", label: "La Cruz de Mayo", correct: false },
      { id: "navidad", label: "La semana entre Navidad y Reyes", correct: false },
    ],
  },
];

export type QuizRank = {
  id: "onubense" | "casi" | "aplicado" | "perdido";
  title: string;
  dek: string;
  min: number;
};

export const QUIZ_RANKS: QuizRank[] = [
  {
    id: "onubense",
    min: 9,
    title: "Onubense de cuna",
    dek: "Puedes pedir gamba, discutir de Colombinas y señalar El Conquero sin sacar el mapa. La provincia te debe un choco.",
  },
  {
    id: "casi",
    min: 7,
    title: "Te falta una gamba",
    dek: "Vas bien. Te falta una tarde en la lonja y otra en Jabugo. Vuelve en octubre.",
  },
  {
    id: "aplicado",
    min: 4,
    title: "Guiri aplicado",
    dek: "Has leído, y se nota. Ahora sal de la placa de Colón y anda el Muelle del Tinto a las ocho.",
  },
  {
    id: "perdido",
    min: 0,
    title: "Guiri perdido",
    dek: "Bienvenido. Empieza por el test otra vez… o mejor por un plato de choco y la guía de 48 horas.",
  },
];

export function rankForScore(score: number): QuizRank {
  return QUIZ_RANKS.find((rank) => score >= rank.min) ?? QUIZ_RANKS[QUIZ_RANKS.length - 1]!;
}
