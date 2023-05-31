# Popover

> <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Popover**-Komponente stellt eine Möglichkeit dar zusätzliche Inhalte in ein temporäres Element zu setzen, das, ähnlich wie <kol-link _href="" _label="Tooltip"></kol-link>, um sein Triggerelement angeordnet ist.
Das Triggerelement ist immer das im HTML vorangehende Element (previousSibling).

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute    | Description                                                        | Type                                                  | Default |
| ------------ | ------------ | ------------------------------------------------------------------ | ----------------------------------------------------- | ------- |
| `_alignment` | `_alignment` | Setzt die Ausrichtung des Popovers in Relation zum Triggerelement. | `"bottom" \| "left" \| "right" \| "top" \| undefined` | `'top'` |
| `_show`      | `_show`      | Öffnet/schließt das Popover.                                       | `boolean \| undefined`                                | `false` |

## Slots

| Slot                                | Description |
| ----------------------------------- | ----------- |
| `"default Der Inhalt des Popover."` |             |

---
