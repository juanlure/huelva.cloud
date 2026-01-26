'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Info, Sparkles, Clock, Droplets, Sun, CupSoda } from 'lucide-react';

// Imágenes de café - Unsplash (free stock photos)
const COFFEE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600',
  cortado: 'https://images.unsplash.com/photo-1511537630588-b7b8e7f0d263?q=80&w=800',
  bar: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800',
  source: 'Unsplash - Free stock photos'
};

const COFFEE_TYPES = [
  {
    id: 'solo',
    name: 'Solo',
    fullName: 'Café Solo',
    shortName: 'Solo',
    icon: '☕',
    ratio: { coffee: 100, milk: 0 },
    color: '#78716C',
    description: 'La esencia pura. Solo café, sin additions. El despertar clásico.',
    when: 'Cualquier momento del día.',
    instructions: 'Pides "un café" o "un solo".',
    tip: 'En Huelva, un "café" es siempre un café solo por defecto.',
    price: '~1,20€'
  },
  {
    id: 'cortado',
    name: 'Cortado',
    fullName: 'Café Cortado',
    shortName: 'Cortado',
    icon: '☕',
    ratio: { coffee: 75, milk: 25 },
    color: '#A8A29E',
    description: 'La proporción perfecta. Café cortado con un poco de leche para suavizar.',
    when: 'Desayuno o media mañana.',
    instructions: 'Pides "un cortado".',
    tip: 'El nombre viene por "cortar" la intensidad del café.',
    price: '~1,50€'
  },
  {
    id: 'mitad',
    name: 'Mitad',
    fullName: 'Café Mitad',
    shortName: 'Mitad',
    icon: '☕',
    ratio: { coffee: 50, milk: 50 },
    color: '#D6D3D1',
    description: 'El equilibrio exacto. Mitad café, mitad leche caliente.',
    when: 'Para quienes quieren el sabor del café con menos intensidad.',
    instructions: 'Pides "una mitad".',
    tip: 'Algunos lo llaman "mitad y mitad" para ser más claros.',
    price: '~1,80€'
  },
  {
    id: 'largo',
    name: 'Largo',
    fullName: 'Café Largo',
    shortName: 'Largo',
    icon: '☕',
    ratio: { coffee: 100, water: 20 },
    color: '#E7E5E4',
    description: 'Misma cantidad de café pero con más agua. Más suave, mismo cafeína.',
    when: 'Cuando quieres tomarlo despacio sin tanta carga.',
    instructions: 'Pides "un largo".',
    tip: 'No confundir con el manchado - el largo no lleva leche.',
    price: '~1,50€'
  },
  {
    id: 'manchado',
    name: 'Manchado',
    fullName: 'Leche Manchada',
    shortName: 'Manchado',
    icon: '🥛',
    ratio: { coffee: 10, milk: 90 },
    color: '#FAFAF9',
    description: 'Leche caliente con un café que apenas la tiñe. Suave y dulzón.',
    when: 'Merienda o quienes no les gusta el café fuerte.',
    instructions: 'Pides "un manchado" o "leche manchada".',
    tip: 'En Huelva se sirve en vaso de vidrio, nunca en taza.',
    price: '~2,00€'
  },
  {
    id: 'sombra',
    name: 'Sombra',
    fullName: 'Café Sombra',
    shortName: 'Sombra',
    icon: '🥛',
    ratio: { coffee: 5, milk: 95 },
    color: '#FEFEFE',
    description: 'Aún más suave que el manchado. El café apenas hace sombra.',
    when: 'Para acompañar postres o media tarde.',
    instructions: 'Pides "una sombra".',
    tip: 'Popular después de comer en algunos barrios tradicionales.',
    price: '~2,00€'
  },
  {
    id: 'nube',
    name: 'Nube',
    fullName: 'Leche con Nube',
    shortName: 'Nube',
    icon: '☁️',
    ratio: { coffee: 3, milk: 97 },
    color: '#FFFFFF',
    description: 'Leche dominante con apenas una nube de café. Parece chocolates.',
    when: 'Para niños o quienes quieren algo muy suave.',
    instructions: 'Pides "una nube".',
    tip: 'Más de uno ha pedido una nube esperando chocolates.',
    price: '~2,00€'
  },
  {
    id: 'bombon',
    name: 'Bombón',
    fullName: 'Café Bombón',
    shortName: 'Bombón',
    icon: '🍬',
    ratio: { coffee: 50, condensed: 50 },
    color: '#D4A574',
    description: 'Café con leche condensada, sin leche normal. El dulce más onubense.',
    when: 'Desayuno o merienda dulce.',
    instructions: 'Pides "un bombón".',
    tip: 'Acompañado con picos o churros es gloria bendita.',
    price: '~2,50€'
  },
  {
    id: 'carajillo',
    name: 'Carajillo',
    fullName: 'Café Carajillo',
    shortName: 'Carajillo',
    icon: '🔥',
    ratio: { coffee: 70, spirit: 30 },
    color: '#B45309',
    description: 'Café con un chupito de aguardiente o brandy. Para animarse.',
    when: 'Después de comer o días festivos.',
    instructions: 'Pides "un carajillo".',
    tip: 'En algunos lugares se flamea el aguardiente con azúcar.',
    price: '~3,00€'
  }
];

const LOCAL_PLACES = [
  { name: 'Cafetería Plaza', specialty: 'Bombones y meriendas', area: 'Plaza de las Monjas' },
  { name: 'Cafetería San José', specialty: 'Desayuno de oficinistas', area: 'Calle San José' },
  { name: 'Café del Coto', specialty: 'Specialty coffee', area: 'Polígono El Coto' },
  { name: 'Cafetería Roma', specialty: 'Clásico de toda la vida', area: 'Calle Rico' },
];

const ETIQUETTE = [
  { icon: '🧍', rule: 'El café se bebe de pie', explanation: 'En la barra es más rápido y auténtico.' },
  { icon: '🗣️', rule: 'No digas "espresso"', explanation: 'Aquí es "café solo". Espresso suena a turista.' },
  { icon: '🍞', rule: 'El pitufo acompaña', explanation: 'Una media de pan tostada con el café de la mañana.' },
  { icon: '💳', rule: 'Pagas al ir', explanation: 'Pides, tomas, y luego pagas en caja. No al revés.' },
  { icon: '😊', rule: 'El camarero te ve', explanation: 'Si vas a menudo, recordarán tu café habitual.' },
  { icon: '⌚', rule: 'El café es ritual', explanation: 'No te prives. Disfruta el momento de pausa.' },
];

export default function CoffeeTranslator() {
  const [selectedCoffee, setSelectedCoffee] = useState(COFFEE_TYPES[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${COFFEE_IMAGES.hero})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />
          </div>
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <Coffee size={16} className="text-amber-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                Guía Interactiva
              </span>
            </motion.div>

            <h1 className="text-display text-6xl md:text-7xl font-bold text-white mb-6">
              Traductor de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-stone-400">
                Café de Huelva
              </span>
            </h1>

            <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Solo, Cortado, Mitad, Manchado, Sombra, Nube, Bombón, Carajillo.
              Aprende los ratios sagrados del café onubense.
            </p>

            <p className="text-xs text-stone-500">
              Imagen: {COFFEE_IMAGES.source}
            </p>
          </div>
        </div>
      </div>

      {/* Ratio Selector */}
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Los 9 Tipos Sagrados</h2>
            <p className="text-stone-600">Selecciona un tipo para ver sus características</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-16">
            {COFFEE_TYPES.map((coffee) => (
              <button
                key={coffee.id}
                onClick={() => setSelectedCoffee(coffee)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCoffee.id === coffee.id
                    ? 'border-amber-500 bg-amber-50 shadow-lg scale-105'
                    : 'border-stone-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="text-2xl mb-1">{coffee.icon}</div>
                <p className={`text-xs font-bold ${
                  selectedCoffee.id === coffee.id ? 'text-amber-800' : 'text-stone-700'
                }`}>
                  {coffee.shortName}
                </p>
                {selectedCoffee.id === coffee.id && (
                  <motion.div
                    layoutId="coffeeSelection"
                    className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles size={12} className="text-white" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCoffee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200"
            >
              {/* Header with Ratio Visual */}
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: selectedCoffee.color }}>
                <div className="absolute inset-0 bg-black/5" />

                {/* Cup Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={selectedCoffee.id}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-6xl mb-2"
                    >
                      {selectedCoffee.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-stone-800">{selectedCoffee.fullName}</h3>
                    <p className="text-stone-600 text-sm font-mono mt-1">{selectedCoffee.price}</p>
                  </div>
                </div>

                {/* Ratio Visualization */}
                <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                  {selectedCoffee.ratio.milk !== undefined && (
                    <div
                      style={{ width: `${selectedCoffee.ratio.milk}%` }}
                      className="h-full bg-stone-100"
                    />
                  )}
                  {selectedCoffee.ratio.condensed !== undefined && (
                    <div
                      style={{ width: `${selectedCoffee.ratio.condensed}%` }}
                      className="h-full bg-amber-200"
                    />
                  )}
                  {selectedCoffee.ratio.water !== undefined && (
                    <div
                      style={{ width: `${selectedCoffee.ratio.water}%` }}
                      className="h-full bg-blue-100"
                    />
                  )}
                  <div
                    style={{ width: `${selectedCoffee.ratio.coffee}%` }}
                    className="h-full bg-amber-800"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-stone-600 leading-relaxed mb-8">{selectedCoffee.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                      <Droplets size={20} className="text-amber-600" />
                      Composición
                    </h4>
                    <div className="bg-stone-50 rounded-xl p-4 font-mono text-sm">
                      {selectedCoffee.ratio.milk !== undefined && (
                        <p>{selectedCoffee.ratio.coffee}% café · {selectedCoffee.ratio.milk}% leche</p>
                      )}
                      {selectedCoffee.ratio.condensed !== undefined && (
                        <p>{selectedCoffee.ratio.coffee}% café · {selectedCoffee.ratio.condensed}% leche condensada</p>
                      )}
                      {selectedCoffee.ratio.water !== undefined && (
                        <p>Café + {selectedCoffee.ratio.water}% más agua</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                      <Info size={20} className="text-amber-600" />
                      Detalles
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Sun size={16} className="text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-stone-800">Cuándo tomarlo</p>
                          <p className="text-stone-600 text-sm">{selectedCoffee.when}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CupSoda size={16} className="text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-stone-800">Cómo pedirlo</p>
                          <p className="text-stone-600 text-sm">{selectedCoffee.instructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local Tip */}
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-stone-700 text-sm">
                    <span className="font-bold">💡 Tip local:</span> {selectedCoffee.tip}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Local Places */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">
            Cafeterías de Referencia en Huelva
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {LOCAL_PLACES.map((place, index) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Coffee size={24} className="text-amber-700" />
                </div>
                <h4 className="font-bold text-stone-800 mb-1">{place.name}</h4>
                <p className="text-amber-700 text-sm mb-2">{place.specialty}</p>
                <p className="text-stone-500 text-xs">{place.area}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Etiquette */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">
            Reglas del Café en Huelva
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {ETIQUETTE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-200 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">{item.rule}</h4>
                    <p className="text-stone-600 text-sm">{item.explanation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl border border-stone-200 shadow-lg">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&fit=crop" alt="Rocío Limón" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-stone-800">Rocío Limón</p>
              <p className="text-sm text-stone-500">Redactora Jefe | Gastronomía</p>
              <p className="text-xs text-stone-400 italic mt-1">"Rocío nunca deja un plato sin probar."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
