# Renovate — Automated Dependency Updates

This document is the outcome of issue [#10270](https://github.com/public-ui/kolibri/issues/10270)
(_renovate vs npm-check-updates vs dependabot_). It contains:

1. a comparison of the three candidate tools,
2. a description of the exemplary [`renovate.json`](../renovate.json) that ships with this repo,
3. how to enable Renovate, and
4. the migration checklist for retiring the current tooling.

> **Status:** The `renovate.json` and a self-hosted runner workflow
> ([`.github/workflows/renovate.yml`](../.github/workflows/renovate.yml)) are committed as an
> **exemplary, ready-to-run setup**. Renovate stays **idle** until that workflow runs — either on its
> every-4-hours schedule or via the manual **Run workflow** button (see [Enabling Renovate](#enabling-renovate)).
> Until then the existing Dependabot + npm-check-updates automation stays in charge.

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
- **Every-4-hours cadence** — the workflow cron runs Renovate every 4 hours; `renovate.json` itself
  allows PR creation `at any time`, so the workflow schedule governs. `prConcurrentLimit: 5` /
  `prHourlyLimit: 5` cap the number of open PRs **per base branch** (so `develop` and each
  `release/*` branch have their own budget).
- **`minimumReleaseAge: "3 days"`** — all updates (npm, Actions, …, including security fixes)
  are held back for three days after release before a PR is opened or auto-merged. This protects
  against compromised or quickly-revoked releases.
- **Automerge all non-major updates (merge commit)** — the first package rule enables `automerge` for
  `patch`/`minor`/`digest`/`pin`/lockfile updates; `automergeStrategy: merge` is the only method the
  `Production branches` ruleset allows on `develop` (see [Troubleshooting](#troubleshooting-prs-stay-open-although-ci-is-green)). Known-risky rules below (Stencil, kern-ux, ESLint,
  TypeScript, typescript-eslint) override it back to manual. Majors always keep dashboard approval.
  Prerequisites: repo setting **Allow auto-merge** enabled, green pipelines enforced via required
  status checks on `develop`, and the runner GitHub App listed in the branch-protection bypass
  (see [Enabling Renovate](#enabling-renovate)).
- **`baseBranchPatterns`** — runs on `develop` **and** `release/3|2|1`; the maintenance branches are
  **security-only** (all regular npm and GitHub Actions updates are disabled) so released majors stay
  stable. Security PRs still automerge when non-major; major security updates require dashboard
  approval.
- **`lockFileMaintenance`** — weekly `pnpm-lock.yaml` refresh (replaces the manual
  `04 - Update pnpm Lock` workflow runs).
- **`configMigration: true`** — Renovate keeps `renovate.json` itself up to date when built-in
  presets or options change.
- **`dependencyDashboardOSVVulnerabilitySummary: "all"`** — adds an OSV vulnerability table
  directly to the Dependency Dashboard issue.
- **`postUpdateOptions: ["pnpmDedupe"]`** — keeps the pnpm lockfile tidy.

### Grouping & guard-rails (the important part for this monorepo)

| Rule                                              | Effect                                                                                                                                                                                             |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **All majors**                                    | Require manual approval via the Dependency Dashboard — KoliBri pins majors deliberately.                                                                                                           |
| **Angular `@angular/*`, `zone.js`, `ng-packagr`** | Major updates **disabled** entirely; within-major updates grouped per adapter folder (_Angular 19/20/21_). A new Angular major = a new adapter folder, never an auto-bump.                         |
| **React `react`, `react-dom`, `@types/react*`**   | Major updates **disabled**; within-major React updates of the `react*` adapters grouped and automerged once green.                                                                                 |
| **Stencil `@stencil/*`, `@stencil-community/*`**  | **All** updates require dashboard approval — every 4.39+ release currently breaks the Popover API, tooltips and visual tests (see [`UPGRADEABLE_DEPENDENCIES.md`](./UPGRADEABLE_DEPENDENCIES.md)). |
| **`@kern-ux/*`**                                  | Dashboard approval only — upgraded by hand together with theming work.                                                                                                                             |
| **`@typescript-eslint/*`, ESLint core + plugins** | Minor/major require approval (9 → 10 is a breaking migration).                                                                                                                                     |
| **`jest*`, `typescript`**                         | Majors/non-patch require approval.                                                                                                                                                                 |
| **`github-actions`, `@types/*`**                  | Grouped; automerged like every other non-major update.                                                                                                                                             |
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

Two ways to run it; **this repo is wired for Option A**.

### Option A — Self-hosted via GitHub Actions (committed in this repo)

This repo ships [`.github/workflows/renovate.yml`](../.github/workflows/renovate.yml). It runs Renovate
**every 4 hours** (`0 */4 * * *` UTC) **and** on demand via the **Run workflow** button
(`workflow_dispatch`, with an optional `dry_run` preview). It authenticates through the existing GitHub
App (`APP_ID` / `PRIVATE_KEY` secrets, shared with _04 - Update pnpm Lock_).

To activate it:

1. Ensure that GitHub App installation grants **contents: write**, **pull-requests: write**,
   **issues: write** (for the Dependency Dashboard), **workflows: write** (so the `github-actions`
   manager may update `.github/workflows/*`), **commit statuses: write** and
   **Dependabot alerts: read**. _Alternative:_ replace the app-token step with a
   `RENOVATE_TOKEN` PAT/fine-grained token carrying the same scopes.

   > **Commit statuses: write is not optional.** `minimumReleaseAge` makes Renovate post a
   > `renovate/stability-days` commit status on every branch that still holds a pending release.
   > Without the permission that `POST /repos/:owner/:repo/statuses/:sha` returns
   > `403 integration-unauthorized`, which Renovate reports as `repository-changed` and which
   > **aborts the whole run**. Because branches are processed sequentially, everything after the
   > first affected branch is skipped: no automerge check for open PRs, and no PR creation for
   > branches that already exist. The run still ends as a green workflow, so the failure is silent
   > — look for `result: "repository-changed"` in the log.
   >
   > Without **Dependabot alerts: read** every run logs
   > `Cannot access vulnerability alerts`, and `vulnerabilityAlerts` stays inactive; security PRs
   > then only come from `osvVulnerabilityAlerts`.

2. For automerge to work end to end, check three repository settings:
   - **Settings → General → Pull Requests → Allow auto-merge**: enabled (Renovate uses
     `platformAutomerge`, i.e. GitHub's native auto-merge).
   - **Branch protection for `develop` (and `release/2`, `release/1`, `release/3`) → required status
     checks**: add the CI gate jobs (`check-results`, `validate-pr-title`) so a PR is only merged
     when the pipelines are green. As of 2026-09-09 the `Production branches` ruleset requires
     `Visual Review`, `validate-pr-title`, `validate-release-label` and `CodeQL`, but **not**
     `check-results` — a red pipeline blocks Renovate (it refuses to merge a red branch) but not a
     human. Two of those four are required and therefore may never be skipped by a path filter:
     `codeql.yml` runs on every pull request for exactly that reason, and `visual-review.yml`
     answers a skipped CI run with the status `success` (mode `docs-only`, see
     `scripts/visual-review/resolve-context.mjs`).
   - **Branch protection for `develop` (and `release/*`) → bypass pull request allowances**: the
     runner App (`publicuibot`) must be listed there, so its PRs can merge without a human
     code-owner review.
3. Trigger the workflow once via **Run workflow** (optionally with `dry_run` enabled) to verify it, then
   let the 4-hours schedule take over.

> **Tip:** The `dry_run` input maps to `RENOVATE_DRY_RUN=full`, so the first manual run previews every PR
> Renovate _would_ open without creating anything.

### Option B — Mend-hosted GitHub App (alternative, zero maintenance)

If you would rather not self-host, delete `.github/workflows/renovate.yml` and instead:

1. Have an **org admin** install the [Renovate GitHub App](https://github.com/apps/renovate) on
   `public-ui` (or just on `public-ui/kolibri`).
2. Renovate detects `renovate.json` and opens a Dependency Dashboard issue.
3. Review the dashboard, then let it run on the weekly schedule.

### Troubleshooting: PRs stay open although CI is green

Renovate never explains a refused merge in the PR itself. The runner log does, but only at
`LOG_LEVEL=debug`: start the workflow via **Run workflow** with `log_level: debug` (and `dry_run`
off — a dry run logs `DRY-RUN: Would merge PR` and never sends the request that carries the error).

At `info` level the only trace is one line per PR:

```
INFO: All merge attempts failed (repository=public-ui/kolibri, baseBranch=develop, branch=…)
       "pr": 10833
```

It means Renovate did try. Automerge is configured correctly and the branch is green — GitHub
rejected the `PUT /repos/:owner/:repo/pulls/:number/merge` call. The cause is therefore always a
repository setting or a ruleset, never `renovate.json`. Renovate walks three strategies in order
(the configured `automergeStrategy` first, then merge commit, then rebase); the debug log holds one
`Failed to … PR` block per attempt, each with the HTTP status and GitHub's own message:

| Response                                                  | Meaning                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------- |
| `405` `Squash merges are not allowed on this repository.` | The merge method is not allowed here — see `allowed_merge_methods` below. |
| `405` `Rebase merges are not allowed on this repository.` | Same, for rebase.                                                         |
| `405` `Repository rule violations found: …`               | A ruleset blocks the bot; the text names the rule.                        |
| `403` `Resource not accessible by integration`            | The App lacks **contents: write**.                                        |

Which rules actually apply to a branch is readable without admin rights:

```sh
gh api repos/public-ui/kolibri/rules/branches/develop
```

> **The case of 2026-09-09.** Every green dependency PR sat blocked with `mergeable_state: blocked`
> while the pipelines were green and no review existed. All three attempts failed with `405`. The
> ruleset **Production branches** (it covers the default branch and `release/**`) carries a
> `pull_request` rule whose `allowed_merge_methods` is `["merge"]`, which is what rejected squash
> and rebase; `automergeStrategy` has been set to `merge` since. The merge commit itself was then
> refused by the same rule:
> `New changes require approval from someone other than the last pusher`.
> The bot can never satisfy that one on its own branches, because it is always the last pusher. It
> needs an approval, or an entry in that ruleset's bypass list that covers the `pull_request` rule
> (**Settings → Rules → Rulesets → Production branches → Bypass list**). Mind that a bypass entry
> for the App did **not** end this: with `publicuibot` listed, two consecutive runs were refused
> with this same rule and no other violation. So check the entry itself — `actor_type` has to be
> `Integration` and `bypass_mode` `always`, readable with admin rights via
> `gh api repos/public-ui/kolibri/rulesets/22621638 --jq .bypass_actors`. If it is already both,
> the rule named in the 405 is the only remaining lever: **Require approval of the most recent
> reviewable push** in that ruleset.

Two more silent failures show up as warnings rather than as a blocked PR:

- `Cannot access vulnerability alerts` — **Dependabot alerts: read** is missing, `vulnerabilityAlerts`
  stays inactive and security PRs come from `osvVulnerabilityAlerts` only.
- `Could not ensure issue … integration-unauthorized` — the Dependency Dashboard issue is not being
  updated any more. Check **Issues: write** for the App, and whether the issue itself is locked.

---

## 4. Migration checklist (do this only after Renovate is verified)

Once Renovate runs green for a cycle, retire the overlapping automation to avoid **duplicate PRs**.
Status as of the Renovate activation for `develop`:

- [x] Removed `.github/dependabot.yml` (Renovate now manages GitHub Actions — see the
      `github-actions` group).
- [x] Removed `.github/workflows/auto-dependency-updater.yml` (the daily `ncu` PR job).
- [x] Dropped the `ncu:*` / `update` scripts and the `npm-check-updates` devDependency from the root
      `package.json`, plus `.ncurc.json`.
- [ ] Keep `04 - Update pnpm Lock` if you still want a manual lockfile-refresh button; otherwise
      Renovate's `lockFileMaintenance` covers it.

Until every box is ticked, **leave the existing tooling in place** — Renovate only acts once the
workflow (or app) from [§3](#3-enabling-renovate) actually runs, so there is no conflict in the meantime.

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

Neu hinzugekommen: `minimumReleaseAge: "3 Tage"` schützt vor kompromittierten Releases
(inklusive Security-Updates), `automergeStrategy: merge` folgt der Merge-Commit-Konvention des Repos,
und die `release/*`-Branches werden auf **Security-only** umgestellt — reguläre npm- und
GitHub-Actions-Updates werden dort komplett deaktiviert, während Vulnerability-Alert-PRs
weiterhin (bei Nicht-Major) automatisch mergen.

Die fertige [`renovate.json`](../renovate.json) liegt im Repo-Root (geprüft mit dem offiziellen
`renovate-config-validator`), und der self-hosted Runner-Workflow
[`.github/workflows/renovate.yml`](../.github/workflows/renovate.yml) ist ebenfalls committet.
**Renovate läuft**, sobald der Workflow startet — alle 4 Stunden per Zeitplan oder manuell über den
**Run workflow**-Button (Option A); alternativ kann ein Org-Admin die
[Renovate-GitHub-App](https://github.com/apps/renovate) installieren (Option B). Bis dahin bleibt die
bestehende Dependabot-/ncu-Automatisierung zuständig; danach greift die Migrations-Checkliste oben.
