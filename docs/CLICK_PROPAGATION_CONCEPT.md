# Click Delegation Concept

Beschreibt ein analoges Delegationskonzept zu Focus: Ein Klick auf den KoliBri-Host wird gezielt auf das primaere interaktive Innenelement weitergeleitet.

## Status

Dieses Dokument beschreibt ein Soll-Konzept (Designvorschlag), nicht den aktuellen Ist-Zustand.

- Ist: Click-Handling findet heute primar in den inneren WC-/HTML-Elementen statt.
- Soll: Der Host soll wie bei `focus()` eine zentrale Delegate-Strategie fuer `click` bereitstellen.

## Ziel

Wenn ein Konsument auf das Host-Element klickt (z. B. `kol-button`), soll nicht nur ein Event nach aussen signalisiert werden, sondern der Klick nach innen auf das primaere interaktive Element delegiert werden.

Beispiele:

- `kol-button` -> primaer: `<button>` in `kol-button-wc`
- `kol-link` -> primaer: `<a>` in `kol-link-wc`
- `kol-input-text` -> primaer: `<input>`

## Architektur

### Delegationsfluss (analog zu Focus)

Variante A: Shadow -> Light DOM WC -> HTML5-Element

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-button (shadow: true)            │
│ @Method click() -> delegateClick(host, () => setClick(wc))
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Light DOM Component: kol-button-wc (shadow: false)     │
│ click() -> setClick(buttonRef)                          │
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <button>                                 │
│ tatsaechlich aktiviert (native click action)            │
└─────────────────────────────────────────────────────────┘
```

Variante B: Shadow -> HTML5-Element direkt

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-input-text (shadow: true)        │
│ @Method click() -> delegateClick(host, () => setClick(input))
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <input>                                  │
│ tatsaechlich aktiviert                                  │
└─────────────────────────────────────────────────────────┘
```

## Kernideen

1. Host-initiierter Klick wird nach innen delegiert, statt nur als Event nach aussen gebubbelt.
2. Delegation fordert vor der Propagation immer `data-themed` am Host.
3. Reentrancy-Schutz verhindert Endlosschleifen durch intern erneut entstehende Click-Events.
4. Nur primaere Interaktionselemente sind Delegationsziele.

### Warum `data-themed` auch fuer Click zwingend ist

Technisch kann ein `element.click()` oft auch schon vor abgeschlossener Theme-Anwendung funktionieren.
Das waere aber aus UX- und Test-Sicht nicht authentisch:

- Der Nutzer klickt real auf sichtbare, fertig gerenderte Controls.
- Ohne `data-themed` besteht das Risiko, dass Tests auf ein noch unsichtbares oder semantisch nicht final aufgebautes Element klicken.
- Dadurch entstehen false positives: Der Test ist gruen, obwohl die reale Interaktion noch nicht stabil waere.

Deshalb gilt analog zu Focus: Click-Delegation darf erst starten, wenn `data-themed` gesetzt ist.

## Utility Functions (Vorschlag)

Datei (neu): `packages/components/src/utils/element-click.ts`

### `delegateClick(host, callback)`

Verantwortlich fuer Shadow Components (`shadow: true`). Wartet zwingend auf Theme-Readiness und fuehrt dann die eigentliche Klick-Aktion aus.

```typescript
export async function delegateClick(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			'The interactive element inside the KoliBri web component could not be clicked. Try calling the click behavior on the web component after a short delay again.',
		);
	}
}
```

### `setClick(element)`

Fuehrt den nativen Klick auf dem Ziel-Element aus und validiert, dass die Aktivierung erfolgt ist.

```typescript
export async function setClick(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.click();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isClickActivationObserved(element) && attempts < MAX_CLICK_ATTEMPTS);
}
```

### `isClickActivationObserved(element)`

Prueft, ob die beabsichtigte Aktivierung stattgefunden hat. Die konkrete Heuristik ist komponentenspezifisch und kann optional bleiben. Mindestanforderung: keine Exception und keine Endlosschleife.

### `waitForThemed(host)`

Kann 1:1 aus dem Focus-Utility wiederverwendet werden.

### Konstanten

```typescript
const MAX_CLICK_ATTEMPTS = 3;
const MAX_TIMEOUT_DURATION = 5000;
```

## Komponentenregeln

### Interface

Alle klickbaren Komponenten implementieren das `ClickableElement`-Interface:

```typescript
export interface ClickableElement {
	click(): Promise<void>;
}
```

### API-Kontrakt fuer alle Web Components

In allen klickbaren Web Components gilt derselbe oeffentliche Methodenvertrag:

```typescript
@Method()
public async click(): Promise<void> {
	// komponentenspezifische Delegation
}
```

Damit erzwingen wir API-Homogenitaet analog zum HTML-Standard.

### Regel 1: Shadow Component (`shadow: true`)

Der Host enthaelt einen gezielten Click-Listener und delegiert nach innen:

```typescript
@Component({ tag: 'kol-button', shadow: true })
export class KolButton implements ClickableElement {
	@Element() private readonly host?: HTMLKolButtonElement;
	private buttonWcRef?: HTMLKolButtonWcElement;
	private isInternalClickDelegation = false;

	@Method()
	public async click(): Promise<void> {
		return delegateClick(this.host!, () => setClick(this.buttonWcRef!));
	}
}
```

Hinweis:

- Der Guard `isInternalClickDelegation` ist Pflicht, damit der intern ausgeloeste Klick nicht erneut am Host delegiert wird.

### Regel 2: Light DOM Component (`shadow: false`)

Kein `delegateClick` notwendig. Nur `setClick` auf dem primaeren HTML-Element:

```typescript
@Component({ tag: 'kol-button-wc', shadow: false })
export class KolButtonWc implements ClickableElement {
	private buttonRef?: HTMLButtonElement;

	@Method()
	public async click(): Promise<void> {
		return setClick(this.buttonRef!);
	}
}
```

### Regel 3: Primaeres Ziel je Komponente festlegen

Jede interaktive Komponente dokumentiert genau ein primaeres Klickziel:

- `kol-button`: interner `<button>`
- `kol-link`: interner `<a>`
- `kol-input-*`: interner `<input>` bzw. `<textarea>`
- `kol-select`: interner triggernder Button/Control

## Event-Semantik

Das Delegationskonzept ersetzt nicht die bestehende Event-API (`_on.onClick`, `dispatchDomEvent`), sondern ordnet die Reihenfolge:

1. Host-Klick wird nach innen delegiert.
2. Das innere Element verarbeitet den nativen Klick.
3. Bestehende Callback-/DOM-Event-Mechanismen bleiben unveraendert aktiv.

Damit bleibt die oeffentliche API kompatibel.

## Abgrenzung zu aktuellem Bubble-Konzept

- Bubble-Konzept: Ereignis von innen nach aussen signalisieren.
- Delegationskonzept: Interaktion von aussen nach innen ausfuehren.

Beides ist kombinierbar und sinnvoll:

- nach innen delegieren fuer robuste Aktivierung durch Host-Interaktion
- nach aussen emittieren fuer API/Framework-Kompatibilitaet

## Akzeptanzkriterien

1. Klick auf den Host (`event.target === host`) aktiviert das primaere Innenelement.
2. Klick direkt auf das Innenelement behaelt sein heutiges Verhalten.
3. Keine doppelte Ausfuehrung von Click-Callbacks.
4. Keine Rekursion/Endlosschleife durch delegierte Klicks.
5. Verhalten ist identisch fuer Maus und Tastaturaktivierung (Enter/Space), soweit komponentenspezifisch anwendbar.

## Teststrategie

### Unit Tests

- `delegateClick` wartet verpflichtend auf `data-themed` analog zu `delegateFocus`.
- Timeout-Fehler wird mit nutzerfreundlicher Message geworfen.
- Reentrancy-Guard verhindert zweite Delegation.
- Kein Click-Versuch vor `data-themed` (verhindert Interaktion mit unsichtbaren/fruehen DOM-Zustaenden).

### E2E Tests

- Host direkt klicken -> primaere Aktion wird einmal ausgefuehrt.
- Inneres Element klicken -> Aktion wird ebenfalls einmal ausgefuehrt.
- `_on.onClick` und DOM-Event werden jeweils genau einmal beobachtet.

## Zusammenfassung

Analog zu Focus sollte Click als echte Delegation von Host nach innen modelliert werden.

- Focus: Host `focus()` -> inneres Element `focus()`
- Click (Soll): Host-Klick -> inneres Element `click()`

So wird die Komponente aus Konsumentensicht konsistent: Der Host ist die oeffentliche Interaktionsflaeche, die innere Aktivierung bleibt korrekt und kontrolliert.
