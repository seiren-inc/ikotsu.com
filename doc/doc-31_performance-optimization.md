# パフォーマンス最適化・コアウェブバイタル設計書

**Project:** Ikotsu Lab Performance Optimization & Core Web Vitals Design
**Layer:** Functional Design
**Version:** 1.0
**Purpose:** SEO評価・UX・CV率を最大化するためのパフォーマンス最適化設計

---

## 1. 設計目的

パフォーマンスはSEOであり、信頼であり、売上である。
**目標：** LCP 2.0秒以内 / CLS 0.05未満 / INP 良好水準 / TTFB 200ms以内
**遺骨サービスは“重いサイト”にしてはいけない。**

---

## 2. 技術前提

Next.js 16 App Router / SSR＋部分的SSG / Edge配信（Vercel想定） / 画像最適化標準利用

---

## 3. LCP最適化設計

**対象：** トップHero画像 / サービスHero画像
**設計：** priority指定は1枚のみ / 画像はAVIF/WebP / サイズ明示 / ファーストビューに不要なJSを置かない
**Hero動画は原則禁止。**

---

## 4. CLS対策設計

画像にwidth/height指定 / フォントはdisplay: swap / 広告挿入なし / レイアウト固定設計 / スケルトンUI使用
**レイアウトシフトゼロを目指す。**

---

## 5. JavaScript最適化

Client Component最小化 / 動的import使用 / 診断・シミュレーターのみClient化 / 不要ライブラリ禁止
**重いUIライブラリ導入禁止。**

---

## 6. 画像最適化設計

**使用：** `next/image`
**設定：** quality最適化 / lazy loading / blur placeholder / 最大幅制御
ギャラリー画像はサムネイル表示。

---

## 7. モーション最適化

Framer Motionは軽量範囲のみ / transform/opacity中心 / WebGL常時描画禁止 / prefers-reduced-motion対応

---

## 8. APIレスポンス最適化

**診断・シミュレーターAPI：** レスポンス200ms以内 / 計算は軽量関数 / DBアクセス最小化
**フォーム送信は非同期処理。**

---

## 9. SEOと速度の両立

SSRページは最小限のJS / 構造化データはJSON-LD / 不要な外部スクリプト禁止 / フォントは1〜2種類まで

---

## 10. モバイル最適化

モバイルファースト設計 / 画像サイズ縮小 / アニメーション簡略化 / タップ領域44px以上

---

## 11. 監視設計

Core Web Vitals監視 / Search Console確認 / Lighthouse定期計測 / エラー通知設定（月次改善）

---

## 12. KPI

LCP 2秒以内 / CLS 0.05未満 / 直帰率改善 / CV率向上

---

## 13. 最終目標

**「速い＝安心」**
業界最速クラスの遺骨専門サイトへ。
