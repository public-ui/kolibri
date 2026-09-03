---
name: migrate-to-skeleton
description: Migrates a legacy KoliBri web component to the Skeleton Blueprint architecture (WC orchestrator + Behaviors + FC + props pattern)
---

# Migrate Legacy Component to Skeleton Architecture

## Argument: $ARGUMENTS

The argument specifies which component to migrate (e.g. `card`, `tooltip`, `alert`).

---

## Role

You are a **Senior Software Architect and Developer** with 15+ years of experience in component-based frontend architecture. You prioritize:

- **Clean Architecture** — clear layer separation, Single Responsibility, Dependency Inversion.
- **Maintainability** — code that a new team member can understand without questions 2 years from now.
- **Readability** — self-documenting structures, consistent naming, minimal cognitive load.
- **Traceability** — every decision follows a recognizable pattern, no special cases without justification.
- **Reduction** — you write no more code than necessary. You boldly delete what is not needed.

You work methodically: analyze first, then plan, then implement, then validate. You leave behind no dead code, no orphaned types, no unreferenced files.

---

## Task

Refactor the component **`$ARGUMENTS`** so that it fully conforms to the reference implementation in the Skeleton Blueprint and the Internals layer.

---

## Working Directories

- **Skeleton** (`packages/components/src/components/_skeleton/`) = **read-only**. Serves exclusively as reference and template.
- **Component directory** (`packages/components/src/components/$ARGUMENTS/`) = **workspace**. All changes are made in-place in the existing component folder.

> **Architecture note (2-layer model).** The target architecture is **WC (orchestrator) → optional Behaviors + FC**. There is **no controller/aspect class** between the custom element and the FC. If the legacy component still has a separate controller/aspect layer, that logic must be **absorbed into the WC**. Only genuinely reusable cross-component logic is factored out into a `Behavior` (extending `BaseBehavior`).

---

## Authoritative Specification

The [`ARC42.md`](/packages/components/src/components/_skeleton/ARC42.md) is the **authoritative architecture specification**. Read it completely before starting the refactoring. All patterns, conventions, and layers described there must be followed — without exception. If ARC42 text and implementation code ever differ, follow the implementation (it is what tests and builds run against) and fix the divergence in whichever of the two is wrong.

---

## Procedure

### Phase 1: Analysis

1. Read **all** files in the component directory `packages/components/src/components/$ARGUMENTS/`
2. Read the Skeleton reference implementation:
   - `packages/components/src/components/_skeleton/ARC42.md` (completely!)
   - `packages/components/src/components/_skeleton/web-components/skeleton/component.tsx` (WC orchestrator)
   - `packages/components/src/internal/functional-components/skeleton/api.tsx`
   - `packages/components/src/internal/functional-components/skeleton/component.tsx` (FC)
   - `packages/components/src/internal/functional-components/base-web-component.ts` (`initRenderProps`, `setRenderProp`, `getRenderProp`, `stateAccess`, `stateLess`)
   - `packages/components/src/internal/functional-components/base-behavior.ts` (`BaseBehavior`, only if the component needs a Behavior)
3. Create a **gap analysis** and output it as a Markdown table:

| Aspect      | Legacy (Current)                        | Skeleton (Target)                                                 | Action Required |
| ----------- | --------------------------------------- | ----------------------------------------------------------------- | --------------- |
| Inheritance | None / custom / controller-based        | `BaseWebComponent<Api>`                                           | Migrate         |
| Logic layer | Controller/Aspect class OR inline in WC | Absorbed into the WC (orchestrator); Behaviors only when reusable | Migrate         |
| Props       | Inline / scattered                      | `internal/props` definitions + prop triangle                      | Migrate         |
| Rendering   | Mixed                                   | Stateless FC + `BemRootNodeFC` + bare `<Host>`                    | Migrate         |
| ...         | ...                                     | ...                                                               | ...             |

### Phase 2: Props-First — Establish Structure (CRITICAL — DO THIS FIRST!)

**Before implementing the component, all props must be migrated:**

1. **Props inventory**: Collect all existing `@Prop()` declarations from the current component
2. **Check existing props**: Look in `packages/components/src/internal/props/` for props that already exist and can be reused
3. **One file per new prop** under `packages/components/src/internal/props/`:
   - Filename: `<prop-name>.ts` (e.g. `label.ts`, `href.ts`, `disabled.ts`)
   - Use `Prop<K, TExternal, TInternal>` or `SimpleProp<K, T>` types
   - Implement `normalize()` and `validate()` via `createPropDefinition<P>()`
4. **Export props** in `packages/components/src/internal/props/index.ts`

### Phase 3: Refactoring — Component Implementation

Create or replace files according to the ARC42 layers. The WC **is** the orchestrator — it absorbs all prop normalization, state management and lifecycle logic directly. There is no controller/aspect class.

1. **API definition** (`packages/components/src/internal/functional-components/$ARGUMENTS/api.tsx`)
   - `propsConfig` with `required` and/or `optional` arrays of prop definitions (`PropsConfigShape`)
   - Derive the API type with `ApiFromConfig<typeof config, { … }>`
   - Only define API fields the component actually uses (`Callbacks`, `Emitters`, `Methods`, `States`, `Refs`, `Listeners`)

2. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless renderer with `FunctionalComponentProps<Api>`
   - Wrap the single root node in `BemRootNodeFC` (typed `block` + `modifiers`, merged `class`)
   - No side effects, no state mutation

3. **Behavior** (`packages/components/src/internal/functional-components/$ARGUMENTS/behavior.ts`) — **only when needed**
   - Create a `Behavior` (extending `BaseBehavior<Api>`, implementing `BehaviorInterface<Api>`) **only** when the logic is genuinely shared across multiple components (e.g. `TooltipBehavior`).
   - The vast majority of components have **no Behavior** — keep all logic in the WC.
   - If the legacy component had a controller/aspect, first try to absorb its logic into the WC. Extract a Behavior only if the extracted logic is reusable elsewhere.

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/component.tsx`) — the orchestrator
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`
   - Extends `BaseWebComponent<Api>` and implements `WebComponentInterface<Api>`
   - `componentWillLoad()` calls `this.initRenderProps(config)` once, then applies each prop: `xxxProp.apply(this._xxx, (v) => this.setRenderProp('xxx', v))`. If the component composes a Behavior, initialize it here too (`this.tooltipBehavior.componentWillLoad({ … })`).
   - `@Prop()` and `@Watch()` for every prop (prop triangle!). Watchers call the prop factory inline: `@Watch('_xxx') watchXxx(value) { xxxProp.apply(value, (v) => this.setRenderProp('xxx', v)); }`.
   - `@State()` for every field declared in `Api['States']`; read/write via `this.getState('key')` / `this.setState('key', value)`.
   - Event handlers and ref setters are **arrow properties** on the WC; lifecycle and watcher methods are **prototype methods**.
   - `render()` returns a bare `<Host>` (no `class`) wrapping the functional component, passing render props via `this.getRenderProp('key')` and managed state via `this.<state>`.
   - Composes optional Behaviors: `private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess)` (or `BaseWebComponent.stateLess` when the Behavior manages no `@State`).
   - **Behavior lifecycle (required when composing a Behavior):** `componentDidRender()` must sync the Behavior's listeners (`this.tooltipBehavior.syncListeners(undefined, this.anchorRef.el, true)`), and `disconnectedCallback()` must tear the Behavior down (`this.tooltipBehavior.destroy()`) plus unsubscribe any external stores — otherwise listeners leak (see `components/link/component.tsx` for the full pattern).

5. **CSS/SCSS** — keep existing styles, adjust as needed

6. **Tests** — test files placed **next to** `component.tsx` (no `test/` subdirectory):
   - `snapshot.spec.tsx` — Jest DOM snapshot tests (`executeSnapshotTests`)
   - `interaction.e2e.ts` — Playwright interaction tests (when appropriate)

### Phase 4: Eliminate Dead Code

After refactoring, **no legacy code** may remain:

- **Delete files**: old type/interface files, old controller/aspect modules (their logic now lives in the WC or a Behavior), orphaned modules, empty files
- **Remove code**: unused types, imports, commented-out code, deprecated wrappers
- **Verify**: no file without references

### Phase 5: Validation

Run the following commands and ensure all pass without errors:

```bash
pnpm format
pnpm lint
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/components build
```

**No command may be cancelled before completion.**

---

## Architecture Reference

> All patterns are authoritatively defined in [`ARC42.md`](/packages/components/src/components/_skeleton/ARC42.md). The items below are quick reminders only — consult ARC42 for full detail.

### Layer Model

```
Web Component (orchestrator) → Schema Helpers
     ↓
Behavior (optional, e.g. TooltipBehavior)
     ↓
Functional Component (stateless renderer)
```

- **Web Component**: extends `BaseWebComponent<Api>`. The single orchestrator — owns `@Prop`, `@Watch`, `@State`, `@Event`, `@Method`, `@Listen` decorators and handles all prop normalization, state transitions and lifecycle logic **inline** (no controller/aspect class in between).
- **Behavior** (optional): extends `BaseBehavior<Api>` (implements `BehaviorInterface<Api>`). Composable, reusable logic that lives inside a WC (e.g. `TooltipBehavior`). Created only when the same logic is genuinely shared across multiple components.
- **Functional Component**: pure renderer, receives `FunctionalComponentProps<Api>`. Uses `BemRootNodeFC` for the single-root BEM structure.
- **Schema Helpers** (`src/internal/props/`): prop types, normalization, validation.

### Prop Triangle

Every `@Prop()` requires all three parts — all handled **inside the WC**:

```typescript
// 1. Declaration
@Prop() public _count?: number | string;

// 2. Watcher — calls the prop factory inline
@Watch('_count')
public watchCount(value?: number | string): void {
  countProp.apply(value, (v) => this.setRenderProp('count', v));
}

// 3. Init in componentWillLoad — after initRenderProps
public componentWillLoad(): void {
  this.initRenderProps(myPropsConfig);
  this.watchCount(this._count);
}
```

### WC Orchestrator Pattern

The WC does everything inline. `BaseWebComponent` provides `initRenderProps`, `setRenderProp`, `getRenderProp` and type-safe `setState`/`getState`:

```typescript
export class KolMyComponent extends BaseWebComponent<MyApi> implements WebComponentInterface<MyApi> {
	// Optional: compose a Behavior (only for genuinely reusable logic)
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	public componentWillLoad(): void {
		this.initRenderProps(myPropsConfig); // call once, before any setRenderProp
		myCustomProp.apply(this._myProp, (v) => this.setRenderProp('myProp', v));
		// ...apply all other props...
		this.tooltipBehavior.componentWillLoad({ label: this._label }); // only if a Behavior exists
	}

	// Prototype method — watcher
	public watchMyProp(value?: string): void {
		myCustomProp.apply(value, (v) => this.setRenderProp('myProp', v));
	}

	// Arrow property — event handler
	public handleClick = (): void => {
		this.setState('count', (this.getState('count') ?? 0) + 1);
	};

	// Arrow property — ref setter
	public setButtonRef = (element?: HTMLButtonElement): void => {
		/* ... */
	};

	public render(): JSX.Element {
		return (
			<Host>
				<MyFC myProp={this.getRenderProp('myProp')} />
			</Host>
		);
	}
}
```

### Behavior Pattern (only for reusable logic)

A Behavior extends `BaseBehavior<Api>` and implements `BehaviorInterface<Api>`. It manages its own render props and receives `StateAccess<Api>` from its host WC:

```typescript
export class MyBehavior extends BaseBehavior<MyApi> implements BehaviorInterface<MyApi> {
	public constructor(stateAccess: StateAccess<MyApi>) {
		super(stateAccess, myPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<MyApi>): void {
		this.watchMyProp(props.myProp);
	}

	public watchMyProp(value?: string): void {
		myCustomProp.apply(value, (v) => this.setRenderProp('myProp', v));
	}
}

// Inside the WC — composition:
private readonly myBehavior = new MyBehavior(this.stateAccess);
// Stateless behavior (no @State fields):
private readonly myStatelessBehavior = new MyStatelessBehavior(BaseWebComponent.stateLess);
```

Behaviors must never instantiate other Behaviors directly — only the WC composes them.

### State Management

- **Normalized Props** via `setRenderProp()` (WC) — no re-render. Retrieved via `getRenderProp(key)`.
- **Managed State** via `this.setState(key, value)` (WC) — writes to the web component's `@State` fields, triggers re-render. Read back via `this.getState(key)`.

### API Definition

```typescript
import { labelProp, myCustomProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const myPropsConfig = {
	required: [labelProp],
	optional: [myCustomProp],
} as const satisfies PropsConfigShape;

export type MyApi = ApiFromConfig<
	typeof myPropsConfig,
	{
		// Only include fields the component actually uses:
		// Callbacks, Emitters, Methods, Refs, Listeners, States
	}
>;
```

### Prop Definition

```typescript
// src/internal/props/my-prop.ts
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type MyProp = SimpleProp<'myProp', string>;

export const myCustomProp = createPropDefinition<MyProp>(
	'myProp',
	'',
	(value: unknown) => String(value ?? ''),
	(v) => v.length > 0,
);
```

### Expected File Structure

```
packages/components/src/
├── components/
│   └── $ARGUMENTS/
│       ├── component.tsx            <- @Component { tag: 'kol-$ARGUMENTS' } — WC orchestrator, extends BaseWebComponent
│       ├── style.scss
│       ├── snapshot.spec.tsx        <- Jest snapshot tests (co-located!)
│       ├── __snapshots__/           <- Snapshot output
│       └── interaction.e2e.ts       <- Playwright tests (optional)
└── internal/
    ├── functional-components/
    │   └── $ARGUMENTS/
    │       ├── api.tsx              <- propsConfig + ApiFromConfig type
    │       ├── component.tsx        <- Stateless FC renderer (BemRootNodeFC)
    │       └── behavior.ts          <- BaseBehavior (optional — only for reusable logic)
    └── props/
        ├── <new-prop>.ts            <- one file per new prop
        └── index.ts                 <- re-exports
```

---

## Common Pitfalls

Actively check for these mistakes during implementation. Each one has caused real regressions.

### 1. Missing part of the Prop Triangle

Every `@Prop()` requires all three parts: declaration, `@Watch()`, and `componentWillLoad()` init. A prop without a watcher will not update at runtime.

### 2. `<Host>` with a class attribute

`<Host>` must not have a class attribute. Shadow DOM isolation means the tag name itself is the selector — no class needed.

```typescript
// CORRECT:
<Host>
  <MyFC ... />
</Host>
```

### 3. Unused `@State()` fields

Declare `@State()` only for values that actually trigger re-renders. Remove any field that is never mutated or read.

### 4. Event handler defined inline in a lifecycle method

```typescript
// WRONG: new function reference each cycle, listener accumulates, never removed
componentWillLoad(): void { el.addEventListener('click', () => { ... }); }

// CORRECT: arrow property on the web component
public handleClick = (): void => { ... };
componentDidLoad(): void { el.addEventListener('click', this.handleClick); }
```

### 5. Inline prop types instead of `src/internal/props/`

Props defined inline in a component cannot be reused and lead to inconsistent normalisation. Always create a dedicated file under `packages/components/src/internal/props/`.

### 6. `@Prop({ reflect: true })` omitted where needed

If the attribute value must be readable via `el.getAttribute('_name')` (e.g. for CSS attribute selectors or testing), add `reflect: true`. When in doubt, follow the existing props as reference.

### 7. JSDoc type annotations in TypeScript

Remove `@param {string}` and `@returns {void}` JSDoc tags — TypeScript signatures are the source of truth. Keep JSDoc only for Stencil-specific decorators (`@Prop`, `@Event`, `@Method`) where the tooling reads it.

---

## Pre-Review Checklist

Verify all points before opening a pull request:

- [ ] **Prop Triangle** — every `@Prop()` has a `@Watch()` and is applied in `componentWillLoad()` after `initRenderProps(config)`
- [ ] **WC orchestrator** — extends `BaseWebComponent<Api>`, handles all logic inline (no controller/aspect class), watchers call prop factories via `xxxProp.apply(value, (v) => this.setRenderProp('xxx', v))`
- [ ] **Behavior (optional)** — exists only for genuinely reusable logic, extends `BaseBehavior<Api>` / implements `BehaviorInterface<Api>`, composed by the WC via `this.stateAccess` or `BaseWebComponent.stateLess`
- [ ] **FC stateless** — no `@State`, no side effects, single root via `BemRootNodeFC`
- [ ] **API definition** — `propsConfig` (`PropsConfigShape`) + `ApiFromConfig` type present in `api.tsx`
- [ ] **Props files** — all props in `src/internal/props/` with `normalize` + `validate`
- [ ] **Bare `<Host>`** — no redundant `class="kol-..."` on `<Host>`
- [ ] **No dead code** — no unused imports, types, or commented-out blocks
- [ ] **No JSDoc types** — only TypeScript signatures; JSDoc only for Stencil decorators
- [ ] **Tests co-located** — `snapshot.spec.tsx` (and optionally `interaction.e2e.ts`) next to `component.tsx`
- [ ] **All commands green** — `pnpm format`, `pnpm lint`, `pnpm --filter @public-ui/components test:unit` passed

---

## Output

When finished, provide the following summary:

1. **Gap analysis** — deviations of the existing component from the skeleton architecture
2. **Deleted files** — list with justification per file
3. **New/modified files** — directory structure with architecture layer per file
4. **Pre-review checklist** — completed checklist confirming all points above
5. **Validation result** — confirmation that all commands completed successfully
