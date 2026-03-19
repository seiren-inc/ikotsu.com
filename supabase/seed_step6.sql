-- ================================================
-- Step 6: DB Migration & Seed Data (Documents)
-- 対象: 法人向け発行書類一覧や各種資料のDBマスタ化とDL記録
-- ================================================

CREATE TABLE IF NOT EXISTS ikotsu.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,               -- 資料名/書類名
    timing TEXT,                       -- 発行/提供タイミング
    description TEXT,                  -- 記載内容/説明
    format_type TEXT,                  -- 形式（PDFなど）
    document_category TEXT NOT NULL,   -- カテゴリ（ex. corporate_flow）
    file_url TEXT,                     -- 実体ファイルのURL（ダウンロード可能な場合）
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS ikotsu.document_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES ikotsu.documents(id) ON DELETE CASCADE,
    session_id TEXT,
    user_agent TEXT,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- トリガーによる updated_at の自動更新
CREATE OR REPLACE FUNCTION ikotsu.update_updated_at_documents()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_documents_updated_at ON ikotsu.documents;
CREATE TRIGGER trg_documents_updated_at
    BEFORE UPDATE ON ikotsu.documents
    FOR EACH ROW
    EXECUTE FUNCTION ikotsu.update_updated_at_documents();

-- Step 6 Seed Data (corporate/flow などの一覧用)
INSERT INTO ikotsu.documents (title, timing, description, format_type, document_category, sort_order) VALUES
('受領書', '受領日当日', '受領日・管理番号・件数・遺骨の状態・担当者名', 'PDF（メール送付）', 'corporate_flow', 10),
('処理完了報告書', '処理完了後24時間以内', '管理番号・処理工程（グレード）・完了日・担当者名・処理前後写真（任意）', 'PDF（メール送付）', 'corporate_flow', 20),
('粉骨証明書 / 洗骨証明書', '処理完了後（オプション）', '管理番号・依頼者名（法人名可）・作業日・工程グレード・六価クロム除去確認・微粒子規格', 'PDF・郵送どちらも対応', 'corporate_flow', 30),
('月次請求書', '月末締め・翌月初旬', '件数・サービス種別・単価・合計・適格請求書番号', 'PDF（インボイス対応）', 'corporate_flow', 40);
