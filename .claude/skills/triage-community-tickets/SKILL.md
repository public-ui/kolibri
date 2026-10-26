---
name: triage-community-tickets
description: Findet offene GitHub-Issues in public-ui/kolibri, die erfahrene Contributor ohne Maintainer-Hilfe umsetzen können (klarer Scope, keine offenen Entscheidungen, keine Abhängigkeiten, niemand arbeitet dran), und berichtet sie als bewertete Liste; good-first-issue-Tickets werden ausgenommen. Nutze diesen Skill immer, wenn normale Community-Tickets oder Selbstbedienungs-Tickets gesucht werden – auch bei Formulierungen wie "welche Tickets kann man alleine machen", "Tickets ohne Absprache", "was können Externe übernehmen", "Backlog nach bearbeitbaren Issues durchsuchen" oder "normale Tickets neben den good first issues".
---

# Community-Ticket-Triage

Dieser Skill ist rein berichtend: Er ändert nichts an GitHub, sondern liefert eine
bewertete Kandidatenliste. Er ergänzt `triage-good-first-issues` (filtert Einsteiger-Tickets
und labelt sie nach Bestätigung) und `issue-bewerten` (prüft das älteste offene Issue
einzeln auf Gültigkeit). Einsteigerfreundlichkeit ist hier kein Kriterium; die Tickets
dürfen mittlerer bis großer Umfang sein, solange sie solotauglich sind.

## 1. Menge eingrenzen

Grundlage sind alle offenen Issues und alle offenen PRs:

```bash
gh issue list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,labels,assignees > /tmp/issues.json
gh pr list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,headRefName,body > /tmp/prs.json
```

Beanspruchte Issues aussortieren (kein Assignee, von keinem offenen PR referenziert):

```bash
jq -r '.[] | (.title + " " + .headRefName + " " + (.body // ""))' /tmp/prs.json \
  | grep -oE '#[0-9]+' | tr -d '#' | sort -n | uniq > /tmp/pr-refs.txt
jq -r '.[] | select((.assignees|length)==0) | "\(.number)\t\(.title)\t\([.labels[].name]|join(","))"' /tmp/issues.json \
  | awk -F'\t' 'BEGIN{while((getline l < "/tmp/pr-refs.txt")>0) ref[l]=1} !($1 in ref)' \
  | awk -F'\t' '$3 !~ /good first issue|unclear|need:|to-answer-and-close|po:doing|intern|icebox|Stale|breaking-change|v5/'
```

Für jeden Kandidaten, der es in die engere Wahl schafft, zusätzlich die Timeline auf
cross-referenced PRs prüfen:

```bash
gh api repos/public-ui/kolibri/issues/<NR>/timeline --paginate \
  --jq '[.[] | select(.event=="cross-referenced") | .source.issue] | map(select(.pull_request)) | .[] | "#\(.number) [\(.state)] \(.title)"'
```

## 2. Kriterien „ohne Maintainer-Hilfe umsetzbar"

Alle Kriterien müssen erfüllt sein:

1. **Selbstständiger Scope** – Problem und Ziel sind im Issue erkennbar oder aus dem Code
   eindeutig ableitbar; die Lösung erfordert keine Absprache über Schnittstellen, Naming
   oder Design.
2. **Keine offenen Entscheidungen** – keine Formulierungen wie „decision needed", „UX
   Fragen", „Alternativer Ansatz", kein Verweis auf laufende Diskussionen (PO, BF150).
   Features mit Gestaltungsspielraum fallen durch: neue Komponenten, neue Varianten,
   API-Erweiterungen, neue Übersetzungsstrategien.
3. **Keine Abhängigkeiten** – kein „zuerst X mergen", kein Folgeticket eines offenen
   Vorgängers, kein Teil eines Epic-Arbeitsplans, kein Konflikt mit einem laufenden PR am
   selben Komponentengebiet.
4. **Keine Maintainer-Ressourcen nötig** – kein Repo-Admin (History-Rewrite, Repo-Anlage),
   keine Zugänge oder externen Freigaben (Designsystem-Go, Organisations-Entscheidungen),
   keine Release-Koordination. Breaking Changes und Umbenennungen öffentlicher Props
   scheiden damit aus, auch wenn sie nicht entsprechend gelabelt sind.
5. **Keine Theming-Contract-Änderungen** – BEM-Klassen und Shadow-DOM-Struktur sind ein
   Theming-Vertrag; ihre Änderung läuft über den Release- und Theming-Prozess mit
   Label `release:theming` und ist damit kein Solistenticket.
6. **Eigenständig verifizierbar** – der Nachweis (Unit-Test, Snapshot, Sample, visuelle
   Prüfung im Sample-React) ist ohne Maintainer möglich.
7. **Lebendigkeitsprüfung** – das beschriebene Verhalten gegen den aktuellen Stand von
   `release/4` verifizieren, bei alten Tickets zwingend. Ein geschlossener PR mit
   passendem Titel kann das Issue erledigt haben, ohne dass es geschlossen wurde
   (Beispiel #11052 und PR #11084; auch #10865 und #9649 wurden so als teilerledigt
   bzw. veraltet erkannt).

## 3. Konfliktprüfung unter den Ergebnissen

Betreffen mehrere Kandidaten dasselbe Komponentengebiet (beispielsweise zwei Tickets zu
`kol-meter`, während ein Meter-PR läuft), wird nur eines berichtet und der Rest mit
Konfliktvermerk geführt.

## 4. Bericht

Tabelle je Ticket: Issue, Umfang (S/M/L), Kategorie (Bug, Doku, Sample, Refactor,
Test-Infra), Warum ohne Maintainer machbar, offene Vorbehalte (zum Beispiel ausstehende
Lebendigkeitsprüfung, dünne Beschreibung). Sortiert nach Klarheit der Beschreibung.

Der Bericht ändert nichts an GitHub. Ein Label für diese Menge ist bewusst nicht
vorgesehen; Labeling passiert ausschließlich über den `triage-good-first-issues`-Skill
und dessen Bestätigungs-Gate.
