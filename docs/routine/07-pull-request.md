← [Schritt 6 – Qualität prüfen](06-quality.md)

# Schritt 7 – Pull Request erstellen

Committe die Änderungen auf dem Fix-Branch und pushe:

```bash
git add <geänderte Dateien>
git commit -m "fix: <kurze Beschreibung> (#<issue-nummer>)"
git push -u origin <branch-name>
```

Erstelle den PR über das GitHub MCP-Tool `mcp__github__create_pull_request` (kein `gh`-CLI verfügbar in Remote-Sessions).

PR-Titel: `fix: <kurze Beschreibung> (#<issue-nummer>)`

PR-Body muss enthalten:

- `Closes #<issue-nummer>`
- Kurze Beschreibung was geändert wurde und warum
- Falls Checks übersprungen wurden: Hinweis, dass CI die Prüfung übernimmt
- `This PR addresses a community-reported issue.`

Melde: PR-URL sobald erstellt.

→ [Schritt 8 – Statusbericht](08-status.md)
