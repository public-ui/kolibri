import { createApp } from 'vue'

import App from './App.vue'

import { ComponentLibrary } from './plugins/kolibri'

const app = createApp(App)

app.use(ComponentLibrary)

app.mount('#app')
