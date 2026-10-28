---
name: triage-contributor-tickets
description: Liest alle offenen GitHub-Issues in public-ui/kolibri, klassifiziert jedes freie Ticket in genau eine von drei Contributor-Kategorien (Good first issue für Einsteiger, Up for grabs für erfahrene Selbstbedienung, Here be dragons als Warnung vor komplexen, fallstrickreichen Tickets) und setzt den Wert des Org-Issue-Felds `Triage` nach Bestätigung des Nutzers; Issues mit Klärungsbedarf erhalten den Triage-Wert `Unclear`, alle übrigen bleiben ohne Feldwert. Nutze diesen Skill immer, wenn Contributor-Tickets klassifiziert, eingestuft oder der Triage-Stand aufgeräumt werden sollen – auch bei Formulierungen wie "klassifiziere das Backlog", "verteile die contributor kategorien", "welche Einstufung bekommt welches Issue", "Triage-Stand aufräumen" oder "triage alle issues".
---

# Contributor-Ticket-Triage

Dieser Skill führt die Ticket-Klassifizierung für Contributor in einem Durchlauf zusammen
und ersetzt die früheren Entwürfe `triage-good-first-issues` und
`triage-community-tickets`. Ein Durchlauf besteht aus Lesen, Klassifizieren und Berichten;
Feldwerte werden ausschließlich nach Bestätigung des Nutzers gesetzt oder entfernt. Er
ergänzt `issue-bewerten`, das ein einzelnes ältestes Issue auf Gültigkeit prüft, ohne etwas
zu ändern.

Die Einstufung liegt im Org-Issue-Field `Triage` (Single-Select, Sichtbarkeit nur innerhalb
der Organisation), nicht in Labels. Das Feld hat genau einen Wert pro Issue; eine
Mehrfach-Einstufung ist damit ausgeschlossen.

## Kategorien

Die Beschreibungsqualität wird zuerst geprüft: Ist der Text eines freien Issues zu dünn
oder der nächste Schritt unklar, erhält es den Triage-Wert `Unclear` und scheidet für die drei
Contributor-Kategorien aus. Danach gilt: `Here be dragons` schlägt `Up for grabs` (eine Falle
wird nicht als Selbstbedienung beworben), `Up for grabs` gilt nur, wenn die
Einsteiger-Kriterien nicht erfüllt sind, `Good first issue` nur bei voller
Einsteiger-Eignung.

| Triage-Wert        | Bedeutung                     | Kernkriterien (alle erforderlich)                                                                                                                                            |
| ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Unclear`          | Klärungsbedarf                | frei, aber der Text ist zu dünn oder der nächste Schritt ist unklar; kommt erst wieder in die Triage, wenn der Text nachgeschärft und der Wert entfernt ist                  |
| `Good first issue` | Einsteiger-Ticket             | frei; unkompliziert; abhängigkeitsfrei; sauber beschrieben (Problem, Ort, Soll, Nachweis — template-unabhängig); wirft wenige Fragen auf                                     |
| `Up for grabs`     | Selbstbedienung für Erfahrene | frei; klarer Scope; keine offenen Entscheidungen; keine Maintainer-Ressourcen nötig; keine Theming-Contract-Änderung; eigenständig verifizierbar                             |
| `Here be dragons`  | Warnung vor Fallstricken      | frei; komplex oder riskant mit Falle aus: Snapshot-Artefakt-Richtung, Theming-Contract, Zeitzonenlogik, TS-Typsystem, komponentenübergreifende Verträge, Sicherheitsrelevanz |
| (kein Wert)        | alles übrige                  | beansprucht, design- oder release-koordiniert, Epic/Container                                                                                                                |

`Unclear` ist damit zugleich Ausschluss und Ergebnis: Ausgegebene `Unclear`-Werte halten
Issues aus der Triage heraus, bis der Text nachgeschärft und der Wert entfernt ist.
Weitere Ausschlüsse: die Labels `po:doing`, `need:reproduction`, `need:to-refine`,
`to-answer-and-close`, `intern`, `Stale` und der Triage-Wert `Icebox` (bewusst aus der
Bewertung genommen, wird von diesem Skill weder gesetzt noch überschrieben). Beanspruchte
Issues (offener PR oder Assignee) erhalten keinen Wert; trägt ein beanspruchtes Issue noch
einen Wert aus einem früheren Lauf, schlägt der Bericht das Entfernen vor und normalisiert
den Stand damit auf „Wert bedeutet: aktuell frei und klassifiziert“. Aus dem ersten Lauf:
#11317 wurde extern geschlossen, #11146 hatte fremd ein `good first issue` erhalten — beides
wurde im selben Zug normalisiert.

## 1. Menge einlesen

```bash
gh issue list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,labels,assignees > /tmp/issues.json
gh pr list --repo public-ui/kolibri --state open --limit 300 \
  --json number,title,headRefName,body > /tmp/prs.json
```

Der aktuelle Triage-Stand steht nicht in `--json`, sondern kommt aus der Suche über das Feld:

```bash
for v in "Good first issue" "Up for grabs" "Here be dragons" "Icebox" "Unclear"; do
  gh issue list --repo public-ui/kolibri --state open --limit 300 \
    --search "field.Triage:\"$v\"" --json number --jq "map(.number) | \"$v: \\(.)\""
done
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

1. **Beschreibungsqualität:** Text zu dünn oder Ziel unklar → `Unclear` vorschlagen.
2. **Dragons-Check:** berührt das Ticket einen der Fallstrickbereiche? Dann
   `Here be dragons` vorschlagen, unabhängig vom Schwierigkeitsgrad im Übrigen.
3. **Einsteiger-Kriterien:** alle vier aus der Tabelle erfüllt → `Good first issue`.
4. **Selbstbedienungs-Kriterien:** erfüllt, ohne einsteigertauglich zu sein →
   `Up for grabs` (Umfang S bis L erlaubt).
5. **Sonst:** kein Wert-Vorschlag, mit kurzem Grund (beispielsweise design- oder
   release-koordiniert).

Zusatzprüfungen für Vorschläge von `Good first issue` und `Up for grabs`:

- **Lebendigkeitsprüfung:** das beschriebene Verhalten gegen den aktuellen Stand von
  `release/4` verifizieren, bei alten Tickets zwingend. Teilerledigte Issues werden
  rescoped oder ohne Wert geführt.
- **Konfliktprüfung:** dasselbe Komponentengebiet mehrfach in der Wahl → nur ein Ticket
  bekommt den Vorschlag, der Rest wird mit Konfliktvermerk berichtet.

## 3. Bericht

Tabelle je freiem Issue: Triage-Vorschlag (oder „keiner“ mit Grund), Umfang (S/M/L),
Kategorie (Bug, Doku, Sample, Refactor, Test-Infra), Begründung, offene Vorbehalte.
Daneben die Differenz zum aktuellen Triage-Stand: welche Werte gesetzt, welche entfernt
(beziehungsweise an beanspruchten Issues vorsorglich zum Entfernen vorgeschlagen) würden.

## 4. Anwenden (nur nach Bestätigung)

Erst nach ausdrücklicher Bestätigung des Nutzers. Feld-ID `IFSS_kgDOAu3I4g`; Optionen:
`Good first issue` `IFSSO_kgDOBSCwQw`, `Up for grabs` `IFSSO_kgDOBSCwRA`,
`Here be dragons` `IFSSO_kgDOBSCwRQ`, `Icebox` `IFSSO_kgDOBSCwRg`, `Unclear` `IFSSO_kgDOBSCwRw`. Die Issue-ID liefert
`gh issue view <NR> --repo public-ui/kolibri --json id`.

`updateIssueField` ersetzt die gesamte Optionsliste, löscht dabei alle Feldwerte und vergibt neue Option-IDs; ein
Name, der noch als Option existiert, wird abgelehnt. Optionen deshalb nur mit einem Snapshot der Werte
ändern und danach die IDs hier und in `issue-bewerten` nachziehen.

Wert setzen oder ändern (ersetzt einen vorhandenen Wert):

```bash
gh api graphql -f query='mutation($i:ID!,$o:ID!){ setIssueFieldValue(input:{issueId:$i,issueFields:[{fieldId:"IFSS_kgDOAu3I4g",singleSelectOptionId:$o}]}){ clientMutationId } }' \
  -f i=<ISSUE_ID> -f o=<OPTION_ID>
```

Wert entfernen:

```bash
gh api graphql -f query='mutation($i:ID!){ setIssueFieldValue(input:{issueId:$i,issueFields:[{fieldId:"IFSS_kgDOAu3I4g",delete:true}]}){ clientMutationId } }' \
  -f i=<ISSUE_ID>
```

Anschließend jede betroffene Abfrage per Suche `field.Triage:"<Wert>"` verifizieren und als
Linkliste melden; Werte an geschlossenen oder zwischenzeitlich beanspruchten Issues werden
entfernt. Der Triage-Stand ist eine Momentaufnahme: Neue PRs können Tickets jederzeit
beanspruchen, der nächste Durchlauf normalisiert das.
