import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import globals from 'globals';

export default [
	{ ignores: ['dist/**', 'node_modules/**'] },
	js.configs.recommended,
	{
		files: ['src/**/*.{js,mjs,cjs}'],
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					babelrc: false,
					configFile: false,
					plugins: ['@babel/plugin-syntax-import-attributes'],
					presets: ['@babel/preset-env'],
				},
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
		rules: {
			eqeqeq: 'error',
		},
	},
];
