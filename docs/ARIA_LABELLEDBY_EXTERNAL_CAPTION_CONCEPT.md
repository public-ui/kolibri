# Externe Tabellenbeschriftung via `_ariaLabelledby`

## Problem

`aria-labelledby` mit einer String-ID ist **tree-scoped**: Eine `<table>` im Shadow DOM kann ein `<h2>` im Host-Dokument per IDREF nicht erreichen.

## Lösung

`ariaLabelledByElements` ist Teil von `ARIAMixin` und steht auf **jedem** `Element` — nicht nur auf `ElementInternals`. Element-Referenzen (JS-Objekte) sind nicht tree-scoped und überqueren Shadow-Grenzen problemlos.

## Ablauf

```
_ariaLabelledby="heading-id"
        │
        ▼
resolveTargets(host, value)
  getRootNode()  →  findet Elemente im korrekten Tree-Scope des Wrappers
  CSS.escape()   →  IDs mit Sonderzeichen werden robust behandelt
        │
        ▼
table.ariaLabelledByElements = [<h2>]       ← ARIAMixin direkt auf <table>
```

Die aufgelösten Elemente werden als `externalLabelElements`-Prop an die interne WC-Implementierung weitergereicht, die sie per Ref-Callback auf das native `<table>`-Element setzt.

Ist das externe Element beim ersten Render noch nicht im DOM (z. B. späte Headline), lösen die Komponenten erneut auf: die Tabellen beim Mount und den ersten Rendern, die Form-Felder bei jedem Render (`componentDidRender`) — unveränderte Referenzen werden nicht erneut geschrieben.

## Mehrere IDs

`_ariaLabelledby` akzeptiert mehrere IDs (whitespace-getrennt), genau wie das native Attribut:

```jsx
<KolTableStateless _ariaLabelledby="heading-id subheading-id" … />
```

`resolveTargets` teilt den String auf, löst jede ID im Tree-Scope des Wrappers auf und gibt ein `HTMLElement[]` zurück. Alle gefundenen Elemente werden gemeinsam in `ariaLabelledByElements` gesetzt — Assistive Technology verkettet deren Texte in Array-Reihenfolge zum zugänglichen Namen.

## Caption-Verhalten

Die `<caption>` wird immer gerendert — sie ist das Fokus-Element der Tabelle (`tabindex`).

| Zustand                    | `<caption>`          | `aria-labelledby` auf `<table>` | `ariaLabelledByElements` |
| -------------------------- | -------------------- | ------------------------------- | ------------------------ |
| Kein `_ariaLabelledby`     | sichtbar             | `"caption"`                     | —                        |
| Element gefunden           | `aria-hidden="true"` | —                               | `[externes Element]`     |
| Element **nicht** gefunden | sichtbar             | `"caption"`                     | —                        |

## Wichtige Warnung zu Host-Rollen

Das Setzen einer Rolle auf dem Custom-Element-Host (z. B. `internals.role = 'table'`) kann Screenreader blockieren.
In einigen Screenreader-/Browser-Kombinationen wird der innere Inhalt der Web Component dann nicht mehr korrekt aufgelöst und vorgelesen.

Dringende Empfehlung:

- Keine Rollen am Host setzen.
- Semantik stattdessen auf dem nativen inneren Element setzen (z. B. auf dem tatsächlichen `<table>`).

## Generalisierung auf weitere ARIA-Properties

Dasselbe Muster funktioniert für alle ARIA-Relationship-Properties, die in `ARIAMixin` als Element-Referenz-Variante verfügbar sind:

| ARIA-Attribut           | ARIAMixin-Property            | Typischer Anwendungsfall                                 |
| ----------------------- | ----------------------------- | -------------------------------------------------------- |
| `aria-labelledby`       | `ariaLabelledByElements`      | Externe Überschrift als Tabellen-Label                   |
| `aria-describedby`      | `ariaDescribedByElements`     | Hilfetexte oder Fehlermeldungen außerhalb des Shadow DOM |
| `aria-details`          | `ariaDetailsElements`         | Detailbereich außerhalb des Shadow DOM (Form-Felder)     |
| `aria-controls`         | `ariaControlsElements`        | Tabpanel, Disclosure oder Popup in anderem Tree          |
| `aria-owns`             | `ariaOwnsElements`            | Logische Elternschaft über Shadow-Grenzen                |
| `aria-errormessage`     | `ariaErrorMessageElements`    | Fehlermeldung außerhalb des Formularfeldes               |
| `aria-activedescendant` | `ariaActiveDescendantElement` | Fokus-Tracking bei Listboxen, Comboboxen                 |

Für jede dieser Properties gilt das gleiche Rezept:

1. Prop akzeptiert einen ID-String (space-separated wo sinnvoll).
2. `resolveTargets(host, value)` löst IDs im Tree-Scope des Wrappers auf.
3. `element.ariaXxxElements = resolvedElements` direkt auf dem nativen inneren Element setzen (ARIAMixin, keine IDREFs nötig).

Die einzige Besonderheit: `ariaActiveDescendantElement` ist singular (ein Element, kein Array), alle anderen sind Arrays.

## Kein `ElementInternals`

`ElementInternals`-Zuweisungen (`attachInternals()`) sind bewusst entfernt: Keine KoliBri-Komponente ist form-associated (`formAssociated`), daher wirft `attachInternals()` eine `NotSupportedError` und die Schicht war nie wirksam — sie ist immer `undefined` geblieben. Der einzige Mechanismus für External-ARIA-Referenzen ist die ARIAMixin-Zuweisung auf dem nativen inneren Element.

## Nutzung

```jsx
<h2 id="orders-heading">Bestellungen</h2>
<KolTableStateless
  _ariaLabelledby="orders-heading"
  _label="Fallback falls Element nicht gefunden"
  _headerCells={headers}
  _data={data}
/>
```

## Browser-Support

| Screen Reader | Browser                   | Funktioniert |
| ------------- | ------------------------- | ------------ |
| NVDA, JAWS    | Chrome, Firefox (Desktop) | ✅           |
| VoiceOver     | Safari, Chrome (macOS)    | ❌           |
| TalkBack      | Chrome (Android)          | ❌           |

TalkBack folgt `ariaLabelledByElements` nicht — Chrome übergibt Element-Referenzen nicht ans Android Accessibility Framework. VoiceOver auf macOS meldet die Referenzen ebenfalls nicht (plattformseitige Lücke, Details und Nachweise in KNOWN_ISSUES.md). Für Screenreader, die die Referenzen nicht folgen: `_label` verwenden.
