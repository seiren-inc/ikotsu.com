# SEO技術実装仕様書

**Project:** Ikotsu.com SEO Technical Implementation Specification
**Layer:** Technical SEO / 検索基盤設計
**Version:** 1.0
**Purpose:** 粉骨・洗骨分野で検索上位を"安定的に"維持するための技術SEO実装仕様を確定する

---

## 1. 設計目的

SEOはコンテンツだけでは勝てない。技術実装が土台。
**目的：** 主要KW上位安定 / ロングテール大量獲得 / AI引用増加 / 法人検索流入獲得

---

## 2. URL設計

**ルール：** 英小文字 / ハイフン区切り / 階層は2〜3段まで
| URL | 内容 |
|-----|------|
| `/` | トップ |
| `/services/` | サービス一覧 |
| `/services/powdered/` | 粉骨 |
| `/services/cleaning/` | 洗骨 |
| `/services/carrying/` | 出張・搬送 |
| `/services/takeout/` | お引取り |
| `/for-corporate/` | 法人向け |
| `/guide/` | ガイド |
| `/guide/keyword-article/` | 記事 |
| `/pricing/` | 料金目安 |
| `/contact/` | お問い合わせ |
| `/company/` | 会社情報 |

**禁止：** 動的パラメータ依存 / 日本語URL混在 / 深すぎる階層

---

## 3. Title / Meta設計

**Title：** 主要KW + 専門性 + 地域または用途（例：粉骨専門業者｜工程公開と料金透明の遺骨.com）
**Meta Description：** 120〜160文字 / ベネフィット明示 / 煽らない
各ページ固有に設定。自動生成禁止。

---

## 4. Hタグ構造

H1：1ページ1つ / H2：主要セクション / H3：補助セクション
**記事ページ：** H1 定義 → H2 結論 → H2 背景 → H2 工程 → H2 注意点 → H2 FAQ

---

## 5. 構造化データ設計

| ページ     | スキーマ                         |
| ---------- | -------------------------------- |
| 全ページ   | `Organization`, `BreadcrumbList` |
| サービス   | `Service`                        |
| 法人       | `ProfessionalService`            |
| ガイド記事 | `Article`                        |
| FAQ        | `FAQPage`                        |
| 料金       | `Offer`                          |
| 地域       | `LocalBusiness`                  |

JSON-LDで実装。

---

## 6. 内部リンク設計

各記事に関連サービス2つ以上＋関連ガイド2つ以上 / サービスページに関連ガイド3つ以上 / フッターに全主要ページリンク
**孤立ページゼロ。**

---

## 7. サイトマップ設計

`/sitemap.xml` 動的生成 / 更新日時含む / カテゴリ別分割可（`sitemap-services.xml`, `sitemap-guide.xml`）
Search Console登録必須。

---

## 8. robots.txt設計

管理画面はnoindex / 検索結果ページはnoindex / テスト環境はブロック（本番のみ許可）

---

## 9. ページ速度最適化

画像最適化 / next/image利用 / LCP画像優先読み込み / JavaScript分割 / 不要アニメーション排除
**Core Web Vitals：** LCP < 2.5s / CLS < 0.1 / INP最適化

---

## 10. モバイルSEO

モバイルファースト / フォント16px以上 / タップ領域十分 / 固定CTA邪魔しない

---

## 11. 地域SEO設計

地域名ページ将来拡張：`/area/tokyo/`, `/area/kanagawa/`
Google Business Profile連携 / NAP情報統一

---

## 12. E-E-A-T強化

著者表示 / 監修表示 / 会社情報充実 / 実績数値明示 / 工程写真公開（YMYL領域は信頼重視）

---

## 13. エラーページ設計

404ページ：ガイドリンク表示 / サービス導線表示 / サイト内検索表示

---

## 14. 計測基盤

**GA4イベント：** 診断開始 / 診断完了 / 問い合わせ送信 / 法人問い合わせ送信 / 料金ページ閲覧
Search Console連携

---

## 15. 受入基準

- 全ページtitle/meta個別設定
- 構造化データエラーゼロ
- サイトマップ正常
- モバイル速度良好
- 内部リンク網羅

---

## 16. 最終目標

**検索で勝つ。一時的ではなく、安定的に上位を維持する技術基盤。**
