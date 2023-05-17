# Getting Started

Dieses Beispiel setzt voraus, dass Sie bereits eine React-Projekt erstellt haben und **KoliBri** nun dort integrieren möchten.

## Schritt für Schritt-Anleitung

### Einbinden von Schriftarten

Schriftarten werden von Natur aus losgelöst vom CSS geladen und müssen je nach **KoliBri**-Theme in die projektspezifische Rahmenseite (`index.html`) eingebunden werden.

Hierzu können die in der Bibliothek mitgelieferten Schriftarten in die eigenen Assets kopiert werden: `node_modules/@public-ui/themes/assets`, oder eigene verwendet werden.

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
	<head>
		<title>Webanwendung | KoliBri</title>
		<meta charset="UTF-8" />
		<meta name="description" content="..." />
		<base href="/" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="shortcut icon" type="image/x-icon" href="assets/kolibri.ico" />
		<link rel="stylesheet" href="assets/bpa-icons/style.css" />
		<link rel="stylesheet" href="assets/bundes/style.css" />
		<link rel="stylesheet" href="assets/codicons/codicon.css" />
		<link rel="stylesheet" href="assets/fontawesome-free/css/all.min.css" />
		<link rel="stylesheet" href="assets/icofont/icofont.min.css" />
		<link rel="stylesheet" href="assets/kreon/style.css" />
		<link rel="stylesheet" href="assets/noto-sans/noto-sans.css" />
		<link rel="stylesheet" href="assets/material-icons/iconfont/material-icons.css" />
		<link rel="stylesheet" href="assets/material-symbols/index.css" />
		<link rel="stylesheet" href="assets/roboto/roboto.css" />
		<link rel="stylesheet" href="assets/tabler-icons/tabler-icons.css" />
	</head>
</html>
```

### I React

#### 1. Installieren der KoliBri-Bibliotheken

`npm i @public-ui/components @public-ui/react @public-ui/themes`

oder

`pnpm i @public-ui/components @public-ui/react @public-ui/themes`

oder

`yarn add @public-ui/components @public-ui/react @public-ui/themes`

#### 2. Registrieren des KoliBri-Loaders

Nachdem die Vorbereitungen abgeschlossen sind, muss nur noch der KoliBri-Loader registriert werden.
Er sorgt dafür, dass die Web Components asynchron (lazy) nachgeladen werden, sobald sie in der Webseite verwendet werden.

| Methode              | Erläuterung                                             |
| -------------------- | ------------------------------------------------------- |
| register             | Setzt ein Theme und registriert anschließend den Loader |
| DEFAULT              | Registriert den Loader für z.B. das DEFAULT-Theme       |
| defineCustomElements | Registriert den Loader für die Web Components           |

#### 3. Integration

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import { AppComponent } from './components/app/component';

import { register } from '@public-ui/core';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

register(DEFAULT, defineCustomElements)
	.then(() => {
		const htmlDivElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlDivElement instanceof HTMLDivElement) {
			const root = createRoot(htmlDivElement);
			root.render(<AppComponent />);
		}
	})
	.catch(console.warn);
```

#### 4. Beispiel

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

### II Vite + Vue

#### 1. Installieren der KoliBri-Bibliotheken
<kol-tabs _headers="['npm', 'pnpm', 'yarn']" _tabs='[{"_label":"NPM"},{"_label":"PNPM"},{"_label":"YARN"}]'>
	<div>`npm i @public-ui/components @public-ui/themes`</div>
	<div>`pnpm i @public-ui/components @public-ui/themes`</div>
	<div>`yarn add @public-ui/components @public-ui/themes`</div>
</kol-tabs>

#### 2. Plugin

kolibri.plugin.ts
```js
import type { Plugin } from 'vue'
import { defineCustomElements } from '@public-ui/components/dist/loader'
import { register } from '@public-ui/components'
import { ITZBund } from '@public-ui/themes'
export const ComponentLibrary: Plugin = {
  install() {
    register(ITZBund, defineCustomElements)
      .then(() => console.log('Components registered'))
      .catch(console.warn)
  }
}
```
main.ts:
```diff
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
+ import { ComponentLibrary } from './vue.plugin'

const app = createApp(App)

+ app.use(ComponentLibrary)

app.mount('#app')
```

#### 3. module einbinden

index.html
```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <script
+      type="module"
+      src="/node_modules/@public-ui/components/dist/kolibri/kolibri.esm.js"
+    ></script>
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

#### 4. Komponenten als custom components registrieren

vite.config.ts
```diff
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
-  plugins: [],
+  plugins: [
+    vue({
+      template: {
+        compilerOptions: {
+          // treat all tags with a dash as custom elements
+          isCustomElement: (tag) => tag.includes('-')
+        }
+      }
+    })
+  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

#### 5. Beispiel

```html
<kol-input-text
	:_value="text"
	:_on="{ onChange: (e: unknown, v: string) => (text = v) }"
></kol-input-text>
<kol-button _label="Text löschen" :_on="{ onClick: () => (text = '') }"></kol-button>
```
Hinweis: KoliBri-Inputs übergeben in der Regel das Ursprungsevent als ersten Parameter und den Wert des Feldes als Zweiten.






### III ohne Framework

Hinweis: ohne einen Bundler ist KoliBri aktuell nicht verwendbar.

`pnpm i @public-ui/components @public-ui/themes`
`npm i @public-ui/components @public-ui/themes`
`yarn add @public-ui/components @public-ui/themes`

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
+    <script
+      type="module"
+      src="/node_modules/@public-ui/components/dist/kolibri/kolibri.esm.js"
+    ></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```
Hierbei ist die Web-Component Schreibweise (kebab-case) zu verwenden. (z.B.: `<kol-heading>`)