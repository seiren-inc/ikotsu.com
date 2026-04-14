# 04 — UI/UX Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity
> UI stack: Tailwind CSS, Framer Motion v12, GSAP 3, Lenis, Embla Carousel v8, Three.js

## Design System

### Typography
- Use `clamp()` for all heading sizes; `max-width` on text containers
- H1 once per page; H1 → H2 → H3 hierarchy is strict

### Spacing
- 8px base scale; consistent vertical rhythm

### Buttons and CTAs
- Minimum height: 48px; action-driven text; 1 primary per section
- CTA required in: hero, mid-section, footer

### Mobile First
- 375px baseline; all tap targets ≥ 48px; no horizontal overflow

## Animation Rules

- GSAP: scroll-linked animations; ScrollTrigger registered inside `useEffect` with cleanup
- Framer Motion: mount/unmount animations; always `"use client"` + `key` on `AnimatePresence`
- Lenis: smooth scroll; dedicated component, not in pages
- Three.js: `dynamic import + ssr: false + <Suspense>`
- Embla Carousel: `"use client"` required
- Respect `prefers-reduced-motion`
