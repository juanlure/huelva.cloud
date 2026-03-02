import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  description: "Guía local de Huelva escrita por onubenses. Descubre qué ver, dónde comer (choco frito, coquinas), eventos 2026 y los mejores planes. Sin tópicos turísticos.",
  keywords: "Huelva, qué ver en Huelva, dónde comer en Huelva, choco frito Huelva, coquinas Huelva, eventos Huelva 2026, guía Huelva, turismo Huelva, Andalucía",
  authors: [{ name: "Huelva.cloud" }],
  creator: "Huelva.cloud",
  publisher: "Huelva.cloud",
  metadataBase: new URL("https://huelva.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Huelva.cloud | Guía Local 2026 - Qué Ver, Dónde Comer y Eventos",
    description: "Guía local de Huelva escrita por onubenses. Descubre qué ver, dónde comer (choco frito, coquinas), eventos 2026 y los mejores planes.",
    url: "https://huelva.cloud",
    siteName: "Huelva.cloud",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huelva.cloud | Guía Local 2026",
    description: "Guía local de Huelva escrita por onubenses. Qué ver, dónde comer, eventos 2026.",
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
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${instrument.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-cream text-navy antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
