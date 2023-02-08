# Modal

Mit Hilfe der **Modal**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem
Dialogfenster angezeigt werden. Sie wird nach Klick auf einen Button aufgerufen und über ein eigenes
Close-Icon wieder geschlossen. Die **Modal**-Komponente basiert auf der **Card**-Komponente und ist standardmäßig versteckt. Sie wird i.d.R.
erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt
des Modal-Fensters ist aktiv. Das **Modal**-Fenster wird über ein **Close-Icon** oben rechts im Kopfbereich wieder
geschlossen.

## Funktionsweise

Das **Modal** realisiert die Basis für barrierefreie Overlays und ermöglicht es beliebige HTML-Inhalte anzuzeigen. Beispielsweise wäre eine Dialog-Komponente eine Komposition aus einer Card-Komponente die in einer **Modal**-Komponente eingefügt wird.

Sobald ein **Modal** geöffnet wird, werden alle selektierbaren Elemente in der Webseite deaktiviert, außer die innerhalb des aktiven Modals.

Werden mehrere **Modale** nach einander geöffnet, dann wird immer nur das letzte geöffnete angezeigt. Die **Modale** werden nach dem _Last In – First Out_ -Prinzip (LIFO) angezeigt, wobei die einzelnen **Modale** in beliebiger Reihenfolge wieder geschlossen werden können.

## Konstruktion

### Code

> Um das Zusammenspiel von Komponenten (HTML) und Controller (TypeScript) gemeinsam darzustellen, wurden alle Code-Beispiele auf dieser Seite mit den Web Components im TSX geschrieben.

```html
<kol-modal
  _activeElement={this.state.activeElement}
  _aria-label="Beschreibung zur Modalbox"
  _on={{
    onClick: (event: Event) => {
      this.setState({
        activeElement: null // schließt das Modal
      })
    }
  }}
  _width="400px"
>
  <kol-card _heading="Vorgang löschen" _has-footer>
    <p slot="content">Wollen Sie den Vorgang wirklich löschen?</p>
    <div slot="footer">
      <kol-button _label="Ok" _variant="primary"></kol-button>
      <kol-button _label="Abbrechen"></kol-button>
    </div>
  </kol-card>
</kol-modal>
<kol-button
  _on={{
    onClick: (event: Event) => {
      this.setState({
        activeElement: event.target as HTMLElement // öffnen das Modal
      })
    }
  }}
  _label="Modal öffnen"
></kol-button>
```

## Verwendung

Über das Attribut `_width` geben Sie die gewünschte Breite der Modalbox an. Sie wird in der gewählten Größe immer mittig auf dem Bildschirm angezeigt.

Da das Modal vom eigentlichen Modal entkoppelt ist, aber für eine teilweisen Sperrung der Inhalte sorgt. Muss es auch eine Möglichkeit bieten, das Schließen (Sperrung aufheben) aus dem Modal-Kontext zu ermöglichen. Das wird durch einen optionalen Schließen-Button rechts oben in der Ecke sichergestellt.

<kol-alert _type="info">Standardmäßig wird die Modalbox mit einem **Close-Button** oben rechts gerendert. Diese Position ist aktuell fix und kann nicht geändert werden. Es ist aber möglich innerhalb der Modalbox einen eigenen Close-Button einzubauen und den Standardbutton auszublenden.</kol-alert>

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

Wird das **Modal** geschlossen, liegt der Fokus wieder auf dem Element, welches ursprünglich das **Modal** geöffnet hatte.

Bei der Realisierung dieser Funktionalität haben wir auf die Verwendung der CSS-Properties `user-select` und `pointer-events` verzichtet, um das Navigieren aus der Webseite in die Browser-Menü's weiterhin zu ermöglichen. Ebenfalls haben wir darauf verzichtet die _Event-Propagation_ zu manipulieren.

Achten Sie für eine optimale Ausgabe der **Modal**-Komponente in Screenreadern darauf, das Attribut **`aria-label`** korrekt zu setzen.

Beim Öffnen eines Modals, muss der Entwickler:in das aktive Element übergeben, zu dem nach dem Schließen des Modals automatisch der Fokus gesetzt werden soll.

Des Weiteren gibt es immer nur maximal ein aktives Modal, welches alle selektierbaren Elemente deaktiviert außer die innerhalb des eigenen Modals. Hierbei ist zu beachten, dass KoliBri nur Elemente deaktiviert die sich im Browser-Seitenbereich befinden. Das Fokussieren den Browser-Menü's ist weiterhin möglich.

Zusätzlich stellt die Komponente sicher, dass die Darstellung beliebiger Inhalte bei beliebiger Zoomstufe barrierefrei bleibt. Hierzu wird ein vertikaler Scroll-Balken bei bedarf verwendet.

### Tastatursteuerung

| Taste   | Funktion                                                                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`   | Fokussiert den Aufrufbutton des Modal. Bei geöffnetem Modal werden alle fokussierbaren Elemente der Reihenfolge nach angesprungen, insbesondere auch der Close-Button des Modal. |
| `Enter` | Öffnet das Modal.                                                                                                                                                                |
| `Leer`  | Öffnet das Modal.                                                                                                                                                                |

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
| `_show`                   | `_show`       | Gibt an, ob das Modal angezeigt wird.                                                   | `boolean \| undefined`                                          | `false`     |
| `_width`                  | `_width`      | Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).                   | `string \| undefined`                                           | `'100%'`    |

## CSS Custom Properties

| Name                        | Description                     |
| --------------------------- | ------------------------------- |
| `--kolibri-border-color`    | Default color of the border.    |
| `--kolibri-border-radius`   | Default radius of the border.   |
| `--kolibri-border-width`    | Default width of the border.    |
| `--kolibri-color-danger`    | Default color of the danger.    |
| `--kolibri-color-disabled`  | Default color of the disabled.  |
| `--kolibri-color-error`     | Default color of the error.     |
| `--kolibri-color-ghost`     | Default color of the ghost.     |
| `--kolibri-color-info`      | Default color of the info.      |
| `--kolibri-color-normal`    | Default color of the normal.    |
| `--kolibri-color-primary`   | Default color of the primary.   |
| `--kolibri-color-secondary` | Default color of the secondary. |
| `--kolibri-color-success`   | Default color of the success.   |
| `--kolibri-color-warning`   | Default color of the warning.   |

---
