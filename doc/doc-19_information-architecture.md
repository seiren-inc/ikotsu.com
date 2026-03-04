# 情報アーキテクチャ設計書

**Project:** Ikotsu.com Information Architecture Design
**Layer:** Information Design
**Version:** 1.0
**Purpose:** SEO・GEO・CV最大化を同時実現するための情報アーキテクチャ設計

---

## 1. 情報設計の基本思想

**目的：**迷わせない構造 / 検索に強い構造 / 供養エコシステムへ接続する構造
**設計原則：**トップはハブ。サービスページが主戦場。完全ガイドがSEO制圧エリア。

---

## 2. サイト全体構造（階層）

**Level 1（ハブ）**

- `/` トップページ

**Level 2（主要カテゴリ）**

- `/services`
- `/for-individual`
- `/for-corporate`
- `/guide`
- `/simulator`
- `/faq`
- `/group`
- `/company`

**Level 3（サービス詳細）**

- `/services/powdering`
- `/services/cleaning`
- `/services/transport`
- `/services/takeout`
- `/services/on-site`

**Level 3（ガイド）**

- `/guide/powdering`
- `/guide/cleaning`
- `/guide/reburial`
- `/guide/mold`
- `/guide/faq`

**Level 3（グループ連携）**

- `/group/scattering`
- `/group/grave-search`
- `/group/grave-closure`
- `/group/diamond`
- `/group/shukatsu`

---

## 3. 情報クラスタ設計

Cluster A：粉骨 / Cluster B：洗骨 / Cluster C：改葬前処理 / Cluster D：遺骨保管問題 / Cluster E：供養方法選択
各クラスタは最低5記事以上で構成。

---

## 4. SEOハブ設計

`/complete-guide`：ここに定義・比較・FAQを集約。
内部リンク：各サービスページへリンク。各記事からハブへ戻す。

---

## 5. ナビゲーション設計

**ヘッダー：**
サービス一覧（メガメニュー） / 料金シミュレーター / 個人のお客様 / 法人のお客様 / 完全ガイド / 清蓮グループ / 無料相談

**フッター：**
会社情報 / プライバシーポリシー / 特商法表記 / 関連サービス / サイトマップ

---

## 6. 内部リンク設計原則

- 定義ページからサービスへ
- サービスからガイドへ
- サービスからクロスセルへ
- FAQから該当ページへ
  **リンクは必ず文脈内で。**

---

## 7. GEO対応構造

各主要ページに含める：
明確な定義文 / 比較表 / FAQ / 数値情報 / 専門性記述
**→ 生成AIが引用しやすい文章構造。**

---

## 8. URL設計原則

英語スラッグ / 短く / 意味が明確 / 将来拡張可能
例：`/services/powdering`, `/services/cleaning`, `/guide/mold`

---

## 9. コンテンツ優先順位

**最優先：**粉骨 料金 / 遺骨 洗浄 / 改葬 粉骨 / 墓じまい 遺骨
**次点：**湿気対策 / カビ問題 / 何ミリ粉骨

---

## 10. 拡張性設計

新サービス追加時：`/services/new-service`
ガイド追加時：`/guide/new-topic`
**階層は3レベル以内。**

---

## 11. 成功指標

主要キーワード上位表示 / 直帰率50%未満 / 回遊率向上 / セッション2ページ以上

---

## 12. 最終目標

Ikotsu.comを**遺骨整備情報の中心ハブにする。**
検索も、導線も、収益も支配する。
