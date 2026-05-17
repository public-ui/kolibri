← [Schritt 1 – Contributor-Liste ermitteln](01-contributors.md)

# Schritt 2 – Issue auswählen

Hole alle offenen Issues (keine PRs). Filtere heraus:

- Issues von internen Autoren (`author_association` ∈ COLLABORATOR / CONTRIBUTOR / MEMBER / OWNER)
- Issues mit bereits verlinktem PR – prüfe über eine PR-Suche mit `Closes #<nr>` im Body
- Issues mit Label `wont-fix`, `duplicate` oder `invalid`
- Reine Diskussionen ohne konkreten Umsetzungsauftrag

Bevorzuge bei mehreren Kandidaten:
1. Bug-Reports mit reproduzierbaren Schritten
2. Issues mit vielen Reaktionen
3. Älteste Issues zuerst

Wähle genau ein Issue. Wenn kein geeignetes gefunden wird, Routine mit Bericht beenden.

Melde: Anzahl offener Issues, Anzahl nach Filter, gewähltes Issue und kurze Begründung.

→ [Schritt 3 – Issue analysieren](03-issue-analysis.md)
