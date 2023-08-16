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

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                       | Type                  | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `_label`   | `_label`   | Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.).   | `string \| undefined` | `undefined` |
| `_version` | `_version` | <span style="color:red">**[DEPRECATED]**</span> use \_label instead<br/><br/>Gibt die Versionsnummer als Text an. | `string \| undefined` | `undefined` |

## Dependencies

### Depends on

- [kol-badge](../badge)

### Graph

```mermaid
graph TD;
  kol-version --> kol-badge
  kol-badge --> kol-button-wc
  kol-badge --> kol-span-wc
  kol-button-wc --> kol-span-wc
  kol-button-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  style kol-version fill:#f9f,stroke:#333,stroke-width:4px
```

---
