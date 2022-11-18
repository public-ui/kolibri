# Getting Started

Dieses Beispiel setzt voraus, dass Sie bereits eine React-Projekt erstellt haben und **KoliBri** nun dort integrieren möchten.

## Schritt für Schritt-Anleitung

### 1. Installieren der KoliBri-Bibliotheken

`npm i @public-ui/core @public-ui/components @public-ui/react @public-ui/themes`

oder

`pnpm i @public-ui/core @public-ui/components @public-ui/react @public-ui/themes`

oder

`yarn add @public-ui/core @public-ui/components @public-ui/react @public-ui/themes`

### 2. Einbinden von Schriftarten

Schriftarten, sogenannte Fonts, werden von Natur aus losgelöst vom CSS geladen und müssen je nach **KoliBri**-Theme (Styleguide) in die projektspezifische Rahmenseite (`index.html`) eingebunden werden.

Hierzu können die in der Bibliothek mitgelieferten Schriftarten in die eigenen Assets kopiert werden.

z.B. `cp -r node_modules/@public-ui/themes/assets public/assets`

Anschließend können die relevanten CSS-Dateien mit den Schriftart-Definitionen im `<head>` der Rahmenseite (`index.html`) eingebunden werden.

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
	<head>
		<title>Webanwendung | KoliBri</title>
		<meta charset="UTF-8" />
		<meta name="description" content="..." />
		<base href="/" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico" />
		<link rel="stylesheet" href="assets/bund/bund.css" />
		<link rel="stylesheet" href="assets/bund.hack.css" />
		<link rel="stylesheet" href="assets/codicons/codicon.css" />
		<link rel="stylesheet" href="assets/noto-sans/noto-sans.css" />
		<!-- <link rel="stylesheet" href="assets/fontawesome-free/v5/css/all.min.css" /> -->
		<link rel="stylesheet" href="assets/fontawesome-free/v6/css/all.min.css" />
		<link rel="stylesheet" href="assets/icofont/icofont.min.css" />
	</head>
</html>
```

### 3. Registrieren des KoliBri-Loaders

Nachdem die Vorbereitungen abgeschlossen sind, muss nur noch der KoliBri-Loader registriert werden.
Er sorgt dafür, dass die Web Components asynchron (lazy) nachgeladen werden, sobald sie in der Webseite verwendet werden.

| Methode              | Erläuterung                                             |
| -------------------- | ------------------------------------------------------- |
| register             | Setzt ein Theme und registriert anschließend den Loader |
| BMF                  | Registriert den Loader für z.B. das BMF-Theme           |
| defineCustomElements | Registriert den Loader für die Web Components           |

#### Integration

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import { AppComponent } from './components/app/component';

import { register } from '@public-ui/core';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/themes';

register(BMF, defineCustomElements)
	.then(() => {
		const htmlDivElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlDivElement instanceof HTMLDivElement) {
			const root = createRoot(htmlDivElement);
			root.render(<AppComponent />);
		}
	})
	.catch(console.warn);
```

#### Beispiel

```tsx
import React from 'react';
import { KolSpin } from '@public-ui/react';

export const AppComponent = () => {
	return (
		<div>
			<KolSpin _show />
		</div>
	);
};
```
