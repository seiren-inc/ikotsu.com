-- ================================================
-- Step 3: DB Migration & Seed Data (FAQ, Price Rules)
-- ================================================

-- 1. トップページ用 FAQ
INSERT INTO faq_items (category, question, answer, sort_order, page_slug, is_published) VALUES
('general', '誰の遺骨か取り違えない仕組みはありますか？', '受領時に管理番号を発行し、工程の全フェーズで番号紐付け管理を行っています。粉骨機は1件ごとに完全清掃してから次の作業に入るため、他の方の遺骨との混入は構造的に防いでいます。', 1, '/', true),
('general', '墓から取り出した遺骨を依頼する場合、工程はスタンダードと何が違いますか？', '墓からの遺骨は六価クロム除去・乾燥工程が必要なため、工程数が増え所要日数は5〜7日になります。料金も高くなります。状態によって適切なプランが異なるため、先にサービス判断フローで確認することをお勧めします。', 2, '/', true),
('general', '粉骨証明書には何が記載されますか？', '管理番号・依頼者氏名・作業日・工程グレード・担当者名・微粒子規格・六価クロム除去の実施確認を記載します。法人名義での発行も対応しています。', 3, '/', true),
('general', '霊園・寺院・散骨業者からの法人委託に対応していますか？', '法人からの一括委託に対応しています。受領書・処理完了報告書・月次請求書（インボイス対応）を発行します。詳細は法人専用フォームからお問い合わせください。', 4, '/', true),
('general', '洗骨と粉骨はどちらが先ですか？順番は？', '墓から取り出した遺骨の場合は洗骨→粉骨の順で対応します。洗骨を先に行うことでカビ・六価クロムを除去し、安全な状態で粉骨できます。洗骨＋粉骨セットプランで一括対応できます。', 5, '/', true),
('general', '工程公開とは何を公開していますか？', '粉骨・洗骨の全作業工程をステップ別写真とチェック項目で公開しています。「作業の見えない部分」をテキスト・写真で確認でき、依頼判断の根拠としてご利用いただけます。', 6, '/', true),
('general', '料金以外に追加費用は発生しますか？', 'お見積り時にご案内した料金以外の追加費用は原則発生しません。新たな工程追加が必要な場合は必ず事前にご説明し、同意を得てから対応しています。', 7, '/', true);

-- 2. 粉骨サービスページ用 FAQ
INSERT INTO faq_items (category, question, answer, sort_order, page_slug, is_published) VALUES
('powdered', '誰の遺骨か取り違えない仕組みはありますか？', '受領時に管理番号を発行し、工程の全フェーズで番号紐付け管理を行っています。粉骨機は1件ごとに完全清掃してから次の作業に入るため、他の方の遺骨との混入は構造的に防いでいます。', 1, '/services/powdered', true),
('powdered', '粉骨証明書に記載される項目を教えてください', '管理番号・依頼者氏名・作業日・工程グレード（スタンダード/墓から/土付き）・担当者名・微粒子規格・六価クロム除去の実施確認を記載します。法人名義での発行も対応しています。', 2, '/services/powdered', true),
('powdered', '法人（複数体）の一括依頼に対応していますか？', '霊園・寺院・散骨業者・石材店からの法人一括委託に対応しています。受領書・処理完了報告書・月次請求書を発行し、インボイス対応も可能です。詳細は法人相談フォームからお問い合わせください。', 3, '/services/powdered', true),
('powdered', 'スタンダード・墓から・土付きの違いは何ですか？', '遺骨の出どころと状態によって必要な前処理工程が異なります。スタンダードは火葬後の遺骨で当日〜60分。墓からの遺骨は六価クロム除去と乾燥が加わり5〜7日。土付き遺骨はさらに土泥除去・小石除去工程が加わり7〜10日かかります。', 4, '/services/powdered', true),
('powdered', '六価クロムの除去は全工程で標準ですか？', '墓からの遺骨プランと土付き遺骨プランは標準工程に含みます。スタンダードプランはオプション対応（別途料金）です。六価クロムが懸念される場合は事前にご相談ください。', 5, '/services/powdered', true);


-- 3. 料金シミュレータ用 Price Rules
-- internal value を description カラムに格納してフロントエンドで使用する
INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'size', '少量（2寸・3寸）', 'small', 0, 1, true
FROM service_catalog WHERE slug = 'powdered';

INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'size', '標準（4寸・5寸）', 'medium', 2200, 2, true
FROM service_catalog WHERE slug = 'powdered';

INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'size', '多め（6寸・7寸）', 'large', 4400, 3, true
FROM service_catalog WHERE slug = 'powdered';

INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'condition', '良好（室内保管）', 'good', 0, 1, true
FROM service_catalog WHERE slug = 'powdered';

INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'condition', 'カビ・湿気あり（お墓等）', 'mold', 8800, 2, true
FROM service_catalog WHERE slug = 'powdered';

INSERT INTO price_rules (service_id, rule_type, label, description, price_amount, sort_order, is_active)
SELECT id, 'condition', '土泥付き（土葬等）', 'mud', 19800, 3, true
FROM service_catalog WHERE slug = 'powdered';
