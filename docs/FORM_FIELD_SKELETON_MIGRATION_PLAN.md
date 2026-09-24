# Migrationsplan: Formularfelder auf Skeleton

Übergreifender Plan für die Skeleton-Migration der 14 Formularfelder von `kol-combobox` bis `kol-textarea` (Epic #9559). Er schneidet die Felder in Gruppen, legt das gemeinsame Fundament fest und ordnet die Arbeit in parallele Spuren. Jede Gruppe erhält vor der Umsetzung einen eigenen Detailplan.

Stand: 24.09.2026, `@public-ui/components` 4.5.0-rc.0.

## Ausgangslage

Keines der 14 Felder ist bisher migriert. Alle laufen noch auf dem Legacy-Stack:

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
- Verhaltensverträge pro Feld: Reihenfolge und Payload von `kolChange`/`kolInput`/`kolFocus`/`kolBlur`/`kolKeydown`/`kolClick` und der `_on`-Callbacks; `FormData` eines nativen `<form>` für Checkbox, `select` multiple, File und Radio mit Objektwerten; `_syncValueBySelector`; `_touched` nach Blur.
- Visual-Samples ergänzen für msg, hint, disabled, hideLabel, infoPopover, Counter, Icons, `inputNumberButtons` an/aus und die Checkbox-Varianten. Neue Samples erzeugen neue Baselines und gehören in ein eigenes PR vor der ersten Migration.
- Toten Code löschen: `functional-components/inputs/Combobox/Combobox.tsx`.

### G1 – Fundament + Pilot `kol-input-color` (#9673, #9577)

Alle 14 Felder teilen Basis-Props, die Label/Hint/Msg-Hülle, die Formular-Anbindung und die Event-Logik. Das wird einmal gebaut und am dünnsten Feld geprüft, damit die Basisklasse an einem echten Fall entsteht.

1. **Basis-Props** in `internal/props/`: msg, hint, hideMsg, touched, infoPopover, syncValueBySelector, ariaDetails, required, readOnly, `on` (Input-Callbacks) und das Icons-Objekt für Inputs (`icons.ts` bleibt unverändert). Dazu `formFieldBasePropsConfig` für alle `api.tsx`.
2. **`FormAssociationBehavior`**: übernimmt `input-adapter-leanup/associated.controller.ts` 1:1, einschließlich der späten Host-Zuweisung im Konstruktor. `button/base.tsx` wird im selben PR umgestellt; der Button-Pin bleibt unverändert.
3. **Shell-FCs** unter `internal/functional-components/form-field/`: FormField (Label/Hint/Msg/Counter/Tooltip-Slot), InputContainer, InputAdornment, IconButton, FieldControl sowie Input, TextArea, Checkbox, Radio, NativeSelect/Option(List) und Suggestions. Neue Blöcke in `schema/bem-registry.ts`. Empfehlung: Die alten FCs leiten vorübergehend auf die neuen weiter, damit das Pixel-Gate die Hülle sofort über alle 14 Felder prüft.
4. **`BaseFormFieldWebComponent`** (DD16): `apply*` der Basis-Props, ein eigenes `TooltipBehavior` pro Instanz statt der modulglobalen Map in `FormField.tsx`, Formular-Anbindung, Event-Behandlung als Ersatz für `InputController`, Helfer für focus/getValue und die ID-Strategie. Damit wird `kol-input-color` migriert.

Risiken: Zusammenbau von `aria-describedby` (hint, msg, Counter, Hinweis zur Zeichengrenze); ID-Strategie (DD12 gegen Snapshot-Parität); `attachInternals(undefined)` bei SSR/Hydrate; Generics von `ApiFromConfig` beim Einspreizen der Basis-Config.

### G2 – Textfelder: email → password → text, danach textarea (#9579, #9582, #9585, #9602)

Die vier Felder hängen heute in der Kette `InputPasswordController → InputTextEmailController → InputText/InputEmail` und teilen placeholder, autoComplete, pattern, maxLength/hasCounter/maxLengthBehavior, spellCheck und den Counter.

- `BaseTextInputWebComponent` für email, password und text.
- `CounterBehavior` ersetzt `utils/counter-dom-updater.ts`; das direkte DOM-Update ohne Re-Render bleibt erhalten.
- textarea erbt direkt von `BaseFormFieldWebComponent` und nutzt das CounterBehavior.
- Risiken: Selection-API und `_type` search/url/tel von input-text; Clear-Button und Visibility-Toggle; Datalist-IDs; `_adjustHeight`/`_resize` bei textarea.
- Zusätzliche Abnahme: `input-character-limit` und `input-text.clear-button.e2e` grün; alle 16 React-Routen von input-text pixelgleich.

### G3 – Wertetypen (#9581, #9584, #9578, #9580)

Drei parallele Spuren: a) number → range, b) date, c) file. Die Felder nutzen die Standard-Hülle, müssen aber ihren Wert umwandeln.

- Eigene Input-Props für min/max/step; die vorhandenen Meter-Props (Defaults 0/100) passen nicht.
- a) Step-Buttons und Feature-Flag `inputNumberButtons`; range mit zwei synchronen Inputs und Suggestions.
- b) Date↔ISO-Logik aus `input-date/controller.ts` in Hilfsfunktionen, alle 5 `_type`s, Zeitzonen.
- c) FileList, Drag-&-Drop-Modifier, Browse-Button, übertragener Formularwert.
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
| nach G2   | `utils/counter-dom-updater.ts`, `InputPasswordController`, `InputTextEmailController`, `TextAreaStateWrapper`, alte `inputs/TextArea`                                           |
| nach G4   | Checkbox-/Radio-Controller inkl. `InputCheckboxRadioController`, `Checkbox`-/`RadioStateWrapper`, altes `FieldControl`, alte `inputs/Checkbox`/`inputs/Radio`, alte Radio-Utils |
| nach G5   | `SelectStateWrapper`, `NativeSelect`/`NativeOption(List)`, `CustomSuggestions*`, `Suggestions`; `kol-select-wc` erst, wenn `pagination` das FC rendert                          |
| final     | `@deprecated/input/*`, `input-adapter-leanup/`, `functional-component-wrappers/` inkl. `getRenderStates`, Adapter aus G1.3, alte FormField-/Input-FCs, `*Watches`-Interfaces    |

### G7 – Folge-Epics (außerhalb dieser Migration)

- `KolButtonWcTag`/`KolPopoverButtonWcTag` durch `ButtonFC`/`PopoverButtonFC` ersetzen (erfordert Theme-Änderungen).
- Umstieg auf natives `formAssociated` mit ElementInternals (Verhaltensänderung, eventuell Breaking).
- BEM-Bereinigung mit CLI-Tasks `ScssRename*` und Migrationsguide für Custom-Themes.

## Offene Fragen für die Detailpläne

1. Sind die Shell-Adapter (alte FC → neue FC) als Zwischenschicht akzeptabel? (G1.3)
2. ID-Strategie: bisherige Erzeugung für Snapshot-Parität oder DD12 `createUniqueId`? (G1.4)
3. `_touched` als `@State` oder als Render-Prop? (G1.4)
4. `_on`: eine gemeinsame Callback-Prop oder typisiert pro Feld? (G1.1)
5. SSR-Absturz von `attachInternals(undefined)` 1:1 übernehmen oder mit eigenem PR über einen Guard absichern? (G1.2)
6. Verhaltensverträge in Jest oder in Playwright? (G0)
7. Namen der Input-Props für min/max/step und für das Icons-Objekt. (G3)
8. `kol-select-wc` als Übergangs-Tag behalten oder `pagination` direkt auf das FC umstellen? (G5)
9. combobox und single-select: gemeinsame DD16-Basis oder `ListboxBehavior`? (G5)
10. #10501 und #10617 vor oder nach der Migration fixen? (G5)

## Grundlagen

- `packages/components/src/components/_skeleton/ARC42.md`
- Skill `.claude/skills/migrate-to-skeleton/` (inkl. `reference/patterns.md`, `reference/pitfalls.md`)
- Skill `.claude/skills/zero-visual-delta-handoff/`
