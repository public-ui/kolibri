---
name: issue-bewerten
description: Sucht das älteste offene GitHub-Issue im KoliBri-Repo, das nicht das Label `icebox` trägt, prüft es gegen den heutigen Stand von Code, Doku, PRs und anderen Issues auf Gültigkeit und gibt eine begründete Empfehlung (umsetzen, Scope anpassen, icebox, schließen, klären). Nutze diesen Skill immer, wenn der Nutzer Backlog-Pflege, Issue-Triage oder das Aufräumen alter Issues angeht – auch bei Formulierungen wie "nimm dir das älteste Issue vor", "ist das alte Ticket noch aktuell", "Backlog-Hygiene", "welches Issue liegt am längsten rum", "lohnt sich das noch" oder "nächstes Issue triagieren".
---

# Ältestes Issue bewerten

Der Backlog von KoliBri enthält Issues aus mehreren Major-Versionen. Viele alte Issues sind inzwischen
erledigt, überholt oder nie priorisiert worden – sie verstopfen die Liste und kosten bei jeder Sichtung
Aufmerksamkeit. Dieser Skill arbeitet den Backlog von hinten ab: **immer das älteste offene Issue ohne
`icebox`**, eins pro Aufruf, mit einer klaren Empfehlung.

Das Ergebnis ist **eine Empfehlung im Chat**. Der Skill ändert am Issue nichts von selbst (kein
Kommentar, kein Label, kein Schließen) – das entscheidet der Nutzer. Erst die Folgeaktion (icebox setzen,
schließen, umsetzen) sorgt dafür, dass beim nächsten Aufruf ein anderes Issue drankommt; deshalb am Ende
die passende Aktion anbieten.

## 1. Issue finden

```bash
gh issue list --repo public-ui/kolibri --state open --search "-label:icebox sort:created-asc" --limit 1 \
  --json number,title,createdAt,updatedAt,labels,author,milestone,assignees
```

- Das Label heißt exakt `icebox` (klein geschrieben).
- Hat der Nutzer eine Issue-Nummer genannt, diese statt des ältesten nehmen.
- Kurz nennen, welches Issue es ist (Nummer, Titel, Alter), dann weiter.

## 2. Issue vollständig lesen

```bash
gh issue view <NR> --repo public-ui/kolibri --comments
gh api repos/public-ui/kolibri/issues/<NR>/timeline --paginate \
  --jq '.[] | select(.event=="cross-referenced" or .event=="referenced" or .event=="closed" or .event=="reopened" or .event=="labeled") | {event, created_at, label: .label.name, source: .source.issue.html_url, state: .source.issue.state, commit: .commit_id}'
```

Beim Lesen einordnen:

- **Stale-Bot-Kommentare** („automatically marked as stale“ / „closed because it has been stale“) sind
  Rauschen. Aussagekräftig ist nur, ob danach jemand wieder geöffnet oder Bedarf bekundet hat – das ist
  ein Signal für echten Bedarf.
- **„🤖 AI Analysis“-Kommentare** und das Label `ai:analyzed` stammen aus einer früheren automatischen
  Analyse. Als Hinweis nutzen, aber nicht übernehmen – sie können veraltet sein und wurden selbst nicht
  gegen den Code geprüft.
- **Querverweise** (verlinkte PRs, Issues, Commits) sind die wertvollste Spur: Ein gemergter PR oder
  ein geschlossenes Folge-Issue bedeutet oft, dass das Thema ganz oder teilweise erledigt ist.
- **Wer fragt?** Externe Nutzer, Reaktionen (👍) und mehrere Stimmen sprechen für echten Bedarf; ein
  einzelner interner Gedanke ohne Resonanz eher nicht.

## 3. Gegen den heutigen Stand prüfen

Das ist der Kern. Ein Issue ist nicht „alt, also weg“ – es kann aktueller sein denn je. Die Frage ist:
**Stimmt die Problembeschreibung heute noch, und passt die gewünschte Lösung noch zum Projekt?**

Konkret prüfen, soweit für das Issue relevant:

1. **Code**: Genannte Komponenten, Properties, Dateien, Pakete oder Fehlermeldungen im aktuellen Code
   suchen (`packages/`). Existiert das noch? Ist das Verhalten schon umgesetzt oder anders gelöst? Bei
   Bugs: Ist die fehlerhafte Stelle noch so vorhanden?
2. **Historie**: `git log --oneline -i --grep="<Stichwort>"` und `git log -S "<Symbol>"` für Commits,
   die das Thema berühren, ohne das Issue zu verlinken.
3. **Andere Issues/PRs**: Nach Duplikaten oder Nachfolgern suchen, offen und geschlossen:
   `gh search issues --repo public-ui/kolibri "<Stichwort>"` und `gh search prs --repo public-ui/kolibri "<Stichwort>"`.
4. **Versionsbezug**: Aktuelle Version steht in `packages/components/package.json`. Bezieht sich das
   Issue auf eine alte Major-Version (z. B. v1/v2), prüfen, ob das Konzept in der aktuellen noch existiert.
   `MIGRATION.md`, `KNOWN_ISSUES.md` und `docs/` können Aufschluss über bewusste Entscheidungen geben.
5. **Externe Bezüge**: Verlinkte externe Repos, Standards oder Tools (z. B. CMS-Versionen, Browser-APIs)
   nur so weit prüfen, wie es für das Urteil nötig ist.

Nicht jede Prüfung ist bei jedem Issue sinnvoll – ein Konzept-/Spike-Issue braucht eher den Abgleich mit
Roadmap und Doku, ein Bug eher den Code. Belege sammeln: Dateipfade mit Zeilen, Commit-Hashes,
Issue-/PR-Links. Eine Empfehlung ohne Belege ist wenig wert, weil der Nutzer sie dann selbst nachprüfen muss.

## 4. Urteil bilden

Eine der folgenden Empfehlungen wählen:

| Empfehlung                         | Wann                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Umsetzen**                       | Problem besteht weiter, Lösung passt zum heutigen Projekt, und Aufwand oder Bedarf rechtfertigen es, jetzt Zeit zu investieren.                                        |
| **Umsetzen mit angepasstem Scope** | Kern ist gültig, aber Teile sind erledigt, überholt oder die Lösung muss neu gedacht werden – und Aufwand/Bedarf rechtfertigen weiterhin eine Umsetzung.               |
| **Icebox**                         | Grundsätzlich gültig, aber Aufwand und aktuelle Nachfrage stehen in keinem guten Verhältnis zu den vielen anderen offenen Issues; nicht falsch, nur (noch) nicht dran. |
| **Schließen**                      | Erledigt, überholt, Duplikat oder passt nicht (mehr) zur Ausrichtung des Projekts. Grund benennen.                                                                     |
| **Klärung nötig**                  | Ohne Rückfrage an Autor/Team nicht entscheidbar. Die konkrete offene Frage formulieren.                                                                                |

Abwägen: Nutzen (wer profitiert, wie viele), Aufwand (grob: klein/mittel/groß), Risiko (Breaking
Change?) und Bedarf (Resonanz). Wenn das Urteil knapp ist, das ehrlich sagen und das ausschlaggebende
Argument nennen, statt eine Scheinsicherheit zu erzeugen.

**Aufwand zählt doppelt.** Der Backlog hat typischerweise weit über 100 offene Issues – ein grober
aktueller Wert steht mit `gh issue list --repo public-ui/kolibri --state open --json number --jq length`
schnell fest. Zeit zum Umsetzen ist der knappste Faktor, nicht die Frage, ob ein Thema inhaltlich noch
stimmt. Ein großes, aufwendiges Issue konkurriert um dieselbe Kapazität wie viele kleine, schnell
erledigte – „das Problem besteht noch“ ist deshalb eine notwendige, aber keine hinreichende Bedingung
für „Umsetzen“. Bei großem Aufwand (neue öffentliche Komponente, größerer Umbau, mehrwöchiges Vorhaben)
nur dann zu **Umsetzen**/**angepasstem Scope** raten, wenn zusätzlich ein spürbares, aktuelles
Bedarfssignal vorliegt (aktive externe Nachfrage, wiederkehrende Duplikate, blockiert andere Arbeit).
Fehlt dieses Signal, eher zu **Icebox** raten, auch wenn der Kern des Issues nach wie vor richtig ist –
Icebox heißt „richtig, aber angesichts des restlichen Backlogs nicht jetzt“, nicht „falsch“. Bei einem
sehr alten, breiten Spike-/Epic-Issue ist Icebox oft die ehrlichere Antwort als ein optimistisches
„Umsetzen mit angepasstem Scope“, das den tatsächlichen Aufwand kleinredet.

**Bei neuen Komponenten oder neuen Features den vollen Aufwand ansetzen, nicht nur den Komponenten-Code.**
Eine neue Komponente oder ein sichtbares neues Feature zieht bei KoliBri typischerweise mit:

- Beispiel/Doku in der Presentation-App ergänzen,
- Dokumentation anpassen,
- eigene Barrierefreiheits-Prüfung (Axe u. Ä.),
- **alle Themes** anpassen, damit es optisch korrekt aussieht – aktuell 6 öffentliche (`packages/themes/{default,bwst,desy,ecl,itzbund,kern}`) plus 2 interne Themes (nicht in diesem Repo, aber genauso zu berücksichtigen).

Das macht den Aufwand fast jeder neuen Komponente real „groß“, auch wenn der reine Komponenten-Code
selbst überschaubar wirkt oder schon als Entwurf vorliegt. Diesen vollen Aufwand explizit in der
Abwägung benennen, nicht nur den Implementierungsteil.

**Bedarf durch Dritte rechtfertigt für sich allein noch keine eigene Umsetzung.** KoliBri ist Open
Source: Wer ein Feature dringend braucht, kann es auch selbst beitragen. Ein einzelner fast fertiger,
aber nicht weitergeführter externer PR oder eine allgemeine Nachfrage sind kein hinreichender Grund,
warum das Team selbst den (gerade bei neuen Komponenten oft großen) Aufwand tragen sollte. Nur wenn
jemand aktuell aktiv daran arbeitet oder verbindlich weitermachen will, zählt das als starkes
Bedarfssignal für **Umsetzen**; ansonsten eher zu **Icebox** raten und im Issue vermerken, dass ein
Community-Beitrag willkommen wäre.

## 5. Ausgabe

Im Chat, auf Deutsch, in dieser Struktur:

```markdown
## #<NR> – <Titel>

<Link> · erstellt <Datum> (vor <n> Jahren/Monaten) · Labels: <…>

**Empfehlung: <Umsetzen | Umsetzen mit angepasstem Scope | Icebox | Schließen | Klärung nötig>**
<1–2 Sätze: das ausschlaggebende Argument>

### Worum es geht

<2–4 Sätze Zusammenfassung des Anliegens in heutiger Sprache>

### Gültigkeit heute

- <Befund mit Beleg (Datei:Zeile, Commit, #Issue/PR)>
- …
  <falls der Issue-Body selbst eine Checkliste (`- [x]`/`- [ ]`) enthält: sie hier als aktualisierte
  Kurz-Checkliste spiegeln (✅ erledigt / ❌ offen je Punkt, mit Beleg), statt sie nur in Fließtext
  aufzulösen – das lässt sich für Maintainer am schnellsten mit dem Original abgleichen>

### Abwägung

- Nutzen: …
- Aufwand: klein/mittel/groß – <warum>
- Bedarf/Resonanz: …
- Risiken: …

### Falls umgesetzt wird

<nur bei „Umsetzen“/„angepasster Scope“: aktualisierter Scope in wenigen Stichpunkten>

### Vorgeschlagene Folgeaktion

<z. B. „Label `icebox` setzen“, „Schließen mit Kommentar: …“, „Scope im Issue aktualisieren“>
```

Danach fragen, ob die vorgeschlagene Folgeaktion ausgeführt werden soll. Erst bei ausdrücklicher
Zustimmung handeln (Kommentar posten, Label setzen, Issue schließen) – das ist nach außen sichtbar und
betrifft ein öffentliches Repo. Einen Kommentar am Issue auf Deutsch oder in der Sprache des Issues
verfassen und vor dem Posten zeigen.

Ein Kommentarentwurf muss für sich stehen, auch für Leser:innen ohne diesen Chat-Kontext: Sätze wie
„Danke für die erneute Analyse“ setzen voraus, dass klar ist, wer/was gemeint ist. Lieber konkret
benennen (z. B. „Danke an die automatische Analyse vom TT.MM. – …“) oder ganz ohne Dank direkt mit dem
Befund einsteigen.
