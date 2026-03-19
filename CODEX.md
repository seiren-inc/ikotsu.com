# CODEX.md — ikotsu.com（事業エージェント向け文脈）

> 最終更新: 2026-03-19 | グループ: A（清蓮 / Seiren）

---

## Project Goal（事業の目的）

**「遺骨の適切な取り扱いについての情報を、家族が迷わず判断できる形で提供する」**

手元供養・散骨・樹木葬・ダイヤモンド葬・納骨堂など、
多様化する「遺骨の行き先」に関する情報を日本で最も充実したプラットフォームとして提供。
「親の遺骨をどうすればいいか」という切実な問いに、具体的な答えを届ける。

ターゲット: 遺骨の扱いに悩む40〜70代の家族
エリア優先: 横浜市・神奈川県・熱海市

---

## Brand Identity

**「静かな安心と、新しい供養の提案」**
- 清蓮ブランドカラー（水色・ピンク・黄緑）
- Framer Motion と GSAP の双方を用いた、なめらかで温かみのある演出

---

## AEO（JSON-LD）ルール

```tsx
// LocalBusiness（全ページ）
{ "@type": "LocalBusiness", "name": "ikotsu.com", "areaServed": ["横浜市","神奈川県","熱海市"] }

// 各コンテンツページ: Article
{ "@type": "Article", "headline": "手元供養とは？", "author": { "@type": "Organization", "name": "ikotsu.com" } }

// FAQPage（よくある質問）
{ "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "遺骨を自宅で保管する際の注意点は？", ... }] }
```

---

## プライバシー・AI生成ルール

- 遺骨・故人に関する情報は極めてセンシティブ。AIが「遺族の悲しみ」を過剰に描写することは禁止
- 実在しない業者・霊園・施設を紹介することは禁止
- Cloudflare Turnstile をフォームに実装

---

## PPR & Edge

```ts
experimental: { ppr: true }
images: { formats: ["image/avif", "image/webp"] }
```
