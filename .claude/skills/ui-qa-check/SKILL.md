---
name: ui-qa-check
description: Use for any UI change. Validates against design system including Tailwind v3 brand color compliance, typography, spacing, CTAs, mobile-first, and animation rules.
---

# UI QA Check

## Checklist

### Brand Colors (Tailwind v3)
- [ ] Only brand/neutral tokens used — no arbitrary color values
- [ ] `tailwind.config.ts` brand colors unchanged

### Typography
- [ ] All headings use `clamp()`; `max-width` on text containers
- [ ] H1 once per page; H1 → H2 → H3 hierarchy

### Spacing
- [ ] 8px scale; no arbitrary pixel values without justification

### CTAs
- [ ] All buttons ≥ 48px; max 1 primary per section; CTA in hero/mid/footer

### Mobile (375px)
- [ ] No horizontal overflow; tap targets ≥ 48px

### Animation
- [ ] `"use client"` on Framer Motion components; `key` on AnimatePresence
- [ ] GSAP cleaned up in `useEffect`; Lenis only in layout.tsx
- [ ] Three.js: `dynamic + ssr: false + <Suspense>`; `prefers-reduced-motion` respected

Output: PASS / FAIL per section with violations listed.
