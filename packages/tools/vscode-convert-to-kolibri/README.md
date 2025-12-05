# Convert to KoliBri VS Code Extension

Migrate HTML and React/TSX code to accessible [KoliBri](https://public-ui.github.io) components with one click.

## What it does

The "Convert to KoliBri" extension accelerates accessibility migrations by automatically transforming plain HTML or TSX/JSX snippets into WCAG 2.1 AA/AAA compliant KoliBri web components. It focuses on the highest-impact elements: buttons, inputs, links, and selects.

### Key Benefits

- **Instant BITV 2.0 compliance** - Components are accessible by default
- **Fast migration** - Convert entire files or selections in seconds
- **Smart analysis** - Scan documents to see what can be migrated before converting
- **High confidence** - Clear indicators show which conversions are safe to auto-apply
- **Framework agnostic** - Works with HTML, React, TypeScript, and JavaScript

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install ITZBund.vscode-public-ui-convert-to-kolibri`
4. Press Enter

Or search for "Convert to KoliBri" in the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).

## Features

### Convert Selection

Right-click in your editor or use the command palette to replace the current selection (or entire file) with KoliBri-aware markup.

**Supported conversions:**

- `<button>` → `<kol-button>` / `<KolButton>`
- `<input>` + `<label>` → `<kol-input-text>` / `<KolInputText>`
- `<a>` → `<kol-link>` / `<KolLink>`
- `<select>` + `<option>` → `<kol-select>` / `<KolSelect>`

### Document Scan

Get a quick summary of convertible components in your file before committing to a full conversion.

### Confidence Scores

Every suggestion includes a confidence level:

- **High**: Safe to auto-apply (simple labels, well-mapped props)
- **Medium**: Manual review recommended (ambiguous labels, unknown variants)

## Commands

| Command                                             | Keyboard Shortcut                                               | Description                                 |
| --------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------- |
| `KoliBri: Convert selection to KoliBri`             | `Ctrl+Shift+K Ctrl+Shift+C`<br/>`Cmd+Shift+K Cmd+Shift+C` (Mac) | Convert selected code to KoliBri components |
| `KoliBri: Scan document for convertible components` | `Ctrl+Shift+K Ctrl+Shift+S`<br/>`Cmd+Shift+K Cmd+Shift+S` (Mac) | Analyze document for migration candidates   |

Both commands are also available via:

- **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
- **Right-click context menu** in the editor

## How It Works

### HTML Mode

Lightweight pattern matching transforms common elements into their KoliBri equivalents:

```html
<!-- Before -->
<button onclick="handleClick()">Submit</button>

<!-- After -->
<kol-button _label="Submit" _on="{'onClick': handleClick}"></kol-button>
```

### TSX/JSX Mode

Babel parses the file to rewrite JSX elements while preserving event handlers, hints, and validation flags:

```tsx
// Before
<button onClick={handleClick}>Submit</button>

// After
<KolButton _label="Submit" _on={{onClick: handleClick}} />
```

## Usage Example

1. Open an HTML or TSX file
2. Select the code you want to convert (or leave empty to convert entire file)
3. Right-click and choose "KoliBri: Convert selection to KoliBri"
4. Review the output in the editor and the "KoliBri Convert" output panel

## Supported File Types

- HTML (`.html`)
- TypeScript React (`.tsx`)
- JavaScript React (`.jsx`)
- TypeScript (`.ts`)
- JavaScript (`.js`)

## Local Development

```bash
# Install dependencies
pnpm install

# Build the extension
pnpm --filter vscode-public-ui-convert-to-kolibri build

# Open in VS Code
code packages/tools/vscode-convert-to-kolibri
```

Press `F5` to launch the Extension Development Host and test your changes.

## Learn More

- [KoliBri Documentation](https://public-ui.github.io)
- [KoliBri GitHub Repository](https://github.com/public-ui/kolibri)
- [Report Issues](https://github.com/public-ui/kolibri/issues)

## License

EUPL-1.2 - © Informationstechnikzentrum Bund

---

**Made with love by the KoliBri team**
