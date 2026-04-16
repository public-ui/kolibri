# CSS

## Structure

### Components

- every component has a style.scss with its basic definitions
  - component styles have to be wrapped in `@layer kol-component`
  - styles.scss is importet in its corresponding shadow.tsx
- components that are part of other components have their styles in the @shared folder
  - here no layer is used, just plain `@mixin componentName`
  - in this cases the component file (e.g. alert/style.scss) just includes the mixin (e.g. \_alert.scss)
  - every component has to `@include` the styles of every containing component (e.g. icon has to be included in buttons, paging, etc.)
- the following styles are prohibited in the component package:
  - margin
  - padding
  - gap
  - opacity
  - color (with the exception of black & white)
- generally speaking use block display types on the top layer of components (e.g. kol-card uses grid not inline-grid) so it uses the whole given width of its wrapper and the teams can control the width of the components

### Themes

- every (needed) component has a file with its name (e.g. alert.scss) in /src/components
  - component styles have to be wrapped in `@layer kol-theme-component`
  - all styles are imported in /src/components/index.ts
- components that are part of other components have their styles in the @shared folder
  - here no layer is used, just plain `@mixin componentName`
  - in this cases the component file (e.g. alert.scss) just includes the mixin (e.g. \_alert.scss)
  - every component has to @include the styles of every containing component (e.g. icon has to be included in buttons, paging, etc.)
- all styles are allowed

## Units

- Generally 'rem' is used
- Exceptions:
  - `px` for: `border-width`, `border-radius`, `box-shadow`, `outline-width` (these do not scale well, and don't need to)
  - `px` for media-queries
  - Relative units (`%`, `vw`, etc.) can be used where they make sense (e.g. layout)
  - For line-heights, unit-less values are used (e.g. `1`, `1.2`)

When defining `rem` values within KoliBri, always use the provided Sass function:

```
@import '@shared/mixins';
font-size: to-rem(16);
```

This ensures that the passed value always equals to the same number in pixels for default browser settings.

When a project uses a different root font-size than `16px`, this can be configured using a CSS custom property and will be taken into account:

```
html {
  font-size: 65.5%; /* Equals 10px */
  --kolibri-root-font-size: 10;
}
```

[Background reading and code samples](https://github.com/public-ui/kolibri/issues/5517#issuecomment-1936385755)

## BEM

For CSS Selectors, we follow the [BEM pattern](https://getbem.com/introduction/).

When writing stylesheets, always follow the order: **Block, Elements, Modifiers** and utilize SCSS nesting:

```scss
.kol-mycomponent {
	&--primary {
	}

	&--card {
	}

	&__close-button {
		&--hidden-label {
		}
	}
}
```

When you need to combine modifiers, please us CSS properties.  
In the following example, we wan't a different styling for the _Close-Button-Element_ when the component itself has the _card_-Modifier:

CSS Custom Properties (✨ Preferred):

```scss
.kol-mycomponent {
	--button-color: black;

	&--card {
		--button-color: lightgray;
	}

	&__close-button {
		color: var(--button-color);
	}
}
```

Avoid - @root to combine selectors:
Negative example (⛔️ Avoid!):

```scss
.kol-mycomponent {
	$root: &;

	&__close-button {
		@at-root #{$root}--card & {
			align-self: flex-end;
		}
	}
}
```

Avoid deep nesting and stick to the order (Block, Elements, Modifiers) where possible.  
Negative example (⛔️ Avoid!):

```scss
.kol-mycomponent {
	&--card {
		.kol-mycomponent__close-button {
			align-self: flex-end;
		}
	}
}
```

### Exceptions

Global utility classes such as `visually-hidden` may be used and don't need to follow the BEM convention.

> [!TIP]
> Use the [Sass Playground](https://sass-lang.com/playground/) to fiddle with tricky SCSS-Selectors.
