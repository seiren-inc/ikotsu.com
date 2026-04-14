---
name: implementation-flow
description: Use for any feature implementation, component creation, or code addition. Enforces Analysis → Plan → Approval → Execution → Verification.
---

# Implementation Flow

Do not start coding before approval.

1. Read all relevant existing files
2. Present Implementation Plan (files to modify/create, steps, skills, out of scope)
3. Wait for explicit approval
4. Execute exactly what was approved (Server Components default, no `any`, `@/*` aliases)
5. Verify: `npm run lint && npm run build`

**Important**: Never modify brand colors in `tailwind.config.ts`.
