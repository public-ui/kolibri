# Migrate Legacy Component to Skeleton Architecture

## Argument: $ARGUMENTS

The argument specifies which component to migrate (e.g. `card`, `tooltip`, `alert`).

---

## Role

You are a **Senior Software Architect and Developer** with strong experience in component-based frontend architecture.

Prioritize:

- **Clean Architecture**: clear layer separation, Single Responsibility, Dependency Inversion.
- **Maintainability**: code that remains understandable long-term.
- **Readability**: consistent naming, low cognitive load.
- **Traceability**: no special-case logic without explicit reason.
- **Reduction**: remove dead code and unnecessary abstractions.

Work methodically: analyze, plan, implement, validate.

---

## Task

Refactor component **`$ARGUMENTS`** so it conforms to the Skeleton Blueprint architecture and current internals implementation.

> **Architecture note (2-layer model).** The target architecture is **WC (orchestrator) → optional Behaviors + FC**. There is **no controller/aspect class** between the custom element and the FC. The WC extends `BaseWebComponent<Api>` and handles all logic inline (`initRenderProps`, `setRenderProp`, `getRenderProp`, `setState`/`getState`). If the legacy component still has a separate controller/aspect layer, absorb that logic into the WC. Only genuinely reusable cross-component logic becomes a `Behavior` (extending `BaseBehavior`).

---

## Working Directories

- **Skeleton** (`packages/components/src/components/_skeleton/`) = **read-only** reference.
- **Component directory** (`packages/components/src/components/$ARGUMENTS/`) = **workspace**.

---

## Source of Truth

Use these in this order:

1. **Current implementation code** in:
   - `packages/components/src/components/_skeleton/web-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/skeleton/api.tsx`
   - `packages/components/src/internal/functional-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/base-web-component.ts`
   - `packages/components/src/internal/functional-components/base-behavior.ts`
   - `packages/components/src/internal/functional-components/generic-types.ts`
2. [`ARC42.md`](packages/components/src/components/_skeleton/ARC42.md) as architecture narrative.

If ARC42 text and implementation differ, follow implementation — ARC42 is the specification, but the implementation is what tests and builds run against. A divergence is a bug in one of the two: fix the doc when the code is correct, or flag it when the code should conform.

---

## Procedure

### Phase 1: Analysis

1. Read **all** files in `packages/components/src/components/$ARGUMENTS/`.
2. Read the skeleton and base internals listed above.
3. Create a **gap analysis** table:

| Aspect      | Legacy (Current)                        | Skeleton (Target)                                                 | Action Required |
| ----------- | --------------------------------------- | ----------------------------------------------------------------- | --------------- |
| Inheritance | ...                                     | `BaseWebComponent<Api>`                                           | ...             |
| Logic layer | Controller/Aspect class OR inline in WC | Absorbed into the WC (orchestrator); Behaviors only when reusable | ...             |
| Props       | ...                                     | `internal/props` definitions + prop triangle                      | ...             |
| Rendering   | ...                                     | Stateless FC + `BemRootNodeFC` + bare `<Host>`                    | ...             |

### Phase 2: Props First (Do This Before WC Refactor)

1. Collect all existing `@Prop()` declarations.
2. Reuse existing prop definitions from `packages/components/src/internal/props/` where possible.
3. For new props, add one file per prop in `packages/components/src/internal/props/`.
4. Define prop behavior using existing prop helper patterns (`createPropDefinition`, `normalize`, `validate`).
5. Export new props in `packages/components/src/internal/props/index.ts`.

### Phase 3: Refactor by Layers

1. **API** (`packages/components/src/internal/functional-components/$ARGUMENTS/api.tsx`)
   - Define `propsConfig` with `required` and/or `optional` arrays (`PropsConfigShape`).
   - Derive API type using `ApiFromConfig`.
   - Only declare needed API sections (`Callbacks`, `Emitters`, `Listeners`, `Methods`, `Refs`, `States`).

2. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless renderer with `FunctionalComponentProps<Api>`.
   - Wrap the single root node in `BemRootNodeFC` (typed `block` + `modifiers`, merged `class`).
   - No side effects and no state mutation.

3. **Behavior** (`packages/components/src/internal/functional-components/$ARGUMENTS/behavior.ts`) — **only when needed**
   - Create a `Behavior` (extends `BaseBehavior<Api>`, implements `BehaviorInterface<Api>`) **only** when the logic is genuinely shared across multiple components (e.g. `TooltipBehavior`).
   - Most components have **no Behavior** — keep all logic in the WC.
   - If the legacy component had a controller/aspect, absorb its logic into the WC first; extract a Behavior only for reusable logic.

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/component.tsx`) — the orchestrator
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`.
   - Extend `BaseWebComponent<Api>` and implement `WebComponentInterface<Api>`.
   - In `componentWillLoad()`: call `this.initRenderProps(propsConfig)` once, then apply each prop via its factory: `xxxProp.apply(this._xxx, (v) => this.setRenderProp('xxx', v))`. If a Behavior is composed, initialize it here too.
   - For every `@Prop()`: add matching `@Watch()` that applies the prop factory inline (prop triangle).
   - Manage `@State()` fields via `this.setState(key, value)` / `this.getState(key)`.
   - Render with bare `<Host>` and pass normalized props via `this.getRenderProp('key')`.
   - Compose optional Behaviors: `private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess)` (or `BaseWebComponent.stateLess` for stateless Behaviors).
   - **Behavior lifecycle (required when composing a Behavior):** `componentDidRender()` must sync the Behavior's listeners (`this.tooltipBehavior.syncListeners(undefined, this.anchorRef.el, true)`), and `disconnectedCallback()` must tear the Behavior down (`this.tooltipBehavior.destroy()`) plus unsubscribe any external stores — otherwise listeners leak (see `components/link/component.tsx` for the full pattern).

5. **Tests** (co-located next to `component.tsx`)
   - `snapshot.spec.tsx` via `executeSnapshotTests`.
   - `interaction.e2e.ts` only when interaction behavior justifies it.

### Phase 4: Remove Legacy Residue

- Delete orphaned files, obsolete wrappers and old controller/aspect modules (their logic now lives in the WC or a Behavior).
- Remove unused imports/types/commented code.
- Ensure no unreferenced migration leftovers remain.

#### Dead Schema Detection

Nach der Skeleton-Migration müssen alte Legacy-Schemas bereinigt werden:

1. **Identifizieren:** Alte Schemas in `packages/components/src/schema/components/$ARGUMENTS.ts` (falls vorhanden)
2. **Prüfen, ob noch genutzt:**

   ```bash
   grep -r "from '../../schema/components/$ARGUMENTS'" packages/components/src --include="*.ts*"
   ```

   - 0 Treffer → Dead Code
   - Treffer → noch in Nutzung (z.B. in Samples, Tests)

3. **Export entfernen:**
   - In `packages/components/src/schema/index.ts` nach alten Re-Exports suchen
   - Entfernen falls vorhanden

4. **Datei löschen:**
   - Nur wenn vollständig Dead (kein Import, kein Export, kein Test)

**Beispiel:**

```bash
# Alte image.ts Schemas prüfen
grep -r "schema/components/image" packages/components/src

# Falls keine Treffer → image.ts löschen
rm packages/components/src/schema/components/image.ts
```

### Phase 5: Validation

Run from repo root:

```bash
pnpm format
pnpm lint
pnpm --filter @public-ui/components test:unit
```

If you changed build-specific configuration or packaging behavior, additionally run:

```bash
pnpm --filter @public-ui/components build
```

Do not cancel running commands.

---

## State Access Pattern (Current)

The WC is the orchestrator. `BaseWebComponent<Api>` provides everything inline — no controller/aspect class:

```typescript
export class KolMyComponent extends BaseWebComponent<MyApi> implements WebComponentInterface<MyApi> {
	// Optional: compose a Behavior (only for genuinely reusable logic)
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	@Prop() public _myProp?: string;

	@Watch('_myProp')
	public watchMyProp(value?: string): void {
		myProp.apply(value, (v) => this.setRenderProp('myProp', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(myPropsConfig);
		this.watchMyProp(this._myProp);
		this.tooltipBehavior.componentWillLoad({ label: this._label }); // only if a Behavior exists
	}
}
```

`StateAccess<Api>` is a bundled `{ setState, getState }` type used to hand the WC's state to composed **Behaviors**:

```typescript
export type StateAccess<Api extends ComponentApi> = {
	setState: SetStateFn<Api>;
	getState: GetStateFn<Api>;
};
```

Stateless/sentinel pattern for Behaviors that manage no `@State`:

```typescript
private readonly myBehavior = new MyBehavior(BaseWebComponent.stateLess);
```

`BaseWebComponent.stateLess` throws on state access by design. Use it only for Behaviors that never call `setState`/`getState`.

---

## Conventions

- `shadow: true` for web components.
- No `class` attribute on `<Host>`.
- Underscored external props (`_name`, `_label`).
- Tests co-located with component files.
- No new barrel files.
- ARIA reference IDs (`aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns`) must be unique per instance — use `createUniqueId('prefix')` or `createRelatedUniqueId(baseId, 'suffix')` from `utils/dev.utils` (see ARC42 Design Decision 12).
- Do not add `data-testid` to component markup; use stable BEM selectors in tests.

---

## Common Pitfalls

### 1. Incomplete Prop Triangle

Every `@Prop()` needs all three — all inside the WC:

- declaration
- matching `@Watch()` that applies the prop factory inline
- application in `componentWillLoad()` via the same watcher, after `this.initRenderProps(propsConfig)`

### 2. Host Class Anti-Pattern

Do not add `class="kol-..."` to `<Host>`.

### 3. Unused `@State()`

Only keep `@State()` fields that are actually read and updated for reactive UI.

### 4. Event Listener Leaks

Do not register inline listeners with new function references in lifecycle hooks.
Use stable arrow-property handlers.

### 5. Inline Ad-Hoc Prop Types

Do not define normalization/validation inline in components.
Use dedicated definitions in `src/internal/props/`.

### 6. Wrong Sentinel Assumption

Do not use `noopStateAccess` (not part of current implementation).
Use `BaseWebComponent.stateLess` — and only for stateless Behaviors.

### 7. JSDoc Type Noise in TS

Do not add redundant `@param {}` / `@returns {}` JSDoc type annotations in TypeScript.

---

## Pre-Review Checklist

- [ ] Gap analysis completed and used as migration plan
- [ ] API uses `PropsConfigShape` + `ApiFromConfig`
- [ ] WC is the orchestrator — extends `BaseWebComponent<Api>`, no controller/aspect class, calls `this.initRenderProps(propsConfig)` in `componentWillLoad()`
- [ ] Watchers apply prop factories inline: `xxxProp.apply(value, (v) => this.setRenderProp('xxx', v))`
- [ ] Behavior (if any) extends `BaseBehavior<Api>` / implements `BehaviorInterface<Api>` and is composed via `this.stateAccess` or justified `BaseWebComponent.stateLess`
- [ ] Prop triangle complete for every `@Prop()`
- [ ] Functional component is stateless and wraps its root in `BemRootNodeFC`
- [ ] `<Host>` has no redundant class attribute
- [ ] No dead code or orphaned files
- [ ] Tests co-located and updated
- [ ] Validation commands completed successfully

---

## Output

When finished, provide:

1. **Gap analysis**
2. **Deleted files** with justification
3. **New/modified files** grouped by architecture layer
4. **Completed pre-review checklist**
5. **Validation result** (commands + status)
