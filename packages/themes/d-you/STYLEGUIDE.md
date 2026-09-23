# d-you – Styleguide

Design specification for the `@public-ui/theme-d-you` KoliBri theme.

## Sources

| Source                       | Link                                                                                                                                                                                                               | What it is                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Figma file                   | [2026_09 Design System d-you and flows](https://www.figma.com/design/vGhn8VyJ987JzmJenIuvI1/2026_09-Design-System-d-you-and-flows)                                                                                 | The design system itself. Every value in this document comes from here. |
| Architecture concept, §UI/UX | [Wallet development documentation v0.16.0 — 04 Design System](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/v0.16.0/architecture-concept/09-ui-ux/04-design-system.html) | The published specification the Figma file belongs to.                  |

Both are the authority; this document is a transcription. Where the two disagree with what the theme
ships, the deviation is stated in place, with the reason.

Values were read from a set of Figma screens exported on 2026-09-22 and named chronologically
(`Bildschirmfoto 2026-09-22 um <HH.MM.SS>.png`); every section below names the timestamps it was
taken from. The screens are not part of this repository — they are several megabytes of PNG. Place
them in `figma/` next to this file to follow the references; the folder is git-ignored.

The underlying design system is the **EUDI Wallet DE** design system (the German EUDI Wallet app,
product name “d-you”). It is a mobile-first Material-3-flavoured system: a green “Mint Beam” brand
color on a neutral grey scale, a 4 px base grid with an 8 px vertical rhythm, pill-shaped actions and
IBM Carbon icons.

> **Reading the screenshots.** The screens are macOS screenshots taken on a Display-P3 screen. Raw
> pixel values in the PNGs are therefore P3-encoded and roughly 5–10 % more saturated than the sRGB
> values Figma shows. All hex values below are the sRGB values from the Figma labels, cross-checked
> against a P3→sRGB conversion of the rendered swatches. Where label and swatch disagree, the
> discrepancy is called out explicitly.

---

## 1. Color

> Source: screens `12.50.15` – `12.54.02`

The color system is built from two tonal ramps (primary green, secondary/neutral grey) plus a set of
semantic tokens layered on top. Token names follow a numeric scale, `-10` (darkest) to `-99`
(lightest).

### 1.1 Primary ramp – “Mint Beam”

> Source: screens `12.50.15`, `12.52.39`

The primary scale is derived from the EUDI Wallet “Mint Beam” color. Dark values carry emphasis,
mid-tones are the brand presence, light values are backgrounds and low-emphasis surfaces.

| Token        | Value     |
| ------------ | --------- |
| `primary-10` | `#0F2415` |
| `primary-20` | `#1E3E26` |
| `primary-30` | `#1F572D` |
| `primary-40` | `#068227` |
| `primary-50` | `#10B13B` |
| `primary-60` | `#3BE26A` |
| `primary-70` | `#72E992` |
| `primary-80` | `#96F5AF` |
| `primary-90` | `#D2F9DC` |
| `primary-95` | `#E9FCEE` |
| `primary-99` | `#F6FDF8` |

### 1.2 Secondary / neutral ramp

> Source: screens `12.50.15`, `12.52.49`

Neutral greys carry structure and readability. Dark greys are typography on light backgrounds, light
greys are card and surface backgrounds and low-emphasis elements (icons, secondary buttons).

| Token          | Value     |
| -------------- | --------- |
| `secondary-10` | `#1D1D1E` |
| `secondary-20` | `#333333` |
| `secondary-30` | `#494949` |
| `secondary-40` | `#5A5959` |
| `secondary-50` | `#7A7A7A` |
| `secondary-60` | `#949494` |
| `secondary-70` | `#B9B9BD` |
| `secondary-80` | `#DEDEDE` |
| `secondary-90` | `#EDEDED` |
| `secondary-95` | `#F4F4F4` |
| `secondary-99` | `#FAFAFA` |

### 1.3 Semantic tokens (light)

> Source: screens `12.52.39`, `12.52.49`, `12.53.01`

| Token                       | Value     | Ramp reference  | Usage                                                   |
| --------------------------- | --------- | --------------- | ------------------------------------------------------- |
| `primary`                   | `#96F5AF` | `primary-80`    | Primary action fill (same value as `primary-container`) |
| `primary-container`         | `#96F5AF` | `primary-80`    | Primary button / primary surface                        |
| `primary-outline`           | `#329D77` | –               | Border and icon on primary/success surfaces             |
| `on-primary`                | `#1D1D1E` | `secondary-10`  | Label on primary surfaces                               |
| `on-background`             | `#1D1D1E` | `secondary-10`  | Default body text                                       |
| `on-background-variant`     | `#494949` | `secondary-30`  | Secondary / supporting text                             |
| `tertiary-outline`          | `#929294` | ≈`secondary-60` | Low-emphasis borders and icons                          |
| `outline-variant`           | `#B9B9BD` | `secondary-70`  | Default component border                                |
| `surface-container-highest` | `#DEDEDE` | `secondary-80`  | Highest elevated grey surface                           |
| `tertiary-container`        | `#EDEDED` | `secondary-90`  | Tertiary button / neutral chip — see note below         |
| `surface-container`         | `#F4F4F4` | `secondary-95`  | Card and section background — see note below            |
| `background`                | `#FFFFFF` | –               | Page background                                         |

> **Two known inconsistencies in the Figma file** (screen `12.53.01`):
>
> 1. `tertiary-container` is labelled `#329D77` — the value of `primary-outline`. The rendered swatch
>    next to it is a light grey (`#EDEDED`), and a green value would contradict the surrounding
>    tertiary tokens, which are all neutral greys. This is a copy-paste error in the Figma file; the
>    theme uses `#EDEDED`.
> 2. `surface-container` is labelled `#EDEDED` while its swatch renders `#F4F4F4`. Taking the label
>    would collide with `tertiary-container`. The theme uses `#F4F4F4`, which keeps the surface scale
>    monotonic (`#DEDEDE` → `#EDEDED` → `#F4F4F4` → `#FFFFFF`).
>
> Both decisions should be confirmed with the design team before the theme is released.

### 1.4 Functional colors

> Source: screens `12.53.27`, `12.53.44`, `12.53.52`

Feedback colors follow the traffic-light metaphor. They must always be combined with a matching
icon — color alone never carries the message (screen `12.56.47`).

| Token                                           | Value     |
| ----------------------------------------------- | --------- |
| `success`                                       | `#96F5AF` |
| `success-container`                             | `#E9FCEE` |
| `success-outline` / `on-success-container-icon` | `#329D77` |
| `error`                                         | `#B3261E` |
| `error-container`                               | `#F9DEDC` |
| `error-outline` / `on-error-container-icon`     | `#852221` |
| `warning`                                       | `#FEDF43` |
| `warning-container`                             | `#FFFBE5` |
| `warning-outline` / `on-warning-container-icon` | `#A16A00` |
| `on-error-container` / `on-warning-container`   | `#1D1D1F` |

> The rendered `warning-outline` swatch in the Figma file is `#AE9100`, which only reaches ≈3.2:1
> against `warning-container`. The labelled `#A16A00` reaches ≈4.9:1 and is therefore the correct
> value; the swatch is stale.

### 1.5 Message / alert combinations

> Source: screens `12.53.52`, `12.54.02`

Each feedback type ships in two weights, so a message stays readable on light and dark surfaces:

| Variant         | Background          | Border            | Text / icon                    |
| --------------- | ------------------- | ----------------- | ------------------------------ |
| Success, subtle | `success-container` | `success-outline` | `on-error-container` `#1D1D1F` |
| Success, strong | `success` `#96F5AF` | –                 | `#1D1D1F`                      |
| Warning, subtle | `warning-container` | `warning-outline` | `#1D1D1F`                      |
| Warning, strong | `warning` `#FEDF43` | –                 | `#1D1D1F`                      |
| Error, subtle   | `error-container`   | `error-outline`   | `#1D1D1F`                      |
| Error, strong   | `error` `#B3261E`   | –                 | `#FFFFFF`                      |

The subtle variants use a filled status icon in the outline color; the strong variants use the
outlined icon shape. The error icon is a triangle (Carbon `warning--alt--filled` /
`warning--alt`), success and warning are circles.

The theme renders the subtle weight on a light page and the strong weight on a dark page, which is
the use the design system gives the two weights. Info and the neutral note have no strong weight in
the screens and keep the subtle one in both schemes.

### 1.6 Dark mode

> Source: screen `12.53.27` — headed **“Dark Mode (TBD)”**

Dark mode is explicitly unfinished in the design file. The only guidance the screens give is one
comparison strip:

- page background flips to `#1D1D1E` (`secondary-10`);
- the **primary** action keeps `#96F5AF` with its dark label — the brand green is used unchanged in
  both schemes;
- the **secondary** (outlined) action keeps a transparent fill and a light outline;
- the **tertiary** (grey-filled) action moves from `#EDEDED` to a dark grey fill with a light label.

The dark palette in [`src/mixins/palette.scss`](./src/mixins/palette.scss) follows that guidance by
mirroring the neutral ramp (`secondary-10` ↔ `secondary-95`) while keeping the primary ramp fixed.
It is a **derived proposal, not a design hand-off**, and is marked as such in the source. Replace it
once the design team ships the dark specification.

---

## 2. Typography

> Source: screens `12.58.01`, `12.58.18` – `12.58.57`, `13.02.59`, `13.03.08`

### 2.1 Font families

| Role                   | Family                       | Weight                  |
| ---------------------- | ---------------------------- | ----------------------- |
| Headlines (H1–H5)      | `EUDI Diatype Semi Extended` | Bold (700)              |
| Body copy, CTA, titles | `EUDI Diatype`               | Regular / Medium / Bold |

`EUDI Diatype` is a licensed customization of ABC Diatype and is **not redistributed with this
theme**. The theme declares the families and falls back to a system sans-serif stack, so an
application that has the license can drop the webfonts in and get the intended rendering without
touching the theme.

Body copy activates the stylistic sets **Alt R, Alt I and J**; headlines activate none. Stylistic
sets are a font feature, applied through `font-feature-settings` where the licensed font is present.

### 2.2 Headline scale

> Source: screens `12.58.18` – `12.58.35`, `13.03.08`

All headlines: `EUDI Diatype Semi Extended`, Bold, letter-spacing `0`, no text decoration, original
case. Minimum contrast against background ≥ 4.5:1.

| Style | Size  | Line height | Computed |
| ----- | ----- | ----------- | -------- |
| H1    | 32 px | 115 %       | 36.8 px  |
| H2    | 28 px | 115 %       | 32.2 px  |
| H3    | 24 px | 120 %       | 28.8 px  |
| H4    | 20 px | 120 %       | 24 px    |
| H5    | 16 px | 125 %       | 20 px    |

### 2.3 Copy scale

> Source: screens `12.58.35`, `12.58.40`, `13.03.08`

| Style          | Family         | Weight  | Size  | Line height | Letter spacing | Contrast | Note                     |
| -------------- | -------------- | ------- | ----- | ----------- | -------------- | -------- | ------------------------ |
| Copy/default   | `EUDI Diatype` | Regular | 16 px | 140 %       | 0 %            | ≥ 7:1    | Default body text        |
| Copy/highlight | `EUDI Diatype` | Bold    | 16 px | 140 %       | 0 %            | ≥ 4.5:1  | Inline emphasis          |
| Copy/small     | `EUDI Diatype` | Regular | 14 px | 140 %       | 1 %            | ≥ 7:1    | **Exceptional use only** |

### 2.4 CTA scale

> Source: screens `12.58.45`, `12.58.52`

| Style       | Family         | Weight | Size  | Line height | Letter spacing | Note                     |
| ----------- | -------------- | ------ | ----- | ----------- | -------------- | ------------------------ |
| CTA/default | `EUDI Diatype` | Medium | 16 px | 140 %       | 1 %            | Button and link labels   |
| CTA/small   | `EUDI Diatype` | Medium | 14 px | 140 %       | 2 %            | **Exceptional use only** |

### 2.5 Title scale

> Source: screens `12.58.52`, `12.58.57`

Used for list item titles and data labels.

| Style       | Family         | Weight  | Size  | Line height | Letter spacing |
| ----------- | -------------- | ------- | ----- | ----------- | -------------- |
| Title large | `EUDI Diatype` | Regular | 18 px | 120 %       | 0 %            |
| Title       | `EUDI Diatype` | Regular | 16 px | 120 %       | 0 %            |
| Title small | `EUDI Diatype` | Medium  | 14 px | 110 %       | 2 %            |

### 2.6 Content scaling

> Source: screen `13.03.24`

Font sizes must respond to the platform’s dynamic-type / user font-size preference rather than being
pinned to device pixels. In the web theme this means every size is expressed in `rem` via the
`to-rem()` helper, so a user’s browser font size scales the whole interface.

---

## 3. Spacing & grid

> Source: screens `13.02.42`, `13.02.49`, `13.04.01`, `13.04.10`

- **Base unit: 4 px** (Material 3 canonical base).
- **Vertical rhythm: 8 px.** Keep vertical spacing on the 8 px baseline grid; use 4 px steps only for
  micro-adjustments.
- **Line heights** are multiples of 8, with 4 px (exceptionally 2 px) subdivisions where needed.

### 3.1 Spacing scale

| Token       | Value | Usage                                                            |
| ----------- | ----- | ---------------------------------------------------------------- |
| `space-2xs` | 4 px  | Micro adjustments, label↔value gap in data lists (`13.06.15`)    |
| `space-xs`  | 8 px  | Icon↔text gap, small gap between related actions (`13.04.10`)    |
| `space-s`   | 12 px | List row inner padding (`13.05.59`)                              |
| `space-m`   | 16 px | Standard gap, content-area side padding, gap between two actions |
| `space-l`   | 20 px | Content gap below a page title in list screens (`13.05.31`)      |
| `space-xl`  | 24 px | Section spacing, drawer/modal inner padding                      |
| `space-2xl` | 32 px | Large section separation, sticky-bar bottom padding              |

### 3.2 Layout

- **Content area side padding: 16 px** on all screens (`13.02.49`).
- **Section spacing: 24–32 px** between content blocks (`13.04.17`).
- **Large separation:** use `space-between` rather than a fixed gap when a block must be pushed to
  the bottom of the viewport (`13.04.17`).
- **Touch targets: minimum 44–48 px.** Full-width actions are 48 px high, icon-only controls 44 px
  (`13.02.59`). This matches KoliBri’s existing `--a11y-min-size` of 44 px.
- **Safe areas:** respect notch (47–59 px) and home indicator (~32 px); keep the primary CTA visible
  when the soft keyboard opens (`13.03.15`, `13.03.24`).

### 3.3 Sticky action bar

> Source: screens `13.04.17`, `13.04.21`, `13.04.31`, `13.04.39`

A fixed bottom CTA area used in onboarding, issuance and presentation flows. Container padding is
**16 px top and sides, 32 px bottom** (safe area).

| Layout         | Composition                                     | Gap   |
| -------------- | ----------------------------------------------- | ----- |
| Single action  | One full-width button, 48 px high               | –     |
| Side by side   | Secondary + primary, equal width                | 16 px |
| Stacked        | Primary above secondary, both full width        | 16 px |
| Stacked, tight | Primary + secondary in one group, tertiary link | 8 px  |

---

## 4. Shape & elevation

> Source: screens `12.58.10`, and measured from the mockups in `13.02.49`, `13.05.25`, `13.06.26`

### 4.1 Corner radius

The Figma file does not carry an explicit radius token table. The values below were measured from
the mockups and snapped to the 4 px base grid.

| Token         | Value   | Usage                                                     |
| ------------- | ------- | --------------------------------------------------------- |
| `radius-xs`   | 4 px    | Inline markers, progress segments                         |
| `radius-s`    | 8 px    | Form fields, small controls                               |
| `radius-m`    | 12 px   | List rows, tags, inline chips                             |
| `radius-l`    | 16 px   | Cards, credential cards, illustration containers          |
| `radius-xl`   | 24 px   | Modals, bottom drawers, elevated sheets                   |
| `radius-full` | 9999 px | Buttons, chips, avatars, the FAB — every pill-shaped item |

Actions are **always** fully rounded: a 48 px button is a 24 px-radius pill.

### 4.2 Shadows

> Source: screen `12.58.10`

Two elevation levels, both cast with `#1D1D1E` at 20 % opacity:

| Token         | X   | Y   | Blur  | Spread | Color                 | Usage                                                   |
| ------------- | --- | --- | ----- | ------ | --------------------- | ------------------------------------------------------- |
| `shadow-low`  | 0   | 2   | 8 px  | 0      | `rgb(29 29 30 / 0.2)` | Compact interactive elements, subtle cues, scroll hints |
| `shadow-high` | 0   | 2   | 16 px | 0      | `rgb(29 29 30 / 0.2)` | Dialogs, modals, navigation menus above the content     |

---

## 5. Iconography

> Source: screens `12.56.11` – `12.57.09`

- **Library: [IBM Carbon Icons](https://carbondesignsystem.com/elements/icons/library/).** All
  interface icons come from Carbon.
- **Icon ↔ text pairing:** 16 px text pairs with a **20 px** icon and a fixed **8 px** gap. Icon
  sizes are token-based and do **not** scale proportionally with the text.
- **Size scale:** 16, 18, 20, 24, 32 px. Minimum 14 px, maximum 32 px; sizes are multiples of 8 with
  4 px subdivisions allowed.
- **Contrast:** icons need at least **3:1** against their background.
- **Fill:** solid color only.

### Don’ts (screen `12.56.47`)

- Don’t alter icon sizes outside the scale.
- Don’t move the icon in dialogs — it always sits **before** the headline.
- Don’t use icons below 3:1 contrast.
- Don’t apply effects (gradients, shadows) to icons.
- Don’t distort, stretch or skew icons.
- Don’t align icons to the text baseline — align them optically to the text box.
- Don’t use icons purely decoratively.
- Don’t rely on an icon alone to communicate critical information.

---

## 6. Component patterns

> Source: screens `13.04.39` – `13.06.31`

### 6.1 Buttons

| Variant    | Fill                   | Border                 | Label           |
| ---------- | ---------------------- | ---------------------- | --------------- |
| Primary    | `primary-container`    | none                   | `on-primary`    |
| Secondary  | `background` `#FFFFFF` | 1 px `outline-variant` | `on-background` |
| Tertiary   | `tertiary-container`   | none                   | `on-background` |
| Danger     | `error-container`      | 1 px `error-outline`   | `error-outline` |
| Ghost/link | transparent            | none                   | `on-background` |

- Height 48 px (icon-only 44 px), fully rounded, label in **CTA/default**.
- Disabled state keeps the shape and drops the fill to a tinted, low-contrast variant
  (`13.06.26`: a disabled primary renders as `primary-95` with a muted label).
- A trailing arrow icon marks forward progression (“Weiter →”), a leading `+` marks “add”.

### 6.2 Top app bar / toolbar

> Source: screen `13.04.39`, `13.04.46`

Permanent top navigation with back, help and close actions. **Minimum height 48 px** (tap target).
Can be pinned for flows that need persistent navigation, and can carry a segmented progress bar for
multi-step flows such as onboarding.

### 6.3 Cards & data lists

> Source: screens `13.04.52`, `13.05.59`, `13.06.15`

- **Attributes card:** header (title + issuer), a tag showing how many values are shared, the list of
  value labels, and a CTA to reveal the values. Inner padding 16 px, 8 px between rows.
- **Data list rows:** 20 px between entries, label above value, 4 px label↔value gap.
- **Detailed list rows:** minimum height 64 px, 16 px between rows, 4 px inner label↔value gap,
  24 px between groups, 8 px below a group heading.
- For complex list spacing, combine inner padding and list gap, keeping 4 px as the base.

### 6.4 Modals & drawers

> Source: screen `13.05.25`

- **Bottom drawer:** two areas — content (headline + copy) and action bar. 32 px outer padding,
  24 px sides, 16 px between icon, headline and copy.
- **Modal:** slightly denser — 24 px padding all round, 16 px between icon, headline and copy.
- The status icon always sits **above** the headline, centred.

### 6.5 Layout patterns

> Source: screens `13.05.05` – `13.05.53`, `13.06.26`

- **Onboarding:** full-bleed illustration on the top 50 % of the viewport, rounded bottom sheet with
  headline, one or two sentences of copy, a progress indicator and the CTA within thumb reach.
- **Content page with illustration:** a 16:9 image at the top, everything else stacked below.
- **Grouped content:** organise mixed content into clear sections; keep the action that continues
  the flow close to the sticky action bar.
- **Credential stacking:** 1–3 credentials stack vertically with a 16 px gap; from 4 credentials the
  stack overlaps with a −56 px vertical offset so name, issuer and logo stay visible. The PID card
  always stays fully visible above the other credentials.

---

## 7. Mapping to the KoliBri theme

The theme package implements the tokens above under the `--kol-*` namespace and follows the layering
rules in the repository [`AGENTS.md`](../../../AGENTS.md):

- The **theme global layer** (`src/global.scss`) declares the color, font, radius and shadow-color
  tokens on `:host`, resolves the light/dark branch with `light-dark()`, and sets the base font size
  and the 140 % line height of Copy/default, which every component inherits.
- The **theme component layers** (`src/components/*.scss`) only reference those tokens; they contain
  no `color-scheme`, no `prefers-color-scheme` media query and no `light-dark()` of their own.
- The **two elevation shadows** are mixins, not tokens (`kol-shadow-low`, `kol-shadow-high` in
  `src/mixins/elevation.scss`), because a `box-shadow` is a geometry rather than a value a consumer
  swaps; the color behind them stays overridable through `--color-shadow`. `--spacing` is the 4 px
  base unit the component layers multiply up from, so the scale in §3.1 needs no token of its own.
- Internal, non-public values (ramp steps, ratios, unit math) are SASS variables in
  `src/mixins/palette.scss` and `src/mixins/to-rem.scss`, never CSS custom properties.
- `color-scheme.css` ships the single `:root` declaration an application needs to opt into dark mode.

The theme identifier registered with KoliBri is **`dyou`**, not `d-you`: KoliBri validates it against
`/^[a-z][a-z0-9]{1,}(-[a-z0-9]+)?$/`, which requires at least two characters before the hyphen. The
package name (`@public-ui/theme-d-you`) and the export (`D_YOU`) keep the product spelling.

### Token mapping

| Design system           | KoliBri token                                | Note                                          |
| ----------------------- | -------------------------------------------- | --------------------------------------------- |
| `primary-container`     | `--color-primary-container`                  | `#96F5AF`, the fill of a primary action       |
| `on-primary`            | `--color-on-primary`                         | `#1D1D1E`, its label                          |
| `primary-40`            | `--color-primary`                            | the accent **as a foreground** — see below    |
| `primary-30`            | `--color-primary-variant`                    | hover / active                                |
| `tertiary-container`    | `--color-secondary`                          | the neutral filled action                     |
| `on-background`         | `--color-text`                               |                                               |
| `secondary-40`          | `--color-subtle`                             | control borders, placeholder — see below      |
| `surface-container`     | `--color-mute`                               | disabled fields, neutral section surfaces     |
| `outline-variant`       | `--color-mute-variant`                       | inactive borders                              |
| `error`                 | `--color-danger`                             |                                               |
| `warning-outline`       | `--color-warning`                            | the yellow fill cannot carry text — see below |
| `success-outline`       | `--color-success-outline`                    | border and icon only                          |
| `*-container`           | `--color-{success,warning,danger}-container` | the soft message surfaces                     |
| shadow/low, shadow/high | `--color-shadow`                             | `rgb(29 29 30 / 0.2)`, geometry per component |

### Accessibility deviations

Three values from the Figma file cannot be used where the KoliBri token they map to also carries
text, because they fall below the 4.5:1 WCAG threshold. In each case the theme keeps the documented
value for the role it is safe in (border, icon) and uses a darker step of the same ramp where the
token has to be a text color:

| Figma value                   | On white | Used as                                             | Text-safe substitute             |
| ----------------------------- | -------- | --------------------------------------------------- | -------------------------------- |
| `primary-container` `#96F5AF` | 1.31:1   | primary fill only                                   | `primary-40` `#068227`, 4.96:1   |
| `success-outline` `#329D77`   | 3.37:1   | success border and icon (`--color-success-outline`) | `primary-40` `#068227`           |
| `outline-variant` `#B9B9BD`   | 1.96:1   | decorative separators (`--color-mute-variant`)      | `secondary-40` `#5A5959`, 6.98:1 |

The `warning` yellow `#FEDF43` is a fill only; `--color-warning` resolves to `warning-outline`
`#A16A00` (4.59:1 on white), which is what the screens use for the warning border, icon and text.

### Scope and open points

The Figma file is a **mobile app** design system; KoliBri is a web component library. Components with
no counterpart in the screens (tables, pagination, trees, breadcrumbs, form fields, …) are styled by
applying the token set consistently rather than by a direct design reference.

Still outstanding:

- **Icons.** Resolved: the theme ships IBM Carbon, built into a font from `@carbon/icons` by
  `@public-ui/d-you-icons` (in `icons/`). What remains is a mapping question rather than a packaging
  one — `icons/icons.json` pairs each KoliBri icon name with a Carbon icon, and a few of those pairs
  are a judgement call (`cogwheel` → `settings` against `settings` → `settings--adjust`,
  `sort-neutral` → `sort--remove`) that the design team should confirm.
- **Dark mode.** Derived, not designed — see §1.6.
- **Corner radii.** Measured from the mockups rather than read from a token table (§4.1).
- **The two Figma inconsistencies in §1.3** and the stale `warning-outline` swatch in §1.4 should be
  confirmed with the design team.
- **Visual baselines.** The theme is wired into the visual-regression matrix in
  `.github/workflows/ci.yml` and `visual-baseline.yml`; its baseline snapshots still have to be
  generated and approved on a pull request (see `docs/visual-review.md`).
