# global-rules.md — ikotsu.com

> グループ: **A（清蓮 / Seiren）**  
> 最終更新: 2026-03-19

---

## 1. ブランドアイデンティティ

### カラーシステム

| 役割 | HEX | 用途 |
|------|-----|------|
| メインカラー | `#3399CC` | プライマリ・CTA |
| アクセント | `#D98CB3` | 感情訴求・強調 |
| サポート | `#99CC66` | 補助・区切り |
| 背景 | `#FFFFFF` | ベース背景 |
| テキスト | `#1A1A1A` | 本文 |

### ブランドトーン
- 「遺骨」という繊細なテーマを真摯かつ温かく扱う
- 家族に寄り添う専門家としての信頼感を前面に出す
- 難しい言葉・専門用語は必ずひらがな/やさしい表現に換言する

---

## 2. デザインシステム

### 基本方針
- Three.jsを使った有機的・水の流れを連想させる演出が可能だが、あくまで補助的に使う
- コンテンツの可読性を最優先：装飾 < 情報
- 余白大・フォントサイズ大・行間広め

### カラー変数（globals.css）
```css
:root {
  --c-primary: #3399CC;
  --c-accent:  #D98CB3;
  --c-support: #99CC66;
  --c-bg:      #FFFFFF;
  --c-surface: #F5F8FA;
  --c-text:    #1A1A1A;
  --c-muted:   #5F6B75;
}
```

---

## 3. アニメーション（Framer Motion + GSAP + Lenis）

このプロジェクトは `framer-motion@^12` / `gsap@^3.14` / `lenis@^1.3` の両方を使用。

### 使い分け方針
| 用途 | 採用ライブラリ |
|------|--------------|
| スクロール連動アニメーション | GSAP + ScrollTrigger |
| UIコンポーネントのマウント/アンマウント | Framer Motion |
| Three.js シーン連動 | GSAP |
| スムーズスクロール | Lenis |

### Framer Motion（清蓮スタイル：ゆっくり浮き上がり）
```tsx
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}
```

### GSAP（スクロール連動）
```tsx
gsap.fromTo(el, { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
  scrollTrigger: { trigger: el, start: "top 85%", once: true },
})
```

### Three.js（遅延ロード必須）
```tsx
import dynamic from "next/dynamic"
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false })
```

---

## 4. フォント

| 要素 | フォント |
|------|---------|
| `h1`, `h2` | Noto Serif JP（明朝・格調・品位） |
| `h3` 以下・本文 | Noto Sans JP（可読性優先） |

---

## 5. SEO / GEO（地域SEO）

### 最優先エリア
横浜市 / 川崎市 / 鎌倉市 / 藤沢市 / 熱海市 / 小田原市

### 特記事項
- 「遺骨」「手元供養」「散骨」「樹木葬」をコアキーワードとする
- 各サービスページに LocalBusiness JSON-LD を必ず配置

---

## 6. 技術スタック最適化パターン

**スタック**: Next.js 15 / React 19 / Framer Motion v12 / GSAP 3 / Lenis / Embla Carousel / Three.js / Prisma v5

### Embla Carousel 設定
```tsx
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const [emblaRef] = useEmblaCarousel(
  { loop: true, align: "start" },
  [Autoplay({ delay: 4000, stopOnInteraction: true })]
)
```

### Prisma クエリ
```ts
// グローバルシングルトンパターン（開発時の接続リーク防止）
declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") global.prisma = prisma
```

---

## 7. コンポーネント設計ルール

- `src/components/ui/` → 汎用UIコンポーネント
- `src/components/three/` → Three.js関連（必ずssr: false）
- `src/components/sections/` → ページセクション
- `any` 型の使用禁止
- 画像は `next/image` を必ず使用

---

## 8. アニメーション アクセシビリティ基準（2026追加）

### useReducedMotion 必須ルール

```tsx
// lib/motion.ts — Framer Motion と GSAP の両方に対応
import { useReducedMotion } from "framer-motion"

export function useMotionSafe() {
  return !useReducedMotion()
}
```

```tsx
// Framer Motion での使用例
"use client"
import { motion, useReducedMotion } from "framer-motion"

export function FadeUp({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={prefersReduced ? {} : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
```

```ts
// GSAP での使用例
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
if (!prefersReduced) {
  gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } })
} else {
  gsap.set(el, { opacity: 1 })
}
```

### Suspense による重エフェクトの遅延

```tsx
import { Suspense } from "react"
import dynamic from "next/dynamic"
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false })

<Suspense fallback={<div className="animate-pulse bg-surface h-96 rounded-2xl" />}>
  <Scene />
</Suspense>
```

### パフォーマンス基準
- LCP要素にアニメーション禁止・Lighthouse Performance 90+ 維持

---

## Tailwind CSS v4 アニメーション定義（2026追加）

> このプロジェクトはTailwind CSS v4 対応のため、以下の @keyframes を `app/globals.css` に追加する。
> ※ seiren-ohakajimai-navi は tailwind.config.ts でも定義済み（両方利用可）。

### app/globals.css への追記

```css
/* =============================================
   2026: Shimmer・Floating・Glow アニメーション（清蓮向け）
   ============================================= */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

@keyframes floating-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-6px) rotate(0.5deg); }
  66%       { transform: translateY(-3px) rotate(-0.3deg); }
}

/* 清蓮専用: 水の輝き（pulse-glow） */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; filter: blur(14px); }
  50%       { opacity: 1;   filter: blur(8px); }
}

/* =============================================
   Shimmer ユーティリティ（スケルトンUI用）
   ============================================= */
@utility shimmer-bg {
  background: linear-gradient(
    90deg,
    #e8f4f8 25%,
    #f5f9fb 50%,
    #e8f4f8 75%
  );
  background-size: 200% 100%;
}

@utility animate-shimmer       { animation: shimmer 2.0s linear infinite; }
@utility animate-floating      { animation: floating 5.0s ease-in-out infinite; }
@utility animate-floating-slow { animation: floating-slow 10.0s ease-in-out infinite; }
@utility animate-pulse-glow    { animation: pulse-glow 4.0s ease-in-out infinite; }
```

### 使用例

```tsx
// スケルトンローディング（清蓮ブランドカラーベース）
<div className="animate-shimmer shimmer-bg h-48 rounded-2xl" />

// 浮遊するアイコン・バッジ
<div className="animate-floating">
  <Image src="/icon-lotus.svg" alt="清蓮" width={48} height={48} />
</div>
```


---

## 10. 2026年最新：AEO・高速配信・セキュリティルール（一括追加）

### Bento Grid 2.0（グリッドUIの2026標準）

```tsx
// 角丸24px以上・Spatial UI（ガラスモーフィズム）を標準化
<div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8">
  {/* コンテンツ */}
</div>
```

### AEO（AI回答エンジン最適化）— JSON-LD 必須実装

```tsx
// 全ページに JSON-LD を実装する共通パターン
export default function Page() {
  const jsonLd = { "@context": "https://schema.org", /* スキーマオブジェクト */ }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
// グループA（清蓮）: LocalBusiness + Service + FAQPage + BreadcrumbList
// グループB（テック）: Organization/SoftwareApplication + FAQPage + Article
```

### PPR（Partial Prerendering）+ AVIF デフォルト化

```ts
// next.config.ts
const config: NextConfig = {
  experimental: { ppr: true },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
}
```

### Cloudflare Turnstile（reCAPTCHA代替・全フォーム必須）

```bash
npm install @marsidev/react-turnstile
# .env.local: NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY / CLOUDFLARE_TURNSTILE_SECRET_KEY
```

```tsx
"use client"
import { Turnstile } from "@marsidev/react-turnstile"
export function TurnstileWidget({ onSuccess }: { onSuccess: (token: string) => void }) {
  return <Turnstile siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!} onSuccess={onSuccess} options={{ theme: "auto", language: "ja" }} />
}
// Server Action: challenges.cloudflare.com/turnstile/v0/siteverify でトークン検証を忘れずに
```

### Lighthouse パフォーマンス目標

| 指標 | 目標 |
|------|------|
| Performance | 90+ |
| Accessibility | 95+ |
| SEO | 100 |
| LCP | < 2.5秒 |
| CLS | < 0.1 |
