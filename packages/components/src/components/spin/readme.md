# Spin

Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.

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

- Verwenden Sie Ladeanzeigen, um die Nutzer:innen über einen Ladezustand oder einen laufenden Prozess zu informieren.
- Verwenden Sie Ladeanzeigen an konsistenten Stellen in der Benutzeroberfläche, um die Benutzererfahrung zu verbessern.

### Anwendungsfälle

- Abrufen neuer oder aktualisierter Suchergebnisse.
- Einloggen in geschützte Bereiche.
- Download von Inhalten.
- Laden von umfangreichen Inhalten, z.B. Videos.

<!-- ## Barrierefreiheit -->

<!--## Links und Referenzen

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                               | Type                   | Default |
| -------- | --------- | --------------------------------------------------------- | ---------------------- | ------- |
| `_show`  | `_show`   | Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht. | `boolean \| undefined` | `false` |


----------------------------------------------


