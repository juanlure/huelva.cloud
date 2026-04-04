import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contacto y colaboraciones | Huelva.cloud',
  description: 'Publicidad local, colaboraciones, acciones especiales y contacto editorial en Huelva.cloud.',
  alternates: {
    canonical: 'https://huelva.cloud/contact',
  },
  openGraph: {
    title: 'Contacto y colaboraciones | Huelva.cloud',
    description: 'Si tienes una marca, negocio local o propuesta editorial en Huelva, aquí se habla claro.',
    url: 'https://huelva.cloud/contact',
    siteName: 'Huelva.cloud',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
