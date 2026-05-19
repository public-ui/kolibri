← [Schritt 5 – Änderung umsetzen](05-implementation.md)

# Schritt 6 – Qualität prüfen

Führe soweit verfügbar aus: TypeCheck, Linting, Unit-Tests des betroffenen Moduls, Build (Smoke-Check).

> **Wenn `node_modules` nicht installiert sind** (häufig in Remote-Sessions): Überspringe Format, Lint und Tests. Notiere dies explizit im PR-Body. CI übernimmt die Checks nach dem Push.

Scheiternde Checks, die nicht durch eigene Änderung verursacht wurden: dokumentieren, nicht beheben.

Bei Fehlern durch eigene Änderung: beheben oder Branch verwerfen und Routine mit Bericht beenden.

Melde vor jedem Check welcher läuft, danach ✅ / ❌ / ⏭ mit Kurzgrund.

→ [Schritt 7 – Pull Request erstellen](07-pull-request.md)
