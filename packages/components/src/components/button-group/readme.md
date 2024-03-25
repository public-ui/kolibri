# ButtonGroup

**Buttons** dienen dazu, Nutzer:innen Auswahlmöglichkeiten für Aktionen anzuzeigen und diese in einer klaren Hierarchie anzuordnen. Sie helfen den Nutzer:innen, die wichtigsten Aktionen einer Seite oder innerhalb eines Applikation zu finden und ermöglichen es ihm, diese Aktionen auszuführen.

Die **ButtonGroup**-Komponente fasst mehrere Buttons zu einer optischen und funktionalen Einheit zusammen.

## Konstruktion

Die Komponente **ButtonGroup** besteht aus einem Hauptelement `<kol-button-group></kol-button-group>`. In ihm werden beliebig viele **Button**-Komponenten zu einer Gruppe zusammengefasst. Die einzelnen **Buttons** entsprechen in ihrer Konstruktion der Beschreibung
zur **Button**-Komponente.

### Code

```html
<kol-button-group>
  <kol-button _label="Speichern" _variant="primary"></<kol-button>
  <kol-button _label="Speichern & Schließen" _variant="normal"></<kol-button>
  <kol-button _label="Abbrechen" _variant="secondary"></<kol-button>
  <kol-button _label="Löschen" _variant="danger"></<kol-button>
  <kol-button _label="Ghost" _variant="ghost"></kol-button>
  <kol-button _label="Deaktiviert" _disabled></<kol-button>
</kol-button-group>
```

### Beispiel

<kol-button-group> 
  <kol-button _label="Speichern" _variant="primary"></kol-button>
  <kol-button _label="Speichern & Schließen" _variant="normal"></kol-button>
  <kol-button _label="Abbrechen" _variant="secondary"></kol-button>
  <kol-button _label="Löschen" _variant="danger"></kol-button>
  <kol-button _label="Ghost" _variant="ghost"></kol-button>
  <kol-button _label="Deaktiviert" _disabled></kol-button>
</kol-button-group>

## Verwendung

### Einfache ButtonGroup

Im einfachsten Fall besteht die **ButtonGroup**-Komponente aus einer Liste beschrifteter Schaltflächen. Für die Beschriftung der Buttons wird lediglich das Attribut **`_label="Ihre Beschriftung"`** verwendet.

### ButtonGroup mit Text, Icon und Text mit Icon

Über das Attribut **`_icons="xxx"`** wird festgelegt, ob und welches Icon verwendet werden soll.

Eine Übersicht über die zur Verfügung stehenden Icons in KoliBri finden Sie <kol-link _href="https://icofont.com/icons" _label="https://icofont.com/icons" _target="_blank" _label="hier"></kol-link>.

Über das Attribut **`_hide-label`** legen Sie fest, ob nur das Icon angezeigt werden soll. Der Inhalt des Attributs **`_label`** wird nicht mehr angezeigt.

### Ausgabe verschiedener Styles für Buttons in der ButtonGroup

Für die Standardausgabe eines Buttons stehen die Werte **primary**, **secondary**, **normal**, **danger** und **ghost** zur Verfügung. Hierüber wird die farbliche Gestaltung des Buttons festgelegt.

### Optische Ausrichtung

Über das Attribut **`_nestled`** kann eine optische Ausrichtung der ButtonGroup bestimmt werden. An der angegebenen Position werden die abgerundeten Ecken entfernt, so dass der Eindruck einer Button-Leiste entsteht. Möglich sind die Werte `bottom`, `top`, `left`und `right`.

### Best practices

- Verwenden Sie eine primäre Schaltfläche für die nächstbeste Aktion. Verbleibende Calls-to-Actions sollten als sekundäre Schaltfläche dargestellt werden.
- Verwenden Sie Schaltflächen an einheitlichen Stellen in der Benutzeroberfläche, um die Benutzererfahrung zu verbessern.
- Verwenden Sie nur eine primäre Schaltfläche je Viewport. Auf der gesamten Seite kann ein Button-Style beliebig oft auftreten.
- Die Beschriftung des Button muss die Aktion beschreiben, die die Schaltfläche ausführt. Sie sollte ein Verb enthalten (z.B. Speichern). Verwenden Sie prägnante, spezifische, selbsterklärende Beschriftungen.
- Schaltflächenbeschriftungen sollten immer dann auch ein Nomen enthalten, wenn es Raum für Interpretationen darüber gibt, wofür das Verb zuständig ist. Verwenden Sie keine generischen Bezeichnungen wie "OK", insbesondere nicht im Fehlerfall. Fehler sind nie "OK".
- Wenn Sie mehrere Buttons kombinieren oder anordnen möchten, verwenden Sie die **ButtonGroup**-Komponente.
- Verwenden Sie nicht mehrere Buttons im Style "primär" in einer **ButtonGroup**.
- Verwenden Sie Buttons nicht als Link oder als Navigationselement.

## Barrierefreiheit

Bei Verwendung der **ButtonGroup**-Komponente sind keine besonderen Maßnahmen in Bezug auf die barrierefreiheit zu berücksichtigen. Die innerhalb der ButtonGroup enthaltenen **Button**-Komponenten besitzen jedoch einige wichtige Aspekte in diesem Zusammenhang:

- In der Button-Komponente werden die optionalen **Icons** links ausgerichtet, um Nutzer\*innen mit eingeschränktem Sichtfeld eine bessere Bedienbarkeit zu ermöglichen.
- Die Farben der **Variant-Typen** `primary`, `secondary`, `normal`, `danger` und `ghost` wurden in Hinblick auf bestmöglichen Kontrast gewählt. Die Schriftfarbe ist per default immer weiß.

### Tastatursteuerung

| Taste   | Funktion                                                                       |
| ------- | ------------------------------------------------------------------------------ |
| `Tab`   | Springt den einzelnen Button der ButtonGroup an und fokussiert ihn.            |
| `Enter` | Öffnet den Link des fokussierten Button oder führt dessen onClick-Methode aus. |

## Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#button" _label="https://www.w3.org/TR/wai-aria-practices/#button" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

---
