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
   - Receives `setState: SetStateFn<Api>` and `getState: GetStateFn<Api>`
   - `componentWillLoad()` with `ResolvedInputProps<Api>`
   - Watcher methods use `propDefinition.apply(value, callback)`
   - Event handlers and ref setters as **arrow properties**
   - Lifecycle and watcher methods as **prototype methods**

3. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless renderer with `FunctionalComponentProps<Api>`
   - BEM classes via `bem.forBlock('kol-$ARGUMENTS')`
   - No side effects, no state mutation

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/web-components/$ARGUMENTS/component.tsx`)
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`
   - Extends `BaseWebComponent<Api>` and implements `WebComponentInterface<Api>`
   - Controller: `private readonly ctrl = new Controller(this.setState, this.getState)`
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

## Architecture Reference (Summary)

### Layer Model

```
Consumer -> Web Component -> Controller -> Schema Helpers
                |                |
         Functional Component   Props
```

### Prop Triangle (all 3 parts must be present!)

```typescript
// 1. Field declaration with @Prop()
@Prop()
public _name!: string;

// 2. Watcher with @Watch()
@Watch('_name')
public watchName(value?: string): void {
  this.ctrl.watchName(value);
}

// 3. Forwarding in componentWillLoad()
public componentWillLoad(): void {
  this.ctrl.componentWillLoad({
    name: this._name,
  });
}
```

### Controller Pattern

```typescript
export class MyController extends BaseController<MyApi> implements ControllerInterface<MyApi> {
	public constructor(setState: SetStateFn<MyApi>, getState: GetStateFn<MyApi>) {
		super(myPropsConfig, setState, getState);
	}

	public watchName(value?: string): void {
		nameProp.apply(value, (v) => {
			this.setRenderProp('name', v);
		});
	}
}
```

### State Management

- **Normalized Props** -> `setRenderProp()` (no re-render)
- **Derived/Managed State** -> `setState()` (triggers re-render via `@State`)

### Conventions

- All web components: `shadow: true`
- `<Host>` without class attribute
- Underscored public props (`_name`, `_label`)
- Tests co-located next to `component.tsx`
- No `types.ts` files, no barrel files
- **ARIA IDs via `nonce()`**: Any `id` referenced by `aria-controls`, `aria-labelledby`, `aria-describedby` or `aria-owns` must be unique per instance — declare as `private readonly myId = \`prefix-${nonce()}\``using`nonce()`from`utils/dev.utils`
- **Kein `data-testid`**: Tests verwenden BEM-Klassen als Selektoren (`page.locator('.kol-component__element')`), niemals `data-testid`-Attribute im Komponenten-Markup

---

## Output

When finished, provide the following summary:

1. **Gap analysis** — deviations of the existing component from the skeleton architecture
2. **Deleted files** — list with justification per file
3. **New/modified files** — directory structure with architecture layer per file
4. **Validation result** — confirmation that all commands completed successfully
