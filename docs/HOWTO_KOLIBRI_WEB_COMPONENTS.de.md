# Einsteiger-How-To: KoliBri und Web Components

KoliBri ist eine Sammlung barrierefreier Web Components, die Design und Funktionalität in wiederverwendbare Bausteine kapseln. Dieses How-To richtet sich an Einsteiger und erklärt die grundlegenden Konzepte rund um KoliBri und die Nutzung von Web Components.

## Warum Web Components?

- **Standardisiert**: Web Components sind Teil der Web-Plattform und funktionieren ohne zusätzliche Frameworks.
- **Wiederverwendbar**: Einmal erstellt, können Komponenten in verschiedenen Projekten eingesetzt werden.
- **Framework-unabhängig**: Sie lassen sich in jede moderne Frontend-Technologie integrieren.
- **Langlebig**: Standards ändern sich selten, was langfristige Wartbarkeit erleichtert.

## Warum Shadow Root?

Der Shadow Root kapselt Markup und Styles einer Komponente und verhindert Konflikte mit globalen CSS-Regeln.

- **Style-Isolation**: Styles wirken nur innerhalb der Komponente.
- **Stabilität**: Externe Styles beeinflussen das Verhalten der Komponente nicht.
- **Kapselung**: DOM-Struktur und Logik bleiben unabhängig vom restlichen Dokument.

## Starkes Theming

KoliBri setzt auf ein mehrschichtiges Theming mit klaren Verantwortlichkeiten:

1. A11y-Preset-Layer für grundlegende Barrierefreiheit.
2. Basis-Global-Layer für gemeinsame Layout-Regeln.
3. Basis-Komponenten-Layer für spezifische Komponenten-Stile.
4. Theme-Global-Layer für globale Farbschemata.
5. Theme-Komponenten-Layer für individuelle Anpassungen.

Dieses System ermöglicht es, ein Corporate Design konsistent umzusetzen und dennoch flexibel zu bleiben.

## Mindset für KoliBri-Nutzer:innen

- **Accessibility first**: Barrierefreiheit ist kein Add-on, sondern Kernbestandteil jeder Komponente.
- **Komponenten denken**: Funktionalität und Darstellung werden in klar abgegrenzte Bausteine aufgeteilt.
- **Theming bewusst nutzen**: Anpassungen erfolgen über die vorgesehenen Layer statt durch Überschreiben globaler Styles.
- **Standard-APIs verwenden**: KoliBri nutzt moderne Browser-Schnittstellen; zusätzliche Abhängigkeiten bleiben gering.

## Nächste Schritte

- Installiere die Bibliothek über npm oder pnpm.
- Schaue dir die Beispielanwendungen im `packages/samples` Verzeichnis an.
- Experimentiere mit eigenen Themes, um KoliBri in dein Design-System zu integrieren.

Viel Erfolg beim Einstieg in die Welt von KoliBri!
