# @public-ui/design-export

Exportiert die KoliBri-Web-Components in Design-Tool-Dateien: eine werkzeugneutrale Zwischenrepräsentation (IR), ein Penpot-Token-Bundle (W3C DTCG) und eine SVG-Komponenten-Bibliothek. Umsetzung der Konzepte aus #11379 (Figma) und #11518 (Penpot) als lauffähige Pipeline, Phase 0/1 der dortigen Rollout-Pläne.

## Richtung

Code → Design-Tool, nie zurück. Die Design-Dateien sind Derivate des Codes wie generierte API-Dokumentation; Änderungswünsche an der Optik laufen über Issues und Code und erzeugen beim nächsten Lauf neue Dateien.

## Pipeline

```
Web-Components ──┬─ custom-elements.json ──────── API (Props, Slots, Events)
                 ├─ Theme dist (GLOBAL-CSS) ──── Tokens (--kolibri-*, light-dark-Paare)
                 ├─ bem-registry.ts (BEM-Konstante) ── BEM-Struktur (Theming-Vertrag)
                 └─ gerenderte Szenarien ──────── DOM-Baum + SVG je Scheme und Zustand
                                        │
                                        IR (Schema 1.0, versioniertes JSON)
                                        │
                    ┌───────────────────┴──────────────────┐
              Penpot-Bundle                          Figma-Weg
        (DTCG-Sets + $themes.json,           (Tokens-Studio-Plugin importiert
         $metadata.json, ZIP; SVG-Import)     dasselbe Bundle; SVG-Import nativ)
```

- **Tokens** werden aus dem kompilierten `GLOBAL`-Layer des Themes gelesen (`DEFAULT(patch)` der Theme-Export-Funktion, kein DOM nötig). Jedes `light-dark()`-Paar landet in den Sets `light` und `dark` mit identischen Namen, schemaneutrale Tokens im Set `core`. `$themes.json` definiert die Gruppe `Scheme` mit Light/Dark — pro Gruppe ist genau eine Option aktiv, die Umschaltung erfolgt in der Datei (Penpot-Modell, siehe Konzept #11518, Abschnitt 6).
- **SVG-Exporte** entstehen im echten Browser (Playwright): Szenarien mit Props und Slot-Content werden gerendert, Zustände sind echte Browser-Zustände (`hover`/`focus` auf dem interaktiven Element im Shadow DOM, mit Wartezeit auf die Hover-Transition), und ein Walker serialisiert das geflattete DOM in gruppierte SVG-Ebenen. Ebenennamen sind BEM-Klassen bzw. Tag-Namen (`id` und `data-name`), sodass der Theming-Vertrag im Ebenenbaum sichtbar bleibt.
- Die **IR** bündelt alle drei Quellen plus Token-Referenzen (keine Farbwerte) und ist der Vertrag für weitere Ziel-Adapter.

## Nutzung

```bash
pnpm --filter @public-ui/components... build   # erzeugt custom-elements.json und dist
pnpm --filter @public-ui/theme-default build
pnpm --filter @public-ui/design-export build

# Export (Standard-Szenarien: Button-Varianten mit Zuständen, InputText, Alert, Badge)
pnpm --filter @public-ui/design-export start

# Optionen
node dist/cli.js --out <verzeichnis>          # Zielordner (Standard: dist-export/)
node dist/cli.js --components kol-button      # Szenarien auf Tags filtern
node dist/cli.js --no-render                  # nur Tokens und IR ohne Browser-Lauf
```

Ergebnis im Zielordner:

| Datei                                          | Inhalt                                                 |
| ---------------------------------------------- | ------------------------------------------------------ |
| `ir.json`                                      | Zwischenrepräsentation, Schema 1.0, mit Quellversionen |
| `penpot/core.json`, `light.json`, `dark.json`  | DTCG-Token-Sets                                        |
| `penpot/$themes.json`, `penpot/$metadata.json` | Theme-Gruppe `Scheme` und Set-Reihenfolge              |
| `penpot/kolibri-design-tokens.zip`             | komplettes Bundle für den Penpot-Import                |
| `penpot/svg/*.svg`                             | Komponenten-Exporte je Szenario, Scheme und Zustand    |

## Import in Penpot

1. Tokens: Penpot öffnen → Werkzeuge → Tokens → Import → ZIP (`kolibri-design-tokens.zip`) oder Ordner. Die Theme-Gruppe `Scheme` erscheint mit Light/Dark.
2. Komponenten: SVG-Dateien ziehen oder `Datei → Importieren`; die Ebenennamen (BEM) bleiben erhalten.
3. Aus Instanzen und Tokens größere Oberflächen orchestrieren; Optik kommt aus dem Token-Bundle, nicht aus Handarbeit.

## Weg zu Figma

Dasselbe Token-Bundle importiert das Tokens-Studio-Plugin (gleiches Format), die SVG-Dateien importiert Figma nativ. Component Sets mit Variant-Properties sind Plugin-Arbeit (Konzept #11379, Strategie C) und bisher nicht Teil dieses Pakets.

## Grenzen (Stand dieses Prototyps)

- SVG ist ein statisches, ebenentreues Abbild: Flex/Grid-Layout wird nicht als Layout im Zielwerkzeug rekonstruiert, sondern über absolute Positionen abgebildet. Pseudo-Elemente und Font-Icons (Koli-Font-Glyphen als `<text>`, Font nicht eingebettet) sind nicht verlustfrei — die Toleranzliste der Konzepte gilt weiter.
- Mehrseitige Borders mit unterschiedlichen Breiten kollabieren zu einem einheitlichen Stroke.
- Nur das Default-Theme ist angebunden; weitere Themes folgen über denselben Adapter (Aufnahmekriterium: `kol-theme-global`-Tokens im erwarteten Format).
- Zustände sind auf `default`, `hover`, `focus` beschränkt; `disabled` ist ein Prop und damit ein eigenes Szenario.

## Entwicklung

```bash
pnpm --filter @public-ui/design-export test:unit   # mocha (Extraktion, DTCG, ZIP, IR)
```

Tests laufen gegen die Workspace-Pakete (Theme-dist und Registry über `node_modules`-Symlinks); die Build-Skripte der Pakete müssen gelaufen sein.
