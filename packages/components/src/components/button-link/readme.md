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

### Events

Events der Komponente können über eine `_on`-Property behandelt werden, die aus einem Objekt mit verschiedenen Callback-Funktionen besteht:

```js
kolibriElement._on = {
	onFocus: (event) => {
		/* Do something on focus */
	},
	onClick: (event, value) => {
		/* Do something with value or event */
	},
	// ...
};
```

| Event       | Auslöser                                                       | Value                |
| ----------- | -------------------------------------------------------------- | -------------------- |
| onFocus     | Element wird fokussiert                                        | -                    |
| onMouseDown | Element wird angeklickt (entspricht nativem `mouseDown`-Event) | -                    |
| onClick     | Element wird angeklickt (entspricht nativem `click`-Event)     | Definierter `_value` |
| onBlur      | Element verliert Fokus                                         | -                    |

### Beispiel

<div class="flex gap-2">
  <kol-button-link _on="" _label="Schalter sieht wie ein Link aus"></kol-button-link>
</div>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute        | Description                                                                                                                                                                      | Type                                                                                                                                                   | Default     |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `_accessKey`          | `_access-key`    | Defines the elements access key.                                                                                                                                                 | `string \| undefined`                                                                                                                                  | `undefined` |
| `_ariaControls`       | `_aria-controls` | Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)                              | `string \| undefined`                                                                                                                                  | `undefined` |
| `_ariaExpanded`       | `_aria-expanded` | Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)          | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_ariaSelected`       | `_aria-selected` | Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_disabled`           | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                                           | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_hideLabel`          | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                                       | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_icons`              | `_icons`         | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                                                  | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined`                                                                                 | `undefined` |
| `_id`                 | `_id`            | Defines the internal ID of the primary component element.                                                                                                                        | `string \| undefined`                                                                                                                                  | `undefined` |
| `_label` _(required)_ | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.                     | `string`                                                                                                                                               | `undefined` |
| `_name`               | `_name`          | Defines the technical name of an input field.                                                                                                                                    | `string \| undefined`                                                                                                                                  | `undefined` |
| `_on`                 | --               | Gibt die EventCallback-Funktionen für die Button-Events an.                                                                                                                      | `undefined \| { onClick?: EventValueOrEventCallback<MouseEvent, StencilUnknown> \| undefined; onMouseDown?: EventCallback<MouseEvent> \| undefined; }` | `undefined` |
| `_role`               | `_role`          | Defines the role of the components primary element.                                                                                                                              | `"button" \| "link" \| "tab" \| "treeitem" \| undefined`                                                                                               | `undefined` |
| `_tabIndex`           | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                 | `number \| undefined`                                                                                                                                  | `undefined` |
| `_tooltipAlign`       | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                                        | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                  | `'top'`     |
| `_type`               | `_type`          | Defines either the type of the component or of the components interactive element.                                                                                               | `"button" \| "reset" \| "submit" \| undefined`                                                                                                         | `'button'`  |
| `_value`              | `_value`         | Defines the value that the button emits on click.                                                                                                                                | `boolean \| null \| number \| object \| string \| undefined`                                                                                           | `undefined` |

## Methods

### `focus() => Promise<void>`

<span style="color:red">**[DEPRECATED]**</span> Use kolFocus instead.<br/><br/>

#### Returns

Type: `Promise<void>`

### `getValue() => Promise<Stringified<StencilUnknown> | undefined>`

#### Returns

Type: `Promise<Stringified<StencilUnknown>>`

### `kolFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

---
