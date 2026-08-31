---
name: zero-visual-delta-handoff
description: Disziplin für visuell unsichtbare Refactorings und Komponenten-/Theme-Migrationen — null geänderte Snapshot-Bilder gegen den Base-Branch als hartes Akzeptanzkriterium, geprüft über die lokale Docker-Pipeline (Docker-Daemon zwingend erforderlich). Komponenten-agnostisch: gilt für jede Art von Style-Anpassung, Strukturumbau oder Migration. Trigger: "zero visual delta", "visuell unsichtbar", "keine visuellen Änderungen", "visuelle Regression", "Snapshot-Diffs auf null", "Snapshot-Check", "Snapshot-Prüfung", "Baselines", "Baseline-Diffs", "update-snapshots", "PNG-Diffs", "Pixel-Diffs", "snapshots-docker", "visual tests", "Skeleton-Migration", "Komponenten-Migration", "DOM-Umbau", "DOM-Migration", "Wrapper-DOM", "interaktives Element in Wrapper", "zustandstragendes Element wandert", "Strukturumbau", "Theme-Anpassung nach DOM-Umbau", "Theme-Migration", "Theme-Fix", "Themes grün", "je Theme prüfen", "Selektoren wandern", "Selektoren migrieren", "SCSS-Anpassung", "SCSS-Migration", "Styles konsolidieren", "Style-Umbau", "Fokus-Ring verschoben", "Outline fehlt", "Zeilenhöhe gewachsen", "Handoff", "Companion-Plan", "Session-Übergabe", "Plan für den nächsten Agenten pflegen", "no visual changes", "snapshot parity", "pixel-perfect refactor".
---

# Zero Visual Delta Handoff

Refactorings an UI-Komponenten (Skeleton-Migrationen, DOM-Umbauten, Style-Konsolidierung, Theme-Anpassungen nach DOM-Änderungen), die visuell unsichtbar bleiben sollen: Verhalten und DOM dürfen sich ändern, das gerenderte Bild nicht. Der Patch gilt erst als fertig, wenn der lokale Docker-Check gegen die Base-Baselines komplett grün ist — und der Zustand so dokumentiert ist, dass jede neue Session nahtlos übernehmen kann.

Bewährt in: kolibri kol-link-Skeleton-Migration (PR #10652: 5 Themes, je 294 Szenarien, 127 PNG-Diffs → 0, plus unstyled-Theme 293/294-Szenarien grün). Nächste Anwendung: kol-button-Theme-Worklist (PR #10734, ~162 Selektoren im Button-Kontext).

## 0. Voraussetzung: Docker — ohne Docker kein Start

**Diese Disziplin funktioniert ausschließlich mit einem laufenden Docker-Daemon. Vor dem ersten Schritt prüfen (`docker info`); ohne Docker wird die Arbeit NICHT mit lokalen Playwright-Läufen ersetzt, sondern im Companion-Plan als offene Arbeit dokumentiert und an eine Session mit Docker übergeben.**

Warum Docker zwingend ist:

- Das Font-Rendering hängt am Betriebssystem und `snapshotPathTemplate` enthält `{platform}`. Snapshots, die auf macOS oder Windows entstehen, sind für die CI wertlos und dürfen nie committet werden (z. B. erzeugt ein lokaler Lauf `firefox-darwin`-Snapshots, die CI braucht `firefox-linux`).
- Nur der Container mit dem fixen Playwright-Image (`mcr.microsoft.com/playwright:v<version>-noble`, Version aus `packages/tools/visual-tests/package.json` abgeleitet) rendert exakt wie die CI. Lokale Tests ohne Docker waren nachweislich irreführend — Ergebnisse stimmten mit der CI nicht überein.

## 1. Akzeptanzkriterium als hartes Gate

- **Jede Snapshot-Datei im PR-Diff muss exakt so aussehen wie auf dem Base-Branch. Solange Bilder differieren, ist die Arbeit nicht fertig.**
- **„CI grün" ist kein Abschlussbeweis**: Snapshot-Workflows committen neue Baselines und werden dadurch selbst grün. Grün + Diff-Anzahl > 0 = offene Arbeit. Umgekehrt kann ein Visual-Test-Job grün sein, während `build-and-check` rot ist (z. B. Stylelint) — jede Pipeline separat bewerten.
- **Evidenzregel gegen Selbstbestätigung**: Wer nach grünem Check die Theme-PNGs auf Base-Stand zurücksetzt (`git checkout origin/develop -- <snapshots>`), macht die PNG-Diff-Zahl per Konstruktion zu 0 — unabhängig davon, ob die Renderings wirklich übereinstimmen. Abnahme-Evidenz ist deshalb **der Exit-Code des Docker-Checks** („N passed, 0 failed") bzw. der CI-Job `visual-tests (theme-<name>)`, nicht die PNG-Zahl nach dem Zurücksetzen.
- **Ungeprüfte Diffs gehören nicht in den PR**: Ein plausibel aussehender, ungeprüfter SCSS-Diff ist für Reviewer nicht von einem geprüften zu unterscheiden. Theme-Arbeit ohne Pixel-Gate bleibt draußen (eigene Worklist/eigener PR).

## 2. Die Prüfpipeline im Repo (Befehle)

Einrichtung ist abgeschlossen: `scripts/snapshots-docker.mjs` spiegelt den Workspace in ein Docker-Volume (`kolibri-visual-tests-work`), installiert und baut dort und läuft mit dem CI-identischen Image. Die `node_modules` des Hosts bleiben unangetastet.

```bash
# Prüflauf (nur prüfen, nichts schreiben) — das Standardwerkzeug, ca. 6 min pro Theme:
node scripts/snapshots-docker.mjs <theme> --check

# weitere Varianten:
node scripts/snapshots-docker.mjs default kern --check   # mehrere Themes
node scripts/snapshots-docker.mjs --all --check          # alle Themes (wie die CI)
node scripts/snapshots-docker.mjs default -- --grep Button   # Args an Playwright durchreichen
node scripts/snapshots-docker.mjs --shell                # interaktive Shell im Container
node scripts/snapshots-docker.mjs --reset                # Volume verwerfen (Neuinstallation)

# Tracking-Metrik gegen den Base-Branch:
git diff --name-only origin/develop...HEAD -- '*.png' | wc -l

# Vor jedem Lauf: Ergebnisordner als root im Volume aufräumen (sonst EACCES im Reporter):
docker run --rm -u 0 -v kolibri-visual-tests-work:/work mcr.microsoft.com/playwright:v1.60.0-noble \
  bash -c 'rm -rf /work/repo/packages/themes/<theme>/test-results /work/repo/packages/themes/<theme>/playwright-report'
```

Regeln:

- **Baselines vor jedem Lauf auf Base-Stand stellen**: `git checkout origin/develop -- <snapshot-dir>` — der Check misst dann exakt aktullen Branch-Code gegen Base-Baselines.
- **NIEMALS `--update-snapshots` bzw. `test:update:e2e` nutzen**, um Diffs „wegzudrücken": Das erzeugt neue Baselines und verwischt das Kriterium. (`snapshots-docker.mjs <theme>` ohne `--check` updated nur für den finalen Merge-Vorlauf.)
- **Themes**: `default`, `bwst`, `ecl`, `kern`, `desy` (unter `packages/themes/`) sowie `unstyled` (liegt unter `packages/unstyled/`, kein Theme-CSS, nur Basis-Layer — sensitiver Indikator für DOM-Umbauten im Basis-Styling).
- **CI-Alternative für den finalen Merge-Vorlauf**: `gh workflow run update-snapshots.yml --ref <branch>` — nur dort, wo neue Baselines bewusst erzeugt werden sollen.

## 3. Analyse-Werkzeuge (Pixel, DOM, Soll-App)

1. **Pixel-Differenzzähler** (PIL/Python genügt): geänderte Pixel, Bounding-Box, Zeilenbänder mit Farbproben (`exp=(r,g,b) act=(r,g,b)`) — zeigt Verschiebung vs. Fehlen vs. Farbwechsel. Erwartetes PNG aus dem Base-Branch holen: `git show origin/develop:<png> > /tmp/dev.png`.
2. **Farbraster-Ausdruck** (Bild als Buchstabenraster, Zelle 3–8 px): macht ohne Bildbetrachtung sichtbar, WO Inhalte stehen.
3. **Soll-App parallel bereithalten**: `git worktree add <dir> origin/<base>` + dieselbe Pipeline dagegen bauen. Damit sind DOM-Proben im Seitenvergleich möglich (Soll vs. Ist unter identischen Bedingungen).
4. **DOM-Probe-Vorlage**: kleines Playwright-Skript, das pro Host den Schatten-Baum läuft und pro Element `getBoundingClientRect()` + `getComputedStyle()` (display, gap, padding, margin, outline, boxShadow, color, font-size, flex-direction) druckt. Selektoren IMMER vom Host (`host.shadowRoot`) aus laufen — `document.querySelectorAll` durchdringt keine Shadow-Roots, und `querySelector(".a, .b")` liefert nach Wrapper-Umbauten gern den Wrapper statt des Ziel-Elements.
5. **Kompiliertes CSS greppen statt Sass zu vertrauen**: `tr '}' '\n' < <gebautes-css> | grep <klasse>` — Sass-`X &`-Verschachtelung kompiliert innerhalb eines Blocks zu Descendant-Selektoren, die nie matchen (siehe Muster 6).

## 4. Iterations-Loop (pro Theme/Scope, ~6 min pro Check-Lauf)

1. Docker-Check laufen lassen, Fehlliste nehmen (vor jedem Lauf Ergebnisordner räumen, Baselines auf Base-Stand).
2. Differenzpixel analysieren (Werkzeug 1): LIEGT etwas falsch (Verschiebung um n px), FEHLT etwas (weiß statt Farbe) oder IST etwas ZU VIEL? Erst diese Frage beantworten, dann CSS anfassen.
3. Hypothese: betroffene Elemente in Ist- und Soll-App proben (Werkzeuge 3/4). **Route-Optionen beachten!** Viele Sample-Routen setzen `viewportSize` (z. B. 600 statt 800) — eine Probe ohne Route-Viewport rendert ein anderes Layout als der Check und führt stundenlang in die Irre.
4. Fix in der richtigen Schicht (Theme-Mixin vs. Consumer-Datei vs. Basis), Fix-Batches nach Ursache bündeln, nicht pro Einzelszenario.
5. Re-Check. Grün → Snapshots auf Base-Stand committen + Quell-Fix committen. Abgeschlossen ist das Theme erst mit dokumentierter Evidenz (Exit-Code/„N passed") im Companion-Plan.
6. **Sofort danach: Erfahrungswerte zu diesem Theme in Abschnitt 12 dieses Skills nachtragen** (Pflicht, siehe Abschnitt 5) — erst dann das nächste Theme anfangen.

## 5. Pflicht nach jedem Theme: Erfahrungswerte in diesen Skill

**Nach jedem abgeschlossenen Theme (grüner Docker-Check) werden die Erfahrungen dieses Themes in Abschnitt 12 nachgetragen — ohne Ausnahme, vor dem Wechsel zum nächsten Theme.** Ziel: Jedes folgende Theme und jede folgende Styling-Aufgabe startet mit dem angesammelten Wissen statt es neu zu erfinden. Die 5-Theme-Kampagne des Link-PRs hat gezeigt, dass die Ursachen sich pro Theme wiederholen — wer die Muster des Vorgänger-Themes kennt, ist deutlich schneller.

Pro Theme ein Eintrag mit diesem Minimum:

```markdown
### <Datum> — <Komponente/Migration>: Theme <name>

- **Ausgangslage**: <Anzahl Diffs>, betroffene Szenarien/Blöcke
- **Ursachen & Fix-Muster**: welche Muster aus Abschnitt 6 griffen, welche nicht
- **Theme-Spezifika**: Eigenheiten dieses Themes (Struktur, Mixin-Signaturen, bekannte Tücken)
- **Fix-Commit(s)**: <Hashes>
- **Evidenz**: <Prüfbefehl + Ergebnis, z. B. „294/294 passed, Exit 0">
```

Der Skill-Eintrag wird zusammen mit dem Theme-Fix committet (oder direkt danach). Der Companion-Plan bleibt die tagesaktuelle Arbeitsspur, der Skill das langfristige Gedächtnis.

## 6. Fix-Muster-Katalog (visuelle Deltas nach Style- und Struktur-Umbauten)

Diese Ursachen deckten in der Praxis >90 % der Diffs — in dieser Reihenfolge prüfen. Die Muster sind komponenten-agnostisch formuliert: `Block` ist die BEM-Wurzel (liegt nach einem Umbau oft auf einem Wrapper-`<div>`), `__element` das innere Element, das Zustände oder Semantik trägt (Anker, Button, Input, Überschrift …).

### 6a. Universelle Muster (jede Art von Umbau)

1. **Tote Selektoren für anderes DOM**: Ein für Block A geschriebenes Mixin (auf `__element` gescoped) wird auch für Block B inkludiert, dessen DOM dieses Element nie hat. Fix: Mixin parametrisieren, auf welchem Element die Stile landen; B inkludiert mit dem Wert, der die Stile auf den Klassenträger legt.
2. **Zustands-Optik am nie zuständigen Wrapper**: `:focus`-/`:active`-Regeln treffen den Wrapper nicht mehr, weil er Zustände nie trägt — sie delegiert das innere Element. Fix: `:focus-within`-Varianten am Wrapper (Outline, box-shadow, Variant-Variablen) plus Unterdrückung der UA-/Basis-Optik am inneren Element (`__element:focus { outline: none }` o. ä.).
3. **Wrapper füllt die Zeile nicht** (Nav-, Listen-, Breadcrumb-Einträge): Anhängsel (Chevron, Pfeil, Marker) kleben am Label statt am Zeilenende, Text verschiebt sich um ~n px. Fix: `flex: 1 1 auto` auf den Wrapper; das innere Element füllt dann über das Basis-`flex: 1`.
4. **Root-Stile hängen am Wrapper, gehören aber auf das tragende Element**: Padding (Fokus-Ring-Box!), Farbe (geerbte Icon-/Label-Farbe), Marker-`::before` (erbt die Farbe des falschen Kontexts). Fix: auf `__element` verschieben und dafür Normalize-Padding des Wrappers nullen — sonst wachsen Zeilenhöhen um die Doppel-Padding.
5. **Default-Optik des inneren Elements greift neu**: Reset-Regeln (`text-decoration`, Rahmen, Hintergrund, Listen-Marker …) galten vormals dem Wurzel-Element und decken das innere semantische Element jetzt nicht mehr ab — oder umgekehrt wirkt dessen UA-/Basis-Optik neu. Fix: Resets zusätzlich auf `__element` setzen bzw. dort gezielt neutralisieren.
6. **Sass-`X &`-Verschachtelung**: Innerhalb eines Blocks kompiliert `X &` zu einem Descendant-Selektor (`.a__element .a …`), der nie matcht. NIEMALS dem Kompilat vertrauen — das gebaute CSS greppen (Abschnitt 3, Werkzeug 5), bevor die Wirkung einer Regel vorausgesetzt wird.
7. **Woher kam der Stil in der Basis wirklich?** Erst die Include-Kette prüfen (welche Datei inkludiert das Mixin in welchem Kontext — Consumer laden fremde Block-Stile oft nur über ein extra Include), bevor „das hatte die Basis nicht" angenommen wird.

### 6b. Selektoren-Regel, wenn ein Umbau das zustandstragende Element in einen Wrapper verschiebt

Situation: `<element class="block">` wird zu `<div class="block"><element class="block__element">`. Danach sortieren sich alle Selektoren, die den alten Block betrafen, in drei Gruppen:

| Gruppe                    | Kriterium                                                                                                                      | Handlung                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| **A — muss wandern**      | Prädikat hängt am interaktiven Element: `:focus`, `:focus-visible`, `:active`, `:disabled`, `[disabled]`, `[aria-disabled]`, … | auf `&__element` scopen                     |
| **B — bleibt**            | `:hover`, `:focus-within`, Modifier-Klassen, Descendant-Selektoren auf innere Text-/Icon-Elemente                              | unverändert                                 |
| **C — Custom Properties** | Design-Token/Variablen auf der Block-Wurzel                                                                                    | unverändert; sie vererben durch den Wrapper |

- **Gefährlichste Untergruppe von A — kombinierte Prädikate** wie `&:not([disabled], [aria-disabled='true']):hover`: Am Wrapper ist `:not([disabled])` **immer wahr** — deaktivierte Elemente bekämen Hover-Styling. Solche Regeln fallen nicht einfach aus, sie kehren sich um. Vollständig auf `&__element` verschieben, wo Zustands- und Interaktions-Prädikate wieder am selben Element hängen.
- **Geteilte Mixins parametrisieren**: Ein Mixin, das Block-Stile für mehrere Blöcke liefert, braucht einen Parameter, der das Zielelement benennt — inneres Element vs. Klassenträger selbst (`null`/`false` für Blöcke ohne inneres Element). Cross-Includes (Stile von Block X auf Block Y) brauchen den Wert, der die Stile auf dasselbe **Element** legt wie vor dem Umbau — nicht einfach auf die Klasse.
- **Bewusste Ausnahmen entscheiden, nicht migrieren**: Manche Include-Sites haben heute einen toten Block (Selektoren, die nie matchten). Würde man sie „korrekt" migrieren, griffeen die Regeln neu — eine Verhaltensänderung, kein Zero-Delta. Solche Sites im Companion-Plan als Decision Point führen.
- **Basis-Dateien mitpräfen**: Regeln auf dem alten Wurzel-Selektor in den Basis-Dateien des Components-Pakets landen nach dem Umbau auf dem Wrapper — auch wenn sie „wrapper-sicher" aussehen (Vererbung/Box-Rolle), sind sie Kandidaten für den Pixel-Check.
- Alle Mixin-Include-Sites im Überblick:

```bash
grep -rn "@include" packages/themes/*/src packages/components/src --include='*.scss'
```

## 7. Fallstricke aus der Praxis

- **Route-ViewportSize bei Proben** (siehe Loop 3) — teuerste Fehldiagnose-Quelle. Grenzwertige Umbrüche (Label, das auf dem Base 1 px vor dem Umbruch liegt) flaken dann wie zufällig; Ursache ist fast immer Muster 4 (Doppel-Padding). Messen mit Route-Viewport, nicht raten.
- **App-Probe ≠ Check-Kontext**: Bei Widerspruch eine temporäre `probe.spec.js` direkt in den Tests-Ordner der Prüfpipeline legen und im echten Runner mit `--grep=probe` ausführen. Die Datei NACH dem Workspace-Spiegeln ins Volume schreiben (Sync-Tools löschen Fremddateien) und NIE committen.
- **„Baseline ist stale"-Verdacht**: Vor jedem solchen Urteil den Base-Code selbst gegen die Baselines laufen lassen. Ist der Base-Check grün, sind die Baselines reproduzierbar und der Branch schuldet jede Differenz. Erst wenn der Base-Check selbst rot ist: Baselines-Regenerierung MIT Begründung und Owner-Absprache (siehe Allowlist).
- **Hydrate-SSR-Snapshot pinnt das gerenderte Shadow-DOM** (`packages/adapters/hydrate/test/__snapshots__/…`): Jede DOM-Änderung trifft ihn. Deshalb: `pnpm --filter @public-ui/components build` VOR `pnpm --filter @public-ui/hydrate test:update:unit` laufen lassen, und `pnpm -r test:unit` statt nur `--filter components` — „nur das Components-Paket testen reicht nicht".
- **Stale generierte Typen**: `tsc`-Fehler über fehlende `HTMLKol*Element`-Typen bedeuten meist veraltete `components.d.ts` — einmal das Components-Paket bauen.
- **Prop-Factory verweigert `undefined`-Defaults**: Für „Attribut nur wenn gesetzt" das `''`-Sentinel-Muster nutzen (leerer Wert = Attribut entfällt), sonst leckt der Config-Default (z. B. `tabindex="0"`) ins gerenderte DOM — ein visuelles und semantisches Delta.
- **Verschachtelte interne Transitional-Tags** (z. B. `-wc`-Wrapper) werden von Peer-Komponenten gerendert; vor Planung von Löschungen die Tag-Konstante im Components-Paket greppen.
- **Shadow-Retargeting**: `document.activeElement` zeigt nur den Host; die Fokus-Kette über `shadowRoot.activeElement` abwärts verfolgen, wenn „fokussiert, aber keine Optik" verwirrt.
- **unstyled-Theme-Spezifika**: kein Build-Schritt (`theme.ts` direkt, kein `THEME_CSS`); Route `icon/font` wird für `THEME_EXPORT=UNSTYLED` übersprungen; zeigt NUR den Basis-Layer — jede visuelle Änderung deutet auf DOM-Umbauten im Basis-Styling hin; Docker-Support ist über `discoverThemes()` (liest auch `packages/unstyled`) vorhanden.

## 8. Allowlist — der einzige Ausweg

- Ein Diff ist nur akzeptabel als **beabsichtigte** Änderung: explizit im Companion-Plan gelistet mit Begründung und Freigabe des Repo-Owners. Default: leer.
- Niemals Baseline-Diffs pauschal akzeptieren, um die Zahl zu senken — das Kriterium wird dadurch entwertet, nicht erfüllt.

## 9. Baselines-Philosophie

Baselines werden **nicht regeneriert**, sondern auf den Base-Stand gestellt (Abschnitt 2). Eine Regenerierung erzeugt neue „Wahrheit" und gehört nur in den finalen Merge-Vorlauf (`update-snapshots.yml`) — und auch das nur, wenn der Base-Code die existierenden Baselines nachweislich nicht mehr reproduziert (Beweis siehe Fallstricke).

## 10. Companion-Plan als Handoff-Dokument

Ein Plan-Dokument **im Repo** (z. B. `.claude/plans/<branch>.md`), das jede Session aktuell hält. Plan-Commits zusammen mit — oder vor — der Arbeit, die sie beschreiben. Pflichtabschnitte:

- **Goal**: Ziel + Kriterium + Messbefehl + je Theme/Scope eine Statuszeile mit Prüfbefehl.
- **Current state**: Tabelle der Commits mit aussagekräftiger Zusammenfassung, mit Datum.
- **Open work**: priorisiert; Abschnitt 0 ist das Kriterium selbst mit aktuellem Stand.
- **Decision points**: offene Fragen für den Repo-Owner — nie unilateral entscheiden.
- **Pitfalls**: real passiert, konkret (Fix-Muster + Fallstricke aus Abschnitten 6–7 sind der Startpunkt, repo-spezifische Ergänzungen gehören hierher).
- **Validation commands**: die exakten Befehle vor jedem Commit (Lint, Tests, Formatter je betroffenem Paket; SCSS: `pnpm --filter @public-ui/<theme> lint:stylelint` — `--fix`-Variante zuerst; bei DOM-Änderungen zusätzlich Hydrate-Snapshots).

Abgeschlossene Abschnitte als „DONE (Datum)" markieren und stehen lassen — der nächste Agent braucht den Verlauf, nicht nur den Restzustand.

## 11. Checkliste pro Session

- [ ] Docker-Daemon läuft (`docker info`); ohne Docker: Arbeit als offene Position im Companion-Plan dokumentieren, keine lokalen Ersatzläufe
- [ ] Zieldiff gemessen und mit Plan-Eintrag abgeglichen; Evidenz = Docker-Check-Exit-Code/CI-Job, nicht die zurückgesetzte PNG-Zahl
- [ ] Vor jedem Check-Lauf: Ergebnisordner geräumt, Baselines auf Base-Stand
- [ ] Diffs klassifiziert (verschiebt/fehlt/zu viel), Muster-Katalog (6a + 6b) abgegangen, Fix-Batches nach Ursache
- [ ] Route-Viewport bei allen Proben beachtet; kompiliertes CSS bei Selector-Zweifeln gegriffen
- [ ] Bei DOM-Änderungen: Hydrate-Snapshot aktualisiert (Components-Build davor), `pnpm -r test:unit`
- [ ] Plan aktualisiert (Current state, Open work, Pitfalls), Decision points ergänzt statt entschieden
- [ ] Validation commands vor jedem Commit ausgeführt
- [ ] Theme fertig? → Erfahrungswerte für dieses Theme in Abschnitt 12 nachgetragen (Pflicht, siehe Abschnitt 5)

## 12. Erfahrungswerte (fortlaufend aktualisiert)

### 2026-08-30 — kol-link-Skeleton-Migration (PR #10652): Kampagnen-Ergebnis

- **Ausgangslage**: 5 Themes, je 294 Szenarien, initial 127 PNG-Diffs (bwst 31, ecl 27, default 26, kern 22, desy 21) — alle auf 0 reduziert.
- **Hauptursachen** (>90 %): tote Selektoren (Muster 1), Fokus-Optik am Wrapper (Muster 2), Doppel-Padding durch Root-Stile am falschen Element (Muster 4).
- **Evidenz**: je Theme `node scripts/snapshots-docker.mjs <theme> --check` → 294/294 passed, Exit 0; `git diff origin/develop..HEAD -- '*.png'` = 0. Fix-Commits: 016038670a (default), c40ce57340 (bwst), 4e9106f6d8 (ecl), e4fceaeb97 + 5482632f2c (kern), 8c30ed9b75 (desy).
- **Erkenntnisse**:
  - Route-ViewportSize ist die teuerste Fehlerquelle — immer prüfen.
  - `text-decoration: none` muss auf Shadow-Root-Anker zusätzlich gesetzt werden.
  - Docker-Check ist identisch mit CI-Ergebnissen — lokale Tests ohne Docker waren irreführend.
  - Kompiliertes CSS prüfen statt Sass-Verschachtelung zu vertrauen.
  - Review-Finding: PNG-Diff-Zahl nach Baseline-Checkout ist selbstbestätigend (deshalb Evidenzregel in Abschnitt 1); CI-Job `visual-tests (theme-<name>)` als unabhängige Abnahme führen.

### 2026-08-30 — kol-link-Skeleton-Migration: Theme default (26 Diffs → 0)

- **Ursachen & Fix-Muster**: Shared-Mixins `__anchor`-Scoping; tabIndex-Sentinel (kein `tabindex="0"` wenn ungesetzt); Skip-Nav `:focus-within`; Tree-Item Full-Width-Anker; SpanFC Empty-Icon-Guard; nav/tree-item/button-Fokus-Selektoren.
- **Letztes Delta**: `scenarios/focus-elements?component=tree` (x=281..283, erwartete Farbe (0,90,143) = `--color-primary-variant`) — behoben durch Verschieben von `padding-right: to-rem(8)` vom `.kol-link`-Wrapper auf `.kol-link__anchor` (`themes/default/src/components/tree-item.scss`): Die Fokus-Outline des Ankers reicht damit wieder bis zur Zeilenkante wie der ehemalige Full-Width-Anker. Exakt Muster 4.
- **Theme-Spezifika**: nav/tree-item sind die diff-reichsten Blöcke; Fokus-Farbe kommt über `--color-primary-variant`.
- **Evidenz**: 294/294 passed, Exit 0; CI-Job theme-default unabhängig grün.

### 2026-08-30 — kol-link-Skeleton-Migration: Theme bwst (31 Diffs → 0)

- **Theme-Spezifika / Fehlerquelle**: Ein während der Fixes eingefügtes `gap: to-rem(8)` auf `__anchor` (`mixins/link.scss`) war selbst ein visuelles Delta — es brach link/icons, link/target, quote, table und modal gegen develop. Entfernt (Commit c40ce5734): 294/294 grün ohne den Gap.
- **Lektion**: Jeder „Verbesserungs"-Fix während der Kampagne ist selbst ein Delta-Kandidat — nur fixen, was der Pixel-Vergleich belegt, nichts präventiv.

### 2026-08-30 — kol-link-Skeleton-Migration: Theme kern (22 Diffs → 0)

- **Ursachen & Fix-Muster**: Root-Stile (Padding, Farbe, Marker) von skip-nav/breadcrumb mussten auf den Anker wandern (Muster 4 — Fokus-Ring-Box und Zeilenhöhen); `--small`-Gap am Anker nur mit `2x-small`; tree-item-Fokus-Regel auf den Anker gescoped.
- **Theme-Spezifika**: `kern` braucht `$anchor-scoped`-artige Flags an Mixin-Includes für Legacy-Blöcke (details-heading, tree-item-spans), deren DOM sich nicht ändert.
- **Evidenz**: 294/294 passed, Exit 0 (Commits e4fceaeb97 + 5482632f2c).

### 2026-08-30 — kol-link-Skeleton-Migration: Themes ecl (27 Diffs) & desy (21 Diffs) → 0

- **desy-Ursachen**: nav-Anker musste gestreckt werden (Muster 3: `flex` am Wrapper/Anker); Legacy-Blöcke (details-heading, tree-item) mit Root-Level-Stilen über Mixin-Flag stabilisiert.
- **ecl**: eigene Mixin-Struktur (`ecl-ec`/`ecl-eu` ohne `src/mixins`-Standard) — Include-Sites einzeln prüfen, Worklist-Grep aus Abschnitt 6b nutzen.
- **Evidenz**: je 294/294 passed, Exit 0 (ecl 4e9106f6d8, desy 8c30ed9b75).

### 2026-08-31 — kol-link-Skeleton-Migration: Theme unstyled (0 Diffs, 293 Szenarien)

- **Ausgangslage**: 408 PNGs auf Linux (Commit 6a028d8c37), diff-los gegen develop — unstyled zeigt nur den Basis-Layer und bestätigt damit, dass der DOM-Umbau basis-stabil war.
- **Theme-Spezifika**: kein Build-Schritt (`theme.ts` direkt); Docker-Support war nachzurüsten — `discoverThemes()` liest jetzt auch `packages/unstyled` (pkg-Name aus package.json statt `@public-ui/theme-*`-Konvention); Route `icon/font` wird für `THEME_EXPORT=UNSTYLED` übersprungen.
- **Fallstricke**: lokale Tests ohne Docker erzeugen `firefox-darwin`-Snapshots (CI braucht `firefox-linux`) — nie committen.
- **Evidenz**: `node scripts/snapshots-docker.mjs unstyled --check` → 293 passed, 0 failed (4,7 min), Exit 0.

### [Datum] — [Komponente/Migration]: Theme [name]

- **Ausgangslage**:
- **Ursachen & Fix-Muster**:
- **Theme-Spezifika**:
- **Fix-Commit(s)**:
- **Evidenz**:
