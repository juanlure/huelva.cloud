import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isMock = !supabaseUrl || supabaseUrl.includes('placeholder');

if (isMock) {
  console.warn("⚠️ Usando MOCK Supabase Client (Credenciales placeholder detectadas)");
}

// Mock Database State
const IMAGES = {
  choco: 'https://commons.wikimedia.org/wiki/Special:FilePath/Choco_frito.jpg?width=800',
  playa: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cuesta_de_Maneli_R07.jpg?width=1000',
  tapas: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tapas_variadas.jpg?width=800',
  architecture: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barrio_Obrero_Huelva.jpg?width=1000',
  muelle: 'https://commons.wikimedia.org/wiki/Special:FilePath/MuelleRioTintoSunset.jpg?width=1000',
  nature: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flamencos_Marismas_del_Odiel.jpg?width=1000',
};

const MOCK_DB = {
  articles: [
    {
      slug: 'ruta-del-choco',
      title: 'La Ruta del Choco: Donde el Choco es Religión',
      excerpt: 'Si vienes a Huelva y no comes choco, es como ir a Roma y no ver al Papa. O peor, como ir a la playa y que haya levante.',
      content: '<p>Contenido del artículo sobre el choco...</p>',
      category: 'Gastronomía',
      image_url: IMAGES.choco,
      author: 'Rocío Limón',
      is_ai: true,
      published_at: new Date().toISOString()
    },
    {
      slug: 'muelle-del-tinto-atardecer',
      title: 'El Muelle del Tinto: El Atardecer más Fotogénico',
      excerpt: '1.165 metros de hierro industrial sobre el Río Odiel. El lugar perfecto para ver el sol morir.',
      content: '<p>Contenido del muelle...</p>',
      category: 'Playa y Naturaleza',
      image_url: IMAGES.muelle,
      author: 'Juan María "El Experto"',
      is_ai: true,
      published_at: new Date().toISOString()
    },
    {
      slug: 'playas-huelva-ocultas',
      title: 'Playas que los turistas no conocen',
      excerpt: 'Todo el mundo va a Punta Umbría. Pero el verdadero tesoro está en Cuesta Maneli.',
      content: '<p>Contenido playero...</p>',
      category: 'Playa y Naturaleza',
      image_url: IMAGES.playa,
      author: 'María "La Sirena"',
      is_ai: true,
      published_at: new Date().toISOString()
    },
    {
      slug: 'barrio-britanico-reina-victoria',
      title: 'El Barrio Inglés que parece Londres',
      excerpt: 'Casas victorianas y jardines. Un barrio minero convertido en patrimonio.',
      content: '<p>Contenido barrio...</p>',
      category: 'Cultura y Historia',
      image_url: IMAGES.architecture,
      author: 'Pedro García',
      is_ai: true,
      published_at: new Date().toISOString()
    },
    {
      slug: 'marismas-odeli-flamencos',
      title: 'Marismas del Odiel: Flamencos reales',
      excerpt: '2.700 hectáreas de marismas y 300 especies de aves.',
      content: '<p>Contenido marismas...</p>',
      category: 'Playa y Naturaleza',
      image_url: IMAGES.nature,
      author: 'Ana Romero',
      is_ai: true,
      published_at: new Date().toISOString()
    }
  ] as any[]
};

// Mock Client Implementation
// Mock Client Implementation
const mockBuilder = (results: any[], table?: string) => {
  const builder: any = {
    select: () => builder,
    order: () => builder,
    limit: () => builder,
    eq: (col: string, val: any) => {
      // Simple filter for mock
      const filtered = results.filter(r => r[col] === val);
      return mockBuilder(filtered, table);
    },
    ilike: (col: string, val: any) => {
      // Simple case-insensitive filter
      const pattern = val.replace(/%/g, '').toLowerCase();
      const filtered = results.filter(r => String(r[col]).toLowerCase().includes(pattern));
      return mockBuilder(filtered, table);
    },
    single: () => Promise.resolve({ data: results[0] || null, error: null }),
    insert: (row: any) => {
      console.log(`[MOCK DB] Insertando en '${table}':`, row.title || 'row');
      if (table === 'articles') {
        // @ts-ignore
        if (typeof MOCK_DB !== 'undefined' && MOCK_DB.articles) {
          // @ts-ignore
          MOCK_DB.articles.push({ ...row, created_at: new Date().toISOString() });
        }
      }
      return Promise.resolve({ error: null, data: [row] });
    },
    // Make it thenable to act like a Promise
    then: (resolve: Function, reject: Function) => {
      resolve({ data: results, error: null });
    }
  };
  return builder;
};

const mockSupabase = {
  from: (table: string) => mockBuilder(MOCK_DB[table as keyof typeof MOCK_DB] || [], table)
};

// Cliente público (Lectura)
export const supabase = isMock
  ? (mockSupabase as any)
  : createClient(supabaseUrl, supabaseKey);

// Cliente Admin (Escritura - Agentes)
export const supabaseAdmin = isMock
  ? (mockSupabase as any)
  : (supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : createClient(supabaseUrl, supabaseKey) // Fallback peligroso, pero mejor que crash
  );



// Interfaces para nuestras tablas
export interface ArticleDB {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  is_ai: boolean;
  published_at: string;
  created_at: string;
}

export interface AgentLogDB {
  id: string;
  agent_name: string;
  action: string;
  details: any;
  created_at: string;
}
