# @public-ui/size-gate

Tracks the artifact size of the KoliBri components and themes, renders a treemap and gates size
regressions against a committed baseline. Private workspace tool; see
[docs/SIZE_GATE.md](../../../docs/SIZE_GATE.md) for the metrics and the workflow.

```bash
kolibri-size-gate <components|theme> [--update] [--dir <dist>] [--baseline <file>] [--out <dir>]
```

| Option       | Default                                 | Effect                                                    |
| ------------ | --------------------------------------- | --------------------------------------------------------- |
| `components` |                                         | Analyses `dist/esm` of `@public-ui/components`.           |
| `theme`      |                                         | Analyses `dist/index.mjs` of a theme package.             |
| `--update`   |                                         | Writes the current sizes as the new baseline.             |
| `--dir`      | `dist/esm` (components), `dist` (theme) | Build output to analyse.                                  |
| `--baseline` | `size-baseline.json`                    | Baseline file.                                            |
| `--out`      | `size-report`                           | Directory for `report.json`, `report.md`, `treemap.html`. |

The command runs in the package directory, exits with 1 when the gate fails and appends the Markdown
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
