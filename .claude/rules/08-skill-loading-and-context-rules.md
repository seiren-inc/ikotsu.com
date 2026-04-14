# 08 — Skill Loading and Context Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity

## Canonical Skill Layer

`.claude/skills/` is the only active core shelf.

## Compatibility Bridge

`.agents/skills` → `../.claude/skills`. Do NOT retarget to `.agent/skills`.

## Legacy Layer

`.agent/skills/` is legacy migration source only. NOT active.

## Core Shelf (this repo)

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change |
| `docs-writer` | Any documentation task |
| `handoff-flow` | Session end or agent switch |
| `schema-markup` | Any JSON-LD / structured data task |

Note: Prisma v5 migration work is infrequent enough to keep `schema-markup` as always-on.
`db-safe-update` is available in the workspace runtime vault when DB work is needed.

## Context Budget

Default max active skills: 3 per task.
