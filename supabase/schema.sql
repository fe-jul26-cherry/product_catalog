create table if not exists public.products (
  item_id text primary key,
  id integer not null unique,
  namespace_id text not null,
  category text not null check (category in ('phones', 'tablets', 'accessories')),
  name text not null,
  year integer not null,
  price integer not null check (price >= 0),
  full_price integer not null check (full_price >= 0),
  capacity text not null,
  color text not null,
  ram text,
  screen text,
  resolution text,
  processor text,
  camera text,
  image text not null,
  images text[] not null default '{}',
  capacity_available text[] not null default '{}',
  colors_available text[] not null default '{}'
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_namespace_idx on public.products (namespace_id);

create table if not exists public.product_translations (
  item_id text not null references public.products (item_id) on delete cascade,
  language text not null check (language in ('en', 'ua')),
  zoom text,
  cell text[] not null default '{}',
  description jsonb not null default '[]'::jsonb,
  primary key (item_id, language)
);

alter table public.products enable row level security;
alter table public.product_translations enable row level security;

drop policy if exists "products are public" on public.products;
create policy "products are public"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "translations are public" on public.product_translations;
create policy "translations are public"
  on public.product_translations for select
  to anon, authenticated
  using (true);

create table if not exists public.cart_items (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  item_id text not null references public.products (item_id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create table if not exists public.favorites (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  item_id text not null references public.products (item_id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.cart_items enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "own cart" on public.cart_items;
create policy "own cart"
  on public.cart_items for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own favorites" on public.favorites;
create policy "own favorites"
  on public.favorites for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
