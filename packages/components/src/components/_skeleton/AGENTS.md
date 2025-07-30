### Overview

This folder provides a minimal but fully functional example component. It shows
how a Stencil web component in KoliBri is organised and can be used as a
blueprint when implementing new components.

### Component architecture

The following guidelines define how we structure component state and properties:

- Create a state variable only when a property has a direct and atomic effect on rendering.
- When several properties form one logical state, combine them into a single state variable, either as a primitive value or an object.
- Each property may implement `normalizeProperty` and `validateProperty`; call these from the property's `Watch` method.
- Stateless internal functional components receive props that mirror the web component's state. These props use the same names as the state variables (e.g., `stateA`). They are invoked from the web component's private `render()` method and never inherit from the web component.
- Complex interactions can be handled inside a component controller. The controller follows the composition pattern and is created by the component.
- All controllers inherit from a common `BaseController` that exposes a `setState()` helper mirroring Stencil's state mechanism. After normalizing and validating incoming props, a controller updates the web component by calling this method, which triggers a rerender.
- A minimal implementation looks like this:

```ts
import type { Generic } from 'adopted-style-sheets';
import { setState } from './schema';

export abstract class BaseController<State> {
	protected readonly component: Generic.Element.Component & State;

	protected constructor(component: Generic.Element.Component & State) {
		this.component = component;
	}

	protected setState<K extends keyof State>(prop: K, value: State[K]) {
		setState(this.component, prop as string, value);
	}
}
```

- A web component may compose multiple functional components, each with its own controller for handling logic. The controllers and functional components share an interface describing the state they operate on. All rendering happens inside the functional components which receive the state via props.
- Each functional component receives an immutable instance of its state controller. If the controller exposes several independent values, you may also pass those states individually to the functional component instead of the whole controller.

The following class diagram shows how a web component exposes public
properties while maintaining its state in private variables. Every web
component in KoliBri always attaches a ShadowRoot. The component passes its
state to a stateless functional component for rendering.

```mermaid
classDiagram
    class WebComponent {
        +stateA
        +stateB
        -stateA
        -stateB
        -render()
    }
    class BaseController {
        +setState()
    }
    class ComponentControllerA {
    }
    class ComponentControllerB {
    }
    BaseController <|-- ComponentControllerA
    BaseController <|-- ComponentControllerB
    class FunctionalComponentA {
        +stateA
        +stateB
        <<stateless>>
    }
    class FunctionalComponentB {
        +stateA
        +stateB
        <<stateless>>
    }
    WebComponent *-- ComponentControllerA : composes
    WebComponent *-- ComponentControllerB : composes
    WebComponent --> FunctionalComponentA : calls in render
    WebComponent --> FunctionalComponentB : calls in render
```

### File layout

- `component.tsx` – Stencil web component managing state and watchers.
- `internal/functional-components` – stateless React-like component and its controller.
  - `component.tsx` – functional component rendering the template and declaring the shared `SkeletonState` interface.
  - `controller.ts` – logic for normalizing, validating and updating state via `BaseController`.
  - `schema/props` – property types with `normalize*` and `validate*` helpers.

### Implementation pattern

1. Declare public properties with `@Prop` and mirror them to private state using `@State` variables named `<prop>State`.
2. Implement a `@Watch` method for each property. Normalize and validate the value inside the watcher and, if valid, call `controller.setState()`.
3. The controller only updates state via `setState()` and exposes no watcher methods.
4. `render()` only delegates to the functional component, passing the current state as props.
5. All rendering happens in the functional component which must remain stateless.
6. Define the component's state interface next to the functional component and implement it in the web component class so Stencil knows which `@State` variables exist.

All watcher methods share a generic `WatchCallback<T>` type defined as `(value?: T) => void`.
Components can implement a `ComponentWatchers<Props>` interface to type their watcher methods based on the public properties.
