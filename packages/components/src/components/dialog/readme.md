# Dialog

Mit Hilfe der **Dialog**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem Dialogfenster angezeigt werden. Ein offener **Dialog** kann via **ESC** geschlossen werden.
Die **Dialog**-Komponente ist standardmäßig versteckt. Sie wird i.d.R. erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt des Dialog-Fensters ist aktiv.

## Funktionsweise

Das **Dialog** realisiert die Basis für barrierefreie Overlays und ermöglicht es beliebige HTML-Inhalte anzuzeigen. Beispielsweise wäre eine Dialog-Komponente eine Komposition aus einer Card-Komponente die in einer **Dialog**-Komponente eingefügt wird.

Sobald ein **Dialog** geöffnet wird, werden alle selektierbaren Elemente in der Webseite deaktiviert, außer die innerhalb des aktiven Modals.

## Konstruktion

### Code

```html
<kol-dialog id="test-dialog">
	<kol-card _heading="Vorgang löschen" _has-footer style="background-color: bisque">
		<p slot="content">Wollen Sie den Vorgang wirklich löschen?</p>
		<div slot="footer">
			<kol-button class="close-dialog" _label="Ok" _variant="primary"></kol-button>
			<kol-button class="close-dialog" _label="Abbrechen"></kol-button>
		</div>
	</kol-card>
</kol-dialog>
<kol-button id="dialog-open-button" _label="Dialog öffnen"></kol-button>
<script>
	const dialog = document.querySelector('#test-dialog');
	const dialogOpenButton = document.querySelector('#dialog-open-button');
	function openDialog() {
		dialog._activeElement = dialogOpenButton;
	}
	function closeModal() {
		dialog._activeElement = null;
	}
	document.querySelectorAll('.close-dialog').forEach((b) => (b._on = { onClick: closeModal }));
	dialogOpenButton._on = { onClick: openDialog };
</script>
```

## Verwendung

Da der Dialog vom restlichen Seiteninhalt entkoppelt ist, aber für eine teilweisen Sperrung der Inhalte sorgt. Muss es auch eine Möglichkeit geben, das Schließen (Sperrung aufheben) aus dem Dialog-Kontext zu ermöglichen.

<kol-alert _type="info">Es wird empfohlen einen Schließen-Button oben rechts einzubauen.</kol-alert>

### Best practices

- Verwenden Sie den Dialog, um weiterführende Informationen zu einem Thema anzuzeigen.
- Verwenden Sie den Dialog, um umfangreiche Inhalte optisch kompakter zu gestalten.
- Vermeiden Sie es, wichtige Informationen wie z.B. rechtliche Themen, auf die Nutzer:innen reagieren müssen, in Dialogen zu platzieren.

### Anwendungsfälle

- Nutzen Sie den Dialog, als Erklärungshilfe zu einzelnen Eingabefeldern in Formularen.
- Nutzen Sie den Dialog, um ergänzende Informationen erst nach Anforderung durch die Nutzer:innen anzuzeigen.
- Nutzen Sie den Dialog, um ein Feedback zu Speichervorgängen oder ähnliches anzuzeigen, z.B. **_Vielen Dank für Ihre Rückmeldung_** nach Absenden eines Formulars.

## Barrierefreiheit

> Die optische Standardausgabe der Komponente ist auf die Umsetzung der Barrierefreiheit hin optimiert. Wenn Sie eigene Custom Styles verwenden, kann das zu einer Einschränkung der Barrierefreiheit führen.

Der **Dialog** ist so realisiert, dass der Fokus darauf liegt, wenn es geöffnet wird. Elemente außerhalb des Modals sind dann nicht mehr fokussierbar.

Wird der **Dialog** geschlossen, liegt der Fokus wieder auf dem Element, welches unter **`_activeElement`** angegeben wurde.

### Tastatursteuerung

| Taste | Funktion                                                                                     |
| ----- | -------------------------------------------------------------------------------------------- |
| `Tab` | Bei geöffnetem Dialog werden alle fokussierbaren Elemente der Reihenfolge nach angesprungen. |
| `ESC` | Schließt das Dialog.                                                                         |

## Links und Referenzen

- https://www.w3.org/TR/wai-aria-practices/#dialog_modal
- https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute     | Description                                                                                                                 | Type                                                            | Default     |
| ------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `_activeElement`          | --            | Gibt die Referenz auf das auslösende HTML-Element an, wodurch das Modal geöffnet wurde.                                     | `HTMLElement \| null \| undefined`                              | `undefined` |
| `_ariaLabel` _(required)_ | `_aria-label` | Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.). | `string`                                                        | `undefined` |
| `_on`                     | --            | Gibt die EventCallback-Function für das Schließen des Modals an.                                                            | `undefined \| { onClose?: EventCallback<Event> \| undefined; }` | `undefined` |
| `_width`                  | `_width`      | Setzt die Breite des Modals. (max-width: 100%).                                                                             | `string \| undefined`                                           | `'100%'`    |

## Slots

| Slot | Description            |
| ---- | ---------------------- |
|      | Der Inhalt des Modals. |

---
