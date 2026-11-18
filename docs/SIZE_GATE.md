# Size gate

The size gate tracks the artifact size of `@public-ui/components` and `@public-ui/theme-default` in
every pull request. It renders a treemap of where the bytes come from, names restructuring
candidates and fails the CI when an artifact grows beyond the tolerance of its committed baseline.

The tool is the workspace package [`@public-ui/size-gate`](../packages/tools/size-gate/README.md)
(`kolibri-size-gate`).

## Run it locally

```bash
pnpm --filter "@public-ui/components..." build:size
```

```bash
pnpm --filter @public-ui/theme-default build
```

```bash
pnpm size
```

`build:size` is the regular build with `KOLIBRI_SOURCE_MAP=true`. The build then moves the source maps
out of `dist` and `www` into `packages/components/source-maps/` and removes the `sourceMappingURL`
comments (`scripts/stash-source-maps.mjs`): bundlers resolve the lazy loader's dynamic import
`./${bundleId}.entry.js…` with the glob `./*.entry.js*` and would otherwise fail on the `.map` files.
`dist` is therefore identical to a build without source maps. Without source maps the gate still
measures every chunk exactly, but cannot attribute the bytes to modules. Each package writes
`size-report/` with `treemap.html` (interactive), `report.md` (the CI summary) and `report.json`.

## Status comment on the pull request

The CI job `build-and-check` keeps one comment on every pull request, marked with
`<!-- size-gate -->`, and updates it on every push. It shows whether the gate passed, the
reports of both packages and a link to the CI run with the `size-report` artifact. If the gate
did not run because an earlier step failed, the comment says so. Pull requests from forks get a
read-only token; for them the comment is not written and the job summary carries the report.

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

## Gate rules

| Rule                                                               | Result  |
| ------------------------------------------------------------------ | ------- |
| `core`, `entry:*`, `sheet:*` grow by more than max(2 %, 1 KB gzip) | fail    |
| `total`, `sheets`, `redundant` grow by more than 2 %               | fail    |
| A package becomes a new hotspot                                    | fail    |
| A module is newly duplicated across chunks                         | fail    |
| A new component or sheet appears                                   | warning |
| A metric shrinks by more than its tolerance                        | notice  |

The tolerance lives in `size-baseline.json` (`tolerance.percent`, `tolerance.bytes`) of each package.

## When the gate fails

1. Open the treemap from the CI artifact `size-report` (or `size-report/treemap.html` locally) and
   zoom into the metric that grew. The table below the map lists the current level by size.
2. Reduce the growth where it is unintended: import a dependency where it is needed instead of in a
   shared module, load rarely used code with a dynamic `import()`, move CSS that many sheets repeat
   into the `GLOBAL` sheet of the theme.
3. If the growth is intended, run `pnpm size:update`, commit the changed `size-baseline.json` and
   state the reason in the pull request. A smaller baseline can be committed at any time.

## Restructuring candidates

Every report ranks candidates by their impact. They do not fail the gate; they point to the largest
savings.

| Kind                 | Impact                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| `hotspot`            | gzip size of a dependency that every entry loading its chunk pays for. |
| `duplicate`          | gzip size of the extra copies of a module.                             |
| `outlier`            | gzip size of an entry above the median entry, if it is above twice it. |
| `css-duplicate`      | Raw bytes of a group of CSS rules repeated across sheets.              |
| `css-comments`       | Raw bytes of comments compiled into the CSS strings.                   |
| `bundled-dependency` | Raw bytes of `@public-ui/components` code bundled into the theme.      |

The first baseline (4.6.0-rc.3) lists, among others:

- `markdown-it` with `entities`, `linkify-it`, `mdurl`, `uc.micro` and `punycode.js` in the core:
  about 93 KB gzip on every page, although only `kol-badge` renders Markdown
  (`packages/components/src/utils/markdown.ts`).
- The icon font CSS of `@include kol-icon-theme` in 40 sheets of `theme-default` (8.8 MB raw) and a
  second copy scoped to `.kol-form-field__label` in 17 sheets (4.7 MB raw), see
  [#11623](https://github.com/public-ui/kolibri/issues/11623).
