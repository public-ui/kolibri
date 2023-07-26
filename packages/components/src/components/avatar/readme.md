# Avatar

Die **Avatar**-Komponente zeigt das Avatar-Bild eines Benutzers, bzw. dessen Initialen, falls kein Bild vorhanden ist.

## Konstruktion

### Code

```html
<kol-avatar _label="Erika Maria Mustermann"></kol-avatar>
<kol-avatar _label="Erika"></kol-avatar>
<kol-avatar _src="https://example.com/image.webp" _label="Erika Maria Mustermann"></kol-avatar>
```

### Beispiele

<kol-avatar _label="Erika Maria Mustermann"></kol-avatar>
<kol-avatar _label="Erika"></kol-avatar>
<kol-avatar _src="https://placehold.co/400" _label="Erika Maria Mustermann"></kol-avatar>

## Verwendung

### Mit Bild

In der Standard-Ansicht zeigt die **Avatar**-Komponente ein Avatar-Bild. Hierzu muss das Attribut `_src` mit einer URL zum Bild angegeben werden.  
Zusätzlich ist es notwendig, das `_label`-Attribut mit dem Namen des Benutzers anzugeben, damit ein Alternativtext ausgezeichnet werden kann. 

### Ohne Bild

Die **Avatar**-Komponente kann auch ohne `_src`-Attribut verwendet werden und zeigt in diesem Fall die Initialen des Benutzers, basierend auf dem
`_label`-Attribut.

### Anwendungsfälle

Verwenden Sie die **Avatar**-Komponente, um das Bild eines Benutzers anzuzeigen.

## Barrierefreiheit

Bei der **Avatar**-Komponente wurden insbesondere folgende Punkte der Barrierefreiheit betrachtet:

- Die Komponente ist mit dem Namen des Benutzers als aria-label ausgezeichnet.
- Falls vorhanden, wird das Avatar-Bild mit einem Alternativtext beschrieben.
- Die Initialen, die alternativ zum Avatar-Bild gezeigt werden, werden als rein visuelles, semantisch nicht relevantes Element betrachtet und für Screenreader
entsprechend versteckt. 

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                           | Type                  | Default     |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `_label` _(required)_ | `_label`  | Defines the label, usually the name of the person, to render as alt text and to compute initials from | `string`              | `undefined` |
| `_src`                | `_src`    | Defines the image source to render                                                                    | `string \| undefined` | `undefined` |

## Dependencies

### Used by

- [kol-avatar](.)

### Depends on

- [kol-image](../image)

### Graph

```mermaid
graph TD;
  kol-avatar-wc --> kol-image
  kol-avatar --> kol-avatar-wc
  style kol-avatar-wc fill:#f9f,stroke:#333,stroke-width:4px
```

---
