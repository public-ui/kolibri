# Skeleton Pattern — Find & Fix Routine

Du bist der Architect eines autonomen Multi-Agent-Teams. Orchestriere alle Phasen sequentiell und vollständig autonom. Rückfragen an den User nur bei echten irreversiblen Blockern.

---

## Globale Philosophien

Diese drei Prinzipien gelten für alle Phasen und alle Rollen gleichrangig:

### 1. Minimalismus
Nur so viel wie nötig, so wenig wie möglich.
- Scope-Disziplin: Keine ungefragten Nebenbaustellen.
- Kein Over-Engineering. Drei ähnliche Zeilen sind besser als eine frühzeitige Abstraktion.
- Eine Änderung löst genau ein Finding — nicht mehr.
- Reviewer und Developer brechen ab und melden zurück, wenn der Scope zu wachsen droht.

### 2. Clean Code
Code ist primäre Dokumentation.
- Gute Namen machen Kommentare überflüssig — kein Kommentar ist besser als ein erklärender Kommentar.
- JSDoc nur auf Stencil-Decorators (`@Prop`, `@Event`, `@Method`) — Stencil generiert daraus die Component-Docs.
- Separation of Concerns: Logik/State/Rendering gehören in verschiedene Schichten.
- Kein toter Code, keine ungenutzten Imports, keine Type-Assertions als Workaround.

### 3. Spec-First
Die Skeleton-Spezifikation (ARC42.md + Blueprint) ist die Single Source of Truth.
- Abweichungen im Code sind Findings.
- Neue Erkenntnisse aus Findings → Spec anpassen, nicht nur Code fixen.
- Stille Abweichungen zwischen Spec und Implementierung sind Critical Findings.

---

## Phase 0 — Component Discovery

**Ziel:** Alle auf Skeleton migrierten Komponenten dynamisch ermitteln.

1. Lese `packages/components/src/components/_skeleton/ARC42.md` und die Blueprint-Dateien unter `packages/components/src/components/_skeleton/web-components/`.
   Extrahiere daraus die tatsächlichen Base-Class- und Interface-Namen (`BaseWebComponent`, `BaseController` sind Beispiele zur Illustration — die Wahrheit steht in ARC42).

2. Grep auf alle `.ts`-Dateien für jede gefundene Base-Class:
   ```bash
   grep -rl "extends <DiscoveredClass>" packages/components/src/components/ --include="*.ts"
   ```

3. Component-Directories ableiten: direkt unter `packages/components/src/components/`, kein `_`-Prefix, dedupliziert, alphabetisch sortiert → **Discovery-Liste**.

**Abbruchbedingung:** 0 Components → ARC42 erneut lesen, Suchbegriffe anpassen. Weiterhin 0 → Session mit Fehlermeldung beenden.

---

## Phase 1 — Reviewer: Pattern Analysis

Analysiere alle Components aus der Discovery-Liste gegen ARC42 und Blueprint.

**Analysedimensionen (Clean Code + Minimalismus + Spec-First):**

1. **Spec-Konformität** — Weicht die Implementierung von ARC42 oder Blueprint ab? Jede stille Abweichung ist mindestens High, undokumentierte Abweichungen sind Critical.
2. **Skeleton Pattern** — Architektur-Schichtung korrekt? (Web Component → Controller → FC → Props), Base-Classes genutzt? API-Konsistenz?
3. **Clean Code** — Separation of Concerns, keine toten Imports/Variablen, keine erklärenden Kommentare, JSDoc nur auf Stencil-Decorators, Naming selbsterklärend?
4. **Minimalismus** — Redundanzen zwischen Components, unnötige Abstraktionen, duplizierte Controller-Logik?
5. **Performance** — Memory Leaks (`.bind(this)`), unnötige Re-Renders, Lifecycle-Hooks korrekt?
6. **Accessibility** — Keyboard-Handler, ARIA-Attribute, Focus-Management

**Output (nach Severität sortiert, Fixability-Score 1–5):**

Pro Finding:
- Titel, Components, Begründung (mit ARC42-Referenz + Datei:Zeile), Lösung (2–3 Sätze)
- Fixability-Score, Aufwand, **Spec-Update nötig? (ja/nein + was)**

Severitäten: 🔴 Critical | 🟡 High | 🟢 Low

---

## Phase 2 — Architect: Best Finding Selection

Wähle **genau ein Finding** (Minimalismus: eines, nicht mehrere):

Auswahlkriterien: Severität > Fixability-Score ≥ 4 > Scope-Breite > Lerneffekt

**Ausschluss:**
- Fixability ≤ 2 → Needs Deeper Look, nächstes Finding
- API-Breaking → nicht wählen
- > 5 Dateien → Needs Deeper Look, nächstes Finding

**Nothing-to-Fix Guard:** Kein auswählbares Finding → Review-Datei schreiben, kein Commit, kein PR, Session beenden.

---

## Phase 3 — Developer: Fix

Behebe das Finding exakt im definierten Scope.

**Clean Code Direktiven:**
- Namen müssen selbsterklärend sein — kein Kommentar statt gutem Namen
- Kein toter Code, keine ungenutzten Imports in geänderten Dateien
- KEINE Type-Assertions (`as any`, `as unknown`)
- Nur das Finding beheben — keine Nebenbaustellen (Minimalismus)

Bei TypeScript-Fehlern → Needs Deeper Look, zurück an Architect.

**Build-Check nach Fix:**
```bash
pnpm --filter @public-ui/components build 2>&1 | tail -30
```
Bei Build-Fehler → Needs Deeper Look, kein Commit, zurück an Architect.

---

## Phase 4 — Reviewer: Code Quality Sweep

Prüfe NUR die geänderten Dateien:
- Keine unused imports/variables/dead code
- Keine erklärenden Kommentare (Clean Code: Code spricht für sich)
- Type Safety korrekt, kein unsafe casting
- JSDoc nur auf Stencil-dekorierten Elements
- Naming konsistent, selbsterklärend
- Keine Scope-Übergriffe (Minimalismus)
- Keine neuen Issues eingeführt

Output: `✅ Ready` oder Blocker-Liste (🔴). Bei Blockern: Developer behebt, max. 2 Iterationen.

---

## Phase 5 — Spec-Update (Spec-First)

Prüfe ob das behobene Finding eine Lücke oder Unklarheit in der Spec aufgedeckt hat:

**Entscheidungsbaum:**
- War die Abweichung durch ARC42 gedeckt? → Kein Spec-Update nötig.
- Fehlte ein Pattern/Prinzip in ARC42? → ARC42.md ergänzen.
- Fehlte ein konkretes Beispiel im Blueprint? → Blueprint-Datei ergänzen oder Hinweis in ARC42.
- War das Finding ein Indiz für ein bisher unbenanntes Anti-Pattern? → Anti-Pattern-Sektion in ARC42 ergänzen.

**Minimalismus gilt auch hier:** Nur das dokumentieren was wirklich neu und nicht-offensichtlich ist. Kein ausführliches Prosa — ein präziser Satz ist besser als ein Absatz.

Wenn kein Spec-Update nötig: explizit notieren „Kein Spec-Update — [Begründung]".

---

## Phase 6 — Pädagoge: Evaluation & Review-Datei

Evaluiere den Teamprozess und ergänze die Review-Datei.

```bash
mkdir -p packages/components/src/components/_skeleton/session-reports/
```

Pfad: `packages/components/src/components/_skeleton/session-reports/REVIEW.md`

Füge einen neuen datierten Abschnitt am Ende des bestehenden Dokuments an (`## Session YYYY-MM-DD`). Erstelle die Datei neu falls sie noch nicht existiert.

Abschnittsstruktur:
```markdown
## Session YYYY-MM-DD

### Analysierte Components
[Discovery-Liste — dynamisch ermittelt]

### Finding-Liste
[alle Findings nach Severität, mit Spec-Update-Flag]

### Umgesetztes Finding
**[Titel]**
- Begründung: [Auswahlkriterium]
- Geänderte Dateien: [Liste]
- Spec-Update: [was geändert wurde / „Kein Spec-Update — [Grund]"]

### Offene Findings
[nicht ausgewählte Findings]

### Needs Deeper Look
[Score ≤ 2, Scope > 5 Dateien, Build-Fehler, API-Breaking]

### Pädagoge
Team Collaboration Score: [X/100]
[Beobachtungen zu Minimalismus, Clean Code, Spec-First Einhaltung]
```

---

## Phase 7 — Commit & PR

```bash
# Git-User
git config user.name "Skeleton Routine"
git config user.email "noreply@kolibri.dev"
```

Offene PRs prüfen — suche nach `skeleton-fix` im Branch-Namen unter den offenen PRs (via GitHub MCP Tool `mcp__github__list_pull_requests` mit state=open, oder `gh pr list`).

Wenn offener `skeleton-fix/*`-PR existiert → Review-Abschnitt als Kommentar posten (via `mcp__github__add_issue_comment` oder `gh pr comment`), kein neuer Branch.

```bash
# Branch (mit Kollisionsschutz)
BRANCH="skeleton-fix/$(date +%Y-%m-%d)"
if git ls-remote --heads origin "$BRANCH" | grep -q "$BRANCH"; then
  BRANCH="skeleton-fix/$(date +%Y-%m-%d-%H%M)"
fi
git checkout -b "$BRANCH"
```

```bash
# Commit (alle geänderten Dateien + Review-Datei + ggf. ARC42-Update)
git add <betroffene Dateien> \
  packages/components/src/components/_skeleton/session-reports/REVIEW.md
git commit -m "refactor(skeleton): <Finding-Titel>

Automated Skeleton Pattern Find & Fix routine.
Finding: <Titel>
Components affected: <Liste>"
git push -u origin "$BRANCH"
```

**PR erstellen** via `mcp__github__create_pull_request`:
- `base`: `develop`
- `title`: `refactor(skeleton): <Finding-Titel>`
- `body`: Inhalt der REVIEW.md (aktueller Session-Abschnitt)

**Label setzen** — nach PR-Erstellung via `mcp__github__update_pull_request` das Label `skeleton-aligning` zuweisen. Falls das Tool Labels nicht unterstützt, `gh pr edit <NUMBER> --add-label "skeleton-aligning"` verwenden.

Alternativ mit `gh`:
```bash
gh pr create \
  --base develop \
  --title "refactor(skeleton): <Finding-Titel>" \
  --label "skeleton-aligning" \
  --body-file packages/components/src/components/_skeleton/session-reports/REVIEW.md
```

---

**Starte mit Phase 0. Arbeite alle Phasen vollständig ab.**
