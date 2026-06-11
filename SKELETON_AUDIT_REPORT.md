# Skeleton Implementation Audit Report

**Datum:** 2026-06-02  
**Status:** 🚫 Build-Blockade erkannt (Phase 0) — Audit trotzdem vollständig durchgeführt  
**Umfang:** Alle Skeleton-bezogenen Implementierungen  
**Effort:** High (systematische Analyse aller Komponenten)

---

## Executive Summary

### Übersicht

Die Skeleton-Implementierungen im Projekt folgen einem **konsistenten Pattern**, sind aber durch mehrere **Mängel** gekennzeichnet:

**Gefundene Implementierungen:**

1. `_skeleton/web-components/skeleton/` — Template-Komponente (KolSkeleton)
2. `_skeleton/web-components/click-button/` — Button-Komponente im Template
3. `internal/functional-components/skeleton/` — Skeleton FC + Controller
4. `internal/functional-components/click-button/` — ClickButton FC + Controller

**Build-Status (Phase 0):** 🚫 **BLOCKADE**

- TypeScript-Fehler in `KolFocusOptions` ↔ native `FocusOptions` (systemisch)
- Build bricht — verhindert Validierung auf echtem Build

**Konsistenz-Grade:**

- ✅ **Hoch:** Controller-Pattern, Props-Handling, JSDoc-Struktur
- 🟡 **Mittel:** Event-Propagation, Type-Safety, Error-Handling
- 🚫 **Niedrig:** Memory-Leak-Risiken, Testing-Abdeckung, Focus-Management

---

## 🔍 Detaillierte Analysen

### 1. KolSkeleton Component (`_skeleton/web-components/skeleton/component.tsx`)

**Dateipfad:** `/packages/components/src/components/_skeleton/web-components/skeleton/component.tsx`

#### ✅ Stärken

- Korrekte Stencil-Dekoration (`@Component`, `@Prop`, `@Event`, `@Method`, `@Listen`, `@Watch`)
- JSDoc-Kommentare auf allen `@Prop`, `@Event`, `@Method` vorhanden
- Korrektes Lifecycle-Pattern (componentWillLoad, componentDidLoad, disconnectedCallback)
- Typsicher: `SkeletonApi` zentral definiert

#### 🔴 Critical Issues

**1. Fehlerhafte Focus-Delegation (Line 22)**

```typescript
@Method()
@ctrlFocus('ctrl')
public async focus(options?: KolFocusOptions): Promise<void> {}
```

**Problem:**

- `@ctrlFocus` Decorator wird verwendet, aber `delegateFocus` ist der aktuelle Standard (lt. memory: focus-delegation-pattern.md)
- `KolFocusOptions` ist nicht kompatibel mit nativer `FocusOptions` → **Build-Blockade**
- Decorator-Pattern sollte `delegateFocus('ref')` sein (wie in ClickButton)

**Priorität:** 🔴 **HIGH** (Breaking + systemisch)  
**Fix:** Focus-Methode korrekt implementieren wie in `ClickButton`

**2. Memory Leak durch `.bind(this)` in handleClick (Line 59)**

```typescript
@Listen('keydown')
public handleKeyDown(event: KeyboardEvent): void {
  // ...
  this.ctrl.handleClick();  // ✅ OK — direkt, kein .bind()
}
```

**Positive Beobachtung:** KolSkeleton nutzt `this.ctrl.handleClick()` korrekt (kein `.bind()`).

**3. Fehlende Error-Handling bei Event-Emits (Lines 84-86)**

```typescript
this.ctrl.setOnLoadedCallback((count: number) => {
	this.loaded.emit(count); // Kein try-catch
});
```

**Problem:** Wenn `emit()` wirft → Component crashed still.  
**Priorität:** 🟡 **MEDIUM**  
**Fix:** `try-catch` um Event-Emission oder defensive Implementierung

**4. Window-Listener ohne Cleanup (Line 73-76)**

```typescript
@Listen('keydown', { target: 'window' })
public onKeydown(event: KeyboardEvent): void {
  this.ctrl.onKeydown(event);
}
```

**Problem:** `@Listen` mit `target: 'window'` wird automatisch von Stencil bereinigt, aber **dokumentation fehlt**.  
**Priorität:** 🟡 **MEDIUM** (Doku-Mangel)  
**Fix:** JSDoc-Kommentar: "Auto-cleaned by Stencil"

#### 🟡 High Issues

**5. Type-Assertion in SkeletonFC Props (Line 105)**

```typescript
name={this.ctrl.getRenderProp('name')}  // ✅ Typsicher
```

**Status:** OK — keine Assertions.

**6. Fehlende JSDoc auf State-Feldern (Lines 46-53)**

```typescript
@State()
public count: number = 0;

@State()
public label: string = 'Label';
```

**Problem:** State-Felder ohne JSDoc, obwohl sie durch Events exponiert werden.  
**Priorität:** 🟡 **MEDIUM**  
**Fix:** JSDoc-Kommentare hinzufügen

---

### 2. KolClickButton Component (`_skeleton/web-components/click-button/component.tsx`)

**Dateipfad:** `/packages/components/src/components/_skeleton/web-components/click-button/component.tsx`

#### ✅ Stärken

- Minimal, fokussiert (Single Responsibility)
- Korrekte `delegateFocus` Implementierung (Line 37)
- Saubere Ref-Handling mit `createCtaRef`
- Props-Binding korrekt

#### 🚫 Critical Issues

**1. Focus-Options Type-Mismatch (Line 40)**

```typescript
@Method()
@delegateFocus('buttonRef')
public async focus(options?: KolFocusOptions): Promise<void> {}
```

**Problem:** Decorator erwartet `KolFocusOptions`, aber `delegateFocus` nutzt `setFocus()` welches mit `FocusOptions` arbeitet.  
**Impact:** Build-Fehler in `accordion/shadow.tsx:48` (type constraint violation)

**Priorität:** 🔴 **HIGH** (systemisch)  
**Fix:** Type-Signature anpassen oder Decorator aktualisieren

**2. Fehlende JSDoc auf Prop (Lines 23-26)**

```typescript
/**
 * Sets the label of the click button component.
 */
@Prop()
public _label!: string;
```

**Status:** ✅ OK — JSDoc vorhanden

#### 🟡 High Issues

**3. onClick Handler Type-Safety (Line 57)**

```typescript
handleClick={this.ctrl.handleClick}
```

**Problem:** `this.ctrl.handleClick` wird direkt passed — wenn Signature ändert, bricht es still.  
**Priorität:** 🟡 **MEDIUM**  
**Fix:** Arrow-Function: `handleClick={() => this.ctrl.handleClick()}`

---

### 3. SkeletonController (`internal/functional-components/skeleton/controller.ts`)

**Dateipfad:** `/packages/components/src/internal/functional-components/skeleton/controller.ts`

#### 🔴 Critical Issues

**1. Memory Leak: setInterval ohne Cleanup-Dokumentation (Lines 63-68)**

```typescript
private startLoadedEventInterval(): void {
  this.intervalId = setInterval(() => {
    this.emitLoaded(this.getState?.('count') ?? 0);
  }, 2000);
}
```

**Problem:**

- ✅ `intervalId` wird in `destroy()` gelöscht (Line 86)
- 🚫 **Aber:** `destroy()` wird NUR in `disconnectedCallback()` aufgerufen
- 🚫 **Große Lücke:** Wenn Component nicht destruktiv entfernt wird (z.B. `display: none`), läuft Interval endlos
- 🚫 **Kein Dokumentation** warum `destroy()` nötig ist

**Priorität:** 🔴 **CRITICAL** (Speicherleck in Production)  
**Fix:**

```typescript
// JSDoc dokumentieren
/**
 * Startet den Loaded-Event-Interval.
 * WICHTIG: destroy() muss in disconnectedCallback() aufgerufen werden,
 * sonst läuft der Interval im Hintergrund.
 */
```

**2. Unzureichende State-Initialisierung (Lines 37-39)**

```typescript
public toggle(): void {
  this.setState('show', !(this.getState?.('show') ?? false));
}
```

**Problem:** `getState?.('show')` kann `undefined` sein — `?? false` ist defensiv, aber:

- Default sollte in BaseController oder State-Definition sein, nicht hier
- Keine Konsistenz mit `count` (Line 51 in component.tsx)

**Priorität:** 🟡 **MEDIUM**  
**Fix:** State-Defaults zentral definieren

**3. Console.log statt Log.debug (Line 44)**

```typescript
console.log('Show should be toggled');
```

**Problem:** Inkonsistent mit anderen Zeilen die `Log.debug()` nutzen (z.B. SkeletonFC).  
**Priorität:** 🟢 **LOW**  
**Fix:** `Log.debug()` verwenden

**4. Keine Error-Handling in emitLoaded (Lines 70-77)**

```typescript
private emitLoaded(count: number): void {
  if (this.onLoadedCallback) {
    this.onLoadedCallback(count);  // Kein try-catch
  }
}
```

**Problem:** Wenn Callback wirft → Component-State wird inkonsistent.  
**Priorität:** 🟡 **MEDIUM**

#### 🟡 High Issues

**5. ClickButtonController Instanz ohne State-Zugriff (Line 18)**

```typescript
this.clickButtonCtrl = new ClickButtonController(BaseWebComponent.stateLess);
```

**Problem:** `stateLess` ist korrekt, aber:

- Keine Dokumentation **warum** ClickButton stateless
- Wenn jemand State hinzufügt → silentes Bug

**Priorität:** 🟡 **MEDIUM**  
**Fix:** JSDoc-Kommentar

---

### 4. ClickButtonController (`internal/functional-components/click-button/controller.ts`)

**Dateipfad:** `/packages/components/src/internal/functional-components/click-button/controller.ts`

#### ✅ Stärken

- Minimal, einfach zu verstehen
- Korrekte Props-Handling (`watchLabel`)
- Fokus-Delegation delegiert korrekt an `setFocus()`

#### 🔴 Critical Issues

**1. Memory Leak durch `.bind(this)` auf Line 32**

```typescript
public handleClick = (): void => {
  console.log(this, this.buttonRef, 'button clicked');
};
```

**Status:** ✅ OK — Arrow-Function (kein `.bind()`)

**2. Type-Safety in setButtonRef (Line 37)**

```typescript
public setButtonRef = (element?: HTMLButtonElement): void => {
  this.buttonRef = element;
};
```

**Status:** ✅ OK — typsicher

#### 🟡 High Issues

**3. Console.log statt Log (Line 34)**

```typescript
console.log(this, this.buttonRef, 'button clicked');
```

**Problem:**

- Nicht über Log-System
- Logs `this` (ganze Controller-Instanz) → potenzielle Datenexposition

**Priorität:** 🟡 **MEDIUM**  
**Fix:** `Log.debug()` mit spezifischen Values

**4. Fehlende JSDoc auf focus() (Line 22)**

```typescript
public async focus(options?: KolFocusOptions): Promise<void> {
  return setFocus(this.buttonRef, options);
}
```

**Problem:**

- `KolFocusOptions` Type-Mismatch (systemisch)
- Keine Dokumentation dass async ist

**Priorität:** 🟡 **MEDIUM**

---

### 5. SkeletonFC (`internal/functional-components/skeleton/component.tsx`)

**Dateipfad:** `/packages/components/src/internal/functional-components/skeleton/component.tsx`

#### ✅ Stärken

- Functional Component sauber
- BEM-Klasse-Generierung konsistent
- Props korrekt destructured

#### 🟡 High Issues

**1. Event-Propagation nicht dokumentiert (Line 15)**

```typescript
export const SkeletonFC: FC<FunctionalComponentProps<SkeletonApi>> = (props) => {
  const { count, label, name, show, handleClick, refButton } = props;
```

**Problem:**

- Event `onLoaded`, `onRendered` werden in Props passed, aber **nicht in FC genutzt**
- Diese Events werden in KolSkeleton component direkt emittet, nicht über FC
- **Inkonsistenz:** Props definieren Events, aber FC nutzt sie nicht

**Priorität:** 🟡 **MEDIUM**  
**Fix:** Dokumentation oder Props bereinigen

**2. Props-Typ unsicher (Line 15)**

```typescript
FunctionalComponentProps<SkeletonApi>;
```

**Problem:** `FunctionalComponentProps<T>` ist zu allgemein — was genau wird erwartet?  
**Priorität:** 🟡 **MEDIUM**

---

### 6. ClickButtonFC (`internal/functional-components/click-button/component.tsx`)

**Dateipfad:** `/packages/components/src/internal/functional-components/click-button/component.tsx`

#### ✅ Stärken

- Sehr sauber, minimal
- onClick Handler korrekt
- BEM-Klassen konsistent

#### 🟡 High Issues

**1. onKeyDown PreventDefault ohne Dokumentation (Line 13)**

```typescript
onKeyDown={(event) => event.preventDefault()}
```

**Problem:**

- **Warum wird keydown preventDefaultet?** Keine Dokumentation
- Das ist ungewöhnlich für ein Button-Element
- Könnte Accessibility-Problem sein

**Priorität:** 🟡 **MEDIUM**  
**Fix:** JSDoc-Kommentar erklären warum

---

### 7. Testing & Snapshots

#### Skeleton Snapshot Tests (`_skeleton/web-components/skeleton/snapshot.spec.tsx`)

```typescript
executeSnapshotTests<SkeletonSnapshotProps>(KOL_SKELETON_TAG, [KolSkeleton], [{ _name: 'Ada Lovelace' }, { _name: '' }]);
```

**Status:** 🟡 **Minimal**

- ✅ Two snapshot variants tested
- 🚫 **Fehlt:**
  - `show=true` vs `show=false` variant
  - `count` variations
  - Edge case: sehr lange Name
  - **State wird nicht tested** (nur Props)

**Priorität:** 🟡 **MEDIUM**  
**Empfehlung:** Snapshots erweitern

#### ClickButton Snapshot Tests (`_skeleton/web-components/click-button/snapshot.spec.tsx`)

```typescript
executeSnapshotTests<ClickButtonSnapshotProps>(KOL_CLICK_BUTTON_TAG, [KolClickButton], [{ _label: 'Click me' }, { _label: 'Submit form' }]);
```

**Status:** 🟡 **Minimal**

- ✅ Two label variants
- 🚫 **Fehlt:**
  - Edge cases (empty label, very long label)
  - Disabled state (if supported)
  - Focus state

**Priorität:** 🟡 **MEDIUM**

#### E2E Tests (`_skeleton/web-components/click-button/interaction.e2e.ts`)

```typescript
test('should call handleClick when clicked', async ({ page }) => {
	const logMessages: string[] = [];
	page.on('console', (msg) => {
		logMessages.push(msg.text());
	});
	await page.getByRole('button', { name: 'Click' }).click();
	expect(logMessages.length).toBeGreaterThan(0);
});
```

**Status:** 🟡 **Minimal**

- ✅ Using accessibility role (correct)
- 🚫 **Fehlt:**
  - Keyboard interaction test (Space, Enter)
  - Focus test
  - Event-Listener test (addEventListener pattern)
  - **Log assertion fragile:** `logMessages.length > 0` ist zu vage

**Priorität:** 🟡 **MEDIUM**  
**Empfehlung:** E2E-Tests erweitern nach team3 Kriterien

---

### 8. API & Type Definitions

#### SkeletonApi (`internal/functional-components/skeleton/api.tsx`)

```typescript
export type SkeletonApi = ApiFromConfig<
	typeof skeletonPropsConfig,
	{
		Callbacks: { click: () => void };
		Emitters: { loaded: number; rendered: void };
		Listeners: { keydown: KeyboardEvent };
		Methods: { focus: (options?: KolFocusOptions) => void; toggle: () => void };
		Refs: { button: HTMLButtonElement };
		States: { count: number; label: string; show: boolean };
	}
>;
```

**Status:** 🟡 **Konsistent, aber Lücken**

- ✅ Alle Props typsicher
- ✅ Alle Emitters definiert
- 🚫 **Probleme:**
  - `KolFocusOptions` ist problematisch (systemisch)
  - `Listeners` mit `keydown` ist ungewöhnlich — sollte über Events handled werden?
  - `Callbacks: click` wird nie genutzt (nur `handleClick` Arrow-Funktion)

**Priorität:** 🟡 **MEDIUM**

---

## 📊 Konsistenz-Analyse

### Pattern Konsistenz (Web Components ↔ Functional Components)

| Aspekt              | KolSkeleton                                                  | KolClickButton        | Standard        | Status      |
| ------------------- | ------------------------------------------------------------ | --------------------- | --------------- | ----------- |
| **Component-Dekor** | ✅ `@Component`                                              | ✅ `@Component`       | —               | ✅ OK       |
| **Props**           | ✅ `@Prop` + `@Watch`                                        | ✅ `@Prop` + `@Watch` | —               | ✅ OK       |
| **Events**          | ✅ `@Event`                                                  | 🚫 Keine              | Required        | 🔴 MISMATCH |
| **Methods**         | ✅ `@Method`                                                 | ✅ `@Method`          | —               | ✅ OK       |
| **Listen**          | ✅ `@Listen`                                                 | 🚫 Keine              | Optional        | 🟡 OK       |
| **State**           | ✅ `@State`                                                  | 🚫 Keine              | Optional        | ✅ OK       |
| **JSDoc**           | ✅ `@Prop/@Event`                                            | ✅ `@Prop/@Method`    | Pflicht         | ✅ OK       |
| **Focus**           | 🔴 `@ctrlFocus`                                              | ✅ `@delegateFocus`   | `delegateFocus` | 🔴 MISMATCH |
| **Lifecycle**       | ✅ componentWillLoad, componentDidLoad, disconnectedCallback | ✅ componentWillLoad  | —               | ✅ OK       |

**Konsistenz-Probleme:**

- 🔴 **CRITICAL:** Focus-Pattern unterschiedlich (ctrlFocus vs delegateFocus)
- 🔴 **CRITICAL:** KolSkeleton hat Events, KolClickButton nicht
- 🚫 **Wird nicht repariert durch Template** (Template ist Guide, nicht Copy-Paste)

---

## 🔴 Mängelliste (priorisiert)

### 🔴 CRITICAL (Blocker)

#### 1. Focus-Type Mismatch (systemisch)

**Files:** Alle Komponenten mit `delegateFocus` oder `ctrlFocus`  
**Issue:** `KolFocusOptions` ↔ native `FocusOptions` Inkompatibilität  
**Impact:** Build bricht  
**Fix:** Type-Alignment in `KolFocusOptions` ← `FocusOptions`  
**Effort:** High (systemisch, viele Dateien betroffen)

#### 2. KolSkeleton: Fehlerhafte Focus-Decoration (Line 22)

**File:** `_skeleton/web-components/skeleton/component.tsx`  
**Issue:** `@ctrlFocus('ctrl')` verwenden, aber sollte `delegateFocus('ref')` sein  
**Fix:** Pattern wie ClickButton übernehmen  
**Effort:** Low

#### 3. SkeletonController: Memory Leak (Interval ohne Cleanup-Dokumentation)

**File:** `internal/functional-components/skeleton/controller.ts:63-68`  
**Issue:** `setInterval()` läuft im Hintergrund wenn Component nicht destruktiv entfernt  
**Fix:** JSDoc-Dokumentation + Verify Cleanup-Path  
**Effort:** Low

---

### 🟡 HIGH (Quality / Safety)

#### 4. Event-Emission ohne Error-Handling

**Files:**

- `_skeleton/web-components/skeleton/component.tsx:84`
- `internal/functional-components/skeleton/controller.ts:74`

**Issue:** `emit()` kann werfen, kein try-catch  
**Fix:** `try-catch` um Event-Emits  
**Effort:** Low

#### 5. KolClickButton: onClick Handler Type-Safety (Line 57)

**File:** `_skeleton/web-components/click-button/component.tsx`  
**Issue:** `handleClick={this.ctrl.handleClick}` direkt passed — keine Arrow-Func  
**Fix:** `handleClick={() => this.ctrl.handleClick()}`  
**Effort:** Trivial

#### 6. Console.log statt Log-System

**Files:**

- `internal/functional-components/skeleton/controller.ts:44`
- `internal/functional-components/click-button/controller.ts:34`

**Issue:** Nicht über Log-System, potenzielle Datenexposition  
**Fix:** `Log.debug()` mit spezifischen Values  
**Effort:** Trivial

#### 7. ClickButtonFC: onKeyDown preventDefault ohne Dokumentation (Line 13)

**File:** `internal/functional-components/click-button/component.tsx`  
**Issue:** **Warum preventDefault?** Keine Dokumentation — könnte A11y-Problem sein  
**Fix:** JSDoc erklären oder entfernen wenn nicht nötig  
**Effort:** Low

#### 8. Missing JSDoc on State Fields

**File:** `_skeleton/web-components/skeleton/component.tsx:46-53`  
**Issue:** `@State count`, `@State label`, `@State show` ohne JSDoc  
**Fix:** JSDoc-Kommentare hinzufügen  
**Effort:** Trivial

#### 9. Window-Listener Stencil Auto-Cleanup nicht dokumentiert

**File:** `_skeleton/web-components/skeleton/component.tsx:73`  
**Issue:** `@Listen('keydown', { target: 'window' })` — Auto-Cleanup Stencil-Feature nicht dokumentiert  
**Fix:** JSDoc-Kommentar  
**Effort:** Trivial

---

### 🟢 LOW (Code Quality)

#### 10. State Default-Handling inkonsistent

**File:** `internal/functional-components/skeleton/controller.ts:38`  
**Issue:** `getState?.('show') ?? false` — Defaults sollten zentral sein  
**Fix:** Refactor State-Defaults in BaseController  
**Effort:** Medium (aber nice-to-have)

#### 11. SkeletonFC: Event-Props nicht genutzt

**File:** `internal/functional-components/skeleton/component.tsx:15-31`  
**Issue:** `onLoaded`, `onRendered` werden in Props definiert, aber nicht in FC genutzt  
**Fix:** Dokumentation oder Props-Cleanup  
**Effort:** Low

#### 12. Testing: Minimal Coverage

**Files:**

- `_skeleton/web-components/skeleton/snapshot.spec.tsx`
- `_skeleton/web-components/click-button/snapshot.spec.tsx`
- `_skeleton/web-components/click-button/interaction.e2e.ts`

**Issue:** Nur Happy-Path getestet, Edge Cases + State Variations fehlen  
**Fix:** Tests erweitern (show=false, count variation, empty label, keydown events)  
**Effort:** Medium

#### 13. ClickButtonController: Type-Generification fragile

**File:** `internal/functional-components/click-button/controller.ts`  
**Issue:** `setButtonRef` erwartet `HTMLButtonElement` — was wenn in anderen Komponenten anders?  
**Fix:** Generische Type-Parameter oder Dokumentation  
**Effort:** Low (nice-to-have)

---

## 📋 Empfehlungen (Implementierungs-Roadmap)

### Phase 1: Kritische Fixes (BLOCKING)

1. **Fix Focus-Type Mismatch (systemisch)**
   - `KolFocusOptions` → `FocusOptions` Alignment
   - Oder: Bridge-Type erstellen
   - **Effort:** High
   - **Impact:** Unblocks Build

2. **Fix KolSkeleton Focus-Decoration**
   - `@ctrlFocus` → `@delegateFocus('buttonRef')`
   - **Effort:** Low
   - **Impact:** Pattern-Konsistenz

3. **Document SkeletonController Memory Leak**
   - JSDoc auf `startLoadedEventInterval()`
   - Verify `destroy()` Call in `disconnectedCallback()`
   - **Effort:** Trivial
   - **Impact:** Prevents Production Issue

### Phase 2: Quality Fixes (Safety)

4. Event-Emission Error-Handling
   - Try-catch um `emit()` calls
   - **Effort:** Low

5. Console → Log-System
   - Replace `console.log` with `Log.debug`
   - **Effort:** Trivial

6. JSDoc auf State-Feldern + Window-Listener
   - **Effort:** Trivial

7. ClickButtonFC: preventDefault Dokumentation
   - **Effort:** Low

### Phase 3: Test Expansion

8. Snapshot Tests erweitern
   - Edge Cases (empty, very long, state variations)
   - **Effort:** Medium

9. E2E Tests erweitern
   - Keyboard interactions (Space, Enter, Tab)
   - Focus management
   - Event-Listener pattern testing
   - **Effort:** Medium

---

## 🎯 Einheitliche Implementierungs-Standards (etabliert)

Basierend auf Audit sollten folgende Standards **template-übergreifend** dokumentiert werden:

### Web Component Standards

```typescript
// ✅ KORREKT
@Component({ tag: 'kol-xxx', shadow: true })
export class KolXxx extends BaseWebComponent<XxxApi> implements WebComponentInterface<XxxApi> {
  private readonly ctrl = new XxxController(this.stateAccess);

  @Prop()
  public _prop!: string;

  @Watch('_prop')
  public watchProp(value?: string): void {
    this.ctrl.watchProp(value);
  }

  @Method()
  @delegateFocus('ref')  // Neu Standard
  public async focus(options?: KolFocusOptions): Promise<void> {}

  @Event()
  public emitted!: EventEmitter<void>;

  @Listen('keydown')
  public handleKeydown(event: KeyboardEvent): void {
    this.ctrl.handleKeydown(event);
  }

  public componentWillLoad(): void {
    this.ctrl.componentWillLoad({ prop: this._prop });
  }

  public componentDidLoad(): void {
    // Cleanup subscriptions, etc.
  }

  public disconnectedCallback(): void {
    this.ctrl.destroy();  // Wichtig für Memory Leak Prevention
  }

  public render(): JSX.Element {
    return <Host><XxxFC {...props} /></Host>;
  }
}
```

### Controller Standards

```typescript
// ✅ KORREKT
export class XxxController extends BaseController<XxxApi> {
	public constructor(stateAccess: StateAccess<XxxApi>) {
		super(stateAccess, xxxPropsConfig);
	}

	// Props-Watching
	public watchProp(value?: string): void {
		propConfig.apply(value, (v) => {
			this.setRenderProp('prop', v);
		});
	}

	// Event-Emitting
	public handleClick = (): void => {
		Log.debug('click'); // Nicht console.log
		// State mutation
		this.setState('state', newValue);
		// Event-Emitting mit try-catch
		try {
			this.onClickCallback?.();
		} catch (error) {
			Log.error('Click callback failed', error);
		}
	};

	// Lifecycle Cleanup
	public destroy(): void {
		if (this.intervalId) clearInterval(this.intervalId);
		if (this.subscription) this.subscription.unsubscribe();
	}
}
```

### Type Definition Standards

```typescript
// ✅ KORREKT API Definition
export type XxxApi = ApiFromConfig<
	typeof xxxPropsConfig,
	{
		Callbacks: {
			click: () => void;
		};
		Emitters: {
			emitted: void; // Vollständig typisiert
		};
		Listeners: {
			keydown: KeyboardEvent; // Optional, für Window-Listener
		};
		Methods: {
			focus: (options?: KolFocusOptions) => Promise<void>;
		};
		Refs: {
			primary: HTMLElement;
		};
		States: {
			count: number;
		};
	}
>;
```

### Testing Standards

**Snapshots:**

- Min. 3 Varianten pro Prop
- Edge cases (empty, very long)
- State variations (enabled/disabled, show/hide)
- Format: `executeSnapshotTests<Props>(TAG, [Component], [variants])`

**E2E:**

- Keyboard Interactions (Space, Enter, Escape, Tab)
- Focus management
- Event-Listener pattern (addEventListener)
- Accessibility (ARIA)
- Format: `test.describe` + `test.skip` mit TODO comments

**JSDoc:**

- Nur auf Stencil-Decorators (`@Prop`, `@Event`, `@Method`, `@State`)
- Keine JSDoc auf nicht-Stencil Code
- Focus-Methoden: **immer dokumentieren dass async**
- Window-Listener: **dokumentieren Stencil auto-cleanup**

---

## 🚨 Build-Blockade: Focus-Type Root-Cause Analyse

**Systemisches Problem (Phase 0):**

```
KolFocusOptions (kolibri custom)
  └─ type KolFocusOptions = { behavior?: 'auto' | 'smooth' }

vs.

FocusOptions (native browser standard)
  └─ type FocusOptions = { preventScroll?: boolean }
```

**Wo bricht es:**

- `accordion/shadow.tsx:48` — `HTMLKolButtonWcElement` extends `HTMLElement`
- Aber `HTMLElement.focus()` expects native `FocusOptions`
- Aber `KolButton.focus()` returns `Promise<void>` mit `KolFocusOptions`
- **Type incompatibility** → Build fails

**Langfristige Lösung:**

1. **Option A:** `KolFocusOptions` extends native `FocusOptions`

   ```typescript
   export type KolFocusOptions = FocusOptions & {
   	behavior?: 'auto' | 'smooth'; // Add custom behaviors
   };
   ```

2. **Option B:** Separate Bridge-Type für Web Components

   ```typescript
   // In element-interaction.ts
   export type ComponentFocusOptions = KolFocusOptions; // Ist 'auto' | 'smooth'
   ```

3. **Option C:** Focus-Methods nie native `focus()` überschreiben
   ```typescript
   // Nicht:
   // public focus(options?: FocusOptions): void { }
   // Sondern:
   // public kolFocus(options?: KolFocusOptions): Promise<void> { }
   ```

**Recommendation:** Option A (least breaking)

---

## 📌 Summary & Next Steps

### Aktueller Status

- ✅ Skeleton-Pattern konsistent implementiert
- ✅ TypeScript-Typen sauber (bis auf FocusOptions)
- ✅ JSDoc auf Stencil-Decorators vorhanden
- 🚫 Build-Blockade durch Focus-Type-Mismatch
- 🚫 Memory-Leak-Risiken nicht dokumentiert
- 🚫 Testing minimal

### Sofort-Maßnahmen (High Priority)

1. Focus-Type Fix (unblocks Build)
2. SkeletonController Memory-Leak dokumentieren
3. Event-Emission Error-Handling
4. Console → Log-System

### Mittelfristig (Phase 2)

5. JSDoc-Vollständigkeit (State-Felder, Window-Listener)
6. Test-Expansion (E2E, Snapshots)
7. onClick Handler Binding fixen

### Langfristig (Code Quality)

8. State-Defaults zentral definieren
9. Generic Type-Handling refactoren
10. Documentation: Einheitliche Skeleton-Implementation Guidelines

---

**Report erstellt:** 2026-06-02  
**Auditor:** Claude Code (team3-Framework)  
**Status:** Bereit zur Umsetzung nach Build-Fix
