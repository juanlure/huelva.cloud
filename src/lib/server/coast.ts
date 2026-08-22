import { createServerFn } from "@tanstack/react-start";
import * as SunCalc from "suncalc";

export type WindRegime = "calma" | "levante" | "poniente" | "norte" | "sur";

export type CoastStation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  tempC: number | null;
  feelsC: number | null;
  windKmh: number | null;
  windDeg: number | null;
  windDir: string | null;
  regime: WindRegime;
  humidity: number | null;
  precipMm: number | null;
  uv: number | null;
  desc: string;
};

export type SunWindow = {
  sunrise: string;
  sunset: string;
  goldenHour: string;
  minutesToSunset: number;
  past: boolean;
};

export type LiveAdvice = {
  title: string;
  dek: string;
  guide: "cuenca" | "ocaso" | "carta" | "orilla" | "marea";
};

export type LiveCoast = {
  stations: CoastStation[];
  sun: SunWindow;
  advice: LiveAdvice;
  fetchedAt: string;
  hour: number;
};

const STATIONS = [
  { id: "capital", name: "Capital", query: "Huelva,Spain", lat: 37.266, lng: -6.95 },
  { id: "punta", name: "Punta Umbría", query: "Punta Umbria,Spain", lat: 37.182, lng: -6.967 },
  { id: "mazagon", name: "Mazagón", query: "Mazagon,Spain", lat: 37.137, lng: -6.83 },
  { id: "isla", name: "Isla Cristina", query: "Isla Cristina,Spain", lat: 37.199, lng: -7.325 },
  { id: "matalascanas", name: "Matalascañas", query: "Matalascanas,Spain", lat: 37.016, lng: -6.555 },
  { id: "aracena", name: "Aracena", query: "Aracena,Spain", lat: 37.891, lng: -6.561 },
] as const;

const madridClock = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const madridHourFmt = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  hour: "numeric",
  hour12: false,
});

function clock(date: Date) {
  return madridClock.format(date);
}

function madridHour() {
  return Number(madridHourFmt.format(new Date()));
}

export function regimeFrom(deg: number | null, kmh: number | null): WindRegime {
  if (kmh == null || kmh < 12) return "calma";
  if (deg == null) return "calma";
  if (deg >= 45 && deg < 135) return "levante";
  if (deg >= 225 && deg < 315) return "poniente";
  if (deg >= 315 || deg < 45) return "norte";
  return "sur";
}

export const REGIME_LABEL: Record<WindRegime, string> = {
  calma: "Calma",
  levante: "Levante",
  poniente: "Poniente",
  norte: "Norte",
  sur: "Sur",
};

function sunWindow(lat: number, lng: number, now = new Date()): SunWindow {
  const times = SunCalc.getTimes(now, lat, lng);
  const sunset = times.sunset ?? now;
  const sunrise = times.sunrise ?? now;
  const golden = times.goldenHour ?? sunset;
  const minutesToSunset = Math.round((sunset.getTime() - now.getTime()) / 60000);
  return {
    sunrise: clock(sunrise),
    sunset: clock(sunset),
    goldenHour: clock(golden),
    minutesToSunset,
    past: minutesToSunset <= 0,
  };
}

async function wttrStation(spec: (typeof STATIONS)[number]): Promise<CoastStation> {
  const empty: CoastStation = {
    id: spec.id,
    name: spec.name,
    lat: spec.lat,
    lng: spec.lng,
    tempC: null,
    feelsC: null,
    windKmh: null,
    windDeg: null,
    windDir: null,
    regime: "calma",
    humidity: null,
    precipMm: null,
    uv: null,
    desc: "Parte no disponible",
  };
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(spec.query)}?format=j1`, {
      headers: { "User-Agent": "huelva.cloud/live" },
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) return empty;
    const data = (await res.json()) as {
      current_condition?: {
        temp_C?: string;
        FeelsLikeC?: string;
        windspeedKmph?: string;
        winddirDegree?: string;
        winddir16Point?: string;
        humidity?: string;
        precipMM?: string;
        uvIndex?: string;
        lang_es?: { value: string }[];
        weatherDesc?: { value: string }[];
      }[];
    };
    const cur = data.current_condition?.[0];
    if (!cur) return empty;
    const windKmh = cur.windspeedKmph != null ? Number(cur.windspeedKmph) : null;
    const windDeg = cur.winddirDegree != null ? Number(cur.winddirDegree) : null;
    return {
      id: spec.id,
      name: spec.name,
      lat: spec.lat,
      lng: spec.lng,
      tempC: cur.temp_C != null ? Number(cur.temp_C) : null,
      feelsC: cur.FeelsLikeC != null ? Number(cur.FeelsLikeC) : null,
      windKmh,
      windDeg,
      windDir: cur.winddir16Point ?? null,
      regime: regimeFrom(windDeg, windKmh),
      humidity: cur.humidity != null ? Number(cur.humidity) : null,
      precipMm: cur.precipMM != null ? Number(cur.precipMM) : null,
      uv: cur.uvIndex != null ? Number(cur.uvIndex) : null,
      desc: cur.lang_es?.[0]?.value ?? cur.weatherDesc?.[0]?.value ?? "Sin parte",
    };
  } catch {
    return empty;
  }
}

function advise(stations: CoastStation[], sun: SunWindow, hour: number): LiveAdvice {
  const costa = stations.find((s) => s.id === "punta") ?? stations[0];
  const raining = (costa?.precipMm ?? 0) > 0.2 || /lluv|rain|tormenta|chubasco/i.test(costa?.desc ?? "");
  const windy = (costa?.windKmh ?? 0) >= 28;
  const hot = (costa?.tempC ?? 0) >= 32;

  if (raining) {
    return {
      title: "Hoy, techo",
      dek: "Llueve sobre la ría. Mercado del Carmen, Casa Colón o la Gruta si subes a Aracena.",
      guide: "cuenca",
    };
  }
  if (!sun.past && sun.minutesToSunset <= 75 && sun.minutesToSunset > 0) {
    return {
      title: "Hora del hierro",
      dek: `El sol se pone a las ${sun.sunset}. El Muelle de Riotinto, ahora.`,
      guide: "ocaso",
    };
  }
  if (hour >= 13 && hour < 16) {
    return {
      title: "Hora de mesa",
      dek: hot
        ? "Calor de verdad. Sombra, gamba a la plancha, Condado frío."
        : "Las 14:00. Gamba, choco, el rito de esta costa.",
      guide: "carta",
    };
  }
  if (hour >= 9 && hour < 20) {
    const pick =
      costa?.regime === "levante"
        ? "Mazagón aguanta mejor el levante."
        : costa?.regime === "poniente" && windy
          ? "Poniente fuerte. El Portil o los pinos de Mazagón."
          : "Punta Umbría está en su sitio.";
    return {
      title: `${REGIME_LABEL[costa?.regime ?? "calma"]} en la orilla`,
      dek: pick,
      guide: "orilla",
    };
  }
  if (hour >= 20 || hour < 9) {
    return {
      title: sun.past ? "La ría de noche" : `Ocaso a las ${sun.sunset}`,
      dek: sun.past
        ? "Terraza en la capital o el paseo de Punta. El Atlántico no se apaga."
        : "Todavía hay luz. Elige un oeste.",
      guide: "ocaso",
    };
  }
  return {
    title: "Estás en Huelva",
    dek: "Ría, gamba, Atlántico. Elige guía.",
    guide: "marea",
  };
}

type Cache = { at: number; data: LiveCoast };
let cache: Cache | null = null;
const TTL = 8 * 60 * 1000;

async function pullCoast(): Promise<LiveCoast> {
  const stations = await Promise.all(STATIONS.map(wttrStation));
  const sun = sunWindow(37.266, -6.95);
  const hour = madridHour();
  return {
    stations,
    sun,
    advice: advise(stations, sun, hour),
    fetchedAt: new Date().toISOString(),
    hour,
  };
}

export async function loadLiveCoast(): Promise<LiveCoast> {
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  const data = await pullCoast();
  cache = { at: Date.now(), data };
  return data;
}

export const getLiveCoast = createServerFn({ method: "GET" }).handler(async () => {
  return loadLiveCoast();
});

export function nearestStation(stations: CoastStation[], lat: number, lng: number) {
  return stations.reduce((best, s) => {
    const d = (s.lat - lat) ** 2 + (s.lng - lng) ** 2;
    const bd = (best.lat - lat) ** 2 + (best.lng - lng) ** 2;
    return d < bd ? s : best;
  });
}
