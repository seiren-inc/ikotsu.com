-- ================================================
-- Step 5: DB Migration & Seed Data (Travel Fee)
-- 対象: highway-tolls.ts の出張費（IC距離・高速代）マスタ化
-- ================================================

CREATE TABLE IF NOT EXISTS ikotsu.travel_fee_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id TEXT NOT NULL UNIQUE,
    target_name TEXT NOT NULL,
    distance_km NUMERIC NOT NULL,
    toll_one_way INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- トリガーによる updated_at の自動更新
CREATE OR REPLACE FUNCTION ikotsu.update_updated_at_travel_fee()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_travel_fee_rules_updated_at ON ikotsu.travel_fee_rules;
CREATE TRIGGER trg_travel_fee_rules_updated_at
    BEFORE UPDATE ON ikotsu.travel_fee_rules
    FOR EACH ROW
    EXECUTE FUNCTION ikotsu.update_updated_at_travel_fee();

-- データ投入
INSERT INTO ikotsu.travel_fee_rules (rule_id, target_name, distance_km, toll_one_way, sort_order) VALUES
('kanagawa_01', '【神奈川】保土ヶ谷IC周辺', 5.0, 320, 10),
('kanagawa_02', '【神奈川】横須賀・三浦方面（横須賀IC）', 27.3, 930, 20),
('kanagawa_03', '【神奈川】川崎・横浜北方面（京浜川崎IC）', 18.0, 710, 30),
('kanagawa_04', '【神奈川】海老名・厚木方面（厚木・圏央厚木IC）', 25.0, 880, 40),
('kanagawa_05', '【神奈川】小田原方面（小田原西IC）', 45.0, 1450, 50),
('kanagawa_06', '【神奈川】相模原方面（相模原IC/圏央道）', 40.0, 1550, 60),
('kanagawa_07', '【神奈川】鎌倉・藤沢（高速不要）', 10.0, 0, 70),

('tokyo_01', '【東京・首都高】世田谷方面（池尻）', 34.0, 1400, 110),
('tokyo_02', '【東京・首都高】新宿方面（初台/新宿）', 38.0, 1500, 120),
('tokyo_03', '【東京・首都高】都心中心部（本町/霞が関）', 35.0, 1640, 130),
('tokyo_04', '【東京・首都高】板橋方面（板橋本町）', 48.0, 1640, 140),
('tokyo_05', '【東京・首都高】品川・羽田方面（空港西）', 30.0, 1300, 150),
('tokyo_06', '【東京・首都高】足立・葛飾方面（四つ木/錦糸町）', 50.0, 1640, 160),
('tokyo_07', '【東京・一般】八王子・多摩方面（八王子IC周辺）', 55.0, 1800, 170),

('saitama_01', '【埼玉・首都高】さいたま市付近（浦和南/美女木）', 57.0, 1640, 210),
('saitama_02', '【埼玉】所沢・川越方面（所沢IC）', 60.0, 2000, 220),
('saitama_03', '【埼玉】越谷・草加方面（外環三郷西/新郷）', 70.0, 2300, 230),
('saitama_04', '【埼玉】熊谷・深谷方面（花園IC）', 110.0, 3300, 240),

('chiba_01', '【千葉】千葉市付近（穴川IC）', 80.0, 2600, 310),
('chiba_02', '【千葉】船橋・市川方面（湾岸市川IC）', 60.0, 1900, 320),
('chiba_03', '【千葉】柏・松戸方面（柏IC）', 85.0, 2800, 330),
('chiba_04', '【千葉】木更津方面（木更津金田IC）', 65.0, 2800, 340),

('tochigi_01', '【栃木】宇都宮方面（宇都宮IC）', 155.0, 4500, 410),
('tochigi_02', '【栃木】小山・佐野方面（佐野藤岡IC）', 120.0, 3600, 420),
('tochigi_03', '【栃木】那須方面（那須IC）', 210.0, 5800, 430),

('shizuoka_01', '【静岡】沼津・三島方面（沼津IC）', 85.0, 2600, 510),
('shizuoka_02', '【静岡】静岡市付近（静岡IC）', 140.0, 4100, 520),
('shizuoka_03', '【静岡】浜松方面（浜松IC）', 215.0, 6000, 530),
('shizuoka_04', '【静岡】御殿場方面（御殿場IC）', 65.0, 2000, 540)
ON CONFLICT (rule_id) DO UPDATE SET
    target_name = EXCLUDED.target_name,
    distance_km = EXCLUDED.distance_km,
    toll_one_way = EXCLUDED.toll_one_way,
    sort_order = EXCLUDED.sort_order;
