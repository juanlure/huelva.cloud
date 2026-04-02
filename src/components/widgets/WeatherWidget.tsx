'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  label: string;
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.26&longitude=-6.94&current=temperature_2m,weather_code&timezone=Europe%2FMadrid');
        const json = await res.json();

        const temp = Math.round(json.current.temperature_2m);
        const code = json.current.weather_code;

        let condition = '☀️';
        let label = 'Despejado';

        if (code > 3) {
          condition = '☁️';
          label = 'Nubes';
        }
        if (code > 50) {
          condition = '🌧️';
          label = 'Lluvia';
        }
        if (code > 90) {
          condition = '⚡';
          label = 'Tormenta';
        }

        setData({ temp, condition, label });
      } catch (e) {
        console.error('Weather fetch failed', e);
      }
    };

    fetchWeather();
  }, []);

  if (!data) return null;

  return (
    <div className="flex items-center gap-2 text-[0.92rem] font-medium text-navy/70">
      <span className="text-base">{data.condition}</span>
      <span>{data.temp}°C</span>
      <span className="hidden md:inline text-navy/35">·</span>
      <span className="hidden md:inline text-navy/45 text-[0.82rem] uppercase tracking-[0.14em]">{data.label}</span>
    </div>
  );
}
