import * as components from '@public-ui/react';

Object.entries(components).forEach(([name, component]) => {
	window[name] = component;
});
