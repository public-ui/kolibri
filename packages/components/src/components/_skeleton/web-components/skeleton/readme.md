# kol-skeleton

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute | Description                              | Type     | Default     |
| -------------------- | --------- | ---------------------------------------- | -------- | ----------- |
| `_name` _(required)_ | `_name`   | Sets the name of the skeleton component. | `string` | `undefined` |

## Events

| Event      | Description                                                     | Type                  |
| ---------- | --------------------------------------------------------------- | --------------------- |
| `loaded`   | Emitted when the skeleton has finished loading.                 | `CustomEvent<number>` |
| `rendered` | Emitted when the skeleton has been rendered for the first time. | `CustomEvent<void>`   |

## Methods

### `focus(options?: KolFocusOptions) => Promise<void>`

Focuses the interactive element of the component.

#### Parameters

| Name      | Type                           | Description |
| --------- | ------------------------------ | ----------- |
| `options` | `KolFocusOptions \| undefined` |             |

#### Returns

Type: `Promise<void>`

### `toggle() => Promise<void>`

Toggles the visibility of the skeleton component.

#### Returns

Type: `Promise<void>`

---
