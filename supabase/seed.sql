-- ================================================
-- Ikotsu Lab Seed Data
-- service_catalog + price_rules の初期データ
-- ================================================

-- ── service_catalog ──────────────────────────────
INSERT INTO service_catalog (slug, name, description, base_price, sort_order) VALUES
(
  'powdered',
  '粉骨',
  '遺骨を専用機械でパウダー状に砕く処理。散骨・改葬・手元供養などの前処理として行われます。',
  30000,
  1
),
(
  'cleaning',
  '洗骨',
  'カビ・汚れ・変色した遺骨を専門洗浄する処理。長期保管や湿気による劣化に対応。',
  30000,
  2
),
(
  'carrying',
  '出張・搬送',
  '全国どこへでも専任スタッフが伺い、遺骨を専用梱包材でお預かりします。',
  10000,
  3
),
(
  'takeout',
  'お引取り',
  '専用梱包キットをお送りし、着払い郵送でお預かりするサービス。全国対応・梱包キット無料。',
  10000,
  4
)
ON CONFLICT (slug) DO NOTHING;

-- ── price_rules ───────────────────────────────────
-- 粉骨のサイズ加算
INSERT INTO price_rules (service_id, rule_type, label, price_amount, sort_order)
SELECT
  s.id,
  'size',
  rule.label,
  rule.price,
  rule.sort
FROM service_catalog s
CROSS JOIN (VALUES
  ('少量（骨壷1/3程度）', 0,      1),
  ('通常（骨壷1/2程度）', 5000,   2),
  ('多め（骨壷いっぱい）', 10000, 3),
  ('大量（複数骨壷）',     20000,  4)
) AS rule(label, price, sort)
WHERE s.slug = 'powdered'
ON CONFLICT DO NOTHING;

-- 粉骨の状態加算
INSERT INTO price_rules (service_id, rule_type, label, price_amount, sort_order)
SELECT
  s.id,
  'condition',
  rule.label,
  rule.price,
  rule.sort
FROM service_catalog s
CROSS JOIN (VALUES
  ('良好（変色・においなし）',       0,     1),
  ('カビあり',                       5000,  2),
  ('湿気あり',                       3000,  3),
  ('著しく損傷（欠損・土汚れ等）',   8000,  4)
) AS rule(label, price, sort)
WHERE s.slug = 'powdered'
ON CONFLICT DO NOTHING;

-- 洗骨のサイズ加算
INSERT INTO price_rules (service_id, rule_type, label, price_amount, sort_order)
SELECT
  s.id,
  'size',
  rule.label,
  rule.price,
  rule.sort
FROM service_catalog s
CROSS JOIN (VALUES
  ('少量（骨壷1/3程度）', 0,      1),
  ('通常（骨壷1/2程度）', 5000,   2),
  ('多め（骨壷いっぱい）', 10000, 3),
  ('大量（複数骨壷）',     20000,  4)
) AS rule(label, price, sort)
WHERE s.slug = 'cleaning'
ON CONFLICT DO NOTHING;
