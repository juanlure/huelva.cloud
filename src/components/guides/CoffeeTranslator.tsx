'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Info, Sparkles, Clock, Droplets, Sun, CupSoda } from 'lucide-react';

// Imágenes de café - Usando imágenes de Wikimedia y Stock de alta calidad
const COFFEE_IMAGES = {
  hero: '/images/guides/estacion-neomudejar-hero.jpg',
  glass_coffee: '/images/guides/cafe-vaso-huelva.jpg', // Aproximación visual al café en vaso/taza
  source: 'Wikimedia Commons'
};

const COFFEE_TYPES = [
  {
    id: 'solo',
    name: 'Solo',
    fullName: 'Café Solo',
    shortName: 'Solo',
    icon: '☕',
    ratio: { coffee: 100, milk: 0 },
    color: '#3C2F2F',
    description: 'La esencia pura. Solo café, sin aditivos. Potente y directo. En otros sitios le llaman "espresso", aquí es café y punto.',
    when: 'Al despertar o después de comer para espabilar.',
    instructions: 'Pides "un café" o "un solo".',
    tip: 'En Huelva, un "café" se asume solo por defecto si no dices nada más.',
    price: '~1,20€',
    caffeine: 4
  },
  {
    id: 'cortado',
    name: 'Cortado',
    fullName: 'Café Cortado',
    shortName: 'Cortado',
    icon: '☕',
    ratio: { coffee: 75, milk: 25 },
    color: '#6F4E37',
    description: 'Café con un toque de lecha ("cortado" con leche) para quitarle acidez pero mantener la fuerza.',
    when: 'Media mañana o después de comer.',
    instructions: 'Pides "un cortado".',
    tip: 'Se suele servir en vaso pequeño de cristal si lo pides en barra.',
    price: '~1,30€',
    caffeine: 3
  },
  {
    id: 'mitad',
    name: 'Mitad',
    fullName: 'Café Mitad',
    shortName: 'Mitad',
    icon: '☕',
    ratio: { coffee: 50, milk: 50 },
    color: '#A0785A',
    description: 'El equilibrio perfecto. 50% café, 50% leche. Ni muy fuerte ni muy leche.',
    when: 'Desayuno (con tostada) o merienda.',
    instructions: 'Pides "una mitad" o "mitad y mitad".',
    tip: 'La medida estándar del desayuno onubense.',
    price: '~1,40€',
    caffeine: 2
  },
  {
    id: 'largo',
    name: 'Largo',
    fullName: 'Café Largo',
    shortName: 'Largo',
    icon: '☕',
    ratio: { coffee: 100, water: 20 },
    color: '#4A3B32',
    description: 'Misma cantidad de café pero con más agua. Menos concentrado pero misma cafeína.',
    when: 'Para tomar con calma leyendo el periódico.',
    instructions: 'Pides "un largo".',
    tip: 'No confundir con el americano (que es agua sucia para un local).',
    price: '~1,30€',
    caffeine: 3
  },
  {
    id: 'manchado',
    name: 'Manchado',
    fullName: 'Leche Manchada',
    shortName: 'Manchado',
    icon: '🥛',
    ratio: { coffee: 10, milk: 90 },
    color: '#F5E6D3',
    description: 'Vaso de leche caliente con literalmente una "mancha" de café. Sabe a leche con aroma de café.',
    when: 'Merienda o para estómagos delicados.',
    instructions: 'Pides "un manchado".',
    tip: 'Imprescindible pedirlo en vaso de cristal.',
    price: '~1,50€',
    caffeine: 1
  },
  {
    id: 'sombra',
    name: 'Sombra',
    fullName: 'Café Sombra',
    shortName: 'Sombra',
    icon: '☁️',
    ratio: { coffee: 20, milk: 80 },
    color: '#E8DCC9',
    description: 'Un poco más de café que el manchado, pero sigue mandando la leche. Color "café con leche clarito".',
    when: 'Desayuno suave.',
    instructions: 'Pides "una sombra".',
    tip: 'Término muy específico de la zona occidental de Andalucía.',
    price: '~1,50€',
    caffeine: 1
  },
  {
    id: 'nube',
    name: 'Nube',
    fullName: 'Leche con Nube',
    shortName: 'Nube',
    icon: '🥛',
    ratio: { coffee: 5, milk: 95 },
    color: '#FFF8F0',
    description: 'Prácticamente leche sola con una gota de café para darle color.',
    when: 'Para niños o antes de dormir.',
    instructions: 'Pides "una nube".',
    tip: 'Si te ponen más café del debido, te quejas.',
    price: '~1,50€',
    caffeine: 0
  },
  {
    id: 'bombon',
    name: 'Bombón',
    fullName: 'Café Bombón',
    shortName: 'Bombón',
    icon: '🍬',
    ratio: { coffee: 50, condensed: 50 },
    color: '#D4A574',
    description: 'Café con leche condensada. Una bomba dulce y energética.',
    when: 'Cuando necesitas un extra de azúcar.',
    instructions: 'Pides "un bombón".',
    tip: 'Mira las capas separadas antes de remover. Es hipnótico.',
    price: '~1,80€',
    caffeine: 3
  },
];

const LOCAL_PLACES = [
  { name: 'Café de las Brujas', specialty: 'Café de especialidad', area: 'Centro', verified: true },
  { name: 'Cafetería Tanka\'s', specialty: 'Vianés en vaso de cristal', area: 'Centro', verified: true },
  { name: 'Churrería Miguel', specialty: 'El mejor chocolate con churros', area: 'Mercado del Carmen', verified: true },
  { name: 'Mandala', specialty: 'Vistas al atardecer', area: 'El Conquero', verified: true },
];

const ETIQUETTE = [
  { icon: '🥛', rule: 'En vaso sabe mejor', explanation: 'Muchos locales prefieren el café en vaso de cristal (de caña o de tubo) para ver el color y mantener el calor.' },
  { icon: '💶', rule: 'Pagar al salir', explanation: 'En la mayoría de bares tradicionales, pides, consumes y pagas al marcharte. Confianza ciega.' },
  { icon: '🥐', rule: 'La tostá es sagrada', explanation: 'El café no va solo. Va con media (o entera) de aceite y jamón, o mantequilla.' },
  { icon: '🧊', rule: '¿Con hielo?', explanation: 'Si pides "con hielo", te traerán el café caliente y un vaso aparte con hielos grandes.' },
];

export default function CoffeeTranslator() {
  const [selectedCoffee, setSelectedCoffee] = useState(COFFEE_TYPES[0]);

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900">

      {/* Ratio Selector UI */}
      <section className="py-12 md:py-24 px-6 container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">La Ciencia del Café Onubense</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6">Elige tu Dosis</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              En Huelva no se pide "un café con leche". Se pide con precisión milimétrica.
            </p>
          </div>

          {/* Interactive Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {COFFEE_TYPES.map((coffee) => (
              <button
                key={coffee.id}
                onClick={() => setSelectedCoffee(coffee)}
                className={`relative group px-6 py-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 min-w-[100px] ${selectedCoffee.id === coffee.id
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-110 z-10'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-600'
                  }`}
              >
                <span className="text-2xl">{coffee.icon}</span>
                <span className="text-sm font-bold">{coffee.name}</span>
                {selectedCoffee.id === coffee.id && (
                  <motion.div layoutId="active-pill" className="absolute inset-0 border-2 border-stone-900 rounded-2xl" />
                )}
              </button>
            ))}
          </div>

          {/* Main Display Card */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Visual Representation (Cup) */}
            <div className="relative aspect-square max-w-md mx-auto w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-stone-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-stone-50 rounded-b-[3rem] -z-10" />

              {/* Liquid Container */}
              <div className="relative w-48 h-64 border-4 border-stone-200 rounded-b-3xl rounded-t-lg bg-white overflow-hidden shadow-inner flex flex-col-reverse relative">
                {/* Glass reflections */}
                <div className="absolute top-0 right-4 w-2 h-full bg-white/30 z-20 rounded-full blur-[1px]" />
                <div className="absolute top-0 left-4 w-1 h-full bg-white/20 z-20 rounded-full blur-[1px]" />

                {/* Layers */}
                {selectedCoffee.ratio.condensed && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${selectedCoffee.ratio.condensed}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="w-full bg-[#E5CBAF] z-10 border-t border-white/20"
                  />
                )}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${selectedCoffee.ratio.coffee}%` }}
                  transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
                  className="w-full bg-[#3C2F2F] z-10 border-t border-white/10"
                />
                {selectedCoffee.ratio.milk && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${selectedCoffee.ratio.milk}%` }}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                    className="w-full bg-[#FFF8F0]"
                  />
                )}
                {selectedCoffee.ratio.water && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${selectedCoffee.ratio.water}%` }}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                    className="w-full bg-blue-50/50"
                  />
                )}
              </div>

              {/* Smoke/Steam Animation */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-full flex gap-2 opacity-50">
                <motion.div
                  animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="w-2 h-8 bg-stone-200 rounded-full blur-md"
                />
                <motion.div
                  animate={{ y: [-15, -40], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className="w-2 h-10 bg-stone-200 rounded-full blur-md"
                />
              </div>
            </div>

            {/* Info Panel */}
            <div>
              <motion.div
                key={selectedCoffee.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={12} />
                  {selectedCoffee.fullName}
                </div>
                <h3 className="text-4xl font-display font-bold text-stone-900 mb-6">{selectedCoffee.name}</h3>
                <p className="text-xl text-stone-600 leading-relaxed mb-8">{selectedCoffee.description}</p>

                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <div className="mt-1 bg-amber-100 p-2 rounded-lg text-amber-700 h-fit"><Clock size={20} /></div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide mb-1">El Momento</h4>
                      <p className="text-stone-600 font-medium">{selectedCoffee.when}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <div className="mt-1 bg-stone-100 p-2 rounded-lg text-stone-700 h-fit"><CupSoda size={20} /></div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide mb-1">Cómo Pedirlo</h4>
                      <p className="text-stone-600 font-medium italic">"{selectedCoffee.instructions}"</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl shadow-lg mt-8">
                    <div className="flex items-start gap-3">
                      <Info size={20} className="text-amber-400 mt-1 flex-shrink-0" />
                      <p className="text-sm leading-relaxed"><span className="text-amber-400 font-bold uppercase text-xs tracking-wider block mb-1">Consejo Local</span> {selectedCoffee.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Places */}
      <section className="bg-white py-24 px-6 border-t border-stone-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Templos del Café</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {LOCAL_PLACES.map((place, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-stone-50 hover:bg-white border border-transparent hover:border-stone-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 transition-transform">
                  <Coffee size={24} />
                </div>
                <h3 className="font-bold text-lg text-stone-900 mb-2">{place.name}</h3>
                <p className="text-amber-700 text-sm font-medium mb-1">{place.specialty}</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider">{place.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Etiquette Grid */}
      <section className="py-24 px-6 container mx-auto max-w-6xl">
        <div className="bg-stone-900 rounded-[3rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">Mandamientos Cafeteros</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ETIQUETTE.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto hover:bg-white/10 transition-colors cursor-default">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-3">{item.rule}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
