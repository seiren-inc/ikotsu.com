# アナリティクス・タグ実装仕様書

**Project:** Ikotsu.com Analytics & Tag Implementation Specification
**Layer:** Measurement / 計測基盤設計
**Version:** 1.0
**Purpose:** 感覚ではなくデータで改善するための、完全な計測実装仕様を確定する

---

## 1. 設計目的

サイトは作って終わりではない。改善して勝つ。
**目的：** CV率の可視化 / 単価向上の分析 / 法人比率の把握 / 離脱ポイント特定 / AI診断効果測定
全アクションを数値化する。

---

## 2. 計測ツール構成

- **必須：** GA4 / Search Console
- **推奨：** Microsoft Clarity / ヒートマップツール / サーバーサイドログ保存
- **将来：** BIダッシュボード統合

---

## 3. GA4イベント設計

| イベント名                 | 説明                 |
| -------------------------- | -------------------- |
| `diagnosis_start`          | AI診断開始           |
| `diagnosis_complete`       | AI診断完了           |
| `contact_submit`           | BtoC問い合わせ送信   |
| `corporate_contact_submit` | BtoB問い合わせ送信   |
| `pricing_view`             | 料金ページ閲覧       |
| `service_detail_view`      | サービス詳細閲覧     |
| `guide_article_view`       | ガイド記事閲覧       |
| `faq_expand`               | FAQ展開              |
| `scroll_75`                | 75%スクロール        |
| `related_service_click`    | 関連サービスクリック |

**必須パラメータ：** `page_type` / `service_type` / `user_type`（personal/corporate）/ `article_category` / `region`
命名は英語固定。

---

## 4. コンバージョン定義

- **Primary CV：** `contact_submit` / `corporate_contact_submit`
- **Secondary CV：** `diagnosis_complete` / 資料DL（将来）
  CVはGA4で設定。

---

## 5. フォーム分析設計

各ステップで：`form_step_1_complete` / `form_step_2_complete` / `form_error`
離脱率を可視化。

---

## 6. AI診断計測

**計測項目：** 診断開始率 / 診断完了率 / 診断→問い合わせ率 / 診断提案別成約率
AIは必ず効果測定する。

---

## 7. スクロール分析

`scroll_25` / `scroll_50` / `scroll_75` / `scroll_100`（サービスページと記事ページで分離）

---

## 8. CTAクリック計測

| イベント              | CTA種別      |
| --------------------- | ------------ |
| `cta_free_consult`    | 無料相談     |
| `cta_ai_diagnosis`    | AI診断       |
| `cta_corporate`       | 法人         |
| `cta_related_service` | 関連サービス |

**位置パラメータ：** `hero` / `mid` / `footer` / `fixed`

---

## 9. 内部リンク分析

`related_service_click` / `guide_to_service_click` / `service_to_guide_click`（内部導線の最適化）

---

## 10. SEO流入分析

ページタイプ別（top / service / guide / corporate）で自然流入CV率算出。

---

## 11. ダッシュボード要件

**月次で可視化：** 総流入 / 自然流入 / CV率 / 平均滞在時間 / 法人比率 / 平均単価 / 診断利用率
経営指標と連動。

---

## 12. Clarity活用

**確認ポイント：** スクロール到達 / クリックヒート / フォーム離脱 / CTA無視エリア
感覚と数値の両面分析。

---

## 13. データ保存ポリシー

個人特定禁止 / IP匿名化 / ログ保存期間設定（法務準拠）

---

## 14. A/Bテスト設計

**対象：** Heroコピー / CTA文言 / 料金表示順 / 法人導線位置 / AI診断誘導位置
同時テストは2つまで。

---

## 15. 受入基準

- 全主要イベント計測可能
- CVが正確にカウントされる
- ダッシュボードで可視化可能
- フォーム離脱が分析可能

---

## 16. 最終目標

改善を止めない。数値で勝つ。**データドリブンな供養サイトへ。**
