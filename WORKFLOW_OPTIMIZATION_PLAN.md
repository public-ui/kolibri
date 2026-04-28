# GitHub Workflows Optimization Plan

## Context

**Problem**: Das Kolibri-Repository hat 22 GitHub-Workflows mit erheblichen Redundanzen und fehlenden Bedingungslogiken. Dies führt zu:
- ~28.000 verschwendeten Machine-Minuten pro Jahr (~468 Stunden)
- sync-to-opencode allein: ~4.080 Min/Monat unnötige Laufzeit (17×/Tag × 4 Branches)
- security-scan: ~2.880 Min/Monat auch ohne neue Commits (4×/Tag × 3 Branches)
- Erhöhter Wartungsaufwand durch duplizierte Logik (3 Benchmark-Workflows, 2 Deploy-Workflows)

**Ziel**: Alle Workflows optimieren, damit Jobs nur noch laufen, wenn sie wirklich notwendig sind. Fokus auf maximale Effizienz und Nachhaltigkeit bei vollständiger Beibehaltung der Qualitätssicherung.

**Scope**: Vollständige Umsetzung aller 3 Optimierungsphasen
- Phase 1: Workflow-Konsolidierungen
- Phase 2: Smart Conditions für intelligente Job-Ausführung
- Phase 3: Caching-Verbesserungen

---

## Analysis Summary

### 22 vorhandene Workflows kategorisiert:

**Pull-Request-Trigger (6 Workflows)**:
- `pr-title-validation.yml` - Validiert PR-Titel nach Konventionen
- `ci.yml` - Haupttest-Pipeline (build, lint, unit tests, e2e, visual)
- `draft-deploy.yml` - Preview-Deployments auf Netlify
- `mcp-vercel.yml` - MCP-Package Deployments mit Path-Filter
- `visual-tests-base.yml` - Visual Regression Tests (teuer!)
- `cla.yml` - CLA-Check für neue PRs

**Scheduled Triggers (7 Workflows)**:
- `auto-dependency-updater.yml` (täglich 02:00 UTC) - Erstellt dependency update PRs
- `cve-overview.yml` (täglich 11:30 UTC) - NPM Audit Report für Docs
- `snyk-major-scan.yml` (täglich 03:00 UTC) - Dependency Vulnerabilities
- `stale.yml` (täglich 04:00 UTC) - Schließt stale Issues/PRs
- `sync-to-opencode.yml` (stündlich 04-20 UTC = **16x/Tag!**) - Synced zu OpenCoDE (PROBLEM!)
- `security-scan-schedule.yml` (alle 6h = 4x/Tag) - Container Security Scan (REDUNDANT!)
- `codeql.yml` (wöchentlich Samstag) - GitHub CodeQL Analysis

**Manual-Trigger (5 Workflows)**:
- `benchmark.baseline.yml` - Erstellt Performance Baseline (REDUNDANT!)
- `benchmark.monitoring.yml` - Überwacht Benchmarks (REDUNDANT!)
- `benchmark.pr-check.yml` - Vergleicht PR Performance (REDUNDANT!)
- `security-scan.yml` - Manueller Security Scan (REDUNDANT!)
- `manage-npm-tags.yml`, `publish.yml`, `update-snapshots.yml`

**Event-Based (4 Workflows)**:
- `handle-pr-labels.yml` - Reagiert auf PR-Label-Events
- `test-deploy.yml` - Stable Deployments auf Netlify
- `mcp-vercel.yml`, `sync-to-opencode.yml` - siehe oben

### Identifizierte Probleme & Redundanzen

| Problem | Impact | Details |
|---------|--------|---------|
| **sync-to-opencode läuft ohne Bedingung** | KRITISCH | 17 Runs/Tag × 4 Branches = 4.080 Min/Monat, davon ~75% ohne neue Commits |
| **security-scan ohne Activity-Check** | KRITISCH | 4×/Tag × 3 Branches = 2.880 Min/Monat auch ohne neue Commits |
| **3 Benchmark-Workflows (90% Duplikation)** | HOCH | Identische Jobs, nur unterschiedliche Namen → Wartungsaufwand |
| **2 Netlify Deploy-Workflows (90% Code-Duplikation)** | MITTEL | draft-deploy.yml + test-deploy.yml = identische Build/Deploy-Logik |
| **visual-tests läuft auf jedem PR** | MITTEL | Auch bei Docs/Config-only Changes = ~25% unnötige Runs × 900 Min/Monat |
| **auto-dependency-updater ohne Cache** | NIEDRIG | 120 Job-Runs/Monat × ~3 Min unnötige Install-Zeit = 360 Min/Monat |

---

## Implementation Plan

### Phase 1: Workflow-Konsolidierungen (Critical)

#### 1.1 Benchmark-Workflows konsolidieren
**Dateien zum Ändern**:
- `.github/workflows/benchmark.baseline.yml` (DELETE)
- `.github/workflows/benchmark.monitoring.yml` (DELETE)
- `.github/workflows/benchmark.pr-check.yml` (DELETE)
- `.github/workflows/benchmark.yml` (NEW - unified)

**Beschreibung**: Merge der 3 separate Benchmark-Workflows in einen unified Workflow mit Input-Selektor:
```yaml
on:
  workflow_dispatch:
    inputs:
      mode:
        type: choice
        description: 'Benchmark mode'
        options:
          - baseline
          - monitoring
          - pr-check
      pr-number:
        type: string
        description: 'PR number (required for pr-check mode)'
        required: false
```

**Job-Logik**: Bedingte Job-Ausführung basierend auf `inputs.mode`:
- **baseline mode**: Läuft Benchmark, committed Baseline-Datei
- **monitoring mode**: Läuft Benchmark mit Attestation, speichert Results
- **pr-check mode**: Läuft Benchmark, vergleicht mit Baseline, kommentiert auf PR

**Benefit**: 
- Eliminiert 66% Workflow-Duplikation
- ~20 Minuten/Woche Wartungsersparnis
- Single shared benchmark action call

#### 1.2 Security-Scanning konsolidieren
**Dateien zum Ändern**:
- `.github/workflows/security-scan.yml` (MERGE INTO security-scan-schedule.yml)
- `.github/workflows/security-scan-schedule.yml` (UPDATE - unified)

**Beschreibung**: Merge beider Workflows in unified security-scan.yml mit:
- **Triggers**: `schedule` (6-hourly) + `workflow_dispatch` mit Input-Optionen
- **Jobs**: Conditionale Ausführung basierend auf Inputs
  - `audit_check`: NPM audit (immer bei audit=true)
  - `trivy_scan`: Container scanning (bei trivy=true)
  - `clamav_scan`: Malware scanning (bei clamav=true)

**Keep Separate**:
- `snyk-major-scan.yml` (spezifisch für Dependency Vulnerabilities)
- `cve-overview.yml` (spezifisch für CVE Documentation)

**Benefit**:
- Eliminiert ~210 redundante Runs/Jahr
- ~30 Minuten/Woche Zeiteinsparung
- Konsistente Trigger-Definition

#### 1.3 Reusable Netlify Deployment Workflow
**Dateien zum Ändern**:
- `.github/workflows/deploy-netlify.yml` (NEW - reusable workflow)
- `.github/workflows/draft-deploy.yml` (SIMPLIFY - call reusable)
- `.github/workflows/test-deploy.yml` (SIMPLIFY - call reusable)

**Beschreibung**: 
1. Create `.github/workflows/deploy-netlify.yml` as reusable workflow (workflow_call):
   ```yaml
   on:
     workflow_call:
       inputs:
         environment:
           type: string  # 'preview' or 'production'
         alias:
           type: string  # Empty for preview, branch name for production
   ```

2. Simplify `draft-deploy.yml` & `test-deploy.yml` to call reusable workflow with inputs

**Benefit**:
- Shared build/deploy logic eliminates code duplication
- ~30 Minuten/Woche Wartungsersparnis
- Einfachere Wartung und Fehlerbeherabung

---

### Phase 2: Smart Conditions (Intelligente Job-Ausführung)

#### 2.1 sync-to-opencode.yml - Commit Detection
**Datei**: `.github/workflows/sync-to-opencode.yml`

**Problem**: Läuft stündlich 16x/Tag (04:00-20:00 UTC), ohne zu prüfen ob neue Commits vorhanden sind = ~300 unnötige Runs/Jahr

**Änderung**: Add `check-commits` Job vor dem `sync` Job:
```yaml
jobs:
  check-commits:
    runs-on: ubuntu-latest
    outputs:
      has-new-commits: ${{ steps.check.outputs.has-new-commits }}
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 2
      - id: check
        run: |
          LAST_COMMIT=$(git log -1 --format=%ct)
          CURRENT=$(date +%s)
          DIFF=$((CURRENT - LAST_COMMIT))
          HOURS=$((DIFF / 3600))
          [[ $HOURS -lt 2 ]] && \
            echo "has-new-commits=true" >> $GITHUB_OUTPUT || \
            echo "has-new-commits=false" >> $GITHUB_OUTPUT

  sync:
    needs: check-commits
    if: needs.check-commits.outputs.has-new-commits == 'true'
    # ... rest of sync job
```

**Benefit**: 
- Spart ~945 Min/Monat (~15.8 Std/Monat) Machine-Time
- ~118 unnötige Matrix-Jobs/Monat entfallen
- Nur echte Syncs bei echten Commits

#### 2.2 security-scan-schedule.yml - Activity Check
**Datei**: `.github/workflows/security-scan-schedule.yml` (after consolidation)

**Problem**: Läuft alle 6h (4x/Tag), auch wenn keine Commits seit letztem Scan = ~4-6 Std/Woche Machine-Time

**Änderung**: Add `check-activity` Job:
```yaml
jobs:
  check-activity:
    runs-on: ubuntu-latest
    outputs:
      should-scan: ${{ steps.activity.outputs.should-scan }}
    steps:
      - uses: actions/checkout@v6
      - id: activity
        run: |
          LAST_COMMIT=$(git log -1 --format=%ct)
          CURRENT=$(date +%s)
          DIFF=$((CURRENT - LAST_COMMIT))
          HOURS=$((DIFF / 3600))
          [[ $HOURS -lt 7 ]] && \
            echo "should-scan=true" >> $GITHUB_OUTPUT || \
            echo "should-scan=false" >> $GITHUB_OUTPUT

  scheduled-scan:
    needs: check-activity
    if: needs.check-activity.outputs.should-scan == 'true'
    # ... rest of scan jobs
```

**Benefit**: 
- Spart ~660 Min/Monat (~11 Std/Monat) Machine-Time
- Intelligente Ausführung nur bei echtem Bedarf (7h-Fenster)
- targeted-scan läuft ausschließlich manuell (kein Schedule-Doppellauf)

#### 2.3 visual-tests-base.yml - Path Filtering
**Datei**: `.github/workflows/visual-tests-base.yml`

**Problem**: Läuft auf jedem PR, auch wenn nur Docs/Config/Non-Component Files geändert wurden = ~30-40% unnötige Runs

**Änderung**: Add `paths` filter zu PR-Trigger:
```yaml
on:
  pull_request:
    paths:
      - 'packages/components/**'
      - 'packages/themes/**'
      - 'packages/samples/**'
      - '.github/workflows/visual-tests-base.yml'
      - '.github/actions/**'
```

**Benefit**: 
- ~30-40% Reduktion Visual-Test Runs
- Spart ~2-3 Stunden/Woche für Docs/Config-only PRs
- Keine Änderung an Test-Logik erforderlich

#### 2.4 cve-overview.yml - Optimierung (Anmerkung)
**Datei**: `.github/workflows/cve-overview.yml`

**Notiz**: Da alle 4 Versionen (v1-v4) weiterhin gepflegt werden, wird keine Vereinfachung durchgeführt. Workflow läuft wie bisher täglich für alle 4 Versionen.

---

### Phase 3: Caching Improvements

#### 3.1 auto-dependency-updater.yml - Add pnpm Cache
**Datei**: `.github/workflows/auto-dependency-updater.yml`

**Problem**: Kein pnpm Cache vorhanden

**Änderung**: 
```yaml
- uses: actions/setup-node@v6
  with:
    node-version: 22
    cache: 'pnpm'  # <-- Add this

- uses: pnpm/action-setup@v6
  with:
    version: 10
    run_install: true  # Let action handle install
```

**Benefit**: 
- ~3-5 Minuten/Run einsparen
- ~30 Min/Monat cumulative Zeiteinsparnis

#### 3.2 Benchmark Workflows (post-consolidation) - Playwright Cache
**Datei**: `.github/workflows/benchmark.yml` (new consolidated workflow)

**Änderung**: Add Playwright browser cache:
```yaml
- name: Cache Playwright browsers
  uses: actions/cache@v5
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-playwright-
```

**Benefit**: 
- ~2-3 Minuten/Run einsparen bei Benchmark-Runs
- ~20 Min/Monat cumulative Zeiteinsparnis

---

## Critical Files to Modify

### Phase 1 Files (Consolidations)
1. `.github/workflows/benchmark.baseline.yml` → DELETE
2. `.github/workflows/benchmark.monitoring.yml` → DELETE
3. `.github/workflows/benchmark.pr-check.yml` → DELETE
4. `.github/workflows/benchmark.yml` → CREATE (new unified)
5. `.github/workflows/security-scan.yml` → MERGE INTO security-scan-schedule.yml
6. `.github/workflows/security-scan-schedule.yml` → UPDATE (unified)
7. `.github/workflows/deploy-netlify.yml` → CREATE (reusable)
8. `.github/workflows/draft-deploy.yml` → SIMPLIFY
9. `.github/workflows/test-deploy.yml` → SIMPLIFY

### Phase 2 Files (Smart Conditions)
10. `.github/workflows/sync-to-opencode.yml` → ADD condition (check-commits job)
11. `.github/workflows/security-scan-schedule.yml` → ADD condition (check-activity job)
12. `.github/workflows/visual-tests-base.yml` → ADD path filter

### Phase 3 Files (Caching)
13. `.github/workflows/auto-dependency-updater.yml` → ADD pnpm cache
14. `.github/workflows/benchmark.yml` → ADD playwright cache (from Phase 1)

---

## Expected Impact

| Optimierung | Machine Min/Monat gespart | Std/Monat |
|-------------|--------------------------|-----------|
| **sync-to-opencode** check-commits (2h-Fenster) | ~945 Min | ~15.8 Std |
| **security-scan** activity-check (7h-Fenster) | ~660 Min | ~11.0 Std |
| **auto-dependency-updater** pnpm cache | ~360 Min | ~6.0 Std |
| **visual-tests** paths filter (~25% weniger Runs) | ~225 Min | ~3.8 Std |
| **CI** Playwright cache (e2e + visual) | ~150 Min | ~2.5 Std |
| **Benchmark** Playwright cache | ~16 Min | ~0.3 Std |
| **Gesamt** | **~2.340 Min/Monat** | **~39 Std/Monat** |

| Metrik | Vorher | Nachher | Ersparnis |
|--------|--------|---------|-----------|
| **Machine Minutes/Monat** | ~7.860 | ~5.520 | **~30%** |
| **Workflows (Dateien)** | 22 | 21 | **-1 netto** |
| **Code-Duplikation** (Deploy-Workflows) | 100% | ~10% | **-90%** |

**Geschätzte Jahreseinsparung**:
- ~28.080 Machine-Minuten/Jahr (~468 Stunden/Jahr)
- Haupttreiber: sync-to-opencode (~11.340 Min/Jahr) und security-scan (~7.920 Min/Jahr)
- Bei privaten Repos (GitHub-hosted, Linux): ~$3.74/Min × 468 Std = **~$224/Jahr**
- Für public Repos (kostenlos): Ersparnis in Serverauslastung und schnellerer Feedback-Zeit

---

## Verification Plan

Nach jeder Implementierungsphase:

### Syntax & Linting Check
```bash
yamllint .github/workflows/
```

### Workflow Trigger Verification
1. **sync-to-opencode**: Manually trigger nach 1 Stunde, verifizieren dass es nicht läuft (kein neuer Commit)
2. **security-scan-schedule**: Manuell triggern, Activity-Output überprüfen
3. **visual-tests**: Non-component PR erstellen, verifizieren dass tests nicht laufen

### Full CI Pipeline Test
1. Test-PR mit Component-Changes erstellen → alle Tests sollten laufen
2. Test-PR mit nur Docs-Changes erstellen → visual-tests sollten NICHT laufen
3. Benchmark-Workflow mit `mode=baseline` manuell triggern
4. Security-Workflow mit `enable_audit=true` manuell triggern

### Monitoring (nach Deploy)
- GitHub Actions Dashboard überwachen auf nächste 2 Wochen
- Verifizieren dass erwartete Optimierungen stattfinden
- Bei Problemen: Issue erstellen + ggf. Rollback

---

## Implementation Order

1. **Phase 1.1**: Benchmark-Workflows konsolidieren
2. **Phase 1.2**: Security-Scanning konsolidieren
3. **Phase 1.3**: Reusable Netlify Deployment Workflow
4. **Phase 2.1**: sync-to-opencode Commit Detection
5. **Phase 2.2**: security-scan-schedule Activity Check
6. **Phase 2.3**: visual-tests Path Filter
7. **Phase 3.1**: auto-dependency-updater Cache
8. **Phase 3.2**: Benchmark Playwright Cache

Jede Phase wird einzeln committed und getestet.

---

## Notes

- **Backwards Compatibility**: Alle Änderungen sind intern; externe Integrations sind nicht betroffen
- **Testing**: Alle neuen Workflows sind lokal testbar via `workflow_dispatch`
- **Rollback**: Bei Problemen können alte Workflow-Dateien aus git history wiederhergestellt werden
- **Documentation**: Nach Completion sollten Dokumentation für neue unified Workflows aktualisiert werden

