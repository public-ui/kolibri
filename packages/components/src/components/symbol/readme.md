# Symbol

Die **Symbol**-Komponente ermöglicht das Rendern beliebiger Symbole mit steuerbarer Ausgabe durch den Screenreader.

## Konstruktion

### Code

```html
<kol-symbol _label_="Slash" _symbol="/"></kol-symbol>
```

### Beispiel

<kol-symbol _label_="Slash" _symbol="/"></kol-symbol>

## Verwendung

Das eigentliche Symbol, welches am Bildschirm ausgegeben wird, wird über die Property **`_symbol`** übergeben. Der zugehörige Text, den der Screenreader vorliest, wird über das Attribut **`_label`** übergeben.

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

## Links und Referenzen

- https://www.deque.com/blog/dont-screen-readers-read-whats-screen-part-1-punctuation-typographic-symbols/

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute     | Description                                                                                                                                                                                      | Type                  | Default     |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `_ariaLabel`           | `_aria-label` | <span style="color:red">**[DEPRECATED]**</span> use \_label<br/><br/>Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.). | `string \| undefined` | `undefined` |
| `_label`               | `_label`      | Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).                                                                      | `string \| undefined` | `undefined` |
| `_symbol` _(required)_ | `_symbol`     | Dieses Property gibt den String an der angezeigt werden soll.                                                                                                                                    | `string`              | `undefined` |

---
