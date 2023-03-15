# Image
Image dient dazu, Bilder auf Webseiten darzustellen ohne d

## Code

```html
<kol-image _src="url-zum-bild.jpg" _alt="Beschreibung des Bildes"></kol-image>
<kol-image _src="nur-dekoratives-bild.jpg" _alt=""></kol-image>
<kol-image _src="hintergrundbild-der-hero-sektion.jpg" _alt="" _loading="eager"></kol-image>
```

## Attribute
### _alt
Dieses Attribut ist verpflichtend, kann jedoch bei rein dekorativen Bildern leer gelassen werden.
Diese Beschreibung wird von Screenreadern vorgelesen und von Browsern angezeigt, wenn das Bild nicht geladen werden kann/soll.

### _loading
Dieses Attribut ist optional. Gesetzt werden kann hier entweder `eager` oder `lazy`, sofern ungesetzt wird `lazy` verwendet.
`eager` sorgt für ein Laden des Bildes direkt beim Betreten der Seite, bei `lazy` lädt der Browser das Bild erst, kurz bevor es sichtbar wird. In der Regel muss `eager` nicht gesetzt werden, setzen Sie es nur sofern Ladeverzögerungen auftreten, oder das Bild sich sicher im, bei Betreten der Seite, sichtbaren Bereich befindet. (z.B.: Logo im Header oder Hero)

<!-- Auto Generated Below -->

## Overview

Image component

## Properties

| Property            | Attribute  | Description                                               | Type                             | Default     |
| ------------------- | ---------- | --------------------------------------------------------- | -------------------------------- | ----------- |
| `_alt` _(required)_ | `_alt`     | Gibt den alternativen Text an.                            | `string`                         | `undefined` |
| `_loading`          | `_loading` | Gibt den Lademodus an.                                    | `"eager" \| "lazy" \| undefined` | `undefined` |
| `_src` _(required)_ | `_src`     | Gibt die Quell-URL an.                                    | `string`                         | `undefined` |
| `_srcset`           | `_srcset`  | Gibt eine Liste von Quell-URLs mit Breiten der Bilder an. | `string \| undefined`            | `undefined` |

---
