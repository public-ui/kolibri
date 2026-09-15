# Working Plan: `refactor/consolidate-collapsible-accordion-details`

> Companion plan for AI-assisted development. Keep this file updated — every planned or completed
> step on this branch belongs here so another session can pick up seamlessly. Commit plan updates
> together with (or ahead of) the work they describe.

Gestapelt auf [#10886](https://github.com/public-ui/kolibri/pull/10886) (`kol-accordion`), das auf
[#10884](https://github.com/public-ui/kolibri/pull/10884) (`kol-details`) stapelt.
Reihenfolge beim Mergen: #10884 → #10886 → dieser PR (GitHub retargetet die Bases automatisch).
Disziplin: `.claude/skills/zero-visual-delta-handoff/SKILL.md`, `.claude/commands/migrate-to-skeleton.md`.

## Ziel

Die beiden Skeleton-Migrationen haben denselben Code zweimal erzeugt. `kol-accordion` und
`kol-details` teilen sich jetzt einen `collapsible`-Layer (FC + API + Props + Toggle-Handler); die
Themes bleiben getrennt, weil die Komponenten optisch echt verschieden sind.

**Akzeptanzkriterium: null geänderte Snapshot-PNGs** gegen den Base-Branch.

## Ausgangslage (verifiziert)

Die FCs unterschieden sich in genau drei Punkten: BEM-Block, Chevron-Icon
(Accordion `open ? down : right`, Details fix `right` + CSS-Rotation) und die zusätzliche
`indented-text`-Klasse am Content von Details. `api.tsx` unterschied sich nur in der
Callbacks-Prop, `internal/props/{accordion,details}-callbacks.ts` nur im Payload-Typ, die WCs nur
in `_on`-Typ/JSDoc, ID-Präfix und `handleToggle`.

## Umgesetzt

**1. `refactor(collapsible): share one callbacks prop …`**
`CollapsibleCallbacksPropType`/`PropCollapsibleCallbacks` in `schema/props/collapsible-callbacks.ts`;
die alten Namen bleiben `@deprecated`-Aliase. Tote `validate{Accordion,Details}Callbacks` gelöscht.
`internal/props/collapsible-callbacks.ts` ersetzt zwei Dateien. Der vierfach duplizierte
Callbacks-Normalizer (accordion, details, button, link) liegt jetzt einmal als
`createCallbacksPropDefinition` in `internal/props/helpers/factory.ts`.

**2. `refactor(collapsible): render accordion and details through one CollapsibleFC`**
Neu `internal/functional-components/collapsible/{api,component,toggle}`; `accordion/` und
`details/` dort gelöscht. `getBlockBem` aus `BemRootNodeFC` nach `bem-root-node/block-bem.ts`
gezogen (ein Cache statt zwei). `bem.forBlock(block)` nimmt den Union-Typ ohne Cast — beide Blöcke
sind mit identischem Element-Set registriert (an `typed-bem@1.0.2` verifiziert, kein `as` nötig).
Toggle vereinheitlicht: `createCollapsibleToggleHandler`, Zustand synchron gecaptured, ein Timeout
(25 ms) pro Interaktion ohne `clearTimeout`, dann `KolEvent.click` + `KolEvent.toggle` und
`onClick` + `onToggle`. Zwei E2E-Tests für die neuen Details-Fähigkeiten ergänzt.

**3. `chore(collapsible): drop the legacy KolCollapsibleFc …`**
`functional-components/Collapsible/` gelöscht, Barrel-Export entfernt, die überflüssige
Registrierung im Pagination-Snapshot-Spec bereinigt.

### Bewusste Deltas (gehören in die PR-Beschreibung)

1. **Public API:** `_on` ist auf beiden `CollapsibleCallbacksPropType<boolean>`. Für `kol-details`
   additiv (`onClick` kommt hinzu — Objekte mit nur `onToggle` bleiben zuweisbar), für
   `kol-accordion` reine Umbenennung gleicher Form. `kol-accordion._label` ist jetzt mit dem
   Schema-Alias `LabelPropType` deklariert (gleicher Typ, kein Runtime-Effekt); `click()`-JSDoc
   ohne den „first section"-Rest. Beide Pins in `_skeleton/public-api.spec.ts` bewusst aktualisiert.
2. **⚠️ `kol-details` dispatcht neu ein synthetisches `click`-CustomEvent** auf dem Host. Da der
   native Button-Klick ohnehin durch den Host bubbelt, sehen `click`-Listener zwei Events — wie bei
   `kol-accordion` seit jeher. **Fallback, falls im Review unerwünscht:** im geteilten Handler die
   Event-Liste pro Komponente parametrieren (`events: [KolEvent.toggle]` für Details); der
   `onClick`-Callback bleibt dann trotzdem vereinheitlicht.
3. **`kol-details` verliert den `clearTimeout`-Dedupe** — schnelles Doppel-Toggeln feuert zwei
   Events mit korrekt unterschiedlichen Werten statt einem.
4. **`kol-accordion`-Callbacks feuern nach 25 ms** statt ~0 ms.

## Validierung

- Unit: **952/952**, **774/774 Snapshots** — `git status -- '*.snap'` leer, also DOM byte-identisch.
- Hydrate-SSR: **102 passing**, Mocha-Snapshot unverändert.
- `tsc --noemit`: 0 eigene Fehler. ESLint: 0 Fehler/Warnungen in allen berührten Dateien.
  Stylelint grün, i18n grün, Prettier grün.
- Generierte `components.d.ts` zeigt `CollapsibleCallbacksPropType<boolean>` für beide Komponenten.

## Zero Visual Delta ✅

**Alle sechs CI-Jobs `visual-tests (theme-{default,bwst,ecl,kern,desy} | unstyled)` sind grün.**
Diese Jobs laden echte Baselines (`select-baseline` → `install-baseline`), laufen im Prüfmodus
(`pnpm --filter <pkg> test`, **nicht** `test:update`) und schließen mit `assert-no-errors.mjs` ab —
also echte Abnahme-Evidenz, keine selbst geschriebenen Baselines. `git diff -- '*.png'` = 0.

Lokal zusätzlich gegengeprüft: PNGs auf Base-Stand und auf Branch im CI-identischen Container
erzeugt und byteweise verglichen — **20/20 sha256-identisch** über default, bwst, desy, kern und
unstyled (ECL deckt der CI-Job ab). Kein einziges Style-File liegt im Diff.

CI sonst grün: `build-and-check`, `e2e-tests`, `deploy`, `validate-pr-title`, `cla`.
`validate-release-label` verlangte ein `release:*`-Label — `release:engineering` gesetzt, wie
bei #10886.

## Open work

Keine offene Arbeit. PR #10891 ist Draft; vor dem Merge die Stapel-Reihenfolge beachten
(#10884 → #10886 → #10891). Offen ist allein die Review-Entscheidung zum synthetischen
`click`-Event auf `kol-details` (Fallback oben dokumentiert).

## Sandbox-Notizen (nicht committen)

In dieser Session fehlten `tslib` und `@jest/globals` in `packages/components/node_modules`
(nach `packages/components/node_modules/` symlinken) und Playwright suchte
`chromium_headless_shell-1223`, vorhanden war `-1194` (Alias-Symlink unter `/opt/pw-browsers`).
Alles reine Umgebungslücken, kein Repo-Problem — `pnpm build` (prod) lief ohne sie durch.
