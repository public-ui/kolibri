# InputRange

Synonyme: Slider

Der Input-Typ **Range** erzeugt ein interaktives Element, mit dem Werte durch Verschieben eines Reglers verändert werden können.

## Konstruktion

### Code

```html
<kol-input-range
	_label="Wertebereich"
	_min="100"
	_max="200"
	_value="100"
	_step="20"
	_icons='{"left": "codicon codicon-arrow-small-down", "right": "codicon codicon-arrow-small-up"}'
></kol-input-range>
```

### Events

Events der Komponente können über eine `_on`-Property behandelt werden, die aus einem Objekt mit verschiedenen Callback-Funktionen besteht:

```js
kolibriElement._on = {
	onFocus: (event) => {
		/* Do something on focus */
	},
	onInput: (event, value) => {
		/* Do something with value or event */
	},
	// ...
};
```

| Event    | Auslöser                                                      | Value                        |
| -------- | ------------------------------------------------------------- | ---------------------------- |
| onFocus  | Element wird fokussiert                                       | -                            |
| onClick  | Element wird angeklickt                                       | -                            |
| onInput  | Eine Eingabe erfolgt (entspricht nativem `input`-Event)       | Eingegebener Wert als String |
| onChange | Eingabe ist abgeschlossen (entspricht nativem `change`-Event) | Eingegebener Wert als Number |
| onBlur   | Element verliert Fokus                                        | -                            |

Value types von onInput und onChange werden in [#6345](https://github.com/public-ui/kolibri/issues/6345) angeglichen.

### Beispiel

<kol-input-range
	_label="Wertebereich"
	_min="100"
	_max="200"
	_value="100"
	_step="20"
	_icons='{"left": "codicon codicon-arrow-small-down", "right": "codicon codicon-arrow-small-up"}'></kol-input-range>

## Verwendung

### Best practices

- Achten sie darauf `id` und `name` korrekt zu setzen, damit die Daten beim Formular Absenden mitgesendet werden.

## Barrierefreiheit

### Tastatursteuerung

| Taste          | Funktion                                 |
| -------------- | ---------------------------------------- |
| `Tab`          | Fokussiert das Eingabefeld.              |
| `Pfeil-Tasten` | Verändern den Wert der Range-Komponente. |

## Links und Referenzen

- <kol-link _href="https://medium.com/@gavyn/til-autofocus-inputs-are-an-accessibility-problem-32ced60c3109" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute        | Description                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                                        | Default     |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`          | `_access-key`    | Defines which key combination can be used to trigger or focus the interactive element of the component.                                                                               | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_alert`              | `_alert`         | <span style="color:red">**[DEPRECATED]**</span> Will be removed in v3. Use automatic behaviour instead.<br/><br/>Defines whether the screen-readers should read out the notification. | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                      | `undefined` |
| `_autoComplete`       | `_auto-complete` | Defines whether the input can be auto-completed.                                                                                                                                      | `"off" \| "on" \| undefined`                                                                                                                                                                                                                                                                                                                                                                | `undefined` |
| `_disabled`           | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                                                | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                      | `false`     |
| `_error`              | `_error`         | <span style="color:red">**[DEPRECATED]**</span> Will be removed in v3. Use `msg` instead.<br/><br/>Defines the error message text.                                                    | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_hideError`          | `_hide-error`    | Hides the error message but leaves it in the DOM for the input's aria-describedby.                                                                                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                      | `false`     |
| `_hideLabel`          | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                      | `false`     |
| `_hint`               | `_hint`          | Defines the hint text.                                                                                                                                                                | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `''`        |
| `_icons`              | `_icons`         | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                                                       | `string \| undefined \| { right?: IconOrIconClass \| undefined; left?: IconOrIconClass \| undefined; }`                                                                                                                                                                                                                                                                                     | `undefined` |
| `_id`                 | `_id`            | Defines the internal ID of the primary component element.                                                                                                                             | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_label` _(required)_ | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.                          | `string`                                                                                                                                                                                                                                                                                                                                                                                    | `undefined` |
| `_max`                | `_max`           | Defines the largest possible input value.                                                                                                                                             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_min`                | `_min`           | Defines the smallest possible input value.                                                                                                                                            | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_msg`                | `_msg`           | Defines the properties for a message rendered as Alert component.                                                                                                                     | `string \| undefined \| {} & { _level?: 0 \| 2 \| 1 \| 4 \| 3 \| 5 \| 6 \| undefined; _on?: KoliBriAlertEventCallbacks \| undefined; _type?: "default" \| "info" \| "success" \| "warning" \| "error" \| undefined; _variant?: "card" \| "msg" \| undefined; _label?: string \| undefined; _alert?: boolean \| undefined; _hasCloser?: boolean \| undefined; } & { _description: string; }` | `undefined` |
| `_name`               | `_name`          | Defines the technical name of an input field.                                                                                                                                         | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_on`                 | --               | Gibt die EventCallback-Funktionen für das Input-Event an.                                                                                                                             | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput \| undefined`                                                                                                                                                                                                                                                                                 | `undefined` |
| `_step`               | `_step`          | Defines the step size for value changes.                                                                                                                                              | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_suggestions`        | `_suggestions`   | Suggestions to provide for the input.                                                                                                                                                 | `W3CInputValue[] \| string \| undefined`                                                                                                                                                                                                                                                                                                                                                    | `undefined` |
| `_tabIndex`           | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                      | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |
| `_tooltipAlign`       | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                                             | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                                                                                                                                                                                                                                                       | `'top'`     |
| `_touched`            | `_touched`       | Shows if the input was touched by a user.                                                                                                                                             | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                      | `false`     |
| `_value`              | `_value`         | Defines the value of the input.                                                                                                                                                       | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |

## Methods

### `focus() => Promise<void>`

<span style="color:red">**[DEPRECATED]**</span> Use kolFocus instead.<br/><br/>

#### Returns

Type: `Promise<void>`

### `getValue() => Promise<number | undefined>`

#### Returns

Type: `Promise<number | undefined>`

### `kolFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                           |
| ---- | ------------------------------------- |
|      | Die Beschriftung des Eingabeelements. |

---
