# Form

Die **Form**-Komponente dient dazu alle Eingabefelder zu umschließen, den Hinweistext für Pflichtfelder korrekt zu positionieren und die Events `submit` und `reset` weiterzuleiten.

## Konstruktion

### Code

```html
<kol-form>
	<kol-input-text _id="firstname">Vorname</kol-input-text>
	<kol-input-text _id="lastname">Nachname</kol-input-text>
</kol-form>
```

### Beispiel

<kol-form>
	<kol-input-text _id="firstname">Vorname</kol-input-text>
	<kol-input-text _id="lastname">Nachname</kol-input-text>
</kol-form>

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                             | Type                                                                                                          | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `_on`           | --               | Gibt die EventCallback-Funktionen für die Form-Events an.                                               | `undefined \| { onSubmit?: EventCallback<Event> \| undefined; onReset?: EventCallback<Event> \| undefined; }` | `undefined` |
| `_requiredText` | `_required-text` | Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll. Ein String überschreibt den Standardtext. | `boolean \| string \| undefined`                                                                              | `true`      |

## Slots

| Slot                         | Description |
| ---------------------------- | ----------- |
| `"default Inhalt der Form."` |             |

## Dependencies

### Depends on

- [kol-indented-text](../indented-text)

### Graph

```mermaid
graph TD;
  kol-form --> kol-indented-text
  style kol-form fill:#f9f,stroke:#333,stroke-width:4px
```

---
