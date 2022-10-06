# InputRange

Der Input-Typ **Range** erzeugt ein interaktives Element, mit dem Werte durch Verschieben eines Reglers verändert werden können.

## Konstruktion

### Code

```tsx
<kol-input-range _id="meine_range" _name="meine_range" _min={100} _max={200} _step={10}>
	Wertebereich
</kol-input-range>
```

### Beispiel

<kol-input-range _id="meine_range" _name="meine_range" _min={100} _max={200} _step={10}>
  Wertebereich
</kol-input-range>

## Verwendung

### Best practices

- Achten sie darauf, die Pflichtfelder `id` und `name` korrekt zu setzen.

## Barrierefreiheit

### Tastatursteuerung

| Taste          | Funktion                                 |
| -------------- | ---------------------------------------- |
| `Tab`          | Fokussiert das Eingabefeld.              |
| `Pfeil-Tasten` | Verändern den Wert der Range-Komponente. |

## Links und Referenzen

- https://medium.com/@gavyn/til-autofocus-inputs-are-an-accessibility-problem-32ced60c3109
- https://www.jotform.com/blog/html5-datalists-what-you-need-to-know-78024/

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute        | Description                                                                          | Type                                                                                                                                                                                                          | Default     |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`       | `_access-key`    | Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann. | `string \| undefined`                                                                                                                                                                                         | `undefined` |
| `_alert`           | `_alert`         | Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.             | `boolean \| undefined`                                                                                                                                                                                        | `false`     |
| `_autoComplete`    | `_auto-complete` | Gibt an, ob das Eingabefeld autovervollständigt werden kann.                         | `"off" \| "on" \| undefined`                                                                                                                                                                                  | `undefined` |
| `_disabled`        | `_disabled`      | Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.                          | `boolean \| undefined`                                                                                                                                                                                        | `undefined` |
| `_error`           | `_error`         | Gibt den Text für eine Fehlermeldung an.                                             | `string \| undefined`                                                                                                                                                                                         | `undefined` |
| `_hideLabel`       | `_hide-label`    | Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.                        | `boolean \| undefined`                                                                                                                                                                                        | `undefined` |
| `_hint`            | `_hint`          | Gibt den Text für eine Hinweistext an.                                               | `string \| undefined`                                                                                                                                                                                         | `''`        |
| `_icon`            | `_icon`          | Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.   | `string \| undefined \| { right: string \| KoliBriCustomIcon; left?: string \| KoliBriCustomIcon \| undefined; } \| { right?: string \| KoliBriCustomIcon \| undefined; left: string \| KoliBriCustomIcon; }` | `undefined` |
| `_id` _(required)_ | `_id`            | Gibt die technische ID des Eingabefeldes an.                                         | `string`                                                                                                                                                                                                      | `undefined` |
| `_list`            | `_list`          | Gibt die Liste der Vorschlagswörter an.                                              | `Option<number>[] \| string \| undefined`                                                                                                                                                                     | `undefined` |
| `_max`             | `_max`           | Gibt den Maximalwert des Eingabefeldes an.                                           | `number \| undefined`                                                                                                                                                                                         | `undefined` |
| `_min`             | `_min`           | Gibt den Minimalwert des Eingabefeldes an.                                           | `number \| undefined`                                                                                                                                                                                         | `undefined` |
| `_name`            | `_name`          | Gibt den technischen Namen des Eingabefeldes an.                                     | `string \| undefined`                                                                                                                                                                                         | `undefined` |
| `_on`              | --               | Gibt die EventCallback-Funktionen für das Input-Event an.                            | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus \| undefined`                                                                                                                      | `undefined` |
| `_step`            | `_step`          | Gibt die Schrittweite der Wertveränderung an.                                        | `number \| undefined`                                                                                                                                                                                         | `undefined` |
| `_tabIndex`        | `_tab-index`     | Gibt an, welchen Tab-Index dieses Input hat.                                         | `number \| undefined`                                                                                                                                                                                         | `undefined` |
| `_touched`         | `_touched`       | Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.        | `boolean \| undefined`                                                                                                                                                                                        | `false`     |
| `_value`           | `_value`         | Gibt den Wert des Eingabefeldes an.                                                  | `number \| undefined`                                                                                                                                                                                         | `undefined` |

## Dependencies

### Depends on

- kol-input

### Graph

```mermaid
graph TD;
  kol-input-range --> kol-input
  kol-input --> kol-icon
  kol-input --> kol-button-wc
  kol-input --> kol-alert
  kol-button-wc --> kol-icon
  kol-button-wc --> kol-tooltip
  kol-tooltip --> kol-badge
  kol-badge --> kol-icon-icofont
  kol-icon-icofont --> kol-icon
  kol-alert --> kol-heading-wc
  kol-alert --> kol-button-wc
  kol-alert --> kol-icon
  style kol-input-range fill:#f9f,stroke:#333,stroke-width:4px
```

---
