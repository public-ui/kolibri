---
name: triage-contributor-tickets
description: Liest alle offenen GitHub-Issues in public-ui/kolibri, klassifiziert jedes freie Ticket in genau eine von drei Contributor-Kategorien (good first issue für Einsteiger, up-for-grabs für erfahrene Selbstbedienung, here-be-dragons als Warnung vor komplexen, fallstrickreichen Tickets) und setzt die Labels nach Bestätigung des Nutzers; Issues mit Klärungsbedarf erhalten `unclear`, alle übrigen bleiben ohne Label. Nutze diesen Skill immer, wenn Contributor-Tickets klassifiziert, gelabelt oder der Label-Stand aufgeräumt werden sollen – auch bei Formulierungen wie "klassifiziere das Backlog", "verteile die contributor labels", "welches Label bekommt welches Issue", "Label-Stand aufräumen" oder "triage alle issues".
---

# Contributor-Ticket-Triage

Dieser Skill führt die Ticket-Klassifizierung für Contributor in einem Durchlauf zusammen
und ersetzt die früheren Entwürfe `triage-good-first-issues` und
`triage-community-tickets`. Ein Durchlauf besteht aus Lesen, Klassifizieren und Berichten;
Labels werden ausschließlich nach Bestätigung des Nutzers gesetzt oder entfernt. Er
ergänzt `issue-bewerten`, das ein einzelnes ältestes Issue auf Gültigkeit prüft, ohne etwas
zu ändern.

## Kategorien

Die Beschreibungsqualität wird zuerst geprüft: Ist der Text eines freien Issues zu dünn
oder der nächste Schritt unklar, erhält es `unclear` und scheidet für die drei
Contributor-Labels aus. Danach gilt: `here-be-dragons` schlägt `up-for-grabs` (eine Falle
wird nicht als Selbstbedienung beworben), `up-for-grabs` gilt nur, wenn die
Einsteiger-Kriterien nicht erfüllt sind, `good first issue` nur bei voller
Einsteiger-Eignung.

| Label              | Bedeutung                     | Kernkriterien (alle erforderlich)                                                                                                                                            |
| ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unclear`          | Klärungsbedarf                | frei, aber der Text ist zu dünn oder der nächste Schritt ist unklar; kommt erst wieder in die Triage, wenn der Text nachgeschärft und das Label entfernt ist                 |
| `good first issue` | Einsteiger-Ticket             | frei; unkompliziert; abhängigkeitsfrei; sauber beschrieben (Problem, Ort, Soll, Nachweis — template-unabhängig); wirft wenige Fragen auf                                     |
| `up-for-grabs`     | Selbstbedienung für Erfahrene | frei; klarer Scope; keine offenen Entscheidungen; keine Maintainer-Ressourcen nötig; keine Theming-Contract-Änderung; eigenständig verifizierbar                             |
| `here-be-dragons`  | Warnung vor Fallstricken      | frei; komplex oder riskant mit Falle aus: Snapshot-Artefakt-Richtung, Theming-Contract, Zeitzonenlogik, TS-Typsystem, komponentenübergreifende Verträge, Sicherheitsrelevanz |
| (keins)            | alles übrige                  | beansprucht, design- oder release-koordiniert, Epic/Container                                                                                                                |

`unclear` ist damit zugleich Ausschluss und Ergebnis: Ausgegebene `unclear`-Labels halten
Issues aus der Triage heraus, bis der Text nachgeschärft und das Label entfernt ist.
Weitere Ausschlüsse per Label: `po:doing`, `need:reproduction`, `need:to-refine`,
`to-answer-and-close`, `intern`, `icebox`, `Stale`. Beanspruchte Issues (offener PR oder
Assignee) erhalten kein Label; trägt ein beanspruchtes Issue noch ein Label aus einem
früheren Lauf, schlägt der Bericht das Entfernen vor und normalisiert den Stand damit auf
„Label bedeutet: aktuell frei und klassifiziert“.

## 1. Menge einlesen

```bash
gh issue list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,labels,assignees > /tmp/issues.json
gh pr list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,headRefName,body > /tmp/prs.json
```

Beanspruchte Issues aussortieren (kein Assignee, von keinem offenen PR referenziert —
Issue-Nummern aus Titel, Branch-Name und Body aller offenen PRs):

```bash
jq -r '.[] | (.title + " " + .headRefName + " " + (.body // ""))' /tmp/prs.json \
  | grep -oE '#[0-9]+' | tr -d '#' | sort -n | uniq > /tmp/pr-refs.txt
jq -r '.[] | select((.assignees|length)==0) | "\(.number)\t\(.title)"' /tmp/issues.json \
  | awk -F'\t' 'BEGIN{while((getline l < "/tmp/pr-refs.txt")>0) ref[l]=1} !($1 in ref)'
```

Für jeden Kandidaten der engeren Wahl zusätzlich die Timeline auf cross-referenced PRs
prüfen. Ein geschlossener PR mit passendem Titel kann das Issue erledigt haben, ohne dass
es geschlossen wurde (Beispiele aus der Praxis: #11052 mit PR #11084, #10865 mit der
Skeleton-Migration #11113, #9649 vor der Migration).

## 2. Klassifizieren

Für jedes freie Issue in dieser Reihenfolge prüfen:

1. **Beschreibungsqualität:** Text zu dünn oder Ziel unklar → `unclear` vorschlagen.
2. **Dragons-Check:** berührt das Ticket einen der Fallstrickbereiche? Dann
   `here-be-dragons` vorschlagen, unabhängig vom Schwierigkeitsgrad im Übrigen.
3. **Einsteiger-Kriterien:** alle vier aus der Tabelle erfüllt → `good first issue`.
4. **Selbstbedienungs-Kriterien:** erfüllt, ohne einsteigertauglich zu sein →
   `up-for-grabs` (Umfang S bis L erlaubt).
5. **Sonst:** kein Label-Vorschlag, mit kurzem Grund (beispielsweise design- oder
   release-koordiniert).

Zusatzprüfungen für Label-Vorschläge von `good first issue` und `up-for-grabs`:

- **Lebendigkeitsprüfung:** das beschriebene Verhalten gegen den aktuellen Stand von
  `release/4` verifizieren, bei alten Tickets zwingend. Teilerledigte Issues werden
  rescoped oder ohne Label geführt.
- **Konfliktprüfung:** dasselbe Komponentengebiet mehrfach in der Wahl → nur ein Ticket
  bekommt den Vorschlag, der Rest wird mit Konfliktvermerk berichtet.

## 3. Bericht

Tabelle je freiem Issue: Label-Vorschlag (oder „keins“ mit Grund), Umfang (S/M/L),
Kategorie (Bug, Doku, Sample, Refactor, Test-Infra), Begründung, offene Vorbehalte.
Daneben die Differenz zum aktuellen Label-Stand: welche Labels gesetzt, welche entfernt
(beziehungsweise an beanspruchten Issues vorsorglich zum Entfernen vorgeschlagen) würden.

## 4. Anwenden (nur nach Bestätigung)

Erst nach ausdrücklicher Bestätigung des Nutzers:

```bash
gh issue edit <NR> --repo public-ui/kolibri --add-label "up-for-grabs"
gh issue edit <NR> --repo public-ui/kolibri --remove-label "good first issue"
```

Anschließend jede betroffene Label-Abfrage verifizieren und als Linkliste melden. Der
Label-Stand ist eine Momentaufnahme: Neue PRs können Tickets jederzeit beanspruchen, der
nächste Durchlauf normalisiert das.
