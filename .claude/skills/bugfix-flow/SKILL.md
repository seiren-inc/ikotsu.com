---
name: bugfix-flow
description: Use for any bug investigation, unexpected behavior, or build failure. Mandates root cause investigation. Covers Next.js, Prisma v5, GSAP, Framer Motion, Embla Carousel, and Three.js.
---

# Bugfix Flow

**Iron Law: no fix without root cause.**

## Workflow

1. Reproduce: exact error, confirmation steps
2. Investigate: read affected file, run `npm run lint && npm run build`
3. Hypothesis: "error occurs because X causes Y"
4. Fix: smallest change that fixes root cause
5. Verify: `npm run lint && npm run build`

## Common Patterns

- **Prisma**: After schema change → `npx prisma generate` then rebuild
- **Prisma singleton**: `Cannot read properties` → check global singleton in `src/lib/prisma.ts`
- **Embla Carousel SSR** → add `"use client"`
- **Three.js hydration** → `dynamic import + ssr: false + <Suspense>`
- **GSAP SSR** → register ScrollTrigger inside `useEffect`
- **Framer Motion hydration** → add `"use client"`; AnimatePresence → add `key`
