# AGENTS.md — ikotsu.com

> Applies to: Claude Code, Codex, Antigravity
> Compact pointer contract. Full policy lives in `.claude/rules/` and `docs/ai/`.

---

## Read Order

1. `CLAUDE.md` — commands, npm, Prisma v5, Next.js 15 stack
2. `docs/ai/` — workspace overview, architecture summary, execution contract
3. `.claude/rules/` — load rules relevant to the current task
4. `.claude/skills/` — load skills relevant to the current task

---

## Skill Layers

| Layer | Path | Role |
|-------|------|------|
| Always-on core shelf | `.claude/skills/` | 7 core skills — canonical |
| Compatibility bridge | `.agents/skills` → `.claude/skills` | for tools resolving `.agents/` |
| Runtime shelf | `.claude/skills-runtime/` | task-scoped, load on demand |
| Legacy migration source | `.agent/` | NOT active — reference only |

---

## Core Shelf (7 skills)

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change |
| `docs-writer` | Any documentation task |
| `handoff-flow` | Session end or agent switch |
| `schema-markup` | Any JSON-LD / structured data task |

For Prisma migration work, load `db-safe-update` from the workspace runtime vault.

---

## Key Operating Rules

**Implementation flow**: Analysis → Plan → Approval → Execution → Verification.
**Commits**: `npm run lint && npm run build` before committing. Conventional commit format.
**DB changes**: `npx prisma generate && npx prisma migrate dev --name <name>` after schema edits.

---

## Stack Highlights (from CLAUDE.md)

- Next.js 15 / React 19 / TypeScript / npm
- Prisma v5 — global singleton in `src/lib/prisma.ts`
- Framer Motion: scroll-linked → GSAP; mount/unmount → Framer Motion
- Three.js: `dynamic import + ssr: false + <Suspense>`
- Embla Carousel v8: `"use client"` required
