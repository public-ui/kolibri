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

A `--check` run is an acceptance run: its result is evidence, so it is pinned to one worker
(parallel Firefox instances render sub-pixel-flaky) no matter how many themes were selected.
Baseline updates keep the parallel default, where throughput is what counts.
`KOLIBRI_VISUAL_TESTS_WORKERS` overrides both.

## check-skeleton-selectors.mjs

Guards the two selector mistakes that the skeleton architecture makes easy to write and that a
visual snapshot cannot catch, because snapshots photograph resting states:

```bash
pnpm check:skeleton-selectors
```

Since the skeleton migration the block class sits on a wrapper element and the interactive element
is a child of it (`<div class="kol-button"><button class="kol-button__button">`). Two things follow:

1. **Modifier-glued element** — inside a modifier block, `&__button` expands to
   `.kol-button--primary__button`, a class that exists nowhere. The rule is silently dead. Use a
   plain descendant instead.
2. **State predicate on the carrier** — `:focus`, `:focus-visible` and `:disabled` never match the
   wrapper, so those rules are dead; and `:not(:disabled)` / `:not([disabled])` are always *true* on
   it, so a combined predicate such as `.kol-button:not([disabled]):hover` does not merely stop
   matching, it **inverts** and starts styling disabled elements.

`:hover`, `:active` and `:focus-within` are not flagged — they reach the wrapper through ancestor
propagation and keep working where they are.

The checker parses each stylesheet into a block tree, resolves Sass `&` nesting and expands
same-file `@include`s, so a mixin body is checked in the selector context it is used in. It reports
file, line and resolved selector, and exits non-zero on any finding. `--json` prints machine-readable
output. It is a complement to the pixel gate, not a replacement: the two check disjoint sets.

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
