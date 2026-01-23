'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Huelva Coords: 37.2614, -6.9447
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.26&longitude=-6.94&current=temperature_2m,weather_code&timezone=Europe%2FMadrid');
        const json = await res.json();
        
        const temp = Math.round(json.current.temperature_2m);
        const code = json.current.weather_code;
        
        let condition = '☀️';
        if (code > 3) condition = '☁️';
        if (code > 50) condition = '🌧️';
        if (code > 90) condition = '⚡';

        setData({ temp, condition });
      } catch (e) {
        console.error("Weather fetch failed", e);
      }
    };

    fetchWeather();
  }, []);

  if (!data) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
      <span>{data.condition}</span>
      <span>{data.temp}°C</span>
    </div>
  );
}
