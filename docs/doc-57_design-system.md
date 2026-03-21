# デザインシステム仕様書

**Project:** Ikotsu.com Design System Specification
**Layer:** Design System / UI基盤
**Version:** 1.0
**Purpose:** 画像多用・アニメーション多用でも崩れない、全ページ統一のデザイン規格を確定する

---

## 1. デザイン思想

**世界観：** 清潔 / 専門機関 / 透明性 / モダン / 上品
遺骨領域の重さを残しつつ、暗くしない。不安より「安心」を感じさせる。

---

## 2. カラートークン設計

| カテゴリ   | トークン                                              |
| ---------- | ----------------------------------------------------- |
| **Base**   | `bg.primary` / `bg.secondary` / `bg.elevated`         |
| **Text**   | `text.primary` / `text.secondary` / `text.muted`      |
| **Border** | `border.light` / `border.default` / `border.strong`   |
| **Accent** | `accent.primary` / `accent.secondary` / `accent.glow` |
| **State**  | `state.success` / `state.warning` / `state.danger`    |

**ルール：** アクセントは使いすぎない。重要CTAと強調要素だけ。
**禁止：** 真っ黒背景の多用 / 原色強調 / 赤の多用

---

## 3. タイポグラフィ設計

**見出し階層：** H1（ページの核心）/ H2（セクションタイトル）/ H3（サブセクション）
**本文：** Body（標準）/ Small（注釈）/ Caption（図注）
**ルール：** 1文は短く / 長文は段落分割 / 専門用語は注釈

---

## 4. 余白・レイアウトトークン

**Spacing：** `space.2` / `space.4` / `space.8` / `space.12` / `space.16` / `space.24` / `space.32` / `space.48` / `space.64`
**Container：** `maxWidth.desktop` / `maxWidth.tablet` / `maxWidth.mobile`
**Grid：** 12-column（desktop）/ 6-column（tablet）/ 1-column（mobile）
**ルール：** 詰めない。余白で高級感を作る。

---

## 5. 角丸・影・境界線

**Radius：** `radius.sm` / `radius.md` / `radius.lg` / `radius.xl`
**Shadow：** `shadow.sm` / `shadow.md` / `shadow.lg`
**Border：** 1px基本 / 強調は2px
影は控えめ。境界線で整える。

---

## 6. ボタンシステム

**Variants：** Primary（主要CTA）/ Secondary（補助CTA）/ Ghost（軽い行動）/ Link（テキストリンク）
**Sizes：** sm / md / lg
**States：** default / hover / active / disabled / loading
**ルール：** Primaryは1画面に最大2つ。乱発禁止。
**ホバー：** 軽い浮き / 軽い発光 / 押し込み感

---

## 7. カードシステム

**Card Types：** ServiceCard / GuideCard / CaseCard / PricingCard / RelatedServiceCard
**共通仕様：** 画像エリア / タイトル / 要点3つ / アクション
**ホバー：** 画像ズーム（控えめ）/ 影増加 / 境界線強調

---

## 8. フォームシステム

**Input：** 通常 / フォーカス時 / エラー時
**Form UX：** ステップ式 / 進捗表示 / 必須最小
**ルール：** 入力負荷を下げる / エラーはその場で表示 / 説明文は短く

---

## 9. ナビゲーション

**Header：** 背景ブラー / スクロール縮小 / アクティブ表示
**Dropdown：** 2カラム対応 / 説明文付き / ホバーでプレビュー
**Mobile Menu：** 全画面スライド / 階層表示

---

## 10. 画像システム

**Types：** Hero / Process / Facility / Hands / Corporate
**比率：** Hero 16:9 or 4:3 / Card 4:3 / Gallery 1:1＋4:3混在可
**ルール：** 清潔感優先 / 過度な悲しみ表現禁止 / 合成感が強い画像禁止 / 必ずalt付与

---

## 11. アイコンシステム

線アイコン中心 / 太さ統一 / サービスごとに意味付け
例：工程＝timeline / 法人＝building / 相談＝chat / 料金＝receipt

---

## 12. モーションシステム

**Principles：** 軽い / 上品 / 速すぎない / 酔わせない
**Duration：** fast / normal / slow / **Easing：** ease-out中心、バネは控えめ
**基本：** fade-in / slide-up / scale-in / blur-in（控えめ）/ line-draw（工程タイムライン）
**禁止：** 常時ループ / 背景パーティクル常時 / 過度な3D回転
**Reduced Motion：** prefers-reduced-motionで停止

---

## 13. セクションテンプレート

Hero Template / Trust Strip Template / Service Grid Template / Process Timeline Template / Pricing Template / FAQ Template / Corporate CTA Template / Related Services Template

---

## 14. コピーのトーン

硬すぎない / 軽すぎない / 専門性を感じる / 誠実
煽り禁止。断定禁止（法律・宗教）。

---

## 15. 受入基準

- 全ページでトークンが統一
- カード/ボタン/フォームが統一
- 画像が豊富でも整って見える
- アニメーションが上品で軽い
- モバイルで破綻しない
