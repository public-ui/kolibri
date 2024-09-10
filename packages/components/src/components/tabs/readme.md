# Tabs

Synonyme: Navigation, Nav

Die **Tabs**-Komponente wird verwendet, um verwandte Inhalte auf derselben Seite zu organisieren und zwischen ihnen zu navigieren. Tabs sorgen dafür, dass große Inhaltsmengen für Nutzer:innen leichter organisiert werden können. Tabs sind in Registerkartenleisten angeordnet, die als Registerkartengruppen bezeichnet werden, wobei die Registerkartenbeschriftung den Nutzer:innen einen Hinweis darauf gibt, welcher Inhalt angezeigt wird, wenn die Registerkarte ausgewählt wird.

## Konstruktion

Nach dem Laden der Komponente wird die erste Registerkarte links automatisch optisch als **_aktiv_** hervorgehoben. Jede Registerkarte übernimmt den Status **_aktiv_** nach dem Anklicken. Der Status **_aktiv_** kann mit dem Attribut **`_selected`** auch manuell auf den Index der Registrierkarte gesetzt werden.
Die einzelnen Inhalte der Registerkarte werden in einem eigenen `HTMLDivElement` als `<div>Inhalt der Registerkarte</div>` innerhalb von `<kol-tabs></kol-tabs>` notiert.

Die Zuordnung der Daten im Attribut **`_tabs`** zu den Div-Elementen erfolgt automatisch.

### Code

```html
<kol-tabs _selected="0" _tabs='[{"_label":"Tab 1","_icons":"codicon codicon-home"},{"_label":"Tab 2", "_on": {"onClose": true}},{"_label":"Tab 3"}]'>
	<div>Inhalt von Tab 1</div>
	<div>Inhalt von Tab 2</div>
	<div>Inhalt von Tab 3</div>
</kol-tabs>
```

### Beispiel

<kol-tabs _selected="0" _tabs='[{"_label":"Tab 1","_icons":"codicon codicon-home"},{"_label":"Tab 2", "_on": {"onClose": true}},{"_label":"Tab 3"}]'>
  <div>Inhalt von Tab 1</div>
  <div>Inhalt von Tab 2</div>
  <div>Inhalt von Tab 3</div>
</kol-tabs>

## Verwendung

### Definition der Registerkarten

Die Daten für die Registerkarten können als Objekte oder JSON-String an das Attribut **`_tabs`** übergeben werden.

```json
[{ "_label": "Tab 1", "_icons": "codicon codicon-home" }, { "_label": "Tab 2", "_on": { "onClose": true } }, { "_label": "Tab 3" }]
```

### Registerkarte deaktivieren

Um eine Registerkarte zu deaktivieren, verwenden Sie das Attribut **`_disabled`**.

### Close-Icon im Registekartenheader

Wenn Sie eine schließbare Registerkarte benötigen, können Sie dies über das Attribut **`_on`** und den Wert **"onClose":true** realisieren.

### Best practices

- Verwenden Sie Registerkarten, um verwandte Inhalte so zu organisieren und zu gruppieren, dass Nutzer:innen die Seite nicht verlassen müssen.
- Registerkarten sollten in einer einzelnen, scrollbaren (falls erforderlich) Zeile über dem Inhalt positioniert werden, auf den sie sich beziehen.
- Verwenden Sie die Registerkartenbezeichnung, um den Inhalt dieser Registerkarte klar und prägnant zu beschreiben und zwischen den verschiedenen Abschnitten zu unterscheiden.
- Verwenden Sie Registerkarten nicht, um eine Sequenz oder einen Verlauf von Inhalten zu erstellen, die der Benutzer in einer bestimmten Reihenfolge lesen soll.
- Verwenden Sie Registerkarten nicht zum Vergleichen von Inhalten (z. B. unterschiedliche Spezifikationen).
- Berücksichtigen Sie die Anzahl der Registerkarten, die Sie in die Registerkartengruppe aufnehmen. Wenn Sie das Gefühl haben, dass die Zahl zu groß wird, sollten Sie den Inhalt weiter aufteilen oder ein anderes Navigationsmuster/eine andere Komponente verwenden.

### Anwendungsfälle

- Über Registerkarten können Sie z.B. Dienstleistungen oder Vorteile in verschiedene Kategorien einteilen.
- Verwenden Sie Registerkarten, um Benutzerprofile in verschiedene Abschnitte zu gliedern (z. B. persönliche Informationen, Termine, aktive Services).
- Verwenden Sie Registerkarten, um FAQs in verschiedene Kategorien zu unterteilen.

## Barrierefreiheit

### Tastatursteuerung

Ausgewählte Tabs werden beim Anspringen mit der **Tab-Taste** mit einem deutlichen Focus-Rahmen umgeben. Die einzelnen Tabs können mit den Pfeiltasten **links** und **rechts** durchlaufen werden.

Nach Anspringen eines Tabs kann mit Hilfe der **Tab-Taste** vom Header in den Inhaltsbereich der Registerkarte gewechselt werden.

Unabhängig davon ob die Tab-Schalter oben, rechts, unten oder links angeordnet sind, bleibt die Tastatursteuerung gleich. Hintergrund ist, dass das Layout bei der Nutzung eines Screenreaders keine Rolle spielt. Eine unterschiedliche Pfeil-Tastensteuerung aufgrund der Layout-Anordnung würde daher nicht dem üblichen Bedienkonzept des W3C entsprechen.

Bei der Umsetzung der Tastatursteuerung wurde sich an den Beispielen des W3C's orientiert.

Hier steht immer der beeinträchtige Nutzende im Vordergrund. Um möglichst effizient über die gesamte Seite/Anwendung zu navigieren, ist nur 1 Schalter aus der Tab-Serie fokussierbar. Sobald der Nutzende auf der Tab-Navigation selbst ist, werden die Pfeiltasten verwendet, um zwischen den Tabs selbst wechseln.

| Taste                            | Funktion                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Tab`                            | Fokussiert den ersten aktiven Tab. Auf vorhandene Close-Icons können mit der Tab-Taste erreicht werden. |
| `Pfeil-Tasten (links \| rechts)` | Wechselt zwischen den Tabs.                                                                             |

## Links und Referenzen

- <kol-link _href="https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-manual.html" _target="_blank"></kol-link>
- <kol-link _href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role" _target="_blank"></kol-link>
- <kol-link _href="https://dequeuniversity.com/library/aria/tabpanel" _target="_blank"></kol-link>
- <kol-link _href="https://design-system.service.gov.uk/components/tabs/" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute   | Description                                                                                                        | Type                                                                                                                                                                                                                                                     | Default     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_align`              | `_align`    | Defines the position of the tab captions.                                                                          | `"bottom" \| "left" \| "right" \| "top" \| undefined`                                                                                                                                                                                                    | `'top'`     |
| `_label` _(required)_ | `_label`    | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                                                                                                                                                                                                 | `undefined` |
| `_on`                 | --          | Gibt die Liste der Callback-Funktionen an, die auf Events aufgerufen werden sollen.                                | `undefined \| { onCreate?: EventCallback<Event> \| { label: string; callback: EventCallback<Event>; } \| undefined; } & { onSelect?: EventValueOrEventCallback<MouseEvent \| KeyboardEvent \| CustomEvent<any> \| PointerEvent, number> \| undefined; }` | `undefined` |
| `_selected`           | `_selected` | Defines which tab is active.                                                                                       | `number \| undefined`                                                                                                                                                                                                                                    | `0`         |
| `_tabs` _(required)_  | `_tabs`     | Defines the tab captions.                                                                                          | `TabButtonProps[] \| string`                                                                                                                                                                                                                             | `undefined` |

---
