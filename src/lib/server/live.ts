import { createServerFn } from "@tanstack/react-start";
import { CAMERAS } from "@/data/cameras";
import { loadLiveCoast } from "@/lib/server/coast";

export type LiveWeather = {
  place: string;
  tempC: number | null;
  windKmh: number | null;
  desc: string;
};

export const getLivePulse = createServerFn({ method: "GET" }).handler(async () => {
  const coast = await loadLiveCoast();
  return {
    weather: coast.stations.slice(0, 4).map((s) => ({
      place: s.name,
      tempC: s.tempC,
      windKmh: s.windKmh,
      desc: `${s.desc}${s.regime !== "calma" ? ` · ${s.regime}` : ""}`,
    })),
    cameras: CAMERAS,
    sun: coast.sun,
    advice: coast.advice,
    fetchedAt: coast.fetchedAt,
  };
});
