# Migration

## Einleitung

Neue Major-Versionen von KoliBri werden mit dem Ziel entwickelt, die Wartung und Pflege zu vereinfachen und Weiterentwicklung zu fördern.

Dies bedeutet, dass ggf. Komponenten, Eigenschaften oder Funktionalitäten entfernt werden und technologische Voraussetzungen geschaffen werden, um einen zukünftigen innovativen Wandel zu begünstigt.

- **Wartungs- und Pflegestrategie:**<br/>
  Wir werden immer die neuste und die vorherige Major-Version von KoliBri pflegen. Dies bedeutet, dass wir für diese Versionen Fehler beheben und Sicherheitslücken schließen. Für alle anderen Versionen werden wir ohne Weiteres keine Fehlerbehebungen oder Sicherheitsupdates mehr bereitstellen.
- **Weiterentwicklung:**<br/>
  Wir werden immer die neuste Major-Version von KoliBri weiterentwickeln. Dies bedeutet, dass wir für diese Versionen neue Features und Funktionalitäten bereitstellen. Für alle anderen Versionen werden wir ohne Weiteres keine neuen Features oder Funktionalitäten mehr bereitstellen.
- **Vor der Migration einen lauffähigen Stand sichern:**<br/>
  Bevor die Migration erfolgt, empfehlen wir einen lauffähigen Stand einzuchecken und somit keine uncommiteten Änderungen auf dem zu migrierenden Quellcode zu haben. Während und nach der Migration können so alle Änderungen gut nachvollzogen und geprüft werden.
- **Migrationstool:**<br/>
  Wir stellen ein Migrationstool bereit, welches generell die Migration von Quellcode mit KoliBri unterstützt. Dieses Tool ist in der Lage, die meisten Breaking Changes automatisch zu migrieren. Weitere Informationen finden Sie in der [Tool-Dokumentation (EN)](https://www.npmjs.com/package/@public-ui/kolibri-cli).
- **Hilfe und Feedback:**<br/>
  Sollte es Probleme bei der Migration geben, stehen wir gerne zur Verfügung. Bitte eröffnen Sie ein [Issue auf GitHub](https://github.com/public-ui/kolibri/issues/new/choose).

## Migration von Version 1 auf Version 2

### Hinweise zum Upgrade auf Version 2

1. **Neue Eigenschaften in Version 2 bereits ab Version 1.7 verfügbar:**<br/>
   Die meisten neuen Eigenschaften, die in Version 2 eingeführt werden, sind bereits ab der Version 1.7 und höher verfügbar. Dies bedeutet, dass Anwendungen, die auf Version 1.7 oder höher basieren, möglicherweise bereits über die erforderlichen Funktionen verfügen, um eine reibungslose Migration zu ermöglichen.

2. **Entfernte Eigenschaften, Komponenten und Funktionalitäten waren in Version 1.7 und höher bereits als veraltet markiert:**<br/>
   Alle Eigenschaften, Komponenten und Funktionalitäten, die in Version 2 entfernt wurden, waren in Version 1.7 und höher bereits als veraltet (`deprecated`) gekennzeichnet. Wenn Sie also regelmäßig Ihre Codebasis aktualisiert haben, sollten Sie bereits darauf vorbereitet sein, diese Elemente zu ersetzen.

3. **Migration ab Version 1.7 minimiert potenzielle Änderungen:**<br/>
   Eine Migration von Version 1.7 und höher auf Version 2 wird voraussichtlich die geringsten Anpassungen erfordern. Die Wahrscheinlichkeit von Inkompatibilitäten ist niedrig, da die meisten Änderungen und Entfernungen bereits in den vorherigen Versionen als veraltet markiert wurden.

4. **Migration ab Version 1.4 ist möglich:**<br/>
   Obwohl eine Migration ab Version 1.7 empfohlen wird, ist es auch möglich, von Version 1.4 auf Version 2 zu migrieren. Beachten Sie jedoch, dass dies möglicherweise zusätzliche Anpassungen erfordert, da einige der notwendigen Funktionen möglicherweise erst ab Version 1.7 verfügbar sind.

5. **Vereinfachte Registrierung beachten:**<br/>
   Wir haben in Version 1 und für Version 2 die Modularisierung von KoliBri vereinfacht. Das Modul `@public-ui/core` wurde entfernt und die Funktionalitäten in das Modul `@public-ui/components` verschoben.

```diff
  - import { register } from '@public-ui/core';
  + import { register } from '@public-ui/components';
  import { defineCustomElements } from '@public-ui/components/dist/loader';
  import { MyTheme } from '...';
  await register(MyTheme, defineCustomElements);
```

### Breaking Changes für Version 2

Mehr Informationen zu Breaking Changes finden Sie in der Dokumentation [BREAKING_CHANGES.v2.md (EN)](https://github.com/public-ui/kolibri/blob/develop/docs/BREAKING_CHANGES.v2.md).

## Migration durchführen

> [!TIP]
> Wir empfehlen, die Migration mit dem Migrationstool durchzuführen. Dieses Tool ist in der Lage, die meisten Breaking Changes automatisch zu migrieren. Weitere Informationen finden Sie in der [Tool-Dokumentation (EN)](https://www.npmjs.com/package/@public-ui/kolibri-cli).

### Migration mit Migrationstool

1. **Vorbereitung:**<br/>
   Das Projekt ist auf einer früheren Version, alle Abhängigkeiten sind installiert, das Projekt ist lauffähig und alle Änderungen sind eingecheckt und sicher gepusht.
2. **Migration ausführen:**<br/>
   Führen Sie den folgenden Befehl aus, um das Migration auszuführen: `npx @public-ui/kolibri-cli migrate src`
3. **Migration prüfen:**<br/>
   Prüfen Sie die Änderungen und führen Sie die Anwendung aus, um sicherzustellen, dass alles wie erwartet funktioniert.

### Migration manuell durchführen

1. **Vorbereitung:**<br/>
   Das Projekt ist auf einer früheren Version, alle Abhängigkeiten sind installiert, das Projekt ist lauffähig und alle Änderungen sind eingecheckt und sicher gepusht.
2. **Migration durchführen:**<br/>
   Führen Sie die Migration durch, indem Sie die Breaking Changes in der jeweiligen Dokumentation.
