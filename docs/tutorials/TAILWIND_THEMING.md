# TailwindCSS Theme Example (KoliBri)

This tutorial shows an **example** TailwindCSS-based theming workflow for KoliBri. It keeps Tailwind as a token source and applies the values through the **Theme Global/Component layers** so the Shadow DOM components receive the correct styling.

> ℹ️ The example files live in `docs/examples/tailwind-theme/` and are not wired into the build. They are meant as a reference.

## 1) Example file layout

```
docs/examples/tailwind-theme/
├── tailwind.config.cjs
├── tokens.css
├── theme.components.scss
└── theme.global.scss
```

## 2) Tailwind config (token source)

`tailwind.config.cjs` defines the design tokens. A real implementation could export these tokens to CSS variables (e.g., via a small plugin or build script). The example file includes a minimal mapping for colors, radii, and fonts.

## 3) Token output (`tokens.css`)

`tokens.css` demonstrates **generated** CSS variables. In a real pipeline, Tailwind’s config would be the single source of truth and a script would emit these variables.

## 4) Theme Global Layer

`theme.global.scss` shows how the generated variables are applied in `@layer kol-theme-global`. This is where you set defaults such as fonts and base token values for all components.

## 5) Theme Component Layer

`theme.components.scss` demonstrates component-specific overrides via `@layer kol-theme-component`. Only override what the theme really customizes.

## 6) Suggested build approach (conceptual)

1. Run Tailwind to produce `tokens.css` from `tailwind.config.cjs`.
2. Import or inline the generated tokens into `theme.global.scss`.
3. Build the theme package and use it with KoliBri.

## 7) Notes

- Tailwind utilities **do not reach Shadow DOM**; use them for page layout only.
- Keep layout styles in KoliBri’s **basis layers**, not in theme layers.
- Do not place `@layer` declarations in utility/partial files.
- Spell KoliBri consistently in documentation.
