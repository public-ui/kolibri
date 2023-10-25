Siehe [Toast](/docs/components/toast).

<!-- Auto Generated Below -->

## Methods

### `enqueue(toast: Toast) => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [kol-button](../button)
- [kol-alert](../alert)

### Graph

```mermaid
graph TD;
  kol-toast-container --> kol-button
  kol-toast-container --> kol-alert
  kol-button --> kol-button-wc
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip-wc
  kol-span-wc --> kol-icon
  kol-tooltip-wc --> kol-span-wc
  kol-alert --> kol-alert-wc
  kol-alert-wc --> kol-heading-wc
  kol-alert-wc --> kol-button-wc
  kol-alert-wc --> kol-icon
  style kol-toast-container fill:#f9f,stroke:#333,stroke-width:4px
```

---
