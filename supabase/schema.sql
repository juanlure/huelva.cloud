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
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Habilitar RLS (Row Level Security)
alter table public.articles enable row level security;

-- Política: Cualquiera puede leer artículos publicados
create policy "Public articles are viewable by everyone"
  on public.articles for select
  using (true);

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
