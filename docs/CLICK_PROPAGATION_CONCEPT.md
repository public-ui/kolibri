# Click Delegation Concept

Beschreibt ein analoges Delegationskonzept zu Focus: Ein Klick auf den KoliBri-Host wird gezielt auf das primaere interaktive Innenelement weitergeleitet.

## Status

Dieses Dokument beschreibt das Click-Delegationskonzept sowie noch geplante Erweiterungen; Teile sind bereits implementiert, weitere folgen sukzessive.

- Ist: Komponenten mit `@Method() click()` delegieren den Klick über den Decorator `@delegateClick('ctaRef')` (`packages/components/src/utils/element-interaction.ts`) mit `delegateClick`/`setClick` (`packages/components/src/utils/element-click.ts`) auf ihr primäres Innenelement.
- Soll: Ein Reentrancy-Schutz gegen intern erneut entstehende Click-Events (siehe Kernidee 3).

## Ziel

Wenn ein Konsument auf das Host-Element klickt (z. B. `kol-button`), soll nicht nur ein Event nach aussen signalisiert werden, sondern der Klick nach innen auf das primaere interaktive Element delegiert werden.

Beispiele:

- `kol-button` -> primaer: `<button class="kol-button__interactive-element">` im Shadow DOM
- `kol-link-button` -> primaer: `<a class="kol-link__interactive-element">` im Shadow DOM
- `kol-input-text` -> primaer: `<input>` im Shadow DOM

## Architektur

### Delegationsfluss (analog zu Focus)

Die Functional Component einer Komponente rendert das primaere HTML5-Element direkt in den Shadow DOM der Komponente. Die Delegation hat deshalb genau eine Stufe:

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-button (shadow: true)            │
│ @Method() @delegateClick('ctaRef') click()             │
└─────────────────────────┬───────────────────────────────┘
                          ↓ wartet auf data-themed, dann setClick(ctaRef.el)
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <button>                                 │
│ tatsaechlich aktiviert (native click action)           │
└─────────────────────────────────────────────────────────┘
```

### Eingebettete Komponenten

Rendert eine Komponente eine andere Komponente in ihrem Shadow DOM (z. B. die Buttons von `kol-pagination`), dann rendert sie deren Functional Component ueber ein Item (`createButtonItem`, `createLinkItem`, …, siehe [ARC42 – Embedded Components (Items)](../packages/components/src/components/_skeleton/ARC42.md#embedded-components-items)). Ein eingebetteter Button ist kein eigenes Element und hat keine eigene `click()`-Methode; das `click()` der einbettenden Komponente zielt auf deren eigenes primaeres Element.

## Kernideen

1. Host-initiierter Klick wird nach innen delegiert, statt nur als Event nach aussen gebubbelt.
2. Delegation fordert vor der Propagation immer `data-themed` am Host.
3. (Geplant) Ein Reentrancy-Schutz soll Endlosschleifen durch intern erneut entstehende Click-Events verhindern; die aktuellen Hilfsfunktionen `delegateClick`/`setClick` enthalten diesen Schutz noch nicht.
4. Nur primaere Interaktionselemente sind Delegationsziele.

### Warum `data-themed` auch für Click zwingend ist

Technisch kann ein `element.click()` oft auch schon vor abgeschlossener Theme-Anwendung funktionieren.
Das waere aber aus UX- und Test-Sicht nicht authentisch:

- Der Nutzer klickt real auf sichtbare, fertig gerenderte Controls.
- Ohne `data-themed` besteht das Risiko, dass Tests auf ein noch unsichtbares oder semantisch nicht final aufgebautes Element klicken.
- Dadurch entstehen false positives: Der Test ist gruen, obwohl die reale Interaktion noch nicht stabil waere.

Deshalb gilt analog zu Focus: Click-Delegation darf erst starten, wenn `data-themed` gesetzt ist.

## Utility Functions

### `delegateClick(host, callback)` — `packages/components/src/utils/element-click.ts`

Wartet zwingend auf Theme-Readiness und fuehrt dann die eigentliche Klick-Aktion aus.

```typescript
export async function delegateClick(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			'The interactive element inside the KoliBri web component could not be clicked. Try calling the click method on the web component after a short delay again.',
		);
	}
}
```

### `setClick(element)` — `packages/components/src/utils/element-click.ts`

Fuehrt den nativen Klick auf dem Ziel-Element aus und wiederholt ihn pro Animation Frame, solange das Element noch nicht sichtbar ist.

```typescript
export async function setClick(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.click();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isElementVisible(element) && attempts < MAX_CLICK_ATTEMPTS);
}
```

### `isElementVisible(element)` (intern)

Prueft ueber `getBoundingClientRect()`, ob das Element sichtbar ist (Breite und Hoehe > 0).

### `waitForThemed(host)` — `packages/components/src/utils/element-themed.ts`

Wird gemeinsam mit der Focus-Delegation genutzt; Timeout nach 5000 ms.

### Konstanten

```typescript
const MAX_CLICK_ATTEMPTS = 3;
```

## Komponentenregeln

### Interface

Alle klickbaren Komponenten implementieren das `ClickableElement`-Interface aus `packages/components/src/schema/interfaces/ClickableElement.ts`:

```typescript
export interface ClickableElement {
	click(): Promise<void>;
}
```

### API-Kontrakt für alle Web Components

In allen klickbaren Web Components gilt derselbe oeffentliche Methodenvertrag:

```typescript
@Method()
public async click(): Promise<void> {
	// komponentenspezifische Delegation
}
```

Damit erzwingen wir API-Homogenitaet analog zum HTML-Standard.

### Regel 1: Delegation ueber den Decorator

Das primaere Element haelt ein `CtaRef` aus `createCtaRef()`, die Methode entsteht ueber `@delegateClick`:

```typescript
@Component({ tag: 'kol-button', shadow: true })
export class KolButton extends BaseButtonWebComponent implements ButtonProps, ClickableElement {
	@Element() protected readonly host?: HTMLKolButtonElement;

	// In der Basisklasse: protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	// Die Functional Component setzt ihn am nativen Element: <button ref={ctaRef} …>

	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}
}
```

Hinweise:

- `delegateClick` wartet zwingend auf `data-themed` vor der Klick-Delegation, um konsistentes visuelles Feedback zu sichern.
- Liefert das Praedikat von `createCtaRef(isInactive)` `true`, liest sich `ctaRef.el` als `undefined` und `click()` tut nichts, wie bei einem nativ deaktivierten Control.

### Regel 2: Primaeres Ziel je Komponente festlegen

Jede interaktive Komponente dokumentiert genau ein primaeres Klickziel:

- `kol-button`: interner `<button>`
- `kol-link`: interner `<a>`
- `kol-input-*`: interner `<input>` bzw. `<textarea>`
- `kol-combobox`: interner `<input>`

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

#### TypeScript-Typisierung in E2E Tests

Bei DOM-Zugriffen in E2E-Tests muss zwischen KoliBri Web Components und nativen HTML-Elementen unterschieden werden, da der `click()`-Aufruf auf KoliBri-Komponenten **asynchron** ist (im Gegensatz zum synchronen nativen `click()`):

- **KoliBri Web Components** erhalten den spezifischen KoliBri-Elementtyp, z. B. `HTMLKolButtonElement`, `HTMLKolLinkElement`, `HTMLKolInputTextElement`. Nur so steht die typisierte `async click()`-Methode der Komponente zur Verfuegung.
- **Native HTML-Elemente** erhalten den entsprechenden Standard-Typ, z. B. `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLInputElement`.

Beispiel:

```typescript
// KoliBri Web Component: click() ist async und muss awaited werden
const kolButton = document.querySelector('kol-button') as HTMLKolButtonElement;
await kolButton.click();

// Natives HTML-Element: click() ist synchron
const nativeButton = document.querySelector('button') as HTMLButtonElement;
nativeButton.click();
```

**Falsch** (kein await, falscher Typ):

```typescript
// Fehler: Element.click() ist synchron und nicht die KoliBri-Delegation
const kolButton = document.querySelector('kol-button') as HTMLElement;
kolButton.click(); // loest keinen delegierten Klick aus
```

**Regel**: Immer `await` verwenden, wenn `click()` auf einer KoliBri Web Component aufgerufen wird. Das Weglassen von `await` fuehrt dazu, dass der Klick vor abgeschlossener Theme-Bereitschaft und Delegation ausgefuehrt werden koennte oder der Test zu frueh weiterlaeuft.

## Zusammenfassung

Analog zu Focus sollte Click als echte Delegation von Host nach innen modelliert werden.

- Focus: Host `focus()` -> inneres Element `focus()`
- Click (Soll): Host-Klick -> inneres Element `click()`

So wird die Komponente aus Konsumentensicht konsistent: Der Host ist die oeffentliche Interaktionsflaeche, die innere Aktivierung bleibt korrekt und kontrolliert.
