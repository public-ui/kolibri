# Renovate — Automated Dependency Updates

This document is the outcome of issue [#10270](https://github.com/public-ui/kolibri/issues/10270)
(_renovate vs npm-check-updates vs dependabot_). It contains:

1. a comparison of the three candidate tools,
2. a description of the exemplary [`renovate.json`](../renovate.json) that ships with this repo,
3. how to enable Renovate, and
4. the migration checklist for retiring the current tooling.

> **Status:** The `renovate.json` is committed as an **exemplary, ready-to-run configuration**.
> Renovate is **not active yet** — it requires the Renovate GitHub App to be installed on the
> `public-ui` organization (see [Enabling Renovate](#enabling-renovate)). Until then the existing
> Dependabot + npm-check-updates automation stays in charge.

---

## 1. Tool comparison

KoliBri is a **pnpm-workspace monorepo** with 30+ packages, several intentionally pinned major
lines (Angular `v19`/`v20`/`v21`, React 18/19, Stencil 4, ESLint 9) and four maintained branches
(`develop`, `release/3`, `release/2`, `release/1`). That shapes the comparison:

| Capability                                   |       **Renovate**       |             Dependabot              |  npm-check-updates (ncu)  |
| -------------------------------------------- | :----------------------: | :---------------------------------: | :-----------------------: |
| pnpm-workspace aware                         |        ✅ native         |             ⚠️ partial              |  ❌ manual (per-package)  |
| One PR grouping related packages             |  ✅ fully configurable   |          ⚠️ `groups:` only          |          ❌ none          |
| Hold a package on a specific major line      |   ✅ per-folder rules    |        ⚠️ `ignore` (global)         | ⚠️ `-x` exclude (global)  |
| GitHub Actions updates                       |            ✅            |                 ✅                  |            ❌             |
| Lockfile-only refresh                        | ✅ `lockFileMaintenance` |             ⚠️ limited              | ❌ (needs `pnpm install`) |
| Automerge (per update type)                  |            ✅            |             ⚠️ limited              |            ❌             |
| Multi-base-branch (release/\*) support       | ✅ `baseBranchPatterns`  | ✅ `target-branch` (one entry each) |  ⚠️ matrix in a workflow  |
| Security / vulnerability remediation         |  ✅ OSV + GitHub alerts  |          ✅ GitHub alerts           |            ❌             |
| Dependency Dashboard (single overview issue) |            ✅            |                 ❌                  |            ❌             |
| Schedule / batching                          |            ✅            |              ⚠️ basic               |   ⚠️ via cron workflow    |
| Self-hostable (no third-party app)           |   ✅ (official Action)   |         ✅ (GitHub-native)          |         ✅ (CLI)          |
| Config surface                               |          medium          |                 low                 |          minimal          |
| Cost for open source                         |           free           |                free                 |           free            |

### Verdict

- **Renovate — recommended.** It is the only option that models KoliBri's reality in _one_ config:
  group the Angular/React/Stencil families, hold each adapter folder on its pinned major, automerge
  the safe stuff (GitHub Actions, `@types/*`), and route everything risky to a review queue (the
  Dependency Dashboard). It also folds in what we currently split across **two** systems
  (Dependabot for Actions + a daily `ncu` workflow for npm).
- **Dependabot — viable fallback.** Now supports `groups:`, but every package directory needs its
  own `updates:` entry (≈30 for this monorepo × 4 branches) and it cannot hold a dependency on a
  specific major _per folder_ — exactly what the `angular/v19|v20|v21` and `react*` adapters need.
- **npm-check-updates — not an automation tool.** It is a CLI that rewrites version ranges; it has
  no PR/grouping/scheduling of its own. We only use it _inside_ a hand-written workflow
  (`.github/workflows/auto-dependency-updater.yml`). Renovate makes that workflow redundant.

---

## 2. What the exemplary `renovate.json` does

The committed [`renovate.json`](../renovate.json) is tailored to this repo. Highlights:

### Global behaviour

- **`extends: ["config:recommended", "security:openssf-scorecard"]`** — sensible defaults plus
  OpenSSF Scorecard badges on PRs.
- **Conventional Commits** — `chore(deps): …` titles so PRs pass `pr-title-validation.yml`.
- **`labels: ["dependencies", "renovate", "release:engineering"]`** — the `release:*` label is
  **required** by `pr-release-label-validation.yml`; `release:engineering` files dependency PRs
  under _🔧 Engineering_ in the changelog (see `.github/release.yml`).
- **Weekly schedule** (`before 6am on monday`, `Europe/Berlin`) with `prConcurrentLimit: 10` /
  `prHourlyLimit: 4` so the first run does **not** flood the repo with PRs.
- **`baseBranchPatterns`** — runs on `develop` **and** `release/3|2|1`; the maintenance branches are
  restricted to security + patch npm updates so released majors stay stable.
- **`lockFileMaintenance`** — weekly `pnpm-lock.yaml` refresh (replaces the manual
  `04 - Update pnpm Lock` workflow runs).
- **`postUpdateOptions: ["pnpmDedupe"]`** — keeps the pnpm lockfile tidy.

### Grouping & guard-rails (the important part for this monorepo)

| Rule                                              | Effect                                                                                                                                                                                             |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **All majors**                                    | Require manual approval via the Dependency Dashboard — KoliBri pins majors deliberately.                                                                                                           |
| **Angular `@angular/*`, `zone.js`, `ng-packagr`** | Major updates **disabled** entirely; within-major updates grouped per adapter folder (_Angular 19/20/21_). A new Angular major = a new adapter folder, never an auto-bump.                         |
| **React `react`, `react-dom`, `@types/react*`**   | Major updates **disabled**; within-major React updates of the `react*` adapters grouped and reviewed (not automerged).                                                                             |
| **Stencil `@stencil/*`, `@stencil-community/*`**  | **All** updates require dashboard approval — every 4.39+ release currently breaks the Popover API, tooltips and visual tests (see [`UPGRADEABLE_DEPENDENCIES.md`](./UPGRADEABLE_DEPENDENCIES.md)). |
| **`@kern-ux/*`**                                  | Dashboard approval only — upgraded by hand together with theming work.                                                                                                                             |
| **`@typescript-eslint/*`, ESLint core + plugins** | Minor/major require approval (9 → 10 is a breaking migration).                                                                                                                                     |
| **`jest*`, `typescript`**                         | Majors/non-patch require approval.                                                                                                                                                                 |
| **`github-actions`, `@types/*`**                  | Grouped **and automerged** for low-risk update types.                                                                                                                                              |
| **Stylelint, Playwright**                         | Grouped into single PRs.                                                                                                                                                                           |

> The pins above mirror exactly what the current `ncu:*` scripts exclude
> (`@kern-ux/*`, `@stencil/*`, `@typescript-eslint/*`) and what `UPGRADEABLE_DEPENDENCIES.md`
> documents as breaking — so behaviour is preserved, just expressed declaratively.

### Validate the config locally

```sh
npx --yes --package renovate renovate-config-validator renovate.json
```

---

## 3. Enabling Renovate

Pick **one** of two ways to run it.

### Option A — Mend-hosted GitHub App (recommended, zero maintenance)

1. An **org admin** installs the [Renovate GitHub App](https://github.com/apps/renovate) on
   `public-ui` (or just on `public-ui/kolibri`).
2. Renovate detects `renovate.json` and opens an onboarding/Dependency Dashboard issue.
3. Review the dashboard, then let it run on the weekly schedule.

### Option B — Self-hosted via GitHub Actions (full control, no third-party app)

Add `.github/workflows/renovate.yml`:

```yaml
name: Renovate
on:
  schedule:
    - cron: "0 4 * * 1" # Mondays, 04:00 UTC
  workflow_dispatch:
permissions:
  contents: write
  pull-requests: write
jobs:
  renovate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: renovatebot/github-action@v43
        with:
          token: ${{ secrets.RENOVATE_TOKEN }} # PAT or GitHub App token with repo + PR scope
        env:
          RENOVATE_REPOSITORIES: public-ui/kolibri
```

> **Tip:** For the very first run, set `"dryRun": "full"` (or run the Action with
> `RENOVATE_DRY_RUN=full`) to preview the PRs Renovate _would_ open without creating them.

---

## 4. Migration checklist (do this only after Renovate is verified)

Once Renovate runs green for a cycle, retire the overlapping automation to avoid **duplicate PRs**:

- [ ] Remove `.github/dependabot.yml` (Renovate now manages GitHub Actions — see the
      `github-actions` group).
- [ ] Remove `.github/workflows/auto-dependency-updater.yml` (the daily `ncu` PR job).
- [ ] Drop the `ncu:*` / `update` scripts and the `npm-check-updates` devDependency from the root
      `package.json`, plus `.ncurc.json` (optional — `ncu` is still handy for manual ad-hoc checks).
- [ ] Keep `04 - Update pnpm Lock` if you still want a manual lockfile-refresh button; otherwise
      Renovate's `lockFileMaintenance` covers it.

Until every box is ticked, **leave the existing tooling in place** — the `renovate.json` is inert
without the App/Action from step 3, so there is no conflict in the meantime.

---

## 🇩🇪 Zusammenfassung

**Empfehlung: Renovate.** Es ist die einzige Lösung, die das KoliBri-Monorepo in _einer_ Konfiguration
abbildet — verwandte Pakete gruppieren (z. B. alle `@angular/*`), jeden Adapter-Ordner auf seiner
fixierten Major-Version halten (`angular/v19|v20|v21`, `react*`), sichere Updates automatisch mergen
(GitHub Actions, `@types/*`) und alles Riskante (Stencil, kern-ux, ESLint-/Angular-Majors) über das
**Dependency Dashboard** zur manuellen Freigabe leiten.

- **Dependabot** kann zwar gruppieren, braucht aber pro Paketverzeichnis einen eigenen Eintrag
  (≈30 × 4 Branches) und kann ein Paket nicht _pro Ordner_ auf einer Major-Version halten.
- **npm-check-updates** ist nur ein CLI ohne eigene Automatisierung (läuft heute im Workflow
  `auto-dependency-updater.yml`).

Die fertige [`renovate.json`](../renovate.json) liegt im Repo-Root und ist mit dem offiziellen
`renovate-config-validator` geprüft. **Aktiv wird Renovate erst**, wenn ein Org-Admin die
[Renovate-GitHub-App](https://github.com/apps/renovate) installiert (Option A) oder der
self-hosted Workflow (Option B) eingerichtet wird. Bis dahin bleibt die bestehende
Dependabot-/ncu-Automatisierung zuständig; danach greift die Migrations-Checkliste oben.
