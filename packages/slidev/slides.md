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
layout: center
---

<button class="border-1 mb-30 h-4 w-4 border-gray-700 rounded shadow bg-gray-100 p-1 hover:outline"><i class="absolute -pl fa-solid fa-arrow-pointer"></i></button>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Größe der Schaltfläche</h3>
  Verwende Deine andere Hand, um mit der Maus den Schalter in der Mitte der Folie zu klicken.
</div>

---
layout: center
---

<img src="/assets/torte.png" class="block w-50 mb-15"/>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Ohne Farben nutzbar</h3>
  Ist das rote oder das grüne Diagrammsegment größer?
</div>

---
layout: tunnel
---

<img src="/assets/accordion.png" class="block w-150 mb-15"/>

<div class="text-left border-l-3 border-gray-400 p-2 bg-gray-100">
  <h3>Alles im Blick‽</h3>
  Gesichtsfeldbeeinträchtigungen können auf nur einem Auge oder auch auf beiden Augen vorkommen?
</div>

---
layout: about-me
---


# Speaker

<v-clicks>

- Mein Name ist **Martin** Oppitz.
- **Wertegang:**
  - Inzwischen **über 20 Jahre** im Web unterwegs
  - Informatikstudium, Einzelunternehmer und Privatwirtschaft
  - Seit 3 Jahren beim **ITZBund**
- **Softwarearchitekt** im Referat **Anforderungs- und Lösungsdesign** (II A 2)

</v-clicks>

<!-- - **Hobbies:** Fahrrad fahren, Fussball spielen und im Winter Skilanglaufen -->
<!-- - Leidenschaftlicher **Architekt** und **Entwickler** | **Open Source** -->

---
layout: center
---

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

# Vom **Ei** zu **Open Source**

Wir gehen zurück zum Anfang und schauen uns  die verschiedenen Aspekte der Bibliothek entlang der KoliBri-**Geschichte** an.

<v-clicks>

- Was ist eine **Webcomponent**?
- Was ist der große **Vorteil**?
- Welche **Ziele** können wir damit erreichen?
- Wie haben wir KoliBri **realisiert**?
- Wie hat KoliBri **fliegen gelernt**?
- Welche **Ergebnisse** können wir schon heute sehen?
- Was möchte KoliBri noch **erreichen**?

</v-clicks>

---
layout: image-right-50
image: '/assets/html-js-css.png'
handle: 2
---

# Webcomponents

<strong>Webcomponents</strong> ist seit Juli 2014 ein <strong>Webstandard</strong> des <strong><kol-abbr _title="World Wide Web Consortium">W3C</kol-abbr></strong>.

<v-clicks>

- Komponente ≙ <strong>eigene</strong> HTML-Elemente
- Komponente besteht aus …
  - HTML <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Semantik</strong>
  - JavaScript <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Verhalten</strong>
  - CSS <kol-icon _icon="icofont-arrow-right"></kol-icon> <strong>Aussehen</strong>
- <strong>Robuster konsistenter teilbarer</strong> Baustein (Shadow DOM)
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

Barrierefreie Benutzeroberflächen werden durch die semantisch korrekte Komposition von HTML-Elementen realisiert.

<v-clicks>

Der HTML-Webstandard lässt aber das **Wie** dabei offen. Es gilt zudem die Richtlinien der <kol-abbr _title="Web Content Accessibility Guidelines">WCAG</kol-abbr> mit den gestalterischen Aspekten aus den Styleguides zu vereinen.

Der **große Vorteil für die Bundesverwaltung** liegt darin, dass wir mittels des Webcomponent-Standards eine für uns **ideale Lösung** gemeinsam **umsetzen**, **wiederverwenden** (teilen), **verbessern** und **erweitern** können.

</v-clicks>

---
layout: image-right
image: '/assets/teleskop.png'
handle: 4
---

# Vision

<span class="block py-4 text-xl leading-2em">
Wir stellen gemeinsam <strong>wiederverwendbare
Webkomponenten</strong> zur Verfügung, die die
<strong>Barrierefreiheit</strong> und <strong>Usability</strong> für webbasierte
Benutzeroberflächen der Bundesverwaltung
<strong>sicherstellen</strong>.
</span>

<br />

---
layout: image-right-50
image: '/assets/reaktionsschnell.png'
handle: 5
---

# Ziele

Wir wollen **benutzerfreundliche**, **barrierefreie**, **Styleguide-konforme** und **wiederverwendbare** Benutzeroberflächen realisieren.

<v-clicks>

- benutzerfreundlich: **Standard-konform** und **Geräte-agnostisch**
- barrierefrei: **semantisch**es HTML und **kontrastreich**e Farben
- Styleguide-konform: **Komponenten-spezifisches** CSS
- wiederverwendbare: Webcomponent + **Shadow DOM**

</v-clicks>

<br />
<br />

---
layout: image-right-50
image: '/assets/teamwork.png'
handle: 6
---

# Realisierung

Das erste Release sollte alle Komponenten beinhalten, die für eine vollwertige barrierefreie Webanwendung benötigt werden.

<v-clicks>

- Cross-funktionales Team
- Über 40 Komponenten
- BIK BITV-Test pro Komponente
- Mehrere Referenzprojekte
- Wöchentliche Community of Practice
- Repräsentative Demo-Anwendung
- Automatisierung des gesamten Entwicklungsprozesses
- Agil nach Scrum vorgegangen

</v-clicks>


---
layout: image-right-50
image: '/assets/avatar.png'
handle: 7
---

# Kontinuierliche Verbesserung

Damit KoliBri gut genug wird, um fliegen zu können, mussten wir ihn **immer wieder verbessern** und **erweitern**.

<v-clicks>

- Fokus auf kleinteiligen Komponenten halten
- Vorhandene Komponenten verbessern und funktional erweitern
- Vollständiges Refactoring des Theming-Systems / Designer
- Verbesserung der Dokumentation und Code-Beispiele
- Erweiterung um weiterer Styleguides
- Evaluierung alternativer Einsatz-Szenarien
- Immer mehr interne und externe Projekte

</v-clicks>

---
layout: image-right-66
image: '/assets/theming.png'
handle: 8
---

# Theming

Das Theming entkoppelt das Aussehen vollständig von den barrierefreien Komponenten.

<v-clicks>

- Jeder Komponente kann innerhalb der semantischen HTML-Struktur unterschiedlich gestaltet werden.
- Jede Kombination aus KoliBri-Komponenten und Styleguide kann unabhängig umgesetzt und getestet werden.

</v-clicks>

---
layout: demo-time
handle: 9
---

# Live-Demo

Im Code-Beispiel wird dargestellt, wie u.a. die Anforderungen an die Barrierefreiheit und die Gestaltbarkeit in der Button-Komponente "weggekapselt" werden.

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

<small class="mt-8 text-xs"><sup>*</sup> Quellcode ist für die bessere Nachvollziehbarkeit stark vereinfacht.</small>

---
layout: image-right-50
image: '/assets/get-started.png'
handle: 10
style: 'width: 100%'
---

# Erste Schritte

Du kannst folgendes tun, um **KoliBri** kennenzulernen …

<v-clicks>

- <kol-link _href="https://public-ui.github.io" _target="storybook">Lese mehr über KoliBri</kol-link> (Dokumenation)
- <kol-link _href="https://public-ui.github.io/?path=3D/docs/get-stated--page" _target="storybook">Probiere KoliBri aus</kol-link> (Create-App)
- <kol-link _href="https://github.com/public-ui/kolibri/releases" _target="github">Informiere Dich über die Neuerungen</kol-link> (Changelog)
- <kol-link _href="https://public-ui.github.io/?path=3D/docs/theming--page" _target="storybook">Gestalte Dein eigenen KoliBri</kol-link> (Designer)
- <kol-link _href="https://github.com/public-ui/kolibri/issues" _target="github">Gib uns Feedback</kol-link> (Feature, Issue)
- <kol-link _href="https://github.com/public-ui/kolibri" _target="github">Folge uns auf GitHub</kol-link> (Follow-Button)

</v-clicks>

<br />

<v-after>

<strong>Lasst uns KoliBri bunter und besser machen!</strong>

</v-after>

---
layout: image-right-50
image: '/assets/berge.png'
handle: 11
---

# Fazit

KoliBri zahlt mit seiner Funktion und Modularität in die strategischen Ziele des ITZBund Digitale Souveränität, Zukunftssicherheit, Leistungsfähigkeit, Wirtschaftlichkeit und Kundenzufriedenheit ein.

<v-clicks>

- Sorgt für mehr Einheitlichkeit über Projekte hinweg
- Reduziert Mehraufwände in Entwicklung und Test
- Komponenten sind so umgesetzt, wie wird sie brauchen
- Kontinuierliche Verbesserung durch konsolidiertes Feedback
- Schnelle Änderbarkeit durch hohe Automatisierung
- Generische Referenzimplementierung für Alle

</v-clicks>

---
layout: image-right
image: '/assets/oss.png'
handle: 12
---

# Ausblick

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
layout: center
---

<img class="m-auto block w-50 pb-15" src="/assets/qr-code.png" />

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
    <img src="/assets/teleskop.png" class="mt-8 w-25 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/fernglas" _target="flaticon">Fernglas Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div></div>
  <div>
    <img src="/assets/berge.png" class="mt-8 w-25 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/berg" _target="flaticon">Berg Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div>
    <img src="/assets/teamwork.png" class="mt-8 w-25 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/teamwork" _target="flaticon">Teamwork Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
  <div></div>
  <div>
    <img src="/assets/reaktionsschnell.png" class="mt-8 w-25 m-auto" />
  </div>
  <div class="mt-6">
    <kol-link _href="https://www.flaticon.com/de/kostenlose-icons/reaktionsschnell" _target="flaticon">Reaktionsschnell Icons erstellt von Freepik - Flaticon</kol-link>
  </div>
</div>
