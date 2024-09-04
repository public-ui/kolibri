# Modal

Synonyme: Dialog, Prompt

Mithilfe der **Modal**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem Dialogfenster angezeigt werden. Ein offenes **Modal** kann via **ESC** geschlossen werden.
Die **Modal**-Komponente ist standardmäßig versteckt. Sie wird i.d.R. erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt des Modal-Fensters ist aktiv.

### Funktionsweise

Das **Modal** realisiert die Basis für barrierefreie Overlays und ermöglicht es beliebige HTML-Inhalte anzuzeigen. Beispielsweise wäre eine Dialog-Komponente eine Komposition aus einer Card-Komponente, die in einer **Modal**-Komponente eingefügt wird.

Sobald ein **Modal** geöffnet wird, werden alle selektierbaren Elemente in der Webseite deaktiviert, außer die innerhalb des aktiven Modals.

### Konstruktion

#### Code

```html
<kol-modal id="test-modal" _label="Beschreibung zur Modalbox">
	<kol-card _label="Vorgang löschen">
		<div>
			<p>Wollen Sie den Vorgang wirklich löschen?</p>
			<kol-button class="close-modal" _label="Ok" _variant="primary"></kol-button>
			<kol-button class="close-modal" _label="Abbrechen"></kol-button>
		</div>
	</kol-card>
</kol-modal>

<kol-button id="modal-open-button" _label="Modal öffnen"></kol-button>

<script>
	const modal = document.querySelector('#test-modal');
	const modalOpenButton = document.querySelector('#modal-open-button');

	document.querySelectorAll('.close-modal').forEach((buttonElement) => {
		buttonElement._on = {
			onClick: () => modal.closeModal(),
		};
	});
	modalOpenButton._on = { onClick: () => modal.openModal() };
</script>
```

### Verwendung

Über das Attribut **`_width`** geben Sie die gewünschte Breite der Modalbox an. Sie wird in der gewählten Größe immer mittig auf dem Bildschirm angezeigt.

Da das Modal vom eigentlichen Seiteninhalt entkoppelt ist, aber für eine teilweise Sperrung der Inhalte sorgt, muss es auch eine Möglichkeit bieten, das Schließen (Sperrung aufheben) aus dem Modal-Kontext zu ermöglichen.

<kol-alert _type="info">Es wird empfohlen einen Close-Button oben rechts einzubauen.</kol-alert>

Zum Öffnen des Modals können Sie mithilfe einer DOM-Referenz die Methode `openModal` verwenden, zum Schließen `closeModal`.

### Legacy Verwendung

Aus Kompatibilitätsgründen ist es weiterhin möglich, des Modal über die Eigenschaft `_activeElement` zu steuern. Ist die Eigenschaft (auf eine beliebige DOM-Node) gesetzt, wird das Modal gezeigt. Beim Entfernen wird das Modal entsprechend wieder ausgeblendet. Die Eigenschaft wird mit KoliBri Version 3 entfernt werden.

#### Best practices

- Verwenden Sie die Modalbox, um weiterführende Informationen zu einem Thema anzuzeigen.
- Verwenden Sie die Modalbox, um umfangreiche Inhalte optisch kompakter zu gestalten.
- Vermeiden Sie es, wichtige Informationen wie z.B. rechtliche Themen, auf die Nutzer:innen reagieren müssen, in Modalboxen zu platzieren.

#### Anwendungsfälle

- Nutzen Sie die Modalbox, als Erklärungshilfe zu einzelnen Eingabefeldern in Formularen.
- Nutzen Sie die Modalbox, um ergänzende Informationen erst nach Anforderung durch die Nutzer:innen anzuzeigen.
- Nutzen Sie die Modalbox, um ein Feedback zu Speichervorgängen oder ähnliches anzuzeigen, z.B. **_Vielen Dank für Ihre Rückmeldung_** nach Absenden eines Formulars.

### Barrierefreiheit

> Die optische Standardausgabe der Komponente ist auf die Umsetzung der Barrierefreiheit hin optimiert. Wenn Sie eigene Custom Styles verwenden, kann das zu einer Einschränkung der Barrierefreiheit führen.

Das **Modal** ist so realisiert, dass der Fokus darauf liegt, wenn es geöffnet wird. Elemente außerhalb des Modals sind dann nicht mehr fokussierbar.

Achten Sie für eine optimale Ausgabe der **Modal**-Komponente in Screenreadern darauf, das Attribut **`aria-label`** korrekt zu setzen.

Des Weiteren gibt es immer nur maximal ein aktives Modal, welches alle selektierbaren Elemente deaktiviert außer die innerhalb des eigenen Modals. Hierbei ist zu beachten, dass KoliBri nur Elemente deaktiviert, die sich im Browser-Seitenbereich befinden. Das Fokussieren des Browser-Menüs ist weiterhin möglich.

#### Tastatursteuerung

| Taste | Funktion                                                                                    |
| ----- | ------------------------------------------------------------------------------------------- |
| `Tab` | Bei geöffnetem Modal werden alle fokussierbaren Elemente der Reihenfolge nach angesprungen. |
| `ESC` | Schließt das Modal.                                                                         |

### Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#dialog_modal" _target="_blank"></kol-link>
- <kol-link _href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html" _target="_blank"></kol-link>
- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Overview

https://en.wikipedia.org/wiki/Modal_window

## Properties

| Property              | Attribute | Description                                                                                                                                                                  | Type                                                      | Default     |
| --------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------- |
| `_activeElement`      | --        | <span style="color:red">**[DEPRECATED]**</span> Use methode `openModal` and `closeModal` instead.<br/><br/>Legacy property - while set to an HTMLElement, the modal is open. | `HTMLElement \| null \| undefined`                        | `undefined` |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).                                                           | `string`                                                  | `undefined` |
| `_on`                 | --        | Defines the modal callback functions.                                                                                                                                        | `undefined \| ({ onClose?: (() => void) \| undefined; })` | `undefined` |
| `_width`              | `_width`  | Defines the width of the modal. (max-width: 100%)                                                                                                                            | `string \| undefined`                                     | `'100%'`    |

## Methods

### `closeModal() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `openModal() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description           |
| ---- | --------------------- |
|      | The modal's contents. |

---
