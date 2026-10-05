# TODO: Props-Pattern-Enforcement

## Problem

Wenn Props über `PropsConfigShape` + `ApiFromConfig` in `api.tsx` definiert werden, erzwingt TypeScript nur einen Teil des erforderlichen Boilerplates in der Web-Component-Klasse.

Das **Prop-Dreieck** besteht aus drei Teilen — nur einer davon ist type-erzwungen:

| Teil                                | Type-erzwungen?                                                           | Was passiert bei Fehlen                          |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| Felddeklaration `_name!: string`    | **Ja** — via `ComponentProps<T>` in `WebComponentInterface`               | compile error                                    |
| `@Prop()` Decorator                 | **Nein**                                                                  | kein Attribut-Binding, silent runtime bug        |
| `@Watch('_name')` Decorator         | **Nein** (`watchName()` Methode wird erzwungen, aber nicht der Decorator) | Stencil ruft Methode nie auf, silent runtime bug |
| Forwarding in `componentWillLoad()` | **Nein**                                                                  | Prop-Wert kommt nie in der WC an                 |

## Aktueller Stand

`implements WebComponentInterface<SkeletonApi>` ist korrekt und schon vorhanden — es deckt alles ab, was TypeScript abdecken _kann_. Die Lücke ist Stencil-spezifisch: Stencil-Decorators sind reine Metadaten und für das TypeScript-Typsystem unsichtbar.

## Lösungsoptionen

### Option A: Custom ESLint-Regel (empfohlen, kurzfristig)

Eine AST-basierte Regel mit `@typescript-eslint`, die prüft:

> Jedes Feld einer Klasse, die `implements WebComponentInterface<...>` trägt und dem Muster `_${name}` entspricht, muss `@Prop()` und ein `@Watch('_${name}')` besitzen.

- Machbar ohne Änderungen am Typsystem
- Greift in CI/CD und im Editor
- Schließt die Lücke für bestehende und neue Komponenten

### Option B: Code-Generator für Prop-Dreieck-Boilerplate (empfohlen, langfristig)

Ein Script/Tool, das aus `propsConfig` automatisch den WebComponent-Boilerplate erzeugt:

```ts
// aus: skeletonPropsConfig.required = [nameProp]
// wird generiert:

@Prop() public _name!: string;

@Watch('_name')
watchName(value?: string): void {
    nameProp.apply(value, (v) => this.setRenderProp('name', v));
}

// in componentWillLoad():
// nameProp.apply(this._name, (v) => this.setRenderProp('name', v));
```

- Eliminiert die Fehlerquelle bei neuen Props vollständig
- Kein Scaffolding-Tool existiert aktuell im Projekt

### Option C: JSDoc-Warnung auf `WebComponentInterface<T>` (minimal, sofort)

```ts
/**
 * @remarks
 * TypeScript erzwingt Felddeklarationen und Watcher-Methodensignaturen.
 * NICHT erzwungen werden: @Prop() Decorator, @Watch() Decorator, componentWillLoad() Forwarding.
 * Alle drei Teile des Prop-Dreiecks müssen manuell korrekt implementiert werden.
 */
export type WebComponentInterface<T extends ComponentApi> = ...
```

## Offene Punkte (Needs Deeper Look)

- [ ] **Custom ESLint-Regel implementieren** für `@Prop()` + `@Watch()` Enforcement
- [ ] **Code-Generator** für Prop-Dreieck-Boilerplate aus `propsConfig`
- [ ] **`label` State-Disconnect im Skeleton** beheben — `@State label = 'Label'` im WebComponent und der Default in `propsConfig` sind unverbunden
- [ ] **`@Watch('_name')` Typo-Risiko** — `@Watch('_nane')` wäre kein TypeScript-Fehler; ESLint-Regel würde das mit abdecken
- [ ] **Alle Komponenten auditen** (`avatar`, `click-button`, `icon`, `image`, `progress`, `quote`) auf Prop-Dreieck-Vollständigkeit
- [ ] **A11y-Tests** für Skeleton hinzufügen — kein `*.e2e.ts` / `*.spec.ts` vorhanden
- [ ] **`event.preventDefault()` in `ClickButtonFC`** prüfen — blockiert alle Keyboard-Events (NVDA/JAWS-Test nötig)
- [ ] **JSDoc `@remarks`** auf `WebComponentInterface<T>` in `generic-types.ts` ergänzen

## Accessibility-Risiko

Bei fehlendem Prop-Wiring entsteht konkret eine WCAG-4.1.2-Verletzung (Name, Role, Value): Buttons erhalten keinen accessible name oder einen falschen Fallback-Text. `axe-core` würde dies in e2e-Tests fangen — aber nur wenn solche Tests existieren.
