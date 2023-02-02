import { Plugin } from 'vue';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/core';
import { DEFAULT } from '@public-ui/themes';

export const ComponentLibrary: Plugin = {
	install() {
		register(DEFAULT, defineCustomElements)
			.then(() => console.log('Components registered'))
			.catch(console.warn);
	},
};
