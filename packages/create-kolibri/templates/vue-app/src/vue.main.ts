import type { Component } from 'vue';
import { createApp } from 'vue';

import { ComponentLibrary } from './vue.plugin';
import App from './components/App.vue';

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  createApp(App as Component)
    .use(ComponentLibrary)
    .mount(htmlDivElement);
}
