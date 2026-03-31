# Click Event Bubble/Emission Concept

Beschreibt, wie Click-Events durch die KoliBri-Komponentenschichten propagiert werden: HTML5-Element → Light DOM WC → Host-Element (als Custom Event).

## Überblick

KoliBri Web Components verwenden Shadow DOM für Style-Isolation. Native Click-Events von Elementen innerhalb eines Shadow DOM geben zwar durch `composed: true` den Shadow-Grenzwert durch, berichten jedoch den Shadow Host als `event.target` – das eigentliche innere Element ist außen nicht sichtbar. Außerdem würde bei mehrfach verschachtelten Komponenten ein unkontrolliertes Durchsickern von Click-Events zu unerwünschtem Verhalten führen.

KoliBri löst dieses Problem mit einem kontrollierten Zwei-Kanal-System:

1. **Callback-Kanal** (`_on.onClick`) – direkter JavaScript-Callback, erhält das korrigierte Event-Target
2. **DOM-Event-Kanal** – ein `CustomEvent` mit `composed: true` wird vom Host-Element neu ausgelöst

## Architektur

### Der Zwei-Kanal-Ansatz

```
┌──────────────────────────────────────────────────────────────────┐
│ Äußeres Konsumenten-Element                                      │
│                                                                  │
│   element.addEventListener('click', handler)              (2)   │
│   OR: _on={{ onClick: handler }}                          (1)   │
└──────────────────────────────┬───────────────────────────────────┘
                    CustomEvent│ bubbles, composed (2)
                               │ dispatchDomEvent(host, KolEvent.click)
┌──────────────────────────────┴───────────────────────────────────┐
│ Light DOM Component: kol-button-wc / kol-link-wc (shadow: false) │
│                                                                  │
│   onClick(event) {                                               │
│     event.stopPropagation()          ← native click abfangen     │
│     setEventTarget(event, innerRef)  ← Target korrigieren (1)   │
│     _on?.onClick(event, value)       ← Callback aufrufen (1)    │
│     dispatchDomEvent(host, KolEvent.click, value)  ← Event (2)  │
│   }                                                              │
└──────────────────────────────┬───────────────────────────────────┘
                     native    │ click (stopPropagation verhindert Austritt)
                    MouseEvent │
┌──────────────────────────────┴───────────────────────────────────┐
│ HTML5 Element: <button> / <a>                                    │
│ Ursprung des nativen Click-Events                                │
└──────────────────────────────────────────────────────────────────┘
```

### Warum `event.stopPropagation()` bei Buttons?

Native Click-Events haben `composed: true`, können also die Shadow-DOM-Grenze passieren.
Bei `kol-button-wc` (light DOM) ist das kein Shadow-DOM-Problem, aber das Durchsickern des
nativen Events nach außen würde:

- das falsche `event.target` (das `<button>`-Element statt des WC-Hosts) liefern
- die Callback-/DOM-Event-Dualität untergraben, da Konsumenten beide Signale erhalten würden

Deshalb wird die native Propagation mit `stopPropagation()` unterbrochen und ein kontrolliertes
Custom Event vom Host-Element neu ausgelöst.

> **Hinweis zu Links:** `kol-link-wc` ruft kein `stopPropagation()` auf, da die native Navigation
> des `<a>`-Elements über `event.preventDefault()` gesteuert wird (bei `_disabled: true`).

## Utility-Funktionen und Typen

### `dispatchDomEvent(target, event, detail)` — `packages/components/src/utils/events.ts`

Erstellt ein `CustomEvent` und dispatcht es vom Ziel-Element.

```typescript
function dispatchDomEvent<T>(target: HTMLElement, event: KolEvent, detail?: T) {
	target.dispatchEvent(createKoliBriEvent<T>(event, detail));
}
```

Das zugrundeliegende Event wird mit diesen Optionen erstellt:

```typescript
const DEFAULT_OPTIONS = {
	bubbles: true,
	cancelable: true,
	composed: true,
} as const;
```

- **`bubbles: true`** — Das Event steigt im DOM nach oben
- **`composed: true`** — Das Event kann Shadow-DOM-Grenzen passieren
- **`cancelable: true`** — Das Event kann mit `preventDefault()` abgebrochen werden
- **`detail`** — Trägt den Komponentenwert (z. B. `_value` bei Buttons, `_href` bei Links)

### `KolEvent` — `packages/components/src/utils/events.ts`

Enum aller Event-Namen, die KoliBri dispatcht:

```typescript
enum KolEvent {
	blur = 'blur',
	change = 'change',
	click = 'click',
	focus = 'focus',
	input = 'input',
	// ...weitere Events
}
```

Der Event-Name `KolEvent.click` entspricht dem String `"click"`.

### `setEventTarget(event, element)` — `packages/components/src/schema`

Korrigiert das `target` eines Events auf das angegebene Element. Wird vor dem Callback-Aufruf
verwendet, damit der Konsument das innere HTML5-Element (z. B. `<button>`, `<a>`) als Target erhält.

### Callback-Typen — `packages/components/src/schema/types/callbacks.ts`

```typescript
export type EventCallback<E extends Event> = (event: E) => void;
export type EventValueOrEventCallback<E extends Event, V> = ((event: E, value: V) => void) | EventCallback<E>;
```

- `EventCallback<E>` — einfacher Event-Handler ohne Wert
- `EventValueOrEventCallback<E, V>` — Handler mit optionalem Komponentenwert als zweitem Argument

## Umsetzung in Komponenten

### Interaktive Elemente (Button, Link)

#### `kol-button-wc` (`shadow: false`)

```typescript
@Component({ tag: 'kol-button-wc', shadow: false })
export class KolButtonWc implements ButtonAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolButtonWcElement;
	private buttonRef?: HTMLButtonElement;

	private readonly setButtonRef = (ref?: HTMLButtonElement) => {
		this.buttonRef = ref;
	};

	private readonly onClick = (event: MouseEvent) => {
		event.stopPropagation(); // Natives Event abfangen

		// ...Tooltip-Logik und Form-Handling...

		if (typeof this.state._on?.onClick === 'function') {
			setEventTarget(event, this.buttonRef); // Target korrigieren
			this.state._on?.onClick(event, this.state._value); // (1) Callback
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, this.state._value); // (2) DOM-Event
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<button ref={this.setButtonRef} onClick={this.onClick}>
					{/* Inhalt */}
				</button>
			</Host>
		);
	}
}
```

#### `kol-link-wc` (`shadow: false`)

```typescript
@Component({ tag: 'kol-link-wc', shadow: false })
export class KolLinkWc implements InternalLinkAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolLinkElement;
	private anchorRef?: HTMLAnchorElement;

	private readonly setAnchorRef = (ref?: HTMLAnchorElement) => {
		this.anchorRef = ref;
	};

	private readonly onClick = (event: Event) => {
		if (this.state._disabled === true) {
			event.preventDefault(); // Navigation verhindern
		} else {
			if (typeof this.state._on?.onClick === 'function') {
				setEventTarget(event, this.anchorRef); // Target korrigieren
				this.state._on?.onClick(event, this.state._href); // (1) Callback
			}
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.click, this.state._href); // (2) DOM-Event
			}
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<a ref={this.setAnchorRef} onClick={this.onClick} onKeyPress={this.onClick}>
					{/* Inhalt */}
				</a>
			</Host>
		);
	}
}
```

### Input-Elemente

Input-Elemente (z. B. `kol-input-text`, `kol-input-checkbox`) leiten Click-Events ebenfalls
über den `_on`-Prop-Mechanismus weiter. Der `InputTypeOnClick`-Typ ist Teil des Standard-Event-Sets:

```typescript
// packages/components/src/schema/types/input/types.ts
type InputTypeOnClick = {
	[Callback.onClick]?: EventCallback<Event>;
};

export type InputTypeOnDefault = InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput & InputTypeOnKeyDown;
```

Das Muster für Input-Komponenten ist analog zu Buttons: `onClick` im `_on`-Objekt + `dispatchDomEvent`.

## Konsumenten-Perspektive

```typescript
// (1) Callback-Kanal — typsicher, erhält den Komponentenwert:
<KolButton _label="Senden" _on={{ onClick: (event, value) => console.log(value) }} />

// (2) DOM-Event-Kanal — Standard-Web-API, z. B. für Framework-Integration:
document.querySelector('kol-button').addEventListener('click', (event: CustomEvent) => {
	const value = event.detail; // Komponentenwert aus event.detail
});
```

### Vergleich der beiden Kanäle

| Eigenschaft     | Callback (`_on.onClick`)                      | DOM CustomEvent (`addEventListener`)            |
| --------------- | --------------------------------------------- | ----------------------------------------------- |
| API             | KoliBri-spezifisch                            | Standard Web API                                |
| Event-Target    | Korrigiert auf inneres HTML5-Element          | Host-Element (`kol-button`, `kol-link`, etc.)   |
| Komponentenwert | Als zweites Argument `value`                  | In `event.detail`                               |
| Typ             | `EventValueOrEventCallback<MouseEvent, V>`    | `CustomEvent<V>`                                |
| Bubbles         | Nein (direkter Funktionsaufruf)               | Ja (`bubbles: true, composed: true`)            |
| Geeignet für    | Direkte Framework-Integration (React, Vue...) | Vanilla JS, Event-Delegation, Framework-Adapter |

## Zusammenfassung

| Schritt | Was passiert                                                                 |
| ------- | ---------------------------------------------------------------------------- |
| 1       | Nutzer klickt → nativer `MouseEvent` auf `<button>` / `<a>`                  |
| 2       | WC-Handler fängt Event ab, ruft `event.stopPropagation()` (nur Button)       |
| 3       | `setEventTarget(event, innerRef)` korrigiert das Event-Target                |
| 4       | `_on?.onClick(event, value)` — Callback-Kanal wird bedient                   |
| 5       | `dispatchDomEvent(host, KolEvent.click, value)` — neues Custom Event am Host |
| 6       | Das Custom Event bubblet mit `composed: true` durch den DOM-Baum             |

**Wichtig:**

- Das native Click-Event verlässt die Komponente **nicht** unkontrolliert (außer bei Links mit `onKeyPress`)
- Das Custom Event trägt stets den **Komponentenwert** in `event.detail` (kein DOM-Wert)
- `setEventTarget` stellt sicher, dass der Callback das **innere Element** als Target erhält
- Im Gegensatz zu Focus benötigt das **Bubbling des Click-Custom-Events** kein Warten auf die Theme-Bereitschaft (`data-themed`). Programmatische/delegierte Clicks (z. B. über `delegateClick()`) warten hingegen bewusst auf `data-themed`, um konsistentes visuelles Feedback und Fokus-Styling sicherzustellen.
