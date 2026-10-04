# Focus Propagation Concept

Beschreibt, wie der Focus von einer KoliBri-Komponente an das fokussierbare HTML5-Element in ihrem Shadow DOM delegiert wird.

## Überblick

KoliBri Web Components verwenden Shadow DOM für Style-Isolation. Ein `focus()` auf dem Host-Element fokussiert nicht automatisch das innere interaktive Element, deshalb leitet die Komponente den Focus programmatisch an das tatsächlich fokussierbare HTML5-Element weiter.

Die zentrale Herausforderung: Bevor der Focus gesetzt werden kann, müssen die Adopted Style Sheets geladen und angewendet sein. Ohne diese Absicherung kann es zu Race Conditions kommen — der Focus wird auf ein Element gesetzt, das noch nicht vollständig gerendert ist.

Technisch kann ein früher `focus()` im Browser teilweise trotzdem funktionieren. Das ist jedoch nicht authentisch zum realen Nutzerverhalten: Interaktion soll erst auf final sichtbaren und stabil gerenderten Controls stattfinden. Für Tests bedeutet das: Kein Focus auf potenziell noch unsichtbare oder semantisch unvollständige Elemente. Deshalb wird `data-themed` als verbindliche Readiness-Bedingung verwendet.

## Architektur

Die Functional Component einer Komponente rendert das fokussierbare HTML5-Element direkt in den Shadow DOM der Komponente. Die Delegation hat deshalb genau eine Stufe:

```
┌─────────────────────────────────────────────────────────┐
│ Shadow Component: kol-button (shadow: true)             │
│ @Method() @delegateFocus('ctaRef') focus()              │
└─────────────────────────┬───────────────────────────────┘
                          ↓ wartet auf data-themed, dann setFocus(ctaRef.el)
┌─────────────────────────────────────────────────────────┐
│ HTML5 Element: <button class="kol-button__interactive-element"> │
│ Tatsächlich fokussierbar                                │
└─────────────────────────────────────────────────────────┘
```

Dasselbe gilt für alle anderen interaktiven Komponenten, z. B. `kol-link` (`<a>`), `kol-input-text` (`<input>`) oder `kol-select` (`<select>`).

### Eingebettete Komponenten

Rendert eine Komponente eine andere Komponente in ihrem Shadow DOM (z. B. die Sortier-Buttons von `kol-table-stateless` oder die Buttons von `kol-pagination`), dann rendert sie deren Functional Component über ein Item (`createButtonItem`, `createLinkItem`, …, siehe [ARC42 – Embedded Components (Items)](../packages/components/src/components/_skeleton/ARC42.md#embedded-components-items)). Ein eingebetteter Button ist kein eigenes Element und hat kein eigenes `focus()`. Der Browser fokussiert sein natives `<button>` direkt, per Tab-Navigation oder Klick. Das `focus()` der einbettenden Komponente zielt auf deren eigenes primäres Element.

### Das `data-themed`-Attribut

Das Theme-System setzt das `data-themed`-Attribut auf Shadow-Komponenten, sobald die Adopted Style Sheets geladen sind. Der Ablauf:

1. **Theme-Registrierung:** Beim Bootstrapping werden Themes über `register()` aus dem `adopted-style-sheets`-Paket registriert (`packages/components/src/core/bootstrap.ts`).

2. **Style-Anwendung:** Stencils `setMode()`-Callback wird für jede Komponente aufgerufen (`packages/components/src/global/script.ts`). Dort wird `setThemeStyle(elm, getThemeDetails(elm))` aufgerufen, um die Adopted Style Sheets in den Shadow DOM zu injizieren.

3. **Markierung:** `setThemeStyle()` setzt nach erfolgreicher Style-Anwendung das `data-themed`-Attribut auf dem Host-Element.

## Utility Functions

### `delegateFocus(host, callback)` — `packages/components/src/utils/element-focus.ts`

Zentrale Focus-Delegations-Funktion für Shadow Components. Wartet auf die Theme-Bereitschaft des Host-Elements und führt dann die Focus-Callback-Funktion aus.

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

- `host` — Das Host-Element der Komponente
- `callback` — Async Funktion, die `setFocus()` auf dem Ziel-Element aufruft

**Verhalten:**

1. Prüft, ob `data-themed` bereits gesetzt ist
2. Falls nicht: wartet über `waitForThemed()` (MutationObserver) bis maximal 5 Sekunden
3. Ruft dann den `callback` auf, der den eigentlichen Focus setzt
4. Bei Fehler (Timeout oder Focus-Fehler): wirft einen benutzerfreundlichen Fehler

Die Wartephase ist nicht nur technisch motiviert, sondern auch eine Qualitätsgrenze: Sie verhindert, dass Focus-Interaktionen in Tests oder in schneller Initialisierung auf UI-Zuständen stattfinden, die ein Nutzer so noch nicht sieht.

### `setFocus(element, options?)` — `packages/components/src/utils/element-focus.ts`

Fokussiert ein HTML-Element durch wiederholte Versuche pro Animation Frame (vereinfacht dargestellt):

```typescript
export async function setFocus(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.focus({ preventScroll: true });
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
- Der Browser scrollt beim Fokussieren nicht (`preventScroll`). Enthalten die `KolFocusOptions` `behavior`, `block` oder `inline`, scrollt `setFocus` das Element danach selbst per `scrollIntoView`.
- `afterFocus` wird aufgerufen, sobald das Element fokussiert ist, bei `behavior: 'smooth'` erst nach dem Ende des Scrollens

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

### `waitForThemed(host)` — `packages/components/src/utils/element-themed.ts`

Wartet per MutationObserver darauf, dass das `data-themed`-Attribut auf dem Host-Element gesetzt wird.

**Verhalten:**

- Beobachtet Attribut-Änderungen auf dem Host-Element
- Resolved sofort, wenn `data-themed` bereits gesetzt ist oder gesetzt wird
- Timeout nach `MAX_TIMEOUT_DURATION` (5000 ms) mit Error

## Umsetzung in Komponenten

### Interface

Alle fokussierbaren Komponenten implementieren das `FocusableElement`-Interface (`packages/components/src/schema/interfaces/FocusableElement.ts`):

```typescript
export interface FocusableElement {
	focus(options?: KolFocusOptions): Promise<void>;
}
```

### Ref und Decorator

Das Ziel-Element hält ein `CtaRef` aus `createCtaRef()`; die öffentliche Methode entsteht über einen Method-Decorator aus `packages/components/src/utils/element-interaction.ts`:

```typescript
@Component({ tag: 'kol-button', shadow: true })
export class KolButton extends BaseButtonWebComponent implements ButtonProps, FocusableElement {
	@Element() protected readonly host?: HTMLKolButtonElement;

	// In der Basisklasse: protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	// Die Functional Component setzt ihn am nativen Element: <button ref={ctaRef} …>

	@Method()
	@delegateFocus('ctaRef')
	public async focus(options?: KolFocusOptions): Promise<void> {}
}
```

`createCtaRef(isInactive?)` nimmt optional ein Prädikat entgegen. Solange es `true` liefert, liest sich `ctaRef.el` als `undefined` und `focus()` tut nichts. So bleibt ein deaktiviertes Element ohne natives `disabled` (z. B. `<a>`) für die öffentliche Methode unerreichbar.

### Die Decorators

| Decorator               | Verhalten                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `@delegateFocus('ref')` | Wartet über `delegateFocus` auf `data-themed` und fokussiert dann `ref.el` mit `setFocus`. Standard. |
| `@directFocus('ref')`   | Fokussiert `ref.el` mit `setFocus`, ohne auf `data-themed` zu warten (heute nur `kol-tree-item`).    |

**Wichtig:**

- Der Decorator ersetzt den Methodenrumpf; die Methode selbst bleibt leer.
- `setFocus` ist in beiden Fällen die eigentliche Focus-Funktion.
- Alle `focus()`-Methoden sind `async` und geben `Promise<void>` zurück.
- Der `@Method()`-Decorator macht die Methode auf dem Custom Element aufrufbar.
