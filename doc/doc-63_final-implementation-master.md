# Antigravity 最終実装総指示書

**Project:** Ikotsu.com Antigravity Final Implementation Master Instruction
**Layer:** Execution / Antigravity実装総指示書
**Version:** 1.0
**Purpose:** これまで策定した全設計書を統合し、Antigravityで再現性高く実装させるための最終実装命令書

---

## 0. 本書の位置付け

本書は最終設計書。UI仕様書 / デザインシステム / モーション設計 / SEO設計 / GEO設計 / 計測設計 / 法務設計をすべて統合した実装基準。**本書に基づき構築する。**

---

## 1. 技術前提

- **Framework:** Next.js 16（App Router）
- **Rendering:** 原則SSG / 記事はISR可
- **Image:** next/image必須
- **Animation:** 軽量実装 / transform・opacity中心
- **SEO:** サーバーサイドレンダリング前提

---

## 2. フォルダ構造

```
/app
  /services
  /services/powdered
  /services/cleaning
  /services/carrying
  /services/takeout
  /for-corporate
  /guide
  /guide/[slug]
  /pricing
  /contact
  /company
  /legal
/components
  /layout
  /ui
  /sections
  /cards
  /forms
  /motion
/lib
  /seo
  /schema
  /analytics
  /geo
/styles
/public/images
```

コンポーネント先行作成。

---

## 3. 実装順序

| Phase   | 内容                                      |
| ------- | ----------------------------------------- |
| Phase 1 | Layout実装（Header / Footer / Fixed CTA） |
| Phase 2 | トップページ                              |
| Phase 3 | サービスページ群                          |
| Phase 4 | 法人ページ                                |
| Phase 5 | ガイドテンプレ                            |
| Phase 6 | SEO/GEO/Schema実装                        |
| Phase 7 | 計測タグ実装                              |
| Phase 8 | 法的ページ実装                            |

---

## 4. 共通実装必須事項

- 全ページmeta個別設定
- JSON-LD構造化データ実装
- FAQ10問以上（主要ページ）
- 定義ブロック実装
- prefers-reduced-motion対応
- 画像alt必須
- Lighthouse極端低下禁止

---

## 5. UI実装基準

- Heroは画像＋テキスト左右配置
- Trust Strip数値アニメーション
- Service Card4枚構成
- Process Timelineスクロール連動
- FAQアコーディオン
- 法人と個人導線分離
  デザインシステム準拠。

---

## 6. モーション実装基準

**必須：** Section Reveal / Card Hover Zoom / Timeline Line Draw / Stagger Fade / CTA Hover Glow
**禁止：** 背景動画常時 / 派手な3D / 重いWebGL

---

## 7. SEO/GEO実装基準

Title固有化 / Meta固有化 / Breadcrumb実装 / Organization Schema / Service Schema / FAQ Schema / Article Schema
記事テンプレ固定。

---

## 8. 計測実装基準

**GA4イベント：** `diagnosis_start` / `diagnosis_complete` / `contact_submit` / `corporate_contact_submit` / `pricing_view` / `faq_expand` / `cta_click`
`page_type`パラメータ必須。

---

## 9. 法務実装基準

価格は目安表示 / 断定表現禁止 / 誇張禁止 / 宗教配慮 / 法的断定禁止
文章は法務設計書（doc-62）に準拠。

---

## 10. 画像実装基準

- トップ：最低8枚 / 各サービス：最低6枚 / 法人：最低6枚 / ガイド：アイキャッチ必須
  清潔感優先。過度な悲壮演出禁止。

---

## 11. パフォーマンス基準

LCP < 2.5s / CLS < 0.1 / 不要JS排除 / 画像圧縮 / Lazy Load徹底

---

## 12. テスト項目

- 全リンク正常
- モバイル崩れなし
- アニメーション過度でない
- フォーム正常送信
- イベント発火確認
- Schemaエラーなし

---

## 13. 成功定義

粉骨関連KW上位安定 / AI引用獲得 / 法人問い合わせ増加 / CV率向上 / 平均単価上昇

---

## 14. 最終ビジョン

Ikotsu.comを粉骨・洗骨分野の標準プラットフォームへ。
**専門性 × モダン × データ × AI で勝つ。**
