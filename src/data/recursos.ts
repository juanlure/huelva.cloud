export type RecursoKind = "mar" | "sierra" | "camino" | "ciudad" | "urgencia";

export type Recurso = {
  id: string;
  name: string;
  dek: string;
  href: string;
  kind: RecursoKind;
  official: boolean;
};

export const RECURSO_KIND_LABEL: Record<RecursoKind, string> = {
  mar: "Mar y ría",
  sierra: "Sierra",
  camino: "Camino",
  ciudad: "Ciudad",
  urgencia: "Urgencia",
};

export const RECURSOS: Recurso[] = [
  {
    id: "aemet",
    name: "AEMET · Huelva",
    dek: "El parte, no el influencer del tiempo. Avisos de poniente y de calor.",
    href: "https://www.aemet.es/es/eltiempo/prediccion/municipios/huelva-id21041",
    kind: "mar",
    official: true,
  },
  {
    id: "dgt",
    name: "DGT · infocar",
    dek: "A-49, H-30, cámaras. Si hay retén, se ve aquí antes que en el grupo.",
    href: "https://infocar.dgt.es/",
    kind: "camino",
    official: true,
  },
  {
    id: "donana",
    name: "Parque Nacional de Doñana",
    dek: "Visitas, centros y lo que no se pisa. Organismo Autónomo Parques Nacionales.",
    href: "https://www.miteco.gob.es/es/parques-nacionales-oapn/red-parques-nacionales/parques/donana.html",
    kind: "mar",
    official: true,
  },
  {
    id: "aracena",
    name: "Parque Natural Sierra de Aracena y Picos de Aroche",
    dek: "Senderos, jamón y sombra. Junta de Andalucía.",
    href: "https://www.juntadeandalucia.es/medioambiente/portal/web/ventanadelvisitante/detalle-buscador-mapa/-/asset_publisher/orKS8MUCAvY6/content/parque-natural-sierra-de-aracena-y-picos-de-aroche/255035",
    kind: "sierra",
    official: true,
  },
  {
    id: "puerto",
    name: "Puerto de Huelva",
    dek: "Trafico de muelle, avisos y la ría como infraestructura, no como postal.",
    href: "https://www.puertohuelva.com/",
    kind: "mar",
    official: true,
  },
  {
    id: "diputacion",
    name: "Diputación de Huelva",
    dek: "La provincia, no solo la capital. Agenda y servicios comarcales.",
    href: "https://www.diphuelva.es/",
    kind: "ciudad",
    official: true,
  },
  {
    id: "ayto",
    name: "Ayuntamiento de Huelva",
    dek: "Cita previa, bandos, el Carmen, la Cinta. Lo municipal.",
    href: "https://www.huelva.es/",
    kind: "ciudad",
    official: true,
  },
  {
    id: "turismo",
    name: "Turismo de Huelva",
    dek: "Oficina oficial. Úsala para horarios; el criterio, aquí.",
    href: "https://www.turismohuelva.org/",
    kind: "ciudad",
    official: true,
  },
  {
    id: "emtus",
    name: "EMTUS · buses urbanos",
    dek: "Líneas de la capital. El mapa de la casa no sustituye la app, pero apunta.",
    href: "https://www.emtus.es/",
    kind: "camino",
    official: true,
  },
  {
    id: "renfe",
    name: "Renfe · Huelva",
    dek: "El tren existe. Zafra, Sevilla, Madrid cuando hay plaza.",
    href: "https://www.renfe.com/",
    kind: "camino",
    official: true,
  },
  {
    id: "112",
    name: "112 Andalucía",
    dek: "Urgencias. No es un recurso de guía: es el que importa si algo se tuerce.",
    href: "https://www.112andalucia.es/",
    kind: "urgencia",
    official: true,
  },
  {
    id: "playas",
    name: "Playas de Huelva · Junta",
    dek: "Calidad de aguas y banderas. El poniente no sale en el PDF.",
    href: "https://www.juntadeandalucia.es/medioambiente/portal/web/guest/areas-tematicas/agua/playas",
    kind: "mar",
    official: true,
  },
];
