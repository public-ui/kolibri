# BEM-Spezifikation als Quelle für Penpot und Figma

Ergänzung zu den Konzepten [Figma](../figma/konzept-final.md) (#11379) und [Penpot](../penpot/konzept-final.md) (#11518) sowie zur Pipeline in `packages/tools/design-export` (#11519).

## Frage

Kann ein deterministisches Transformationsskript aus der BEM-Spezifikation der Web Components (`packages/components/src/schema/bem-registry.ts`) Penpot- und Figma-Dateien erzeugen, die man als Bibliothek einhängt und aus deren Komponenten man Wireframes baut — ohne Browser und ohne Handarbeit? Was fehlt der Spezifikation dafür?

## Ergebnis in Kürze

- **Heute reicht die BEM-Registry allein nicht.** Sie nennt Blöcke, Elemente und Modifier als flache Mengen. Für eine Design-Komponente fehlen der Elementbaum, die Art jeder Ebene, die Zuordnung Prop → Modifier, die Designachsen, das interaktive Element, die eingebetteten Komponenten und die Muster-Inhalte.
- **Die Optik braucht keine neue Spezifikation.** Farben, Abstände, Rahmen, Radien, Fokusring, Mindestgrößen und Flex-Layout lassen sich aus dem kompilierten Basis- und Theme-CSS statisch auflösen, weil der Theming-Vertrag flache BEM-Selektoren vorschreibt. Farben kommen dabei als Token-Referenz heraus, nicht als kopierter Wert, also mit Light/Dark.
- **Mit einer schmalen Design-Facette** pro Block (Format in `packages/tools/design-export/src/spec/types.ts`) läuft die Transformation `Facette + CSS + Tokens → Penpot + Figma` ohne Browser und byte-identisch. Der Prototyp tut das für `kol-button`, `kol-badge`, `kol-alert` (und `kol-span` als eingebettetes Item): 46 Varianten mit Hover, Focus und Disabled, alle Farben an Tokens gebunden.
- **Messbar statt geschätzt:** `pnpm --filter @public-ui/design-export start:spec` schreibt neben den Design-Dateien einen Abdeckungsbericht über alle 54 Blöcke (`dist-export/spec/spec-coverage.md`). Er zeigt pro Block, welche Fakten fehlen und welche CSS-Regeln statisch nicht auswertbar sind.

## Was die BEM-Spezifikation heute liefert

| Fakt                                      | Quelle heute                                      | für die Transformation                    |
| ----------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| Block, Elemente, Block-/Element-Modifier  | `BEM`-Konstante der Registry                      | Ebenennamen, Prüfung des Theming-Vertrags |
| Props, Slots, Events                      | `custom-elements.json`                            | Achsenkandidaten, Slot-Inhalte            |
| Prop-Typen (z. B. geschlossene Varianten) | `components.d.ts`, `propsConfig` der Komponente   | Werte geschlossener Achsen                |
| Farben, Abstände, Rahmen, Layout          | Basis-SCSS (`packages/components`) und Theme-SCSS | statisch auflösbar, siehe unten           |
| Token und Light/Dark-Paare                | `kol-theme-global`-Layer des Themes               | Token-Bundle, Figma-Variablen, Bindung    |

Die Registry führt das Schema zweimal: als Typdeklaration und als Laufzeitkonstante `BEM`. Gelesen wird nur die Konstante; beide Kopien können auseinanderlaufen, und der Parser ist zeilenbasiert, weil die Registry nicht als JSON veröffentlicht wird.

## Was ergänzt werden muss: die Design-Facette

Jeder Punkt nennt, woher der Fakt heute kommt und warum ihn die Transformation braucht. Der Abdeckungsbericht belegt die Punkte mit Zahlen.

1. **Elementbaum.** Die Registry kennt Elemente nur als Menge, nicht ihre Verschachtelung und Reihenfolge. Heute steht der Baum ausschließlich im JSX der Functional Components oder im gerenderten DOM. Ohne Baum gibt es keine Auto-Layout-Frames.
2. **Art und Tag jeder Ebene.** `frame`, `text`, `icon` oder `slot` entscheidet, ob ein Board, eine Textebene, ein Icon-Platzhalter oder ein befüllbarer Bereich entsteht. Der HTML-Tag entscheidet über User-Agent-Defaults und `:disabled`.
3. **Bedingte Elemente.** Viele Elemente existieren nur unter einer Prop-Bedingung: das Icon nur mit `_icons`, der Schließen-Button der Meldung nur mit `_hasCloser`, das Label nur ohne `_hideLabel`. Heute steht das als `&&` im JSX.
4. **Bindung Prop → Modifier.** `hasCloser ← _hasCloser`, `standalone ← _inline = false`, `type-{value} ← _type`. Heute nur im `modifiers`-Objekt der `BemRootNodeFC`. Ohne Bindung weiß die Transformation nicht, welche Klassen eine Variante setzt.
5. **Designachsen.** Welche Props werden zu Variant-Properties (Penpot) bzw. Component-Set-Properties (Figma), mit welchen Werten und in welcher Reihenfolge. Die offenen Button-Varianten (`kol-button--primary` …) stehen nicht in der Registry; der Bericht findet in sechs Blöcken Klassen, die das CSS stylt, die Registry aber nicht nennt (`kol-button--{danger,ghost,normal,primary,secondary,tertiary}`, `kol-link--small`, `kol-tabs__panel`, `kol-tabs__tabs-align-top`, `kol-dialog__close-button`, `kol-modal__close-button`, `kol-popover-button__popover--styled`).
6. **Interaktives Element.** Der Träger von `:hover`, `:focus` und dem nativen `disabled` ist heute nur per Namenskonvention (`interactive-element`) erkennbar. Die Facette markiert ihn ausdrücklich (`interactive: true`).
7. **Eingebettete Komponenten (Items).** Welches Element welchen Block mit welchen Props einbettet: `kol-alert__closer` ist ein `kol-button` (Variante `normal`, `_hideLabel`, `kolicon-cross`), `kol-button__text` ist ein `kol-span`. Die Registry verknüpft Blöcke nicht. In Penpot und Figma werden daraus verschachtelte Instanzen.
8. **Muster-Inhalte.** Label, Slot-Text und Überschriftenebene einer Bibliotheksinstanz. Übersetzte Texte (`translate('kol-close-alert')`) brauchen eine feste Sprache für die Bibliothek.
9. **Wertabhängige Inhalte.** Das Meldungs-Icon hängt über eine Tabelle in `AlertIconFC` von `_type` ab. Die Facette trägt die Tabelle (`glyph: { prop, map }`).
10. **Klassen außerhalb des Block-Namensraums.** `kol-close-button` (von 16 Blöcken gestylt), `kol-form-field-select`, `badge-text-hint` und die Icon-Klassen `kolicon-*` sind Theming-Haken ohne Registry-Eintrag. Sie gehören in die Registry oder in eine dokumentierte Liste fremder Haken, sonst kann die Prüfung der Ebenennamen sie nicht einordnen.
11. **Zuordnung Tag → Blöcke.** 12 öffentliche Komponenten haben keinen eigenen Block (`kol-input-*`, `kol-table-stateful`, `kol-table-stateless`, `kol-button-link`, `kol-link-button`); sie setzen sich aus geteilten Blöcken zusammen (`kol-input`, `kol-form-field`, `kol-table`, `kol-button`, `kol-link`). Die Facette braucht dafür einen Eintrag je Tag, der auf den Wurzelblock verweist.

### Format (Vorschlag)

```ts
// packages/tools/design-export/src/spec/types.ts – Auszug
interface BlockDesignSpec {
	block: string; // 'kol-button'
	axes: DesignAxis[]; // Variant, Disabled, Hover, Focus …
	modifiers: Record<string, { prop: string; value?: boolean | string }>;
	sample: Record<string, boolean | string>; // { _label: 'Schaltfläche' }
	tree: DesignNode; // Elementbaum ab der Blockwurzel
}
interface DesignNode {
	element?: string; // BEM-Element, fehlt an der Wurzel
	tag: string;
	kind: 'frame' | 'icon' | 'slot' | 'text';
	interactive?: boolean;
	when?: { prop: string; value?: boolean | string };
	embeds?: string; // 'kol-span'
	embedProps?: Record<string, ValueSource>;
	modifiers?: Record<string, { prop: string; value?: boolean | string }>;
	text?: ValueSource;
	glyph?: ValueSource;
	children?: DesignNode[];
}
```

Die Pilot-Facetten liegen in `src/spec/pilot-specs.ts`. `checkSpecs` lehnt jede Facette ab, die ein Element, einen Modifier oder einen eingebetteten Block außerhalb der Registry nennt; so kann die Facette den Theming-Vertrag nicht unterlaufen.

### Wo die Facette hingehört

Zielort ist die Registry selbst, als optionaler `design`-Teil je Block neben `elements` und `modifiers`, sodass Code, Themes und Design-Export aus einer Quelle lesen. Damit dabei die Doppelführung Typ/Konstante nicht wächst, sollte die Registry zusätzlich als JSON-Artefakt im Build entstehen (`bem-registry.json`); der zeilenbasierte Parser entfällt dann. Bis das Format abgestimmt ist, bleiben die Facetten im Werkzeugpaket, und das Components-Paket bleibt unverändert.

Die Punkte 1 bis 4 lassen sich mittelfristig aus den Functional Components ableiten (TypeScript-AST des JSX), statt sie doppelt zu pflegen. Ein Test „Facette = FC-Struktur" wäre der erste Schritt; bis dahin prüft `checkSpecs` nur die Namen.

## Was ohne Spezifikationsänderung aus dem CSS kommt

Der statische Kaskaden-Resolver (`src/spec/cascade.ts`) wendet Layer-Reihenfolge, `!important`, Spezifität, Quellreihenfolge und Vererbung auf den Elementbaum der Facette an. Er versteht Klassen, Tags, Attribute, `:hover`, `:focus`, `:focus-visible`, `:focus-within`, `:active`, `:disabled`, `:not()`, `:is()`, `:where()`, `:host` sowie Nachfahren- und Kind-Kombinatoren. `var()`-Ketten enden am Theme-Token, daher bindet die Ausgabe `color.primary` statt `#003a5c`.

Statisch nicht auswertbar sind laut Bericht 130 Regeln der Blöcke:

| Grund                            | Anzahl | Folge                                                                                                            |
| -------------------------------- | -----: | ---------------------------------------------------------------------------------------------------------------- |
| `:has()`                         |     64 | Zustand aus der DOM-Struktur; als Modifier ausdrücken, dann trägt ihn die Facette                                |
| Pseudo-Elemente (`::before` …)   |     30 | Icon-Glyphen, Zitatzeichen, Radio-Kreis; Icons als SVG aus `@public-ui/icons/svg`                                |
| native Control-Pseudo-Elemente   |     21 | Range-Thumb, Meter-Balken, Placeholder; bleiben auf der Toleranzliste der Konzepte                               |
| `:checked`, `:first-child` u. a. |     15 | Zustand oder Position; `:checked` als Achse, Positionen über den Baum, `::slotted`/`::backdrop` über die Facette |

Dazu kommen Fakten, die gar nicht im CSS stehen:

- **Grid-Layouts** (z. B. `kol-alert`): Grid-Areas haben im Figma-Auto-Layout kein Gegenstück. Penpot kann Grid; für Figma braucht die Facette eine Layout-Angabe oder die Toleranzliste.
- **Inline-Styles aus Props:** `kol-badge` malt `_color` als Inline-Style. Diese Farbe hat keinen Token und keine Light/Dark-Variante.
- **Textmaße:** Textbreiten sind Schätzungen über die mittlere Zeichenbreite von Verdana; Penpot und Figma messen beim Einfügen selbst und ziehen Auto-Layout-Frames nach.

Nebenbei hat der Resolver einen Theme-Fehler gefunden: `packages/themes/default/src/mixins/alert.scss` deklariert `padding-top: calc(--var-spacing / 2)` ohne `var()`. Der Browser verwirft die Deklaration.

## Ablauf

```bash
pnpm --filter @public-ui/design-export... build
pnpm --filter @public-ui/design-export start:spec            # ohne Browser, ca. 10 s
pnpm --filter @public-ui/design-export check:determinism:spec # zwei Läufe, Byte-Vergleich
```

| Datei in `dist-export/spec/` | Ziel                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `kolibri-design-tokens.zip`  | Penpot: Tokens-Panel → Import; Figma: Tokens Studio                               |
| `penpot-import.json`         | Penpot-Plugin (`penpot-plugin/`), Export-URL `…/spec/penpot-import.json`          |
| `figma-import.json`          | Figma-Plugin (`figma-plugin/`): Variablen-Sammlung mit Light/Dark, Component Sets |
| `spec-coverage.md`, `.json`  | Abdeckung der Spezifikation je Block                                              |

Die gerenderte Pipeline (`start`, Playwright) bleibt das Gate: Sie misst, was der Browser wirklich zeichnet, und zeigt, wo die statische Transformation abweicht. Ziel ist, dass beide für jede Komponente mit Facette dieselben Ebenen, Tokens und Maße liefern.

## Nächste Schritte

1. Facetten-Format im Team abstimmen und als `design`-Teil in die Registry übernehmen, Registry zusätzlich als JSON bauen.
2. Facetten für die acht Pilotkomponenten der Konzepte ergänzen; jede neue Facette senkt die Zeilen des Abdeckungsberichts.
3. Klassen außerhalb der Registry (Punkte 5 und 10) registrieren oder als Haken dokumentieren — das ist eine Theming-Änderung mit `release:theming`, sobald Klassen umbenannt werden.
4. `:has()`-Zustände in Modifier überführen, wo sie Zustand ausdrücken.
5. Gate: statische Ausgabe gegen die gerenderte Ausgabe derselben Varianten vergleichen (Ebenen, Tokens, Maße mit Toleranz).
