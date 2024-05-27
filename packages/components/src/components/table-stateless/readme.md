# TableStateless

<kol-alert _type="warning" _variant="card">
  <kol-badge _color="#476af5" _label="Preview"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da die Barrierefreiheitstests noch ausstehen. Die verschiedenen Tests können aufgrund der Modularität bei neuen Komponenten und Funktionalitäten meist erst nach einem Release erfolgen. Wir empfehlen daher, die Komponente noch nicht in Produktion zu verwenden.
</kol-alert>

Die **TableStateless**-Komponente ist für die reine Darstellung der KoliBri-Tabelle verantwortlich. Für eine Tabellen-Komponente, die Sortierung und Paginierung mit den zur Verfügung gestellten Daten automatisch übernehmen kann, siehe [KolTableStateful](../table-stateful/readme.md).

TableStateless bietet sich insbesondere bei größeren Datenmengen an, wenn es nicht praktikabel ist, die komplette Datenmenge zur Filterung und Sortierung in den Browser auszuliefern.

## Selektion

Über die `_selection`-Property kann der "Selection-Modus" der Komponente aktiviert und gesteuert werden. Ist `_selection` definiert, erhält jede Zeile eine Checkbox, über die sich die Zeile aus- oder abwählen lässt.

```ts
const data = [
	{ id: '1001', name: 'Marianne Musterfrau' },
	{ id: '1002', name: 'Max Mustermann' },
];
const selection: KoliBriTableSelection = {
	/* label: Funktion, welche für jede Zeile ausgerufen wird, und ein Label für die Checkbox zurückgibt. */
	label: (row: KoliBriTableDataType) => `Selection for ${row.name}`,

	/* selectedKeys: Array von Strings, das die Key-Properties der gewählten Zeilen beinhaltet */
	selectedKeys: ['1002'],

	/* keyPropertyName: Eigenschaft, auf die sich `selectedKeys` bezieht. Default-Wert: `id` */
	keyPropertyName: 'id',
};
```

## Beispiel

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
  _selection={{
    label: (row: KoliBriTableDataType) => `Selection for ${row.name}`,
    selectedKeys: ['1002'],
    keyPropertyName: 'id',
  }}
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

    /**
     * @param {Event} _
     * @param {string[]} selection - Array of selected keys
     */
    onSelectionChange: (_: Event, selection: string[]) => {
      /* Update selection.selectedKeys state */
    }
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


----------------------------------------------


