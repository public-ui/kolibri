# Neue Komponente erstellen

> Schritt-für-Schritt-Anleitung, wie man eine neue Komponente im Teilmodul `components` erstellt.

## Grundprinzipien

Folgende Grundprinzipien gelten für das Schreiben von Quellcode:

- Auflistungen werden immer alphabetisch sortiert
- Wiederverwendete Algorithmen (z.B. Property-Validatoren) werden in statische Funktionen ausgelagert (z.B. `packages/schema/src/validators/<prop-name>.ts`)
- ...

## Checkliste

| Schritt | Kurzbeschreibung                                                                                                                         |
|:-------:|------------------------------------------------------------------------------------------------------------------------------------------|
|    0    | Projekt starten                                                                                                                          |
|    1    | Name im Schema hinterlegen                                                                                                               |
|    2    | Verzeichnis anlegen<br>- component.tsx(optional)<br>- readme.md<br>- shadow.tsx: Komponente mit Shadow DOM<br>- styles.css<br>- types.ts |
|    3    | API spezifizieren                                                                                                                        |
|    4    | Klasse zur API implementieren<br>- Props<br>- State<br>- Watcher<br>- Initialer Hook<br>- Render-Methode                                 |
|    5    | Styling anlegen                                                                                                                          |
|    6    | Beispiele in `index.html` aufnehmen                                                                                                      |
|    7    | readme.md vervollständigen                                                                                                               |
|   ...   | ...                                                                                                                                      |
|   ...   | Klasse in Komponenten-Liste für Tests aufnehmen (packages/components/src/components/component-list.ts)                                   |
|   ...   | Alle autogeneierten Daten zur Komponente mit einchecken                                                                                  |

## Schritt 0

Projekt starten, wie in [Contribution](../../CONTRIBUTING.md) beschrieben.

## Schritt 1

Als erstes wird der **Name** der neuen Komponenten in der **Schema**-Datei (`packages/schema/tag-names.ts`) hinterlegt.

## Schritt 2 - Verzeichnis anlegen

Eine Vorlage ist unter `/docs/tutorials/new-component` zu finden. Ziel: `/packages/components/src/components/[component-name]`.
Sofern eine Variante ohne Shadow DOM für andere Komponenten benötigt wird, ist die Komponente selbst, mit `shadow: false` anzulegen und diese Komponente in `shadow.tsx` einzubinden.
Andernfalls ist die Komponente direkt mit `shadow: true` in `shadow.tsx` zu implementieren.
Ziel: shadow.tsx existiert immer und liefert die Komponente mit Shadow DOM.
Die `readme.md` wird automatisch bei `pnpm build` erzeugt, sollte sie bereits existieren wird der automatisch generierte Inhalt angehängt.

## Schritt 3 - API spezifizieren

Datei: `types.ts`;
Inhalt: `RequiredProps`, `OptionalProps`, `RequiredStates`, `OptionalStates`, `States` und `ComponentApi`

## Schritt 4 - Klasse Implementieren

Datei: `shadow.tsx` oder/und `component.tsx`;
Inhalt:

- `@Component` (außerhalb der Klasse),
- `@Prop`: alphabetisch sortiert,
- `@State`: Standardwerte werden hier gesetzt,
- `@Watch`: werden bei Änderungen des Wertes aufgerufen, Validierung und Übernahme des Wertes in den State,
- `public componentWillLoad()`: Initialer Hook, alle Validierungsmethoden hier aufrufen
- `public render()`: Render-Methode, erstellt das HTML, das gerendert werden soll

## Schritt 5 - Styling anlegen

Datei: `styles.css`;
Wichtig: `packages/components/src/components/README.md` beachten.
Sofern Styling für mehrere Komponenten verwendet werden soll, Datei passend benennen und direkt unter `/packages/components/src/components/` erstellen und in styles.css importieren.

## Schritt 6 - Beispiel in index.html erstellen

Datei: `/packages/components/src/index.html`;
Unter body > main > ol ein li mit dem Beispielcode erstellen.
Aus dem Verzeichnis `/packages/components` kann mit `pnpm start` der dev-server gestartet werden.
Andere li können vorrübergehend entfernt werden, dafür ist die `index.bak.html` da.
Nach Beendigung der Entwicklung ist die `index.html` zurückzusetzen, abgesehen des neuen Beispiels, welches in die `index.bak.html` ebenfalls einzufügen ist.

## Schritt 7 - readme.md vervollständigen

Datei: `readme.md`;
Die von `pnpm build` (in `/packages/components` ausgeführt) erzeugte `readme.md` mit sinnvollen Informationen vervollständigen.

... bitte fortsetzen.
