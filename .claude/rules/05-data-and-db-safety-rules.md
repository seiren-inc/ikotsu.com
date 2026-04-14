# 05 — Data and DB Safety Rules

> Repo: ikotsu.com | Applies to: Claude Code, Codex, Antigravity
> DB stack: Prisma v5 (global singleton pattern)

## Prisma v5 Rules

1. After any schema change: `npx prisma generate && npx prisma migrate dev --name <name>`
2. Never edit the generated Prisma client directly.
3. Use the global Prisma singleton — never instantiate `new PrismaClient()` outside `src/lib/prisma.ts`.
4. Never commit migrations without reviewing them first.
5. Destructive migrations (DROP COLUMN, DROP TABLE) require explicit user approval.

## Environment Variables

1. `DATABASE_URL` and any other secrets stay in `.env.local`. Never commit.
2. Never expose database credentials to the client.

## Structured Data (SEO)

1. Use JSON-LD only — no Microdata or RDFa.
2. Schema must match displayed content exactly.
3. Required base fields: `@context`, `@type`, `@id`, `url`, `name`, `description`, `inLanguage`.
4. Validate with Rich Results Test before release.
5. See `schema-markup` skill for implementation guidance.

## Security

1. Validate all user input server-side before processing or storing.
2. Apply rate limiting to all user-facing API routes.
