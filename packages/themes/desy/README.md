# Public UI – Desy Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-desy)](https://www.npmjs.com/package/@public-ui/theme-desy)
[![license](https://img.shields.io/npm/l/@public-ui/theme-desy)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-desy)](https://www.npmjs.com/package/@public-ui/theme-desy)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-desy)](https://bundlephobia.com/result?p=@public-ui/theme-desy)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

Das Desy Theme erweitert die [Public UI Web Component Library](https://public-ui.github.io) um ein individuelles Design. Anpassungen sind über CSS Custom Properties (Design Tokens) möglich.

**Live: https://desy.zoll-portal.de/**

---

## Installation & Integration

```bash
pnpm add @public-ui/theme-desy
```

**React-Beispiel:**
```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { Desy } from '@public-ui/theme-desy';

register(Desy, defineCustomElements).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
```

Weitere Details: [Getting started](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt)

---

## Design Tokens & Anpassung

Das Theme basiert auf Design Tokens, die sich per CSS überschreiben lassen. Nur die zu ändernden Werte müssen gesetzt werden:

```css
:root {
  --kolibri-border-radius: 3px;
  --kolibri-font-size: 18px;
  --kolibri-spacing: 0.3rem;
  --kolibri-color-primary: #cc006e;
  --kolibri-color-primary-variant: #ff64b9;
}
```

**Wichtige Tokens:**

| Variable                       | Default                                    | Bedeutung                      |
| ------------------------------ | ------------------------------------------ | ------------------------------ |
| --kolibri-border-radius        | 5px                                        | Border-Radius                  |
| --kolibri-font-family          | Verdana, Arial, Calibri, Helvetica, sans-serif | Standardschriftart         |
| --kolibri-font-size            | 16px                                       | Basis-Schriftgröße             |
| --kolibri-spacing              | 0.25rem                                    | Grundabstand                   |
| --kolibri-border-width         | 1px                                        | Rahmenbreite                   |
| --kolibri-color-primary        | #004b76                                    | Primärfarbe                    |
| --kolibri-color-primary-variant| #0077b6                                    | Alternative Primärfarbe        |
| --kolibri-color-secondary      | #ccebf7                                    | Sekundärfarbe                  |
| --kolibri-color-danger         | #c0003c                                    | Fehler-/Warnfarbe              |
| --kolibri-color-warning        | #c44931                                    | Warnfarbe                      |
| --kolibri-color-success        | #005c45                                    | Erfolgsfarbe                   |
| --kolibri-color-subtle         | #576164                                    | Dezente Akzentfarbe            |
| --kolibri-color-light          | #ffffff                                    | Helle Hintergrundfarbe         |
| --kolibri-color-text           | #202020                                    | Textfarbe                      |
| --kolibri-color-mute           | #f2f3f4                                    | Farbe für deaktivierte Elemente|
| --kolibri-color-mute-variant   | #bec5c9                                    | Alternative deaktivierte Farbe |

Alle verfügbaren Tokens finden sich in `src/global.scss`.

---

## Weitere Informationen

- [Dokumentation](https://public-ui.github.io)
- [Issues](https://github.com/public-ui/kolibri/issues)
- [Pull Requests](https://github.com/public-ui/kolibri/pulls)

---
