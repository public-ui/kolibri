# Popover

> <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Popover**-Komponente stellt eine Möglichkeit dar zusätzliche Inhalte in ein temporäres Element zu setzen, das, ähnlich wie <kol-link _href="" _label="Tooltip"></kol-link>, um sein Triggerelement angeordnet ist.
Das Triggerelement ist immer das im HTML vorangehende Element (previousSibling).

<kol-alert _type="info" _variant="card">Die **Popover**-Komponente wird innerhalb von KoliBri verwendet und ist nicht dafür vorgesehen in der Anwendungsentwicklung verwendet zu werden.</kol-alert>

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                       | Type                                                  | Default |
| -------- | --------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- | ------- |
| `_align` | `_align`  | Defines the alignment of the tooltip, popover or tabs in relation to the element. | `"bottom" \| "left" \| "right" \| "top" \| undefined` | `'top'` |
| `_show`  | `_show`   | Makes the element show up.                                                        | `boolean \| undefined`                                | `false` |


## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Der Inhalt des Popover. |


----------------------------------------------


