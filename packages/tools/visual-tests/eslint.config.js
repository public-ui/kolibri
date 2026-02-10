import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{js,mjs}'],
		languageOptions: {
			parser: babelParser,
			globals: globals.node,
			parserOptions: {
				babelOptions: {
					babelrc: false,
					configFile: false,
					plugins: ['@babel/plugin-syntax-import-attributes'],
					presets: ['@babel/preset-env'],
				},
				requireConfigFile: false,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
];
