# Spin

Synonyme: Placeholder, Placeholders, Skeleton, Shimmer

Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.

## Konstruktion

### Code

```html
<style>
	/* https://github.com/vineethtrv/css-loader */
	.loader {
		animation: rotation 2s linear infinite;
		border-color: #444;
		border-radius: 50%;
		border-style: solid solid dotted dotted;
		border-width: 3px;
		box-sizing: border-box;
		display: inline-block;
		height: 48px;
		position: relative;
		width: 48px;
	}
	.loader::after {
		animation: rotationBack 1s linear infinite;
		border-color: #ff3d00;
		border-radius: 50%;
		border-style: solid solid dotted;
		border-width: 3px;
		box-sizing: border-box;
		bottom: 0;
		content: '';
		height: 24px;
		left: 0;
		margin: auto;
		position: absolute;
		right: 0;
		top: 0;
		transform-origin: center center;
		width: 24px;
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
	<kol-spin _show _variant="cycle"></kol-spin>
	<!-- for a11y experts - own animation -->
	<kol-spin _show _variant="none">
		<!-- slot for own animation : https://github.com/vineethtrv/css-loader -->
		<span className="loader" slot="expert"></span>
	</kol-spin>
</div>
```

<kol-alert _label_="Reduce Motion" _level="4" _type="warning">
Wenn möglich sollte stets auf Animationen verzichtet werden. Wenn Animationen genutzt werden, sollte immer darauf geachtet werden, eine Variante mit reduzierter Animationsgeschwindigkeit anzubieten. Mehr Informationen dazu findet sich hier:
<kol-link _href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" _label="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" _target="_blank"></kol-link>
</kol-alert>

### Beispiel

<kol-spin _show></kol-spin>
<kol-spin _show _variant="cycle"></kol-spin>
<kol-spin _show _variant="none"><span className="loader" slot="expert"></span></kol-spin>

<kol-details _label="CSS Loaders & Spinners" _open>
Es gibt im Internet viele verschiedene CSS Loaders und Spinners. Beispielsweise bietet _Vineeth_ eine ganze Reihe interessanter CSS Loaders an. Diese können auch in der KoliBri Bibliothek genutzt werden. Dazu muss lediglich der Link zu der entsprechenden CSS Datei in den Head der HTML Datei eingebunden werden. Anschließend kann die gewünschte Animation über den Expert-Slot in die KoliBri-Komponente eingebunden werden. Hier sind einige Beispiele (ohne reduzierte Animationsgeschwindigkeit):
<kol-link _href="https://github.com/vineethtrv/css-loader" _target="_blank" _target="_blank"></kol-link>
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

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                            | Type                                      | Default |
| ---------- | ---------- | ------------------------------------------------------ | ----------------------------------------- | ------- |
| `_show`    | `_show`    | Makes the element show up.                             | `boolean \| undefined`                    | `false` |
| `_variant` | `_variant` | Defines which variant should be used for presentation. | `"cycle" \| "dot" \| "none" \| undefined` | `'dot'` |

---
