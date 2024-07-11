# Drawer (Sidebar) `preview`

Synonyme: Modal, Modal dialog, Corner Dialog, Prompt

<kol-alert _type="warning" _variant="card">
  <kol-badge _color="#476af5" _label="Preview"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da die Barrierefreiheitstests noch ausstehen. Die verschiedenen Tests können aufgrund der Modularität bei neuen Komponenten und Funktionalitäten meist erst nach einem Release erfolgen. Wir empfehlen daher, die Komponente noch nicht in Produktion zu verwenden.
</kol-alert>

Mit Hilfe der **Drawer**-Komponente können zusätzliche Informationen oder auch Navigationselemente in einem ausklappbaren Seitenfenster angezeigt werden. Ein offener Drawer kann als Modal (\_modal) via ESC geschlossen werden. Die **Drawer**-Komponente ist standardmäßig versteckt. Sie wird i.d.R. erst nach Klick auf einen Button oder sonstigem Trigger angezeigt bzw. controlled mit dem Attribut \_open gesteuert.

```html
<kol-drawer _label="Drawer" _open _modal _align="top"> </kol-drawer>
```

### Beispiel

#### Uncontrolled

<kol-drawer
id="example-drawer"
\_align="left"
\_label="Drawer"

>

    <div>
        <p>Dies ist der Inhalt des Drawers. Hier können Sie beliebige HTML-Elemente einfügen.</p>
        <kol-button class="close-drawer" _label="Schließen"></kol-button>
    </div>

</kol-drawer>
<kol-button id="drawer-open-button" _label="Drawer öffnen"></kol-button>

<script>
  const drawer = document.querySelector('#example-drawer');
  const drawerOpenButton = document.querySelector('#drawer-open-button');

  function openDrawer() {
    drawer.open();
  }

  function closeDrawer() {
    drawer.close();
  }

  document.querySelectorAll('.close-drawer').forEach((b) => (b.onclick = closeDrawer));
  drawerOpenButton.onclick = openDrawer;
</script>

#### Uncontrolled Modal

<kol-drawer
\_modal
\_align="left"
\_label="Drawer"

> </kol-drawer>

#### Controlled

<kol-drawer
\_open=true
\_align="left"
\_label="Drawer"

> </kol-drawer>

<kol-drawer
\_open=true
\_align="left"
\_label="Drawer"

> </kol-drawer>

## Verwendung

Um den **Drawer** programmgesteuert zu öffnen und zu schließen, verwenden Sie die Methoden **`open()`** und **`close()`**. Stellen Sie sicher, dass das **`_label`** Attribut gesetzt ist, um die Zugänglichkeit zu gewährleisten. Die Ausrichtung des Drawers können Sie mit dem **`_align`** Attribut und den Werten **left**, **top**, **right** oder **bottom** anpassen, um ihn auf der gewünschten Seite des Bildschirms anzuzeigen. Wenn Sie den **Drawer** als **Modal** verwenden möchten, aktivieren Sie das **`_modal`** Attribut, um den Hintergrund abzudunkeln und den Fokus auf den Drawer-Inhalt zu lenken. Zudem nutzen Sie das **`_on`** Attribut, um benutzerdefinierte Aktionen beim Schließen des Drawers auszuführen. Ein offenes **Modal** kann via **ESC** geschlossen werden.

## Barrierefreiheit

Das \_label Attribut stellt eine klare und verständliche Beschriftung für den Drawer bereit. Dies verbessert die Nutzung für Personen, die Screenreader verwenden, da das Label als **`aria-label`** fungiert und somit die Bedeutung und Funktion des Drawers erklärt.

### Drawer als Modal

Beim Öffnen des **Drawers** wird der Fokus automatisch auf den Inhalt des Drawers gesetzt. Dies stellt sicher, dass Benutzer von Screenreadern sofort wissen, dass ein neuer Bereich geöffnet wurde, und dass sie direkt interagieren können. Beim Schließen des Drawers wird der Fokus zum vorherigen aktiven Element zurückgeführt, was eine nahtlose Benutzererfahrung bietet.

Die **Drawer**-Komponente unterstützt die vollständige Navigation über die Tastatur. Benutzer können mit der Tab-Taste durch die interaktiven Elemente innerhalb des Drawers navigieren. Zudem kann der **Drawer** mit der ESC-Taste schnell und einfach geschlossen werden, was die Bedienung erleichtert.

Während der **Drawer** (als Modal) geöffnet ist, werden alle selektierbaren Elemente außerhalb des Drawers deaktiviert. Dies verhindert ungewollte Interaktionen mit dem Hintergrundinhalt und lenkt die Aufmerksamkeit der Benutzer auf den **Drawer**-Inhalt.

### Tastatursteuerung

| Taste       | Funktion                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------- |
| `Tab`       | Bei geöffnetem Drawer werden alle fokussierbaren Elemente der Reihenfolge nach angesprungen. |
| `ESC-Taste` | Schließt den Drawer.                                                                         |

## Animationen

Optional können Animationen mit Keyframes hinzugefügt werden. Dabei ist es wichtig, dass die Keyframes die Namen `slideIn` bzw. `slideOut` enthalten und auf der Klasse `drawer__wrapper` definiert werden.

**Beispiel:**

```scss
.drawer__wrapper {
	&--left {
		animation: slideInLeft $duration forwards;
		&.is-closing {
			animation: slideOutLeft $duration forwards !important;
		}
	}
	&--right {
		animation: slideInRight $duration forwards;
		&.is-closing {
			animation: slideOutRight $duration forwards;
		}
	}
	&--top {
		animation: slideInTop $duration forwards;
		&.is-closing {
			animation: slideOutTop $duration forwards;
		}
	}
	&--bottom {
		animation: slideInBottom $duration forwards;
		&.is-closing {
			animation: slideOutBottom $duration forwards;
		}
	}
}
```

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog" _target="_blank"></kol-link>
- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                                        | Type                                                      | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------- |
| `_align`              | `_align`  | Specifies the orientation of the drawer.                                                                           | `"bottom" \| "left" \| "right" \| "top" \| undefined`     | `undefined` |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                  | `undefined` |
| `_modal`              | `_modal`  | Indicates whether the drawer is a modal.                                                                           | `boolean \| undefined`                                    | `undefined` |
| `_on`                 | --        | Specifies the EventCallback function to be called when the drawer is closing.                                      | `undefined \| ({ onClose?: (() => void) \| undefined; })` | `undefined` |
| `_open`               | `_open`   | Specifies the default open state of the drawer.                                                                    | `boolean \| undefined`                                    | `undefined` |

## Methods

### `close() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `open() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description            |
| ---- | ---------------------- |
|      | The Content of drawer. |

---
