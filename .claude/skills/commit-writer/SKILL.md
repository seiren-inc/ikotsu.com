---
name: commit-writer
description: Use for any commit task. Creates conventional commits with correct type, scope, subject, body, and AI attribution. Checks branch safety before committing.
---

# Commit Writer

## Workflow

1. `git branch --show-current` — create feature branch if on main
2. `npm run lint && npm run build` — fix all errors first
3. Stage only relevant files
4. Write: `<type>(<scope>): <subject>` + body + `Co-Authored-By: Claude <noreply@anthropic.com>`
5. `git status && git commit -m "..." && git log -1`

❌ Never commit to `main` without explicit instruction. Never use `--no-verify`.
