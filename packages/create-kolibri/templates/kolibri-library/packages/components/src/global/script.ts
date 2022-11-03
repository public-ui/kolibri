// import 'construct-style-sheets-polyfill';

import { getThemeDetails, register, setThemeStyle } from '@public-ui/core';
import { setMode } from '@stencil/core';
import { BMF } from '@public-ui/themes';

// ts-prune-ignore-next
export default (): void => {
	setMode((elm) => {
		if (elm.shadowRoot instanceof ShadowRoot) {
			setThemeStyle(elm, getThemeDetails(elm));
		}
		return 'default';
	});

	register([BMF], () => {
		return new Promise((resolve) => resolve());
	}).catch(console.warn);
};
