← [Schritt 3 – Issue analysieren](03-issue-analysis.md)

# Schritt 4 – Branch erstellen

Erstelle einen Branch mit dem Schema `fix/issue-<nummer>-<kurz-slug>` (Beispiel: `fix/issue-342-button-aria-label`). Basis ist immer der aktuelle Default-Branch (`develop` in diesem Repo).

Melde: Branch-Name und Basis-Branch.

> **Hinweis für Remote-Sessions (Claude Code Web):** Der Branch wird lokal erstellt und mit `git push -u origin <branch>` gepusht. Der Upstream-Push erzeugt automatisch den PR-Link in der Remote-Ausgabe.

→ [Schritt 5 – Änderung umsetzen](05-implementation.md)
