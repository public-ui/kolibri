# Checkbox

Der Input-Typ **_Checkbox_** generiert eine rechteckige Box, die durch Anklicken aktiviert und wieder deaktiviert wird. In aktiviertem Zustand befindet sich ein farbiger Haken in der Box.

## Konstruktion

### Code

```html
<kol-input-checkbox _id="checkbox">Ich stimme der <kol-link _href="#" _label="Datenschutzerklärung" _target="document"></kol-link> zu.</kol-input-checkbox>
<kol-input-checkbox _id="switch" _variant="switch">Geburtsdatum anzeigen?</kol-input-checkbox>
<kol-input-checkbox _checked _id="button" _variant="button">Schalter aktiviert</kol-input-checkbox>
<kol-input-checkbox _id="button" _variant="button">Schalter deaktiviert</kol-input-checkbox>
```

### Beispiel

<kol-input-checkbox _id="checkbox">Ich stimme der <kol-link _href="#" _label="Datenschutzerklärung" _target="document"></kol-link> zu.</kol-input-checkbox>
<kol-input-checkbox _id="switch" _variant="switch">Geburtsdatum anzeigen?</kol-input-checkbox>
<kol-input-checkbox _checked _id="button" _variant="button">Schalter aktiviert</kol-input-checkbox>
<kol-input-checkbox _id="button" _variant="button">Schalter deaktiviert</kol-input-checkbox>

## Verwendung

Checkboxen werden als Einzelelement oder als Liste beliebig vieler Checkboxen verwendet. Sie ermöglichen den Nutzer:innen, aus einer vordefinierten Anzahl von Möglichkeiten eine oder mehrere auszuwählen.

### Varianten

Mittels des Attributs **`_variant`** können folgende Varianten ausgewählt werden (Beispiele siehe oben):

- `button`: wechselt das Icon je nach Zustand (Beispiel 3+4)
- `switch`: verwandelt die Checkbox in einen horizontalen Schalter, hierbei gilt rechts als aktiv und links als inaktiv. (Beispiel 2)

### Best practices

- Verwenden Sie eine einzelne Checkbox, wenn Sie von den Nutzer:innen eine einfach Bestätigung wünschen, z.B. Akzeptieren der Datenschutzerklärung.
- Verwenden Sie eine Gruppe von Checkboxen, um den Nutzer:innen die Möglichkeit zu geben einen oder mehrere Werte auszuwählen.

## Barrierefreiheit

Vermeiden Sie die Verwendung von vielen Checkboxen auf einer Seite, da Ihre Inhalte hierdurch schnell unübersichtlich und lang werden. Prüfen Sie in solchen Anwendungsfällen die Verwendung einer <kol-link _href="/docs/components/select">Select-Box mit **`_multiple`**</kol-link>.

Achten Sie darauf, jeder Checkbox ein Label zuzuweisen, da dieses von Screenreadern vorgelesen wird und so eine eindeutige Identifikation des Eingabefeldes ermöglicht.

### Tastatursteuerung

| Taste  | Funktion                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| `Tab`  | Fokussiert die Checkbox bzw. ermöglicht den Wechsel zwischen Checkboxen einer Liste.                               |
| `Leer` | Aktiviert bzw. deaktiviert die Checkbox. Der Zustand **_Indeterminate_** ist über die Tastatur nicht herzustellen. |

## Links und Referenzen

- https://www.w3.org/TR/wai-aria-practices/#checkbox
- https://medium.com/@gavyn/til-autofocus-inputs-are-an-accessibility-problem-32ced60c3109

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute        | Description                                                                                                                                        | Type                                                                                                                                                                                                                                                                                                          | Default     |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`     | `_access-key`    | Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.                                                               | `string \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_alert`         | `_alert`         | Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.                                                                           | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `true`      |
| `_checked`       | `_checked`       | Gibt an, ob die Checkbox ausgewählt ist oder nicht. (kann gelesen und gesetzt werden)                                                              | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `false`     |
| `_disabled`      | `_disabled`      | Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.                                                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `undefined` |
| `_error`         | `_error`         | Gibt den Text für eine Fehlermeldung an.                                                                                                           | `string \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_hideLabel`     | `_hide-label`    | Versteckt das sichtbare Label des Elements.                                                                                                        | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `undefined` |
| `_hint`          | `_hint`          | Gibt den Hinweistext an.                                                                                                                           | `string \| undefined`                                                                                                                                                                                                                                                                                         | `''`        |
| `_icon`          | `_icon`          | Ermöglicht das Überschreiben der Icons für die Checkbox.                                                                                           | `string \| undefined \| { checked: string; indeterminate?: string \| undefined; unchecked?: string \| undefined; } & { checked?: string \| undefined; indeterminate: string; unchecked?: string \| undefined; } & { checked?: string \| undefined; indeterminate?: string \| undefined; unchecked: string; }` | `undefined` |
| `_id`            | `_id`            | Gibt die technische ID des Eingabefeldes an.                                                                                                       | `string \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_indeterminate` | `_indeterminate` | Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist.                                                                               | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `undefined` |
| `_name`          | `_name`          | Gibt den technischen Namen des Eingabefeldes an.                                                                                                   | `string \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_on`            | --               | Gibt die EventCallback-Funktionen für das Input-Event an.                                                                                          | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus \| undefined`                                                                                                                                                                                                                      | `undefined` |
| `_required`      | `_required`      | Macht das Eingabeelement zu einem Pflichtfeld.                                                                                                     | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `undefined` |
| `_tabIndex`      | `_tab-index`     | Gibt an, welchen Tab-Index dieses Input hat.                                                                                                       | `number \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_touched`       | `_touched`       | Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.                                                                      | `boolean \| undefined`                                                                                                                                                                                                                                                                                        | `false`     |
| `_type`          | `_type`          | <span style="color:red">**[DEPRECATED]**</span> Verwende stattdessen das Attribute \_variant.<br/><br/>Gibt an, welchen Type das Input haben soll. | `"button" \| "checkbox" \| "default" \| "switch" \| undefined`                                                                                                                                                                                                                                                | `undefined` |
| `_value`         | `_value`         | Gibt den Schlüssel/Namen der Checkbox an. ({ [value]: [checked] })                                                                                 | `string \| undefined`                                                                                                                                                                                                                                                                                         | `undefined` |
| `_variant`       | `_variant`       | Gibt an, welchen Type das Input haben soll.                                                                                                        | `"button" \| "checkbox" \| "default" \| "switch" \| undefined`                                                                                                                                                                                                                                                | `undefined` |

## Dependencies

### Depends on

- kol-input
- [kol-icon](../icon)

### Graph

```mermaid
graph TD;
  kol-input-checkbox --> kol-input
  kol-input-checkbox --> kol-icon
  kol-input --> kol-icon
  kol-input --> kol-button-wc
  kol-input --> kol-alert
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  kol-alert --> kol-heading-wc
  kol-alert --> kol-button-wc
  kol-alert --> kol-icon
  style kol-input-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

---
