# BEM-Dialekt: aus der Registry direkt nach Penpot und Figma

Ergänzung zu den Konzepten [Figma](../figma/konzept-final.md) (#11379) und [Penpot](../penpot/konzept-final.md) (#11518) und zur Pipeline in `packages/tools/design-export` (#11519).

## Prinzip

Es gibt keine zweite Spezifikation. Alles, was Penpot und Figma brauchen, steht schon im Repository:

| Quelle                                                     | liefert                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| BEM-Registry (`bem-registry.ts`), gelesen über den Dialekt | Komponenten, Variant-Properties und ihre Werte                     |
| Functional Components (`internal/functional-components`)   | Ebenenbaum: Elemente, Reihenfolge, Bedingungen, eingebettete Items |
| `custom-elements.json`                                     | Attributnamen und Werte-Typen für die Bindung Modifier → Prop      |
| Basis- und Theme-CSS, Theme-Tokens                         | Farben (als Token), Abstände, Rahmen, Fokusring, Layout            |

Der Dialekt ist eine Namensregel für Modifier. Wo die Registry ihm folgt, entstehen die Properties ohne weitere Angaben. Wo sie abweicht, meldet das Skript die Stelle mit einem Vorschlag.

## Die Regeln

Ein Block-Modifier benennt das Attribut, das er spiegelt:

| Regel   | Form                          | Beispiel                                   | Penpot                            | Figma                         |
| ------- | ----------------------------- | ------------------------------------------ | --------------------------------- | ----------------------------- |
| Boolean | `<attribut>`                  | `disabled` ↔ `_disabled`                   | Variant-Property `true` / `false` | Variant-Property true / false |
| Boolean | `has-<x>`                     | `has-closer` ↔ `_has-closer`               | Property `Closer`                 | Property `Closer`             |
| Enum    | `<attribut>-<wert>`           | `variant-card`, `variant-msg` ↔ `_variant` | Property `Variant` = card / msg   | Property `Variant`            |
| Zustand | `is-<x>`                      | `is-compact`                               | keine Property (innerer Zustand)  | keine Property                |
| Hover   | Element `interactive-element` | `kol-button__interactive-element`          | Schalter `Hover`, `Focus`         | Schalter `Hover`, `Focus`     |

- Der Property-Name ist der Attributname ohne `_` und `has-`, in Wörtern groß: `label-align` → `Label Align`.
- `has-<x>` bindet auch `_<x>`, wenn es kein `_has-<x>` gibt (`has-smart-button` ↔ `_smart-button`).
- Ein Enum-Wert muss im Typ des Attributs vorkommen (`_variant: "card" | "msg"`), sonst meldet das Skript ihn.
- Element-Modifier werden keine Properties. Sie entstehen aus den Props, die eine Variante setzt, und verändern die Ebenen darin (`kol-span__icon--left`).

## Wie die JSON-Dateien befüllt werden

Am Beispiel `kol-alert`. Die Registry enthält:

```ts
'kol-alert': {
	elements: { closer, content, heading, icon, … },
	modifiers: new Set(['hasCloser', 'type-default', 'type-error', …, 'variant-card', 'variant-msg']),
},
```

**1. Properties aus dem Dialekt:** `type-*` → `Type` (5 Werte), `variant-*` → `Variant` (2), `hasCloser` → `Closer` (Boolean; gemeldet, weil es `has-closer` heißen müsste). Das ergibt 5 × 2 × 2 = 20 Varianten.

**2. Ebenenbaum aus `AlertFC`:** Das Skript liest das JSX, nicht den Browser.

```tsx
<BemRootNodeFC block="kol-alert" …>
	<AlertIconFC type={type} />                                → kol-alert__icon
	{!!label?.length && <HeadlineTag class={alertBem('heading')}> → kol-alert__heading, nur mit _label
	{hasCloser && <ButtonFC class={BEM_CLASS_ALERT__CLOSER} hideLabel variant={['normal']} …/>}
	                                                           → kol-alert__closer = Instanz kol-button, nur mit _has-closer
	<div class={BEM_CLASS_ALERT__CONTENT}>{children}</div>     → kol-alert__content, Slot
```

**3. Optik je Variante aus dem CSS:** Für jede Kombination setzt das Skript die Klassen (`kol-alert kol-alert--type-error kol-alert--variant-msg kol-alert--hasCloser`), wertet die Kaskade aus Basis- und Theme-CSS aus und folgt den `var()`-Ketten bis zum Token. Die Fehlerfarbe kommt als `color.danger` heraus, nicht als `#ad003a`.

**4. Penpot** (`penpot-import.json`, gelesen vom Penpot-Plugin):

```json
"sets": { "kol-alert": { "properties": ["Type", "Variant", "Closer"] } },
"components": [{
	"id": "kol-alert.error.msg.true",
	"set": "kol-alert",
	"properties": [["Type", "error"], ["Variant", "msg"], ["Closer", "true"]],
	"shapes": { "name": "kol-alert", "fillToken": "color.surface", "layout": { "direction": "column" },
		"children": [{ "name": "kol-alert__icon" }, { "name": "kol-alert__heading" }, { "name": "kol-alert__closer" }, { "name": "kol-alert__content" }] }
}]
```

Das Plugin legt je Block ein Variant-Set an, je Kombination eine Variante, Ebenen mit den BEM-Namen, Farben an die Tokens des Token-Bundles gebunden. Light/Dark schaltet die Token-Theme-Gruppe `Scheme` für die ganze Datei.

**5. Figma** (`figma-import.json`, gelesen vom Figma-Plugin):

```json
"variables": { "collection": "KoliBri default", "modes": ["Light", "Dark"],
	"variables": [{ "name": "color/danger", "type": "COLOR", "values": { "Light": "#ad003a", "Dark": "#f391b1" } }] },
"componentSets": [{ "name": "kol-alert", "properties": ["Type", "Variant", "Closer"],
	"components": [{ "key": "kol-alert.error.msg.true", "name": "Type=error, Variant=msg, Closer=true",
		"tree": { "type": "FRAME", "name": "kol-alert", "layoutMode": "VERTICAL", "fill": { "variable": "color/surface" },
			"children": [{ "name": "kol-alert__icon" }, { "name": "kol-alert__heading" }, { "name": "kol-alert__closer" }, { "name": "kol-alert__content" }] } }] }]
```

Das Plugin legt die Variablen-Sammlung mit den Modi Light und Dark an und baut je Block ein Component Set. Figma liest die Varianten aus dem Namen `Type=error, Variant=msg, Closer=true`. Ein Frame schaltet das Scheme über seinen Variablenmodus um.

**6. Einhängen:** In beiden Werkzeugen ist die Datei eine Bibliothek. Designer verknüpfen sie als Shared Library und bauen ihre Wireframes aus Instanzen. Ein neuer Lauf aktualisiert die Komponenten an Ort und Stelle (Schlüssel `kolibri-key`), verknüpfte Instanzen bleiben erhalten.

## Was an der BEM-Registry zu ändern ist

Der Lauf schreibt die vollständige Liste nach `dist-export/spec/bem-dialect.md`. Stand heute: 22 Modifier, in fünf Gruppen.

| Gruppe                         | Beispiele                                                                                                             | Änderung                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Nicht kebab-case               | `kol-alert--hasCloser`                                                                                                | `has-closer`                                                               |
| Enum-Wert ohne Attribut-Präfix | `kol-meter--vertical`, `kol-quote--block`, `kol-quote--inline`                                                        | `orientation-vertical`, `variant-block`, `variant-inline`                  |
| Varianten nur im Theme-CSS     | `kol-button--primary` … `--tertiary`, `kol-link--small`                                                               | als `variant-primary` … in die Registry                                    |
| Negation eines Booleans        | `kol-button--standalone`, `kol-link--standalone`                                                                      | entfällt, das Fehlen von `inline` sagt dasselbe                            |
| Zustand ohne Attribut          | `open` (Popover-Button), `group` (Heading), `checked`, `default`/`error`/… (Radio, Select, Textarea), `external-link` | `is-<x>` für inneren Zustand, oder Präfix des Attributs (`msg-type-error`) |

Umbenannte Klassen sind ein Theming-Breaking-Change: `release:theming`, alle Themes im selben Schritt anpassen. Das Skript liest die alten Namen weiter, so dass die Bibliothek schon vor der Umbenennung entsteht.

Zwei Punkte liegen außerhalb der Modifier:

- **Zuordnung Tag → Wurzelblock.** 20 öffentliche Komponenten haben keine eigene Functional Component mit gleichnamigem Block (`kol-input-text`, `kol-select`, `kol-accordion`, …); sie setzen sich aus geteilten Blöcken zusammen. Die Registry braucht für sie einen Eintrag, welcher Block die Wurzel bildet.
- **Spread-Props.** Wo ein Item seine Props per Spread erhält (`{...buttonProps}`), sieht das Skript die Werte nicht. Diese Stellen stehen ebenfalls im Bericht.

## Ablauf

```bash
pnpm --filter @public-ui/design-export... build
pnpm --filter @public-ui/design-export start:spec
```

Ausgabe in `dist-export/spec/`: `penpot-import.json`, `figma-import.json`, `kolibri-design-tokens.zip`, `bem-dialect.md` (Properties und nötige BEM-Änderungen), `spec-coverage.md`. Zwei Läufe ergeben dieselben Bytes (`pnpm check:determinism:spec`).

- **Penpot:** Token-ZIP im Tokens-Panel importieren, Penpot-Plugin mit Export-URL `…/spec/penpot-import.json`.
- **Figma:** `figma-plugin/manifest.json` in Figma Desktop importieren, `figma-import.json` im Plugin wählen.

## Grenzen

- Komponenten mit mehr als 96 Varianten bleiben vorerst außen vor, bis ihre Achsen kuratiert sind.
- Grid-Layouts (z. B. `kol-alert`) haben im Figma-Auto-Layout kein Gegenstück; Penpot kann Grid.
- Icons erscheinen als benannte Platzhalter, die Glyphen stehen nur im CSS der Icon-Schrift.
- Textbreiten sind geschätzt; beide Werkzeuge messen beim Import selbst.
- Das Figma-Plugin lief noch nicht in einer Figma-Instanz.
