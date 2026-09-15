---
name: migrate-to-skeleton
description: Migrates a legacy KoliBri web component to the Skeleton Blueprint architecture (WC orchestrator + optional Behaviors + FC + props pattern)
---

# Migrate Legacy Component to Skeleton Architecture

## Argument: $ARGUMENTS

The name of the component to migrate, without the `kol-` prefix (e.g. `card`, `tooltip`, `alert`).

## Authoritative instructions

> **The full, maintained procedure lives in the Claude skill
> [`.claude/skills/migrate-to-skeleton/SKILL.md`](../../.claude/skills/migrate-to-skeleton/SKILL.md).**
> Read it first and follow it. It is written in German; the code, paths and identifiers it names are
> the ones in this repository.

Supporting material referenced from there:

- [`.claude/skills/migrate-to-skeleton/reference/patterns.md`](../../.claude/skills/migrate-to-skeleton/reference/patterns.md) — prop triangle, WC orchestrator, `StateAccess`/`stateLess`, behavior lifecycle, prop definition, target file layout
- [`.claude/skills/migrate-to-skeleton/reference/pitfalls.md`](../../.claude/skills/migrate-to-skeleton/reference/pitfalls.md) — twelve traps, each one a real past regression
- [`packages/components/src/components/_skeleton/ARC42.md`](../../packages/components/src/components/_skeleton/ARC42.md) — the authoritative architecture specification

## Procedure at a glance

1. **Gap analysis** — read every file of the component, compare against the skeleton blueprint, and write the inheritance / logic-layer / props / rendering table that becomes the migration plan.
2. **Props first** — inventory every `@Prop()` (it _is_ the public API contract), reuse definitions from `src/internal/props/`, add one file per new prop, export it from the props index.
3. **Refactor by layer** — `api.tsx` (`PropsConfigShape` + `ApiFromConfig`) → stateless FC with `BemRootNodeFC` → Behavior only when genuinely reusable → WC orchestrator extending `BaseWebComponent<Api>` → co-located tests. Keep the public `@Prop`/`@Method` surface identical to the predecessor and pin it in `_skeleton/public-api.spec.ts`.
4. **Remove legacy residue** — delete orphaned files and obsolete controller/aspect modules, run the dead-schema check; exported schema types stay (removing them is a separate breaking change).
5. **Validate** — `pnpm format`, `pnpm lint`, `pnpm --filter @public-ui/components test:unit`, plus the visual zero-delta gate described in the skill.

## Keeping this file honest

Changes to the migration guidance belong in the skill, not here. This file stays a pointer so the
two do not drift apart again.
