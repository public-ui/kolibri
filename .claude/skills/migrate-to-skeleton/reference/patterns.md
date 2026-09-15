# Muster der Skeleton-Architektur

Codebelege zu `SKILL.md`. Alle Snippets sind gegen die Produktionsimplementierungen in
`packages/components/src/components/{button,link}/component.tsx` abgeglichen.

## 1. Prop-Triangle

Jeder `@Prop()` braucht **drei** Teile — alle im WC. Fehlt einer, aktualisiert sich die Prop zur
Laufzeit nicht oder rendert beim ersten Durchlauf falsch:

1. **Deklaration** — `@Prop() public _myProp?: string;`
2. **Watcher** — `@Watch('_myProp')`, der die Prop-Factory inline anwendet
3. **Anwendung beim Laden** — dieselbe Anwendung in `componentWillLoad()`, **nach**
   `this.initRenderProps(propsConfig)`

```typescript
@Prop() public _myProp?: string;

@Watch('_myProp')
public watchMyProp(value?: string): void {
	myProp.apply(value, (v) => this.setRenderProp('myProp', v));
}
```

`componentWillLoad()` wendet die Factories direkt an (nicht über einen Aufruf des Watchers), damit
die Initialisierung eine flache, lesbare Liste bleibt — siehe `link/component.tsx:77-98`. Nur wo die
Anwendung mehr als eine Zeile braucht, wird sie in eine private `applyXxx`-Methode gezogen, die
Watcher und `componentWillLoad()` gemeinsam nutzen (`applyLabel`, `applyTooltipAlign`).

## 2. WC-Orchestrator

Der WC ist die Orchestrierung. `BaseWebComponent<Api>` liefert alles inline — keine
Controller-/Aspect-Klasse:

```typescript
@Component({ tag: 'kol-my-component', styleUrls: { default: './style.scss' }, shadow: true })
export class KolMyComponent extends BaseWebComponent<MyApi> implements MyProps, WebComponentInterface<MyApi> {
	@Element() protected readonly host?: HTMLKolMyComponentElement;

	// Optional: Behavior komponieren (nur für echt wiederverwendbare Logik)
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	@Prop() public _myProp?: string;

	@State() public myState = '';

	@Watch('_myProp')
	public watchMyProp(value?: string): void {
		myProp.apply(value, (v) => this.setRenderProp('myProp', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(myPropsConfig);
		this.watchMyProp(this._myProp);
		this.tooltipBehavior.componentWillLoad({ label: this._label }); // nur mit Behavior
	}

	public render() {
		return (
			<Host>
				<MyComponentFC myProp={this.getRenderProp('myProp')} myState={this.myState} />
			</Host>
		);
	}
}
```

`<Host>` bleibt **nackt** — kein `class`-Attribut. Die BEM-Wurzelklasse setzt der FC über
`BemRootNodeFC`.

`unsetRenderProp(key)` entfernt eine Render-Prop wieder aus dem Store, wenn das Attribut im
gerenderten DOM gar nicht erscheinen darf (Vorbild: `tabIndex` beim Link — ein gesetztes
`tabindex="0"` hätte einen Fokusrahmen gezeichnet, den der Vorgänger nicht hatte).

## 3. Zustandszugriff

`setState`/`getState` schreiben und lesen die reaktiven Stencil-`@State()`-Felder.
`StateAccess<Api>` bündelt beide, um den Zustand des WC an komponierte **Behaviors** zu reichen
(`base-web-component.ts:46`):

```typescript
export type StateAccess<Api extends ComponentApi> = {
	setState: SetStateFn<Api>;
	getState: GetStateFn<Api>;
};
```

Für Behaviors, die selbst keinen `@State` verwalten, existiert ein Sentinel
(`base-web-component.ts:59`):

```typescript
private readonly myBehavior = new MyBehavior(BaseWebComponent.stateLess);
```

`BaseWebComponent.stateLess` wirft bei jedem Zustandszugriff — absichtlich, um versehentliche
Zugriffe sofort sichtbar zu machen. Nur für wirklich zustandslose Behaviors verwenden; niemals
`noopStateAccess` (existiert nicht).

## 4. Behavior-Lebenszyklus

Wird ein Behavior komponiert, gehören **beide** Enden dazu, sonst lecken Listener
(vollständiges Vorbild: `components/link/component.tsx:118-130`):

```typescript
public componentDidRender(): void {
	if (this.ctaRef.el) {
		this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
	}
}

public disconnectedCallback(): void {
	if (this.unsubscribeOnLocationChange) {
		this.unsubscribeOnLocationChange();
		this.unsubscribeOnLocationChange = undefined;
	}
	this.tooltipBehavior.destroy();
}
```

`disconnectedCallback()` meldet zusätzlich **alle** externen Stores ab, die der WC abonniert hat.

## 5. Prop-Definition

Eine Datei je Prop unter `packages/components/src/internal/props/`, Muster aus
`internal/props/level.ts`:

```typescript
// packages/components/src/internal/props/my-prop.ts
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

export const myPropOptions = [0, 1, 2] as const;
export type MyPropValue = (typeof myPropOptions)[number];

export type MyProp = SimpleProp<'myProp', MyPropValue>;
export const myProp = createPropDefinition<MyProp>(
	'myProp',
	0, // Default
	(value) => normalizeInteger(value) as MyPropValue, // Normalisierung
	(v) => myPropOptions.includes(v), // Validierung
);
```

Weichen externer und interner Typ voneinander ab, statt `SimpleProp` den dreistelligen
`Prop<K, TExternal, TInternal>` verwenden. Normalisierer und Validatoren liegen in
`internal/props/helpers/`; neue Props werden in `internal/props/index.ts` re-exportiert.

## 6. Ziel-Dateistruktur

```
packages/components/src/
├── components/
│   └── <komponente>/
│       ├── component.tsx            <- @Component { tag: 'kol-<komponente>' } — WC-Orchestrator, erbt BaseWebComponent
│       ├── style.scss
│       ├── snapshot.spec.tsx        <- Jest-Snapshots (ko-lokalisiert!)
│       ├── __snapshots__/
│       └── interaction.e2e.ts       <- Playwright, optional
└── internal/
    ├── functional-components/
    │   └── <komponente>/
    │       ├── api.tsx              <- propsConfig + ApiFromConfig
    │       ├── component.tsx        <- zustandsloser FC (BemRootNodeFC)
    │       └── behavior.ts          <- BaseBehavior, optional — nur bei echter Wiederverwendung
    └── props/
        ├── <neue-prop>.ts           <- eine Datei je neuer Prop
        └── index.ts                 <- Re-Exporte
```

Bleibt eine transitionale `shadow: false`-Variante nötig, liegt sie als `wc.tsx` neben der
`component.tsx` (Vorbilder: `button/wc.tsx`, `link/wc.tsx`) — siehe
`ARC42.md#transitional-pattern-shadowfalse` und Fallstrick 8 in `pitfalls.md`.
