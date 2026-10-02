import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		css: true,
		setupFiles: ['./src/test/setup.ts'],
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		testTimeout: 10000,
	},
	resolve: {
		alias: {
			'@public-ui/components': path.resolve(__dirname, '../../../packages/components'),
			// Expose the built component chunks for the test setup warm-up
			// (@public-ui/components does not export ./dist in its exports map).
			'@public-ui/components/dist': path.resolve(__dirname, '../../../packages/components/dist'),
			'@public-ui/components/loader': path.resolve(__dirname, '../../../packages/components/loader'),
		},
	},
});
