---
name: zero-visual-delta-handoff
description: Disziplin für visuell unsichtbare Refactorings und Komponenten-/Theme-Migrationen — null geänderte Snapshot-Bilder gegen den Base-Branch als hartes Akzeptanzkriterium, geprüft über die lokale Docker-Pipeline (Docker-Daemon zwingend erforderlich). Komponenten-agnostisch: gilt für jede Art von Style-Anpassung, Strukturumbau oder Migration. Trigger: "zero visual delta", "visuell unsichtbar", "keine visuellen Änderungen", "visuelle Regression", "Snapshot-Diffs auf null", "Snapshot-Check", "Snapshot-Prüfung", "Baselines", "Baseline-Diffs", "update-snapshots", "PNG-Diffs", "Pixel-Diffs", "snapshots-docker", "visual tests", "Skeleton-Migration", "Komponenten-Migration", "DOM-Umbau", "DOM-Migration", "Wrapper-DOM", "interaktives Element in Wrapper", "zustandstragendes Element wandert", "Strukturumbau", "Theme-Anpassung nach DOM-Umbau", "Theme-Migration", "Theme-Fix", "Themes grün", "je Theme prüfen", "Selektoren wandern", "Selektoren migrieren", "SCSS-Anpassung", "SCSS-Migration", "Styles konsolidieren", "Style-Umbau", "Fokus-Ring verschoben", "Outline fehlt", "Zeilenhöhe gewachsen", "Handoff", "Companion-Plan", "Session-Übergabe", "Plan für den nächsten Agenten pflegen", "no visual changes", "snapshot parity", "pixel-perfect refactor".
---

# Zero Visual Delta Handoff

Refactorings an UI-Komponenten (Skeleton-Migrationen, DOM-Umbauten, Style-Konsolidierung, Theme-Anpassungen nach DOM-Änderungen), die visuell unsichtbar bleiben sollen: Verhalten und DOM dürfen sich ändern, das gerenderte Bild nicht. Der Patch gilt erst als fertig, wenn der lokale Docker-Check gegen die Base-Baselines komplett grün ist — und der Zustand so dokumentiert ist, dass jede neue Session nahtlos übernehmen kann.

Bewährt in: Strukturumbau-Kampagnen über 5 Themes + unstyled (je ~294 Szenarien, initial 127 PNG-Diffs → 0). Anstehende Aufgaben und ihre Companion-Pläne liegen unter `.claude/plans/`.

## 0. Voraussetzung: Docker — ohne Docker kein Start

**Diese Disziplin funktioniert ausschließlich mit einem laufenden Docker-Daemon. Vor dem ersten Schritt prüfen (`docker info`).** Schlägt das fehl, heißt das zunächst nur, dass der **Daemon nicht läuft** — nicht, dass Docker fehlt: in den Container-Umgebungen dieser Sessions ist die Engine installiert, und `dockerd &` als root startet sie (danach `docker info` erneut prüfen; der Playwright-Container braucht zusätzlich den Agent-Proxy-CA, siehe Erfahrung #34). Erst wenn auch das scheitert, wird die Arbeit NICHT mit lokalen Playwright-Läufen in einem anderen Browser ersetzt, sondern im Companion-Plan als offene Arbeit dokumentiert und an eine Session mit Docker übergeben. Ein Ersatz-Browser hat in einer realen Session eine echte Regression durchgelassen (Log 2026-09-21).

Warum Docker zwingend ist:

- Das Font-Rendering hängt am Betriebssystem und `snapshotPathTemplate` enthält `{platform}`. Snapshots, die auf macOS oder Windows entstehen, sind für die CI wertlos und dürfen nie committet werden (z. B. erzeugt ein lokaler Lauf `firefox-darwin`-Snapshots, die CI braucht `firefox-linux`).
- Nur der Container mit dem fixen Playwright-Image (`mcr.microsoft.com/playwright:v<version>-noble`, Version aus `packages/tools/visual-tests/package.json` abgeleitet) rendert exakt wie die CI. Lokale Tests ohne Docker waren nachweislich irreführend — Ergebnisse stimmten mit der CI nicht überein.

## 1. Akzeptanzkriterium als hartes Gate

- **Jede Snapshot-Datei im PR-Diff muss exakt so aussehen wie auf dem Base-Branch. Solange Bilder differieren, ist die Arbeit nicht fertig.**
- **„CI grün" ist kein Abschlussbeweis**: Snapshot-Workflows committen neue Baselines und werden dadurch selbst grün. Grün + Diff-Anzahl > 0 = offene Arbeit. Umgekehrt kann ein Visual-Test-Job grün sein, während `build-and-check` rot ist (z. B. Stylelint) — jede Pipeline separat bewerten.
- **Evidenzregel gegen Selbstbestätigung**: Wer nach grünem Check die Theme-PNGs auf Base-Stand zurücksetzt (`git checkout origin/develop -- <snapshots>`), macht die PNG-Diff-Zahl per Konstruktion zu 0 — unabhängig davon, ob die Renderings wirklich übereinstimmen. Abnahme-Evidenz ist deshalb **der Exit-Code des Docker-Checks** („N passed, 0 failed") bzw. der CI-Job `visual-tests (theme-<name>)`, nicht die PNG-Zahl nach dem Zurücksetzen.
- **Ungeprüfte Diffs gehören nicht in den PR**: Ein plausibel aussehender, ungeprüfter SCSS-Diff ist für Reviewer nicht von einem geprüften zu unterscheiden. Theme-Arbeit ohne Pixel-Gate bleibt draußen (eigene Worklist/eigener PR).
- **Theme-Styling-Korrekturen leben im Theme-Package**: Stil-Fixes eines Themes (nicht unstyled) dürfen ausschließlich CSS im eigenen Package (`packages/themes/<theme>/src`) ändern — keine Stil-Anpassungen am Components-CSS. Das Components-Paket gehört der DOM-Migration; Theme-Arbeit kompensiert ausschließlich theme-lokal (Nutzerregel aus der Button-Skeleton-Kampagne 2026-09).

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

Performance-Hintergrund (System-Config, gilt von selbst): Das Docker-Script setzt `CI=0` fix (keine Retries). Die Playwright-Config defaultet **lokal auf 4 Worker** (schnelle Iteration) und **in CI auf 1 Worker** (`process.env.CI` → maximale Snapshot-Stabilität; parallele Firefox-Instanzen erzeugen gelegentlich sub-pixel-flaky Renders). `KOLIBRI_VISUAL_TESTS_WORKERS` oder `--workers=N` überschreiben beides.

**Fix-Iteration**: die 4 lokalen Worker beibehalten (Docker-Script → `CI=0` → 4). **Voller Abnahme-Lauf vor dem Push** (`--all --check`): mit **1 Worker** fahren, um auf Nummer sicher zu gehen — `KOLIBRI_VISUAL_TESTS_WORKERS=1 node scripts/snapshots-docker.mjs --all --check`. CI-identischer Einzel-Kontrolllauf: `-- --workers=1 --retries=2`.

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

- **System-Config** — einmalig entschieden und im Code verbaut (z. B. CI=0 im Docker-Script, Worker-Default in der Playwright-Config: lokal 4 / CI 1 / voller Pre-Push-Lauf 1 via `KOLIBRI_VISUAL_TESTS_WORKERS=1`). Gilt ab jetzt von selbst, braucht weder Ranking noch Pflege.
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

8. **Wegfallende Descendant-Stufe senkt die Spezifität — Compound-Selektor statt Weglassen.** Wird
   ein Wrapper entfernt, sitzen Consumer-Klasse und Block-Klasse danach auf **demselben** Element:
   aus `.kol-x__btn .kol-button` wird `.kol-x__btn`. Das ist ein Treffer weniger (0-3-0 → 0-2-0).
   Regeln, die vorher nur über die Quellreihenfolge gegen eine gleich spezifische Theme-Regel
   gewannen, verlieren jetzt still. Belegter Fall: ecl-ec schreibt dem Badge-Smart-Button per
   `content: '\ea0e'` ein Icon vor und lag mit dem Mixin-Selektor
   `.kol-icon[class*=' kolicon-'].kolicon-…::before` gleichauf — nach dem Wegfall der Stufe rendert
   das Mixin-Glyph. Fix: die Stufe durch einen **Compound**-Selektor ersetzen
   (`.kol-x__btn.kol-button …`), nicht ersatzlos streichen. Das Element trägt beide Klassen, die
   Spezifität bleibt exakt erhalten.

9. **Zwei Boxen werden zu einer — Größen-Floor neu rechnen.** Trug vorher ein äußeres Element
   Padding/Border und ein inneres den `min-height`-Floor, fallen beide nach dem Umbau in dieselbe
   border-box: der Floor schluckt Padding und Border, statt sie zu addieren. Fix:
   `min-height: calc(<floor> + <padding> + <border>)`.

10. **Nativ semantische Container blenden Inhalt aus, den der Nachbau im Layout hielt.** Ein
    geschlossenes `<details>` nimmt seinen Content-Teilbaum komplett aus dem Layout — damit fällt
    nicht nur dessen Höhe weg, sondern auch jede Dekoration auf dem Wrapper (Padding, Rahmen) und
    jede Baseline, die der Vorgänger daraus bezog. Ein `inline-block`-Host bemisst seine Line-Box
    aus dieser Baseline, sodass ein einziger Wegfall zwei voneinander unabhängig aussehende Deltas
    erzeugt. Fix theme-lokal je nach Bedarf: Dekoration auf dem Block im Zustand `:not(--open)`
    rekonstruieren, Baseline über ein `::after` mit `display: block`, `height: 0` und einem
    Zero-Width-Space als `content` zurückholen.

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
- **Kosten-Disziplin**: Stichproben-Strategie aus Abschnitt 4 einhalten — nie volle Läufe für die Fix-Iteration. Voller Lauf: ~2–3 min mit 4 Workern (Fix-Iteration), ~6–8 min mit 1 Worker (Pre-Push-Abnahme); Timeouts für Docker-Läufe mind. 600s ansetzen (1-Worker-Vollläufe eher 900s+). Vorsicht: der grep-Passthrough ist gelegentlich flaky (webServer-Exit 127/spawn ENOENT) — dann hilft ein voller Lauf oder `npm install -g --prefix /work/npm-global http-server@14.1.1` einmalig im Volume.

- **Route-ViewportSize bei Proben** (siehe Loop 3) — teuerste Fehldiagnose-Quelle. Grenzwertige Umbrüche (Label, das auf dem Base 1 px vor dem Umbruch liegt) flaken dann wie zufällig; Ursache ist fast immer Muster 4 (Doppel-Padding). Messen mit Route-Viewport, nicht raten.
- **App-Probe ≠ Check-Kontext**: Bei Widerspruch eine temporäre `probe.spec.js` direkt in den Tests-Ordner der Prüfpipeline legen und im echten Runner mit `--grep=probe` ausführen. Die Datei NACH dem Workspace-Spiegeln ins Volume schreiben (Sync-Tools löschen Fremddateien) und NIE committen.
- **„Baseline ist stale"-Verdacht**: Vor jedem solchen Urteil den Base-Code selbst gegen die Baselines laufen lassen.
- **„Hat der Docker-Lauf überhaupt den Branch gebaut?" — verifizieren statt Bauchgefühl**: Die Pipeline baut den Branch-Stand selbstständig — der Mirror transportiert ohnehin kein `.git` und kein `dist`, im Volume laufen `pnpm install` + Dependencies-Build (`@public-ui/visual-tests^...`), und die Test-App wird bei jedem Testlauf frisch in ein Temp-Verzeichnis gebaut (`packages/tools/visual-tests/src/index.js`). Ein manueller Host-Build ist für den Check nicht nötig; Host-`dist` würde nicht gespiegelt. Drei Prüfungen bei Zweifel: (1) Branch-only-Marker im Volume-dist greppen (`docker run --rm -v kolibri-visual-tests-work:/work <image> grep -rl <nur-im-Branch-existierende-Klasse> /work/repo/packages/components/dist`) — ein Base-DOM wäre trivial grün gegen Base-Baselines, nur ein Marker-Befund macht das Ergebnis aussagekräftig; (2) dist-mtime gegen die Laufzeit des Checks vergleichen; (3) Lauf-Log auf „Abhängigkeiten der Visual-Tests bauen" und „Building Visual-Tests App" prüfen. Develop-Vergleiche laufen über einen separaten develop-Worktree mit derselben Pipeline. Ist der Base-Check grün, sind die Baselines reproduzierbar und der Branch schuldet jede Differenz. Erst wenn der Base-Check selbst rot ist: Baselines-Regenerierung MIT Begründung und Owner-Absprache (siehe Allowlist).
- **Hydrate-SSR-Snapshot pinnt das gerenderte Shadow-DOM** (`packages/adapters/hydrate/test/__snapshots__/…`): Jede DOM-Änderung trifft ihn. Deshalb: `pnpm --filter @public-ui/components build` VOR `pnpm --filter @public-ui/hydrate test:update:unit` laufen lassen, und `pnpm -r test:unit` statt nur `--filter components` — „nur das Components-Paket testen reicht nicht". **2026-09-17 bestätigt (PR #10914): PR war finalisiert mit allen visual-tests grün („No visual changes"), aber build-and-check rot — die Visual-Pipeline deckt den Hydrate-Snapshot NICHT, „No visual changes" ist kein Test-Ersatz. Der Snapshot gehört auf die finale Prüfliste vor dem Push, nicht in eine CI-Nachreicherunde.**
- **Stale generierte Typen**: `tsc`-Fehler über fehlende `HTMLKol*Element`-Typen bedeuten meist veraltete `components.d.ts` — einmal das Components-Paket bauen.
- **Prop-Factory verweigert `undefined`-Defaults**: Für „Attribut nur wenn gesetzt" das `''`-Sentinel-Muster nutzen (leerer Wert = Attribut entfällt), sonst leckt der Config-Default (z. B. `tabindex="0"`) ins gerenderte DOM — ein visuelles und semantisches Delta.
- **Verschachtelte interne Transitional-Tags** (z. B. `-wc`-Wrapper) werden von Peer-Komponenten gerendert; vor Planung von Löschungen die Tag-Konstante im Components-Paket greppen.
- **Shadow-Retargeting**: `document.activeElement` zeigt nur den Host; die Fokus-Kette über `shadowRoot.activeElement` abwärts verfolgen, wenn „fokussiert, aber keine Optik" verwirrt.
- **unstyled-Theme-Spezifika**: kein Build-Schritt (`theme.ts` direkt, kein `THEME_CSS`); Route `icon/font` wird für `THEME_EXPORT=UNSTYLED` übersprungen; zeigt NUR den Basis-Layer — jede visuelle Änderung deutet auf DOM-Umbauten im Basis-Styling hin; Docker-Support ist über `discoverThemes()` (liest auch `packages/unstyled`) vorhanden. Die Basis ist zudem scheme-neutral: `unstyled`-Snapshots dürfen unter `KOLIBRI_VISUAL_TESTS_COLOR_SCHEME=light` und `=dark` nicht differieren; ein Diff zwischen beiden Läufen ist ein Fehler in `components`, nicht im Test.
- **Farbwechsel im Diff gehört nie in die Basis**: Zeigt die Farbprobe `exp=(r,g,b) ≠ act=(r,g,b)` bei unveränderter Geometrie, liegt die Ursache in der Theme-Schicht (Token, Mixin, Include-Kette) — niemals durch Farben oder gar Dark/Light-Regeln (`prefers-color-scheme`, `color-scheme`, `light-dark()`) in `components` „reparieren“. Die Basis ist layout-only und scheme-neutral (siehe `docs/BASE_STYLING_VS_THEMING_CONCEPT.md`).

## 7b. Was der Pixel-Gate strukturell **nicht** sieht

Snapshots fotografieren Ruhezustände. Hover, `:active`, `:focus`, `:focus-visible` und
`[disabled]`-Kombinationen kommen darin nicht vor. Bei einem DOM-Umbau, der ein zustandstragendes
Element in einen Wrapper verschiebt, liegt aber **genau dort** das Risiko:

- `:focus` / `:focus-visible` / `:disabled` propagieren nicht auf Vorfahren → am Wrapper tot.
- `:not(:disabled)` / `:not([disabled])` sind am Wrapper **immer wahr** → die Regel fällt nicht aus,
  sie kehrt sich um und stylt deaktivierte Elemente.
- `&__element` innerhalb eines Modifier-Blocks expandiert zu `--modifier__element` → tot.

Ein grüner Pixel-Lauf sagt über all das nichts. „Alle Themes grün" ist deshalb kein Beleg für einen
vollständigen Selektor-Umzug. Zwei Prüfungen decken die Lücke:

```bash
pnpm check:skeleton-selectors   # statisch, vollständig, Sekunden — läuft auch in CI
```

und ein dynamischer Interaktionstest je Theme: `hover()` / `focus()` auf einem aktivierten **und**
einem deaktivierten Element, `getComputedStyle` vergleichen. Der statische Check beweist, dass
Selektoren matchen können; der Interaktionstest beweist, dass sie das Richtige tun. Beide gehören
neben den Pixel-Gate, keiner ersetzt ihn.

Fix-Muster für invertierende Regeln, wenn der Wrapper das Subjekt bleiben soll (Hover-Optik
pixelgleich, deaktivierte Elemente fallen wieder heraus): `&:not(:has(:disabled)):hover`.

## 8. Allowlist — der einzige Ausweg

- Ein Diff ist nur akzeptabel als **beabsichtigte** Änderung: explizit im Companion-Plan gelistet mit Begründung und Freigabe des Repo-Owners. Default: leer.
- Niemals Baseline-Diffs pauschal akzeptieren, um die Zahl zu senken — das Kriterium wird dadurch entwertet, nicht erfüllt.

## 9. Baselines-Philosophie

Baselines werden **nicht regeneriert**, sondern auf den Base-Stand gestellt (Abschnitt 2). Eine Regenerierung erzeugt neue „Wahrheit" und gehört nur in den finalen Merge-Vorlauf (`update-snapshots.yml`) — und auch das nur, wenn der Base-Code die existierenden Baselines nachweislich nicht mehr reproduziert (Beweis siehe Fallstricke).

## 10. Companion-Plan als Handoff-Dokument

Ein Plan-Dokument **lokal, ungetrackt** (z. B. `.claude/plans/<branch>.md`), das jede Session aktuell hält — Pläne werden nicht eingecheckt und sind nicht Teil eines PRs (Owner-Entscheid 2026-09-15, siehe migrate-to-skeleton § Konventionen). Dauerhaft relevantes Wissen wandert stattdessen in die Skills. Pflichtabschnitte:

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

| #   | Erfahrung (Detail)                                                                                                                                                                                                                                               | Bestätigt                                                  | Zeitersparnis bei früherer Kenntnis                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | Route-ViewportSize bei jeder Probe beachten → Fallstricke                                                                                                                                                                                                        | 5-Theme-Kampagne + 3 Migrationen (u. a. icon/font 250×345) | Stunden Fehldiagnose                                              |
| 2   | Im Prüf-Viewport messen (800×0), nie mit „normalem" Viewport — Geometrie ist viewport-gebunden → Fallstricke                                                                                                                                                     | Migration default (48px nur bei height 0)                  | Fix für ein Phantom-Problem verhindert                            |
| 3   | Muster 1/2/4 zuerst prüfen (tote Selektoren, Zustands-Optik am Wrapper, Doppel-Padding) — >90 % der Diffs → 6a                                                                                                                                                   | 5-Theme-Kampagne (127 Diffs)                               | Ursachensuche am falschen Ende verhindert                         |
| 4   | Kompiliertes CSS greppen statt Sass vertrauen (`X &`-Sackgasse) → Werkzeug 5                                                                                                                                                                                     | Kampagne + Migrationen                                     | Tote Selektoren stundenlang                                       |
| 5   | probe.spec.js im echten Runner (~4s) für Geometrie statt raten → Fallstricke                                                                                                                                                                                     | Migration default (48px-Row-Beweis)                        | Statt Blind-Fix-Runden                                            |
| 6   | Nur fixen, was der Pixel-Vergleich belegt — keine „Verbesserungen" nebenbei → Log bwst                                                                                                                                                                           | Theme bwst                                                 | Neue Diffs durch den Fix selbst verhindert                        |
| 7   | Diagnose-Goldweg: Playwright-`evaluate` (Geometrie + computed styles) gegen Base-Worktree; erst Geometrie-Diff auf 0, dann Pixel → Log unstyled                                                                                                                  | Migration unstyled + default                               | Vermutungsgetriebenes Fixen verhindert                            |
| 8   | Bei „Baseline stale"-Verdacht: Base-Code selbst laufen lassen → Fallstricke                                                                                                                                                                                      | Migration default                                          | Unnötige Baseline-Regenerierung verhindert                        |
| 8b  | „Falscher Stand getestet"-Verdacht per Volume-Verifikation ausräumen: Branch-only-Marker im gebauten dist (0× auf Base), dist-mtime = Laufzeit, Log-Build-Schritte — Pipeline baut automatisch (Mirror ohne `.git`/`dist`, App-Build pro Testlauf) → Fallstricke | Re-Verifikation unstyled (Button-Migration)                | Sinnlose Re-Runs + falsche Schlüsse „grün sei trivial" verhindert |

| 31 | `docker info` schlaegt fehl heisst **Daemon laeuft nicht**, nicht **kein Docker**: im Container-Setup dieser Sessions ist die Engine installiert und laesst sich als root mit `dockerd &` starten (danach `docker info` erneut pruefen). Erst wenn auch das scheitert, gilt Abschnitt 0 | Dialog-Skeleton-Migration | Eine komplette, wertlose Ersatz-Abnahme vermieden — der selbstgebaute Chromium-A/B-Lauf sah die echte Regression nicht |
| 36 | Wirkt ein Teil eines Fix-Blocks und der andere nicht, ist es fast immer eine fehlende Ahnenstufe: ein Mixin, das INNERHALB des Blocks inkludiert wird, trägt eine Klasse mehr als ein `&__element`-Override daneben. `outline: revert` täuscht dabei, weil es über den Kaskaden-Ursprung gewinnt und nicht über die Spezifität → `#{$root} &` | Collapsible-Migration desy (2026-09-21) | Stunden Spezifitäts-Suche |
| 37 | Ein geschlossenes natives `<details>` nimmt den ganzen Content-Teilbaum aus dem Layout — mit ihm die dekorierte Box des Wrappers UND die Baseline, aus der ein `inline-block`-Host seine Line-Box bemisst. Zwei getrennte Deltas aus einer Ursache | Collapsible-Migration bwst + desy (2026-09-21) | 16px-Phantomhöhe sofort erklärt |
| 38 | Baselines liegen nicht im Git: vor dem `--check` einen Base-Worktree (`git worktree add ../kolibri-base origin/develop`) mit derselben Pipeline OHNE `--check` laufen lassen (schreibt die Baselines in den Worktree), dessen `packages/themes/*/snapshots` + `packages/unstyled/snapshots` in den Branch kopieren, dann `--all --check`. Beide Läufe nacheinander im selben Volume, nie parallel | Tree-Skeleton-Migration (2026-09-23) | Ohne Baselines ist `--check` kein Vergleich, sondern ein Neuschreiben |
| 39 | Proxy-CA ohne Skript-Änderung: das Volume einmal als root vorbereiten (`/work/ca.crt` + `/work/home/.npmrc` mit `cafile=/work/ca.crt`, `chown -R 1001 /work`) — `HOME=/work/home` im Container liest die `.npmrc`, `npm install -g pnpm` und `pnpm install` laufen durch (Variante zu #34) | Tree-Skeleton-Migration (2026-09-23) | Kein ungetrackter Patch am Docker-Skript, der versehentlich mitcommittet wird |
| 28 | Jest-/Stencil-Snapshot-Serializer sortiert `class`-Attribute alphabetisch — Class-Order im Snapshot ist kein Signal für die echte DOM-Reihenfolge und kein Regressions-Signal | Details-Skeleton-Migration (PR #10884) | Phantom-Class-Order-Bug beim FC-Port sofort erkannt |

**Block B — Wrapper-Umbauten / Button-Migration**

| #   | Erfahrung (Detail)                                                                                                                                                                                                                                                                                    | Bestätigt                                        | Zeitersparnis bei früherer Kenntnis                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| 9   | State-Prädikate vollständig auf `__element`; kombinierte `:not(...)` kehren sich am Wrapper um → 6b                                                                                                                                                                                                   | Migration default                                | disabled-Hover-Bugs direkt gefunden                                 |
| 10  | Firefox-UA pinnt `font-weight: 400` **und `line-height: normal`** auf jedes `<button>` — Theme-`font-weight`/`line-height`/`text-align` am Wrapper verlieren dagegen → auf `&__button` legen (`inherit` reicht bei `kol-button-styles`-Bäumen nicht, die setzen es nicht) → Log default/kern/ecl/desy | Migration unstyled + default + kern + ecl + desy | Text-Fettungs- und ±1px-Label-Box-Diffs direkt erklärt              |
| 11  | `border-width: medium; border-style: none` statt `0` (Firefox zentriert in der Content-Box) → Log unstyled                                                                                                                                                                                            | Migration unstyled                               | 1,5px-Verschiebungen direkt erklärt                                 |
| 12  | `text-align: center` (UA) trifft echten Button direkt → `inherit` auf `__element` → Log unstyled                                                                                                                                                                                                      | Migration unstyled                               | Label-Einrückungen direkt erklärt                                   |
| 13  | Padding/Min-Size-Overrides auf `__element` statt Wrapper (stapeln auf a11y-Min-Size) → Muster 4                                                                                                                                                                                                       | Migration default (+96px-Heading)                | Zeilenhöhen-Diffs direkt erklärt                                    |
| 14  | Include-Historie pro Consumer-Baum prüfen (mit/ohne Mixin ≠ gleiches Fix-Rezept) → Log unstyled                                                                                                                                                                                                       | Migration unstyled                               | Over-Styling in anderen Bäumen verhindert                           |
| 15  | Exemption-/Größen-Override-Regeln (`min-width/min-height`, `min-*: 0`) müssen Wrapper UND `&__button` treffen — der a11y-Layer pinnt den inneren Button sonst auf `--a11y-min-size` → Log unstyled/default/desy (split-button-Chevron 44px klaut 20px, alert-Closer 20px, listbox-Delete 36px)        | Migration unstyled + default + kern + desy       | 44px-Icon-, +4px-Container- und Chevron-Breite-Diffs direkt erklärt |
| 16  | Selektoren IMMER vom Host (`host.shadowRoot`) aus — `querySelectorAll` durchdringt keine Shadow-Roots → Werkzeug 4                                                                                                                                                                                    | Kampagne + Migrationen                           | Wrapper statt Zielelement gemessen verhindert                       |
| 16b | Theme-`border: none` und border-radius müssen auf `__element` wandern: die Reserve (3px) verschiebt zentrierte Labels um 1,5px, der Radius rundet die Fokus-Outline → Log default (tabs)                                                                                                              | Migration default                                | 1,5px-Text- und Outline-Eck-Diffs direkt erklärt                    |
| 16c | Bäume OHNE Button-Mixin: Fokus-Ring auf `__element:focus` legen — dort überschreibt er auch den UA-Ring des echten `button`; am Wrapper bleibt der UA-Ring sichtbar → Log default (details)                                                                                                           | Migration default                                | Doppel-Ring-Diffs direkt erklärt                                    |
| 16d | Geteilte Mixins für Link- UND Button-Blöcke: Fokus-Regeln brauchen BEIDE Varianten (`__anchor` + `__button`) → Log default (link-button via kol-button('kol-link'))                                                                                                                                   | Migration default                                | Fehlender Fokus-Ring bei Cross-Blöcken verhindert                   |
| 16e | Sample-Drift Branch↔Base ist eine Diff-Quelle: Variant-Auflösung (getTheme vs getCustomThemes) ändert Sample-Inhalt → Umbruch; Samples auf Base-Stand syncen → Log default (icon/font)                                                                                                                | Migration default                                | Phantom-Diffs in unverdächtigen Routen verhindert                   |

| 29 | Migrierter FC darf den transitionalen `-wc`-Tag behalten: Theme-/Basis-Selektoren treffen dessen Host-Klasse als Vorfahren (ecl `.kol-details__heading-button .kol-button`, desy `kol-link('kol-details__heading-button')`, badge `.kol-badge__smart-button .kol-button`) — vor jedem Ersetzen die Selektoren greppen; DOM-identischer FC-Port erspart die komplette Theme-Runde → Log 2026-09-14 | Details-Skeleton-Migration (PR #10884), Badge-Skeleton-Migration (PR #10889) — 2× bestätigt | Theme-Fix-Runden (25–33 Diffs wie bei Button) von vornherein vermieden |

| 30 | Inlining eines Child-FCs verliert Base- UND Theme-Styles des Child-WC an der Shadow-Root-Grenze: Das Child-WC trägt sein eigenes `style.scss` (Basis: Layout, Icon-Glyph-Fonts!) **und** die Theme-Styles über sein `KOL-<TAG>`-Mapping in seinem eigenen Shadow-Root. Rendert der Parent-FC den Child-FC direkt, hängen die Elemente im Parent-Shadow-Root — dort gibt es beides nicht, außer der Parent-Stylesheet inkludiert die Basis und **jedes Theme** ein Parent-Stylesheet mit Child-Mapping liefert. Vor dem Inlining prüfen: Woher bekommt das Child heute Basis-/Theme-Styles, und liefert der Parent beide? Sonst WC-Blatt behalten → Log 2026-09-16 | Version-Skeleton-Migration (PR #10908): BadgeFC-in-Version kollabierte die Badge-Box in allen 7 Paketen (80×27 → 44×38) | 7-Changed-Image-Runde + Fehldiagnose vermieden |

**Block C — Betrieb**

| #   | Erfahrung (Detail)                                                                                                                                                                                                                                                                                                                                                      | Bestätigt                 | Zeitersparnis bei früherer Kenntnis                               |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| 17  | grep-Passthrough flaky (webServer-Exit 127/spawn ENOENT) → http-server@14.1.1 einmalig im Volume → Fallstricke                                                                                                                                                                                                                                                          | mehrfach                  | Statt Abbruch + voller 8-min-Lauf                                 |
| 18  | probe.spec.js NACH Workspace-Spiegeln schreiben, NIE committen → Fallstricke                                                                                                                                                                                                                                                                                            | Migration default         | Sync löscht Datei, Repo bleibt sauber                             |
| 19  | Hydrate-SSR-Snapshot pinnt Shadow-DOM: Components-Build davor, `pnpm -r test:unit` → Fallstricke                                                                                                                                                                                                                                                                        | Kampagne                  | Rote Unit-Tests nach DOM-Änderung verhindert                      |
| 20  | `tsc`-Fehler über fehlende `HTMLKol*Element`-Typen = stale `components.d.ts` → bauen → Fallstricke                                                                                                                                                                                                                                                                      | mehrfach                  | Scheinbare Typfehler sofort erkannt                               |
| 21  | `''`-Sentinel für „Attribut nur wenn gesetzt" statt `undefined` → Fallstricke                                                                                                                                                                                                                                                                                           | Migration default         | `tabindex`-Leak-Diffs verhindert                                  |
| 22  | Fokus-Kette über `shadowRoot.activeElement` abwärts → Fallstricke                                                                                                                                                                                                                                                                                                       | Kampagne                  | „Fokussiert, aber keine Optik" sofort erklärt                     |
| 23  | Transitional-Tags (z. B. `-wc`) vor Löschung im Components-Paket greppen → Fallstricke                                                                                                                                                                                                                                                                                  | Kampagne                  | Brechende Peer-Komponenten verhindert                             |
| 24  | unstyled zeigt nur Basis-Layer, kein Build-Schritt, `icon/font` übersprungen → Fallstricke                                                                                                                                                                                                                                                                              | Strukturumbau-Kampagne    | Fehlinterpretation der Diffs verhindert                           |
| 32  | Die Liste der geaenderten Bilder eines PRs gibt es ohne `gh` und ohne lokalen Lauf: `curl https://public-ui.github.io/kolibri/visual/pr-<n>/report.json` — je Paket jedes Snapshot mit `status`, `diffPixels` und URLs zu expected/actual/diff-PNG. Baselines selbst liegen NICHT im Git (`.gitignore`), `git diff -- '*.png'` ist darum immer 0 und als Metrik wertlos | Dialog-Skeleton-Migration | Direkt zur Ursache statt 40 Minuten Volllauf                      |
| 33  | Erfahrung #30 vor dem Inlining gezielt pruefen statt anzunehmen: liefert der rendernde Konsument die Basis- und Theme-Styles des Kindes bereits selbst (hier `@shared/_card.mixin.scss` im `kol-dialog`-Mixin), faellt der Style-Verlust an der Shadow-Grenze aus und der FC-Port ist Null-Delta                                                                        | Dialog-Skeleton-Migration | Unnoetiges Festhalten am WC-Blatt verhindert                      |
| 34  | Der Playwright-Container erreicht die Registry nur mit dem Agent-Proxy-CA: `/root/.ccr/ca-bundle.crt` in den `docker run` mounten und `NODE_EXTRA_CA_CERTS` + `npm_config_cafile` darauf zeigen lassen, sonst bricht `npm install -g pnpm` mit `SELF_SIGNED_CERT_IN_CHAIN` ab                                                                                           | Dialog-Skeleton-Migration | Der einzige Blocker zwischen "kein Docker" und laufender Pipeline |
| 35  | Eine nichtdeterministische Route macht jedes Pixel-Ergebnis wertlos: springt ein Bild zwischen zwei plausiblen Zustaenden, erst die Ursache der Nichtdeterminiertheit messen (z. B. `addInitScript`, das die fragliche DOM-API protokolliert, ueber mehrere Laeufe) und beheben, dann vergleichen                                                                       | Dialog-Skeleton-Migration | Lokal bit-identisch, CI 14 Diffs — ohne die Messung unerklaerlich |

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

- **Ausgangslage**: Nach der Button-Skeleton-Migration (kol-button-wc rendert jetzt `<div class="kol-button"><button class="kol-button__interactive-element">` statt `<button class="kol-button">`) 25 PNG-Diffs im unstyled Theme — Tabs, Nav, Form-Inputs, Button-Link, Popover-Button, Split-Button.
- **Ursachen & Fix-Muster** (alle Varianten von Muster 5 — UA-/Basis-Optik des inneren Elements):
  - **Wer den Stil je Baum lieferte, unterscheidet sich**: Bäume MIT `kol-button-styles`-Include (alert, card, combobox, details, input-file, link-button, popover-button, single-select, table-*, toolbar) behalten das volle Mixin; Bäume OHNE (tabs, nav, pagination, badge, split-button, alle Form-Inputs via form-field) bekamen das neue `kol-button-wc-box-styles`, das die alte Außenbox des Buttons exakt repliziert: `display: inline-block`, `width: 100%`, `min-width/min-height: var(--a11y-min-size)`, `margin: 0`, `padding: 0`, `background: transparent`, `text-align: center`, `border-width: medium; border-style: none`. Blindes `kol-button-styles`-Nachrüsten hätte Over-Styling erzeugt (develop hatte das Mixin in diesen Bäumen nie).
  - **Firefox zentriert Button-Inhalt vertikal innerhalb der Content-Box** (UA-Mechanik): Eine Consumer-Regel `border-bottom-style: solid` (tabs) reaktivierte am echten Button die `medium`-Breite (3px) und schrumpfte die Content-Box — Text saß 1,5px höher. Deshalb `border-width: medium; border-style: none` (NICHT `border-width: 0`) am inneren Button replizieren, sonst verschieben sich Textzeilen um 1,5px.
  - **`text-align: center` (UA) trifft den echten Button direkt**, das `div` erbt stattdessen — ohne Replikation rücken kurze Labels in breite Nav-Einträge ein. Zusätzlich `text-align: inherit` auf `__button`, sonst schlägt UA-center eine vererbte `left`-Regel (nav).
  - **Popover-Button-Inline-Exemption** (`min-width: 0; min-height: 1em`) muss BOTH treffen: `.kol-button` UND `.kol-button .kol-button__interactive-element` — sonst bleibt der 44px-a11y-Button stehen (16px-Info-Icons wurden 44px → +22px Höhen in Form-Feldern).
  - **button-link inline-Exemption** analog auf `.kol-button__interactive-element` erweitern (21px statt 44px Text-Links).
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

### 2026-09-01 — Button-Skeleton-Migration (kol-button-wc rendert ButtonFC mit Wrapper-div): Theme bwst (25 Diffs → 0)

- **Ausgangslage**: 25 PNG-Diffs nach der Button-Skeleton-Migration im bwst theme (accordion, badge, details, input-file, popover-button, split-button, tabs×3, dialog, drawer, icon/font, toolbar, scenarios-accordion, scenarios-same-height×2, scenarios-focus-elements×4)
- **Ursachen & Fix-Muster**:
  - **State-Prädikate auf `__button` gescoped** (button-mixin hover/focus/disabled): Alle `&:not([disabled], [aria-disabled='true']):hover` und `&:focus`-Regeln mussten auf `&__button` verschoben werden (Muster 2 & 6b). Die kombinierten Prädikate am Wrapper kehren sich um und würden deaktivierte Buttons mit Hover-Styling versehen.
  - **Padding auf inneres Element verschoben** (accordion, badge): Box-Stile, die sich auf die a11y-Min-Size stapeln würden, müssen auf `__button` liegen (Muster 4).
  - **Fokus-Ring auf interaktives Element** (details, nav, button-link): `:focus`-Regeln müssen auf `__button` (oder `__anchor` bei button-link) liegen, um den UA-Ring des echten Elements zu überschreiben.
  - **min-height Override auf beide Elemente** (input-file): Die 40px-Override muss sowohl auf den Wrapper als auch auf `__button` angewendet werden (a11y-Layer pinnt `__button` auf 44px).
  - **border: none auf `__button`** (tabs): Die `border: none` muss auf dem inneren Element liegen, damit die Labels baseline-korrekt bleiben. Die selected-border und border-radius bleiben auf dem Container.
- **Theme-Spezifika**: bwst hat sehr ähnliche Struktur wie default, aber mit leicht unterschiedlichen Werten (font-weight 200 statt 700, to-rem-Funktion statt CSS-Units). Die Fix-Muster sind identisch.
- **Fix-Commit(s)**: f2c7fcde87
- **Evidenz**: `node scripts/snapshots-docker.mjs bwst --check` → 288/288 passed, Exit 0 (vorher: 25 failed)

### 2026-09-01 — Button-Skeleton-Migration (kol-button-wc rendert ButtonFC mit Wrapper-div): Theme kern (23 Diffs → 11, Fortsetzung offen)

- **Ausgangslage**: 23 PNG-Diffs (accordion, badge, button-link/basic+icons, button/variants, details, dialog, drawer, icon/font, modal, popover-button, table/column-alignment, tabs×3, scenarios/accordion-components, focus-elements×8). Grüner Verifikationsstand im Commit: Table-Cluster inkl. Settings-Button (table/column-alignment, kol-table-settings), accordion, details, popover-button, split-button, toolbar, button/variants, tabs/create-button-Unterstreicherung.
- **Ursachen & Fix-Muster**:
  - **Muster 4**: Padding am Wrapper stapelt sich auf die 44px des inneren Buttons (accordion +25,6px, details +16px) → Padding auf `__button`, Wrapper-Padding nullen.
  - **Erfahrung #10 (font-weight)**: Firefox pinnt `font-weight: 400` direkt am inneren Button — die `th .kol-button { font-weight: semi-bold }`-Regel traf künftig den Wrapper und verlor gegen die UA-Deklaration; Label und Icon wurden schmaler (probe-vermessen: 28,30 → 27,53px bzw. 18,38 → 18,00px, Button 50,68 → 49,53px) → `font-weight: inherit` auf `__button` (table-stateless th, details).
  - **Erfahrung #15 (Größen-Overrides)**: `--inline` (min-size 0) und `--x-small` (dimension-large) setzten nur am Wrapper an; der innere Button blieb auf der 44px-A11y-Pinn → +12px-Button in variants → explizit `__button { min-width/min-height: var(--button-min-size) }` im Button-Mixin (die Custom Property erbt in `__button` hinein).
  - **Sass-Fallen (NEU, verwandt mit §6.6)**: ① `&__button` hinter einem Pseudo-Selektor (`&:not(:has(.kol-icon)) { &__button { … } }`) ist ungültiges Sass (addSuffix-Compilefehler). ② `&:not(…) &__button` expandiert bei verschachteltem Include (tabs: `.kol-tabs__button-group .kol-button`, table-settings: `.kol-popover-button__button .kol-button`) zu nie matchenden Doppel-Descendant-Selektoren — der Fix griff im Mixin-Kontext, nicht aber in tabs. Korrekt: plain descendant `.kol-button__interactive-element` INNERHALB des State-Blocks.
  - **text-decoration (ghost-Unterstreicherung)** propagiert nicht in atomare Inline-Boxes → `text-decoration-line/-color` zusätzlich auf `__button` setzen.
  - **`:disabled`** → `__button:disabled, __button[disabled]` (der Wrapper erhält nie das Attribut).
- **Theme-Spezifika**: kern stylt über Custom Properties (`--button-min-size`, `--button-padding`, `--button-text-*`) und Varianten-Mixins (primaryButton/normalButton/ghostButton) stattdirekter Werte; kern-ux `normalize`/`body-default`Mixin; ghostButton wird in verschachtelten Kontexten inkludiert (tabs, table-settings, card) — dort schlagen `&…&`-Konstrukte fehl.
- **Fix-Commit(s)**: bc9172d6ba (inkl. unausgeprüftem `line-height: inherit`-Fix für button-link)
- **Evidenz**: Vollläufe 283/295 → 284/295; Button-Cluster 35/39; Table-/details-/accordion-/popover-/split-/toolbar-Cluster grün (Docker-Exit-Code). Offen für Folgesession: button-link×2 + focus-buttonLink (+8px — Ursache probe-vermessen: Firefox pinnt `line-height: normal` am inneren Button, body-default 24px ging verloren; Fix liegt im Commit, unverifiziert), dialog/drawer/modal, tabs basic/icons-only/focus-tabs, icon/font (ggf. bekanntes Firefox-Paint-Artefakt wie default).

### 2026-09-01 — Re-Verifikation unstyled + Build-Kette verifiziert: Theme unstyled (erneut 293/293)

- **Anlass**: Verdacht, der Docker-Check könnte develop statt des Branch-Stands gebaut haben — dann wäre 293/293 grün trivial (Base-DOM gegen Base-Baselines).
- **Verifikation**: Die Quelle des Volumes ist ausschließlich der Host-Workspace (Mirror ohne `.git`/`dist`); das gebaute `components/dist` enthält Branch-only-Marker (`kol-button__interactive-element`, 0× auf develop, inkl. `kol-button-wc-box-styles`-CSS) mit dist-mtime während des Laufs; Lauf-Log belegt `pnpm install`, Dependencies-Build („build finished in 9.76 s") und frischen Test-App-Build pro Testlauf (`/tmp/kolibri-visual-testing-build-…`, „No theme assets … continuing without overlay" = UNSTYLED-Modus).
- **Evidenz**: `node scripts/snapshots-docker.mjs unstyled --check` → 293 passed (1.3m), 0 failed, Exit 0; Baselines vor dem Lauf identisch mit `origin/develop` (`18a71e5a3c`); `git diff origin/develop...HEAD -- '*.png'` = 0.

### 2026-09-01 — Button-Skeleton-Migration (kol-button-wc rendert ButtonFC mit Wrapper-div): Theme ecl (18 Diffs → 0)

- **Ausgangslage**: 18 PNG-Diffs im ecl-ec-Gate (nur ecl-ec ist snapshot-getestet; `package.json` `test` = `npm-run-all2 test:theme:ecl-ec`, es gibt kein `snapshots/theme-ecl_eu`). Betroffen: accordion/basic, dialog/drawer/modal, popover-button/basic, table/column-alignment, tabs×3, scenarios/accordion-components, scenarios/focus-elements×8 (button, buttonLink, details, popoverButton, splitButton, toolbar, accordion, tabs).
- **Ursachen & Fix-Muster** (Reihenfolge der Wirkung):
  1. **Fokus-Ring stirbt am Wrapper** (14 der 18, alle focus-elements + popover + dialog/drawer/modal): `ecl-ec/mixins/button.scss` zieht `&:focus, &__anchor:focus { outline: … }` — der Wrapper wird nie fokussiert. Fix: `&__button:focus` ergänzen (Erfahrung #16c — überschreibt dort auch den UA-Ring). Gleiches für `ecl-ec/mixins/link.scss` `link-carrier` bei `$anchor-scoped: false` (button-link): `&:focus` raus aus `link-carrier`, als `&__button:focus` in den `@else`-Zweig von `link()`.
  2. **Muster 4 (Doppel-Padding), probe-belegt**: tabs `.kol-button { padding: xs m }` am Wrapper → Tab-Button 44→60px (+16), Label + Unterstrich + Gruppen-Border 2px versetzt. Fix: `padding` **und** `border-bottom` auf `.kol-button__interactive-element`, `margin-bottom: -2px` bleibt am Wrapper (er ist jetzt das Flex-Item, muss die Gruppen-Border überlappen). Analog accordion `.kol-button { padding: var(--ecl-spacing-xl) }` → `.kol-button__interactive-element`.
  3. **aria-expanded sitzt am echten Button**: accordion `&[aria-expanded='true']` am Wrapper matcht nie → Plus-Icon statt Minus im offenen Panel. Fix: `.kol-button__interactive-element[aria-expanded='true']`.
  4. **Erfahrung #10 (font-weight), probe-belegt**: table-Sortierheader `.kol-table__cell--header .kol-button { font-weight: 700 }` am Wrapper — Firefox pinnt `font-weight: 400` am echten `<button>`, und `kol-button-styles` (Basis, für table/details/popover/…) setzt **kein** `font-weight: inherit` am `__button` (nur `kol-button-wc-box-styles` tut das, also tabs/nav/inputs). Fix: `font-weight: 700` auf `.kol-button .kol-button__interactive-element`.
- **Theme-Spezifika**: ecl hat zwei Export-Varianten (ecl-ec / ecl-eu) mit je eigenen, gleichnamig-anders benannten Mixins (`button()`/`link()` in ecl-ec, `kol-button()`/`kol-link()` in ecl-eu). **Nur ecl-ec ist pixel-gated.** ecl-ec-Box liegt auf `&__text` (bleibt), nicht am Wrapper — deshalb weniger Muster-4-Fälle als bei default/bwst; die Diffs sind fast alle Fokus-Ring + die zwei probe-belegten Fälle (tabs-Padding, table-font-weight). ecl-eu wurde analog migriert (Fokus-Scoping in button/nav/pagination/tabs-Mixins), ist aber **ungeprüft** (kein Gate) — als offene Position im Companion-Plan geführt.
- **Werkzeuge**: probe.spec.js im echten Runner gegen einen **zweiten Volume** (`kolibri-vt-develop`, aus dem develop-Worktree `18a71e5a3c` frisch installiert+gebaut) — Geometrie Branch vs. develop nebeneinander. Der `-- --grep`-Passthrough von `snapshots-docker.mjs` funktioniert für ecl **nicht** (Script `test` = `npm-run-all2 …`, lehnt `--grep` ab); stattdessen `node packages/tools/visual-tests/src/index.js --grep probe probe.spec.js` direkt im Container mit `HOME=/work/home PATH=/work/npm-global/bin:$PATH THEME_EXPORT=ECL_EC`.
- **Fix-Commit(s)**: (siehe Branch-Log, ecl-Commit dieser Session)
- **Evidenz**: `node scripts/snapshots-docker.mjs ecl --check` → 296 passed, 0 failed, Exit 0 (vorher 18 failed → Zwischenstand 5 → 0); `git diff origin/develop...HEAD -- '*.png'` = 0; `pnpm --filter @public-ui/theme-ecl lint:stylelint` sauber.

### 2026-09-01 — Button-Skeleton-Migration (kol-button-wc rendert ButtonFC mit Wrapper-div): Theme desy (33 Diffs → 0)

- **Ausgangslage**: 33 PNG-Diffs. Cluster: accordion (+focus, +components-Szenario), alert-Closer, button-link (+icons, +focus), combobox/single-select (smart-button/delete), dialog/drawer/modal, input-file/-text/-password smart-button (+2 focus-Szenarien), nav, pagination, popover-button, split-button (+focus), tabs×3 (+focus), toolbar/disabled, same-height×2, focus-elements×8.
- **Ursachen & Fix-Muster** (Reihenfolge des Abtragens 33→18→10→8→0):
  1. **Fokus-Ring am Wrapper tot** (button-mixin `&:focus`, link-mixin, nav, pagination-mixin, kol-input-container smart-button, listbox `__delete`, accordion `&:focus-visible`, tabs `&:focus-visible`): `&__button:focus` bzw. `&__button:focus-visible` ergänzen — unterdrückt dort auch den UA-Ring (Erfahrung #16c).
  2. **Muster 4 (Doppel-Padding), probe-belegt**: `.kol-button { padding }` am Wrapper → tab-Button 40→60px, accordion-Heading 64→84px (+20). Padding **und** `line-height` auf `.kol-button__interactive-element`; `margin-bottom`/`min-height`/`align-items` bleiben am Wrapper (Flex-Item), `min-width` muss auf BEIDE (sonst wrappen icons-only-Tabs früher).
  3. **Firefox pinnt `line-height: normal` UND `font-weight: 400`/`700`-Verlust am echten `<button>`** (Erfahrung #10, erweitert um line-height): `line-height` (accordion 1.5, tabs 1.25, kol-link-Mixin 1.25) und `font-weight: 700` (accordion open-state, input-file „Browse", table-header) müssen auf `&__button`, nicht Wrapper — sonst Label-Box +1px höher / Text dünner+schmaler.
  4. **Erfahrung #15 (Größen-Overrides auf BEIDE)**: `min-width: 0` (split-button secondary → sonst 44px-Chevron klaut 20px vom Primär-Button + verschiebt dessen Label), `min-width/min-height: 20px` (alert-Closer), `36px` (listbox `__delete`, input-file), `38px` (smart-button) — je auf Wrapper UND `.kol-button__interactive-element` legen.
  5. **`:disabled` am Wrapper tot** → `&:has(:disabled)` (button-mixin Varianten-Sub-Mixins, accordion, kol-input-container smart-button `display: none`).
  6. **Geteiltes `kol-link`-Mixin für Button-Blöcke**: neuer Parameter `$interactive-suffix` (`null` = Klassenträger unverändert wie desy-details-Heading, `'button'` = `&__button` für button-link/nav/split-button). State-Selektoren (`:focus`, `:not([aria-disabled]):is(:focus,:hover,:active)`, Varianten-`&--secondary/&--tertiary`-Fokus, `__text`-Fokusring, `line-height`) über `#{$ie}` bzw. `@if $interactive-suffix` scopen.
- **Theme-Spezifika**: desy-Box liegt auf `&__text` (bleibt) — wie ecl-ec; Diffs waren fast alle Fokus + line-height + Größen-Override, kaum echte Muster-4-Höhen außer tabs/accordion. `--a11y-min-size` wird über das `button()`-Mixin (36px) bzw. `.kol-input-container` (40px) gesetzt und **vererbt in `&__button` hinein** — reicht aber nur, wenn `button()` für den Baum inkludiert ist (nicht bei input-file/listbox → dort explizit `&__button { min-height }`). Sass-Falle: `#{$block-classname}__#{...}`-Interpolation in `/* */`-Kommentaren wird von Sass evaluiert und wirft bei nicht-in-Scope-Variablen (Kommentar im File-Scope vor dem Mixin) — Platzhalter-Text statt `#{}` schreiben.
- **Fix-Commit(s)**: (siehe Branch-Log, desy-Commit dieser Session)
- **Evidenz**: `node scripts/snapshots-docker.mjs desy --check` → 294 passed, 0 failed, Exit 0 (vorher 33 failed); `git diff origin/develop...HEAD -- '*.png'` = 0; `pnpm --filter @public-ui/theme-desy lint:stylelint` sauber (nach `--fix` Property-Reihenfolge).

### 2026-09-01 — Button-Skeleton-Migration: Theme default (1 offen → 0) + bwst (vorbestehende Regression → 0)

- **default `icon/font` (der eine lange offene Diff, angeblich „Firefox-Paint-Artefakt")**: WAR eine echte Regression. **Root cause: `kol-button-styles` im Components-Paket setzt `&__interactive-element { text-align: left }` — aus dem Anchor-Fall kopiert.** Ein echter `<button>` hat UA-`text-align: center`; ein umbrechendes Label (das schmale 44px-Pill auf `icon/font`, „Button" bricht Buchstabe-für-Buchstabe) richtete sich dadurch links statt zentriert aus. Probe (250×345-Route-Viewport): `<div class=kol-button>` `ta=left` (geerbt), `button.kol-button__interactive-element` `ta=left` (Basis) vs develop `button.kol-button` `ta=center` (UA). **Fix theme-lokal** (Basis gehört der Migration, aber ein `text-align: center` dort brach ecl/desy — die haben die Box auf `&__text` und andere Ausricht-Annahmen): `.kol-button__interactive-element { text-align: center }` im default- **und** bwst-`button()`-Mixin.
- **bwst war NICHT 288/288** — die Prä-Session-Evidenz war stale (tabs failte schon bei `edbef7f595`, ohne bwst/Components-Änderung seit dem bwst-Commit → „288/288" vermutlich nach PNG-Reset gemessen, siehe Evidenzregel §1). Zwei echte Regressionen: (a) `icon/font` (dasselbe `text-align`), (b) tabs — der f2c7fcde87-Commit hatte `border: none` + `top: 1px` + `:before/:after` nur auf `&.selected`/Wrapper gelegt, develop hatte `border: 1px solid transparent` + `position: relative; top: 1px` + Radius auf **jedem** Tab-`<button>`. Fix: Padding, transparente 1px-Border, Radius, line-height, `&.selected`-Border-Farbe **und** die `::before/::after`-Deko alle auf `.kol-button__interactive-element`; `position: relative; top: 1px` bleibt am Wrapper (Flex-Item der Tab-Gruppe). Dead `bwst/src/components/tabs-old.scss` (versehentlich in f2c7fcde87 committet, nirgends importiert) entfernt.
- **Lektion (→ Ranking-Block-A-Kandidat)**: „bekanntes Firefox-Paint-Artefakt" ist eine **Hypothese, kein Befund** — erst alle Computed-Styles Element-für-Element probe-vergleichen (`text-align`, `line-height`, `font-weight`, `align-items`, `place-items`, Border-Box). Der `icon/font`-Diff auf default wurde eine ganze Vorsession lang als Artefakt abgeschrieben; die Ursache war eine triviale `text-align`-Verwechslung im Basis-Mixin.
- **Evidenz**: `node scripts/snapshots-docker.mjs default --check` → 294/294, `bwst --check` → 294/294, je Exit 0. Fix-Commits: `7374681c60`. ecl/desy nach Basis-Revert erneut je 294/0/Exit 0 (die kurzzeitige Basis-Änderung hatte sie regressiert).

### 2026-09-01 — Button-Skeleton-Migration: Theme kern (15 → 0)

- **Ausgangslage**: 15 Diffs (Vorsession-WIP im Working Tree). Gefixt: `icon/font` (`text-align: center` auf `&__button`, `@if $interactive-element == 'button'`), `button/variants` + `link-button` + `toolbar` (Font-Größe/States trafen `.kol-link__button` — existiert nicht), `input-text`-Cluster, `nav`/`tree`, `same-height`, `button-link`, `tabs`×3.
- **Ursachen & Fix-Muster**:
  - **`button()`-Mixin für zwei Blöcke** (`kol-button` UND `kol-link` via link-button/toolbar): neuer Parameter `$interactive-element` (`'button'` / `'anchor'`), an `primaryButton`/`normalButton`/`ghostButton` durchgereicht. Ohne ihn liefen `&__button`-Regeln (Font-Size, min-size, hover/active, disabled) für den `kol-link`-Block ins Leere → Label in Fallback-Größe (sichtbar größer/fetter).
  - **`&__button` hinter Modifier** (`&--x-small { &__button { … } }` → `.kol-button--x-small__button`, matcht nie) → plain descendant `.#{$block-classname}__#{$interactive-element}`.
  - **`_link.mixin.scss` mit `$interactive-suffix`** (wie desy): Underline-Metriken (`text-underline-offset`/`from-font` lösen gegen die Font-Box des Elements auf, an dem `text-decoration` steht → ~1px-Drift) und die `:has(.kol-icon)`-Unterdrückung auf `&__button` für button-link/nav; tree-item-Spans (DOM unverändert) behalten sie am Klassenträger.
  - **`align-items: flex-start` auf `&__button`** (button-link): `kol-link-styles` setzt dort `place-items: center` — der Klassenträger war vorher der Flex-Container und top-alignte.
  - **Underline-Unterdrückung muss auf `&__button`** (tabs): `ghostButton` legt `text-decoration-line: underline` auf das interaktive Element selbst; `.kol-button--normal { text-decoration: none }` am Wrapper überschreibt das nicht.
- **Letzte 3 (`dialog`/`drawer`/`modal` „Close"-Tooltip, ~2px Antialiasing) → per DOM-Fix gelöst**: Shadow-durchdringende Probe (rekursiv alle `shadowRoot` sammeln, dann pro Root queryen — `document.querySelectorAll` bleibt an Shadow-Grenzen hängen) zeigte jede Computed-Property + Bounding-Box bit-identisch DEV vs BR (`kol-tooltip__floating`/`__arrow`/`__content`, Arrow-Rotations-Matrix, `font-family=Verdana`, `line-height=normal`, `font-kerning`, `text-rendering`, `letter-spacing`) — **einzige Struktur-Differenz: der `position: fixed`, animations-belegte Tooltip-Layer hängt auf dem Branch in einem zusätzlichen Wrapper-`<div>`**, was Firefox ~2px anders rastert (nur bei kern sichtbar, weil dessen Tooltip die hinting-empfindliche Verdana-a11y-Fallback-Font erbt). Theme-CSS hatte keinen Angriffspunkt (`&__tooltip { width: 100% }` → 6 Regressionen; `position: absolute` → kein Effekt). **Fix in `ButtonFC`**: `kol-button__tooltip` + Beschreibungs-Span als Geschwister von `BemRootNodeFC` rendern (direkte Host-Kinder, = develop-Struktur), FC gibt `<Fragment>` zurück. Danach alle 6 Themes 294/294 (bzw. 293), Hydrate-SSR + button-Jest-Snapshot nachgezogen, `pnpm -r test:unit` grün.
- **Lektion 1**: Bevor „Firefox-Paint-Artefakt" als Diagnose steht, IMMER die Shadow-durchdringende Probe fahren und Element-für-Element ALLE Font- und Geometrie-Properties vergleichen — der default-`icon/font`-Fall (eine Vorsession lang als Artefakt abgetan) war ein `text-align`-Bug.
- **Lektion 2** (präzisiert 2026-09-09, siehe Log-Eintrag unten): Auch wenn jede Computed-Property gleich ist, kann ein zusätzlicher DOM-Vorfahre über einem `position: fixed`-Compositing-Layer Firefox sub-pixel anders rastern lassen. Ein DOM-Fix (Element aus dem zusätzlichen Wrapper heraus verschieben) behebt das zuverlässig. **Kein zuverlässiger CSS-Ersatz gefunden**: gezielte Compositing-Layer-Hints direkt am `position: fixed`-Element selbst (`transform: translateZ(0)` + `backface-visibility: hidden`, `will-change: transform`, `contain: layout style`) blieben in einem zweiten, unabhängigen Testlauf alle drei wirkungslos. Wenn eine strukturelle Anforderung (z. B. Konsistenz mit einer Schwesterkomponente) den DOM-Fix ausschließt, bleibt nur Allowlist oder eine noch nicht gefundene tiefere Lösung — nicht CSS auf dem Tooltip-Element.
- **Evidenz**: `node scripts/snapshots-docker.mjs kern --check` → 294 passed, 0 failed, Exit 0 (vorher 15). Fix-Commits: `30caed4b69` (Theme, 15→3) + der `ButtonFC`-DOM-Commit dieser Session (3→0).

### 2026-09-09 — Button-Tooltip zurück in den BemWrapper (Konsistenz mit KolLink): Theme kern (0 → 3 Allowlist-Diffs, CSS-Iteration erfolglos)

- **Ausgangslage**: `ButtonFC` (`internal/functional-components/button/component.tsx`) rendert Tooltip + Description seit dem 2026-09-01-DOM-Fix als Geschwister von `BemRootNodeFC` (Fragment-Root). Owner-Anforderung: Struktur muss zu `LinkFC` passen — Tooltip/Description gehören als Kinder in den Wrapper, für alle Skeleton-Komponenten einheitlich.
- **Umbau**: `Fragment` entfernt, `BemRootNodeFC` wieder alleinige Root, Tooltip-`<div>` und Description-`<span>` als letzte Kinder darin — Struktur jetzt bit-identisch zu `LinkFC`.
- **Reproduzierter Bug**: Genau der 2026-09-01 bereits diagnostizierte Firefox-Rasterisierungs-Bug (kern, `dialog/basic`, `drawer/basic?align=left&closer=true`, `modal/basic`, „Close"-Button-Tooltip, ~2px-Antialiasing-Unterschied) kam mit der DOM-Rückverschiebung 1:1 zurück — per `git stash`-Kontrollprobe verifiziert: mit Umbau 3 zusätzliche Fails, ohne Umbau exakt 0.
- **CSS-Iteration (neu, alle drei erfolglos)**: Ziel war, diesmal einen CSS-Fix statt eines erneuten DOM-Fixes zu finden, direkt am `position: fixed`-Element `.kol-tooltip__floating` (nicht an einem Vorfahren, das hätte den Containing Block für `position: fixed` gebrochen), kern-scoped in `packages/themes/kern/src/global.scss`, je einzeln getestet via `node scripts/snapshots-docker.mjs kern --check -- --grep dialog` (Stufe-1-Stichprobe, ~15s/Iteration):
  1. `transform: translateZ(0); backface-visibility: hidden` (klassischer Compositing-Layer-Trick) → weiterhin 2 Fails (dialog+modal).
  2. `will-change: transform` (leichtgewichtiger Layer-Promotion-Hint) → weiterhin 2 Fails.
  3. `contain: layout style` (Containment ohne Containing-Block-Änderung) → weiterhin 2 Fails.
     Alle drei Versuche wieder entfernt (kein Diff im Repo). Bestätigt die 2026-09-01-Diagnose: Der Effekt hängt an der DOM-Verschachtelungstiefe des Vorfahren, nicht an fehlenden Compositing-Hints auf dem Element selbst — es gibt (Stand jetzt) keinen bekannten CSS-Hebel dafür.
- **Wichtige Nebenerkenntnis (Stichproben-Grep mit Alternation)**: `--grep "dialog|drawer|modal"` schlägt fehl (`/bin/sh: drawer: not found`) — der interne Test-Runner reicht den grep-String durch eine `shell:true`-Ausführung ohne Escaping durch, `|` wird als echte Shell-Pipe interpretiert. Einzelne `--grep`-Aufrufe (`dialog`, dann `drawer`) statt Alternation verwenden.
- **Abgrenzung zu vorbestehender Drift (wichtig, um keine Fantom-Regression zu jagen)**: Der volle kern-Lauf zeigt 9 Fails, aber nur 3 davon (dialog/drawer/modal) stammen vom Tooltip-Umbau. Die übrigen 6 (`input-file/basic?noColumns`, `popover-button/inline`, `table/column-alignment`, `table/stateless-with-selection`, `table/stateless-with-single-selection`, `scenarios/focus-elements?component=tabs`) sind identisch mit und ohne den Umbau (`git stash`-Probe) — das ist die in `.claude/plans/kol-button-theme-worklist.md` bereits bekannte, bewusst zurückgestellte Theme-Arbeit zur BEM-Umbenennung `kol-button__button` → `kol-button__interactive-element`. Dasselbe Muster (identische Diffs mit/ohne Tooltip-Umbau) bestätigt für bwst (3/3), default (10/10), desy (7/7), ecl (16/16), unstyled (2/2) — die `git stash`-Kontrollprobe je Theme ist die zuverlässige Methode, um eigene Änderung von Fremd-Backlog zu trennen, wenn ein Full-Run mehr Fails zeigt als erwartet.
- **Entscheidung**: Owner akzeptiert die 3 kern-Diffs erneut per Allowlist (`migrate-kol-button-skeleton.md`, Abschnitt A1) statt eines zweiten DOM-Fixes — die KolLink-Konsistenz wiegt hier höher als das kern-spezifische Antialiasing-Artefakt.
- **Evidenz**: `node scripts/snapshots-docker.mjs kern --check` → 284 passed, 9 failed (davon 3 neu vom Umbau, 6 vorbestehend), Exit 1. Mit `git stash` (Vorzustand) → 287 passed, 6 failed (nur die vorbestehenden), Exit 1.

### 2026-09-14 — Skeleton-Migration kol-details (DOM-identischer FC-Port): alle 6 Themes, 0 Diffs ab Start

- **Ausgangslage**: Erste Skeleton-Migration, die das Pixel-Gate ohne einzige Theme-Fix-Runde passiert: DetailsFC (`internal/functional-components/details/`) ersetzt den Legacy-`KolCollapsibleFc`-Pfad (WC-Orchestrator + stateless FC nach ARC42), PR #10884.
- **Ursachen & Fix-Muster**: Der Weg zum 0-Diff-Start war die **DOM-identische Portierung**: Classes, IDs und Attribute byte-gleich aus dem Legacy-Pfad übernommen, `BemRootNodeFC` nur fürs Root-div, und der transitorische `kol-button-wc` blieb im FC — seine Host-Klasse `kol-details__heading-button` wird von Theme-/Basis-Selektoren als Vorfahre getroffen (ecl `.kol-details__heading-button .kol-button`, desy `kol-link('kol-details__heading-button')`, default/kern heading-button-Regeln); ein direktes `ButtonFC` hätte die Klasse auf die Ebene von `.kol-button` verschoben und diese Selektoren gebrochen (Erfahrung #29). Einziger DOM-Delta: die inerte Root-`id` (kein Pixel-Delta).
- **Theme-Spezifika**: keine. Das ist die eigentliche Lehre: Bevor ein DOM-Entscheid während der Migration fällt, die Theme-/Basis-SCSS-Selektoren auf die betroffenen Klassen prüfen — dann kann die Theme-Runde komplett entfallen (Gegenprobe: Button-Migration mit 25–33 Diffs je Theme, weil der Wrapper-Umbau erst nach dem Port sichtbar wurde).
- **Fix-Commit(s)**: Migrations-Commit auf `refactor/migrate-kol-details-skeleton` (PR #10884).
- **Evidenz**: je Theme `node scripts/snapshots-docker.mjs <theme> --check` → 293/293 passed, Exit 0 (default, bwst, ecl, kern, desy, unstyled); `git diff origin/develop...HEAD -- '*.png'` = 0. Diagnose-Falle unterwegs: Jest-Snapshot-Serializer sortiert `class`-Attribute alphabetisch (Erfahrung #28).

### 2026-09-14 — Skeleton-Migration kol-badge (DOM-identischer FC-Port): alle Pakete, 0 Diffs ab Start

- **Ausgangslage**: Zweite Migration in Folge, die das Pixel-Gate ohne eine einzige Theme-Fix-Runde
  passiert (PR #10889). BadgeFC (`internal/functional-components/badge/`) ersetzt das `render()` des
  Legacy-WC; WC-Orchestrator nach ARC42, kein Behavior nötig.
- **Ursachen & Fix-Muster**: keine — der DOM wurde byte-identisch portiert. Zwei Entscheidungen
  waren dafür ausschlaggebend, beide **vor** dem Schreiben des FC durch Greppen der Theme-/Basis-SCSS
  getroffen: (a) der transitionale `kol-button-wc` blieb im FC, weil `.kol-badge__smart-button
.kol-button` (default/bwst) bzw. `… button` (kern) und `.kol-badge__smart-button .kol-button`
  (ecl-ec) die Host-Klasse als Vorfahren brauchen (Erfahrung #29, 2. Bestätigung); (b) die Wurzel
  blieb ein `<span>` statt `BemRootNodeFC` — ein Badge ist Inline-Inhalt, und ARC42
  § „BemRootNodeFC Pattern" erlaubt den direkten `bem.forBlock`-Weg für nicht-`div`-Wurzeln.
- **Neu gelernt (Früher-gewusst-Test bestanden)**: Eine Render-Prop, die _fehlen_ darf, ist mit
  `StrictFields` nicht ausdrückbar. Lösung: `unsetRenderProp(key)` direkt nach `initRenderProps`
  **und** vor jedem `apply`, plus ein `Omit<…> & { key?: T }`-Override am FC-Prop-Typ (Muster, das
  `SpanFC` schon nutzt). Ohne das Unset leckt der Config-Default ins DOM — dieselbe Klasse Fehler
  wie der `tabindex="0"`-Leak aus Erfahrung #21, nur mit einem leeren Button als Symptom.
- **Diagnose-Falle unterwegs**: Ein Pfad-Glob (`themes/*/src/…`) in einem JSDoc-Block **beendet den
  Kommentar** am `*/`; `tsc` meldet dann `TS1443`/„Unterminated template literal" in Zeilen weit
  hinter der Ursache. Pfad-Globs in Kommentaren ausschreiben.
- **Theme-Spezifika**: keine.
- **Fix-Commit(s)**: `427bec2` auf `claude/peaceful-babbage-qpr0bn` (PR #10889).
- **Evidenz**: CI-Jobs `visual-tests (<paket>)` alle grün; Visual-Review-Bot „✅ No visual changes",
  je 408 unchanged / 0 changed für `unstyled`, `theme-default`, `theme-bwst`, `theme-ecl`,
  `theme-kern`, `theme-desy`, `test-tag-name-transformer`; Baseline `001397bfb1` (develop),
  Commit `427bec23a9`; `git diff --name-only origin/develop...HEAD -- '*.png'` = 0. Docker stand in
  der Session nicht zur Verfügung — die CI-Jobs sind laut § 1 gleichwertige Abnahme-Evidenz.

### 2026-09-14 — Konsumenten-Ausbau `kol-button-wc` → `ButtonFC` (kol-badge): 8 → 2 → 1 → freigegeben

- **Ausgangslage**: Erster Konsument, der den transitionalen Wrapper verlässt. Die Migration selbst
  war DOM-identisch und mit 0 Diffs abgenommen; erst der Wrapper-Ausbau änderte das DOM bewusst und
  erzeugte 8 geänderte Bilder über alle sieben Pakete.
- **Ursachen & Fix-Muster** (in dieser Reihenfolge abgetragen):
  1. **`@Prop`-Defaults des Wrappers sind unsichtbar für die Prop-Definitionen** (6 von 8 Diffs).
     `kol-button-wc` deklariert `_inline = false` und `_tooltipAlign = 'top'` als Stencil-Feld; die
     mit dem Link geteilten Definitionen tragen `true` und `'right'`. Ergebnis: `--inline` statt
     `--standalone` und Tooltip rechts statt oben. Fix: `BUTTON_ELEMENT_DEFAULTS` im Resolver.
     **Kein Unit-Test fängt das** — die Snapshots schreiben die neue Ausgabe fest.
  2. **Wegfallende Descendant-Stufe senkt die Spezifität** (Muster 8, neu). `.kol-x__btn
.kol-button …` → `.kol-x__btn …` ist 0-3-0 → 0-2-0; ecls Icon-Regel gewann vorher nur über die
     Quellreihenfolge gegen das eigene Icon-Mixin und verlor danach. Fix: Compound-Selektor
     `.kol-x__btn.kol-button …`.
  3. **Rest: 1 px, Line-Box-Unterlänge.** Im Wrapper erzeugte das `inline-block`-`.kol-button` eine
     Line-Box, deren Unterlänge unter dem Button lag; ohne Wrapper wird der Block als Flex-Item
     blockifiziert, hat keine Line-Box und sitzt exakt mittig — ~1 px tiefer. Nur ecl zeigt es, weil
     `--a11y-min-size: 26px` den Button dort klein genug hält.
- **Diagnose ohne Docker**: Das CI-Artefakt `visual-review-<paket>` enthält `expected`/`actual`/`diff`
  als PNG. Herunterladen (`download_workflow_run_artifact` → curl → unzip) und mit PIL Bounding-Box
  plus Zeilenbänder ausgeben — das lieferte beide Male die entscheidende Antwort (verschobene Glyphe
  = anderes Icon; 1-Zeilen-Versatz = Line-Box). **Werkzeug 1 des Skills funktioniert vollständig
  ohne Docker**, wenn die CI das Artefakt liefert.
- **Ausgang**: Die letzten 1 px wurden vom Owner auf der Visual-Review-Seite freigegeben
  (Allowlist nach § 8) statt einen semantisch leeren Wrapper-`<span>` wieder einzuführen.
- **Fix-Commit(s)**: `f971400` (Ausbau), `41d923f` (Defaults), `8abd56b` (Spezifität) auf PR #10889.
- **Evidenz**: `Visual Review: 1 visual changes approved by deleonio`, kombinierter Status `success`,
  Commit `77f332a835`; sechs Pakete 408/0, ecl 407/1 (freigegeben);
  `git diff --name-only origin/develop...HEAD -- '*.png'` = 0.

### 2026-09-15 — kol-alert-Skeleton-Migration, Nachtrag ButtonFC-Closer (alert + card): alle 6 Themes

- **Ausgangslage**: Nach dem Owner-Wunsch, den Alert-/Card-Closer von `kol-button-wc` auf `ButtonFC`
  direkt umzustellen (PR #10895, zweiter Fix-Commit oben auf der bereits migrierten Skeleton-PR),
  zeigte der Docker-Zero-Delta-Check erstmals seit dem Rebase auf einen frischen develop-Stand
  echte Regressionen, die die vorherige CI-Validierung (gegen einen älteren develop-Stand) nicht
  erfasst hatte: `alert/basic` und `alert/card-msg` auf default/bwst/desy, `card/basic` (inkl.
  320px-Reflow) auf default/bwst/kern/desy/ecl-ec.
- **Ursachen & Fix-Muster** (zwei neue, komponenten-agnostische Muster, ergänzend zu Abschnitt 6):
  1. **Spezifitäts-Kollision nach DOM-Merge (verwandt mit 6b)**: Ein Closer, der vorher als
     eigenständiges Custom Element (`kol-button-wc`, eigene Klasse) im Light-DOM lag, bekommt nach
     dem Umbau auf `ButtonFC` direkt `kol-button` UND die Block-eigene Closer-Klasse auf demselben
     Element. Eine 3-Klassen-Ahnen-Selektor-Regel wie `.block--variant .block__closer .kol-button`
     kollabiert dadurch auf 2 Klassen (`.block--variant .block__closer`) — Tie mit einer generischen
     2-Klassen-Regel (z. B. `.kol-close-button:is(.kol-button--normal)` im Button-Mixin), gewinnt
     dann nach Quellreihenfolge statt nach Absicht. **Fix**: `&.kol-button` an die eigene Klasse
     anhängen, um die alte 3-Klassen-Spezifität wiederherzustellen (`.block--variant
.block__closer.kol-button`) — deterministisch unabhängig von der Kompilat-Reihenfolge.
  2. **Grid-Row-Stretch bei `display:flex`-Grid-Items in Firefox**: Ein `ButtonFC`-Closer
     (`display:flex`) als Grid-Item, das über mehrere Tracks inkl. row-gap spannt (z. B. Icon+
     Heading-Row und Content-Row eines Alerts), stretcht in Firefox auf die volle Track-Höhe +
     row-gap, **obwohl** `align-self: self-start` gesetzt ist (z. B. 22+4+22=48px statt 44px
     Closer-Eigenhöhe) — ein Legacy-`display:block`-Closer mit derselben `align-self`-Regel tat das
     nicht. **Fix**: explizite `height` (nicht nur `min-height`) auf den Closer setzen — aber **nur**
     in Themes, die `align-self: self-start` für die generische Closer-Klasse überhaupt deklarieren.
     Themes ohne diese Regel verlassen sich schon auf den Grid-Default `align-items: stretch` und
     STRETCHEN ABSICHTLICH auf die reale (Content-getriebene) Zeilenhöhe — das ist kein Bug, sondern
     exakt das Legacy-Verhalten (baseline-verifiziert: 44px bei normaler Breite, 78px bei 320px-
     Reflow mit 3-zeilig umgebrochener Card-Headline, beides korrekt gestretcht). Denselben
     `height`-Fix dort trotzdem zu setzen bricht das gewollte Stretchen bei größeren Zeilen. **Vor
     jedem Fix**: `grep -n "align-self" <theme>/button.scss` — Regel vorhanden? Nur dann fixen.
  3. **Statische-Position-Divergenz bei `position:absolute` ohne `top`**: Ein absolut positioniertes
     Element ohne explizites `top` löst seine Position über die "statische Position" auf (wo es in
     normalem Fluss stünde). Diese Berechnung unterscheidet sich in Firefox zwischen
     `display:flex`- und `display:block`-Elementen, wenn ein vorausgehendes Geschwister (z. B. eine
     optionale Überschrift) unterschiedlich hoch ist — der `display:flex`-Closer landete 20px zu
     tief, exakt versetzt um die Höhe der Überschrift. **Fix**: `top: 0` (oder den sonst intendierten
     Wert) explizit setzen statt sich auf `auto`/die statische Position zu verlassen.
- **Theme-Spezifika**: default/bwst/ecl-ec deklarieren `align-self: self-start` für den generischen
  Closer (Muster 2 trifft zu, `height`-Fix nötig); desy und kern deklarieren es NICHT (Muster 2
  trifft nicht zu, kein `height`-Fix — ein zuerst versehentlich für beide gesetzter Fix wurde
  wieder entfernt, nachdem er `card-basic--basic-320` brach). desy hat zusätzlich Muster 3 (Alert-
  Closer ist bei desy `position:absolute`, bei den anderen Themes ein normales Grid-Item).
- **Diagnose-Goldweg (bestätigt Erfahrung #7)**: `probe.spec.js` mit rekursivem
  Shadow-Root-Sammler + `getComputedStyle`/`getBoundingClientRect`, einmal gegen den Branch-
  Container (`kolibri-visual-tests-work`) und einmal gegen einen zweiten, aus dem develop-Tip
  aufgebauten Container (`kolibri-vt-develop`) gefahren — beide Zahlen nebeneinander (Höhe, `top`,
  `align-self`, Grid-Row-Template, row-gap) haben beide Muster in Minuten statt Stunden belegt.
- **Neue Sackgasse**: `align-self`/`height`-Fix pauschal auf alle Themes mit derselben Closer-Klasse
  anwenden, ohne vorher zu prüfen, ob das Theme die zugrunde liegende `align-self`-Regel überhaupt
  hat — bricht das (korrekte) Stretch-Verhalten in den Themes ohne diese Regel.
- **Prozess-Erfahrung**: Nie zwei `snapshots-docker.mjs`-Läufe parallel gegen dasselbe Volume
  starten (Build-Race-Condition, `ENOENT`/`mkdir: File exists`) — auch nicht versehentlich über
  einen Session-Reset hinweg (ein Hintergrundprozess einer vorherigen, unterbrochenen Session kann
  weiterlaufen; vor jedem Lauf `pgrep -f snapshots-docker.mjs` prüfen).
- **Fix-Commit(s)**: `be211d0b19` (erster, zu pauschaler Fix), `a6dc87507e` (Stylelint-Nachzieh),
  Korrektur-Commit dieser Session (desy/kern-Overrides entfernt, desy `top:0` ergänzt) auf PR #10895.
- **Evidenz**: je Theme einzeln geprüft (kombinierte Läufe verursachen die Race-Condition oben) —
  default/bwst/kern/desy: `--grep alert` 5/5 passed, `--grep card` 11/11 passed, je Exit 0; ecl und
  unstyled unterstützen kein `--grep` → je ein voller Lauf, 297/297 passed, Exit 0.

### 2026-09-16 — Skeleton-Migration kol-version (PR #10908): 7 Changed-Images → 0, ohne Theme-Runde

> Ueberholt: der WC-Blatt-Fix wurde am 2026-09-21 zurueckgenommen (Eintrag darunter). Der
> Eintrag bleibt fuer die Diagnose (Groessensprung = Layout-Kollaps) und die Ursachenanalyse.

- **Ausgangslage**: Der PR inlined `BadgeFC` direkt in den `kol-version`-Shadow-Root. Ergebnis: je
  1 Changed-Image pro Paket (Visual Review „7 changed"), Docker default 294/1 (`version/basic`),
  Screenshot-Größe 80×27 → 44×38 — die Badge-Box kollabierte, Icon und Label stapelten vertikal.
  Zusätzlich war `build-and-check` rot: Hydrate-SSR-Snapshot nicht nachgezogen.
- **Ursachen & Fix-Muster**: Erfahrung #30 — das Badge-WC brachte Basis-Styles (`display: flex`,
  `kol-icon-styles()` mit Icon-Glyph-Font) und Theme-Styles (`border-radius` usw. über
  `KOL-BADGE`-Mapping) in seinem eigenen Shadow-Root mit; kein Theme hat ein `version.scss`/
  `KOL-VERSION`-Mapping, also kam in `kol-version` beides nie an. Fix: der transitionale
  `kol-badge`-WC bleibt als Blatt in `VersionFC` (Erfahrung #29-Muster), Props
  `_color`/`_icons`/`_label` wie im Legacy-WC, `VERSION_COLOR` wieder Raw-String. Keine einzige
  Theme-Änderung nötig.
- **Diagnose-Weg**: Diff-Klassifikation per PIL auf den aus dem Volume kopierten
  expected/actual-PNGs (Größensprung = Layout-Kollaps, nicht Verschiebung) → Styles im
  Ziel-Shadow-Root geprüft (`version/style.scss` = nur `@shared/global`; kein
  `.kol-version`-Selektor irgendwo; kein `KOL-VERSION`-Theme-Mapping) → WC-Blatt statt FC.
- **Theme-Spezifika**: keine — der WC-Blatt-Fix ist theme-unabhängig, alle 6 Themes in einem Lauf.
- **Fix-Commit(s)**: `d440124106` auf `vibe/version-skeleton-migration-b4ddb6`.
- **Evidenz**: `KOLIBRI_VISUAL_TESTS_WORKERS=1 node scripts/snapshots-docker.mjs --all --check` →
  bwst/default/desy/ecl/kern/unstyled je 295 passed, Exit 0; Components 965/965;
  Hydrate-SSR 102 passing; `git diff origin/develop...HEAD -- '*.png'` = 0.
  Stufe-1 vorab: `default --check -- --grep version` → 3 passed, Exit 0.

### 2026-09-21 — kol-version rendert BadgeFC (PR #10908): Styles mitnehmen statt WC-Blatt, 0 Diffs

- **Ausgangslage**: Der Owner verlangte, dass die FC ausschliesslich `BadgeFC` rendert — der
  WC-Blatt-Fix vom 2026-09-16 (Eintrag darueber) war damit keine Option mehr. Die dort
  beschriebene Ursache blieb: Basis-Styles haengen per Stencil `styleUrls` am `kol-badge`-Tag,
  Theme-Styles per `KOL-BADGE`-Mapping; `version` fehlte sogar im `TagEnum`.
- **Ursachen & Fix-Muster**: Nicht das Tag zurueckholen, sondern **beide Style-Schichten teilbar
  machen** (Muster `kol-link-styles`/`mixins/link.scss`, das Breadcrumb fuer `LinkFC` nutzt):
  `@shared/_badge.mixin.scss` (`kol-badge-styles()`, inkl. `kol-icon-styles()`) fuer die Basis,
  pro Theme `mixins/badge.scss` (kern: `_badge.mixin.scss`) plus ein eigenes
  `components/version.scss` und ein `KOL-VERSION`-Mapping im Theme-Index. `version` muss dafuer in
  `schema/tag-names.ts` ergaenzt werden — ohne `TagEnum`-Eintrag ist der Theme-Key nicht typisiert.
- **Theme-Spezifika**: keine. Das Mixin ist eine wortgleiche Verschiebung der Regeln, deshalb
  brauchte kein Theme eine eigene Korrekturrunde — desy (`inline-flex`, `border-radius: 60rem`),
  kern (`min-height`, `border`) und ecl-ec (Spezifitaet 0-3-0 bei `&__smart-button.kol-button`)
  kamen unveraendert mit.
- **Diagnose-Weg ohne Docker**: Kein Docker-Daemon und kein Firefox im Container, also
  A/B statt Baseline-Vergleich — im `visual-tests`-Playwright-Config temporaer ein
  `chromium`-Projekt mit `launchOptions.executablePath: '/opt/pw-browsers/chromium'` ergaenzen,
  `--update-snapshots=all --project=chromium --grep=badge` bzw. `--grep=version` einmal auf dem
  alten und einmal auf dem neuen Stand laufen lassen und die PNGs mit `cmp` vergleichen. Zusaetzlich
  die kompilierten Sheets beider Staende diffen (`dist/collection/components/badge/style.css` und
  die `KOL-BADGE`/`KOL-VERSION`-Strings aus `packages/themes/*/dist/index.mjs`).
- **Fallstrick**: Ein einzelnes Nicht-ASCII-Zeichen im neuen Mixin-Kommentar laesst Sass ein
  fuehrendes `@charset "UTF-8";` emittieren — das aendert jedes kompilierte Theme-Sheet, obwohl
  keine Regel anders ist. Kommentare in geteilten SCSS-Partials ASCII halten.
- **Ausserdem**: `packages/adapters/hydrate` haelt einen SSR-Snapshot pro Komponente
  (`test/__snapshots__/components.spec.js.mocha-snapshot`); nach einem DOM-Umbau mit
  `pnpm --filter @public-ui/hydrate test:update:unit` nachziehen, sonst ist `build-and-check` rot.
- **Evidenz**: 36 PNGs (badge + version, alle sechs Pakete) byte-identisch zwischen altem und
  neuem Stand; Components 964/964, Hydrate-SSR 102/102, badge-e2e 5/5;
  `KOL-BADGE`-CSS je Theme regelgleich, `KOL-VERSION`-CSS je Theme regelgleich zum Badge-Sheet.

### 2026-09-21 — Skeleton-Migration kol-dialog/kol-modal (CardFC statt kol-card-wc): 14 Changed Images, Ursache war eine flakige Sample-Route

- **Ausgangslage**: `kol-dialog`, `kol-modal` und `kol-dialog-wc` auf Skeleton umgebaut. Zwei
  ungestylte Custom Elements fallen dabei aus dem DOM: `kol-dialog-wc` im Shadow-Root von
  `kol-dialog`/`kol-modal` und `kol-card-wc` in der Card-Variante (jetzt `CardFC`).
- **Vorpruefung (hielt)**: weder `kol-card-wc` noch `kol-dialog-wc` tauchen als Selektor auf
  (`grep -rn "kol-card-wc\|kol-dialog-wc" packages/themes/*/src packages/components/src
--include='*.scss'` = 0 Treffer), und die Card-Styles kommen ueber `@shared/_card.mixin.scss`,
  das das `kol-dialog`-Mixin bereits einbindet — Erfahrung #30 trifft also NICHT zu, weil der
  Konsument die Basis- und Theme-Styles des Kindes selbst mitbringt. Genau diese Pruefung
  unterscheidet den Fall von der Version/Badge-Runde.
- **Der eigentliche Befund**: Die Visual Review meldete trotzdem **14 Changed Images** — exakt
  `dialog/basic?show-dialog=true` und `modal/basic?show-dialog=true` in allen 7 Paketen, alles
  andere 407/409 unveraendert. Ursache war NICHT die Migration, sondern die Sample-Route: der
  `DialogBasic`-Effekt rief `blankRef.current?.openModal()` und `cardRef.current?.openModal()`
  ohne `await`. Beide Methoden sind asynchron, also entschied die Ladereihenfolge der beiden
  Lazy-Komponenten, welcher Dialog zuletzt in den Top Layer geht und damit sichtbar ist.
  Messung ueber ein `addInitScript`, das `HTMLDialogElement.prototype.showModal` protokolliert:
  6 Laeufe -> 3x blank/card, 3x card/blank. Ein Muenzwurf. Fix im Sample: beide Aufrufe
  sequenziell awaiten; danach 6/6 in derselben Reihenfolge.
- **Lehre (teuer bezahlt)**: Ein gruener lokaler Lauf beweist bei einer nichtdeterministischen
  Route gar nichts — er zeigt nur, welche Seite der Muenze gefallen ist. Lokal waren
  Base- und Branch-Baseline sogar bit-identisch, waehrend die CI 14 Diffs meldete. Wenn eine
  Route zwischen zwei plausiblen Bildern springt, zuerst die Determiniertheit messen
  (Reihenfolge/Timing protokollieren), dann ueber Pixel reden.
- **Und die teuerste Fehlannahme dieser Session**: `docker info` schlug fehl, woraufhin die
  ganze Abnahme auf einen selbstgebauten Chromium-A/B-Lauf umgestellt wurde — der die echte
  Regression nicht sah. Docker war die ganze Zeit installiert, nur der Daemon lief nicht
  (siehe Abschnitt 0 und Erfahrung #31).
- **Theme-Spezifika**: keine. Die Diff-Groesse pro Theme (unstyled 5203 px bis ecl 39009 px)
  skaliert mit der Card-Optik des Themes — ein Hinweis darauf, dass der Unterschied die
  Card-Variante betrifft, nicht den Wrapper-Wegfall.
- **Evidenz**: Visual Review PR #10959 vor dem Fix: `14 changed – 0 of 14 approved`
  (`curl https://public-ui.github.io/kolibri/visual/pr-10959/report.json`); danach der lokale
  Docker-Lauf je Paket, siehe PR-Text.

### 2026-09-21 — Skeleton-Migration kol-split-button (PR zu #9598): alle 6 Pakete, 0 Diffs ab Start

- **Ausgangslage**: `kol-split-button` sollte auf die Skeleton-Architektur und dabei den
  transitionalen `kol-popover-button-wc` gegen `PopoverButtonFC` tauschen. Der Wrapper lag als
  Flex-Item in `.kol-split-button__root` und trug die Consumer-Klasse
  `.kol-split-button__secondary-button`.
- **Ursachen & Fix-Muster**: keine Theme-Runde noetig — der Ausbau wurde als **Wrapper-Tausch statt
  Klassen-Merge** gefahren. Vor dem Schreiben des FC gegreppt: jede Theme-Regel auf
  `&__secondary-button` ist ein Descendant-Selektor (`.kol-span`, `.kol-button`,
  `.kol-button__text`; bwst/default zusaetzlich `height: 100%` direkt auf der Klasse). Haette
  `BemRootNodeFC` die Klasse auf `.kol-popover-button` gemerged, waeren alle eine Stufe zu tief
  gelandet (Muster 6a-8). Stattdessen rendert der FC ein `<div class="kol-split-button__secondary-button">`
  genau dort, wo das Custom Element stand, und `PopoverButtonFC` darin — Box-Baum identisch, weil
  ein unbekanntes Element und ein `div` als Flex-Item beide blockifiziert werden. Dasselbe Muster
  hatte die Vorgaenger-Session schon fuer die primaere Haelfte benutzt.
- **Neu gelernt (Frueher-gewusst-Test bestanden)**: Ein `shadow:false`-Element, das unter SSR
  mitten in `componentWillLoad` abbricht (`attachInternals` auf unbefuelltem `@Element()`, von
  Stencil geschluckt), rendert dort **andere** Klassen als im Browser — hier fehlte
  `kol-button--normal` am Dropdown-Button, weil der Abbruch vor `watchVariant` passierte. Wer den
  Hydrate-SSR-Snapshot als Soll-DOM liest, jagt ein Phantom: Der Pixel-Gate misst CSR. Also beim
  Ausbau eines `-wc`-Tags immer pruefen, ob der SSR-Snapshot den Abbruch zeigt (Props hinter dem
  ersten `associatedController`-Zugriff fehlen), bevor eine SSR-Differenz als Regression gewertet
  wird.
- **Theme-Spezifika**: keine.
- **Evidenz (ohne Docker)**: `docker info` nicht verfuegbar → A/B-Rezept vom 2026-09-21 (temporaeres
  `chromium`-Projekt mit `executablePath: '/opt/pw-browsers/chromium'`,
  `--grep plit --update-snapshots=all` je Paket, einmal auf HEAD und einmal auf HEAD~1, dazwischen
  `pnpm --filter @public-ui/visual-tests build:deps`). 12/12 PNGs byte-identisch
  (`split-button/basic` + `scenarios/focus-elements?component=splitButton` fuer unstyled, default,
  bwst, desy, kern, ecl-ec). Components 992/992, Hydrate-SSR 102/102,
  `pnpm check:skeleton-selectors` sauber.
- **Abnahme-Evidenz (CI, maßgeblich)**: PR #10958, Visual-Review-Bot „No visual changes", je
  409 unchanged / 0 changed fuer alle sieben Pakete, Baseline `e659945cf8` (develop), Commit
  `73dc4859bd`; `visual-tests (<paket>)`, `build-and-check` und `e2e-tests` gruen. Der lokale
  chromium-A/B hat das Ergebnis vorweggenommen — er ersetzt den firefox-Lauf der CI aber nicht,
  sondern verkuerzt nur die Schleife bis dorthin.
- **Falle beim A/B-Lauf**: Der `--grep`-Passthrough darf keine Alternation enthalten (`|` wird als
  Shell-Pipe interpretiert, siehe Log 2026-09-09). Ein gemeinsames Teilwort nehmen — hier `plit`,
  das `split-button/basic` und `…component=splitButton` zugleich trifft.

### 2026-09-21 — Collapsible auf natives `<details>`/`<summary>`: Themes bwst + desy (2 Rejects → 0)

- **Ausgangslage**: Visual Review von PR #10949 hatte 4 Snapshots freigegeben und 2 abgelehnt —
  `theme-bwst/details-basic--basic` (502 → 466px) und
  `theme-desy/scenarios-focus-elements-component-details` (93 → 77px, Fokus-Ring weg).
- **Ursachen & Fix-Muster** (beide neu, komponenten-agnostisch — siehe die drei Ergänzungen unten):
  1. **Die min-height des ersetzten Elements steckte in einer anderen Box** (Variante von Muster 4):
     Auf develop trug das äußere `.collapsible__heading` Padding und Border, der innere Button die
     `--a11y-min-size`; beim `<summary>` fallen beide in EINE border-box, und die min-height
     schluckt Padding und Border, statt sie zu addieren. Fix: den Floor als `calc()` aus
     a11y-min-size, Padding und Border neu rechnen — dasselbe Rezept, das der accordion-Fix
     `45e7138f67` schon nutzte.
  2. **Ein geschlossenes natives `<details>` nimmt den gesamten Content-Teilbaum aus dem Layout** —
     samt der dekorierten Box des Wrappers. bwst zeichnete dort `padding-block` + `border-bottom`
     (9px unter jeder eingeklappten Zeile). Theme-lokal auf dem Block rekonstruiert
     (`&:not(.kol-details--open) { padding-bottom; border-bottom }`).
  3. **Derselbe Wegfall kostet auch die Baseline** (neu, Diagnose dauerte am längsten): Der Host ist
     `inline-block`, die umgebende Line-Box wird also aus seiner Baseline bemessen. Der alte,
     geschlossene Wrapper hatte Höhe 0, legte aber weiterhin eine Line-Box an, die überlief und die
     äußere Line-Box 16px tiefer zog. Nativ geschlossen gibt es keinen Inhalt → Baseline fällt auf
     die Unterkante → 16px fehlen. Ein `::after` im Zustand `:not(--open)` mit `display: block`,
     `height: 0` und einem Zero-Width-Space als `content` stellt sie exakt wieder her
     (probe-verifiziert: 60.50px Line-Box wie develop).
     Trifft nur Themes, deren Block ein Block-Container ist — bwst setzt `display: grid` und nimmt
     die Baseline vom ersten Item, deshalb war dort nichts zu tun.
  4. **Tote Fokus-Regeln werden beim Umzug lebendig und verdrängen den UA-Ring** (Muster 2 in der
     Umkehrung): desys `kol-link`-Mixin war mit dem Klassennamen des nicht fokussierbaren
     `kol-button-wc`-Hosts inkludiert — `outline: none`, Fokus-Farbe und Label-Underline liefen alle
     ins Leere, sichtbar war der UA-Ring des echten `<button>`. `<summary>` matcht alle drei: Ring
     weg, Farbe und Underline neu. Zero-Delta = alle drei zurückdrehen (`outline: revert`, Ruhefarbe,
     `text-decoration: none`).
- **Theme-Spezifika**: desys Mixin-Include steht INNERHALB des Blocks, seine Regeln tragen deshalb
  eine `.kol-details`-Ahnenstufe. Ein Override, der als `&__heading { &:focus }` geschrieben wird,
  landet bei `.kol-details__heading:focus` (eine Klasse weniger) und verliert still — der Ring aus
  `outline: revert` griff trotzdem, weil `revert` über den Kaskaden-Ursprung wirkt, nicht über die
  Spezifität. Genau diese Mischung (ein Teil des Fix-Blocks wirkt, der andere nicht) ist das
  Erkennungszeichen; `#{$root} &` stellt die Stufe wieder her.
- **Fix-Commit(s)**: `26b53f2b9e`.
- **Evidenz**: `node scripts/snapshots-docker.mjs desy --check` → 295 passed, 0 failed, Exit 0;
  `bwst --check` → 294 passed, 1 failed (`scenarios/focus-elements?component=details`, vom Owner
  freigegeben; der Größenunterschied ist durch Fix 1 weg, die Freigabe ist zu erneuern). Baseline-
  Selbstcheck auf `origin/develop` (Worktree `kolibri-baseline`, Volume `kolibri-vt-develop`):
  desy `--grep focus-elements` 60/60 passed — die Baselines sind reproduzierbar.

### 2026-09-22 — Skeleton-Migration kol-form (PR #10962): alle 7 Pakete, 0 Diffs ab Start

- **Ausgangslage**: `kol-form` war Legacy (`shadow.tsx`, `@State() state`-Bag) und rendert seine
  Fehlerlisten-Eintraege ueber den transitionalen `kol-link-wc`. Zusaetzliche Falle: der Block
  `kol-form` liegt auf dem `<form>`, die Fehlerliste ist dessen **Geschwister** — `.kol-form__alert`
  und `.kol-form__link` sind BEM-Elemente ausserhalb ihres Blocks.
- **Neu gelernt (Frueher-gewusst-Test bestanden)**: **Ist-DOM vor dem Umbau als Jest-Snapshot
  einfrieren — und dabei das Wrapper-WC mitregistrieren.** `executeSnapshotTests(tag, [KolForm], …)`
  laesst `<kol-link-wc>` unexpandiert; erst `[KolForm, KolLinkWc]` zeigt den echten Ziel-DOM. Danach
  ist der Vergleich nach dem Umbau ein exakter Diff statt einer Schaetzung: hier blieben genau zwei
  Zeilen uebrig (Wrapper-Tag und der Expert-`<slot>`), alles andere byte-gleich. Das ersetzt das
  Pixel-Gate nicht, entscheidet aber vorab, ob ueberhaupt eine Theme-Runde droht.
- **Ursachen & Fix-Muster**: keine Theme-Runde noetig, wieder ueber **Wrapper-Tausch statt
  Klassen-Merge** (wie kol-split-button). `.kol-form__link { display: inline-block }` (bwst,
  default, ecl-ec, ecl-eu) haette nach einem Merge auf der Block-Wurzel `.kol-link` deren
  `display: inline-flex` ueberschrieben — der Theme-Layer gewinnt gegen `kol-component`. Der FC
  rendert stattdessen ein `<span class="kol-form__link">` genau dort, wo das Custom Element stand.
  **Merke**: beim Klassen-Merge zaehlt nicht nur die verlorene Descendant-Stufe (Muster 6a-8),
  sondern auch, ob die Consumer-Regel jetzt gegen eine Block-Regel desselben Elements antritt und
  sie per Layer-Reihenfolge gewinnt.
- **Kein Wurzel-Wrapper**: Ein gemeinsamer `BemRootNodeFC` haette ein Wurzel-`<div>` eingezogen und
  `.kol-form { width: 100% }` (ecl) von der Form weggeschoben. Loesung: zwei einwurzelige FCs
  (`FormFC` auf dem `<form>` wie `BreadcrumbFC` auf seinem `<nav>`, `FormErrorListFC` daneben).
- **Theme-Spezifika**: keine.
- **Abnahme-Evidenz (CI, massgeblich)**: PR #10962, Visual-Review-Bot „No visual changes", je
  409 unchanged / 0 changed fuer alle sieben Pakete, Baseline `b08fab9f7c` (develop), Commit
  `0ec6873ec1`. Lokal ohne Docker: Components 998/998, Hydrate-SSR 102/102 (unveraendert),
  `pnpm check:skeleton-selectors` sauber.

### 2026-09-23 — Skeleton-Migration kol-tree + kol-tree-item (zwei `-wc`-Wrapper und `kol-link-wc` abgelöst): alle 6 Pakete, 0 Diffs ab Start

- **Ausgangslage**: `kol-tree`/`kol-tree-item` waren Shadow-Hüllen um die `shadow:false`-Elemente
  `kol-tree-wc`/`kol-tree-item-wc`; jeder Eintrag renderte seinen Link über `kol-link-wc` mit dem
  Label im relocierten Expert-Slot. Drei Wrapper fallen weg, `LinkFC` rendert direkt.
- **Ursachen & Fix-Muster**: keine Theme-Runde nötig. Wieder **Wrapper-Tausch statt Klassen-Merge**
  (wie kol-form, kol-split-button): jedes Theme greift `.kol-tree-item__link .kol-link` als
  Descendant und gibt dem Wrapper eine eigene Box (`display: block`, Border, Hover-Hintergrund) —
  `kol-link-wc` wurde deshalb zu `<span class="kol-tree-item__link">` (unbekanntes Element und `span`
  sind beide inline, ohne UA-Stile). Die beiden äußeren Wrapper waren inline ohne eigene Regeln und
  fallen ersatzlos.
- **Neu gelernt (Früher-gewusst-Test bestanden)**: Den Ist-DOM gegen den **Hydrate-SSR-Snapshot**
  lesen, nicht gegen den Jest-Snapshot — der Jest-Mock relociert keine Slots von
  `shadow:false`-Elementen und zeigt den Expert-Inhalt als Geschwister vor dem Link statt darin
  (siehe migrate-to-skeleton, Fallstrick 14). Mit dem SSR-Stand als Soll war der neue DOM bis auf die
  Wrapper byte-gleich, und das Pixel-Gate bestätigte es ohne eine einzige Iteration.
- **Theme-Spezifika**: keine.
- **Fix-Commit(s)**: `ebacfe90` (Migration, keine Fixes nötig).
- **Evidenz**: Baselines per Base-Worktree `46c2d093` (develop) erzeugt (je 414 PNGs), dann
  `node scripts/snapshots-docker.mjs --all --check` (1 Worker) → bwst, default, desy, ecl, kern,
  unstyled je 297 passed, 0 failed, Exit 0. Branch-Stand im Volume verifiziert (`kol-tree-item-wc`
  0× im gebauten `dist`, Branch-only-Modul `open-items-cache` in `kol-tree.js`, `dist` während des
  Laufs gebaut). Components 1024/1024, Hydrate-SSR 102/102, Tree-e2e 11/11 (neue Interaktionstests
  auch gegen den Vorgänger grün), `pnpm check:skeleton-selectors` sauber.

### [Datum] — [Aufgabe/Strukturumbau]: Theme [name]

- **Ausgangslage**:
- **Ursachen & Fix-Muster**:
- **Theme-Spezifika**:
- **Fix-Commit(s)**:
- **Evidenz**:
