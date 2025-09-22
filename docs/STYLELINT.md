# Stylelint Configuration

## Overview

The Stylelint configuration has been centralized to reduce maintenance overhead and ensure consistent code quality across all packages.

## Structure

```text
lib/
├── .stylelintrc.json         # Central Stylelint configuration
├── .stylelintignore          # Central ignore rules
└── packages/
    ├── components/
    │   └── .stylelintrc.json # Extends the central configuration
    ├── themes/
    │   ├── default/
    │   │   └── .stylelintrc.json
    │   └── ecl/
    │       └── .stylelintrc.json
    └── samples/
        └── react/
            └── .stylelintrc.json
```

## Central Configuration

The central configuration (`.stylelintrc.json` in the root) contains:

- **Extends**: `stylelint-config-standard`, `stylelint-config-recommended-scss`
- **Plugins**: `stylelint-scss`, `stylelint-order`
- **Supported file types**: CSS (`.css`), SCSS (`.scss`)
- **Rules**:
  - BEM CSS naming conventions
  - SCSS-specific rules
  - CSS property ordering by groups:
    - Custom Properties (`--*`)
    - Composite (Transform, Opacity, etc.)
    - Paint (Color, Background, Border, etc.)
    - Layout/Geometry (Display, Position, Sizing, etc.)
    - Everything (Font, Text, etc.)

## Package-specific Configurations

Each package extends the central configuration:

```json
{
	"extends": ["../../.stylelintrc.json"]
}
```

This enables:

- Uniform rules for all packages
- Possibility for package-specific customizations
- Easy maintenance of the central configuration

## Dependencies

The required Stylelint packages are installed as devDependencies in the root `package.json`:

- `stylelint@16.20.0`
- `stylelint-config-recommended-scss@15.0.1`
- `stylelint-config-standard@38.0.0`
- `stylelint-order@7.0.0`
- `stylelint-scss@6.12.1`

## Usage

### Running linting

```bash
# In a specific package
cd packages/components
pnpm lint:stylelint

# Or across all packages
pnpm -r lint:stylelint
```

### Using auto-fix

```bash
# Automatically fix CSS property ordering for all supported file types
npx stylelint "src/**/*.{css,scss}" --fix

# Or for specific file types
npx stylelint "src/**/*.css" --fix
npx stylelint "src/**/*.scss" --fix
```

## Benefits of Centralization

1. **Reduced maintenance overhead**: Changes only need to be made in one place
2. **Consistency**: All packages use the same rules
3. **Easy updates**: Stylelint versions and rules can be managed centrally
4. **Better maintainability**: Less duplication of configuration files

## CSS Property Ordering

The configuration enforces a specific order of CSS properties:

1. **Custom Properties** (`--variable`)
2. **Composite Properties** (Transform, Opacity, etc.)
3. **Paint Properties** (Colors, Backgrounds, Borders)
4. **Layout/Geometry** (Display, Position, Sizing)
5. **Everything Else** (Typography, Content)

This improves readability and consistency of CSS code.

## CSS Custom Properties and SASS Variables

Custom properties (`--*`) remain in the global CSS cascade, even inside a Shadow DOM.
Use them sparingly and prefix them clearly for values that external themes should override.
For internal calculations prefer SASS variables so that unused properties do not leak and collide
with variables from host applications.
