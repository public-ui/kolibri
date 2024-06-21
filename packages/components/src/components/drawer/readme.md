# kol-drawer

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                                        | Type                                                      | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------- |
| `_align`              | `_align`  | Gibt die Referenz auf das auslösende HTML-Element an, wodurch das Modal geöffnet wurde.                            | `"bottom" \| "left" \| "right" \| "top" \| undefined`     | `'left'`    |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                  | `undefined` |
| `_modal`              | `_modal`  | Defines if drawer is a modal.                                                                                      | `boolean \| undefined`                                    | `undefined` |
| `_on`                 | --        | Specifies the EventCallback function for closing the drawer.                                                       | `undefined \| ({ onClose?: (() => void) \| undefined; })` | `undefined` |

## Methods

### `close() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `open() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Der Inhalt des Drawers. |

---
