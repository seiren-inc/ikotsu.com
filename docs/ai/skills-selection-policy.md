# Skills Selection Policy

> Local pointer. Full policy: `/Users/takumashinnyo/workspace/projects/docs/ai/skills-selection-policy.md`

## Core Shelf (7 skills — always-on)

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change |
| `docs-writer` | Any documentation |
| `handoff-flow` | Session end or agent switch |
| `schema-markup` | Any JSON-LD task |

Prisma migration work uses `db-safe-update` from the workspace runtime vault (load on demand).
