# Accordion

Die **Accordion**-Komponente ist ein Aufklapp-Menü. Klickt man auf den Kopfbereich, bestehend aus Icon und Überschrift, klappt der Inhalt mit zusätzlichen Informationen auf. Somit ist es ein interaktives Navigationselement, welches dazu dient, umfangreiche Inhalte platzsparend darzustellen.

Accordions kommen immer dann zum Einsatz, wenn einem thematischen Oberbegriff zugeordnete Inhalte angezeigt oder verborgen werden sollen. Sie erlauben umfangreichere Detailinformationen zu einem Oberbegriff, als es aus Gründen der Übersichtlichkeit eigentlich sinnvoll wäre. Sie überlassen es den Besucher:innen selbst, ob sie sich diese Informationen anzeigen lassen möchten.

## Konstruktion

### Code

```html
<div class="grid gap-2">
	<kol-accordion _label="Element 1">
		<div>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</div>
	</kol-accordion>
	<kol-accordion _label="Element 2">
		<div>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</div>
	</kol-accordion>
</div>
```

### Beispiel

<div class="grid gap-2">
	<kol-accordion _label="Element 1">
		<div>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</div>
	</kol-accordion>
	<kol-accordion _label="Element 2">
		<div>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</div>
	</kol-accordion>
</div>

## Verwendung

### Überschrift im Accordion-Tab

Der Text, der als Überschrift im Accordion-Tab angezeigt werden soll, wird durch das Attribut **`_label`** übergeben. Der Text kann neben Sonderzeichen auch Umlaute oder Leerzeichen enthalten.

### Überschriftenebene

Die Überschriftenebene wird durch das Attribut **`_level`** übergeben. Möglich sind die Level **1** bis **6**

### Inhalt des Accordion

Der Hauptinhalt des Accordions wird über deb Slot übergeben.

**`<kol-accordion _label="Element 1">Accordion-Inhalt</kol-accordion>`**

### Accordion geöffnet anzeigen

Standardmäßig wird das Accordion nach dem Laden der Seite im geschlossenen Zustand angezeigt. Soll das Accordion geöffnet angezeigt werden, setzen Sie das Attribut **\_open** zusätzlich ein.

### Best practices

- Verwenden Sie ein Accordion, um lange Textabschnitte unter einem thematischen Oberbegriff zusammenzufassen
- Verwenden Sie ein Accordion, um weniger wichtige Informationen, als Ergänzung zu Hauptinformationen, zur Verfügung zu stellen.
- Mit einem Accordion können Sie die Länge Ihrer Webseite deutlich reduzieren und stellen gleichzeitig die Erreichbarkeit aller Informationen für die Nutzer:innen sicher.
- Verwenden Sie eindeutige Überschriften, um die Nutzer:innen auf die weiteren Informationen des Accordions hinzuweisen.
- Vermeiden Sie, wichtige `Call-To-Action`-Elemente innerhalb eines Accordions zu verbergen.
- Lassen Sie Fehlermeldungen nicht innerhalb des Accordions anzeigen, um zu vermeiden, dass Nutzer:innen wichtige Informationen übersehen.
- Verwenden Sie ein Accordion nicht als Auswahl-Element für Nutzer:innen.
- Verwenden Sie ein Accordion nicht, um wichtige Informationen zu rechtlichen Angaben oder zum Datenschutz anzuzeigen.

### Anwendungsfälle

- Häufig gestellte Fragen (FAQ)

## Barrierefreiheit

In der **Accordion**-Komponente wird das Öffnen-/Schließen-Icon links ausgerichtet, um Nutzer:innen mit eingeschränktem Sichtfeld eine bessere Bedienbarkeit zu ermöglichen.

Es wurde bewusst auf die Verwendung von Icons, wie z.B. `<` oder `>` verzichtet. Die Verwendung der Icons `+` und `-` gewährleistet eine bessere Sicht- und Erkennbarkeit bezüglich des Geöffnet- und Geschlossen-Status.

Bei der farblichen Gestaltung wurde besonders Wert auf einen höchstmöglichen Kontrast in der
Standardansicht gelegt.

### Tastatursteuerung

| Taste   | Funktion                                             |
| ------- | ---------------------------------------------------- |
| `Tab`   | Springt die einzelnen Accordion-Tabs an.             |
| `Enter` | Öffnet bzw. schließt den fokussierten Accordion-Tab. |

## Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#accordion" _target="_blank"></kol-link>

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute   | Description                                                                                                        | Type                                                                                 | Default     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------- |
| `_disabled`           | `_disabled` | Makes the element not focusable and ignore all events.                                                             | `boolean \| undefined`                                                               | `false`     |
| `_label` _(required)_ | `_label`    | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                             | `undefined` |
| `_level`              | `_level`    | Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.                  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| undefined`                                       | `1`         |
| `_on`                 | --          | Gibt die EventCallback-Funktionen an.                                                                              | `undefined \| { onClick?: EventValueOrEventCallback<Event, boolean> \| undefined; }` | `undefined` |
| `_open`               | `_open`     | If set (to true) opens/expands the element, closes if not set (or set to false).                                   | `boolean \| undefined`                                                               | `false`     |


## Slots

| Slot | Description                                                                     |
| ---- | ------------------------------------------------------------------------------- |
|      | Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des Accordions. |


----------------------------------------------


