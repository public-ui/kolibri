import { createApp } from 'vue';
import { DEFAULT } from '@public-ui/themes';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import App from './App.vue';

register(DEFAULT, defineCustomElements)
	.then(() => {
		createApp(App).mount('#app');
	})
	.catch(() => {
		/* Handle errors */
	});
