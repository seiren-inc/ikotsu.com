# URL戦略・SEO構造設計書

**Project:** Ikotsu Lab URL Strategy & SEO Structure Design
**Layer:** SEO / Information Architecture Deep Design
**Version:** 1.0
**Purpose:** 粉骨・洗骨領域で検索上位独占を狙うためのURL設計およびトピッククラスター完全定義

---

## 1. 設計目的

URLはSEO戦略そのもの。検索意図を分解 / KWを論理的に囲う / AIに文脈を理解させる / 将来拡張に耐える
**「URL設計＝市場制圧設計」**

---

## 2. 基本原則

英語スラッグ / 短い / 意味明確 / 階層は最大3段階 / 動的パラメータ禁止 / カテゴリ名は抽象化しすぎない

---

## 3. サービス系URL設計

| URL                          | 内容       |
| ---------------------------- | ---------- |
| `/services/powdered`         | 粉骨       |
| `/services/powdered-price`   | 粉骨料金   |
| `/services/powdered-process` | 粉骨工程   |
| `/services/powdered-law`     | 粉骨と法律 |
| `/services/cleaning`         | 洗骨       |
| `/services/cleaning-price`   | 洗骨料金   |
| `/services/cleaning-process` | 洗骨工程   |
| `/services/cleaning-mold`    | 洗骨カビ   |
| `/services/on-site`          | 出張       |
| `/services/transport`        | 搬送       |
| `/services/pre-relocation`   | 改葬前処理 |

価格・工程・法律を分割可能構造。

---

## 4. ガイド系トピッククラスター設計

**ガイドトップ：** `/guide`
| カテゴリ | URL | 例 |
|---------|-----|-----|
| 保存関連 | `/guide/storage` | `/guide/storage/long-term-risk` |
| 法律関連 | `/guide/legal` | `/guide/legal/powder-law` |
| 工程関連 | `/guide/process` | `/guide/process/particle-size` |
| トラブル関連 | `/guide/trouble` | `/guide/trouble/mold`, `/guide/trouble/humidity` |

カテゴリ＋テーマ構造。

---

## 5. 法人向けSEO設計

| URL                                   | 内容             |
| ------------------------------------- | ---------------- |
| `/for-corporate`                      | 法人トップ       |
| `/for-corporate/temple`               | 寺院向け         |
| `/for-corporate/columbarium`          | 納骨堂向け       |
| `/for-corporate/tree-burial`          | 樹木葬事業者向け |
| `/for-corporate/outsourcing-benefits` | 外注メリット     |
| `/for-corporate/cost-model`           | コストモデル     |

BtoB検索を狙う（粉骨 外注 / 納骨堂 湿気 対策 / 寺院 遺骨 カビ）。

---

## 6. ローカルSEO拡張設計

`/area` → `/area/yokohama` → `/area/kanagawa` → `/area/tokyo`
将来：`/area/yokohama/powdered` のように展開可能構造。

---

## 7. FAQ特化URL

`/faq` / `/faq/powder-law` / `/faq/mold-risk` / `/faq/self-crushing`
FAQは構造化データ対応。

---

## 8. 関連サービス連携URL

`/related/scattering` / `/related/grave-closure` / `/related/grave-search` / `/related/diamond` / `/related/shukatsu`
内部リンク接続専用ハブ。

---

## 9. URL命名ルール

複数形使用 / ハイフン区切り / 日本語ローマ字禁止 / 年月日を含めない / 過度に長くしない

---

## 10. 将来拡張耐性

カテゴリ追加時：`/guide/new-category/topic` / サービス追加時：`/services/new-service`
**URL変更は極力しない。初期設計で固定。**

---

## 11. 内部リンク強化構造

ガイド → サービス / FAQ → サービス / 法人記事 → 法人ページ / ローカル → サービス
クラスター循環構造。

---

## 12. AI最適化構造

URLが意味を持つ。例：`/guide/legal/powder-law` → AIは即理解。階層で文脈を与える。

---

## 13. KPI

主要KW 6ヶ月以内10位以内 / ロングテールKW量産 / AI引用増加 / インデックス安定

---

## 14. 最終目標

**URLだけで戦略が見えるサイト。粉骨・洗骨検索を構造で支配する。**
