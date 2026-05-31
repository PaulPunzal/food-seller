-- ============================================================
-- Seed data for the Food Seller Assistant
-- ============================================================
-- HOW TO USE:
-- 1. Run schema.sql first.
-- 2. Generate a bcrypt hash for your password:
--      node -e "const b=require('bcryptjs'); b.hash('YourPassword123',12).then(console.log)"
-- 3. Replace the placeholder hash below with the output.
-- 4. Run this file in the Supabase SQL editor.
-- ============================================================

-- ── Seller account ────────────────────────────────────────────
-- Replace the password_hash value with your own bcrypt hash (cost 12).
-- The placeholder below is intentionally invalid — the app will reject it.
insert into seller (email, password_hash)
values (
  'punzalpauljohn@gmail.com',
  '$2a$12$seGQQO1yH1mdkKaTl9527eJVMuBw9e3p2c31c3AIcmzGqJbSoDpdq'
)
on conflict (email) do nothing;

-- ── Sample menu items ─────────────────────────────────────────
insert into menu_items (name, description, price, labels, is_available) values
  ('Sinigang na Baboy',  'Classic sour tamarind pork soup with vegetables', 120.00, ARRAY['bestseller','pork'],    true),
  ('Adobong Manok',      'Chicken braised in vinegar, soy sauce, and garlic',  95.00, ARRAY['chicken','classic'],  true),
  ('Kare-Kare',          'Oxtail in peanut sauce with bagoong',               180.00, ARRAY['special','beef'],     true),
  ('Pancit Canton',      'Stir-fried egg noodles with mixed vegetables',        80.00, ARRAY['noodles','veggie'],  true),
  ('Fried Rice (plain)', 'Garlic fried rice',                                   35.00, ARRAY['rice','add-on'],     true),
  ('Bottled Water',      '500ml',                                               20.00, ARRAY['drinks'],            true)
on conflict do nothing;

-- ── Sample customers ─────────────────────────────────────────
insert into customers (name, messenger_username, status, notes, favorite_orders) values
  ('Maria Santos',   'mariasantos.ph',  'vip',    'Prefers less salt. Orders every Friday.',   ARRAY['Sinigang na Baboy', 'Pancit Canton']),
  ('Jose Reyes',     'josereyes123',    'active', 'Usually orders for family of 4.',            ARRAY['Kare-Kare', 'Fried Rice (plain)']),
  ('Ana Cruz',       'anacruz.mnl',     'active', NULL,                                         ARRAY['Adobong Manok']),
  ('Pedro Dela Cruz', NULL,             'inactive','Lost contact. Last order March.',            ARRAY[])
on conflict do nothing;
