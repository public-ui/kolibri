import { getThemeDetails, setThemeStyle } from 'adopted-style-sheets';

import { setMode } from '@stencil/core';
import { Log } from '../schema';

export default () => {
	setMode((elm) => {
		try {
			if (elm.shadowRoot instanceof ShadowRoot) {
				setThemeStyle(elm, getThemeDetails(elm));
			}
		} catch {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
		return 'default';
	});

	import('./devtools')
		.then((devTools) => {
			if (typeof devTools === 'object' && devTools !== null && typeof devTools.initialize === 'function') {
				devTools.initialize();
			}
		})
		.catch((error) => {
			Log.error(error);
		});
};
