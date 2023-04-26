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

Verwenden Sie das Attribut **`_type`**, um die optische Ausgabe der Komponente zu steuern. Mögliche Werte sind:

- `bar`: für eine Ausgabe als horizontaler Fortschrittsbalken
- `cycle`: für eine Ausgabe als kreisförmiger Fortschrittsbalken

Verwenden Sie das Attribut **`_max`**, um den maximalen Wert der Komponente zu bestimmen, das Minimum ist immer 0.

Verwenden Sie das Attribut **`_value`**, um den aktuellen Wert der Komponente zu bestimmen.

<!--### Best practices

### Anwendungsfälle-->

<!-- ## Barrierefreiheit -->

## Links und Referenzen

- https://developer.mozilla.org/de/docs/Web/HTML/Element/progress
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                          | Type                            | Default     |
| --------------------- | --------- | -------------------------------------------------------------------- | ------------------------------- | ----------- |
| `_max` _(required)_   | `_max`    | Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist. | `number`                        | `undefined` |
| `_type`               | `_type`   | Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.      | `"bar" \| "cycle" \| undefined` | `undefined` |
| `_unit`               | `_unit`   | Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)      | `string \| undefined`           | `'%'`       |
| `_value` _(required)_ | `_value`  | Gibt an, wie weit die Anzeige fortgeschritten ist.                   | `number`                        | `undefined` |

---
