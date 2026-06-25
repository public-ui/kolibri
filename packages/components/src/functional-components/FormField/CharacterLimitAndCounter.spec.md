# Spec: `_maxLength`, `_hasCounter` und `_maxLengthBehavior`

Gilt für die textartigen Formularfelder: **input-text, input-email, input-password, textarea**.

> W3C-Spec: https://www.w3.org/TR/2011/WD-html5-20110525/the-input-element.html

Diese Spezifikation beschreibt, wie die maximale Zeichenlänge, der Zeichenzähler und das
`soft`/`hard`-Verhalten zusammenspielen und wie das Ergebnis für Screenreader angekündigt wird.

## Props

| Prop                 | Typ                | Standard | Zweck                                          |
| -------------------- | ------------------ | -------- | ---------------------------------------------- |
| `_maxLength`         | `number`           | –        | Die maximale Anzahl **gültiger** Zeichen.      |
| `_maxLengthBehavior` | `'hard' \| 'soft'` | `'hard'` | Wie das Limit durchgesetzt wird (siehe unten). |
| `_hasCounter`        | `boolean`          | `false`  | Ob der sichtbare Zeichenzähler angezeigt wird. |

## Durchsetzung: `hard` vs. `soft`

`_maxLength` allein definiert das Limit; `_maxLengthBehavior` bestimmt, ob es durchgesetzt wird.

- **`hard` (Standard):** Das native `maxlength`-Attribut wird am Input gesetzt. Der Browser
  **blockiert** jede Eingabe über `_maxLength` hinaus. Dies ist unabhängig von `_hasCounter`.
- **`soft`:** Das native `maxlength`-Attribut wird **nicht** gesetzt. Der Benutzer kann `_maxLength`
  überschreiten (das Feld bleibt editierbar); die Überschreitung wird visuell/▸ für Hilfstechnologien
  sichtbar gemacht, aber nicht blockiert.

> Die Komponente schreibt `_value` nie um, um das Limit durchzusetzen. `hard` stützt sich auf das
> native Attribut; `soft` lässt die Überschreitung bestehen.

## Sichtbarkeit des Zählers

Der sichtbare Zähler wird **genau dann gerendert, wenn `_hasCounter === true`**.

- **Ohne `_hasCounter`:** Es wird kein Zähler angezeigt. Mit `_maxLength` wird das Limit dennoch
  nativ durchgesetzt (`hard`) und ist **niemals lautlos**: Ein visuell versteckter Zeichenlimit-Hinweis
  (`…-character-limit-hint`, referenziert über das `aria-describedby` des Inputs) informiert
  Screenreader-Benutzer vorab über das Maximum (z. B. _„Es können bis zu 10 Zeichen eingegeben werden."_).
- **Mit `_hasCounter`:** Der Zähler wird angezeigt, und das Hard-Limit (Standard) gilt weiterhin,
  sofern nicht `_maxLengthBehavior="soft"` gesetzt ist.

### Verhaltensmatrix

| `_maxLength` | `_hasCounter` | `_maxLengthBehavior` | native Sperre | sichtbarer Zähler | Zeichenlimit-Hinweis |
| :----------: | :-----------: | :------------------: | :-----------: | :---------------: | :------------------: |
|      –       |       –       |          –           |     nein      |       nein        |         nein         |
|      –       |    `true`     |          –           |     nein      |    ja (Anzahl)    |         nein         |
|      10      |       –       |  `hard` (Standard)   |    **ja**     |       nein        |        **ja**        |
|      10      |       –       |        `soft`        |     nein      |       nein        |          ja          |
|      10      |    `true`     |  `hard` (Standard)   |    **ja**     |      **ja**       |          ja          |
|      10      |    `true`     |        `soft`        |     nein      |      **ja**       |          ja          |
|      10      |    `false`    |         any          | je Verhalten  |       nein        |          ja          |

## Zählerinhalt (wenn `_hasCounter`)

`FormFieldCounter` rendert **zwei** Spans. Beide werden **einmalig beim ersten Render** in den DOM
gesetzt und danach ausschließlich **imperativ** aktualisiert (kein Re-Rendering der Host-Komponente).

| Span | `data-testid`        | Sichtbarkeit                                                      | Rolle                                              |
| :--: | -------------------- | ----------------------------------------------------------------- | -------------------------------------------------- |
|  1   | `input-counter`      | sichtbar, `aria-hidden="true"`                                    | Visueller Zähler – wird sofort bei `input` gesetzt |
|  2   | `input-counter-aria` | `visually-hidden`, `aria-live="polite"`, `id="{inputId}-counter"` | Entprellter Zähler- und Max-Text für Screenreader  |

**Span 1** spiegelt die **aktuelle** Wertlänge wider. Er wird bei jedem `input`-Event **sofort**
per `element.innerText` aktualisiert — ohne Re-Render der Host-Komponente.  
**Span 2** verwendet einen **entprellten** Wert (1 s Debounce), damit der Screenreader bei schneller
Eingabe nur den letzten Stand ankündigt. Er enthält gleichzeitig die optionale
„Zeichenlimit erreicht!"-Meldung (bei `hard` + `_maxLength` und `currentLength ≥ _maxLength`). Auch
er wird ausschließlich per `element.innerText` gesetzt — kein State, kein Re-Render.

Für `hard` unterscheiden sich visueller Text (Span 1) und angekündigter Text (Span 2)
(unterschiedliche Locale-Keys):

- `hard` + `_maxLength` – visuell: `{{current}}/{{max}} Zeichen`, aria: `{{current}} von {{max}} Zeichen`.
- `hard` ohne `_maxLength` – beide: `{{current}} Zeichen`.
- `soft` + `_maxLength` – beide: `Es sind noch {{remaining}} Zeichen verfügbar.`; bei Überschreitung:
  `Es sind {{over}} Zeichen zu viel.` plus den Modifier `kol-form-field__counter--exceeded`.
- `soft` ohne `_maxLength` – beide Spans werden **nicht** gerendert (`null`).

## Ankündigung bei erreichtem Maximum (Hard-Limit)

Wenn `_maxLengthBehavior="hard"` mit einem numerischen `_maxLength` und `currentLength ≥ _maxLength`,
hängt der Debounce-Handler **zusätzlich** den Text _„Zeichenlimit erreicht!"_ (`character-counter-max-aria`)
an den Inhalt von Span 2.

- Wechsel leer → Text: `aria-live="polite"` kündigt die Meldung **einmalig** an.
- Solange das Limit gehalten wird und keine weiteren `input`-Events feuern (native `maxlength`
  blockiert), bleibt Span 2 unverändert → **keine Wiederholung** bei blockierten Tastenanschlägen.
- Fällt die Länge unter das Limit, setzt der Debounce-Handler Span 2 auf den reinen Zählertext ohne
  Max-Meldung (keine Ankündigung bei unverändertem Text).

## Imperative DOM-Aktualisierung (ohne Re-Rendering)

`_currentLength` und `_currentLengthDebounced` sind **keine `@State()`-Properties** der
Host-Komponente. Counter-Updates lösen daher **kein Re-Rendering** aus.

### Ablauf

```
input-Event
  │
  ├─► sofort: spanVisual.innerText = getCounterVisualText(currentLength)
  │           spanVisual.classList.toggle('kol-form-field__counter--exceeded', exceeded)
  │
  └─► Debounce (1 s): spanAria.innerText = getCounterAriaText(currentLength)
                                           + optional getCounterMaxText(currentLength)
```

### Refs

Die Host-Komponente (z. B. `kol-input-text`) hält zwei Refs auf die gerenderten Span-Elemente:

- `counterSpanVisualRef` → Span 1 (`data-testid="input-counter"`)
- `counterSpanAriaRef` → Span 2 (`data-testid="input-counter-aria"`)

`FormField.tsx` rendert die Spans als leere Elemente und gibt die Refs per `ref`-Callback an
die Host-Komponente zurück. Die Host-Komponente befüllt sie erstmalig und bei jedem `input`-Event
imperativ.

### Debounce

Der Debounce-Timer ist eine einfache Instanzvariable (kein State):

```ts
private counterDebounceTimer?: ReturnType<typeof setTimeout>;

private updateCounterSpanAria(currentLength: number): void {
    clearTimeout(this.counterDebounceTimer);
    this.counterDebounceTimer = setTimeout(() => {
        if (!this.counterSpanAriaRef) return;
        this.counterSpanAriaRef.innerText = this.getCounterAriaText(currentLength);
    }, 1000);
}
```

## Rendering-Einschränkungen

- Beide Spans werden **einmalig** beim ersten Render erzeugt und verbleiben dauerhaft im DOM,
  solange `_hasCounter` aktiv ist.
- Zähler-Updates lösen **kein Re-Rendering** der Host-Komponente aus — ausschließlich imperatives
  `innerText`-Setzen auf den Span-Refs.
- Der Input-`_value` wird von der Zählerlogik **niemals** umgeschrieben (keine Cursor-Sprünge,
  kein erneutes Tippen).
- Die „Zeichenlimit erreicht!"-Meldung wird **einmalig** angekündigt, wenn das Limit erstmals
  erreicht wird — nicht wiederholt, solange der Benutzer weiter dagegen tippt (da native
  `maxlength` keine weiteren `input`-Events auslöst und Span 2 unverändert bleibt).

## Locale-Texte

Alle sichtbaren und angekündigten Texte sind i18n-gesteuert. Die relevanten Keys (Prefix `kol-`):

| Key                                     | Platzhalter              | Deutsch (`de`)                                          | Englisch (`en`)                                | Verwendet in                                                                  |
| --------------------------------------- | ------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `character-limit-hint`                  | `{{limit}}`              | `Es können bis zu {{limit}} Zeichen eingegeben werden.` | `You can enter up to {{limit}} characters`     | `FormFieldCharacterLimitHint` (visually-hidden, `aria-describedby`)           |
| `character-counter-current`             | `{{current}}`            | `{{current}} Zeichen`                                   | `{{current}} characters`                       | Span 1 + Span 2 – hard, kein `_maxLength`                                     |
| `character-counter-current-of-max`      | `{{current}}`, `{{max}}` | `{{current}}/{{max}} Zeichen`                           | `{{current}}/{{max}} characters`               | **Span 1** – hard + `_maxLength` (visuell, sofort)                            |
| `character-counter-current-of-max-aria` | `{{current}}`, `{{max}}` | `{{current}} von {{max}} Zeichen`                       | `{{current}} of {{max}} characters`            | **Span 2** – hard + `_maxLength` (aria, entprellt)                            |
| `character-counter-max-aria`            | –                        | `Zeichenlimit erreicht!`                                | `Character limit reached!`                     | **Span 2** – angehängt wenn `hard` + `currentLength ≥ _maxLength` (entprellt) |
| `character-limit-remaining`             | `{{remaining}}`          | `Es sind noch {{remaining}} Zeichen verfügbar.`         | `You have {{remaining}} characters remaining.` | Span 1 + Span 2 – soft + `_maxLength`, nicht überschritten                    |
| `character-limit-exceeded`              | `{{over}}`               | `Es sind {{over}} Zeichen zu viel.`                     | `You have {{over}} characters too many.`       | Span 1 + Span 2 – soft + `_maxLength`, überschritten                          |

> `{{limit}}` = `_maxLength` · `{{current}}` = aktuelle Zeichenanzahl · `{{max}}` = `_maxLength`
> `{{remaining}}` = `_maxLength − currentLength` (≥ 0) · `{{over}}` = `|_maxLength − currentLength|` (> 0)
