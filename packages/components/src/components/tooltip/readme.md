# Tooltip

<kol-alert _type="info" _variant="card">Die **Tooltip**-Komponente wird innerhalb von KoliBri verwendet und ist nicht dafür vorgesehen in der Anwendungsentwicklung verwendet zu werden. Denn der Tooltip ist nur dann wirklich barrierefrei, wenn von einem Referenzelement auf das Tooltip verwiesen wird.</kol-alert>

Die **Tooltip**-Komponente implementiert das Gegenstück zum `Aria-Label`. Es ist also explizit nur dafür vorgesehen, dem/der Nutzer:in ohne Screenreader die Beschriftung eines Elementes anzuzeigen.

Ein geöffneter Tooltip lässt sich mit der `Escape`-Taste schließen, um ggf. überlagerte Seiteninformationen wieder sichtbar zu machen.

**Hinweis:** Damit der Tooltip korrekt ausgerichtet wird, darf das Referenz-Element nicht `display: inline` haben.

## Barrierefreiheit

Die Tooltip-Komponente wird bei Fokus oder bei Bewegen der Maus über dem Referenzelement angezeigt und dient ausschließlich dem/der sehenden Nutzer:in ohne Screenreader die Beschriftung (Aria-Label) lesen zu können. Der Text des Tooltips ist selbst nicht mit der Tastatur erreichbar und zudem mittels Aria-Hidden für die Screenreader versteckt.

<kol-alert _type="info">
Aus Sicht des Barrierefreiheitstests können Tooltips ignoriert werden, solange zudem von der Entwicklung sichergestellt wurde, dass der Tooltip-Text auch in gleicher Weise vom Screenreader vorgelesen wird.
</kol-alert>

## Breite

Die Breite des Tooltips richtet sich normalerweise nach ihrem Inhalt.
Um die Breite eines Tooltips zu konfigurieren, kann auf dem umgebenden Container eine [CSS-Custom-Property](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) wie folgt definiert werden:

```css
.container {
  --kol-tooltip-width': '40rem';
}
```

## Links und Referenzen

- <kol-link _href="https://tollwerk.de/projekte/tipps-techniken-inklusiv-barrierefrei/titel-tooltips-toggletips" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute     | Description                                                                                                        | Type                                                  | Default     |
| --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------- |
| `_accessKey`          | `_access-key` | Defines the elements access key.                                                                                   | `string \| undefined`                                 | `undefined` |
| `_align`              | `_align`      | Defines the alignment of the tooltip, popover or tabs in relation to the element.                                  | `"bottom" \| "left" \| "right" \| "top" \| undefined` | `'top'`     |
| `_id`                 | `_id`         | Defines the internal ID of the primary component element.                                                          | `string \| undefined`                                 | `undefined` |
| `_label` _(required)_ | `_label`      | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                              | `undefined` |

---
