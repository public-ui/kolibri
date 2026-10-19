---
name: pr-extern-review
description: Prüft Pull Requests externer Contributor im KoliBri-Repo gegen ihr verlinktes Issue und führt die Folgeschritte aus. Befehle - `audit` (Standard, schreibt nichts) liefert eine Ampel-Tabelle mit Status (Draft, Ready, Gemergt, Geschlossen), Gesamtstatus (grün, gelb, rot) und den Spalten "Minimalistisch & korrekt zum Issue", "Sauber & ordentlich" und "Sicher" (warn, hint, ready), dazu Out-of-Scope-Änderungen, Folgepunkte und Label-Empfehlungen; `comment` schreibt je offenem PR einen Kommentar an den Autor, was im Scope des Issues bis Grün zu tun ist; `tickets` legt Folge-Issues an, die den PR als Ursprung nennen; `consolidate` setzt die Folgepunkte gemergter PRs, die ihr ursprüngliches Issue vervollständigen, in einem Sammel-PR um, der die zugehörigen Tickets schließt; `labels` setzt die empfohlenen `release:*`-Labels. Nutze diesen Skill immer, wenn der Nutzer PRs von Externen, Contributorn oder der Community prüfen, kommentieren, labeln oder daraus Folge-Issues oder einen Sammel-PR machen will – auch bei Formulierungen wie "sind die PRs korrekt und sicher", "review die PRs von <Name>", "gibt es einen neuen Stand bei den PRs", "ist da Schadcode drin", "ist der PR mergebar", "Ampel für die PRs", "fordere den Autor zur Nachbesserung auf", "kommentiere den PR", "leg die Folgetickets an", "setz die Nachbesserungen der gemergten PRs in einem PR um", "korrigier die Release-Labels" oder wenn eine Liste von PR-Links ohne weitere Anweisung kommt.
---

# Externe PRs prüfen

Externe PRs lösen meist ein konkretes Issue, bringen aber oft Änderungen mit, die das Issue nicht
verlangt, oder umgehen Regeln aus `AGENTS.md`. Code von außen ist nicht vertrauenswürdig. Dieser Skill
beantwortet für jeden PR drei Fragen, immer im selben Format:

1. Löst der PR genau sein Issue: vollständig, korrekt und ohne Überflüssiges?
2. Ist der Code sauber und hält er die Konventionen des Repos ein?
3. Ist der Code sicher?

## Befehle

Aufruf: `/pr-extern-review [audit|comment|tickets|consolidate|labels] <PRs> [IDs]`

- **`<PRs>`:** PR-Nummern, PR-Links oder `author:<login>`.
- **`[IDs]`:** nur bei `tickets` und `consolidate`. Wählt einzelne Folgepunkte aus, z. B. `OOS-2 FU-1`.
- Ohne Befehl gilt `audit`. Eine Bitte in normalen Worten wählt den passenden Befehl.

| Befehl        | Ergebnis                                                                               | Schreibt auf GitHub     | Abschnitt |
| ------------- | -------------------------------------------------------------------------------------- | ----------------------- | --------- |
| `audit`       | Ampel-Tabelle, Out-of-Scope-Änderungen, Folgepunkte, Label-Empfehlungen                | nichts                  | 2–7       |
| `comment`     | Je offenem, nicht grünem PR ein Kommentar: was der Autor bis Grün ändern muss          | ein Kommentar je PR     | 8         |
| `tickets`     | Je Folgepunkt ein Folge-Issue, das den PR als Ursprung nennt                           | ein Issue je Folgepunkt | 9         |
| `consolidate` | Ein Sammel-PR mit allen Folgepunkten **Bezug: Issue** gemergter oder geschlossener PRs | Branch, Commits, ein PR | 10        |
| `labels`      | Die empfohlenen `release:*`-Labels an den PRs                                          | nur `release:*`-Labels  | 11        |

Regeln für alle Befehle:

- `comment`, `tickets`, `consolidate` und `labels` setzen ein Audit derselben PRs auf deren aktuellem
  Head voraus. Fehlt es oder hat sich ein Head geändert, zuerst `audit` ausführen und die Tabelle zeigen.
- Der Aufruf eines schreibenden Befehls ist die Zustimmung zum Schreiben. Ohne diesen Aufruf schreibt der
  Skill nichts: keinen Kommentar, kein Label, kein Issue, keinen Commit.
- Freigaben (Approve) und Merges macht der Skill nie.

## 1. Begriffe

Diese Begriffe gelten im ganzen Skill genau so:

| Begriff                  | Bedeutung                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**                | Das Issue, das der PR mit `Fixes #…`/`Closes #…` verlinkt, samt den Einschränkungen, die Maintainer im Issue oder im PR gesetzt haben.                            |
| **Scope**                | Alles, was nötig ist, damit das Issue vollständig, korrekt und sauber gelöst ist. Auch ein vom Issue verlangter Test oder Doku, die dem neuen Code widerspricht.  |
| **Befund**               | Ein konkreter Mangel mit Datei, Zeile und Fehlerszenario. Ergibt in einer Spalte **warn** oder **hint**.                                                          |
| **OOS-n**                | Out-of-Scope-Änderung: Code **im Diff des PRs**, den das Issue nicht verlangt.                                                                                    |
| **FU-n**                 | Folgepunkt: etwas, das **nicht im Diff** steht, aber erledigt werden sollte, z. B. ein fehlender Test oder derselbe Fehler an anderer Stelle.                     |
| **Bezug**                | Jeder OOS- und FU-Punkt hat genau einen Bezug: **Issue** (vervollständigt das Issue des PRs) oder **neu** (eigenes Thema). OOS-Punkte haben immer **Bezug: neu**. |
| **Folge-Issue / Ticket** | Ein GitHub-Issue, das `tickets` für einen OOS- oder FU-Punkt anlegt.                                                                                              |

Wer was erledigt, folgt aus Status und Bezug:

| PR-Status            | Befund im Scope           | OOS-Punkt (Bezug: neu)                                                         | FU-Punkt, Bezug: Issue    | FU-Punkt, Bezug: neu |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------ | ------------------------- | -------------------- |
| Draft, Ready         | Autor, über `comment`     | Autor nimmt die Änderung heraus (`comment`), Thema ggf. als Ticket (`tickets`) | Autor, über `comment`     | `tickets`            |
| Gemergt, Geschlossen | `tickets` + `consolidate` | `tickets`                                                                      | `tickets` + `consolidate` | `tickets`            |

Beispiele aus dem Referenzlauf (Abschnitt 12):

- **FU-1, Bezug: Issue.** #10718 verlangt ausdrücklich einen Test, #11083 hat ihn nicht geliefert. Der
  Test vervollständigt #10718.
- **FU-6, Bezug: neu.** #11072 hat den CLA-Link von `main` auf `develop` umgestellt. Dass auch 28 READMEs
  auf `blob/main` verlinken, ist derselbe Fehler, aber nicht Teil von #10484.
- **OOS-1, Bezug: neu.** #11082 rendert leere Optgroups nicht mehr. Das hat mit deaktivierten Gruppen
  (#10864) nichts zu tun.

## 2. PRs bestimmen

- Nennt der Nutzer PRs, genau diese prüfen, auch gemergte und geschlossene.
- Nennt der Nutzer einen Contributor, alle seine PRs holen (`gh pr list --repo public-ui/kolibri --author
<login> --state all` oder die GitHub-MCP-Suche `author:<login>`). Sagt er „offene“, nur die offenen.
- Bei einer Folgeprüfung („neuer Stand?“) zuerst alle zuvor genannten PRs neu abrufen. Neue Commits,
  neue Kommentare und neu gemergte oder geschlossene PRs nennen. PRs ohne Änderung seit dem letzten Audit
  nicht neu prüfen, sondern ihre Bewertung übernehmen und das sagen.

## 3. Fakten sammeln

Bei mehreren PRs je PR einen Subagenten parallel starten: nur lesen, nichts posten, nichts pushen. Jeden
**warn** aus einem Subagent-Bericht selbst am Code bestätigen, bevor er in die Tabelle kommt.

1. **PR lesen:** Beschreibung, Labels, Commits, Kommentare, Review-Threads, Check-Runs und den Kommentar
   „Visual Review“ des Bots.
2. **Issue lesen:** mit allen Kommentaren. Daraus die Akzeptanzkriterien ableiten, auch Vorgaben von
   Maintainern im PR (z. B. bei #11074: „No gap, padding, margin in basis styling“).
3. **Diff holen:**

   ```bash
   git fetch origin develop
   git fetch -f origin pull/<nr>/head:pr-<nr>
   git diff --stat origin/develop...pr-<nr>
   git diff origin/develop...pr-<nr>
   ```

   **Gemergter PR:** Der Diff oben ist leer, weil der Head schon in `develop` liegt. Stattdessen gegen die
   Basis-SHA des PRs (`base.sha` aus den PR-Daten) vergleichen und die Dateiliste mit `get_files` bzw.
   `gh pr view --json files` abgleichen. In allen folgenden Befehlen steht dann `<base-sha>...pr-<nr>`
   statt `origin/develop...pr-<nr>`.

   ```bash
   git fetch origin <base-sha>
   git diff --stat <base-sha>...pr-<nr>
   ```

4. **Nichts ausführen:** den PR-Branch nicht auschecken und keine Skripte, Tests oder Builds aus dem PR
   starten, solange die Sicherheitsprüfung (Abschnitt 4.3) nicht durch ist.
5. **Konflikte** (nur offene PRs): `git merge-tree --write-tree origin/develop pr-<nr>`. Ändern mehrere
   offene PRs dieselben Dateien, auch die PRs untereinander prüfen.

## 4. Die drei Spalten bewerten

Jede Spalte bekommt genau einen Wert:

| Wert         | Bedeutung                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ **warn**  | Muss geändert werden. Das Issue ist nicht, unvollständig oder falsch gelöst, oder eine Änderung hat eine riskante Nebenwirkung. |
| 💡 **hint**  | Sollte geändert werden, blockiert aber nicht.                                                                                   |
| ✅ **ready** | Kein Befund.                                                                                                                    |

Jeder **warn** und **hint** braucht Datei, Zeile und ein Fehlerszenario. Was sich nicht konkret belegen
lässt, entfällt.

### 4.1 Minimalistisch & korrekt zum Issue

Prüfen:

- Ist jedes Akzeptanzkriterium erfüllt?
- Braucht eine zweite Stelle dieselbe Korrektur? Beispiel #11082: `disabled` musste beim Rendern **und**
  bei der Vorauswahl (`select-value.ts`) wirken.
- Ist jede geänderte Zeile für das Issue nötig? Jede Datei im Diff einzeln gegen das Issue halten.

Bewerten:

| Fall                                                                                             | Wert     | Beispiel                                                                                                             |
| ------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| Akzeptanzkriterium fehlt oder ist falsch umgesetzt                                               | **warn** | #11084 (erste Fassung): `componentDidUpdate` hob nach jedem Render die Verzögerung der `aria-live`-Ansage auf.       |
| Lösung reicht weiter als nötig, mit riskanter Wirkung                                            | **warn** | #11086: `!important` auf allen Eigenschaften von `.visually-hidden` wirkt global und nimmt Themes die Übersteuerung. |
| Änderung außerhalb des Issues mit riskanter Wirkung (API, global, Themes)                        | **warn** | Ein PR ändert nebenbei den Default einer öffentlichen Prop.                                                          |
| Harmlose Änderung außerhalb des Issues → zusätzlich OOS-Punkt                                    | **hint** | #11084: `classList.add`/`remove` statt `toggle`, nur wegen der Testumgebung.                                         |
| Lücke zum Issue in einem Randbereich, die das Issue nur am Rand berührt → FU-Punkt, Bezug: Issue | **hint** | #11074: Das selten genutzte Theme `ECL_EU` bekam den Abstand nicht.                                                  |

### 4.2 Sauber & ordentlich

Gegen `AGENTS.md` prüfen. Typische Befunde und ihr Wert:

| Befund                                                                                                                                                                   | Wert     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Vom Issue verlangter Test fehlt (→ FU-Punkt, Bezug: Issue)                                                                                                               | **hint** |
| Test prüft weniger als sein Name sagt (→ FU-Punkt, Bezug: Issue). Beispiel #11085: Der Test ruft den Watcher direkt auf und findet eine fehlende `@Watch`-Bindung nicht. | **hint** |
| Doku widerspricht dem neuen Code (→ FU-Punkt, Bezug: Issue). Beispiel #11073: Der Migrationsplan führt den behobenen Fehler noch als offen.                              | **hint** |
| Überflüssiger oder jetzt redundanter Code. Beispiel #11087: drei `hasValue`-Zuweisungen, die `applyValue()` schon erledigt.                                              | **hint** |
| PR-Beschreibung passt nicht zum Diff (fließt in die Release-Notes)                                                                                                       | **hint** |
| Release-Label fehlt oder ist falsch (Regeln in Abschnitt 6.6). Labels setzen Maintainer, nicht der Autor.                                                                | **hint** |
| Theming-Vertrag verletzt: neue oder geänderte DOM-Elemente oder BEM-Klassen ohne angepasste Themes oder ohne Liste der Klassen in der PR-Beschreibung                    | **warn** |
| Regelverstoß aus `AGENTS.md` mit Wirkung: `overflow: hidden`, Farbschema im Basis-Styling, `!important` ohne Begründung, Deprecation ohne Migrationsaufgabe              | **warn** |
| Regelverstoß aus `AGENTS.md` ohne Wirkung: Reihenfolge (Listen, Imports, Union-Literale, Objekt-Schlüssel in Testdaten), Member-Reihenfolge, Kommentar mit Historie      | **hint** |

### 4.3 Sicher

Jede hinzugefügte Zeile des Diffs lesen, auch in Tests und Snapshots. Zusätzlich suchen:

```bash
git diff origin/develop...pr-<nr> | grep '^+' | grep -v '^+++' | grep -niE \
  'fetch\(|XMLHttp|WebSocket|eval\(|new Function|child_process|require\(|import\(|process\.env|fs\.|https?://|atob|fromCharCode|innerHTML|document\.cookie|localStorage|postinstall|exec\(|spawn|<script|javascript:'
git diff origin/develop...pr-<nr> | grep -P '^\+.*[^\x00-\x7F]'
git diff origin/develop...pr-<nr> -- '*.snap' | grep '^+' | grep -c '\${'
git diff --name-only origin/develop...pr-<nr>
```

| Fund                                                                                                                                                                                     | Wert                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Treffer der Suche mit harmlosem Zweck. Beispiel #11081: `fetch('assets/kolicons/kolicons.json')`, statisch und relativ.                                                                  | **ready**, Zweck nennen            |
| Unsichtbare oder bidirektionale Unicode-Zeichen im Code (Umlaute in deutschen Texten sind normal)                                                                                        | **warn**                           |
| `${…}` oder Code außerhalb von Markup in `.snap`-Dateien (Jest lädt sie als JavaScript)                                                                                                  | **warn**                           |
| Änderung an `package.json`, Lockfile, `.github/`, `scripts/` oder Build-/Testkonfiguration ohne Bezug zum Issue                                                                          | **warn**                           |
| Workflow-Änderung mit Bezug zum Issue: Trigger, `permissions`, Secrets und die Interpolation fremder Eingaben in `run:` einzeln prüfen. Beispiel #11072: nur ein fester String geändert. | **ready**, wenn unverändert sicher |
| XSS über `innerHTML` oder ungeprüfte Inhalte, geschwächte Eingabeprüfung mit realem Risiko                                                                                               | **warn**                           |

CI-Ergebnisse (insbesondere CodeQL) nennen, aber das Lesen des Diffs nicht durch sie ersetzen.

## 5. Gesamtstatus

Der Gesamtstatus folgt allein aus den drei Spalten:

| Gesamt | Regel                                  | Beispiel              |
| ------ | -------------------------------------- | --------------------- |
| 🟢     | alle drei Spalten **ready**            | #11081, #11072        |
| 🟡     | mindestens ein **hint**, kein **warn** | #11087: zwei **hint** |
| 🔴     | mindestens ein **warn**                | #11086: ein **warn**  |

Rote CI, ein offenes Visual Review oder Merge-Konflikte sind Befunde in der passenden Spalte, keine
eigene Regel für den Gesamtstatus.

## 6. Ausgabe des Audits

Auf Deutsch, knapp, in dieser Reihenfolge. Leere Blöcke weglassen.

### 6.1 Stand

Ein Satz mit der Zahl der PRs je Status, z. B. „3 Ready · 10 gemergt · 0 Draft · 0 geschlossen ohne
Merge“. Bei einer Folgeprüfung zusätzlich, was sich seit dem letzten Audit geändert hat.

### 6.2 Tabelle

| PR  | Status | Gesamt | Kurzbeschreibung | Minimalistisch & korrekt zum Issue | Sauber & ordentlich | Sicher |
| --- | ------ | ------ | ---------------- | ---------------------------------- | ------------------- | ------ |

- **PR:** Markdown-Link, Kurztitel, Issue-Nummer. Beispiel: `[#11083](…) Link: kein leeres aria-label (#10718)`.
- **Status:** 📝 Draft · 🔵 Ready · 🟣 Gemergt · ⚫ Geschlossen (ohne Merge). Zeilen in dieser Reihenfolge,
  innerhalb eines Status absteigend nach PR-Nummer.
- **Kurzbeschreibung:** ein Satz, was der PR leistet und ob das Issue gelöst ist.
- **Spalten:** Wert und ein knapper Befund. OOS- und FU-Punkte nur mit ihrer ID nennen, z. B.
  „💡 **hint**: Test aus dem Issue fehlt (FU-1)“.

### 6.3 Legende

- **Gesamt:** 🟢 alle Spalten **ready** · 🟡 mindestens ein **hint**, kein **warn** · 🔴 mindestens ein **warn**
- **Spalten:** ⚠️ **warn** muss geändert werden · 💡 **hint** sollte geändert werden, blockiert aber nicht · ✅ **ready** ok

### 6.4 Out-of-Scope-Änderungen

| ID  | PR  | Änderung im Diff | Bewertung | Folge-Ticket? |
| --- | --- | ---------------- | --------- | ------------- |

- Bezug ist immer **neu**, deshalb keine eigene Spalte.
- **Bewertung:** harmlos oder riskant, mit Grund.
- **Folge-Ticket?:** **ja**, **optional (Bedingung)** oder **nein**, und bei offenen PRs der Zusatz „aus
  dem PR herausnehmen“.

### 6.5 Folgepunkte

| ID  | PR  | Thema | Bezug | Folge-Ticket? |
| --- | --- | ----- | ----- | ------------- |

- **Bezug:** **Issue** oder **neu** (Abschnitt 1). Im Zweifel **neu**.
- IDs `OOS-n` und `FU-n` laufen jeweils fortlaufend über alle PRs der Ausgabe.

### 6.6 Release-Labels

Nur PRs, deren gesetzte Labels von der Empfehlung abweichen:

| PR  | Gesetzt | Empfohlen | Begründung |
| --- | ------- | --------- | ---------- |

Ein Hauptlabel nach der wichtigsten Änderung, dazu Zusatzlabels, wenn sie zutreffen. Maßgeblich ist der
Inhalt des Diffs, nicht der PR-Titel (die Automation `pr-release-label-automation.yml` leitet das Label
nur aus dem Titel ab). Kategorien aus `.github/release.yml`:

| Label                     | Art    | Wann                                                                               | Beispiel                       |
| ------------------------- | ------ | ---------------------------------------------------------------------------------- | ------------------------------ |
| `release:breaking-change` | Haupt  | Inkompatible Änderung der öffentlichen API (Props, Methoden, Events, Slots, Typen) |                                |
| `release:feature`         | Haupt  | Neue Funktion oder neues Sample                                                    | #11080 (neues Sample)          |
| `release:fix`             | Haupt  | Behebt ein Fehlverhalten                                                           | #11062 (Listener nie entfernt) |
| `release:improvement`     | Haupt  | Verbessert Verhalten, das kein Fehler war, z. B. Performance                       |                                |
| `release:engineering`     | Haupt  | Ohne Wirkung für Nutzer der Bibliothek: Refactoring, Tests, CI, Tooling            | #11072 (nur `cla.yml`)         |
| `release:doc`             | Haupt  | Nur Dokumentation                                                                  |                                |
| `release:sample`          | Zusatz | Der PR ändert Samples (`packages/samples`)                                         | #11079 (Sample entfernt)       |
| `release:theming`         | Zusatz | Neue oder geänderte DOM-Elemente oder BEM-Klassen                                  | #11086 (zusätzliches Element)  |
| `release:ignore`          | –      | Nie empfehlen, nie setzen, nie entfernen                                           |                                |

Ein falsches Hauptlabel wird ersetzt, z. B. `release:improvement` → `release:fix` bei #11062.

### 6.7 Nicht überflüssig

Was wie ein Befund aussieht, aber keiner ist, mit Grund. Verhindert, dass jemand das Falsche entfernt.
Beispiele:

- #11084: Die doppelte Flag-Logik in `textarea` ist nötig, weil `kol-textarea` nicht von der gemeinsamen
  Basis der Textfelder erbt.
- #11074: `column-gap` steht in fünf Themes statt einmal in der Basis, weil der Maintainer das so
  verlangt hat.

### 6.8 Nicht geprüft

Offen nennen, was nicht geprüft wurde, z. B. „Tests nicht lokal ausgeführt, CI ist grün“.

## 7. Folgeaktionen anbieten

Am Ende des Audits nur die Befehle anbieten, die etwas zu tun hätten, jeweils mit den konkreten PRs bzw.
IDs. Beispiel:

- `comment 11084 11086 11087`: die drei offenen PRs sind nicht grün.
- `tickets` für OOS-1, OOS-2+3, FU-1, FU-2, FU-3, FU-6.
- `consolidate 11083 11085 11073`: FU-1, FU-2, FU-3 haben **Bezug: Issue**.
- `labels 11086 11062 11079 11072`.

## 8. Befehl `comment`

**Zweck:** ein Kommentar je PR, nach dessen Umsetzung der PR grün ist.

**Auswahl:** nur PRs mit Status Draft oder Ready und Gesamtstatus 🟡 oder 🔴. Grüne, gemergte und
geschlossene PRs überspringen und das nennen.

**Vorher:**

1. Den Head neu abrufen. Hat er sich seit dem Audit geändert, zuerst neu auditieren.
2. Die bisherigen Kommentare lesen. Steht ein Punkt schon unbeantwortet in einem früheren Kommentar,
   darauf verweisen statt ihn zu wiederholen. Ist nichts Neues offen, nichts posten und das sagen.

**Inhalt:**

| Aus dem Audit          | Im Kommentar                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| **warn**               | Abschnitt **Required**                                                   |
| **hint** (außer Label) | Abschnitt **Recommended**                                                |
| OOS-Punkt              | Abschnitt **Please remove (not part of #…)**: die Änderung zurücknehmen  |
| FU-Punkt, Bezug: Issue | **Required** oder **Recommended**, je nach Wert in der Tabelle           |
| FU-Punkt, Bezug: neu   | nicht verlangen; gibt es ein Ticket, ein Satz „tracked separately in #…“ |
| Label-Abweichung       | nicht verlangen; ein Satz, dass die Maintainer das Label setzen          |

Jeder Punkt nennt Datei und Zeile, was falsch ist, warum, und was zu ändern ist. Kein Punkt, der nicht
aus dem Audit stammt. Kein Ampel-Jargon (kein „warn“, „hint“, „OOS“).

**Form:** Englisch (Sprache der PRs), freundlich, knapp. Leere Abschnitte weglassen; die Nummerierung läuft
durch. Der Footer steht immer am Ende.

```markdown
Hi @<author>, thanks for the PR! To get it ready for merge, please address the following. Everything here is within the scope of #<issue>.

**Required**

1. `<file>:<line>`: <what is wrong and why>. <what to change>.

**Recommended**

2. `<file>:<line>`: <what is wrong>. <what to change>.

**Please remove (not part of #<issue>)**

3. `<file>:<line>`: <change>. <why it is not needed here>.

Not part of this PR: <topic> is tracked separately in #<ticket>.

Thanks!

---

_Generated by [Claude Code](https://claude.ai/code)_
```

Beispiel für einen Punkt unter **Please remove** (#11084):

> `packages/components/src/components/textarea/component.tsx:497` (`handleTextareaInput`): the check
> `this.ctaRef.el instanceof HTMLTextAreaElement` was relaxed to `this.ctaRef.el`. This is unrelated to
> #11052. Please restore it, and adapt the test setup instead if it needs this.

**Posten:** als normaler PR-Kommentar (`add_issue_comment` bzw. `gh pr comment`), nicht als Review.

**Antwort im Chat:** je PR Link zum Kommentar und die Zahl der Punkte, dazu was für Maintainer offen
bleibt (z. B. ein Label).

## 9. Befehl `tickets`

**Zweck:** je Folgepunkt ein Folge-Issue, damit er nicht im PR untergeht.

**Auswahl:**

- Ohne `[IDs]`: alle OOS- und FU-Punkte der genannten PRs mit „Folge-Ticket: ja“.
- Mit `[IDs]` oder ausdrücklich genannten PRs: auch Punkte mit „optional“. Die Bedingung steht dann im
  Ticket (Beispiel #11240: „Zuerst entscheiden, ob `ECL_EU` gepflegt wird“).
- Punkte, die laut Audit zusammengehören, werden ein Ticket (Beispiel: OOS-2 und OOS-3 → #11236).

**Dubletten:** vor dem Anlegen offene und geschlossene Issues zum Thema suchen (`search_issues` bzw.
`gh issue list --search`). Gibt es eines, kein neues anlegen, sondern es nennen. Das geschlossene
Ursprungs-Issue des PRs ist keine Dublette.

**Inhalt:** Deutsch, nach diesem Muster:

```markdown
Gefunden im Review von #<PR> (<ID>). <Ein Satz zum Bezug.>

## Befund

- **Betroffen:** `<Datei>:<Zeile>` …
- **Ursache:** …
- **Folge:** <konkretes Szenario>

## Vorschlag

…

## Akzeptanzkriterien

- [ ] …

Refs #<PR>, #<Issue>
```

- **Erster Satz nach Bezug:**
  - Bezug: Issue → „#<PR> hat #<Issue> behoben, <was fehlt>.“ Beispiel #11234: „#10718 verlangt neben
    dem Fix ausdrücklich einen Test. #11083 hat nur den Fix geliefert.“
  - Bezug: neu → „Die Änderung gehört nicht zu #<Issue>.“ oder „Derselbe Fehler steht an anderer
    Stelle.“ Beispiel #11238.
- **Unbestätigte Annahmen** als solche kennzeichnen und zuerst einen Nachweis verlangen. Beispiel #11236:
  „Ursache (laut #11084, noch zu bestätigen)“.
- **Titel:** Komponente vorn, für sich verständlich. Beispiel: „kol-link: Test für `_hide-label` ohne
  Label fehlt (zweites Kriterium aus #10718)“.
- **Typ:** `Bug` für Fehlverhalten, `Task` für Tests, Doku und Aufräumen.
- Keine Labels, keine Zuweisung, kein Milestone.

**Verlinken:** `Refs #<PR>` erzeugt im PR automatisch einen Querverweis. Keinen eigenen Kommentar für den
Link posten.

**Antwort im Chat:** Tabelle mit ID, neuem Issue (Link, Titel, Typ) und Ursprungs-PR, dazu übersprungene
Punkte mit Grund.

## 10. Befehl `consolidate`

**Zweck:** Folgepunkte gemergter PRs kann deren Autor nicht mehr nachbessern. `consolidate` setzt sie in
**einem** Sammel-PR um, der die zugehörigen Folge-Issues schließt.

**Auswahl, in genau dieser Reihenfolge:**

1. **PRs:** nur die genannten PRs mit Status 🟣 Gemergt oder ⚫ Geschlossen und Gesamtstatus 🟡 oder 🔴.
   Offene PRs gehen über `comment`. Bei einem geschlossenen, **nicht** gemergten PR liegt sein Code nicht
   in `develop`: Punkte nur übernehmen, wenn sie sich auf `develop` beziehen, sonst überspringen.
2. **Punkte:** nur FU-Punkte mit **Bezug: Issue** und Befunde in den Spalten „Minimalistisch & korrekt“
   oder „Sauber & ordentlich“, die eine Änderung im Repo brauchen.
3. **Nie dabei:**
   - OOS-Punkte (immer Bezug: neu),
   - FU-Punkte mit **Bezug: neu**,
   - veraltete PR-Beschreibungen (nicht im Repo behebbar; im Chat für den Changelog nennen),
   - Labels (dafür gibt es `labels`).
4. **Mit `[IDs]`** genau diese Punkte. Verstößt eine ID gegen Schritt 2 oder 3, sie ablehnen und den Grund
   nennen.

Beispiel aus dem Referenzlauf, Aufruf `consolidate 11083 11085 11073 11062 11082 11072`:

| Punkt                               | Folge-Issue | Im Sammel-PR | Grund                                             |
| ----------------------------------- | ----------- | ------------ | ------------------------------------------------- |
| FU-1 Link-Test (#11083)             | #11234      | ja           | Bezug: Issue, #10718 verlangt den Test            |
| FU-2 Password-Test (#11085)         | #11237      | ja           | Bezug: Issue, der Test zu #11054 ist zu schwach   |
| FU-3 Textarea Doku + Test (#11073)  | #11235      | ja           | Bezug: Issue, Doku und Test zu #10863             |
| FU-4 Tooltip-Test (#11062)          | #11239      | ja           | Bezug: Issue, Test zum Fix von #11033             |
| OOS-1 leere Optgroups (#11082)      | #11233      | nein         | OOS-Punkt, eigenes Thema mit eigener Entscheidung |
| FU-6 Links auf `blob/main` (#11072) | #11238      | nein         | Bezug: neu, gehört nicht zu #10484                |
| PR-Beschreibung #11079, #11080      | –           | nein         | nicht im Repo behebbar                            |

**Tickets sicherstellen:** Jeder Punkt braucht ein offenes Folge-Issue. Fehlt es, zuerst wie in
Abschnitt 9 anlegen. Ist das Ursprungs-Issue noch offen und erledigt der Punkt es vollständig, schließt der
Sammel-PR es mit.

**Umsetzen:**

- Branch von aktuellem `develop`. Gibt die Sitzung einen Branch vor, diesen nehmen, sonst
  `fix/pr-extern-review-followups-<YYYY-MM-DD>`.
- Ein Commit je Punkt nach Conventional Commits, im Body `Refs #<Folge-Issue>, #<Ursprungs-PR>`.
- Nur was der Punkt verlangt. Neue Funde während der Umsetzung als FU-Punkt im Chat nennen, nicht
  mitnehmen.
- Alle Regeln aus `AGENTS.md`: `pnpm format` vor jedem Commit, bei SCSS `lint:stylelint --fix`,
  Unit-Tests der geänderten Pakete, Theming-Vertrag, zero visual delta.

**PR anlegen:** gegen `develop`, bereit zum Review (kein Draft).

- **Titel:** z. B. `fix: follow-ups from the review of external pull requests` (`test:` oder `docs:`, wenn
  nur Tests bzw. Doku enthalten sind).
- **Label:** nach Abschnitt 6.6, Hauptlabel nach der wichtigsten Änderung.
- **Beschreibung** auf Englisch, je Folge-Issue eine eigene `Closes`-Zeile, damit GitHub jedes schließt:

  ```markdown
  ## Summary

  Follow-ups from the review of merged external pull requests. Each item completes the issue of its original PR.

  | Item | Original PR | Original issue | Change                              |
  | ---- | ----------- | -------------- | ----------------------------------- |
  | FU-1 | #11083      | #10718         | Test for `_hideLabel` without label |

  Closes #11234

  Refs #11083
  ```

**Antwort im Chat:** Link zum Sammel-PR, umgesetzte Punkte mit Folge-Issues, übersprungene Punkte mit
Grund. Danach anbieten, den PR bis Grün zu begleiten.

## 11. Befehl `labels`

**Zweck:** Jeder PR landet im Changelog in der richtigen Kategorie. Das Audit empfiehlt nur, erst dieser
Befehl ändert Labels.

**Auswahl:** die genannten PRs mit einer Abweichung in Abschnitt 6.6. Gemergte PRs nur, solange sie in
keinem veröffentlichten Release stehen (`merged_at` liegt nach dem letzten Release, `list_releases` bzw.
`gh release list`). Sonst überspringen, weil der Changelog schon erzeugt ist.

**Ändern:**

- Nur `release:*`-Labels. Das empfohlene Hauptlabel setzen, ein falsches Hauptlabel entfernen,
  Zusatzlabels nur ergänzen. `release:ignore` nie anfassen.
- Aktuelle Labels über die PR-Daten lesen (`pull_request_read` mit `get` bzw. `gh pr view`). Die
  Issue-Abfrage findet PRs nicht.
- `issue_write` mit `update` ersetzt die **ganze** Label-Liste. Deshalb die vollständige neue Liste
  übergeben, mit allen Labels außerhalb von `release:*` (alternativ `gh pr edit --add-label/--remove-label`).

Beispiel: #11062 trägt `release:improvement`, behebt aber einen Fehler → neue Liste `["release:fix"]`.

**Kein Kommentar:** Die Änderung steht in der Zeitleiste des PRs.

**Antwort im Chat:** Tabelle mit PR, Status, Labels vorher und nachher, dazu übersprungene PRs mit Grund.

## 12. Referenzlauf

Audit vom Oktober 2026 über die 13 PRs eines externen Contributors (gekürzt auf die lehrreichen Zeilen).

| PR                                                                                    | Status     | Gesamt | Kurzbeschreibung                                                  | Minimalistisch & korrekt zum Issue                                                                                                   | Sauber & ordentlich                                             | Sicher                                             |
| ------------------------------------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------- |
| [#11087](https://github.com/public-ui/kolibri/pull/11087) `has-value` sofort (#11053) | 🔵 Ready   | 🟡     | Korrekt und klein.                                                | 💡 **hint**: drei jetzt überflüssige Zuweisungen an `hasValue`                                                                       | 💡 **hint**: Die PR-Beschreibung nennt noch `kol-input-number`. | ✅ **ready**                                       |
| [#11086](https://github.com/public-ui/kolibri/pull/11086) aria (#11035)               | 🔵 Ready   | 🔴     | Die ARIA-Logik ist korrekt, das Visual Review zeigt 0 Änderungen. | ⚠️ **warn**: `!important` auf allen Eigenschaften von `.visually-hidden`, nötig nur für `position`, `margin`, `padding`. Dazu OOS-4. | 💡 **hint**: `release:theming` fehlt.                           | ✅ **ready**                                       |
| [#11084](https://github.com/public-ui/kolibri/pull/11084) Zähler (#11052)             | 🔵 Ready   | 🟡     | Korrekt, die Verzögerung der Ansage bleibt erhalten.              | 💡 **hint**: zwei Änderungen außerhalb des Issues (OOS-2, OOS-3)                                                                     | ✅ **ready**                                                    | ✅ **ready**                                       |
| [#11083](https://github.com/public-ui/kolibri/pull/11083) Link-`aria-label` (#10718)  | 🟣 Gemergt | 🟡     | Mit einer Zeile minimal behoben.                                  | ✅ **ready**                                                                                                                         | 💡 **hint**: Der vom Issue verlangte Test fehlt (FU-1).         | ✅ **ready**                                       |
| [#11082](https://github.com/public-ui/kolibri/pull/11082) Optgroups (#10864)          | 🟣 Gemergt | 🟡     | `disabled` wirkt beim Rendern und bei der Vorauswahl.             | 💡 **hint**: eine Änderung außerhalb des Issues (OOS-1)                                                                              | ✅ **ready**                                                    | ✅ **ready**                                       |
| [#11081](https://github.com/public-ui/kolibri/pull/11081) Icon-Pfade (#10382)         | 🟣 Gemergt | 🟢     | Alle Kriterien erfüllt.                                           | ✅ **ready**                                                                                                                         | ✅ **ready**                                                    | ✅ **ready**: `fetch` statisch und relativ         |
| [#11072](https://github.com/public-ui/kolibri/pull/11072) CLA-Link (#10484)           | 🟣 Gemergt | 🟢     | Eine Zeile in `cla.yml`, genau wie verlangt.                      | ✅ **ready**                                                                                                                         | ✅ **ready**                                                    | ✅ **ready**: Trigger, Secrets, Rechte unverändert |

**Out-of-Scope-Änderungen**

| ID    | PR     | Änderung im Diff                                                              | Bewertung                        | Folge-Ticket?                        |
| ----- | ------ | ----------------------------------------------------------------------------- | -------------------------------- | ------------------------------------ |
| OOS-1 | #11082 | Leere Optgroups werden nicht mehr gerendert.                                  | harmlos, bereits in `develop`    | ja → #11233                          |
| OOS-2 | #11084 | `classList.add`/`remove` statt `toggle`, wegen der Testumgebung; 7 Snapshots. | harmlos, im Browser ohne Wirkung | ja → #11236; aus dem PR herausnehmen |
| OOS-3 | #11084 | `instanceof HTMLTextAreaElement` zu reiner Null-Prüfung gelockert.            | harmlos                          | mit OOS-2; aus dem PR herausnehmen   |
| OOS-4 | #11086 | `position: relative` an `.kol-alert` im Theme kern entfernt.                  | harmlos, nicht mehr nötig        | nein; aus dem PR herausnehmen        |

**Folgepunkte**

| ID   | PR     | Thema                                                       | Bezug | Folge-Ticket?                                 |
| ---- | ------ | ----------------------------------------------------------- | ----- | --------------------------------------------- |
| FU-1 | #11083 | Test für `_hideLabel` ohne `_label`                         | Issue | ja → #11234                                   |
| FU-2 | #11085 | Test über echte Prop-Änderung statt direkten Watcher-Aufruf | Issue | ja → #11237                                   |
| FU-3 | #11073 | Migrationsplan aktualisieren, Test für `_spellCheck: false` | Issue | ja → #11235                                   |
| FU-4 | #11062 | Regressionstest für An- und Abmelden des Escape-Listeners   | Issue | optional → #11239                             |
| FU-5 | #11074 | Progress-Styling für `ECL_EU`                               | Issue | optional (wenn ECL_EU gepflegt wird) → #11240 |
| FU-6 | #11072 | 28 READMEs und 9 Stylelint-Regeln verlinken `blob/main`     | neu   | ja → #11238                                   |

Was dieser Lauf zeigt:

- Ein einziger **hint** reicht, damit ein PR nicht grün ist (#11087).
- Eine harmlose Änderung außerhalb des Issues ist **hint** plus OOS-Punkt (OOS-1), eine riskante
  Mehrwirkung ist **warn** (#11086).
- Derselbe Fehler an anderer Stelle ist ein Folgepunkt mit **Bezug: neu** (FU-6), ein vom Issue
  verlangter Test dagegen **Bezug: Issue** (FU-1).
- `consolidate` nimmt nur FU-1 bis FU-5, nie OOS-1 oder FU-6 (Tabelle in Abschnitt 10).
