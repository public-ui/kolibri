# Definition of Done (DoD)

Bei der Erstellung von Pull Requests (PR) wurde bisher eine DoD-Liste erzeugt. Folgende Einträge waren in der Liste:

- Meaningful title for the release notes
- Pull request is linked to a problem
- All changes relate to the problem
- A11y tests performed successfully or not relevant
- Manual test performed successfully (by reviewer) or not relevant

Die Checkbox-Liste wurde in einem Gateway geprüft. Wenn nicht alle Punkte abgehakt waren, befand sich der PR im Fehlerstatus. Dadurch konnte man in der Übersicht der PRs nicht erkennen, welche PRs bereit zum Review sind, da von außen betrachtet nicht alle Quality-Gateways erfolgreich waren. Dies erschwerte das Bearbeiten der PRs erheblich.

Weiterhin soll aber darauf geachtet werden, dass jeder Pull-Request

- einen ausdrucksstarken Titel hat, da er in die Release-Notes übernommen wird
- immer einem Issue zugeordnet ist und
- alle Änderungen auch nur genau mit diesem Ticket zu haben.

Sollte das Ticket einen A11y-Test benötigen, ist ein neues Ticket anzulegen, in dem der Test beschrieben wird. Dieser kann dann vom Barrierefreiheitsteam bearbeitet werden.

Der manuelle Test ist vom Reviewer durchzuführen. Dieser gibt den PR nur frei, wenn auch der manuelle Test erfolgreich war.
