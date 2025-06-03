# Tree

Synonyme: List, Navigation

Die **Tree**-Komponente stellt eine hierarchische Liste dar, in der jedes Element untergeordnete Einträge enthalten kann. Elemente mit Kindelementen lassen sich ein- oder ausklappen, um die untergeordnete Ebene anzuzeigen oder auszublenden.

### Code

```html
<kol-tree _label="Sitemap">
	<kol-tree-item _label="Home" _href="#" _active></kol-tree-item>
	<kol-tree-item _label="Page 1" _href="#" _open>
		<kol-tree-item _label="Subpage 1" _href="#" _open>
			<kol-tree-item _label="Product 1" _href="#"></kol-tree-item>
			<kol-tree-item _label="Product 2" _href="#"></kol-tree-item>
			<kol-tree-item _label="Product 3" _href="#"></kol-tree-item>
			<kol-tree-item _label="Product 4" _href="#"></kol-tree-item>
		</kol-tree-item>
		<kol-tree-item _label="Subpage 2" _href="#"></kol-tree-item>
		<kol-tree-item _label="Subpage 3" _href="#"></kol-tree-item>
		<kol-tree-item _label="Subpage 4" _href="#"></kol-tree-item>
	</kol-tree-item>
	<kol-tree-item _label="Page 2" _href="#"></kol-tree-item>
</kol-tree>
```

### Beispiel

<kol-tree _label="Sitemap">
	<kol-tree-item _label="Home" _href="#" _active></kol-tree-item>
  <kol-tree-item _label="Page 1" _href="#" _open>
    <kol-tree-item _label="Subpage 1" _href="#" _open>
      <kol-tree-item _label="Product 1" _href="#"></kol-tree-item>
      <kol-tree-item _label="Product 2" _href="#"></kol-tree-item>
      <kol-tree-item _label="Product 3" _href="#"></kol-tree-item>
      <kol-tree-item _label="Product 4" _href="#"></kol-tree-item>
    </kol-tree-item>
    <kol-tree-item _label="Subpage 2" _href="#"></kol-tree-item>
    <kol-tree-item _label="Subpage 3" _href="#"></kol-tree-item>
    <kol-tree-item _label="Subpage 4" _href="#"></kol-tree-item>
  </kol-tree-item>
  <kol-tree-item _label="Page 2" _href="#"></kol-tree-item>
</kol-tree>

## Verwendung

Die Tree-Komponente wird verwendet, um komplexe, hierarchisch aufgebaute Daten visuell darzustellen und benutzerfreundlich navigierbar zu machen. Sie ermöglicht es Nutzerinnen und Nutzern, sich effizient durch verschachtelte Strukturen zu bewegen und liefert dabei eine klare Übersicht über die Beziehungen zwischen über- und untergeordneten Elementen.

Typische Einsatzbereiche sind z. B. Navigationsleisten, Organisationsstrukturen, Dateiverzeichnisse oder Produktkataloge – überall dort, wo Inhalte strukturiert und mehrstufig angezeigt werden sollen.

Jeder Navigationspunkt wird über das Attribut `_label` beschriftet und kann optional über `_href` mit einem Ziel verlinkt werden. Mit dem Attribut `_active` lässt sich ein Element als aktuell aktiv markieren, während `_open` steuert, ob ein Element beim initialen Laden aufgeklappt ist.

### Tastatursteuerung

| Taste          | Funktion                                                                                                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`          | Fokussiert die Tree-Komponente, sodass sie per Tastatur bedient werden kann.                                                                                                                                                  |
| `↑ / ↓`        | Navigiert zwischen sichtbaren Elementen auf derselben Ebene.                                                                                                                                                                  |
| `→`            | Öffnet das Untermenü des aktuell fokussierten Elements (sofern vorhanden).                                                                                                                                                    |
| `←`            | Schließt das Untermenü (sofern geöffnet) oder verschiebt den Fokus auf das übergeordnete Element.                                                                                                                             |
| `Enter`        | Aktiviert das aktuell fokussierte Element. Wenn ein `_href`-Attribut vorhanden ist, erfolgt eine Navigation zum Ziel.                                                                                                         |
| `Pos1`         | Fokussiert das erste Element der Tree-Komponente.                                                                                                                                                                             |
| `Ende`         | Fokussiert das letzte Element der Tree-Komponente.                                                                                                                                                                            |
| `*`            | Öffnet alle geschlossenen Geschwisterelemente auf der aktuell fokussierten Ebene.                                                                                                                                             |
| Alphanumerisch | Durch Eingabe eines Buchstabens wird das nächste Element fokussiert, dessen `_label` mit diesem Zeichen beginnt. Bei wiederholtem Drücken desselben Buchstabens wird zum jeweils nächsten passenden Element weitergesprungen. |

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tree_role" _target="_blank"></kol-link>
- <kol-link _href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                                                        | Type     | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| `_label` _(required)_ | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string` | `undefined` |

---
