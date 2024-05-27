# Image

> <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Image**-Komponente dient dazu, Bilder darzustellen.

## Konstruktion

Die Komponente **Image** wird über das HTML-Tag `<kol-image>` erzeugt.

### Code

```html
<kol-image _src="url-zum-bild.jpg" _alt="Beschreibung des Bildes"></kol-image>
<kol-image _src="nur-dekoratives-bild.jpg" _alt=""></kol-image>
<kol-image _src="hintergrundbild-der-hero-sektion.jpg" _alt="" _loading="eager"></kol-image>
```

### Beispiele

<kol-image _src="https://placehold.co/100x100/cc006e/white" _alt="Beispielbild: 100 × 100"></kol-image>

## Verwendung

### Bilder in unterschiedlicher Auflösung und/oder Seitenverhältnis

Mittels **`_srcset`** (und **`_sizes`**) können unterschiedliche Bilder für unterschiedliche Auflösungen und Pixeldichten (des Displays) hinterlegt werden, um auf großen Bildschirmen scharfe Bilder zu liefern und auf kleinen Monitoren nicht unnötig Bandbreite zu verbrauchen.
Des Weiteren können mittels **`_srcset`** auch verschiedene Dateiformate angegeben werden, um für moderne Browser Bandbreite zu sparen, allerdings ältere Geräte weiterhin zu unterstützen.
Auch bei Verwendung von **`_srcset`** sollte **`_src`** genutzt werden, da dies von den Browsern als letzte Option verwendet wird, sofern a) **`srcset`** nicht unterstützt wird, oder b) dort kein passendes Bild gefunden wurde.
<kol-link _href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset" _target="_blank" _label="MDN Artikel zu srcset"></kol-link>
<kol-link _href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes" _target="_blank" _label="MDN Artikel zu sizes"></kol-link>
Für weitere Infos zu **`_srcset`** siehe [Links und Referenzen](#links-und-referenzen)

### Ladeverhalten

Das Attribut **`_loading`** ist optional. Gesetzt werden kann hier entweder `eager` oder `lazy`, sofern ungesetzt wird `lazy` verwendet.
`eager` sorgt für ein Laden des Bildes direkt beim Betreten der Seite, bei `lazy` lädt der Browser das Bild erst, kurz bevor es sichtbar wird. In der Regel muss `eager` nicht gesetzt werden, setzen Sie es nur sofern Ladeverzögerungen auftreten, oder das Bild sich sicher im, bei Betreten der Seite, sichtbaren Bereich befindet. (z.B.: Logo im Header oder Hero)
<kol-link _href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading" _target="_blank" _label="MDN Artikel zu loading"></kol-link>

## Barrierefreiheit

### Alternativtext

Das Attribut **`_alt`** ist verpflichtend, kann jedoch bei rein dekorativen Bildern leer (`_alt=""`) gelassen werden.
Diese Beschreibung wird von Screenreadern vorgelesen und von Browsern angezeigt, wenn das Bild nicht geladen werden kann/soll.

## Links und Referenzen

Ausführliche Erklärung zu `_srcset` und `_sizes`: <kol-link _href="https://www.mediaevent.de/html/srcset.html" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute  | Description                                                                    | Type                             | Default     |
| ------------------- | ---------- | ------------------------------------------------------------------------------ | -------------------------------- | ----------- |
| `_alt` _(required)_ | `_alt`     | Setzt den alternativen Text.                                                   | `string`                         | `undefined` |
| `_loading`          | `_loading` | Defines the loading mode for the image.                                        | `"eager" \| "lazy" \| undefined` | `'lazy'`    |
| `_sizes`            | `_sizes`   | Defines the image sizes for different screen resolutions, supporting \_srcset. | `string \| undefined`            | `undefined` |
| `_src` _(required)_ | `_src`     | Sets the image `src` attribute to the given string.                            | `string`                         | `undefined` |
| `_srcset`           | `_srcset`  | Setzt eine Liste von Quell-URLs mit Breiten der Bilder.                        | `string \| undefined`            | `undefined` |

---
