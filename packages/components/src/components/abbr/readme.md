# Abbr

Die **Abbr**-Komponente implementiert den HTML-Tag `abbr`, wobei hier jedoch der Tooltip barrierefrei ist.
Der Tooltip für die Beschreibung wird bei Focus oder Hover der **Abbr**-Komponente angezeigt und vorgelesen.

## Konstruktion

### Code

```html
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="top">Abbr</kol-abbr> mit Tooltip oben.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="right">Abbr</kol-abbr> mit Tooltip rechts.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="bottom">Abbr</kol-abbr> mit Tooltip unten.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="left">Abbr</kol-abbr> mit Tooltip links.</p>
```

### Beispiel

<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="top">Abbr</kol-abbr> mit Tooltip oben.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="right">Abbr</kol-abbr> mit Tooltip rechts.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="bottom">Abbr</kol-abbr> mit Tooltip unten.</p>
<p>Ich bin eine <kol-abbr _label="Abkürzung" _tooltip-align="left">Abbr</kol-abbr> mit Tooltip links.</p>

## Verwendung

### Angabe der Beschreibung zur Abkürzung

Der Begriff bzw. die Erklärung wird über das Attribut **`_label`** übergeben, die Abkürzung bzw. der erklärungswürdige Begriff kommt zwischen die Tags im HTML.

### Ausrichtung des Tooltip

Über das Attribut **`_tooltip-align`** wird die Positionierung des ToolTip, relativ zur Abkürzung, festgelegt.

## Barrierefreiheit

Die Abbr-Komponente wurde von KoliBri umgesetzt, weil der Standard-Tooltip nicht barrierefrei bzgl. der Skalierung ist.
Der KoliBri Tooltip kann von Screenreadern vorgelesen werden und verändert seine Größe beim Zoomen korrekt.

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/de/docs/Web/HTML/Element/abbr" _label="https://developer.mozilla.org/de/docs/Web/HTML/Element/abbr" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                                                                | Type                                                  | Default     |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| `_label`        | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).                                         | `string \| undefined`                                 | `undefined` |
| `_title`        | `_title`         | <span style="color:red">**[DEPRECATED]**</span> Use \_label.<br/><br/>Deprecated: Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an. | `string \| undefined`                                 | `undefined` |
| `_tooltipAlign` | `_tooltip-align` | Defines where to show the Tooltip preferably: top, right, bottom or left.                                                                                  | `"bottom" \| "left" \| "right" \| "top" \| undefined` | `'top'`     |

## Slots

| Slot | Description                             |
| ---- | --------------------------------------- |
|      | Der Begriff, der erläutert werden soll. |

---
