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
`@Method`) — dort ist der Text Teil der veröffentlichten Doku und wird unverändert übernommen. Allgemeine Regel: [Inline code documentation](../../../../AGENTS.md#inline-code-documentation).

## 8. Transitionale `-wc`-Tags: Render-FCs sind der Standard, das Tag die begründete Ausnahme

Standard (Owner-Entscheid 2026-09-15): Eine migrierte Komponente rendert in ihrer Render-Funktion
die neuen Render-FunctionalComponents — `ButtonFC` statt `KolButtonWcTag`, `LinkFC` statt
`KolLinkWcTag`. Die Prop-Orchestrierung des ersetzten Tags (Prop-Factories, Tooltip-Behavior,
Refs) wandert an den renderenden WC oder einen FC-eigenen Fabrik-Typ
(Vorbild: `internal/functional-components/breadcrumb/link-item.ts`).

Der Fallstrick ist also **nicht**, das Tag zu ersetzen — das ist das Ziel (SKILL.md § 6,
„Transitionale `-wc`-Tags beim Konsumenten ablösen"). Der Fallstrick ist, es zu ersetzen, ohne die
Selektoren mitzunehmen. Heute trägt der Wrapper die Consumer-Klasse als **Vorfahr** des Blocks:

```html
<kol-details-heading class="kol-details__heading-button"> <div class="kol-button">…</div></kol-details-heading>
```

Theme- und Basis-SCSS greifen genau darauf zu (ecl `.kol-details__heading-button .kol-button`, desy
`kol-link('kol-details__heading-button')`, default/bwst `.kol-badge__smart-button .kol-button`).
Rendert der FC direkt, merged `BemRootNodeFC` die Klasse auf denselben Knoten
(`<div class="kol-button kol-details__heading-button">`) — die Descendant-Selektoren greifen
stillschweigend nicht mehr, ohne Fehler, ohne roten Unit-Test. Nur der Pixel-Check sieht es.

Also: vor dem Ersetzen `packages/themes/*/src` und das Components-SCSS nach der Tag-Klasse greppen,
die Treffer nach `zero-visual-delta-handoff/SKILL.md` § 6b sortieren und theme-lokal mitmigrieren,
danach das Pixel-Gate je Theme. Lassen sich die Selektoren FC-gleich umschalten (Wrapper-Klasse am
FC-Wurzelknoten, siehe Fallstrick zum `class`-Forwarding), wird das Tag ersetzt; nur wenn das nicht
möglich ist — oder der FC eine Orchestrierung verlangt, die der migrierte WC nicht hat
(Vorprüfung 1 in SKILL.md § 6) —, bleibt das `-wc`-Tag stehen. Dann ist das eine **im PR-Text
benannte** Ausnahme, keine stille Auslassung.

Zusätzlich sicherstellen: Der FC reicht ein empfangenes `class`-Prop an seinen Wurzelknoten weiter
(BemRootNodeFC-Contract), sonst gehen Consumer-Klassen stillschweigend verloren.
**Null visuelle Abweichung schlägt weiterhin architektonische Reinheit.**

**Ein voll gekapseltes WC als Blatt ist derselbe Fall — plus seine Styles.** Rendert die
Komponente kein `-wc`-Tag, sondern ein fertiges Web Component (`kol-version` rendert `kol-badge`),
dann bringt dieses Element **seinen eigenen Shadow-Root** mit: die Stencil-`styleUrls` des Ziels und
dessen Theme-Sheet, das `adopted-style-sheets` **per Tag-Namen** zuordnet. Wird das Tag durch den FC
ersetzt, faellt beides ersatzlos weg — kein Fehler, kein roter Test, nur eine kollabierte Box. Der
Umstieg ist trotzdem moeglich, er kostet nur beide Style-Schichten:

1. **Basis**: die Block-Regeln des Ziels in ein `components/@shared/_<block>.mixin.scss` heben
   (Vorbild `kol-link-styles`, das `breadcrumb/style.scss` fuer `LinkFC` einbindet) und im
   `style.scss` der rendernden Komponente einbinden. Das Mixin nimmt die Icon-/Sub-Block-Mixins
   gleich mit, damit der Aufrufer sie nicht vergessen kann.
2. **Theme**: pro Theme die Regeln in ein `mixins/<block>.scss` heben, ein eigenes
   `components/<komponente>.scss` anlegen und es im Theme-Index als `'KOL-<KOMPONENTE>'` eintragen.
   Fehlt die Komponente im `TagEnum` (`schema/tag-names.ts`), ist dieser Key nicht typisiert —
   zuerst dort ergaenzen.

Nachweis fuehrt man nicht ueber die Unit-Tests, sondern ueber die **kompilierten** Sheets: die CSS
des Ziels muss regelgleich bleiben und die neue CSS regelgleich zu ihr sein. Ein Nicht-ASCII-Zeichen
im neuen Mixin-Kommentar laesst Sass ein `@charset` emittieren und aendert jedes Sheet — Kommentare
in geteilten Partials ASCII halten.

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

## 13. Ein „Styled-as"-Satellit kann schon migriert sein, ohne dass sein Issue geschlossen wurde

`link-button` und `button-link` haben keine eigene Migrationsarbeit gebraucht, sobald ihr
semantisches Vorbild (`link` bzw. `button`) migriert war — beide erben direkt dessen `Base*WebComponent`
und rendern dessen FC. Vor dem Start einer Satelliten-Migration prüfen, ob `component.tsx` bereits
`Base*WebComponent` erbt, `render*FC()` aufruft und in `_skeleton/public-api/<komponente>.spec.ts` gegen `component.tsx` gepinnt ist. Ist
das der Fall, gibt es keinen Code zu ändern — das Tracking-Issue ist lediglich nicht nachgeführt.

## 14. `KolEvent`-Typen heißen wie die nativen Events — nie auf dem Element dispatchen, das den Handler trägt

`KolEvent.click`, `.focus`, `.blur` und `.mousedown` sind die Strings `'click'`, `'focus'`, `'blur'` und
`'mousedown'` (`utils/events.ts`). Wer beim Ablösen eines `-wc`-Wrappers die Events des Wrappers
nachbaut und sie auf dem `<button>` selbst dispatcht, löst dessen eigenen `onClick`/`onFocus` erneut
aus — Endlosschleife. Der Wrapper dispatchte auf seinem Host, einem **Vorfahren** des Buttons. Also
auf dem Knoten dispatchen, der den Wrapper ersetzt (Vorbild: die Box um jeden Tab-Button in
`internal/functional-components/tabs/button-item.ts`). Die Events sind `bubbles` + `composed`, für
Konsumenten außerhalb des Shadow-Roots ändert sich damit nichts.

## 15. Beim Ablösen eines `shadow:false`-Wrappers wandert Slot-Inhalt, Slot-Lesen und `slotchange`

Drei Stellen, die beim Tausch `kol-*-wc` → FC still brechen (belegt durch die Tree-Migration):

- **Expert-Slot-Inhalt.** Ein Konsument, der `<span slot="expert">…</span>` in einen
  `shadow:false`-Wrapper legt (`kol-tree-item` in `kol-link-wc`), verlässt sich auf Stencils
  Scoped-Slot-Relocation. Im eigenen Shadow-Root des Konsumenten projiziert ein `<slot name="expert">`
  nur dessen Light-DOM — der Inhalt käme nie an. `LinkFC` nimmt dafür Kinder an und rendert sie an
  der Stelle seines Expert-Slots; ohne Kinder bleibt der Slot.
- **Soll-DOM richtig lesen.** Der Stencil-Jest-Mock relociert keine Slots: im Jest-Snapshot des
  Vorgängers steht der Expert-Inhalt als Geschwister **vor** dem Link-Markup. Das echte Browser-DOM
  (Inhalt **in** `kol-span__slot`) zeigt der Hydrate-SSR-Snapshot. Gegen den vergleichen, nicht gegen
  den Jest-Snapshot.
- **Slot-Zugriffe aus dem Lebenszyklus.** Der `-wc`-Wrapper fand den Slot des äußeren Elements schon
  in `componentWillLoad` (er war sein Light-DOM-Kind). Im migrierten WC ist der eigene Slot dann
  noch nicht gerendert — Zuordnungen (`assignedElements`) aus `host.children` lesen. `slotchange` ist
  nicht `composed` und erreicht den `<Host>` nicht mehr: den Handler an den `<slot>` im FC hängen.

Und: Eine `@Method`, die nur ein internes `-wc`-Element trug (`invalidateOpenItemsCache()`), wird beim
Rückbau **nicht** auf das öffentliche Element verschoben — das wäre neue öffentliche API. Ein
Modul-Register (Vorbild `tree/open-items-cache.ts`, Muster wie `link/ariaCurrentService.ts`) hält
den Aufruf intern.
