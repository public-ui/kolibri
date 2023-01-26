# Themes

Das **Themes**-Modul beinhaltet zahlreiche Themes (Styleguides) zur Komponenten-Bibliothek. Sie können in Kombination mit dem Components-Modul geladen werden.

Mehr zur **Modularisierung** kann im [Architekturkonzept](https://github.com/public-ui/kolibri/blob/main/docs/ARCHITECTURE.md) nachgelesen werden.

Mehr zum **Projekt** kann in der [README](https://github.com/public-ui/kolibri/#readme) nachgelesen werden.

## Important settings

### Usage of pnpm

We use **pnpm** as package manager and there is a tiny typing issue with the default typescript setup.

**What happens?**

We got a type annotation error in TypeScript.

```bash
The inferred type of 'THEME' cannot be named without a reference to '.pnpm/@a11y-ui+core@***/node_modules/@a11y-ui/core/types/theming'. This is likely not portable. A type annotation is necessary.ts(2742)
```

**What does we know?**

This seems to be a general issue:

- <https://github.com/microsoft/TypeScript/issues/29221>
- <https://github.com/microsoft/TypeScript/issues/48212>

**Solution:**

We must activate the specific option `preserveSymlinks` in the `tsconfig.json` file.

```json
  ...
  "preserveSymlinks": true,
  ...
```
