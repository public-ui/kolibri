# Agent Instructions

This directory contains the `kol-skeleton` component blueprint — the reference implementation for new KoliBri web components.

> **The [ARC42.md](./ARC42.md) is the authoritative specification.**
> All architectural decisions, layer responsibilities, type contracts, coding patterns and design rationale are documented there.
> Read it before making any changes to this blueprint or creating new components based on it.

## Props-First Refactoring Workflow

**CRITICAL:** Always establish props before implementing controllers or renderers.

When refactoring an existing component to match the Skeleton architecture:

1. **Props Inventory** — Collect all existing `@Prop()` declarations from the current component
2. **Props Migration** — Create dedicated prop files under `src/internal/props/`:
   - File per prop: `<prop-name>.ts` (e.g. `label.ts`, `href.ts`, `disabled.ts`)
   - Use `Prop<K, TExternal, TInternal>` or `SimpleProp<K, T>` types
   - Implement normalization and validation via `createPropDefinition<P>()`
   - Export all props from `src/internal/props/index.ts`
3. **API Definition** — Create or update `api.tsx` using the migrated prop types
4. **Implementation** — Build controller, functional component, web component using the type-safe props
5. **Tests** — Add snapshot and interaction tests alongside component files

**Why Props-First?**

- Establishes the complete API contract before any code is written
- Ensures no properties are forgotten during migration
- Provides type-safe interfaces to controller, tests, and web component from day one
- Prevents architectural rework or type mismatches after implementation
- Makes it clear which props are domain-specific vs. shared across components

**State Management Reference:** See [ARC42 § Controller State Management](./ARC42.md#controller-state-management)
for how to distinguish between normalized props (`setRenderProp()`) and derived UI state (`setState()`).

## Quick Reference

- **Architecture & layers**: [ARC42 §4 – Solution Strategy](./ARC42.md#4-solution-strategy)
- **Directory layout**: [ARC42 §1 – Blueprint Layout](./ARC42.md#blueprint-layout)
- **Prop types & validation**: [ARC42 §4 – Schema Helper Layer](./ARC42.md#schema-helper-layer)
- **Event handler convention**: [ARC42 §4 – Event Handler Policy](./ARC42.md#event-handler-policy)
- **Controller constructor pattern**: [ARC42 §4 – Constructor Pattern](./ARC42.md#constructor-pattern)
- **State management**: [ARC42 § Controller State Management](./ARC42.md#controller-state-management)
- **Design decisions**: [ARC42 §9](./ARC42.md#9-design-decisions)
- **Performance analysis**: [PERFORMANCE_ANALYSIS.md](./PERFORMANCE_ANALYSIS.md)
