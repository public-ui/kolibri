import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

/* The review page is deployed to gh-pages under visual/ next to the per-pull-request folders
   visual/pr-<n>/ it reads. Relative asset paths keep it independent of the host path. */
export default defineConfig({
	root: __dirname,
	base: './',
	plugins: [react()],
	build: {
		emptyOutDir: true,
		sourcemap: true,
	},
	server: {
		port: 9292,
	},
});
