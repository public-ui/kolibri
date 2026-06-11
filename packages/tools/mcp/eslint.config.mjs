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
		files: ['test/**/*.{js,mjs,ts}'],
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
