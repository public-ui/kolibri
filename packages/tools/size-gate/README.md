# @public-ui/size-gate

Tracks the artifact size of the KoliBri components and themes, renders a treemap and reports size
deviations against a baseline. The comparison is informational: it never fails a build and never
blocks a merge. The baseline is not committed; the "Size Baseline" workflow computes it live on the
target branch and pull-request runs download it (`pnpm size:pull` locally). Private workspace tool;
see [docs/SIZE_GATE.md](../../../docs/SIZE_GATE.md) for the metrics and the workflow.

```bash
kolibri-size-gate <components|theme> [--mode gate|analysis] [--update] [--dir <dist>] [--maps <dir>] [--baseline <file>] [--out <dir>]
```

| Option       | Default                                 | Effect                                                                                                                                                  |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components` |                                         | Analyses `dist/esm` of `@public-ui/components`.                                                                                                         |
| `theme`      |                                         | Analyses `dist/index.mjs` of a theme package.                                                                                                           |
| `--mode`     | `gate`                                  | `gate`: reports the deviations from the baseline. `analysis`: adds treemap, hotspots, duplicates and restructuring candidates. Neither mode ever fails. |
| `--update`   |                                         | Writes the current sizes as a baseline for comparison.                                                                                                  |
| `--dir`      | `dist/esm` (components), `dist` (theme) | Build output to analyse.                                                                                                                                |
| `--maps`     | `source-maps/esm` (components)          | Source maps, if they do not sit next to the chunks.                                                                                                     |
| `--baseline` | `size-baseline.json`                    | Baseline file; without one the sizes are reported without comparison.                                                                                   |
| `--out`      | `size-report`                           | Directory for `report.json`, `report.md` and, in the analysis, `treemap.html`.                                                                          |

The command runs in the package directory, always exits with 0 (2 on usage errors or a missing build) and appends the Markdown
report to `$GITHUB_STEP_SUMMARY` when it is set.

## Modules

| File                         | Responsibility                                                   |
| ---------------------------- | ---------------------------------------------------------------- |
| `src/sizes.mjs`              | raw, gzip and brotli sizes                                       |
| `src/package-of.mjs`         | source path → owner (package, Stencil runtime, own folder, CSS)  |
| `src/attribute.mjs`          | bytes per source of a generated file via its source map          |
| `src/graph.mjs`              | import graph, static closure and load count of the chunks        |
| `src/css-duplicates.mjs`     | CSS rules repeated across sheets                                 |
| `src/analyze-components.mjs` | core, entries, hotspots, duplicates of `dist/esm`                |
| `src/analyze-theme.mjs`      | CSS strings per tag, duplicates, comments of a theme bundle      |
| `src/gate.mjs`               | comparison with the baseline                                     |
| `src/pr-comment.mjs`         | status comment on the pull request (CI step `Size gate comment`) |
| `src/report-md.mjs`          | Markdown report                                                  |
| `src/report-html.mjs`        | self-contained treemap page                                      |
| `src/tree.mjs`               | treemap hierarchy                                                |

```bash
pnpm --filter @public-ui/size-gate test:unit
```
