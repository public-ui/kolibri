# Spin

Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.

## Konstruktion

### Code

```html
<div>
	<kol-spin _show></kol-spin>
	<!-- for a11y experts - own animation -->
	<kol-spin _show="true" _variant="none">
		<!-- slot for own animation : https://github.com/vineethtrv/css-loader -->
		<span class="loader" slot="expert"></span>
	</kol-spin>
</div>
```

### Beispiel

<style>
  /* https://github.com/vineethtrv/css-loader */
  .loader {
    width: 48px;
    height: 48px;
    border: 3px dotted #3d3d3d;
    border-style: solid solid dotted dotted;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 4s linear infinite;
  }
  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px dotted #ff3d00;
    border-style: solid solid dotted;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    animation: rotationBack 2s linear infinite;
    transform-origin: center center;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style>

<kol-spin _show></kol-spin>
<kol-spin _show="true" _variant="none">
<span class="loader" slot="expert"></span>
</kol-spin>

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

| Property   | Attribute  | Description                                                                  | Type                               | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `_show`    | `_show`    | Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.                    | `boolean \| undefined`             | `false`     |
| `_variant` | `_variant` | Gibt an, welche Ladeanimation oder ob keine Animation verwendet werden soll. | `"default" \| "none" \| undefined` | `'default'` |

---
