# Convert to KoliBri VS Code Extension

## Why this exists

The "Convert to KoliBri" extension accelerates accessibility migrations by turning plain HTML or TSX snippets into KoliBri components that are BITV-ready by default. It focuses on the highest-impact elements first: buttons, inputs, links and selects.

## Features (MVP)

- **Convert selection**: Right-click or run the command palette action to replace the current selection (or the whole file) with KoliBri-aware markup.
- **Document scan**: Get a quick summary of how many buttons, inputs, links and selects can be migrated before committing to a full conversion.
- **Confidence scores**: Suggestions annotate whether a migration is safe to auto-apply or should be reviewed manually.

## Commands

- `KoliBri: Convert selection to KoliBri` (`kolibri.convertSelection`)
- `KoliBri: Scan document for convertible components` (`kolibri.scanDocument`)

## How conversion works

- **HTML**: Lightweight pattern matching transforms common elements into their KoliBri equivalents (`<button>` → `<kol-button>`, `<input>` + `<label>` → `<kol-input-text>`, etc.).
- **TSX/JSX**: Babel parses the file to rewrite JSX elements into their KoliBri counterparts while preserving event handlers, hints and validation flags when possible.
- **Confidence**: Conversions with simple text labels and well-mapped props are marked `high`; ambiguous labels or unknown variants are `medium` and carry a warning.

## Local development

```bash
pnpm install
pnpm --filter @public-ui/convert-to-kolibri-vscode build
```

Open the `packages/tools/convert-to-kolibri-vscode` folder in VS Code and run the "Launch Extension" debug task to try it out.
