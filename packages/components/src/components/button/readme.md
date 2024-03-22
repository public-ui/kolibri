# Button

**Buttons** dienen dazu, Benutzer:innen Auswahlmöglichkeiten für Aktionen anzuzeigen und diese in einer klaren Hierarchie anzuordnen. Sie helfen Nutzer:innen, die wichtigsten Aktionen einer Seite oder innerhalb eines Viewports zu finden und ermöglichen es ihnen, diese Aktionen auszuführen. Die Beschriftung des Buttons wird verwendet, um Nutzer:innen klar anzuzeigen, welche Aktion ausgelöst wird. Buttons ermöglichen es Nutzer:innen, eine Änderung zu bestätigen, Schritte in einer Aufgabe abzuschließen oder Entscheidungen zu treffen.

## Konstruktion

### Code

```html
<kol-button _label="Primary" _variant="primary"></kol-button>
<kol-button _label="Secondary" _variant="secondary"></kol-button>
<kol-button _label="Normal" _variant="normal"></kol-button>
<kol-button _label="Danger" _variant="danger"></kol-button>
<kol-button _label="Ghost" _variant="ghost"></kol-button>
```

### Beispiel

Default

<div class="flex flex-wrap gap-2">
  <kol-button _label="Primary" _variant="primary"></kol-button>
  <kol-button _label="Secondary" _variant="secondary"></kol-button>
  <kol-button _label="Normal" _variant="normal"></kol-button>
  <kol-button _label="Danger" _variant="danger"></kol-button>
  <kol-button _label="Ghost" _variant="ghost"></kol-button>
</div>

Disabled

<div class="flex flex-wrap gap-2">
  <kol-button _label="Primary" _variant="primary" _disabled></kol-button>
  <kol-button _label="Secondary" _variant="secondary" _disabled></kol-button>
  <kol-button _label="Normal" _variant="normal" _disabled></kol-button>
  <kol-button _label="Danger" _variant="danger" _disabled></kol-button>
  <kol-button _label="Ghost" _variant="ghost" _disabled></kol-button>
</div>

## Verwendung

### Beschriftung

Für die eindeutige Beschriftung des Buttons nutzen Sie das Attribut **`_label`**.
`_label="Schaltflächenbeschriftung"`

### Icons

Icons (**`_icons`**) kann entweder als String angegeben werden, oder als Objekt.
Als String übergeben Sie die Iconklasse (z.B.: `_icons="codicon codicon-home`), das Icon wird links vom Text angezeigt.
Das Objekt ist vom Typ `KoliBriAllIcon`, kann also einen oder mehrere der Schlüssel `top`, `right`, `bottom` und `left` besitzen. Diese sind dann entweder String (siehe oben) oder ein Objekt vom Typ `KoliBriCustomIcon`, welches aus `icon` (String, siehe oben) und `style` (optional, Styleobjekt) besteht.

<kol-link _href="https://microsoft.github.io/vscode-codicons/dist/codicon.html" _target="_blank" _label="Übersicht Codicons"></kol-link>

### Schaltfläche ohne Text

Mittels **`_hide-label`** wird die Schaltfläche nur das icon anzeigen (<kol-link _href="#icon" _label="siehe icon"></kol-link>)

<kol-alert _type="info">Beachten Sie, dass das Attribut **`_label`** auch dann gesetzt werden muss, wenn nur ein Icon angezeigt werden soll, dieses wird von Screenreadern vorgelesen und in den Tooltip gesetzt.</kol-alert>

### Darstellung angeben

Zur Steuerung der Darstellung verwenden Sie das Attribut **`_variant`**. Der Standardwert ist `primary`, alternativ kann auch `primary`, `secondary`, `normal`, `danger`, `ghost`, oder `custom` gesetzt werden.<br/>

Über die Verwendung des Wertes `custom` kann eine eigene Darstellung gewählt werden. Verpflichtend ist in diesem Fall das Setzen des Attribut **`_custom-class`**, damit die Schaltfläche im Shadow-Dom mittels CSS selektiert werden kann.

### Best practices

- Verwenden Sie eine primäre Schaltfläche für die nächstbeste Aktion. Verbleibende Calls-to-Action sollten als sekundäre Schaltfläche dargestellt werden.
- Verwenden Sie Schaltflächen an einheitlichen Stellen in der Benutzeroberfläche, um die Benutzererfahrung zu verbessern.
- Verwenden Sie nur eine primäre Schaltfläche je Viewport. Auf der gesamten Seite kann ein Button-Style beliebig oft auftreten.
- Die Beschriftung des Button muss die Aktion beschreiben, die die Schaltfläche ausführt. Sie sollte ein Verb enthalten (z.B. Speichern). Verwenden Sie prägnante, spezifische, selbsterklärende Beschriftungen.
- Schaltflächenbeschriftungen sollten immer dann auch ein Nomen enthalten, wenn es Raum für Interpretationen darüber gibt, wofür das Verb zuständig ist. Verwenden Sie keine generischen Bezeichnungen wie "OK", insbesondere nicht im Fehlerfall. Fehler sind nie "OK".
- Verwenden Sie nicht mehrere Buttons im Style "primär" innerhalb einer Gruppierung.
- Verwenden Sie Buttons nicht als Link oder als Navigationselement.

## Barrierefreiheit

Für Menschen mit einem eingeschränkten Sichtfeld ist die Positionierung des **Icons** im Button links von der Beschriftung optimal.

Probleme mit Disabled-Status

- Darstellung Kontraste
- Möglichkeit des Nutzerfeedbacks

### Tastatursteuerung

| Taste   | Funktion                                                     |
| ------- | ------------------------------------------------------------ |
| `Tab`   | Springt den einzelnen Button an und fokussiert ihn.          |
| `Enter` | Führt die onClick-Methode der fokussierten Schaltfläche aus. |

## Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#button" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute        | Description                                                                                                                                                                      | Type                                                                                                                                                   | Default     |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `_accessKey`          | `_access-key`    | Defines the elements access key.                                                                                                                                                 | `string \| undefined`                                                                                                                                  | `undefined` |
| `_ariaControls`       | `_aria-controls` | Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)                              | `string \| undefined`                                                                                                                                  | `undefined` |
| `_ariaExpanded`       | `_aria-expanded` | Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)          | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_ariaSelected`       | `_aria-selected` | Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) | `boolean \| undefined`                                                                                                                                 | `undefined` |
| `_customClass`        | `_custom-class`  | Defines the custom class attribute if \_variant="custom" is set.                                                                                                                 | `string \| undefined`                                                                                                                                  | `undefined` |
| `_disabled`           | `_disabled`      | Makes the element not focusable and ignore all events.                                                                                                                           | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_hideLabel`          | `_hide-label`    | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                                       | `boolean \| undefined`                                                                                                                                 | `false`     |
| `_icons`              | `_icons`         | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                                                  | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined`                                                                                 | `undefined` |
| `_id`                 | `_id`            | Defines the internal ID of the primary component element.                                                                                                                        | `string \| undefined`                                                                                                                                  | `undefined` |
| `_label` _(required)_ | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.                     | `string`                                                                                                                                               | `undefined` |
| `_name`               | `_name`          | Defines the technical name of an input field.                                                                                                                                    | `string \| undefined`                                                                                                                                  | `undefined` |
| `_on`                 | --               | Defines the callback functions for button events.                                                                                                                                | `undefined \| { onClick?: EventValueOrEventCallback<MouseEvent, StencilUnknown> \| undefined; onMouseDown?: EventCallback<MouseEvent> \| undefined; }` | `undefined` |
| `_role`               | `_role`          | Defines the role of the components primary element.                                                                                                                              | `"button" \| "link" \| "tab" \| undefined`                                                                                                             | `undefined` |
| `_tabIndex`           | `_tab-index`     | Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)                                 | `number \| undefined`                                                                                                                                  | `undefined` |
| `_tooltipAlign`       | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                                        | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                  | `'top'`     |
| `_type`               | `_type`          | Defines either the type of the component or of the components interactive element.                                                                                               | `"button" \| "reset" \| "submit" \| undefined`                                                                                                         | `'button'`  |
| `_value`              | `_value`         | Defines the value that the button emits on click.                                                                                                                                | `boolean \| null \| number \| object \| string \| undefined`                                                                                           | `undefined` |
| `_variant`            | `_variant`       | Defines which variant should be used for presentation.                                                                                                                           | `"custom" \| "danger" \| "ghost" \| "normal" \| "primary" \| "secondary" \| "tertiary" \| undefined`                                                   | `'normal'`  |

## Methods

### `getValue() => Promise<Stringified<StencilUnknown> | undefined>`

#### Returns

Type: `Promise<Stringified<StencilUnknown>>`

---
