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

| Property              | Attribute     | Description                                                                                                                                                         | Type                                                                 | Default     |
| --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| `_hideLabel`          | `_hide-label` | Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.                                                                           | `boolean \| undefined`                                               | `false`     |
| `_icon`               | `_icon`       | Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).                                                                                                         | `KoliBriHorizontalIcon & KoliBriVerticalIcon \| string \| undefined` | `undefined` |
| `_iconOnly`           | `_icon-only`  | <span style="color:red">**[DEPRECATED]**</span> use \_hide-label<br/><br/>Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an. | `boolean \| undefined`                                               | `undefined` |
| `_label` _(required)_ | `_label`      | Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).                                         | `boolean \| string`                                                  | `undefined` |

## Dependencies

### Depends on

- kol-span-wc

### Graph

```mermaid
graph TD;
  kol-span --> kol-span-wc
  kol-span-wc --> kol-icon
  style kol-span fill:#f9f,stroke:#333,stroke-width:4px
```

---
