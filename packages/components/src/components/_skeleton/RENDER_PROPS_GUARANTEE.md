# Render Props Garantie durch Generic Types

## Problem

In Web Components musste sichergestellt werden, dass alle renderProps immer initiale Werte haben, auch wenn die entsprechenden `@Prop` Werte `undefined` oder ungültig sind.

## Lösung

Durch die Einführung des `RequiredRenderProps<T>` Type wird auf Type-Ebene sichergestellt, dass alle renderProps non-undefined und non-null sind:

```typescript
/**
 * Ensures that all render props have non-undefined values by requiring initial defaults.
 *
 * @template RenderProps - The render props that must be guaranteed to have values.
 */
type RequiredRenderProps<RenderProps> = {
	[K in keyof RenderProps]-?: NonNullable<RenderProps[K]>;
};
```

## Implementierung

### 1. WebComponentInterface

```typescript
export type WebComponentInterface<State, Props, Emitters, Methods, Listeners> = {
	componentWillLoad(): void;
} & ComponentProps<Props> &
	ComponentWatchers<Props> &
	RequiredRenderProps<State> & // ← Statt nur 'State'
	WebComponentEmitters<Emitters> &
	ComponentMethods<Methods> &
	ComponentListeners<Listeners>;
```

### 2. FunctionalComponentProps

```typescript
export type FunctionalComponentProps<Props, Callbacks, Emitters, Refs> = RequiredRenderProps<Props> & // ← Statt nur 'Props'
	ComponentCallbacks<Callbacks> &
	ComponentRefs<Refs> &
	FunctionalComponentEmitters<Emitters>;
```

### 3. ControllerInterface

```typescript
export type ControllerInterface<RenderProps, Callbacks, Refs, Methods, Listeners> = {
	componentWillLoad(props: RequiredRenderProps<RenderProps>): void; // ← Garantierte Werte
} & ComponentWatchers<RenderProps> &
	ControllerCallbackHandlers<Callbacks> &
	ControllerRefSetters<Refs> &
	ControllerMethods<Methods> &
	ControllerListeners<Listeners>;
```

## Wirkung

### Compile-Zeit Garantie

```typescript
export class KolSkeleton implements WebComponentInterface<SkeletonRenderProps, Props> {
	// ✅ MUSS einen initialen Wert haben
	public label: LabelPropType = 'Label';

	// ❌ Compile-Fehler ohne Default-Wert
	// public label: LabelPropType;
	//              ^^^^^^^^^^^^^
	// Property 'label' has no initializer and is not definitely assigned in the constructor.
}
```

### Type-Safety in Functional Components

```typescript
export const SkeletonFC: FC<Props> = ({
	count,  // ← Garantiert number (nicht undefined)
	label,  // ← Garantiert string (nicht undefined)
	name,   // ← Garantiert string (nicht undefined)
	show    // ← Garantiert boolean (nicht undefined)
}) => {
	// Alle Props sind garantiert definiert - kein defensive coding nötig
	return <div>Count: {count}</div>;
};
```

## Vorteile

1. **Compile-Zeit Sicherheit**: TypeScript verhindert vergessene Default-Werte
2. **Runtime Garantie**: Alle renderProps haben immer gültige Werte
3. **Keine defensive Programmierung**: Functional Components müssen nicht auf `undefined` prüfen
4. **Selbst-dokumentierend**: Type-System macht Anforderungen explizit
5. **Refactoring-sicher**: Änderungen an Props führen zu Compile-Fehlern wenn Defaults fehlen

## Architektur-Prinzip

Die Generic Types erzwingen die Regel: **"Web Components müssen für alle renderProps Default-Werte bereitstellen"**

Dies geschieht:

- Zur **Compile-Zeit** durch TypeScript Constraints
- **Ohne Runtime-Overhead**
- **Unabhängig** von der Implementierung der Normalisierung/Validierung
