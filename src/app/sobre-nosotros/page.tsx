import type { Metadata } from 'next';
import { MapPin, Mail, Users, Award, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Huelva.cloud - Quiénes Somos',
  description: 'Somos onubenses escribiendo sobre Huelva. Guía local independiente con ADN choquero. Conoce nuestro equipo editorial y nuestra misión.',
  keywords: 'Huelva.cloud, sobre nosotros, equipo Huelva, guía local Huelva, onubenses, Lucía Colombina',
  alternates: {
    canonical: 'https://huelva.cloud/sobre-nosotros',
  },
  openGraph: {
    title: 'Sobre Nosotros | Huelva.cloud',
    description: 'Somos onubenses escribiendo sobre Huelva. Guía local independiente con ADN choquero.',
    url: 'https://huelva.cloud/sobre-nosotros',
    siteName: 'Huelva.cloud',
    locale: 'es_ES',
    type: 'website',
  },
};

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Huelva.cloud',
  alternateName: 'Huelva Cloud Guía Local',
  url: 'https://huelva.cloud',
  logo: 'https://huelva.cloud/logo.png',
  description: 'Guía local de Huelva escrita por onubenses. Descubre qué ver, dónde comer y eventos sin tópicos turísticos.',
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: 'Lucía Colombina',
      jobTitle: 'Editora Jefe',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Huelva',
    addressRegion: 'Andalucía',
    addressCountry: 'ES',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Editorial',
    email: 'hola@huelva.cloud',
    availableLanguage: 'Spanish',
  },
  sameAs: [
    'https://twitter.com/huelvacloud',
    'https://instagram.com/huelvacloud',
  ],
};

// Team members data
const teamMembers = [
  {
    name: 'Lucía Colombina',
    role: 'Editora Jefe',
    bio: 'Periodista onubense. Conoce cada rincón de Huelva y se empeña en que descubras la ciudad más allá de los tópicos turísticos.',
    expertise: ['Gastronomía local', 'Historia de Huelva', 'Eventos culturales'],
  },
  {
    name: 'El Choco',
    role: 'Voz del Pueblo',
    bio: 'Huelva en estado puro. Sabe dónde se come el mejor choco frito y qué bares tienen historia de verdad.',
    expertise: ['Choco frito', 'Bares de toda la vida', 'Slang onubense'],
  },
  {
    name: 'Redacción Huelva.cloud',
    role: 'Equipo Editorial',
    bio: 'Periodistas y escritores locales que documentan el día a día de Huelva con rigor y cercanía.',
    expertise: ['Actualidad local', 'Cultura', 'Agenda'],
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="relative bg-navy pt-32 pb-20 px-6">
          <div className="container max-w-content mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 border border-terracotta/20 mb-8">
              <Users size={16} className="text-terracotta" />
              <span className="text-sm font-semibold text-terracotta uppercase tracking-widest">
                El Equipo
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6">
              De Huelva,
              <br />
              <span className="text-terracotta italic">para Huelva</span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Somos onubenses escribiendo sobre nuestra tierra. Sin tópicos turísticos, 
              sin copiar de Sevilla ni Cádiz. Solo lo que sabemos de verdad.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="container max-w-content mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4 block">
                  Nuestra Misión
                </span>
                <h2 className="text-display text-4xl font-semibold text-navy mb-6">
                  La guía que echábamos de menos
                </h2>
                <div className="space-y-4 text-navy/70 leading-relaxed">
                  <p>
                    Huelva.cloud nació de una frustración: buscar información sobre nuestra ciudad 
                    y encontrar solo guías genéricas escritas desde Madrid o Barcelona.
                  </p>
                  <p>
                    Queríamos una guía que supiera que el choco frito se pide en determinados sitios, 
                    que los mejores planes de verano no están en Google, y que Huelva tiene 
                    una identidad propia que no necesita copiar a nadie.
                  </p>
                  <p>
                    Así que la creamos nosotros.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-navy/10">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                    <Sparkles className="text-terracotta" size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">60+</h3>
                  <p className="text-navy/60 text-sm">Artículos publicados</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-navy/10">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                    <Users className="text-terracotta" size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">10k+</h3>
                  <p className="text-navy/60 text-sm">Lectores mensuales</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-navy/10">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                    <Award className="text-terracotta" size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">100%</h3>
                  <p className="text-navy/60 text-sm">Contenido local</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-navy/10">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                    <Shield className="text-terracotta" size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">4.9</h3>
                  <p className="text-navy/60 text-sm">Valoración media</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-sand/30">
          <div className="container max-w-content mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4 block">
                El Equipo
              </span>
              <h2 className="text-display text-4xl font-semibold text-navy mb-4">
                Quienes escribimos
              </h2>
              <p className="text-navy/60 text-lg max-w-2xl mx-auto">
                Periodistas, escritores y sobre todo, onubenses. Cada artículo lleva 
                el sello de quien conoce la ciudad de verdad.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-8 rounded-2xl border border-navy/10 hover:border-terracotta/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-6">
                    <span className="text-2xl font-display font-bold text-terracotta">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-terracotta text-sm font-medium mb-4">{member.role}</p>
                  
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-navy/5 text-navy/70 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="py-20 px-6">
          <div className="container max-w-content mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <span className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4 block">
                  Estándares Editoriales
                </span>
                <h2 className="text-display text-4xl font-semibold text-navy mb-6">
                  Cómo trabajamos
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-terracotta font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Verificación in situ</h4>
                      <p className="text-navy/60 text-sm">Visitamos cada lugar que recomendamos. No copiamos de otras guías ni nos quedamos en teoría.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-terracotta font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Actualización constante</h4>
                      <p className="text-navy/60 text-sm">Revisamos nuestros contenidos regularmente. Un bar que cierra o cambia de manos se actualiza en máximo 48h.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-terracotta font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Transparencia total</h4>
                      <p className="text-navy/60 text-sm">Si usamos IA para generar contenido, lo indicamos. Si tenemos relación comercial con un establecimiento, lo decimos.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-navy p-8 rounded-2xl text-white">
                <span className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4 block">
                  Contacto Editorial
                </span>
                <h3 className="font-display text-2xl font-semibold mb-6">
                  ¿Quieres colaborar?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-terracotta" />
                    <div>
                      <p className="text-white/60 text-sm">Email editorial</p>
                      <a 
                        href="mailto:hola@huelva.cloud" 
                        className="text-white hover:text-terracotta transition-colors"
                      >
                        hola@huelva.cloud
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-terracotta" />
                    <div>
                      <p className="text-white/60 text-sm">Ubicación</p>
                      <p className="text-white">Huelva, Andalucía, España</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">
                    ¿Tienes un evento que destacar? ¿Un local que merece la pena? Cuéntanos.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white font-semibold rounded-full hover:bg-terracotta/90 transition-colors"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-navy">
          <div className="container max-w-content mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl font-semibold text-white mb-6">
              ¿Pruebas a ser choquero?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Descubre cuánto de Huelva llevas dentro con nuestro test interactivo.
            </p>
            <Link
              href="/guias/choco"
              className="inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-white font-semibold rounded-full hover:bg-terracotta/90 transition-colors"
            >
              Hacer el test del Choco
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
