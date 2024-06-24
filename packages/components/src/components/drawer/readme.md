# kol-drawer

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                                        | Type                                                      | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------- |
| `_align`              | `_align`  | Specifies the orientation of the drawer.                                                                           | `"bottom" \| "left" \| "right" \| "top" \| undefined`     | `'left'`    |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                  | `undefined` |
| `_modal`              | `_modal`  | Indicates whether the drawer is a modal.                                                                           | `boolean \| undefined`                                    | `undefined` |
| `_on`                 | --        | Specifies the EventCallback function to be called when the drawer is closing.                                      | `undefined \| ({ onClose?: (() => void) \| undefined; })` | `undefined` |
| `_open`               | `_open`   | Specifies the default open state of the drawer.                                                                    | `boolean \| undefined`                                    | `undefined` |

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
