# Focus Propagation Concept

Beschreibt, wie der Focus durch die KoliBri-Komponentenschichten delegiert wird: Shadow DOM → (optional Light DOM) → HTML5-Element.

## Überblick

KoliBri Web Components verwenden Shadow DOM für Style-Isolation. Da der Browser fokussierbare Elemente innerhalb eines Shadow DOM nicht direkt ansteuern kann, muss der Focus programmatisch von der öffentlichen Shadow-Komponente an das tatsächlich fokussierbare HTML5-Element weitergeleitet werden.

Die zentrale Herausforderung: Bevor der Focus gesetzt werden kann, müssen die Adopted Style Sheets geladen und angewendet sein. Ohne diese Absicherung kann es zu Race Conditions kommen — der Focus wird auf ein Element gesetzt, das noch nicht vollständig gerendert ist.

Technisch kann ein frueher `focus()` im Browser teilweise trotzdem funktionieren. Das ist jedoch nicht authentisch zum realen Nutzerverhalten: Interaktion soll erst auf final sichtbaren und stabil gerenderten Controls stattfinden. Fuer Tests bedeutet das: Kein Focus auf potenziell noch unsichtbare oder semantisch unvollstaendige Elemente. Deshalb wird `data-themed` als verbindliche Readiness-Bedingung verwendet.

## Architektur

### Zwei Varianten der Focus-Delegation

Es gibt zwei Varianten, je nach Komponentenaufbau:

**Variante A: Shadow → Light DOM WC → HTML5-Element** (z. B. `kol-button`)

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-button (shadow: true)             │
│ focus() → delegateFocus(host, () => setFocus(wcRef))    │
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Light DOM Component: kol-button-wc (shadow: false)      │
│ focus() → setFocus(buttonRef)                           │
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <button>                                 │
│ Tatsächlich fokussierbar                                │
└─────────────────────────────────────────────────────────┘
```

**Variante B: Shadow → HTML5-Element direkt** (z. B. `kol-input-text`)

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-input-text (shadow: true)         │
│ focus() → delegateFocus(host, () => setFocus(inputRef)) │
└─────────────────────────┬───────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <input>                                  │
│ Tatsächlich fokussierbar                                │
└─────────────────────────────────────────────────────────┘
```

### Das `data-themed`-Attribut

Das Theme-System setzt das `data-themed`-Attribut auf Shadow-Komponenten, sobald die Adopted Style Sheets geladen sind. Der Ablauf:

1. **Theme-Registrierung:** Beim Bootstrapping werden Themes über `register()` aus dem `adopted-style-sheets`-Paket registriert (`packages/components/src/core/bootstrap.ts`).

2. **Style-Anwendung:** Stencils `setMode()`-Callback wird für jede Komponente aufgerufen (`packages/components/src/global/script.ts`). Dort wird `setThemeStyle(elm, getThemeDetails(elm))` aufgerufen, um die Adopted Style Sheets in den Shadow DOM zu injizieren.

3. **Markierung:** `setThemeStyle()` setzt nach erfolgreicher Style-Anwendung das `data-themed`-Attribut auf dem Host-Element.

## Utility Functions

Datei: `packages/components/src/utils/element-focus.ts`

### `delegateFocus(host, callback)`

Zentrale Focus-Delegations-Funktion für **Shadow Components** (`shadow: true`). Wartet auf die Theme-Bereitschaft des Host-Elements und führt dann die Focus-Callback-Funktion aus.

```typescript
export async function delegateFocus(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			`The interactive element inside the KoliBri web component could not be focused. Try calling the focus method on the web component after a short delay again.`,
		);
	}
}
```

**Parameter:**

- `host` — Das Shadow Component Host-Element (`this.host!`)
- `callback` — Async Funktion, die `setFocus()` auf dem Ziel-Element aufruft

**Verhalten:**

1. Prüft, ob `data-themed` bereits gesetzt ist
2. Falls nicht: wartet über `waitForThemed()` (MutationObserver) bis maximal 5 Sekunden
3. Ruft dann den `callback` auf, der den eigentlichen Focus setzt
4. Bei Fehler (Timeout oder Focus-Fehler): wirft einen benutzerfreundlichen Fehler

Die Wartephase ist nicht nur technisch motiviert, sondern auch eine Qualitaetsgrenze: Sie verhindert, dass Focus-Interaktionen in Tests oder in schneller Initialisierung auf UI-Zustaenden stattfinden, die ein Nutzer so noch nicht sieht.

### `setFocus(element)`

Fokussiert ein HTML-Element durch wiederholte Versuche pro Animation Frame. Wird sowohl in Shadow- als auch in Light-DOM-Komponenten verwendet.

```typescript
export async function setFocus(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.focus();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isActiveElement(element) && attempts < MAX_FOCUS_ATTEMPTS);
}
```

**Verhalten:**

- Ruft `element.focus()` auf und prüft pro Animation Frame, ob das Element fokussiert ist
- Maximal `MAX_FOCUS_ATTEMPTS` (10) Versuche
- Nutzt `isActiveElement()` für korrekte Focus-Erkennung innerhalb von Shadow DOMs

### `isActiveElement(element)` (intern)

Prüft, ob ein Element aktuell fokussiert ist. Berücksichtigt dabei korrekt die Shadow-DOM-Grenze.

```typescript
function isActiveElement(element: HTMLElement): boolean {
	const root = element.getRootNode();
	if (root instanceof ShadowRoot) {
		return root.activeElement === element;
	}
	return document.activeElement === element;
}
```

**Warum nötig:** `document.activeElement` zeigt bei fokussierten Elementen innerhalb eines Shadow DOM nur den Shadow Host, nicht das tatsächlich fokussierte Element. Daher wird `shadowRoot.activeElement` geprüft.

### `waitForThemed(host)` (intern)

Wartet per MutationObserver darauf, dass das `data-themed`-Attribut auf dem Host-Element gesetzt wird.

```typescript
function waitForThemed(host: HTMLElement): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const observer = new MutationObserver(() => {
			if (host.hasAttribute('data-themed')) {
				clearTimeout(timeoutId);
				observer.disconnect();
				resolve();
			}
		});

		const timeoutId = setTimeout(() => {
			observer.disconnect();
			reject(new Error('Timeout waiting for data-themed attribute'));
		}, MAX_TIMEOUT_DURATION);

		observer.observe(host, {
			attributes: true,
			attributeFilter: ['data-themed'],
		});
	});
}
```

**Verhalten:**

- Beobachtet Attribut-Änderungen auf dem Host-Element
- Resolved sofort, wenn `data-themed` gesetzt wird
- Timeout nach `MAX_TIMEOUT_DURATION` (5000 ms) mit Error

### Konstanten

```typescript
const MAX_FOCUS_ATTEMPTS = 10;
const MAX_TIMEOUT_DURATION = 5000;
```

## Umsetzung in Komponenten

### Interface

Alle fokussierbaren Komponenten implementieren das `FocusableElement`-Interface:

```typescript
export interface FocusableElement {
	focus(): Promise<void>;
}
```

### Regel 1: Shadow Component (`shadow: true`)

**Immer** `delegateFocus()` mit `setFocus()` verwenden.

#### Variante A: Mit innerem WC-Element

Wenn die Shadow-Komponente eine Light-DOM-Komponente (`-wc`) rendert:

```typescript
@Component({ tag: 'kol-button', shadow: true })
export class KolButton implements ButtonProps, FocusableElement {
	@Element() private readonly host?: HTMLKolButtonElement;
	private buttonWcRef?: HTMLKolButtonWcElement;

	private readonly setButtonWcRef = (ref?: HTMLKolButtonWcElement) => {
		this.buttonWcRef = ref;
	};

	@Method()
	public async focus(): Promise<void> {
		return delegateFocus(this.host!, () => setFocus(this.buttonWcRef!));
	}

	public render(): JSX.Element {
		return (
			<KolButtonWcTag ref={this.setButtonWcRef} /* ...props */>
				<slot name="expert" slot="expert"></slot>
			</KolButtonWcTag>
		);
	}
}
```

Weitere Beispiele: `kol-link`, `kol-button-link`, `kol-link-button`, `kol-select`, `kol-accordion`, `kol-details`

#### Variante B: Direkt auf HTML5-Element

Wenn die Shadow-Komponente das fokussierbare HTML5-Element direkt rendert (ohne `-wc`-Zwischenschicht):

```typescript
@Component({ tag: 'kol-input-text', shadow: true })
export class KolInputText implements InputTextAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputTextElement;
	private inputRef?: HTMLInputElement;

	private readonly setInputRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	@Method()
	public async focus(): Promise<void> {
		return delegateFocus(this.host!, () => setFocus(this.inputRef!));
	}
}
```

Weitere Beispiele: `kol-input-email`, `kol-input-number`, `kol-input-file`, `kol-textarea`, `kol-combobox`, `kol-single-select`, `kol-input-radio`

### Regel 2: Light DOM Component (`shadow: false`)

**Nur** `setFocus()` verwenden. Kein `delegateFocus()` nötig, da kein Shadow DOM vorhanden ist und das Theme-System nicht abgewartet werden muss.

```typescript
@Component({ tag: 'kol-button-wc', shadow: false })
export class KolButtonWc implements ButtonAPI, FocusableElement {
	private buttonRef?: HTMLButtonElement;

	private readonly setButtonRef = (ref?: HTMLButtonElement) => {
		this.buttonRef = ref;
	};

	@Method()
	public async focus(): Promise<void> {
		return setFocus(this.buttonRef!);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<button ref={this.setButtonRef}>
					{/* content */}
				</button>
			</Host>
		);
	}
}
```

### Zusammenfassung der Regeln

| Komponente          | `shadow` | Focus-Methode                                    |
| ------------------- | -------- | ------------------------------------------------ |
| Shadow Component    | `true`   | `delegateFocus(this.host!, () => setFocus(ref))` |
| Light DOM Component | `false`  | `setFocus(ref)`                                  |

**Wichtig:**

- `delegateFocus` darf **nur** in `shadow: true`-Komponenten verwendet werden
- `setFocus` wird **in beiden Fällen** als eigentliche Focus-Funktion genutzt
- Ref-Callbacks speichern die Referenz zum Ziel-Element (`ref={this.setXxxRef}`)
- Alle `focus()`-Methoden sind `async` und geben `Promise<void>` zurück
- Die `@Method()`-Dekorator macht die Methode auf dem Custom Element aufrufbar
