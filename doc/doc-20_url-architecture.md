# URL構造設計書

**Project:** Ikotsu Lab URL Structure Design
**Layer:** Information Design
**Version:** 1.0
**Purpose:** SEO・拡張性・将来スケールを前提としたURL設計を確定する

---

## 1. URL設計の基本方針

**原則：**

- 英語スラッグ
- 短く明確
- 階層は最大3階層
- 意味が推測できる
- 将来サービス追加に対応可能

**禁止：**
日本語URL / 過度に長いスラッグ / 年月日付き構造 / 無意味な数字

---

## 2. ルート構造

`/` : トップページ（ハブ機能のみ）
`/services`
`/guide`
`/simulator`
`/for-individual`
`/for-corporate`
`/faq`
`/group`
`/company`
`/contact`

---

## 3. サービスURL設計

`/services/powdering`
`/services/cleaning`
`/services/transport`
`/services/takeout`
`/services/on-site`

将来追加（拡張前提設計）：
`/services/storage`
`/services/report`

---

## 4. ガイドURL設計

`/guide/what-is-powdering`
`/guide/powdering-vs-cleaning`
`/guide/reburial-process`
`/guide/mold-problem`
`/guide/grave-closure-bone`
`/guide/scattering-preparation`
※SEOキーワードを意識した命名。

---

## 5. 法人専用URL設計

`/for-corporate`
`/for-corporate/process`
`/for-corporate/quality`
`/for-corporate/case`
`/for-corporate/download`
※法人ページは独立した導線を確保。

---

## 6. シミュレーターURL

`/simulator`
`/simulator/result`
将来的に：`/simulator/pdf`

---

## 7. グループ連携URL

`/group/scattering`
`/group/grave-search`
`/group/grave-closure`
`/group/diamond`
`/group/shukatsu`
※グループ横断導線を確保。

---

## 8. FAQ URL設計

`/faq`
`/faq/powdering`
`/faq/cleaning`
`/faq/reburial`
※カテゴリ別FAQ構造。

---

## 9. SEO強化設計

**各ページに：**

- `breadcrumb`構造化データ
- `canonical`設定
- `noindex`制御（重複回避）
  ブログ的増殖は避け、クラスタ構造で戦う。

---

## 10. 将来拡張設計

**法人ポータル追加：** `/portal/login`, `/portal/dashboard`
**顧客マイページ：** `/mypage/login`, `/mypage/history`
**API拡張：** `/api/v1/simulator`, `/api/v1/contact`

---

## 11. 成功指標

URLが理解しやすい / 検索エンジンに明確に評価される / 拡張時に構造変更不要

---

## 12. 最終目標

**URLだけ見れば構造が分かるサイト。**
Ikotsu Labを情報構造レベルで業界標準へ。
