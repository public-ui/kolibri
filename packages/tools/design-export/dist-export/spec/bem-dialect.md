# BEM-Dialekt: Design-Properties und nötige Änderungen

Generiert von `pnpm --filter @public-ui/design-export start:spec` aus `bem-registry.ts`, `custom-elements.json` und den Functional Components.

## Design-Properties je Komponente

| Block                           | Properties in Penpot und Figma                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kol-alert`                     | Type = default / error / info / success / warning; Variant = card / msg; Closer = false / true                                                                                  |
| `kol-badge`                     | Smart Button = false / true                                                                                                                                                     |
| `kol-button`                    | Variant = danger / ghost / normal / primary / secondary / tertiary; Disabled = false / true; Hide Label = false / true; Inline = false / true; Hover (Zustand); Focus (Zustand) |
| `kol-custom-suggestions-toggle` | Disabled = false / true                                                                                                                                                         |
| `kol-input-container`           | Default = false / true; Disabled = false / true; Error = false / true; Info = false / true; Success = false / true; Warning = false / true                                      |
| `kol-input-radio`               | Disabled = false / true; Required = false / true; Touched = false / true                                                                                                        |
| `kol-link`                      | Variant = small; Disabled = false / true; Hide Label = false / true; Inline = false / true; Hover (Zustand); Focus (Zustand)                                                    |
| `kol-popover-button`            | Inline = false / true                                                                                                                                                           |
| `kol-span`                      | Badge = false / true; Hide Label = false / true                                                                                                                                 |
| `kol-tabs`                      | Align = bottom / left / right / top                                                                                                                                             |
| `kol-toolbar`                   | Orientation = horizontal / vertical                                                                                                                                             |

## Nötige Änderungen an der BEM-Registry

22 Modifier folgen dem Dialekt noch nicht.

| Block                | Modifier        | Befund                                           | Vorschlag                                                      |
| -------------------- | --------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| `kol-alert`          | `hasCloser`     | nicht kebab-case                                 | has-closer                                                     |
| `kol-button`         | `danger`        | Variante nur im Theme-CSS, nicht in der Registry | variant-danger                                                 |
| `kol-button`         | `ghost`         | Variante nur im Theme-CSS, nicht in der Registry | variant-ghost                                                  |
| `kol-button`         | `normal`        | Variante nur im Theme-CSS, nicht in der Registry | variant-normal                                                 |
| `kol-button`         | `primary`       | Variante nur im Theme-CSS, nicht in der Registry | variant-primary                                                |
| `kol-button`         | `secondary`     | Variante nur im Theme-CSS, nicht in der Registry | variant-secondary                                              |
| `kol-button`         | `standalone`    | kein Attribut dieses Namens                      | remove: the absence of `inline` already says it                |
| `kol-button`         | `tertiary`      | Variante nur im Theme-CSS, nicht in der Registry | variant-tertiary                                               |
| `kol-heading`        | `group`         | kein Attribut dieses Namens                      | is-group (internal state) or <attribute>-group                 |
| `kol-input-radio`    | `checked`       | kein Attribut dieses Namens                      | is-checked (internal state) or <attribute>-checked             |
| `kol-input-radio`    | `default`       | kein Attribut dieses Namens                      | is-default (internal state) or <attribute>-default             |
| `kol-input-radio`    | `error`         | kein Attribut dieses Namens                      | is-error (internal state) or <attribute>-error                 |
| `kol-input-radio`    | `info`          | kein Attribut dieses Namens                      | is-info (internal state) or <attribute>-info                   |
| `kol-input-radio`    | `success`       | kein Attribut dieses Namens                      | is-success (internal state) or <attribute>-success             |
| `kol-input-radio`    | `warning`       | kein Attribut dieses Namens                      | is-warning (internal state) or <attribute>-warning             |
| `kol-link`           | `external-link` | kein Attribut dieses Namens                      | is-external-link (internal state) or <attribute>-external-link |
| `kol-link`           | `small`         | Variante nur im Theme-CSS, nicht in der Registry | variant-small                                                  |
| `kol-link`           | `standalone`    | kein Attribut dieses Namens                      | remove: the absence of `inline` already says it                |
| `kol-meter`          | `vertical`      | kein Attribut dieses Namens                      | orientation-vertical                                           |
| `kol-popover-button` | `open`          | kein Attribut dieses Namens                      | is-open (internal state) or <attribute>-open                   |
| `kol-quote`          | `block`         | kein Attribut dieses Namens                      | variant-block                                                  |
| `kol-quote`          | `inline`        | kein Attribut dieses Namens                      | variant-inline                                                 |

## Öffentliche Komponenten ohne eigenen Baum

Ihr Tag ist kein Block mit eigener Functional Component; sie setzen sich aus anderen Blöcken zusammen (z. B. `kol-input-text` aus `kol-form-field`, `kol-input-container`). Für sie braucht die Registry eine Zuordnung Tag → Wurzelblock.

`kol-accordion`, `kol-button-link`, `kol-combobox`, `kol-details`, `kol-input-checkbox`, `kol-input-color`, `kol-input-date`, `kol-input-email`, `kol-input-file`, `kol-input-number`, `kol-input-password`, `kol-input-range`, `kol-input-text`, `kol-link-button`, `kol-modal`, `kol-select`, `kol-single-select`, `kol-table-stateful`, `kol-table-stateless`, `kol-textarea`

## Nicht aus dem Code gelesen

Ausdrücke in den Functional Components, die der Baum-Leser übersprungen hat (Spread-Props, berechnete Inhalte).

- `kol-badge`: `{...smartButton.resolvedButton}`
- `kol-button`: `<AriaDescriptionSpanFC>`
- `kol-card`: `{...closeButtonProps}`
- `kol-field-control`: `renderTooltip()`
- `kol-form`: `hintText`
- `kol-form-field`: `translate('kol-readonly')`, `{...infoPopover.popoverButton}`
- `kol-link`: `<AriaDescriptionSpanFC>`
- `kol-meter`: `displayValue`
- `kol-nav`: `{...getButtonFcProps('compact-toggle', { _ariaControls: n…`, `{...getLinkFcProps(`link-${ariaId}`, { ...(entry as Embed…`
- `kol-pagination`: `<PaginationContentFC>`
- `kol-progress`: `displayValue`
- `kol-skip-nav`: `{...item.fcProps}`
- `kol-split-button`: `{...buttonProps}`, `{...dropdownProps}`
- `kol-table`: `props.renderSettings(headers.horizontal)`, `sortOrder`, `{...context.getButtonFcProps( `sort-${isVertical ? 'verti…`, `{...context.getLinkFcProps(actionKey, action)}`
- `kol-tabs`: `{...buttonProps}`, `{...createButton.buttonProps}`
- `kol-toolbar`: `{...record.getFcProps(tabIndex, location)}`
- `kol-tree-item`: `{...LINK_DEFAULTS}`
