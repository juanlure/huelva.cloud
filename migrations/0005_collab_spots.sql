create table if not exists collab_spots (
  id serial primary key,
  name text not null,
  blurb text not null,
  photo_url text,
  link_url text,
  link_type text not null default 'web',
  active_until date not null,
  created_at timestamptz not null default now()
);

create index if not exists collab_spots_active_idx on collab_spots (active_until desc);
