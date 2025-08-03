# Component Architecture Blueprint

## Design Philosophy

This skeleton demonstrates **Separation of Concerns** through layered architecture, where each layer has a single responsibility and clear boundaries.

## Layer Responsibilities

- **Web component** – public API surface. Incoming `@Prop` values are exposed with a leading `_` (e.g. `_count`) and mirrored to internal state fields without the underscore. `@Watch` decorators must observe the underscored props (for example `@Watch('_count')`) to normalise and validate external values before delegating to the controller.
- **Controller** – encapsulates business logic and state transitions. It coordinates prop watchers, updates render props via `setRenderPropsOrStates` and can compose other controllers for additional behaviour.
- **Functional component** – pure, stateless renderer that receives the current state snapshot together with callbacks, emitters and refs. It never mutates data and communicates through events.
- **Schema utilities** – prop type declarations plus `normalize*/validate*` helpers that keep domain rules close to the data model.

## Data Flow

1. External consumers set public props (`_count`, `_name`, `_show`, ...).
2. Prop watchers on the underscored fields invoke schema helpers to normalise and validate values.
3. The controller updates internal state or render props.
4. The functional component renders based on that state and emits events back to the outside.

This unidirectional flow keeps state predictable and makes cross‑layer responsibilities explicit.

## Architectural Patterns

### 1. Layered Architecture

- **Presentation Layer**: Stencil web components (public API)
- **Business Logic Layer**: Controllers (state management, validation)
- **Data Layer**: Functional components (pure rendering)

### 2. Composition over Inheritance

Controllers compose behavior rather than inheriting it. Each controller focuses on one responsibility and can be combined with others.

### 3. Immutable Data Flow

Data flows only from the public API towards the renderer. There are no backwards mutations; controllers toggle state by replacing values.

### 4. Type Safety Boundaries

Generic types enforce compile‑time guarantees about render props, eliminating defensive programming in functional components.

## Implementation Concepts

### State Ownership Principle

Web components own state, controllers manage state transitions, functional components consume state. This creates clear ownership boundaries and predictable data flow.

### Event-Driven Communication

Components communicate through events rather than direct coupling, maintaining loose coupling and enabling composition.

### Declarative Rendering

Functional components receive complete state snapshots and render declaratively, eliminating imperative DOM manipulation.

### Watcher Placement

Attach `@Watch` only to the underscored public props (`_count`, `_name`, `_show`, ...). Internal state fields like `count`, `name`, `show` or `label` stay undecorated because watchers do not trigger on plain class properties.

### Controller Initialization Pattern

Web components must initialize controllers by passing current render props to ensure proper state setup:

```typescript
public componentWillLoad(): void {
  this.controller.componentWillLoad({
    count: this.count,
    label: this.label,
    name: this.name,
    show: this.show,
  });
}
```

This ensures controllers receive the complete current state before any external prop changes occur.

## Design Patterns

### Generic Type System

The component uses generic interfaces to enforce **compile-time contracts**. This eliminates runtime errors by ensuring all required properties have defaults before rendering.

### Controller Pattern

Controllers implement the **Single Responsibility Principle**. Each controller manages one aspect of component behavior (state, validation, DOM refs) and can be composed together.

### Functional Component Architecture

Rendering logic lives in **pure functions** that receive immutable props. This enables predictable output, easy testing, and better performance through memoization.

## Usage Example

```html
<kol-skeleton _count="42" _name="Example" _show="true"></kol-skeleton>
```

The component demonstrates how web standards (Custom Elements, Shadow DOM) can be enhanced with modern TypeScript patterns to create maintainable, type-safe UI components.
