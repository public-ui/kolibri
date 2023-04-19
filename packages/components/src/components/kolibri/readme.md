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

<div style="display: flex; justify-content: flex-start">
  <kol-kolibri />
  <kol-kolibri _animate />
  <kol-kolibri _animate _labeled="false" /> 
  <kol-kolibri _labeled="false" />
</div>

## Barrierefreiheit

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                              | Type                                                                                                                                                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_animate` | `_animate` | Gibt an, ob das Bild-Logo farblich animiert werden soll.                 | `boolean \| undefined`                                                                                                                                   | `undefined` |
| `_color`   | `_color`   | Gibt an, in welcher Farbe das Bild-Logo initial dargestellt werden soll. | `string \| undefined \| { backgroundColor: string; color: string; } \| { backgroundColor: string; foregroundColor: Stringified<CharacteristicColors>; }` | `'#003c78'` |
| `_labeled` | `_labeled` | Gibt an, ob die Logo-Beschriftung angezeigt werden soll.                 | `boolean \| undefined`                                                                                                                                   | `undefined` |


----------------------------------------------


