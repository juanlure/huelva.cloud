'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudDrizzle,
  Snow,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Calendar,
  Sparkles,
  Umbrella,
  Waves,
} from 'lucide-react';

// Coordenadas de Huelva
const HUELVA_COORDS = { lat: 37.2588, lon: -6.9492 };

interface WeatherData {
  current: {
    temperature: number;
    apparentTemperature: number;
    isDay: boolean;
    weatherCode: number;
    windSpeed: number;
    windDirection: number;
    humidity: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitationProbability: number[];
    sunrise: string[];
    sunset: string[];
  };
  location?: string;
}

// Códigos de tiempo WMO
const weatherCodes: Record<number, { icon: React.ReactNode; label: string; description: string; bg: string }> = {
  0: { icon: <Sun size={48} />, label: 'Despejado', description: 'Cielo despejado', bg: 'from-amber-400 to-orange-500' },
  1: { icon: <Sun size={48} />, label: 'Mainly despejado', description: 'Mayormente despejado', bg: 'from-amber-300 to-orange-400' },
  2: { icon: <Cloud size={48} />, label: 'Parcialmente nublado', description: 'Parcialmente nublado', bg: 'from-slate-300 to-slate-400' },
  3: { icon: <Cloud size={48} />, label: 'Nublado', description: 'Nublado', bg: 'from-slate-400 to-slate-500' },
  45: { icon: <CloudFog size={48} />, label: 'Niebla', description: 'Niebla', bg: 'from-slate-300 to-slate-400' },
  48: { icon: <CloudFog size={48} />, label: 'Niebla escarchada', description: 'Niebla con escarcha', bg: 'from-slate-200 to-slate-300' },
  51: { icon: <CloudDrizzle size={48} />, label: 'Llovizna ligera', description: 'Llovizna ligera', bg: 'from-blue-300 to-blue-400' },
  53: { icon: <CloudDrizzle size={48} />, label: 'Llovizna moderada', description: 'Llovizna moderada', bg: 'from-blue-400 to-blue-500' },
  55: { icon: <CloudDrizzle size={48} />, label: 'Llovizna densa', description: 'Llovizna densa', bg: 'from-blue-400 to-blue-600' },
  61: { icon: <CloudRain size={48} />, label: 'Lluvia ligera', description: 'Lluvia ligera', bg: 'from-blue-400 to-blue-600' },
  63: { icon: <CloudRain size={48} />, label: 'Lluvia moderada', description: 'Lluvia moderada', bg: 'from-blue-500 to-blue-700' },
  65: { icon: <CloudRain size={48} />, label: 'Lluvia fuerte', description: 'Lluvia fuerte', bg: 'from-blue-600 to-blue-800' },
  71: { icon: <Snow size={48} />, label: 'Nieve ligera', description: 'Nieve ligera', bg: 'from-slate-200 to-slate-300' },
  73: { icon: <Snow size={48} />, label: 'Nieve moderada', description: 'Nieve moderada', bg: 'from-slate-300 to-slate-400' },
  75: { icon: <Snow size={48} />, label: 'Nieve fuerte', description: 'Nieve fuerte', bg: 'from-slate-400 to-slate-500' },
  80: { icon: <CloudRain size={48} />, label: 'Chubascos', description: 'Chubascos', bg: 'from-blue-400 to-blue-600' },
  81: { icon: <CloudRain size={48} />, label: 'Chubascos moderados', description: 'Chubascos moderados', bg: 'from-blue-500 to-blue-700' },
  82: { icon: <CloudRain size={48} />, label: 'Chubascos violentos', description: 'Chubascos violentos', bg: 'from-blue-600 to-blue-800' },
  95: { icon: <CloudRain size={48} />, label: 'Tormenta eléctrica', description: 'Tormenta eléctrica', bg: 'from-slate-600 to-slate-800' },
  96: { icon: <CloudRain size={48} />, label: 'Tormenta con granizo', description: 'Tormenta con granizo ligero', bg: 'from-slate-700 to-slate-900' },
  99: { icon: <CloudRain size={48} />, label: 'Tormenta fuerte', description: 'Tormenta con granizo fuerte', bg: 'from-slate-800 to-black' },
};

const getWeatherInfo = (code: number) => {
  return weatherCodes[code] || weatherCodes[0];
};

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Hoy';
  if (date.toDateString() === tomorrow.toDateString()) return 'Mañana';

  return date.toLocaleDateString('es-ES', { weekday: 'long' });
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return directions[Math.round(degrees / 45) % 8];
};

const getUVIndexLevel = (uv: number) => {
  if (uv <= 2) return { level: 'Bajo', color: 'text-green-600', bg: 'bg-green-50' };
  if (uv <= 5) return { level: 'Moderado', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  if (uv <= 7) return { level: 'Alto', color: 'text-orange-600', bg: 'bg-orange-50' };
  if (uv <= 10) return { level: 'Muy alto', color: 'text-red-600', bg: 'bg-red-50' };
  return { level: 'Extremo', color: 'text-purple-600', bg: 'bg-purple-50' };
};

// Datos de ejemplo por si falla la API
const fallbackData: WeatherData = {
  current: {
    temperature: 22,
    apparentTemperature: 21,
    isDay: true,
    weatherCode: 0,
    windSpeed: 12,
    windDirection: 270,
    humidity: 65,
    pressure: 1015,
    visibility: 10,
    uvIndex: 5,
  },
  daily: {
    time: [
      new Date().toISOString().split('T')[0],
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
      new Date(Date.now() + 172800000).toISOString().split('T')[0],
      new Date(Date.now() + 259200000).toISOString().split('T')[0],
      new Date(Date.now() + 345600000).toISOString().split('T')[0],
      new Date(Date.now() + 432000000).toISOString().split('T')[0],
      new Date(Date.now() + 518400000).toISOString().split('T')[0],
    ],
    weatherCode: [0, 1, 2, 3, 45, 51, 0],
    temperatureMax: [24, 25, 23, 22, 20, 21, 24],
    temperatureMin: [15, 16, 15, 14, 13, 14, 15],
    precipitationProbability: [0, 5, 20, 40, 60, 80, 10],
    sunrise: ['2024-01-01T08:30', '2024-01-02T08:29', '2024-01-03T08:28', '2024-01-04T08:27', '2024-01-05T08:26', '2024-01-06T08:25', '2024-01-07T08:24'],
    sunset: ['2024-01-01T18:45', '2024-01-02T18:46', '2024-01-03T18:47', '2024-01-04T18:48', '2024-01-05T18:49', '2024-01-06T18:50', '2024-01-07T18:51'],
  },
  location: 'Huelva',
};

interface WeatherWidgetProps {
  compact?: boolean;
  variant?: 'default' | 'card' | 'hero';
}

export default function WeatherWidget({ compact = false, variant = 'default' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${HUELVA_COORDS.lat}&longitude=${HUELVA_COORDS.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe/Madrid&forecast_days=7`;

        const response = await fetch(url);
        const data = await response.json();

        setWeather({
          current: {
            temperature: Math.round(data.current.temperature_2m),
            apparentTemperature: Math.round(data.current.apparent_temperature),
            isDay: data.current.is_day === 1,
            weatherCode: data.current.weather_code,
            windSpeed: Math.round(data.current.wind_speed_10m),
            windDirection: data.current.wind_direction_10m,
            humidity: data.current.relative_humidity_2m,
            pressure: Math.round(data.current.surface_pressure),
            visibility: Math.round(data.current.visibility / 1000),
            uvIndex: Math.round(data.current.uv_index * 10) / 10,
          },
          daily: {
            time: data.daily.time,
            weatherCode: data.daily.weather_code,
            temperatureMax: data.daily.temperature_2m_max.map((t: number) => Math.round(t)),
            temperatureMin: data.daily.temperature_2m_min.map((t: number) => Math.round(t)),
            precipitationProbability: data.daily.precipitation_probability_max,
            sunrise: data.daily.sunrise,
            sunset: data.daily.sunset,
          },
          location: 'Huelva',
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(true);
        setWeather(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-sky-100 to-blue-200 rounded-3xl p-8 animate-pulse">
        <div className="h-40 bg-white/30 rounded-2xl mb-4" />
        <div className="h-6 bg-white/30 rounded w-1/2 mb-4" />
        <div className="h-4 bg-white/30 rounded w-1/3" />
      </div>
    );
  }

  if (!weather) return null;

  const currentWeather = getWeatherInfo(weather.current.weatherCode);
  const uvInfo = getUVIndexLevel(weather.current.uvIndex);

  // Variante compacta para sidebar
  if (compact) {
    return (
      <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80 mb-1">Huelva</p>
            <p className="text-3xl font-bold">{weather.current.temperature}°</p>
            <p className="text-xs opacity-80">{currentWeather.label}</p>
          </div>
          <div className="text-white/80">
            {currentWeather.icon}
          </div>
        </div>
      </div>
    );
  }

  // Variante tarjeta
  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-br ${currentWeather.bg} rounded-3xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <Waves size={14} />
              Huelva, España
            </p>
            <p className="text-5xl font-bold mt-2">{weather.current.temperature}°</p>
            <p className="text-white/90">{currentWeather.description}</p>
          </div>
          <div className="text-white/90">
            {currentWeather.icon}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-white/80">
          <span className="flex items-center gap-1">
            <Thermometer size={14} />
            S. térmica {weather.current.apparentTemperature}°
          </span>
          <span className="flex items-center gap-1">
            <Droplets size={14} />
            {weather.current.humidity}%
          </span>
        </div>
      </div>
    );
  }

  // Variante hero/por defecto - widget completo
  return (
    <div className="w-full">
      <div className={`relative rounded-3xl overflow-hidden ${currentWeather.bg}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                {currentWeather.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 text-white/80 mb-1">
                  <Waves size={16} />
                  <span className="text-sm font-medium">Huelva, España</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-white">{weather.current.temperature}°</h1>
                <p className="text-white/90 text-lg">{currentWeather.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
              >
                <Calendar size={14} className="inline mr-2" />
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </motion.div>
            </div>
          </div>

          {/* Current details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            <DetailCard
              icon={<Thermometer size={20} />}
              label="Sensación"
              value={`${weather.current.apparentTemperature}°`}
            />
            <DetailCard
              icon={<Droplets size={20} />}
              label="Humedad"
              value={`${weather.current.humidity}%`}
            />
            <DetailCard
              icon={<Wind size={20} />}
              label="Viento"
              value={`${weather.current.windSpeed} km/h ${getWindDirection(weather.current.windDirection)}`}
            />
            <DetailCard
              icon={<Eye size={20} />}
              label="Visibilidad"
              value={`${weather.current.visibility} km`}
            />
            <DetailCard
              icon={<Gauge size={20} />}
              label="Presión"
              value={`${weather.current.pressure} hPa`}
            />
            <DetailCard
              icon={<Sparkles size={20} />}
              label="UV"
              value={uvInfo.level}
              valueColor={uvInfo.color}
              valueBg={uvInfo.bg}
            />
          </div>

          {/* Sun times */}
          <div className="flex items-center justify-center gap-8 mb-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-3 text-white">
              <Sunrise size={24} />
              <div>
                <p className="text-xs text-white/70">Amanecer</p>
                <p className="font-semibold">{formatTime(weather.daily.sunrise[0])}</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="flex items-center gap-3 text-white">
              <Sunset size={24} />
              <div>
                <p className="text-xs text-white/70">Atardecer</p>
                <p className="font-semibold">{formatTime(weather.daily.sunset[0])}</p>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-white rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-terracotta" />
              Próximos 7 días
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {weather.daily.time.map((date, idx) => {
                const dayWeather = getWeatherInfo(weather.daily.weatherCode[idx]);
                const isExpanded = expandedDay === idx;
                const hasPrecipitation = weather.daily.precipitationProbability[idx] > 20;

                return (
                  <motion.div
                    key={date}
                    whileHover={{ y: -4 }}
                    onClick={() => setExpandedDay(isExpanded ? null : idx)}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isExpanded
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {/* Precipitation indicator */}
                    {hasPrecipitation && (
                      <div className="absolute top-2 right-2">
                        <Umbrella size={14} className="text-blue-500" />
                      </div>
                    )}

                    <p className="text-sm font-semibold text-navy mb-1">
                      {getDayName(date)}
                    </p>
                    <p className="text-xs text-slate-400 mb-3">{formatDate(date)}</p>

                    <div className="text-terracotta mb-3">
                      {React.cloneElement(dayWeather.icon as React.ReactElement, {
                        size: 28,
                        className: 'text-slate-600',
                      })}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-navy">{weather.daily.temperatureMax[idx]}°</span>
                      <span className="text-slate-400">{weather.daily.temperatureMin[idx]}°</span>
                    </div>

                    {weather.daily.precipitationProbability[idx] > 0 && (
                      <p className="text-xs text-blue-500 mt-2 flex items-center gap-1">
                        <Droplets size={10} />
                        {weather.daily.precipitationProbability[idx]}%
                      </p>
                    )}

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500"
                      >
                        <p>{dayWeather.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Sunrise size={12} />
                          {formatTime(weather.daily.sunrise[idx])}
                          <span className="mx-1">·</span>
                          <Sunset size={12} />
                          {formatTime(weather.daily.sunset[idx])}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Source */}
          <div className="mt-6 text-center text-white/60 text-xs">
            Datos: Open-Meteo · Actualizado: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Weather tips for Huelva */}
      <div className="mt-6 p-6 bg-sand rounded-3xl border border-navy-10">
        <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-terracotta" />
          Tips del día en Huelva
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {weather.current.weatherCode === 0 && weather.current.temperature > 20 && (
            <>
              <TipItem
                icon="☀️"
                title="Playa recomendada"
                text="Día perfecto para Punta Umbría o Mazagón. No olvides el protector solar (UV {weather.current.uvIndex})."
              />
              <TipItem
                icon="🍦"
                title="Helado obligatorio"
                text="Aprovecha para pasear por el Muelle del Tinto y tomarte un helado en la Cinta."
              />
            </>
          )}
          {weather.daily.precipitationProbability[0] > 50 && (
            <>
              <TipItem
                icon="☔"
                title="Lluvia probable"
                text="Lleva paraguas. Los días de lluvia son perfectos para museos (Casa Colón) o tapeo cubierto."
              />
              <TipItem
                icon="🏛️"
                title="Plan cultural"
                text="Visita la Catedral o el Centro de Recepción de visitantes de Marismas del Odiel."
              />
            </>
          )}
          {weather.current.windSpeed > 20 && (
            <>
              <TipItem
                icon="💨"
                title="Día ventoso"
                text="Ideal para practicar windsurf en las marismas. Abrígate bien en la costa."
              />
            </>
          )}
          {weather.current.temperature < 15 && (
            <>
              <TipItem
                icon="🧥"
                title="Fresquito"
                text="Abrígate. Un buen día para chocos con tomate en un bar calefado del centro."
              />
            </>
          )}
          {!weather.current.isDay && (
            <TipItem
              icon="🌙"
              title="Noche en Huelva"
              text="Para salir de copas, prueba la zona de pubs o las terrazas de la Cinta si hace bueno."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
  valueColor = 'text-white',
  valueBg = 'bg-white/20',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  valueBg?: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
      <div className="flex items-center gap-2 text-white/70 mb-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}

function TipItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-semibold text-navy text-sm">{title}</p>
        <p className="text-navy-60 text-sm">{text}</p>
      </div>
    </div>
  );
}
