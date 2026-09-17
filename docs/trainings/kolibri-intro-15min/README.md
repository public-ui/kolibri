# KoliBri Web Components – Einsteigerschulung in 15 Minuten

Vortragsfertiges Paket: lauffähige Demo in fünf Schritten, Sprechzettel mit Minutenmarken
und die Belegstellen im Code für Nachfragen aus dem Publikum.

**Zielgruppe:** Entwicklerinnen und Entwickler ohne KoliBri-Vorkenntnisse.
**Format:** Live-Demo im Browser, Vanilla HTML/JS, mit kurzem React-Ausblick am Ende.
**Kernbotschaft:** *KoliBri nimmt dir die Barrierefreiheit ab, die du sonst von Hand
und fehleranfällig selbst verdrahten müsstest.*

---

## 1. Vor dem Vortrag (einmalig, ~2 Minuten)

```bash
cd docs/trainings/kolibri-intro-15min
node fetch-vendor.mjs          # holt KoliBri 4.4.0 nach demo/vendor/ (~26 MB)
npx http-server -p 8080 demo   # ES-Module brauchen HTTP, file:// reicht nicht
```

Dann `http://127.0.0.1:8080/index.html` öffnen.

Die Demo läuft danach **vollständig offline** – kein WLAN auf der Bühne nötig.
Der Ordner `demo/vendor/` ist bewusst nicht eingecheckt (siehe `.gitignore`).

**Bühnen-Checkliste:**

- [ ] Alle sechs Seiten einmal durchklicken, damit der Browser-Cache warm ist
- [ ] Browser-Zoom auf ~125 % – die Demo ist dafür ausgelegt
- [ ] DevTools brauchst du **nicht**: Schritt 3 hat einen eigenen „Röntgenblick"-Knopf
- [ ] Zweiter Tab mit `step-4-theme.html?theme=kern` vorbereitet, falls der Reload zickt

---

## 2. Der Bogen auf einen Blick

Der Vortrag trägt einen Konflikt: *Barrierefreiheit von Hand ist mühsam und geht still schief.*
Er wird bewusst erst in Minute 7 aufgelöst – der A11y-Payoff ist die Pointe, nicht die Einleitung.

| Zeit | Schritt | Beat | Gefühl im Publikum |
|---|---|---|---|
| 0:00–1:30 | 0 | Ein Feld, von Hand. Wo ist der Fehler? | Unbehagen, Wiedererkennung |
| 1:30–4:00 | 1 | Dasselbe in einem Tag | Erleichterung |
| 4:00–6:30 | 2 | „Wir haben aber Bestand" → Insel | Einwand entkräftet |
| 6:30–10:00 | 3 | Röntgenblick: was KoliBri still tut | **Höhepunkt** |
| 10:00–12:30 | 4 | Gleiches Markup, anderes Haus | Weite, Perspektive |
| 12:30–14:00 | 5 | Dasselbe in React | Anschlussfähigkeit |
| 14:00–15:00 | – | Rückblende auf Schritt 0 | Schluss |

---

## 3. Sprechzettel

> **Legende:** ▶ = was du tust · „…" = was du sagst (Vorschlag, nicht auswendig lernen)

### 0:00 – Der Haken *(Schritt 0)*

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

*(Zeitmarke: 1:30)*

---

### 1:30 – Die Erleichterung *(Schritt 1)*

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

▶ Auf die Button-Reihe zeigen.

> „Die Varianten hier – primary, secondary, danger, ghost – merkt euch die kurz.
> Die stehen nämlich gar nicht im Komponenten-Code. Die kommen aus dem Theme.
> Dazu kommen wir gleich."

*(Zeitmarke: 4:00)*

---

### 4:00 – Der Einwand *(Schritt 2)*

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

▶ Auf den Submit-Button zeigen, einmal klicken.

> „Und umgekehrt: KoliBri färbt eure Seite nicht ein. Kein globales Stylesheet, das
> plötzlich alles überschreibt.
>
> Der Submit läuft übrigens ganz normal nativ – schaut in die Adresszeile.
> Das Feld verhält sich wie ein Formularfeld, weil es eins ist.
> Ihr könnt also Feld für Feld migrieren. Kein Big Bang."

*(Zeitmarke: 6:30)*

---

### 6:30 – Der Höhepunkt *(Schritt 3)*

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

▶ **Auf „Fehler auslösen" klicken.**

> „Letzter Punkt, und der ist im Behördenkontext Gold wert:
> Fehlerliste am Formularkopf, und der Fokus springt hinein.
> Wer mit der Tastatur arbeitet, landet nach dem Absenden nicht irgendwo –
> sondern in der Liste dessen, was zu tun ist. Von dort aus ein Klick ins Feld."

*(Zeitmarke: 10:00)*

---

### 10:00 – Die Weite *(Schritt 4)*

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

*(Zeitmarke: 12:30)*

---

### 12:30 – Der Anschluss *(Schritt 5)*

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

*(Zeitmarke: 14:00)*

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

*(Zeitmarke: 15:00)*

---

## 4. Belege für Nachfragen

Wenn jemand nachhakt – hier stehen die Dinge im Code:

| Behauptung im Vortrag | Fundstelle |
|---|---|
| `aria-describedby` wird automatisch verkettet, `aria-invalid` bei touched+error | `packages/components/src/functional-component-wrappers/_helpers/getRenderStates.ts` |
| Sternchen sichtbar, für Screenreader stumm | `packages/components/src/components/@shared/_form-field.mixin.scss` (`content: '*' / ''`) |
| Der Pflichtfeld-Satz kommt von `kol-form` | `packages/components/src/components/form/shadow.tsx`, Text in `src/locales/de.ts` |
| Mindest-Zielgröße 44 px | `packages/components/src/components/a11y.scss` (`--a11y-min-size`) |
| Zeichenzähler doppelspurig (sichtbar + `aria-live`) | `packages/components/src/functional-components/FormField/FormField.tsx` |
| Fehlerliste mit Fokussprung | `packages/components/src/components/form/shadow.tsx`; Beispiel: `packages/samples/react/src/components/form/error-list.tsx` |
| Fünf CSS-Layer, Basis vs. Theme getrennt | `packages/components/src/components/_layer-order.scss`, `docs/BASE_STYLING_VS_THEMING_CONCEPT.md` |
| Design-Tokens `--kolibri-*` | `packages/themes/default/src/global.scss`, Tabelle in `packages/themes/default/README.md` |
| KoliBri warnt zur Laufzeit bei unbrauchbaren Labels | `packages/components/src/schema/props/label.ts` |
| Automatisierte A11y-Tests (axe, WCAG 2.1 AA) | `packages/tools/visual-tests/tests/axe-snapshots.spec.js` |
| BITV/WCAG-Bezug | `publiccode.yml`, `docs/arc42_de/08-cross-cutting-concepts.md` §8.1 |

**Vorsicht bei zwei Formulierungen:**

- Nicht „AAA-zertifiziert" sagen. Die Doku ist uneinheitlich (arc42 nennt mal WCAG 2.2 AAA,
  mal 2.1 AA), die automatisierten Tests laufen gegen `wcag21aa`.
  Sichere Formulierung: *„gebaut gegen WCAG und BITV, automatisiert gegen WCAG 2.1 AA getestet"*.
- **Dark Mode nicht versprechen.** Er ist konzeptionell vorgesehen, aber in keinem
  Theme implementiert (`docs/BASE_STYLING_VS_THEMING_CONCEPT.md`, Abschnitt „Status").

---

## 5. Notfallplan

| Problem | Reaktion |
|---|---|
| Seite bleibt weiß, Komponenten rendern nicht | `register(...)` lief nicht durch. Neu laden. Wenn es bleibt: `demo/vendor/` fehlt → `node fetch-vendor.mjs` |
| Komponenten da, aber ungestylt | Theme wurde nicht registriert – fast immer ein Tippfehler im Import. Auf Schritt 1 zurückfallen |
| Theme-Wechsel lädt nicht neu | Vorbereiteten zweiten Tab mit `?theme=kern` nehmen |
| Demo hängt komplett | Screenshots liegen nicht bei – erzähl Schritt 3 an der Code-Tabelle in Abschnitt 4 weiter. Der Röntgenblick-Text steht unten in Abschnitt 6 |
| Zu wenig Zeit | Erst Schritt 5 streichen (React), dann die Fehlerliste in Schritt 3. **Niemals** Schritt 3 ganz streichen – das ist die Pointe |
| Zu viel Zeit | In Schritt 3 zusätzlich: KoliBri warnt in der Konsole bei Labels unter drei lesbaren Zeichen |

---

## 6. Der Röntgenblick-Text (falls die Demo ausfällt)

So sieht die Ausgabe auf einem funktionierenden Lauf aus – verifiziert mit KoliBri 4.4.0:

```
<input  type="email"
        required=true
        aria-invalid="true"
        aria-describedby="input-email-msg-26f495 input-email-hint-26f495 input-email-error-26f495" />

Was der Screenreader daraus vorliest:
  input-email-msg-26f495
     → "FehlerBitte geben Sie eine gültige E-Mail-Adresse an."
  input-email-hint-26f495
     → "Wir nutzen die Adresse nur für die Terminbestätigung."
  input-email-error-26f495
     → (noch kein Element – die ID ist reserviert, Screenreader überspringen sie)

Zielgröße des Buttons: min-height = 44px  (WCAG 2.5.5 verlangt 44px)
```

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

Ebenfalls geprüft und bestätigt: `aria-describedby`-Verkettung, `aria-invalid` bei
touched + error, 44-px-Zielgröße, der automatische Pflichtfeld-Satz von `kol-form`,
der Fokussprung in die Fehlerliste, der Zeichenzähler mit `aria-live="polite"`,
die Shadow-DOM-Isolation gegen `!important`-CSS und der Token-Override quer durch den Shadow DOM.

---

## 8. Dateien

```
kolibri-intro-15min/
├── README.md              dieser Sprechzettel
├── fetch-vendor.mjs       holt KoliBri nach demo/vendor/ (Node 18+, keine Abhängigkeiten)
└── demo/
    ├── index.html         Schrittwähler – hier starten
    ├── step-0-handmade.html
    ├── step-1-first.html
    ├── step-2-island.html
    ├── step-3-form.html
    ├── step-4-theme.html
    ├── step-5-react.html
    ├── _demo.css          Rahmen der Demo (bewusst natives CSS)
    └── vendor/            nicht eingecheckt, per fetch-vendor.mjs erzeugt
```
