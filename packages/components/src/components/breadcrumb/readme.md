# Breadcrumb

Mit Hilfe der **Breadcrumb**-Komponente kann der Pfad zur aktuellen Position einer Webseite in einer hierarchischen Struktur dargestellt werden.

## Funktionsweise

Die **Breadcrumb**-Komponente zeigt die aktuelle Position einer Webseite in einer horizontalen Navigationsstruktur an. Das jeweils letzte Element rechts stellt die aktuelle Seite selbst dar.
Diese ist nicht mit einem link versehen. Alle Elemente links der aktuellen Seite sind mit einem Link auf die verknüpfte Seite versehen.

## Konstruktion

### Code

```html
<div>
	<kol-breadcrumb _links='[{"_label":"Startseite","_href":"#/"},{"_label":"Unterseite von Startseite","_href":"#/unterseite"}]'></kol-breadcrumb>
</div>
```

### Beispiel

<kol-breadcrumb _links='[{"_label":"Startseite","_href":"#/"},{"_label":"Unterseite von Startseite","_href":"#/unterseite"}]'></kol-breadcrumb>

## Verwendung

### Definition der Links

Das Attribut **\_links** erwartet die Übergabe eines JSON-Objekts, aus dem sich der Aufbau der anzuzeigenden Breadcrumb-Pfade ergibt. Das JSON-Objekt übergibt beliebig viele Elemente, die jeweils eine Anzahl an Eigenschaften und Werten bereitstellen.

Jede Eigenschaft und der zugehörige Wert müssen in doppelten Anführungszeichen gesetzt werden.

Einzelne Elemente werden in geschweiften Klammern und durch **Komma** separiert geschrieben.

Das gesamte JSON-Objekt muss in eckigen Klammern an das Attribut **`_links`** übergeben werden.

<b>Folgende Eigenschaften stehen zur Verfügung:</b>

- **`_href`** übergibt den Link, der für dieses Element verwendet werden soll.
- **`_icon`** (optional) übergibt den Namen des Icon, wenn zusätzlich zum Text des Elements noch ein Icon angezeigt werden soll. Es stehen die <kol-link _href="https://microsoft.github.io/vscode-codicons/dist/codicon.html" _label="https://microsoft.github.io/vscode-codicons/dist/codicon.html" _target="_blank" _label="Codicons"></kol-link> zur Verfügung
- **`_hide-label`** (optional). Wenn der Wert auf **true** gesetzt wird, erscheint im Link ausschließlich das Icon, ohne weiteren Text. Die Eigenschaft `_icon` muss gesetzt werden.
- **`_label`** übergibt den Text, der für dieses Element angezeigt werden soll.

Beispiel für ein JSON-Objekt, das an das Attribut **`_links`** übergeben wird:

```JSON
[
  { '_label': 'Startseite', '_href': '#/', '_icon': 'codicon codicon-home', '_hide-label': true },
  { '_label': '1. Unterseite', '_href': '/unterseite_eins' },
  { '_label': '2. Unterseite', '_href': '/unterseite_zwei' }
]
```

<kol-breadcrumb _links='[{"_label":"Startseite","_href":"#/","_icon":"codicon codicon-home","hide-label": "true"},{"_label":"1. Unterseite","_href":"#/1_unterseite"},{"_label":"2. Unterseite","_href":"#/2_unterseite"}]'></kol-breadcrumb>

### Best practices

- Die **Breadcrumb**-Komponente ist ein wichtiges Element für eine effektive Suchmaschinenoptimierung Ihrer Webseite.
- Auch für Benutzer:innen der Webseite bietet eine Breadcrumb-Navigation zusätzliche Übersicht.
- Positionieren Sie die Breadcrumb möglichst weit oben auf Ihren Inhaltsseiten, um zu gewährleisten, dass Suchmaschinen diese als zusätzliche Informationsquelle zur Struktur Ihrer Webseite nutzen können.
- Positionieren Sie die Breadcrumb-Komponente auf jeder Inhaltsseite Ihre Webseite. Sie gewährleisten so, dass sich Besucher:innen jederzeit zurecht finden und die aktuelle Position erkennen können.
- Vermeiden Sie, die Breadcrumb-Navigation auf der Startseite zu positionieren.
- Verwenden Sie eine Breadcrumb-Navigation nur dann, wenn sie für Benutzer:innen einen wirklichen Mehrwert bieten.
- Auf mobilen Varianten einer Webseite ist eine Breadcrumb-Navigation möglicherweise nicht sinnvoll.

### Anwendungsfälle

Eine Breadcrumb-Navigation ist auf einer großen Mehrzahl der aktuellen Webseiten zu finden. Somit beschreibt der klassische Anwendungsfall den generellen Einbau dieser Komponente.

## Barrierefreiheit

Achten Sie im Sinne der optimalen Barrierefreiheit darauf, das Attribut `_label` korrekt auszuzeichnen. Beachten Sie diesen Hinweis insbesondere dann, wenn Sie die Option `_hide-label` verwenden und so auf einen beschreibenden Text im Link verzichten würden.

Beachten Sie, dass auch das letzte Element in der Breadcrumb-Komponente per Tab-Taste angesprungen werden kann, obwohl dort kein Link hinterlegt ist. Hierdurch kann auch dieses Element von Screenreader erreicht und vorgelesen werden.

### Tastatursteuerung

| Taste   | Funktion                                                     |
| ------- | ------------------------------------------------------------ |
| `Tab`   | Springt die einzelnen Elemente der Breadcrumb-Navigation an. |
| `Enter` | Öffnet den Link des aktuellen Elements.                      |

## Links und Referenzen

- <kol-link _href="https://www.w3.org/TR/wai-aria-practices/#breadcrumb" _label="https://www.w3.org/TR/wai-aria-practices/#breadcrumb" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute     | Description                                                                                                                                 | Type                              | Default     |
| --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `_ariaLabel`          | `_aria-label` | <span style="color:red">**[DEPRECATED]**</span> use \_label instead<br/><br/>Deprecated: Setzt die semantische Beschriftung der Komponente. | `string \| undefined`             | `undefined` |
| `_label`              | `_label`      | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).                          | `string \| undefined`             | `undefined` |
| `_links` _(required)_ | `_links`      | Defines the list of links combined with their labels to render.                                                                             | `BreadcrumbLinkProps[] \| string` | `undefined` |

---
