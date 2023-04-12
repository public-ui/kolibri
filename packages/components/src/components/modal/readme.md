# Modal

Mit Hilfe der **Modal**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem Dialogfenster angezeigt werden. Ein offenes **Modal** kann via **ESC** geschlossen werden.
Die **Modal**-Komponente ist standardmäßig versteckt. Sie wird i.d.R. erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt des Modal-Fensters ist aktiv.

## Funktionsweise

Das **Modal** realisiert die Basis für barrierefreie Overlays und ermöglicht es beliebige HTML-Inhalte anzuzeigen. Beispielsweise wäre eine Dialog-Komponente eine Komposition aus einer Card-Komponente die in einer **Modal**-Komponente eingefügt wird.

Sobald ein **Modal** geöffnet wird, werden alle selektierbaren Elemente in der Webseite deaktiviert, außer die innerhalb des aktiven Modals.

## Konstruktion

### Code

```html
<kol-modal id="test-modal" _aria-label="Beschreibung zur Modalbox">
	<kol-card _heading="Vorgang löschen" _has-footer style="background-color: bisque">
		<p slot="content">Wollen Sie den Vorgang wirklich löschen?</p>
		<div slot="footer">
			<kol-button class="close-modal" _label="Ok" _variant="primary"></kol-button>
			<kol-button class="close-modal" _label="Abbrechen"></kol-button>
		</div>
	</kol-card>
</kol-modal>
<kol-button id="modal-open-button" _label="Modal öffnen"></kol-button>
<script>
	const modal = document.querySelector('#test-modal');
	const modalOpenButton = document.querySelector('#modal-open-button');
	function openModal() {
		modal._activeElement = modalOpenButton;
		modal._open = true;
	}
	function closeModal() {
		modal._activeElement = null;
	}
	document.querySelectorAll('.close-modal').forEach((b) => (b._on = { onClick: closeModal }));
	modalOpenButton._on = { onClick: openModal };
</script>
```

## Verwendung

Über das Attribut **`_width`** geben Sie die gewünschte Breite der Modalbox an. Sie wird in der gewählten Größe immer mittig auf dem Bildschirm angezeigt.

Da das Modal vom eigentlichen Modal entkoppelt ist, aber für eine teilweisen Sperrung der Inhalte sorgt. Muss es auch eine Möglichkeit bieten, das Schließen (Sperrung aufheben) aus dem Modal-Kontext zu ermöglichen.

<kol-alert _type="info">Es wird empfohlen einen Close-Button oben rechts einzubauen.</kol-alert>

Das **Modal** hat einen `z-index` von `100`.

### Best practices

- Verwenden Sie die Modalbox, um weiterführende Informationen zu einem Thema anzuzeigen.
- Verwenden Sie die Modalbox, um umfangreiche Inhalte optisch kompakter zu gestalten.
- Vermeiden Sie es, wichtige Informationen wie z.B. rechtliche Themen, auf die Nutzer:innen reagieren müssen, in Modalboxen zu platzieren.

### Anwendungsfälle

- Nutzen Sie die Modalbox, als Erklärungshilfe zu einzelnen Eingabefeldern in Formularen.
- Nutzen Sie die Modalbox, um ergänzende Informationen erst nach Anforderung durch die Nutzer:innen anzuzeigen.
- Nutzen Sie die Modalbox, um ein Feedback zu Speichervorgängen oder ähnliches anzuzeigen, z.B. **_Vielen Dank für Ihre Rückmeldung_** nach Absenden eines Formulars.

## Barrierefreiheit

> Die optische Standardausgabe der Komponente ist auf die Umsetzung der Barrierefreiheit hin optimiert. Wenn Sie eigene Custom Styles verwenden, kann das zu einer Einschränkung der Barrierefreiheit führen.

Das **Modal** ist so realisiert, dass der Fokus darauf liegt, wenn es geöffnet wird. Elemente außerhalb des Modals sind dann nicht mehr fokussierbar.

Wird das **Modal** geschlossen, liegt der Fokus wieder auf dem Element, welches unter **`_activeElement`** angegeben wurde.

Bei der Realisierung dieser Funktionalität haben wir auf die Verwendung der CSS-Properties **`user-select`** und **`pointer-events`** verzichtet, um das Navigieren aus der Webseite in die Browser-Menü's weiterhin zu ermöglichen. Ebenfalls haben wir darauf verzichtet die _Event-Propagation_ zu manipulieren.

Achten Sie für eine optimale Ausgabe der **Modal**-Komponente in Screenreadern darauf, das Attribut **`aria-label`** korrekt zu setzen.

Des Weiteren gibt es immer nur maximal ein aktives Modal, welches alle selektierbaren Elemente deaktiviert außer die innerhalb des eigenen Modals. Hierbei ist zu beachten, dass KoliBri nur Elemente deaktiviert die sich im Browser-Seitenbereich befinden. Das Fokussieren den Browser-Menü's ist weiterhin möglich.

### Tastatursteuerung

| Taste | Funktion                                                                                    |
| ----- | ------------------------------------------------------------------------------------------- |
| `Tab` | Bei geöffnetem Modal werden alle fokussierbaren Elemente der Reihenfolge nach angesprungen. |
| `ESC` | Schließt das Modal.                                                                         |

## Links und Referenzen

- https://www.w3.org/TR/wai-aria-practices/#dialog_modal
- https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute     | Description                                                                             | Type                                                            | Default     |
| ------------------------- | ------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `_activeElement`          | --            | Gibt die Referenz auf das auslösende HTML-Element an, wodurch das Modal geöffnet wurde. | `HTMLElement \| null \| undefined`                              | `undefined` |
| `_ariaLabel` _(required)_ | `_aria-label` | Gibt den Text an, der die Navigation von anderen Navigationen differenziert.            | `string`                                                        | `undefined` |
| `_on`                     | --            | Gibt die EventCallback-Function für das Schließen des Modals an.                        | `undefined \| { onClose?: EventCallback<Event> \| undefined; }` | `undefined` |
| `_width`                  | `_width`      | Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).                   | `string \| undefined`                                           | `'100%'`    |

---
