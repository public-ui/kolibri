# Themes

Das **Themes**-Modul beinhaltet zahlreiche Themes (Styleguides) zur Komponenten-Bibliothek. Sie können in Kombination mit dem Components-Modul geladen werden.

Mehr zur **Modularisierung** kann im [Architekturkonzept](https://public-ui.github.io/docs/concepts/architecture) nachgelesen werden.

Mehr zum **Projekt** kann in der [README](https://public-ui.github.io/docs) nachgelesen werden.

## Important settings

### Usage of pnpm

We use **pnpm** as package manager and there is a tiny typing issue with the default typescript setup.

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
