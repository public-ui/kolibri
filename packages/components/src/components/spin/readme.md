# Spin

Lader, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.

## Konstruktion

### Code

```html
<div>
	<kol-spin _show />
</div>
```

### Beispiel

<kol-spin _show></kol-spin>

## Verwendung

Verwenden Sie das Attribut `_show` um festzulegen, ob der Spin angezeigt wird.

### Best practices

- Verwenden Sie Lader, um die Nutzer:innen über einen Ladezustand oder einen laufenden Prozess zu informieren.
- Verwenden Sie Lader an konsistenten Stellen in der Benutzeroberfläche, um die Benutzererfahrung zu verbessern.
- Verwenden Sie einen Lader, um anzuzeigen, wie viel Arbeit noch übrig ist, bevor das Ergebnis angezeigt werden kann.

### Anwendungsfälle

- Abrufen neuer oder aktualisierter Suchergebnisse.
- Einloggen in geschützte Bereiche.
- Download von Inhalten.
- Laden von umfangreichen Inhalten, z.B. Videos.

## Barrierefreiheit

<!--## Links und Referenzen

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                               | Type                   | Default |
| -------- | --------- | --------------------------------------------------------- | ---------------------- | ------- |
| `_show`  | `_show`   | Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht. | `boolean \| undefined` | `false` |

## CSS Custom Properties

| Name                        | Description                     |
| --------------------------- | ------------------------------- |
| `--kolibri-border-color`    | Default color of the border.    |
| `--kolibri-border-radius`   | Default radius of the border.   |
| `--kolibri-border-width`    | Default width of the border.    |
| `--kolibri-color-black`     | Default color of black (dark).  |
| `--kolibri-color-danger`    | Default color of the danger.    |
| `--kolibri-color-disabled`  | Default color of the disabled.  |
| `--kolibri-color-error`     | Default color of the error.     |
| `--kolibri-color-ghost`     | Default color of the ghost.     |
| `--kolibri-color-info`      | Default color of the info.      |
| `--kolibri-color-normal`    | Default color of the normal.    |
| `--kolibri-color-primary`   | Default color of the primary.   |
| `--kolibri-color-secondary` | Default color of the secondary. |
| `--kolibri-color-success`   | Default color of the success.   |
| `--kolibri-color-text`      | Default color of the text.      |
| `--kolibri-color-visited`   | Default color of the visited.   |
| `--kolibri-color-warning`   | Default color of the warning.   |
| `--kolibri-color-white`     | Default color of white (light). |
| `--kolibri-font-family`     | Default font family.            |
| `--kolibri-font-size`       | Default font size.              |

---
