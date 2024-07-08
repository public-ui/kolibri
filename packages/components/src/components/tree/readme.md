# Tree

<kol-alert _type="warning" _variant="card">
  <kol-badge _color="#476af5" _label="Preview"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da die Barrierefreiheitstests noch ausstehen. Die verschiedenen Tests können aufgrund der Modularität bei neuen Komponenten und Funktionalitäten meist erst nach einem Release erfolgen. Wir empfehlen daher, die Komponente noch nicht in Produktion zu verwenden.
</kol-alert>

Die Komponente **Tree** stellt eine hierarchische Liste dar. Jedes Element in der Hierarchie kann Kindelemente haben, und Elemente, die Kinder haben, können erweitert oder reduziert werden, um die Kinder anzuzeigen oder zu verbergen.

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

Eine **Tree**-Komponente wird verwendet, um komplexe, hierarchische Datenstrukturen visuell darzustellen und zu navigieren. Sie ermöglicht es Benutzern, sich effizient durch verschachtelte Informationen zu bewegen und bietet eine klare Übersicht über die Beziehungen zwischen den verschiedenen Elementen. Solche Komponenten sind nützlich in Anwendungen wie Navigatoren, Organisationsdiagrammen, Produktkatalogen und überall dort, wo eine strukturierte Darstellung von Daten erforderlich ist.
Das **`_label`**-Attribut wird für den Text und das **`_href`**-Attribut für den Link des Navigationspunkts genutzt. Zusätzlich lässt sich das aktive Element über das Attribut **`_active`** steuern, sowie im Standardzustand über das **`_open`** Attribut öffnen.

### Tastatursteuerung

| Taste          | Funktion                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`          | Der Tree lässt sich zudem mittels Tabulator-Taste fokussieren.                                                                                                                                                                                                                                                                                                   |
| `Pfeil-Tasten` | Die Pfeiltasten können für die Navigation der Elemente im Tree verwendet werden, um das Untermenü zu öffnen oder zu schließen sowie zwischen den Navigationspunkten zu springen. Dabei wird die linke/rechte Pfeiltaste für das Öffnen oder Schließen des Untermenüs und die oben/unten Pfeiltaste für das Wechseln zwischen den Navigationselementen verwendet. |
| `Enter`        | Selektiert das derzeitig fokussierte Element und navigiert, falls das **`_href`**-Attribut gesetzt wurde.                                                                                                                                                                                                                                                        |
| `Home`         | Fokussiert das erste Element in der Tree-Komponenten                                                                                                                                                                                                                                                                                                             |
| `End`          | Fokussiert das letzte Element in der Tree-Komponenten                                                                                                                                                                                                                                                                                                            |
| `*`            | Öffnet, alle Geschwister-Elemente der derzeitig fokussierten Ebene                                                                                                                                                                                                                                                                                               |

Zusätzlich können Elemente in der **Tree**-Komponente mit Alphanumerischen-Tasten gesucht und fokussiert werden. In dem oben gennanten Beispiel, würde durch die Taste `S` das Element mit dem **`_label`** `Subpage 1` fokussiert werden und bei wiederholten Drücken der selben Taste die `Subpage 2`, etc.

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tree_role" _target="_blank"></kol-link>
- <kol-link _href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                    | Type     | Default     |
| --------------------- | --------- | ------------------------------ | -------- | ----------- |
| `_label` _(required)_ | `_label`  | Defines the label of the tree. | `string` | `undefined` |

---
