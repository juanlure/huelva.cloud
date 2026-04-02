/**
 * Mapeo de categorías entre URLs (slugs) y base de datos
 * Esto asegura que al visitar /comer se busquen artículos de "Gastronomía"
 */

export const CATEGORY_MAP: Record<string, string> = {
    'comer': 'Gastronomía',
    'eventos': 'Eventos',
    'alojarse': 'Alojamiento',
    'guias': 'Guías Locales',
    'noticias': 'Noticias',
    'rutas': 'Playa y Naturaleza', // Matches seed data
    'cultura': 'Cultura y Historia'
};

export const CATEGORY_TITLES: Record<string, string> = {
    'comer': 'Comer y Beber',
    'eventos': 'Agenda y Eventos', 
    'alojarse': 'Dónde Dormir',
    'guias': 'Guías Locales',
    'noticias': 'Noticias y Actualidad',
    'rutas': 'Rutas y Escapadas',
    'cultura': 'Historia y Cultura'
};

// Reverso para cuando necesitamos ir de DB a URL (si fuera necesario)
export const DB_TO_URL_CATEGORY: Record<string, string> = Object.entries(CATEGORY_MAP).reduce((acc, [url, db]) => ({
    ...acc,
    [db]: url
}), {});
