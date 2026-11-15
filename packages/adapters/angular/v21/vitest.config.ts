import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		swc.vite({
			jsc: {
				parser: { syntax: 'typescript', decorators: true },
				target: 'es2022',
				transform: { decoratorMetadata: true, legacyDecorator: true },
			},
			module: { type: 'es6' },
		}),
	],
	test: {
		environment: 'happy-dom',
		globals: true,
		include: ['test/**/*.spec.ts'],
	},
});
