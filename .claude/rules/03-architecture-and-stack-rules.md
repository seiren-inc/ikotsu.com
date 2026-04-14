# 03 — Architecture and Stack Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity
> Stack: Next.js 15 / React 19 / TypeScript / Tailwind CSS / npm / Prisma v5

## Directory Conventions

```
src/
  app/           ← Pages and layouts only
  components/
    ui/           ← Generic UI components
    common/       ← Shared components
    sections/     ← Page section components
  lib/            ← Utilities, Prisma singleton
  types/          ← Type definitions
```

## Component Rules

- Server Component is the default. Use `"use client"` only for animation or browser APIs.
- Framer Motion: always `"use client"` + `key` on `AnimatePresence`.
- Embla Carousel: `"use client"` required.
- Three.js: always `dynamic import + ssr: false + <Suspense>`.

## TypeScript Rules

- `any` type is forbidden. Use `unknown` and narrow.
- All functions must have explicit return types.
- Path alias: `@/*` → `./src/*`

## Prisma v5 Pattern (global singleton)

```ts
// src/lib/prisma.ts
declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") global.prisma = prisma
```

After any schema change:
```bash
npx prisma generate
npx prisma migrate dev --name <descriptive-name>
```

## Animation Stack

```ts
// GSAP + ScrollTrigger: use together; GSAP for scroll, Framer Motion for mount/unmount
// Lenis: configure in dedicated SmoothScroll component
// Three.js: dynamic(() => import(...), { ssr: false }) + <Suspense>
// Embla Carousel: requires "use client"
```

## Package Manager

npm. Do not use pnpm or yarn.
