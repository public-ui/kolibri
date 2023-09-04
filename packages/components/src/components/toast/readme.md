# Toast

Mit der **Toast**-Komponente geben Sie ein optisches Feedback an die Nutzer:innen. Sie wird nur für einen kurzen Zeitraum am Kopf des Browserfenster angezeigt und verschwindet danach automatisch.

Ein **Toast** wird nach dem Laden der Webseite am oberen Rand des Browserfenster für zehn Sekunden angezeigt. Mit Ausblenden des **Toasts** wird dieser automatisch aus dem DOM entfernt. Wird er erneut benötigt, muss er z.B. über eine JavaScript-Funktion nachgeladen werden.

## Konstruktion

### Code

```js
import { ToasterService } from '@public-ui/components';

// Get the toaster instance for the current HTML document.
const toaster = ToasterService.getInstance(document);

// Enqueue a new toast to the toaster to display:
toaster.enqueue({
	label: 'This is the title',
	description: 'Magna eu sit adipisicing cillum amet esse in aute quis in dolore.',
	type: 'info',
});
```

### Beispiel

<div class="d-grid gap-2">
  <kol-alert _label="Erfolg" _type="success">Hier wird der Erfolg näher beschrieben.</kol-alert>
  <kol-alert _type="success" _show="false">Hier wird der Erfolg näher beschrieben.</kol-alert>
</div>

## Verwendung

### Überschrift

Verwenden Sie das Attribut **`_label`**, um die Überschrift des Toasts zu bestimmen.

### Größe der Überschrift

Verwenden Sie das Attribut **`_level`**, um die Überschriftenebene zu setzen.

### Anzeigen des Toasts

Verwenden Sie das Attribut **`_show`**, um den Toast manuell anzuzeigen.

### Anzeigedauer des Toast

Verwenden Sie das Attribut **`_showDuration`**, um die Anzeigedauer des Toasts festzulegen.

### Anzeigetyp des Toast

Verwenden Sie das Attribut **`_type`**, um den Typ des Toasts festzulegen. Mögliche Werte sind:

- `default`
- `error`
- `info`
- `success`
- `warning`

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute | Description                                                                                                        | Type                                                                    | Default     |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| `_label` _(required)_  | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                | `undefined` |
| `_on`                  | --        | Defines the event callback functions for the component.                                                            | `undefined \| { onClose?: EventCallback<Event> \| undefined; }`         | `undefined` |
| `_status` _(required)_ | `_status` | Defines the current toast status.                                                                                  | `"adding" \| "removing" \| "settled"`                                   | `undefined` |
| `_type`                | `_type`   | Defines either the type of the component or of the components interactive element.                                 | `"default" \| "error" \| "info" \| "success" \| "warning" \| undefined` | `'default'` |

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Der Inhalt der Meldung. |

## Dependencies

### Used by

- [kol-toast-container](../toast-container)

### Depends on

- [kol-alert](../alert)

### Graph

```mermaid
graph TD;
  kol-toast --> kol-alert
  kol-alert --> kol-alert-wc
  kol-alert-wc --> kol-heading-wc
  kol-alert-wc --> kol-button-wc
  kol-alert-wc --> kol-icon
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip-wc
  kol-span-wc --> kol-icon
  kol-tooltip-wc --> kol-span-wc
  kol-toast-container --> kol-toast
  style kol-toast fill:#f9f,stroke:#333,stroke-width:4px
```

---
