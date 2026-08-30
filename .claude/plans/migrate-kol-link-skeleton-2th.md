# Working Plan: `refactor/migrate-kol-link-skeleton-2th`

> Companion plan for AI-assisted development. Keep this file updated as work progresses —
> every planned or completed step on this branch belongs here, so another agent can pick up
> seamlessly. Commit plan updates together with (or ahead of) the work they describe.

## Goal

Finish the kol-link skeleton migration: `kol-link` (shadow: true) renders the `LinkFC`
functional component directly; the transitional `kol-link-wc` wrapper
(`packages/components/src/components/link/wc.tsx`) exists only for legacy consumers that
style its internal `.kol-link*` classes from their own stylesheets. Once every consumer
renders `LinkFC` itself, `wc.tsx` is deleted.

**Acceptance criterion: the migration is visually invisible** — see "0. GOAL" under
Open work: zero changed snapshot PNGs vs develop in the PR #10652 diff (or diffs
explicitly accepted in the allowlist there).

Architecture spec: `packages/components/src/components/_skeleton/ARC42.md` (leading),
tutorial: `docs/tutorials/NEW_COMPONENT.md`.

## Current state (2026-08-30, Abend)

Branch contains, on top of the develop merge (`01c202b4`):

**Zero-Visual-Delta default theme: DONE (2026-08-30, commit `016038670a`).**
`node scripts/snapshots-docker.mjs default --check` → 294/294 passed, Exit 0; the 26
default-theme PNGs are restored to develop state (committed with the fix). Remaining
open deltas vs develop: bwst 31, ecl 27, kern 22, desy 21 (default 0). Fixes: shared
mixins `__anchor`-scoping (button/link), tabIndex sentinel in `link/component.tsx` +
`wc.tsx` (no `tabindex="0"` when unset), skip-nav `:focus-within`, tree-item full-width
anchor + `padding-right` on `__anchor`, SpanFC empty-icon guard, default-theme
nav/tree-item/button focus selectors, updated link hydrate snapshots.

| Commit     | Content                                                                                                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ccefa950` | BEM registry: `kol-link` sorted alphabetically, type/const element order aligned                                                                                                                                                                                            |
| `3a293f2a` | aria-expanded regression fix: `ariaExpandedProp` uses `''` sentinel, attribute omitted when unset                                                                                                                                                                           |
| `9853c479` | desy/kern theme fix: `kol-link` mixins take `$anchor-scoped` flag; legacy blocks (kol-button, details heading, tree-item spans) keep root-level styles; kern `--small` gap on anchor with `2x-small`; desy nav anchor stretched; kern tree-item focus rule scoped to anchor |
| `773c10f3` | Quick wins: `buildDefaultPropsFromConfig` deduplicated (`props-from-config.ts`), stale controller comments fixed (meter/api, link/api, icon FC), prop factory logs visible `devWarning` for invalid values                                                                  |
| `26eb56fb` | `createPropDefinition` supports `{ required: true }`: unset required props warn and fall back to default; `hrefProp` is required (explicit `''` stays warning-free by design)                                                                                               |
| `f11a38e4` | CI snapshot baselines updated via `update-snapshots.yml` (run 33298340921, all jobs green): 127 PNGs across all five themes, 51 link-related                                                                                                                                |

## Open work, in priority order

### 0. GOAL (acceptance criterion for the whole PR): zero visual delta

**Every snapshot PNG in the PR diff (https://github.com/public-ui/kolibri/pull/10652/files)
must look exactly like on develop. As long as PNGs differ, the CSS is not finished —
adjust styles until they match.**

- Metric (cumulative visual delta vs develop, run at repo root):
  `git diff --name-only origin/develop...HEAD -- '*.png' | wc -l`
- Status as of 2026-08-30 (Abend): **default 0** (294/294 grün via lokaler Docker-Pipeline
  `node scripts/snapshots-docker.mjs default --check`, Snapshots auf develop-Stand
  zurückgestellt und mit dem Fix committet). Offen: bwst 31, ecl 27, kern 22, desy 21 —
  Summe **101**.
- Iteration loop per adjustment (lokale Pipeline, ~6 min/Theme, deterministisch wie CI):
  1. Vor jedem Lauf root-Cleanup im Volume:
     `docker run --rm -u 0 -v kolibri-visual-tests-work:/work mcr.microsoft.com/playwright:v1.60.0-noble bash -c 'rm -rf /work/repo/packages/themes/<theme>/test-results /work/repo/packages/themes/<theme>/playwright-report'`
  2. `node scripts/snapshots-docker.mjs <theme> --check` — Fehlliste nehmen.
  3. Render vergleichen (`git show origin/develop:<png> > /tmp/dev.png`), CSS in der
     richtigen Schicht anpassen (Theme-Mixin vs. Basis `_link.mixin.scss`; non-link-Blöcke
     brauchen `$anchor-scoped: false` in desy/kern).
  4. Bei grün: Theme-PNGs auf develop-Stand stellen (`git checkout origin/develop -- packages/themes/<theme>/snapshots`), mit dem Fix committen — nur wenn der Check grün ist!
  5. Alternative zur CI: `gh workflow run update-snapshots.yml --ref <branch>` bleibt
     für den finalen Merge-Vorlauf.
- Expected root causes to investigate first (skeleton DOM adds a `div.kol-link` wrapper
  around the anchor that the old anchor-as-root did not have): wrapper
  `display:inline-flex` + `max-width:fit-content` vs old inline anchor sizing, anchor
  `flex:1` inside it, baseline/`align-items` interplay with `line-height`, `--standalone`
  `min-height` via `align-items:stretch`, tooltip positioning relative to the anchor.
- Escape valve: a diff is only acceptable when it is an _intended_ change, explicitly
  listed here with reason and owner approval (currently: none). Everything else counts
  as open work. Do not weaken this by bulk-accepting baseline diffs.

### 1. Migrate consumers off `kol-link-wc` (the strategic step)

Consumers currently rendering `<kol-link-wc>` (grep `KolLinkWcTag`): form, skip-nav,
toolbar, table-stateless, nav, breadcrumb, tree-item, link-button.

- Suggested pilot: `breadcrumb` (renders only, no callbacks). Then the others.
- Pattern (see header comment in `wc.tsx`): the consumer imports `LinkFC` directly and
  renders it inline — **not** another WC tag.
- Per consumer: check the consumer's theme SCSS still reaches the `.kol-link*` classes
  (shadow boundaries!), run the affected theme stylelint, and check theme snapshot impact.
- When the last consumer is migrated: delete `wc.tsx`, remove the tag from
  `core/component-names.ts` and the Stencil config if listed, then prune this plan.

### 2. Decision points (need repo-owner decision, do not implement unilaterally)

- `tabindex="0"` is now always rendered on link anchors (`tabIndexProp` default `0`).
  Either accept + document the new DOM contract, or switch to the `''` sentinel pattern.
- `ariaCurrentValue` is destructured but unused in `LinkFC` (aria-current computation
  happens in the WCs via `onLocationChange`). Drop from the FC face or move computation.
- bwst `mixins/link.scss` gained `gap: to-rem(8)` on `__anchor` — confirm intent
  (harmonization with default theme or accidental visual delta).

### 3. CI baselines before merge — DONE (2026-08-30)

Branch pushed (fast-forward, no conflicts: develop had not moved since merge `01c202b4`),
`update-snapshots.yml` triggered (run 33298340921) and completed green; CI committed
`f11a38e4` ("Update all snapshots", 127 PNGs: bwst 31, ecl 27, default 26, kern 22,
desy 21 — 51 link-related) and the branch was fast-forwarded locally. Visual review of
the regenerated baselines can be done via the commit diff on GitHub.

### 4. Afterwards

Continue the skeleton migration for further legacy components (~80% pending); see
`packages/components/src/components/_skeleton/TODO_PROP_ENFORCEMENT.md` and the
`/migrate-to-skeleton` command.

## Pitfalls (learned the hard way on this branch)

- **Hydrate snapshots test the last build**: run `pnpm --filter @public-ui/components build`
  BEFORE `pnpm --filter @public-ui/hydrate test:update:unit` whenever component markup changed.
- **Prop factory forbids `undefined` internal defaults** (`NonNullable` on
  `__propInternal__`). For "attribute only when set" use the `''` sentinel pattern —
  see `linkRoleProp` and `ariaExpandedProp`.
- **Theme mixin reuse**: a mixin included with a non-link block class (e.g. `kol-button`)
  must not rely on `kol-link__anchor` children — use the `$anchor-scoped: false` mode
  (desy/kern `kol-link` mixins) or verify the target DOM first.
- `tsc` failures about missing `HTMLKol*Element` types usually mean stale generated
  `components.d.ts` — run the components build once.
- Nested internal `-wc` tags are rendered by peer components; grep the tag constant
  (e.g. `KolLinkWcTag`) before planning removals.

## Validation commands (run before every commit)

```bash
pnpm --filter @public-ui/components lint:tsc
pnpm --filter @public-ui/components lint:eslint   # warnings (required-jsdoc) pre-existing
pnpm --filter @public-ui/components test:unit     # implicit build, do not pre-build
pnpm format                                        # or --filter <package> format
# SCSS changes:
pnpm --filter @public-ui/<theme> lint:stylelint    # use --fix variant first
```

Conventional Commits, alphabetically sorted imports/enums, format-first before committing
(see root `AGENTS.md`).
