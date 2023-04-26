# SkipNav

Mit Hilfe der **SkipNav**-Komponente kann eine versteckte Navigation erzeugt werden. Sie dient dazu, Sehbehinderten das Überspringen von Seitenbereichen zu ermöglichen. Sie wird nur nach Anspringen durch die **Tab-Taste** sichtbar.

## Konstruktion

### Code

```html
<kol-skip-nav
	_aria-label="Ein versteckter Link"
	_links="[{'_label':'Navigation','_href':'#nav'},{'_label':'Inhalt','_href':'#main'},{'_label':'Kontakt','_href':'#kontakt'},{'_label':'Links','_href':'#links'}]"
></kol-skip-nav>
```

### Beispiel

Um die **SkipNav** sehen zu können, klicken Sie auf diesen Text und gehen dann mit der Tab-Taste einen Schritt weiter.

<kol-skip-nav _aria-label="Ein versteckter Link" _links="[{'_label':'Navigation','_href':'#nav'},{'_label':'Inhalt','_href':'#main'},{'_label':'Kontakt','_href':'#kontakt'},{'_label':'Links','_href':'#links'}]"></kol-skip-nav>

## Verwendung

Die **SkipNav** wird durch Übergabe eines JSON-Objekts erzeugt, das für das Rendern der versteckten Links zuständig ist.

```js
[
	{ _label: 'Navigation', _href: '#nav' },
	{ _label: 'Inhalt', _href: '#main' },
	{ _label: 'Kontakt', _href: '#kontakt' },
	{ _label: 'Links', _href: '#links' },
];
```

<!--### Best practices

### Anwendungsfälle-->

<!-- ## Barrierefreiheit -->

### Tastatursteuerung

| Taste   | Funktion                                                              |
| ------- | --------------------------------------------------------------------- |
| `Tab`   | Fokussiert die SkipNav und ermöglicht das Durchlaufen der Menüpunkte. |
| `Enter` | Ruft den Link des fokussierten Menüpunkts auf.                        |

## Links und Referenzen

- https://webaim.org/techniques/skipnav/

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute     | Description                                                                  | Type                    | Default     |
| ------------------------- | ------------- | ---------------------------------------------------------------------------- | ----------------------- | ----------- |
| `_ariaLabel` _(required)_ | `_aria-label` | Gibt den Text an, der die Navigation von anderen Navigationen differenziert. | `string`                | `undefined` |
| `_links` _(required)_     | `_links`      | Setzt die Liste der darzustellenden Links.                                   | `LinkProps[] \| string` | `undefined` |

## Dependencies

### Depends on

- [kol-link](../link)

### Graph

```mermaid
graph TD;
  kol-skip-nav --> kol-link
  kol-link --> kol-link-wc
  kol-link-wc --> kol-span-wc
  kol-link-wc --> kol-icon
  kol-link-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  style kol-skip-nav fill:#f9f,stroke:#333,stroke-width:4px
```

---
