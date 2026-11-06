# KoliBri-Komponenten in Penpot bereitstellen

**Konzept, Version 1.0.** Alternative zum Figma-Konzept v1.0 (`docs/figma/konzept-final.md`). Der Aufbau folgt jenem Konzept Abschnitt für Abschnitt, damit beide Dokumente direkt vergleichbar sind. Die Zwischenrepräsentation ist in beiden Konzepten dieselbe; Penpot ersetzt das Zielwerkzeug, nicht die Herleitung.

## 1. Ausgangslage und Zielrichtung

KoliBri ist code-first. Die Komponenten leben als Web Components in `packages/components`, die Optik liegt vollständig in den Theme-Paketen (`packages/themes/*`). Das Fünf-Layer-Modell trennt Struktur von Optik, die Farb- und Abstandswerte fließen über Design-Tokens (`--kolibri-*`). Die Richtung bleibt auch hier Code zu Design-Werkzeug: Die Penpot-Datei ist ein generiertes Abbild des Codes, vergleichbar mit generierter API-Dokumentation. Der Code bleibt die einzige Quelle der Wahrheit; Änderungswünsche an der Optik laufen über Issues und Code.

Penpot ist ein Open-Source-Werkzeug (MPL 2.0) und lässt sich selbst hosten; daneben besteht eine SaaS-Variante unter penpot.app. Für den Einsatz in der öffentlichen Hand sind zwei Eigenschaften ausschlaggebend: Es fallen keine Lizenzkosten nach Planstufen und Sitzen an, und bei einer selbst gehosteten Instanz bleibt die Datenhoheit vollständig in der eigenen Infrastruktur. Penpot rechnet SVG-basiert, und sein Token-Format folgt dem Design Tokens Format der W3C-DTCG; die Token-Definitionen sind damit ein normales, versionsfähiges JSON-Artefakt des Builds.

## 2. Nicht-Ziele

- Kein Penpot-to-Code, kein Write-back aus Penpot in Tokens oder SCSS. Der eingebaute Token-Export erzeugt zwar DTCG-JSON, dieses fließt nie in das Repository zurück; die Richtung bleibt Code zu Datei.
- Keine Abbildung von Verhalten: Tastaturbedienung, Fokus-Reihenfolge, Animationen und Ereignisbehandlung bleiben im Code und in den Playwright-Tests.
- Die Forced-Colors-Layer (`kol-forced-colors`, `kol-theme-forced-colors`) werden im Abbild nicht geführt.
- Keine Ersetzung der visuellen Tests; das Diff-Gate ist ein zusätzliches Gate.

Statische Zustände (Hover, Fokus, Active, Disabled) gehören auch hier ins Modell.

## 3. Architekturübertragung

| KoliBri                                                             | Penpot                                                                                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Design-Tokens im Theme (`--kolibri-color-primary`, `--spacing`, …)  | Penpot Design Tokens in Token-Sets, erzeugt als DTCG-JSON                                                                      |
| Color Scheme (Light/Dark)                                           | Token-Themes einer Theme-Gruppe, je Gruppe genau eine aktive Option; Aktivierung dateiweit über das Themes-Menü                |
| Theme-Paket (default, bwst, desy, kern)                             | publizierte Penpot-Library mit Komponenten und Token-Sets                                                                      |
| Komponenten-Struktur (BEM-DOM)                                      | Hauptkomponente mit verschachtelten Instanzen, Ebenennamen folgen Tag-Name und BEM                                             |
| Theme-Optik je Komponente                                           | Token-Bindung an Fill, Stroke, Radius, Stroke-Breite, Shadow und Typografie                                                    |
| Visuell relevante Props (`_variant`, `_type`, `_disabled`, `_open`) | Variant-Properties, Namen ohne Unterstrich (`Type`, `Disabled`)                                                                |
| Statische Zustände inklusive Fokus                                  | Variant-Property (`State`: Default, Hover, Focus, Active, Disabled)                                                            |
| Text-Props (`_label`, `_hint`, `_msg`)                              | Textinhalt der Instanz, direkt editiert; ein formalisiertes Text-Property wie in Figma existiert nicht                         |
| Slot und Embedded Items (verschachtelte Komponenten)                | verschachtelte Instanzen; Austausch über das Instanz-Menü, ein Instance-Swap-Property als Komponenten-Property existiert nicht |
| Auto Layout                                                         | Flex-Layout; zusätzlich steht CSS-Grid zur Verfügung und macht den Table-Fall grundsätzlich abbildbar                          |

Komponenten im Abbild referenzieren ausschließlich Token, nie harte Farbwerte. Die Mindestgröße interaktiver Elemente folgt `--a11y-min-size` und ist rem(44), also von der Schriftgröße abhängig, kein fester Pixelwert. Der wichtigste Unterschied zum Figma-Modell liegt in der Zeile zum Color Scheme: Penpot schaltet Themes dateiweit um, Figma am Frame. Die Konsequenzen stehen in Abschnitt 6.

## 4. Quellen der Zwischenrepräsentation

Unverändert aus dem Figma-Konzept übernommen. Die IR (Zwischenrepräsentation als versioniertes JSON mit JSON-Schema und Schemaversion) speist sich aus denselben drei Quellen: `custom-elements.json` als API-Quelle, die Theme-Adapter (SCSS) zur Auflösung der Token-Ketten und die gerenderten Samples für die DOM- und BEM-Struktur.

Die IR ist das werkzeugneutrale Artefakt dieses Vorhabens. Sie ändert sich gegenüber dem Figma-Konzept nicht; erst nach der IR verzweigt der Generator in einen Adapter je Zielwerkzeug. Der Aufwand für die drei Quellen zahlt damit in beide Konzepte ein, und eine spätere Erweiterung um ein drittes Ziel (etwa ein weiteres Design-Werkzeug) kostet nur den Adapter. Das Aufnahmekriterium für ein Theme bleibt der `kol-theme-global`-Layer mit `:host`-Tokens im erwarteten Format.

## 5. Komponentenmodell im Abbild

- Ebenennamen folgen exakt Tag-Name und BEM-Klassen (`kol-button`, `kol-button__label`). Die DOM-Struktur samt BEM ist Theming-Vertrag; Designer und Entwickler sehen dieselben Namen.
- Ein Komponenten-Set je KoliBri-Komponente. Properties werden kuratiert: Nur visuell relevante Props werden Varianten, alles andere bleibt außen vor. Das verhindert die kombinatorische Explosion.
- Zustände inklusive Fokus sind Variant-Properties; Fokus-Ring und Hover-Optik sind statisch abbildbar.
- Icons, Slots und Embedded Items sind verschachtelte Instanzen. Die Items-Architektur (Komponenten rendern Kind-Komponenten) spiegelt sich als Nesting. Der Default-Slot heißt in den Metadaten `""`; die Namenskonvention für seinen Austausch wird vor Phase 1 festgelegt.
- Auto Layout ist die Regel: Der Table-Fall, der im Figma-Konzept als Ausnahme in der Toleranzliste landet, ist mit dem CSS-Grid von Penpot grundsätzlich abbildbar. Es gibt offene Fehlerberichte, wonach Grids die Geometrie verschachtelter Varianten nach einem Neuladen verändern (Penpot-Issue #12803); der Phase-0-Spike prüft die Stabilität am Table-Fall. Dialog-Overlay und `::part`-Styling bleiben auch hier Ausnahmen.
- `kol-tooltip-wc` bleibt außen vor (deprecated, nur für DESYBRI gepflegt).
- Font-Icons sind themeabhängig und im Abbild austauschbare Instanzen; das Diff-Gate behandelt sie über die Toleranzliste.

## 6. Themes in Penpot

Der Generator erzeugt aus dem Theme-Adapter je Theme ein DTCG-JSON mit identischen Token-Namen, IR-seitig erzwungen. Die Token-Sets folgen der empfohlenen Struktur: ein Set mit den themeunabhängigen Basistoken, daneben je Scheme ein Set mit gleichen Namen und anderen Werten. Je Theme entsteht eine Theme-Gruppe mit den Optionen Light und Dark; innerhalb der Gruppe ist genau eine Option aktiv, und mehrere Gruppen lassen sich kombinieren. Der Import läuft über die eingebaute Token-Verwaltung, die das DTCG-Format nativ versteht; für die Tokens allein braucht es kein Plugin. Das JSON liegt als Artefakt im Build und ist damit versionierbar und prüfbar, bevor es die Datei erreicht.

Der sachliche Unterschied zum Figma-Konzept liegt im Aktivierungs-Scope: Penpot schaltet Themes über das Themes-Menü um, und das gilt für die Datei, während Figma den Mode am Frame setzt. Die Laufzeitregel der Komponenten, dass die Anwendung das Scheme pro Umfeld setzt („App owns the scheme“), spiegelt sich damit schwächer. Praktisch heißt das: Frames für Light und Dark liegen getrennt, etwa als zwei Frame-Gruppen oder zwei Seiten, und die Umschaltung geschieht durch Aktivieren der Theme-Option vor dem Betrachten. Ein einzelner Frame, in dem beide Schemes nebeneinander stehen, entfällt. Ob dieser Verlust den Alltag trägt, ist Teil des Phase-0-Spikes und in Abschnitt 13 als Wegscheide benannt.

Veröffentlicht wird je Theme eine eigene Library mit Komponenten und Token-Sets, damit angeschlossene Organisationen nur ihr Theme abonnieren. Wie sich Bindungen beim Austausch einer Token-Library verhalten (Auflösung per Kennung oder per Name), ist offen und wird im Spike geprüft; das Pendant dazu ist der Library-Swap-Spike des Figma-Konzepts. Bei einer selbst gehosteten Instanz lässt sich dieses Verhalten direkt und versionsfest untersuchen, statt es über Fremdbeobachtung abzuleiten.

Schriften sind auch in Penpot keine Token. Je Theme entsteht ein Text-Style-Set für `--font-family` und `--font-size`. Penpot verwaltet Schriften instanzseitig; Verdana ist proprietär und auf einer Linux-Instanz nicht vorhanden. Die Instanz braucht eine registrierte, frei lizenzierbare Ersatzschrift mit vergleichbaren Metriken; Kandidaten werden in Phase 0 geprüft und im Gate gegen das Referenz-SVG verifiziert. Im Code und in den Themes bleibt Verdana unverändert.

## 7. Erzeugungsstrategien

- **A: Import gerenderter Komponenten** über ein HTML-Import-Plugin. Gleiche Einordnung wie im Figma-Konzept: manuelles Plugin ohne Automatisierungs-API, glättet Shadow DOM, importiert Font-Icons als kaputte Glyphen, erzeugt nichtdeterministische Ebenennamen. Als Release-Quelle unbrauchbar.
- **B: Generativer Aufbau über die Plugin-API** aus der IR. Die API schafft Komponenten aus Shapes (`createComponent` am Library-Objekt), hält werkzeugspezifische Daten am Knoten (Plugin-Daten, das Pendant zu Figmas `pluginData`) und bindet Token an Fills. Die Ausführung läuft wie bei Figma in der geöffneten Anwendung; Import und Aktualisierung bleiben manuelle Schritte. Ob auch Variant-Sets über die API anlegbar sind, ist heute nicht belegt und Teil des Plugin-Prototyps in Phase 0.
- **C (gewählt): B plus deterministisches Diff.** Penpot exportiert Frames als SVG und PNG, der Export ist aus Plugins erreichbar (das offizielle SVG-Exporter-Plugin zeigt den Weg). Das Gate vergleicht diese Exporte mit den Playwright-Screenshots der Sample-App. Da SVG die Ebenennamen und die Struktur trägt, kann das Gate die BEM-Vertragsprüfung zusätzlich auf den Export anwenden; das ist gegenüber dem reinen Pixelvergleich des Figma-Konzepts ein Gewinn.

## 8. Pipeline, Gate und Versionierung

**Je Merge auf develop** (billig, frühe Warnung): identisch zum Figma-Konzept. Der Build erzeugt `custom-elements.json`, Theme-Adapter und DOM-Extraktion erzeugen die IR, ein IR-Diff-Bericht zeigt, welche Komponenten sich visuell relevant geändert haben.

**Je Release-Kandidat:** Import des Token-JSON über die eingebaute Verwaltung, Import der Komponenten über das Plugin, danach der Gate-Lauf: Playwright-Screenshots der Sample-App gegen SVG- beziehungsweise PNG-Export der Frames. Null-Layout-Delta über Light und Dark; nur Farbdifferenzen sind erlaubt, und nur für die in der Toleranzliste genannten nicht abbildbaren Details (Pseudo-Elemente, Font-Icons). Der Kontrastnachweis der Theme-Paare gehört zum Gate. Für den Vergleich stehen zwei Ebenen zur Wahl: der geometrische Strukturvergleich der SVG-Exporte (deterministisch, ohne Bildauflösung als Einflussgröße) und der Bildvergleich wie im Figma-Konzept. Der Strukturvergleich ist die erste Wahl, der Bildvergleich dient als Kontrolle.

**Inkrement-Regeln für das Plugin** (wie im Figma-Konzept): IR-IDs werden in den Plugin-Daten am Knoten persistiert. Bestehende Sets werden nie gelöscht und neu angelegt, weil Komponenten-Verweise brechen und Konsumenten-Instanzen sich auflösen. Umbenennungen sind erlaubt. Property-Namen sind veröffentlichte Library-API: einmal festgelegt, dann stabil.

**Versionierung:** Die IR ist wie im Figma-Konzept ein versioniertes Artefakt mit eigener Schemaversion und den Quellversionen. Jede publizierte Theme-Library trägt eine Composite-Version aus Komponenten- und Theme-Version. Die Instanz läuft auf einer gepinnten Penpot-Version; ein Instanz-Update ist Gate-relevant und wird wie ein Toolchain-Update behandelt, dieselbe Disziplin wie bei den Snapshot-Toolchains der Komponenten. Ältere Library-Stände bleiben abrufbar; das offene Dateiformat erlaubt zusätzlich den Archivexport als Datei.

## 9. Rollout

| Phase   | Inhalt                                                                                                                                                                                                                                                                                                 | Aufwand                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| 0       | Fünf Spikes: Token-Theme-Verhalten (Aktivierung, Auflösung, Gruppenlogik), Token-Library-Tausch, Plugin-Prototyp an Button und InputText inklusive Token-Bindung und Varianten-Anlage, SVG-Export-Pfad (Programmierbarkeit und Determinismus), Grid mit Varianten am Table-Fall                        | 10 bis 18 Personentage       |
| 1       | Pilot: dieselben acht Komponenten wie im Figma-Konzept (Button, InputText mit Fehlermeldung, Alert mit Closer, Accordion mit Slot, Card mit Slot-Nesting, Dialog als Overlay-Grenze, eine Icon-Komponente, Table); Default-Theme, Light und Dark als getrennte Frame-Gruppen, Zustände inklusive Fokus | 15 bis 25 Personentage       |
| 2       | Vollausbau: 46 thematisierte Komponenten des Default-Themes inklusive Variantenmatrizen, inkrementelles Update, anschließend bwst, desy, kern über ihre Adapter                                                                                                                                        | 45 bis 90 Personentage       |
| 3       | Publish-Workflow, Gate-Läufe in CI, Dokumentation, Schulung, Instanz-Betrieb (bei Selbsthosting) und Design-Ops                                                                                                                                                                                        | 15 bis 25 Personentage       |
| laufend | Plugin-Unterhalt, Update-Prüfung der gepinnten Instanz, Toleranzlisten-Pflege                                                                                                                                                                                                                          | fortlaufend, eigene Position |

Der Pilot baut bewusst auf denselben acht Komponenten wie das Figma-Konzept, damit die Ergebnisse beider Piloten direkt vergleichbar sind. Das Aufwandsband bleibt innerhalb des Figma-Konzepts; die IR-Arbeit ist identisch und fällt nur einmal an, wenn beide Ziele verfolgt werden.

## 10. Rollen und Eigentümerschaft

| Artefakt                            | Eigentümerschaft                                                        |
| ----------------------------------- | ----------------------------------------------------------------------- |
| Generator, IR-Schema                | Komponenten-Team; das IR-Schema ist gemeinsamer Vertrag mit dem Design  |
| Penpot-Plugin                       | technisch beim Komponenten-Team bis Ende Phase 2, danach bei Design-Ops |
| Penpot-Dateien und Theme-Libraries  | Design-Verantwortliche, inklusive Publish-Freigabe und Gate-Freigabe    |
| Instanz-Betrieb (bei Selbsthosting) | Infrastruktur und Design-Ops gemeinsam                                  |
| Toleranzlisten je Komponentenklasse | Design und Komponenten-Team gemeinsam, dokumentiert im generierten File |

## 11. Scope der Themes

Identisch zum Figma-Konzept. Aufgenommen werden Themes, deren `kol-theme-global`-Layer `:host`-Tokens im erwarteten Format liefert; das erfüllen default, bwst, desy und kern. d-you (kein `src/`, nur assets, icons, dist) und ecl (Struktur `ecl-ec`/`ecl-eu` ohne per-Komponenten-Mixins, ohne `light-dark()` und `color-scheme`) bleiben auch hier außerhalb. Der Befund zum leeren, nicht versionierten `figma`-Ordner in `packages/themes/d-you` gilt unverändert.

## 12. Risiken

- **Dateiweite Scheme-Umschaltung.** Kein unbekanntes Risiko, sondern dokumentiertes Verhalten; Wirkung mittel. Getrennte Frame-Gruppen mildern es, die frame-gebundene Prüfung beider Schemes entfällt dennoch. Die Entscheidung darüber ist die Wegscheide in Abschnitt 13.
- **Junge Plugin-API.** Penpot entwickelt die API schneller weiter, Breaking Changes und Dokumentationslücken sind wahrscheinlicher als bei Figma. Gegenmittel: gepinnte Instanz, Spikes zuerst, Plugin klein halten.
- **Grid mit Varianten.** Der offene Fehler #12803 kann den Table-Fall zurück in die Toleranzliste holen. Kein Blocker; der Fall ist im Figma-Konzept ohnehin toleranzgelistet.
- **Font-Ersatz.** Eine Ersatzschrift mit abweichenden Metriken verschiebt Layouts. Das Gate gegen das Referenz-SVG fängt Abweichungen auf; die Wahl der Schrift ist dennoch sorgfältig zu treffen.
- **Instanz-Betrieb.** Bei Selbsthosting kommen Wartung, Backups und Update-Prüfung als feste Position hinzu. Bei penpot.app entfällt sie, und die Datenhoheit geht zur SaaS.
- **Gate-Disziplin.** Wie im Figma-Konzept: Null-Layout-Delta als harte Regel, Toleranzlisten nur für benannte, nicht abbildbare Details.
- **Konkurrierende manuelle Änderungen** an der Penpot-Datei während des Imports; der Import-Prozess definiert eine Sperrvereinbarung und arbeitet mit der Datei-Historie.
- **Kleineres Ökosystem.** Weniger fertige Importeure und Plugins als bei Figma. Die generative Strategie macht davon wenig Gebrauch, weil nichts Fremdes importiert wird.

## 13. Entscheidungsbedarf

1. Wegscheide Scheme-Umschaltung: Ist die dateiweite Aktivierung akzeptabel, oder ist das frame-gebundene Mode-Modell von Figma ein Muss? Diese Frage entscheidet zwischen beiden Konzepten (Design).
2. Instanz: selbst gehostet oder penpot.app; bei Selbsthosting, wer betreibt sie (Leitung, Infrastruktur).
3. Ersatzschrift für die Instanz bei Selbsthosting (Design, A11y); Verdana bleibt im Code.
4. Beide Ziele aus einer IR: Verbleiben beide Werkzeuge im Einsatz, wird der Generator um einen Adapter je Ziel erweitert, statt zwei eigenständige Pipelines zu pflegen (Architektur).
5. Plugin im Monorepo mit dokumentiertem Release-Prozess oder separates Repository (Architektur); identische Frage wie im Figma-Konzept, dieselbe Entscheidung kann beide Fälle bedienen.
6. CI-Credentials für den Gate-Lauf gegen die Instanz und Sperrvereinbarung für die Zieldatei (Architektur).
7. Duplikate beim Instanz-Austausch bei mehreren Theme-Libraries: akzeptieren oder Namenspräfixe je Theme (Design).

## 14. Herleitung

Dieses Konzept ist aus dem Figma-Konzept v1.0 (PR #11379) abgeleitet. Struktur und Zwischenrepräsentation sind absichtlich identisch. Die Unterschiede je Abschnitt: Die Architekturübertragung (Abschnitt 3) trägt Token-Themes mit dateiweiter Aktivierung statt Frame-Modes; der Table-Fall rückt von der Toleranzliste in den abbildbaren Bereich (CSS-Grid, mit Spike-Vorbehalt); die Tokens erreichen die Datei als DTCG-JSON über den eingebauten Import statt über ein Plugin; das Gate gewinnt die Option des geometrischen SVG-Vergleichs; neu sind Font-Ersatz und Instanz-Betrieb als Aufwandspositionen. Die Aufwände bleiben innerhalb der im Figma-Konzept genannten Bänder.
