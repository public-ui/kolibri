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
- Status as of 2026-08-30 (Nacht): **ALLE THEMES 0** — default, bwst, ecl, kern, desy je
  294/294 grün via lokaler Docker-Pipeline (`node scripts/snapshots-docker.mjs <theme> --check`);
  sämtliche Theme-Snapshots stehen auf develop-Stand. `git diff origin/develop..HEAD -- '*.png'`
  = **0**. Commits: 016038670a (default), c40ce57340 (bwst), 4e9106f6d8 (ecl),
  e4fceaeb97+5482632f2c (kern), 8c30ed9b75 (desy).
- Iteration loop per adjustment (lokale Pipeline, ~6 min/Theme, deterministisch wie CI):
  1. Vor jedem Lauf root-Cleanup im Volume:
     `docker run --rm -u 0 -v kolibri-visual-tests-work:/work mcr.microsoft.com/playwright:v1.60.0-noble bash -c 'rm -rf /work/repo/packages/themes/<theme>/test-results /work/repo/packages/themes/<theme>/playwright-report'`
  2. `node scripts/snapshots-docker.mjs <theme> --check` — Fehlliste nehmen.
  3. Render vergleichen (`git show origin/develop:<png> > /tmp/dev.png`), CSS in der
     richtigen Schicht anpassen (Theme-Mixin vs. Basis; non-link-Blöcke brauchen
     `$anchor-scoped: false` in desy/kern/ecl).
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

- **tabIndex (partially resolved, review #10716 §3):** unset `_tabIndex` no longer renders
  `tabindex="0"` — done in `016038670a` via double-cast + factory bypass in
  `component.tsx`/`wc.tsx` (duplicated). Open owner decision: refactor to the `''` sentinel
  pattern in `tabIndexProp` itself (like `ariaExpandedProp`), which removes both copies and
  the cast. The entry below is the outdated original text, kept for the record:
  ~~`tabindex="0"` is now always rendered on link anchors (`tabIndexProp` default `0`).~~
- `ariaCurrentValue` is destructured but unused in `LinkFC` (aria-current computation
  happens in the WCs via `onLocationChange`). Drop from the FC face or move computation.
- ~~bwst `mixins/link.scss` gained `gap: to-rem(8)` on `__anchor`~~ — RESOLVED: the gap was
  an accidental visual delta and broke link/icons, link/target, quote, table, modal against
  develop; removed in `c40ce5734` (bwst 294/294 green without it).
- **Open regression issues not yet tracked here (review #10716 §5):** #10687
  (`setEventTarget`/`event.target`), #10688 (`_download=""` triggers no download —
  `internal/functional-components/link/component.tsx:52`), #10689 (disabled on block
  modifier vs `aria-disabled` on anchor), #10690 (`a11yHint`/`uiUxHint`). Owner: decide
  "before merge" vs "after merge, consciously" for each.
- **Test coverage for `kol-link-wc` (review #10716 §4.2):** `link/test/snapshot.spec.tsx`
  renders only `[KolLink]`; the path all 8 consumers use has no unit test. Restore before
  starting the consumer migration (Open work §1).

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
  (desy/kern/ecl `kol-link` mixins) or verify the target DOM first.
- `tsc` failures about missing `HTMLKol*Element` types usually mean stale generated
  `components.d.ts` — run the components build once.
- Nested internal `-wc` tags are rendered by peer components; grep the tag constant
  (e.g. `KolLinkWcTag`) before planning removals.
- **Sass `X &` in mixins**: inside a nested block `&` is the full parent path —
  `X &` silently produces descendant selectors (`​.kol-link__anchor .kol-link …`) that
  never match. Prefer plain `&:…` on the carrier level or `@at-root`.
- **Proben müssen Route-Viewports beachten**: einige Routen setzen
  `snapshot.viewportSize` (breadcrumb 600, narrow-320-Blöcke). Eigene Playwright-Proben
  ohne diese Option rendern ein anderes Layout als der Check und führen in die Irre.
- **Mirror löscht Fremddateien**: `mirror-dir.mjs` entfernt im Volume alles, was im
  Quell-Repo fehlt — temporäre probe.spec.js NACH dem Spiegeln ins Volume schreiben.
- **`:focus-within` statt `:focus` am Wrapper**: der skeleton-Wrapper ist nie fokussiert;
  Fokus-Optik (Outline/box-shadow/Füllung) braucht `:focus-within`-Varianten bzw.
  `__anchor:focus`-Unterdrückung der UA-Outline — je Theme-Button-Mixin.
- Root-Stile (padding, Farbe, Marker-::before) müssen im Zweifel auf den Anker wandern,
  wenn develop sie auf dem anchor-as-root trug — sonst verschieben sich Fokus-Ring-Box
  und Zeilenhöhen (kern skip-nav/breadcrumb).

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
