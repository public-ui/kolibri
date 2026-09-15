# Fallstricke der Skeleton-Migration

Jeder Punkt hat mindestens einmal eine echte Regression verursacht. Während der Umsetzung aktiv
dagegen prüfen.

## 1. Unvollständiges Prop-Triangle

Jeder `@Prop()` braucht Deklaration, `@Watch()` **und** die Anwendung in `componentWillLoad()`
(nach `initRenderProps`). Fehlt der Watcher, aktualisiert sich die Prop zur Laufzeit nicht; fehlt
die Anwendung beim Laden, rendert der erste Durchlauf den Default statt des gesetzten Werts.

## 2. `class`-Attribut am `<Host>`

Kein `class="kol-…"` am `<Host>`. Die BEM-Wurzelklasse setzt der FC über `BemRootNodeFC`; ein
zusätzlicher Host-Klassenname erzeugt doppelte Selektor-Ebenen und bricht Theme-Regeln.

## 3. Ungenutzte `@State()`-Felder

Nur `@State()` behalten, die tatsächlich gelesen **und** geschrieben werden. Jedes überflüssige
Feld löst unnötige Re-Renders aus und suggeriert Reaktivität, die es nicht gibt.

## 4. Event-Listener-Lecks

Keine Inline-Listener mit neuer Funktionsreferenz in Lifecycle-Hooks registrieren — sie lassen sich
nicht mehr abmelden. Stabile Arrow-Properties verwenden. Niemals `.bind(this)` bei
`addEventListener`/`removeEventListener` (`ARC42.md#event-handler-policy`).

## 5. Inline-Prop-Typen statt `internal/props/`

Normalisierung und Validierung nicht inline in der Komponente definieren — solche Props lassen sich
nicht wiederverwenden und driften in der Normalisierung auseinander. Immer eine eigene Datei unter
`packages/components/src/internal/props/`.

## 6. Fehlendes `@Prop({ reflect: true })`

Muss der Attributwert über `el.getAttribute('_name')` lesbar sein — etwa für CSS-Attributselektoren
oder Tests —, braucht die Prop `reflect: true`. Im Zweifel an der Deklaration des Vorgängers und an
vergleichbaren Props orientieren; ein verlorenes `reflect` ist ein stiller Bruch der öffentlichen
API.

## 7. JSDoc-Typrauschen in TypeScript

Keine redundanten `@param {string}` / `@returns {void}`-Annotationen. Die TypeScript-Signatur ist die
Quelle der Wahrheit. JSDoc bleibt nur, wo Stencil-Werkzeuge es auslesen (`@Prop`, `@Event`,
`@Method`) — dort ist der Text Teil der veröffentlichten Doku und wird unverändert übernommen.

## 8. Entfernen eines transitionalen `-wc`-Tags im migrierten FC

Eine migrierte `shadow: true`-Komponente darf legitim weiterhin ein transitionales Element rendern
(z. B. rendert `DetailsFC` ein `KolButtonWcTag`): Theme- und Basis-SCSS greifen teilweise auf die
Klasse des Host-Knotens als Vorfahren zu (ecl `.kol-details__heading-button .kol-button`, desy
`kol-link('kol-details__heading-button')`). Fällt der Host-Knoten weg, rutscht diese Klasse auf
dieselbe Ebene wie die innere Block-Klasse und die Selektoren greifen stillschweigend nicht mehr —
eine visuelle Regression.

Vor dem Ersetzen eines transitionalen Tags durch direktes FC-Rendering `packages/themes/*/src` und
das Components-SCSS nach Selektoren durchsuchen, die die Klasse des Tags als Vorfahren nutzen.
**Null visuelle Abweichung schlägt architektonische Reinheit**; den Konsumenten vom transitionalen
Tag zu lösen, bleibt eine separat verfolgte Aufgabe.

## 9. `FunctionalComponentProps` ist ein StrictFields-Vertrag

Der FC muss **jede** Prop aus der Props-Konfiguration **und** jedes `States`-Feld erhalten — auch
solche, die er nicht destrukturiert (z. B. Consumer-Callbacks, die im WC bleiben). Der Typfehler
erscheint erst an der Render-Aufrufstelle, nicht im FC — wer nur den FC ansieht, sucht an der
falschen Stelle.

## 10. Abgeleitete Instanz-ARIA-IDs gehören in den `States`-Bucket

IDs, auf die `aria-labelledby`/`aria-controls` zeigen (z. B. `headingId`, `controlId`), werden als
`@State()`-Felder am WC deklariert (aus `createUniqueId`/`createRelatedUniqueId` befüllt) und an den
FC gereicht — Präzedenzfall: `ariaDescriptionId` des Buttons. `BemRootNodeFC` rendert ausschließlich
Klassen, eine `id` am Wurzelknoten lässt sich darüber **nicht** rendern; eine wirkungslose Wurzel-ID
darf entfallen, wenn nichts auf sie verweist — das gehört in den PR-Text.

## 11. Klassenreihenfolge in Jest-Snapshots ist normalisiert

Der Stencil-Jest-Snapshot-Serializer sortiert die Werte des `class`-Attributs alphabetisch. Eine
abweichende Reihenfolge im Snapshot ist daher **kein** Signal für die reale DOM-Reihenfolge: nicht
als Regression werten und nicht versuchen, die Quellreihenfolge im Snapshot nachzubilden.

## 12. Grüne Unit-Tests als Abnahme missverstehen

Die Migration baut das DOM um. Jest-Snapshots prüfen Markup, nicht das gerenderte Bild — Fokusringe,
Zeilenhöhen und Theme-Selektoren können brechen, während alle Unit-Tests grün sind. Die visuelle
Abnahme läuft über den Companion-Skill `zero-visual-delta-handoff` (Docker-Snapshot-Lauf gegen die
Base-Baselines). Ist sie nicht durchführbar, wird sie als offene Arbeit dokumentiert und übergeben —
nicht weggelassen.
