import { globals, jsonPlugin, nodeConfig, typescriptConfig } from '@public-ui/eslint-config';

export default [
	...nodeConfig(),
	...typescriptConfig({
		tsconfigRootDir: import.meta.dirname,
		files: ['src/**/*.ts'],
		globals: globals.node,
		typeChecked: true,
	}),
	...nodeConfig({
		// Test sources are plain JS/MJS; the default (Espree) parser cannot read `.ts`.
		files: ['test/**/*.{js,mjs}'],
		rules: {
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	}),
	{
		files: ['**/*.json'],
		plugins: { json: jsonPlugin },
		rules: jsonPlugin.configs.recommended.rules,
	},
];
