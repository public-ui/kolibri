import './assets/main.css';
import './assets/codicons/codicon.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import { ComponentLibrary } from './plugins/kolibri';

const app = createApp(App);

app.use(createPinia());
app.use(ComponentLibrary);

app.mount('#app');
