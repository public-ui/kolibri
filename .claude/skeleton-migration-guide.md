# Skeleton-Migrations-Guide

## Intro: Was & Warum?

Das **Skeleton-Pattern** ist eine vierschichtige Architektur für KoliBri Web Components:

1. **Web Component** — Public API, Lifecycle, DOM Events
2. **Controller** — State Transitions, Validation, Render Props
3. **Functional Component** — Stateless View
4. **Props** — Normalisierung, Validierung, Typen

**Warum migrieren?** Alte Components sind oft monolithisch, schwer zu testen, mit vermischten Concerns. Das Skeleton Pattern garantiert wartbare, typsichere, vorhersagbare Code-Struktur.

**Wann migrieren?** Wenn eine Component überarbeitet wird oder neue Features braucht.

---

## High-Level Architektur (4 Schichten)

```
┌─ Consumer (Browser/Framework)
│
├─ [1] Web Component (kol-{name})
│      • @Prop() Deklarationen (unterstrichen: _name, _label)
│      • @Watch() auf Props (Prop Triangle!)
│      • Lifecycle: componentWillLoad()
│      • render() → <Host> + Functional Component
│
├─ [2] Controller (extends BaseController<Api>)
│      • setState / getState für Stencil Re-Renders
│      • componentWillLoad() für Init
│      • Watch-Methoden (normalisieren via Props)
│      • getRenderProp(key) für normalisierte Props
│      • Arrow Properties für Event Handler
│
├─ [3] Functional Component (stateless)
│      • Reine Render-Funktion
│      • Input: FunctionalComponentProps<Api>
│      • Output: JSX.Element
│      • Keine Side Effects, keine @State-Mutations
│
└─ [4] Props (src/internal/props/)
       • Per-Prop-Datei (label.ts, variant.ts, etc.)
       • Typ-Definition + normalize() + validate()
       • Wiederverwendbar über alle Components
```

---

## 5-Phasen Übersicht

### Phase 1: Analysis — Gap-Analyse

Lies alle Dateien der Component, dann die Skeleton-Referenz. Erstelle eine Tabelle:

| Aspect               | Aktuell               | Skeleton (Target)                        | Aktion     |
| -------------------- | --------------------- | ---------------------------------------- | ---------- |
| Web Component Basis  | `extends HTMLElement` | `extends BaseWebComponent<Api>`          | Refactor   |
| Props-Dateien        | Inline in Component   | In `src/internal/props/`                 | Migrate    |
| Controller           | Keine / Inline        | `extends BaseController<Api>`            | Create     |
| Functional Component | Keine / JSX inline    | In `src/internal/functional-components/` | Extract    |
| Validation           | Ad-hoc                | Via `propDefinition.apply()`             | Centralize |

→ **Siehe:** [`.claude/commands/migrate-to-skeleton.md`](./commands/migrate-to-skeleton.md#phase-1-analysis) für Details

### Phase 2: Props-First — Struktur etablieren (KRITISCH!)

Bevor du Code refaktorierst, migriere **alle Props**:

1. Sammle alle `@Prop()`-Deklarationen
2. Prüfe `src/internal/props/` auf Wiederverwendung (z.B. `label.ts` existiert oft)
3. Für jede neue Prop: eine Datei unter `src/internal/props/`
   - Dateiname: `<prop-name>.ts` (z.B. `variant-spin.ts`)
   - Type: `Prop<K, TExternal, TInternal>` oder `SimpleProp<K, T>`
   - Implementierung: `createPropDefinition<P>()` mit `normalize()` und `validate()`
4. Exportiere sie in `src/internal/props/index.ts`

→ **Siehe:** [`.claude/commands/migrate-to-skeleton.md`](./commands/migrate-to-skeleton.md#phase-2-props-first) für Beispiele

### Phase 3: Refactoring — Component-Implementierung

Implementiere die 4 Schichten nach ARC42:

#### [3a] API-Definition

**Datei:** `packages/components/src/internal/functional-components/{name}/api.tsx`

```typescript
import type { PropsConfigShape, ApiFromConfig } from '../generic-types';

const myPropsConfig = {
	required: [],
	optional: [labelProp, variantProp, showProp],
} as const satisfies PropsConfigShape;

export type MyApi = ApiFromConfig<typeof myPropsConfig>;
```

#### [3b] Controller

**Datei:** `packages/components/src/internal/functional-components/{name}/controller.ts`

```typescript
import type { SetStateFn, GetStateFn } from '../generic-types';

export class MyController extends BaseController<MyApi> {
	public constructor(setState: SetStateFn<MyApi>, getState: GetStateFn<MyApi>) {
		super(myPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<MyApi>): void {
		// Init mit Props von Web Component
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	// Event Handler als Arrow Property
	public handleClick = (): void => {
		// ...
	};
}
```

#### [3c] Functional Component

**Datei:** `packages/components/src/internal/functional-components/{name}/component.tsx`

```typescript
export const MyFC = (props: FunctionalComponentProps<MyApi>): JSX.Element => {
  return (
    <div class={bem.forBlock('kol-my')}>
      {props.label}
    </div>
  );
};
```

#### [3d] Web Component

**Datei:** `packages/components/src/components/{name}/web-components/{name}/component.tsx`

```typescript
@Component({ tag: 'kol-my', shadow: true })
export class KolMy extends BaseWebComponent<MyApi> implements WebComponentInterface<MyApi> {
  private readonly ctrl = new MyController(this.setState, this.getState);

  @Prop() public _label?: string;
  @Watch('_label')
  public watchLabel(value?: string): void {
    this.ctrl.watchLabel(value);
  }

  public componentWillLoad(): void {
    this.ctrl.componentWillLoad({ label: this._label });
  }

  public render(): JSX.Element {
    return (
      <Host>
        <MyFC label={this.ctrl.getRenderProp('label')} />
      </Host>
    );
  }
}
```

→ **Siehe:** [ARC42.md (Section 4–5)](../packages/components/src/components/_skeleton/ARC42.md) für detaillierte Patterns

### Phase 4: Dead Code Cleanup

Nach Refactoring: **keine Legacy-Code** mehr.

- Lösche alte Type/Interface-Dateien
- Entferne ungenutzte Imports, Typen, auskommentierter Code
- Prüfe: Jede Datei ist referenziert

### Phase 5: Validation

```bash
pnpm format
pnpm lint:es
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/components build
```

**Alle Befehle müssen erfolgreich sein.**

→ **Siehe:** [`.claude/commands/migrate-to-skeleton.md`](./commands/migrate-to-skeleton.md#phase-5-validation) für Details

---

## Kritische Patterns

### Prop Triangle (alle 3 Teile erforderlich!)

Jeder `@Prop()` muss drei Komponenten haben:

```typescript
// [1] Feld mit @Prop()
@Prop()
public _label?: string;

// [2] Watcher mit @Watch()
@Watch('_label')
public watchLabel(value?: string): void {
  this.ctrl.watchLabel(value);
}

// [3] Weiterleitung in componentWillLoad()
public componentWillLoad(): void {
  this.ctrl.componentWillLoad({
    label: this._label,
  });
}
```

**Fehler:** Prop ohne Watcher → Props ändern sich nicht zur Laufzeit.

### Controller Pattern: Arrow Properties vs Prototype Methods

| Art                  | Verwendung                           | Beispiel                      |
| -------------------- | ------------------------------------ | ----------------------------- |
| **Arrow Property**   | Event Handler, Ref Setter            | `handleClick = () => { ... }` |
| **Prototype Method** | Lifecycle (componentWillLoad), Watch | `watchLabel(value?: string)`  |

**Grund:** Arrow Properties haben immer `this` gebunden; Prototype Methods sind effizienter für Lifecycle.

### State Management: Render Props vs @State

| Kategorie               | Wo gespeichert          | Auslöst Re-Render? | Beispiel                           |
| ----------------------- | ----------------------- | ------------------ | ---------------------------------- |
| **Normalisierte Props** | `setRenderProp()`       | Nein (optimiert)   | `label` (normalisiert aus \_label) |
| **Managed State**       | `setState()` + `@State` | Ja (Stencil)       | `showToggled`, `expanded`          |

→ **Siehe:** [ARC42.md (Section 4)](../packages/components/src/components/_skeleton/ARC42.md#controller-layer) für Vertiefung

### ARIA IDs eindeutig halten

Wenn eine Component ARIA-Attribute mit IDs nutzt:

```typescript
import { nonce } from '@public-ui/shared';

export class MyController extends BaseController<MyApi> {
	private readonly labelId = `kol-my-label-${nonce()}`;

	// Nutze labelId in aria-labelledby, aria-controls, etc.
}
```

**Grund:** Pro Web Component-Instanz unique IDs, damit mehrere auf einer Seite funktionieren.

---

## File-Struktur nach Migration

Beispiel: **Spin** Component (fertig migriert)

```
packages/components/
├── src/
│   ├── components/
│   │   └── spin/                          ← Component-Verzeichnis
│   │       ├── web-components/            ← nur Web Component(s)
│   │       │   └── spin/
│   │       │       ├── component.tsx      ← @Component { tag: 'kol-spin' }
│   │       │       └── snapshot.spec.tsx  ← Tests
│   │       └── style.scss                 ← Styles
│   │
│   └── internal/
│       ├── functional-components/
│       │   └── spin/                      ← Component-Logik
│       │       ├── api.tsx                ← PropsConfigShape + ApiFromConfig
│       │       ├── controller.ts          ← State, Validation
│       │       └── component.tsx          ← Stateless Renderer
│       │
│       └── props/
│           ├── variant-spin.ts            ← @Prop(_variant)
│           ├── show.ts                    ← @Prop(_show) [wiederverwendet]
│           ├── label.ts                   ← @Prop(_label) [wiederverwendet]
│           └── index.ts                   ← Re-exports
```

**Regel:** Keine `web-components/{name}/` Subdirs für neue Components! (nur bei sehr seltenen Multi-Element-Components)

---

## Häufige Fehler & Fallstricke

### ❌ 1. `web-components/` Unterordner bei neuen Components

**Problem:** Alte Components haben `web-components/{name}/`, neue sollten das **nicht** haben.

```
❌ packages/components/src/components/my-new/
   └── web-components/
       └── my-new/
           └── component.tsx
```

**Richtig:**

```
✅ packages/components/src/components/my-new/
   ├── web-components/
   │   └── component.tsx          ← direkt hier, kein Unterordner!
   └── style.scss
```

**Impact:** Schneller Build, weniger Dateien, konsistent mit neuen Components.

---

### ❌ 2. State-Feld deklariert aber nicht benutzt

**Problem (Spin):** `@State() showToggled: boolean = false;` — wird nie mutiert oder genutzt.

```typescript
@State()
public showToggled: boolean = false;  // ← Nie genutzt!

public componentWillLoad(): void {
  this.ctrl.componentWillLoad({
    show: this._show,
    // ... showToggled nie initialisiert
  });
}
```

**Aktion:** State-Felder entweder nutzen oder löschen.

**Impact:** Code-Clutter, verwirrende Interfaces, falsche Expectations beim Lesen.

---

### ❌ 3. `<Host>` mit `class="kol-component-name"`

**Problem:** Shadow DOM braucht keine redundante Host-Klasse.

```typescript
❌ <Host class="kol-my">  ← Unnötig
     <MyFC ... />
   </Host>
```

**Richtig:**

```typescript
✅ <Host>                  ← Bare Host
     <MyFC ... />
   </Host>
```

**Grund:** Der Tag-Name `kol-my` ist Identifier genug; Shadow DOM isoliert ohnehin.

**Impact:** Redundanter CSS, größere Bundle-Size, verwirrende Selektoren.

---

### ❌ 4. `reflect: true` auf Props vergessen

**Problem:** Prop ändert sich in der Component, aber nicht im HTML-Attribute.

```typescript
❌ @Prop() public _label?: string;  ← Nicht reflektiert!
```

**Richtig (wenn needed):**

```typescript
✅ @Prop({ reflect: true }) public _label?: string;
```

**Wann?** Wenn die Prop von außen genutzt wird (z.B. `el.getAttribute('_label')`).

**Impact:** Unbewusste Prop-Änderungen, unerwartete Verhalten in Tests.

---

### ❌ 5. Event Handler in Lifecycle-Methode statt Arrow Property

**Problem:** Handler wird jedes Mal neu erzeugt, Memory Leak in Event Listeners.

```typescript
❌ public componentWillLoad(): void {
     element.addEventListener('click', () => { /* ... */ });
     // ← Neuer Handler pro Lifecycle, alter wird nie entfernt!
   }
```

**Richtig:**

```typescript
✅ public handleClick = (): void => {
     // ← Definiert als Arrow Property, persistiert über Lifecycle
   };

   public componentDidLoad(): void {
     element.addEventListener('click', this.handleClick);
   }
```

**Impact:** Memory Leak, Event Handler stapeln sich, Komponente wird bloated.

---

### ❌ 6. Props-Dateien inline statt in `src/internal/props/`

**Problem:** Props nicht wiederverwendbar, Duplikation über Components.

```typescript
❌ // In my-component/component.tsx
   export type LabelProp = string;
   export const normalizeLabelProp = (v?: string) => v ?? '';
```

**Richtig:**

```typescript
✅ // In src/internal/props/label.ts (einmalig)
   export const labelProp = createPropDefinition<{
     key: 'label';
     type: string;
   }>({
     /* ... */
   });

   // Nutze in mehreren Components
```

**Impact:** DRY-Verletzung, Inconsistency in Normalisierung, schwer zu warten.

---

### ❌ 7. JSDoc-Typen in TypeScript

**Problem:** Alte Stile, nicht nötig mit TS, confusing.

```typescript
❌ /**
    * @param {string} label - The label
    * @returns {void}
    */
   public watchLabel(value?: string): void { /* ... */ }
```

**Richtig:**

```typescript
✅ // Typen in Signatur; JSDoc nur für Stencil-Infos (@Prop, @Event, @Method)
   /**
    * Makes the element visible.
    */
   @Prop()
   public _show?: boolean;
```

**Impact:** Veralteter Code-Style, redundant mit TS-Types.

---

## Checkliste vor Review

Vor Pull Request: Diese Punkte checken.

- [ ] **Prop Triangle:** Alle `@Prop()` haben `@Watch()` + `componentWillLoad()`-Init
- [ ] **Controller:** Extends `BaseController<Api>`, hat `setState`/`getState` im Constructor
- [ ] **FC stateless:** Keine `@State`, keine Side Effects, keine Hook-Calls
- [ ] **API-Definition:** `PropsConfigShape` + `ApiFromConfig` existiert
- [ ] **Props-Dateien:** In `src/internal/props/` mit `normalize` + `validate`
- [ ] **`<Host>` bare:** Keine redundante `class="kol-..."`
- [ ] **Kein Dead Code:** Keine ungenutzte Imports/Types/Kommentare
- [ ] **Keine JSDoc-Typen:** Nur TS-Signaturen, JSDoc für Stencil-Infos (@Prop, @Event)
- [ ] **Tests co-located:** `snapshot.spec.tsx` und `interaction.e2e.ts` neben `component.tsx`
- [ ] **Alle Commands grün:** `pnpm format`, `pnpm lint:es`, `pnpm test:unit` ✓

---

## Weiterführende Ressourcen

- **[ARC42.md](../packages/components/src/components/_skeleton/ARC42.md)** — Vollständige Architektur-Spezifikation (Sections 4–5: Web Component, Controller, Renderer Patterns)
- **[migrate-to-skeleton.md](./.claude/commands/migrate-to-skeleton.md)** — Schritt-für-Schritt Anleitung für Agents/Developer
- **[Skeleton Blueprint](../packages/components/src/components/_skeleton/)** — Referenz-Implementierung im Code
  - Web Component: `web-components/skeleton/component.tsx`
  - Controller: `src/internal/functional-components/skeleton/controller.ts`
  - FC: `src/internal/functional-components/skeleton/component.tsx`
- **[Spin Component](../packages/components/src/components/spin/)** — Real-world Beispiel einer migrierten Component

---

## Schnell-Referenz: API-Struktur

```typescript
// Prop-Definition (wiederverwendbar)
export const labelProp = createPropDefinition<{
  key: 'label';
  type: string;
}>({
  normalize: normalizeString,
  validate: (v) => v.length > 0,
});

// PropsConfigShape (definiert API)
const myPropsConfig = {
  required: [],
  optional: [labelProp, showProp, variantProp],
} as const satisfies PropsConfigShape;

// API-Type (auto-derived)
export type MyApi = ApiFromConfig<typeof myPropsConfig>;

// Controller (uses setState/getState)
export class MyController extends BaseController<MyApi> {
  public constructor(setState: SetStateFn<MyApi>, getState: GetStateFn<MyApi>) {
    super(myPropsConfig, setState, getState);
  }
}

// FC (stateless render)
export const MyFC = (props: FunctionalComponentProps<MyApi>): JSX.Element => {
  return <div>{props.label}</div>;
};

// Web Component (connects everything)
@Component({ tag: 'kol-my', shadow: true })
export class KolMy extends BaseWebComponent<MyApi> {
  private readonly ctrl = new MyController(this.setState, this.getState);
  // ... @Prop, @Watch, render() ...
}
```

---

**Stand:** März 2026
**Basiert auf:** Spin-Migration, ARC42 Spec, migrate-to-skeleton.md
