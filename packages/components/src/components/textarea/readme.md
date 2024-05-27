# Textarea

Die Komponente **Textarea** stellt ein größeres Eingabefeld für Inhalte zur Verfügung. Im Gegensatz zum <kol-link _href="/docs/components/input-text" _label="/docs/components/input-text" _label="InputText"></kol-link> können hier auch umfangreiche Inhalte eingegeben werden, die auch mit Zeilenumbrüchen versehen sein können.

## Konstruktion

### Code

```html
<kol-textarea
	_resize="none"
	_rows="5"
	_value="
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
  magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
  elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
  et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
  sit amet."
></kol-textarea>
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

| Event    | Auslöser                                                                                     | Value                        |
| -------- | -------------------------------------------------------------------------------------------- | ---------------------------- |
| onFocus  | Element wird fokussiert                                                                      | -                            |
| onClick  | Element wird angeklickt                                                                      | -                            |
| onInput  | Eine Eingabe erfolgt (entspricht nativem `input`-Event)                                      | Eingegebener Wert als String |
| onChange | Eingabe ist abgeschlossen und Eingabefeld verliert Fokus (entspricht nativem `change`-Event) | Eingegebener Wert als String |
| onBlur   | Element verliert Fokus                                                                       | -                            |

### Beispiel

<kol-textarea _resize="none" _rows="5" _value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.">
</kol-textarea>

## Verwendung

Verwenden Sie die **Textarea**-Komponente wenn die Eingabe von größeren Textmengen erforderlich ist, z.B. bei der Erfassung eines Anliegens innerhalb eines Formulars.
Mit Hilfe des Attributs **`_rows`** kann die Höhe der Textarea in Zeilen bestimmt werden.
Über das Attribut **`_resize`** kann zusätzlich festgelegt werden ob und in welche Richtung die Textarea vergrößert werden kann. Der Wert **`none`** sperrt die Textarea gegen Größenänderungen.

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

### Tastatursteuerung

| Taste          | Funktion                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| `Tab`          | Fokussiert die Textarea.                                                        |
| `Pfeil-Tasten` | Können für die Navigation im Inhalt der fokussierten Textarea verwendet werden. |

## Links und Referenzen

- <kol-link _href="https://medium.com/@gavyn/til-autofocus-inputs-are-an-accessibility-problem-32ced60c3109" _target="_blank"></kol-link>

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute        | Description                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                                                                                                              | Default      |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `_accessKey`          | `_access-key`    | Defines which key combination can be used to trigger or focus the interactive element of the component.                                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_adjustHeight`       | `_adjust-height` | Adjusts the height of the element to its content.                                                                                                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_alert`              | `_alert`         | Defines whether the screen-readers should read out the notification.                                                                                         | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `true`       |
| `_disabled`           | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                       | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_error`              | `_error`         | <span style="color:red">**[DEPRECATED]**</span> Will be removed in v3. Use `msg` instead.<br/><br/>Defines the error message text.                           | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_hasCounter`         | `_has-counter`   | Shows the character count on the lower border of the input.                                                                                                  | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_hideError`          | `_hide-error`    | Hides the error message but leaves it in the DOM for the input's aria-describedby.                                                                           | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_hideLabel`          | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                   | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_hint`               | `_hint`          | Defines the hint text.                                                                                                                                       | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `''`         |
| `_id`                 | `_id`            | Defines the internal ID of the primary component element.                                                                                                    | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_label` _(required)_ | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot. | `string`                                                                                                                                                                                                                                                                                                                                                                          | `undefined`  |
| `_maxLength`          | `_max-length`    | Defines the maximum number of input characters.                                                                                                              | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_msg`                | --               | Defines the properties for a message rendered as Alert component.                                                                                            | `undefined \| {} & { _level?: 0 \| 2 \| 1 \| 4 \| 3 \| 5 \| 6 \| undefined; _on?: KoliBriAlertEventCallbacks \| undefined; _type?: "default" \| "info" \| "success" \| "warning" \| "error" \| undefined; _variant?: "card" \| "msg" \| undefined; _label?: string \| undefined; _alert?: boolean \| undefined; _hasCloser?: boolean \| undefined; } & { _description: string; }` | `undefined`  |
| `_name`               | `_name`          | Defines the technical name of an input field.                                                                                                                | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_on`                 | --               | Gibt die EventCallback-Funktionen für das Input-Event an.                                                                                                    | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput \| undefined`                                                                                                                                                                                                                                                                       | `undefined`  |
| `_placeholder`        | `_placeholder`   | Defines the placeholder for input field. To be shown when there's no value.                                                                                  | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_readOnly`           | `_read-only`     | Makes the input element read only.                                                                                                                           | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_required`           | `_required`      | Makes the input element required.                                                                                                                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_resize`             | `_resize`        | Defines whether and in which direction the size of the input can be changed by the user. (https://developer.mozilla.org/de/docs/Web/CSS/resize)              | `"both" \| "horizontal" \| "none" \| "vertical" \| undefined`                                                                                                                                                                                                                                                                                                                     | `'vertical'` |
| `_rows`               | `_rows`          | Defines how many rows of text should be visible at the same time.                                                                                            | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_tabIndex`           | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |
| `_tooltipAlign`       | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                    | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                                                                                                                                                                                                                                             | `'top'`      |
| `_touched`            | `_touched`       | Shows if the input was touched by a user.                                                                                                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                            | `false`      |
| `_value`              | `_value`         | Defines the value of the input.                                                                                                                              | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                             | `undefined`  |


## Methods

### `getValue() => Promise<string | undefined>`



#### Returns

Type: `Promise<string | undefined>`




## Slots

| Slot | Description                         |
| ---- | ----------------------------------- |
|      | Die Beschriftung des Eingabefeldes. |


----------------------------------------------


