# KoliBri Web Components – Einsteigerschulung in 15 Minuten

Vortragsfertiges Paket: lauffähige Demo in fünf Schritten, Sprechzettel mit Minutenmarken
und die Belegstellen im Code für Nachfragen aus dem Publikum.

**Zielgruppe:** Entwicklerinnen und Entwickler ohne KoliBri-Vorkenntnisse.
**Format:** Live-Demo im Browser, Vanilla HTML/JS, mit kurzem React-Ausblick am Ende.
**Kernbotschaft:** _KoliBri nimmt dir die Barrierefreiheit ab, die du sonst von Hand
und fehleranfällig selbst verdrahten müsstest._

---

## 1. Drei Wege

**Zum schnellen Anschauen – ein Klick, kein Setup:**
<https://claude.ai/artifact/1tb5sQHC2xphAbrD9f9QZH>
Alle fünf Schritte als Live-Seite, KoliBri direkt von jsDelivr. Ohne Icons (die Icon-Schrift
ist ein Stylesheet, und die Seite darf Stylesheets nur von Google Fonts laden) – inhaltlich
ändert das nichts.

**Für den Vortrag als Folien-Deck – Slidev:**

```bash
cd docs/trainings/kolibri-intro-15min/slides
npm install          # Slidev + KoliBri 4.4.0 aus der npm-Registry (einmalig)
npm run dev          # → http://localhost:3030
```

Die komplette Schulung als Deck: Schritt 1, 2, 3 und 4 laufen als **echte KoliBri-Live-Demos
direkt in der Folie** – Validierung, Alt/Neu-Feld unter feindlichem CSS, leeres Abschicken
mit Fehlerliste und Röntgenblick, Theme-Umschaltung ohne Reload (globaler Theme-Name,
beide Themes registriert) und Token-Override. Alle Demo-Felder starten mit
Beispielwerten gefüllt. Die Demo-Seiten bleiben als **Hands-on-Verweise** auf den Folien verlinkt.
Der Sprechzettel aus
diesem README steckt als **Notizen hinter jeder Folie**: Presenter-Modus mit Taste `p`.
`npm run build` erzeugt einen statischen Export nach `dist/` (offline teilbar).
Vor jedem Start spiegelt `sync-demo.mjs` die Demo-Seiten nach `public/demo/` – dafür muss
`demo/vendor/` wie unten beschrieben vorhanden sein.

**Für den Vortrag – lokal und offline:**

```bash
cd docs/trainings/kolibri-intro-15min
node fetch-vendor.mjs          # ZWINGEND nach jedem frischen Checkout
npx http-server -p 8080 demo   # ES-Module brauchen HTTP, file:// reicht nicht
```

Dann `http://127.0.0.1:8080/index.html` öffnen.

> **Der häufigste Stolperstein:** `demo/vendor/` liegt **nicht im Repository** – 26 MB Bundles
> gehören nicht in ein Git-Repo. Ohne `node fetch-vendor.mjs` rendert keine einzige Komponente.
> Seit dem Boot-Wächter sagt die Seite das auch selbst, statt leer zu bleiben.

Danach läuft die Demo **vollständig offline** – kein WLAN auf der Bühne nötig.

> **Und noch eine Orientierung:** `index.html` ist nur die Übersicht, dort gibt es keine
> Komponenten. Die Buttons stehen auf Schritt 1, der **Röntgenblick-Knopf allein auf Schritt 3**,
> der Theme-Umschalter auf Schritt 4. Schritt 0 und 5 kommen absichtlich ohne KoliBri aus.

**Bühnen-Checkliste:**

- [ ] **Über den Server öffnen, nicht per Doppelklick.** Per `file://` bleiben die Seiten leer –
      sie zeigen dann eine Anleitung statt der Demo
- [ ] Alle sechs Seiten einmal durchklicken, damit der Browser-Cache warm ist
- [ ] Browser-Zoom auf ~125 % – die Demo ist dafür ausgelegt
- [ ] DevTools brauchst du **nicht**: Schritt 3 hat einen eigenen „Röntgenblick"-Knopf
- [ ] Zweiter Tab mit `step-4-theme.html?theme=kern` vorbereitet, falls der Reload zickt

---

## 2. Der Bogen auf einen Blick

Der Vortrag trägt einen Konflikt: _Barrierefreiheit von Hand ist mühsam und geht still schief._
Er wird bewusst erst in Minute 7 aufgelöst – der A11y-Payoff ist die Pointe, nicht die Einleitung.

| Zeit        | Schritt | Beat                                                     | Gefühl im Publikum         |
| ----------- | ------- | -------------------------------------------------------- | -------------------------- |
| 0:00–1:30   | 0       | Ein Feld, von Hand. Wo ist der Fehler?                   | Unbehagen, Wiedererkennung |
| 1:30–4:00   | 1       | Dasselbe in einem Tag – und es prüft wirklich            | Erleichterung              |
| 4:00–6:30   | 2       | „Wir haben aber Bestand" → Insel im nativen Formular     | Einwand entkräftet         |
| 6:30–10:00  | 3       | Leer abschicken → Fehlerliste, Fokussprung, Röntgenblick | **Höhepunkt**              |
| 10:00–12:30 | 4       | Gleiches Markup, anderes Haus                            | Weite, Perspektive         |
| 12:30–14:00 | 5       | Dasselbe in React                                        | Anschlussfähigkeit         |
| 14:00–15:00 | –       | Rückblende auf Schritt 0                                 | Schluss                    |

---

## 3. Sprechzettel

> **Legende:** ▶ = was du tust · „…" = was du sagst (Vorschlag, nicht auswendig lernen)

### 0:00 – Der Haken _(Schritt 0)_

▶ `step-0-handmade.html` steht offen. Nichts anderes auf dem Schirm.

> „Wir fangen klein an. Ein Formularfeld. E-Mail-Adresse. Pflichtfeld, mit Hinweistext,
> und es ist gerade im Fehlerzustand.
>
> Das hier ist kein schlechter Code. Das ist jemand, der sich Mühe gegeben hat:
> das Sternchen ist `aria-hidden`, damit der Screenreader nicht ‚Stern' sagt.
> Der Hinweistext hängt per `aria-describedby` am Feld. Die Fehlermeldung hat `role="alert"`.
> Vier IDs, drei ARIA-Attribute. Für **ein** Feld."

▶ Kurze Pause. Ins Publikum schauen.

> „Trotzdem ist hier ein Fehler drin. Wer findet ihn?"

▶ 10–15 Sekunden warten. Wirklich warten.

> „Es fehlt `aria-invalid`. Der Screenreader liest den Fehlertext vor – aber er sagt nicht,
> dass dieses Feld fehlerhaft ist. Wer nur mit der Tastatur durch das Formular springt,
> landet im Feld und hört: alles in Ordnung.
>
> Und das ist der Punkt: Barrierefreiheit geht nicht mit einem Knall kaputt.
> Sie geht **leise** kaputt. Niemand merkt es – außer den Menschen, die darauf angewiesen sind."

_(Zeitmarke: 1:30)_

---

### 1:30 – Die Erleichterung _(Schritt 1)_

▶ Weiter zu `step-1-first.html`.

> „Dasselbe Feld. Ein Tag."

▶ Auf das Markup zeigen bzw. den Quelltext einblenden.

> „`kol-input-email`, `_label`, `_required`, `_hint`, fertig.
> Und darüber das ganze Setup – das sind wirklich nur drei Zeilen:
> Komponenten registrieren, Theme registrieren, loslegen.
>
> Zwei Dinge fallen sofort auf. Erstens: Alle Eigenschaften fangen mit einem Unterstrich an.
> Das ist Absicht – so kollidieren sie nie mit echten HTML-Attributen.
>
> Zweitens, und das ist mir wichtiger: `_label` ist **Pflicht**.
> Es gibt keine KoliBri-Komponente ohne Beschriftung. Man kann sie nicht vergessen.
> Barrierefreiheit ist hier kein Schalter, den man anknipst – sie ist die einzige Betriebsart."

▶ **Feldinhalt markieren, `abc` tippen und wegklicken.** Der Fehler erscheint
(das Feld startet mit `max.muster@beispiel.de` vorbelegt).

> „Und das ist keine Dekoration – das Feld prüft wirklich.
> Beschriftung, Hinweis, Fehlermeldung, und gleich sehen wir, was darunter passiert."

▶ **Eine gültige Adresse eintippen.** Der Fehler verschwindet.

> „Fehler weg, ohne dass ich etwas aufräumen muss.
> Im Code sind das zwei Zeilen: `_msg` setzen, `_msg` wieder leeren.
>
> Kleiner, aber wichtiger Punkt für später: `_msg`, `_touched` und `_on` sind
> _Properties_, keine Attribute. Die setzt ihr per JavaScript, nicht im HTML.
> Deshalb steht im Markup oben kein Fehlerzustand."

▶ Auf die Button-Reihe zeigen, einen anklicken – die Zeile darunter reagiert.

> „Die Varianten hier – primary, secondary, danger, ghost – merkt euch die kurz.
> Die stehen nämlich gar nicht im Komponenten-Code. Die kommen aus dem Theme.
> Dazu kommen wir gleich."

_(Zeitmarke: 4:00)_

---

### 4:00 – Der Einwand _(Schritt 2)_

> „Jetzt der Satz, der in jedem zweiten Projekt kommt:
> ‚Schön, aber wir haben eine Anwendung von 2015, die können wir nicht neu schreiben.'
> Müsst ihr auch nicht."

▶ Weiter zu `step-2-island.html`.

> „Das hier ist eine bewusst altmodische Seite. Eigenes CSS, natives `form method=get`.
> Und das CSS ist böse: es setzt Schriftart, Farbe und Zeilenhöhe mit `!important`
> auf **alle** Felder und Buttons.
>
> Seht ihr den Unterschied? Oben das native Feld – rot, Serifenschrift, verbogen.
> Unten das KoliBri-Feld – unberührt. Der Shadow DOM hält euer CSS draußen."

▶ **Beide Felder ausfüllen und absenden.** Unten erscheinen die GET-Parameter.

> „Und umgekehrt: KoliBri färbt eure Seite nicht ein. Kein globales Stylesheet, das
> plötzlich alles überschreibt.
>
> Jetzt eine Ehrlichkeit, die euch sonst eine halbe Stunde kostet:
> Die Kapselung betrifft nicht nur CSS, sondern auch das Formular.
> Ein Feld im Shadow DOM steht **nicht** in `form.elements` und wird beim nativen
> Absenden **nicht** mitgeschickt – auch nicht mit `name`-Attribut.
>
> Die Brücke ist eine Zeile: beim Absenden den Wert der Komponente in ein verstecktes
> natives Feld schreiben. Deshalb steht unten jetzt `mail=…` in der Ausgabe.
>
> Für ein einzelnes Feld im Altbestand ist das genau richtig. Wer ein ganzes Formular
> migriert, nimmt `kol-form` – und das ist der nächste Schritt."

_(Zeitmarke: 6:30)_

---

### 6:30 – Der Höhepunkt _(Schritt 3)_

▶ Weiter zu `step-3-form.html`.

> „Jetzt setzen wir zusammen. Eine Karte, ein Formular, drei Felder, ein Button.
> Bausteine, die nichts voneinander wissen – und trotzdem passt es."

▶ Kurz das Markup zeigen.

> „Aber schaut mal, was auf der Seite steht, das **nicht** im Markup steht."

▶ Auf den Satz unter dem Formular zeigen.

> „‚Formular-Felder, die mit einem Sternchen gekennzeichnet sind, sind Pflichtangaben.'
> Den habe ich nicht geschrieben. Den setzt `kol-form` von sich aus – in der Sprache der Anwendung.
>
> Und das Sternchen am Label: das ist CSS. `content: '*' / ''`.
> Sichtbar ein Stern, für den Screenreader **nichts**.
> Wer schon mal ein Formular durchgehört hat, in dem bei jedem Feld ‚Stern' gesagt wird,
> weiß, warum das ein Geschenk ist."

▶ **Das Formular leer abschicken.**

> „Jetzt schaut, was ein leeres Pflichtfeld auslöst.
>
> Oben erscheint eine Fehlerliste – und der Fokus springt hinein.
> Wer mit der Tastatur arbeitet, landet nach dem Absenden nicht irgendwo,
> sondern genau dort, wo steht, was zu tun ist. Von da ein Klick ins Feld.
>
> Im Behördenkontext ist das der Unterschied zwischen einem Formular,
> das man ausfüllen kann, und einem, das man aufgibt."

▶ **Ein Feld korrigieren.** Die Meldung verschwindet.

> „Und es räumt hinter sich auf."

▶ **Auf „Röntgenblick" klicken.**

> „Und das hier ist das, worum es mir eigentlich geht."

▶ Kurz lesen lassen. Nicht sofort weiterreden.

> „Das ist das echte `input`-Element aus dem Shadow DOM.
> `aria-invalid` ist gesetzt – erinnert ihr euch, das war der Fehler aus Schritt 0.
> `aria-describedby` zeigt auf drei IDs, verkettet, in der richtigen Reihenfolge.
> Darunter steht, was der Screenreader daraus tatsächlich vorliest.
>
> Das habe ich nicht verdrahtet. Ich habe `_label`, `_required` und `_hint` geschrieben.
>
> Und ganz unten: Der Button ist 44 Pixel hoch. Das ist kein Zufall,
> das ist die Mindest-Zielgröße aus WCAG 2.5.5 – für Menschen, die nicht zielsicher tippen."

▶ **Formular ausfüllen und absenden.** Der Erfolgs-Alert erscheint, die Felder sind leer.

> „Und der ganze Code dahinter? Pro Feld eine Prüffunktion, dann `_msg` setzen und
> `form._errorList` füllen. Die ARIA-Verdrahtung, die Fehlerliste, der Fokussprung,
> die Live-Region – das macht KoliBri daraus von allein."

_(Zeitmarke: 10:00)_

---

### 10:00 – Die Weite _(Schritt 4)_

▶ Weiter zu `step-4-theme.html`.

> „Kommen wir zum Aussehen. Das hier ist das Default-Theme."

▶ **Auf „Theme: KERN" klicken.** Die Seite lädt neu.

> „Gleiches Markup. Kein Zeichen geändert. Anderes Haus.
> Andere Farben, andere Schrift, andere Abstände – schaut euch die Felder an,
> die sind jetzt unterstrichen statt umrandet.
>
> Geändert hat sich genau eine Zeile: welches Theme-Paket beim Start registriert wird.
> Das passiert einmal beim Hochfahren der Anwendung – so macht es auch
> die offizielle KoliBri-Beispielanwendung."

▶ **Auf „Eigene Tokens" klicken.**

> „Und wenn es kein ganzes Theme sein muss, sondern nur eure Hausfarbe –
> das hier sind drei CSS-Zeilen. Custom Properties. Sofort, ohne Neuladen.
>
> Und jetzt kommt das Schöne: CSS-Custom-Properties durchdringen den Shadow DOM.
> Die Kapselung, die euer Legacy-CSS in Schritt 2 draußen gehalten hat,
> hat genau diese eine Tür – und die ist Absicht. Das ist die vorgesehene Stellschraube."

_(Zeitmarke: 12:30)_

---

### 12:30 – Der Anschluss _(Schritt 5)_

▶ Weiter zu `step-5-react.html`.

> „Zwei Minuten noch, für die Frage, die garantiert kommt: ‚Und bei uns in React?'
>
> Links, was wir gerade gebaut haben. Rechts dasselbe in React.
> Der einzige echte Unterschied steht kursiv: In HTML gibt es kein camelCase,
> da heißt es `_max-length`. In JSX `_maxLength`.
>
> Alles andere ist identisch – Props, Verhalten, ARIA, Theme.
> Weil darunter dieselbe Web Component läuft. Der React-Adapter ist eine dünne Hülle.
> Dasselbe gibt es für Angular, Vue, Svelte, Solid und Preact.
>
> Und weil das normale Bausteine sind, baut ihr daraus eure eigenen.
> KoliBri macht das selbst vor: der react-hook-form-Adapter verheiratet jedes Feld
> mit der Formularbibliothek und reicht Validierungsfehler automatisch weiter."

_(Zeitmarke: 14:00)_

---

### 14:00 – Der Abbinder

▶ **Zurück zu `step-0-handmade.html`.** Das Bild vom Anfang.

> „Da waren wir vor 14 Minuten. Ein Feld. Vier IDs, drei ARIA-Attribute, ein stiller Fehler.
>
> Der Punkt ist nicht, dass KoliBri hübsch ist. Der Punkt ist:
> Diese ganze Verdrahtung ist Arbeit, die in **jedem** Projekt neu gemacht wird,
> in jedem Feld, von Hand – und die leise schiefgeht, ohne dass es jemand merkt.
>
> KoliBri macht sie einmal. Richtig. Und ihr schreibt `_label`.
>
> Drei Adressen zum Weitermachen:
> die Einsteiger-Doku im Repo unter `docs/`, die Beispielanwendung in `packages/samples/presentation`,
> und diese Demo hier – die liegt im Repo und läuft offline.
>
> Fragen?"

_(Zeitmarke: 15:00)_

---

## 4. Belege für Nachfragen

Wenn jemand nachhakt – hier stehen die Dinge im Code:

| Behauptung im Vortrag                                                           | Fundstelle                                                                                                                  |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `aria-describedby` wird automatisch verkettet, `aria-invalid` bei touched+error | `packages/components/src/functional-component-wrappers/_helpers/getRenderStates.ts`                                         |
| Sternchen sichtbar, für Screenreader stumm                                      | `packages/components/src/components/@shared/_form-field.mixin.scss` (`content: '*' / ''`)                                   |
| Der Pflichtfeld-Satz kommt von `kol-form`                                       | `packages/components/src/components/form/shadow.tsx`, Text in `src/locales/de.ts`                                           |
| Mindest-Zielgröße 44 px                                                         | `packages/components/src/components/a11y.scss` (`--a11y-min-size`)                                                          |
| Zeichenzähler doppelspurig (sichtbar + `aria-live`)                             | `packages/components/src/functional-components/FormField/FormField.tsx`                                                     |
| Fehlerliste mit Fokussprung                                                     | `packages/components/src/components/form/shadow.tsx`; Beispiel: `packages/samples/react/src/components/form/error-list.tsx` |
| Fünf CSS-Layer, Basis vs. Theme getrennt                                        | `packages/components/src/components/_layer-order.scss`, `docs/BASE_STYLING_VS_THEMING_CONCEPT.md`                           |
| Design-Tokens `--kolibri-*`                                                     | `packages/themes/default/src/global.scss`, Tabelle in `packages/themes/default/README.md`                                   |
| KoliBri warnt zur Laufzeit bei unbrauchbaren Labels                             | `packages/components/src/schema/props/label.ts`                                                                             |
| Automatisierte A11y-Tests (axe, WCAG 2.1 AA)                                    | `packages/tools/visual-tests/tests/axe-snapshots.spec.js`                                                                   |
| BITV/WCAG-Bezug                                                                 | `publiccode.yml`, `docs/arc42_de/08-cross-cutting-concepts.md` §8.1                                                         |

**Vorsicht bei zwei Formulierungen:**

- Nicht „AAA-zertifiziert" sagen. Die Doku ist uneinheitlich (arc42 nennt mal WCAG 2.2 AAA,
  mal 2.1 AA), die automatisierten Tests laufen gegen `wcag21aa`.
  Sichere Formulierung: _„gebaut gegen WCAG und BITV, automatisiert gegen WCAG 2.1 AA getestet"_.
- **Dark Mode nicht versprechen.** Er ist konzeptionell vorgesehen, aber in keinem
  Theme implementiert (`docs/BASE_STYLING_VS_THEMING_CONCEPT.md`, Abschnitt „Status").

---

## 5. Notfallplan

| Problem                                           | Reaktion                                                                                                                                              |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seite zeigt „Diese Seite braucht einen Webserver" | Sie wurde per `file://` geöffnet. Server starten: `npx http-server -p 8080 demo`                                                                      |
| Banner „KoliBri wurde nicht geladen"              | `demo/vendor/` fehlt. Einmal `node fetch-vendor.mjs` ausführen                                                                                        |
| Keine Buttons, kein Röntgenblick zu sehen         | Vermutlich `index.html`, Schritt 0 oder 5 – dort gibt es keine. Röntgenblick sitzt auf Schritt 3                                                      |
| Seite bleibt weiß, Komponenten rendern nicht      | `register(...)` lief nicht durch. Neu laden. Wenn es bleibt: `demo/vendor/` fehlt → `node fetch-vendor.mjs`                                           |
| Komponenten da, aber ungestylt                    | Theme wurde nicht registriert – fast immer ein Tippfehler im Import. Auf Schritt 1 zurückfallen                                                       |
| Theme-Wechsel lädt nicht neu                      | Vorbereiteten zweiten Tab mit `?theme=kern` nehmen                                                                                                    |
| Demo hängt komplett                               | Screenshots liegen nicht bei – erzähl Schritt 3 an der Code-Tabelle in Abschnitt 4 weiter. Der Röntgenblick-Text steht unten in Abschnitt 6           |
| Zu wenig Zeit                                     | Erst Schritt 5 streichen (React), dann in Schritt 1 das Tippen ins Feld. **Niemals** das leere Abschicken in Schritt 3 streichen – das ist die Pointe |
| Zu viel Zeit                                      | In Schritt 3 zusätzlich: KoliBri warnt in der Konsole bei Labels unter drei lesbaren Zeichen                                                          |

---

## 6. Der Röntgenblick-Text (falls die Demo ausfällt)

So sieht die Ausgabe aus, **nachdem das Formular leer abgeschickt wurde** –
verifiziert mit KoliBri 4.4.0:

```
<input  type="email"
        required=true
        aria-invalid="true"
        aria-describedby="input-email-msg-26f495 input-email-hint-26f495 input-email-error-26f495" />

Was der Screenreader daraus vorliest:
  input-email-msg-26f495
     → "FehlerBitte geben Sie eine E-Mail-Adresse an."
  input-email-hint-26f495
     → "Wir nutzen die Adresse nur für die Terminbestätigung."
  input-email-error-26f495
     → (noch kein Element – die ID ist reserviert, Screenreader überspringen sie)

Zielgröße des Buttons: min-height = 44px  (WCAG 2.5.5 verlangt 44px)
```

> **Reihenfolge auf der Bühne:** erst abschicken, dann Röntgenblick. Vorher ist das Feld
> fehlerfrei, dann steht dort nur der Hinweistext und `aria-invalid` ist gar nicht gesetzt –
> korrekt, aber als Beleg langweilig.

> **Zur dritten ID:** KoliBri reserviert sie für den Fehlerfall, rendert das Element aber nicht
> immer mit. Eine ID ohne Ziel ist harmlos – assistive Technik überspringt sie stillschweigend.
> Falls es jemand bemerkt: ehrlich benennen, es entwertet die anderen beiden Verkettungen nicht.

---

## 7. Was an dieser Demo verifiziert ist

Alle Aussagen dieses Vortrags wurden gegen KoliBri **4.4.0** in einem echten Chromium geprüft,
nicht aus der Doku übernommen. Dabei sind drei Abweichungen von der Repo-Doku aufgefallen:

1. **Theme-Umschaltung über ein Attribut funktioniert nicht.**
   `docs/HOWTO_REGISTER_COMPONENTS_AND_THEMES.md` nennt `kol-theme`; dieses Attribut existiert
   im Quellcode überhaupt nicht. Der Code spricht stattdessen von `data-theme`.
   Gemessen: Weder das Setzen von `data-theme` vor dem Rendern noch das Ändern zur Laufzeit
   wählt zwischen mehreren registrierten Themes aus – es gewinnt immer das zuerst registrierte.
   **Deshalb wählt die Demo das Theme beim `register()` und lädt neu** – genau wie die
   offizielle Beispielanwendung, die nach der Theme-Auswahl `window.location.reload()` aufruft.

2. **`register(THEME, [])` lädt die Theme-CSS nicht.**
   Das Muster aus `packages/adapters/react-standalone/README.md` (CDN + leeres Loader-Array)
   registriert zwar den Theme-Namen, aber es kommt kein Theme-CSS in den Komponenten an –
   nur die Basis-Layer. Funktionierend ist ausschließlich der dokumentierte Weg
   `register(THEME, defineCustomElements)`. (Dieses README pinnt außerdem noch Version 2.0.3.)

3. **In HTML werden camelCase-Props zu Dash-Attributen.**
   `_maxLength="120"` im HTML wird kommentarlos ignoriert; richtig ist `_max-length="120"`.
   Kein Fehler, keine Warnung – nur kein Zähler. In JSX bleibt es `_maxLength`.

4. **Komponenten nehmen am nativen Formular nicht teil.**
   Ein `kol-input-email` mitten in einem `<form method="get">` steht **nicht** in
   `form.elements` und wird beim Absenden **nicht** mitgeschickt – auch dann nicht, wenn das
   innere `input` ein `name`-Attribut trägt (gemessen: abgeschickt wurde nur das native Feld).
   Shadow-DOM-Felder treten dem äußeren Formular nicht bei. Schritt 2 zeigt deshalb die
   Brücke über ein verstecktes natives Feld – und benennt die Einschränkung offen.

5. **Das `hidden`-Attribut allein versteckt kein `kol-alert`.**
   Die Komponente setzt `display` auf `:host` und überstimmt damit die UA-Regel
   `[hidden] { display: none }`. In `_demo.css` steht deshalb eine Zeile
   `kol-alert[hidden] { display: none !important; }`. Ohne sie ist der Erfolgs-Alert
   von Anfang an sichtbar.

Ebenfalls geprüft und bestätigt: `aria-describedby`-Verkettung, `aria-invalid` bei
touched + error, 44-px-Zielgröße, der automatische Pflichtfeld-Satz von `kol-form`,
der Fokussprung in die Fehlerliste, der Zeichenzähler mit `aria-live="polite"`,
die Shadow-DOM-Isolation gegen `!important`-CSS und der Token-Override quer durch den Shadow DOM.

Für das Verhalten der Demo zusätzlich verifiziert: `form._on = { onSubmit }` feuert bei
Button-Klick **und** bei Enter im Feld, `btn._on = { onClick }` feuert, `field._on = { onInput, onBlur }`
liefert `(event, wert)`, und `_msg`/`_touched` lassen sich zur Laufzeit setzen **und** wieder löschen
(`aria-invalid` verschwindet dabei korrekt).

---

## 8. Dateien

```
kolibri-intro-15min/
├── README.md              dieser Sprechzettel
├── fetch-vendor.mjs       holt KoliBri nach demo/vendor/ (Node 18+, keine Abhängigkeiten)
├── demo/
│   ├── index.html         Schrittwähler – hier starten
│   ├── step-0-handmade.html
│   ├── step-1-first.html
│   ├── step-2-island.html
│   ├── step-3-form.html
│   ├── step-4-theme.html
│   ├── step-5-react.html
│   ├── _demo.css          Rahmen der Demo (bewusst natives CSS)
│   └── vendor/            nicht eingecheckt, per fetch-vendor.mjs erzeugt
└── slides/                dasselbe als Slidev-Folien-Deck
    ├── slides.md          die 15 Folien; hinter jeder der Sprechzettel als Notiz
    ├── components/        die Live-Demos (Schritt 1, 3, Token-Override, Cover)
    ├── sync-demo.mjs      spiegelt demo/ nach public/demo/ (läuft bei predev/prebuild)
    ├── style.css          Rahmen-Styles der Demo-Folien
    └── package.json       dev: npm run dev → http://localhost:3030
```
