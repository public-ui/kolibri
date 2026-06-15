# Click Event Bubble/Emission Concept

Beschreibt, wie Click-Events durch die KoliBri-Komponentenschichten propagiert werden: HTML5-Element (im Shadow DOM) → Host-Element (als Custom Event).

Das Konzept gilt allgemein für alle interaktiven Komponenten. Als repräsentatives Beispiel dient durchgängig `kol-button`; `kol-link`/`kol-link-button` folgen demselben Muster und werden als Variante beschrieben.

## Überblick

KoliBri Web Components verwenden Shadow DOM für Style-Isolation. Das primäre interaktive HTML5-Element (`<button>`, `<a>`, `<input>`, …) wird über eine **Functional Component** (z. B. `ButtonFC`, `LinkFC`) **direkt im Shadow Root des Hosts** gerendert, ohne ein zusätzliches inneres Web Component dazwischen.

Native Click-Events von Elementen innerhalb eines Shadow DOM passieren durch `composed: true` zwar die Shadow-Grenze, werden dabei aber auf den Shadow Host **retargetiert** (`event.target` wird zum Host, z. B. `kol-button`) – das eigentliche innere Element ist außen nicht sichtbar. Außerdem würde ein unkontrolliertes Durchsickern des nativen Events zusätzlich zum kontrollierten Custom Event zu doppelten Signalen führen.

KoliBri löst dieses Problem mit einem kontrollierten Zwei-Kanal-System:

1. **Callback-Kanal** (`_on.onClick`) – direkter JavaScript-Callback, erhält das korrigierte Event-Target
2. **DOM-Event-Kanal** – ein `CustomEvent` mit `composed: true` wird vom Host-Element neu ausgelöst

## Architektur

Die Verarbeitung ist gemäß Skeleton-Blueprint auf zwei Schichten aufgeteilt:

- **Controller** (`internal/functional-components/<name>/controller.ts`) – kapselt die Event-Logik: `stopPropagation`, Tooltip, Disabled-Guard, Korrektur des Targets und Callback-Aufruf.
- **Web Component** (`components/<name>/component.tsx`) – behandelt nur Host-Belange: Form-Propagation und das Dispatchen des Custom Events. Sie rendert die Functional Component mit dem primären HTML5-Element.

### Der Zwei-Kanal-Ansatz (Beispiel `kol-button`)

```
┌────────────────────────────────────────────────────────────────────┐
│ Äußeres Konsumenten-Element                                        │
│   element.addEventListener('click', handler)                (2)   │
│   ODER: _on={{ onClick: handler }}                          (1)   │
└────────────────────────────────┬───────────────────────────────────┘
                      CustomEvent │ bubbles, composed (2)
                                  │ dispatchDomEvent(host, KolEvent.click, value)
┌────────────────────────────────┴───────────────────────────────────┐
│ Host: kol-button (shadow: true)                                    │
│                                                                    │
│   onClick(event) {                            ← WC-Handler (Host)  │
│     const { value, shouldDispatchKolEvent }                        │
│       = ctrl.handleClick(event);              ← Controller-Logik:  │
│           • event.stopPropagation()           ← natives Event abfangen
│           • setEventTarget(event, buttonRef)  ← Target korrigieren (1)
│           • _on?.onClick(event, value)        ← Callback aufrufen (1)
│     if (shouldDispatchKolEvent)                                    │
│       dispatchDomEvent(host, KolEvent.click, value);  ← Event (2)  │
│   }                                                                │
│                                                                    │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ Shadow Root: ButtonFC (Functional Component)              │   │
│   │   <button onClick={onClick}> … </button>  ← HTML5-Element │   │
│   └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

### Warum `event.stopPropagation()` bei Buttons?

Native Click-Events haben `composed: true` und können die Shadow-DOM-Grenze passieren. Ohne `stopPropagation()` würde das native Event – beim Überqueren der Grenze auf den Host `kol-button` retargetiert – **zusätzlich** zum kontrollierten Custom Event nach außen bubbeln. Das würde:

- die Callback-/DOM-Event-Dualität untergraben, da Konsumenten zwei Click-Signale erhielten (natives Event + Custom Event)
- ein Event ohne den **Komponentenwert** in `event.detail` liefern

Deshalb fängt der Controller die native Propagation mit `stopPropagation()` ab, und der Host löst ein kontrolliertes Custom Event neu aus.

> **Hinweis zu Links:** Der Link-Controller ruft **kein** `stopPropagation()` auf. Das native Click-Event des `<a>` darf weiter bubbeln, damit z. B. SPA-Router oder Event-Delegation auf Anker-Klicks reagieren können. Die native Navigation wird stattdessen gezielt über `event.preventDefault()` gesteuert (bei `_disabled: true`).

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

### Repräsentatives Beispiel: `kol-button`

Die Verarbeitung ist zwischen **Controller** (Event-Logik) und **Web Component** (Host-Belange) aufgeteilt. Das `<button>` wird von `ButtonFC` direkt im Shadow Root gerendert und ruft über sein `onClick` den WC-Handler auf.

**Controller** — `internal/functional-components/button/controller.ts`:

```typescript
public handleClick = (event: MouseEvent): ButtonClickHandlingResult => {
	event.stopPropagation(); // natives Event abfangen
	this.tooltipCtrl.hideTooltip();
	const value = this.value;

	if (this.getRenderProp('disabled')) {
		return { value, shouldDispatchKolEvent: false };
	}

	const type = this.getRenderProp('type');
	if (type === 'submit' || type === 'reset') {
		return { value, formAction: type, shouldDispatchKolEvent: true };
	}

	const on = this.getRenderProp('on');
	if (typeof on.onClick === 'function') {
		setEventTarget(event, this.buttonRef); // Target korrigieren (1)
		on.onClick(event, value); // (1) Callback
	}
	return { value, shouldDispatchKolEvent: true };
};
```

**Web Component** — `components/button/component.tsx`:

```typescript
private readonly onClick = (event: MouseEvent): void => {
	const { value, formAction, shouldDispatchKolEvent } = this.ctrl.handleClick(event);

	// Host-Belange: Form-Propagation bei type=submit/reset
	if (formAction === 'submit') {
		propagateSubmitEventToForm({ form: this.host, ref: this.ctaRef.el });
	} else if (formAction === 'reset') {
		propagateResetEventToForm({ form: this.host, ref: this.ctaRef.el });
	}

	// (2) DOM-Event-Kanal
	if (shouldDispatchKolEvent && this.host) {
		dispatchDomEvent(this.host, KolEvent.click, value);
	}
};

public render(): JSX.Element {
	return (
		<Host>
			<ButtonFC handleClick={this.onClick} /* … weitere Render-Props … */ />
		</Host>
	);
}
```

### Variante: `kol-link` / `kol-link-button`

Links folgen demselben Muster (Controller + Web Component, `<a>` von `LinkFC` im Shadow Root), mit zwei Unterschieden:

- **Kein `stopPropagation()`** — das native Anker-Click darf bubbeln (Router/Delegation); bei `_disabled` wird `event.preventDefault()` aufgerufen, um die Navigation zu verhindern.
- Der Komponentenwert in `event.detail` ist der `_href`.

```typescript
// internal/functional-components/link/controller.ts
public readonly handleAnchorClick = (event: MouseEvent | KeyboardEvent): LinkClickHandlingResult => {
	this.hideTooltip();
	const href = this.getRenderProp('href');

	if (this.getRenderProp('disabled')) {
		event.preventDefault(); // Navigation verhindern
		return { href, shouldDispatchKolEvent: false };
	}

	const on = this.getRenderProp('on');
	if (typeof on.onClick === 'function') {
		setEventTarget(event, this.anchorRef); // Target korrigieren (1)
		on.onClick(event, href); // (1) Callback
	}
	return { href, shouldDispatchKolEvent: true };
};
```

Der Host (`components/link/component.tsx`, `components/link-button/component.tsx`) dispatcht analog zum Button das Custom Event:

```typescript
private readonly handleAnchorClick = (event: MouseEvent | KeyboardEvent): void => {
	const { href, shouldDispatchKolEvent } = this.ctrl.handleAnchorClick(event);
	if (shouldDispatchKolEvent && this.host) {
		dispatchDomEvent(this.host, KolEvent.click, href); // (2) DOM-Event
	}
};
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

| Schritt | Was passiert                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1       | Nutzer klickt → nativer `MouseEvent` auf `<button>` / `<a>` (im Shadow Root)                                                |
| 2       | Die Functional Component leitet an den WC-Handler weiter → `ctrl.handleClick()` ruft `event.stopPropagation()` (nur Button) |
| 3       | `setEventTarget(event, innerRef)` korrigiert das Event-Target                                                               |
| 4       | `_on?.onClick(event, value)` — Callback-Kanal wird bedient                                                                  |
| 5       | `dispatchDomEvent(host, KolEvent.click, value)` — neues Custom Event am Host                                                |
| 6       | Das Custom Event bubblet mit `composed: true` durch den DOM-Baum                                                            |

**Wichtig:**

- Das native Click-Event verlässt **Buttons** nicht unkontrolliert (`stopPropagation()`); bei **Links** darf es bewusst bubbeln (Router/Delegation), die Navigation wird per `preventDefault()` gesteuert
- Das Custom Event trägt stets den **Komponentenwert** in `event.detail` (kein DOM-Wert)
- `setEventTarget` stellt sicher, dass der Callback das **innere Element** als Target erhält
- Im Gegensatz zu Focus benötigt das **Bubbling des Click-Custom-Events** kein Warten auf die Theme-Bereitschaft (`data-themed`). Programmatische/delegierte Clicks (z. B. über `delegateClick()`) warten hingegen bewusst auf `data-themed`, um konsistentes visuelles Feedback und Fokus-Styling sicherzustellen.
