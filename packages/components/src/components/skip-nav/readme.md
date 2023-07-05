# SkipNav

Mit Hilfe der **SkipNav**-Komponente kann eine versteckte Navigation erzeugt werden. Sie dient dazu, Sehbehinderten das Überspringen von Seitenbereichen zu ermöglichen. Sie wird nur nach Anspringen durch die **Tab-Taste** sichtbar.

## Konstruktion

### Code

```html
<kol-skip-nav
	_label="Ein versteckter Link"
	_links="[{'_label':'Navigation','_href':'#nav'},{'_label':'Inhalt','_href':'#main'},{'_label':'Kontakt','_href':'#kontakt'},{'_label':'Links','_href':'#links'}]"
></kol-skip-nav>
```

### Beispiel

Um die **SkipNav** sehen zu können, klicken Sie auf diesen Text und gehen dann mit der Tab-Taste einen Schritt weiter.

<kol-skip-nav _label="Ein versteckter Link" _links="[{'_label':'Navigation','_href':'#nav'},{'_label':'Inhalt','_href':'#main'},{'_label':'Kontakt','_href':'#kontakt'},{'_label':'Links','_href':'#links'}]"></kol-skip-nav>

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

| Property              | Attribute     | Description                                                                                                                                                                                              | Type                    | Default     |
| --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `_ariaLabel`          | `_aria-label` | <span style="color:red">**[DEPRECATED]**</span> use \_label instead<br/><br/>Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.). | `string \| undefined`   | `undefined` |
| `_label`              | `_label`      | Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).                                                                              | `string \| undefined`   | `undefined` |
| `_links` _(required)_ | `_links`      | Gibt die Liste der darzustellenden Button, Links oder Texte an.                                                                                                                                          | `LinkProps[] \| string` | `undefined` |

## Dependencies

### Depends on

- kol-link-wc

### Graph

```mermaid
graph TD;
  kol-skip-nav --> kol-link-wc
  kol-link-wc --> kol-span-wc
  kol-link-wc --> kol-icon
  kol-link-wc --> kol-tooltip
  kol-span-wc --> kol-icon
  kol-tooltip --> kol-span-wc
  style kol-skip-nav fill:#f9f,stroke:#333,stroke-width:4px
```

---
