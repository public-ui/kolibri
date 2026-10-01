# Migrationsplan: Formularfelder auf Skeleton

Übergreifender Plan für die Skeleton-Migration der 14 Formularfelder von `kol-combobox` bis `kol-textarea` (Epic #9559). Er schneidet die Felder in Gruppen, legt das gemeinsame Fundament fest und ordnet die Arbeit in parallele Spuren. Jede Gruppe erhält vor der Umsetzung einen eigenen Detailplan.

Stand: 27.09.2026, `@public-ui/components` 4.5.0-rc.0.

## Ausgangslage

Vor der Migration lief keines der 14 Felder auf Skeleton. Der Legacy-Stack besteht aus:

- Controller-Kette `AssociatedInputController → ControlledInputController → InputController → InputIconController → Feld-Controller`
- State-Wrapper in `functional-component-wrappers/`, die die alten FCs in `functional-components/` rendern
- Validatoren aus `schema/props/`

Aus dem Formularumfeld ist bisher nur `kol-form` auf Skeleton umgestellt.

| Feld                 | LOC `shadow.tsx`            | Render-Stack heute                          | Besonderheit                                                    |
| -------------------- | --------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| `kol-input-color`    | 380                         | FormField + InputContainer + Input („Trio") | dünnstes Feld, kein `_required`                                 |
| `kol-input-email`    | 489                         | Trio                                        | Controller erbt von Text → Password, Counter                    |
| `kol-input-password` | 511                         | Trio + IconButton (`KolButtonWcTag`)        | `_visibilityToggle`, Basisklasse für Text und Email             |
| `kol-input-text`     | 620                         | Trio + Clear-Button                         | `_type`, Selection-API-Methoden                                 |
| `kol-textarea`       | 498                         | FormField + InputContainer + TextArea       | `_adjustHeight`, `_resize`, `_rows`, Counter                    |
| `kol-input-number`   | 551                         | Trio + Step-Buttons                         | Feature-Flag `inputNumberButtons`, genutzt von `table-settings` |
| `kol-input-range`    | 499                         | 2× Input (range + number) + Suggestions     | min/max/step, zwei synchrone Inputs                             |
| `kol-input-date`     | 513 (+ 219 Controller)      | Trio                                        | Date↔ISO, 5 `_type`s, `reset()`                                 |
| `kol-input-file`     | 450                         | Trio + Browse-Button (`KolButtonWcTag`)     | kein `_value`, FileList, `_accept`, Drag & Drop, `reset()`      |
| `kol-input-checkbox` | 457                         | FormField + FieldControl + Checkbox         | Varianten default/switch/button, genutzt von `table-settings`   |
| `kol-input-radio`    | 458                         | FormField (fieldset) + FieldControl + Radio | `_options`, `_orientation`, alte Utils `element-click`/`-focus` |
| `kol-select`         | 222 + 404 (`kol-select-wc`) | FormField + InputContainer + NativeSelect   | `pagination` rendert `kol-select-wc` direkt                     |
| `kol-combobox`       | 756                         | Trio + CustomSuggestions + `@Listen`        | Listbox, nahezu Zwilling von single-select                      |
| `kol-single-select`  | 849                         | Trio + CustomSuggestions + `@Listen`        | größtes Feld, offene Bugs #10501/#10617                         |

## Rahmenbedingungen

- **Zero visual delta, BEM bleibt.** DOM und Klassen (`.kol-form-field`, `.kol-input-container`, `.kol-field-control` …) bleiben byte-identisch. Themes werden nicht angefasst, es gibt keinen CLI-/SCSS-Migrations-Task. Das Pixel-Gate verlangt 0 Diffs pro Theme.
- **Formular-Anbindung 1:1 als Behavior.** Die heutige Semantik (versteckte native Elemente im Light DOM, `_syncValueBySelector`, `ariaDetails` über `attachInternals`) wandert aus der Controller-Kette in ein wiederverwendbares `FormAssociationBehavior`, das auch `kol-button` nutzt. Einen Umstieg auf natives `formAssociated` gibt es in dieser Migration nicht.
- **Identische öffentliche API.** Gleiche `@Prop`/`@Method`-Member, Alias-Typen, Defaults und JSDoc. Die Oberfläche ist vor der Migration in `_skeleton/public-api/<komponente>.spec.ts` festgenagelt.

## Leitplanken

- **Strangler statt Big Bang.** Der neue Stack entsteht unter `internal/functional-components/form-field/` neben dem alten. Ein Legacy-Modul wird in dem PR gelöscht, der seinen letzten Import entfernt.
- **Keine Bugfixes in Migrations-PRs.** Bekannte Fehler (z. B. #10501, #10617) bekommen eigene PRs, vor oder nach der Migration.
- **Innere Tags bleiben.** `KolButtonWcTag` (IconButton, Clear-, Browse- und Visibility-Button) und `KolPopoverButtonWcTag` (Label-`_infoPopover`) bleiben wegen Zero-Delta stehen. Das ist eine begründete Ausnahme nach Fallstrick 8 im Skill `migrate-to-skeleton`.
- **Grenze von DD16.** Stencil liest Decorators nur aus der konkreten Klasse. Alle `@Prop`/`@Watch`/`@Method` samt JSDoc bleiben in jeder Komponente, Basisklassen bündeln nur Logik. Höchstens zwei Ebenen unter `BaseWebComponent`.
- **Basisklasse nach G1 eingefroren.** Änderungen an `BaseFormFieldWebComponent` kommen nur als eigenes PR, mit Pixel-Gate über alle bereits migrierten Felder.
- **Konfliktstellen.** `internal/props/index.ts`, `schema/bem-registry.ts` und die Pin-Dateien: nur anhängen, Reihenfolge zwischen den Spuren absprechen.

### Abnahme-Gates je Komponenten-PR

1. Der Public-API-Pin ist unverändert und zeigt jetzt auf `component.tsx`. Die Klasse implementiert `*Props`.
2. Die Jest-`.snap`-Dateien sind unverändert.
3. `node scripts/snapshots-docker.mjs <theme> --check` meldet 0 Diffs für default, bwst, desy, kern und ecl (ec/eu).
4. Die Verhaltensverträge aus G0 sind grün.
5. Die geteilten E2E-Helfer `src/e2e/{input-msg,input-value-reflection,input-character-limit}.ts` sind grün.
6. Keine Imports mehr aus `@deprecated/input`, `input-adapter-leanup`, `functional-component-wrappers` oder den alten `functional-components/*`.
7. `form.e2e` ist grün: Ein Klick in der Fehlerliste fokussiert das Feld über seinen `focus()`.

## Reihenfolge und Abhängigkeiten

```
G0 ─► G1.1 ─┬─► G1.2 ──┐
            └─► G1.3 ──┴─► G1.4 (Pilot input-color)
                               ├─► G2 Textfelder          (Spur A)
                               ├─► G3 a | b | c           (Spur B)
                               └─► G4-Vorbereitung ─► G4 ─► G5   (Spur C)
Rückbau-Inkremente am Ende jeder Gruppe; finaler Rückbau (G6) nach G2–G5
```

## Gruppen

### G0 – Absicherung

Kein Produktivcode, Voraussetzung für alles. Die Gates greifen nur, wenn vorher festgehalten ist, was „unverändert" heißt: API, Verhalten und Pixel.

- ✅ Public-API-Pins für alle 14 Tags und `kol-select-wc` (als interner Vertrag), zunächst gegen `shadow.tsx`. Jede Komponente hat eine eigene Datei unter `_skeleton/public-api/`, damit parallele Spuren keine Merge-Konflikte bekommen.
- ✅ Verhaltensverträge pro Feld: Reihenfolge und Payload von `kolChange`/`kolInput`/`kolFocus`/`kolBlur`/`kolKeydown`/`kolClick` und der `_on`-Callbacks; `FormData` eines nativen `<form>` für Checkbox, `select` multiple, File und Radio mit Objektwerten; `_syncValueBySelector`; `_touched` nach Blur. Die Verträge sind Playwright-Tests (`*.e2e.ts`), weil versteckte Light-DOM-Elemente, `attachInternals`, `FormData` sowie Fokus und Tastatur nur im echten Browser verlässlich prüfbar sind. Sie nutzen die Helfer aus `src/e2e/`. Reine Umrechnungen ohne Browserverhalten (z. B. Date↔ISO in G3) werden als Jest-Tests der Hilfsfunktionen geprüft.
  - Der gemeinsame Helfer `testInputBehaviorContract` in `src/e2e/input-behavior-contract.ts` zeichnet Events und Callbacks auf; jedes Feld pinnt darin sein heutiges Verhalten. Alle 14 Felder sind gepinnt, dazu die Varianten Radio mit Objektwerten und `kol-select` mit `_multiple` (Option `variant`).
  - Befunde aus den Verträgen: Die gepinnten Abläufe beschreiben den heutigen Stand, auch wo er inkonsistent ist. Korrekturen kommen als eigene PRs nach der jeweiligen Migration.
    - Standard (G1.4, alle Felder außer den unten genannten Abweichungen): Je Aktion kommt zuerst das KoliBri-Event am Host, dann der `_on`-Callback, dann das native Event. Natives `input`/`change` endet an der Shadow-Grenze.
    - Startwert ohne Vorgabe: `kol-input-color` `#000000` (aus dem inneren Input in `componentDidLoad`), `kol-input-range` `50`, `kol-input-checkbox` `true`, `kol-input-radio` und `kol-single-select` `null`, alle anderen `undefined`.
    - G3: Payloads sind typisiert – number und range liefern Zahlen, date den ISO-String, file eine `FileList`. Für file bleibt ein Text-Input als `_syncValueBySelector`-Ziel leer.
    - G4: checkbox und radio senden kein KoliBri-`click` und keinen `onClick` (`onClick: undefined` in `shadow.tsx`). Stattdessen erreicht das native `click` den Host vor `input`/`change`.
    - G5: `kol-single-select` sendet beim Blur zuerst das native Event, dann das KoliBri-Event und den Callback. `kol-select` setzt `_touched` am eigenen Host nicht, das innere `kol-select-wc` hält den Zustand. Außerdem überträgt `kol-select` einen Einzelwert weder in `FormData` noch in das `_syncValueBySelector`-Ziel, weil das versteckte `<select multiple>` nur Array-Werte übernimmt. Mit `_multiple` stehen alle gewählten Werte in `FormData`. Issues: #11014 (`_touched`), #11015 (Einzelwert).
    - Radio mit Objektwerten liefert das Objekt als Payload und überträgt es als JSON-String in `FormData` und an `_syncValueBySelector`.
  - Formular-Anbindung heute: Das versteckte Element im Light DOM entsteht nur mit `register(…, { reflectInputValues: true })`, seinen `name` setzt der Controller nur im Experimental-Mode. Nur mit beidem steht das Feld in `FormData`. Der Vertrag pinnt alle drei Fälle, der Test ruft `register` dafür aus dem Build unter Test auf.
- ✅ Visual-Samples ergänzen für msg, hint, disabled, hideLabel, infoPopover, Counter, Icons, `inputNumberButtons` an/aus und die Checkbox-Varianten. Neue Samples erzeugen neue Baselines und gehören in ein eigenes PR vor der ersten Migration.
  - Vorhanden: msg, hint, disabled, hideLabel, infoPopover und Icons für alle 14 Felder über `partials/cases.tsx`/`variants.tsx`, Counter bei `input-text` und `textarea`, Checkbox-Varianten `basic`/`button`/`switch`.
  - `inputNumberButtons` setzt das Theme (`theme-default` `'show'`, `theme-kern` `'hide'`); die bestehenden `input-number`-Baselines decken damit beide Zustände ab.
  - Ergänzt in #11017: Counter-Routen für `kol-input-email` und `kol-input-password`, Hint-Block für `kol-input-number`.
- ✅ Toten Code löschen: `functional-components/inputs/Combobox/Combobox.tsx`.

### G1 – Fundament + Pilot `kol-input-color` (#9673, #9577)

Alle 14 Felder teilen Basis-Props, die Label/Hint/Msg-Hülle, die Formular-Anbindung und die Event-Logik. Das wird einmal gebaut und am dünnsten Feld geprüft, damit die Basisklasse an einem echten Fall entsteht. G1 besteht aus sechs PRs: G1.0 #11037, G1.1 #11038, G1.2 #11044, G1.3a #11045, G1.3b #11046 und G1.4 #11049. Alle sind gemergt.

```
G1.0 Testlücken ───────────────┬──────────────────────────────────────────────┐
G1.1 Props ─┬─► G1.2 FormAssociationBehavior (+ kol-button) ─► SSR-Fix (eigener PR)
            │        (braucht G1.0 und G1.1)                                    │
            └─► G1.3a FormField ─► G1.3b Container/Input ──────────────────────┴─► G1.4 Basis + kol-input-color
```

0. **Testlücken** (nur Tests):
   - Formular-Anbindung von `kol-button` gepinnt. Es entsteht kein verstecktes Formularelement, weil der Adapter in `button/base.tsx` `_name` bei der Konstruktion nicht kennt (#11036); `_syncValueBySelector` wirkt im Experimental-Mode.
   - Gate 7 mit einem `kol-input-color` als Ziel der Fehlerliste.
   - Tooltip bei `_hideLabel` für `kol-input-color`. Befund: Hat das Feld den Fokus, schließt Escape den Tooltip nicht. Das Feld sendet sein eigenes `keydown`-CustomEvent am Host, das vor der nativen Taste am Dokument ankommt und den einmaligen Escape-Listener des Tooltips verbraucht (#11032, verwandt #11033).
   - Jest-Snapshots aller Felder zusätzlich mit `_hideLabel`, `_infoPopover`, sichtbarer Msg und `_variant`.
1. **Basis-Props** in `internal/props/`: ariaDetails, autoComplete, hideMsg, hint, `horizontalIconsProp` (Icons-Objekt der Inputs, `icons.ts` bleibt unverändert), infoPopover, `inputCallbacksProp` (`_on`), msg, readOnly, required, suggestions, syncValueBySelector (nur für das Behavior), touched und der String-Wert. `tooltipAlignProp` wird wiederverwendet, der Feld-Default `'top'` im `apply` neu gesetzt. Der veröffentlichte Typ `FormFieldLabelInfoPopoverProps` zieht in einem Schritt für alle Felder nach `schema/props/`; ein teilweiser Umzug würde in `components.d.ts` einen Alias `…1` erzeugen.
2. **`FormAssociationBehavior`**: übernimmt `input-adapter-leanup/associated.controller.ts` 1:1, einschließlich der späten Host-Zuweisung im Konstruktor. `AssociatedInputController` wird zur Fassade über das Behavior, damit die G0-Verträge es sofort für alle Felder prüfen. `button/base.tsx` wird im selben PR umgestellt; der Button-Pin bleibt unverändert.
3. **Shell-FCs** unter `internal/functional-components/form-field/`, nur für die Hülle von `kol-input-color`: G1.3a FormField (Label, Hint, Msg, Counter, Tooltip, Zeichengrenzen-Hinweis) mit dem ARIA-Helfer aus `getRenderStates`, G1.3b InputContainer mit Adornments, IconButton, Input und Suggestions. Neue Blöcke in `schema/bem-registry.ts`. Die alten FCs werden Adapter auf die neuen, damit Hydrate-Snapshot und Pixel-Gate die Hülle sofort über alle Felder prüfen. TextArea kommt in G2, FieldControl/Checkbox/Radio in G4, NativeSelect/Option(List)/CustomSuggestions in G5. Die `fieldset`-Wurzel von radio bleibt bis G4 auf dem alten Pfad, weil `BemRootNodeFC` nur `div` rendert.
4. **`BaseFormFieldWebComponent`** (DD16): `apply*` der Basis-Props, ein eigenes `TooltipBehavior` pro Instanz statt der modulglobalen Map in `FormField.tsx`, Formular-Anbindung, Event-Behandlung als Ersatz für `InputController` (Reihenfolge: KoliBri-Event, dann Callback) und Render-Helfer. Damit wird `kol-input-color` migriert.
   - Die Basis ist generisch über die Feld-API. Sie greift über einen dokumentierten Self-Cast (`shared`) auf die Basis-Props zu und liefert die FormField-Props mit `getFormFieldProps()`. Gerendert wird in der konkreten Klasse, wie bei `BaseButtonWebComponent`.
   - Die Props an `InputFC` bildet die konkrete Klasse in der Schlüsselreihenfolge der alten State-Wrapper. Props, die der Legacy-State nur bei gesetztem Wert enthielt, zum Beispiel `accessKey` und `aria-keyshortcuts`, übergibt sie nur, wenn ein Wert gesetzt ist. Nur so bleiben die Attributreihenfolge im Hydrate-Snapshot und das DOM unverändert.
   - `_label={false}` bleibt wie bisher der Expert-Slot (`''`). `labelWithExpertSlotProp` allein würde daraus den String `'false'` machen.

Entscheidungen:

- Die Basis-Config enthält nur Props, die alle 14 Felder identisch haben: ariaDetails, disabled, hideLabel, hideMsg, hint, infoPopover, label, msg, name, on, tooltipAlign, touched. `WebComponentInterface` verlangt für jede Config-Prop einen Watcher.
- Die Basisklasse ist generisch über die Feld-API. TypeScript löst `ResolvedProps<Api>` für ein generisches `Api` nicht auf, deshalb greift sie über einen einzigen, dokumentierten Self-Cast auf die Basis-Props zu.
- Bewusste Abweichungen der Prop-Factory, wie in allen bisherigen Skeleton-Migrationen: `undefined` führt zum Default statt den alten Wert zu behalten, `normalizeBoolean` akzeptiert `'true'`/`'false'`, ungültige Werte werden verworfen.
- `data-testid="input-counter"`/`"input-counter-aria"` bleiben bis G2, weil `e2e/input-character-limit.ts` sie braucht und der DOM byte-gleich bleiben muss.

Risiken: Zusammenbau von `aria-describedby` (hint, msg, Counter, Hinweis zur Zeichengrenze; heutige Eigenheiten in #11035); Attribut- und Klassenreihenfolge im Hydrate-Snapshot; die beiden Fokus-Flags aus Controller und Komponente; `attachInternals(undefined)` bei SSR/Hydrate.

### G2 – Textfelder: email → password → text, danach textarea (#9579, #9582, #9585, #9602)

Die vier Felder hängen heute in der Kette `InputPasswordController → InputTextEmailController → InputText/InputEmail` und teilen placeholder, autoComplete, maxLength/hasCounter/maxLengthBehavior und den Counter. pattern haben nur die drei Inputs. `spellCheck` rendert nur input-text; textarea validiert die Prop, gibt sie aber nicht an das `<textarea>` weiter (#10863).

G2 besteht aus sechs PRs:

```
G2.0 Testlücken (nur Tests) ────────────────────────────────────────────────────────┐
G1.4 ─► G2.1 Props + CounterBehavior + TextAreaFC ─► G2.2 Basis + email ─► G2.3 password ─► G2.4 text ─► G2.5 textarea
```

- G2.0: Jest-Snapshots für Zähler, Zeichengrenze, Clear-Button, Visibility-Toggle, `_multiple`, `_pattern`, `_required` und `_resize`. Bisher pinnt kein Snapshot diese Fälle. Befunde, die die Migration 1:1 übernimmt: #10863 (spellCheck), #11051 (`_adjustHeight` schrumpft nicht), #11052 (Zähler bei `_hasCounter`/`_maxLengthBehavior` zur Laufzeit), #11053 (`has-value` uneinheitlich), #11054 (devHint zu `_autoComplete`).
- G2.1: Props der Textfelder in `internal/props/`; `CounterBehavior` unter `internal/functional-components/counter/` (besitzt `hasCounter`, `maxLength` und `maxLengthBehavior`, `CounterDomUpdater` ist bis G2.5 Fassade darüber); `TextAreaFC` mit dem neuen Block `kol-textarea` und das alte `inputs/TextArea` als Adapter; `getFormFieldProps()` der Basis reicht zusätzlich `required`, `readOnly`, `maxLength` und `counter` durch.
- G2.2: `BaseTextInputWebComponent` (`internal/functional-components/text-input/`) für email, password und text, damit wird `kol-input-email` migriert.
  - Die Zähler-Props gehören dem `CounterBehavior` und stehen nicht in der Props-Config der Felder; die Watcher der Felder geben sie an das Behavior weiter.
  - Die Props an `InputFC` folgen der Schlüsselreihenfolge von `InputStateWrapper`. Props, die der Legacy-State nur gesetzt enthielt (`accessKey`, `maxlength`, `placeholder`, `pattern`, `aria-keyshortcuts`), werden nur übergeben, wenn ein Wert gesetzt ist; ein leerer Name wird nicht gerendert. Den Unterschied sieht nur der Hydrate-Snapshot, Jest verwirft leere Attribute.
  - `has-value` ist wie im Legacy-Code ein einfaches Feld ohne Re-Render (#11053).
  - Beim Laden werden Wert und Maximum ohne Zähler-Update übernommen, der Zähler wird in `componentDidLoad` gefüllt.
  - Icons und Smart-Button der Input-Container bildet `getInputAdornments()` (`form-field/adornments.tsx`) für alle migrierten Felder, auch für `kol-input-color`.
- G2.3: `kol-input-password` auf `BaseTextInputWebComponent`, mit `visibilityToggle` und dem State `passwordVisible`. Der Kompatibilitätszweig `_variant === 'visibility-toggle'` (#10247) entfällt: Legacy verglich den bereits zu einem Array normalisierten `_variant` mit einem String, der Zweig griff also nie. Der G2.0-Snapshot pinnt das. `input-password/controller.ts` bleibt bis G2.4, weil `InputTextController` davon erbt.
- G2.4: `kol-input-text` auf `BaseTextInputWebComponent`, mit `type` (auch als Root-Klasse), `spellCheck`, `suggestions`, Clear-Button bei `type="search"` und den fünf Selection-Methoden. `has-value` folgt hier wie bisher jeder Wertänderung. Mit dem Feld fällt die Controller-Kette `InputPasswordController → InputTextEmailController → InputTextController` weg.
- G2.5: `kol-textarea` erbt direkt von `BaseFormFieldWebComponent` und komponiert das `CounterBehavior`; die drei Zähler-Watcher wiederholen die Einzeiler der Textbasis, eine dritte Basisebene ist nicht erlaubt. Übernommen werden die Zeilenberechnung von `_adjustHeight` (wächst nur, #11051), das `setTimeout` in `componentDidLoad` für `_rows` und `style.resize`; `spellCheck` wird wie bisher nicht gerendert (#10863). Mit dem Feld fallen `CounterDomUpdater`, `TextAreaStateWrapper` und das alte `inputs/TextArea` samt Adapter-Test weg.
- `CounterBehavior` ersetzt `utils/counter-dom-updater.ts`; das direkte DOM-Update ohne Re-Render bleibt erhalten.
- textarea erbt direkt von `BaseFormFieldWebComponent` und nutzt das CounterBehavior.
- Risiken: Selection-API und `_type` search/url/tel von input-text; Clear-Button und Visibility-Toggle; Datalist-IDs; `_adjustHeight`/`_resize` bei textarea.
- Zusätzliche Abnahme: `input-character-limit` und `input-text.clear-button.e2e` grün; alle 16 React-Routen von input-text pixelgleich.

### G3 – Wertetypen (#9581, #9584, #9578, #9580)

Drei parallele Spuren: a) number → range, b) date, c) file. Die Felder nutzen die Standard-Hülle, müssen aber ihren Wert umwandeln.

- Eigene Input-Props für min/max/step; die vorhandenen Meter-Props (Defaults 0/100) passen nicht.
- a) Step-Buttons und Feature-Flag `inputNumberButtons`; range mit zwei synchronen Inputs und Suggestions. G3a besteht aus vier PRs:

  ```
  G2.5 ─► G3a.0 Testlücken ─► G3a.1 Props + Zahlen-Helfer ─► G3a.2 number ─► G3a.3 range
  ```

  - G3a.0: Jest-Snapshots für min/max/step, `_value` als Zahl, `NumberString`, `null` und `0`, die Namen und die Breitenformel von range. Befunde, die die Migration 1:1 übernimmt: #10861 (range klemmt nicht bei einer Grenze 0), #11075 (range synchronisiert beim Ziehen nicht), #11076 (range übernimmt ohne `_value` den Browser-Mittelwert), #11077 (negative und Exponent-Strings werden verworfen), #11053 (`has-value` fehlt bei number für `0`).
  - G3a.1: `inputMinProp`, `inputMaxProp`, `stepProp` und der Zahlenwert in `internal/props/` mit einer Normalisierung, die `validateNumber` 1:1 nachbildet; reine Hilfsfunktionen für den gemerkten Werttyp, das Parsen und die Klemmung von range; `getInputAdornments()` bekommt ein `startAdornment` vor dem linken Icon.
  - G3a.2: `kol-input-number` erbt direkt von `BaseFormFieldWebComponent`. Die Step-Buttons bleiben native `<button>` und folgen bei jedem Render dem Flag `inputNumberButtons`.
  - G3a.3: `kol-input-range` erbt direkt von `BaseFormFieldWebComponent`, mit zwei `InputFC` und dem Datalist neben dem Wrapper.
  - Eine gemeinsame Basis für number und range gibt es nicht: number schreibt `_value` bei jedem `input`, range erst bei `change` und klemmt dabei.

- b) Date↔ISO-Logik aus `input-date/controller.ts` in Hilfsfunktionen, alle 5 `_type`s, Zeitzonen. G3b besteht aus drei PRs:

  ```
  G3a.3 ─► G3b.0 Testlücken ─► G3b.1 Props + Datums-Helfer ─► G3b.2 date
  ```

  - G3b.0: Jest-Snapshots für alle fünf `_type`s mit Wert, `_min`/`_max`, `_step` bei `time`, einen zum Typ unpassenden Wert, `null` sowie `_readOnly` und `_required`. Werte als `Date` pinnen weiter die e2e-Tests und `controller.spec.ts`, weil ein `Date` im Namen eines Snapshots von der Zeitzone abhängt.
  - G3b.1: der Typ und die Datums-Props (`_min`, `_max`, `_value`, abhängig von `_type` und `_step`) in `internal/props/`; die Umwandlung `Date` → ISO-String, die Kalenderwoche und die Formatprüfung je Typ als reine Hilfsfunktionen, die der Legacy-Controller sofort nutzt.
  - G3b.2: `kol-input-date` erbt direkt von `BaseFormFieldWebComponent`, mit `reset()`, dem Rückschreiben von `_value` beim Blur, wenn der Wert zwischen leer und gesetzt wechselt, Enter-Submit außer bei fokussiertem Kalender-Icon und dem unterdrückten Leerzeichen bei `_readOnly`.
  - Befund: `InputDateController.validateOn` legt einen Wrapper um `_on.onChange` in den State, den nichts liest; die Events rufen das `_on` der Prop. Die Migration übernimmt den Wrapper nicht, das Verhalten bleibt gleich.

- c) FileList, Drag-&-Drop-Modifier, Browse-Button, übertragener Formularwert. G3c besteht aus drei PRs:

  ```
  G3b.2 ─► G3c.0 Testlücken ─► G3c.1 accept-Prop + Dateinamen-Helfer ─► G3c.2 file
  ```

  - G3c.0: Jest-Snapshots für `_accept`, `_multiple`, `_required`, ein Feld ohne Namen und `_accept` mit `_multiple`, Icons und Smart-Button. e2e für mehrere Dateien, `--has-file` bei Auswahl und `reset()`, den Formularwert nach Auswahl und Drop sowie den Ist-Stand beim Drop: Dateiname ohne `--has-file`, `change` vor `input` (#10865). Befund, den die Migration 1:1 übernimmt: `reset()` wirft bei Formular-Zuordnung einen TypeError (#11110).
  - G3c.1: `acceptProp` in `internal/props/` und ein reiner Helfer für den angezeigten Dateinamen, den die Legacy-Komponente sofort nutzt. `multipleProp` und `requiredProp` gibt es schon.
  - G3c.2: `kol-input-file` erbt direkt von `BaseFormFieldWebComponent`. Der Browse-Button bleibt `KolButtonWcTag`, weil die Themes `.kol-input-container__button .kol-button` als Vorfahr-Beziehung selektieren (G7). Die Drag-Listener hängen dann als JSX-Listener am Container; die Legacy-Komponente hängt sie in `componentDidLoad` an und entfernt sie nie.

- Zusätzliche Abnahme: `table-settings` pixelgleich; `reset()` bei date und file; Flag an und aus im Pixel-Gate.

### G4 – Auswahl-Controls: checkbox → radio (#9576, #9583)

Nur diese beiden nutzen den FieldControl-Stack statt InputContainer und teilen `InputCheckboxRadioController`.

- Vorbereitungs-PR: `options`-Prop und `fillKeyOptionMap` ziehen aus `input-radio/controller.ts` nach `form-field/options.ts`; G5 braucht beides ebenfalls.
- FieldControlFC einführen, `InputCheckboxRadioController` auflösen.
- Risiken: Theme-SCSS der Checkbox (300 LOC, verschachtelte Varianten); `indeterminate` nur als Property; Formularwert bei checked/unchecked; Objektwerte, Tastatur- und Fokus-Navigation bei Radio.
- Zusätzliche Abnahme: alle drei Checkbox-Varianten je Theme; Tastatur-E2E für Radio; `table-settings` pixelgleich.

### G5 – Listen: select → combobox + single-select (#9594, #9569, #9595)

- select: `BaseSelectWebComponent` für `kol-select` und das Übergangs-Tag `kol-select-wc` (DD16, Übergangsmuster `shadow: false`).
- combobox und single-select: gemeinsame Basis oder ein `ListboxBehavior` für Tastatur, open/close und focusin/out. `@Listen`-Handler folgen der Event-Handler-Policy.
- Risiken: Options-Sync des versteckten `<select multiple>`; `pagination` hängt am Light DOM von `kol-select-wc`; `:has()`-Selektoren im CustomSuggestions-SCSS.
- Zusätzliche Abnahme: `pagination` pixelgleich; Tastatur- und Maus-E2E für combobox und single-select; bekannte Bugs bestehen nachweislich unverändert weiter oder wurden vorher gefixt.

### G6 – Rückbau

Gelöscht wird, sobald der letzte Import weg ist. Veröffentlichte Schema-Typen bleiben stehen.

| Zeitpunkt | Was gelöscht wird                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nach G2   | erledigt in G2: `utils/counter-dom-updater.ts`, `InputPasswordController`, `InputTextEmailController`, `InputTextController`, `TextAreaStateWrapper`, alte `inputs/TextArea`    |
| nach G3a  | erledigt in G3a: `InputNumberController`, `InputRangeController`, `InputIconController.isNumberString`                                                                          |
| nach G3b  | erledigt in G3b: `InputDateController`, `InputIconController.validateNumber`/`parseToNumber`                                                                                    |
| nach G3c  | erledigt in G3c: `InputFileController`; `InputIconController` bleibt für select, single-select und combobox (G5)                                                                |
| nach G4   | Checkbox-/Radio-Controller inkl. `InputCheckboxRadioController`, `Checkbox`-/`RadioStateWrapper`, altes `FieldControl`, alte `inputs/Checkbox`/`inputs/Radio`, alte Radio-Utils |
| nach G5   | `SelectStateWrapper`, `NativeSelect`/`NativeOption(List)`, `CustomSuggestions*`, `Suggestions`; `kol-select-wc` erst, wenn `pagination` das FC rendert                          |
| final     | `@deprecated/input/*`, `input-adapter-leanup/`, `functional-component-wrappers/` inkl. `getRenderStates`, Adapter aus G1.3, alte FormField-/Input-FCs, `*Watches`-Interfaces    |

### G7 – Folge-Epics (außerhalb dieser Migration)

- `KolButtonWcTag`/`KolPopoverButtonWcTag` durch `ButtonFC`/`PopoverButtonFC` ersetzen (erfordert Theme-Änderungen).
- Umstieg auf natives `formAssociated` mit ElementInternals (Verhaltensänderung, eventuell Breaking).
- BEM-Bereinigung mit CLI-Tasks `ScssRename*` und Migrationsguide für Custom-Themes.

## Offene Fragen für die Detailpläne

1. ~~Sind die Shell-Adapter (alte FC → neue FC) als Zwischenschicht akzeptabel? (G1.3)~~ Entschieden: ja, siehe G1.3.
2. ~~ID-Strategie: bisherige Erzeugung für Snapshot-Parität oder DD12 `createUniqueId`? (G1.4)~~ Kein Konflikt: Legacy nutzt bereits `createUniqueId` und `createRelatedUniqueId`. Die Basis-ID wird einmal pro Instanz als `@State()` erzeugt.
3. ~~`_touched` als `@State` oder als Render-Prop? (G1.4)~~ Entschieden: Render-Prop. `_touched` bleibt `@Prop({ mutable: true, reflect: true })`, der Blur-Handler schreibt die Prop (Vorbild `_open` in `kol-details`).
4. ~~`_on`: eine gemeinsame Callback-Prop oder typisiert pro Feld? (G1.1)~~ Entschieden: gemeinsam, alle Felder deklarieren `InputTypeOnDefault`.
5. ~~SSR-Absturz von `attachInternals(undefined)` 1:1 übernehmen oder mit eigenem PR über einen Guard absichern? (G1.2)~~ Entschieden: 1:1 übernehmen, Fix als eigener PR nach G1.2 (#11034). Ursache ist nicht ein leeres `@Element()`: In mock-doc greift `instanceof Element` in `findHostWithShadowRoot` nicht. Betroffen sind im SSR die inneren `kol-button-wc`/`kol-popover-button-wc` und mit `serializeShadowRoot: 'scoped'` alle Legacy-Felder.
6. ~~Verhaltensverträge in Jest oder in Playwright? (G0)~~ Entschieden: Playwright, siehe G0.
7. ~~Namen der Input-Props für min/max/step. (G3)~~ Entschieden: `inputMinProp`, `inputMaxProp` und `stepProp`, analog zu `horizontalIconsProp` (G1.1).
8. `kol-select-wc` als Übergangs-Tag behalten oder `pagination` direkt auf das FC umstellen? (G5)
9. combobox und single-select: gemeinsame DD16-Basis oder `ListboxBehavior`? (G5)
10. #10501 und #10617 vor oder nach der Migration fixen? (G5)

## Grundlagen

- `packages/components/src/components/_skeleton/ARC42.md`
- Skill `.claude/skills/migrate-to-skeleton/` (inkl. `reference/patterns.md`, `reference/pitfalls.md`)
- Skill `.claude/skills/zero-visual-delta-handoff/`
