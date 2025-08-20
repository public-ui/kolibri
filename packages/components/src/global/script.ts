import { getThemeDetails, setThemeStyle } from 'adopted-style-sheets';

import { setMode } from '@stencil/core';

export default () => {
	setMode((elm) => {
		try {
			if (elm.shadowRoot instanceof ShadowRoot) {
				setThemeStyle(elm, getThemeDetails(elm));
			}
		} catch (error) {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
		return 'default';
	});

	// DevTools disabled to prevent E2E test timeouts
	// The devtools initialization was causing blocking DOM operations during page.setContent()
	// TODO: Implement environment-aware devtools loading that doesn't block component initialization
};
