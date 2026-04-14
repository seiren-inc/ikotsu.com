# Execution Contract

> Local pointer. Full contract: `/Users/takumashinnyo/workspace/projects/docs/ai/execution-contract.md`

## Repo-Specific Additions

### DB Safety Gate
Prisma migrations must be reviewed before applying. Destructive operations require explicit user approval.
After schema changes: `npx prisma generate && npx prisma migrate dev --name <name>`.

### Build Gate
`npm run lint && npm run build` must pass before any PR or deploy.
