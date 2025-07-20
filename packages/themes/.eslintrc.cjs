module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
       plugins: ['@typescript-eslint', 'import'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
       rules: {
               '@typescript-eslint/no-namespace': 'off',
               eqeqeq: 'error',
               'import/no-internal-modules': [
                       'error',
                       {
                               forbid: ['@public-ui/*/*'],
                       },
               ],
       },
       settings: {
               'import/resolver': {
                       typescript: {},
               },
       },
};
