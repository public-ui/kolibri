import { STORE } from 'adopted-style-sheets';
import { getSharedState } from './shared-state';

/**
 * Points the theme store of this bundle copy at the shared one (see `getSharedState`), so the themes
 * an application registers through `bootstrap` style the components of every bundle copy. Runs before
 * a theme is registered or applied.
 */
export const shareThemeStore = (): void => {
	STORE.A11yUi = getSharedState('themes', () => STORE.A11yUi);
};
