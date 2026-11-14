# Architektur von `@public-ui/internals`

Dieses Dokument grenzt verbindlich ab, was in dieses Paket gehört und was nicht. Es ist die
Grundlage für Code-Reviews — manuell wie KI-gestützt: Jeder Abschnitt endet in prüfbaren
Kriterien, die sich maschinell nachhalten lassen (Abschnitt „Review-Guardrails").

## Zweck

`@public-ui/internals` bündelt die **framework-freien Schichten** der KoliBri-Komponenten, damit
mehrere Runtime-Implementierungen (Stencil in `packages/components`, Lit in
`packages/components/lit`) dieselbe Fachlogik nutzen, ohne sie zu dublizieren:

- **Schema-Typen** — Prop-Typen, Komponenten-API-Typen, Interfaces, Enums.
- **Validatoren** — die Prop-Definitionen in `src/props/` (normalize/validate/default/apply) und
  die Legacy-Validatoren unter `src/schema/`.
- **Controller-Schicht** — Render-Prop-Store (`base-web-component`), Behaviors (Tooltip,
  Form-Association, …), Items und die Props-Configs/API-Typen je Komponentenfamilie. Controller
  wenden Props an, halten Render-Props und lösen Events aus; sie rendern nicht.

## Aufnahmekriterien

Eine Datei gehört genau dann in dieses Paket, wenn **alle** Kriterien erfüllt sind:

1. **Framework-frei:** keine Importe aus `@stencil/core`, `lit`, `@lit/*`, `react`, `vue` oder
   anderen Framework-Runtimes. Typ-Importe aus Frameworks zählen auch.
2. **Render-frei:** kein VDOM/Template-Code (`h()`-Aufrufe, lit-`html`-Templates, JSX-Elemente
   als Renderergebnis), keine Erzeugung von Komponenten-DOM.
3. **Kein Shell-Zustand:** keine `customElements`-Registrierung, kein Lifecycle-Override von
   Custom Elements, kein Styling-Attachment.
4. **Deterministisch testbar:** das Modul ist ohne Framework-Testumgebung testbar (die Specs im
   Paket laufen über den Stencil-Test-Runner mit).
5. **Geteilt oder teilbar:** das Modul wird von mindestens einer Runtime genutzt bzw. dient als
   gemeinsamer Vertrag (Schema, Props-Configs) zwischen Runtimes.

Der äußere Rahmen ist „ohne Stencil" — Render-Funktionalkomponenten basieren auf der
Stencil-Komponentenschicht und gehören deshalb nicht hierher.

## Ausschlusskriterien (gehört in die Runtime-Pakete)

| Gehört nicht hierher                                                                                                                                                                                                                                   | Richtiger Ort                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Render-Funktionalkomponenten (`component.tsx` mit `h()`)                                                                                                                                                                                               | `packages/components/src/internal/functional-components/` |
| Stencil-Shells (`@Component`-Klassen)                                                                                                                                                                                                                  | `packages/components/src/components/`                     |
| FC-gekoppelte Orchestrierung (Items/Controller, die FC-Props-Typen oder FCs importieren): `link/item.ts`, `pagination/item.ts`, `popover-button/item.ts`, `counter/behavior.ts`, `form-field/base-web-component.tsx`, `listbox/base-web-component.tsx` | `packages/components/src/internal/functional-components/` |
| Styles, Themes, `a11y.scss`, `@shared`-Mixins                                                                                                                                                                                                          | `packages/components/src/components/` bzw. Theme-Pakete   |
| Stencil-generierte Typen (`components.d.ts`, `custom-elements.json`)                                                                                                                                                                                   | Build-Ausgabe des Stencil-Pakets                          |
| Lit-Shells und lit-html-Renderfunktionen                                                                                                                                                                                                               | `packages/components/lit/src/`                            |

## Schichtabbild

```
internals/src/
├── schema/        Typen + Legacy-Validatoren            (stateless)
├── props/         Prop-Definitionen                     (stateless)
├── controller/    Render-Prop-Store, Behaviors, Items,  (zustandsfrei bzgl.
│                  Props-Configs, API-Typen               Framework; Instanz-
│                                                         zustand nur als Render-Props)
├── components/    Form-Controller, ariaCurrentService   (komponentennaher Support)
├── core/          Tag-Registry, i18n-Kern, Options-Registry
├── utils/         Events, Fokus, Klick, Farben, …
└── enums/, i18n, locales
```

Die Laufzeitpakete konsumieren die Quellen direkt — Stencil per relativem Quellpfad
(`../internals/src/…`), weil der Stencil-Transpiler die `extends`-Kette der Komponentenklassen
nur aus Quellen im eigenen Programm auflösen kann; Lit über den Paketspezifizierer
`@public-ui/internals/…`. Der `tsc`-Emit (`dist/`) dient externen Typkonsumenten
(React-Hook-Form-Adapter, Typ-Referenzen des Stencil-Emits über `typesVersions`).

## Review-Guardrails

Maschinell nachhaltbare Grenzen — alle Befehle müssen **0 Treffer** bzw. grün liefern:

```bash
# 1. Kein Framework-Import im Paket (Laufzeit und Typen):
grep -rn "@stencil\|from 'lit'\|from '@lit\|from 'react'\|from 'vue'" packages/components/internals/src

# 2. Kein Rendering im Paket (kein Stencil-h, keine lit-Templates):
grep -rnE "\bh\(|html`" packages/components/internals/src

# 3. ESLint-Guard (no-restricted-imports, gleiche Muster wie 1.):
pnpm --filter @public-ui/internals lint

# 4. Kein Render-FC im Paket (Stencil-FCs leben im Stencil-Paket):
find packages/components/internals/src -name 'component.tsx'   # muss leer sein
```

Wird ein Kriterium verletzt, entscheidet die Review-Frage: **Ist die Datei renderfrei und
framework-frei?** Dann gehört sie hier (ggf. nach Refactoring der Kopplung). Andernfalls gehört
sie in das Runtime-Paket, dessen Render-Schicht sie bedient — notfalls zuerst dort gekoppelt
(asymmetrische Abhängigkeit Internals → Runtime ist verboten; die Runtime-Pakete hängen an
Internals, nie umgekehrt).

## Bekannte Randfälle

- `controller/*/api.tsx`-Dateien enthalten trotz Endung `.tsx` kein JSX: Sie definieren
  Props-Configs und API-Typen der Komponentenfamilien (stateless Vertragsschicht).
- `controller/base-web-component.ts` hält Render-Props als Instanzzustand — „stateless" meint
  hier die Abwesenheit von Framework-Zustand und Rendering, nicht die Abwesenheit jeder
  Instanzvariablen.
- `components/form/controller.ts` (Form-Submit/Reset-Propagierung) adressiert das Formular über
  die Tag-Konstanten aus `core/component-names` — direkte Tag-Vergleiche, keine
  Framework-Funktionen; Tag-Transformer-Logik gehört in die Runtime-Pakete.
