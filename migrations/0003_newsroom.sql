alter table articles add column if not exists author text;

create table if not exists ops_log (
  id serial primary key,
  at timestamptz not null default now(),
  agent text not null,
  action text not null,
  detail text not null default '',
  published_slug text
);

create index if not exists ops_log_at_idx on ops_log (at desc);

create table if not exists idea_backlog (
  id serial primary key,
  topic text not null,
  angle text not null default '',
  category text not null default 'guides',
  neighborhood text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists daemon_state (
  id int primary key default 1,
  last_wake timestamptz,
  last_publish timestamptz,
  publishes_today int not null default 0,
  quota_day text,
  last_decision text
);

insert into daemon_state (id, publishes_today, last_decision)
values (1, 0, 'arrancando')
on conflict (id) do nothing;
