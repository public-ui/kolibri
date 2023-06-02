import { fileURLToPath, URL } from 'node:url';
import UnoCSS from 'unocss/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		exclude: ['@public-ui/components'],
	},
	plugins: [UnoCSS(), vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 3000,
	},
});
