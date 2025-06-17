import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default compat.config({
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jsdoc/recommended',
		'plugin:json/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	plugins: ['html', 'react'],
	settings: {
		react: {
			version: 'detect',
		},
	},
});
