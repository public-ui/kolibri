# Agent Instructions

This directory contains the `kol-skeleton` component blueprint — the reference implementation for new KoliBri web components.

> **The [ARC42.md](./ARC42.md) is the authoritative specification.**
> All architectural decisions, layer responsibilities, type contracts, coding patterns and design rationale are documented there.
> Read it before making any changes to this blueprint or creating new components based on it.

## Props-First Refactoring Workflow

**CRITICAL:** Always establish props before implementing behaviors or renderers.

When refactoring an existing component to match the Skeleton architecture:

1. **Props Inventory** — Collect all existing `@Prop()` declarations from the current component, including their JSDoc comments, types (schema aliases), defaults and `@deprecated` markers. This inventory **is** the public API contract to preserve.
2. **Props Migration** — Create dedicated prop files under `src/internal/props/`:
   - File per prop: `<prop-name>.ts` (e.g. `label.ts`, `href.ts`, `disabled.ts`)
   - Use `Prop<K, TExternal, TInternal>` or `SimpleProp<K, T>` types
   - Implement normalization and validation via `createPropDefinition<P>()`
   - Export all props from `src/internal/props/index.ts`
3. **API Definition** — Create or update `api.tsx` using the migrated prop types
4. **Implementation** — Build the web component (orchestrator) and functional component using the type-safe props. The WC absorbs all prop normalization logic directly — no separate controller/aspect class.
5. **Tests** — Add snapshot and interaction tests alongside component files

**Why Props-First?**

- Establishes the complete API contract before any code is written
- Ensures no properties are forgotten during migration
- Provides type-safe interfaces to WC, behaviors, and FC from day one
- Prevents architectural rework or type mismatches after implementation
- Makes it clear which props are domain-specific vs. shared across components

**CRITICAL — Public API parity:** The migrated WC must expose **exactly** the same public
`@Prop`/`@Method` surface as the predecessor: same members, same schema-alias types, same
defaults, same JSDoc (the generated `custom-elements.json`, `docs-vscode` and adapter
IntelliSense are built from `prop.docs`/`method.docs`). The FC's props are an **internal**
renderer contract — a prop existing on the FC must not automatically become a public `@Prop`,
and a predecessor prop without an FC counterpart must not silently disappear. Implement the
schema `*Props` interface (e.g. `implements LinkProps`) alongside `WebComponentInterface<Api>`
so drift fails the build. Pin the public API in the skeleton contract test
[`public-api.spec.ts`](./public-api.spec.ts) and diff against the predecessor during review.
Details and the mandatory diff verification: see
[ARC42 § Public API Contract](./ARC42.md#public-api-contract-migration-parity).

**State Management Reference:** See [ARC42 § WC State Management](./ARC42.md#wc-state-management)
for how to distinguish between normalized props (`setRenderProp()`) and derived UI state (`setState()`).

## Quick Reference

- **Architecture & layers**: [ARC42 §4 – Solution Strategy](./ARC42.md#4-solution-strategy)
- **Directory layout**: [ARC42 §1 – Blueprint Layout](./ARC42.md#blueprint-layout)
- **Prop types & validation**: [ARC42 §4 – Schema Helper Layer](./ARC42.md#schema-helper-layer)
- **Event handler convention**: [ARC42 §4 – Event Handler Policy](./ARC42.md#event-handler-policy)
- **Behavior composition**: [ARC42 §4 – Behavior Layer](./ARC42.md#behavior-layer)
- **State management**: [ARC42 § WC State Management](./ARC42.md#wc-state-management)
- **BemRootNodeFC pattern**: [ARC42 §4 – Functional Component Layer](./ARC42.md#functional-component-layer)
- **Transitional shadow:false**: [ARC42 §4 – Transitional Pattern](./ARC42.md#transitional-pattern-shadowfalse)
- **Design decisions**: [ARC42 §9](./ARC42.md#9-design-decisions)
