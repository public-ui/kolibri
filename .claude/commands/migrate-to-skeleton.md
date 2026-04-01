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

---

## Authoritative Specification

The [`ARC42.md`](packages/components/src/components/_skeleton/ARC42.md) is the **authoritative architecture specification**. Read it completely before starting the refactoring. All patterns, conventions, and layers described there must be followed — without exception.

---

## Procedure

### Phase 1: Analysis

1. Read **all** files in the component directory `packages/components/src/components/$ARGUMENTS/`
2. Read the Skeleton reference implementation:
   - `packages/components/src/components/_skeleton/ARC42.md` (completely!)
   - `packages/components/src/components/_skeleton/web-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/skeleton/api.tsx`
   - `packages/components/src/internal/functional-components/skeleton/controller.ts`
   - `packages/components/src/internal/functional-components/skeleton/component.tsx`
3. Create a **gap analysis** and output it as a Markdown table:

| Aspect      | Legacy (Current) | Skeleton (Target)       | Action Required |
| ----------- | ---------------- | ----------------------- | --------------- |
| Inheritance | None / custom    | `BaseWebComponent<Api>` | Migrate         |
| Controller  | None / inline    | `BaseController<Api>`   | Create          |
| ...         | ...              | ...                     | ...             |

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

Create or replace files according to the ARC42 layers:

1. **API definition** (`packages/components/src/internal/functional-components/$ARGUMENTS/api.tsx`)
   - `PropsConfigShape` with `required` and `optional` arrays
   - `ApiFromConfig` for type derivation
   - Only define API fields the component actually uses (`Callbacks`, `Emitters`, `Methods`, `States`, `Refs`, `Listeners`)

2. **Controller** (`packages/components/src/internal/functional-components/$ARGUMENTS/controller.ts`)
   - Extends `BaseController<Api>`
   - Constructor takes `stateAccess: StateAccess<Api>` — bundled object with `setState` and `getState`
   - Internally destructures `stateAccess` into protected fields: `protected readonly setState` and `protected readonly getState`
   - `componentWillLoad()` with `ResolvedInputProps<Api>`
   - Watcher methods use `propDefinition.apply(value, callback)`
   - Event handlers and ref setters as **arrow properties**
   - Lifecycle and watcher methods as **prototype methods**

3. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless renderer with `FunctionalComponentProps<Api>`
   - BEM classes via `bem.forBlock('kol-$ARGUMENTS')`
   - No side effects, no state mutation

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/component.tsx`)
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`
   - Extends `BaseWebComponent<Api>` and implements `WebComponentInterface<Api>`
   - Inherits `protected readonly stateAccess: StateAccess<Api>` from `BaseWebComponent`
   - Controller: `private readonly ctrl = new Controller(this.stateAccess)` — pass bundled state access object
   - `@Prop()` and `@Watch()` for every prop (prop triangle!)
   - `componentWillLoad()` forwards props to controller
   - `render()` returns `<Host>` with functional component
   - Rendering uses `this.ctrl.getRenderProp('key')` for normalized props

5. **CSS/SCSS** — keep existing styles, adjust as needed

6. **Tests** — test files placed **next to** `component.tsx` (no `test/` subdirectory):
   - `snapshot.spec.tsx` — Jest DOM snapshot tests (`executeSnapshotTests`)
   - `interaction.e2e.ts` — Playwright interaction tests (when appropriate)

### Phase 4: Eliminate Dead Code

After refactoring, **no legacy code** may remain:

- **Delete files**: old type/interface files, old controllers, orphaned modules, empty files
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

> All patterns are authoritatively defined in [`ARC42.md`](packages/components/src/components/_skeleton/ARC42.md). The items below are quick reminders only — consult ARC42 for full detail.

- **Layer model, Prop Triangle, Controller pattern, State management** → ARC42 Sections 4–5
- **Normalized Props** → `setRenderProp()` (no re-render); **Managed State** → `setState()` + `@State` (triggers re-render)
- Arrow properties for event handlers / ref setters; prototype methods for lifecycle and watchers (see ARC42 Section 4.2)
- **ARIA IDs**: any `id` used in `aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns` must be unique per instance → `private readonly myId = \`prefix-${nonce()}\``from`utils/dev.utils`

### Expected file structure after migration

```
packages/components/src/
├── components/
│   └── $ARGUMENTS/
│       ├── component.tsx            ← @Component { tag: 'kol-$ARGUMENTS' }
│       └── style.scss
└── internal/
    ├── functional-components/
    │   └── $ARGUMENTS/
    │       ├── api.tsx              ← PropsConfigShape + ApiFromConfig
    │       ├── controller.ts        ← State, validation, event handlers
    │       └── component.tsx        ← Stateless renderer (FC)
    └── props/
        ├── <new-prop>.ts            ← one file per new prop
        └── index.ts                 ← re-exports
```

---

## Common Pitfalls

Actively check for these mistakes during implementation. Each one has caused real regressions.

### ❌ 1. Missing part of the Prop Triangle

Every `@Prop()` requires all three parts: declaration, `@Watch()`, and `componentWillLoad()` init. A prop without a watcher will not update at runtime.

### ❌ 2. `<Host>` with a class attribute

`<Host>` must not have a class attribute. Shadow DOM isolation means the tag name itself is the selector — no class needed.

```typescript
<Host>
  <MyFC ... />
</Host>
```

### ❌ 3. Unused `@State()` fields

Declare `@State()` only for values that actually trigger re-renders. Remove any field that is never mutated or read.

### ❌ 4. Event handler defined inline in a lifecycle method

```typescript
❌ componentWillLoad(): void { el.addEventListener('click', () => { ... }); }
   // new function reference each cycle → listener accumulates, never removed

✅ public handleClick = (): void => { ... };   // arrow property in controller
   componentDidLoad(): void { el.addEventListener('click', this.handleClick); }
```

### ❌ 5. Inline prop types instead of `src/internal/props/`

Props defined inline in a component cannot be reused and lead to inconsistent normalisation. Always create a dedicated file under `packages/components/src/internal/props/`.

### ❌ 6. `@Prop({ reflect: true })` omitted where needed

If the attribute value must be readable via `el.getAttribute('_name')` (e.g. for CSS attribute selectors or testing), add `reflect: true`. When in doubt, follow the existing props as reference.

### ❌ 7. JSDoc type annotations in TypeScript

Remove `@param {string}` and `@returns {void}` JSDoc tags — TypeScript signatures are the source of truth. Keep JSDoc only for Stencil-specific decorators (`@Prop`, `@Event`, `@Method`) where the tooling reads it.

---

## State Access Pattern — Unified Architecture

All controllers operate through a **unified `StateAccess<Api>` interface**, not separate `setState`/`getState` parameters:

```typescript
export interface StateAccess<Api extends ComponentApi> {
	setState: SetStateFn<Api>;
	getState: GetStateFn<Api>;
}
```

### New Components (Preferred)

New web components extend `BaseWebComponent<Api>` and inherit `stateAccess`:

```typescript
// Web Component
export class KolMyComponent extends BaseWebComponent<MyApi> implements WebComponentInterface<MyApi> {
	private readonly ctrl = new MyController(this.stateAccess);
	// this.stateAccess contains setState/getState backed by @State decorator
}

// Controller
export class MyController extends BaseController<MyApi> {
	public constructor(stateAccess: StateAccess<MyApi>) {
		super(stateAccess, myPropsConfig);
		// BaseController destructures stateAccess into:
		// - this.setState (protected)
		// - this.getState (protected)
	}
}
```

### Legacy Components (Backwards Compatible)

Old web components that **do not** extend `BaseWebComponent` can still instantiate controllers:

- **Via static sentinel `BaseWebComponent.withoutState`** (for class-based legacy components):

  ```typescript
  export class KolLegacyComponent {
  	private readonly ctrl = new MyController(BaseWebComponent.withoutState);
  	// Access via static: BaseWebComponent.withoutState
  }
  ```

- **Via exported `noopStateAccess`** (for functional components or controllers created outside a web component):

  ```typescript
  import { noopStateAccess } from '../../internal/functional-components/base-web-component';

  const tooltipCtrl = new TooltipController(noopStateAccess);
  ```

**Both variants provide silent no-op state access** — calling `setState`/`getState` on a component without `@State` decorator simply reads/writes properties on the instance, which triggers no Stencil re-render. This is **safe and intentional** for controllers that only use `setRenderProp()` / `getRenderProp()`.

---

## Conventions

- All web components: `shadow: true`
- `<Host>` without class attribute
- Underscored public props (`_name`, `_label`)
- Tests co-located next to `component.tsx`
- No `types.ts` files, no barrel files
- **ARIA IDs via `nonce()`**: Any `id` referenced by `aria-controls`, `aria-labelledby`, `aria-describedby` or `aria-owns` must be unique per instance — declare as `private readonly myId = \`prefix-${nonce()}\``using`nonce()`from`utils/dev.utils`
- **Kein `data-testid`**: Tests verwenden BEM-Klassen als Selektoren (`page.locator('.kol-component__element')`), niemals `data-testid`-Attribute im Komponenten-Markup
- **StateAccess parameter**: Controllers always receive `StateAccess<Api>` bundled object, never separate `setState`/`getState` parameters

---

## Pre-Review Checklist

Verify all points before opening a pull request:

- [ ] **Prop Triangle** — every `@Prop()` has a `@Watch()` and is forwarded in `componentWillLoad()`
- [ ] **Controller** — extends `BaseController<Api>`, receives `StateAccess<Api>` in constructor
- [ ] **FC stateless** — no `@State`, no side effects
- [ ] **API definition** — `PropsConfigShape` + `ApiFromConfig` present in `api.tsx`
- [ ] **Props files** — all props in `src/internal/props/` with `normalize` + `validate`
- [ ] **Bare `<Host>`** — no redundant `class="kol-..."` on `<Host>`
- [ ] **No dead code** — no unused imports, types, or commented-out blocks
- [ ] **No JSDoc types** — only TypeScript signatures; JSDoc only for Stencil decorators
- [ ] **Tests co-located** — `snapshot.spec.tsx` (and optionally `interaction.e2e.ts`) next to `component.tsx`
- [ ] **All commands green** — `pnpm format`, `pnpm lint`, `pnpm --filter @public-ui/components test:unit`, `pnpm --filter @public-ui/components build` ✓

---

## Output

When finished, provide the following summary:

1. **Gap analysis** — deviations of the existing component from the skeleton architecture
2. **Deleted files** — list with justification per file
3. **New/modified files** — directory structure with architecture layer per file
4. **Pre-review checklist** — completed checklist confirming all points above
5. **Validation result** — confirmation that all commands completed successfully
