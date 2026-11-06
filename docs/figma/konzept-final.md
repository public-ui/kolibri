# KoliBri-Komponenten in Figma bereitstellen

**Konzept, Version 1.0.** Überarbeitet auf Grundlage des Entwurfs v0.1 nach Review durch Dev-Team und Software-Architektur. Die Stellungnahmen und die Übernahmeentscheidungen sind in `feedback-review.md` dokumentiert.

## 1. Ausgangslage und Zielrichtung

KoliBri ist code-first. Die Komponenten leben als Web Components in `packages/components`, die Optik liegt vollständig in den Theme-Paketen (`packages/themes/*`). Das Fünf-Layer-Modell trennt Struktur (Layer `kol-a11y`, `kol-global`, `kol-component`) von Optik (Layer `kol-theme-global`, `kol-theme-component`), die Farb- und Abstandswerte fließen über Design-Tokens (`--kolibri-*`). Die vollständige Layer-Liste umfasst sieben Layer, zusätzlich die beiden Forced-Colors-Layer.

Gefragt ist die Richtung Code zu Figma: Die Figma-Datei ist ein generiertes Abbild des Codes, vergleichbar mit generierter API-Dokumentation. Der Code bleibt die einzige Quelle der Wahrheit; Änderungswünsche an der Optik laufen über Issues und Code. Die bereits existierende Entkopplung von Komponenten und Themes wird ins Abbild übertragen: Themes sind in Figma umschaltbar, ohne dass Komponenten dafür kopiert oder umgebaut werden.

## 2. Nicht-Ziele

- Kein Figma-to-Code, kein Write-back aus Figma in Tokens oder SCSS.
- Keine Abbildung von Verhalten: Tastaturbedienung, Fokus-Reihenfolge, Animationen und Ereignisbehandlung bleiben im Code und in den Playwright-Tests.
- Die Forced-Colors-Layer (`kol-forced-colors`, `kol-theme-forced-colors`) werden im Abbild nicht geführt; sie sind ein eigenes Accessibility-Mechanismus-Paar und kein Dark Mode.
- Keine Ersetzung der visuellen Tests; das Figma-Diff ist ein zusätzliches Gate.

Ausdrücklich nicht ausgeschlossen sind statische Zustände: Hover, Fokus, Active und Disabled sind als Figma-Varianten abbildbar und gehören ins Modell.

## 3. Architekturübertragung

| KoliBri                                                             | Figma                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Design-Tokens im Theme (`--kolibri-color-primary`, `--spacing`, …)  | Variablen, eine Collection je Theme                                           |
| Color Scheme (Light/Dark)                                           | Mode je Collection, Umschaltung am Frame                                      |
| Theme-Paket (default, bwst, desy, kern)                             | publizierte Figma-Library                                                     |
| Komponenten-Struktur (BEM-DOM)                                      | Component Set mit Auto Layout, Ebenennamen folgen Tag-Name und BEM            |
| Theme-Optik je Komponente                                           | Variablen-Bindung an Fills, Strokes, Effects; Text-Style je Schriftdefinition |
| Visuell relevante Props (`_variant`, `_type`, `_disabled`, `_open`) | Variant- und Boolean-Properties, Namen ohne Unterstrich (`Type`, `Disabled`)  |
| Statische Zustände inklusive Fokus                                  | Variant-Properties (`State`: Default, Hover, Focus, Active, Disabled)         |
| Text-Props (`_label`, `_hint`, `_msg`)                              | Text-Properties                                                               |
| Slot und Embedded Items (verschachtelte Komponenten)                | Instance-Swap-Properties und verschachtelte Instanzen                         |

Komponenten im Abbild referenzieren ausschließlich Variablen, nie harte Farbwerte. Ein Theme-Wechsel ist der Wechsel der Collection-Bindung, ein Scheme-Wechsel ist ein Mode-Wechsel am Frame. Damit sind Themes im Abbild so entkoppelt wie im Code. Die Mindestgröße interaktiver Elemente folgt `--a11y-min-size` und ist rem(44), also von der Schriftgröße abhängig, kein fester Pixelwert.

## 4. Quellen der Zwischenrepräsentation

Die IR (Zwischenrepräsentation als versioniertes JSON mit JSON-Schema und Schemaversion) speist sich aus drei Quellen. Keine einzige reicht allein; diese Korrektur geht auf die Review zurück.

1. **`custom-elements.json`** liefert Props, Slots, Events und Typ-Unions. Die Datei entsteht nur im Production-Build und ist gitignored, die Pipeline erzeugt sie explizit. Nachgeprüft: Die Felder `cssProperties` und `cssParts` sind aktuell in allen Einträgen leer. Token- und `::part`-Daten sind daraus nicht extrahierbar; die Datei wird nur als API-Quelle genutzt.
2. **Theme-Adapter (SCSS)** lösen die Token-Ketten auf. Theme-Komponenten setzen nicht direkt `--kolibri-*`, sondern interne Zwischen-Tokens (zum Beispiel `--text-background-color` im Button-Mixin), die ihrerseits auf `--kolibri-*` und dort auf `light-dark()`-Paare zeigen. Ein Adapter je Theme überführt diese Ketten in Variablendefinitionen ohne Farbwerte im IR. Aufnahmekriterium für ein Theme: Der Layer `kol-theme-global` definiert `:host`-Tokens im erwarteten Format (wie `packages/themes/default/src/global.scss`).
3. **Gerenderte Samples** liefern die DOM- und BEM-Struktur, die keine der Metadaten-Quellen enthält. Die Sample-App wird headless gerendert und pro Komponente in einen Strukturbaum überführt. In Phase 0 entscheidet ein Spike, ob stattdessen eine statische Extraktion aus den funktionalen Komponenten zuverlässiger pflegbar ist.

Die IR enthält keine Farbwerte, nur Variablenreferenzen. Sie trägt ihre Quellversionen (Komponenten, Theme, Generator) und die A11y-Merkmale je Komponente (Mindestgröße, erlaubte Zustände, Kontrast-relevante Token-Paare).

## 5. Komponentenmodell im Abbild

- Ebenennamen folgen exakt Tag-Name und BEM-Klassen (`kol-button`, `kol-button__label`). Die DOM-Struktur samt BEM ist Theming-Vertrag; Designer und Entwickler sehen dieselben Namen.
- Ein Component Set je KoliBri-Komponente. Properties werden kuratiert: Nur visuell relevante Props werden Varianten, alles andere wird Boolean- oder Text-Property oder bleibt außen vor. Das verhindert die kombinatorische Explosion aus Variant-Properties.
- Zustände inklusive Fokus sind Variant-Properties; Fokus-Ring und Hover-Optik sind statisch abbildbar.
- Icons, Slots und Embedded Items werden als verschachtelte Instanzen geführt (Instance-Swap-Properties), nicht als Code-Abhängigkeit. Die Items-Architektur (Komponenten rendern Kind-Komponenten) spiegelt sich als Nesting. Der Default-Slot heißt in den Metadaten `""`; die Namenskonvention für seine Instance-Swap-Property wird vor Phase 1 festgelegt.
- Auto Layout ist die Regel, nicht das Gesetz: Table/Grid, Dialog-Overlay, `::part`-Styling und die Fokusreihenfolge sind mit Auto Layout nicht abbildbar. Diese Ausnahmen stehen mit Begründung im IR und werden im Gate über die Toleranzliste behandelt.
- `kol-tooltip-wc` bleibt außen vor (deprecated, nur für DESYBRI gepflegt).
- Font-Icons sind themeabhängig; im Abbild sind sie austauschbare Instanzen, das Diff-Gate behandelt sie über die Toleranzliste.

## 6. Themes in Figma

Erste Wahl, aus der Review übernommen: **eine Variable Collection je Theme** mit identischen Variablennamen (IR-seitig erzwungen) und zwei Modes, Light und Dark. Das Modell skaliert auf beliebig viele Themes, entspricht der Repo-Struktur (ein Theme-Paket = eine Collection = eine Library) und spiegelt die Laufzeitregel, dass die Anwendung das Scheme pro Umfeld setzt: Die Scheme-Umschaltung erfolgt am Frame, nicht dateiglobal. Professional-Pläne mit vier Modes je Collection reichen damit für den Betrieb.

Das Alternativmodell (eine Collection, Theme × Scheme als Modes) bleibt als Optimierung für Organization-Pläne beschrieben, ist aber nicht mehr die Grundlage des Konzepts. Kritische Unbekannte ist der Library-Swap: Variablen sind in Figma per ID gebunden, nicht per Name. Ob beim Austausch einer Theme-Library namensgleiche Bindungen neu aufgelöst werden oder leer laufen, entscheidet über die Alltagstauglichkeit. Dieser Spike steht in Phase 0 und hat Vorrang, weil das gesamte Modell davon abhängt. Falls der Swap scheitert, läuft der Betrieb über je eine registrierte Theme-Library pro Organisation, und der Theme-Wechsel erfordert einen Neuaufbau der Frames; dieser Fall ist im Risiko-Kapitel bewertet.

Schriften sind in Figma keine Variablen. Je Theme entsteht zusätzlich ein Text-Style-Set, das die Token `--font-family` und `--font-size` abbildet.

Veröffentlicht wird je Theme eine eigene Library, damit angeschlossene Organisationen nur ihr Theme abonnieren. Mehrere publizierte Libraries mit baugleichen Set-Namen erzeugen Duplikate im Instance-Swap-Menü; ob Namenspräfixe je Theme das Problem lösen oder stören, ist eine der offenen Design-Entscheidungen.

## 7. Erzeugungsstrategien

- **A: Import gerenderter Komponenten** (etwa per html.to.design). Nach der Review klar eingeordnet: manuelles Plugin ohne Automatisierungs-API, glättet Shadow DOM, importiert Font-Icons als kaputte Glyphen, erzeugt nichtdeterministische Ebenennamen. Als Release-Quelle unbrauchbar; verbleibt als Sichtprüfwerkzeug für manuelle Vergleiche.
- **B: Generativer Aufbau über die Figma Plugin API** aus der IR. Erzeugt Component Sets, Properties und Variablen nativ. Die Plugin-Ausführung läuft nicht headless; Import und Aktualisierung sind manuelle Schritte durch die verantwortliche Person mit der Datei geöffnet.
- **C (gewählt): B plus deterministisches Diff.** Das Gate vergleicht Playwright-Screenshots der Sample-App mit dem Bildexport der generierten Frames über die Figma-REST-API. Die Plugin API schreibt Komponenten nur in der laufenden Anwendung, die REST-API liefert Bilder und liest Dateien; diese Grenzen sind im Betrieb einkalkuliert.

## 8. Pipeline, Gate und Versionierung

**Je Merge auf develop** (billig, frühe Warnung): Build erzeugt `custom-elements.json`, Theme-Adapter und DOM-Extraktion erzeugen die IR, ein IR-Diff-Bericht zeigt, welche Komponenten sich visuell relevant geändert haben.

**Je Release-Kandidat:** Import der IR über das Plugin (manuell), danach der visuelle Gate-Lauf: Playwright-Screenshots gegen Figma-Bildexport, Null-Layout-Delta über Light und Dark, nur Farbdifferenzen sind erlaubt, und nur für die in der Toleranzliste je Komponentenklasse genannten nicht abbildbaren Details (Pseudo-Elemente, Font-Icons) gelten Abweichungserlaubnisse. Der Kontrastnachweis der Theme-Paare gehört zum Gate. Die Veröffentlichung der Library bleibt ein bewusster Schritt der Design-Verantwortlichen.

**Inkrement-Regeln für das Plugin** (aus der Review): IR-IDs werden in `pluginData` an den Knoten persistiert. Bestehende Sets werden nie gelöscht und neu angelegt, weil Component-Keys brechen und Konsumenten-Instanzen sich auflösen. Umbenennungen sind erlaubt. Property-Namen sind veröffentlichte Library-API: einmal festgelegt, dann stabil.

**Versionierung:** Die IR ist ein versioniertes Artefakt mit eigener Schemaversion und den Quellversionen. Jede publizierte Theme-Library trägt eine Composite-Version aus Komponenten- und Theme-Version, damit eine reine Theme-Änderung (zum Beispiel ein neues Dark Scheme) ein neues Abbild erzeugt. Ältere Library-Stände bleiben abrufbar.

## 9. Rollout

| Phase   | Inhalt                                                                                                                                                                                                                                                                                   | Aufwand                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 0       | Vier Spikes mit Vorrang: Library-Swap-Verhalten (kritisch), DOM-Extraktion (statisch gegen gerendert), Token-Adapter am Default-Theme, Plugin-Prototyp an Button und InputText                                                                                                           | 8 bis 15 Personentage        |
| 1       | Pilot: Button, InputText mit Fehlermeldung, Alert mit Closer, Accordion mit Slot, Card mit Slot-Nesting, Dialog als Overlay-Grenze mit eingebettetem Button (Items-Fall), eine Icon-Komponente, Table als Komplexitätstest; Default-Theme inklusive Light/Dark; Zustände inklusive Fokus | 15 bis 25 Personentage       |
| 2       | Vollausbau: 46 thematisierte Komponenten des Default-Themes inklusive Variantenmatrizen, Mechanik des inkrementellen Updates, anschließend bwst, desy, kern über ihre Adapter                                                                                                            | 45 bis 90 Personentage       |
| 3       | Publish-Workflow, Gate-Läufe in CI, Dokumentation, Schulung, Besetzung der Design-Ops-Rolle                                                                                                                                                                                              | 15 bis 25 Personentage       |
| laufend | Plugin-Unterhalt (Figma-API-Änderungen), Swap-Tests bei Figma-Updates, Toleranzlisten-Pflege                                                                                                                                                                                             | fortlaufend, eigene Position |

Die Phasen 2 und 3 sind gegenüber dem Entwurf korrigiert; die Review hatte die ursprünglichen Werte als zu günstig nachgewiesen (Komponentenaufwand inklusive Variantenmatrix, unbudgetiertes inkrementelles Update).

## 10. Rollen und Eigentümerschaft

| Artefakt                            | Eigentümerschaft                                                        |
| ----------------------------------- | ----------------------------------------------------------------------- |
| Generator, IR-Schema                | Komponenten-Team; das IR-Schema ist gemeinsamer Vertrag mit dem Design  |
| Figma-Plugin                        | technisch beim Komponenten-Team bis Ende Phase 2, danach bei Design-Ops |
| Figma-Dateien und Theme-Libraries   | Design-Verantwortliche, inklusive Publish-Freigabe und Gate-Freigabe    |
| Toleranzlisten je Komponentenklasse | Design und Komponenten-Team gemeinsam, dokumentiert im generierten File |

## 11. Scope der Themes

Aufgenommen werden Themes, deren `kol-theme-global`-Layer `:host`-Tokens im erwarteten Format liefert. Das erfüllen default, bwst, desy und kern. d-you (kein `src/`, nur assets, icons, dist) und ecl (Struktur `ecl-ec`/`ecl-eu` ohne per-Komponenten-Mixins, ohne `light-dark()` und `color-scheme`) sind für die Token-Extraktion heute blind und bleiben außerhalb. Pfade für spätere Aufnahme: Anpassung der Theme-Struktur oder eine manuell gepflegte IR als Sonderweg; beides ist im Aufwand nicht eingepreist und braucht eine eigene Entscheidung.

Nebenbefund aus der Review: In `packages/themes/d-you` existiert ein leerer, nicht versionierter Ordner `figma`, mutmaßlich der Überrest eines früheren, nicht dokumentierten Ansatzes. Er sollte entfernt oder als Experiment dokumentiert werden.

## 12. Risiken

- **Library-Swap scheitert oder löst unvollständig auf.** Wahrscheinlichkeit unbekannt, Wirkung hoch; der Phase-0-Spike beantwortet sie zuerst. Rückfallebene: Libraries je Organisation ohne Swapping, höhere Betreibungskosten beim Theme-Wechsel.
- **Variant-Kombinatorik.** Trotz kuratierter Props bleiben Sets groß; die Grenze je Komponente wird im IR dokumentiert.
- **Plugin-Unterhalt.** Die Figma-Plugin-API entwickelt sich weiter; der laufende Aufwand ist als eigene Position eingestellt.
- **Gate-Disziplin.** Ein toleranzbasiertes Diff kann die Zero-Visual-Delta-Streng ausweiten. Gegenmittel: Null-Layout-Delta als harte Regel, Toleranzlisten nur für benannte, nicht abbildbare Details.
- **Konkurrierende manuelle Änderungen** an der Figma-Datei während des Imports; der Import-Prozess definiert eine Sperrvereinbarung und arbeitet mit Datei-Historie.

## 13. Entscheidungsbedarf

1. Figma-Planstufe und Organization-Anbindung: Mit der Collection-je-Theme-Strategie reicht Professional; die Entscheidung wird damit von der Architektur entkoppelt, bleibt aber zu treffen (Design/Leitung).
2. CI-Credentials für den Figma-Bildexport (Service-Account) und Sperrvereinbarung für die Zieldatei (Architektur).
3. Öffentliche oder eingeschränkte Libraries für angeschlossene Organisationen (Design/Leitung).
4. Duplikate im Instance-Swap-Menü bei mehreren Theme-Libraries: akzeptieren oder Namenspräfixe je Theme (Design).
5. Eigentümerschaft und Toleranzdefinition je Komponentenklasse (Design und Komponenten-Team).
6. Soll das `unstyled`-Theme als Baseline im Abbild geführt werden, als Spiegel der scheme-neutralen Baseline im Code (Design, A11y)?
7. Plugin im Monorepo mit dokumentiertem Release-Prozess oder separates Repository (Architektur).

## 14. Herleitung

Dieses Konzept ist die überarbeitete Fassung des Entwurfs v0.1 (`konzept-entwurf-v1.md`). Die vier Stellungnahmen aus Dev-Team und Software-Architektur samt Bewertung und Übernahmeentscheidung je Punkt stehen in `feedback-review.md`. Die wichtigsten Korrekturen gegenüber dem Entwurf: drei statt einer IR-Quelle, umgedrehte Theme-Strategie (Collection je Theme), deterministisches Gate statt HTML-Import-Vergleich, Fokus-Zustände als abbildbare Varianten, korrigierte Aufwände und das Aufnahmekriterium für Themes.
