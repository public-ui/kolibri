# Scripts Overview

## snapshots-docker.mjs

Update theme snapshots locally in the very same Playwright container the CI uses, without the
check-in → CI round trip:

```bash
pnpm test:update:docker default
```

Snapshots are platform specific – `snapshotPathTemplate` contains `{platform}` and font rendering
differs between operating systems – so snapshots generated on a developer machine are only usable if
they are produced inside the pinned Linux image. The script therefore:

1. resolves the image tag from the `@playwright/test` version in `packages/tools/visual-tests`
   (same pin the `03 - Update Snapshots` workflow verifies),
2. mirrors the working tree (including uncommitted changes, excluding `node_modules`, `.git` and
   build output) into the Docker volume `kolibri-visual-tests-work`,
3. runs `pnpm install`, builds the visual-test dependencies and executes `test:update:e2e` as
   uid 1001 (`pwuser` – Firefox refuses to start as root),
4. mirrors only the generated snapshots back into the repository.

Host `node_modules` are never touched; the install inside the volume is reused across runs.

| Option       | Effect                                                                    |
| ------------ | ------------------------------------------------------------------------- |
| `<theme> …`  | Themes to update (default: `default`)                                     |
| `--all`      | All themes, like the CI matrix                                            |
| `--check`    | Only run the tests, write nothing back                                    |
| `--no-purge` | Keep existing snapshots instead of regenerating them from scratch         |
| `--shell`    | Interactive shell inside the prepared container                           |
| `--reset`    | Drop the volume, forcing a fresh install on the next run                  |
| `-- <args>`  | Everything after `--` is passed on to Playwright, e.g. `-- --grep Button` |

## visual-review/

Helpers around the visual report the Playwright runs write to `<package>/visual-report/report.json`
(see [packages/tools/visual-tests](../packages/tools/visual-tests/README.md#visual-report-visual-reportreportjson)).

- `snapshot-paths.mjs` – discovers every package whose `test` script runs `kolibri-visual-test`
  (`theme-default`, `unstyled`, …) and maps it to its folder, its `snapshots/theme-<export>` sub
  folder and its report folder. The export-derived folder names (`theme-desyv11`, `theme-kern_v2`)
  are not guessable from the directory, so every script resolves them here; a new theme package
  takes part without registration. The CI matrices in `ci.yml` and `visual-baseline.yml` still list
  the packages by hand – a unit test in `packages/tools/visual-tests` pins the discovered set.
- `assert-no-errors.mjs <package>` – prints the report summary (and appends it to the GitHub job
  summary), then fails only if routes could not be compared at all. Screenshot differences are a
  review case, not an error.

```bash
node scripts/visual-review/assert-no-errors.mjs theme-default
```

## license-reports.mjs

Generate and merge all package license reports into one Markdown file:

```bash
pnpm license:report
```

The script uses `pnpm license-report` internally for every package and fails with a non-zero exit code if one report cannot be generated or parsed.

## dist-tags.sh

Run the helper script to update npm dist-tags:

```bash
cd scripts
sh dist-tags.sh <action> <version> <tag>
```

Run this from the repository root to tag the current packages.

## deprecate-add.sh

Add deprecation warnings to package versions:

```bash
cd scripts
sh deprecate-add.sh <version> <recommended-version>
```

Example: `sh deprecate-add.sh 2.1.0 2.2.0`

## deprecate-rm.sh

Remove deprecation warnings from package versions:

```bash
cd scripts
sh deprecate-rm.sh <version>
```

Example: `sh deprecate-rm.sh 2.1.0`

## unpublish.sh

**⚠️ DANGER: Use with extreme caution!**

Unpublish specific versions of all packages:

```bash
cd scripts
sh unpublish.sh <version>
```

Example: `sh unpublish.sh 2.1.0-beta.1`

**Note:** npm unpublish can only be used within 72 hours of publication and may break dependent projects. Consider using deprecation instead.
