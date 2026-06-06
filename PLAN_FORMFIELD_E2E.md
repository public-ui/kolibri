# Plan: E2E-Tests der Form-Field-Komponenten fixen & vereinheitlichen

## Context

Auf Branch `fix/9991-combobox-blur` wurden mehrere Form-Fields bereits von der generischen
Test-Funktion `testInputCallbacksAndEvents` auf komponenten-spezifische Tests umgestellt
(combobox, input-text/email/number/password/date, single-select). Der Rest hängt noch am
generischen Helper. Ein gezielter E2E-Lauf der Form-Fields (chromium) ergibt aktuell:

> **9 failed, 11 skipped, 192 passed**

Ziel: Alle Form-Field-E2E-Tests grün bekommen, indem jede Komponente ihre **eigenen,
expliziten** Event-Tests erhält (Setup → Interaktion → Assert, keine generischen Conditionals)
— so lassen sie sich **Stück für Stück** grün machen. Das deckt sich mit der dokumentierten
Feedback-Regel „generische Test-Helper durch komponenten-spezifische Tests ersetzen".

## ⚠️ RCA-Korrektur (verifiziert gegen stabilen Build, `CI=true`)

Die ursprünglichen **9 Failures** wurden gegen den lokalen Dev-Server gemessen, der **asynchron
rebuildet** → Tests trafen teils veralteten Code (Phantom-Failures). Gegen einen **stabilen Build**
(`CI=true` → `stencil build` + statischer Server) ist die Lage:

- **C1 (`event.stopPropagation()` in Base-`onInput`) ist umgesetzt und behebt Klasse A** (input/change
  DOM-`detail`). Verifiziert: Host empfängt nur noch das saubere `CustomEvent` (`detail=value`).
- **C2 ist NICHT nötig** — combobox `onChange` (fill+Enter) ist gegen stabilen Build grün.
- **single-select** (Klasse C) ist gegen stabilen Build grün — die 3 Timeouts waren Staleness.
- **Verbleibend real rot: nur 3** — Klasse B `onBlur` via generischem Helper bei
  `kol-input-file`, `kol-select`, `kol-textarea` (synthetisches `dispatchEvent('blur')` erfüllt den
  neuen relatedTarget-/`inputHasFocus`-Guard nicht). → Konversion auf echten Fokuswechsel behebt das.

**Konsequenz:** Alle Verifikation läuft ab jetzt mit `CI=true`. Reihenfolge unten bleibt gültig
(„Voll vereinheitlichen"), C2 entfällt.

Zwei Entscheidungen für diesen Plan:
- **Verhaltens-Abweichungen → Komponente fixen** (nicht nur Tests anpassen).
- **Voll vereinheitlichen** (auch die schon grünen input-email/number/date aufs kanonische Pattern heben).

## RCA — die 9 Failures in 3 Klassen

| Klasse | Tests | Root Cause |
|---|---|---|
| **A — DOM-Event `detail` falsch** | `combobox.e2e.ts:100` (onInput, detail=`0`), `input-text.e2e.ts:147` (onInput, detail=`0`) | `KolEvent.input/change` heißen wie native Events (`'input'`/`'change'`, siehe `utils/events.ts`). Das interne native Event bubblet aus dem Shadow-DOM ans Host (`detail=0`, `InputEvent`) und überschreibt das KoliBri-`CustomEvent` (`detail=value`). Der **Callback** (`_on.onInput`) ist korrekt, nur das DOM-Event-`detail` ist verfälscht. Hinweis: `onChange` ruft bereits `event.stopPropagation()` (controller.ts:174), `onInput` **nicht** — daher ist onChange-DOM grün, onInput-DOM rot. |
| **A2 — combobox onChange = `undefined`** | `combobox.e2e.ts:129` | Test tippt `North` + Enter ohne Pfeil-Auswahl. `handleKeyDown` (shadow.tsx:359, `case 'Enter'`:398) committet getippten Wert nicht → `onChange` feuert über nativen change-Pfad ohne Wert. |
| **B — onBlur feuert nie (30s Timeout)** | generischer Helper für `kol-input-file`, `kol-select`, `kol-textarea` | Der neue `onBlur`-Guard im Base-Controller (`@deprecated/input/controller.ts:247–265`) emittiert nur bei `inputHasFocus===true` **und** `relatedTarget` außerhalb der Komponente. Der Helper nutzt synthetisches `input.dispatchEvent('blur')` (kein vorheriger Fokus, kein relatedTarget) → Guard blockiert → Timeout. Echte konvertierte Tests lösen Blur via `nextButton.focus()` aus → grün. |
| **C — `page.setContent` 30s Timeout (flaky)** | `single-select.e2e.ts:62/82/100` | Bekannte Stencil-Dev-Server-Flakiness (Kommentar in `playwright.config.ts`). Mitigation `setContentWithRetry` existiert bereits (`e2e/utils/setContentWithRetry.ts`), wird hier aber nicht genutzt. |

## Komponenten-Fixes (Voraussetzung — zuerst, da großer Blast-Radius)

### C1 — Native input/change-Events nicht ans Host durchreichen
**Datei:** `packages/components/src/components/@deprecated/input/controller.ts`
- In `onInput` (Z. 205) `event.stopPropagation()` ergänzen (analog zu `onChange` Z. 174), damit das
  **native** Event nicht über die Shadow-Grenze ans Host bubblet. Ergebnis: externe Host-Listener
  erhalten nur noch das saubere `CustomEvent` (`detail=value`).
- Synthetische Events aus combobox (`selectOption` dispatcht `new CustomEvent('input'…)`) sind
  von `stopPropagation()` unberührt — kein Schaden.
- **combobox-spezifisch:** trotz vorhandenem `event.stopImmediatePropagation()` (shadow.tsx:153)
  leckt aktuell ein `detail=0`-Event. Ursache per Trace klären — der native `<input>` wird über
  `KolInputStateWrapperFc {...getInputProps()}` gerendert, `onInput/onChange` sind Callback-Props
  (shadow.tsx:271–272). Sicherstellen, dass die Unterdrückung am echten nativen Input greift.
- **Blast-Radius:** alle Inputs auf diesem Controller. Verifikation: voller Form-Field-E2E-Lauf
  **+** `form.e2e.ts` **+** Unit/Snapshot-Tests (`pnpm test:unit`) **+** die React-Wrapper-Cases
  in `input-number.e2e.ts`.

### C2 — combobox committet getippten Wert bei Enter
**Datei:** `packages/components/src/components/combobox/shadow.tsx`, `handleKeyDown` (Z. 359, `case 'Enter'`:398)
- Wenn keine Option fokussiert ist, aber der getippte Wert einer Suggestion entspricht (bzw.
  ein Wert vorhanden ist): über `selectOption(value)` committen → `onChange(value)` feuert.
- Konsistent zum bereits grünen Test „should select option with Enter key" (ArrowDown+Enter).

## Kanonisches Test-Pattern (pro Komponente, explizit)

Nach C1 emittiert das Host saubere Events → Tests brauchen **keine** `instanceof CustomEvent`-Workarounds.

- **Setup:** `setContentWithRetry(page, '<kol-… _label="Input" …></kol-…>')` (nicht `page.setContent`).
- **Pro Event Callback _und_ DOM-Event prüfen** (KoliBri dispatcht beides):
  - `focus`: `input.focus()` → `_on.onFocus` + Host-`focus`-Event gefeuert.
  - `blur`: `input.focus()` → `#next`-Button `focus()` (echter Fokuswechsel) → `_on.onBlur` + `blur`-Event.
  - `click`: `input.click()` → `_on.onClick` + `click`-Event.
  - `input`: `input.fill(VALUE)` → `_on.onInput` liefert Wert; `input`-DOM-Event `detail === VALUE`.
  - `change`: `input.fill(VALUE)` → Fokuswechsel auf `#next` → `_on.onChange` liefert Wert; `change`-`detail === VALUE`.
- Vorlage: `input-text.e2e.ts` (Callback+Event) und `input-number.e2e.ts` (Wert-Typen).
- Komponenten-Eigenheiten (Selector, ausgelassene Events, Interaktion) explizit pro Datei.

## Schrittfolge (je 1 Commit → inkrementell grün)

> Reihenfolge: erst Komponenten-Fixes (greenen vorhandene rote Tests), dann Konvertierung je Komponente,
> dann Harmonisierung, dann Cleanup. Nach jedem Schritt: `pnpm exec playwright test <name>`.

1. **C1** Base-Controller-Fix → greent `input-text:147` & `combobox:100` (onInput-detail). Voller Verifikationslauf (Blast-Radius).
2. **C2** combobox Enter-Commit → greent `combobox:129` (onChange).
3. **textarea** — Helper raus, explizite Tests (Selector `textarea`, alle 5 Events). Behält `testInputCharacterLimit`/`testInputMessage`/`testInputValueReflection`.
4. **select** — explizite Tests (Selector `select`, Wert via `selectOption`, `equalityCheck` „toEqual"). Behält `testInputMessage`/Value-Reflection.
5. **input-file** — explizite `focus/blur/click`; vorhandene FileList-Tests (`onInput/onChange`, `reset()`) bleiben; `testInputCallbacksAndEvents` raus.
6. **input-checkbox** — explizite `focus/blur/input/change` (omit `click`), Wert = boolean (`setChecked`/`check`); vorhandene Custom-Tests bleiben.
7. **input-radio** — analog checkbox (omit `click`).
8. **input-color** — explizite `focus/blur/click/change` (omit `input`); Firefox-Click-Skip beibehalten; vorhandene Custom-Tests bleiben.
9. **input-range** — explizite `focus/blur/click/input` (omit `change`), Wert numerisch.
10. **single-select** — kanonische `focus/blur/click/input/change`-Tests ergänzen (fehlen aktuell) **und** `page.setContent` → `setContentWithRetry` in den 3 flaky Tests (Klasse C).
11. **Harmonisieren:** `input-email`, `input-number`, `input-date` aufs kanonische Pattern (DOM-Event-Assertions ergänzen; input-date: input/change ergänzen).
12. **Cleanup:** `e2e/input-callbacks-and-events.ts` löschen + Export aus `e2e/index.ts` entfernen. Prüfen, ob `e2e/utils/FillAction.ts` & `inputsSelector.ts` noch referenziert sind; ungenutzt → entfernen. Hinweis: `testInputValueReflection` ist via `test.skip` dauerhaft deaktiviert (toter Helper) — optional in separatem Commit entfernen.

## Verifikation

- Pro Schritt: `pnpm exec playwright test <component>` (z. B. `… textarea`).
- C1-Verifikation zusätzlich: `pnpm exec playwright test form input-` + `pnpm test:unit` (Snapshots) + React-Cases in input-number.
- Abschluss-Gate: `pnpm exec playwright test combobox input- select single-select textarea`
  → erwartet **0 failed** (Skips wie `testInputValueReflection` bleiben).
- `grep -rl testInputCallbacksAndEvents src/components` → **leer**.

## Betroffene Dateien (Kern)

- Fixes: `@deprecated/input/controller.ts`, `combobox/shadow.tsx`
- Tests konvertieren: `textarea`, `select`, `input-file`, `input-checkbox`, `input-radio`, `input-color`, `input-range` (je `*.e2e.ts`)
- Tests harmonisieren: `input-email`, `input-number`, `input-date`, `single-select` (je `*.e2e.ts`)
- Bereits konvertiert, werden durch C1/C2 grün: `combobox.e2e.ts`, `input-text.e2e.ts`
- Cleanup: `e2e/input-callbacks-and-events.ts` (löschen), `e2e/index.ts` (Export entfernen)
- Wiederverwenden: `e2e/utils/setContentWithRetry.ts`, `e2e/input-msg.ts`, `e2e/input-character-limit.ts`
