# 07 — Reporting and Delivery Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity

## Completion Report Format

```
### Files Modified
- /full/path/to/file1.ts

### Diff
[actual before/after — not a summary]

### Verification
$ npm run lint
$ npm run build
Output: [actual output]

### Scope Confirmation
Changes were limited to the approved scope: [yes/no]

### Skill Usage Report
Used: [skill-name] — reason
```

Free-form summaries are not valid completion reports. Skill Usage Report is required.
