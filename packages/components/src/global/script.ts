import { setMode } from '@stencil/core';
import { getThemeDetails, setThemeStyle } from 'adopted-style-sheets';
import { Log } from '../utils/dev.utils';
import { processEnv } from '../utils/reuse';

setMode((elm) => {
	if (elm.shadowRoot instanceof ShadowRoot) {
		setThemeStyle(elm, getThemeDetails(elm));
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

/* Import scripts necessary for the development server, i.e. the /dev/*.html files. Only include in development environment. */
if (processEnv) {
	import('../dev');
}
