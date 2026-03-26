# Focus Propagation Concept

Definiert den fokussierbaren Durchsatz durch die Schichten: Shadow → Light DOM → HTML5.

## Utility Functions (`element-focus.ts`)

### `waitForThemed(host: HTMLElement): Promise<void>`

Wartet darauf, dass das Theme-System das Host-Element als bereit markiert (`data-themed`-Attribut).

```typescript
function waitForThemed(host: HTMLElement): Promise<void> {
	const observed = new Promise<void>((resolve) => {
		const observer = new MutationObserver(() => {
			observer.disconnect();
			resolve();
		});
		observer.observe(host, {
			attributes: true,
			attributeFilter: ['data-themed'],
		});
	});

	const timeout = new Promise<void>((_, reject) => {
		setTimeout(() => reject(new Error('Timeout waiting for data-themed attribute')), 5000);
	});

	return Promise.race([observed, timeout]);
}
```

**Zweck:**

- Verhindert Race Conditions zwischen Shadow DOM Rendering und Focus-Setting
- Timeout nach 5s falls Styling nie komplett wird
- Nur für Shadow Components notwendig

---

### `delegateFocus(host: HTMLElement, callback: () => Promise<void>): Promise<void>`

Zentrale Focus-Delegations-Methode für Shadow Components.

```typescript
export async function delegateFocus(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			`The interactive element inside the KoliBri web compontent could not be focused. Try calling the focus method on the web component after a short delay again.`,
		);
	}
}
```

**Verwendung:**

```typescript
// In Shadow Component @Method()
public async focus(): Promise<void> {
  return delegateFocus(this.host!, async () => this.innerWcRef?.focus?.());
}
```

**Signatur:**

- `host: HTMLElement` — Das Shadow Component Host-Element (Required)
- `callback: () => Promise<void>` — Async Funktion die den inneren Element fokussiert

---

### `setFocus(element: HTMLElement): Promise<void>`

Fallback-Methode die ein Element durch wiederholte RAF-Polls fokussiert.

```typescript
export async function setFocus(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.focus();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (document.activeElement !== element && attempts < 10);
}
```

---

## Architektur-Schichten

Das Kolibri-Component-System besteht aus drei Schichten für Focus-Delegation:

```
┌──────────────────────────────────────────────┐
│ Shadow Component (z.B. `kol-button`)         │
│ - shadow: true                               │
│ - @Method() focus() → delegateFocus() nutzen │
└──────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│ Light DOM Component (z.B. `kol-button-wc`)   │
│ - shadow: false                              │
│ - @Method() focus() → direktes Fokussieren   │
│ - hält Ref zum HTML5-Element                 │
└──────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────┐
│ HTML5 Element (z.B. `<button>`)              │
│ - tatsächlich fokussierbar                   │
│ - ref über Stencil gespeichert               │
└──────────────────────────────────────────────┘
```

## Focus-Ablauf

### 1. Shadow Component (`kol-button`)

```typescript
@Component({ tag: 'kol-button', shadow: true })
export class KolButton {
  @Element() private readonly host?: HTMLKolButtonElement;
  private buttonWcRef?: HTMLKolButtonWcElement;

  @Method()
  public async focus(): Promise<void> {
    return delegateFocus(this.host!, async () => this.buttonWcRef?.focus?.());
  }

  private readonly setButtonWcRef = (ref: HTMLKolButtonWcElement | null) => {
    this.buttonWcRef = ref || undefined;
  }

  public render(): JSX.Element {
    return (
      <kol-button-wc ref={this.setButtonWcRef}>
        {/* props */}
      </kol-button-wc>
    );
  }
}
```

**Ablauf:**

1. Shadow Component `focus()` wird aufgerufen
2. `delegateFocus()` wartet bis Host das `data-themed`-Attribut hat
3. Dann ruft `callback()` die innere WC-Komponente auf: `this.buttonWcRef?.focus?.()`
4. Fehler werden mit freundlichem Error-Text geworfen

### 2. Light DOM Component (`kol-button-wc`)

```typescript
@Component({ tag: 'kol-button-wc', shadow: false })
export class KolButtonWc {
  @Element() private readonly host?: HTMLKolButtonWcElement;
  private buttonRef?: HTMLButtonElement;

  @Method()
  public async focus(): Promise<void> {
    return setFocus(this.buttonRef!);
  }

  private readonly setButtonRef = (ref: HTMLButtonElement | null) => {
    this.buttonRef = ref || undefined;
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

**Ablauf:**

1. Light DOM Component `focus()` wird aufgerufen
2. Direktes Fokussieren des HTML5-Elements über Ref
3. Keine `delegateFocus()` nötig (Light DOM ist sofort synchron verfügbar)
4. `setFocus()` Promise

### 3. HTML5 Element

Das `<button>`-Element wird fokussiert:

```typescript
this.buttonRef?.focus();
```
