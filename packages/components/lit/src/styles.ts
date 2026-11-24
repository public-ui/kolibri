import { css, unsafeCSS, type CSSResultGroup } from 'lit';
import a11yCss from './styles/a11y.css?raw';
import buttonBaseCss from './styles/button-base.css?raw';
import themeButtonCss from './styles/theme-button.css?raw';
import themeGlobalCss from './styles/theme-global.css?raw';

/**
 * The style layers of the Lit spike element, in the order the 5-layer model defines them:
 *
 * 1. `a11y.scss` — the a11y preset layer (`kol-a11y`), which the Stencil build bundles into
 *    every component entry.
 * 2. `button/style.scss` — the base component layer (`kol-component`), including the base
 *    global layer via `@shared/global`.
 * 3. the theme global layer (`kol-theme-global`), compiled from `packages/themes/default/src/global.scss`.
 * 4. the theme component layer (`kol-theme-component`), compiled from `packages/themes/default/src/components/button.scss`.
 *
 * In the Stencil runtime, layers 3–4 are attached per element by `adopted-style-sheets` from the
 * registered theme patch; the spike attaches the same CSS strings statically, so both elements
 * end up with the same stylesheet set.
 */
export const buttonLitStyles: CSSResultGroup = [
	css`
		${unsafeCSS(a11yCss)}
	`,
	css`
		${unsafeCSS(buttonBaseCss)}
	`,
	css`
		${unsafeCSS(themeGlobalCss)}
	`,
	css`
		${unsafeCSS(themeButtonCss)}
	`,
];
