---
theme: ./theme
colorSchema: light
highlighter: shiki
lineNumbers: true
transition: fade
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
css: unocss
title: Komponenten-Bibliothek für die Barrierefreiheit | KoliBri
---

<kol-logo _org="ITZBund" class="m-auto pl-40 block w-140" />

---

## layout: center

<button class="border-1 mb-30 h-4 w-4 border-gray-700 rounded shadow bg-gray-100 p-1 hover:outline"><i class="absolute -pl fa-solid fa-arrow-pointer"></i></button>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Größe der Schaltfläche</h3>
  Verwende Deine andere Hand, um mit der Maus den Schalter in der Mitte der Folie zu klicken.
</div>

---

## layout: center

<img src="/assets/torte.png" class="block w-50 mb-15"/>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Ohne Farben nutzbar</h3>
  Ist das rote oder das grüne Diagrammsegment größer?
</div>

---

## layout: tunnel

<img src="/assets/accordion.png" class="block w-150 mb-15"/>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Alles im Blick‽</h3>
  Gesichtsfeldbeeinträchtigungen können auf nur einem Auge oder auch auf beiden Augen vorkommen?
</div>

---

## layout: about-me

# Speaker

<v-clicks>

- Mein Name ist **Martin** Oppitz.
- **Wertegang:**
  - Inzwischen **über 25 Jahre** im Web unterwegs
  - Informatikstudium, Einzelunternehmer und Privatwirtschaft
  - Seit 3 Jahren beim **ITZBund** in der **Architektur-Beratung**
- **Softwarearchitekt** im Referat **Anforderungs- und Lösungsdesign** (II A 2)
- **Interessen:** Familie, Rad und Ski fahren, Reisen und Open Source

</v-clicks>

---

## layout: center

<v-click>

<img class="m-auto block w-50 pb-15" src="/assets/avatar.png" />

</v-click>

<div v-click-hide class="h-0">

# **Ko**mponenten-Bib**li**othek für die **B**ar**ri**erefreiheit

</div>

<v-after>

# **KoliBri**

</v-after>

---

layout: egg
handle: 1

---

# Vom **Ei** zum **Open Source**-Standard

**KoliBri** hat den **<kol-abbr _title="Beschreibt einen Augenblick einer besonderen Zufriedenheit. (Web Components-Durchbruch, 2021)">Magic-Moment</kol-abbr>** der Web Components abgepasst und einen Standard zur Umsetzung zugänglicher Benutzeroberflächen realisiert.

<v-clicks>

- Was ist eine **Web Component**?
- Worin liegt eigentlich das **Problem**?
- Welche **Ziele** können mit KoliBri erreicht werden?
- Wie ist KoliBri **aufgestellt**?
- Wo wird denn hier was **eingespart**?
- Was macht eigentlich den **Unterschied**?
- Wo steht KoliBri und wo will er **hin**?
- Die EUPL ist die "perfekte" **Lizenz**‽
- Häufig gestellte **Fragen**.

</v-clicks>

---

layout: image-right-50
image: '/assets/html-js-css.png'
handle: 2

---

# Web Components

<small class="underline">Was ist eine Web Component?</small>

<strong>Web Components</strong> sind seit Juli 2014 ein <strong>Webstandard</strong> des <strong><kol-abbr _title="World Wide Web Consortium">W3C</kol-abbr></strong>.

<v-clicks>

- Komponente ≙ <strong>eigene</strong> HTML-Elemente
- Komponente besteht aus …
  - HTML <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Semantik</strong>
  - JavaScript <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Verhalten</strong>
  - CSS <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Aussehen</strong>
- <strong>Robuster, konsistenter und teilbarer</strong> Baustein (Shadow DOM)
- **erst 2021** technischer Durchbruch (<kol-abbr _title="Microsoft Internet Explorer 11">IE11</kol-abbr> & <kol-abbr _title="Microsoft Edge Webbrowser">EDGE</kol-abbr>)
- in allen webbasierten Benutzeroberflächen wiederverwendbar (Web & App)<sup>1</sup>

</v-clicks>

<small v-after class="mt-8 float-right text-xs"><sup>1</sup> Es gibt ausführungseitig unterschiedliche Randbedingungen (<kol-link _href="https://dev.to/pahanperera/visual-explanation-and-comparison-of-csr-ssr-ssg-and-isr-34ea" _target="dev.to"><kol-abbr _title="Client Side Rendering">CSR</kol-abbr>, <kol-abbr _title="Server Side Rendering">SSR</kol-abbr>, <kol-abbr _title="Static Side Gerneration">SSG</kol-abbr>, <kol-abbr _title="Incremental Static Regeneration">IRS</kol-abbr></kol-link>)</small>

---

layout: image-right-50
image: '/assets/w3c.jpeg'
handle: 3

---

# Viele Wege führen nach Rom

<small class="underline">Worin liegt eigentlich das Problem?</small>

Barrierefreie Benutzeroberflächen werden durch die semantisch korrekte Komposition von HTML-Elementen realisiert.

<v-clicks>

Der HTML-Webstandard lässt aber das **Wie** dabei offen. Somit liegt die Aufgabe, das "Problem" zu lösen, bei den Entwickelnden. Darüber hinaus gilt es, die Richtlinien der <kol-abbr _title="Web Content Accessibility Guidelines">WCAG</kol-abbr> mit den gestalterischen Aspekten aus den vielseitigen Styleguides zu vereinen.

Der **große Vorteil für die Bundesverwaltung** liegt darin, dass wir mittels des Web Component-Standards eine für uns **ideale Lösung** gemeinsam **umsetzen**, **wiederverwenden** (teilen), **verbessern** und **erweitern** können.

</v-clicks>

---

layout: image-right-50
image: '/assets/reaktionsschnell.png'
handle: 4

---

# Ziele

<small class="underline">Welche Ziele können damit erreicht werden?</small>

Wir wollen **benutzerfreundliche**, **barrierefreie**, **Styleguide-konforme** und **wiederverwendbare** Benutzeroberflächen realisieren.

<v-clicks>

- benutzerfreundlich: **Standard-konform** und **Geräte-agnostisch**
- barrierefrei: **semantisch**es HTML und **kontrastreich**e Farben
- Styleguide-konform: **Komponenten-spezifisches** CSS
- wiederverwendbar: Web Component + **Shadow DOM**

</v-clicks>

<br />
<br />

---

layout: image-right-66
image: '/assets/theming.png'
handle: 5

---

# Theming

<small class="underline">Wie ist KoliBri aufgestellt?</small>

Das Theming entkoppelt das Aussehen vollständig von den barrierefreien Komponenten.

<v-clicks>

- Jede Komponente kann innerhalb der semantischen HTML-Struktur unterschiedlich gestaltet werden.
- Jede Kombination aus KoliBri-Komponenten und Styleguide kann unabhängig umgesetzt und getestet werden.

</v-clicks>

---

layout: demo-time
handle: 6

---

# Live-Demo

<small class="underline">Wo wird denn hier was eingespart?</small>

Im Code-Beispiel wird dargestellt, wie die Anforderungen an die Barrierefreiheit im Button "weg gekapselt" werden.

<!-- <kol-accordion _heading="test" _level="5">
<div slot="content"> -->

```tsx {1,14|2-8|9-13|all}
<kol-button _icon="ui-home" _icon-only _label="Primary">
	<button aria-labelledby="574540" class="primary" type="button">
		<span>
			<kol-icon>
				<i aria-hidden="true" class="icofont-ui-home"></i>
			</kol-icon>
		</span>
	</button>
	<kol-tooltip>
		<kol-badge id="574540">
			<span>Primary</span>
		</kol-badge>
	</kol-tooltip>
</kol-button>
```

<!-- </div>
</kol-accordion> -->

<small class="mt-8 text-xs"><sup>\*</sup> Quellcode ist für die bessere Nachvollziehbarkeit stark vereinfacht.</small>

---

layout: image-right
image: '/assets/usp.png'
handle: 7

---

# Alleinstellungsmerkmale

<small class="underline">Was macht eigentlich den Unterschied?</small>

Aus Sicht der öffentlichen Verwaltung hat KoliBri eine ganze Reihe an Alleinstellungsmerkmalen:

<v-clicks>

- **Spezifikation** - <span class="text-gray-500">Barrierefreiheit kommt zuerst (by Design)</span>
- **Theming** - <span class="text-gray-500">Entkoppeltes Styling im Shadow-Root (Theming)</span>
- **Zugänglichkeit** - <span class="text-gray-500">Code-Hoheit liegt beim Bund (Digitale Souveränität)</span>
- **Architektur** - <span class="text-gray-500">Einmalige Implementierung (Framework-agnostisch)</span>
- **Robustheit** - <span class="text-gray-500">Web Components im restriktiven Modus (Shadow-Root)</span>

</v-clicks>

---

layout: image-right
image: '/assets/oss.png'
handle: 9

---

# Ausblick

<small class="underline">Wo will KoliBri hin?</small>

**KoliBri** wurde durch den **ITZBund** für die **Open Source**-Entwicklung **freigegeben**, um für alle zugänglich zu sein und um aus dem Feedback der Community kontinuierlich verbessert und erweitert werden zu können.

<v-click>

**KoliBri** bietet hierfür eine optimale Wiederverwendbarkeit, weil er …

</v-click>

<v-clicks>

- **klein** - <span class="text-gray-500">kleinteilige Komponenten</span>,
- **schnell** - <span class="text-gray-500">automatisierte DevOps-Pipelines</span>,
- **wendig** - <span class="text-gray-500">Framework-agnostisch</span> und
- **farbenfroh** - <span class="text-gray-500">entkoppeltes Theming</span>

</v-clicks>

<v-after>

… ist.

</v-after>

---

layout: image-right
image: '/assets/eupl.jpeg'
handle: 10

---

# Lizenz

<small class="underline">Die EUPL ist die "perfekte" Lizenz‽</small>

Die "Open-Source-Lizenz für die Europäische Union" (EUPL) ist eine von der Europäischen Union herausgegebene Copyleft-Lizenz für die Lizenzierung freier Software.

<small>

<v-clicks>

- Der **Quellcode** ist die konkrete Implementierung der Komponenten und beinhaltet das schützenswerte geistige Eigentum der Urheber:innen. Es wird durch das Code-Repository (Git) repräsentiert und durch die Copyleft-Klausel geschützt, wenn davon eine Kopie (z.B. Fork) erstellt wird.<br/><br/>
- Aus dem Quellcode werden die sogenannten **Artefakte** "gebauten" und über eine öffentliche Plattform (npm) verteilt. Alle Projekte können diese Artefakte herunterladen und die darin enthaltenen Komponenten uneingeschränkt in ihren Anwendungen wiederverwenden und von außen, wie vorgesehen, konfigurieren.

</v-clicks>

<br/>
</small>

<v-clicks>

- 🤗 Die reine Wiederverwendung der Artefakte ist vollkommen **unproblematisch**!
- 🤔 **Achtung** beim Kopieren von Code! _(zieht **Copyleft** nach sich)_
- 😉 Dann einfach Änderungswünsche direkt bei KoliBri **einbringen**!

</v-clicks>

---

layout: image-right
image: '/assets/swizzling.png'
handle: 11

---

# Fragen

<small class="underline">Häufig gestellt Fragen.</small>

<small>
<v-clicks>

- **Wie abhängig mache ich mich, wenn ich KoliBri einsetze?**<br/>
  Vergleicht man KoliBri mit einem LEGO®-Set, dann kann man die enthaltenen Bausteine einfach mir anderen Bausteinen mischen, um die Gesamtanwendung abzubilden _(s. blaue, orange und graue Komponenten)_.<br/><br/>
- **Wie kann ich eine Komponente beeinflussen, wenn nötig?**<br/>
  KoliBri-Komponenten sind zur Sicherstellung der Barrierefreiheit sehr restriktiv und werden durch Komposition wiederverwendet. Anpassungen von außen lassen sich nur durch das **Wrappen** oder den **Expert-Slot** vornehmen _(s. Orange in Blau, Blau in Orange)_. Das Styling ist über das **Theme-Konzept** durch Konfiguration möglich.<br/><br/>
- **Was mache ich, wenn eine Komponente oder Funktion fehlt?**<br/>
  Neue **fachlich neutrale Komponenten** oder **Funktionen** sollen innerhalb von KoliBri realisiert werden. Hierbei ist das **Mitwirken** ausdrücklich erwünscht und beschleunigt die Umsetzung.

</v-clicks>
</small>

---

layout: image-right-50
image: '/assets/get-started.png'
handle: 10
style: 'width: 100%'

---

# Erste Schritte

Du kannst folgendes tun, um **KoliBri** kennenzulernen …

<v-clicks>

- <kol-link _href="https://public-ui.github.io" _target="website">Lese mehr über KoliBri</kol-link> (Dokumentation)
- <kol-link _href="https://public-ui.github.io/docs/get-started/erste-schritte" _target="website">Probiere KoliBri aus</kol-link> (Create-App)
- <kol-link _href="https://github.com/public-ui/kolibri/releases" _target="github">Informiere Dich über die Neuerungen</kol-link> (Changelog)
- <kol-link _href="https://public-ui.github.io/docs/concepts/styling/theming" _target="website">Gestalte Dein eigenen KoliBri</kol-link> (Designer)
- <kol-link _href="https://github.com/public-ui/kolibri/issues" _target="github">Gib uns Feedback</kol-link> (Feature, Issue)
- <kol-link _href="https://github.com/public-ui/kolibri" _target="github">Folge uns auf GitHub</kol-link> (Follow-Button)

</v-clicks>

<br />

<v-after>

<strong>Lasst uns KoliBri bunter und besser machen!</strong>

</v-after>

---

## layout: center

<img class="m-auto block w-50 pb-15" src="/assets/qr-code.png" />
<small class="underline">Lasst uns gemeinsam KoliBri bunter und besser machen!</small>

# Vielen Dank für Ihre Aufmerksamkeit

<ul class="flex">
  <li class="list-none"><kol-link _href="https://public-ui.github.io" _target="storybook"><kol-icon _icon="fa-sharp fa-solid fa-book" /> Dokumentation</kol-link></li>
  <li class="list-none">|</li>
  <li class="list-none"><kol-link _href="mailto:kolibri@itzbund.de" _target="storybook"><kol-icon _icon="fa-solid fa-envelope" /> kolibri@itzbund.de</kol-link></li>
  <li class="list-none">|</li>
  <li class="list-none"><kol-link _href="https://github.com/public-ui" _target="storybook"><kol-icon _icon="fa-brands fa-github" /> GitHub</kol-link></li>
</ul>

---

<kol-logo _org="ITZBund" class="m-auto pl-40 block w-140" />

---

# Bildnachweise

<div class="grid grid-cols-[10rem_auto_4rem_10rem_auto] items-center gap-4">
  <div>
    <img src="/assets/reaktionsschnell.png" class="mt-8 w-20 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/reaktionsschnell" _target="flaticon">Reaktionsschnell Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div></div>
  <div>
    <img src="/assets/usp.png" class="mt-8 w-20 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/usp" _target="flaticon">Usp Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div>
    <img src="/assets/berge.png" class="mt-8 w-20 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/berg" _target="flaticon">Berg Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div></div>
  <div>
    <img src="/assets/teleskop.png" class="mt-8 w-20 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/fernglas" _target="flaticon">Fernglas Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
</div>
