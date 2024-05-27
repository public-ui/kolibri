# Heading

Die **Heading**-Komponente kann überall dort verwendet werden, wo eine Überschrift angezeigt werden soll. Durch die Verwendung der unterschiedlichen Größen, lassen sich Inhalte klar strukturieren und Seiten wirkungsvoll und abwechslungsreich präsentieren. Sie trennt Styling von Semantik und ermöglicht Flexibilität.

## Konstruktion

### Code

```html
<kol-heading _level="1" _label="Inhalt einer H1-Überschrift"></kol-heading>
<kol-heading _level="2" _label="Inhalt einer H2-Überschrift"></kol-heading>
<kol-heading _level="3" _label="Inhalt einer H3-Überschrift"></kol-heading>
<kol-heading _level="4" _label="Inhalt einer H4-Überschrift"></kol-heading>
<kol-heading _level="5" _label="Inhalt einer H5-Überschrift"></kol-heading>
<kol-heading _level="6" _label="Inhalt einer H6-Überschrift"></kol-heading>
```

### Beispiel

<kol-heading _level="1" _label="Inhalt einer H1-Überschrift"></kol-heading>
<kol-heading _level="2" _label="Inhalt einer H2-Überschrift"></kol-heading>
<kol-heading _level="3" _label="Inhalt einer H3-Überschrift"></kol-heading>
<kol-heading _level="4" _label="Inhalt einer H4-Überschrift"></kol-heading>
<kol-heading _level="5" _label="Inhalt einer H5-Überschrift"></kol-heading>
<kol-heading _level="6" _label="Inhalt einer H6-Überschrift"></kol-heading>

## Verwendung

Die Überschriftenebene wird durch das Attribut **`_level`** übergeben. Möglich sind die Level **1** bis **6**

### Best practices

- Achten Sie bei der Verwendung von Headings auf die empfohlene Semantik für die Suchmaschinenoptimierung.
- Setzen Sie Headings in verschiedenen Größen ein, um eine sinnvolle Struktur Ihrer Inhalte zu erzeugen.

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute             | Description                                                                                                                                                  | Type                                                                    | Default     |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| `_label` _(required)_ | `_label`              | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot. | `string`                                                                | `undefined` |
| `_level`              | `_level`              | Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.                                                            | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| undefined`                          | `1`         |
| `_secondaryHeadline`  | `_secondary-headline` | Setzt den Text einer weiteren Überschrift, einen Level kleiner, unter der Ersten.                                                                            | `string \| undefined`                                                   | `undefined` |
| `_variant`            | `_variant`            | Defines which variant should be used for presentation.                                                                                                       | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "strong" \| undefined` | `undefined` |


## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Inhalt der Überschrift. |


----------------------------------------------


