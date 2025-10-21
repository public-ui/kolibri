const organizeImportsPlugin = require.resolve('prettier-plugin-organize-imports');

module.exports = {
	plugins: [organizeImportsPlugin],
	printWidth: 160,
	singleQuote: true,
	useTabs: true,
};
