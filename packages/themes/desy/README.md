# Public UI – Desy Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-desy)](https://www.npmjs.com/package/@public-ui/theme-desy)
[![license](https://img.shields.io/npm/l/@public-ui/theme-desy)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-desy)](https://www.npmjs.com/package/@public-ui/theme-desy)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-desy)](https://bundlephobia.com/result?p=@public-ui/theme-desy)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

Das [**Zoll Design System** (Desy)](https://desy.zoll-portal.de/) ist der öffentliche Styleguide der [Generalzolldirektion](https://www.zoll.de/) (Zoll). Dieses Paket stellt zum Styleguide passende Theme für die [Public UI Web Component Library](https://public-ui.github.io) versioniert bereit.

> **Hinweis:** Das Design System wird permanent weiterentwickelt und dieses Theme wird in regelmäßigen Abständen auf eine vereinbarte neuerere Version aktualisiert. Es kann daher vorkommen, dass das Theme nicht immer 100% mit der aktuellsten Version des Design Systems übereinstimmt. Aktuell ist das Theme auf die [Version 11](https://desy.zoll-portal.de/changelog/) des Design Systems abgestimmt.

## Installation & Integration

```bash
pnpm add @public-ui/components @public-ui/theme-desy
```

**React-Beispiel:**

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DesyV11 } from '@public-ui/theme-desy';

register(DesyV11, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<KolButton _label="Klick mich!" />
		</React.StrictMode>,
	);
});
```

Weitere Details: [Getting started](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt)

## Beitrag zum Theme (Contribution)

Du möchtest das Desy-Theme verbessern oder anpassen? So gehst du vor:

1. **Repository forken**
   - Klicke auf [Fork](https://github.com/public-ui/kolibri) auf GitHub und erstelle deinen eigenen Fork.

2. **Lokales Setup**
   - Klone deinen Fork:

     ```bash
        git clone https://github.com/<DEIN_GITHUB_USER>/kolibri.git
        cd kolibri/lib/packages/themes/desy
     ```

   - Installiere die Abhängigkeiten im Monorepo-Hauptverzeichnis:

     ```bash
      pnpm i
      pnpm build
     ```

3. **Entwicklung starten**
   - Wechsle ins Theme-Verzeichnis und starte den Watch-Modus:

     ```bash
      cd kolibri/lib/packages/themes/desy
      pnpm start
     ```

   - Passe die Dateien in `src/` nach deinen Wünschen an.

4. **Commit & Pull Request**
   - Committe deine Änderungen und pushe sie in deinen Fork:

     ```bash
      git add .
      git commit -m "feat(theme-desy): <deine Änderung>"
      git push origin <dein-branch>
     ```

   - Erstelle einen Pull Request auf <https://github.com/public-ui/kolibri/compare>

**Hinweise:**

- Bitte halte dich an die [Contributing Guidelines](../../../CONTRIBUTING.md).
- Vor dem Commit immer `pnpm format` und `pnpm lint` ausführen.
- Für größere Änderungen gerne vorab ein [Issue](https://github.com/public-ui/kolibri/issues/new) eröffnen.

## Weitere Informationen

- [Dokumentation](https://public-ui.github.io)
- [Issues](https://github.com/public-ui/kolibri/issues)
- [Pull Requests](https://github.com/public-ui/kolibri/pulls)
