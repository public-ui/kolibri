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
   - `packages/components/src/internal/functional-components/skeleton/controller.ts`
   - `packages/components/src/internal/functional-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/base-controller.ts`
   - `packages/components/src/internal/functional-components/base-web-component.ts`
   - `packages/components/src/internal/functional-components/generic-types.ts`
2. [`ARC42.md`](packages/components/src/components/_skeleton/ARC42.md) as architecture narrative.

If ARC42 text and implementation differ, follow implementation.

---

## Procedure

### Phase 1: Analysis

1. Read **all** files in `packages/components/src/components/$ARGUMENTS/`.
2. Read the skeleton and base internals listed above.
3. Create a **gap analysis** table:

| Aspect      | Legacy (Current) | Skeleton (Target)                                               | Action Required |
| ----------- | ---------------- | --------------------------------------------------------------- | --------------- |
| Inheritance | ...              | `BaseWebComponent<Api>` or `BaseWebComponent.stateLess` pattern | ...             |
| Controller  | ...              | `BaseController<Api>`                                           | ...             |
| Props       | ...              | `internal/props` definitions + prop triangle                    | ...             |
| Rendering   | ...              | Stateless FC + bare `<Host>`                                    | ...             |

### Phase 2: Props First (Do This Before Controller Refactor)

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

2. **Controller** (`packages/components/src/internal/functional-components/$ARGUMENTS/controller.ts`)
   - Extend `BaseController<Api>`.
   - Constructor signature: `constructor(stateAccess: StateAccess<Api>)`.
   - Call `super(stateAccess, propsConfig)`.
   - Implement `componentWillLoad(props: ResolvedInputProps<Api>)`.
   - Use `propDefinition.apply(value, callback)` in watchers.
   - Use arrow properties for handlers/ref setters; prototype methods for lifecycle/watchers/methods.

3. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless renderer with `FunctionalComponentProps<Api>`.
   - Build BEM classes via `bem.forBlock('kol-$ARGUMENTS')`.
   - No side effects and no state mutation.

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/component.tsx`)
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`.
   - Extend `BaseWebComponent<Api>` and implement `WebComponentInterface<Api>`.
   - Create controller with `new Controller(this.stateAccess)`.
   - For every `@Prop()`: add matching `@Watch()` and initialize in `componentWillLoad()` (prop triangle).
   - Render with bare `<Host>` and pass normalized props via `this.ctrl.getRenderProp('key')`.

5. **Tests** (co-located next to `component.tsx`)
   - `snapshot.spec.tsx` via `executeSnapshotTests`.
   - `interaction.e2e.ts` only when interaction behavior justifies it.

### Phase 4: Remove Legacy Residue

- Delete orphaned files and obsolete wrappers.
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

Controllers receive bundled state access:

```typescript
export type StateAccess<Api extends ComponentApi> = {
	setState: SetStateFn<Api>;
	getState: GetStateFn<Api>;
};
```

Preferred web component pattern:

```typescript
export class KolMyComponent extends BaseWebComponent<MyApi> {
	private readonly ctrl = new MyController(this.stateAccess);
}

export class MyController extends BaseController<MyApi> {
	public constructor(stateAccess: StateAccess<MyApi>) {
		super(stateAccess, myPropsConfig);
	}
}
```

Stateless/sentinel pattern for composed or legacy controllers:

```typescript
private readonly ctrl = new MyController(BaseWebComponent.stateLess);
```

`BaseWebComponent.stateLess` throws on state access by design. Use it only for controllers that never call `setState`/`getState`.

---

## Conventions

- `shadow: true` for web components.
- No `class` attribute on `<Host>`.
- Underscored external props (`_name`, `_label`).
- Tests co-located with component files.
- No new barrel files.
- ARIA reference IDs (`aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns`) must be unique per instance, e.g.:
  - `private readonly myId = \`prefix-${nonce()}\``from`utils/dev.utils`.
- Do not add `data-testid` to component markup; use stable BEM selectors in tests.

---

## Common Pitfalls

### 1. Incomplete Prop Triangle

Every `@Prop()` needs all three:

- declaration
- matching `@Watch()`
- initialization forwarding in `componentWillLoad()`

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
Use `BaseWebComponent.stateLess`.

### 7. JSDoc Type Noise in TS

Do not add redundant `@param {}` / `@returns {}` JSDoc type annotations in TypeScript.

---

## Pre-Review Checklist

- [ ] Gap analysis completed and used as migration plan
- [ ] API uses `PropsConfigShape` + `ApiFromConfig`
- [ ] Controller extends `BaseController<Api>` and receives `StateAccess<Api>`
- [ ] Web component uses `new Controller(this.stateAccess)` or justified `BaseWebComponent.stateLess`
- [ ] Prop triangle complete for every `@Prop()`
- [ ] Functional component is stateless
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
