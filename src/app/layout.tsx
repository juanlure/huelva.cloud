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
  title: "Huelva.cloud | La guía honesta de Huelva",
  description: "Descubre Huelva sin turismos. Guía local escrita por choqueros para quienes quieren vivir Huelva de verdad.",
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
