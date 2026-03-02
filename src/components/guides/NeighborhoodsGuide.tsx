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

  const categories = ['all', 'foodie', 'culture', 'views', 'local', 'nightlife'];

  return (
    <div className="bg-cream min-h-screen font-sans text-navy pb-32 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-terracotta mb-6"
            >
              <div className="h-px w-12 bg-terracotta/30" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Huelva Discovery Series</span>
            </motion.div>
            <h1 className="text-display text-6xl md:text-8xl lg:text-9xl font-bold text-navy leading-[0.8] mb-8 tracking-tighter">
              Barrios con <br /><span className="italic font-light text-terracotta drop-shadow-sm">Alma</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-60 font-light leading-relaxed max-w-xl">
              Más allá de lo evidente. Una selección curada de los rincones donde Huelva late con su propio compás.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:pb-4 justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedTravelers(cat === 'all' ? [] : [cat])}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border-2 ${
                  (cat === 'all' && selectedTravelers.length === 0) || selectedTravelers.includes(cat)
                    ? 'bg-navy border-navy text-white shadow-2xl scale-105'
                    : 'bg-transparent border-navy/5 text-navy-40 hover:border-navy/20 hover:text-navy'
                }`}
              >
                {cat === 'all' ? 'Ver todo' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {filteredNeighborhoods.map((n, idx) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: (idx % 3) * 0.1 }}
              className={`group cursor-pointer ${
                idx % 5 === 0 ? 'md:col-span-12 lg:col-span-8' : 
                idx % 5 === 1 ? 'md:col-span-12 lg:col-span-4 lg:mt-32' : 
                idx % 5 === 2 ? 'md:col-span-12 lg:col-span-5 lg:-mt-20' :
                idx % 5 === 3 ? 'md:col-span-12 lg:col-span-7' :
                'md:col-span-12 lg:col-span-10 lg:col-start-2'
              }`}
              onClick={() => setSelectedNeighborhood(n)}
            >
              <div className="relative overflow-hidden aspect-[16/10] mb-10 bg-sand group-hover:shadow-2xl transition-shadow duration-700">
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100"
                />
                
                {/* Letter Badge */}
                <div className="absolute top-10 left-10">
                  <span className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white font-display text-2xl font-bold border border-white/20 shadow-2xl">
                    {n.letter}
                  </span>
                </div>

                {/* Tags overlay */}
                <div className="absolute bottom-10 right-10 flex gap-2">
                  {n.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-4 py-2 bg-navy/90 text-white font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-2xl">
                <div className="flex items-center gap-6 mb-6">
                  <span className="text-terracotta font-mono text-[10px] font-bold uppercase tracking-[0.3em]">RANKING #{n.ranking || idx + 1}</span>
                  <div className="h-px flex-1 bg-navy/10" />
                </div>
                <h3 className="text-5xl md:text-7xl font-display font-medium text-navy mb-6 group-hover:text-terracotta transition-colors flex items-center justify-between">
                  {n.name}
                </h3>
                <p className="text-xl md:text-2xl text-navy-60 font-light leading-relaxed mb-8 line-clamp-2 italic">
                  "{n.description}"
                </p>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-navy-30 font-mono text-[10px] uppercase font-bold tracking-widest">
                    <MapPin size={12} className="text-terracotta" />
                    {n.distance}
                  </div>
                  <div className="flex items-center gap-2 text-navy-80 font-mono text-[10px] uppercase font-bold tracking-widest group-hover:text-terracotta transition-colors">
                    Explorar historia
                    <Navigation size={12} className="group-hover:translate-x-1 -rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Selection */}
        <AnimatePresence>
          {selectedNeighborhood && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNeighborhood(null)}
                className="absolute inset-0 bg-navy/95 backdrop-blur-2xl"
              />
              
              <motion.div
                layoutId={`card-${selectedNeighborhood.id}`}
                className="relative w-full max-w-6xl bg-cream rounded-sm overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <img src={selectedNeighborhood.image} alt={selectedNeighborhood.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <div className="absolute top-8 left-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white font-display text-2xl font-bold">
                      {selectedNeighborhood.letter}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 p-8 md:p-20 overflow-y-auto">
                  <button
                    onClick={() => setSelectedNeighborhood(null)}
                    className="absolute top-8 right-8 text-navy/40 hover:text-terracotta transition-colors"
                  >
                    <X size={32} />
                  </button>

                  <div className="mb-12">
                    <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Neighborhood Profile</span>
                    <h2 className="text-6xl md:text-8xl font-display font-bold text-navy mb-6 tracking-tighter">{selectedNeighborhood.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedNeighborhood.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-navy text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-xl prose-navy font-light leading-relaxed text-navy/70 space-y-8">
                    <p className="text-2xl text-navy font-normal italic leading-snug">
                      {selectedNeighborhood.description}
                    </p>
                    <p>{selectedNeighborhood.longDescription}</p>
                    
                    <div className="grid grid-cols-2 gap-12 pt-12 border-t border-navy/10">
                      <div>
                        <h4 className="text-xs font-bold text-navy uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                          <Star size={14} className="text-terracotta" /> Highlights
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                          {selectedNeighborhood.highlights.map(h => (
                            <li key={h} className="text-lg text-navy-60 flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-terracotta/40" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                          <Coffee size={14} className="text-terracotta" /> Best For
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                          {selectedNeighborhood.bestFor.map(b => (
                            <li key={b} className="text-lg text-navy-60 flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
