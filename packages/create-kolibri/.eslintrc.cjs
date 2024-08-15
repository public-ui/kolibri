module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'commonjs',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		eqeqeq: "error",
	},
};
