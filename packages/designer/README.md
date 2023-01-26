<p style="text-align: center; background: white;">
  <a href="https://leanupjs.org">
    <img src="https://leanupjs.org/assets/logo.svg" height="100">
  </a><br>
  <h2 style="text-align: center;">
    <cite><b>Make things pure</b> ... to become lean.</cite>
  </h2>
</p>
<!-- <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/du_BnIZzEKs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe> -->
<hr>

[![license][license]][license-url]
[![lernajs][lernajs]][lernajs-url]
[![prettier][prettier]][prettier-url]
[![@leanup/cli](https://snyk.io/advisor/npm-package/@leanup/cli/badge.svg)](https://snyk.io/advisor/npm-package/@leanup/cli)

[license]: https://img.shields.io/npm/l/@leanup/cli
[license-url]: https://github.com/leanupjs/cli/blob/master/LICENSE
[lernajs]: https://img.shields.io/badge/managed%20with-lerna-blueviolet
[lernajs-url]: https://lerna.js.org
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://prettier.io

<h1>leanup<sup style="color: grey; font-size: 75%"> js</sup></h1>

The **`@leanup` ecosystem** stands for a lightweight and pure way for application development in JavaScript/TypeScript.

- [Motivation](#motivation)
- [Our home stories](#our-home-stories)
  - [In 2021](#in-2021)
    - [Transpilers](#transpilers)
    - [Frameworks](#frameworks)
    - [Bundlers](#bundlers)
- [What makes the difference](#what-makes-the-difference)
- [Principles](#principles)
- [Arguments](#arguments)
  - [Pro](#pro)
  - [Contra](#contra)
- [Demo's](#demos)
- [Tools](#tools)
- [Ecosystem structure](#ecosystem-structure)
  - [Frameworks](#frameworks-1)
  - [Extensions](#extensions)
  - [Thinks](#thinks)
- [Alternatives](#alternatives)

## Motivation

- Learnability
- Controllability
- Universality
- Flexibility
- Scalability
- Durability
- Transparency

## Our home stories

### In 2021
#### Transpilers

We switched from [Babel] to [esbuild] and from esbuild to [swc] (without [Angular] and [Vue] with proprietary template notation). And we can switch again if we want.

The performance of [esbuild] and [swc] are almost twice as fast as with the classic configuration. But there is currently no noticeable difference in performance between [esbuild] and [swc].

#### Frameworks

We added two more frameworks ([Lit] and [Solid]) without any problems, without having to change the basic stack.

We have switched our Demo-Template from [Bootstrap] to [Tailwindcss] and from Tailwindcss to [WindiCSS] and now use the automatic application-specific CSS generation.

#### Bundlers

We tried two new bundlers ([Vite] and [Snowpack]) and integrated them for most frameworks. Alternatively, they can be installed alongside or instead of [webpack].

## What makes the difference

> <cite>Stop the transitive knowledge.</cite>

We use the minimal configuration and build no overhead stuff on top of the popular tools and make every native command transparent.

## Principles

- convention over configuration
- pure commands under the hood
- don't repeat yourself
- following the generic instead of the influenced way
- keep the dependencies always up to date

## Arguments

The arguments for and against this concept are documented here:

### Pro

- select only one pure and popular tool for each use case (e.g. bundling, unit-test)
- there are extensible configuration files for each tool
- due to the flat dependencies we can always stay up to date
- the CLI bundles all the necessary tools in a portable/scalable way
- the risk to get vulnerabilites in dependencies is lower
- leanup's own code is kept to a minimum

### Contra

> - please give feedback
> - please show us your perspective

## Demo's

There are some working examples:

- [https://github.modevel.de/poc/](https://github.modevel.de/poc/)
- [PoC - Flexible web application architecture](https://github.com/martinoppitz/poc-flexible-web-application-architecture#readme)
- [Hello World - Comparison](https://github.com/martinoppitz/hello-world-comparison#readme)

## Tools

| Tool/Technology  |    Description    | Status | Note                       | Rating                                                                                                                                               |
| ---------------- | :---------------: | :----: | :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TypeScript]     |     Language      |   ✔️    | ready                      | [![typescript](https://snyk.io/advisor/npm-package/typescript/badge.svg)](https://snyk.io/advisor/npm-package/typescript)                            |
| [Webpack]        |      Bundler      |   ✔️    | ready                      | [![webpack](https://snyk.io/advisor/npm-package/webpack/badge.svg)](https://snyk.io/advisor/npm-package/webpack)                                     |
| [Snowpack]       |      Bundler      |   ⌛    | in progress                | [![webpack](https://snyk.io/advisor/npm-package/snowpack/badge.svg)](https://snyk.io/advisor/npm-package/snowpack)                                   |
| [Vite]           |      Bundler      |   ⌛    | in progress                | [![webpack](https://snyk.io/advisor/npm-package/vite/badge.svg)](https://snyk.io/advisor/npm-package/vite)                                           |
| [esbuild]        |    Transpiler     |   ✔️    | ready                      | [![esbuild](https://snyk.io/advisor/npm-package/esbuild/badge.svg)](https://snyk.io/advisor/npm-package/esbuild)                                     |
| [swc]            |    Transpiler     |   ✔️    | ready                      | [![swc](https://snyk.io/advisor/npm-package/@swc/core/badge.svg)](https://snyk.io/advisor/npm-package/@swc/core)                                     |
| [Babel]          |    Transpiler     |   ✔️    | ready                      | [![@babel/core](https://snyk.io/advisor/npm-package/@babel/core/badge.svg)](https://snyk.io/advisor/npm-package/@babel/core)                         |
| [Mocha]          | Unit-Test-Runner  |   ✔️    | ready                      | [![mocha](https://snyk.io/advisor/npm-package/mocha/badge.svg)](https://snyk.io/advisor/npm-package/mocha)                                           |
| [Chai]           |     Assertion     |   ✔️    | ready                      | [![chai](https://snyk.io/advisor/npm-package/typescript/badge.svg)](https://snyk.io/advisor/npm-package/chai)                                        |
| [Sinon]          |      Mocking      |   ✔️    | ready                      | [![sinon](https://snyk.io/advisor/npm-package/sinon/badge.svg)](https://snyk.io/advisor/npm-package/sinon)                                           |
| [NYC]            |   Code-Coverage   |   ✔️    | ready                      | [![nyc](https://snyk.io/advisor/npm-package/nyc/badge.svg)](https://snyk.io/advisor/npm-package/nyc)                                                 |
| [ESLint]         |   Code-Checker    |   ✔️    | ready                      | [![eslint](https://snyk.io/advisor/npm-package/eslint/badge.svg)](https://snyk.io/advisor/npm-package/eslint)                                        |
| [Nightwatch.js]  |  E2E-Test-Runner  |   ✔️    | ready                      | [![nightwatch](https://snyk.io/advisor/npm-package/nightwatch/badge.svg)](https://snyk.io/advisor/npm-package/nightwatch)                            |
| [Allsure]        |      Report       |   ✔️    | ready                      |
| [Cucumber]       |        BDD        |   ✔️    | ready                      | [![cucumber](https://snyk.io/advisor/npm-package/cucumber/badge.svg)](https://snyk.io/advisor/npm-package/cucumber)                                  |
| [robotframework] |        BDD        |   ⌛    | will be evaluated          |                                                                                                                                                      |
| [Storybook]      |   Documentation   |   ⌛    | in progress                | [![storybook](https://snyk.io/advisor/npm-package/storybook/badge.svg)](https://snyk.io/advisor/npm-package/storybook)                               |
| [OpenAPI]        |        API        |   ✔️    | ready                      |                                                                                                                                                      |
| [GraphQL]        |        API        |   ✔️    | ready                      | [![graphql](https://snyk.io/advisor/npm-package/graphql/badge.svg)](https://snyk.io/advisor/npm-package/graphql)                                     |
| [Workbox]        |        PWA        |   ✔️    | ready                      | [![workbox](https://snyk.io/advisor/npm-package/workbox/badge.svg)](https://snyk.io/advisor/npm-package/workbox)                                     |
| [Lerna]          |     Mono-Repo     |   ✔️    | ready                      | [![lerna](https://snyk.io/advisor/npm-package/lerna/badge.svg)](https://snyk.io/advisor/npm-package/lerna)                                           |
| [Ant-Design]     |   Design-System   |   ✔️    | proved                     | [![antd](https://snyk.io/advisor/npm-package/antd/badge.svg)](https://snyk.io/advisor/npm-package/antd)                                              |
| [Bootstrap]      |   Design-System   |   ✔️    | proved                     | [![bootstrap](https://snyk.io/advisor/npm-package/bootstrap/badge.svg)](https://snyk.io/advisor/npm-package/bootstrap)                               |
| [Material]       |   Design-System   |   ✔️    | proved                     | [![@material/textfield](https://snyk.io/advisor/npm-package/@material/textfield/badge.svg)](https://snyk.io/advisor/npm-package/@material/textfield) |
| [Tailwindcss]    |   Design-System   |   ✔️    | proved                     | [![tailwindcss](https://snyk.io/advisor/npm-package/tailwindcss/badge.svg)](https://snyk.io/advisor/npm-package/tailwindcss)                         |
| [WindiCSS]       |   Design-System   |   ✔️    | proved                     | [![tailwindcss](https://snyk.io/advisor/npm-package/windicss/badge.svg)](https://snyk.io/advisor/npm-package/windicss)                               |
| [Nexus IQ]       | Vulnerabiliy-Gate |   ✔️    | ready                      |                                                                                                                                                      |
| [Less]           |        CSS        |   ✔️    | ready                      | [![less](https://snyk.io/advisor/npm-package/less/badge.svg)](https://snyk.io/advisor/npm-package/less)                                              |
| [Sass]           |        CSS        |   ✔️    | ready                      | [![sass](https://snyk.io/advisor/npm-package/sass/badge.svg)](https://snyk.io/advisor/npm-package/sass)                                              |
| [PostCSS]        |        CSS        |   ✔️    | ready                      | [![postcss](https://snyk.io/advisor/npm-package/postcss/badge.svg)](https://snyk.io/advisor/npm-package/postcss)                                     |
| [TSArch]         |   Architecture    |   ⌛    | in progress                | [![hint](https://snyk.io/advisor/npm-package/tsarch/badge.svg)](https://snyk.io/advisor/npm-package/tsarch)                                          |
| [Webhint]        |      Webhint      |   ✔️    | moved \*\*\*               | [![hint](https://snyk.io/advisor/npm-package/hint/badge.svg)](https://snyk.io/advisor/npm-package/hint)                                              |
| [TestCafe]       |  E2E-Test-Runner  |   ⌛    | will be evaluated \*\*\*\* | [![testcafe](https://snyk.io/advisor/npm-package/testcafe/badge.svg)](https://snyk.io/advisor/npm-package/typescript)                                |
| [TSLint]         |   Code-Checker    |   ❌    | removed \*\*               | [![tslint](https://snyk.io/advisor/npm-package/tslint/badge.svg)](https://snyk.io/advisor/npm-package/tslint)                                        |
| [Cypress]        |  E2E-Test-Runner  |   ❌    | excluded \*                | [![cypress](https://snyk.io/advisor/npm-package/cypress/badge.svg)](https://snyk.io/advisor/npm-package/cypress)                                     |

> \*
> Arguments agains [Cypress]:
>
> - reinvent wheel
>   - detect css selectors
>   - BDD test syntax
>   - principals
> - large tooling
> - a lot of binaries
> - many dependencies
> - ci integration vs selenium hub
>
> It is difficult to keep focus with Cypress as it is more a nice tool than an effective tool. It is expected that a lot of time will be invested to justify the requirements of a project.

> \*\* TSLint is deprecated.

> \*\*\* Webhint is not practical for the development of components, since component tags often have no relation to standard HTML. In addition, the webhint package alone is over 100 MB in size. I have good by using a IDE webhint plugin, like [VSCode webhint](https://marketplace.visualstudio.com/items?itemName=webhint.vscode-webhint).

> \*\*\*\* [TestCafe] The idea that defined TestCafe architecture was that you don't really need an external driver to run end-to-end tests in the browser. That's interesting.

## Ecosystem structure

Vanilla Java-/TypeScript are supported by default. That means for example custom elements and any plain Java-/TypeScript code.

- [`@leanup/cli`](https://www.npmjs.com/package/@leanup/cli) ✔️
- [`@leanup/cli-vanilla`](https://www.npmjs.com/package/@leanup/cli-vanilla) (optional) ✔️

### Frameworks

Vanilla Java-/TypeScript are supported by default. That means for example custom elements and any plain Java-/TypeScript code.

The selection of the following frameworks depends in parts on the following references:

- [report](https://ashleynolan.co.uk/blog/frontend-tooling-survey-2019-results#js-framework-essential),
- [benchmark](https://krausest.github.io/js-framework-benchmark/2020/table_chrome_80.html) and
- [survey](https://2019.stateofjs.com/front-end-frameworks)

Currently the following framework extensions are available:

- [`@leanup/cli-angular`](https://www.npmjs.com/package/@leanup/cli-angular) ✔️
- [`@leanup/cli-angularjs`](https://www.npmjs.com/package/@leanup/cli-angularjs) ✔️
- [`@leanup/cli-aurelia`](https://www.npmjs.com/package/@leanup/cli-aurelia) ✔️
- [`@leanup/cli-inferno`](https://www.npmjs.com/package/@leanup/cli-inferno) ✔️
- [`@leanup/cli-lit-element`](https://www.npmjs.com/package/@leanup/cli-lit-element) ✔️
- [`@leanup/cli-preact`](https://www.npmjs.com/package/@leanup/cli-preact) ✔️
- [`@leanup/cli-react`](https://www.npmjs.com/package/@leanup/cli-react) ✔️
- [`@leanup/cli-solid`](https://www.npmjs.com/package/@leanup/cli-solid) ✔️
- [`@leanup/cli-svelte`](https://www.npmjs.com/package/@leanup/cli-svelte) ✔️
- [`@leanup/cli-vue`](https://www.npmjs.com/package/@leanup/cli-vue) ✔️
- [`@leanup/cli-vue3`](https://www.npmjs.com/package/@leanup/cli-vue3) ✔️

### Extensions

A separate package contains some nice but not required addons for webpack.

- [`@leanup/cli-addons`](https://www.npmjs.com/package/@leanup/cli-addons) ✔️
- [`@leanup/cli-cucumber`](https://www.npmjs.com/package/@leanup/cli-cucumber) ✔️
- [`@leanup/cli-graphql`](https://www.npmjs.com/package/@leanup/cli-graphql) ✔️
- [`@leanup/cli-pwa`](https://www.npmjs.com/package/@leanup/cli-pwa) ✔️
- [`@leanup/cli-webhint`](https://www.npmjs.com/package/@leanup/cli-webhint) ✔️

### Thinks

There a separate packages for important application features.

- [`@leanup/git-hooks`](https://www.npmjs.com/package/@leanup/git-hooks) ✔️
- [`@leanup/form`](https://www.npmjs.com/package/@leanup/form) ✔️
- [`@leanup/lib`](https://www.npmjs.com/package/@leanup/lib) ✔️
- [`@leanup/ui`](https://www.npmjs.com/package/@leanup/ui) ⌛ (in progress)

## Alternatives

- Angular [![@angular/cli](https://snyk.io/advisor/npm-package/@angular/cli/badge.svg)](https://snyk.io/advisor/npm-package/@angular/cli)
- Neutrino [![neutrino](https://snyk.io/advisor/npm-package/neutrino/badge.svg)](https://snyk.io/advisor/npm-package/neutrino)
- Rome [![neutrino](https://snyk.io/advisor/npm-package/rome/badge.svg)](https://snyk.io/advisor/npm-package/rome)

[babel]: https://babeljs.io
[typescript]: https://typescriptlang.org
[webpack]: https://webpack.js.org
[mocha]: https://mochajs.org
[chai]: https://www.chaijs.com
[sinon]: https://sinonjs.org
[nyc]: https://istanbul.js.org
[storybook]: https://storybook.js.org
[svelte devtools]: https://github.com/RedHatter/svelte-devtools
[nightwatch.js]: https://nightwatchjs.org
[tslint]: https://palantir.github.io/tslint
[eslint]: https://eslint.org
[graphql]: https://graphql.org
[sass]: https://sass-lang.com
[less]: http://lesscss.org
[lerna]: https://lerna.js.org
[workbox]: https://developers.google.com/web/tools/workbox
[ant-design]: https://ant.design
[allsure]: http://allure.qatools.ru
[bootstrap]: https://getbootstrap.com
[material]: https://material.io
[cucumber]: https://cucumber.io
[cypress]: https://www.cypress.io
[webhint]: https://www.webhint.io
[testcafe]: https://devexpress.github.io/testcafe/
[robotframework]: https://robotframework.org
[tailwindcss]: https://tailwindcss.com
[postcss]: https://postcss.org
[esbuild]: https://esbuild.github.io
[snowpack]: https://www.snowpack.dev/
[vite]: https://vitejs.dev/
[openapi]: https://openapis.org
[nexus iq]: https://blog.sonatype.com/using-nexus-iq-server-with-webpack
[tsarch]: https://github.com/MaibornWolff/ts-arch
[windicss]: https://windicss.org
[swc]: https://swc.rs
[Lit]: https://lit.dev
[Angular]: https://angular.io
[Vue]: https://v3.vuejs.org
[Solid]: https://www.solidjs.com
[Bootstrap]: https://getbootstrap.com
