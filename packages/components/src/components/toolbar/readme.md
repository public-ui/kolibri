# Toolbar `preview`

<kol-alert _type="warning">
  Komponente ist ein Entwurf - Vorläufig nicht in Produktion verwenden.
</kol-alert>

Die Komponente **Toolbar** ist eine Sammlung häufig verwendeter Steuerelemente für Schaltflächen und Links, die in einer kompakten visuellen Form zusammengefasst sind. Die Toolbar ist in der Regel eine Untermenge von Funktionen, die in einer Menüleiste zu finden sind, um den Aufwand für den Benutzer zu verringern.

```html
<kol-toolbar
	_label="Label"
	_items=[
    {
      {
        _label: "Button",
      },
      {
        _href: "#",
        _label: "Link"
      },
    }
]></kol-toolbar>
```

### Beispiel

<kol-toolbar
\_label="Label"
\_items=[
{
{
_label: "Button",
},
{
_href: "#",
_label: "Link"
}
}
]

> </kol-toolbar>

## Verwendung

Verwenden Sie die **Toolbar**-Komponente wenn die Navigation von verschiedenen Buttons und Links ermöglicht werden soll, z.B. um den Inhalt einer Textarea zu formatieren.
Mit Hilfe des Attributs **`_label`** kann das **`aria-label`** gesetzt werden.
Über das Attribut **`_items`** werden die einzelnen Funktionen in der Toolbar gesetzt.
Der **`tabIndex`** wird von der **Toolbar**-Komponente gesteuert. Default ist hierbei immer das erste aktive Elemente in der **Toolbar**.

### Unterstützte **Toolbar**-Komponenten

- Link
- Button

Die **Toolbar**-Komponente erkennt hierbei selbständig durch das **`_href`**-Attribut, ob es sich um eine **Link**- oder **Button**-Komponente handelt.

## Barrierefreiheit

### Tastatursteuerung

| Taste          | Funktion                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `Tab`          | Erster Tab fokussiert die Toolbar. Zweiter das erste aktive Element und dritter setzt den Standard wieder her. |
| `Pfeil-Tasten` | Können für die Navigation der Element in der fokussierten Toolbar verwendet werden.                            |

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/toolbar_role" _target="_blank"></kol-link>
- <kol-link _href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute | Description                                                                       | Type                    | Default     |
| --------------------- | --------- | --------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `_items` _(required)_ | --        | Defines the functional elements of toolbar to render (e.g. kol-link, kol-button). | `ToolbarItemPropType[]` | `undefined` |
| `_label` _(required)_ | `_label`  | Defines the semantic aria-label of the component.                                 | `string`                | `undefined` |

---
