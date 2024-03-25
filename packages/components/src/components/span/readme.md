# Span

<kol-alert _type="warning">Die **Span**-Komponente wird innerhalb von KoliBri verwendet und ist nicht dafür vorgesehen in der Anwendungsentwicklung direkt verwendet zu werden. Denn der Span ist nur dann wirklich barrierefrei, wenn es in Kombination mit dem Tooltip verwendet wird.</kol-alert>

Die **Span**-Komponente dient dazu innerhalb zahlreicher KoliBri-Komponenten die Text-Icon-Kombination und das Expert-Slot-Konzept einheitlich umzusetzen.

## Konstruktion

### Code

```html
<kol-span _icon="codicon codicon-home" _label="Text inside the span."></kol-span>
```

### Beispiel

<kol-span _icon="codicon codicon-home" _label="Text inside the span."></kol-span>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute     | Description                                                                                                                                                  | Type                                                                   | Default     |
| --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ----------- |
| `_hideLabel`          | `_hide-label` | Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.                   | `boolean \| undefined`                                                 | `false`     |
| `_icon`               | `_icon`       | <span style="color:red">**[DEPRECATED]**</span> Use \_icons.<br/><br/>                                                                                       | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined` | `undefined` |
| `_iconOnly`           | `_icon-only`  | <span style="color:red">**[DEPRECATED]**</span> use \_hide-label<br/><br/>Deprecated: Hides the label and shows the description in a Tooltip instead.        | `boolean \| undefined`                                                 | `undefined` |
| `_icons`              | `_icons`      | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                                                              | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined` | `undefined` |
| `_label` _(required)_ | `_label`      | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot. | `string`                                                               | `undefined` |

---
