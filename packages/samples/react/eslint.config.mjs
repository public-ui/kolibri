import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const require = createRequire(import.meta.url);
const base = require('@leanup/stack/.eslintrc');
const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default [
	...compat.config(base),
	...compat.config({
		parserOptions: { tsconfigRootDir: __dirname },
		overrides: [
			{
				extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
				files: ['**/*.tsx'],
				parserOptions: {
					ecmaFeatures: { jsx: true },
				},
                                rules: {
                                        '@typescript-eslint/consistent-type-imports': 'error',
                                        '@typescript-eslint/no-unsafe-member-access': 'off',
                                        'react/no-unused-state': 'error',
                                },
			},
		],
		plugins: ['react', 'jsx-a11y'],
		settings: {
			react: { version: 'detect' },
		},
	}),
];
