---
name: zero-visual-delta-handoff
description: Disziplin für visuell unsichtbare Refactorings und Komponenten-/Theme-Migrationen — null geänderte Snapshot-Bilder gegen den Base-Branch als hartes Akzeptanzkriterium, geprüft über die lokale Docker-Pipeline (Docker-Daemon zwingend erforderlich). Komponenten-agnostisch: gilt für jede Art von Style-Anpassung, Strukturumbau oder Migration. Trigger: "zero visual delta", "visuell unsichtbar", "keine visuellen Änderungen", "visuelle Regression", "Snapshot-Diffs auf null", "Snapshot-Check", "Snapshot-Prüfung", "Baselines", "Baseline-Diffs", "update-snapshots", "PNG-Diffs", "Pixel-Diffs", "snapshots-docker", "visual tests", "Skeleton-Migration", "Komponenten-Migration", "DOM-Umbau", "DOM-Migration", "Wrapper-DOM", "interaktives Element in Wrapper", "zustandstragendes Element wandert", "Strukturumbau", "Theme-Anpassung nach DOM-Umbau", "Theme-Migration", "Theme-Fix", "Themes grün", "je Theme prüfen", "Selektoren wandern", "Selektoren migrieren", "SCSS-Anpassung", "SCSS-Migration", "Styles konsolidieren", "Style-Umbau", "Fokus-Ring verschoben", "Outline fehlt", "Zeilenhöhe gewachsen", "Handoff", "Companion-Plan", "Session-Übergabe", "Plan für den nächsten Agenten pflegen", "no visual changes", "snapshot parity", "pixel-perfect refactor".
---

# Zero Visual Delta Handoff

Refactorings an UI-Komponenten (Skeleton-Migrationen, DOM-Umbauten, Style-Konsolidierung, Theme-Anpassungen nach DOM-Änderungen), die visuell unsichtbar bleiben sollen: Verhalten und DOM dürfen sich ändern, das gerenderte Bild nicht. Der Patch gilt erst als fertig, wenn der lokale Docker-Check gegen die Base-Baselines komplett grün ist — und der Zustand so dokumentiert ist, dass jede neue Session nahtlos übernehmen kann.

Bewährt in: Strukturumbau-Kampagnen über 5 Themes + unstyled (je ~294 Szenarien, initial 127 PNG-Diffs → 0). Anstehende Aufgaben und ihre Companion-Pläne liegen unter `.claude/plans/`.

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
# Standard-Prüflauf (nur prüfen, nichts schreiben):
node scripts/snapshots-docker.mjs <theme> --check

# weitere Varianten:
node scripts/snapshots-docker.mjs default kern --check   # mehrere Themes
node scripts/snapshots-docker.mjs --all --check          # alle Themes (wie die CI)
node scripts/snapshots-docker.mjs <theme> --check -- --grep <Muster>   # Teillauf (Stichproben-Strategie, Abschnitt 4)
node scripts/snapshots-docker.mjs <theme> --shell                # interaktive Shell im Container
node scripts/snapshots-docker.mjs --reset                # Volume verwerfen (Neuinstallation)

# Tracking-Metrik gegen den Base-Branch:
git diff --name-only origin/develop...HEAD -- '*.png' | wc -l

# Vor jedem Lauf: Ergebnisordner als root im Volume aufräumen (sonst EACCES im Reporter):
docker run --rm -u 0 -v kolibri-visual-tests-work:/work mcr.microsoft.com/playwright:v1.60.0-noble \
  bash -c 'rm -rf /work/repo/packages/themes/<theme>/test-results /work/repo/packages/themes/<theme>/playwright-report'
```

Performance-Hintergrund (System-Config, gilt von selbst): Das Docker-Script setzt `CI=0` fix (keine Retries), die Playwright-Config defaultet auf 4 parallele Worker; `KOLIBRI_VISUAL_TESTS_WORKERS` oder `--workers=N` überschreiben. CI-identischer Kontrolllauf: `-- --workers=1 --retries=2`.

Regeln:

- **Baselines vor jedem Lauf auf Base-Stand stellen**: `git checkout origin/develop -- <snapshot-dir>` — der Check misst dann exakt aktuellen Branch-Code gegen Base-Baselines.
- **NIEMALS `--update-snapshots` bzw. `test:update:e2e` nutzen**, um Diffs „wegzudrücken": Das erzeugt neue Baselines und verwischt das Kriterium. (`snapshots-docker.mjs <theme>` ohne `--check` updated nur für den finalen Merge-Vorlauf.)
- **Themes**: `default`, `bwst`, `ecl`, `kern`, `desy` (unter `packages/themes/`) sowie `unstyled` (liegt unter `packages/unstyled/`, kein Theme-CSS, nur Basis-Layer — sensitiver Indikator für DOM-Umbauten im Basis-Styling).
- **CI-Alternative für den finalen Merge-Vorlauf**: `gh workflow run update-snapshots.yml --ref <branch>` — nur dort, wo neue Baselines bewusst erzeugt werden sollen.

## 3. Analyse-Werkzeuge (Pixel, DOM, Soll-App)

1. **Pixel-Differenzzähler** (PIL/Python genügt): geänderte Pixel, Bounding-Box, Zeilenbänder mit Farbproben (`exp=(r,g,b) act=(r,g,b)`) — zeigt Verschiebung vs. Fehlen vs. Farbwechsel. Erwartetes PNG aus dem Base-Branch holen: `git show origin/develop:<png> > /tmp/dev.png`.
2. **Farbraster-Ausdruck** (Bild als Buchstabenraster, Zelle 3–8 px): macht ohne Bildbetrachtung sichtbar, WO Inhalte stehen.
3. **Soll-App parallel bereithalten**: `git worktree add <dir> origin/<base>` + dieselbe Pipeline dagegen bauen. Damit sind DOM-Proben im Seitenvergleich möglich (Soll vs. Ist unter identischen Bedingungen).
4. **DOM-Probe-Vorlage**: kleines Playwright-Skript, das pro Host den Schatten-Baum läuft und pro Element `getBoundingClientRect()` + `getComputedStyle()` (display, gap, padding, margin, outline, boxShadow, color, font-size, flex-direction) druckt. Selektoren IMMER vom Host (`host.shadowRoot`) aus laufen — `document.querySelectorAll` durchdringt keine Shadow-Roots, und `querySelector(".a, .b")` liefert nach Wrapper-Umbauten gern den Wrapper statt des Ziel-Elements.
5. **Kompiliertes CSS greppen statt Sass zu vertrauen**: `tr '}' '\n' < <gebautes-css> | grep <klasse>` — Sass-`X &`-Verschachtelung kompiliert innerhalb eines Blocks zu Descendant-Selektoren, die nie matchen (siehe Muster 6).

## 4. Stichproben-Strategie und Iterations-Loop

### Stichproben-Strategie (verbindlich, in dieser Reihenfolge)

Ein Fix betrifft fast immer einen Komponenten-Baum. Deshalb von klein nach groß prüfen — nie umgekehrt:

| Stufe                | Umfang                                                        | grep                                               | Dauer (4 Worker) |
| -------------------- | ------------------------------------------------------------- | -------------------------------------------------- | ---------------- |
| 1 — Block-Stichprobe | ein einziger betroffener Block                                | `--grep "<route-fragment>"` (z. B. `button/icons`) | Sekunden         |
| 2 — Cluster          | alle Routen der betroffenen Komponente                        | `--grep "<komponente>"` (z. B. `button`)           | 10–30s           |
| 3 — Cluster-Gruppe   | bei Cross-Component-Fixen                                     | `--grep "(button\|tabs\|nav)"`                     | ~1 min           |
| 4 — Voller Lauf      | Abnahme (Theme fertig / PR-reif), NICHT pro Iterations-Commit | kein grep                                          | ~2–3 min         |

Regeln:

- **Stufe 1 zuerst, immer.** Fix-Hypothese an einem einzigen Block bestätigen oder verwerfen, bevor irgendetwas skaliert wird.
- **Nicht über Stufen springen.** Kein voller Lauf, solange der betroffene Cluster rot ist — er verbirgt die Signal-Diffs hinter bekanntem Rauschen.
- **Stufe 4 gehört zur Abnahme, nicht zu jedem Iterations-Commit.** Sind die betroffenen Cluster grün, reicht der Commit — Nebenwirkungen fängt die CI ab (`visual-tests-base.yml` vergleicht gegen Base-Baselines). Vor der Abnahme („Theme fertig", PR-reif) muss genau einmal ein voller Lauf grün sein: lokal ODER als CI-Job als Evidenz (siehe Abschnitt 1).
- Reine Geometrie-Fragen (keine Pixel) mit einer probe.spec.js klären (~4s, siehe Fallstricke) statt Blöcke zu fotografieren.

### Iterations-Loop (pro Theme/Scope)

1. Docker-Check laufen lassen, Fehlliste nehmen (vor jedem Lauf Ergebnisordner räumen, Baselines auf Base-Stand).
2. Differenzpixel analysieren (Werkzeug 1): LIEGT etwas falsch (Verschiebung um n px), FEHLT etwas (weiß statt Farbe) oder IST etwas ZU VIEL? Erst diese Frage beantworten, dann CSS anfassen.
3. Hypothese: betroffene Elemente in Ist- und Soll-App proben (Werkzeuge 3/4). **Route-Optionen beachten!** Viele Sample-Routen setzen `viewportSize` (z. B. 600 statt 800) — eine Probe ohne Route-Viewport rendert ein anderes Layout als der Check und führt stundenlang in die Irre.
4. Fix in der richtigen Schicht (Theme-Mixin vs. Consumer-Datei vs. Basis), Fix-Batches nach Ursache bündeln, nicht pro Einzelszenario.
5. Re-Check nach Stichproben-Strategie. Grün → Snapshots auf Base-Stand committen + Quell-Fix committen. Abgeschlossen ist das Theme erst mit dokumentierter Evidenz (Exit-Code/„N passed") im Companion-Plan.
6. **Sofort danach: Erfahrungswerte zu diesem Theme in Abschnitt 12 dieses Skills nachtragen** (Pflicht, siehe Abschnitt 5) — erst dann das nächste Theme anfangen.

## 5. Pflicht nach jedem Theme: Erfahrungswerte in diesen Skill

**Nach jedem abgeschlossenen Theme (grüner Docker-Check) werden die Erfahrungen dieses Themes in Abschnitt 12 nachgetragen — ohne Ausnahme, vor dem Wechsel zum nächsten Theme.**

**Was ein Erfahrungswert ist (Aufnahmekriterium):** ausschließlich Erkenntnisse aus der realen Abarbeitung, die die Abarbeitung deutlich beschleunigt hätten, wenn man früher darauf gestoßen wäre (Früher-gewusst-Test). Keine Erfahrungswerte sind:

- **System-Config** — einmalig entschieden und im Code verbaut (z. B. CI=0 im Docker-Script, Worker-Default in der Playwright-Config). Gilt ab jetzt von selbst, braucht weder Ranking noch Pflege.
- **Prozess-Regeln** — verbindliche Anweisungen dieser Disziplin (Docker-Pflicht, Baselines-Stand, Stichproben-Strategie, Allowlist). Leben in Abschnitten 0–4 und 8–9, werden nicht gerankt.

Erfahrungswerte sind dagegen wiederverwendbares Diagnose- und Abarbeitungswissen: Fallen, die Stunden kosten (Route-Viewport), Fix-Rezepte mit Beleg (Firefox-UA-Pins), Reihenfolgen, die Zeit sparen (Muster 1/2/4 zuerst), Sackgassen, die Rückschläge verhindern.

Eintragen heißt auch pflegen:

- **Bestätigt**: Griffe eine Erfahrung erneut, Zähler hochzählen und ggf. im Ranking aufsteigen — Vermerk bei der Erfahrung, kein neuer Log-Block.
- **Widerlegt/veraltet**: Stimmte eine Aussage nicht (mehr), wird sie korrigiert oder gestrichen; ein Ein-Satz-Vermerk im Log hält fest, was und warum.
- **Destillation**: Das Log (Abschnitt 12) führt den Verlauf mit Zahlen und Commits als Beleg; die Ranking-Tabelle trägt das destillierte Wissen. Log-Einträge ohne Wiederholung und ohne zukünftige Relevanz werden beim nächsten Kampagnen-Abschluss gekürzt oder entfernt.

Ziel: Jedes folgende Theme und jede folgende Styling-Aufgabe startet mit dem angesammelten Wissen statt es neu zu erfinden. Abgeschlossene Kampagnen haben gezeigt, dass sich die Ursachen pro Theme wiederholen — wer die Muster des Vorgänger-Themes kennt, ist deutlich schneller.

Pro Theme ein Eintrag mit diesem Minimum (Aufgabe/Scope statt Komponenten-Bezug formulieren — die Muster sind das Wissen, nicht die Einzelfundstelle):

```markdown
### <Datum> — <Aufgabe/Strukturumbau>: Theme <name>

- **Ausgangslage**: <Anzahl Diffs>, betroffene Szenarien/Blöcke
- **Ursachen & Fix-Muster**: welche Muster aus Abschnitt 6 griffen, welche nicht
- **Theme-Spezifika**: Eigenheiten dieses Themes (Struktur, Mixin-Konventionen, bekannte Tücken)
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

- **Viewport-Abhängigkeit von Layout-Diffs**: Die Snapshots laufen mit `viewport: { width: 800, height: 0 }` — Messproben mit „normalem" Viewport (z. B. 800×600) können komplett andere Werte zeigen (Gemessenes Beispiel: input-container 44px in beiden Bäumen bei 600px Höhe, aber 48 vs. 44px bei height 0). IMMER im Prüf-Viewport messen — dafür die probe.spec.js-Methode.
- **Kosten-Disziplin**: Stichproben-Strategie aus Abschnitt 4 einhalten — nie volle Läufe für die Fix-Iteration. Voller Lauf: ~2–3 min mit 4 Workern (seriell ~8 min, mit CI-Retries ×3); Timeouts für Docker-Läufe mind. 600s ansetzen. Vorsicht: der grep-Passthrough ist gelegentlich flaky (webServer-Exit 127/spawn ENOENT) — dann hilft ein voller Lauf oder `npm install -g --prefix /work/npm-global http-server@14.1.1` einmalig im Volume.

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
- [ ] Fix-Iteration über Stichproben-Strategie (Stufe 1 → 4); voller Lauf einmalig als Abnahme-Evidenz (lokal oder CI-Job), nicht pro Iterations-Commit
- [ ] Diffs klassifiziert (verschiebt/fehlt/zu viel), Muster-Katalog (6a + 6b) abgegangen, Fix-Batches nach Ursache
- [ ] Route-Viewport bei allen Proben beachtet; kompiliertes CSS bei Selector-Zweifeln gegriffen
- [ ] Bei DOM-Änderungen: Hydrate-Snapshot aktualisiert (Components-Build davor), `pnpm -r test:unit`
- [ ] Plan aktualisiert (Current state, Open work, Pitfalls), Decision points ergänzt statt entschieden
- [ ] Validation commands vor jedem Commit ausgeführt
- [ ] Theme fertig? → Erfahrungswerte für dieses Theme in Abschnitt 12 nachgetragen (Pflicht, siehe Abschnitt 5)

## 12. Erfahrungswerte (fortlaufend aktualisiert)

Verlaufs-Log mit Belegen (Zahlen, Commits, Exit-Codes); das wiederverwendbare Wissen selbst lebt in Abschnitten 6–7. Lebenszyklus siehe Abschnitt 5.

### Erfahrungswerte-Ranking (absteigend: Bestätigungen × Zeitersparnis/Schadenshöhe)

Aufnahme nur nach dem Früher-gewusst-Test (Abschnitt 5): Erkenntnis aus realer Abarbeitung, die die Abarbeitung deutlich beschleunigt hätte. System-Config und Prozess-Regeln werden hier NICHT gerankt — sie gelten von selbst bzw. über Abschnitte 0–4. Bei jeder Bestätigung: Zähler hochzählen, ggf. umsortieren.

**Block A — Diagnose-Beschleuniger (immer gültig)**

| #   | Erfahrung (Detail)                                                                                                                              | Bestätigt                                                  | Zeitersparnis bei früherer Kenntnis        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| 1   | Route-ViewportSize bei jeder Probe beachten → Fallstricke                                                                                       | 5-Theme-Kampagne + 3 Migrationen (u. a. icon/font 250×345) | Stunden Fehldiagnose                       |
| 2   | Im Prüf-Viewport messen (800×0), nie mit „normalem" Viewport — Geometrie ist viewport-gebunden → Fallstricke                                    | Migration default (48px nur bei height 0)                  | Fix für ein Phantom-Problem verhindert     |
| 3   | Muster 1/2/4 zuerst prüfen (tote Selektoren, Zustands-Optik am Wrapper, Doppel-Padding) — >90 % der Diffs → 6a                                  | 5-Theme-Kampagne (127 Diffs)                               | Ursachensuche am falschen Ende verhindert  |
| 4   | Kompiliertes CSS greppen statt Sass vertrauen (`X &`-Sackgasse) → Werkzeug 5                                                                    | Kampagne + Migrationen                                     | Tote Selektoren stundenlang                |
| 5   | probe.spec.js im echten Runner (~4s) für Geometrie statt raten → Fallstricke                                                                    | Migration default (48px-Row-Beweis)                        | Statt Blind-Fix-Runden                     |
| 6   | Nur fixen, was der Pixel-Vergleich belegt — keine „Verbesserungen" nebenbei → Log bwst                                                          | Theme bwst                                                 | Neue Diffs durch den Fix selbst verhindert |
| 7   | Diagnose-Goldweg: Playwright-`evaluate` (Geometrie + computed styles) gegen Base-Worktree; erst Geometrie-Diff auf 0, dann Pixel → Log unstyled | Migration unstyled + default                               | Vermutungsgetriebenes Fixen verhindert     |
| 8   | Bei „Baseline stale"-Verdacht: Base-Code selbst laufen lassen → Fallstricke                                                                     | Migration default                                          | Unnötige Baseline-Regenerierung verhindert |

**Block B — Wrapper-Umbauten / Button-Migration**

| #   | Erfahrung (Detail)                                                                                                                                                                          | Bestätigt                         | Zeitersparnis bei früherer Kenntnis                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------- |
| 9   | State-Prädikate vollständig auf `__element`; kombinierte `:not(...)` kehren sich am Wrapper um → 6b                                                                                         | Migration default                 | disabled-Hover-Bugs direkt gefunden                |
| 10  | Firefox-UA pinnt `font-weight: 400` auf jedes `<button>` → `inherit` → Log default                                                                                                          | Migration unstyled + default      | Text-Fettungs-Diffs direkt erklärt                 |
| 11  | `border-width: medium; border-style: none` statt `0` (Firefox zentriert in der Content-Box) → Log unstyled                                                                                  | Migration unstyled                | 1,5px-Verschiebungen direkt erklärt                |
| 12  | `text-align: center` (UA) trifft echten Button direkt → `inherit` auf `__element` → Log unstyled                                                                                            | Migration unstyled                | Label-Einrückungen direkt erklärt                  |
| 13  | Padding/Min-Size-Overrides auf `__element` statt Wrapper (stapeln auf a11y-Min-Size) → Muster 4                                                                                             | Migration default (+96px-Heading) | Zeilenhöhen-Diffs direkt erklärt                   |
| 14  | Include-Historie pro Consumer-Baum prüfen (mit/ohne Mixin ≠ gleiches Fix-Rezept) → Log unstyled                                                                                             | Migration unstyled                | Over-Styling in anderen Bäumen verhindert          |
| 15  | Exemption-/Größen-Override-Regeln müssen Wrapper UND inneres Element treffen → Log unstyled, bestätigt input-file-40px (Log default)                                                        | Migration unstyled + default      | 44px-Icon- und +4px-Container-Diffs direkt erklärt |
| 16  | Selektoren IMMER vom Host (`host.shadowRoot`) aus — `querySelectorAll` durchdringt keine Shadow-Roots → Werkzeug 4                                                                          | Kampagne + Migrationen            | Wrapper statt Zielelement gemessen verhindert      |
| 16b | Theme-`border: none` und border-radius müssen auf `__element` wandern: die Reserve (3px) verschiebt zentrierte Labels um 1,5px, der Radius rundet die Fokus-Outline → Log default (tabs)    | Migration default                 | 1,5px-Text- und Outline-Eck-Diffs direkt erklärt   |
| 16c | Bäume OHNE Button-Mixin: Fokus-Ring auf `__element:focus` legen — dort überschreibt er auch den UA-Ring des echten `button`; am Wrapper bleibt der UA-Ring sichtbar → Log default (details) | Migration default                 | Doppel-Ring-Diffs direkt erklärt                   |
| 16d | Geteilte Mixins für Link- UND Button-Blöcke: Fokus-Regeln brauchen BEIDE Varianten (`__anchor` + `__button`) → Log default (link-button via kol-button('kol-link'))                         | Migration default                 | Fehlender Fokus-Ring bei Cross-Blöcken verhindert  |
| 16e | Sample-Drift Branch↔Base ist eine Diff-Quelle: Variant-Auflösung (getTheme vs getCustomThemes) ändert Sample-Inhalt → Umbruch; Samples auf Base-Stand syncen → Log default (icon/font)      | Migration default                 | Phantom-Diffs in unverdächtigen Routen verhindert  |

**Block C — Betrieb**

| #   | Erfahrung (Detail)                                                                                             | Bestätigt              | Zeitersparnis bei früherer Kenntnis           |
| --- | -------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------- |
| 17  | grep-Passthrough flaky (webServer-Exit 127/spawn ENOENT) → http-server@14.1.1 einmalig im Volume → Fallstricke | mehrfach               | Statt Abbruch + voller 8-min-Lauf             |
| 18  | probe.spec.js NACH Workspace-Spiegeln schreiben, NIE committen → Fallstricke                                   | Migration default      | Sync löscht Datei, Repo bleibt sauber         |
| 19  | Hydrate-SSR-Snapshot pinnt Shadow-DOM: Components-Build davor, `pnpm -r test:unit` → Fallstricke               | Kampagne               | Rote Unit-Tests nach DOM-Änderung verhindert  |
| 20  | `tsc`-Fehler über fehlende `HTMLKol*Element`-Typen = stale `components.d.ts` → bauen → Fallstricke             | mehrfach               | Scheinbare Typfehler sofort erkannt           |
| 21  | `''`-Sentinel für „Attribut nur wenn gesetzt" statt `undefined` → Fallstricke                                  | Migration default      | `tabindex`-Leak-Diffs verhindert              |
| 22  | Fokus-Kette über `shadowRoot.activeElement` abwärts → Fallstricke                                              | Kampagne               | „Fokussiert, aber keine Optik" sofort erklärt |
| 23  | Transitional-Tags (z. B. `-wc`) vor Löschung im Components-Paket greppen → Fallstricke                         | Kampagne               | Brechende Peer-Komponenten verhindert         |
| 24  | unstyled zeigt nur Basis-Layer, kein Build-Schritt, `icon/font` übersprungen → Fallstricke                     | Strukturumbau-Kampagne | Fehlinterpretation der Diffs verhindert       |

**Block D — Sackgassen (nach Schadenshöhe; nie „bestätigen", nur entfernen, wenn Kontext entfällt)**

| #   | Warnung                                               | Belegt durch                    | Verhinderter Rückschlag       |
| --- | ----------------------------------------------------- | ------------------------------- | ----------------------------- |
| 25  | ⚠ NICHT: `outline` statt Border am Input-Container    | 52 statt 13 Fails (Log default) | Massiver Rückschlag           |
| 26  | ⚠ NICHT: `grid-template-rows: minmax(...)` gegen +4px | 20 statt 13 Fails (Log default) | Bricht andere Input-Typen     |
| 27  | ⚠ NICHT: `border-width: 0` um Höhe zu fixen           | Rahmen unsichtbar (Log default) | Unzulässiger visueller Defekt |

### 2026-08-30 — Strukturumbau (interaktives Element in Wrapper): Kampagnen-Ergebnis über 5 Themes

- **Ausgangslage**: 5 Themes, je 294 Szenarien, initial 127 PNG-Diffs (bwst 31, ecl 27, default 26, kern 22, desy 21) — alle auf 0 reduziert.
- **Hauptursachen** (>90 %): tote Selektoren (Muster 1), Zustands-Optik am Wrapper (Muster 2), Doppel-Padding durch Root-Stile am falschen Element (Muster 4).
- **Evidenz**: je Theme `node scripts/snapshots-docker.mjs <theme> --check` → 294/294 passed, Exit 0; `git diff origin/develop..HEAD -- '*.png'` = 0. Fix-Commits: 016038670a (default), c40ce57340 (bwst), 4e9106f6d8 (ecl), e4fceaeb97 + 5482632f2c (kern), 8c30ed9b75 (desy).
- **Erkenntnisse**:
  - Route-ViewportSize ist die teuerste Fehlerquelle — immer prüfen.
  - Reset-Regeln (z. B. `text-decoration`) müssen auf das innere semantische Element zusätzlich gesetzt werden.
  - Docker-Check ist identisch mit CI-Ergebnissen — lokale Tests ohne Docker waren irreführend.
  - Kompiliertes CSS prüfen statt Sass-Verschachtelung zu vertrauen.
  - Review-Finding: PNG-Diff-Zahl nach Baseline-Checkout ist selbstbestätigend (deshalb Evidenzregel in Abschnitt 1); CI-Job `visual-tests (theme-<name>)` als unabhängige Abnahme führen.

### 2026-08-30 — Strukturumbau (interaktives Element in Wrapper): Theme default (26 Diffs → 0)

- **Ursachen & Fix-Muster**: überwiegend Muster 1, 2 und 4. Letztes Delta: Fokus-Outline reichte nicht mehr bis zur Zeilenkante — behoben durch Verschieben eines horizontalen Paddings vom Wrapper auf das innere Element (exakt Muster 4). Zusätzlich: Attribut-Sentinel gegen ein `tabindex="0"`-Leak, `:focus-within`-Varianten für Blöcke mit delegiertem Fokus, Full-Width-Innenelement für Baum-/Navi-Blöcke.
- **Theme-Spezifika**: Navi- und Baum-Szenarien sind die diff-reichsten; Fokus-Farbe kommt über die Theme-Primärvariable.
- **Evidenz**: 294/294 passed, Exit 0; CI-Job theme-default unabhängig grün.

### 2026-08-30 — Strukturumbau (interaktives Element in Wrapper): Theme bwst (31 Diffs → 0)

- **Fehlerquelle**: Ein während der Fixes eingefügter „Verbesserungs"-Gap am inneren Element war selbst ein visuelles Delta und brach mehrere Szenarien gegen den Base — entfernt (Commit c40ce5734), danach 294/294 grün.
- **Lektion**: Jeder „Verbesserungs"-Fix während der Kampagne ist selbst ein Delta-Kandidat — nur fixen, was der Pixel-Vergleich belegt, nichts präventiv.

### 2026-08-30 — Strukturumbau (interaktives Element in Wrapper): Theme kern (22 Diffs → 0)

- **Ursachen & Fix-Muster**: Root-Stile (Padding, Farbe, Marker) mussten auf das innere Element wandern (Muster 4 — Fokus-Ring-Box und Zeilenhöhen); größenabhängige Abstände gelten nur in der jeweils dokumentierten Kombination; Fokus-Regeln auf das innere Element gescoped.
- **Theme-Spezifika**: Mixin-Includes für Legacy-Blöcke, deren DOM sich nicht ändert, brauchen den Parameter „Stile auf dem Klassenträger" statt auf dem inneren Element.
- **Evidenz**: 294/294 passed, Exit 0 (Commits e4fceaeb97 + 5482632f2c).

### 2026-08-30 — Strukturumbau (interaktives Element in Wrapper): Themes ecl (27 Diffs) & desy (21 Diffs) → 0

- **desy-Ursachen**: inneres Element musste die Zeile füllen (Muster 3); Legacy-Blöcke über den Mixin-Parameter „Stile auf dem Klassenträger" stabilisiert.
- **ecl-Theme-Spezifika**: eigene Mixin-Struktur (`ecl-ec`/`ecl-eu` ohne `src/mixins`-Standard) — Include-Sites einzeln prüfen (Grep aus Abschnitt 6b).
- **Evidenz**: je 294/294 passed, Exit 0 (ecl 4e9106f6d8, desy 8c30ed9b75).

### 2026-08-31 — Strukturumbau (interaktives Element in Wrapper): Theme unstyled (0 Diffs, 293 Szenarien)

- **Ausgangslage**: 408 PNGs auf Linux, diff-los gegen den Base — unstyled zeigt nur den Basis-Layer und bestätigt damit, dass der Strukturumbau basis-stabil war.
- **Theme-Spezifika**: kein Build-Schritt (`theme.ts` direkt); Docker-Support war nachzurüsten — `discoverThemes()` liest jetzt auch `packages/unstyled` (pkg-Name aus package.json statt `@public-ui/theme-*`-Konvention); Route `icon/font` wird für `THEME_EXPORT=UNSTYLED` übersprungen.
- **Fallstricke**: lokale Tests ohne Docker erzeugen `firefox-darwin`-Snapshots (CI braucht `firefox-linux`) — nie committen.
- **Evidenz**: `node scripts/snapshots-docker.mjs unstyled --check` → 293 passed, 0 failed (4,7 min), Exit 0.

### 2026-08-31 — Button-Skeleton-Migration (kol-button-wc rendert ButtonFC mit Wrapper-div): Theme unstyled (25 Diffs → 0)

- **Ausgangslage**: Nach der Button-Skeleton-Migration (kol-button-wc rendert jetzt `<div class="kol-button"><button class="kol-button__button">` statt `<button class="kol-button">`) 25 PNG-Diffs im unstyled Theme — Tabs, Nav, Form-Inputs, Button-Link, Popover-Button, Split-Button.
- **Ursachen & Fix-Muster** (alle Varianten von Muster 5 — UA-/Basis-Optik des inneren Elements):
  - **Wer den Stil je Baum lieferte, unterscheidet sich**: Bäume MIT `kol-button-styles`-Include (alert, card, combobox, details, input-file, link-button, popover-button, single-select, table-*, toolbar) behalten das volle Mixin; Bäume OHNE (tabs, nav, pagination, badge, split-button, alle Form-Inputs via form-field) bekamen das neue `kol-button-wc-box-styles`, das die alte Außenbox des Buttons exakt repliziert: `display: inline-block`, `width: 100%`, `min-width/min-height: var(--a11y-min-size)`, `margin: 0`, `padding: 0`, `background: transparent`, `text-align: center`, `border-width: medium; border-style: none`. Blindes `kol-button-styles`-Nachrüsten hätte Over-Styling erzeugt (develop hatte das Mixin in diesen Bäumen nie).
  - **Firefox zentriert Button-Inhalt vertikal innerhalb der Content-Box** (UA-Mechanik): Eine Consumer-Regel `border-bottom-style: solid` (tabs) reaktivierte am echten Button die `medium`-Breite (3px) und schrumpfte die Content-Box — Text saß 1,5px höher. Deshalb `border-width: medium; border-style: none` (NICHT `border-width: 0`) am inneren Button replizieren, sonst verschieben sich Textzeilen um 1,5px.
  - **`text-align: center` (UA) trifft den echten Button direkt**, das `div` erbt stattdessen — ohne Replikation rücken kurze Labels in breite Nav-Einträge ein. Zusätzlich `text-align: inherit` auf `__button`, sonst schlägt UA-center eine vererbte `left`-Regel (nav).
  - **Popover-Button-Inline-Exemption** (`min-width: 0; min-height: 1em`) muss BOTH treffen: `.kol-button` UND `.kol-button .kol-button__button` — sonst bleibt der 44px-a11y-Button stehen (16px-Info-Icons wurden 44px → +22px Höhen in Form-Feldern).
  - **button-link inline-Exemption** analog auf `.kol-button__button` erweitern (21px statt 44px Text-Links).
- **Diagnose-Goldweg**: Docker-Run mit Serve der gebauten App + Playwright-`evaluate` (getBoundingClientRect + computed styles) gegen einen `git worktree` des Base-Branch —_pxakt gleiche Pipeline, Zahlen statt Vermutung_. Erst Geometrie-Diff auf 0, dann Pixel-Check.
- **Theme-Spezifika**: Der Fehlermodus „unterschiedliche include-Historie pro Consumer-Baum“ ist themen-unabhängig — für default/bwst/ecl/kern/desy gilt dieselbe Prüfung je Baums.
- **Evidenz**: `node scripts/snapshots-docker.mjs unstyled --check` → 293 passed, 0 failed, Exit 0.

### 2026-08-31 — Button-Skeleton-Migration: Theme default (27 Diffs → 1 offen: icon/font 51px)

- **Ausgangslage**: 27 PNG-Diffs nach der Migration (Startpunkt der Theme-Runde).
- **Ursachen & Fix-Muster** (14 Diffs behoben):
  1. **State-Prädikate am Wrapper sterben oder kehren sich um** (Muster 6b, bestätigt): `&:not([disabled]):hover` am Wrapper trifft `:not([disabled])` IMMER (der Wrapper trägt nie `disabled`) → deaktivierte Buttons bekommen Hover-Optik. Fix: komplette Regeln auf `&__button` scopen — getan für button-mixin (hover/focus/disabled), nav, pagination, button-link, badge, accordion, input-file, table-settings, table-stateless, input.
  2. **Firefox UA pinnt `font-weight: 400` direkt auf jedes `<button>`** (minimal verifiziert: div[bold] > button → 400, span → 700): Author-Regeln am Wrapper verlieren gegen die direkte UA-Deklaration. Fix: `font-weight: inherit` auf `__button` (im `kol-button-wc-box-styles`-Mixin). Gleiches Muster gilt für `text-align: center` (UA).
  3. **Box-Paddings am Wrapper stapeln sich auf der a11y-Min-Size des inneren Buttons** statt die alte Button-Box zu vergrößern: accordion-Heading `padding: to-rem(12) to-rem(8)` → +24px pro Kopf (4× = +96px); badge smart-button `padding: to-rem(3.2)` → +13px Badge-Höhe. Fix: Padding auf `&__button` verschieben (Muster 4).
  4. **Min-Height-Overrides am Wrapper schrumpfen den echten Button nicht** (input-file `min-height: to-rem(40)`): a11y-Layer pinnt den inneren `button` auf 44px → +4px. Fix: Override auf `&__button`.
- **Offene 13 Diffs, kategorisiert** (Stand im Companion-Plan `migrate-kol-button-skeleton.md`):
  - **+4px-Familie** (input-file, input-text/variant, same-height×2, focus-inputFile×2): `.kol-input-container` 48 statt 44px im Prüf-Viewport (800×0). Die 2px-Theme-Border wirkt aufs Grid-Row-Layout (develop: Row 40px, Input ragt in die Border). **Im 600px-Viewport messen beide Bäume identisch 44px — der Effekt ist viewport-gebunden!**
  - **tabs×3 + focus-tabs**: Blockbreite 448→425; Button-Geometrie identisch.
  - **icon/font, focus-details, focus-linkButton**: einzeln zu prüfen.
- **Sackgassen (NICHT wiederholen)**:
  - `border-width: 0` am input-container: fixt die Höhe, macht den Rahmen unsichtbar → unzulässig.
  - `grid-template-rows: minmax(0, calc(--a11y-min-size - 4px))`: fixt die +4px-Blöcke, bricht aber input-color/range/select (deren Rows brauchen andere Höhen) → 20 statt 13 Fails.
  - `outline: 2px solid; outline-offset: -2px` statt Border: massiver Rückschlag (52 Fails) — Outline-Optik ≠ Border-Optik (zeichnet über dem Input-Hintergrund, folgt ggf. nicht allen Radius-Ecken).
- **Werkzeuge, die funktionieren**:
  - **probe.spec.js-Methode**: temporäre `tests/probe.spec.js` ins visual-tests-Paket + `node scripts/snapshots-docker.mjs default --check -- --grep probe` → live-Geometrie (getBoundingClientRect + getComputedStyle) im exakten Runner-Kontext (800×0-Viewport!) in ~4s. Danach Datei löschen. Damit wurde die 48px-Row direkt gegen develop gemessen.
  - **Develop-Selbstcheck**: `cd <develop-worktree> && node scripts/snapshots-docker.mjs default --check` → 294/294 grün bewies, dass die Baselines NICHT stale sind (Verdacht #10714 hatte sich nicht bestätigt) und jeder Diff dem Branch zuzuschreiben ist.
- **Abschlussrunde** (Commits df7a923b5f + 6dfe5f2a59): +4px-Familie behoben — die input-file-Über-/Unterschiede (min-height 40px auf Wrapper UND `__button`; Wurzelursache: develop schrumpfte den echten Button auf 40px, der Branch-Pinning auf 44px kam vom wc-box-Mixin + a11y-Layer). tabs×3 + focus-tabs: `border: none` und `border-radius` auf `__button` (1,5px-Label-Versatz durch die 3px-Reserve; Outline-Eckigkeit ohne Radius). focus-details: Ring auf `__button:focus` (überschreibt dort auch den UA-Ring; am Wrapper blieb der UA-Ring sichtbar). focus-linkButton: `__anchor:focus`-Variante im Button-Mixin wiederhergestellt (link-button nutzt kol-button('kol-link')). Samples auf develop-Stand gesynct (getTheme statt getCustomThemes — die Branch-Variante löste andere Variant-Daten und damit einen anderen Code-Span-Umbruch aus).
- **Verbleibend: icon/font, 51px deterministic** — block/button/pill/icon/span-Geometrie UND computed styles via probe.spec.js IM ROUTE-VIEWPORT (250×345!) bit-identisch gegen develop; Rest ist ein Firefox-Paint-Artefakt des umgebrochenen Button-Labels im zusätzlichen Wrapper-Kontext. Für Owner-Entscheidung dokumentiert (Allowlist oder tiefere Font-/Hyphenation-Untersuchung).
- **Evidenz**: 296 passed, 1 failed (icon/font) — vor der Theme-Runde: 267/27. Fix-Commits df7a923b5f + 6dfe5f2a59.

### [Datum] — [Aufgabe/Strukturumbau]: Theme [name]

- **Ausgangslage**:
- **Ursachen & Fix-Muster**:
- **Theme-Spezifika**:
- **Fix-Commit(s)**:
- **Evidenz**:
