-- ============================================================
-- Food Seller Assistant — Supabase Schema
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── seller ────────────────────────────────────────────────────
-- Single-row table — one seller account for the whole app.
create table if not exists seller (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- ── menu_items ────────────────────────────────────────────────
-- The seller's full catalogue of food items.
create table if not exists menu_items (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  price        numeric(10, 2) not null check (price >= 0),
  image_url    text,                -- Cloudinary URL
  image_public_id text,            -- Cloudinary public_id (for deletion)
  labels       text[] not null default '{}', -- e.g. {"spicy","best seller"}
  is_available boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── menu_templates ────────────────────────────────────────────
-- Saved item combinations the seller can reuse (e.g. "Lunch set").
create table if not exists menu_templates (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  menu_item_ids  uuid[] not null default '{}',
  created_at     timestamptz not null default now()
);

-- ── todays_menus ──────────────────────────────────────────────
-- One row per day — which items are on the menu that day.
create table if not exists todays_menus (
  id             uuid primary key default gen_random_uuid(),
  date           date not null unique,          -- YYYY-MM-DD, enforces one per day
  menu_item_ids  uuid[] not null default '{}',  -- ordered list of item IDs
  caption        text,                           -- generated share caption
  exported_at    timestamptz,                    -- when image was last exported
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── customers ─────────────────────────────────────────────────
create table if not exists customers (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  messenger_username   text,                       -- for m.me/{username} link
  status               text not null default 'active'
                         check (status in ('active', 'inactive', 'vip')),
  notes                text,
  favorite_orders      text[] not null default '{}',
  last_order_date      date,
  last_interaction_at  timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ── sent_log ──────────────────────────────────────────────────
-- Tracks which customers received a menu message on which day.
-- Lets the Messaging screen show who's been messaged already.
create table if not exists sent_log (
  id              uuid primary key default gen_random_uuid(),
  customer_id     uuid not null references customers(id) on delete cascade,
  todays_menu_id  uuid references todays_menus(id) on delete set null,
  sent_at         timestamptz not null default now(),
  caption_used    text,            -- snapshot of what was sent
  channel         text not null default 'messenger'
);

-- ── analytics_events ──────────────────────────────────────────
-- Lightweight event log for the analytics screen.
-- event_type examples: 'order_placed', 'menu_exported', 'message_sent'
create table if not exists analytics_events (
  id           uuid primary key default gen_random_uuid(),
  event_type   text not null,
  customer_id  uuid references customers(id) on delete set null,
  menu_item_id uuid references menu_items(id) on delete set null,
  metadata     jsonb not null default '{}',  -- flexible extra data
  occurred_at  timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_menu_items_is_available  on menu_items(is_available);
create index if not exists idx_todays_menus_date         on todays_menus(date desc);
create index if not exists idx_customers_status          on customers(status);
create index if not exists idx_customers_name            on customers(name);
create index if not exists idx_sent_log_customer         on sent_log(customer_id);
create index if not exists idx_sent_log_sent_at          on sent_log(sent_at desc);
create index if not exists idx_analytics_events_type     on analytics_events(event_type);
create index if not exists idx_analytics_events_occurred on analytics_events(occurred_at desc);

-- ============================================================
-- Auto-update updated_at triggers
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger trg_menu_items_updated_at
  before update on menu_items
  for each row execute procedure set_updated_at();

create or replace trigger trg_todays_menus_updated_at
  before update on todays_menus
  for each row execute procedure set_updated_at();

create or replace trigger trg_customers_updated_at
  before update on customers
  for each row execute procedure set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
-- We use the service role key server-side (bypasses RLS),
-- but enabling RLS is good practice to block direct client access.

alter table seller              enable row level security;
alter table menu_items          enable row level security;
alter table menu_templates      enable row level security;
alter table todays_menus        enable row level security;
alter table customers           enable row level security;
alter table sent_log            enable row level security;
alter table analytics_events    enable row level security;

-- No public policies — all access goes through the backend service role.
