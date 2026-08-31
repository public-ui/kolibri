# Review: `refactor/migrate-kol-link-skeleton-2th`

> Externe Review-Session, Stand `b3c12cb2c` (2026-08-30).
> Companion zu `migrate-kol-link-skeleton-2th.md` (Arbeitsplan) und
> `zero-visual-delta-handoff.md` (Handoff Default-Theme).
> Jede Aussage unten ist mit dem angegebenen Kommando reproduzierbar. Wo eine Prüfung
> in dieser Umgebung nicht möglich war, steht das ausdrücklich dabei.

## 1. Verifiziert und bestätigt

Der Arbeitsplan ist in seinen Zahlenangaben belastbar. Nachgerechnet auf `b3c12cb2c`:

| Behauptung im Plan                                          | Prüfung                                                                            | Ergebnis          |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------- |
| Offenes PNG-Delta gesamt                                    | `git diff --name-only origin/develop...HEAD -- '*.png' \| wc -l`                   | **101** ✓         |
| Default-Theme auf develop-Stand                             | `git diff --name-only origin/develop...HEAD -- 'packages/themes/default/**/*.png'` | **0** ✓           |
| Verteilung bwst 31 / ecl 27 / kern 22 / desy 21             | dieselbe Liste, nach Theme gruppiert                                               | **exakt** ✓       |
| 8 Consumer von `KolLinkWcTag`                               | `git grep -l KolLinkWcTag -- packages/components/src/components`                   | **exakt die 8** ✓ |
| `hrefProp` required, `devWarning` bei fehlendem Pflichtwert | `internal/props/href.ts`, `internal/props/helpers/factory.ts:85`                   | ✓                 |
| `$anchor-scoped` in desy/kern                               | `git grep -c anchor-scoped -- packages/themes`                                     | 9 Dateien ✓       |
| `aria-expanded` entfällt wenn ungesetzt                     | `internal/props/aria-expanded.ts`, Link-Snapshots                                  | ✓                 |
| `tabindex="0"` nicht mehr im gerenderten DOM                | `components/link/test/__snapshots__/snapshot.spec.tsx.snap`                        | ✓                 |

Zusätzlich unabhängig bestätigt: **CI-Job `visual-tests (theme-default)` ist auf `b3c12cb2c`
grün.** Das ist der stärkere Beleg als der lokale Docker-Lauf und macht die Angabe
„294/294, Exit 0" entbehrlich — sie war in dieser Umgebung mangels Docker nicht
reproduzierbar.

Lokale Unit-Tests auf `b3c12cb2c`: 93 Suites, 885 Tests, 773 Snapshots, 0 Fehler.

Auch inhaltlich sauber: der `SpanFC`-Empty-Icon-Guard und der `aria-expanded`-Sentinel sind
gut begründete Korrekturen; der Plan-Pitfall „stale `components.d.ts` ⇒ `HTMLKol*Element`
fehlt" hat sich in dieser Umgebung exakt so reproduziert.

## 2. Blocker: CI ist rot

`build-and-check` schlägt auf `b3c12cb2c` fehl:

```
packages/themes/default/src/components/nav.scss
  46:5  ✖  Expected "flex" to come before "text-decoration" in group "G — Layout/Geometry"
           order/properties-order
1 problem (1 error) — potentially fixable with the "--fix" option
```

Die Datei stammt aus `016038670`, der insgesamt 8 SCSS-Dateien ändert. Der Arbeitsplan
führt unter „Validation commands (run before every commit)" ausdrücklich
`pnpm --filter @public-ui/<theme> lint:stylelint  # use --fix variant first`.

**Fix:** `pnpm --filter @public-ui/theme-default lint:stylelint --fix`

### Latenter Folgefehler: hydrate-Snapshot ist veraltet

`packages/adapters/hydrate/test/__snapshots__/components.spec.js.mocha-snapshot` enthält
weiterhin

```html
<a href="Test value" class="kol-link__anchor sc-kol-link-default" tabindex="0"></a>
```

(16 `tabindex`-Treffer). Der Code rendert das Attribut seit `016038670` nicht mehr. Der
Plan nennt „updated link hydrate snapshots" als Teil dieser Runde; im Diff
`ea7a60062..b3c12cb2c -- packages/adapters/hydrate` liegt jedoch keine Änderung — die
vorhandene stammt aus einer früheren Runde.

`build-and-check` bricht beim Stylelint ab, bevor dieser Test läuft. Der Fehler wird also
erst nach dem Stylelint-Fix sichtbar. Es ist derselbe Pitfall, den der Plan selbst führt:
Erst `pnpm --filter @public-ui/components build`, dann die hydrate-Snapshots erneuern.

## 3. Der tabIndex-Fix weicht dreifach vom Plan ab

**a) Einseitig entschieden.** Der Plan führt den Punkt unter
„2. Decision points (need repo-owner decision, **do not implement unilaterally**)" — und
führt ihn dort unverändert weiter, mit inzwischen falschem Text: „`tabindex="0"` is now
always rendered on link anchors". Seit `016038670` stimmt das nicht mehr. Plan und Code
widersprechen sich.

**b) Umgeht das eigene dokumentierte Pattern.** Der Plan-Pitfall lautet: Prop-Factory
verbietet `undefined`-Defaults, für „Attribut nur wenn gesetzt" das `''`-Sentinel nutzen
(wie `linkRoleProp`, `ariaExpandedProp`). Umgesetzt wurde weder das noch die genannte
Alternative („accept + document"), sondern:

```ts
this.setRenderProp('tabIndex', undefined as unknown as number);
…
if (typeof this._tabIndex === 'number') {
	tabIndexProp.apply(this._tabIndex, (v) => this.setRenderProp('tabIndex', v));
}
```

Ein Doppel-Cast gegen die Typinvariante plus eine Umgehung des Factory-Pfads.
`internal/props/tab-index.ts` bleibt bei Default `0` — der Default wird nach dem
Initialisieren überschrieben, statt an der Quelle korrigiert zu werden.

**c) Steht doppelt.** Derselbe Block, wortgleich inklusive Kommentar, in
`components/link/component.tsx` und `components/link/wc.tsx`.

**Vorschlag:** `tabIndexProp` auf das `''`-Sentinel umstellen (analog `ariaExpandedProp`),
dann entfallen beide Kopien und der Cast. Das ist eine Owner-Entscheidung — hier nur als
Option notiert, nicht umgesetzt.

## 4. Strukturelle Punkte

### 4.1 Die Dublette wächst und wird doppelt gepflegt

`components/link/component.tsx` (362 Z.) und `components/link/wc.tsx` (367 Z.) sind zu
~97 % identisch; der echte semantische Unterschied sind Tag-Name, `shadow`, Klassenname,
Element-Typ, zwei Decorator-Namen und der `<Host>`-Wrapper.

```bash
diff <(git show HEAD:packages/components/src/components/link/component.tsx) \
     <(git show HEAD:packages/components/src/components/link/wc.tsx) | grep -c '^[<>]'
# 91 abweichende Zeilen, davon ~60 der identische render()-Block und ~10 JSDoc
```

Der Plan behandelt `wc.tsx` als transitional („wird gelöscht, wenn alle Consumer
migriert sind") — als Strategie vertretbar. Die Kosten bis dahin sind aber real und
inzwischen belegt: der tabIndex-Fix dieser Runde musste zweimal geschrieben werden. Bei
8 Consumern, deren Migration je Theme-SCSS und Snapshot-Prüfung erfordert, ist das kein
kurzer Zeitraum.

Zum Vergleich der Ausgangslage: vorher trug `component.tsx` (498 Z.) die Logik einmal,
`shadow.tsx` (176 Z.) war ein dünner Delegations-Wrapper. Die geteilte Logik lag in der
Controller-Schicht; mit deren Wegfall bleibt für zwei Custom Elements auf einer Logik nur
die Kopie.

### 4.2 `wc.tsx` ist von keinem Unit-Test gerendert

`link/test/snapshot.spec.tsx` testete vorher `[KolLink, KolLinkWc]`, jetzt nur `[KolLink]`.
Die Consumer-Snapshots fangen es nicht auf — dort steht das Element als leeres Tag:

```html
<kol-link-wc _href="https://example.com" _label="Zum Anfang"></kol-link-wc>
```

`git grep KolLinkWc -- '**/test/*' '**/*.spec.tsx'` liefert keinen Treffer.

Das ist ausgerechnet der Pfad, den alle 8 Consumer produktiv nutzen und den Schritt 1 des
Plans als nächstes anfasst. **Empfehlung: vor Beginn der Consumer-Migration die
Testabdeckung für `kol-link-wc` wiederherstellen** — sonst ist jede Migration ein
Blindflug.

### 4.3 Testbilanz

|             | `origin/develop` | `b3c12cb2c` |
| ----------- | ---------------- | ----------- |
| Test Suites | 94               | **93**      |
| Tests       | 887              | **885**     |

Geänderte Testdateien über den gesamten Branch: eine gelöscht
(`internal/functional-components/progress/controller.spec.ts`), zwei modifiziert, **null
neu**. Die in `26eb56fb3` eingeführte Option `{ required: true }` von
`createPropDefinition` hat keinen Test, obwohl `internal/props/helpers/factory.spec.ts`
mit 18 Fällen direkt daneben liegt und unverändert blieb.

Damit ruht die Absicherung eines Umbaus dieser Größe faktisch allein auf Snapshots.

### 4.4 Die Fortschrittsmetrik ist von ihrer Evidenz entkoppelt

Schritt 4 der Iterationsschleife lautet: „Bei grün: Theme-PNGs auf develop-Stand stellen
(`git checkout origin/develop -- packages/themes/<theme>/snapshots`), mit dem Fix
committen." Danach ist `git diff … '*.png' | wc -l` per Konstruktion 0 — unabhängig davon,
ob die Renderings tatsächlich übereinstimmen. Die Zahl belegt dann nur noch, dass
zurückgesetzt wurde.

Für das Default-Theme ist es gutgegangen, weil der CI-Job unabhängig grün ist.
**Empfehlung: für die restlichen vier Themes den CI-Job `visual-tests (theme-<name>)` als
Abnahmekriterium führen, nicht die PNG-Zahl.** Sonst bestätigt der Indikator sich selbst.

## 5. Kleinere Punkte

- **Handoff verweist ins Leere.** `zero-visual-delta-handoff.md` nennt „siehe Skill
  `zero-visual-delta-handoff`, Abschnitt 3". Ein solcher Skill existiert im Repo nicht.
  Die Cleanup-Befehle stehen glücklicherweise auch im Companion-Plan.
- **PR-Beschreibung #10652 ist veraltet** und widerspricht dem Code in vier Punkten:
  „Consolidates shadow.tsx into single component.tsx" (es sind zwei Dateien),
  „Adds functional component and controller layers" (die Controller-Schicht wurde
  entfernt), „Removes kol-link-wc tag" (existiert, 8 Consumer), „Preserves all link
  behavior and accessibility" (vier dokumentierte Regressionen). Der Plan ist inzwischen
  deutlich genauer als die PR-Beschreibung.
- **Vier Regressions-Issues sind offen und im Plan nicht geführt:** #10687
  (`setEventTarget`/`event.target`), #10688 (`_download=""` löst keinen Download mehr aus —
  steht wörtlich in `internal/functional-components/link/component.tsx:52`), #10689
  (`disabled` auf Block-Modifier und `aria-disabled` am Anchor getrennt), #10690
  (`a11yHint`/`uiUxHint`). Vorschlag: unter „Decision points" aufnehmen mit Entscheidung
  „vor Merge" oder „nach Merge, bewusst".
- **Plan-Eigenregel „Commit plan updates together with (or ahead of) the work they
  describe"**: `7a910ef4a` kam nach fünf der sechs Commits, die es beschreibt. Ab jetzt
  einhaltbar.

## 6. Vorgeschlagene Reihenfolge

1. `pnpm --filter @public-ui/theme-default lint:stylelint --fix` → `build-and-check` entblocken.
2. `pnpm --filter @public-ui/components build`, dann hydrate-Snapshots erneuern; erneut CI
   prüfen (der hydrate-Fehler wird erst jetzt sichtbar).
3. Plan nachziehen: tabIndex aus „Decision points" herausnehmen oder als entschieden
   markieren; Text „is now always rendered" korrigieren.
4. Testabdeckung für `kol-link-wc` wiederherstellen — **vor** Schritt 1 des Arbeitsplans
   (Consumer-Migration).
5. Restliche Themes: Abnahme über den CI-Job, nicht über die PNG-Zahl.
6. PR-Beschreibung #10652 aktualisieren, bevor der Draft-Status fällt.

Punkte 1–3 sind eng umrissen und blockieren aktuell den PR. Punkt 4 ist Voraussetzung für
den nächsten geplanten Arbeitsschritt. Die Umstellung von `tabIndexProp` auf das
`''`-Sentinel (Abschnitt 3) bleibt bewusst Owner-Entscheidung.
