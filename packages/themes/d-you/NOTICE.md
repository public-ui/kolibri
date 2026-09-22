# Licenses and attribution

This package carries three separate sets of terms: its own source code, the design system it
implements, and the third-party assets it ships. They are listed separately below because they do
not come from the same rights holder and are not interchangeable.

## 1. The source code of this package

The SCSS, TypeScript and configuration under `src/` and in the package root are part of KoliBri and
are licensed under the **European Union Public Licence v1.2 (EUPL-1.2)**, like the rest of this
repository. The full text is in [`LICENSE`](./LICENSE); `package.json` declares `"license":
"EUPL-1.2"` accordingly.

Copyright © Informationstechnikzentrum Bund.

## 2. The d-you design system

The values this theme implements — the color ramps, the type scale, the spacing system, the shape
and elevation rules, and everything else transcribed in [`STYLEGUIDE.md`](./STYLEGUIDE.md) — come
from the **d-you design system** of the German Public Reference Wallet, developed within the European
Digital Identity programme of the Federal Ministry for Digital and State Modernization.

> "d-you Design System" © Common Codes GmbH, licensed under
> [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

CC BY 4.0 permits copying, adaptation and commercial reuse, provided the rights holder is credited,
the license is linked, and changes are indicated. This theme is an adaptation, so the attribution
the license requires reads:

> Adapted from "Common Codes d-you DE Design System" by Common Codes GmbH, licensed under CC BY 4.0.

An application shipping this theme carries that attribution obligation onward. The deviations this
adaptation makes — the accessibility substitutions, the derived dark palette, the icon set actually
shipped — are documented in [`STYLEGUIDE.md`](./STYLEGUIDE.md), which is where "indicate if changes
were made" is satisfied.

Sources:

- Figma: [2026_09 Design System d-you and flows](https://www.figma.com/design/vGhn8VyJ987JzmJenIuvI1/2026_09-Design-System-d-you-and-flows)
- Specification: [Wallet development documentation, §UI/UX — Design System](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/v0.16.0/architecture-concept/09-ui-ux/04-design-system.html)
- Programme documentation: <https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/latest/>

### Trademarks and official insignia

**Not covered by CC BY 4.0.** The Bundesadler, official government wordmarks and any other government
insignia are excluded from the license above and must not be reused in a way that implies official
endorsement. This package ships none of them.

### Prohibited use

Using the design system for any unlawful or malicious purpose — including fraud, misrepresentation
and deceptive practices — is prohibited and constitutes a material breach of its terms.

### Contact

Questions about the design system and its licensing: <wallet-development@eudi.sprind.org>

## 3. Third-party assets in `assets/`

`assets/` is not in version control: the `prepare` script fills it from the packages listed below,
and each asset keeps its own license file next to it after installation.

| Asset                      | Comes from                 | License                                                                                                     |
| -------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `assets/kolicons/`         | `@public-ui/components`    | EUPL-1.2, © Informationstechnikzentrum Bund                                                                 |
| `assets/kolibri.ico`       | `@public-ui/components`    | EUPL-1.2, © Informationstechnikzentrum Bund                                                                 |
| `assets/fontawesome-free/` | `@public-ui/theme-default` | Icons CC BY 4.0, fonts SIL OFL 1.1, code MIT — © Fonticons, Inc.; see `assets/fontawesome-free/LICENSE.txt` |
| `assets/codicons/`         | `@public-ui/theme-default` | Icons CC BY 4.0, code MIT — © Microsoft Corporation; see `assets/codicons/LICENSE` and `LICENSE-CODE`       |

### A note on the icon set

The d-you design system specifies the [IBM Carbon Design System](https://carbondesignsystem.com/elements/icons/library/)
icons, licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0),
© IBM Corp. **Carbon is not packaged in this repository and this theme does not ship it.** Until it
is, the theme borrows the Font Awesome and Codicon sets from `@public-ui/theme-default`, under the
terms in the table above.

An application that wants the specified iconography has to add Carbon itself and carry its
Apache-2.0 notice. This substitution is recorded as an open point in
[`STYLEGUIDE.md`](./STYLEGUIDE.md) and [`README.md`](./README.md).

## 4. Fonts

The design system is set in **EUDI Diatype** and **EUDI Diatype Semi Extended**, licensed
customizations of ABC Diatype by Dinamo. They are commercial fonts and are **not redistributed with
this package**. The theme only names them in its font stack and falls back to a system sans-serif, so
installing this package grants no font license. An application that holds one loads the webfonts
under those two names itself.

## 5. If a directory has no license file

Do not assume its contents are free to reuse. Ask via the contact address above.
