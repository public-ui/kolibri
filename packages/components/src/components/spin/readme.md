# Spin

Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.

## Konstruktion

### Code

```html
<style>
	/* https://github.com/vineethtrv/css-loader */
	.loader {
		width: 48px;
		height: 48px;
		border: 3px dotted #444;
		border-style: solid solid dotted dotted;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		animation: rotation 2s linear infinite;
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
		animation: rotationBack 1s linear infinite;
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

	/* https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#toning_down_the_animation_scaling */
	@media (prefers-reduced-motion) {
		.loader {
			animation-duration: 6s;
		}
		.loader::after {
			animation-duration: 3s;
		}
	}
</style>
<div>
	<kol-spin _show></kol-spin>
	<!-- for a11y experts - own animation -->
	<kol-spin _show="true" _variant="none">
		<!-- slot for own animation : https://github.com/vineethtrv/css-loader -->
		<span className="loader" slot="expert"></span>
	</kol-spin>
</div>
```

<kol-alert _heading="Reduce Motion" _level="4" _type="warning">Wenn möglich sollte stets auf Animationen verzichtet werden. Wenn Animationen genutzt werden, sollte immer darauf geachtet werden, eine Variante mit reduzierter Animationsgeschwindigkeit anzubieten. Mehr Informationen dazu findet sich hier:
<kol-link _label="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" _href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" _target="_blank"></kol-link></kol-alert>

### Beispiel

<kol-spin _show></kol-spin>

<kol-spin _show="true" _variant="none"><span className="loader" slot="expert"></span></kol-spin>

<kol-details _summary="CSS Loaders & Spinners" _open>
Es gibt im Internet viele verschiedene CSS Loaders und Spinners. Beispielsweise bietet _Vineeth_ eine ganze Reihe interessanter CSS Loaders an. Diese können auch in der KoliBri Bibliothek genutzt werden. Dazu muss lediglich der Link zu der entsprechenden CSS Datei in den Head der HTML Datei eingebunden werden. Anschließend kann die gewünschte Animation über den Expert-Slot in die KoliBri-Komponente eingebunden werden. Hier sind einige Beispiele (ohne reduzierte Animationsgeschwindigkeit):
<kol-link _label="https://github.com/vineethtrv/css-loader" _href="https://github.com/vineethtrv/css-loader" _target="_blank"></kol-link>
</kol-details>

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
