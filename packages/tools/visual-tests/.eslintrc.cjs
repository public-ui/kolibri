module.exports = {
	env: {
		node: true,
	},
	root: true,
	extends: ['eslint:recommended'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			babelrc: false,
			configFile: false,
			// your babel options
			presets: ['@babel/preset-env'],
		},
	},
	plugins: ['no-loops'],
};
