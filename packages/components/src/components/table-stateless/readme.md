# TableStateless

<KolAlert _type="warning" _variant="msg">
  <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.
</KolAlert>

Die **TableStateless**-Komponente ist für die reine Darstellung der KoliBri-Tabelle verantwortlich. Für eine Tabellen-Komponente, die Sortierung und Paginierung mit den zur Verfügung gestellten Daten automatisch übernehmen kann, siehe [KolTableStateful](../table-stateful/readme.md).

TableStateless bietet sich insbesondere bei größeren Datenmengen an, wenn es nicht praktikabel ist, die komplette Datenmenge zur Filterung und Sortierung in den Browser auszuliefern.

Beispiel:

```jsx
<KolTableStateless
  _label="Table for demonstration purposes"
  _headerCells={{
    horizontal: [
      [
        { key: 'value', label: 'Value', sortDirection: 'ASC' },
      ],
    ],
  }}
  _data={DATA}
  className="block"
  style={{ maxWidth: '600px' }}
  _on={{
    /**
     * @param {MouseEvent} _
     * @param {SortEventPayload} payload
     * @param {string} payload.key
     * @param {KoliBriSortDirection} payload.currentSortDirection
     */
    onSort: (_: MouseEvent, payload: SortEventPayload) => {
      /* Perform sort, update `DATA` and headers `sortDirection` */
    },
  }}
/>
```

<!-- Auto Generated Below -->

## Properties

| Property                    | Attribute       | Description                                                                                                        | Type                                                                                                                                                                                              | Default     |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_data` _(required)_        | `_data`         | Defines the primary table data.                                                                                    | `KoliBriTableDataType[] \| string`                                                                                                                                                                | `undefined` |
| `_dataFoot`                 | `_data-foot`    | Defines the data for the table footer.                                                                             | `KoliBriTableDataType[] \| string \| undefined`                                                                                                                                                   | `undefined` |
| `_headerCells` _(required)_ | `_header-cells` | Defines the horizontal and vertical table headers.                                                                 | `string \| { horizontal?: KoliBriTableHeaderCell[][] \| undefined; vertical?: KoliBriTableHeaderCell[][] \| undefined; }`                                                                         | `undefined` |
| `_label` _(required)_       | `_label`        | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                                                                                                                                          | `undefined` |
| `_minWidth`                 | `_min-width`    | Defines the table min-width.                                                                                       | `string \| undefined`                                                                                                                                                                             | `undefined` |
| `_on`                       | --              | Defines the callback functions for table events.                                                                   | `undefined \| { onSort?: EventValueOrEventCallback<MouseEvent, SortEventPayload> \| undefined; onSelectionChange?: EventValueOrEventCallback<Event, SelectionChangeEventPayload> \| undefined; }` | `undefined` |
| `_selection`                | `_selection`    | Defines how rows can be selected and the current selection.                                                        | `string \| undefined \| ({ label: (row: KoliBriTableDataType) => string; keyPropertyName?: string \| undefined; selectedKeys?: string[] \| undefined; })`                                         | `undefined` |

---
