'use client';

import React, { useState } from 'react';
import { Volume2, Search, X, ChevronRight, MessageSquare, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Term {
  id: string;
  term: string;
  phonetic: string;
  definition: string;
  example: string;
  category: 'comida' | 'expresion' | 'insulto-cariñoso' | 'bebida' | 'naturaleza';
  image?: string;
  verified: boolean;
}

// Datos reales con imágenes de Wikimedia Commons y verificadas
const TERMS: Term[] = [
  {
    id: 'choco',
    term: 'Choco',
    phonetic: '/ˈʧo.ko/',
    definition: 'El rey de Huelva. Sepia o jibia. Si es pequeño es "choquito". Si es frito, es religión. De aquí viene el gentilicio "choquero".',
    example: 'Ponme una de chocos fritos y dos cervezas.',
    category: 'comida',
    image: '/images/guides/choco-frito-tapa.jpg',
    verified: true
  },
  {
    id: 'coquinas',
    term: 'Coquinas',
    phonetic: '/koˈki.nas/',
    definition: 'Pequeños moluscos bivalvos que se comen como pipas tras abrirlas al ajillo. Imprescindible mojar pan en la salsa.',
    example: 'Las coquinas de Huelva no tienen arena, tienen gloria.',
    category: 'comida',
    image: '/images/guides/coquinas-huelva.jpg', // Imagen real
    verified: true
  },
  {
    id: 'gamba',
    term: 'Gamba Blanca',
    phonetic: '/ˈgam.ba ˈblan.ka/',
    definition: 'El marisco más famoso de la costa. Se come cocida con sal gruesa. La cabeza se chupa sí o sí.',
    example: 'Una ración de gambas para empezar, que sean de Huelva.',
    category: 'comida',
    image: '/images/guides/gambas-blancas-huelva.jpg',
    verified: true
  },
  {
    id: 'manchado',
    term: 'Manchado',
    phonetic: '/manˈʧa.ðo/',
    definition: 'Café con mucha leche y apenas una "mancha" de café. Para los que les gusta el café muy suave.',
    example: 'Ponme un manchado templado en vaso.',
    category: 'bebida',
    verified: true
  },
  {
    id: 'aguamala',
    term: 'Aguamala',
    phonetic: '/ˌa.ɣwaˈma.la/',
    definition: 'Medusa. El terror de la playa de Punta Umbría en agosto. Si te pica una, busca vinagre.',
    example: '¡Cuidado que hay aguamalas en la orilla!',
    category: 'naturaleza',
    verified: true
  },
  {
    id: 'choquero',
    term: 'Choquero',
    phonetic: '/ʧoˈke.ɾo/',
    definition: 'Natural de Huelva capital. Orgulloso comedor de chocos. El gentilicio oficial es onubense, este es el del corazón.',
    example: 'Ese es más choquero que un choco frito.',
    category: 'expresion',
    verified: true
  },
  {
    id: 'carajote',
    term: 'Carajote',
    phonetic: '/ka.ɾaˈxo.te/',
    definition: 'Tonto, atontado. Insulto suave que puede ser incluso cariñoso según la entonación.',
    example: 'No seas carajote y ven pacá.',
    category: 'insulto-cariñoso',
    verified: true
  },
  {
    id: 'embrollero',
    term: 'Embrollero',
    phonetic: '/em.bɾoˈʎe.ɾo/',
    definition: 'Persona liosa, que complica las cosas innecesariamente o mete cizaña.',
    example: 'Qué embrollero eres, deja las cosas claras.',
    category: 'insulto-cariñoso',
    verified: true
  },
  {
    id: 'fatiga',
    term: 'Fatiga',
    phonetic: '/faˈti.ɣa/',
    definition: 'No es cansancio, sino sensación de náusea, asco o incluso lástima/vergüenza ajena intensa.',
    example: 'Me dio mucha fatiga verlo comer así.',
    category: 'expresion',
    verified: true
  }
];

export default function ChocoTranslator() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [activeTerm, setActiveTerm] = useState<Term | null>(null);

  const categories = ['all', ...Array.from(new Set(TERMS.map(t => t.category)))];

  const filteredTerms = TERMS.filter(t =>
    (selectedCategory === 'all' || t.category === selectedCategory) &&
    (t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()))
  );

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-12 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-terracotta/10 to-orange-50 border border-terracotta/20 mb-8">
            <Sparkles size={16} className="text-terracotta animate-pulse" />
            <span className="text-sm font-bold text-navy uppercase tracking-widest">
              Vocabulario Choquero Verificado
            </span>
          </div>
          <h1 className="text-display text-4xl md:text-6xl font-semibold text-navy mb-6">
            Diccionario de Bolsillo
          </h1>
          <p className="text-xl text-navy-60 max-w-2xl mx-auto leading-relaxed">
            Palabras recopiladas de fuentes locales fiables. Si no está aquí, es que no se dice en Huelva.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="sticky top-4 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] shadow-lg shadow-navy/5 border border-white/50 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-navy-40" size={20} />
              <input
                type="text"
                placeholder="Busca 'Gamba', 'Choco', 'Fatiga'..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-sand/30 hover:bg-sand/50 transition-colors rounded-2xl border-none focus:ring-2 focus:ring-terracotta/20 text-navy placeholder:text-navy-40 text-lg font-medium"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar scroll-smooth">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-navy text-white shadow-lg shadow-navy/20 scale-105'
                    : 'bg-sand/30 text-navy-60 hover:bg-sand hover:text-navy'
                    }`}
                >
                  {cat === 'all' ? 'Todo' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term) => (
              <motion.div
                key={term.id}
                layoutId={term.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setActiveTerm(term)}
                className="bg-white p-6 rounded-[2rem] border border-navy-10 hover:border-terracotta/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
              >
                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-display font-semibold text-navy group-hover:text-terracotta transition-colors">
                      {term.term}
                    </h3>
                    <span onClick={(e) => { e.stopPropagation(); speak(term.term); }} className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-navy-40 hover:bg-terracotta hover:text-white transition-colors">
                      <Volume2 size={18} />
                    </span>
                  </div>

                  <p className="text-navy-60 text-base leading-relaxed mb-6 line-clamp-3 flex-grow">{term.definition}</p>

                  {term.image ? (
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden mt-auto mb-4 border border-navy-5">
                      <img src={term.image} alt={term.term} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ) : (
                    <div className="mt-auto pt-4 border-t border-navy-5">
                      <div className="text-sm font-mono text-terracotta/80 italic truncate">"{term.example}"</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs font-bold font-mono text-navy-30 uppercase tracking-wider bg-navy-5 px-3 py-1 rounded-full">
                      {term.category}
                    </span>
                    {term.verified && <Star size={14} className="text-terracotta fill-terracotta" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {activeTerm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveTerm(null)}
                className="absolute inset-0 bg-navy/60 backdrop-blur-md"
              />

              <motion.div
                layoutId={activeTerm.id}
                className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveTerm(null)}
                  className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center text-navy shadow-lg transition-all"
                >
                  <X size={24} />
                </button>

                {/* Hero Image in Modal */}
                {activeTerm.image && (
                  <div className="aspect-video relative flex-shrink-0">
                    <img src={activeTerm.image} alt={activeTerm.term} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-24">
                      <span className="inline-block px-3 py-1 bg-terracotta text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-lg shadow-terracotta/20">
                        {activeTerm.category}
                      </span>
                      <h2 className="text-5xl md:text-6xl font-display font-bold text-navy mb-2">{activeTerm.term}</h2>
                      <p className="font-mono text-lg text-terracotta">{activeTerm.phonetic}</p>
                    </div>
                  </div>
                )}

                <div className={`p-8 md:p-10 overflow-y-auto ${!activeTerm.image ? 'pt-16' : ''}`}>
                  {!activeTerm.image && (
                    <div className="mb-8">
                      <span className="inline-block px-3 py-1 bg-terracotta text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-terracotta/20">
                        {activeTerm.category}
                      </span>
                      <h2 className="text-5xl md:text-6xl font-display font-bold text-navy mb-2">{activeTerm.term}</h2>
                      <p className="font-mono text-lg text-terracotta">{activeTerm.phonetic}</p>
                    </div>
                  )}

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-navy-40 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Sparkles size={14} /> Significado
                      </h4>
                      <p className="text-xl md:text-2xl text-navy-80 leading-relaxed font-light">{activeTerm.definition}</p>
                    </div>

                    <div className="bg-sand/30 p-6 md:p-8 rounded-3xl border border-terracotta/10 relative overflow-hidden group hover:bg-sand/50 transition-colors">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-widest mb-4 z-10 relative">
                        <MessageSquare size={14} />
                        Ejemplo de uso
                      </h4>
                      <p className="text-navy font-display text-2xl md:text-3xl italic z-10 relative leading-tight">
                        "{activeTerm.example}"
                      </p>
                      <button
                        onClick={() => speak(activeTerm.example)}
                        className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy-60 hover:text-terracotta hover:scale-110 shadow-sm transition-all z-20"
                      >
                        <Volume2 size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-navy-5 flex justify-between items-center text-xs text-navy-30 tracking-widest uppercase">
                    <span>Verificado</span>
                    <span>Huelva Dictionary</span>
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
