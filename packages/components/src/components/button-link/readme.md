# ButtonLink

Der ButtonLink ist semantisch ein Button und hat das Design eines Links. Hierzu werden alle relevanten Properties der Button-Komponente übernommen und um die Design-bestimmenden Properties des Links erweitert.

Einen Button kann man deaktivieren und daher gibt es bei einem ButtonLink das Property `_disabled`. Wie das optisch ausgestaltet wird, entscheidet die UX-Designer:in.

Statt, wie bei einem Link, `_href` zu verwenden, wird bei einem ButtonLink das Property über den `Click-Callback` gesteuert. Hierzu wird das `_on`-Property verwendet.

Bei einem Link gibt es das Property `target`, welches ggf. den Link in einem neuen Fenster/Tab öffnet. Das Verhalten ist aktuell noch nicht umgesetzt.

Da der Link, nicht wie der Button, in mehrere Varianten (`primary` oder `secondary` usw.) angeboten wird, stehen die Properties `_customClass` und `_variant` nicht zur Verfügung.

## Konstruktion

### Code

```html
<kol-button-link _on="" _label="Schalter sieht wie ein Link aus"></kol-button-link>
```

### Beispiel

<div class="flex gap-2">
  <kol-button-link _on="" _label="Schalter sieht wie ein Link aus"></kol-button-link>
</div>

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute        | Description                                                                                                                                                                                                                                                                           | Type                                                                                                                                            | Default     |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`          | `_access-key`    | Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.                                                                                                                                                                                                 | `string \| undefined`                                                                                                                           | `undefined` |
| `_ariaControls`       | `_aria-controls` | Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)                                                                                                                                             | `string \| undefined`                                                                                                                           | `undefined` |
| `_ariaCurrent`        | `_aria-current`  | Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)                                                                                                                                    | `"date" \| "location" \| "page" \| "step" \| "time" \| boolean \| undefined`                                                                    | `undefined` |
| `_ariaExpanded`       | `_aria-expanded` | Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)                                                                                                                                      | `boolean \| undefined`                                                                                                                          | `undefined` |
| `_ariaLabel`          | `_aria-label`    | Gibt einen beschreibenden Text für den Screenreader an. Damit die Sprachsteuerung von interaktiven Elementen funktioniert, muss der Aria-Label-Text mit dem Label-Text des Buttons beginnen.  - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label | `string \| undefined`                                                                                                                           | `undefined` |
| `_ariaSelected`       | `_aria-selected` | Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)                                                                                                                                             | `boolean \| undefined`                                                                                                                          | `undefined` |
| `_disabled`           | `_disabled`      | Gibt an, ob der Button deaktiviert ist.                                                                                                                                                                                                                                               | `boolean \| undefined`                                                                                                                          | `false`     |
| `_icon`               | `_icon`          | Iconklasse (z.B.: "codicon codicon-home")                                                                                                                                                                                                                                             | `KoliBriHorizontalIcon & KoliBriVerticalIcon \| string \| undefined`                                                                            | `undefined` |
| `_iconOnly`           | `_icon-only`     | Gibt an, ob nur das Icon angezeigt wird.                                                                                                                                                                                                                                              | `boolean \| undefined`                                                                                                                          | `false`     |
| `_id`                 | `_id`            | Gibt die ID der Schaltfläche an. (Selection, Testing)                                                                                                                                                                                                                                 | `string \| undefined`                                                                                                                           | `undefined` |
| `_label` _(required)_ | `_label`         | Setzt den sichtbaren Text des Elements.                                                                                                                                                                                                                                               | `string`                                                                                                                                        | `undefined` |
| `_on`                 | --               | Gibt die EventCallback-Funktionen für die Button-Events an.                                                                                                                                                                                                                           | `undefined \| { onClick?: EventValueOrEventCallback<MouseEvent, unknown> \| undefined; onMouseDown?: EventCallback<MouseEvent> \| undefined; }` | `undefined` |
| `_role`               | `_role`          | Gibt an, welche Role der Schalter hat.                                                                                                                                                                                                                                                | `"button" \| "link" \| "tab" \| undefined`                                                                                                      | `undefined` |
| `_tabIndex`           | `_tab-index`     | Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                                                                                                                                             | `number \| undefined`                                                                                                                           | `undefined` |
| `_tooltipAlign`       | `_tooltip-align` | Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.                                                                                                                                                                                                         | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                           | `'top'`     |
| `_type`               | `_type`          | Gibt an, welche Typ der Button hat.                                                                                                                                                                                                                                                   | `"button" \| "reset" \| "submit" \| undefined`                                                                                                  | `'button'`  |
| `_value`              | --               | Gibt einen Wert an, den der Schalter bei einem Klick zurückgibt.                                                                                                                                                                                                                      | `unknown`                                                                                                                                       | `undefined` |


## Dependencies

### Depends on

- kol-button-wc

### Graph
```mermaid
graph TD;
  kol-button-link --> kol-button-wc
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  style kol-button-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


