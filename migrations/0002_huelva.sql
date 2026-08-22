create table if not exists articles (
  id serial primary key,
  slug text not null unique,
  title text not null,
  dek text not null default '',
  body text not null,
  category text not null,
  read_minutes int not null default 8,
  featured boolean not null default false,
  source text not null default 'editorial',
  neighborhood text,
  published_at timestamptz not null default now(),
  votes int not null default 0
);

create index if not exists articles_published_idx on articles (published_at desc);
create index if not exists articles_votes_idx on articles (votes desc);
create index if not exists articles_category_idx on articles (category);

create table if not exists places (
  id serial primary key,
  name text not null,
  kind text not null,
  lat double precision not null,
  lng double precision not null,
  blurb text not null default '',
  neighborhood text,
  hours text,
  votes int not null default 0
);

create index if not exists places_kind_idx on places (kind);

create table if not exists events (
  id serial primary key,
  title text not null,
  dek text not null default '',
  starts_on date not null,
  ends_on date,
  venue text not null default '',
  neighborhood text,
  lat double precision,
  lng double precision,
  source text not null default 'editorial',
  votes int not null default 0
);

create index if not exists events_starts_idx on events (starts_on);
