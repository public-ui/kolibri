# Token-Based-Theme für KoliBri

Das _Token-Based-Theme_ ist ein Theme, das mit minimalen Anpassungen sofort verwendet werden kann. Es bringt bereits alle notwendigen Stylings mit und kann
über Design Tokens, in Form von _CSS Custom Properties_ an das eigene Design angepasst werden.

## Variablen

| Variable                          | Standard-Wert                                                    | Bedeutung                                          |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| `--kolibri-border-radius`         | `5px`                                                            | Border-Radius für abgerundete Elemente             |
| `--kolibri-font-family`           | `BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif` | Allgemeine Schriftart                              |
| `--kolibri-font-size`             | `16px`                                                           | Allgemeine Schriftgröße                            |
| `--kolibri-spacing`               | `0.25rem`                                                        | Allgemeiner Abstand zwischen Elementen             |
| `--kolibri-border-width`          | `1px`                                                            | Allgemeine Rahmen-Breite                           |
| `--kolibri-color-primary`         | `#004b76`                                                        | Primärfarbe                                        |
| `--kolibri-color-primary-variant` | `#0077b6`                                                        | Alternative Variante der Primärfarbe               |
| `--kolibri-color-danger`          | `#c0003c`                                                        | Farbe für Fehlermeldungen und gefährliche Aktionen |
| `--kolibri-color-warning`         | `#c44931`                                                        | Farbe für Warnungen                                |
| `--kolibri-color-success`         | `#005c45`                                                        | Farbe für Erfolgsmeldungen                         |
| `--kolibri-color-subtle`          | `#576164`                                                        | Farbe für feine Akzente wie z.B. Rahmen            |
| `--kolibri-color-light`           | `#ffffff`                                                        | Helle Farbe für z.B. Hintergründe                  |
| `--kolibri-color-text`            | `#202020`                                                        | Textfarbe                                          |
| `--kolibri-color-mute`            | `#f2f3f4`                                                        | Farbe für deaktivierte Elemente                    |
| `--kolibri-color-mute-variant`    | `#bec5c9`                                                        | Alternative Farbe für deaktivierte Elemente        |

## Verwendung

Theme importieren und registrieren:

```js
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { TOKEN_BASED } from '@public-ui/themes';

register(TOKEN_BASED, defineCustomElements);
```

Für mehr Details und weitere Optionen siehe [Erste Schritte](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt).

Um die _Design Tokens_ anzupassen, reicht ein einfaches Stylesheet, das die gewünschten Custom Properties überschreibt. Es ist dabei nicht notwendig, alle Properties zu setzen, sondern nur solche, die auch überschrieben werden sollen. Beispiel:

```css
:root {
	--kolibri-border-radius: 3px;
	--kolibri-font-size: 18px;
	--kolibri-spacing: 0.3rem;
	--kolibri-color-primary: #cc006e;
	--kolibri-color-primary-variant: #ff64b9;
}
```
