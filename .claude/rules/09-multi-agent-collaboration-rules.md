# 09 — Multi-Agent Collaboration Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity

## Agent Routing

| Task type | Preferred agent |
|-----------|----------------|
| Feature implementation, code edits | Claude Code or Codex |
| High-level planning | Antigravity |
| Browser verification, UI inspection | Codex (isolated Chrome DevTools MCP) |
| Final verification | Codex only |

Antigravity must not perform final verification.

## Handoff Protocol

Load `handoff-flow` skill. Summarize state, files modified, next steps, active skills.

## Shared Context Boundaries

Each session starts with: CLAUDE.md → AGENTS.md → relevant `.claude/rules/` files.
When picking up another agent's work, run `npm run lint && npm run build` first.
