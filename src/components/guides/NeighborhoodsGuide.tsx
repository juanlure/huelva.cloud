'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Coffee, Waves, Tree, Building2, Navigation, X, Filter } from 'lucide-react';

interface Neighborhood {
  id: string;
  name: string;
  letter: string;
  description: string;
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
}

const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'centro',
    name: 'Casco Histórico',
    letter: 'C',
    description: 'El corazón latente de Huelva. Calles empedradas, plazas con encanto y el mejor tapeo de la ciudad.',
    tags: ['Histórico', 'Vibrante', 'Turístico', 'Cultural'],
    distance: 'Centro',
    vibes: { beach: 2, nightlife: 5, value: 3, culture: 5, food: 5 },
    transport: ['Todo cerca', 'Bus L1-L4'],
    bestFor: ['Primera visita', 'Amantes de la historia', 'Foodies'],
    highlights: ['Catedral', 'Plaza de las Monjas', 'Casa Colón', 'Barrio de la Merced'],
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'reina-victoria',
    name: 'Barrio Reina Victoria',
    letter: 'R',
    description: 'Pequeña Inglaterra en Huelva. Casas victorianas, jardines y vistas al río que te transportan a otra época.',
    tags: ['Histórico', 'Tranquilo', 'Fotogénico', 'único'],
    distance: '15 min a pie',
    vibes: { beach: 2, nightlife: 2, value: 4, culture: 5, food: 3 },
    transport: ['20 min andando', 'Bus L2', 'Taxi ~6€'],
    bestFor: ['Amantes de la arquitectura', 'Fotógrafos', 'Quienes buscan tranquilidad'],
    highlights: ['Casas británicas', 'Vistas al río', 'BIC desde 2002', 'Atardeceres'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'paseo',
    name: 'Paseo de la Cinta',
    letter: 'P',
    description: 'El pulmón de la ciudad. 3km de paseo marítimo con vistas al Odiel, perfecto para perder la tarde.',
    tags: ['Marítimo', 'Relax', 'Deportes', 'Familiar'],
    distance: '5 min del centro',
    vibes: { beach: 4, nightlife: 2, value: 5, culture: 3, food: 4 },
    transport: ['10 min andando', 'Bus L2-L4'],
    bestFor: ['Paseos', 'Deportistas', 'Familias', 'Atardeceres'],
    highlights: ['Vistas al Muelle del Tinto', 'Monumento a Colón', 'Zonas de ejercicio', 'Chiringuitos'],
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'moret',
    name: 'Barrio de Moret',
    letter: 'M',
    description: 'Huelva trabajadora. Calles anchas, mercado de abastos y vida real lejos del turismo.',
    tags: ['Auténtico', 'Local', 'Económico', 'Residencial'],
    distance: '10 min a pie',
    vibes: { beach: 1, nightlife: 3, value: 5, culture: 2, food: 5 },
    transport: ['15 min andando', 'Bus L1-L3'],
    bestFor: ['Viajeros con presupuesto', 'Quienes buscan autenticidad', 'Compra local'],
    highlights: ['Mercado de Abastos', 'Comercios locales', 'Bares de precíos honestos'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'las-colombinas',
    name: 'Zona Colombinas',
    letter: 'Z',
    description: 'El área moderna de la ciudad. Comercios, oficinas y la zona más expansiva de Huelva.',
    tags: ['Moderno', 'Comercial', 'Práctico', 'Residencial'],
    distance: '20 min a pie',
    vibes: { beach: 1, nightlife: 3, value: 4, culture: 2, food: 4 },
    transport: ['En autobús', 'Taxi ~8€', 'Coche recomendado'],
    bestFor: ['Compras', 'Estancias largas', 'Familias'],
    highlights: ['Centro comercial', 'Zona nueva', 'Aparcamiento fácil'],
    color: 'from-stone-500 to-zinc-500'
  },
  {
    id: 'polvorin',
    name: 'El Polvorín',
    letter: 'E',
    description: 'Barrio en expansión con buena conexión y precios más asequibles. Autenticidad onubense.',
    tags: ['Residencial', 'Económico', 'En crecimiento', 'Local'],
    distance: '25 min a pie',
    vibes: { beach: 2, nightlife: 2, value: 5, culture: 1, food: 4 },
    transport: ['Bus L4', 'Coche recomendado'],
    bestFor: ['Presupuesto ajustado', 'Estancias largas', 'Quienes buscan tranquilidad'],
    highlights: ['Zona residencial', 'Precios bajos', 'Autenticidad'],
    color: 'from-lime-500 to-green-500'
  },
];

const TRAVELER_TYPES = [
  { id: 'foodie', name: 'Foodie', icon: '🍽️', description: 'Buscas la mejor gastronomía' },
  { id: 'culture', name: 'Cultura', icon: '🏛️', description: 'Museos, historia y monumentos' },
  { id: 'beach', name: 'Playa', icon: '🏖️', description: 'Vistas al mar y chiringuitos' },
  { id: 'nightlife', name: 'Fiesta', icon: '🎉', description: 'Vida nocturna y copas' },
  { id: 'family', name: 'Familia', icon: '👨‍👩‍👧', description: 'Seguridad y espacios para niños' },
  { id: 'budget', name: 'Ahorro', icon: '💰', description: 'El mejor calidad-precio' },
];

const RANKING_CATEGORIES = [
  { key: 'beach', name: 'Playa', icon: '🏖️' },
  { key: 'nightlife', name: 'Fiesta', icon: '🎉' },
  { key: 'value', name: 'Valor', icon: '💰' },
  { key: 'culture', name: 'Cultura', icon: '🏛️' },
  { key: 'food', name: 'Comida', icon: '🍽️' },
];

export default function NeighborhoodsGuide() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [selectedTravelers, setSelectedTravelers] = useState<string[]>([]);
  const [showFilterInfo, setShowFilterInfo] = useState(false);

  const filteredNeighborhoods = NEIGHBORHOODS.filter(n => {
    if (selectedTravelers.length === 0) return true;
    return n.bestFor.some(bf => {
      if (selectedTravelers.includes('foodie')) return bf === 'Foodies';
      if (selectedTravelers.includes('culture')) return bf.includes('Amantes de la historia') || bf.includes('arquitectura');
      if (selectedTravelers.includes('beach')) return bf.includes('Paseos') || n.tags.includes('Marítimo');
      if (selectedTravelers.includes('nightlife')) return n.vibes.nightlife >= 4;
      if (selectedTravelers.includes('family')) return n.tags.includes('Familiar');
      if (selectedTravelers.includes('budget')) return n.vibes.value >= 4 || n.tags.includes('Económico');
      return false;
    });
  });

  const getRankings = () => {
    return RANKING_CATEGORIES.map(cat => ({
      ...cat,
      ranked: [...NEIGHBORHOODS].sort((a, b) => b.vibes[cat.key as keyof typeof a.vibes] - a.vibes[cat.key as keyof typeof a.vibes])
    }));
  };

  const toggleTraveler = (id: string) => {
    setSelectedTravelers(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50 to-stone-100">
      {/* Header */}
      <div className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 mb-8"
          >
            <MapPin size={16} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-800 uppercase tracking-widest">
              Guía Interactiva
            </span>
          </motion.div>

          <h1 className="text-display text-5xl md:text-6xl font-semibold text-stone-900 mb-6">
            Barrios de Huelva
          </h1>

          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Cada barrio tiene su propia personalidad. Encuentra el tuyo según tu estilo de viaje.
          </p>

          <p className="text-sm text-stone-500 italic">
            Por Antonio Torre · Redactor | Patrimonio & Historia
          </p>
        </div>
      </div>

      {/* Traveler Type Filter */}
      <div className="container mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                <Filter size={20} className="text-amber-600" />
                ¿Qué tipo de viajero eres?
              </h2>
              {selectedTravelers.length > 0 && (
                <button
                  onClick={() => setSelectedTravelers([])}
                  className="text-sm text-amber-600 hover:text-amber-800 flex items-center gap-1"
                >
                  <X size={16} />
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {TRAVELER_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleTraveler(type.id)}
                  className={`px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedTravelers.includes(type.id)
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-amber-300'
                  }`}
                >
                  <span className="text-lg mr-2">{type.icon}</span>
                  <span className="font-medium">{type.name}</span>
                </button>
              ))}
            </div>

            {selectedTravelers.length > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 text-sm text-stone-500"
              >
                Mostrando {filteredNeighborhoods.length} barrio{filteredNeighborhoods.length !== 1 ? 's' : ''} para tu perfil
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Neighborhoods Grid */}
      <div className="container pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNeighborhoods.map((hood, index) => (
              <motion.div
                key={hood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedNeighborhood(hood)}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className={`h-32 bg-gradient-to-br ${hood.color} p-6 relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-stone-800 mb-2 group-hover:scale-110 transition-transform">
                      {hood.letter}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {hood.name}
                  </h3>

                  <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                    {hood.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hood.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <Navigation size={14} />
                    {hood.distance}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="container pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">Rankings por Categoría</h2>

          <div className="grid md:grid-cols-5 gap-4">
            {getRankings().map(category => (
              <div key={category.key} className="bg-white rounded-2xl p-4 border border-stone-200">
                <div className="text-center mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <p className="text-sm font-medium text-stone-700 mt-1">{category.name}</p>
                </div>

                <div className="space-y-2">
                  {category.ranked.slice(0, 5).map((hood, idx) => (
                    <div key={hood.id} className="flex items-center gap-2 text-sm">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-amber-400 text-white' :
                        idx === 1 ? 'bg-stone-300 text-white' :
                        idx === 2 ? 'bg-amber-200 text-stone-700' :
                        'bg-stone-100 text-stone-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="truncate text-stone-700">{hood.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNeighborhood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNeighborhood(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Header */}
              <div className={`h-40 bg-gradient-to-br ${selectedNeighborhood.color} p-8 relative`}>
                <button
                  onClick={() => setSelectedNeighborhood(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>

                <div className="flex items-end gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-stone-800">
                    {selectedNeighborhood.letter}
                  </div>
                  <div className="text-white">
                    <h2 className="text-3xl font-bold">{selectedNeighborhood.name}</h2>
                    <p className="text-white/80 flex items-center gap-2">
                      <Navigation size={16} />
                      {selectedNeighborhood.distance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-stone-600 mb-8">{selectedNeighborhood.description}</p>

                {/* Vibe Bars */}
                <div className="mb-8">
                  <h3 className="font-bold text-stone-800 mb-4">Vibe del Barrio</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedNeighborhood.vibes).map(([key, value]) => {
                      const cat = RANKING_CATEGORIES.find(c => c.key === key);
                      return (
                        <div key={key} className="flex items-center gap-3">
                          <span className="w-16 text-center">{cat?.icon}</span>
                          <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value * 20}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                            />
                          </div>
                          <span className="w-8 text-right text-sm text-stone-500">{value}/5</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-8">
                  <h3 className="font-bold text-stone-800 mb-3">Ideal Para</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNeighborhood.bestFor.map(item => (
                      <span key={item} className="px-3 py-2 bg-amber-50 text-amber-800 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="font-bold text-stone-800 mb-3">Lugares Destacados</h3>
                  <div className="space-y-2">
                    {selectedNeighborhood.highlights.map(item => (
                      <div key={item} className="flex items-center gap-2 text-stone-600">
                        <Star size={16} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div>
                  <h3 className="font-bold text-stone-800 mb-3">Cómo Llegar</h3>
                  <div className="space-y-2">
                    {selectedNeighborhood.transport.map(item => (
                      <div key={item} className="flex items-center gap-2 text-stone-600">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Author Note */}
      <div className="container pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-stone-200 shadow-lg">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&fit=crop" alt="Antonio Torre" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-stone-800">Antonio Torre</p>
              <p className="text-sm text-stone-500">Redactor | Patrimonio & Historia</p>
            </div>
            <p className="text-sm text-stone-400 italic">"La historia se escribe con datos."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
