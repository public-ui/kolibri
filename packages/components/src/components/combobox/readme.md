# Combobox

Die **Combobox**-Komponente erzeugt eine Auswahlliste, die ein Eingabefeld mit einer darunter angezeigten Liste von auswählbaren Optionen kombiniert.

## Konstruktion

### Code

```html
<kol-combobox _options="[{'label':'Herr','value':0},{'label':'Frau','value':1},{'label':'Firma','value':2}]" _value="1"> Auswahlfeld </kol-combobox>
```

### Beispiel

<kol-combobox _options="[{'label':'Herr','value':0},{'label':'Frau','value':1},{'label':'Firma','value':2}]" _value="1"> Auswahlfeld </kol-combobox>

<kol-combobox _options="[{'label':'Herr','value':0},{'label':'Frau','value':1},{'label':'Firma','value':2},{'label':'Herr','value':3},{'label':'Frau','value':4},{'label':'Firma','value':5}]" _value="1">Auswahlfeld mit rows</kol-combobox>

## Verwendung

Die Auswahlmöglichkeiten werden über das Attribut **`_options`** als Objekt oder JSON-String an die Komponente übergeben. Je Option müssen die Werte **`label`** und **`value`** angegeben werden.

Beispiel für die Konstruktion des JSON-Objektes:

```json
[
	{ "label": "Herr", "value": 0 },
	{ "label": "Frau", "value": 1 },
	{ "label": "Firma", "value": 2 }
]
```

<!--### Best practices-->

<!-- ## Barrierefreiheit -->

### Tastatursteuerung

| Taste                          | Funktion                                                                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                          | Fokussiert das Auswahlfeld.                                                                                                                                                                         |
| `Enter`                        | Wenn die Listbox geöffnet ist und eine Option fokussiert ist, wählt diese Funktion die fokussierte Option aus und schließt die Listbox. Wenn keine Optionfokussiert ist, öffnet es nur die Listbox. |
| `Pfeil nach unten (ArrowDown)` | Öffnet die Listbox, wenn sie geschlossen ist, und bewegt den visuellen Fokus um eine Option nach unten, wenn die Listbox geöffnet ist.                                                              |
| `Pfeil nach oben (ArrowUp)`    | Öffnet die Listbox, wenn sie geschlossen ist, und bewegt den visuellen Fokus um eine Option nach oben, wenn die Listbox geöffnet ist.                                                               |
| `Escape (Esc)`                 | Schlißt die Listbox und entfernt den visuellen Fokus von der Combobox, ohne eine Auswahl zu treffen.                                                                                                |
| `Home`                         | Bewegt den visuellen Fokus auf die erste Option in der Listbox.                                                                                                                                     |
| `End`                          | Bewegt den visuellen Fokus auf die letzte Option in der Listbox.                                                                                                                                    |
| `Seite mach oben(PageUp)`      | Springt zehn Optionen nach oben in der Listbox und fokussiert die entsprechende Option.                                                                                                             |
| `Seite mach unten(PageDown)`   | Springt zehn Optionen nach unten in der Listbox und fokussiert die entsprechende Option.                                                                                                            |
| `Druckbare Zeichen`            | Fokussiert die erste Option, die mit dem gedrückten Zeichen beginnt.                                                                                                                                |

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute        | Description                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                                                                                                              | Default     |
| ----------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`            | `_access-key`    | Defines which key combination can be used to trigger or focus the interactive element of the component.                                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |
| `_alert`                | `_alert`         | Defines whether the screen-readers should read out the notification.                                                                                         | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `true`      |
| `_disabled`             | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                       | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`     |
| `_error`                | `_error`         | <span style="color:red">**[DEPRECATED]**</span> Will be removed in v3. Use `msg` instead.<br/><br/>Defines the error message text.                           | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |
| `_hideError`            | `_hide-error`    | Hides the error message but leaves it in the DOM for the input's aria-describedby.                                                                           | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`     |
| `_hideLabel`            | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                   | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`     |
| `_hint`                 | `_hint`          | Defines the hint text.                                                                                                                                       | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `''`        |
| `_icons`                | `_icons`         | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                              | `string \| undefined \| { right?: IconOrIconClass \| undefined; left?: IconOrIconClass \| undefined; }`                                                                                                                                                                                                                                                                           | `undefined` |
| `_id`                   | `_id`            | Defines the internal ID of the primary component element.                                                                                                    | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |
| `_label` _(required)_   | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot. | `string`                                                                                                                                                                                                                                                                                                                                                                          | `undefined` |
| `_msg`                  | --               | Defines the properties for a message rendered as Alert component.                                                                                            | `undefined \| {} & { _level?: 0 \| 2 \| 1 \| 4 \| 3 \| 5 \| 6 \| undefined; _on?: KoliBriAlertEventCallbacks \| undefined; _type?: "default" \| "info" \| "success" \| "warning" \| "error" \| undefined; _variant?: "card" \| "msg" \| undefined; _label?: string \| undefined; _alert?: boolean \| undefined; _hasCloser?: boolean \| undefined; } & { _description: string; }` | `undefined` |
| `_name`                 | `_name`          | Defines the technical name of an input field.                                                                                                                | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |
| `_on`                   | --               | Gibt die EventCallback-Funktionen für das Input-Event an.                                                                                                    | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput \| undefined`                                                                                                                                                                                                                                                                       | `undefined` |
| `_options` _(required)_ | --               | Options the user can choose from, also supporting Optgroup.                                                                                                  | `string[]`                                                                                                                                                                                                                                                                                                                                                                        | `undefined` |
| `_required`             | `_required`      | Makes the input element required.                                                                                                                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`     |
| `_tabIndex`             | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |
| `_tooltipAlign`         | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                    | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                                                                                                                                                                                                                                             | `'top'`     |
| `_touched`              | `_touched`       | Shows if the input was touched by a user.                                                                                                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`     |
| `_value`                | `_value`         | Defines the value of the input.                                                                                                                              | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined` |

## Methods

### `getValue() => Promise<string | undefined>`

#### Returns

Type: `Promise<string | undefined>`

## Slots

| Slot | Description                         |
| ---- | ----------------------------------- |
|      | Die Beschriftung des Eingabefeldes. |

---
