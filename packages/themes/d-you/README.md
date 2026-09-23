# Public UI – d-you Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-d-you)](https://www.npmjs.com/package/@public-ui/theme-d-you)
[![license](https://img.shields.io/npm/l/@public-ui/theme-d-you)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)

The d-you theme brings the **EUDI Wallet DE** design system to the
[Public UI Web Component Library](https://public-ui.github.io): the “Mint Beam” green on a neutral
grey scale, a 4 px base grid with an 8 px vertical rhythm, pill-shaped actions and the IBM Carbon
icon language.

The full design specification, including the source of every value, is in
[`STYLEGUIDE.md`](./STYLEGUIDE.md). It transcribes two sources:

- the Figma file [2026_09 Design System d-you and flows](https://www.figma.com/design/vGhn8VyJ987JzmJenIuvI1/2026_09-Design-System-d-you-and-flows)
- the published [architecture concept, §UI/UX — Design System](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/v0.16.0/architecture-concept/09-ui-ux/04-design-system.html)
  (wallet development documentation v0.16.0)

Values were read from Figma screens exported on 2026-09-22 and named chronologically, so any value
can be traced back to the screen it came from. The screens are not committed; drop them into a local
`figma/` folder to follow the references.

## Installation & Integration

```bash
npm install @public-ui/components @public-ui/theme-d-you
```

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { D_YOU } from '@public-ui/theme-d-you';

register(D_YOU, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
```

## Fonts

The design system is set in **EUDI Diatype** (body, CTA, titles) and **EUDI Diatype Semi Extended**
(headlines). Both are licensed customizations of ABC Diatype and are **not** redistributed with this
package. The theme declares the families with a system fallback stack, so an application that holds
the license only has to load the webfonts under those two names — no theme change required.

## Dark mode

Dark mode is **opt-in**. The theme declares no `color-scheme` of its own: `color-scheme` is an
inherited property and inheritance crosses the shadow boundary, so each component resolves its
`light-dark()` tokens against whatever the surrounding document has in effect. An application that
declares nothing stays light, whatever the operating system says.

```html
<link rel="stylesheet" href="node_modules/@public-ui/theme-d-you/color-scheme.css" />
```

That one file makes the page follow the operating system and adds
`data-kol-color-scheme="light" | "dark"` (and the matching classes) to force a subtree. An
application that already manages `color-scheme` itself does not need it.

> The dark palette is **derived, not designed.** The Figma file heads its dark section
> “Dark Mode (TBD)” and only shows a single comparison strip. `src/mixins/palette.scss` follows that
> strip by mirroring the neutral ramp and keeping the primary green fixed; replace it once the design
> team ships the dark specification. See [`STYLEGUIDE.md` §1.6](./STYLEGUIDE.md).

## Customization

Every design token is a CSS custom property on the `:host` of each component, with a
`--kolibri-*` escape hatch in front of it:

```css
kol-button {
	--kolibri-color-primary-container: #96f5af;
	--kolibri-border-radius-card: 16px;
}
```

The token list lives in [`src/global.scss`](./src/global.scss); the values behind them, and the
reasoning where the theme deviates from the Figma file, are documented in
[`STYLEGUIDE.md`](./STYLEGUIDE.md).

## Licensing

The code in this package is **EUPL-1.2**, like the rest of KoliBri. The design system it implements
is not: the **d-you Design System** is © Common Codes GmbH under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which means an application shipping this
theme carries an attribution obligation:

> Adapted from "Common Codes d-you DE Design System" by Common Codes GmbH, licensed under CC BY 4.0.

Government insignia are excluded from that license, the icon fonts in `assets/` come with their own
terms, and the EUDI Diatype fonts are commercial and not redistributed here.
[`NOTICE.md`](./NOTICE.md) spells all of it out, including whom to ask when something is unclear.

## Known limitations

- **Icons:** the theme ships the [IBM Carbon](https://carbondesignsystem.com/elements/icons/library/)
  set the design system specifies, built into a font by `@public-ui/d-you-icons` (in `icons/`) from
  the `@carbon/icons` package. Only the icons KoliBri itself uses are mapped, plus the outlined
  twins the messages show on a dark page — `icons/icons.json` holds that table. A KoliBri icon with no Carbon counterpart, such as the KoliBri logo, keeps the
  `kolicons` glyph of `@public-ui/components`, and an application that reaches for a Font Awesome
  class directly (as some samples do) gets nothing, because this theme no longer ships that set.
- The animated arc of `kol-spin`’s cycle variant is driven by `@keyframes` color stops in the base
  layer of `@public-ui/components`. An animation’s own values win over any normal declaration,
  whatever the cascade layer, so no theme rule can reach them.
- The Figma file is a **mobile app** design system. Components without a counterpart in the screens
  (tables, pagination, trees, breadcrumbs, …) are styled by applying the token set consistently
  rather than from a direct design reference.
