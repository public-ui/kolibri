# Pagination

Mit Hilfe der **Paginierung**-Komponente lassen sich umfangreiche, aufgeteilte Inhalte, wie zum Beispiel Suchergebnisse, der Reihe nach durchlaufen.

## Konstruktion

### Code

```html
<div>
	<kol-pagination _max="100" _page="6"></kol-pagination>
	<kol-pagination _max="100" _page="6" _sibling-count="2"></kol-pagination>
	<kol-pagination _max="100" _page="6" _sibling-count="0" _boundary-count="2"></kol-pagination>
</div>
```

### Beispiel

<div class="grid gap-2">
  <kol-heading _level="3" _label="Standardausgabe nur mit aktuellem Element"></kol-heading>
  <kol-pagination _max="100" _page="6" _has-buttons="false"></kol-pagination>
  <kol-heading _level="3" _label="Ausgabe 2 Elemente links und rechts dem aktuellen Element (_sibling)"></kol-heading>
  <kol-pagination _max="100" _page="6" _sibling-count="2"></kol-pagination>
  <kol-heading _level="3" _label="Ausgabe 2 Elemente links und rechts (_boundary-count)"></kol-heading>
  <kol-pagination _max="100" _page="6" _sibling-count="0" _boundary-count="2"></kol-pagination>
</div>

## Verwendung

Die **Paginierung**-Komponente kann über Ihre Properties konfiguriert werden.

- Das Attribut **`_max`** bestimmt die Gesamtanzahl der Elemente.
- Über das Attribut **`boundary-count`** wird die Anzahl von Elementen bestimmt, die in der **Paginierung**-Komponente rechts und links angezeigt werden, während die übrigen Elemente
- Das Attribut **`_page`** legt das gerade aktive Element fest. Dieses wird farblich hervorgehoben dargestellt.
- Über das Attribut **`_sibling-count`** kann festgelegt werden, wie viele Elemente jeweils links und rechts des Aktuellen angezeigt werden sollen.

<!-- ### Best practices -->

### Anwendungsfälle

Die **Paginierung**-Komponente kann auf vielfältige Art eingesetzt werden. Insbesondere dort, wo auf einer Inhaltsseite umfangreiche Inhalte dargestellt werden sollen, trägt sie zur Verbesserung der Struktur und Übersichtlichkeit bei.
Klassische Anwendungsbereiche einer Paginierung sind z.B. Blog-ähnliche Inhalte, Listen und Tabellen. Auch für bestimmte Navigationsaufgaben innerhalb einer Seite kann die Paginierung gut verwendet werden.

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute            | Description                                                                                                        | Type                                                                                                                                                                                                                   | Default     |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_boundaryCount`     | `_boundary-count`    | Defines the amount of pages to show next to the outer arrow buttons.                                               | `number \| undefined`                                                                                                                                                                                                  | `1`         |
| `_customClass`       | `_custom-class`      | Defines the custom class attribute if \_variant="custom" is set.                                                   | `string \| undefined`                                                                                                                                                                                                  | `undefined` |
| `_hasButtons`        | `_has-buttons`       | Defines which navigation buttons to render (first, last, next, previous buttons).                                  | `boolean \| string \| undefined \| { first: boolean; last: boolean; next: boolean; previous: boolean; }`                                                                                                               | `true`      |
| `_label`             | `_label`             | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string \| undefined`                                                                                                                                                                                                  | `undefined` |
| `_max` _(required)_  | `_max`               | Defines the maximum number of pages.                                                                               | `number`                                                                                                                                                                                                               | `undefined` |
| `_on` _(required)_   | --                   | Gibt an, auf welche Callback-Events reagiert werden.                                                               | `{ onChangePage?: EventValueOrEventCallback<Event, number> \| undefined; onChangePageSize?: EventValueOrEventCallback<Event, number> \| undefined; onClick?: EventValueOrEventCallback<Event, number> \| undefined; }` | `undefined` |
| `_page` _(required)_ | `_page`              | Defines the current page.                                                                                          | `number`                                                                                                                                                                                                               | `undefined` |
| `_pageSize`          | `_page-size`         | Defines the amount of entries to show per page.                                                                    | `number`                                                                                                                                                                                                               | `1`         |
| `_pageSizeOptions`   | `_page-size-options` | Defines the options for the page-size-select.                                                                      | `number[] \| string`                                                                                                                                                                                                   | `[]`        |
| `_siblingCount`      | `_sibling-count`     | Defines the amount of pages to show next to the current page.                                                      | `number \| undefined`                                                                                                                                                                                                  | `1`         |
| `_tooltipAlign`      | `_tooltip-align`     | Defines where to show the Tooltip preferably: top, right, bottom or left.                                          | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                                                                                  | `'top'`     |

---
