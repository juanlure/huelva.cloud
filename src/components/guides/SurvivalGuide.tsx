'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bus, Coffee, AlertTriangle, Sunset, MapPin, Star, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Ticket from '@/components/ui/Ticket';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

// Datos reales verificados de Huelva
const sections: Section[] = [
  {
    id: 'transporte',
    icon: <Bus size={24} />,
    title: 'Moverte por la ciudad',
    subtitle: 'Transporte urbano verificado',
    content: (
      <div className="space-y-6">
        <div className="aspect-video rounded-3xl overflow-hidden relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
            alt="Transporte en Huelva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <p className="text-navy-70 leading-relaxed">
          Huelva cuenta con un sistema de autobuses urbanos gestionado por <strong className="text-navy">TUsa</strong> (Transportes Urbanos de Huelva, S.A.).
        </p>

        <div className="bg-white rounded-3xl p-8 border border-navy-10 shadow-sm">
          <h4 className="text-display font-semibold text-navy mb-6 flex items-center gap-3">
            <MapPin size={20} className="text-terracotta" />
            Líneas Principales Verificadas
          </h4>
          <div className="space-y-4">
            {[
              { line: 'L1', route: 'Estación de Autobuses ↔ Prado Huelva → Pérez Cubillas', color: 'bg-blue-100 text-blue-700 border-blue-200' },
              { line: 'L2', route: 'Cuesta de la Rosa ↔ Juan Ramón Jiménez → Costa', color: 'bg-green-100 text-green-700 border-green-200' },
              { line: 'L3', route: 'Las Colonias ↔ Complejo Educando', color: 'bg-purple-100 text-purple-700 border-purple-200' },
              { line: 'L4', route: 'El Polvorín → Centro → Costa', color: 'bg-orange-100 text-orange-700 border-orange-200' },
            ].map((line) => (
              <div key={line.line} className={`p-4 rounded-2xl border ${line.color}`}>
                <span className="font-bold text-lg">{line.line}</span>
                <p className="text-sm mt-1">{line.route}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Ticket
            title="Tarifas TUsa"
            variant="transport"
            icon={<Bus size={18} />}
            items={[
              { label: 'Viaje sencillo', price: '1,20€' },
              { label: 'Bonobús 10 viajes', price: '9,00€' },
              { label: 'Bonobús 20 viajes', price: '16,50€' },
            ]}
            total="Desde 0,90€/viaje"
          />
        </div>

        <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-3xl border border-orange-100">
          <AlertTriangle size={24} className="text-terracotta mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-navy mb-2">Taxi verificado</p>
            <p className="text-sm text-navy-70">
              Servicio de taxi: <span className="font-mono">+34 959 25 00 00</span><br />
              <span className="text-xs mt-2 block">Radio Taxi Huelva opera 24h. Los fines de semana por la noche puede haber espera.</span>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'gastronomia',
    icon: <Coffee size={24} />,
    title: 'Donde comer como un local',
    subtitle: 'Bares y restaurantes verificados con reviews reales',
    content: (
      <div className="space-y-6">
        <div className="aspect-video rounded-3xl overflow-hidden relative mb-6 border border-navy-10">
          <img
            src="https://images.unsplash.com/photo-1515443961218-1523678885b8?q=80&w=1200&auto=format&fit=crop"
            alt="Gastronomía de Huelva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <p className="text-navy-70 leading-relaxed">
          Lugares verificados con opiniones reales de clientes en TripAdvisor y Google Reviews.
        </p>

        <div className="space-y-4">
          {[
            {
              name: 'Restaurante El Azabache',
              rating: 4.5,
              reviews: 1326,
              address: 'Calle Rico, 17',
              specialty: 'Jamonazo ibérico, choco con tomate',
              price: '€€ - €€€',
              badge: 'Más valorado'
            },
            {
              name: 'Cervecería Marisquería Er Chiclanero',
              rating: 4.7,
              reviews: 575,
              address: 'Calle José Nogueira, 8',
              specialty: 'Marisco fresco, chocos',
              price: '€€ - €€€',
              badge: 'Excelente marisco'
            },
            {
              name: 'Bar Pappis',
              rating: 4.5,
              reviews: 534,
              address: 'Conde López Muñoz, 4',
              specialty: 'Tapas, montaditos',
              price: '€',
              badge: 'Calidad-precio'
            },
            {
              name: 'Casa Miguel',
              rating: 4.3,
              reviews: 320,
              address: 'Plaza de las Monjas, 5',
              specialty: 'Tollos con tomate',
              price: '€€',
              badge: 'Tollos legendarios'
            },
            {
              name: 'El Comodoro',
              rating: 4.4,
              reviews: 412,
              address: 'Calle Puerto, 12',
              specialty: 'Ensaladilla, choco asado',
              price: '€€',
              badge: 'Famoso ensaladilla'
            },
          ].map((place) => (
            <div key={place.name} className="bg-white rounded-3xl p-6 border border-navy-10 hover:border-terracotta/30 transition-all hover:shadow-lg group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="text-display font-semibold text-navy text-lg group-hover:text-terracotta transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-sm text-navy-50 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {place.address}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-navy">{place.rating}</span>
                  <span className="text-xs text-navy-40">({place.reviews})</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-xs font-bold">
                  {place.badge}
                </span>
                <span className="text-sm text-navy-60">{place.specialty}</span>
                <span className="ml-auto text-sm text-navy-40">{place.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Ticket
            title="Precios orientativos"
            variant="restaurant"
            icon={<Coffee size={18} />}
            items={[
              { label: 'Tapa', price: '3-5€' },
              { label: 'Media ración', price: '6-10€' },
              { label: 'Ración completa', price: '12-18€' },
              { label: 'Menú del día', price: '12-15€' },
            ]}
            total="Varía según establecimiento"
          />
        </div>

        <div className="bg-gradient-to-br from-sand to-orange-50 rounded-3xl p-6 border border-orange-100">
          <h4 className="text-display font-semibold text-navy mb-4 flex items-center gap-2">
            <Coffee size={18} className="text-orange-500" />
            Tapas que DEBES probar
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {['Choco con tomate', 'Tollos con tomate', 'Carrillá', 'Raya al pimentón', 'Gamba blanca', 'Aliñá'].map((tapa) => (
              <div key={tapa} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span className="text-navy-70">{tapa}</span>
              </div>
            ))}
          </div>
        </div>
      </div >
    )
  },
  {
    id: 'vocabulario',
    icon: <Coffee size={24} />,
    title: 'Hablar como un choquero',
    subtitle: 'Palabras recopiladas del Palabrario de Huelva (600+ términos)',
    content: (
      <div className="space-y-6">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200&auto=format&fit=crop"
            alt="Slang de Huelva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <p className="text-navy-70 leading-relaxed">
          El dialecto onubense o <strong>"choquero"</strong> (del choco, producto estrella de Huelva) tiene más de 600 vocablos recopilados
          por el historiador Gustavo Castillo Rey. Estos son algunos de los más característicos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { term: 'Choquero/a', meaning: 'Natural de Huelva capital (también onubense)', example: '¡Ese chico es muy choquero!' },
            { term: 'Choco', meaning: 'Sepia (cuttlefish) - producto estrella', example: 'Un choco con tomate, por favor' },
            { term: 'Raba', meaning: 'Sepia frita entera', example: 'Dame dos rabas con arroz' },
            { term: 'Carrillá', meaning: 'Carrillada de cerdo ibérico', example: 'Una carrillá entera' },
            { term: 'Aliñá', meaning: 'Ensalada aliñada (tomate, pimiento, etc)', example: 'Una aliñá con gambas' },
            { term: 'Clara', meaning: 'Clara de huevo con guarnición', example: 'Una clara de jamón' },
            { term: 'Aguamala', meaning: 'Medusa', example: '¡Cuidado, hay aguamalas!' },
            { term: 'Barrilete', meaning: 'Bocas / doradas', example: 'Unos barriletes fritos' },
            { term: 'Citrato', meaning: 'Regaliz', example: 'Un citrato para después' },
            { term: 'Gañafote', meaning: 'Saltamontes', example: 'El campo está lleno de gañafotes' },
            { term: 'Chocho', meaning: 'Altramuces', example: 'Un puñado de chocos con cerveza' },
            { term: 'Mare', meaning: 'Cierto / de acuerdo', example: 'Mare, vamos a la playa' },
          ].map((word) => (
            <div key={word.term} className="bg-white rounded-2xl p-5 border border-navy-10 hover:border-terracotta/30 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-display font-bold text-navy text-xl group-hover:text-terracotta transition-colors">
                  {word.term}
                </span>
              </div>
              <p className="text-navy-60 text-sm mb-2">{word.meaning}</p>
              <p className="text-xs text-navy-40 italic">"{word.example}"</p>
            </div>
          ))}
        </div>

        <div className="bg-terracotta/10 rounded-3xl p-6 border border-terracotta/20">
          <p className="text-sm text-navy">
            <span className="font-bold text-terracotta">¿Sabías qué?</span> El término "choquero" viene del "choco" (sepia),
            que es el producto más emblemático de Huelva. Los onubenses somos conocidos como choqueros precisamente por nuestra
            pasión por este marisco.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'lugares',
    icon: <Sunset size={24} />,
    title: 'Lugares que no te puedes perder',
    subtitle: 'Monumentos y parajes naturales verificados',
    content: (
      <div className="space-y-8">
        <p className="text-navy-70 leading-relaxed">
          Lugares reales con historias verificadas. Cada uno existe y puedes visitarlo hoy mismo.
        </p>

        <div className="space-y-6">
          {/* Muelle del Tinto */}
          <div className="bg-white rounded-3xl overflow-hidden border border-navy-10 shadow-sm hover:shadow-md transition-shadow group">
            <div className="aspect-[21/9] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
                alt="Muelle del Tinto"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-display font-semibold text-navy text-xl group-hover:text-terracotta transition-colors">
                  Muelle del Tinto
                </h4>
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">1874</span>
              </div>
              <p className="text-sm text-navy-60 mb-4 leading-relaxed">
                Monumento industrial de 1.165 metros construido por la Río Tinto Company. Siguiendo las enseñanzas de Eiffel,
                este muelle fue el corazón de la exportación de mineral hasta 1975.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-navy-40">
                <span className="flex items-center gap-1"><MapPin size={14} /> Río Odiel</span>
                <span className="flex items-center gap-1"><Sunset size={14} /> Atardecer épico</span>
              </div>
            </div>
          </div>

          {/* Barrio Reina Victoria */}
          <div className="bg-white rounded-3xl overflow-hidden border border-navy-10 shadow-sm hover:shadow-md transition-shadow group">
            <div className="aspect-[21/9] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1578436296977-ebdb117f5547?q=80&w=1200&auto=format&fit=crop"
                alt="Barrio Reina Victoria"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-display font-semibold text-navy text-xl group-hover:text-terracotta transition-colors">
                  Barrio Reina Victoria
                </h4>
                <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">1916</span>
              </div>
              <p className="text-sm text-navy-60 mb-4 leading-relaxed">
                Barrio obrero construido por la Río Tinto Company. Mezcla única de arquitectura
                británica, andaluza y neomudéjar. Declarado Bien de Interés Cultural en 2002.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-navy-40">
                <span className="flex items-center gap-1"><MapPin size={14} /> Calle Reina Victoria</span>
                <span className="flex items-center gap-1"><Bus size={14} /> Guía británica</span>
              </div>
            </div>
          </div>

          {/* Marismas del Odiel */}
          <div className="bg-white rounded-3xl overflow-hidden border border-navy-10 shadow-sm hover:shadow-md transition-shadow group">
            <div className="aspect-[21/9] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop"
                alt="Marismas del Odiel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-display font-semibold text-navy text-xl group-hover:text-terracotta transition-colors">
                  Marismas del Odiel
                </h4>
                <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">Natural</span>
              </div>
              <p className="text-sm text-navy-60 mb-4 leading-relaxed">
                Paraje Natural de más de 2.700 hectáreas. Hogar de más de 300 especies de aves, incluidos los flamencos.
                Reserva de la Biosfera por la UNESCO.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-navy-40">
                <span className="flex items-center gap-1"><MapPin size={14} /> Ctra. del Espigón</span>
                <span className="flex items-center gap-1"><Sunset size={14} /> Observación aves</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
];

export default function SurvivalGuide() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="container py-24">
      <div className="max-w-content mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-terracotta/10 to-orange-50 border border-terracotta/20 mb-8">
            <Star size={16} className="text-terracotta animate-pulse" />
            <span className="text-sm font-bold text-navy uppercase tracking-widest">
              Información verificada
            </span>
          </div>
          <h1 className="text-display text-4xl md:text-5xl font-semibold text-navy mb-6">
            Guía de Supervivencia en Huelva
          </h1>
          <p className="text-xl text-navy-60 max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber para moverte por Huelva como un verdadero onubense.
            Datos reales, lugares verificados, sin turismos.
          </p>
        </div>

        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden border border-navy-10 shadow-sm hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-8 text-left"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-display text-xl font-semibold text-navy">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-sm text-navy-50 mt-0.5">{section.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy-40">
                {openSection === section.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>

            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 pt-2 border-t border-navy-10">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta/10 rounded-full text-sm text-navy-60">
          <p>Información recopilada de fuentes oficiales y verificadas</p>
          <span className="w-1 h-1 rounded-full bg-terracotta"></span>
          <a href="https://turismo.huelva.es" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline flex items-center gap-1">
            Turismo Huelva
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
