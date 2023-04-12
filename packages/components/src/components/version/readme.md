# Version

Die **Version**-Komponente stellt kurze Inhalte auf einem farbigen Hintergrund dar. Die **Version**-Komponente ist mit der **Tag**-Komponente eng verwandt, bietet aber nur ein Attribut zur Konfiguration. Sie ist optimiert für die Angabe z.B. von Versionen einer Seite.

## Konstruktion

### Code

```html
<div>
	<kol-version _version="1.44.0"></kol-version>
</div>
```

### Beispiel

<kol-version _version="1.44.0"></kol-version>

## Verwendung

Für die Konfiguration steht das Attribut **`_version`** zur Verfügung und nimmt einen beliebigen Text auf, dem in der Komponente ein `v` vorgestellt wird.

Die **Version** wird standardmäßig als **_Inline-Element_** ausgegeben.

<!--### Best practices

### Anwendungsfälle-->

<!-- ## Barrierefreiheit -->

<!--## Links und Referenzen

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute  | Description                          | Type     | Default     |
| ----------------------- | ---------- | ------------------------------------ | -------- | ----------- |
| `_version` _(required)_ | `_version` | Gibt die Versionsnummer als Text an. | `string` | `undefined` |

## Dependencies

### Depends on

- [kol-badge](../badge)

### Graph

```mermaid
graph TD;
  kol-version --> kol-badge
  kol-badge --> kol-span-wc
  kol-badge --> kol-button-wc
  kol-span-wc --> kol-icon
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip
  kol-tooltip --> kol-badge
  style kol-version fill:#f9f,stroke:#333,stroke-width:4px
```

---
