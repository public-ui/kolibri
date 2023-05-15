import { Plugin } from 'vue';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { ITZBund } from '@public-ui/themes';

export const ComponentLibrary: Plugin = {
	install() {
		register(ITZBund, defineCustomElements)
			.then(() => console.log('Components registered'))
			.catch(console.warn);
	},
};
