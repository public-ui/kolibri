# Toast

Mit der **Toast**-Komponente geben Sie ein optisches Feedback an die Nutzer:innen. Sie wird nur für einen kurzen Zeitraum am Kopf des Browserfenster angezeigt und verschwindet danach automatisch.

Ein **Toast** wird nach dem Laden der Webseite am oberen Rand des Browserfenster für zehn Sekunden angezeigt. Mit Ausblenden des **Toasts** wird dieser automatisch aus dem DOM entfernt. Wird er erneut benötigt, muss er z.B. über eine JavaScript-Funktion nachgeladen werden.

## Konstruktion

### Code

```html
<kol-alert _label="Erfolg" _type="success">Hier wird der Erfolg näher beschrieben.</kol-alert>
<kol-alert _type="success" _show="false">Hier wird der Erfolg näher beschrieben.</kol-alert>
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

> **[DEPRECATED]** - Use ToastService - see toaster

## Properties

| Property        | Attribute        | Description                                                                                                                | Type                                                                    | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------- |
| `_alert`        | `_alert`         | Defines whether the screen-readers should read out the notification.                                                       | `boolean \| undefined`                                                  | `true`      |
| `_hasCloser`    | `_has-closer`    | Defines whether the element can be closed.                                                                                 | `boolean \| undefined`                                                  | `false`     |
| `_heading`      | `_heading`       | <span style="color:red">**[DEPRECATED]**</span> Use \_label.<br/><br/>Deprecated: Gibt die Beschriftung der Komponente an. | `string \| undefined`                                                   | `''`        |
| `_label`        | `_label`         | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).         | `string \| undefined`                                                   | `undefined` |
| `_level`        | `_level`         | Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.                          | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| undefined`                          | `1`         |
| `_on`           | --               | Gibt die EventCallback-Function für das Schließen des Toasts an.                                                           | `undefined \| { onClose?: EventCallback<Event> \| undefined; }`         | `undefined` |
| `_show`         | `_show`          | Makes the element show up.                                                                                                 | `boolean \| undefined`                                                  | `true`      |
| `_showDuration` | `_show-duration` | Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.                                                       | `number \| undefined`                                                   | `10000`     |
| `_type`         | `_type`          | Defines either the type of the component or of the components interactive element.                                         | `"default" \| "error" \| "info" \| "success" \| "warning" \| undefined` | `'default'` |

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Der Inhalt der Meldung. |

---
