# Worklist: Theme-Anpassung nach dem `kol-button`-DOM-Umbau

> Gegenstück zu `.claude/plans/migrate-kol-button-skeleton.md`. Diese Arbeit ist **bewusst nicht**
> im PR [#10734](https://github.com/public-ui/kolibri/pull/10734) enthalten: sie ist ohne den
> Pixel-Gate (`node scripts/snapshots-docker.mjs <theme> --check`) nicht verifizierbar, und ein
> plausibel aussehender, ungeprüfter Diff ist für Reviewer nicht von einem geprüften zu
> unterscheiden. Vorgehen und Werkzeuge: `.claude/skills/zero-visual-delta-handoff/SKILL.md`.

## Was sich geändert hat

```diff
- <button class="kol-button kol-button--standalone kol-button--normal">…</button>
+ <div class="kol-button kol-button--standalone kol-button--normal">
+   <button class="kol-button__button">…</button>
+ </div>
```

Gilt für `kol-button` **und** `kol-button-wc`, also auch innerhalb von accordion, badge,
button-link, details, input-file, pagination, popover-button, split-button, tabs und
table-settings.

## Die Regel

Die Klasse `kol-button` sitzt jetzt auf einem Wrapper-`<div>`, das interaktive Element ist
`kol-button__button`. Danach sortieren sich alle Selektoren in drei Gruppen:

| Gruppe                    | Kriterium                                                                                                         | Handlung                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **A — muss wandern**      | Prädikat hängt am `<button>`: `:focus`, `:focus-visible`, `:active`, `:disabled`, `[disabled]`, `[aria-disabled]` | auf `&__button` scopen                                       |
| **B — bleibt**            | `:hover`, `:focus-within`, Modifier-Klassen, Descendant-Selektoren auf `__text` / `.kol-span`                     | unverändert                                                  |
| **C — Custom Properties** | `--text-*` u. ä. auf der Block-Wurzel                                                                             | unverändert; sie vererben durch den Wrapper bis ins `__text` |

**Die gefährlichste Untergruppe von A** sind kombinierte Prädikate wie
`&:not([disabled], [aria-disabled='true']):hover`. Am Wrapper ist `:not([disabled])` **immer
wahr** — deaktivierte Buttons bekämen also Hover-Styling. Solche Regeln fallen nicht einfach aus,
sie kehren sich um. Sie gehören vollständig auf `&__button`, wo `:hover` und `[disabled]` wieder
am selben Element hängen wie vor dem Umbau.

## Mixin-Signaturen

Im Components-Paket ist der Umbau bereits vollzogen: `kol-button-styles` und `kol-link-styles`
(`packages/components/src/components/@shared/_{button,link}.mixin.scss`) nehmen statt des
booleschen `$anchor-scoped` aus #10652 einen Namensparameter:

```scss
@mixin kol-button-styles($block-classname, $interactive-element: 'button') { … }
@mixin kol-link-styles($block-classname, $interactive-element: 'anchor') { … }
```

`null` bedeutet weiterhin „Stile auf dem Klassenträger selbst" — für Blöcke ohne inneres
interaktives Element. Die Theme-Mixins sollten dieselbe Signatur bekommen.

### Include-Sites, die einen expliziten Wert brauchen

| Site                                                                                                                  | Wert                   | Grund                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kol-button('kol-link')` — toolbar, link-button (default, bwst, ecl-eu)                                               | `'anchor'`             | Button-Mixin auf dem Link-Block                                                                                                                                                                                        |
| `kol-link('kol-button', $anchor-scoped: false)` — button-link, nav, split-button (desy, ecl, kern)                    | `'button'`             | Die Stile liegen heute auf `.kol-button` = dem `<button>`; sie müssen am selben **Element** bleiben, nicht am Wrapper                                                                                                  |
| `kol-link('kol-details__heading-button', …)` (desy), `kol-link('kol-tree-item__text' \| '__toggle-button', …)` (kern) | `null`                 | DOM dieser Blöcke ändert sich nicht                                                                                                                                                                                    |
| `kol-link('kol-button')` **ohne** Flag — button-link (default, bwst)                                                  | **unverändert lassen** | Dort ist der `__anchor`-Block heute tot (Button hatte kein `__anchor`). Bei `'button'` würden Farbe, Fokus-Outline und `:visited` neu greifen — eine Verhaltensänderung, kein Zero-Delta. Bewusst separat entscheiden. |
| alle übrigen `kol-button('kol-button')` / `kol-link('kol-link')` (~30)                                                | unverändert            | Default passt                                                                                                                                                                                                          |

Vollständige Liste jederzeit reproduzierbar:

```bash
grep -rn "@include kol-button(\|@include kol-link(\|@include link(\|-styles(" \
  packages/themes/*/src packages/components/src --include='*.scss'
```

## Fundstellen (162 Selektoren im Button-Kontext)

Erzeugt am aktuellen Stand des Branches; Zeilennummern verschieben sich beim Bearbeiten.

### Theme-Button-Mixins — der Kern

| Datei                                | Zeilen                                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `default/src/mixins/button.scss`     | 20, 64, 75, 107, 113                                                                     |
| `bwst/src/mixins/button.scss`        | 22, 67, 78, 110, 116                                                                     |
| `desy/src/mixins/button.scss`        | 18–19, 38–40, 46, 58, 98–99, 141–143, 149, 163, 168–170, 174, 185, 191–193, 203, 207–209 |
| `ecl/src/ecl-ec/mixins/button.scss`  | 13, 24–25, 29, 40–41, 48, 61–62, 68, 80–81, 87, 98, 109–110, 114, 175–176, 182           |
| `ecl/src/ecl-eu/mixins/button.scss`  | 19, 30, 41, 51, 61, 67, 89–90, 103, 107                                                  |
| `kern/src/mixins/_button.mixin.scss` | 16, 20, 66, 75, 112, 117, 129, 133, 145, 149, 156                                        |

In default/bwst steht bei den `@at-root #{$root}:focus`-Regeln seit #10652 bereits
`#{$root}__anchor:focus` daneben — dort ist `#{$root}__button:focus` die direkte Ergänzung.

### Link-Mixins, soweit auf einen Button-Block angewandt

`desy/src/mixins/link.scss` 21, 39, 52, 56, 67, 71, 89, 93, 104, 108, 148 ·
`kern/src/mixins/_link.mixin.scss` 35, 63, 71, 98, 106, 125, 189 ·
`ecl/src/ecl-ec/mixins/link.scss` 19

### Komponenten-Dateien der Themes

`{default,bwst}/src/components/nav.scss` 49/53, 86/87, 90/91, 131/132, 135/136 ·
`desy/src/components/nav.scss` 41 · `ecl/src/ecl-eu/components/nav.scss` 77, 98, 107, 137, 141 ·
`{default,bwst}/src/components/button-link.scss` 17, 29, 35 ·
`bwst/src/components/details.scss` 47, 51 · `default/src/components/details.scss` 41 ·
`kern/src/components/details.scss` 16 ·
`{desy,kern}/src/components/accordion.scss` 44–45, 59, 63, 67, 72 / 27–28, 33 ·
`{desy,ecl-ec,ecl-eu,kern}/src/components/tabs.scss` 51/56, 15/19, 18/24, 21 ·
`ecl/src/ecl-eu/components/pagination.scss` 11, 28, 33–34, 54 ·
`{default,bwst}/src/mixins/kol-table-settings-wc.scss` 35 ·
`kern/src/mixins/_table-settings.mixin.scss` 41 ·
`{default,bwst}/src/mixins/kol-table-stateless-wc.scss` 45, 96, 155/158, 160/163, 168/171 ·
`{default,bwst}/src/mixins/input.scss` 58

## Zusätzlich im Auge behalten

- `packages/components/src/components/tabs/style.scss` ~51: `border-bottom-color/style` und
  `display: block` liegen auf `.kol-button` — jetzt der Wrapper. Der Rahmen wird damit am Wrapper
  statt am Button gezeichnet; optisch an derselben Stelle, aber ein Kandidat für den Pixel-Check.
- `packages/components/src/components/@shared/_popover-button.mixin.scss` ~24
  (`min-width`/`min-height`), `_table-stateless.mixin.scss` ~49 (`color: inherit`),
  `nav/style.scss` ~50 (`text-align`) — alle wrapper-sicher (Vererbung bzw. Box-Rolle), aber
  ungeprüft.
- `packages/components/src/components/button-link/style.scss`: Der Kompensationsblock aus #10652
  („button DOM has no `__anchor`") ist entfernt, weil das geteilte Link-Mixin die Deklarationen
  jetzt über `$interactive-element: 'button'` auf dasselbe **Element** legt wie vorher.

## Abnahme

```bash
node scripts/snapshots-docker.mjs <theme> --check     # je Theme, ca. 6 min
git diff origin/develop..HEAD -- '*.png'              # muss leer sein
```

„CI grün" zählt nicht — die Snapshot-Workflows committen neue Baselines und werden dadurch selbst
grün. Vor jedem Urteil „Baseline ist stale" erst den Base-Code gegen die Baselines laufen lassen.

Nach jedem Theme-Build das Kompilat greppen, statt die Wirkung einer Regel vorauszusetzen:

```bash
tr '}' '\n' < <gebautes-css> | grep kol-button__button
```

Sass-`X &`-Verschachtelung kompiliert innerhalb eines Blocks zu Descendant-Selektoren, die nie
matchen (Skill §4.6).
