# Decision Log — ikotsu.com

## 2026-04-03 — Agent OS Migration: Phase 2 Rollout

**Context**: Standard web batch rollout. ikotsu.com has Prisma v5 but no auth or payment — treated as standard web with DB present.

**Decisions**:

1. **Standard 7-skill shelf** — kept `schema-markup` as always-on; `db-safe-update` is runtime
   - Rationale: Prisma migrations are infrequent; SEO/schema work is more regular
2. **`.claude/rules/` created** — rules/03 and rules/05 adapted for Prisma v5 singleton pattern
3. **`.agents/skills` symlink corrected** — `../.agent/skills` → `../.claude/skills`
4. **Legacy marker added** to `.agent/skills/`
5. **`docs/ai/` created** with 7 governance documents
