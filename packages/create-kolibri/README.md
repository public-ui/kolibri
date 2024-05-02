# Create-**[KoliBri]**

![**[KoliBri]** - Public-UI Logo](https://avatars.githubusercontent.com/u/109126739?s=400&u=a57a37d20d60090bf572668d907ed093f6dbda85)

Mittels der CLI `create-kolibri` können über die Konsole verschiedene Projekte auf Basis der Komponenten-Bibliothek **[KoliBri]** erstellt werden.

## Projektarten

Es gibt folgende Arten von Projekten:

- App (Vanilla, [Angular], [React], [Vue], [Preact] u.a.)
- Library (Components, Theme)

## Get Stared

### Neues Projekt erstellen

Ein neues Projekt kann mit Hilfe der Konsole schnell erstellt werden.

```
npm init kolibri@latest my-kolibri-app
```

<img
	src="https://raw.githubusercontent.com/public-ui/.github/main/profile/create-kolibri.gif"
	alt="Zeigt wie man mit create-kolibri eine neue App anlegen kann."
/>

---

## Framework-Adapter

Für eine optimale Developer Experience bieten wir zahlreiche Framework-Adapter für **[KoliBri]** an.

### Übersicht

Folgende Pakete/Artefakte von **[KoliBri]** werden in der öffentlichen [NPM-Registry](https://www.npmjs.com/search?q=%40public-ui) versioniert bereitgestellt.

| Paket                  | Erläuterung                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| create-kolibri         | CLI zum Erstellen neuer Projekt auf **[KoliBri]**-Basis.                                                                                |
| @public-ui/components  | Beinhaltet die barrierefreien Web Components ohne Styling.                                                                              |
| @public-ui/core        | Beinhaltet generische Typen und zentrale Funktionalitäten für die Entwicklung weiterer Komponenten-Bibliothek mit gleicher Architektur. |
| @public-ui/themes      | Beinhaltet zahlreiche Themes für die **[KoliBri]**-Komponenten.                                                                         |
| @public-ui/react       | Adapter für das Framework [React].                                                                                                      |
| @public-ui/preact      | Adapter für das Framework [Preact].                                                                                                     |
| @public-ui/solid       | Adapter für das Framework [Solid].                                                                                                      |
| @public-ui/vue         | Adapter für das Framework [Vue].                                                                                                        |
| @public-ui/angular-v15 | Adapter für das Framework [Angular] v15.                                                                                                |
| @public-ui/angular-v14 | Adapter für das Framework [Angular] v14.                                                                                                |
| @public-ui/angular-v13 | Adapter für das Framework [Angular] v13.                                                                                                |
| @public-ui/angular-v12 | Adapter für das Framework [Angular] v12.                                                                                                |
| @public-ui/angular-v11 | Adapter für das Framework [Angular] v11.                                                                                                |
| @public-ui/angular     | Dieses Paket ist veraltet, weil [Angular] versionsspezifische Adapter benötigt.                                                         |

### Integrationsvarianten

**[KoliBri]** wird aktuell in folgenden Varianten angeboten:

#### Client-Side-Frameworks

| Statischen Webseiten                                                                                                         | Dynamische Webanwendungen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technische sind Web Components, wie sie in **[KoliBri]** enthalten sind, wie auch Standard HTML universell wiederverwendbar. | Für Umsetzung von dynamischen Webanwendungen gibt es eine Reihe von Frameworks für die **[KoliBri]** wiederverwendet werden kann. Abhängig vom Framework ist die Bereitstellung von **[KoliBri]** unterschiedlich. Besonders gut geeignet sind dabei JSX/TSX basierte Frameworks, wie [React] oder [Solid], da hier die maximalen Möglichkeiten der Typ-Unterstützung und Autovervollständung möglich sind. Hingegen bei Frameworks mit eigener Template-Sprachen, wie [Angular], [Vue] oder Svelte, ist die Entwicklungsunterstützung unterschiedlich gut umsetzbar. |

|                                               Framework                                                |                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      ![Web Components ohne Framework](https://public-ui.github.io/assets/logos/logo.vanilla.png)       | **Web Components ohne Framework**<br/><br/>Alle Komponenten von **[KoliBri]** sind gemäß dem Web Components Standard umgesetzt. Somit können die Komponenten in der Regel in allen modernen Projekten wiederverwendet werden. **[KoliBri]** lässt sich einbinden wie JQuery und ist somit auch für Server-Side-Rendering, wie bspw. PHP, JSF usw., interessant. |
|   [![React-Framework](https://public-ui.github.io/assets/logos/logo.react.png)](https://reactjs.org)   | **[React]**-Components (empfohlen)<br/><br/>Alternativ zu den reinen Web Componenten bieten wir einen Adapter für **[React]** an. Es wird so sichergestellt, dass sich die Web Component möglichst nahtlos und voll typisiert in die Entwicklung integriert.                                                                                                    |
| [![Angular-Framework](https://public-ui.github.io/assets/logos/logo.angular.png)](https://angular.io)  | **[Angular]**-Components (>= 11)<br/><br/>Alternativ zu den reinen Web Componenten bieten wir einen Adapter für **[Angular]** an. Es wird so sichergestellt, dass sich die Web Component möglichst nahtlos und voll typisiert in die Entwicklung integriert.                                                                                                    |
|      [![Vue-Framework](https://public-ui.github.io/assets/logos/logo.vue.png)](https://vuejs.org)      | **[Vue]**-Components<br/><br/>Alternativ zu den reinen Web Componenten bieten wir einen Adapter für **[Vue]** an. Es wird so sichergestellt, dass sich die Web Component möglichst nahtlos und voll typisiert in die Entwicklung integriert.                                                                                                                    |
| [![Solid-Framework](https://public-ui.github.io/assets/logos/logo.solid.png)](https://www.solidjs.com) | **[Solid]**-Components<br/><br/>Alternativ zu den reinen Web Componenten bieten wir einen Adapter für **[Solid]** an. Es wird so sichergestellt, dass sich die Web Component möglichst nahtlos und voll typisiert in die Entwicklung integriert.                                                                                                                |
| [![Preact-Framework](https://public-ui.github.io/assets/logos/logo.preact.png)](https://preactjs.com)  | **[Preact]**-Components (experimentell)<br/><br/>Alternativ zu den reinen Web Componenten bieten wir einen Adapter für **[Preact]** an. Es wird so sichergestellt, dass sich die Web Component möglichst nahtlos und voll typisiert in die Entwicklung integriert.                                                                                              |

#### Server-Side-Frameworks

|                                              Framework                                               |                                                                                                                                                                                                                                           |
| :--------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  [![Astro-Framework](https://public-ui.github.io/assets/logos/logo.astro.png)](https://astro.build)  | **[Astro]-Framework** (CSR der Web Components)<br/><br/>Die Integration erfolgt mittels der **[React]- und [Preact]**-Components. Hierbei werden die Framework-Componentens Server-seitig und die Web Components client-seitig gerendert. |
| [![Next.js-Framework](https://public-ui.github.io/assets/logos/logo.nextjs.png)](https://nextjs.org) | **[Next.js]-Framework** (CSR der Web Components)<br/><br/>Die Integration erfolgt mittels der **[React]**-Components. Hierbei werden die Framework-Componentens Server-seitig und die Web Components client-seitig gerendert.             |
|   [![Remix-Framework](https://public-ui.github.io/assets/logos/logo.remix.png)](https://remix.run)   | **[Remix]-Framework** (offen)<br/><br/>Die Integration erfolgt mittels der **[React]**-Components (CSR der Web Components). Hierbei werden die Framework-Componentens Server-seitig und die Web Components client-seitig gerendert.       |

[Angular]: https://angular.io
[Astro]: https://astro.build
[Ember]: https://emberjs.com
[KoliBri]: https://github.com/public-ui/kolibri
[Next.js]: https://nextjs.org
[Preact]: https://preactjs.com
[React]: https://reactjs.org
[Remix]: https://remix.run
[Solid]: https://www.solidjs.com
[Vue]: https://vuejs.org

## Changelog

### 1.1.19

- **fix** image uri in readme
- **fix** angular dependency versions (`zone.js`, `typescript`)

### 1.1.18

- **fix** missing `.npmrc` in defaults
- **chore** update e2e test samples

### 1.1.17

- **add** [Vue] (v3) template
- **fix** [Nightwatch] configuration
- **fix** [Font-Awesome] integration
- **doc** update documentation

[Font-Awesome]: https://fontawesome.com
[Nightwatch]: https://nightwatchjs.org
