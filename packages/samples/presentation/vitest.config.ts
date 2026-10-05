import path from 'path';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: 'happy-dom',
			css: true,
			setupFiles: ['./src/test/setup.ts'],
			include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
			testTimeout: 10000,
			// Ignoriere Stencil-interne Dateien
			exclude: ['**/node_modules/@public-ui/components/**', '**/node_modules/@stencil/core/**'],
		},
		resolve: {
			alias: {
				'@public-ui/components': path.resolve(__dirname, '../../../packages/components'),
				// Expose the built component chunks for the test setup warm-up
				// (@public-ui/components does not export ./dist in its exports map).
				'@public-ui/components/dist': path.resolve(__dirname, '../../../packages/components/dist'),
				'@public-ui/components/loader': path.resolve(__dirname, '../../../packages/components/loader'),
				'@public-ui/theme-default': path.resolve(__dirname, '../../../packages/themes/default'),
			},
		},
	}),
);
