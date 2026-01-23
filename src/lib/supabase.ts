import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isMock = !supabaseUrl || supabaseUrl.includes('placeholder');

if (isMock) {
  console.warn("⚠️ Usando MOCK Supabase Client (Credenciales placeholder detectadas)");
}

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

// Mock Database State
const MOCK_DB = {
  articles: [] as any[]
};

// Mock Client Implementation
const mockSupabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      order: () => ({
        limit: () => Promise.resolve({ data: MOCK_DB[table as keyof typeof MOCK_DB] || [], error: null })
      }),
      eq: (col: string, val: any) => ({
        single: () => Promise.resolve({ data: (MOCK_DB[table as keyof typeof MOCK_DB] || []).find((r:any) => r[col] === val), error: null })
      }),
      ilike: (col: string, val: any) => Promise.resolve({ data: [], error: null })
    }),
    insert: (row: any) => {
      console.log(`[MOCK DB] Insertando en '${table}':`, row.title);
      if (table === 'articles') {
        MOCK_DB.articles.push({ ...row, created_at: new Date().toISOString() });
      }
      return Promise.resolve({ error: null });
    }
  })
};

export const supabase = isMock 
  ? (mockSupabase as any) 
  : createClient(supabaseUrl, supabaseKey);

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
