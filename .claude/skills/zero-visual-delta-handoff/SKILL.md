---
name: zero-visual-delta-handoff
description: Disziplin für visuell unsichtbare Refactorings und Komponenten-Migrationen – null geänderte Snapshot-Bilder gegen den Base-Branch als hartes Akzeptanzkriterium, mit lokaler deterministischer Prüfpipeline, Pixel-/DOM-Analyse und Companion-Plan als Handoff über Sessions. Trigger: "zero visual delta", "visuell unsichtbar", "keine visuellen Änderungen", "Snapshot-Diffs auf null", "Handoff", "Plan für den nächsten Agenten pflegen".
---

# Zero Visual Delta Handoff

Refactorings an UI-Komponenten (Migrationen, DOM-Umbauten, Style-Konsolidierung), die visuell unsichtbar bleiben sollen: Verhalten und DOM dürfen sich ändern, das gerenderte Bild nicht. Der Patch gilt erst als fertig, wenn der lokale Check gegen die Base-Baselines komplett grün ist — und der Zustand ist so dokumentiert, dass jede neue Session nahtlos übernehmen kann.

Bewährt in: kolibri kol-link-Skeleton-Migration (5 Themes, je 294 Szenarien, 127 PNG-Diffs → 0).

## 1. Akzeptanzkriterium als hartes Gate

- **Jede Snapshot-Datei im PR-Diff muss exakt so aussehen wie auf dem Base-Branch. Solange Bilder differieren, ist die Arbeit nicht fertig.**
- „CI grün" ist KEIN Abschlussbeweis: Snapshot-Workflows committen neue Baselines und werden damit selbst grün. Grün + Diff-Anzahl > 0 = offene Arbeit.

## 2. Einrichtung (einmal pro Repo, bevor der erste Fix läuft)

1. **Docker-basierte Prüfpipeline einrichten** — lokale Snapshot-Prüfungen laufen immer in einem Docker-Container, um exakt die gleiche Rendering-Umgebung wie die CI zu gewährleisten (Browser-Version, OS, Font-Rendering). Docker-Compose oder Docker-Run-Skript im Repo bereitstellen, das:
   - Den gleichen Browser verwendet wie CI (z.B. Chromium/Playwright mit fixer Version)
   - Die Snapshots aus dem gemounteten Repo lädt
   - Die Ergebnisse zurück in den Host schreibt
   - Reproduzierbar läuft (`--no-cache` rebuild bei Docker-Änderungen)

   Beispiel:

   ```bash
   docker compose run --rm snapshot-check
   # oder
   docker run --rm -v $(pwd):/work -w /work my-snapshot-image npm run test:visual
   ```

2. **Feature-Branch-Szenario**:
   - Feature-Branch auschecken: `git checkout feature/my-refactor`
   - Baselines auf `origin/develop` stellen: `git checkout origin/develop -- <snapshot-dir>`
   - Docker-Check laufen: vergleicht **aktuellen Feature-Branch-Code** gegen **Develop-Baselines**
   - Ziel: Alle Diffs auf null reduzieren durch CSS-Anpassung im Feature-Branch
   - NIEMALS `--update-snapshots` nutzen — das würde neue Baselines erzeugen und das Kriterium verwischen
3. **Pixel-Werkzeuge bereithalten** (PIL/python genügt):
   - Pixel-Differenzzähler: geänderte Pixel, Bounding-Box, Zeilenbänder mit Farbproben (`exp=(r,g,b) act=(r,g,b)`) — zeigt Verschiebung vs. Fehlen vs. Farbwechsel.
   - Farbraster-Ausdruck (Bild als Buchstabenraster, Zelle 3–8 px): macht auch ohne Bildbetrachtung sichtbar, WO Inhalte stehen.
4. **Soll-App parallel bereithalten**: `git worktree add <dir> origin/<base>` + dieselbe Pipeline dagegen bauen. Damit sind DOM-Proben im Seitenvergleich möglich (Soll vs. Ist unter identischen Bedingungen).
5. **DOM-Probe-Vorlage**: kleines Playwright-Skript, das pro Host den Schatten-Baum läuft und pro Element `getBoundingClientRect()` + `getComputedStyle()` (display, gap, padding, margin, outline, boxShadow, color, font-size, flex-direction) druckt. Selektoren: IMMER vom Host (`host.shadowRoot`) aus laufen — `document.querySelectorAll` durchdringt keine Shadow-Roots, und `querySelector(".a, .b")` liefert bei Skeleton-DOM gern den Wrapper statt des Ankers.

## 3. Iterations-Loop (pro Theme/Scope, ~6 min pro Check-Lauf)

1. Check laufen lassen, Fehlliste nehmen (vor jedem Lauf Ergebnisordner als root aufräumen, sonst EACCES im Reporter).
2. Differenzpixel analysieren (Werkzeug 3): LIEGT etwas falsch (Verschiebung um n px), FEHLT etwas (weiß statt Farbe) oder IST etwas ZU VIEL? Erst diese Frage beantworten, dann CSS anfassen.
3. Hypothese: betroffene Elemente in Ist- und Soll-App proben (Werkzeug 5). **Route-Optionen beachten!** Viele Sample-Routen setzen `viewportSize` (z. B. 600 statt 800) — eine Probe ohne Route-Viewport rendert ein anderes Layout als der Check und führt stundenlang in die Irre.
4. Fix in der richtigen Schicht (Theme-Mixin vs. Consumer-Datei vs. Basis), Fix-Batches nach Ursache bündeln, nicht pro Einzelszenario.
5. Re-Check. Grün → Snapshots auf Base-Stand committen (falls noch nicht) + Quell-Fix committen.

## 4. Fix-Muster-Katalog (Strukturumbau Anker-in-Wrapper u. ä.)

Diese Ursachen deckten >90 % der Diffs — in dieser Reihenfolge prüfen:

1. **Tote Selektoren für anderes DOM**: Ein für Block A geschriebenes Mixin (`__anchor`-scoped) wird auch für Block B inkludiert, dessen Element `__anchor` nie hat (Button-DOM). Fix: Mixin um `$anchor-scoped`-Parameter erweitern; B inkludiert mit `false` (Stile auf dem Träger).
2. **Fokus-Optik am nie fokussierten Wrapper**: `:focus`-Regeln treffen den Wrapper nicht mehr. Fix: `:focus-within`-Varianten am Wrapper (Outline, box-shadow, Variant-Variablen) plus `__anchor:focus { outline: none }` gegen die UA-Outline.
3. **Wrapper füllt die Zeile nicht** (Nav-, Listen-, Breadcrumb-Einträge): Chevron/Pfeil klebt am Label statt am Zeilenende, Text verschiebt sich um ~n px. Fix: `flex: 1 1 auto` auf den Wrapper; Anker füllt dann über Basis-`flex: 1`.
4. **Root-Stile hängen am Wrapper, gehören aber auf den Anker**: Padding (Fokus-Ring-Box!), Farbe (geerbte Icon-/Label-Farbe), Marker-`::before` (erbt Alert- statt Link-Farbe). Fix: auf `__anchor` verschieben und dafür Normalize-Padding des Wrappers nullen — sonst wachsen Zeilenhöhen um die Doppel-Padding.
5. **UA-Unterstreiche des Ankers**: `text-decoration: none` galt vormals dem Anker-Root. Fix: zusätzlich auf `__anchor` setzen.
6. **Sass-`X &`-Verschachtelung**: Innerhalb eines Blocks kompiliert `X &` zu einem Descendant-Selektor (`​.a__anchor .a …`), der nie matcht. NIEMALS dem Kompilat vertrauen — das gebaute CSS greppen (`tr '}' '\n' | grep`), bevor die Wirkung einer Regel vorausgesetzt wird.
7. **Woher kam der Stil in der Basis wirklich?** Erst die Basis-Include-Kette prüfen (welche Datei inkludiert das Mixin in welchem Kontext — im Skeleton laden Consumer-Theme-Dateien die Link-Stile oft nur über ein extra Include), bevor „das hatte die Basis nicht" angenommen wird.

## 5. Fallstricke aus der Praxis

- **Route-ViewportSize bei Proben** (siehe Loop 3) — teuerste Fehldiagnose-Quelle.
- **App-Probe ≠ Check-Kontext**: Wenn App-Proben und Check-Ergebnis widersprechen, eine temporäre `probe.spec.js` direkt in den Tests-Ordner der Prüfpipeline legen und im echten Runner mit `--grep=probe` ausführen — console.log liefert die Zustände im exakten Kontext. Die Datei NACH dem Workspace-Spiegeln schreiben (Sync-Tools löschen Fremddateien) und NIE committen.
- **„Baseline ist stale"-Verdacht**: Vor jedem solchen Urteil den Base-Code selbst gegen die Baselines laufen lassen. Ist der Base-Check grün, sind die Baselines reproduzierbar und der Branch schuldet jede Differenz. Erst wenn der Base-Check selbst rot ist, Baselines-Regenerierung MIT Begründung und Owner-Absprache (siehe Allowlist).
- **Grenzwertige Umbrüche flaken**: Ein Label, das auf dem Base 1 px vor dem Umbruch liegt, bricht nach minimal breiterem Rendering zusätzlich um (Bildhöhe +eine Zeile). Solche Fälle wirken wie Flakes — Ursache ist fast immer Muster 4 (Doppel-Padding). Messen mit Route-Viewport, nicht raten.
- **Shadow-Retargeting**: `document.activeElement` zeigt nur den Host; die Fokus-Kette über `shadowRoot.activeElement` abwärts verfolgen, wenn „fokussiert, aber keine Optik" verwirrt.

## 6. Allowlist — der einzige Ausweg

- Ein Diff ist nur akzeptabel als **beabsichtigte** Änderung: explizit im Companion-Plan gelistet mit Begründung und Freigabe des Repo-Owners. Default: leer.
- Niemals Baseline-Diffs pauschal akzeptieren, um die Zahl zu senken — das Kriterium wird dadurch entwertet, nicht erfüllt.

## 7. Baselines-Philosophie

Baselines werden **nicht regeneriert**, sondern auf den Base-Stand gestellt (Abschnitt 2). Eine Regenerierung erzeugt neue „Wahrheit" und gehört nur in den finalen Merge-Vorlauf — und auch das nur, wenn der Base-Code die existierenden Baselines nachweislich nicht mehr reproduziert (Beweis siehe Fallstricke).

## 8. Companion-Plan als Handoff-Dokument

Ein Plan-Dokument **im Repo** (z. B. `.claude/plans/<branch>.md`), das jede Session aktuell hält. Plan-Commits zusammen mit — oder vor — der Arbeit, die sie beschreiben. Pflichtabschnitte:

- **Goal**: Ziel + Kriterium + Messbefehl + je Theme/Scope eine Statuszeile mit Prüfbefehl.
- **Current state**: Tabelle der Commits mit aussagekräftiger Zusammenfassung, mit Datum.
- **Open work**: priorisiert; Abschnitt 0 ist das Kriterium selbst mit aktuellem Stand.
- **Decision points**: offene Fragen für den Repo-Owner — nie unilateral entscheiden.
- **Pitfalls**: real passiert, konkret (Fix-Muster + Fallstricke aus Abschnitten 4–5 sind der Startpunkt, repo-spezifische Ergänzungen gehören hierher).
- **Validation commands**: die exakten Befehle vor jedem Commit (Lint, Tests, Formatter je betroffenem Paket).

Abgeschlossene Abschnitte als „DONE (Datum)" markieren und stehen lassen — der nächste Agent braucht den Verlauf, nicht nur den Restzustand.

## 9. Checkliste pro Session

- [ ] Zieldiff gemessen und mit Plan-Eintrag abgeglichen
- [ ] Vor jedem Check-Lauf: Ergebnisordner geräumt, Baselines auf Base-Stand
- [ ] Diffs klassifiziert (verschiebt/fehlt/zu viel), Muster-Katalog abgegangen, Fix-Batches nach Ursache
- [ ] Route-Viewport bei allen Proben beachtet; kompiliertes CSS bei Selector-Zweifeln gegriffen
- [ ] Plan aktualisiert (Current state, Open work, Pitfalls), Decision points ergänzt statt entschieden
- [ ] Validation commands vor jedem Commit ausgeführt
- [ ] Erfahrungswerte in diesem Skill (Abschnitt 10) dokumentiert

## 10. Erfahrungswerte (fortlaufend aktualisiert)

### 2025-08-30 — Kolibri kol-link-Skeleton-Migration

- **Szenario**: 5 Themes, je 294 Szenarien, initial 127 PNG-Diffs
- **Lösungsweg**:
  1. Docker-Container mit Playwright/Chromium fixer Version eingerichtet
  2. Baselines vor jedem Lauf auf `origin/develop` gestellt
  3. Pixel-Analyse mit PIL-Skript (Bounding-Box, Farbproben)
  4. Fix-Muster angewandt (siehe Abschnitt 4) — Hauptursachen waren tote Selektoren, Fokus-Optik am Wrapper, Doppel-Padding
  5. Alle Diffs auf null reduziert, keine visuellen Änderungen
- **Erkenntnisse**:
  - Route-ViewportSize ist teuerste Fehlerquelle — immer prüfen
  - `text-decoration: none` muss auf Shadow-Root-Anker zusätzlich gesetzt werden
  - Docker-Check ist identisch mit CI-Ergebnissen — lokale Tests ohne Docker waren irreführend
  - Kompiliertes CSS prüfen statt Sass-Verschachtelung zu vertrauen

### [Datum] — [Projekt/Migration]

- **Szenario**: [Anzahl Themes/Szenarien, initialer Diff-Zähler]
- **Lösungsweg**:
- **Erkenntnisse**:
