import { Guide } from '../../../types/guide';

export const MOCK_GUIDE: Guide = {
    slug: 'guia-gambas-huelva',
    title: 'La Guía Definitiva de la Gamba Blanca',
    subtitle: 'Dónde comerlas (sin que te timen), cómo pelarlas y por qué son la religión oficial de Huelva.',
    authorId: 'Rocío Limón',
    heroImage: 'https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=2000&auto=format&fit=crop', // Big prawn plate
    tags: ['Gastronomía', 'Imprescindibles', 'Marisco'],
    createdAt: '2025-05-15',
    updatedAt: '2025-05-15',
    chapters: [
        {
            id: 'basics',
            title: 'Los Mandamientos',
            content: `
        <p>No todas las gambas son blancas, ni todas las blancas son de Huelva. Aquí aprenderás a distinguirlas antes de que te den gato por liebre (o vannamei por blanca).</p>
        <div class="tip-box">
           <strong>💡 Regla de Oro:</strong> Si los bigotes son cortos y están rotos, esa gamba ha viajado más que tú. La gamba fresca de Huelva tiene los bigotes largos e intactos.
        </div>
      `,
            places: []
        },
        {
            id: 'centro',
            title: 'El Templo del Centro',
            summary: 'Si solo tienes unas horas en la ciudad, no te muevas de este triángulo de las bermudas del marisco.',
            content: '<p>En el centro de Huelva se come de pie y se mancha uno los dedos. Estos son los imprescindibles.</p>',
            places: [
                {
                    id: 'azabache',
                    name: 'Bar Azabache',
                    description: 'Un clásico que nunca falla. Barra de acero inoxidable, camareros de la vieja escuela y una plancha que no descansa. Sus gambas son de calibre medio pero frescura extrema.',
                    priceRange: '€€',
                    tip: 'Pide media de gambas y media de ensaladilla para acompañar. La combinación ganadora.',
                    images: ['https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800'],
                    bestFor: ['Clásico', 'Barra'],
                    googleMapsUrl: '#'
                },
                {
                    id: 'papi',
                    name: 'Restaurante Papi',
                    description: 'Si buscas sentarte y darte un homenaje serio. Aquí el calibre de la gamba sube, y el precio también. Trato exquisito y producto de lonja diario.',
                    priceRange: '€€€',
                    images: ['https://images.unsplash.com/photo-1625937751876-452309e0eb86?q=80&w=800'],
                    bestFor: ['Mesa', 'Calidad'],
                    googleMapsUrl: '#'
                }
            ]
        },
        {
            id: 'barrios',
            title: 'Joyas de Barrio',
            content: '<p>Sal del centro y encontrarás precios más amables y raciones más generosas. Isla Chica manda.</p>',
            places: [
                {
                    id: 'juan-jose',
                    name: 'Bar Juan José',
                    description: 'Famoso por su tortilla, pero sus gambas al ajillo son un secreto a voces. Ambiente ruidoso, auténtico y 100% onubense.',
                    priceRange: '€',
                    tip: 'Ve temprano o no coges sitio. Y sí, pide la tortilla también.',
                    bestFor: ['Económico', 'Auténtico'],
                    googleMapsUrl: '#'
                }
            ]
        }
    ]
};
