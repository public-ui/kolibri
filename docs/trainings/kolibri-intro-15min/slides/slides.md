---
theme: default
colorSchema: light
title: KoliBri in 15 Minuten
info: Einsteigerschulung zu KoliBri Web Components – Barrierefreiheit, die man nicht vergessen kann.
transition: slide-left
drawings:
  enabled: false
hash: true
---

# KoliBri in 15 Minuten

<div class="cover-sub">

**Barrierefreiheit, die man nicht mehr vergessen kann.**

_Web Components wie HTML-Tags: feste, validierte API, robustes Markup – kleinteilig genug für universelle Nachnutzung und Standardisierung. KoliBri macht HTML barrierefrei und themebar für die Wiederverwendung._

</div>

<CoverKoli />

<!--
ZIELGRUPPE: Entwicklerinnen und Entwickler ohne KoliBri-Vorkenntnisse.
KERNBOTSCHAFT: KoliBri nimmt dir die Barrierefreiheit ab, die du sonst von Hand und fehleranfällig selbst verdrahten müsstest.

BÜHNEN-CHECKLISTE:
- Deck starten: cd slides && npm install && npm run dev → http://localhost:3030
- Vorab einmal alle Folien durchklicken, damit die Live-Demos kompiliert sind
- Presenter-Modus: Taste p – hier stehen auf JEDER Folie die Sprechzettel-Zeilen
- Der Röntgenblick sitzt auf der Folie „Schritt 3 – Live"; Theme-Wechsel als Hands-on unter demo/step-4-theme.html
- Falls eine Live-Demo hängt: Die Notfallfolie ganz am Ende (in der Übersicht mit o erreichbar)
-->

---

# Agenda

| Schritt                       | Beat                                                     |
| ----------------------------- | -------------------------------------------------------- |
| **0** · Ein Feld, von Hand    | Wo ist der Fehler?                                       |
| **1** · Dasselbe in einem Tag | Und es prüft wirklich                                    |
| **2** · Insel im Bestand      | „Wir haben aber Altbestand"                              |
| **3** · Komposition           | Leer abschicken → Fehlerliste, Fokussprung, Röntgenblick |
| **4** · Theme & Tokens        | Gleiches Markup, anderes Haus                            |
| **5** · React                 | Dasselbe in JSX                                          |
| **Fundament**                 | Warum man darauf bauen kann                              |
| Rückblende                    | Der Punkt                                                |

<div class="hint">Die Pointe kommt beim Schritt-3-Gipfel – der A11y-Payoff ist die Auflösung, nicht die Einleitung.<br/>Presenter-Modus: <kbd>p</kbd> · Folienübersicht: <kbd>o</kbd></div>

<!--
Der Vortrag trägt einen Konflikt: Barrierefreiheit von Hand ist mühsam und geht still schief.
Er wird bewusst erst auf dem Schritt-3-Gipfel aufgelöst – nicht vorher verraten.
-->

---

# Schritt 0 · Ein Feld, von Hand.

Ein Formularfeld. E-Mail. Pflichtfeld, mit Hinweistext – **im Fehlerzustand**. Kein Framework, keine Bibliothek.

```html
<label for="mail"> E-Mail <span aria-hidden="true">*</span> </label>
<input id="mail" type="email" required aria-required="true" aria-describedby="mail-hint mail-err" />
<span id="mail-hint">Wir nutzen die Adresse nur für die Terminbestätigung.</span>
<span id="mail-err" role="alert">Bitte geben Sie eine gültige E-Mail-Adresse an.</span>
```

<v-click>

**Das ist kein schlechter Code.** Das ist jemand, der sich Mühe gegeben hat: Sternchen `aria-hidden`, Hinweis per `aria-describedby`, Fehler mit `role="alert"`. Vier IDs, drei ARIA-Attribute – für **ein** Feld.

</v-click>

<v-click>

<div class="question-box">

Trotzdem ist hier ein Fehler drin. **Wer findet ihn?**

</div>

</v-click>

<v-click>

<div class="reveal-box">

Es fehlt **`aria-invalid`**. Der Screenreader liest den Fehlertext vor – aber er sagt nicht, dass dieses Feld fehlerhaft ist. Wer mit der Tastatur ins Feld springt, hört: _alles in Ordnung._

</div>

</v-click>

<!--
▶ Diese Folie ersetzt step-0-handmade.html – das Feld steht hier als Quelltext, die "Seite" dazu im Kopf.

„Wir fangen klein an. Ein Formularfeld. E-Mail-Adresse. Pflichtfeld, mit Hinweistext, und es ist gerade im Fehlerzustand.

Das hier ist kein schlechter Code. Das ist jemand, der sich Mühe gegeben hat: das Sternchen ist aria-hidden, damit der Screenreader nicht ‚Stern' sagt. Der Hinweistext hängt per aria-describedby am Feld. Die Fehlermeldung hat role="alert". Vier IDs, drei ARIA-Attribute. Für EIN Feld."

▶ Kurze Pause. Ins Publikum schauen.
„Trotzdem ist hier ein Fehler drin. Wer findet ihn?"
▶ 10–15 Sekunden warten. Wirklich warten.

„Es fehlt aria-invalid. Der Screenreader liest den Fehlertext vor – aber er sagt nicht, dass dieses Feld fehlerhaft ist. Wer nur mit der Tastatur durch das Formular springt, landet im Feld und hört: alles in Ordnung.

Und das ist der Punkt: Barrierefreiheit geht nicht mit einem Knall kaputt. Sie geht LEISE kaputt. Niemand merkt es – außer den Menschen, die darauf angewiesen sind."

-->

---
layout: two-cols
---

# Schritt 1 · Dasselbe in einem Tag.

**Setup – wirklich nur drei Zeilen:**

```ts
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

await register(DEFAULT, defineCustomElements);
```

```html
<kol-input-email _label="E-Mail" _required _hint="Wir nutzen die Adresse nur für die Terminbestätigung."> </kol-input-email>
```

**Eine Komponente pro Feldtyp** – `kol-input-email`, `kol-input-date`, `kol-select` … Jede bietet nur die Eigenschaften an, die für ihren Typ wirklich funktionieren. Kein `type`-Attribut-Wildwuchs wie beim nativen `<input>`.

::right::

<div class="demo-panel">

**Genau dieses Markup, live:**

<Step1Demo nur-feld />

</div>

<!--
▶ Auf das Markup zeigen bzw. den Quelltext einblenden.

„Dasselbe Feld. Ein Tag. kol-input-email, _label, _required, _hint, fertig. Und darüber das ganze Setup – das sind wirklich nur drei Zeilen: Komponenten registrieren, Theme registrieren, loslegen.

Zwei Dinge fallen sofort auf. Erstens: Alle Eigenschaften fangen mit einem Unterstrich an. Das ist Absicht – so kollidieren sie nie mit echten HTML-Attributen.

Zweitens, und das ist mir wichtiger: _label ist PFLICHT. Es gibt keine KoliBri-Komponente ohne Beschriftung. Man kann sie nicht vergessen. Barrierefreiheit ist hier kein Schalter, den man anknipst – sie ist die einzige Betriebsart."

▶ NÄCHSTE FOLIE fürs Tippen ins Feld – oder hier rechts direkt: „abc" eintippen, wegklicken → Fehler. Gültige Adresse → Fehler weg.
-->

---

# Schritt 1 · Es prüft wirklich.

<v-clicks>

**Ins Feld `abc` tippen, wegklicken** → der Fehler erscheint. Keine Dekoration – das Feld prüft selbst.
**Gültige Adresse eintippen** → Fehler weg, ohne Aufräumen. Im Code: `_msg` setzen, `_msg` wieder leeren.
`_msg`, `_touched`, `_on` sind **Properties, keine Attribute** – per JavaScript gesetzt. Deshalb steht im Markup kein Fehlerzustand.
Die Properties sind über **alle** Komponenten vereinheitlicht – ein Vokabular aus knapp 100 dokumentierten Eigenschaften: `_label`, `_variant`, `_hint` bedeuten überall dasselbe. Einmal lernen, überall anwenden.
Die Button-Varianten (`primary`, `secondary`, `danger`, `ghost`) stehen **nicht** im Komponenten-Code. Die kommen aus dem **Theme**. Merken – das ist Schritt 4.

</v-clicks>

<v-click>

<Step1Demo />

</v-click>

<!--
▶ LIVE: In der Demo unten (Feld ist mit `max.muster@beispiel.de` vorbelegt) Inhalt markieren, „abc" eintippen und wegklicken → Fehler erscheint. Dann eine gültige Adresse → Fehler verschwindet.

„Und das ist keine Dekoration – das Feld prüft wirklich. Beschriftung, Hinweis, Fehlermeldung, und gleich sehen wir, was darunter passiert.

Fehler weg, ohne dass ich etwas aufräumen muss. Im Code sind das zwei Zeilen: _msg setzen, _msg wieder leeren.

Kleiner, aber wichtiger Punkt für später: _msg, _touched und _on sind PROPERTIES, keine Attribute. Die setzt ihr per JavaScript, nicht im HTML. Deshalb steht im Markup oben kein Fehlerzustand."

▶ Einen der vier Buttons anklicken – die Zeile darunter reagiert.

„Die Varianten hier – primary, secondary, danger, ghost – merkt euch die kurz. Die stehen nämlich gar nicht im Komponenten-Code. Die kommen aus dem Theme. Dazu kommen wir gleich."

-->

---

# Schritt 2 · „Wir haben aber Bestand."

> Schön, aber wir haben eine Anwendung von 2015, die können wir nicht neu schreiben.
> **Müsst ihr auch nicht.**

Eine bewusst altmodische Seite: eigenes CSS, natives `form method="get"` – und ein CSS, das mit `!important` Schriftart, Farbe und Zeilenhöhe auf **alle Felder und Buttons des Blocks** jagt.

<div class="demo-panel demo-panel--flush">

<IslandDemo />

</div>

<div class="hint">Das native Feld kippt auf Georgia/Rot um, die KoliBri-Insel bleibt unberührt – <strong>der Shadow DOM hält euer CSS draußen.</strong> Und umgekehrt: KoliBri färbt eure Seite nicht ein. Absende-Verhalten (GET-Parameter, Brücke) live unter <code>demo/step-2-island.html</code>.</div>

<!--
„Jetzt der Satz, der in jedem zweiten Projekt kommt: ‚Schön, aber wir haben eine Anwendung von 2015, die können wir nicht neu schreiben.' Müsst ihr auch nicht."

▶ LIVE auf der Folie: Links der Altbestands-Block unter feindlichem CSS – rot, Serifenschrift, Zeilenhöhe 2.4, verbogen. Rechts dasselbe Feld als KoliBri-Komponente – unberührt. Das Legacy-CSS regiert seinen Block, aber die Insel bleibt draussen: Selektoren erreichen das Feld im Shadow DOM nicht, und KoliBri färbt umgekehrt eure Seite nicht ein.

Und umgekehrt: KoliBri färbt eure Seite nicht ein. Kein globales Stylesheet, das plötzlich alles überschreibt.

▶ HANDS-ON danach: demo/step-2-island.html – beide Felder ausfüllen und absenden, unten erscheinen die GET-Parameter."
-->

---

# Schritt 2 · Die ehrliche Einschränkung – und die Brücke.

<v-clicks>

Die Kapselung betrifft nicht nur CSS, sondern auch das **Formular**: Ein Feld im Shadow DOM steht **nicht** in `form.elements` und wird beim nativen Absenden **nicht** mitgeschickt – auch nicht mit `name`-Attribut.

</v-clicks>

<v-click>

Die Brücke ist eine Zeile – beim Absenden den Wert in ein verstecktes natives Feld schreiben:

</v-click>

<v-click>

```js
form.addEventListener('submit', () => {
	bridge.value = String(mail._value ?? '');
});
```

</v-click>

<v-click>

Deshalb steht nach dem Absenden `mail=…` in der Ausgabe. Für ein einzelnes Feld im Altbestand genau richtig. Wer ein ganzes Formular migriert, nimmt `kol-form` – **nächster Schritt.**

</v-click>

<v-click>

Weitere Grenzen – Browser- und Screenreader-Randfälle – werden offen in der `KNOWN_ISSUES.md` im Repo dokumentiert und an die Browserhersteller gemeldet, statt mit Workarounds überdeckt.

</v-click>

<!--
„Jetzt eine Ehrlichkeit, die euch sonst eine halbe Stunde kostet: Die Kapselung betrifft nicht nur CSS, sondern auch das Formular. Ein Feld im Shadow DOM steht NICHT in form.elements und wird beim nativen Absenden NICHT mitgeschickt – auch nicht mit name-Attribut.

Die Brücke ist eine Zeile: beim Absenden den Wert der Komponente in ein verstecktes natives Feld schreiben. Deshalb steht unten jetzt mail=… in der Ausgabe.

Für ein einzelnes Feld im Altbestand ist das genau richtig. Wer ein ganzes Formular migriert, nimmt kol-form – und das ist der nächste Schritt."

-->

---

# Schritt 3 · Live: Komposition & der Röntgenblick.

<div class="demo-panel demo-panel--flush">

<Step3Demo />

</div>

<div class="hint">Die Felder sind mit Beispielwerten gefüllt – <strong>direkt abschicken</strong> zeigt den Erfolgs-Alert. Werte löschen und abschicken → Fehlerliste mit Fokussprung; dann der „Röntgenblick".</div>

<!--
▶ DIE HOCHPUNKT-FOLIE. Felder sind vorbelegt: Erst Absenden (Erfolg), dann Werte löschen + Absenden (Fehlerliste + Fokussprung), dann Röntgenblick.

„Jetzt setzen wir zusammen. Eine Karte, ein Formular, drei Felder, ein Button. Bausteine, die nichts voneinander wissen – und trotzdem passt es."

▶ KURZ ABSCHICKEN (Felder sind gefüllt): „Absenden – Erfolgsmeldung, Felder leer. Der normale Fall geht von allein."

▶ DANN WERTE LÖSCHEN UND LEER ABSCHICKEN:
„Jetzt schaut, was ein leeres Pflichtfeld auslöst. Oben erscheint eine Fehlerliste – und der Fokus springt hinein. Wer mit der Tastatur arbeitet, landet nach dem Absenden nicht irgendwo, sondern genau dort, wo steht, was zu tun ist. Von da ein Klick ins Feld. Im Behördenkontext ist das der Unterschied zwischen einem Formular, das man ausfüllen kann, und einem, das man aufgibt."

▶ Ein Feld korrigieren → Meldung verschwindet. „Und es räumt hinter sich auf."

▶ AUF „RÖNTGENBLICK" KLICKEN:
„Und das hier ist das, worum es mir eigentlich geht." ▶ Kurz lesen lassen. Nicht sofort weiterreden.

„Das ist das echte input-Element aus dem Shadow DOM. aria-invalid ist gesetzt – erinnert ihr euch, das war der Fehler aus Schritt 0. aria-describedby zeigt auf drei IDs, verkettet, in der richtigen Reihenfolge. Darunter steht, was der Screenreader daraus tatsächlich vorliest.

Das habe ich nicht verdrahtet. Ich habe _label, _required und _hint geschrieben.

Und ganz unten: Der Button ist 44 Pixel hoch. Das ist kein Zufall, das ist die Mindest-Zielgröße aus WCAG 2.5.5 – für Menschen, die nicht zielsicher tippen."

▶ Formular ausfüllen und absenden → Erfolgs-Alert, Felder leer.
„Und der ganze Code dahinter? Pro Feld eine Prüffunktion, dann _msg setzen und form._errorList füllen. Die ARIA-Verdrahtung, die Fehlerliste, der Fokussprung, die Live-Region – das macht KoliBri daraus von allein."


NOTFALL: Hängt die Demo – weiterreden anhand der nächsten Folie; der komplette Röntgenblick-Text steht im README, Abschnitt 6.
-->

---

# Schritt 3 · Was **nicht** im Markup steht.

<v-clicks>

„Formular-Felder, die mit einem Sternchen (*) gekennzeichnet sind, sind Pflichtangaben." – setzt **`kol-form` von sich aus**, in der Sprache der Anwendung.
Das Sternchen am Label ist CSS `content: '*' / ''`: sichtbar ein Stern, für den Screenreader **nichts**. Kein „Stern Stern Stern" beim Durchhören.
Der Zeichenzähler läuft doppelspurig: sichtbar `aria-hidden`, daneben eine `aria-live`-Region mit ausformuliertem Text.
Jeder Button ist mindestens **44 × 44 px** – WCAG 2.5.5, nachmessen mit dem Röntgenblick.

</v-clicks>

<v-click>

<div class="hint">Stolperfalle für den Vanilla-Einstieg: In HTML gibt es kein camelCase – aus <code>_maxLength</code> wird das Attribut <code>_max-length</code>. Wer es verwechselt, bekommt keinen Fehler – nur keinen Zähler. In JSX gilt wieder <code>_maxLength</code>.</div>

</v-click>

<!--
▶ Auf die Sätze zeigen und kurz lesen lassen. Diese Folie ist die Beleg-Folie für Nachfragen.

„Der Satz unter dem Formular habe ich nicht geschrieben. Den setzt kol-form von sich aus – in der Sprache der Anwendung.

Und das Sternchen am Label: das ist CSS content '*' / ''. Sichtbar ein Stern, für den Screenreader NICHTS. Wer schon mal ein Formular durchgehört hat, in dem bei jedem Feld ‚Stern' gesagt wird, weiß, warum das ein Geschenk."

Stolperfalle camelCase: Beleg in demo/step-3-form.html, Hinweisbox unten. Gemessen in 4.4.0: _maxLength im HTML wird kommentarlos ignoriert.
-->

---
layout: two-cols
---

# Schritt 4 · Eine Zeile entscheidet über das ganze Erscheinungsbild.

**Theme registrieren – einmal beim Hochfahren:**

```ts
import { DEFAULT } from '@public-ui/theme-default';
await register(DEFAULT, defineCustomElements);

// Oder das Corporate Design des Bundes:
import { KERN_V2 } from '@public-ui/theme-kern';
await register(KERN_V2, defineCustomElements);
```

**Live umschalten – gleiches Markup, anderes Haus:**

<ThemeToggleDemo />

::right::

<div class="tokendemo-panel">

**Nur einzelne Stellschrauben?** Reines CSS, sofort, ohne Neuladen:

```css
:root {
	--kolibri-color-primary: #cc006e;
	--kolibri-border-radius: 14px;
	--kolibri-font-size: 18px;
}
```

<TokenDemo />

<div class="hint">Das Schema typisiert sicher, dass jedes registrierte Theme zu jeder Komponente passt – Themes sind dadurch austauschbar ohne Markup-Änderung.</div>

</div>

<!--
„Kommen wir zum Aussehen. Gleiches Markup, anderes Haus: Oben das Default-Theme registriert, darunter das Corporate Design des Bundes – geändert hat sich genau eine Zeile, welches Theme-Paket beim Start registriert wird. Das passiert einmal beim Hochfahren – so macht es auch die offizielle Beispielanwendung.

▶ HANDS-ON: Auf „Theme: KERN" klicken – die Felder auf der Folie schalten live um (unterstrichen statt umrandet, andere Schrift, andere Abstände), ohne Reload. Zurückschalten geht genauso.

▶ HANDS-ON danach: demo/step-4-theme.html – komplette Seite mit Theme-Umschalter oben.

▶ Rechts: LIVE auf „Eigene Tokens" klicken – sofort, ohne Neuladen.

„Und wenn es kein ganzes Theme sein muss, sondern nur eure Hausfarbe – das hier sind drei CSS-Zeilen. Custom Properties. Sofort, ohne Neuladen.

Und jetzt kommt das Schöne: CSS-Custom-Properties durchdringen den Shadow DOM. Die Kapselung, die euer Legacy-CSS in Schritt 2 draußen gehalten hat, hat genau diese eine Tür – und die ist Absicht. Das ist die vorgesehene Stellschraube."

Hinweis: In dieser Folie sind die Tokens sogar auf einen Container skopiert statt auf :root – sie erben trotzdem in den Shadow DOM. Wer genau hinsieht, hat hier einen Bonus-Punkt.
-->

---
layout: two-cols
---

# Schritt 5 · Dasselbe in React.

```html
<kol-input-text _label="Anliegen" _max-length="120" _has-counter> </kol-input-text>
```

::right::

```jsx
<KolInputText _label="Anliegen" _maxLength={120} _hasCounter />
```

<v-click>

<div class="reveal-box">

Der einzige echte Unterschied: In HTML gibt es kein camelCase (`_max-length`), in JSX `_maxLength`. **Alles andere ist identisch** – Props, Verhalten, ARIA, Theme. Darunter läuft dieselbe Web Component; der Adapter ist eine dünne Hülle. Gleiches gibt es für Angular, Vue, Svelte, Solid und Preact.

</div>

</v-click>

<v-click>

**Wiederverwendung eine Ebene höher:** Der react-hook-form-Adapter verheiratet jedes Feld mit der Formularbibliothek und reicht Validierungsfehler automatisch als `_msg` und `_touched` weiter.

</v-click>

<!--
„Noch ein kurzer Ausblick, für die Frage, die garantiert kommt: ‚Und bei uns in React?'

Links, was wir gerade gebaut haben. Rechts dasselbe in React. Der einzige echte Unterschied steht im hervorgehobenen Kasten: In HTML gibt es kein camelCase, da heißt es _max-length. In JSX _maxLength.

Alles andere ist identisch – Props, Verhalten, ARIA, Theme. Weil darunter dieselbe Web Component läuft. Der React-Adapter ist eine dünne Hülle. Dasselbe gibt es für Angular, Vue, Svelte, Solid und Preact.

Und weil das normale Bausteine sind, baut ihr daraus eure eigenen. KoliBri macht das selbst vor: der react-hook-form-Adapter verheiratet jedes Feld mit der Formularbibliothek und reicht Validierungsfehler automatisch weiter."

-->

---

# Warum man darauf bauen kann.

<div class="manifest-grid">

<div class="manifest-card">

**Feste, validierte API – wie HTML-Tags**

Web Components mit klar definierten Schnittstellen und restriktivem Zugriff nach innen. Jede Basiskomponente wird **einmal** semantisch implementiert, erprobt und abgenommen – kleinteilig genug für universelle Nachnutzung und Standardisierung.

</div>

<div class="manifest-card">

**Barrierefreiheit ist die Betriebsart**

Semantisch standardisierte Komponenten, getrieben durch WCAG- und BITV-Prüfschritte, automatisiert gegen WCAG 2.1 AA getestet. Kein Schalter, kein Add-on. Browser-Randfälle werden offen dokumentiert statt mit Workarounds überdeckt.

</div>

<div class="manifest-card">

**Keine Datenübertragung, keine Datenhaltung**

Reine Präsentationsschicht ohne Fachlogik: Die Bibliothek sendet und speichert nichts – Datenschutz und minimale Angriffsfläche ergeben sich aus der Architektur, nicht aus Zusatzversprechen. Code kommt nur per Pull Request mit Vier-Augen-Prinzip hinein.

</div>

<div class="manifest-card">

**EUPL v1.2**

Nutzung der npm-Pakete ist unproblematisch, auch in Closed-Source-Projekten. Copyleft greift erst beim Fork des Quellcodes. Verbessern statt forken ist der empfohlene Weg.

</div>

</div>

<div class="hint">Festes Versprechen seit Tag eins: <em>„We make the HTML accessible and themeable for reuse."</em> – das Manifest, die Konzepte (Architektur, Properties, Form-Inputs, Known Issues, Datenschutz, Sicherheit) und die Lizenz stehen unter public-ui.github.io/docs.</div>

<!--
„Bevor ich euch loslasse, ein Satz dazu, WARUM man auf so eine Bibliothek bauen kann.

Erstens: Das sind Web Components mit einer festen, validierten API – wie HTML-Tags. Jede Basiskomponente wird einmal semantisch implementiert, erprobt und abgenommen – und dann überall nachgenutzt. Zweitens: Barrierefreiheit ist hier nicht optional, sie ist die Betriebsart – getrieben durch WCAG- und BITV-Prüfschritte, automatisiert gegen WCAG 2.1 AA getestet. Drittens, und das hört man selten: Die Bibliothek überträgt und speichert überhaupt keine Daten. Reine Präsentationsschicht ohne Fachlogik – Datenschutz und minimale Angriffsfläche durch Architektur, nicht durch Versprechen. Code kommt überhaupt nur per Pull Request mit Vier-Augen-Prinzip hinein. Und viertens: EUPL-Lizenz – die npm-Pakete dürft ihr frei nutzen, auch in geschlossenen Projekten.

Das Manifest dazu hat einen Satz: We make the HTML accessible and themeable for reuse."
-->

---
layout: center
---

# Rückblende.

<div class="flashback">

Am Anfang: **ein** Feld. Vier IDs, drei ARIA-Attribute, ein stiller Fehler.

<v-click>

Diese Verdrahtung ist Arbeit, die in **jedem** Projekt neu gemacht wird – in jedem Feld, von Hand. Und sie geht **leise** kaputt, ohne dass es jemand merkt.

</v-click>

<v-click>

<div class="point-box">

**KoliBri macht sie einmal. Richtig. Und ihr schreibt `_label`.**

</div>

</v-click>

</div>

<!--
▶ Der Abbinder – bewusst ruhig, das Bild von Schritt 0 im Kopf.

„Das war der Anfang. Ein Feld. Vier IDs, drei ARIA-Attribute, ein stiller Fehler.

Der Punkt ist nicht, dass KoliBri hübsch ist. Der Punkt ist: Diese ganze Verdrahtung ist Arbeit, die in JEDEM Projekt neu gemacht wird, in jedem Feld, von Hand – und die leise schiefgeht, ohne dass es jemand merkt.

KoliBri macht sie einmal. Richtig. Und ihr schreibt _label."

Letzte Folie: Adressen, dann Fragen.
-->

---
layout: end
---

# Weitermachen.

<KolibriLogo />

<div class="next-steps">

- **Einsteiger-Doku** im Repo unter `docs/`
- **Beispielanwendung** in `packages/samples/presentation`
- **Diese Demo & das Deck** – liegen im Repo und laufen komplett offline

</div>

Fragen?

<!--
▶ Adressen nennen, dann Schnitt.

„Drei Adressen zum Weitermachen: die Einsteiger-Doku im Repo unter docs/, die Beispielanwendung in packages/samples/presentation, und diese Demo hier – die liegt im Repo und läuft offline.

Fragen?"
-->

---
hide: true
---

# Anhang · Bühne & Notfall (nur Presenter)

**Start:** `cd docs/trainings/kolibri-intro-15min/slides && npm install && npm run dev` → `http://localhost:3030`

| Problem                         | Reaktion                                                                                                                                     |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Folie mit Live-Demo bleibt leer | Neue Folie ansteuern und zurück – oder Seite neu laden. Läuft `register()` nicht, steht der Grund in der Browser-Konsole                     |
| Theme-Wechsel fehlt live        | URL `/demo/step-4-theme.html?theme=kern` direkt im Browser öffnen                                                                            |
| Röntgenblick fehlt              | Er sitzt allein auf der Folie „Schritt 3 – Live"                                                                                             |
| Zu wenig Zeit                   | Erst Schritt 5 streichen (React), dann das Tippen in Schritt 1. **Niemals** das leere Abschicken in Schritt 3 streichen – das ist die Pointe |
| Zu viel Zeit                    | In Schritt 3 zusätzlich: KoliBri warnt in der Konsole bei Labels unter drei lesbaren Zeichen                                                 |
| Kompletter Ausfall              | README Abschnitt 6: der komplette Röntgenblick-Text steht dort zum Vorlesen; Belegstellen in Abschnitt 4                                     |

<!--
Diese Folie ist mit hide: true aus der Präsentation genommen und taucht nur im Presenter-Modus/Overview (Taste o) auf.
-->
