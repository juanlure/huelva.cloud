'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Coffee, Waves, Trees, Building2, Navigation, X, Filter, Camera, Sunset, Utensils, Music } from 'lucide-react';

// Imágenes reales de Huelva - Wikimedia Commons
const NEIGHBORHOOD_IMAGES = {
  centro: '/images/guides/ayuntamiento-huelva.jpg',
  reinaVictoria: '/images/guides/barrio-reina-victoria-hero.jpg',
  pescaderia: '/images/guides/muelle-tinto-riotinto.jpg',
  islaChica: '/images/guides/iglesia-rocio-huelva.jpg',
  conquero: '/images/guides/santuario-cinta-huelva.jpg',
  source: 'Wikimedia Commons'
};

interface Neighborhood {
  id: string;
  name: string;
  letter: string;
  description: string;
  longDescription: string;
  tags: string[];
  distance: string;
  vibes: {
    beach: number;
    nightlife: number;
    value: number;
    culture: number;
    food: number;
  };
  transport: string[];
  bestFor: string[];
  highlights: string[];
  color: string;
  image: string;
}

const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'centro',
    name: 'Casco Histórico',
    letter: 'CH',
    description: 'El corazón peatonal. Cultura, compras y la ruta oficial del tapeo.',
    longDescription: 'Donde todo pasa. Un laberinto peatonal de calles llenas de vida, terrazas y comercio. Desde la Palmera hasta la Plaza de las Monjas, es el lugar para ver y ser visto. Aquí se mezclan los edificios modernistas con la vida administrativa y el bullicio de los bares.',
    tags: ['Histórico', 'Peatonal', 'Cultural', 'Gastronómico'],
    distance: 'Centro neurálgico',
    vibes: { beach: 1, nightlife: 4, value: 3, culture: 5, food: 5 },
    transport: ['Caminando', 'Bus Central'],
    bestFor: ['Primera visita', 'Foodies', 'Culturetas', 'Compras'],
    highlights: ['Plaza de las Monjas', 'Gran Teatro', 'Casa Colón', 'Calle Concepción'],
    color: 'from-amber-600 to-orange-600',
    image: NEIGHBORHOOD_IMAGES.centro
  },
  {
    id: 'reina-victoria',
    name: 'Barrio Obrero',
    letter: 'BO',
    description: 'Un trozo de Inglaterra victoriana en el sur. Patrimonio único.',
    longDescription: 'Construido por la Rio Tinto Company para sus trabajadores. Un oasis de calma con arquitectura inglesa, jardines cuidados y cuestas empinadas. Patrimonio Histórico y una de las postales más únicas de Huelva. No parece que estés en Andalucía.',
    tags: ['Inglés', 'Monumental', 'Tranquilo', 'Fotogénico'],
    distance: '15 min del centro (a pie)',
    vibes: { beach: 1, nightlife: 1, value: 4, culture: 5, food: 2 },
    transport: ['Bus L1, L2', 'Cuesta arriba'],
    bestFor: ['Instagrammers', 'Arquitectos', 'Paseos románticos', 'Atardeceres'],
    highlights: ['Casa del Guarda', 'Plaza de España', 'Jardines victorianos', 'El Arco'],
    color: 'from-emerald-600 to-teal-700',
    image: NEIGHBORHOOD_IMAGES.reinaVictoria
  },
  {
    id: 'pescaderia',
    name: 'Pescadería',
    letter: 'P',
    description: 'La nueva Huelva mirando a la Ría. Moderno, abierto y con brisa.',
    longDescription: 'El barrio más moderno, recuperando el abrazo de Huelva con su Ría. Espacios abiertos, arquitectura contemporánea y el espectacular Paseo de la Ría. Perfecto para hacer deporte, ver atardeceres y comer marisco con vistas al Odiel.',
    tags: ['Moderno', 'Ría', 'Deporte', 'Marisco'],
    distance: '5 min del centro',
    vibes: { beach: 3, nightlife: 3, value: 3, culture: 3, food: 5 },
    transport: ['Caminando', 'Bicicleta', 'Coche fácil'],
    bestFor: ['Deportistas', 'Familias', 'Amantes del mar', 'Relax'],
    highlights: ['Muelle del Tinto', 'Paseo de la Ría', 'Mercado del Carmen', 'Aqualon'],
    color: 'from-blue-500 to-cyan-600',
    image: NEIGHBORHOOD_IMAGES.pescaderia
  },
  {
    id: 'isla-chica',
    name: 'Isla Chica',
    letter: 'IC',
    description: 'El barrio con más solera. Vida auténtica, comercio local y mucha gente.',
    longDescription: 'Si el centro es el corazón, Isla Chica es el alma castiza. Un barrio denso, vibrante y ruidoso en el buen sentido. Aquí la vida se hace en la calle. El antiguo Estadio Colombino dejó paso a una gran plaza, pero el espíritu de barrio obrero y alegre se mantiene intacto.',
    tags: ['Auténtico', 'Comercial', 'Bullicioso', 'Local'],
    distance: '20 min del centro',
    vibes: { beach: 1, nightlife: 4, value: 5, culture: 2, food: 4 },
    transport: ['Bus L1, L2, L3', 'Taxi barato'],
    bestFor: ['Vivir como un local', 'Tapas baratas', 'Ambiente nocturno', 'Compras de barrio'],
    highlights: ['Antiguo Estadio', 'Iglesia del Rocío', 'Plaza Houston', 'Bares de toda la vida'],
    color: 'from-red-500 to-rose-600',
    image: NEIGHBORHOOD_IMAGES.islaChica
  },
  {
    id: 'conquero',
    name: 'El Conquero',
    letter: 'C',
    description: 'El balcón de Huelva. Vistas panorámicas y atardeceres de cine.',
    longDescription: 'La zona alta de la ciudad. Cabezos de arcilla roja que miran a las marismas del Odiel. Es el lugar de las vistas infinitas, los institutos históricos y la paz. Aquí se viene a ver caer el sol y a visitar a la Patrona en el Santuario de la Cinta.',
    tags: ['Vistas', 'Naturaleza', 'Romántico', 'Patrimonio'],
    distance: '10 min (en coche/bus)',
    vibes: { beach: 2, nightlife: 1, value: 4, culture: 4, food: 2 },
    transport: ['Bus L6', 'Coche imprescindible'],
    bestFor: ['Atardeceres', 'Running', 'Parejas', 'Desconectar'],
    highlights: ['Santuario de la Cinta', 'Miradores', 'Los Cabezos', 'Parque Moret'],
    color: 'from-purple-600 to-indigo-600',
    image: NEIGHBORHOOD_IMAGES.conquero
  }
];

const TRAVELER_TYPES = [
  { id: 'foodie', name: 'Foodie', icon: <Utensils size={18} />, description: 'Buscas la mejor gastronomía' },
  { id: 'culture', name: 'Cultura', icon: <Building2 size={18} />, description: 'Museos, historia y monumentos' },
  { id: 'views', name: 'Vistas', icon: <Sunset size={18} />, description: 'Atardeceres y paisajes' },
  { id: 'local', name: 'Local', icon: <Coffee size={18} />, description: 'Vida auténtica de barrio' },
  { id: 'nightlife', name: 'Fiesta', icon: <Music size={18} />, description: 'Copas y ambiente' },
];

const RANKING_CATEGORIES = [
  { key: 'food', name: 'Gastronómico', icon: <Utensils size={14} /> },
  { key: 'culture', name: 'Cultural', icon: <Building2 size={14} /> },
  { key: 'value', name: 'Económico', icon: <Star size={14} /> },
  { key: 'nightlife', name: 'Nocturno', icon: <Music size={14} /> },
];

export default function NeighborhoodsGuide() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [selectedTravelers, setSelectedTravelers] = useState<string[]>([]);

  const filteredNeighborhoods = NEIGHBORHOODS.filter(n => {
    if (selectedTravelers.length === 0) return true;
    return n.bestFor.some(bf => {
      if (selectedTravelers.includes('foodie')) return bf === 'Foodies' || n.vibes.food >= 4;
      if (selectedTravelers.includes('culture')) return n.vibes.culture >= 4;
      if (selectedTravelers.includes('views')) return n.tags.includes('Vistas') || n.tags.includes('Ría') || n.tags.includes('Fotogénico');
      if (selectedTravelers.includes('local')) return n.tags.includes('Auténtico') || n.tags.includes('Local');
      if (selectedTravelers.includes('nightlife')) return n.vibes.nightlife >= 3;
      return false;
    });
  });

  const toggleTraveler = (id: string) => {
    setSelectedTravelers(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900 pb-24">

      {/* Filters Section */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
              <Filter size={16} />
              <span>Filtra por tu estilo:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRAVELER_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleTraveler(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${selectedTravelers.includes(type.id)
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-600'
                    }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              ))}
              {selectedTravelers.length > 0 && (
                <button
                  onClick={() => setSelectedTravelers([])}
                  className="px-3 py-2 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNeighborhoods.map((hood, idx) => (
            <motion.div
              key={hood.id}
              layoutId={`card-${hood.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedNeighborhood(hood)}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-stone-900">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                  style={{ backgroundImage: `url(${hood.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${hood.color.replace('from-', 'from-black/0 ').replace('to-', 'to-')} opacity-90`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                  {hood.letter}
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-display font-bold mb-2 leading-tight">{hood.name}</h3>
                  <p className="text-white/80 line-clamp-2 text-sm mb-4 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {hood.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {hood.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rankings Section */}
        <div className="mt-24 mb-12">
          <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-stone-900">Top Rankings</h2>
              <p className="text-stone-500">¿Qué buscas exactamente?</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {RANKING_CATEGORIES.map(cat => {
              const top3 = [...NEIGHBORHOODS].sort((a, b) => b.vibes[cat.key as keyof typeof a.vibes] - a.vibes[cat.key as keyof typeof a.vibes]).slice(0, 3);
              return (
                <div key={cat.key} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 text-amber-600">
                    <div className="p-2 bg-amber-50 rounded-xl">{cat.icon}</div>
                    <span className="font-bold uppercase tracking-widest text-xs">{cat.name}</span>
                  </div>
                  <ul className="space-y-4">
                    {top3.map((hood, i) => (
                      <li key={hood.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-700">{hood.name}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${i === 0 ? 'bg-amber-100 text-amber-800' : 'bg-stone-50 text-stone-400'}`}>
                          #{i + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL DETALLE */}
      <AnimatePresence>
        {selectedNeighborhood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setSelectedNeighborhood(null)}
          >
            <motion.div
              layoutId={`card-${selectedNeighborhood.id}`}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedNeighborhood(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="h-64 md:h-auto relative bg-stone-900">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedNeighborhood.image})` }} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedNeighborhood.color} opacity-30 mix-blend-multiply`} />

                  <div className="absolute bottom-0 left-0 p-8 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-6xl font-display font-bold opacity-20 absolute -top-10 left-6">{selectedNeighborhood.letter}</span>
                    <h2 className="text-4xl font-display font-bold mb-2 relative">{selectedNeighborhood.name}</h2>
                    <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                      <Navigation size={14} />
                      {selectedNeighborhood.distance}
                    </div>
                  </div>
                </div>

                {/* Info Side */}
                <div className="p-8 md:p-10 bg-white">
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">La Esencia</h4>
                    <p className="text-lg text-stone-800 leading-relaxed font-medium">
                      {selectedNeighborhood.longDescription}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Vibe Check</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-stone-600">
                          <span>Gastronomía</span>
                          <span>{selectedNeighborhood.vibes.food}/5</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${selectedNeighborhood.vibes.food * 20}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-stone-600">
                          <span>Cultura</span>
                          <span>{selectedNeighborhood.vibes.culture}/5</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedNeighborhood.vibes.culture * 20}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-stone-600">
                          <span>Vida Nocturna</span>
                          <span>{selectedNeighborhood.vibes.nightlife}/5</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedNeighborhood.vibes.nightlife * 20}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-stone-600">
                          <span>Tranquilidad</span>
                          <span>{5 - selectedNeighborhood.vibes.nightlife}/5</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${(5 - selectedNeighborhood.vibes.nightlife) * 20}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                        <Star size={14} className="text-amber-500" /> Imperdibles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNeighborhood.highlights.map(h => (
                          <span key={h} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-sm font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                        <MapPin size={14} className="text-amber-500" /> Ideal para
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNeighborhood.bestFor.map(h => (
                          <span key={h} className="px-3 py-1 border border-stone-200 text-stone-500 rounded-lg text-sm">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
