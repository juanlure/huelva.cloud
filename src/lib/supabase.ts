import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isMock = !supabaseUrl || supabaseUrl.includes('placeholder');

if (isMock) {
  console.warn("⚠️ Usando MOCK Supabase Client (Credenciales placeholder detectadas)");
}

// Mock Database State
const MOCK_DB = {
  articles: [] as any[]
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
