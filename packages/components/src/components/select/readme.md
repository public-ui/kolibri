# Select

Die **Select**-Komponente erzeugt eine Auswahlliste, aus der eine oder mehrere vorgegebene Möglichkeiten ausgewählt werden können.

## Konstruktion

### Code

```html
<kol-select _list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'}" _value="['1']"> Auswahlfeld </kol-select>
<kol-select _list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'}]" _multiple _value="['0','2']">
	Auswahlfeld (Mehrfachauswahl)
</kol-select>
<kol-select
	_list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'},{'label':'Herr','value':'3'},{'label':'Frau','value':'4'},{'label':'Firma','value':'5'}]"
	_size="4"
	_value="['1']"
>
	Auswahlfeld mit _size
</kol-select>
```

### Beispiel

<kol-select _list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'}" _value="['1']"> Auswahlfeld </kol-select>
<kol-select _list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'}]" _multiple _value="['0','2']">
Auswahlfeld (Mehrfachauswahl)
</kol-select>
<kol-select _list="[{'label':'Herr','value':'0'},{'label':'Frau','value':'1'},{'label':'Firma','value':'2'},{'label':'Herr','value':'3'},{'label':'Frau','value':'4'},{'label':'Firma','value':'5'}]" _size="4" _value="['1']">Auswahlfeld mit size</kol-select>

## Verwendung

Die Auswahlmöglichkeiten werden über das Attribut **`_list`** als Objekt oder JSON-String an die Komponente übergeben. Je Option müssen die Werte **`label`** und **`value`** angegeben werden.

Beispiel für die Konstruktion des JSON-Objektes:

```js
[
	{ label: 'Herr', value: '0' },
	{ label: 'Frau', value: '1' },
	{ label: 'Firma', value: '2' },
];
```

### Individuelle Höhe angeben

Über das Attribut **`_size`** kann von einem Auswahlmenü auf ein Auswahlfeld (wie bei **`_multiple`**) gewechselt werden und dessen Höhe gesetzt werden.

<!--### Best practices-->

<!-- ## Barrierefreiheit -->

### Tastatursteuerung

| Taste                         | Funktion                                                                                                                                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                         | Fokussiert das Auswahlfeld.                                                                                                                                                                                                   |
| `Enter`                       | Öffnet bzw.schließt die Auswahlliste.                                                                                                                                                                                         |
| `Pfeil-Tasten (oben / unten)` | Wechselt in der Auswahlliste das aktivierte Element. Diese Funktion ist auch bei eingeklappter Auswahlliste aktiv. Bei Mehrfachauswahl muss zur Auswahl mehrerer Einträge zusätzlich die Shift-Taste gedrück gehalten werden. |

### `Single-Select-Filter` für Select-Komponente

Die Select-Komponente liefert bei Auswahl eines Wertes eine Liste (Array) mit genau einem
Wert zurück (im Single-Modus). Das kann bei der weiteren Verarbeitung zu unnötigem Aufwand führen. Einfacher ist es hier, den Wert der Select-Komponente über einen <b>SingeSelectFormatter</b> zu Filtern. Fügen Sie hierzu im Formular nachfolgende Klasse ein:

```html
class SingleSelectFormatter extends AbstractFormatter { public format(value: unknown): unknown { return [value]; } public parse(value: unknown): unknown { if
(Array.isArray(value) && value.length > 0) { return value[0]; } return value; } }
```

Fügen Sie den Formatter anschließend der Select-Komponente hinzu:

```html
const singleSelectFormatHandler = new FormatHandler(); singleSelectFormatHandler.formatters.add([new SingleSelectFormatter()]); (this.getInput('kategorie') as
InputControl).setFormatHandler(singleSelectFormatHandler);
```

Beachten Sie, dass der FormatHandler zunächst in die Form importiert wird.

```html
import { xxx..., xxx..., FormatHandler, } from '@leanup/form';
```

## Links und Referenzen

- https://medium.com/@gavyn/til-autofocus-inputs-are-an-accessibility-problem-32ced60c3109

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute     | Description                                                                                                                            | Type                                                                                                    | Default     |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------- |
| `_accessKey`         | `_access-key` | Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.                                                   | `string \| undefined`                                                                                   | `undefined` |
| `_alert`             | `_alert`      | Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.                                                               | `boolean \| undefined`                                                                                  | `true`      |
| `_disabled`          | `_disabled`   | Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.                                                        | `boolean \| undefined`                                                                                  | `undefined` |
| `_error`             | `_error`      | Gibt den Text für eine Fehlermeldung an.                                                                                               | `string \| undefined`                                                                                   | `undefined` |
| `_height`            | `_height`     | <span style="color:red">**[DEPRECATED]**</span> Use \_size instead.<br/><br/>Gibt an, ob eine individuelle Höhe übergeben werden soll. | `string \| undefined`                                                                                   | `undefined` |
| `_hideLabel`         | `_hide-label` | Versteckt das sichtbare Label des Elements.                                                                                            | `boolean \| undefined`                                                                                  | `undefined` |
| `_hint`              | `_hint`       | Gibt den Hinweistext an.                                                                                                               | `string \| undefined`                                                                                   | `''`        |
| `_icon`              | `_icon`       | Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.                                                     | `string \| undefined \| { right?: IconOrIconClass \| undefined; left?: IconOrIconClass \| undefined; }` | `undefined` |
| `_id`                | `_id`         | Gibt die technische ID des Eingabefeldes an.                                                                                           | `string \| undefined`                                                                                   | `undefined` |
| `_list` _(required)_ | `_list`       | Gibt den technischen Namen des Eingabefeldes an.                                                                                       | `SelectOption<W3CInputValue>[] \| string`                                                               | `undefined` |
| `_multiple`          | `_multiple`   | Gibt an, ob mehrere Werte eingegeben werden können.                                                                                    | `boolean \| undefined`                                                                                  | `false`     |
| `_name`              | `_name`       | Gibt den technischen Namen des Eingabefeldes an.                                                                                       | `string \| undefined`                                                                                   | `undefined` |
| `_on`                | --            | Gibt die EventCallback-Funktionen für das Input-Event an.                                                                              | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus \| undefined`                | `undefined` |
| `_required`          | `_required`   | Macht das Eingabeelement zu einem Pflichtfeld.                                                                                         | `boolean \| undefined`                                                                                  | `undefined` |
| `_size`              | `_size`       | Wechselt das Eingabeelement in den Auswahlfeld modus und setzt die Höhe des Feldes.                                                    | `number \| undefined`                                                                                   | `undefined` |
| `_tabIndex`          | `_tab-index`  | Gibt an, welchen Tab-Index dieses Input hat.                                                                                           | `number \| undefined`                                                                                   | `undefined` |
| `_touched`           | `_touched`    | Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.                                                          | `boolean \| undefined`                                                                                  | `false`     |
| `_value`             | `_value`      | Gibt den Wert des Eingabefeldes an.                                                                                                    | `W3CInputValue[] \| string \| undefined`                                                                | `undefined` |

## Slots

| Slot | Description                         |
| ---- | ----------------------------------- |
|      | Die Beschriftung des Eingabefeldes. |

## Dependencies

### Used by

- [kol-pagination](../pagination)

### Depends on

- kol-input

### Graph

```mermaid
graph TD;
  kol-select --> kol-input
  kol-input --> kol-icon
  kol-input --> kol-button-wc
  kol-input --> kol-alert
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  kol-alert --> kol-alert-wc
  kol-alert-wc --> kol-heading-wc
  kol-alert-wc --> kol-button-wc
  kol-alert-wc --> kol-icon
  kol-pagination --> kol-select
  style kol-select fill:#f9f,stroke:#333,stroke-width:4px
```

---
