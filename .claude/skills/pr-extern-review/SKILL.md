---
name: pr-extern-review
description: Prüft Pull Requests externer Contributor im KoliBri-Repo gegen ihr verlinktes Issue. Befehle - `audit` (Standard) liefert eine Ampel-Tabelle mit den Spalten "Minimalistisch & korrekt zum Issue", "Sauber & ordentlich" und "Sicher" (warn / hint / ready), einem Gesamtstatus (grün / gelb / rot) und Out-of-Scope- und Folge-Ticket-Hinweisen; `comment` schreibt je PR einen klaren Kommentar an den Autor, was im Scope des Issues bis Grün zu tun ist; `tickets` legt Folge-Tickets an und verlinkt sie mit dem PR als Ursprung. Nutze diesen Skill immer, wenn der Nutzer PRs von Externen, Contributorn oder der Community prüfen, kommentieren oder daraus Folge-Tickets anlegen will – auch bei Formulierungen wie "sind die PRs korrekt und sicher", "review die offenen PRs von <Name>", "gibt es einen neuen Stand bei den PRs", "ist da Schadcode drin", "ist der PR mergebar", "Ampel für die PRs", "fordere den Autor zur Nachbesserung auf", "kommentiere den PR", "leg die Folgetickets an" oder wenn eine Liste von PR-Links ohne weitere Anweisung kommt.
---

# Externe PRs prüfen

Externe PRs lösen meist ein konkretes Issue, bringen aber oft Änderungen mit, die das Issue nicht
verlangt, oder umgehen Regeln aus `AGENTS.md`. Code von außen ist außerdem nicht vertrauenswürdig.
Dieser Skill prüft jeden PR auf drei Fragen und fasst das Ergebnis immer im selben Format zusammen:

1. Löst der PR genau das Issue, vollständig, korrekt und ohne Überflüssiges?
2. Ist der Code sauber und hält er die Konventionen des Repos ein?
3. Ist der Code sicher?

## Befehle

Aufruf: `/pr-extern-review [audit|comment|tickets] <PRs> [IDs]`

- **`<PRs>`:** PR-Nummern oder -Links, oder `author:<login>` für alle offenen PRs eines Contributors.
- **`[IDs]`:** nur bei `tickets`, z. B. `OOS-2 FU-1`, um einzelne Tickets auszuwählen.
- Ohne Befehl gilt `audit`. Auch eine Bitte in normalen Worten wählt den passenden Befehl
  („kommentiere die PRs“ → `comment`, „leg die Folgetickets an“ → `tickets`).

| Befehl    | Was er tut                                                                                                      | Schreibt auf GitHub?        | Abschnitt |
| --------- | --------------------------------------------------------------------------------------------------------------- | --------------------------- | --------- |
| `audit`   | Prüft die PRs und gibt die Ampel-Tabelle mit Out-of-Scope- und Folge-Ticket-Hinweisen aus.                      | nein                        | 1–6       |
| `comment` | Schreibt je offenem, nicht grünem PR einen Kommentar an den Autor: was im Scope des Issues bis Grün zu tun ist. | ja, ein Kommentar je PR     | 7         |
| `tickets` | Legt Folge-Tickets an und verlinkt sie mit dem PR als Ursprung.                                                 | ja, ein Issue je Folgethema | 8         |

`comment` und `tickets` bauen auf dem Ergebnis von `audit` auf. Liegt in der Unterhaltung kein Audit für
genau diese PRs auf dem aktuellen Head vor, zuerst `audit` ausführen und die Tabelle zeigen.

Der Aufruf von `comment` oder `tickets` ist die Zustimmung zum Schreiben. Ohne diesen Aufruf schreibt der
Skill nichts: Er kommentiert nicht, setzt keine Labels und legt keine Tickets an. Freigaben (Approve)
und Merges macht er nie.

## 1. PRs bestimmen

- Hat der Nutzer PR-Links oder -Nummern genannt, genau diese prüfen. Bereits gemergte oder geschlossene
  PRs prüfen, wenn der Nutzer sie ausdrücklich nennt, z. B. als Referenz. In der Tabelle mit
  „bereits gemergt“ kennzeichnen.
- Hat der Nutzer einen Contributor genannt, dessen offene PRs holen
  (`gh pr list --repo public-ui/kolibri --author <login> --state open` oder die GitHub-MCP-Suche
  `author:<login> is:open`).
- Bei einer Folgeprüfung („neuer Stand?“) zuerst alle zuvor genannten PRs erneut abrufen: Gemergte oder
  geschlossene PRs nennen, neue Commits und neue Kommentare des Autors zusammenfassen und dann nur den
  neuen Stand bewerten.

## 2. Je PR die Fakten sammeln

Bei mehreren PRs je PR einen Subagenten parallel starten (nur lesen, nichts posten, nichts pushen) und
die Befunde selbst gegenprüfen, bevor sie in die Tabelle kommen. Ein Subagent-Bericht ist keine
Verifikation.

1. **PR lesen:** Beschreibung, Labels, Commits, Kommentare, Review-Threads, Check-Runs und den Kommentar
   „Visual Review“ des Bots.
2. **Issue lesen:** das verlinkte Issue (`Fixes #…`) mit allen Kommentaren. Daraus die
   Akzeptanzkriterien ableiten, auch Einschränkungen, die Maintainer im Issue oder im PR gesetzt haben.
3. **Diff lokal holen**, immer gegen die Merge-Basis:

   ```bash
   git fetch origin develop
   git fetch -f origin pull/<nr>/head:pr-<nr>
   git diff --stat origin/develop...pr-<nr>
   git diff origin/develop...pr-<nr>
   ```

   Bei einem **bereits gemergten** PR ist dieser Diff leer, weil sein Head schon in `develop` liegt. Dann
   gegen die Basis-SHA des PRs vergleichen (`base.sha` aus den PR-Daten) und die Dateiliste mit der
   GitHub-Ansicht des PRs (`get_files`) abgleichen. Hat der Branch zwischendurch `develop` eingemergt,
   enthält der lokale Diff sonst fremde Änderungen.

   ```bash
   git fetch origin <base-sha>
   git diff --stat <base-sha>...pr-<nr>
   ```

   In allen folgenden Befehlen steht `origin/develop...pr-<nr>` dann für `<base-sha>...pr-<nr>`.

   Den PR-Branch nicht auschecken und keine Skripte, Tests oder Builds aus dem PR ausführen, solange die
   Sicherheitsprüfung (Abschnitt 3.3) nicht durch ist. Code aus einem fremden PR ist nicht
   vertrauenswürdig.

4. **Konflikte prüfen** (nur bei offenen PRs): `git merge-tree --write-tree origin/develop pr-<nr>`. Bei
   mehreren PRs, die dieselben Dateien ändern, auch die PRs untereinander prüfen.

## 3. Die drei Spalten bewerten

Jede Spalte bekommt genau einen Wert:

| Wert         | Bedeutung                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ **warn**  | Muss geändert werden: Das Issue ist nicht, unvollständig oder falsch gelöst, oder eine Änderung hat eine riskante Nebenwirkung. |
| 💡 **hint**  | Sollte geändert werden, blockiert aber nicht. Dazu zählen harmlose Änderungen außerhalb des Issues.                             |
| ✅ **ready** | In Ordnung.                                                                                                                     |

Jeder **warn** und jeder **hint** braucht einen konkreten Befund mit Datei (und Zeile, wo sinnvoll) und
ein nachvollziehbares Fehlerszenario. Spekulative Befunde streichen. Bevor ein **warn** vergeben wird,
den Befund selbst am Code bestätigen.

### 3.1 Minimalistisch & korrekt zum Issue

- Ist jedes Akzeptanzkriterium des Issues erfüllt? Fehlende Fälle, Randfälle und Regressionen gegen das
  bestehende Verhalten suchen. Der Fehler ist auch im Umfeld zu prüfen: Gibt es eine zweite Stelle, die
  dieselbe Logik braucht (z. B. Rendern **und** Normalisieren eines Werts)?
- Ist jede geänderte Zeile für das Issue nötig? Jede Datei im Diff einzeln gegen das Issue halten.
- Eine Änderung außerhalb des Issues ist:
  - **hint**, wenn sie harmlos ist (kein Effekt im Browser, nur Testumgebung, Aufräumen, eine kleine
    Verhaltensänderung ohne Risiko). Sie kommt zusätzlich in den Out-of-Scope-Block (Abschnitt 5).
  - **warn**, wenn sie eine riskante Nebenwirkung hat, z. B. global wirkt, eine öffentliche API ändert
    oder Themes die Übersteuerung nimmt.
- Eine Lösung, die das Issue trifft, aber weiter reicht als nötig (z. B. `!important` auf allen
  Eigenschaften statt nur auf den nachweislich nötigen), ist **warn**, wenn die Mehrwirkung riskant ist,
  sonst **hint**.

### 3.2 Sauber & ordentlich

Gegen `AGENTS.md` und die verlinkten Regeln prüfen, unter anderem:

- Theming-Vertrag: Neue oder geänderte DOM-Elemente oder BEM-Klassen brauchen das Label
  `release:theming`, die alten und neuen Klassen in der PR-Beschreibung und angepasste Themes im selben PR.
- Basis-Styling ohne Farbschema, kein `overflow: hidden`, `!important` nur mit Begründung, keine
  `@layer` in Utility-Dateien.
- Alphabetische Reihenfolge (Listen, Import-Specifier, Union-Literale, Objekt-Schlüssel in Testdaten),
  Member-Reihenfolge der Stencil-Klassen, keine Barrel-Dateien, exakte Versionsnummern.
- Inline-Dokumentation beschreibt den Ist-Zustand, keine Historie, kein Widerspruch zum Code.
- Deprecations mit Migrationsaufgabe in `packages/tools/kolibri-cli`.
- Doku, die dem neuen Code widerspricht (z. B. ein Plan in `docs/`, der den Fehler noch als offen führt).
- Tests: Ist der Fall aus dem Issue getestet? Für jede betroffene Komponente? Würde ein Test die
  gefundenen Fehler aufdecken?
- Die PR-Beschreibung passt zum tatsächlichen Diff. Eine veraltete Beschreibung ist **hint**, weil sie
  in die Release-Notes einfließt.
- Überflüssige, jetzt redundante Zuweisungen oder toter Code ist **hint**.

### 3.3 Sicher

Jede hinzugefügte Zeile des gesamten Diffs lesen, nicht nur die der Tests. Zusätzlich gezielt suchen:

```bash
git diff origin/develop...pr-<nr> | grep '^+' | grep -v '^+++' | grep -niE \
  'fetch\(|XMLHttp|WebSocket|eval\(|new Function|child_process|require\(|import\(|process\.env|fs\.|https?://|atob|fromCharCode|innerHTML|document\.cookie|localStorage|postinstall|exec\(|spawn|<script|javascript:'
git diff origin/develop...pr-<nr> | grep -P '^\+.*[^\x00-\x7F]'
git diff origin/develop...pr-<nr> -- '*.snap' | grep '^+' | grep -c '\${'
git diff --name-only origin/develop...pr-<nr>
```

- Treffer einzeln bewerten. Nicht jeder Treffer ist schädlich, aber jeder braucht eine Begründung.
- Nicht-ASCII-Zeichen sind in deutschen Texten normal. Unsichtbare oder bidirektionale Unicode-Zeichen
  im Code sind **warn**.
- Snapshot-Dateien sind für Jest JavaScript: `${…}` oder Code außerhalb von Markup ist **warn**.
- Änderungen an `package.json`, Lockfile, `.github/`, `scripts/`, Build- oder Testkonfiguration sind
  besonders genau zu prüfen und ohne Bezug zum Issue **warn**.
- XSS über `innerHTML` oder ungeprüfte Inhalte, geschwächte Typ- oder Eingabeprüfungen mit realem Risiko:
  **warn**.
- CI-Ergebnisse (insbesondere CodeQL) nennen, aber nicht als Ersatz für das Lesen des Diffs nehmen.

## 4. Gesamtstatus

Der Gesamtstatus ergibt sich nur aus den drei Spalten:

| Gesamt | Regel                                  |
| ------ | -------------------------------------- |
| 🟢     | alle drei Spalten **ready**            |
| 🟡     | mindestens ein **hint**, kein **warn** |
| 🔴     | mindestens ein **warn**                |

Rote CI, ein offenes Visual Review oder Merge-Konflikte fließen als Befund in die passende Spalte ein
(meist „Minimalistisch & korrekt“ oder „Sauber“), nicht direkt in den Gesamtstatus.

## 5. Ausgabe

Auf Deutsch, knapp. Immer in dieser Reihenfolge:

1. Ein Satz zum Stand: welche PRs offen, welche inzwischen gemergt oder geschlossen sind.
2. Die Tabelle, eine Zeile je PR:

   | PR  | Gesamt | Kurzbeschreibung | Minimalistisch & korrekt zum Issue | Sauber & ordentlich | Sicher |
   | --- | ------ | ---------------- | ---------------------------------- | ------------------- | ------ |
   - **PR:** Markdown-Link auf den PR, Kurztitel und Issue-Nummer.
   - **Kurzbeschreibung:** ein Satz, was der PR leistet und ob das Issue gelöst ist.
   - **Spalten:** Wert und ein knapper Befund. Out-of-Scope-Änderungen nur mit ihrer ID (`OOS-n`)
     referenzieren.

3. Die Legende:

   - **Gesamt:** 🟢 alle Spalten **ready** · 🟡 mindestens ein **hint**, kein **warn** · 🔴 mindestens ein **warn**
   - **Spalten:** ⚠️ **warn** muss geändert werden · 💡 **hint** sollte geändert werden, blockiert aber nicht · ✅ **ready** ok

4. Der Block **Out-of-Scope-Hinweise**, wenn es welche gibt:

   | ID  | PR  | Änderung | Bewertung | Folge-Ticket? |
   | --- | --- | -------- | --------- | ------------- |
   - **Bewertung:** harmlos oder riskant, mit kurzer Begründung.
   - **Folge-Ticket?:** ob ein eigenes Issue sinnvoll ist (z. B. für einen Fehler in der Testumgebung oder
     eine bereits gemergte, undokumentierte Verhaltensänderung) und ob die Änderung aus dem PR heraus soll.

5. Der Block **Weitere Folge-Tickets**, wenn es welche gibt. Er sammelt, was kein Out-of-Scope-Diff ist,
   aber ein eigenes Issue verdient: eine Lücke zum Issue in einem bereits gemergten PR (z. B. ein vom Issue
   verlangter Test fehlt) oder ein Befund im Umfeld, der denselben Fehler an anderer Stelle zeigt.

   | ID  | PR  | Thema | Folge-Ticket? |
   | --- | --- | ----- | ------------- |
   - **ID:** `FU-n`, fortlaufend über alle PRs der Ausgabe, wie `OOS-n`.
   - **Folge-Ticket?:** ja, optional (mit Bedingung) oder nein.

6. Was nicht überflüssig ist, obwohl es so aussieht (z. B. doppelte Logik, weil eine Komponente nicht von
   der gemeinsamen Basis erbt), damit niemand das Falsche entfernt. Nur wenn es solche Fälle gibt.
7. Offen benennen, was nicht geprüft wurde (z. B. Tests nicht lokal ausgeführt, weil `node_modules` fehlen).

## 6. Folgeaktionen anbieten

Am Ende des Audits eine kurze Frage mit den passenden Befehlen:

- **`comment`** für die offenen PRs, die nicht grün sind.
- **`tickets`** für die OOS- und FU-Punkte mit „Folge-Ticket: ja“.
- **Beobachten:** den PRs folgen und bei neuen Commits erneut `audit` ausführen.

## 7. Befehl `comment`: Nachbesserung im Scope des Issues anfordern

Ziel: ein Kommentar je PR, nach dessen Umsetzung der PR grün ist. Er nennt nur, was **dieser PR im
Scope seines Issues** ändern muss, klar und ohne Ampel-Jargon.

1. **Auswahl:** nur offene PRs mit Gesamtstatus 🟡 oder 🔴. Grüne, gemergte und geschlossene PRs
   überspringen und das in der Antwort nennen.
2. **Aktuellen Stand sichern:** den Head erneut abrufen. Hat er sich seit dem Audit geändert, zuerst neu
   auditieren.
3. **Doppelungen vermeiden:** die bisherigen Kommentare lesen. Steht ein Punkt schon unbeantwortet in
   einem früheren Kommentar, auf diesen verweisen statt ihn zu wiederholen. Ist nichts Neues offen, keinen
   Kommentar schreiben und das dem Nutzer sagen.
4. **Inhalt:**
   - Jeder **warn** und jeder **hint** des PRs wird ein nummerierter Punkt mit Datei, Ursache und
     konkretem Vorschlag.
   - Out-of-Scope-Änderungen (OOS) stehen unter „Please remove“, mit Bezug auf das Issue. Das Herausnehmen
     ist eine Änderung an diesem PR und gehört damit in den Scope.
   - Themen außerhalb des Issues (FU, Folge-Tickets) werden **nicht** vom Autor verlangt. Gibt es dafür
     schon ein Ticket, in einem Satz darauf verweisen („tracked separately in #…“).
   - Kein Punkt, der nicht aus dem Audit stammt.
5. **Form:** Englisch (Sprache der PRs), freundlich, knapp, nach diesem Muster:

   ```markdown
   Hi @<author>, thanks for the PR! To get it ready for merge, please address the following. Everything here is within the scope of #<issue>.

   **Required**

   1. `<file>`: <what is wrong and why>. <what to change>.

   **Recommended**

   2. `<file>`: <what is wrong>. <what to change>.

   **Please remove (not part of #<issue>)**

   3. `<file>`: <change>. <why it is not needed here>.

   <Optional: Not part of this PR: <topic> is tracked separately in #<ticket>.>

   Thanks!

   ---

   _Generated by [Claude Code](https://claude.ai/code)_
   ```

   - **Required** enthält die **warn**-Punkte, **Recommended** die **hint**-Punkte außer OOS. Leere
     Abschnitte weglassen; die Nummerierung läuft über alle Abschnitte durch.
   - Der Footer steht immer am Ende.

6. **Posten:** als normaler PR-Kommentar (`add_issue_comment` bzw. `gh pr comment`), nicht als Review mit
   Zeilenkommentaren.
7. **Antwort im Chat:** je PR den Link zum Kommentar und die Zahl der Punkte. Danach anbieten, die PRs zu
   beobachten.

## 8. Befehl `tickets`: Folge-Tickets anlegen und mit dem PR verlinken

Ziel: je Folgethema ein eigenes Issue, das den PR als Ursprung nennt, damit der Befund nicht im PR
untergeht.

1. **Auswahl:** ohne `[IDs]` alle OOS- und FU-Punkte mit „Folge-Ticket: ja“ aus dem Audit der genannten
   PRs. Mit `[IDs]` genau diese, auch wenn sie „optional“ markiert sind. Punkte, die laut Audit
   zusammengehören (z. B. „zusammen mit OOS-2“), werden ein Ticket.
2. **Dubletten prüfen:** vor dem Anlegen offene und geschlossene Issues nach dem Thema durchsuchen
   (`search_issues` bzw. `gh issue list --search`). Gibt es schon eines, kein neues anlegen, sondern es im
   Chat nennen.
3. **Inhalt:** Deutsch, im Stil der bestehenden Folge-Issues des Repos, nach diesem Muster:

   ```markdown
   Gefunden im Review von #<PR> (<OOS-n/FU-n>). <Ein Satz zum Bezug, z. B. „Die Änderung gehört nicht zu #<issue> und wird dort herausgenommen.“>

   ## Befund

   - **Betroffen:** `<Datei>` …
   - **Ursache:** …
   - **Folge:** <konkretes Szenario>

   ## Vorschlag

   …

   ## Akzeptanzkriterien

   - [ ] …

   Refs #<PR>, #<issue>
   ```

   - **Titel:** knapp und für sich verständlich, mit Komponente vorn (z. B. „kol-select: leere Optgroups
     werden nicht mehr gerendert – Verhalten dokumentieren“).
   - **Typ:** `Bug` für Fehlverhalten, `Task` für Doku, Tests und Aufräumen.
   - **Labels:** keine `release:*`-Labels setzen, die gehören an PRs.
   - Keine Zuweisung, kein Milestone. Das entscheidet das Team.

4. **Verlinken:** Die Nennung von `#<PR>` im Text erzeugt im PR automatisch einen Querverweis auf das neue
   Issue. Ist der PR noch offen und wird danach `comment` ausgeführt, verweist der Kommentar auf das
   Ticket (Abschnitt 7). Einen eigenen Kommentar nur für den Link nicht posten.
5. **Antwort im Chat:** eine Tabelle mit ID, neuem Issue (Link und Titel) und Ursprungs-PR, dazu die
   übersprungenen Punkte mit Grund (Dublette, „Folge-Ticket: nein“).

## Referenzbeispiel

Bewertung vom Oktober 2026 für vier PRs eines externen Contributors (#11082 war bei der Bewertung schon
gemergt und wurde als Referenz aufgenommen).

| PR                                                                                                                     | Gesamt | Kurzbeschreibung                                                                             | Minimalistisch & korrekt zum Issue                                                                                                                                                                                                  | Sauber & ordentlich                                                                             | Sicher       |
| ---------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| [#11082](https://github.com/public-ui/kolibri/pull/11082) Select: deaktivierte Optgroups (#10864), **bereits gemergt** | 🟡     | Die Weitergabe von `disabled` und die Vorauswahl sind korrekt behoben.                       | 💡 **hint**: eine Änderung außerhalb des Issues (OOS-1)                                                                                                                                                                             | ✅ **ready**                                                                                    | ✅ **ready** |
| [#11084](https://github.com/public-ui/kolibri/pull/11084) Zähler zur Laufzeit (#11052)                                 | 🟡     | Der Fehler ist korrekt behoben, und die Verzögerung der Screenreader-Ansage bleibt erhalten. | 💡 **hint**: zwei Änderungen außerhalb des Issues (OOS-2, OOS-3)                                                                                                                                                                    | ✅ **ready**                                                                                    | ✅ **ready** |
| [#11086](https://github.com/public-ui/kolibri/pull/11086) `aria-describedby`/`aria-invalid` (#11035)                   | 🔴     | Die ARIA-Logik ist korrekt, und es gibt keine visuellen Änderungen.                          | ⚠️ **warn**: `!important` auf allen Eigenschaften von `.visually-hidden`. Das wirkt global, Themes können es nicht mehr übersteuern. Nötig ist es nur für die belegten Eigenschaften (`position`, `margin`, `padding`). Dazu OOS-4. | 💡 **hint**: Das Label `release:theming` fehlt, obwohl ein zusätzliches Element gerendert wird. | ✅ **ready** |
| [#11087](https://github.com/public-ui/kolibri/pull/11087) `has-value` sofort (#11053)                                  | 🟡     | Korrekt und klein.                                                                           | 💡 **hint**: drei jetzt überflüssige Zuweisungen an `hasValue`                                                                                                                                                                      | 💡 **hint**: Die PR-Beschreibung ist veraltet (`kol-input-number`).                             | ✅ **ready** |

**Out-of-Scope-Hinweise**

| ID    | PR     | Änderung                                                                                                                                                           | Bewertung                                                    | Folge-Ticket?                                                                             |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| OOS-1 | #11082 | Leere Optgroups (`{ label, options: [] }`) werden nicht mehr gerendert (`select.tsx`), mit eigenem Test.                                                           | harmlos, bereits in `develop`                                | Ticket, das die Änderung nachträglich dokumentiert, ggf. mit Changelog-Eintrag.           |
| OOS-2 | #11084 | Im Zähler ersetzt `classList.add`/`remove` das `classList.toggle(token, force)`, weil das Test-DOM `force` falsch auswertet. 7 Unit-Snapshots ändern sich dadurch. | harmlos, im Browser ohne Wirkung                             | Ticket „Test-DOM: `classList.toggle(force)` falsch ausgewertet“. Aus dem PR herausnehmen. |
| OOS-3 | #11084 | `instanceof HTMLTextAreaElement` in `textarea.handleTextareaInput` wird zu einer reinen Null-Prüfung.                                                              | harmlos, `ctaRef` ist typisiert                              | Zusammen mit OOS-2. Aus dem PR herausnehmen.                                              |
| OOS-4 | #11086 | `position: relative` an `.kol-alert` im Theme kern entfernt.                                                                                                       | harmlos, durch `position: fixed !important` nicht mehr nötig | Kein Ticket. Aus dem PR herausnehmen.                                                     |

Was dieses Beispiel zeigt:

- Eine harmlose Verhaltensänderung außerhalb des Issues (OOS-1) ist **hint**, kein **warn**, und kommt
  in den Out-of-Scope-Block.
- Eine Lösung, die das Issue trifft, aber global mehr bewirkt als nötig (#11086), ist **warn**.
- Ein einziger **hint** reicht, damit ein PR nicht grün ist (#11087).
- Nicht überflüssig war die doppelte Flag-Logik in `textarea` (#11084), weil `kol-textarea` nicht von der
  gemeinsamen Basis der Textfelder erbt.
