# Skeleton Blueprint Architecture (arc42)

## 1. Introduction and Goals

The `kol-skeleton` component blueprint demonstrates how KoliBri web components can be built in a highly maintainable and decoupled fashion. It is designed as a minimal, yet complete, reference implementation for new components.

Representative code artifacts for each layer and their responsibilities:

- [Web component](./web-components/skeleton/component.tsx) – defines the public API, owns lifecycle hooks and bridges DOM events to controller callbacks.
- [Controller](./internal/functional-components/skeleton/controller.ts) – implements state transitions, validation orchestration and exposes render props.
- [Renderer](./internal/functional-components/skeleton/component.tsx) – stateless view that renders solely based on the controller-provided props.
- [Schema helpers](./internal/schema/props) – house prop types, normalisation and validation helpers shared across layers.

Primary goals:

- illustrate separation of concerns for long-term maintainability
- enable replacement or extension of layers without cascading changes
- enforce consistent validation and type-safety boundaries
- document an end-to-end implementation pipeline that teams can replicate when bootstrapping new components

### Blueprint Layout

The skeleton mirrors the structure recommended for production-ready components. Each folder holds a single responsibility to make the pipeline explicit:

```text
_skeleton/
├── web-components/
│   └── skeleton/              # Custom element definition
│       └── component.tsx      # Prop watchers and lifecycle management
├── internal/
│   ├── functional-components/
│   │   ├── skeleton/          # Skeleton-specific logic
│   │   │   ├── api.tsx        # Type definitions
│   │   │   ├── component.tsx  # Stateless functional component
│   │   │   └── controller.ts  # State transitions and validation
│   │   ├── click-button/      # Reusable button behaviour
│   │   ├── base-controller.ts # Shared controller logic
│   │   └── generic-types.ts   # Interface contracts
│   └── schema/
│       └── props/             # Prop types, normalisation and validation
└── ARC42.md                   # This document
```

This modular layout is the backbone for the architectural patterns described in the following chapters.

### Usage Example

```html
<kol-skeleton _count="42" _name="Example"></kol-skeleton>
```

## 2. Architecture Constraints

- **Stencil** is used for authoring web components with **shadow: true** only (Shadow DOM enabled for style isolation).
- Components without Shadow DOM (`shadow: false`) are implemented as **Functional Components** instead of web components to avoid style conflicts and reduce maintainability burden.
- Components must compile to framework-agnostic Custom Elements.
- Public API properties use an underscored naming convention (e.g. `_count`) to separate external inputs from internal state.
- Documentation and code follow the `KoliBri` casing and repository conventions.

## 3. Context and Scope

The skeleton lives inside `packages/components` and does not depend on runtime frameworks. External consumers interact through HTML attributes or DOM APIs.

**Shadow DOM Strategy**: KoliBri exclusively uses Web Components with Shadow DOM enabled (`shadow: true`). This ensures:

- **Style Isolation**: Component styles cannot leak into host page styles and vice versa
- **Encapsulation**: Components maintain consistent appearance regardless of host environment
- **Maintainability**: Clear boundaries prevent unintended style interactions

Components that historically did not use Shadow DOM (`shadow: false`) are being migrated to **Functional Components** instead, which can be composed into other components without Shadow DOM overhead while maintaining clean architectural separation.

```mermaid
flowchart LR
    Consumer[External Consumer] --> WC[Web Component]
    WC --> Controller
    Controller -.-> Schema[Schema Helpers]
    WC --> Renderer[Functional Component]
    Renderer --> WC
    WC --> Consumer
```

The external consumer interacts solely with the custom element. The web component delegates normalisation and state transitions
to the controller, which in turn consults the schema helpers. Rendering is handed off to the stateless functional component, the
resulting DOM is patched back into the web component and finally exposed to the consumer. Each arrow in the diagram corresponds
to an explicit TypeScript contract, ensuring that integration points are discoverable and type safe.

## 4. Solution Strategy

The blueprint enforces unidirectional data flow and delegates responsibilities to isolated layers. Implementation-wise, each layer exposes a narrow API so that downstream code can be reasoned about in isolation.

### Web Component Layer

- Declares the public API using underscored props (e.g. `_count`).
- Hosts lifecycle hooks and ties DOM events to controller callbacks.
- Owns the Stencil-specific decorators (`@Prop`, `@Event`, `@Watch`). Watchers normalise incoming values and forward them to the controller.
- Holds normalised data in simple fields (`count`, `name`) instead of `@State` to keep Stencil re-rendering efficient.
- Mirrors validated props into these simple fields from the corresponding `@Watch` handlers so that the renderer and controller can rely on readily available, normalised values on the component instance.
- Delegates rendering to the controller output via `controller.getProps()`.
- Renders the functional component always wrapped in a bare `<Host>` element without redundant class attributes (no `<Host class="kol-component-name">`). **All web components use shadow DOM (shadow: true) to ensure style isolation and prevent CSS conflicts** with host page styles. The shadow DOM handles styling isolation; the host tag name itself is sufficient for component identification.
- **Components that should not use Shadow DOM are implemented as Functional Components instead** (not web components), avoiding complexity and ensuring clean style boundaries.

### Controller Layer

- Encapsulates business rules, validation orchestration and derived state.
- Implements `componentWillLoad` to bootstrap its internal state from the current prop snapshot.
- Exposes watcher entry points (`watchCount`, `watchName`, …) that receive raw values, request normalisation/validation from the schema helpers and update internal state accordingly.
- Provides render props via `getProps()` so the view layer operates on a single immutable snapshot.
- Composes other controllers (e.g. the click button behaviour) to reuse established logic across components.

#### Event Handler Policy

- **Controller methods stay as prototype methods** so they are allocated once by the JS engine and stay performant across hundreds of instances.
- When a controller method is handed to JSX/TSX (for example the `handleClick` callback consumed by `SkeletonFC`) the renderer wraps it once in a short arrow (`<SkeletonFC handleClick={(event) => this.ctrl.handleClick(event)} />`) so no `.bind(this)` is needed in the render tree and the controller still executes with the correct context.

This keeps the controller code lean while keeping the renderer integration simple and aligned with the Skeleton blueprint.

### Functional Component Layer

- Is a pure renderer that receives props, callbacks, emitters and refs from the controller.
- Avoids any side effects or state mutation. User interactions are signalled via DOM events which bubble back to the web component.
- Maps controller props to accessible markup and wires refs for imperative access when required.

### Schema Helper Layer

- Co-locates type definitions, normalisation and validation rules for every prop.
- Provides `Prop<TExternal, TInternal, K>` to encode both external and internal types in a single generic.
- Provides `SimpleProp<T, K>` shorthand when both types are identical.
- `PropDefinition<TExternal, TInternal>` defines `normalize` (TExternal → TInternal) and `validate` (TInternal → boolean).
- `withValidPropValue` combines normalization and validation into a single call, ensuring callbacks only receive type-safe internal values.
- `InternalOf<P>` and `ExternalOf<P>` utility types extract the correct type for each architectural layer automatically.

The contracts between layers are formalized through TypeScript interfaces defined in [`generic-types.ts`](./internal/functional-components/generic-types.ts). These generics (`WebComponentInterface`, `ControllerInterface` and `FunctionalComponentProps`) guarantee that components share a consistent shape for props, callbacks, emitters and refs, enabling safe refactoring and reuse across the monorepo.

### Methods and Automatic Promise Wrapping

Stencil requires that all public `@Method()` decorated methods return a `Promise`. To keep API definitions concise and focused on business semantics, `ComponentApi` allows method signatures to be defined with plain return types:

```ts
// API definition — simple, no Promise required
Methods: {
  focus: () => void;
  getValue: () => number;
};
```

The `PromiseMethod<Methods>` utility type in `generic-types.ts` automatically wraps each method's return type in `Promise<T>`. This transformation is applied through `ComponentMethods` which feeds into `WebComponentInterface`, so the resolved web component type correctly requires:

```ts
// Resolved in WebComponentInterface — automatically Promise-wrapped
focus: () => Promise<void>;
getValue: () => Promise<number>;
```

`ControllerInterface` intentionally does **not** apply `PromiseMethod` wrapping. Controllers implement methods with their plain return types (`void`, `number`, etc.) since the `async`/`Promise.resolve()` wrapping happens at the web component layer:

```ts
// Controller — plain return type
public focus(): void {
  this.buttonRef?.focus();
}

// Web Component — wraps the controller call
@Method()
public async focus(): Promise<void> {
  return Promise.resolve(this.ctrl.focus());
}
```

This separation ensures that:

- API definitions remain clean and declarative
- Controllers stay synchronous and testable
- Web components satisfy the Stencil `@Method()` Promise requirement automatically
- `Awaited<R>` is used internally for idempotency — writing `() => Promise<void>` in the API still resolves to `Promise<void>`, not `Promise<Promise<void>>`

### Implementation Flow

1. **Initialisation** – `componentWillLoad` forwards the current prop snapshot to the controller, ensuring that internal state reflects external values before the first render.
2. **Prop updates** – `@Watch` handlers receive raw values, delegate normalisation/validation to schema helpers via the controller and update the controller state.
3. **Rendering** – The web component retrieves the immutable render props from the controller and feeds them into the functional component.
4. **User interaction** – The functional component emits DOM events (for example button clicks). The web component wires these events back into controller callbacks so state transitions remain encapsulated.

This pipeline makes the execution order explicit and provides guardrails for future contributors.

### Props Pattern

A critical design principle is that **functional components always render using Props**, which are either:

1. **Normalized and validated external props** - incoming props that have been processed through schema helpers
2. **Internal component state** - derived or computed values managed by the controller

This ensures that the renderer never works with raw, unvalidated data. All values passed to the functional component have been through the controller's validation pipeline, maintaining type safety and data integrity throughout the rendering process.

**Props must always be initialized** before being passed to the functional component. This prevents rendering with undefined or uninitialized values and ensures that the component can safely render at any point in its lifecycle without encountering unexpected undefined states.

This strategy yields strong decoupling so that each layer can evolve independently. New components can adopt the same structure by copying the skeleton and replacing the domain-specific pieces while keeping the architectural seams intact.

### Watcher Example

Incoming props are normalised in dedicated watchers before reaching the controller.
Props can define different external and internal types – the external type supports
shorthand values (e.g. `_count="42"`), while the controller always works with the
normalized internal type:

```ts
// Prop definition (internal/schema/props/count.ts)
type CountProp = Prop<number | string, number, 'count'>;
//                     └─ external         └─ internal
const countProp = createPropDefinition<number | string, number>(
	normalizeInteger, // (number | string | undefined) → number
	(v) => v >= 0, // validates the internal type
);
```

```ts
// Web Component (web-components/skeleton/component.tsx)
@Prop()
public _count?: number | string; // External type

@Watch('_count')
public watchCount(value?: number | string): void {
  this.ctrl.watchCount(value);
}
```

```ts
// Controller (internal/functional-components/skeleton/controller.ts)
public watchCount(value?: number | string): void {
  withValidPropValue(countProp, value, (v) => {
    // v is number (internal type), guaranteed by normalize + validate
    this.setProp('count', v);
    this.setState('count', v);
  });
}
```

See the [controller](./internal/functional-components/skeleton/controller.ts) for the complete validation logic.

### Controller Initialization

Web components must initialise controllers by passing the current props to ensure proper state setup.
The `componentWillLoad` method receives `ResolvedInputProps`, which uses the **external** types:

```ts
// Web Component
public componentWillLoad(): void {
  this.ctrl.componentWillLoad({
    count: this._count, // number | string (external type)
    name: this._name,   // string
  });
}
```

```ts
// Controller
public componentWillLoad(props: ResolvedInputProps<SkeletonApi>): void {
  const { count, name } = props;
  this.watchCount(count);  // normalizes to internal type
  this.watchName(name);
  this.watchLabel(this.component.label);
}
```

This ensures controllers receive the complete current state before any external prop changes occur.

## 5. Building Block View

```mermaid
classDiagram
    direction LR
    class WebComponent {
        +componentWillLoad()
        +watchCount()
        +render()
    }
    class SkeletonController {
        +componentWillLoad()
        +watchCount()
        +watchName()
        +getProps()
    }
    class SkeletonFC {
        +render(props)
    }
    class SchemaHelpers {
        +normalizeCount()
        +validateCount()
        +normalizeName()
        +validateName()
    }
    class ClickButtonController {
        +getProps()
    }
    WebComponent ..> SkeletonController : delegates state
    WebComponent --> SkeletonFC : renders with props
    SkeletonController ..> SchemaHelpers : uses
    SkeletonController o--> ClickButtonController : composes
```

**Web component** – implements `WebComponentInterface`, owns the lifecycle and keeps normalised state fields. It simply passes watcher updates and render requests through to the controller.

**SkeletonController** – implements `ControllerInterface`, coordinates validation through the schema helpers and exposes immutable render props.

**SkeletonFC** – implements `FunctionalComponentProps`, receives the render props and produces JSX without touching state.

**Schema helpers** – provide deterministic data normalisation and validation functions that can be reused by other controllers as well.

**ClickButtonController** – exemplifies composition. Its props are merged into the skeleton controller so common behaviour (e.g. button handling) can be reused without inheritance.

## 6. Runtime View

The following sequence demonstrates how an external update is normalised and validated before it propagates through the layers.

```mermaid
sequenceDiagram
    participant U as User
    participant WC as WebComponent
    participant CTRL as Controller
    participant FC as FunctionalComponent
    participant S as Schema
    U->>WC: set attribute _count="5"
    WC->>CTRL: watchCount(\"5\")
    CTRL->>S: normalize(\"5\")
    S-->>CTRL: 5 (number)
    CTRL->>S: validate(5)
    S-->>CTRL: true
    CTRL->>WC: update count = 5
    WC->>FC: render(renderProps)
    FC-->>WC: markup
    WC-->>U: updated DOM
    Note over S,CTRL: normalize converts TExternal to TInternal
    Note over FC,WC: renderProps contain normalized/validated data or internal state
```

This runtime view highlights how watchers pass external values to the controller
for normalization and validation before any rendering occurs. Only after the
controller updates internal state does the web component invoke the functional
component, patch the returned markup and expose the updated DOM to the user.

## 7. Deployment View

The skeleton ships as part of the `@public-ui/components` package. During build the Stencil compiler produces framework-agnostic bundles ready for distribution via npm or CDN.

## 8. Cross-cutting Concepts

| Concept                          | Description                                                                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Composition over inheritance** | Controllers compose behaviour (e.g. `ClickButtonController`) rather than relying on inheritance.                                                                      |
| **Declarative rendering**        | Functional components are pure and stateless.                                                                                                                         |
| **Decoupling**                   | Each layer only knows its direct neighbours. Controllers can be reused or replaced without altering renderers or schemas.                                             |
| **Event-driven communication**   | User interaction is emitted as DOM events rather than calling functions across layers.                                                                                |
| **Props Pattern**                | Functional components exclusively receive Props that contain either normalized/validated external data or internal component state. Props must always be initialized. |
| **Shadow DOM First**             | All web components use `shadow: true`. Components that should not use Shadow DOM are implemented as Functional Components instead.                                    |
| **State ownership**              | Web components own state (`@State`), controllers manage transitions, functional components consume state.                                                             |
| **Template Method Pattern**      | The WebComponent defines the lifecycle structure, while the Controller implements specific business logic steps.                                                      |
| **Type safety**                  | `WebComponentInterface`, `ControllerInterface` and `FunctionalComponentProps` encode compile-time contracts between layers.                                           |
| **Watcher placement**            | Attach `@Watch` only to underscored public props (`_count`); internal state fields use `@State`.                                                                      |

## 9. Design Decisions

1. **Underscored public props**
   - _Alternative_: mirror external props directly without underscores.
   - _Reason_: underscores make the separation between public API and internal state explicit.
2. **Shadow DOM enabled for all web components (shadow: true)**
   - _Alternative_: allow some components to have `shadow: false`.
   - _Reason_: Shadow DOM ensures consistent style isolation and prevents CSS conflicts from host page styles. This eliminates a category of hard-to-debug styling issues and maintains strong encapsulation boundaries.
3. **Functional Components for non-Shadow-DOM use cases**
   - _Alternative_: implement components without Shadow DOM as web components with `shadow: false`.
   - _Reason_: Components without Shadow DOM requirements are cleaner and more maintainable as pure Functional Components. This avoids the complexity of managing style pollution in web components while maintaining consistent architecture for components that do require Shadow DOM.
4. **Centralised validation in the controller**
   - _Alternative_: perform validation inside prop watchers.
   - _Reason_: keeping validation in the controller makes testing and reuse easier.
5. **Functional component rendering**
   - _Alternative_: render JSX directly inside the web component class.
   - _Reason_: a pure renderer improves testability and eliminates side effects.
6. **Generic interface contracts**
   - _Alternative_: rely on ad-hoc typing per component.
   - _Reason_: shared interfaces keep props, callbacks, emitters and refs uniform across components, making controllers and renderers interchangeable.
7. **Stateful controllers over stateless proxies**
   - _Alternative_: instantiate a single stateless controller and provide proxy functions in the web component layer for each business function so the web component instance can be passed into the controller rather than the other way round.
   - _Reason_: every business function would need such a proxy, creating significant boilerplate and reducing readability when implementing multiple components. The marginal benefit of reusing a single controller instance does not justify this complexity, so controllers remain stateful.
8. **Direct assignment instead of prop-to-state mapping**
   - _Alternative_: map validated props to `@State` fields and read from there.
   - _Reason_: mapping to `@State` triggers two re-renderings in Stencil. Assigning props to plain fields after validation and handing them to the functional component results in at most one batched re-render per change.
9. **Host element without redundant class attribute**
   - _Alternative_: add component name as class attribute to `<Host>` (e.g. `<Host class="kol-skeleton">`).
   - _Reason_: the tag name alone (e.g. `<kol-skeleton>`) is sufficient for styling and component identification. Shadow DOM already provides style isolation. Redundant classes add noise and complicate selectors in theme files without additional benefit. The functional component is always wrapped inside the bare `<Host>` element.

## 10. Quality Requirements

- Maintainability: isolated layers and type-safety reduce the cost of change.
- Reliability: schema helpers validate every external value before it mutates state.
- Testability: controllers and functional components can be unit tested in isolation.
- Performance: **Optimized re-rendering strategy** - public props (with underscore) are normalized and validated, then assigned to internal fields (without underscore). This ensures only one re-render is triggered per prop change. State changes also trigger explicit re-rendering only when necessary, minimizing unnecessary render cycles. **Stencil's batching mechanism** automatically batches multiple prop or state changes that occur "simultaneously" into a single re-render, further optimizing performance even when multiple values change at once.
- Accessibility: follow repository-wide a11y presets and avoid title attributes in favour of `KolTooltip`.
- Security: avoid direct DOM injection; rely on typed props and controller validation to prevent XSS.

## 11. Risks and Technical Debt

- Over-engineering for simple components may increase boilerplate.
- Controllers may grow complex if multiple concerns are mixed; composition patterns should be followed strictly.

## 12. Glossary

| Term                     | Definition                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **BEM**                  | Block Element Modifier naming convention for CSS class names.                                                   |
| **Controller**           | Orchestrates state transitions and validation; extends `BaseController`.                                        |
| **Functional Component** | Pure renderer without side effects that exclusively works with Props.                                           |
| **Props**                | Normalized and validated props or internal state passed to functional components. Must always be initialized.   |
| **Schema Helper**        | Utility providing `normalize` (TExternal → TInternal) and `validate` (TInternal → boolean) functions for props. |
| **Stencil**              | Compiler for building framework-agnostic web components.                                                        |
| **Watch Decorator**      | Stencil decorator (`@Watch`) that observes prop changes.                                                        |
