# CLAUDE.md — ikotsu.com（技術エージェント向け憲法）

> 最終更新: 2026-03-19 | Package Manager: npm | Node: >=18.0.0

---

## コマンド一覧

```bash
npm run dev          # 開発サーバー起動
npm run build        # next build
npm run start        # 本番サーバー起動
npm run lint         # ESLint
```

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| Framework | Next.js 15.x (App Router) |
| React | 19.x |
| Animation | Framer Motion v12 / GSAP 3 / Lenis / Embla Carousel |
| 3D | Three.js / @react-three/fiber / @react-three/drei |
| Database | Prisma v5 |
| Icons | Lucide React |

---

## TypeScript 規約

```ts
// ✅ GSAP + Framer Motion 共存パターン
// → スクロール連動: GSAP + ScrollTrigger
// → UIマウント/アンマウント: Framer Motion
// → Three.js: dynamic import + ssr: false

// ✅ Prisma グローバルシングルトン
declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") global.prisma = prisma
```

---

## PPR & 最適化

```ts
experimental: { ppr: true }
images: { formats: ["image/avif", "image/webp"] }
```

---

## エラー解決

```bash
# Embla Carousel SSR エラー → "use client" を追加
# Three.js ハイドレーションエラー → ssr: false + Suspense
```
