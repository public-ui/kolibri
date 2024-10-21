# Alert

Synonyme: Message

Die **Alert**-Komponente gibt ein optisches Feedback an die Nutzer:innen. Sie besteht aus einem farblich gestalteten Container, einer Überschrift, einem Inhaltstext sowie einem Icon. Das verwendete Icon und die farbliche Gestaltung sind abhängig vom Typ `_type` des Alert.

## Konstruktion

### Code

```html
<kol-alert _label="Überschrift im Alert" _level="1" _type="success">Textbereich im Alert</kol-alert>
<kol-alert _label="Überschrift im Alert" _level="2" _type="info" _variant="card">Textbereich im Alert</kol-alert>
```

### Beispiel

<kol-alert _label="Überschrift im Alert" _level="1" _type="success" >Textbereich im Alert</kol-alert>
<kol-alert _label="Überschrift im Alert" _level="2" _type="info" _variant="card">Textbereich im Alert</kol-alert>

## Verwendung

### Überschrift

Die **Überschrift** der Alert-Komponente wird über das Attribut `_label` bestimmt.

### Überschriftenebene

Die Überschriftenebene wird durch das Attribut **`_level`** übergeben. Möglich sind die Level **1** bis **6**

### Typ des Alert

Die **Alert**-Komponente bietet **vier** unterschiedliche Typen, die sich jeweils auf die farbliche Gestaltung und das verwendetet Icon im Alert beziehen. Zur Wahl stehen:

<ul>
<li>Success</li>
<li>Error</li>
<li>Info</li>
<li>Warning</li>
</ul>

Der Typ eines Alert wird über das Attribut `_type` festgelegt.

### Inhalt des Alert

Der Inhalt des Alert wird zwischen das öffnende Element `<kol-alert>` und das schließende `</kol-alert>` geschrieben. Der Inhalt kann aus beliebigem **HTML-Code**, aber auch aus weiteren **KoliBri**-Komponenten bestehen.

### Variante des Alert

Über das Attribut **`_variant`** kann festgelegt werden, in welcher Darstellungsvariante das Alert angezeigt wird. `msg` lässt die linke, farbig hinterlegte Spalte mit dem Icon über die gesamte Höhe des Alerts gehen, `card` setzt die linke Spalte nur neben die Überchrift.

### Best practices

- Verwenden Sie die **Alert**-Komponente an geeigneten Positionen auf Ihrer Webseite, um Informationen im richtigen Zusammenhang darzustellen.
- Verwenden Sie immer den richtigen **Type** der **Alert**-Komponente, um bei den Benutzer:innen die gewünschte Reaktion zu erzeugen. Vermeiden Sie bspw. den Typ **_Error_**, wenn Sie auf den erfolgreichen Abschluss eines Speichervorgangs hinweisen möchten.
- Vermeiden Sie, zu viele **Alert**-Komponenten auf einer Seite zu platzieren, da der Informationsgehalt von den Benutzer:innen dann oft nicht mehr als besonders wichtig wahrgenommen wird.

### Anwendungsfälle

- Verwenden Sie die **Alert**-Komponente, wenn Sie die Benutzer:innen auf Fehler bei der Eingabe in Formularen hinweisen möchten.
- Verwenden Sie die **Alert**-Komponente, um Nutzer:innen auf die erfolgreiche Ausführung von Funktionen hinzuweisen, z.B. **`Ihre Anfrage wurde erfolgreich gespeichert`**.
- Verwenden Sie die **Alert**-Komponente, um Nutzer:innen weitere Informationen zu einem Thema zur Verfügung zu stellen.

## Barrierefreiheit

Die **Alert**-Komponente wurde auf die Darstellung mit höchstmöglichen Kontrast optimiert.

Das zusätzliche Icon (je nach gewähltem Typ) gewährleistet, dass die Information vom Nutzer nicht allein über die Farbe klassifiziert werden muss.

Bei der Nutzung eines Screenreaders wird immer das Icon mitgelesen.
Der Titel sollte daher nicht mit dem **Alert**-Typ beginnen, da das zu einem doppelten Vorlesen des **Alert**-Typs führt.
<br>
Beispiel:
<br>
Richtig: Label = "Füllen Sie das Feld aus" -> Ausgabe: Fehler - Füllen Sie das Feld aus
<br>
Falsch: Label = "Fehler: Füllen Sie das Feld aus." -> Ausgabe: Fehler - Fehler: Füllen Sie das Feld aus

Bei der **Alert**-Komponente wurden insbesondere folgende Punkte der Barrierefreiheit betrachtet:

- Die Schriftfarbe ist entweder weiß oder schwarz.
- Die Schriftfarbe ist abhängig von der Hintergrundfarbe und wechselt immer auf die Schriftfarbe mit dem größeren Farbkontrast zur Hintergrundfarbe.
- Ist der Farbkontrast für AA nicht ausreichend, wird die Hintergrundfarbe überschrieben.

## Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#alert" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                                                        | Type                                                                    | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| `_alert`     | `_alert`      | Defines whether the screen-readers should read out the notification.                                               | `boolean \| undefined`                                                  | `false`     |
| `_hasCloser` | `_has-closer` | Defines whether the element can be closed.                                                                         | `boolean \| undefined`                                                  | `false`     |
| `_label`     | `_label`      | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string \| undefined`                                                   | `undefined` |
| `_level`     | `_level`      | Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.                  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| undefined`                          | `1`         |
| `_on`        | --            | Gibt die EventCallback-Function für das Schließen des Alerts an.                                                   | `undefined \| { onClose?: EventCallback<Event> \| undefined; }`         | `undefined` |
| `_type`      | `_type`       | Defines either the type of the component or of the components interactive element.                                 | `"default" \| "error" \| "info" \| "success" \| "warning" \| undefined` | `'default'` |
| `_variant`   | `_variant`    | Defines which variant should be used for presentation.                                                             | `"card" \| "msg" \| undefined`                                          | `'msg'`     |

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | Der Inhalt der Meldung. |

---
