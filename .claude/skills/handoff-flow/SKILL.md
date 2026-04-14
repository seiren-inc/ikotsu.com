---
name: handoff-flow
description: Use when ending a session or switching agents. Produces a structured handoff note.
---

# Handoff Flow

## Handoff Note Format

```markdown
## Session Handoff — [date]
### Completed
- [item]
### Files Modified
- /full/path
### Current State
- Build: PASSING / FAILING
- Uncommitted changes: yes/no
### Next Steps
1. [action]
### Skills Used
- [skill]: [note]
### Open Questions
- [question]
```

Re-entry: read note → `npm run lint && npm run build` → `git status` → load relevant skills.
