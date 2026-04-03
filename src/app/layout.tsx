import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollabBanner from "@/components/CollabBanner";

// Premium typography system - avoiding generic Inter/Playfair
const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Huelva.cloud | Guía Local 2026 - Qué Ver, Dónde Comer y Eventos",
    template: "%s | Huelva.cloud"
  },
  description: "La guía de Huelva sin rodeos ni folletos turísticos genéricos. Escrita por onubenses para que sepas dónde comer el mejor choco frito, qué ver y los planes más auténticos de la provincia. Huelva de verdad.",
  keywords: "Huelva, qué ver en Huelva, dónde comer en Huelva, choco frito Huelva, coquinas Huelva, eventos Huelva 2026, guía local Huelva, turismo Huelva auténtico",
  authors: [{ name: "Huelva.cloud" }],
  creator: "Huelva.cloud",
  publisher: "Huelva.cloud",
  metadataBase: new URL("https://huelva.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Huelva.cloud | Guía Local de Huelva (Sin Filtros)",
    description: "La guía de Huelva escrita por onubenses. Dónde comer choco frito, coquinas y los mejores planes sin tópicos turísticos.",
    url: "https://huelva.cloud",
    siteName: "Huelva.cloud",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huelva.cloud | La Guía Auténtica de Huelva",
    description: "Qué ver y dónde comer en Huelva de verdad. Sin pamplinas turísticas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "4OHaHWxYg2W4o994iY9MXUO8OW0GC1mYqPywIKrY8es",
  },
  icons: {
    icon: '/favicon.ico',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO-Geo: Structured Data for the entire site
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Huelva.cloud",
    "url": "https://huelva.cloud",
    "description": "Guía local auténtica de Huelva escrita por onubenses.",
    "publisher": {
      "@type": "Organization",
      "name": "Huelva.cloud",
      "logo": {
        "@type": "ImageObject",
        "url": "https://huelva.cloud/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://huelva.cloud/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${instrument.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-cream text-navy antialiased selection:bg-terracotta/20 selection:text-navy`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CollabBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
