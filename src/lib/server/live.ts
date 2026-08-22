import { createServerFn } from "@tanstack/react-start";

export type LiveWeather = {
  place: string;
  tempC: number | null;
  windKmh: number | null;
  desc: string;
};

export type LiveCamera = {
  id: string;
  name: string;
  road: string;
  src: string;
};

const CAMERAS: LiveCamera[] = [
  {
    id: "a49-huelva",
    name: "A-49 · acceso Huelva",
    road: "A-49",
    src: "https://infocar.dgt.es/etraffic/data/camaras/Camara01043.jpg",
  },
  {
    id: "h30",
    name: "H-30 · ronda",
    road: "H-30",
    src: "https://infocar.dgt.es/etraffic/data/camaras/Camara01046.jpg",
  },
  {
    id: "a49-san-juan",
    name: "A-49 · San Juan del Puerto",
    road: "A-49",
    src: "https://infocar.dgt.es/etraffic/data/camaras/Camara01041.jpg",
  },
];

async function wttr(query: string, place: string): Promise<LiveWeather> {
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(query)}?format=j1`, {
      headers: { "User-Agent": "huelva.cloud/pulse" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error("wttr");
    const data = (await res.json()) as {
      current_condition?: {
        temp_C?: string;
        windspeedKmph?: string;
        lang_es?: { value: string }[];
        weatherDesc?: { value: string }[];
      }[];
    };
    const cur = data.current_condition?.[0];
    const desc =
      cur?.lang_es?.[0]?.value ?? cur?.weatherDesc?.[0]?.value ?? "Sin parte";
    return {
      place,
      tempC: cur?.temp_C != null ? Number(cur.temp_C) : null,
      windKmh: cur?.windspeedKmph != null ? Number(cur.windspeedKmph) : null,
      desc,
    };
  } catch {
    return { place, tempC: null, windKmh: null, desc: "Parte no disponible" };
  }
}

export const getLivePulse = createServerFn({ method: "GET" }).handler(async () => {
  const [capital, punta] = await Promise.all([
    wttr("Huelva,Spain", "Capital"),
    wttr("Punta Umbria,Spain", "Punta Umbría"),
  ]);
  return {
    weather: [capital, punta],
    cameras: CAMERAS,
    fetchedAt: new Date().toISOString(),
  };
});
