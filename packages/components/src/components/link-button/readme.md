# LinkButton

Der LinkButton ist semantisch ein Link und hat das Design eines Buttons. Hierzu werden alle relevanten Properties der Link-Komponente übernommen und um die Design-bestimmenden Properties des Buttons erweitert.
Weitere Informationen zum Aussehen finden Sie auf der <kol-link _href="/docs/components/button" _label="/docs/components/button" _label="Seite des Buttons"></kol-link>.

## Konstruktion

### Code

```html
<kol-link-button _href="#" _label="#" _label="Primary" _variant="primary"></kol-link-button>
<kol-link-button _href="#" _label="#" _label="Secondary" _variant="secondary"></kol-link-button>
<kol-link-button _href="#" _label="#" _label="Normal" _variant="normal"></kol-link-button>
<kol-link-button _href="#" _label="#" _label="Secondary" _variant="danger"></kol-link-button>
<kol-link-button _href="#" _label="#" _label="Ghost" _variant="ghost"></kol-link-button>
```

### Beispiel

<div class="flex gap-2">
  <kol-link-button _href="#" _label="#" _label="Primary" _variant="primary"></kol-link-button>
  <kol-link-button _href="#" _label="#" _label="Secondary" _variant="secondary"></kol-link-button>
  <kol-link-button _href="#" _label="#" _label="Normal" _variant="normal"></kol-link-button>
  <kol-link-button _href="#" _label="#" _label="Danger" _variant="danger"></kol-link-button>
  <kol-link-button _href="#" _label="#" _label="Ghost" _variant="ghost"></kol-link-button>
</div>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute              | Description                                                                                                                                                                                                                                                               | Type                                                                                                 | Default                             |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `_ariaControls`       | `_aria-controls`       | <span style="color:red">**[DEPRECATED]**</span> will be removed in v2<br/><br/>Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)                                                   | `string \| undefined`                                                                                | `undefined`                         |
| `_ariaCurrent`        | `_aria-current`        | <span style="color:red">**[DEPRECATED]**</span> use \_listen-aria-current instead<br/><br/>Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) | `"date" \| "location" \| "page" \| "step" \| "time" \| boolean \| undefined`                         | `undefined`                         |
| `_ariaExpanded`       | `_aria-expanded`       | <span style="color:red">**[DEPRECATED]**</span> will be removed in v2<br/><br/>Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)            | `boolean \| undefined`                                                                               | `undefined`                         |
| `_ariaLabel`          | `_aria-label`          | <span style="color:red">**[DEPRECATED]**</span> use \_label instead<br/><br/>Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).                                                                  | `string \| undefined`                                                                                | `undefined`                         |
| `_ariaSelected`       | `_aria-selected`       | <span style="color:red">**[DEPRECATED]**</span> will be removed in v2<br/><br/>Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)               | `boolean \| undefined`                                                                               | `undefined`                         |
| `_customClass`        | `_custom-class`        | Defines the custom class attribute.                                                                                                                                                                                                                                       | `string \| undefined`                                                                                | `undefined`                         |
| `_disabled`           | `_disabled`            | <span style="color:red">**[DEPRECATED]**</span> Ein Link kann nicht deaktiviert werden, nutzen Sie den Button-Link stattdessen.<br/><br/>Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.                                  | `boolean \| undefined`                                                                               | `false`                             |
| `_download`           | `_download`            | Tells the browser that the link contains a file. Optionally sets the filename.                                                                                                                                                                                            | `boolean \| string \| undefined`                                                                     | `false`                             |
| `_hideLabel`          | `_hide-label`          | Tells the label and shows it in a Tooltip instead. TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.                                                                                                                                    | `boolean \| undefined`                                                                               | `false`                             |
| `_href` _(required)_  | `_href`                | This property is used for a link from a reference to the target URL.                                                                                                                                                                                                      | `string`                                                                                             | `undefined`                         |
| `_icon`               | `_icon`                | Defines the icon classnames.                                                                                                                                                                                                                                              | `KoliBriHorizontalIcon & KoliBriVerticalIcon \| string \| undefined`                                 | `undefined`                         |
| `_iconOnly`           | `_icon-only`           | <span style="color:red">**[DEPRECATED]**</span> use \_hide-label<br/><br/>Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.                                                                                                       | `boolean \| undefined`                                                                               | `undefined`                         |
| `_label` _(required)_ | `_label`               | Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).                                                                                                                                               | `boolean \| string`                                                                                  | `undefined`                         |
| `_listenAriaCurrent`  | `_listen-aria-current` | Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.                                                                              | `"date" \| "location" \| "page" \| "step" \| "time" \| boolean \| undefined`                         | `undefined`                         |
| `_on`                 | --                     | <span style="color:red">**[DEPRECATED]**</span> <br/><br/>Gibt die EventCallback-Funktionen für den Link an.                                                                                                                                                              | `undefined \| { onClick?: EventValueOrEventCallback<Event, string> \| undefined; }`                  | `undefined`                         |
| `_role`               | `_role`                | Defines the role of the components primary element.                                                                                                                                                                                                                       | `"button" \| "link" \| "tab" \| undefined`                                                           | `undefined`                         |
| `_tabIndex`           | `_tab-index`           | Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                                                                                                      | `number \| undefined`                                                                                | `undefined`                         |
| `_target`             | `_target`              | Defines where to open the link.                                                                                                                                                                                                                                           | `string \| undefined`                                                                                | `undefined`                         |
| `_targetDescription`  | `_target-description`  | Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.                                                                                                                                                                                          | `string \| undefined`                                                                                | `translate('kol-open-link-in-tab')` |
| `_tooltipAlign`       | `_tooltip-align`       | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                                                                                                                                 | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                | `'right'`                           |
| `_variant`            | `_variant`             | Defines which variant should be used for presentation.                                                                                                                                                                                                                    | `"custom" \| "danger" \| "ghost" \| "normal" \| "primary" \| "secondary" \| "tertiary" \| undefined` | `'normal'`                          |

## Dependencies

### Depends on

- kol-link-wc

### Graph

```mermaid
graph TD;
  kol-link-button --> kol-link-wc
  kol-link-wc --> kol-span-wc
  kol-link-wc --> kol-icon
  kol-link-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  style kol-link-button fill:#f9f,stroke:#333,stroke-width:4px
```

---
