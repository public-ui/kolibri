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

## Props mit `@design`: Komponenten ausführen statt lesen

Für Komponenten, deren Optik an Props hängt, die keine Modifier sind, reicht der Dialekt nicht. Bei `kol-heading` steckt das Level im Tag (`h1` … `h6`, `strong` für Level 0). Bei `kol-input-text` erscheinen Meldung und Hinweis nur unter Bedingungen (`touched`, gesetzter Text). Zudem setzt sich `kol-input-text` aus mehreren Functional Components zusammen und hat keinen eigenen Block.

Solche Komponenten tragen an ihren `@Prop`s das JSDoc-Tag `@design`:

```ts
/**
 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
 *
 * @design variant
 */
@Prop() public _level?: HeadingLevel = 0;
```

| Tag                         | Wirkung                                                                      | Beispiel                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `@design variant`           | Variant-Property, Werte aus dem Prop-Typ in `custom-elements.json`           | `_level: 0 \| … \| 6` → `Level` = 0 … 6; `_disabled` → `Disabled` = false / true                                   |
| `@design variant <l>=<w> …` | Variant-Property mit diesen Werten, für Props ohne aufzählbaren Typ          | `_color`: `black=#000 blue=#06539e red=#ae0000` → `Color` = black / blue / red; `_variant`: `default= small=small` |
| `@design toggle <Text>`     | Boolean-Property; `true` setzt den Text                                      | `_secondaryHeadline` → `Secondary Headline`                                                                        |
| `@design content <Text>`    | jede Variante zeigt den Text                                                 | `_hint` → `Hinweistext`                                                                                            |
| `@design sample <Wert>`     | jede Variante setzt den Wert                                                 | `_touched` → `true`, damit Meldungen sichtbar sind                                                                 |
| `@design state <Wert>`      | Wert der Variant-Property `State` neben `default`; setzt den Prop auf `true` | `_disabled`, `_readOnly`, `_required` → `State` = default / disabled / readonly / required                         |

Eine Meldung (`_msg`, Typ mit `AlertProps`) wird zur Property `Message` mit `none` und den Werten von `_type` aus `kol-alert`. Props ohne Tag bleiben ungesetzt. An der Komponentenklasse füllt `@design slot <Text>` den Default-Slot, wie es Light-DOM-Inhalt im Browser tut (`kol-abbr`: `z. B.`).

`State` hält die Zahl der Varianten klein: Penpot kennt nur Variant-Properties, jede Kombination ist eine eigene Komponente. Drei Schalter als eigene Properties ergäben 2 × 2 × 2 Kombinationen, als `State` sind es vier Werte. Hover und Focus gibt es nur bei `State=default`.

Das Skript instanziiert je Variante die Klasse der Web Component aus dem Stencil-Collection-Output in Node, setzt die Props und ruft `componentWillLoad()` und `render()` auf, mit einem eigenen `h` statt `@stencil/core`, einem minimalen DOM (`happy-dom`) und ohne Browser. Normalisierte Props (`'#000'` → Farbpaar), berechnete Felder (Initialen von `kol-avatar`), Konstanten (`kol-version`), Inline-Styles, Tags, BEM-Klassen, Attribute und bedingte Elemente kommen so heraus, wie die Komponente sie rendert. Eine eingebettete Web Component (`kol-link` in `kol-quote`) rendert ihren Shadow-Baum mit ihren eigenen Regeln. Die Kaskade wertet danach auch `:has()` aus, daran hängen Fokusring und Hover-Rand der Eingabefelder.

Heute tragen `kol-abbr`, `kol-alert` (20 Varianten), `kol-avatar`, `kol-badge` (6), `kol-button` (48), `kol-heading` (14), `kol-input-text` (36), `kol-link` (8), `kol-progress` (2), `kol-quote` (2), `kol-skip-nav`, `kol-spin` (3) und `kol-version` das Tag. Props ohne Tag behalten den Standardwert der Komponente. Eine Komponente ohne Tag bleibt auf dem Dialekt-Weg.

Die Kaskade setzt dabei um, was diese Komponenten brauchen:

| CSS                                                                 | im Export                                                                     |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Inline-Style (`style="background-color: …"`)                        | gewinnt über alle normalen Deklarationen                                      |
| `::before`/`::after` mit `content`                                  | Text (Anführungszeichen, `— `) oder bei leerem `content` eine Box (Spin-Ring) |
| `position: absolute`, `inset`, `top`/`left`                         | Ebene außerhalb des Auto-Layouts (Penpot `absolute`, Figma `ABSOLUTE`)        |
| `grid-template-areas`                                               | je Zeile ein Auto-Layout, mehrere Kinder in einem Bereich liegen übereinander |
| inline `<svg>` (`rect`, `circle`)                                   | eine Vektor-Ebene mit den Farben aus dem Theme                                |
| `cqw`/`cqh`, `aspect-ratio`, `%`-Größen und -Radien                 | gegen die Größe des Containers bzw. Elternelements aufgelöst                  |
| `text-decoration`, unterstrichene Links                             | Textdekoration der Textebene                                                  |
| `to-rem()`-Abstände (`calc(… / var(--kolibri-root-font-size, 16))`) | in Pixel aufgelöst, auch für `gap`                                            |

Textbreiten rechnet das Skript mit den Zeichenbreiten von Verdana. Penpot setzt die Schrift des Themes, wenn sie als Team-Schrift hochgeladen ist; sonst meldet das Plugin sie als fehlend.

### Icons

Ein KoliBri-Icon (`kolicon-<name>`) wird eine Vektor-Ebene. Die Pfade stammen aus der SVG-Font, die `@public-ui/components` in `assets/kolicons/kolicons.svg` ausliefert, gespiegelt in SVG-Koordinaten. Die Füllfarbe ist die Textfarbe des Icons samt Token (`color.danger` im Fehlerfall). Penpot legt das Icon mit `createShapeFromSvg` an, Figma mit `createNodeFromSvg`; die Font muss im Design-Tool nicht installiert sein. Icons anderer Fonts (Codicons, Font Awesome) haben keine Pfade: die Box behält ihre Größe, der Bericht nennt das Icon.

### Basiskomponenten aus den Functional Components

Web Components setzen sich aus denselben Functional Components zusammen: `FormFieldFC` steckt in 13 Web Components, `InputContainerFC` in 11, `ButtonFC` in 9. Das Theme bildet das mit seinen Mixins je Block ab. Der Export tut es auch: Jede Functional Component mit eigenem BEM-Block innerhalb der Wurzel einer Web Component wird eine Basiskomponente (`SpanFC`, `InputFC`, `InputContainerFC`, `AlertFC`, `IconFC`). Die Web Component zeigt eine Instanz davon, verschachtelte Basiskomponenten werden zu Instanzen in der Basiskomponente.

- Die Variant-Properties einer Basiskomponente sind die Achsen der Web Component, die sie verändern. Werte, die gleich aussehen, fallen zusammen: `InputContainerFC` folgt `Message` nur mit `none` und `error`, `State` nur mit `default` und `disabled`.
- Jede Variante wird innerhalb der Web Component gerendert. Stile, die vom Elternblock abhängen (`.kol-form-field--error .kol-input-container`), gehören damit zur Variante.
- Verglichen wird das Aussehen: BEM-Klassen, Position und Größe zählen nicht, die Größe setzt das Layout der Web Component.
- Die Plugins bauen Basiskomponenten zuerst, geordnet nach Verschachtelung (`InputFC` vor `InputContainerFC`). Ein Wechsel der Variante tauscht die Komponente der Instanz (`swapComponent`), Overrides bleiben.

Nutzt eine weitere Web Component dieselbe Functional Component mit anderen Achsen, bekommt ihr Set den Ebenenpfad als Zusatz, getrennt durch `›` (ein `/` beginnt in Penpot und Figma einen Gruppenpfad). Das Zusammenführen über mehrere Web Components ist der nächste Schritt.

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

- **Zuordnung Tag → Wurzelblock.** 20 öffentliche Komponenten haben keine eigene Functional Component mit gleichnamigem Block (`kol-input-text`, `kol-select`, `kol-accordion`, …); sie setzen sich aus geteilten Blöcken zusammen. Mit `@design` an ihren Props rendert das Skript die Komponente selbst, ein Eintrag in der Registry entfällt. `kol-input-text` ist umgestellt, die übrigen 19 stehen aus.
- **Spread-Props.** Wo ein Item seine Props per Spread erhält (`{...buttonProps}`), sieht das Skript die Werte nicht. Diese Stellen stehen ebenfalls im Bericht.

## Ablauf

```bash
pnpm --filter @public-ui/design-export... build
pnpm --filter @public-ui/design-export start:spec
```

Ausgabe in `dist-export/spec/`: `penpot-import.json`, `figma-import.json`, `kolibri-design-tokens.zip`, `bem-dialect.md` (Properties und nötige BEM-Änderungen), `spec-coverage.md`. Zwei Läufe ergeben dieselben Bytes (`pnpm check:determinism:spec`).

- **Penpot:** `pnpm start:spec:penpot` exportiert und startet den Server. Token-ZIP im Tokens-Panel importieren, Plugin `http://127.0.0.1:8818/penpot-plugin/manifest.json` installieren; es schlägt `…/spec/penpot-import.json` als Export-URL vor.
- **Figma:** `figma-plugin/manifest.json` in Figma Desktop importieren, `figma-import.json` im Plugin wählen.

## Grenzen

- Komponenten mit mehr als 96 Varianten bleiben vorerst außen vor, bis ihre Achsen kuratiert sind.
- Grid-Layouts ohne `grid-template-areas` (z. B. `kol-alert`) haben im Auto-Layout kein Gegenstück.
- Textbreiten sind aus Verdana-Metriken geschätzt und einzeilig; beide Werkzeuge messen beim Import selbst.
- Animationen (Spin, Hover-Übergänge) und `text-decoration-thickness` haben kein Gegenstück.
- Penpot kennt nur umlaufende Konturen: Ein Rahmen auf einzelnen Seiten (`border-bottom` an `kol-abbr`) wird je Seite eine eigene Ebene am Rand, durchgezogen statt gestrichelt. Figma setzt Rahmen je Seite direkt.
- Penpot zeigt die Theme-Schrift Verdana nur, wenn sie als Team-Schrift hochgeladen ist; sonst meldet das Plugin sie und Penpot nutzt seine Standardschrift.
- Inhalte (`@design content`) sind in Penpot normale Ebenen, die Designer auf der Instanz ausblenden. Boolean- und Text-Properties für Figma sind noch nicht erzeugt.
- Das Figma-Plugin lief noch nicht in einer Figma-Instanz.
