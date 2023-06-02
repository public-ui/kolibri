import type { Component } from 'vue';
import { createApp } from 'vue';

import { ComponentLibrary } from './plugins/kolibri';
import App from './App.vue';

import './assets/codicons/codicon.css';
import 'virtual:uno.css';

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
	createApp(App as Component)
		.use(ComponentLibrary)
		.mount(htmlDivElement);
}
