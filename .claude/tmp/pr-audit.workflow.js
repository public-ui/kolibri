const common = (base, nr) => `
ALLGEMEINE REGELN (für alle Spalten):
- Repo: /Users/moppitz/Workspace/kolibri (pnpm/Nx-Monorepo, Stencil Web Components "KoliBri"). Lies bei Konventionsfragen /Users/moppitz/Workspace/kolibri/AGENTS.md und für Label-Kategorien /Users/moppitz/Workspace/kolibri/.github/release.yml.
- STRICT READ-ONLY: Keine Dateiänderungen, kein git checkout/commit/push, kein pnpm (kein Build/Test/Install), keine schreibenden gh-Kommandos (kein Kommentar, keine Labels, kein Edit). Erlaubt: gh pr view / gh api (GET) / gh issue view-list-search, git diff/log/show, Dateien lesen, grep. Die Refs origin/develop, origin/release/4 und pr-${nr} sind lokal gefetcht. Checke den PR-Branch NICHT aus; nutze git show pr-${nr}:<pfad> zum Lesen von PR-Dateiversionen.
- Diff-Grundlage: git diff ${base}...pr-${nr} (three-dot).
- Werte je Spalte: warn = muss geändert werden; hint = sollte geändert werden, blockiert nicht; ready = kein Befund. Jeder warn/hint braucht Datei, Zeile und ein konkretes Fehlerszenario. Was sich nicht konkret belegen lässt, entfällt.
- Gesamtstatus: alle drei Spalten ready = gruen; mindestens ein hint ohne warn = gelb; mindestens ein warn = rot.
- Spalte "Sicher": Jede hinzugefügte Zeile des Diffs lesen (auch Tests, Snapshots, Konfiguration). Führe zusätzlich aus und bewerte JEDEN Treffer (harmloser Zweck nennen heißt nicht ready pflichtig; Zweck dokumentieren):
  git diff ${base}...pr-${nr} | grep '^+' | grep -v '^+++' | grep -niE 'fetch\\(|XMLHttp|WebSocket|eval\\(|new Function|child_process|require\\(|import\\(|process\\.env|fs\\.|https?://|atob|fromCharCode|innerHTML|document\\.cookie|localStorage|postinstall|exec\\(|spawn|<script|javascript:'
  git diff ${base}...pr-${nr} | grep -P '^\\+.*[^\\x00-\\x7F]'
  git diff ${base}...pr-${nr} -- '*.snap' | grep -cF '\${'   (neue .snap-Zeilen mit Template-Interpolation)
  Ungewöhnliche Unicode-/Bidirektional-Zeichen im Code = warn (Umlaute in deutschen Texten sind normal). Aenderungen an package.json, Lockfiles, .github/, scripts/ oder Build-/Testkonfiguration ohne Issue-Bezug = warn. CSS-in-.snap oder Code außerhalb von Markup in .snap-Dateien = warn. XSS über innerHTML oder geschwächte Eingabeprüfung mit realem Risiko = warn.
- Spalte "Sauber & ordentlich" typische Werte: fehlender (vom Issue verlangter) Test = hint; Test prüft weniger als sein Name sagt = hint; Doku widerspricht neuem Code = hint; überflüssiger/redundanter Code = hint; PR-Beschreibung passt nicht zum Diff = hint; Release-Label fehlt/falsch = hint; Theming-Vertrag verletzt (neue/geänderte DOM-Elemente oder BEM-Klassen ohne Theme-Anpassung und ohne Klassenliste in der PR-Beschreibung) = warn; AGENTS-Verstoß mit Wirkung (overflow:hidden, Farbschema im Basis-Styling, !important, Deprecation ohne Migration) = warn; AGENTS-Verstoß ohne Wirkung (Reihenfolge von Listen/Imports/Union-Literalen, Member-Reihenfolge, Kommentar mit Historie) = hint.
- Label-Logik: Hauptlabel nach der wichtigsten Änderung des Diffs: release:breaking-change (inkompatible öffentliche API), release:feature (neue Funktion/Sample), release:fix (behebt Fehlverhalten), release:improvement (Verbesserung ohne Fehler), release:engineering (keine Nutzerwirkung: Refactoring/Tests/CI/Tooling), release:doc. Zusatzlabels: release:sample (packages/samples geändert), release:theming (neue/geänderte DOM-Elemente oder BEM-Klassen). release:ignore nie empfehlen, nie entfernen.
- OOS-Kandidat = Änderung IM Diff, die das Issue nicht verlangt. FU-Kandidat = nicht im Diff, sollte aber erledigt werden; Bezug entweder "Issue" (vervollständigt das verlinkte Issue) oder "neu" (eigenes Thema, z. B. derselbe Fehler an anderer Stelle). Im Zweifel Bezug: neu.

ANTWORT auf Deutsch, GENAU diese Struktur (Markdown):
## Kurzbeschreibung
<1 Satz: was der PR leistet, ob das Issue gelöst ist>
## Minimalistisch und korrekt zum Issue: <warn|hint|ready>
- <Befunde mit Datei:Zeile + Szenario; bei ready kurz belegen, warum>
## Sauber und ordentlich: <warn|hint|ready>
- ...
## Sicher: <warn|hint|ready>
- <Scan-Treffer mit Bewertung, sonst keine Auffaelligkeiten>
## OOS-Kandidaten
<Zeilenliste "OOS-x: <Änderung> — <harmlos/riskant + Grund>" oder "keine">
## FU-Kandidaten
<Zeilenliste "FU-x: <Thema> — Bezug: Issue/neu — <hint/warn>" oder "keine">
## Label
Gesetzt: <...> | Empfohlen: <...> | Begründung: <...>
## Kontext
<CI, Visual Review, Konflikte, Maintainer-Reviews, falls im Auftrag genannt: kurz bestätigen/ergänzen>
## Nicht geprüft
- <z. B. Tests nicht ausgeführt (verboten), PNG-Inhalte nur stichprobenartig>
`;

const tasks = [
	{
		key: 'pr-11307',
		task:
			`AUDIT des externen PR #11307 "test(link): verify _hideLabel without label omits aria-label" von AdamMagued. Status: Ready (kein Draft), Base: release/4, Label: release:engineering, CI läuft noch (9 in progress, 8 success), keine Konflikte. Diff: 2 Dateien (packages/components/src/components/link/test/snapshot.spec.tsx +30; packages/components/src/components/link/test/__snapshots__/snapshot.spec.tsx.snap +57).

Zweck laut PR: Löst #11234 ("kol-link: Test für _hide-label ohne Label fehlt"). Lies das Issue komplett: gh issue view 11234 --repo public-ui/kolibri --json title,state,body,comments. Akzeptanzkriterien: (1) Test prüft, dass kol-link mit _hideLabel ohne Label kein aria-label rendert; (2) Test schlägt fehl, wenn die Bedingung in packages/components/src/internal/functional-components/link/component.tsx auf typeof label === 'string' zurückgesetzt wird. Kontext: Nachbesserung (FU-1) zum Review von #11083, Ursprung #10718 ("pin it with a test").

Prüfe konkret:
- Deckt der Test beide Fälle ab (gar kein _label; _label nur Leerzeichen) und prüft er explizit das Fehlen von aria-label (hasAttribute('aria-label') === false oder assertion im Snapshot)?
- Kriterium 2 ist der Kern: Lies den neuen Spec komplett und die Testinfrastruktur (wie rendern andere Component-Specs, z. B. ein vergleichbarer Spec unter packages/components/src/components/*/test/). Prüft der Test den konkreten DOM (find('a')/getAttribute) oder nur Snapshot-Gleichheit? Ein reiner Snapshot, der nur aktuell gespeicherte Struktur pinit, würde Kriterium 2 erfüllen, solange die .snap den fehlenden aria-label-Wert festhält – prüfe die 57 neuen .snap-Zeilen genau: Ist dort der <a> ohne aria-label-Attribut festgehalten? Wäre bei zurückgesetzter Guard die Snapshot-Datei anders (aria-label="") und der Test damit rot?
- Ist der Diff minimal und frei von Nebensächlichkeiten (Formatierung, Reihenfolge)? AGENTS-Regeln: Imports/Listen alphabetisch, Member-Reihenfolge, Kommentare ohne Historie.
- Label: release:engineering (nur Tests) korrekt?

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/release/4', 11307),
	},
	{
		key: 'pr-11300',
		task:
			`AUDIT des externen PR #11300 "test(tooltip): add regression tests for Escape keydown listener lifecycle" von AdamMagued. Status: Ready (kein Draft), Base: release/4, Label: release:engineering, CI läuft noch (9 in progress, 8 success), keine Konflikte. Diff: 1 neue Datei packages/components/src/internal/functional-components/tooltip/behavior.spec.ts (+207).

Zweck laut PR: Löst #11239 ("TooltipBehavior: Regressionstest für das An- und Abmelden des Escape-Listeners"). Lies das Issue komplett: gh issue view 11239 --repo public-ui/kolibri --json title,state,body,comments. Akzeptanzkriterien: (1) Test deckt An-/Abmelden in hideTooltip() UND destroy() ab; (2) Test schlägt fehl, wenn eine der Stellen wieder einen anderen Event-Typ (z. B. keyup zum Abmelden) verwendet. Kontext: optionale Nachbesserung (FU-4) zum Review von #11062, Ursprungsfehler #11033.

Prüfe konkret:
- Lies den neuen Spec komplett UND die getestete Datei packages/components/src/internal/functional-components/tooltip/behavior.ts.
- Beobachtet der Test addEventListener/removeEventListener am document (jest.spyOn) und prüft er denselben Event-Typ UND dieselbe Handler-Referenz für hideTooltip() und destroy()? Genau verifizieren: Würde der Test rot, wenn showTooltip 'keydown' anmeldet, hideTooltip/destroy aber z. B. 'keyup' abmelden? Oder matching zu großzügig (expect(...).toHaveBeenCalled ohne Argument-Check, any-Handler)? Das ist der Kern des Issues.
- Deckt der Test zusätzlich ab: Anmelden durch echte Events (mouseover/focusin), Abmelden nach Debounce (mouseout/focusout) – mit fake timers sauber kontrolliert? Escape-Verhalten (preventDefault/stopPropagation nur solange sichtbar; danach Durchlass)? Fehlt etwas Wesentliches -> hint (Bezug: Issue).
- Testet der Test am echten TooltipBehavior-Objekt oder mockt er so viel, dass die Absicherung wertlos wird?
- Konventionen: Vergleichbare Specs im Repo (z. B. packages/components/src/internal/functional-components/span/snapshot.test.tsx): Dateiname/-ort plausible? Imports alphabetisch? Testnamen sagen, was geprüft wird?
- Label: release:engineering (nur Tests) korrekt?

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/release/4', 11300),
	},
	{
		key: 'pr-11297',
		task:
			`AUDIT des externen PR #11297 "fix: css entsprechend angepasst, sodass der Tooltip mit einem Sternchen versehen wird" von ItzGerSte. Status: Ready (kein Draft), Base: release/4, Label: release:ignore, CI grün (20 success), keine Konflikte. Diff: 1 Datei packages/components/src/components/@shared/_field-control.mixin.scss (+2 -2) – eine geteilte Basis-Styling-Datei für ALLE Formularfelder.

WICHTIG: Der PR hat KEIN verlinktes Issue und eine leere Beschreibung. Suche nach einem passenden Issue (gh issue list --repo public-ui/kolibri --state all --search "Sternchen" / "tooltip required" / "Pflichtkennzeichnung" / "required marker" und Variationen).

Bekannter Kontext: Maintainer deleonio hat CHANGES_REQUESTED: "die Sternchen sollen ja nicht weg, sondern sie fehlen im Tooltip" – das eigentliche Problem ist, dass das Pflichtfeld-Sternchen im TOOLTIP-Text fehlt; der PR macht offenbar etwas anderes. Der Autor kommentierte: das ::after am span__label des Tooltips taucht erst auf, wenn der Tooltip angezeigt wird (kol-tooltip__floating show). Visual Review: 0 visuelle Änderungen über alle 7 Snapshot-Pakete, aber 1 Screenshot von laske185 rejected (test-tag-name-transformer/input-checkbox-basic-noColumns--left-error).

Prüfe konkret:
- Diff genau lesen und in den Kontext der Datei einordnen (30 Zeilen davor/danach lesen). Welcher Selektor/Inhalt wurde geändert? Welche Komponenten nutzen diesen Mixin (grep nach dem Mixin-Namen in packages/components/src)?
- Wo ist der required-Marker (Sternchen) definiert (grep nach required, ::after, content in packages/components/src und packages/themes)? Wirkt die Änderung im Basis-Layer? AGENTS.md: Basis-Layer keine Farbschemata, keine margins/paddings; der required-Marker betrifft alle Formularfelder und alle Themes.
- Kernfrage Spalte 1: Löst der PR das Problem aus dem Maintainer-Review (Sternchen fehlen IM Tooltip)? Wenn er stattdessen den Marker an anderer Stelle verändert/entfernt und das eigentliche Problem ungelöst bleibt -> warn (nicht korrekt gelöst), mit Wirkkette im Code belegen (Selektoren, wann ::after sichtbar ist, warum der Visual Review 0 Deltas zeigt).
- Kein verlinktes Issue -> ohne gefundenes Issue ist Spalte 1 warn (es gibt kein Issue, an dem "korrekt" messbar wäre); mit gefundenem Issue: daran messen.
- AGENTS-Regeln: !important, overflow:hidden, Farb-/Layoutregeln im Basis-Layer, Theming-Vertrag (DOM/BEM-Klassen).
- Label: release:ignore ist gesetzt. Regel: release:ignore nie empfehlen, nie setzen, nie entfernen – empfiehl KEINE Änderung; weise im Kontext darauf hin, dass ein gemergter, nutzbarer Fix damit aus den Release Notes fiele und die Maintainer das entscheiden müssen.

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/release/4', 11297),
	},
	{
		key: 'pr-11279',
		task:
			`AUDIT des externen PR #11279 "input file näher an browser component" von ItzGerSte. Status: DRAFT, Base: release/4, Label: release:engineering, CI ROT (build-and-check FAILURE, e2e-tests FAILURE, visual-tests in allen Themes FAILURE; laut Visual-Review-Kommentar zusätzlich axe-Verstoß "label" auf input-file/basic?noColumns; 15-16 Screenshots je Theme geändert, 0 approved). Keine Konflikte. Diff: 2 Dateien (packages/components/src/components/input-file/component.tsx +1 -149; packages/themes/default/src/components/input-file.scss +9 -36).

Der PR hat KEIN verlinktes Issue und eine leere Beschreibung. Suche nach einem passenden Issue (gh issue list --repo public-ui/kolibri --state all --search "input-file" / "input file" / "file input native" und Variationen). Auch die Commit-Messages lesen: git log origin/release/4..pr-11279 --oneline und mit Patches (git log -p).

Prüfe konkret:
- Kompletten Diff lesen und die PR-Version der Komponente (git show pr-11279:packages/components/src/components/input-file/component.tsx). Was löschen die 149 Zeilen (vermutlich eigenes Label-/Button-/Hidden-Input-Wiring zugunsten des nativen Browser-Datei-Inputs)?
- Öffentliche API: Entfallen Props/Slots/Events/Methoden oder deren Verhalten? Nach AGENTS.md ist die öffentliche API der Vertrag; eine inkompatible Änderung wäre release:breaking-change und ein schwerer Eingriff. Konkret benennen, was für Nutzer wegfällt (Szenario).
- Axe-Verstoß "label": Welcher entfernte Code war für die zugängliche Beschriftung zuständig? Konkretes Screenreader-Szenario beschreiben (z. B. File-Input ohne zugänglichen Namen).
- Warum läuft build-and-check vermutlich schief? Aus dem Diff ablesen (z. B. entfernte Props/Typen, die Schema/Tests/Adapters referenzieren; grep nach input-file im Repo). Keine Builds ausführen.
- Theming: input-file.scss in theme default (-36/+9): welche Selektoren entfallen/neu? Verletzt der PR den Theming-Vertrag – laufen die input-file-Styles der ÜBRIGEN Themes (packages/themes/bwst, desy, ecl, kern – grep nach input-file dort) ins Leere?
- Spalte 1: ohne verlinktes Issue -> warn (nicht "zum Issue" messbar); mit gefundenem Issue daran messen.
- Sauberheit: PR-Beschreibung fehlt komplett -> hint; AGENTS-Regeln (overflow:hidden, !important, Farbschema, Margin/Padding im Basis-Layer) prüfen, auch in den neuen SCSS-Zeilen.
- Label: release:engineering gesetzt, aber der Diff ändert spürbares Komponentenverhalten -> empfehle das richtige Hauptlabel (vermutlich release:breaking-change oder release:fix/feature, je nach API-Bruch) und begründe.

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/release/4', 11279),
	},
	{
		key: 'pr-11258',
		task:
			`AUDIT des externen PR #11258 "feat: andersprachige labels" von BF150. Status: DRAFT, Base: release/4, Label: release:feature, CI ROT (build-and-check FAILURE, visual-tests FAILURE). Visual Review: 7 Routen nicht vergleichbar, Fehler "duplicate data-visual-block id label-lang-tabs" (neue Route scenarios/label-lang). Kein Maintainer-Review. MERGE-KONFLIKT mit release/4 in packages/components/src/internal/functional-components/form-field/component.tsx. Beschreibung: "closes #10497". Großer Diff: 59 Dateien.

Lies das Issue komplett: gh issue view 10497 --repo public-ui/kolibri --json title,state,body,comments. Vorschlag dort: interface LabelSegment { text: string; lang?: string }; type LabelContent = string | LabelSegment[]; Komponente rendert jedes Segment einzeln, mit lang-Attribut (Beispiel: span lang="en">Acquirer/span>-Gutschrift); Sample mit KolAccordion.

Prüfe konkret (gründlich – das ist der umfangreichste Audit):
- Kern: packages/components/src/schema/props/label.ts (+34 -2), packages/components/src/internal/props/label.ts (+24 -6), label-with-expert-slot.ts, pagination-label.ts, tabs.ts, unique-nav-labels.ts (+10 -7). Wie heißt/existiert der neue Typ, ist er exportiert (öffentliche API), bleibt string gültig (additiv)? Entspricht die Struktur dem Issue-Vorschlag?
- Rendering: packages/components/src/internal/functional-components/span/component.tsx (+32 -9). Mit welchen DOM-Elementen/Klassen werden Segmente gerendert? THEMING-VERTRAG: Neue DOM-Elemente/BEM-Klassen ohne Anpassung der Themes (keine Theme-Dateien im Diff!) und ohne Klassenliste in der PR-Beschreibung = warn. Baue den DOM-Baum eines zweisprachigen Labels vorher (Text) vs. nachher (Segmente) nach.
- A11y: Wie fließen Segmente in aria-label/aria-labelledby/title und in Strings ein (unique-nav-labels, tooltip/behavior.ts +2 -1, pagination/item.ts)? Werden Segmente ohne Trennung konkateniert -> Screenreader-Szenario formulieren. Prüfe label-hints.ts und default-input-props.ts.
- Warum ist build-and-check rot: Suchstellen im Diff, die label als string erwarten (typeof/startsWith/trim/String-Operationen) oder Typ-Probleme; string-props.spec.ts (-8): welche Assertions entfallen und welches Risiko öffnet sich?
- Sample packages/samples/react/src/scenarios/label-lang.tsx (+145): Warum der Fehler "duplicate data-visual-block id label-lang-tabs"? (data-visual-block-IDs werden im Visual-Test-Framework aus Block-Köpfen gebaut – prüfe wie, z. B. in packages/tools/visual-tests.) Konkret sagen, was der Autor ändern muss (z. B. Sample-Inhalte/Überschriften eindeutig machen). Auch routes.ts-Registrierung und packages/tools/visual-tests/tests/sample-app.routes.js prüfen.
- Scope: Die vielen durchgereichten Typ-Änderungen (_skeleton-Specs, avatar, icon, spin, alert, dialog, form-field, heading, link, meter, nav, progress, quote, table-stateless, toolbar, tree-item, version, breadcrumb, click-button): notwendig (Compiler erzwingt Durchreichung) oder eigenständige Verhaltensänderungen? Nur echte Verhaltensänderungen außerhalb des Issues als OOS-Kandidaten melden.
- Konflikt form-field/component.tsx: grob umreißen, warum (gegenüberliegende Änderung an derselben Stelle auf release/4; git log/blame auf der Datei genügt grob).
- Sauberkeit: Imports/Listen alphabetisch, Member-Reihenfolge, Kommentarsystem; Label-Empfehlung prüfen: release:feature gesetzt – zusätzlich release:theming (neue DOM-Elemente) und release:sample (packages/samples geändert)? An .github/release.yml prüfen.

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/release/4', 11258),
	},
	{
		key: 'pr-9850',
		task:
			`AUDIT des externen PR #9850 "Feature/8395 snaps with open dropdowns" von BF150. Status: DRAFT, alt (März 2026, letzte Aktivität ca. April), Base: develop, Label: release:feature, CI des letzten Laufs grün (14 success, 1 skipped) – Stand aber alt. Keine Beschreibung. Maintainer deleonio kommentierte im März einen Verweis auf PR #9880 ("Das könnte gegebenenfalls relevant sein"); 1 Review DISMISSED (leer). MERGE-KONFLIKTE mit develop: packages/themes/default/package.json, packages/tools/visual-tests/tests/sample-app.routes.js, packages/tools/visual-tests/tests/theme-snapshots.spec.js. Diff: 16 Dateien – Combobox-Snapshot-PNGs (themes default/bwst/kern), themes/default/.gitignore +1, themes/default/package.json +1, playwright.config.js 1 Zeile, theme-snapshots.spec.js +20 -9, sample-app.routes.js ~1540 Zeilen.

Der Branchname referenziert Issue #8395 – prüfe: gh issue view 8395 --repo public-ui/kolibri --json title,state,body,comments und gh pr view 9850 --repo public-ui/kolibri --json body (falls der Body doch Inhalt hat). Zusätzlich Dubletten-/Bezugssuche: gh issue list --repo public-ui/kolibri --state all --search "dropdown snapshot" und "combobox".

Prüfe konkret:
- Was will der PR? Vermutung: Visual-Snapshot-Aufnahmen mit GEÖFFNETEM Combobox-Dropdown. Lies die Code-Änderungen: theme-snapshots.spec.js (+20 -9) – welche Logik ändert sich (Dropdown vor Screenshot öffnen, Wartezeiten)? playwright.config.js – welche Zeile, welche Wirkung, flaky-prone?
- themes/default/package.json +1 und .gitignore +1: was genau (neues npm-Script? ignore-Regel)? Konfigurationsänderungen ohne Issue-Bezug = warn in "Sicher"; prüfe, ob ein Bezug zu #8395/Visual-Snapshots besteht und benenne den Zweck.
- sample-app.routes.js (~1540 Zeilen): vermutlich Regeneration. Stichproben und Mustersuche im Diff: nur umsortiert/regeneriert, keine fremden URLs/Skripte? grep im Diff nach http, eval, script, child_process.
- PNGs: stichprobenartig 2-3 Dateien auf echten PNG-Header prüfen, z. B.: git show pr-9850:packages/themes/default/snapshots/theme-default/snapshot-for-combobox-html-firefox-linux.png | file - . Beschreibe kurz, was die Snapshots zeigen sollen.
- Spalte 1: Gibt es ein verlinktes/passendes Issue (#8395)? Ist der PR eine korrekte, minimalische Lösung dafür? PR-Beschreibung fehlt komplett -> hint (fließt in Release-Notes). Veralteter Stand + Konflikte als Befund in der passenden Spalte nennen (Rebase nötig, insbesondere package.json).
- Sauberheit gegen AGENTS.md.
- Label: release:feature gesetzt – Snapshots/Tests/Tooling haben keine Nutzerfunktion -> vermutlich release:engineering; entscheide anhand des Diffs und begründe (release:sample nur bei packages/samples-Änderungen – prüfen).

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/develop', 9850),
	},
	{
		key: 'pr-8960',
		task:
			`AUDIT des externen PR #8960 "feat(sample): presentation views" von laske185. Status: DRAFT, sehr alt (Dezember 2025), Base: develop, Label: release:sample, CI-Ergebnisse alt/unvollständig (3 success, 1 skipped). Kein verlinktes Issue. Verlauf: Maintainer deleonio fragte im März "ist das noch relevant?"; Autor antwortete im April: Es sei ein Beispiel, wie die Präsentation einzelner Komponenten z. B. beim Präsentieren eines Themes aussehen könnte, mit ordentlichem Layout; "Wird so wahrscheinlich nie direkt gemergt aber, dient als Vorlage". MERGE-KONFLIKTE mit develop: packages/samples/react/src/components/accordion/basic.tsx, input-text/basic.tsx, table/routes.ts sowie modify/delete bei ~90 Snapshot-PNGs in packages/test-tag-name-transformer/snapshots/theme-default/ (auf develop gelöscht, im PR geändert). Diff: 100 Dateien – neben den PNGs: App.tsx, SampleDescription.tsx (+17 -15), accordion/basic.tsx (+78 -8), input-text/basic.tsx (+48 -24), table/basic.tsx (+224 neu), table/routes.ts (+2).

Prüfe konkret:
- Die 6 Code-Dateien des Diffs lesen (git diff origin/develop...pr-8960 -- '*.tsx' '*.ts'). Was tun die Änderungen (Präsentations-Layout in Samples)? Wirken sie nur in packages/samples (keine components/themes-Änderungen – verifizieren)?
- App.tsx und SampleDescription.tsx sind das GEMEINSAME Sample-Gerüst: Wirkt die Änderung auf alle Samples/Screenshots (Szenario: verschobene Screenshots, geändertes Layout für alle Routen)? table/basic.tsx +224: echte KolTable-Nutzung oder handgebaut? Auffälligkeiten (hartcodierte Inhalte, a11y, Registrierung in table/routes.ts und routes.ts)?
- Snapshot-PNGs: der Ordner existiert auf develop nicht mehr (kurz verifizieren: git log origin/develop --oneline -3 -- packages/test-tag-name-transformer/snapshots). Das belegt: massiv veraltet. 1-2 PNGs auf echten PNG-Header prüfen (git show pr-8960:<pfad> | file -).
- Spalte 1: kein Issue; Autor selbst: nie direkt zum Mergen gedacht. Ehrlich bewerten: warn mit Begründung "kein Issue, massiv veraltet, Konflikte; Entscheidung der Maintainer nötig (weiterführen oder schließen)" – sachlich, nicht als Autorenfehler framstatten.
- Sicher: git diff origin/develop...pr-8960 -- '*.tsx' '*.ts' | grep '^+' | grep -v '^+++' | grep -niE 'fetch\\(|XMLHttp|eval\\(|new Function|child_process|require\\(|process\\.env|https?://|atob|innerHTML|document\\.cookie|localStorage|<script|javascript:'  und  git diff origin/develop...pr-8960 -- '*.tsx' '*.ts' | grep -P '^\\+.*[^\\x00-\\x7F]'  – jeden Treffer bewerten.
- Sauberkeit gegen AGENTS.md (Samples nach packages/samples/react, Registrierung in routes.ts, Namenskonventionen).
- Label: release:sample – passend? (.github/release.yml prüfen; nur wenn wirklich nur Samples geändert wurden.)

Antworte nach ANTWORT-Struktur (siehe unten).` + common('origin/develop', 8960),
	},
];

const results = await runs.all(tasks.map((t) => ({ key: t.key, agent: 'worker', task: t.task })));
return tasks.map((t, i) => ({ pr: t.key, ok: results[i].ok, report: results[i].output }));
