# Generische Typen des Skeleton-Beispiels

## Worum geht's?

Diese Übersicht erklärt alle generischen Helfertypen, die im Skeleton-Verzeichnis verwendet werden, um Props, Events und Controller typisiert zu verbinden.

Die Typdefinitionen sind in [`internal/functional-components/generic-types.ts`](internal/functional-components/generic-types.ts) mit JSDoc kommentiert.

## Wann verwenden

Wenn neue Komponenten nach dem Skeleton-Muster entstehen, liefern die folgenden Typen wiederverwendbare Bausteine für ein konsistentes API.

## Voraussetzungen

- Grundkenntnisse in TypeScript-Generics
- Überblick über die Ordnerstruktur des Skeleton-Beispiels

## Anleitung

| Name                                                                                | Parameter (Constraint)                   | Zweck                                          | Einsatzstellen                                                |
| ----------------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| `Callback<T>`                                                                       | `T`                                      | Rückruffunktion für Watcher                    | `internal/functional-components/generic-types.ts:12`          |
| `ComponentCallbacks<Callbacks>`                                                     | `Callbacks`                              | leitet Methodenpräfix `handle` ab              | `internal/functional-components/generic-types.ts:19`          |
| `WebComponentEmitters<Emitters>`                                                    | `Emitters`                               | erstellt EventEmitter-Eigenschaften            | `internal/functional-components/generic-types.ts:28`          |
| `FunctionalComponentEmitters<Emitters>`                                             | `Emitters`                               | erzeugt `on*`-Emitter für Funktionskomponenten | `internal/functional-components/generic-types.ts:37`          |
| `ComponentProps<Props>`                                                             | `Props`                                  | wandelt öffentliche Props in `_`-Varianten um  | `internal/functional-components/generic-types.ts:46`          |
| `ComponentRefs<Refs>`                                                               | `Refs`                                   | erzeugt `ref*`-Setter                          | `internal/functional-components/generic-types.ts:55`          |
| `ComponentWatchers<Props>`                                                          | `Props`                                  | generiert `watch*`-Methoden                    | `internal/functional-components/generic-types.ts:64`          |
| `WebComponentInterface<State, Props, Emitters>`                                     | `State`, `Props`, `Emitters`             | Basisinterface für Web Components              | `internal/functional-components/generic-types.ts:75`          |
| `FunctionalComponentProps<Props, Callbacks, Emitters, Refs>`                        | `Props`, `Callbacks`, `Emitters`, `Refs` | kombiniert Props, Callbacks, Refs und Emitter  | `internal/functional-components/generic-types.ts:92`          |
| `ControllerCallbackHandlers<Callbacks>`                                             | `Callbacks`                              | leitet `handle*`-Funktionen ab                 | `internal/functional-components/generic-types.ts:102`         |
| `ControllerRefSetters<Refs>`                                                        | `Refs`                                   | erzeugt `set*Ref`-Funktionen                   | `internal/functional-components/generic-types.ts:111`         |
| `ControllerInterface<RenderProps, Callbacks, Refs>`                                 | `RenderProps`, `Callbacks`, `Refs`       | Vertrag für Controller                         | `internal/functional-components/generic-types.ts:122`         |
| `BaseController<Host>`                                                              | `Host`                                   | liefert `setRenderPropsOrStates`               | `internal/functional-components/base-controller.ts:1`         |
| `ClickButtonController<Host extends WebComponentInterface<ClickButtonRenderProps>>` | `Host`                                   | Controller der Unterkomponente                 | `internal/functional-components/click-button/controller.ts:7` |
| `SkeletonController<Host extends WebComponentInterface<SkeletonRenderProps>>`       | `Host`                                   | Controller der Hauptkomponente                 | `internal/functional-components/skeleton/controller.ts:11`    |

## Beispiele

```ts
// Callback
const log: Callback<string> = (value) => console.log(value);

// ComponentCallbacks / ControllerCallbackHandlers
type Handlers = ComponentCallbacks<{ click: () => void }>;
// => { handleClick: () => void }

// ComponentProps / ComponentRefs / ComponentWatchers
type Props = ComponentProps<{ name: string }>;
// => { _name: string }
type Refs = ComponentRefs<{ button: HTMLButtonElement }>;
// => { refButton: (el?: HTMLButtonElement) => void }
type Watchers = ComponentWatchers<{ name: string }>;
// => { watchName: Callback<string> }

// WebComponentEmitters / FunctionalComponentEmitters
type Emitters = WebComponentEmitters<{ loaded: number }>;
// => { loaded: EventEmitter<number> }
type FCEmitters = FunctionalComponentEmitters<{ loaded: number }>;
// => { onLoaded: EventEmitter<number> }

// WebComponentInterface
class MyCmp implements WebComponentInterface<{ count: number }, { count: number }, { loaded: number }> {
	componentWillLoad(): void {}
	_count = 0;
	watchCount = (value?: number): void => {};
	loaded!: EventEmitter<number>;
	count = 0;
}

// FunctionalComponentProps
type FCProps = FunctionalComponentProps<{ label: string }, { click: () => void }, { loaded: number }, { button: HTMLButtonElement }>;

// ControllerInterface und BaseController
class MyController<Host extends WebComponentInterface<{ label: string }>>
	extends BaseController<Host>
	implements ControllerInterface<{ label: string }, { click: () => void }, { button: HTMLButtonElement }>
{
	componentWillLoad(): void {}
	handleClick = (): void => {};
	setButtonRef = (): void => {};
}
```

## FAQ/Fehlerbehebung

- **Namenskonflikte:** Die automatischen Präfixe (`handle`, `ref`, `watch`) setzen eindeutige Eigenschaftsnamen voraus. Bei Abweichungen können eigene Interfaces eine Alternative sein.
- **Optionale Werte:** `Callback<T>` lässt `undefined` zu. Prüfe Werte vor der Nutzung.
- **Generische Grenzen:** Controller wie `ClickButtonController` erwarten einen Host, der `WebComponentInterface` implementiert. Fehlen dort Props, hilft eine spezialisierte Implementierung.
- **Alternative ohne Generics:** Für kleine Komponenten können klassische Interfaces ohne generische Helfer verwendet werden.
