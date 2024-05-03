# SplitButton

> <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die SplitButton-Komponente kann genutzt werden, um einen zweigeteilten Button darzustellen. Dabei wird der Primär-Button
üblicherweise für eine Haupt-Aktion genutzt, während der sekundäre Button ein Kontext-Menü ("Popover") öffnet, hinter
dem sich weitere Aktionen verbergen.

- Der Sekundär-Button togglet grundsätzlich das Kontextmenü.
- Für den Primär-Button kann ein individueller Event-Handler hinterlegt werden, wird dies nicht getan togglet er ebenfalls das Kontextmenü.

## Konstruktion

### Code

```html
<kol-split-button _label="Split-Button">Split-Button Popover</kol-split-button>
```

### Beispiel

<kol-split-button _label="Split-Button">
  Split-Button Popover
</kol-split-button>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute        | Description                                                                                                                                                                      | Type                                                                                                                                                   | Default     |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `_ariaControls`       | `_aria-controls` | Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)                              | `string \| undefined`                                                                                                                                  | `undefined` |
| `_ariaExpanded`       | `_aria-expanded` | Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)          | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_ariaSelected`       | `_aria-selected` | Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_customClass`        | `_custom-class`  | Defines the custom class attribute if \_variant="custom" is set.                                                                                                                 | `string \| undefined`                                                                                                                                  | `undefined` |
| `_disabled`           | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                                           | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_hideLabel`          | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                                       | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_icons`              | `_icons`         | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                                                  | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined`                                                                                 | `undefined` |
| `_id`                 | `_id`            | Defines the internal ID of the primary component element.                                                                                                                        | `string \| undefined`                                                                                                                                  | `undefined` |
| `_label` _(required)_ | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).                                                               | `string`                                                                                                                                               | `undefined` |
| `_name`               | `_name`          | Defines the technical name of an input field.                                                                                                                                    | `string \| undefined`                                                                                                                                  | `undefined` |
| `_on`                 | --               | Defines the callback functions for button events.                                                                                                                                | `undefined \| { onClick?: EventValueOrEventCallback<MouseEvent, StencilUnknown> \| undefined; onMouseDown?: EventCallback<MouseEvent> \| undefined; }` | `undefined` |
| `_role`               | `_role`          | Defines the role of the components primary element.                                                                                                                              | `"button" \| "link" \| "tab" \| undefined`                                                                                                             | `undefined` |
| `_tabIndex`           | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                 | `number \| undefined`                                                                                                                                  | `undefined` |
| `_tooltipAlign`       | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                                        | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                  | `'top'`     |
| `_type`               | `_type`          | Defines either the type of the component or of the components interactive element.                                                                                               | `"button" \| "reset" \| "submit" \| undefined`                                                                                                         | `'button'`  |
| `_value`              | `_value`         | Defines the value that the button emits on click.                                                                                                                                | `boolean \| null \| number \| object \| string \| undefined`                                                                                           | `undefined` |
| `_variant`            | `_variant`       | Defines which variant should be used for presentation.                                                                                                                           | `"custom" \| "danger" \| "ghost" \| "normal" \| "primary" \| "secondary" \| "tertiary" \| undefined`                                                   | `'normal'`  |

## Slots

| Slot | Description                                               |
| ---- | --------------------------------------------------------- |
|      | Ermöglicht das Einfügen beliebigen HTMLs in das dropdown. |

---
