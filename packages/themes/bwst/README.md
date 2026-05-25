# Public UI – BWSt Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-bwst)](https://www.npmjs.com/package/@public-ui/theme-bwst)
[![license](https://img.shields.io/npm/l/@public-ui/theme-bwst)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-bwst)](https://www.npmjs.com/package/@public-ui/theme-bwst)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-bwst)](https://bundlephobia.com/result?p=@public-ui/theme-bwst)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

Das BWSt Theme erweitert die [Public UI Web Component Library](https://public-ui.github.io) um ein individuelles Design.

## Installation & Integration

```bash
npm install @public-ui/components @public-ui/theme-bwst
```

**React-Beispiel:**

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { BWSt } from '@public-ui/theme-bwst';

register(BWSt, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
```

Weitere Details: [Getting started](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt)

## Beitrag zum Theme (Contribution)

Du möchtest das BWSt-Theme verbessern oder anpassen? So gehst du vor:

1. **pnpm installieren**
   - [pnpm](https://pnpm.io/) wird für die Entwicklung benötigt. Installiere pnpm global, falls noch nicht vorhanden:

     ```bash
     npm install -g pnpm
     ```

2. **Repository forken**
   - Klicke auf [Fork](https://github.com/public-ui/kolibri) auf GitHub und erstelle deinen eigenen Fork.

3. **Lokales Setup**
   - Klone deinen Fork:

     ```bash
     git clone https://github.com/<DEIN_GITHUB_USER>/kolibri.git
     cd kolibri/lib/packages/themes/bwst
     ```

   - Installiere die Abhängigkeiten im Monorepo-Hauptverzeichnis:

     ```bash
     pnpm i
     pnpm build
     ```

4. **Entwicklung starten**
   - Wechsle ins Theme-Verzeichnis und starte den Watch-Modus:

     ```bash
     cd kolibri/lib/packages/themes/bwst
     pnpm start
     ```

   - Passe die Dateien in `src/` nach deinen Wünschen an.

5. **Commit & Pull Request**
   - Committe deine Änderungen und pushe sie in deinen Fork:

     ```bash
     git add .
     git commit -m "feat(theme-bwst): <deine Änderung>"
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

Import and register the theme:

```js
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { BWSt } from '@public-ui/theme-bwst';

register(BWSt, defineCustomElements);
```
