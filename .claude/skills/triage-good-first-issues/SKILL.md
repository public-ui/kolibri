---
name: triage-good-first-issues
description: Prüft offene GitHub-Issues in public-ui/kolibri darauf, ob sie für neue oder wenig erfahrene Entwickler geeignet sind (unkompliziert, abhängigkeitsfrei, sauber beschrieben, noch niemand arbeitet dran), auditiert die markierte Menge auf einheitliche Beschreibungsqualität und setzt nach Bestätigung des Nutzers das Label `good first issue`. Nutze diesen Skill immer, wenn Einsteiger-Tickets gesucht, gesammelt gelabelt oder auf Eignung geprüft werden sollen – auch bei Formulierungen wie "welche Tickets eignen sich für Einsteiger", "markiere gute Erst-Tickets", "gut für neue Entwickler", "Issues für die Einarbeitung finden", "Stilprüfung der good first issues" oder "welche Issues sind noch frei".
---

# Good-First-Issue-Triage

Dieser Skill arbeitet offene Issues als Menge ab und ermittelt, welche sich für neue oder
wenig erfahrene Entwickler eignen. Er ergänzt den `issue-bewerten`-Skill: Dort wird das
älteste offene Issue einzeln auf Gültigkeit geprüft und nur eine Empfehlung gegeben; hier
wird gefiltert, gestapelt geprüft und nach Bestätigung gelabelt.

Schritt 4 ändert öffentliche Daten (Label auf GitHub). Er läuft nur nach ausdrücklicher
Bestätigung des Nutzers; alles davor ist read-only.

## 1. Kandidaten finden

Grundlage sind alle offenen Issues und alle offenen PRs:

```bash
gh issue list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,labels,assignees > /tmp/issues.json
gh pr list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,headRefName,body > /tmp/prs.json
```

Beanspruchte Issues aussortieren. Ein Issue gilt als beansprucht, wenn es einen Assignee
hat oder von einem offenen PR referenziert wird (in Titel, Branch-Name oder Body):

```bash
jq -r '.[] | (.title + " " + .headRefName + " " + (.body // ""))' /tmp/prs.json \
  | grep -oE '#[0-9]+' | tr -d '#' | sort -n | uniq > /tmp/pr-refs.txt
jq -r '.[] | select((.assignees|length)==0) | "\(.number)\t\(.title)"' /tmp/issues.json \
  | awk -F'\t' 'BEGIN{while((getline l < "/tmp/pr-refs.txt")>0) ref[l]=1} !($1 in ref)'
```

Für jeden verbleibenden Kandidaten die Timeline auf cross-referenced PRs prüfen, weil die
Textsuche Verweise aus Forks und kommentarbezogenen Referenzen nicht immer findet:

```bash
gh api repos/public-ui/kolibri/issues/<NR>/timeline --paginate \
  --jq '[.[] | select(.event=="cross-referenced") | .source.issue] | map(select(.pull_request)) | .[] | "#\(.number) [\(.state)] \(.title)"'
```

Ausschlüsse ohne Einzelprüfung:

- Labels `po:doing`, `unclear`, `need:reproduction`, `need:to-refine`
- Epics und Containertickets (sie bündeln andere Tickets)
- Labels `breaking-change` und `v5` (Major-Change-Scope)

Wichtig: Ein geschlossener PR mit passendem Titel kann ein Issue erledigt haben, ohne dass
das Issue geschlossen wurde (Beispiel #11052 und PR #11084). Solche Tickets sind keine
Kandidaten mehr; das klärt die Lebendigkeitsprüfung in Schritt 2.

## 2. Inhaltliche Prüfung

Alle vier Kriterien müssen erfüllt sein. Die Prüfung ist inhaltlich, sie verlangt kein
bestimmtes Issue-Template:

1. **Unkompliziert** – eine Komponente oder eine abgegrenzte Dateigruppe, kein Entwurf
   über Paketgrenzen hinweg.
2. **Keine Abhängigkeiten** – kein „zuerst X mergen", kein Konflikt mit einem laufenden PR
   an derselben Stelle, kein Teil eines Epic-Arbeitsplans.
3. **Sauber beschrieben** – Problem benannt, Ort oder Scope erkennbar, Soll-Zustand
   vorhanden, Nachweis prüfbar (Test, Snapshot oder sichtbares Verhalten). Ein leerer oder
   nur aus Template-Boilerplate bestehender Text fällt durch.
4. **Einsteigertauglich** – keine offene Designentscheidung im Ticket (Formulierungen wie
   „gemäß Doku entscheiden" fallen durch), keine bekannten Stolperfelder (Zeitzonenlogik,
   TS-Mapped-Types, Snapshot-Artefakt-Richtung je Toolchain), nichts Sicherheits-Sensibles.

Zwei Zusatzprüfungen vor der Markierung:

- **Lebendigkeitsprüfung:** das beschriebene Fehlverhalten gegen den aktuellen Stand von
  `release/4` verifizieren. Bei alten Tickets ist das Pflicht, nicht optional.
- **Konfliktprüfung unter den Kandidaten:** betreffen zwei Tickets dieselbe Komponente,
  wird nur eines markiert, sonst konkurrieren die PRs um dieselben Stellen.

## 3. Stil-Audit der markierten Menge

Nach der Auswahl die gesamte markierte Menge gegen dieselbe Rubrik auditieren, je Ticket
eine Zeile: Kriterien erfüllt? Problem, Ort, Soll und Nachweis erkennbar?

Die Menge darf Familien mischen (Sample-Verbesserungen, kleine Komponenten-Fixes,
Doku- und A11y-Tickets); gleichbleibender Stil bedeutet hier inhaltliche Vollständigkeit
der Beschreibung, nicht Gleichheit der Textbausteine. Tickets mit Lücken fliegen aus der
Menge oder der Issue-Text wird vorab nachgebessert.

## 4. Markieren und melden

Das Label ist öffentlich sichtbar. Erst nach Bestätigung des Nutzers setzen:

```bash
gh issue edit <NR> --repo public-ui/kolibri --add-label "good first issue"
```

Anschließend über die Label-Abfrage verifizieren und als Linkliste melden:

```bash
gh issue list --repo public-ui/kolibri --label "good first issue" --state open \
  --json number,title --jq 'sort_by(.number) | .[] | "#\(.number) \(.title)"'
```

Das Label wird im Repo auch historisch für bereits beanspruchte Issues geführt. Der Bericht
weist deshalb aus, welche gelabelten Issues frei sind und welche bereits einen PR oder
Assignee haben.
