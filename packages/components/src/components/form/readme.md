# Form

Die **Form**-Komponente dient dazu alle Eingabefelder zu umschließen, den Hinweistext für Pflichtfelder korrekt zu positionieren und die Events `submit` und `reset` weiterzuleiten.

## Konstruktion

### Code

```html
<kol-form _requiredText="Sternchen heißt Pflichtfeld.">
	<kol-input-text _label="Vorname"></kol-input-text>
	<kol-input-text _label="Nachname"></kol-input-text>
</kol-form>
```

### Beispiel

<kol-form _requiredText="Sternchen heißt Pflichtfeld.">
	<kol-input-text _label="Vorname"></kol-input-text>
	<kol-input-text _label="Nachname"></kol-input-text>
</kol-form>

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                                                                                             | Type                                                                                                          | Default     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `_errorList`    | --               | A list of error objects that each describe an issue encountered in the form. Each error object contains a message and a selector for identifying the form element related to the error. | `ErrorListPropType[] \| undefined`                                                                            | `undefined` |
| `_on`           | --               | Gibt die EventCallback-Funktionen für die Form-Events an.                                                                                                                               | `undefined \| { onSubmit?: EventCallback<Event> \| undefined; onReset?: EventCallback<Event> \| undefined; }` | `undefined` |
| `_requiredText` | `_required-text` | Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.                                                                                         | `boolean \| string \| undefined`                                                                              | `true`      |

## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | Inhalt der Form. |

## Dependencies

### Depends on

- [kol-alert](../alert)
- [kol-link](../link)
- [kol-indented-text](../indented-text)

### Graph

```mermaid
graph TD;
  kol-form --> kol-alert
  kol-form --> kol-link
  kol-form --> kol-indented-text
  kol-alert --> kol-alert-wc
  kol-alert-wc --> kol-heading-wc
  kol-alert-wc --> kol-button-wc
  kol-alert-wc --> kol-icon
  kol-link --> kol-link-wc
  kol-link-wc --> kol-span-wc
  kol-link-wc --> kol-icon
  kol-link-wc --> kol-tooltip-wc
  kol-span-wc --> kol-icon
  kol-tooltip-wc --> kol-span-wc
  style kol-form stroke:#333,stroke-width:4px
```

---
