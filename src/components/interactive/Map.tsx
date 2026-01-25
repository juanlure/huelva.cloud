'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface Marker {
    id: string;
    lat: number;
    lng: number;
    label: string;
}

interface MapProps {
    title?: string;
    center?: [number, number];
    zoom?: number;
    markers?: Marker[];
}

export default function Map({
    title = 'Mapa de Huelva',
    center = [37.2614, -6.9447], // Default to Huelva City
    zoom = 13,
    markers = []
}: MapProps) {

    useEffect(() => {
        (async function init() {
            const L = (await import('leaflet')).default;
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        })();
    }, []);

    return (
        <div className="w-full my-8 bg-white rounded-3xl overflow-hidden shadow-lg border border-navy/5">
            {title && (
                <div className="bg-sand/30 px-6 py-4 border-b border-navy/5">
                    <h3 className="font-display font-bold text-lg text-navy flex items-center">
                        🗺️ {title}
                    </h3>
                </div>
            )}
            <div className="h-[400px] w-full relative z-0">
                <MapContainer
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    {markers.map((marker) => (
                        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                            <Popup>
                                <strong>{marker.label}</strong>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
