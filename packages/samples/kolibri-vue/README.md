# Basis-Projekt für JavaScript-basierte Webanwendungen

> **Keywords:** <u>S</u>ingle-<u>P</u>age-<u>A</u>pplication (SPA), <u>P</u>rogressive-<u>W</u>eb-<u>A</u>pplication (PWA), React, KoliBri

## Package Manager

Für `Node.js` gibt es `NPM` als primären Package Manager. Um den gesamten Entwicklungsprozess (Code, DevOps, Betrieb) so schlank wie möglich zu halten, wird sehr darauf geachtet, dass die Tools nicht unnötig erweitert werden. Daher verzichten wir auf den primären Einsatz von z.B. `PNPM` oder `Yarn`.

> Unter der Voraussetzung, dass die `package-lock.json` im Git synchron gehalten wird, kann lokal in der Entwicklung auch `PNPM` verwendet werden. Bei `PNPM` werden die Ressourcen der Entwicklungsumgebung geschont, da alle Abhängigkeiten Projekt-übergreifend nur einmal installiert werden. Aus diesem Grund ist auch eine erneute Installation deutlich schneller als mit `NPM`.

## Installation

Um die Abhängigkeiten des Projekts zu installieren, wird folgender Befehl verwendet:

`npm i` oder alternativ `npm i --legacy-peer-deps`, wenn es nachvollziehbare Probleme mit den Peer-Dependencies gibt.

## Entwicklung

Zum Entwickeln der Anwendung wird folgender Befehl verwendet:

`npm start`

## Testen

Zum Testen gibt es unterschiedliche Szenarien, die jeweils in den folgenden Unterabschnitten dargestellt werden.

### Unit-Testen

Unit-Tests lassen sich wie folgt ausführen:

`npm test` oder mit Coverage-Bericht `npm run coverage`

### E2E-test

E2E-Tests lassen sich wie folge ausführen:

`npm run nightwatch -- -e chrome`
