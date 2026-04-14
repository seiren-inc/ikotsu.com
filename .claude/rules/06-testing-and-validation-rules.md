# 06 — Testing and Validation Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity

## Validation Before Any Commit

```bash
npm run lint     # ESLint
npm run build    # TypeScript + Next.js build gate
```

## Build Watch Points

- Embla Carousel SSR error → add `"use client"`
- Three.js hydration error → `dynamic import + ssr: false + <Suspense>`
- Prisma client not found → run `npx prisma generate` after schema changes

## Schema Validation

After any JSON-LD change: Rich Results Test. Confirm H1 / title / schema alignment.

## What "Verified" Means

1. `npm run lint` passes
2. `npm run build` passes
3. No visual regressions
4. For DB changes: migration reviewed and applied cleanly
5. For schema changes: Rich Results Test passes
