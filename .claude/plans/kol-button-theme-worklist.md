# Worklist: Theme-Anpassung nach dem `kol-button`-DOM-Umbau

> Gegenstück zu `.claude/plans/migrate-kol-button-skeleton.md`. Diese Arbeit **ist** inzwischen in
> PR [#10734](https://github.com/public-ui/kolibri/pull/10734) enthalten — die frühere Aussage, sie
> sei bewusst ausgeklammert, galt für den Stand vom 01.09. und ist überholt. Offen ist allein die
> Abnahme über den Pixel-Gate (siehe _Abnahme_). Vorgehen und Werkzeuge:
> `.claude/skills/zero-visual-delta-handoff/SKILL.md`.

## Was sich geändert hat

```diff
- <button class="kol-button kol-button--standalone kol-button--normal">…</button>
+ <div class="kol-button kol-button--standalone kol-button--normal">
+   <button class="kol-button__interactive-element">…</button>
+ </div>
```

Gilt für `kol-button` **und** `kol-button-wc`, also auch innerhalb von accordion, badge,
button-link, details, input-file, pagination, popover-button, split-button, tabs und
table-settings. `kol-link` hat dieselbe Form mit `kol-link__interactive-element`.

## Die Regel

Die Klasse `kol-button` sitzt auf einem Wrapper-`<div>`, das interaktive Element ist
`kol-button__interactive-element`. Danach sortieren sich alle Selektoren in drei Gruppen:

| Gruppe                    | Kriterium                                                                                                         | Handlung                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **A — muss wandern**      | Prädikat hängt am `<button>`: `:focus`, `:focus-visible`, `:active`, `:disabled`, `[disabled]`, `[aria-disabled]` | auf `&__interactive-element` scopen                          |
| **B — bleibt**            | `:focus-within` (propagiert), Modifier-Klassen, Descendant-Selektoren auf `__text` / `.kol-span`                  | unverändert                                                  |
| **C — Custom Properties** | `--text-*` u. ä. auf der Block-Wurzel                                                                             | unverändert; sie vererben durch den Wrapper bis ins `__text` |

**Die gefährlichste Untergruppe von A** sind kombinierte Prädikate wie
`&:not([disabled], [aria-disabled='true']):hover`. Am Wrapper ist `:not([disabled])` **immer
wahr** — deaktivierte Buttons bekämen also Hover-Styling. Solche Regeln fallen nicht einfach aus,
sie kehren sich um. Sie gehören vollständig auf `&__interactive-element`, wo `:hover` und
`[disabled]` wieder am selben Element hängen wie vor dem Umbau.

`:hover` und `:active` allein propagieren auf Vorfahren und funktionieren am Wrapper weiter — nur
in Kombination mit einem `disabled`-Prädikat kippen sie. `:focus` propagiert **nicht**: ein
`:focus` am Wrapper-`div` trifft nie, der Fokusring fällt ersatzlos aus.

### Zweite Fehlerklasse: Descendant-Selektoren unter dem Block

Die Tabelle oben betrifft Zustands-Prädikate. Es gibt eine zweite, unabhängige Klasse: **jeder
Descendant-Selektor unter dem Block trifft jetzt zusätzlich den Tooltip**, weil dieser vom
Geschwister des Buttons zum Kind des Wrappers geworden ist.

```scss
.kol-button {
	.kol-span__label {
		font-weight: 500;
	} /* trifft jetzt AUCH den Tooltip-Text */
}
```

Der Tooltip rendert intern einen `SpanFC` und setzt selbst keine Schrifteigenschaften — er erbt
und matcht alles, was der Wrapper anbietet. Solche Regeln gehören auf
`&__interactive-element` (oder ein BEM-Element wie `&__text`, das den Tooltip nicht erfasst).

Das war die tatsächliche Ursache der drei kern-Diffs, die zwischenzeitlich als nicht behebbarer
Firefox-Bug in der Allowlist standen. Betroffen sind alle Eigenschaften, die im Tooltip sichtbar
werden können: `font-weight`, `font-size`, `gap`, `font-family`, Farben.

**Diagnose-Merkmal:** identische Geometrie, aber abweichende Pixeldeckung an genau einer Textstelle
→ Selektor-Reichweite prüfen, nicht Compositing.

**Ein `&__button` gibt es nicht.** Eine frühere Fassung dieser Worklist nannte `&__button` als
Ziel; dieser Klassenname wurde im Zuge des Reviews zu `__interactive-element` vereinheitlicht
(Commit `35a74e0661`), damit `kol-button` und `kol-link` dieselbe Struktur haben. Selektoren auf
`.kol-button__button` matchen nichts.

## Mixin-Signaturen

Im Components-Paket nehmen `kol-button-styles` und `kol-link-styles`
(`packages/components/src/components/@shared/_{button,link}.mixin.scss`) nur noch den
Block-Namen — der `$interactive-element`-Parameter aus einer Zwischenfassung ist entfallen, weil
beide Blöcke das interaktive Element jetzt gleich benennen:

```scss
@mixin kol-button-styles($block-classname) { … }
@mixin kol-link-styles($block-classname) { … }
```

Beide werden auch kreuzweise aufgerufen (`kol-button-styles('kol-link')` in toolbar und
link-button), deshalb ist der Block-Name weiterhin ein Parameter.

Vollständige Liste der Include-Sites jederzeit reproduzierbar:

```bash
grep -rn "@include kol-button(\|@include kol-link(\|@include link(\|-styles(" \
  packages/themes/*/src packages/components/src --include='*.scss'
```

## Verifikation

Die Selektor-Migration ist mechanisch prüfbar — Snapshots leisten das **nicht**, weil sie
Ruhezustände fotografieren und `:hover`/`:focus`/`:disabled` darin nicht vorkommen. Beide Greps
müssen leer bleiben:

```bash
# 1. Tote Selektoren auf dem alten Klassennamen
rg -n '__button:(focus|hover|active|disabled|is|not)' packages/themes packages/components/src --glob '*.scss'

# 2. Zustandsprädikate am Wrapper statt am interaktiven Element
rg -n '\.kol-(button|link):(not\(|disabled|focus)' packages/themes packages/components/src --glob '*.scss'
```

Treffer in (2) sind einzeln zu beurteilen: `:focus-within` am Wrapper ist korrekt (propagiert),
`:focus` und `:disabled` sind es nie.

Nach jedem Theme-Build zusätzlich das Kompilat greppen, statt die Wirkung einer Regel
vorauszusetzen — auch auf Modifier-Expansion, die zu nichts passt:

```bash
tr '}' '\n' < <gebautes-css> | grep 'kol-button__interactive-element'
tr '}' '\n' < <gebautes-css> | grep -E '\-\-[a-z-]+__'   # muss leer sein
```

Der zweite Grep fängt den Fall, dass `&__interactive-element` innerhalb eines Modifier-Blocks
(`&--primary`) steht und zu `.kol-button--primary__interactive-element` expandiert. Sass-`X &`-
Verschachtelung kompiliert innerhalb eines Blocks zu Descendant-Selektoren, die nie matchen
(Skill §4.6).

## Abnahme

```bash
node scripts/snapshots-docker.mjs <theme> --check     # je Theme, ca. 6 min
git diff origin/develop..HEAD -- '*.png'              # muss leer sein
```

„CI grün" zählt nicht — die Snapshot-Workflows committen neue Baselines und werden dadurch selbst
grün. Vor jedem Urteil „Baseline ist stale" erst den Base-Code gegen die Baselines laufen lassen.

## Zusätzlich im Auge behalten

- `packages/components/src/components/tabs/style.scss`: `border-bottom-color/style` liegt auf
  `.kol-button__interactive-element`, `display: block` auf dem Wrapper. Der forced-colors-Block
  erkennt den Fokus über `:has(.kol-button__interactive-element:focus-visible)`, weil der Outline
  am Wrapper sitzt, den Fokus aber nur das innere Element bekommt.
- `packages/components/src/components/@shared/_popover-button.mixin.scss`,
  `_table-stateless.mixin.scss`, `nav/style.scss` — wrapper-sicher (Vererbung bzw. Box-Rolle),
  aber ungeprüft.
- Der `&--external-link`-Zweig in `_button.mixin.scss` wird auch für den Block `kol-button`
  erzeugt, der diesen Modifier nicht kennt. Totes Bundle-Gewicht, kein Fehlverhalten — das Mixin
  wird von `kol-link`-Aufrufern mitbenutzt, deshalb nicht ersatzlos entfernbar.
