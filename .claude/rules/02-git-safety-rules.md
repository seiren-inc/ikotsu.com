# 02 — Git Safety Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity

## Commit Rules

1. Always check current branch: `git branch --show-current`
2. Never commit directly to `main` unless explicitly instructed.
3. Use conventional commit format: `<type>(<scope>): <subject>`
4. Include `Co-Authored-By: Claude <noreply@anthropic.com>` in AI-generated commits.

## Branch Safety

`main` is protected. Never force-push. Never use `--no-verify` without explicit request.

## Verification Before Commit

```bash
npm run lint     # ESLint
npm run build    # TypeScript + Next.js build gate
```
