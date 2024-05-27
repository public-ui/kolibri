# Progress

Die **Progress**-Komponente erzeugt einen Fortschrittsbalken, über den eine optische Rückmeldung gegeben werden kann.

## Konstruktion

### Code

```html
<div>
	<kol-progress _label="Fortschritt" _variant="bar" _max="100" _value="20"></kol-progress>
	<kol-progress _label="Fortschritt" _variant="cycle" _max="100" _value="20"></kol-progress>
</div>
```

### Beispiel

<kol-progress _label="Fortschritt" _variant="bar" _max="100" _value="20"></kol-progress>
<kol-progress _label="Fortschritt" _variant="cycle" _max="100" _value="20"></kol-progress>

## Verwendung

Verwenden Sie das Attribut **`_variant`**, um die optische Ausgabe der Komponente zu steuern. Mögliche Werte sind:

- `bar`: für eine Ausgabe als horizontaler Fortschrittsbalken
- `cycle`: für eine Ausgabe als kreisförmiger Fortschrittsbalken

Verwenden Sie das Attribut **`_max`**, um den maximalen Wert der Komponente zu bestimmen, das Minimum ist immer 0.

Verwenden Sie das Attribut **`_value`**, um den aktuellen Wert der Komponente zu bestimmen.

<!--### Best practices

### Anwendungsfälle-->

<!-- ## Barrierefreiheit -->

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/de/docs/Web/HTML/Element/progress" _target="_blank"></kol-link>
- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute  | Description                                                                                                        | Type                            | Default     |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------- | ----------- |
| `_label`              | `_label`   | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string \| undefined`           | `undefined` |
| `_max` _(required)_   | `_max`     | Defines at which value the progress display is completed.                                                          | `number`                        | `undefined` |
| `_unit`               | `_unit`    | Defines the unit of the step values (not shown).                                                                   | `string \| undefined`           | `'%'`       |
| `_value` _(required)_ | `_value`   | Defines the progress.                                                                                              | `number`                        | `undefined` |
| `_variant`            | `_variant` | Defines which variant should be used for presentation.                                                             | `"bar" \| "cycle" \| undefined` | `undefined` |

---
