import { getThemeDetails, register, setThemeStyle } from '@a11y-ui/core';
import { setMode } from '@stencil/core';
import { ITZBund, ECL_EC, ECL_EU } from '@public-ui/themes';

// ts-prune-ignore-next
export default (): void => {
	register([ITZBund, ECL_EC, ECL_EU], []).catch(console.warn);
	setMode((elm) => {
		if (elm.shadowRoot instanceof ShadowRoot) {
			setThemeStyle(elm, getThemeDetails(elm));
		}
		return 'default';
	});
};
