# Neue Komponente erstellen

> Schritt-für-Schritt-Anleitung, wie man einen neue Komponente im Teilmodul `components` erstellt.

## Grundprinzipien

Folgende Grundprinzipien gelten für das Schreiben von Quellcode:

- Auflistungen werden immer alphabetisch sortiert
- Wiederverwendete Algorithmen (z.B. Property-Validatoren) werden in statische Funktionen ausgelagert (z.B. `src/utils/validators/<prop-name>.ts`)
- ...

## Checkliste

| Schritt | Kurzbeschreibung                                                                                                                        |
| :-----: | --------------------------------------------------------------------------------------------------------------------------------------- |
|    0    | Name im Schema hinterlegen                                                                                                              |
|    1    | Verzeichnis anlegen<br>- component.tsx(optional)<br>- readme.md<br>- shadow.tsx: Komponente mit shadowDOM<br>- styles.css<br>- types.ts |
|    2    | API spezifizieren                                                                                                                       |
|    3    | Klasse zur API implementieren<br>- Props<br>- State<br>- Watcher<br>- Initialer Hook<br>- Render-Methode                                |
|    4    | Styling anlegen                                                                                                                         |
|    5    | Beispiele in `index.html` aufnehmen                                                                                                     |
|    6    | readme.md vervollständigen 
|.   7.   | in die `stencil.config.js` eintragen
|   ...   | ...                                                                                                                                     |
|   ...   | Klasse in Komponenten-Liste für Tests aufnehmen (packages/components/src/components/component-list.ts)                                  |

## Schritt 0

Als erstes wird der **Name** der neuen Komponenten in der **Schema**-Datei (`src/schema/tag-names.ts`) hinterlegt.

## Schritt 1 - Verzeichnins anlegen

Eine Vorlage ist unter `/docs/tutorials/component` zu finden. Ziel: `/packages/components/src/components/[component-name]`.
Sofern eine Variante ohne ShadowDOM für andere Komponenten benötigt wird, ist die Komponente selbst, mit `shadow: false` anzulegen und diese Komponente in `shadow.tsx` einzubinden.
Andernfalls ist die Komponente direkt mit `shadow: true` in `shadow.tsx` zu implementieren.
Ziel: shadow.tsx existiert immer und liefert die Komponente mit ShadowDOM.
Die `readme.md` wird automatisch bei `pnpm build` erzeugt, sollte sie bereits existieren wird der automatisch generierte Inhalt angehängt.

## Schritt 2 - API spezifizieren

Datei: `types.ts`;
Inhalt: `RequiredProps`, `OptionalProps`, `RequiredStates`, `OptionalStates`, `States` und `ComponentApi`

## Schritt 3 - Klasse Implementieren

Datei: `shadow.tsx` ooder/und `component.tsx`;
Inhalt:

- `@Component` (außerhalb der Klasse),
- `@Prop`: alphabetisch sortiert,
- `@State`: Standardwerte werden hier gesetzt,
- `@Watch`: werden bei Änderungen des Wertes aufgerufen, Validierung und übernahme des Wertes in den State,
- `public componentWillLoad()`: Initialer Hook, alle Validierungsmethoden hier aufrufen
- `public render()`: Render-Methode, erstellt das HTML, das gerendert werden soll

## Schritt 4 - Styling anlegen

Datei: `styles.css`;
Wichtig: `packages/components/src/components/README.md` beachten.
Sofern Styling für mehrere komponenten verwendet werden soll, Datei passend benennen und direkt unter `/packages/components/src/components/` erstellen und in styles.css importieren.

## Schritt 5 - Beispiel in index.html erstellen

Datei: `/packages/components/src/index.html`;
Unter body > main > ol ein li mit dem Beispielcode erstellen.
Aus dem Verzeichnis `/packages/components` kann mit `pnpm start` der dev-server gestartet werden.
Andere li können vorrübergehend entfernt werden, dafür ist die `index.bak.html` da.
Nach Beendigung der Entwicklung ist die `index.html` zurückzusetzen, abgesehen des neuen Beispiels, welches in die `index.bak.html` ebenfalls einzufügen ist.

## Schritt 6 - readme.md vervollständigen

Datei: `readme.md`;
Die von `pnpm build` (in `/packages/components` ausgeführt) erzeugte `readme.md` mit sinnvollen Informationen vervollständigen.

... bitte fortsetzen.
