# Skeleton Blueprint Architecture (arc42)

## 1. Introduction and Goals

The `kol` skeleton component blueprint demonstrates how KoliBri web components can be built in a highly maintainable and decoupled fashion. It is designed as a minimal, yet complete, reference implementation for new components.

Representative code artifacts for each layer:

- [Web component](./web-components/skeleton/component.tsx) – public API and watchers
- [Controller](./internal/functional-components/skeleton/controller.ts) – business logic
- [Renderer](./internal/functional-components/skeleton/component.tsx) – stateless view
- [Schema helpers](./internal/schema/props) – prop types and validation

Primary goals:

- illustrate separation of concerns for long-term maintainability
- enable replacement or extension of layers without cascading changes
- enforce consistent validation and type-safety boundaries

## 2. Architecture Constraints

- **Stencil** is used for authoring web components.
- Components must compile to framework-agnostic Custom Elements.
- Public API properties use an underscored naming convention (e.g. `_count`) to separate external inputs from internal state.
- Documentation and code follow the `KoliBri` casing and repository conventions.

## 3. Context and Scope

The skeleton lives inside `packages/components` and does not depend on runtime frameworks. External consumers interact through HTML attributes or DOM APIs.

```mermaid
flowchart LR
    Consumer[External Consumer] --> WC[Web Component]
    WC --> Controller
    Controller --> Renderer[Functional Component]
    Renderer --> Consumer
    WC -.-> Schema[Schema Helpers]
    Controller -.-> Schema
```

## 4. Solution Strategy

The blueprint enforces unidirectional data flow and delegates responsibilities to isolated layers:

- Web components expose a stable public API and mirror underscored props to private fields.
- Controllers own business logic, normalization and validation.
- Functional components render pure JSX based on provided props.
- Schema helpers define canonical prop types and validation rules close to the data model.

This strategy yields strong decoupling so that each layer can evolve independently.

### Watcher Example

Incoming props are normalised in dedicated watchers before reaching the controller:

```ts
@Watch('_count')
public watchCount(value?: CountPropType): void {
  this.controller.watchCount(value);
}
```

See the [controller](./internal/functional-components/skeleton/controller.ts) for the corresponding validation logic.

## 5. Building Block View

```mermaid
classDiagram
    class WebComponent {
        +_count : number
        +watchCount()
    }
    class Controller {
        +watchCount(value)
        +handleClick()
    }
    class FunctionalComponent {
        +render()
    }
    class SchemaHelpers {
        +normalizeCount()
        +validateCount()
    }
    WebComponent --> Controller
    Controller --> FunctionalComponent
    WebComponent ..> SchemaHelpers
    Controller ..> SchemaHelpers
```

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
    WC->>CTRL: watchCount(5)
    CTRL->>S: normalizeCount(5)
    S-->>CTRL: 5
    CTRL->>S: validateCount(5)
    S-->>CTRL: ok
    CTRL->>WC: update count
    WC->>FC: render(count)
    FC-->>U: updated markup
```

## 7. Deployment View

The skeleton ships as part of the `@public-ui/components` package. During build the Stencil compiler produces framework-agnostic bundles ready for distribution via npm or CDN.

## 8. Cross-cutting Concepts

- **Decoupling**: Each layer only knows its direct neighbours. Controllers can be reused or replaced without altering renderers or schemas.
- **Event-driven communication**: User interaction is emitted as DOM events rather than calling functions across layers.
- **Type safety**: Generics enforce compile-time contracts between components and controllers.

## 9. Design Decisions

1. **Underscored public props**
   - _Alternative_: mirror external props directly without underscores.
   - _Reason_: underscores make the separation between public API and internal state explicit.
2. **Centralised validation in the controller**
   - _Alternative_: perform validation inside prop watchers.
   - _Reason_: keeping validation in the controller makes testing and reuse easier.
3. **Functional component rendering**
   - _Alternative_: render JSX directly inside the web component class.
   - _Reason_: a pure renderer improves testability and eliminates side effects.

## 10. Quality Requirements

- Maintainability: isolated layers and type-safety reduce the cost of change.
- Reliability: schema helpers validate every external value before it mutates state.
- Testability: controllers and functional components can be unit tested in isolation.
- Performance: stateless rendering and minimal watchers reduce unnecessary work.
- Accessibility: follow repository-wide a11y presets and avoid title attributes in favour of `KolTooltip`.
- Security: avoid direct DOM injection; rely on typed props and controller validation to prevent XSS.

## 11. Risks and Technical Debt

- Over-engineering for simple components may increase boilerplate.
- Controllers may grow complex if multiple concerns are mixed; composition patterns should be followed strictly.

## 12. Glossary

- **Controller** – orchestrates state transitions and validation.
- **Functional Component** – pure renderer without side effects.
- **Schema Helper** – utility providing normalization and validation functions.
- **Watch Decorator** – Stencil decorator that observes prop changes.
- **Stencil** – compiler for building framework-agnostic web components.
- **BEM** – Block Element Modifier naming convention for CSS class names.
