# Logo

Diese Komponente implementiert das Logo von KoliBri.

## Konstruktion

### Code

```html
<kol-kolibri />
<kol-kolibri _animate />
<kol-kolibri _animate _labeled="false" />
<kol-kolibri _labeled="false" />
```

## Beispiele

<kol-kolibri />
<kol-kolibri _animate />
<kol-kolibri _animate _labeled="false" /> 
<kol-kolibri _labeled="false" />

## Barrierefreiheit

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                              | Type                                                                                                                                                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_animate` | `_animate` | Gibt an, ob das Bild-Logo farblich animiert werden soll.                 | `boolean \| undefined`                                                                                                                                   | `false`     |
| `_color`   | `_color`   | Gibt an, in welcher Farbe das Bild-Logo initial dargestellt werden soll. | `string \| undefined \| { backgroundColor: string; color: string; } \| { backgroundColor: string; foregroundColor: Stringified<CharacteristicColors>; }` | `'#003c78'` |
| `_labeled` | `_labeled` | Defines whether the component has a label.                               | `boolean \| undefined`                                                                                                                                   | `undefined` |

---
