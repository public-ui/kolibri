# aria-labelledby in KoliBri Table

Diese Datei beschreibt die Funktionalitaet rund um \_ariaLabelledby in den Table-Komponenten.

## Ziel

Eine externe Ueberschrift soll als zugaenglicher Tabellenname genutzt werden, auch wenn die Tabelle intern in Shadow-DOM-Strukturen gerendert wird.

## Warum dieser Weg noetig ist

String-IDREFs wie aria-labelledby sind immer tree-scoped.
Das bedeutet: Eine ID ausserhalb des aktuellen Tree-Scopes ist nicht direkt aufloesbar.

Deshalb nutzt KoliBri zwei Schritte:

1. Externe ID im oeffentlichen Wrapper entgegennehmen (\_ariaLabelledby)
2. Externes Element aufloesen und als Element-Referenz in ElementInternals.ariaLabelledByElements setzen

Damit wird keine unsichere Cross-Root-ID-Aufloesung ueber reine String-IDREFs erzwungen.

## Ablauf im Detail

1. Property-Validierung

- validateAriaLabelledby prueft, ob der Wert ein String oder undefined ist.

2. Ziel-Elemente aufloesen

- resolveTargets sucht im passenden Root-Context nach den angegebenen IDs.
- Dabei wird CSS.escape beruecksichtigt, damit auch IDs mit Sonderzeichen robust funktionieren.

3. ElementInternals befuellen

- Die gefundenen Elemente werden in internals.ariaLabelledByElements geschrieben.
- Damit kann der Browser den Accessible Name ueber Element-Referenzen ableiten.

4. Interne Weitergabe an die WC-Implementierung

- Der Wrapper gibt die aufgeloesten Elemente als externalLabelElements an die interne Tabelle weiter.
- Die interne Tabelle setzt ihrerseits ElementInternals entsprechend.

## Warum die interne Host-ID auf kol-table-stateless-wc liegt

Die zusaetzliche ID wird bewusst am Host der internen WC-Implementierung (`kol-table-stateless-wc`) gesetzt.
Grund: Das echte `<table>` liegt in genau diesem Render-Tree und kann eine ID-Referenz in demselben Kontext stabil nutzen.

Warum nicht auf `kol-table-stateless` oder `kol-table-stateful`?

- Diese oeffentlichen Wrapper sind nicht der direkte semantische Tabellen-Host.
- Je nach Shadow-/Wrapper-Struktur kann eine reine String-IDREF auf den aeusseren Host tree-uebergreifend werden.
- Das ist fuer `aria-labelledby` fragil, weil IDREF-Aufloesung immer am aktuellen Tree-Context haengt.

Mit der ID am internen Host bleibt die interne Tabellen-Beschriftung robust,
waehrend externe Labels weiterhin ueber `ariaLabelledByElements` (Element-Referenzen) angebunden werden.

## Retry-Verhalten

Wenn das externe Label-Element beim ersten Lauf noch nicht im DOM vorhanden ist, erfolgt ein kurzer Retry.
Das reduziert Timing-Probleme bei spaeter gerenderten Headlines.

## Wichtige Begriffe

- \_ariaLabelledby: Oeffentliche Property auf den Wrapper-Komponenten
- validateAriaLabelledby: Validator + Synchronisierung der aufgeloesten Label-Elemente
- HostInternals: Minimaltyp fuer ElementInternals mit ariaLabelledByElements
- externalLabelElements: Interne Weitergabe der aufgeloesten Elemente an die WC-Variante

## Ergebnis fuer Accessibility

Die Tabelle behaelt eine korrekte interne Semantik und erhaelt trotzdem einen stabilen Accessible Name aus einer externen Ueberschrift.
So bleiben Screenreader-Navigation und Tabellenansage konsistent.
