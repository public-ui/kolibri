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
		/*
		 * The loader prints the KoliBri banner while the elements are defined. A console log pending
		 * over the worker RPC during teardown fails the run (EnvironmentTeardownError), so the banner
		 * is dropped instead of forwarded.
		 */
		onConsoleLog(log: string) {
			return log.includes('The accessible HTML-Standard') ? false : undefined;
		},
	},
});
