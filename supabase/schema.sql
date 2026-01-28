-- huelva.is Schema

-- 1. Tabla de Artículos
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text not null,
  image_url text,
  author text default 'Huelva.is AI',
  is_ai boolean default true,
  tags text[] default '{}',
  featured boolean default false,
  status text default 'pending_review' check (status in ('pending_review', 'approved', 'published', 'rejected')),
  review_notes text,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Índice para filtrado eficiente por status
create index idx_articles_status on public.articles(status);

-- Habilitar RLS (Row Level Security)
alter table public.articles enable row level security;

-- Política: Solo artículos publicados son visibles públicamente
create policy "Public articles are viewable by everyone"
  on public.articles for select
  using (status = 'published');

-- =============================================================================
-- MIGRACIÓN PARA BASES DE DATOS EXISTENTES
-- Ejecutar manualmente en Supabase Dashboard si ya tienes artículos:
-- =============================================================================
-- ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'published', 'rejected'));
-- ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS review_notes text;
-- CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
-- UPDATE public.articles SET status = 'published' WHERE status IS NULL;
-- DROP POLICY IF EXISTS "Public articles are viewable by everyone" ON public.articles;
-- CREATE POLICY "Public articles are viewable by everyone" ON public.articles FOR SELECT USING (status = 'published');
-- =============================================================================

-- Política: Solo service_role puede insertar/actualizar (Agentes)
-- (Supabase habilita service_role bypass por defecto, no hace falta policy explícita si usamos la service key)

-- 2. Tabla de Logs de Agentes
create table public.agent_logs (
  id uuid default gen_random_uuid() primary key,
  agent_name text not null,
  action text not null,
  details jsonb,
  created_at timestamp with time zone default now()
);

alter table public.agent_logs enable row level security;
-- Nadie lee logs públicamente, solo dashboard admin (futuro)
