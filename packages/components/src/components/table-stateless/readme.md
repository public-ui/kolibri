# kol-table-stateless

<!-- Auto Generated Below -->

## Properties

| Property                    | Attribute       | Description                                                                                                        | Type                                                                                                                      | Default     |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_data` _(required)_        | `_data`         | Defines the primary table data.                                                                                    | `KoliBriTableDataType[] \| string`                                                                                        | `undefined` |
| `_dataFoot`                 | `_data-foot`    | Defines the data for the table footer.                                                                             | `KoliBriTableDataType[] \| string \| undefined`                                                                           | `undefined` |
| `_headerCells` _(required)_ | `_header-cells` | Defines the horizontal and vertical table headers.                                                                 | `string \| { horizontal?: KoliBriTableHeaderCell[][] \| undefined; vertical?: KoliBriTableHeaderCell[][] \| undefined; }` | `undefined` |
| `_label` _(required)_       | `_label`        | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                                                                  | `undefined` |
| `_minWidth`                 | `_min-width`    | Defines the table min-width.                                                                                       | `string \| undefined`                                                                                                     | `undefined` |
| `_on`                       | --              | Defines the callback functions for table events.                                                                   | `undefined \| { onSort?: EventValueOrEventCallback<MouseEvent, SortEventPayload> \| undefined; }`                         | `undefined` |

---
