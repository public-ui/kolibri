# Badge

Mit **Badges** können Sie bestimmte Informationen auf Ihrer Webseite optisch hervorheben.
KoliBri bietet neben der Angabe der Hintergrundfarbe und automatischer Berechnung der Textfarbe auch die Möglichkeit, einem Badge ein Icon und/oder einen anderen Schriftschnitt mitzugeben.

## Konstruktion

### Code

```html
<kol-badge _label="Beispieltext" _color="#b7e4b4" _icons="codicon codicon-home"></kol-badge>
<kol-badge _label="Beispieltext" _color="#0c8703" _icons="codicon codicon-home"></kol-badge>
```

### Beispiel

<kol-badge _label="Beispieltext" _color="#b7e4b4" _icons="codicon codicon-home"></kol-badge>
<kol-badge _label="Beispieltext" _color="#0c8703" _icons="codicon codicon-home"></kol-badge>

## Kontext für Badges

Um die Benutzerfreundlichkeit und die Zugänglichkeit zu verbessern, sollten Badges
immer im Kontext einer aussagekräftigen Überschrift verwendet werden.

Stellen Sie sicher, dass jede Gruppe von Badges durch eine Überschrift ergänzt wird, die den gemeinsamen Kontext oder das Thema beschreibt. Vermeiden Sie es, Badges ohne solche beschreibenden Überschriften zu präsentieren.

### Beispiel

```html
<kol-heading _label="Beispielüberschrift" _level="2"></kol-heading>
<div>
	<kol-badge _label="Beispieltext" _color="#b7e4b4" _icons="codicon codicon-home"></kol-badge>
	<kol-badge _label="Beispieltext" _color="#0c8703" _icons="codicon codicon-home"></kol-badge>
</div>
```

## Verwendung

### Label im Badge

Der Text, der im Badge angezeigt werden soll, wird über das Attribut **\_label** übergeben. Der Text kann neben Sonderzeichen auch Umlaute oder Leerzeichen enthalten.
Das Element `<kol-badge></kol-badge>` beinhaltet selbst keinen Text.

### Hintergrundfarbe des Badge

Ein Badge, ohne weitere Angaben zur Hintergrundfarbe, wird standardmäßig mit hellgrauer Schriftfarbe auf schwarzem Hintergrund angezeigt. Über das Attribut **\_color** können andere Hintergrundfarben gewählt werden.

Die Angabe der gewünschten Hintergrundfarbe erfolgt in hexadezimaler Schreibweise, z.B. **\_color="#000000"** für schwarz.

Die Textfarbe wird automatisch als Kontrastfarbe zur gewählten Hintergrundfarbe errechnet.

### Icons

Ein Icon (**`_icon`**) kann entweder als String angegeben werden, oder als Objekt.
Als String übergeben Sie die Iconklasse (z.B.: `_icons="codicon codicon-home`), das Icon wird links vom Text angezeigt.
Das Objekt ist vom Typ `KoliBriAllIcon`, kann also einen oder mehrere der Schlüssel `top`, `right`, `bottom` und `left` besitzen. Diese sind dann entweder String (siehe oben) oder ein Objekt vom Typ `KoliBriCustomIcon`, welches aus `icon` (String, siehe oben) und `style` (optional, Styleobjekt) besteht.

<kol-link _href="https://microsoft.github.io/vscode-codicons/dist/codicon.html" _target="_blank" _label="Übersicht Codicons"></kol-link>

### Schriftschnitt

Der Schriftschnitt wird vom Host übernommen, kann also via CSS von außen gesetzt werden.

### Best practices

- Verwenden Sie Badges, um wichtige Informationen in unmittelbarer Nähe des jeweiligen Elements anzuzeigen.
- Verwenden Sie Badges, um auf geänderte Werte oder einen geänderten Status aufmerksam zu machen.
- Ein Badge weist den Benutzer darauf hin, dass etwas neu erzeugt oder aktualisiert wurde, z. B. ein „ungelesener Bericht“ oder eine Aktivitätsbenachrichtigung.
- Behalten Sie in gleichen Anwendungsfällen immer die gleiche Position des Badges bei, um ein einheitliches Erscheinungsbild zu gewährleisten.

## Anwendungsfälle

### Badge als Aufzählungszeichen verwenden

<ul class="m-0 p-0">
  <li class="flex gap-2">
    <kol-badge _label="1" _color="#0747a6"></kol-badge>
    <kol-heading _level="2" _label="Auswahl Anliegen"></kol-heading>
  </li>
  <li class="flex gap-2">
    <kol-badge _label="2" _color="#0747a6"></kol-badge>
    <kol-heading _level="2" _label="Auswahl Amtsstelle"></kol-heading>
  </li>
  <li class="flex gap-2">
    <kol-badge _label="3" _color="#0747a6"></kol-badge>
    <kol-heading _level="2" _label="Terminauswahl"></kol-heading>
  </li>
</ul>

## Barrierefreiheit

Für die Einhaltung der Regeln zur Barrierefreiheit, ist ein optimaler Kontrast zwischen der Hintergrundfarbe und Textfarbe des Badge zwingend erforderlich. KoliBri bietet daher eine automatische Berechnung der Textfarbe aus der gewählten Hintergrundfarbe heraus. Möglich sind die Textfarben **schwarz** und **weiß**, die in Abhängigkeit zur Hintergrundfarbe ausgegeben werden.

Die zusätzliche Ausgabe eines **Icon** gewährleistet, dass der Nutzer auch hierüber die Art der Information erfassen kann.

<kol-alert _type="info">Eine explizite Angabe der Textfarbe ist nicht möglich.</kol-alert>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute       | Description                                                                                                        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default     |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `_color`              | `_color`        | Defines the backgroundColor and foregroundColor.                                                                   | `string \| undefined \| { backgroundColor: string; foregroundColor: Stringified<CharacteristicColors>; }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `'#000'`    |
| `_icons`              | `_icons`        | Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).                                                    | `KoliBriHorizontalIcons & KoliBriVerticalIcons \| string \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `undefined` |
| `_label` _(required)_ | `_label`        | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `undefined` |
| `_smartButton`        | `_smart-button` | Allows to add a button with an arbitrary action within the element (\_hide-label only).                            | `string \| undefined \| { _label: string; } & { _tabIndex?: number \| undefined; _value?: Stringified<StencilUnknown>; _role?: AlternativeButtonLinkRolePropType \| undefined; _ariaControls?: string \| undefined; _ariaExpanded?: boolean \| undefined; _ariaSelected?: boolean \| undefined; _on?: ButtonCallbacksPropType<StencilUnknown> \| undefined; _type?: "button" \| "reset" \| "submit" \| undefined; _variant?: "ghost" \| "primary" \| "secondary" \| "normal" \| "tertiary" \| "danger" \| "custom" \| undefined; _customClass?: string \| undefined; _disabled?: boolean \| undefined; _hideLabel?: boolean \| undefined; _icons?: IconsPropType \| undefined; _id?: string \| undefined; _name?: string \| undefined; _syncValueBySelector?: string \| undefined; _tooltipAlign?: AlignPropType \| undefined; _accessKey?: string \| undefined; }` | `undefined` |

---
