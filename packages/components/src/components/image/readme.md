# Icon

Mit Hilfe der **Icon**-Komponente können Icons aus eingebundenen Icon-Fonts an beliebigen Positionen dargestellt werden. Die Ausgabe des Icon kann über das Attribut `_icon` gesteuert werden und erfolgt durch das Attribut `_aria-label` barrierefrei. Die Ausgabe erfolgt standardmäßig als _`inline`_-Element.

Folgende Icon-Fonts werden _`out-of-the-box`_ unterstützt.

- [Codicons]
- [Font-Awesome]
- [Icofont]

<kol-alert _heading="Hinweis" _type="info">Es ist wichtig, dass in der Rahmenseite (`index.html`) die CSS-Dateien der Icon-Fonts eingebunden sind.</kol-alert>

## Konstruktion

Die Komponente **Icon** wird über das HTML-Tag `kol-icon` erzeugt.

### Code

```html
<kol-icon _aria-label="Zu Hause" _icon="fa-solid fa-house"></kol-icon>
```

### Beispiel

<kol-icon _aria-label="Zu Hause" _icon="fa-solid fa-house"></kol-icon>

## Verwendung

### Best practices

## Barrierefreiheit

Wichtig ist bei Kontext-relevanten Grafiken, dass sie beschriftet werden.

- https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

### Aria-Hidden

Die Auszeichnung `aria-hidden` ist eigentlich nicht erforderlich, da die aktuellen Screenreader, wie NVDA und JAWS, es auch ohne `aria-hidden` nicht vorlesen.

### Aria-Label

Mittels der Auszeichnung `aria-label` muss ein Kontext-relevantes Icon beschriftet werden.

## Links und Referenzen

[Codicons]: https://github.com/microsoft/vscode-codicons
[Font-Awesome]: https://fontawesome.com
[Icofont]: https://icofont.com

<!-- Auto Generated Below -->

## Overview

API

## Properties

| Property            | Attribute  | Description                                               | Type                             | Default     |
| ------------------- | ---------- | --------------------------------------------------------- | -------------------------------- | ----------- |
| `_alt` _(required)_ | `_alt`     | Gibt den alternativen Text an.                            | `string`                         | `undefined` |
| `_loading`          | `_loading` | Gibt den Lademodus an.                                    | `"eager" \| "lazy" \| undefined` | `undefined` |
| `_src` _(required)_ | `_src`     | Gibt die Quell-URL an.                                    | `string`                         | `undefined` |
| `_srcset`           | `_srcset`  | Gibt eine Liste von Quell-URLs mit Breiten der Bilder an. | `string \| undefined`            | `undefined` |

---
