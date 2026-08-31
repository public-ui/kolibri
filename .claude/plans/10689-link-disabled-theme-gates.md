# Fix #10689 — Disabled-Gates der Link-Themes auf `kol-link--disabled` migrieren

Status: **Umgesetzt** (Branch: `fix/10689-link-disabled-theme-gates`)

Nachtrag Umsetzung: Zusätzlich zu den Gate-Erweiterungen mussten die parameterlosen
Sub-Mixins `ghostButton()` (desy) und `ghost-button()` (ecl-ec) den `$block-classname`
durchreichen (Sass-lexikalischer Scope) — deren externe Call-Sites (pagination, table,
table-settings, details, nav) wurden auf `'kol-button'` umgestellt. Stylelint hat die
ecl-`link.scss`-Ketten `:not(A):not(B)` zu `:not(A, B)` zusammengeführt (äquivalent).
Verifikation: Builds aller vier Themes grün, kompiliertes CSS enthält die neuen Gates,
`lint:stylelint` und `format` sauber.

## Befund

Vor der Skeleton-Migration (#10652) trug das `<a>` selbst Klasse `kol-link` **und** `aria-disabled`.
Seitdem liegen sie getrennt: Modifikator `kol-link--disabled` am Block-Div, `aria-disabled="true"` +
`tabIndex="-1"` am `a.kol-link__anchor` (`packages/components/src/internal/functional-components/link/component.tsx:69,84,93`).

Alle fünf Themes wenden ihr Button-Mixin via `components/link-button.scss` auf den `.kol-link`-**Block**
an — dessen Disabled-Gates greifen dort nicht mehr (Hover-/Aktiv-Styles laufen auf deaktivierten Links):

| Theme         | Gates                                                                                                                              | Status                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| default       | `mixins/button.scss:64,75` `:not([disabled], [aria-disabled='true']):hover`, `:113` `:is(:disabled, [aria-disabled='true']):hover` | **Regression** (vor Migration funktional)            |
| bwst          | `mixins/button.scss:67,78,116` (identisch)                                                                                         | **Regression**                                       |
| desy          | `mixins/button.scss` `:not([disabled]):hover` (38, 141, 168, 191, 207)                                                             | vorbestehende Lücke (`[disabled]` war nie auf `<a>`) |
| ecl-ec/ecl-eu | `mixins/button.scss` `:not(:disabled):hover`; Link-Hover ohne Gate (`ecl-ec/mixins/link.scss:15`)                                  | vorbestehende Lücke (`:disabled` matched nie `<a>`)  |
| kern          | bereits `:not(.kol-link--disabled)`                                                                                                | Referenz, keine Änderung                             |

Das im Issue genannte desy-Link-Gate (`mixins/link.scss:39`) ist inzwischen via `$anchor-scoped`
am Anker und damit funktional — betroffen ist der Button-Mixin-Pfad. Legacy-`kol-button` trägt
natives `disabled` **und** `kol-button--disabled`
(`packages/components/src/components/button/component.tsx:171,179`), daher werden die Gates um den
Modifikator erweitert und die Attribut-Checks bleiben erhalten.

## Beschlossene Strategie

- **Selektor-Migration in den Themes** (Vorbild kern), **keine** Component-Änderung
  (`aria-disabled` wird NICHT auf den Block-Div gespiegelt — semantisch fragwürdig und wäre nur
  für default/bwst wirksam).
- **Umfang: alle Themes** (default, bwst, desy, ecl-ec, ecl-eu) — Disabled-Suppression überall
  konsistent mit kern. Visuelle Static-Snapshots bleiben unverändert (Hover wird nicht gesnapshottet).

## Änderungen

1. **default** `src/mixins/button.scss` (Zeilen 64, 75, 113):
   `:not([disabled], [aria-disabled='true'])` → `:not([disabled], [aria-disabled='true'], .#{$block-classname}--disabled)`
   bzw. `:is(:disabled, [aria-disabled='true'])` → `:is(:disabled, [aria-disabled='true'], .#{$block-classname}--disabled)`
2. **bwst** `src/mixins/button.scss` (Zeilen 67, 78, 116): dieselben Erweiterungen.
3. **desy** `src/mixins/button.scss` (Zeilen 38, 141, 168, 191, 207):
   `:not([disabled])` → `:not([disabled], .#{$block-classname}--disabled)`.
   Die `&:disabled`-Zustandsregeln bleiben NICHT angefasst (galten nie für Links, sonst visueller Delta).
4. **ecl-ec + ecl-eu** `src/*/mixins/button.scss`: alle `:not(:disabled)`-Hover-Gates →
   `:not(:disabled, [aria-disabled='true'], .#{$block-classname}--disabled)`.
5. **ecl-ec + ecl-eu** `src/*/mixins/link.scss`: Hover im `link-carrier`-Mixin gaten:
   `&:not([aria-disabled='true']):not(:disabled):hover` (anker-scoped kol-link via Attribut,
   Legacy-Button-Carrier via `:disabled`).

Nicht in Scope: desys Carrier-Gates für kol-button (`[aria-disabled]` vs. natives `disabled`) —
lösen die spätere kol-button-Skeleton-Migration.

## Qualitätssicherung

- [ ] `pnpm format` + `pnpm --filter <theme> lint:stylelint --fix` je Package
- [ ] Themes kompilieren (Build)
- [ ] Visuelle Tests: Static-Snapshots unverändert; bei Drift nur per CI
      (`gh workflow run update-snapshots.yml --ref <branch>`, Plattform-Suffix linux)
- [ ] Manueller Smoke: Sample-App `link-button` disabled-Story, Hover vor/nachher (default-Theme)

## Commit/PR

- Conventional Commit: `fix(themes): gate link hover/active styles on kol-link--disabled modifier`
- PR verweist auf Issue #10689.
