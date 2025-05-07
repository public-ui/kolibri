import { Log } from '../schema';

import('./devtools')
	.then((devTools) => {
		if (typeof devTools === 'object' && devTools !== null && typeof devTools.initialize === 'function') {
			devTools.initialize();
		}
	})
	.catch((error) => {
		Log.error(error);
	});
