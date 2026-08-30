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

Architecture spec: `packages/components/src/components/_skeleton/ARC42.md` (leading),
tutorial: `docs/tutorials/NEW_COMPONENT.md`.

## Current state (2026-08-30)

Branch contains, on top of the develop merge (`01c202b4`):

| Commit     | Content                                                                                                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ccefa950` | BEM registry: `kol-link` sorted alphabetically, type/const element order aligned                                                                                                                                                                                            |
| `3a293f2a` | aria-expanded regression fix: `ariaExpandedProp` uses `''` sentinel, attribute omitted when unset                                                                                                                                                                           |
| `9853c479` | desy/kern theme fix: `kol-link` mixins take `$anchor-scoped` flag; legacy blocks (kol-button, details heading, tree-item spans) keep root-level styles; kern `--small` gap on anchor with `2x-small`; desy nav anchor stretched; kern tree-item focus rule scoped to anchor |
| `773c10f3` | Quick wins: `buildDefaultPropsFromConfig` deduplicated (`props-from-config.ts`), stale controller comments fixed (meter/api, link/api, icon FC), prop factory logs visible `devWarning` for invalid values                                                                  |
| `26eb56fb` | `createPropDefinition` supports `{ required: true }`: unset required props warn and fall back to default; `hrefProp` is required (explicit `''` stays warning-free by design)                                                                                               |

## Open work, in priority order

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

### 3. CI baselines before merge

Push the branch, then trigger `gh workflow run update-snapshots.yml --ref
refactor/migrate-kol-link-skeleton-2th` and review the visual diffs (the restored
kern/desy styles must reproduce the previous look). Theme visual snapshots carry a
`{platform}` suffix — only CI (linux) can update them.

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
