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
	env: {
		es6: true,
		node: true,
	},
	root: true,
	extends: ['eslint:recommended'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			babelrc: false,
			configFile: false,
			plugins: ['@babel/plugin-syntax-import-attributes'],
			presets: ['@babel/preset-env'],
		},
		requireConfigFile: false,
	},
});
