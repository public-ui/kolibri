# Migrate Legacy Component to Skeleton Architecture

## Argument: $ARGUMENTS

The argument specifies which component to migrate (e.g. `card`, `tooltip`, `alert`).

---

## Rolle

Du bist ein **Senior Software Architect und Developer** mit über 15 Jahren Erfahrung in komponentenbasierter Frontend-Architektur. Du legst höchsten Wert auf:

- **Clean Architecture** — klare Schichtentrennung, Single Responsibility, Dependency Inversion.
- **Wartbarkeit** — Code, der in 2 Jahren von einem neuen Teammitglied ohne Rückfragen verstanden wird.
- **Lesbarkeit** — selbstdokumentierende Strukturen, konsistente Namensgebung, minimaler kognitiver Aufwand beim Lesen.
- **Nachvollziehbarkeit** — jede Entscheidung folgt einem erkennbaren Pattern, keine Sonderfälle ohne Begründung.
- **Reduktion** — du schreibst nicht mehr Code als nötig. Du löschst mutig, was nicht gebraucht wird.

Du arbeitest methodisch: erst analysieren, dann planen, dann umsetzen, dann validieren. Du hinterlässt keinen toten Code, keine verwaisten Typen, keine Dateien ohne Referenz.

---

## Auftrag

Refaktoriere die Komponente **`$ARGUMENTS`** so, dass sie vollständig der Referenzimplementierung im Skeleton-Blueprint und der Internals-Schicht entspricht.

---

## Arbeitsverzeichnis

- **Skeleton** (`packages/components/src/components/_skeleton/`) = **nur lesen**. Dient ausschließlich als Referenz und Vorlage.
- **Komponentenverzeichnis** (`packages/components/src/components/$ARGUMENTS/`) = **Arbeitsort**. Alle Änderungen finden in-place im bestehenden Ordner der Komponente statt.

---

## Verbindliche Spezifikation

Die [`ARC42.md`](packages/components/src/components/_skeleton/ARC42.md) ist die **führende Architektur-Spezifikation**. Lies sie vollständig, bevor du mit dem Refactoring beginnst. Alle dort beschriebenen Patterns, Konventionen und Schichten sind einzuhalten — ohne Ausnahme.

---

## Vorgehen

### Phase 1: Analyse

1. Lies **alle** Dateien im Komponentenverzeichnis `packages/components/src/components/$ARGUMENTS/`
2. Lies die Skeleton-Referenzimplementierung:
   - `packages/components/src/components/_skeleton/ARC42.md` (vollständig!)
   - `packages/components/src/components/_skeleton/web-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/skeleton/api.tsx`
   - `packages/components/src/internal/functional-components/skeleton/controller.ts`
   - `packages/components/src/internal/functional-components/skeleton/component.tsx`
3. Erstelle eine **Gap-Analyse** und gib sie als Markdown-Tabelle aus:

| Aspekt | Legacy (Ist) | Skeleton (Soll) | Handlungsbedarf |
|--------|-------------|-----------------|-----------------|
| Vererbung | Keine / eigene | `BaseWebComponent<Api>` | Migration |
| Controller | Keiner / inline | `BaseController<Api>` | Erstellen |
| ... | ... | ... | ... |

### Phase 2: Props-First — Struktur aufbauen (KRITISCH — ZUERST!)

**Bevor du die Komponente implementierst, musst du alle Props migrieren:**

1. **Props-Inventar**: Sammle alle vorhandenen `@Prop()` Deklarationen aus der aktuellen Komponente
2. **Prüfe existierende Props**: Schau in `packages/components/src/internal/props/` ob Props bereits existieren und wiederverwendet werden können
3. **Pro neuem Prop eine Datei** unter `packages/components/src/internal/props/`:
   - Dateiname: `<prop-name>.ts` (z.B. `label.ts`, `href.ts`, `disabled.ts`)
   - Nutze `Prop<K, TExternal, TInternal>` oder `SimpleProp<K, T>` Typen
   - Implementiere `normalize()` und `validate()` via `createPropDefinition<P>()`
4. **Props exportieren** in `packages/components/src/internal/props/index.ts`

### Phase 3: Refactoring — Komponenten-Implementierung

Erstelle bzw. ersetze die Dateien gemäß der ARC42-Schichten:

1. **API-Definition** (`packages/components/src/internal/functional-components/$ARGUMENTS/api.tsx`)
   - `PropsConfigShape` mit `required` und `optional` Arrays
   - `ApiFromConfig` für Typ-Ableitung
   - Nur die tatsächlich genutzten API-Felder definieren (`Callbacks`, `Emitters`, `Methods`, `States`, `Refs`, `Listeners`)

2. **Controller** (`packages/components/src/internal/functional-components/$ARGUMENTS/controller.ts`)
   - Erweitert `BaseController<Api>`
   - Empfängt `setState: SetStateFn<Api>` und `getState: GetStateFn<Api>`
   - `componentWillLoad()` mit `ResolvedInputProps<Api>`
   - Watcher-Methoden nutzen `propDefinition.apply(value, callback)`
   - Event-Handler und Ref-Setter als **Arrow-Properties**
   - Lifecycle- und Watcher-Methoden als **Prototype-Methoden**

3. **Functional Component** (`packages/components/src/internal/functional-components/$ARGUMENTS/component.tsx`)
   - Stateless Renderer mit `FunctionalComponentProps<Api>`
   - BEM-Klassen via `bem.forBlock('kol-$ARGUMENTS')`
   - Keine Seiteneffekte, keine State-Mutation

4. **Web Component** (`packages/components/src/components/$ARGUMENTS/web-components/$ARGUMENTS/component.tsx`)
   - `@Component({ tag: 'kol-$ARGUMENTS', shadow: true })`
   - Erweitert `BaseWebComponent<Api>` und implementiert `WebComponentInterface<Api>`
   - Controller: `private readonly ctrl = new Controller(this.setState, this.getState)`
   - `@Prop()` und `@Watch()` für jedes Prop (Prop-Dreieck!)
   - `componentWillLoad()` leitet Props an Controller weiter
   - `render()` gibt `<Host>` mit Functional Component zurück
   - Rendering nutzt `this.ctrl.getRenderProp('key')` für normalisierte Props

5. **CSS/SCSS** — bestehende Styles beibehalten, bei Bedarf anpassen

6. **Tests** — Testdateien **neben** `component.tsx` erstellen (kein `test/`-Unterordner):
   - `snapshot.spec.tsx` — Jest DOM-Snapshot-Tests (`executeSnapshotTests`)
   - `interaction.e2e.ts` — Playwright Interaction-Tests (wenn sinnvoll)

### Phase 4: Dead Code eliminieren

Nach dem Refactoring darf **kein veralteter Code** zurückbleiben:

- **Dateien löschen**: alte Type-/Interface-Dateien, alte Controller, verwaiste Module, leere Dateien
- **Code entfernen**: unused Types, Imports, auskommentierter Code, deprecated Wrapper
- **Prüfen**: Keine Datei ohne Referenz

### Phase 5: Validierung

Führe die folgenden Befehle aus und stelle sicher, dass alle fehlerfrei durchlaufen:

```bash
pnpm format
pnpm lint
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/components build
```

**Kein Befehl darf vor dem Timeout abgebrochen werden.**

---

## Architektur-Referenz (Kurzfassung)

### Schichten-Modell

```
Consumer → Web Component → Controller → Schema Helpers
                ↕                ↕
         Functional Component   Props
```

### Prop-Dreieck (alle 3 Teile müssen vorhanden sein!)

```typescript
// 1. Felddeklaration mit @Prop()
@Prop()
public _name!: string;

// 2. Watcher mit @Watch()
@Watch('_name')
public watchName(value?: string): void {
  this.ctrl.watchName(value);
}

// 3. Forwarding in componentWillLoad()
public componentWillLoad(): void {
  this.ctrl.componentWillLoad({
    name: this._name,
  });
}
```

### Controller-Pattern

```typescript
export class MyController extends BaseController<MyApi> implements ControllerInterface<MyApi> {
  public constructor(setState: SetStateFn<MyApi>, getState: GetStateFn<MyApi>) {
    super(myPropsConfig, setState, getState);
  }

  public watchName(value?: string): void {
    nameProp.apply(value, (v) => {
      this.setRenderProp('name', v);
    });
  }
}
```

### State Management

- **Normalized Props** → `setRenderProp()` (kein Re-Render)
- **Derived/Managed State** → `setState()` (triggert Re-Render via `@State`)

### Konventionen

- Alle Web Components: `shadow: true`
- `<Host>` ohne Klassen-Attribut
- Unterstrichene Public Props (`_name`, `_label`)
- Tests co-lokalisiert neben `component.tsx`
- Keine `types.ts` Dateien, keine Barrel-Files

---

## Ausgabe

Wenn du fertig bist, gib folgende Zusammenfassung aus:

1. **Gap-Analyse** — Abweichungen der bestehenden Komponente zur Skeleton-Architektur
2. **Gelöschte Dateien** — Liste mit Begründung pro Datei
3. **Neue/geänderte Dateien** — Verzeichnisstruktur mit Architektur-Layer pro Datei
4. **Validierungsergebnis** — Bestätigung, dass alle Befehle erfolgreich waren
