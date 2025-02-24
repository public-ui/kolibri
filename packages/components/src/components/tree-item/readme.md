# Tree-Item

Weitere Informationen zum Tree finden Sie auf der <kol-link _href="/docs/components/tree" _label="Seite der Tree-Komponente"></kol-link>.

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                                        | Type                   | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `_active`             | `_active` | If set (to true) the tree item is the active one.                                                                  | `boolean \| undefined` | `undefined` |
| `_href` _(required)_  | `_href`   | Defines the target URI of the link.                                                                                | `string`               | `undefined` |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`               | `undefined` |
| `_open`               | `_open`   | Opens/expands the element when truthy, closes/collapses when falsy.                                                | `boolean \| undefined` | `undefined` |

## Methods

### `collapse() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `expand() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `focusLink() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `isOpen() => Promise<boolean>`

#### Returns

Type: `Promise<boolean>`

---
