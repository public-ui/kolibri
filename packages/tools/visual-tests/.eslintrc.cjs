module.exports = {
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
	rules: {
		eqeqeq: "error",
	},
	plugins: ['no-loops'],
};
