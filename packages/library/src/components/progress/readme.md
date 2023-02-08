# Progress

Die **Progress**-Komponente erzeugt einen Fortschrittsbalken, über den eine optische Rückmeldung gegeben werden kann.

## Konstruktion

### Code

```html
<div>
	<kol-progress _type="bar" _max="100" _value="20"></kol-progress>
</div>
```

### Beispiel

<kol-progress _type="bar" _max="100" _value="20"></kol-progress>

## Verwendung

Verwenden Sie das Attribut `_type`, um die optische Ausgabe der Komponente zu steuern. Mögliche Werte sind:

- **bar** für eine Ausgabe als horizontaler Fortschrittsbalken
- **cycle** für eine Ausgabe als kreisförmiger Fortschrittsbalken

Verwenden Sie das Attribut `_max`, um den maximalen Wert der Komponente zu bestimmen.

Verwenden Sie das Attribut `_value`, um den aktuellen Wert der Komponente zu bestimmen.

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

## Links und Referenzen

- https://developer.mozilla.org/de/docs/Web/HTML/Element/progress
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                          | Type                            | Default     |
| --------------------- | --------- | -------------------------------------------------------------------- | ------------------------------- | ----------- |
| `_max` _(required)_   | `_max`    | Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist. | `number`                        | `undefined` |
| `_type`               | `_type`   | Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.      | `"bar" \| "cycle" \| undefined` | `undefined` |
| `_unit`               | `_unit`   | Gibt die Einheit der Fortschrittswerte an.                           | `string \| undefined`           | `'%'`       |
| `_value` _(required)_ | `_value`  | Gibt an, wie weit die Anzeige fortgeschritten ist.                   | `number`                        | `undefined` |

## CSS Custom Properties

| Name                        | Description                     |
| --------------------------- | ------------------------------- |
| `--kolibri-border-color`    | Default color of the border.    |
| `--kolibri-border-radius`   | Default radius of the border.   |
| `--kolibri-border-width`    | Default width of the border.    |
| `--kolibri-color-danger`    | Default color of the danger.    |
| `--kolibri-color-disabled`  | Default color of the disabled.  |
| `--kolibri-color-error`     | Default color of the error.     |
| `--kolibri-color-ghost`     | Default color of the ghost.     |
| `--kolibri-color-info`      | Default color of the info.      |
| `--kolibri-color-normal`    | Default color of the normal.    |
| `--kolibri-color-primary`   | Default color of the primary.   |
| `--kolibri-color-secondary` | Default color of the secondary. |
| `--kolibri-color-success`   | Default color of the success.   |
| `--kolibri-color-warning`   | Default color of the warning.   |

---
