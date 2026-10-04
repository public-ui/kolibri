# Click Event Bubble/Emission Concept

Beschreibt, wie Click-Events durch die KoliBri-Komponentenschichten propagiert werden: HTML5-Element im Shadow DOM → Host-Element (als Custom Event).

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
│ Shadow Component: kol-button / kol-link (shadow: true)           │
│ Handler aus BaseButtonWebComponent / BaseLinkWebComponent        │
│                                                                  │
│   handleClick(event) {                                           │
│     event.stopPropagation()          ← native click abfangen     │
│     setEventTarget(event, ctaRef.el) ← Target korrigieren (1)    │
│     _on?.onClick(event, value)       ← Callback aufrufen (1)     │
│     dispatchDomEvent(host, KolEvent.click, value)  ← Event (2)   │
│   }                                                              │
└──────────────────────────────┬───────────────────────────────────┘
                     native    │ click (stopPropagation verhindert Austritt)
                    MouseEvent │
┌──────────────────────────────┴───────────────────────────────────┐
│ HTML5 Element: <button> / <a> (Functional Component)             │
│ Ursprung des nativen Click-Events                                │
└──────────────────────────────────────────────────────────────────┘
```

### Warum `event.stopPropagation()` bei Buttons?

Native Click-Events haben `composed: true` und passieren die Shadow-DOM-Grenze; außen erscheint dann der Host als `event.target`. Das Durchsickern des nativen Events nach außen würde:

- neben dem Custom Event ein zweites `click` am Host auslösen
- die Callback-/DOM-Event-Dualität untergraben, da Konsumenten beide Signale erhalten würden

Deshalb wird die native Propagation mit `stopPropagation()` unterbrochen und ein kontrolliertes
Custom Event vom Host-Element neu ausgelöst.

> **Hinweis zu Links:** Der Link-Handler ruft kein `stopPropagation()` auf. Die native Navigation
> des `<a>`-Elements wird bei `_disabled: true` über `event.preventDefault()` unterbunden; in diesem
> Fall entfallen Callback und Custom Event.

### Eingebettete Komponenten

Rendert eine Komponente eine andere Komponente in ihrem Shadow DOM (z. B. die Sortier-Buttons von `kol-table-stateless` oder die Buttons von `kol-pagination`), rendert sie deren Functional Component über ein Item (`createButtonItem`, `createLinkItem`, …, siehe [ARC42 – Embedded Components (Items)](../packages/components/src/components/_skeleton/ARC42.md#embedded-components-items)). Das Item übernimmt dieselben Schritte wie der Handler oben, dispatcht das Custom Event aber auf dem Wurzelknoten der Functional Component (`.kol-button`, `.kol-link`). Von dort bubblet es mit `composed: true` durch den Shadow DOM der einbettenden Komponente und über deren Host nach außen.

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

Die Handler liegen in den gemeinsamen Basisklassen und werden der Functional Component als `handleClick` bzw. `handleAnchorClick` übergeben.

#### Button — `BaseButtonWebComponent` (`packages/components/src/components/button/base.tsx`)

```typescript
protected readonly handleClick = (event: MouseEvent): void => {
	event.stopPropagation(); // Natives Event abfangen
	this.tooltipBehavior.hideTooltip();

	const type = this.getRenderProp('type');
	if (type === 'submit') {
		propagateSubmitEventToForm({ form: this.host, ref: this.ctaRef.el });
	} else if (type === 'reset') {
		propagateResetEventToForm({ form: this.host, ref: this.ctaRef.el });
	} else {
		this.formAssociation.setFormAssociatedValue(this.formValue);

		const onClick = this.getRenderProp('on').onClick;
		if (typeof onClick === 'function') {
			setEventTarget(event, this.ctaRef.el); // Target korrigieren
			onClick(event, this.formValue); // (1) Callback
		}
	}

	if (this.host) {
		dispatchDomEvent(this.host, KolEvent.click, this.formValue); // (2) DOM-Event
	}
};
```

#### Link — `BaseLinkWebComponent` (`packages/components/src/components/link/base.tsx`)

```typescript
protected readonly handleAnchorClick = (event: Event): void => {
	this.tooltipBehavior.hideTooltip();
	if (this.getRenderProp('disabled') === true) {
		event.preventDefault(); // Navigation verhindern
		return;
	}
	const href = this.getRenderProp('href');
	const on = this.getRenderProp('on');
	if (typeof on?.onClick === 'function') {
		setEventTarget(event, this.ctaRef.el); // Target korrigieren
		on.onClick(event, href); // (1) Callback
	}
	if (this.host) {
		dispatchDomEvent(this.host, KolEvent.click, href); // (2) DOM-Event
	}
};
```

Die Tastaturbedienung braucht keinen eigenen Handler: Enter auf einem `<a href>` und Enter/Space auf einem `<button>` lösen nativ ein `click` aus.

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
| 2       | Handler fängt Event ab, ruft `event.stopPropagation()` (nur Button)          |
| 3       | `setEventTarget(event, ctaRef.el)` korrigiert das Event-Target               |
| 4       | `_on?.onClick(event, value)` — Callback-Kanal wird bedient                   |
| 5       | `dispatchDomEvent(host, KolEvent.click, value)` — neues Custom Event am Host |
| 6       | Das Custom Event bubblet mit `composed: true` durch den DOM-Baum             |

**Wichtig:**

- Das native Click-Event eines Buttons verlässt die Komponente **nicht** unkontrolliert
- Das Custom Event trägt stets den **Komponentenwert** in `event.detail` (kein DOM-Wert)
- `setEventTarget` stellt sicher, dass der Callback das **innere Element** als Target erhält
- Im Gegensatz zu Focus benötigt das **Bubbling des Click-Custom-Events** kein Warten auf die Theme-Bereitschaft (`data-themed`). Programmatische/delegierte Clicks (z. B. über `delegateClick()`) warten hingegen bewusst auf `data-themed`, um konsistentes visuelles Feedback und Fokus-Styling sicherzustellen.
