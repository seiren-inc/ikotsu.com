# 詳細設計書

**Project:** Ikotsu.com Next-Generation Platform
**Version:** 1.0
**Scope:** DB設計 / API設計 / 画面詳細 / コンポーネント / SEO構造化データ / 運用設計（実装直前レベル）

---

## 1. 前提と非機能要件

### 1.1 技術前提

| 項目           | 仕様                                 |
| -------------- | ------------------------------------ |
| フレームワーク | Next.js 16 App Router / TypeScript   |
| レンダリング   | SSR主体（LP）/ SSG可（ガイド記事）   |
| フォーム       | API Route経由送信                    |
| ストレージ     | 画像のみ（運用で差し替え可能な設計） |

### 1.2 パフォーマンス要件

- LCP 2秒以内
- 画像WebP優先 / 遅延読み込み
- フォント最適化
- シミュレーター以外は極力Server Component

### 1.3 セキュリティ要件

- SSL必須
- reCAPTCHA v3
- Rate limit（IP単位）
- ハニーポット＋時間差でスパム対策
- 管理機能は今回スコープ外（将来拡張）

---

## 2. 情報設計とURL設計（確定）

### 2.1 主要ページ

```
/
/services/powdering
/services/cleaning
/services/transport
/services/takeout
/services/on-site
/simulator
/for-individual
/for-corporate
/complete-guide
/guide
/faq
/group
/company
```

### 2.2 SEO記事（ガイド配下）

```
/complete-guide/[slug]
例：
/complete-guide/powdering-price
/complete-guide/bone-cleaning-mold
/complete-guide/kai-so-permit-flow
```

### 2.3 旧URLリダイレクト

既存サイトURL（`/powdered` 等）から新URLへ 301 リダイレクト設置。

---

## 3. データ設計（DBスキーマ）

**推奨DB：** PostgreSQL（Supabase）

### テーブル一覧

| テーブル名           | 用途                               |
| -------------------- | ---------------------------------- |
| `estimate_sessions`  | 見積入力の保存・フォームプリフィル |
| `inquiries_b2c`      | 個人問い合わせ                     |
| `inquiries_b2b`      | 法人問い合わせ                     |
| `documents`          | 法人資料管理                       |
| `document_downloads` | DL計測                             |
| `service_catalog`    | サービス一覧・説明統一             |
| `price_rules`        | 料金表（計算ロジック表駆動）       |
| `lead_events`        | 行動データ（離脱ポイント検出）     |
| `partners_b2b`       | 提携実績（承諾済のみ）             |
| `faq_items`          | FAQ表示・構造化データ生成          |
| `seo_articles`       | ガイド記事                         |

### 3.2 スキーマ詳細

#### estimate_sessions

```sql
id                    uuid pk
created_at            timestamptz not null default now()
updated_at            timestamptz not null default now()
client_fingerprint    text null        -- Cookie由来端末識別
source / medium / campaign / referrer  text null  -- UTM
state_type            text not null    -- indoor | grave | soil
urn_size              text not null    -- s23 | s45 | s67
options               jsonb not null default '{}'
distance_km           integer null
onsite_range          text null        -- r50 | r80 | r110 | r140
takeout_travel_range  text null        -- t30〜t180
computed_total_yen    integer not null
computed_breakdown    jsonb not null default '{}'
status                text not null default 'active'  -- active | submitted | expired
```

#### inquiries_b2c

```sql
id                   uuid pk
created_at           timestamptz not null default now()
estimate_session_id  uuid null fk estimate_sessions.id
name / phone / email / prefecture / city  text
contact_method       text not null  -- phone | email | line
message / service_interest / urgency  text null
consent              boolean not null
utm                  jsonb not null default '{}'
status               text not null default 'new'  -- new | contacted | closed | spam
```

#### inquiries_b2b

```sql
id                    uuid pk
created_at            timestamptz not null default now()
company_name / department / person_name / phone / email  text
facility_type         text not null  -- temple | ossuary | cemetery | tree_burial | stone_shop | funeral | other
monthly_volume_range  text null  -- v01_05 | v06_20 | v21_50 | v51_plus
needs                 jsonb not null default '{}'
area / message        text null
request_material      boolean not null default false
utm                   jsonb not null default '{}'
status                text not null default 'new'
```

#### price_rules

```sql
id          uuid pk
rule_type   text not null  -- powdering | cleaning_simple | transport | onsite_fee | takeout_base | takeout_travel | extra
state_type  text null      -- indoor | grave | soil
urn_size    text null      -- s23 | s45 | s67
distance_km integer null
range_key   text null      -- r50 etc
price_yen   integer not null
note        text null
is_active   boolean not null default true
```

#### lead_events

```sql
id                  uuid pk
created_at          timestamptz not null default now()
client_fingerprint  text null
event_name          text not null
  -- view_page | open_simulator | calc_price | click_call | click_line
  -- submit_b2c | submit_b2b | download_doc
page_path           text not null
payload / utm       jsonb not null default '{}'
```

#### seo_articles

```sql
id           uuid pk
created_at / updated_at  timestamptz
slug         text not null unique
title / description  text not null
body_md      text not null
author_name / reviewed_by  text
published_at timestamptz not null
is_public    boolean not null default true
schema       jsonb not null default '{}'  -- Article, FAQ, Breadcrumb補助
```

---

## 4. 料金シミュレーター詳細設計

### 4.1 UI入力項目

| 項目                 | 選択肢                                           |
| -------------------- | ------------------------------------------------ |
| state_type           | indoor / grave / soil                            |
| urn_size             | s23 / s45 / s67                                  |
| options              | cleaning / transport / takeout / onsite / extras |
| distance_km          | 50〜400（transport時）                           |
| onsite_range         | r50 / r80 / r110 / r140（onsite時）              |
| takeout_travel_range | t30〜t180（takeout時）                           |

### 4.2 計算ロジック

```
total = powdering_price
      + (cleaning  ? cleaning_price  : 0)
      + (transport ? transport_price : 0)
      + (onsite    ? onsite_fee      : 0)
      + (takeout   ? takeout_base + takeout_travel : 0)
      + extras_price
```

### 4.3 表示要件

- 合計金額（税込） / 内訳明示
- 見積IDを生成しフォームへ引き継ぎ
- PDF出力：初期はクライアント生成、将来サーバ生成に切替可能なIF

### 4.4 バリデーション例外

| 組み合わせ                      | 許可 |
| ------------------------------- | ---- |
| onsite + takeout 同時           | ✅   |
| transport + onsite 同時         | ✅   |
| transport選択時 distance_km必須 | ✅   |

---

## 5. API設計（Route Handlers）

**共通：** JSON / reCAPTCHA検証必須 / Rate limit

| エンドポイント            | メソッド | 用途                             |
| ------------------------- | -------- | -------------------------------- |
| `/api/estimate`           | POST     | 見積セッション生成・計算結果保存 |
| `/api/inquiry/b2c`        | POST     | 個人問い合わせ送信               |
| `/api/inquiry/b2b`        | POST     | 法人問い合わせ送信               |
| `/api/documents/[slug]`   | GET      | 資料URL取得                      |
| `/api/documents/download` | POST     | DL計測                           |
| `/api/events`             | POST     | 行動イベント記録                 |

### POST /api/inquiry/b2c 動作

1. DB保存
2. 通知メール送信（運用先へ）
3. estimate_session の status を `submitted` へ更新

---

## 6. 画面詳細設計（コンポーネント分割）

### 6.1 共通レイアウト

```
Header
  ServiceDropdownMegaMenu
  MobileNavAccordion
StickyCTAButtons（電話 / LINE / 見積）
Footer（グループサービス統合）
```

### 6.2 TOPページ

```
Hero
QuickDiagnosisCard
ServiceCards
PriceSimulatorEmbed（簡易版）
NextChoiceCards（散骨 / お墓探し / お墓じまい / ダイヤ / 終活 / コーポレート）
TrustProofStrip（実績 / 対応日数 / 透明料金）
FAQPreview
FinalCTA
```

### 6.3 サービスページ共通

```
ServiceHero → ProblemList → ProcessSteps → PriceTable
→ SimulatorLinkBlock → FAQByCategory → CrossServiceBlock → StickyCTA
```

### 6.4 法人ページ

```
B2BHero
UseCasesGrid（寺院 / 納骨堂 / 樹木葬 / 霊園）
OperationModelCards（完全外注 / 共同ブランド / 年間契約）
QualityAndTraceability
TestIntroOffer（まずは少量テスト）
B2BForm
MaterialsDownloadBlock
```

### 6.5 完全ガイド（SEOハブ）

```
PillarHero → IndexOfTopics → DefinitionBlocks → ComparisonTables
→ FAQHub → InternalLinkNetwork
```

---

## 7. SEO詳細設計

### 7.1 メタ

各ページに：title / description / canonical / OGP / Twitter Card

### 7.2 構造化データ

| 種別           | 対象ページ     |
| -------------- | -------------- |
| Article        | ガイド記事     |
| FAQPage        | FAQ表示ページ  |
| BreadcrumbList | 全ページ       |
| LocalBusiness  | 会社情報ページ |

### 7.3 GEO最適化テンプレ（各ページ必須）

1. 定義
2. よくある誤解
3. 比較表
4. 数値
5. 結論（短文）

---

## 8. 運用設計

| 更新対象       | 内容                   |
| -------------- | ---------------------- |
| `price_rules`  | 価格改定               |
| `faq_items`    | FAQ追加                |
| `seo_articles` | 記事追加               |
| `partners_b2b` | 実績追加（許可済のみ） |

- 問い合わせ通知：メール / 将来スプレッドシート連携
- `lead_events` を週次確認し離脱ポイントを改修

---

## 9. 受け入れ条件（テスト観点）

| 対象           | 確認内容                                                                         |
| -------------- | -------------------------------------------------------------------------------- |
| シミュレーター | 全組み合わせ計算一致 / バリデーション / 内訳表示 / フォーム引継ぎ                |
| フォーム       | reCAPTCHA / Rate limit / サンクス遷移 / DB保存                                   |
| SEO            | SSRレンダリング / title・description・canonical / 構造化データ検証ツール無エラー |
| パフォーマンス | LCP目標 / 画像最適化                                                             |

---

## 10. 実装順序（推奨）

```
1. Layout / Header / Footer / ルーティング
2. サービスページテンプレ
3. シミュレーター本体（計算表駆動）
4. BtoCフォーム
5. BtoBフォーム＋資料DL
6. SEOハブページ
7. 構造化データ一式
8. 計測イベント
9. 301リダイレクト
```
