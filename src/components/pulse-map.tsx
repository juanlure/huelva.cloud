import { useEffect, useRef } from "react";
import type { Place, PlaceKind } from "@/lib/types";

const KIND_COLOR: Record<PlaceKind, string> = {
  playa: "#1a5c56",
  comer: "#8a4b2a",
  cultura: "#1c1915",
  mercado: "#1a5c56",
  barrio: "#6a635a",
  naturaleza: "#1a5c56",
  mirador: "#1c1915",
};

export function PulseMap({
  places,
  activeKind,
}: {
  places: Place[];
  activeKind: PlaceKind | "all";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([37.26, -6.95], 10);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(map);

      const visible =
        activeKind === "all" ? places : places.filter((p) => p.kind === activeKind);

      const layer = L.layerGroup();
      for (const place of visible) {
        const color = KIND_COLOR[place.kind];
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;border-radius:999px;background:${color};box-shadow:0 0 0 3px ${color}33;border:2px solid #fbf7f0"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([place.lat, place.lng], { icon })
          .bindPopup(
            `<div style="font-family:Figtree,sans-serif;min-width:140px">
              <strong>${place.name}</strong>
              <p style="margin:6px 0 0;color:#6a635a;font-size:13px">${place.blurb}</p>
            </div>`,
          )
          .addTo(layer);
      }
      layer.addTo(map);

      if (visible.length > 1) {
        const bounds = L.latLngBounds(visible.map((p) => [p.lat, p.lng] as [number, number]));
        map.fitBounds(bounds.pad(0.18));
      }

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [places, activeKind]);

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full overflow-hidden rounded-xl"
      aria-label="Mapa de Huelva"
    />
  );
}
