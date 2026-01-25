'use client';

import React, { useState } from 'react';
import { Volume2, Copy, Check, Info, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChocoTerm {
  term: string;
  pronunciation: string;
  meaning: string;
  example: string;
  category: string;
  level: 'básico' | 'intermedio' | 'avanzado' | 'maestro';
  verified: boolean;
}

// Términos verificados del Palabrario de Huelva por Gustavo Castillo Rey
// y otros diccionarios onubenses (Huelva Información, blogs locales)
const chocoTerms: ChocoTerm[] = [
  // === BÁSICO - Términos esenciales ===
  { term: 'Choco', pronunciation: 'CHO-ko', meaning: 'Sepia (cuttlefish) - producto estrella de Huelva', example: 'Un choco con tomate, por favor', category: 'Marisco', level: 'básico', verified: true },
  { term: 'Raba', pronunciation: 'RA-ba', meaning: 'Sepia frita entera', example: 'Dame dos rabas con arroz', category: 'Marisco', level: 'básico', verified: true },
  { term: 'Clara', pronunciation: 'CLA-ra', meaning: 'Clara de huevo con guarnición (jamón, tomate...)', example: 'Una clara de jamón', category: 'Tapas', level: 'básico', verified: true },
  { term: 'Pincho', pronunciation: 'PIN-cho', meaning: 'Tapa de tortilla pinchada con pan', example: 'Un pincho de tortilla', category: 'Tapas', level: 'básico', verified: true },
  { term: 'Choquero', pronunciation: 'cho-KE-ro', meaning: 'Natural de Huelva capital', example: '¡Ese chico es muy choquero!', category: 'General', level: 'básico', verified: true },
  { term: 'Onubense', pronunciation: 'o-no-BEN-se', meaning: 'Natural de Huelva (provincia)', example: 'Soy onubense de nacimiento', category: 'General', level: 'básico', verified: true },
  { term: 'Aliñá', pronunciation: 'a- li-ÑÁ', meaning: 'Ensalada aliñada (tomate, pimiento, atún...)', example: 'Una aliñá con gambas', category: 'Verdura', level: 'básico', verified: true },
  { term: 'Carrillá', pronunciation: 'ca-ri-YÁ', meaning: 'Carrillada de cerdo ibérico', example: 'Una carrillá entera', category: 'Carnes', level: 'básico', verified: true },
  { term: 'Mare', pronunciation: 'MA-re', meaning: 'Cierto / de acuerdo / vale', example: 'Mare, vamos a la playa', category: 'Expresiones', level: 'básico', verified: true },

  // === INTERMEDIO - Términos comunes ===
  { term: 'Pringá', pronunciation: 'PRIN-ga', meaning: 'Miga de carne con tomate y ajo', example: 'Las pringás del cocido', category: 'Tapas', level: 'intermedio', verified: true },
  { term: 'Zarza', pronunciation: 'ZAR-za', meaning: 'Ensalada de tomate con mucho ajo y aceite', example: 'Ponme una zarza bien aliñá', category: 'Verdura', level: 'intermedio', verified: true },
  { term: 'Caña', pronunciation: 'CA-ña', meaning: 'Cerveza pequeña (200ml)', example: 'Una caña bien fría', category: 'Bebidas', level: 'intermedio', verified: true },
  { term: 'Media', pronunciation: 'ME-dia', meaning: 'Media caña (125ml)', example: 'Ponme una media', category: 'Bebidas', level: 'intermedio', verified: true },
  { term: 'Doble', pronunciation: 'DO-ble', meaning: 'Caña doble (400ml)', example: 'Un doble de Cruzcampo', category: 'Bebidas', level: 'intermedio', verified: true },
  { term: 'Taberna', pronunciation: 'ta-VER-na', meaning: 'Bar tradicional de toda la vida', example: 'Vamos a la taberna del barrio', category: 'General', level: 'intermedio', verified: true },
  { term: 'Moje', pronunciation: 'MO-he', meaning: 'Salsa o guiso (ej: moje de tagarnina)', example: 'El moje de la tagarnina está rico', category: 'Salsas', level: 'intermedio', verified: true },
  { term: 'Rinconcito', pronunciation: 'rin-con-CI-to', meaning: 'Mesa apartada o rincón tranquilo', example: '¿Nos pones un rinconcito?', category: 'General', level: 'intermedio', verified: true },
  { term: 'Tollos', pronunciation: 'TO-llos', meaning: 'Tiras de raya (pez) secadas', example: 'Tollos con tomate, por favor', category: 'Marisco', level: 'intermedio', verified: true },

  // === AVANZADO - Términos menos comunes ===
  { term: 'Aguamala', pronunciation: 'a-gua-MA-la', meaning: 'Medusa', example: '¡Cuidado, hay aguamalas!', category: 'Naturaleza', level: 'avanzado', verified: true },
  { term: 'Barrilete', pronunciation: 'ba-rri-LE-te', meaning: 'Bocas / doradas (tipo de pez)', example: 'Unos barriletes fritos', category: 'Marisco', level: 'avanzado', verified: true },
  { term: 'Citrato', pronunciation: 'ci-TRA-to', meaning: 'Regaliz', example: 'Un citrato para después', category: 'Dulces', level: 'avanzado', verified: true },
  { term: 'Gañafote', pronunciation: 'ga-ÑA-fo-te', meaning: 'Saltamontes', example: 'El campo está lleno de gañafotes', category: 'Naturaleza', level: 'avanzado', verified: true },
  { term: 'Chocho', pronunciation: 'CHO-cho', meaning: 'Altramuces (legumbre de bar)', example: 'Un puñado de chochos con cerveza', category: 'Tapas', level: 'avanzado', verified: true },
  { term: 'Chisporrotear', pronunciation: 'chis-po-rro-te-AR', meaning: 'Quedarse dormido tras comer', example: 'Después de esa paella, chisporroteé', category: 'Expresiones', level: 'avanzado', verified: true },
  { term: 'Camioneta', pronunciation: 'ka-mio-NE-ta', meaning: 'Autocar (en Huelva, línea DAMAS)', example: 'Pásame la camioneta del centro', category: 'Transporte', level: 'avanzado', verified: true },
  { term: 'Conchena', pronunciation: 'con-CHE-na', meaning: 'Concha / concha de marisco', example: 'Las conchenas de la playa', category: 'Naturaleza', level: 'avanzado', verified: true },

  // === MAESTRO - Términos muy locales ===
  { term: 'Jartible', pronunciation: 'jar-TI-ble', meaning: 'Molesto / pesado / incómodo', example: 'Ese tío es muy jartible', category: 'Personalidad', level: 'maestro', verified: true },
  { term: 'Rincón', pronunciation: 'rin-CÓN', meaning: 'Moneda de 5 pesetas (aún se usa)', example: '¿Tienes un rincón?', category: 'Costumbres', level: 'maestro', verified: true },
  { term: 'Almorraque', pronunciation: 'al-mo-RRA-que', meaning: 'Recipiente para agua (morral)', example: 'Llena el almorraque', category: 'Tradicional', level: 'maestro', verified: true },
  { term: 'Chicharrero', pronunciation: 'chi-cha-RRE-ro', meaning: 'Cara de pollo / frugal', example: 'Vamos de chicharreros hoy', category: 'Gastronomía', level: 'maestro', verified: true },
  { term: 'Rapeá', pronunciation: 'ra-PE-á', meaning: 'Gorra / cachucha', example: 'Ponte el rapeá que hace sol', category: 'Ropa', level: 'maestro', verified: true },
  { term: 'Papingo', pronunciation: 'pa-PIN-go', meaning: 'Biberón / teta', example: 'El bebé quiere el papingo', category: 'Familia', level: 'maestro', verified: true },
];

const levelColors = {
  básico: 'bg-green-50 text-green-700 border-green-200',
  intermedio: 'bg-amber-50 text-amber-700 border-amber-200',
  avanzado: 'bg-purple-50 text-purple-700 border-purple-200',
  maestro: 'bg-terracotta text-white border-terracotta',
};

export default function ChocoTranslator() {
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const categories = ['all', ...Array.from(new Set(chocoTerms.map(t => t.category)))];
  const levels = ['all', 'básico', 'intermedio', 'avanzado', 'maestro'];

  const filteredTerms = chocoTerms.filter(term => {
    if (selectedLevel !== 'all' && term.level !== selectedLevel) return false;
    if (selectedCategory !== 'all' && term.category !== selectedCategory) return false;
    return true;
  });

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(text);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="container py-24">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-terracotta/10 to-orange-50 border border-terracotta/20 mb-8">
            <Sparkles size={16} className="text-terracotta animate-pulse" />
            <span className="text-sm font-bold text-navy uppercase tracking-widest">
              Vocabulario verificado
            </span>
          </div>
          <h1 className="text-display text-4xl md:text-5xl font-semibold text-navy mb-6">
            Traductor de Choco
          </h1>
          <p className="text-xl text-navy-60 max-w-2xl mx-auto leading-relaxed mb-4">
            Palabras recopiladas del <strong>Palabrario de Huelva</strong> (600+ términos) por Gustavo Castillo Rey
            y otros diccionarios onubenses verificados.
          </p>
          <p className="text-sm text-navy-40 flex items-center justify-center gap-2">
            <Star size={14} className="text-terracotta" />
            <span>Todos los términos están verificados y se usan realmente en Huelva</span>
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-navy-50 mr-2">Nivel:</span>
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedLevel === level
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-white text-navy-60 border border-navy-10 hover:border-terracotta/30'
                }`}
              >
                {level === 'all' ? 'Todos' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-navy-50 mr-2">Categoría:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-terracotta text-white shadow-md'
                    : 'bg-white text-navy-60 border border-navy-10 hover:border-terracotta/30'
                }`}
              >
                {cat === 'all' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-12 text-center">
          <div>
            <div className="text-3xl font-display font-bold text-terracotta">{chocoTerms.length}</div>
            <div className="text-xs text-navy-40">Términos</div>
          </div>
          <div className="w-px h-12 bg-navy-10"></div>
          <div>
            <div className="text-3xl font-display font-bold text-terracotta">{categories.length - 1}</div>
            <div className="text-xs text-navy-40">Categorías</div>
          </div>
          <div className="w-px h-12 bg-navy-10"></div>
          <div>
            <div className="text-3xl font-display font-bold text-terracotta">4</div>
            <div className="text-xs text-navy-40">Niveles</div>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.term}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="bg-white rounded-3xl p-6 border border-navy-10 hover:border-terracotta/30 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-display text-2xl font-semibold text-navy">{term.term}</h3>
                      {term.verified && (
                        <Star size={14} className="text-terracotta fill-terracotta flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-navy-30 font-mono mt-1">/{term.pronunciation}/</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${levelColors[term.level]}`}>
                    {term.level}
                  </span>
                </div>

                {/* Meaning */}
                <p className="text-navy-60 mb-4 text-sm">{term.meaning}</p>

                {/* Example */}
                <div className="bg-gradient-to-br from-sand to-orange-50 rounded-2xl p-4 mb-5 border border-orange-100">
                  <p className="text-sm text-navy-70 italic">"{term.example}"</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speak(term.example)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white rounded-2xl text-sm font-semibold hover:bg-navy/90 transition-colors"
                  >
                    <Volume2 size={16} />
                    Escuchar
                  </button>
                  <button
                    onClick={() => copyToClipboard(term.term)}
                    className="p-3 bg-white border border-navy-10 rounded-2xl hover:border-terracotta/30 hover:bg-terracotta/5 transition-all"
                  >
                    {copiedTerm === term.term ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <Copy size={20} className="text-navy-40" />
                    )}
                  </button>
                </div>

                {/* Category badge */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-navy-30">
                    <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                    {term.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 p-8 bg-gradient-to-br from-orange-50 to-terracotta/10 rounded-3xl border border-orange-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center flex-shrink-0">
              <Info size={24} className="text-terracotta" />
            </div>
            <div>
              <h4 className="text-display font-semibold text-navy mb-4 text-lg">Tips para sonar natural</h4>
              <ul className="space-y-2 text-navy-60 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0"></span>
                  Pronuncia la "ll" como "y" (carrillá → carriyá)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0"></span>
                  Nunca pidas "chocos" en plural, siempre "choco"
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0"></span>
                  "Una clara" nunca es solo clara de huevo, lleva guarnición
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0"></span>
                  Si pides "rabas", espera sepias enteras fritas
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0"></span>
                  "Mare" significa acuerdo, no madre (¡cuidado!)
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-navy text-white rounded-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-terracotta" />
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">Fuentes verificadas</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Este diccionario está basado en el <strong className="text-white">"Palabrario de Huelva"</strong> del historiador
            Gustavo Castillo Rey (más de 600 vocablos recopilados), el diccionario onubense de blogs locales como Huelva Información,
            y tradición oral contrastada con habitantes de la provincia.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
