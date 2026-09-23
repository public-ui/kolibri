# d-you icons

Builds the icon font of the d-you theme from the [IBM Carbon](https://carbondesignsystem.com/elements/icons/library/)
icon set the design system specifies.

The package is private and produces no npm artifact of its own: it writes into
`packages/themes/d-you/assets/d-you-icons/`, which the theme publishes as part of its own `assets`.

## Why a font, and why a build

KoliBri renders an icon as a glyph in an `<i>` element rather than as an inline SVG — avoiding slots
is what keeps the components' accessible names under the library's control. Carbon, however, ships
SVG only; IBM publishes no icon font. So the font is built here, the same way
`@public-ui/icons` builds `kolicons` and `@public-ui/ecl-icons` builds the ECL set.

## How it works

```
icons.json                     KoliBri icon name → Carbon icon name
   │
   ├─ collect-svg.mjs          copies @carbon/icons/svg/32/<carbon>.svg → svg/<kolibri>.svg
   ├─ oslllo-svg-fixer         converts strokes to fills, so every outline survives as a glyph
   ├─ svgtofont                svg-fixed/ → ../assets/d-you-icons/ (woff2, woff, ttf, style.css)
   └─ emit-mixin.mjs           style.css → ../assets/d-you-icons/_mixin.scss
```

Naming the copies after KoliBri's icons is what removes the usual translation table: svgtofont
derives its class names from the file names, so the generated font already speaks `kolicon-*`.

Two outputs, because a theme has to reach two places:

- **`style.css`** is loaded by the theme's `inject-assets.css` as an ordinary document stylesheet.
  It carries the `@font-face`, which has to be in the document — a font declared inside a shadow
  root is ignored.
- **`_mixin.scss`** is `@forward`ed by the theme's `src/mixins/icon.scss` and ends up in the
  stylesheet KoliBri adopts into every shadow root. That is where the class rules have to live,
  because a document stylesheet does not cross the shadow boundary.

Both come out of the same run, so the code points cannot drift apart. They are assigned
alphabetically from U+EA01, which is why the mixin is generated rather than written by hand: adding
one icon renumbers every icon after it.

## Changing the icon set

Edit `icons.json` and rebuild:

```bash
pnpm --filter @public-ui/d-you-icons build
```

The build fails if a name in `icons.json` is not in `@carbon/icons`. `svg/` and `svg-fixed/` are
scratch folders and are rebuilt from scratch on every run, so nothing there is worth editing.

A KoliBri icon that `icons.json` does not name is left alone: it keeps the `kolicons` glyph from
`@public-ui/components`. That is deliberate for `kolicon-kolibri`, the KoliBri logo, which has no
Carbon counterpart.

## License

The code in this package is EUPL-1.2, like the rest of KoliBri. The icon outlines it processes are
Apache-2.0, © IBM Corp.; the theme's [`NOTICE.md`](../NOTICE.md) records what that means for an
application shipping the theme.
