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
    <div className="bg-sand/30 min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-terracotta mb-8"
          >
            <div className="h-px w-12 bg-terracotta/30" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
              Huelva Philology Department
            </span>
          </motion.div>
          <h1 className="text-display text-7xl md:text-9xl font-bold text-navy mb-8 leading-[0.8] tracking-tighter">
            Diccionario <br /><span className="italic font-light text-terracotta">Choquero</span>
          </h1>
          <p className="text-xl md:text-3xl text-navy-60 font-light leading-relaxed">
            Una recopilación exhaustiva del léxico onubense. 
            Donde la semántica se encuentra con la solera de la calle.
          </p>
        </div>

        {/* Search & Filter - More elegant bar */}
        <div className="sticky top-6 z-30 bg-white/40 backdrop-blur-3xl p-3 rounded-full border border-white/20 shadow-2xl mb-20 flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30" size={18} />
            <input
              type="text"
              placeholder="Buscar término (ej. Gamba, Choco, Fatiga...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/50 rounded-full border-none focus:ring-2 focus:ring-terracotta/20 text-navy placeholder:text-navy/30 text-lg font-medium transition-all"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${
                  selectedCategory === cat
                    ? 'bg-navy text-white shadow-xl scale-105'
                    : 'bg-white/50 text-navy/40 hover:bg-white hover:text-navy'
                }`}
              >
                {cat === 'all' ? 'Todo' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Grid - Encyclopedic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term) => (
              <motion.div
                key={term.id}
                layoutId={term.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActiveTerm(term)}
                className="bg-white p-10 rounded-sm border border-navy/5 hover:border-terracotta/20 hover:shadow-[0_20px_50px_-15px_rgba(26,42,58,0.1)] transition-all cursor-pointer group flex flex-col h-full relative"
              >
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-terracotta font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-2 block">{term.category}</span>
                    <h3 className="text-5xl font-display font-medium text-navy group-hover:text-terracotta transition-colors leading-none tracking-tighter">
                      {term.term}
                    </h3>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); speak(term.term); }} 
                    className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-navy/20 hover:bg-terracotta hover:text-white transition-all scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="flex-grow">
                  <p className="text-lg text-navy-60 font-light leading-relaxed line-clamp-4 mb-10 italic">
                    {term.definition}
                  </p>
                </div>

                {term.image && (
                  <div className="aspect-[16/9] overflow-hidden mb-10 bg-sand ring-1 ring-navy/5">
                    <img src={term.image} alt={term.term} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                  </div>
                )}

                <div className="pt-8 border-t border-navy/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-navy/30 uppercase tracking-[0.2em]">Ref: {term.id}</span>
                  <div className="flex items-center gap-1">
                    {term.verified && <Star size={10} className="text-terracotta fill-terracotta" />}
                    <ChevronRight size={14} className="text-navy/20 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Overlay - Elegant and minimalist */}
        <AnimatePresence>
          {activeTerm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveTerm(null)}
                className="absolute inset-0 bg-navy/95 backdrop-blur-3xl"
              />

              <motion.div
                layoutId={activeTerm.id}
                className="relative w-full max-w-5xl bg-cream rounded-sm overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="md:w-1/2 relative h-48 md:h-auto bg-sand flex items-center justify-center overflow-hidden">
                  {activeTerm.image ? (
                    <img src={activeTerm.image} alt={activeTerm.term} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[20rem] font-display font-bold text-navy/5 absolute -rotate-12 select-none">
                      {activeTerm.term[0]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                     <p className="font-mono text-sm tracking-widest uppercase mb-2 opacity-70">Pronunciación</p>
                     <p className="text-4xl font-display font-light italic">{activeTerm.phonetic}</p>
                  </div>
                </div>

                <div className="md:w-1/2 p-8 md:p-24 overflow-y-auto bg-white">
                  <button
                    onClick={() => setActiveTerm(null)}
                    className="absolute top-10 right-10 text-navy/20 hover:text-terracotta transition-colors"
                  >
                    <X size={32} />
                  </button>

                  <div className="mb-16">
                    <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4 block">{activeTerm.category}</span>
                    <h2 className="text-7xl md:text-8xl font-display font-bold text-navy mb-8 tracking-tighter leading-none">{activeTerm.term}</h2>
                    <div className="h-px w-20 bg-terracotta/20" />
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h4 className="text-[10px] font-bold text-navy/30 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <Sparkles size={14} className="text-terracotta" /> Acepción
                      </h4>
                      <p className="text-2xl md:text-3xl text-navy font-light leading-relaxed">{activeTerm.definition}</p>
                    </div>

                    <div className="bg-sand/30 p-10 md:p-14 rounded-sm border-l-4 border-terracotta relative overflow-hidden group">
                      <h4 className="flex items-center gap-2 text-[10px] font-bold text-terracotta uppercase tracking-[0.4em] mb-8">
                        <MessageSquare size={14} /> Contextualización
                      </h4>
                      <p className="text-navy font-display text-3xl md:text-5xl italic leading-tight">
                        "{activeTerm.example}"
                      </p>
                      <button
                        onClick={() => speak(activeTerm.example)}
                        className="absolute bottom-10 right-10 w-14 h-14 bg-white rounded-full flex items-center justify-center text-navy/20 hover:text-terracotta hover:scale-110 shadow-sm transition-all"
                      >
                        <Volume2 size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-20 pt-10 border-t border-navy/5 flex justify-between items-center text-[10px] font-mono text-navy/20 tracking-[0.3em] uppercase">
                    <div className="flex items-center gap-2 font-bold">
                      <Star size={12} className="text-terracotta fill-terracotta" /> Verificado
                    </div>
                    <span>Huelva Cloud · Lexicographic project</span>
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
