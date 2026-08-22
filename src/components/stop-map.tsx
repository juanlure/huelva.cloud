import { useEffect, useRef } from "react";

export type MapStop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  blurb?: string;
};

export function StopMap({ stops, activeId }: { stops: MapStop[]; activeId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    void (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;
      mapRef.current?.remove();

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([37.26, -6.95], 10);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(map);

      const layer = L.layerGroup();
      for (const stop of stops) {
        const on = stop.id === activeId;
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:${on ? 18 : 12}px;height:${on ? 18 : 12}px;border-radius:999px;background:${on ? "#1a5c56" : "#1c1915"};box-shadow:0 0 0 3px #1a5c5633;border:2px solid #fbf7f0"></div>`,
          iconSize: [on ? 18 : 12, on ? 18 : 12],
          iconAnchor: [on ? 9 : 6, on ? 9 : 6],
        });
        L.marker([stop.lat, stop.lng], { icon })
          .bindPopup(
            `<div style="font-family:Figtree,sans-serif;min-width:140px"><strong>${stop.name}</strong>${stop.blurb ? `<p style="margin:6px 0 0;color:#6a635a;font-size:13px">${stop.blurb}</p>` : ""}</div>`,
          )
          .addTo(layer);
      }
      layer.addTo(map);
      if (stops.length > 1) {
        map.fitBounds(
          L.latLngBounds(stops.map((s) => [s.lat, s.lng] as [number, number])).pad(0.2),
        );
      } else if (stops[0]) {
        map.setView([stops[0].lat, stops[0].lng], 13);
      }
      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stops, activeId]);

  if (stops.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full overflow-hidden rounded-xl bg-foam"
      aria-label="Mapa de la guía"
    />
  );
}
