# Symbol

Die **Symbol**-Komponente ermöglicht das Rendern beliebiger Symbole mit steuerbarer Ausgabe durch den Screenreader.

## Konstruktion

### Code

```html
<kol-symbol _label="Slash" _symbol="/"></kol-symbol>
```

### Beispiel

<kol-symbol _label="Slash" _symbol="/"></kol-symbol>

## Verwendung

Das eigentliche Symbol, welches am Bildschirm ausgegeben wird, wird über die Property **`_symbol`** übergeben. Der zugehörige Text, den der Screenreader vorliest, wird über das Attribut **`_label`** übergeben.

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

## Links und Referenzen

- <kol-link _href="https://www.deque.com/blog/dont-screen-readers-read-whats-screen-part-1-punctuation-typographic-symbols/" _target="_blank"></kol-link>

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                                                                                     | Type     | Default     |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `_label` _(required)_  | `_label`  | Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.). | `string` | `undefined` |
| `_symbol` _(required)_ | `_symbol` | Dieses Property gibt den String an der angezeigt werden soll.                                                   | `string` | `undefined` |


----------------------------------------------


