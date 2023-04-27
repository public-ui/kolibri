# Symbol

Die **Symbol**-Komponente ermöglicht das Rendern beliebiger Symbole mit steuerbarer Ausgabe durch den Screenreader.

## Konstruktion

### Code

```html
<kol-symbol _aria-label_="Slash" _symbol="/"></kol-symbol>
```

### Beispiel

<kol-symbol _aria-label_="Slash" _symbol="/"></kol-symbol>

## Verwendung

Das eigentliche Symbol, welches am Bildschirm ausgegeben wird, wird über die Property **`_symbol`** übergeben. Der zugehörige Text, den der Screenreader vorliest, wird über die Property **`_aria-label`** übergeben.

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

## Links und Referenzen

- https://www.deque.com/blog/dont-screen-readers-read-whats-screen-part-1-punctuation-typographic-symbols/

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute     | Description                                                   | Type     | Default     |
| ------------------------- | ------------- | ------------------------------------------------------------- | -------- | ----------- |
| `_ariaLabel` _(required)_ | `_aria-label` | Gibt an, was der Screenreader ausgeben soll                   | `string` | `undefined` |
| `_symbol` _(required)_    | `_symbol`     | Dieses Property gibt den String an der angezeigt werden soll. | `string` | `undefined` |


----------------------------------------------


