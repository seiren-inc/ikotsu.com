-- ================================================
-- Ikotsu Lab Initial Database Schema
-- Based on: design-spec-31 (DB設計) + Doc-05 (基本設計)
-- ================================================

-- ================================================
-- 1. service_catalog（サービスカタログ）
-- ================================================
CREATE TABLE service_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_price INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE service_catalog IS 'サービスカタログ（粉骨・洗骨・出張・引取り等）';

-- ================================================
-- 2. price_rules（料金ルール）
-- ================================================
CREATE TABLE price_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
  rule_type VARCHAR(50) NOT NULL,  -- 'size', 'condition', 'option', 'delivery'
  label VARCHAR(100) NOT NULL,
  description TEXT,
  price_amount INTEGER NOT NULL DEFAULT 0,
  is_percentage BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE price_rules IS '料金計算ルール（サイズ加算・状態加算・オプション・出張費）';
CREATE INDEX idx_price_rules_service ON price_rules(service_id);
CREATE INDEX idx_price_rules_type ON price_rules(rule_type);

-- ================================================
-- 3. diagnosis_logs（診断ログ）
-- ================================================
CREATE TABLE diagnosis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  bone_condition VARCHAR(50),          -- 'good', 'mold', 'wet', 'damaged'
  future_plan VARCHAR(50),             -- 'scatter', 'reburial', 'storage', 'diamond'
  storage_period VARCHAR(50),          -- 'under_1y', '1_5y', '5_10y', 'over_10y'
  anxiety_type VARCHAR(50),            -- 'cost', 'process', 'legal', 'religious'
  recommended_service VARCHAR(50),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE diagnosis_logs IS 'AI診断ログ（診断傾向分析・CV率改善用）';
CREATE INDEX idx_diagnosis_logs_session ON diagnosis_logs(session_id);
CREATE INDEX idx_diagnosis_logs_created ON diagnosis_logs(created_at);

-- ================================================
-- 4. simulation_logs（見積シミュレーションログ）
-- ================================================
CREATE TABLE simulation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  bone_size VARCHAR(50),               -- 'small', 'medium', 'large', 'extra_large'
  bone_condition VARCHAR(50),          -- 'good', 'mold', 'wet', 'damaged'
  options JSONB DEFAULT '[]'::jsonb,
  region VARCHAR(50),
  estimated_price INTEGER,
  price_breakdown JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE simulation_logs IS '見積シミュレーションログ（単価分析・価格改善用）';
CREATE INDEX idx_simulation_logs_session ON simulation_logs(session_id);
CREATE INDEX idx_simulation_logs_price ON simulation_logs(estimated_price);
CREATE INDEX idx_simulation_logs_created ON simulation_logs(created_at);

-- ================================================
-- 5. staff（スタッフ）
-- ================================================
CREATE TYPE staff_role AS ENUM ('admin', 'staff', 'viewer');

CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role staff_role NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE staff IS 'スタッフ管理（Admin/Staff/Viewer権限）';

-- ================================================
-- 6. inquiries_b2c（個人問い合わせ）
-- ================================================
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'quoted', 'converted', 'closed');

CREATE TABLE inquiries_b2c (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  address TEXT,
  inquiry_type VARCHAR(50),            -- 'powdered', 'cleaning', 'carrying', 'takeout', 'other'
  related_simulation_id UUID REFERENCES simulation_logs(id) ON DELETE SET NULL,
  related_diagnosis_id UUID REFERENCES diagnosis_logs(id) ON DELETE SET NULL,
  message TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  assigned_staff UUID REFERENCES staff(id) ON DELETE SET NULL,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ              -- 論理削除
);

COMMENT ON TABLE inquiries_b2c IS '個人問い合わせ（ステータス管理・担当者割当・診断/見積連携）';
CREATE INDEX idx_inquiries_b2c_status ON inquiries_b2c(status);
CREATE INDEX idx_inquiries_b2c_created ON inquiries_b2c(created_at);

-- ================================================
-- 7. inquiries_b2b（法人問い合わせ）
-- ================================================
CREATE TYPE priority_flag AS ENUM ('normal', 'high_volume', 'urgent');

CREATE TABLE inquiries_b2b (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  corporate_name VARCHAR(200) NOT NULL,
  contact_person VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  monthly_volume INTEGER,
  corporate_type VARCHAR(50),          -- 'temple', 'ossuary', 'cemetery', 'funeral', 'other'
  requested_model VARCHAR(50),         -- 'outsource', 'partnership', 'bulk', 'other'
  message TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  priority priority_flag NOT NULL DEFAULT 'normal',
  assigned_staff UUID REFERENCES staff(id) ON DELETE SET NULL,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ              -- 論理削除
);

COMMENT ON TABLE inquiries_b2b IS '法人問い合わせ（優先フラグ・月間件数・契約モデル）';
CREATE INDEX idx_inquiries_b2b_status ON inquiries_b2b(status);
CREATE INDEX idx_inquiries_b2b_volume ON inquiries_b2b(monthly_volume);
CREATE INDEX idx_inquiries_b2b_created ON inquiries_b2b(created_at);

-- ================================================
-- 8. event_logs（イベントログ）
-- ================================================
CREATE TABLE event_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,    -- GA4イベント名と統一
  event_name VARCHAR(200),
  related_id UUID,
  related_type VARCHAR(50),            -- 'diagnosis', 'simulation', 'inquiry_b2c', 'inquiry_b2b'
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE event_logs IS 'イベントログ（操作ログ・不正検知・分析用）';
CREATE INDEX idx_event_logs_type ON event_logs(event_type);
CREATE INDEX idx_event_logs_created ON event_logs(created_at);
CREATE INDEX idx_event_logs_related ON event_logs(related_id);

-- ================================================
-- 9. faq_items（FAQ管理）
-- ================================================
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,       -- 'powdered', 'cleaning', 'carrying', 'pricing', 'legal', 'general'
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  page_slug VARCHAR(100),              -- 表示先ページスラッグ
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE faq_items IS 'FAQ管理（カテゴリ別・ページ紐付け・公開制御）';
CREATE INDEX idx_faq_items_category ON faq_items(category);
CREATE INDEX idx_faq_items_page ON faq_items(page_slug);

-- ================================================
-- 10. seo_articles（SEO記事管理）
-- ================================================
CREATE TABLE seo_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  meta_description VARCHAR(300),
  category VARCHAR(50) NOT NULL,       -- 'storage', 'legal', 'process', 'trouble', 'corporate'
  content_json JSONB,                  -- 記事構造データ
  author VARCHAR(100),
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE seo_articles IS 'ガイド記事管理（SSG/ISR用・カテゴリ分類・公開制御）';
CREATE INDEX idx_seo_articles_slug ON seo_articles(slug);
CREATE INDEX idx_seo_articles_category ON seo_articles(category);
CREATE INDEX idx_seo_articles_published ON seo_articles(is_published, published_at);

-- ================================================
-- 11. documents（法人資料管理）
-- ================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  document_type VARCHAR(50) NOT NULL,  -- 'brochure', 'case_study', 'price_list'
  is_active BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE documents IS '法人向け資料管理（ダウンロード数追跡）';

-- ================================================
-- 12. document_downloads（資料DLログ）
-- ================================================
CREATE TABLE document_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  corporate_name VARCHAR(200),
  email VARCHAR(255),
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE document_downloads IS '資料ダウンロードログ（リード獲得追跡）';
CREATE INDEX idx_document_downloads_doc ON document_downloads(document_id);

-- ================================================
-- Updated_at トリガー
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER trg_service_catalog_updated_at BEFORE UPDATE ON service_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_staff_updated_at BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inquiries_b2c_updated_at BEFORE UPDATE ON inquiries_b2c
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inquiries_b2b_updated_at BEFORE UPDATE ON inquiries_b2b
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_faq_items_updated_at BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_seo_articles_updated_at BEFORE UPDATE ON seo_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- 初期データ: サービスカタログ
-- ================================================
INSERT INTO service_catalog (slug, name, description, base_price, sort_order) VALUES
  ('powdered', '粉骨', '遺骨を専門設備で細かく砕く処理。散骨・改葬・保存に対応。', 30000, 1),
  ('cleaning', '洗骨', '遺骨に付着したカビ・汚れを専門洗浄。衛生管理徹底。', 30000, 2),
  ('carrying', '出張・搬送', '全国対応の出張引取り・搬送サービス。', 10000, 3),
  ('takeout', 'お引取り', '遠方・高齢の方向けの遺骨お引取りサービス。', 10000, 4);

-- ================================================
-- RLS（Row Level Security）基本設定
-- 将来の認証機能に備えた設定
-- ================================================
-- 現段階ではRLSを有効化しつつ、service_worker用のポリシーのみ設定
-- 管理画面実装時に詳細ポリシーを追加

ALTER TABLE service_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_articles ENABLE ROW LEVEL SECURITY;

-- 公開データは匿名読み取り可能
CREATE POLICY "service_catalog_public_read" ON service_catalog
  FOR SELECT USING (is_active = true);

CREATE POLICY "price_rules_public_read" ON price_rules
  FOR SELECT USING (is_active = true);

CREATE POLICY "faq_items_public_read" ON faq_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "seo_articles_public_read" ON seo_articles
  FOR SELECT USING (is_published = true);
