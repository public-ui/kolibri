← [5. Bausteinsicht](05-building-block-view.md)

# 6. Laufzeitsicht

Dieser Abschnitt veranschaulicht das dynamische Verhalten von Public UI - KoliBri durch wichtige Laufzeitszenarien. Mithilfe von Sequenzdiagrammen und detaillierten Beschreibungen zeigt er, wie Komponenten während gängiger Operationen wie Initialisierung, Rendering, Event-Handling und Theme-Wechsel interagieren.

## 6.1 Komponentenregistrierung und Initialisierung

Der Komponentenregistrierungsprozess bildet die Grundlage für alle KoliBri-Komponenten in einer Anwendung. Dieser kritische Initialisierungsschritt muss erfolgen, bevor Komponenten gerendert werden.

```mermaid
sequenceDiagram
    participant App as Anwendung
    participant Register as Registrierungs-API
    participant Theme as Theme-Paket
    participant Loader as Component Loader
    participant Browser as Browser
    participant Component as Web Component

    App->>Register: register(theme, defineCustomElements)
    Register->>Theme: Lade Theme-Stylesheets
    Theme-->>Register: Adopted Style Sheets
    Register->>Loader: defineCustomElements(window)
    Loader->>Browser: Definiere Custom Elements
    Browser-->>Loader: Custom Elements registriert
    Loader-->>Register: Registrierung abgeschlossen
    Register-->>App: Komponenten bereit

    Note over Browser,Component: Nutzer fügt Komponente zum DOM hinzu

    Browser->>Component: connectedCallback()
    Component->>Component: Wende Adopted Style Sheets an
    Component->>Component: Initialisiere Shadow DOM
    Component->>Component: Rendere Komponente
    Component-->>Browser: Komponente bereit
```

### Szenario: Anwendungsstart

**Voraussetzungen:**

- Anwendung hat `@public-ui/components` und ein Theme-Paket installiert
- Anwendung importiert Registrierungsfunktion

**Schritte:**

1. Anwendung importiert Theme und Registrierungsfunktion:

   ```typescript
   import { register } from '@public-ui/components';
   import { defineCustomElements } from '@public-ui/components/loader';
   import { DEFAULT } from '@public-ui/theme-default';
   ```

2. Anwendung ruft `register()` mit Theme und Loader auf:

   ```typescript
   register(DEFAULT, defineCustomElements);
   ```

3. Registrierungsfunktion:
   - Lädt Theme-Stylesheets
   - Ruft `defineCustomElements()` auf, um alle Komponenten zu registrieren
   - Komponenten werden als Custom Elements im Browser definiert

4. Komponenten sind nun als HTML-Tags verfügbar (z.B. `<kol-button>`)

## 6.2 Komponenten-Rendering

```mermaid
sequenceDiagram
    participant User as Nutzer/Framework
    participant Browser as Browser DOM
    participant Component as KolComponent
    participant Shadow as Shadow DOM
    participant Theme as Adopted Styles
    participant Props as Component Props

    User->>Browser: Füge <kol-component> zum DOM hinzu
    Browser->>Component: connectedCallback()
    Component->>Shadow: attachShadow({mode: 'open'})
    Shadow-->>Component: Shadow Root erstellt

    Component->>Theme: adoptStyleSheets()
    Theme-->>Component: Styles angewendet

    Component->>Props: Initialisiere Props mit Defaults
    Props-->>Component: Props bereit

    Component->>Component: componentWillLoad()
    Component->>Component: render()
    Component->>Shadow: Aktualisiere Shadow DOM mit JSX
    Shadow-->>Browser: Komponente gerendert

    User->>Component: Aktualisiere Prop-Wert
    Component->>Props: Validiere neuen Wert
    Props-->>Component: Validierung bestanden
    Component->>Component: componentWillRender()
    Component->>Component: render()
    Component->>Shadow: Aktualisiere Shadow DOM
    Shadow-->>Browser: Komponente neu gerendert
```

### Szenario: Komponenten-Lebenszyklus

**Wenn eine Komponente zum DOM hinzugefügt wird:**

1. **connectedCallback()** - Browser benachrichtigt Komponente über DOM-Einfügung
2. **attachShadow()** - Komponente erstellt Shadow DOM zur Kapselung
3. **adoptStyleSheets()** - Theme-Styles über Adopted Style Sheets angewendet
4. **componentWillLoad()** - Komponenten-Initialisierungslogik läuft
5. **render()** - Komponente rendert JSX ins Shadow DOM
6. **componentDidLoad()** - Nachbereitungssetup (Event-Listener, etc.)

**Wenn sich eine Komponenten-Prop ändert:**

1. Property-Setter validiert neuen Wert
2. **componentWillRender()** - Pre-Render-Hook
3. **render()** - Komponente rendert neu mit neuen Daten
4. **componentDidRender()** - Post-Render-Hook
5. Shadow DOM aktualisiert effizient (Virtual DOM Diffing)

## 6.3 Event-Handling und Kommunikation

```mermaid
sequenceDiagram
    participant User as Nutzer
    participant Component as KolButton
    participant EventSystem as Event-System
    participant App as Anwendung
    participant Framework as Framework-Adapter

    User->>Component: Klicke Button
    Component->>Component: handleClick()
    Component->>EventSystem: Emittiere CustomEvent('click')
    EventSystem->>Framework: Fange Event ab
    Framework->>App: Rufe onClick-Handler auf
    App->>App: Führe Geschäftslogik aus

    opt Aktualisiere Komponente
        App->>Component: Aktualisiere Props
        Component->>Component: Neu rendern
    end

    Component-->>User: Visuelles Feedback (Ripple, Fokus)
```

### Szenario: Button-Klick

**Schritte:**

1. Nutzer klickt Button-Element
2. Button's interner Klick-Handler wird ausgelöst
3. Komponente validiert Klick (nicht deaktiviert, etc.)
4. Komponente emittiert CustomEvent mit Typ-Information
5. Framework-Adapter (falls verwendet) fängt Event ab und ruft React/Angular/Vue-Handler auf
6. Anwendung führt Geschäftslogik aus
7. Anwendung kann Komponenten-Props aktualisieren, was Neu-Rendering auslöst

**Event-Typen:**

- Standard-HTML-Events (click, focus, blur, etc.)
- Benutzerdefinierte Komponenten-Events (change, close, select, etc.)
- Events durchlaufen Shadow DOM-Grenze (composed: true)

## 6.4 Theme-Wechsel

```mermaid
sequenceDiagram
    participant App as Anwendung
    participant Manager as Theme-Manager
    participant Components as Alle Komponenten
    participant Styles as Style Sheets
    participant Browser as Browser

    App->>Manager: switchTheme(newTheme)
    Manager->>Styles: Lade neues Theme-CSS
    Styles-->>Manager: Theme-CSS geladen

    loop Für jede Komponente
        Manager->>Components: Aktualisiere Adopted Style Sheets
        Components->>Browser: Ersetze Style Sheets
        Browser->>Browser: Neu rendern mit neuen Styles
        Browser-->>Components: Styles angewendet
    end

    Manager-->>App: Theme-Wechsel abgeschlossen
```

### Szenario: Runtime-Theme-Änderung

**Voraussetzungen:**

- Mehrere Theme-Pakete installiert
- Komponenten bereits registriert

**Schritte:**

1. Anwendung lädt neues Theme-Paket
2. Theme-Manager sammelt neue Style Sheets
3. Für jede Komponenteninstanz im DOM:
   - Ersetze Adopted Style Sheets mit neuem Theme
   - Browser rendert automatisch mit neuen Styles neu
4. Visuelles Erscheinungsbild ändert sich ohne Komponenten-Reinitialisierung

**Vorteile:**

- Kein Komponenten-Remounting erforderlich
- Sofortige visuelle Updates
- Erhält Komponenten-State
- Effizient - nur Styles ändern sich, nicht DOM-Struktur

## 6.5 Formular-Validierung

```mermaid
sequenceDiagram
    participant User as Nutzer
    participant Input as KolInputText
    participant Validator as Validierungslogik
    participant ErrorMsg as Fehlermeldung
    participant Form as Formular-Kontext

    User->>Input: Gebe Wert ein
    Input->>Validator: Validiere Eingabe

    alt Gültige Eingabe
        Validator-->>Input: Validierung bestanden
        Input->>ErrorMsg: Lösche Fehlermeldung
        Input->>Form: Aktualisiere Formular-State (gültig)
        Input->>Input: Aktualisiere visuellen State (gültig)
    else Ungültige Eingabe
        Validator-->>Input: Validierung fehlgeschlagen
        Input->>ErrorMsg: Zeige Fehlermeldung
        Input->>Form: Aktualisiere Formular-State (ungültig)
        Input->>Input: Aktualisiere visuellen State (Fehler)
    end

    Input-->>User: Visuelles Feedback

    User->>Form: Formular absenden
    Form->>Form: Prüfe alle Eingaben

    alt Alle gültig
        Form->>Form: Verarbeite Formulardaten
    else Hat Fehler
        Form->>Input: Fokussiere erstes ungültiges Feld
        Input-->>User: Fokus auf Fehler
    end
```

### Szenario: Eingabe-Validierung

**Schritte:**

1. Nutzer gibt Text in Eingabefeld ein
2. Eingabe-Komponente validiert bei Blur oder Echtzeit (je nach Konfiguration)
3. Validierungslogik prüft:
   - Pflichtfeld
   - Muster-Matching (Regex)
   - Min/Max-Länge
   - Benutzerdefinierte Validatoren
4. Wenn gültig:
   - Lösche Fehlermeldungen
   - Aktualisiere visuellen State auf gültig
   - Emittiere Valid-Event
5. Wenn ungültig:
   - Zeige Fehlermeldung
   - Aktualisiere visuellen State auf Fehler
   - Emittiere Invalid-Event
   - Verhindere Formular-Absendung

## 6.6 Lazy Loading

```mermaid
sequenceDiagram
    participant App as Anwendung
    participant Loader as Lazy Loader
    participant Browser as Browser
    participant Bundle as Component Bundle
    participant Component as KolComponent

    App->>Browser: Füge <kol-table> zum DOM hinzu
    Browser->>Loader: Unbekanntes Element erkannt
    Loader->>Bundle: Lade table.js-Bundle

    alt Erste Verwendung
        Bundle-->>Loader: Download Komponenten-Code
        Loader->>Browser: Definiere Custom Element
    else Bereits geladen
        Bundle-->>Loader: Komponente im Cache
    end

    Browser->>Component: Erstelle Komponenten-Instanz
    Component->>Component: Initialisiere und rendere
    Component-->>Browser: Komponente bereit
    Browser-->>App: Element aufgewertet
```

### Szenario: Komponenten-Lazy-Loading

**Schritte:**

1. Anwendung verwendet Component Loader (nicht direkte Imports)
2. Browser begegnet unbekanntem Custom Element (z.B. `<kol-table>`)
3. Stencil's Lazy Loader fängt ab
4. Loader holt Komponenten-Bundle on-demand
5. Komponenten-Code heruntergeladen und ausgeführt
6. Custom Element im Browser definiert
7. Browser "wertet" Element von unbekannt zu definiert auf
8. Komponente initialisiert und rendert

**Vorteile:**

- Kleinere initiale Bundle-Größe
- Komponenten nur bei Bedarf geladen
- Automatisches Code-Splitting
- Verbesserte Performance für große Anwendungen

## 6.7 Barrierefreiheits-Integration

```mermaid
sequenceDiagram
    participant User as Nutzer mit AT
    participant AT as Assistive Technologie
    participant Browser as Browser
    participant Component as KolComponent
    participant ARIA as ARIA-Attribute
    participant Keyboard as Keyboard-Handler

    User->>AT: Navigiere mit Tastatur
    AT->>Browser: Frage Accessibility Tree ab
    Browser->>Component: Lese ARIA-Attribute
    Component->>ARIA: Exponiere Role, State, Properties
    ARIA-->>Browser: Barrierefreiheits-Info
    Browser-->>AT: Kündige Komponente an
    AT-->>User: "Button, Absenden, Enter drücken zum Aktivieren"

    User->>Keyboard: Drücke Enter
    Keyboard->>Component: Keyboard-Event
    Component->>Component: Behandle Tastendruck
    Component->>Component: Löse Aktion aus
    Component->>ARIA: Aktualisiere State (aria-pressed)
    Component->>AT: Kündige State-Änderung an
    AT-->>User: "Button gedrückt"
```

### Szenario: Screenreader-Navigation

**Schritte:**

1. Nutzer mit Screenreader navigiert Seite mit Tab-Taste
2. Screenreader fragt Accessibility Tree des Browsers ab
3. Komponente exponiert:
   - Semantische Role (button, textbox, dialog, etc.)
   - State (expanded, selected, checked, etc.)
   - Properties (label, description, required, etc.)
4. Screenreader kündigt Komponenten-Informationen dem Nutzer an
5. Nutzer interagiert über Tastatur
6. Komponente behandelt Tastatur-Events (Enter, Space, Pfeiltasten, Escape)
7. Komponente aktualisiert ARIA-Attribute, um State-Änderungen zu reflektieren
8. Screenreader kündigt Änderungen dem Nutzer an

**Eingebaute Barrierefreiheits-Features:**

- Korrekte ARIA-Rollen auf allen interaktiven Elementen
- Tastaturnavigations-Unterstützung
- Fokus-Management (Fokus in Modals einfangen, etc.)
- Ausreichender Farbkontrast (WCAG 2.2 AAA konform)
- Minimale Touch-Target-Größen (44x44px)
- Semantische HTML-Struktur
- Fehlermeldungs-Assoziationen
- Live-Regions für dynamische Inhalte

→ [7. Verteilungssicht](07-deployment-view.md)
