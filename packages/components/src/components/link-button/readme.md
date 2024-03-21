# LinkButton

Der LinkButton ist semantisch ein Link und hat das Design eines Buttons. Hierzu werden alle relevanten Properties der Link-Komponente übernommen und um die Design-bestimmenden Properties des Buttons erweitert.
Weitere Informationen zum Aussehen finden Sie auf der <kol-link _href="/docs/components/button" _label="/docs/components/button" _label="Seite des Buttons"></kol-link>.

## Konstruktion

### Code

```html
<kol-link-button _href="#" _label="Primary" _variant="primary"></kol-link-button>
<kol-link-button _href="#" _label="Secondary" _variant="secondary"></kol-link-button>
<kol-link-button _href="#" _label="Normal" _variant="normal"></kol-link-button>
<kol-link-button _href="#" _label="Secondary" _variant="danger"></kol-link-button>
<kol-link-button _href="#" _label="Ghost" _variant="ghost"></kol-link-button>
```

### Beispiel

<div class="flex gap-2">
  <kol-link-button _href="#" _label="Primary" _variant="primary"></kol-link-button>
  <kol-link-button _href="#" _label="Secondary" _variant="secondary"></kol-link-button>
  <kol-link-button _href="#" _label="Normal" _variant="normal"></kol-link-button>
  <kol-link-button _href="#" _label="Danger" _variant="danger"></kol-link-button>
  <kol-link-button _href="#" _label="Ghost" _variant="ghost"></kol-link-button>
</div>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute             | Description                                                                                                                                                  | Type                                                                                                 | Default     |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`          | `_access-key`         | Defines the elements access key.                                                                                                                             | `string \| undefined`                                                                                | `undefined` |
| `_ariaCurrentValue`   | `_aria-current-value` | Defines the value for the aria-current attribute.                                                                                                            | `"date" \| "false" \| "location" \| "page" \| "step" \| "time" \| "true" \| undefined`               | `undefined` |
| `_customClass`        | `_custom-class`       | Defines the custom class attribute if \_variant="custom" is set.                                                                                             | `string \| undefined`                                                                                | `undefined` |
| `_disabled`           | `_disabled`           | Makes the element not focusable and ignore all events.                                                                                                       | `boolean \| undefined`                                                                               | `false`     |
| `_download`           | `_download`           | Tells the browser that the link contains a file. Optionally sets the filename.                                                                               | `string \| undefined`                                                                                | `undefined` |
| `_hideLabel`          | `_hide-label`         | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                   | `boolean \| undefined`                                                                               | `false`     |
| `_href` _(required)_  | `_href`               | Defines the target URI of the link.                                                                                                                          | `string`                                                                                             | `undefined` |
| `_icons`              | `_icons`              | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                              | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined`                               | `undefined` |
| `_label` _(required)_ | `_label`              | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot. | `string`                                                                                             | `undefined` |
| `_on`                 | --                    | Defines the callback functions for links.                                                                                                                    | `undefined \| { onClick?: EventValueOrEventCallback<Event, string> \| undefined; }`                  | `undefined` |
| `_role`               | `_role`               | Defines the role of the components primary element.                                                                                                          | `"button" \| "link" \| "tab" \| undefined`                                                           | `undefined` |
| `_tabIndex`           | `_tab-index`          | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)             | `number \| undefined`                                                                                | `undefined` |
| `_target`             | `_target`             | Defines where to open the link.                                                                                                                              | `string \| undefined`                                                                                | `undefined` |
| `_tooltipAlign`       | `_tooltip-align`      | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                    | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                | `'right'`   |
| `_variant`            | `_variant`            | Defines which variant should be used for presentation.                                                                                                       | `"custom" \| "danger" \| "ghost" \| "normal" \| "primary" \| "secondary" \| "tertiary" \| undefined` | `'normal'`  |

---
