# Size gate

KoliBri tracks the artifact size of `@public-ui/components` and `@public-ui/theme-default` in two
parts, both run by the workspace tool [`@public-ui/size-gate`](../packages/tools/size-gate/README.md)
(`kolibri-size-gate`):

- **Size gate (every pull request).** The CI job `build-and-check` compares the sizes of the pull
  request with the baseline of its base branch. No baseline is committed: the workflow
  _Size Baseline_ computes it live on every push to `develop`, `main` and `release/*` and publishes
  it as the artifact `size-baseline` (90 days retention); the pull-request run picks the artifact of
  its base commit (`scripts/size-baseline/select-baseline.mjs`) and installs it before comparing.
  The comparison is informational: it never fails a build and never blocks a merge. It needs no
  source maps.
- **Size analysis (manual start).** The workflow _Size Analysis_ builds with source maps and renders
  a treemap of where the bytes come from, the hotspots, duplicated modules, CSS repeated across sheets
  and the restructuring candidates. Start it with Actions → _Size Analysis_ → _Run workflow_ on the
  branch to analyse; the result is the artifact `size-analysis` and the job summary.

## Run it locally

Size gate, after a regular build:

```bash
pnpm --filter "@public-ui/theme-default..." build
```

```bash
pnpm size
```

Without an installed baseline the report shows the sizes without comparison. To compare against a
base branch, install its baseline first (requires `gh auth login`):

```bash
pnpm size:pull --branch release/4
```

`pnpm size:update` instead writes the sizes of a local build as `size-baseline.json` (gitignored),
which is how the _Size Baseline_ workflow produces the artifact and how two local builds can be
compared.

Size analysis, after a build with source maps:

```bash
pnpm --filter "@public-ui/components..." build:size
```

```bash
pnpm --filter @public-ui/theme-default build
```

```bash
pnpm size:analyze
```

`build:size` is the regular build with `KOLIBRI_SOURCE_MAP=true`. The build then moves the source maps
out of `dist` and `www` into `packages/components/source-maps/` and removes the `sourceMappingURL`
comments (`scripts/stash-source-maps.mjs`): bundlers resolve the lazy loader's dynamic import
`./${bundleId}.entry.js…` with the glob `./*.entry.js*` and would otherwise fail on the `.map` files.
`dist` is therefore identical to a build without source maps, and the gate measures the same sizes
either way. Each package writes `size-report/` with `report.md`, `report.json` and, in the analysis,
`treemap.html`.

## Status comment on the pull request

The size gate keeps at most one comment on a pull request, marked with `<!-- size-gate -->`:

- It is created only when a metric changes notably: a metric beyond the tolerance or a new metric, or
  a change of at least 1 KB (gzip, raw for `redundant`). It lists at most five such metrics per
  package; the job summary of the CI run lists all of them.
- Once it exists, every later run updates it. Without a notable change it shrinks to one line, so it
  never shows a stale status. If the size step did not run because an earlier step failed, it says so.
- Pull requests from forks get a read-only token; for them no comment is written and the job summary
  carries the report.

## What is measured

All sizes are measured with gzip level 9 and brotli quality 11; the gate compares gzip, except where a
row says `raw`. Compressed sizes per module are distributed in proportion to the raw bytes of the module
in its chunk, because compression works across module borders.

### `@public-ui/components` (`dist/esm`, the lazy loader build)

| Metric        | Meaning                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core`        | `loader.js`, `index.js` and their static imports, plus every chunk that at least half of all entries load. A page that uses any component pays it once. |
| `entry:<tag>` | What one component adds on top of the core: its `*.entry.js` and the chunks of its static imports outside the core.                                     |
| `total`       | All files of `dist/esm`.                                                                                                                                |
| `hotspots`    | Third-party packages with at least 5 KB gzip in a chunk that more than one entry loads.                                                                 |
| `duplicates`  | Source modules the bundler copied into more than one chunk.                                                                                             |

### `@public-ui/theme-default` (`dist/index.mjs`)

| Metric        | Meaning                                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sheet:<TAG>` | The CSS string `createTheme` assigns to the tag – the sheet each component instance adopts.                                                                                                                                                                                      |
| `sheets`      | All CSS strings together.                                                                                                                                                                                                                                                        |
| `redundant`   | Raw bytes of CSS that at least three sheets carry as identical copies (same rule, same declarations, same `@layer`/`@media` context), counted for every copy after the first. Rules that occur in the same set of sheets form one group, typically the output of one Sass mixin. |
| `total`       | The bundle `dist/index.mjs`.                                                                                                                                                                                                                                                     |

## Report rules

The comparison marks deviations; it never fails anything.

| Rule                                                               | Report              |
| ------------------------------------------------------------------ | ------------------- |
| `core`, `entry:*`, `sheet:*` grow by more than max(2 %, 1 KB gzip) | ❌ beyond tolerance |
| `total`, `sheets`, `redundant` grow by more than 2 %               | ❌ beyond tolerance |
| A new component or sheet appears                                   | warning             |
| A metric shrinks by more than its tolerance                        | improvement         |

The tolerance travels with the baseline (`tolerance.percent`, `tolerance.bytes`); without a baseline
file the report falls back to the same default and lists every metric as new. A new hotspot or a newly
duplicated module shows up through the growth of `core` or `entry:*`; the analysis names it as such
(`hotspots` and `duplicates`, compared for information).

## When a metric grows

1. Run the _Size Analysis_ on the branch (or `pnpm size:analyze` locally), open `treemap.html` from
   the artifact `size-analysis` and zoom into the metric that grew. The table below the map lists the
   current level by size.
2. Reduce the growth where it is unintended: import a dependency where it is needed instead of in a
   shared module, load rarely used code with a dynamic `import()`, move CSS that many sheets repeat
   into the `GLOBAL` sheet of the theme.
3. The report never blocks the merge. If the growth is intended, state the reason in the pull
   request – nothing else to do; the next baseline of the base branch picks the sizes up.

## Restructuring candidates

The analysis ranks candidates by their impact. They do not fail anything; they point to the largest
savings.

| Kind                 | Impact                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| `hotspot`            | gzip size of a dependency that every entry loading its chunk pays for. |
| `duplicate`          | gzip size of the extra copies of a module.                             |
| `outlier`            | gzip size of an entry above the median entry, if it is above twice it. |
| `css-duplicate`      | Raw bytes of a group of CSS rules repeated across sheets.              |
| `css-comments`       | Raw bytes of comments compiled into the CSS strings.                   |
| `bundled-dependency` | Raw bytes of `@public-ui/components` code bundled into the theme.      |
