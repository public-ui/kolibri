import { getThemeDetails, setThemeStyle } from '@a11y-ui/core';
import { setMode } from '@stencil/core';
import { register } from '../core';
import { Log } from '../utils/dev.utils';

// ts-prune-ignore-next
export default async (): Promise<void> => {
	setMode((elm) => {
		if (elm.shadowRoot instanceof ShadowRoot) {
			setThemeStyle(elm, getThemeDetails(elm));
		}
		return 'default';
	});

	await register([], []);

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
