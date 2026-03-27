# BWSt Design Tokens

Comprehensive documentation of all CSS custom properties (design tokens) defined and used in the BWSt theme.

## Color Tokens

| Token | Value | Category | Usage | Notes |
|-------|-------|----------|-------|-------|
| `--color-primary` | `#156570` | Color | Primary buttons, links, active states, focus indicators, checkboxes/radios when checked | Core brand color; most interactive elements |
| `--color-primary-variant` | `#207a8b` | Color | Button hover states, pagination hover/active, checkbox/radio hover states, link focus outline | Darker shade for hover/focus states |
| `--color-secondary` | `#ccebf7` | Color | Secondary buttons | Light blue background |
| `--color-danger` | `#ca0101` | Color | Danger buttons, error states, error alerts, form field error borders, error text | Used for destructive actions and error messaging |
| `--color-warning` | `#c44931` | Color | Warning alerts | Orange/red for warning states |
| `--color-success` | `#005c45` | Color | Success alerts | Green for positive feedback |
| `--color-subtle` | `#576164` | Color | Input borders, tooltip borders, alert default accent color, placeholder text, input field borders when readonly/disabled | Gray for subtle/inactive elements |
| `--color-light` | `#ffffff` | Color | Background for inputs, cards, alerts, button text (primary), checkbox/radio checked states | White background |
| `--color-text` | `#202020` | Color | Default text color, button text (normal/tertiary) | Near-black for readability |
| `--color-mute` | `#f2f3f4` | Color | Disabled input backgrounds, indeterminate checkbox backgrounds | Very light gray background |
| `--color-mute-variant` | `#bec5c9` | Color | Input field borders (readonly/disabled), badge hint background | Medium gray for inactive elements |
| `--color-visited` | `#551a8b` | Color | Visited link color | Purple (HTML standard) |

## Spacing Tokens

| Token | Value | Category | Usage | Notes |
|-------|-------|----------|-------|-------|
| `--spacing` | `#{to-rem(4)}` | Spacing | Base unit for gaps, padding in radio/checkbox inputs, alert padding | Responsive 4px base unit using `to-rem()` |
| `--border-radius` | `#{to-rem(4)}` | Border | Input containers, buttons, links on focus, cards, checkboxes, selects | Consistent 4px border radius |
| `--border-width` | `1px` | Border | Input borders, tooltip borders, alert card borders, link focus outline width | Standard 1px border width |

## Typography Tokens

Typography in BWSt theme is defined via mixins rather than CSS variables. The mixins define fixed values:

| Mixin | Font Size | Line Height | Font Weight | Usage |
|-------|-----------|------------|-------------|-------|
| `kol-typography-body` | `to-rem(16)` | 1.5 | normal | Body text |
| `kol-typography-h1` | `to-rem(24)` | 1.667 | normal | Heading level 1 |
| `kol-typography-h2` | `to-rem(20)` | 1.4 | normal | Heading level 2 |
| `kol-typography-h3` | `to-rem(18)` | 1.333 | normal | Heading level 3 |
| `kol-typography-accordion` | `to-rem(18)` | 1.1 | 700 | Accordion headers |
| `kol-typography-hint` | `to-rem(14.4)` | normal | normal | Form hints (italic) |

### Font Family

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--font-family` | `'Noto Sans Regular', Arial, helvetica, sans-serif` | Global font family | All text elements |
| `--font-size` | `#{to-rem(16)}` | Base font size | Root element font size |

## Interactive State Tokens

### Button States

| Token | Used In | Default Value | Variants |
|-------|---------|---------------|----------|
| `--text-background-color` | All buttons | Varies by variant | primary, secondary, tertiary, normal, danger, ghost |
| `--text-border-color` | All buttons | Varies by variant | primary, secondary, tertiary, normal, danger, ghost |
| `--text-color` | All buttons | Varies by variant | primary, secondary, tertiary, normal, danger, ghost |

Button variant mappings:
- **Primary**: bg=primary, border=primary, text=light
- **Secondary**: bg=secondary, border=primary, text=primary
- **Tertiary**: bg=light, border=primary, text=primary
- **Normal**: bg=light, border=text, text=text
- **Danger**: bg=danger, border=danger, text=light
- **Ghost**: bg=transparent, border=transparent, text=primary

Hover state (all except danger): bg/border=primary-variant, text=light

### Selection Input Tokens (Checkboxes/Radios)

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--kol-selection-input-main-color` | Varies by mode | Primary state color | Varies in different selection input modes |
| `--kol-selection-input-focus-color` | Varies by mode | Focus state color | Can use primary-variant |
| `--kol-selection-input-hover-color` | `rgb(8, 35, 48, 0.24)` | Hover overlay | Semi-transparent dark overlay |
| `--kol-selection-input-icon-color` | Varies by mode | Icon color when checked | Light or dark depending on background |
| `--kol-selection-input-off-color` | Varies by mode | Unchecked state color | Usually mute or subtle |

## Alert Tokens

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--alert-accent-color` | Varies by type | Alert border, text, and background | Set based on alert type |

Alert type mappings:
- **default**: accent-color=subtle
- **error**: accent-color=danger
- **info**: accent-color=primary
- **success**: accent-color=success
- **warning**: accent-color=warning

## Focus & Outline Tokens

| Token | Value | Category | Usage | Notes |
|-------|-------|----------|-------|-------|
| `--kol-focus-outline-offset` | `2px` (default), `-2px` (override) | Focus | Outline offset for focus states | Can be overridden per component |

Focus mixin (`focus-outline`):
- Outline color: `--color-primary-variant`
- Outline width: `to-rem(2)`
- Border radius: `--border-radius`
- Outline offset: `var(--kol-focus-outline-offset, 2px)`

## Theme Configuration Tokens

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--theme-visibility-delay` | `0.5s` | Animation | Transition delay for visibility changes |

## Layout & Structure Tokens

| Token | Value | Usage | Context | Notes |
|-------|-------|-------|---------|-------|
| `--kol-nav-item-padding-left` | `0` | Navigation | Initial padding for nav items | Increases with nesting |
| `--kol-nav-item-padding-right` | `16` | Navigation | Right padding for nav items | |
| `--kol-nav-nested-padding-left` | `calc(var(--kol-nav-item-padding-left) + 8)` | Navigation | Nested nav item padding | Dynamically calculated |
| `--kol-table-selection-col-width` | SCSS variable | Table | Selection column width | Set via SCSS |
| `--tree-item-indentation` | `#{to-rem(20)}` | Tree | Indent per tree level | 20px indentation |

## Button Group Tokens

| Token | Value | Context | Notes |
|-------|-------|---------|-------|
| `--button-group-display` | `flex` or `grid` | Button groups | Layout mode |
| `--button-group-gap` | `#{to-rem(16)}` or `#{to-rem(32)}` | Button groups | Spacing between buttons |
| `--button-group-order` | `0` or `1` | Button groups | Order in flex/grid layout |

## Form Field Tokens

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--display` | `flex` or `grid` | Form layouts | Layout mode for form field ordering |
| `--grid-template-columns` | `1fr auto` or `auto 1fr` | Form layouts | Column structure |
| `--grid-template-rows` | `1fr auto` or `auto 1fr` | Form layouts | Row structure |

## Font Awesome Tokens

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--fa-font-solid` | `normal 900 1em/1 'Font Awesome 6 Free'` | Icons | Solid Font Awesome icons |
| `--fa-font-regular` | `normal 400 1em/1 'Font Awesome 6 Free'` | Icons | Regular Font Awesome icons |
| `--fa-font-brands` | `normal 400 1em/1 'Font Awesome 6 Brands'` | Icons | Brand Font Awesome icons |
| `--fa-animation-direction` | `reverse` | Icons | Animation direction |

## Animations & Keyframes

### Defined Keyframes

| Keyframe | Purpose | Animation |
|----------|---------|-----------|
| `@keyframes spin` | Loading spinner | Rotates from 0° to 360° |

### Transition Timing

- Focus outline offset: `200ms linear`
- Button transitions: `0.5s` (background-color, color, border-color)
- Checkbox/radio: `0.5s`

## Component-Specific Token Usage

### Input Components
- **Containers**: Use `--color-light` (bg), `--color-subtle` (border), `--border-radius`
- **Disabled**: Use `--color-mute` (bg), `--color-mute-variant` (border)
- **Focus**: Use focus-outline mixin with `--color-primary-variant`
- **Error**: Use `--color-danger` for border and text

### Buttons
- **All variants**: Leverage `--color-primary`, `--color-secondary`, `--color-danger`, `--color-light`
- **Hover**: Switch to `--color-primary-variant`
- **Text**: Use `--text-color`, `--text-background-color`, `--text-border-color`

### Links
- **Default**: `--color-primary`
- **Visited**: `--color-visited`
- **Focus**: Border using `--border-width` and `--border-radius`

### Alerts
- **Type-specific**: `--alert-accent-color` changes based on type (danger, warning, success, info, default)
- **Card variant**: Full background using accent color
- **Message variant**: Border accent only

### Forms
- **Error**: Left border (3px) in `--color-danger`
- **Labels**: Font size `to-rem(14)`, font-weight bold
- **Hints**: Uses `kol-typography-hint` mixin

## Issues & Observations

### Potential Issues

- **Hardcoded Values**: Some components use hardcoded colors instead of tokens:
  - Box shadows with `rgb(8, 35, 48, 0.24)` (should be token-based or documented)
  - Some border-radius hardcoded as `3px` in badge (inconsistent with `--border-radius`)
  - Some padding/margin use hardcoded pixel values like `to-rem(8)`, `to-rem(16)` instead of spacing token

- **Spacing Token**: The `--spacing` token is defined as `to-rem(4)` but rarely used directly. Components mostly use `to-rem(16)`, `to-rem(8)`, etc. Consider:
  - Using spacing multipliers: `calc(var(--spacing) * 4)`, `calc(var(--spacing) * 2)`
  - This is done in some places (radio/checkbox orientation gap) but inconsistent

- **Typography**: All typography properties are in mixins, not CSS variables. Consider extracting:
  - `--font-size-body`, `--font-size-h1`, etc.
  - `--line-height-body`, `--line-height-h1`, etc.
  - This would allow runtime customization

- **Focus Token Override**: The `--kol-focus-outline-offset` has a default in the mixin (`2px`) but can be overridden to `-2px`. This should be documented more clearly.

### Unused/Undocumented Tokens

- `--text-outline`: Used in button components but not clearly documented
- `--text-box-shadow`: Set but rarely used
- `--text-border-radius`: Set but mostly uses `--border-radius` instead

### Token Dependencies

Several tokens depend on others:
- `--alert-accent-color` depends on alert type (danger, warning, success, etc.)
- `--kol-nav-nested-padding-left` depends on `--kol-nav-item-padding-left`
- Button hover states override multiple `--text-*` tokens simultaneously

## Token Definition Locations

### Global Tokens (global.scss)
- All base color tokens
- Border and spacing base tokens
- Font family and size
- Default focus colors

### Component-Specific Tokens
- **Buttons** (button.scss mixin): `--text-background-color`, `--text-border-color`, `--text-color` per variant
- **Alerts** (alert.scss mixin): `--alert-accent-color` per type
- **Forms**: Various layout tokens for field ordering
- **Navigation**: Padding and indentation tokens
- **Checkboxes/Radios**: Selection input color tokens

### Computed/Calculated Tokens
- `--kol-nav-nested-padding-left`: Uses `calc()`
- Typography sizes: Converted via `to-rem()` function

## Summary Statistics

- **Color Tokens**: 12
- **Spacing/Border Tokens**: 3
- **Typography Tokens**: 6 (mixins only)
- **State Tokens**: 8+ (button variants, selections, alerts)
- **Utility Tokens**: 10+
- **Total Defined Tokens**: 40+

## Recommendations

1. **Create Spacing Scale**: Convert `--spacing` usage to multipliers for consistency
2. **Tokenize Typography**: Move font sizes from mixins to CSS variables
3. **Document Hardcoded Values**: Create tokens for `rgb(8, 35, 48, 0.24)` and other commonly repeated values
4. **Consistent Naming**: Standardize token naming (currently mixes `--color-*`, `--text-*`, `--kol-*` prefixes)
5. **Shadow Token**: Define `--shadow-default` for the commonly used box-shadow value
6. **Line Height Token**: Create `--line-height-base` and other line-height tokens
