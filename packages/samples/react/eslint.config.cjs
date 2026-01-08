const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	resolvePluginsRelativeTo: __dirname,
	allConfig: js.configs.all,
});

module.exports = [
	{
		ignores: ['**/assets/**', '**/complex-form/**'],
	},
	...compat.config(require('./.eslintrc.js'))
]
