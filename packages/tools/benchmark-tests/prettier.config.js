const sortImportsPlugin = require.resolve('prettier-plugin-sort-imports');

module.exports = {
	plugins: [sortImportsPlugin],
	printWidth: 160,
	singleQuote: true,
	useTabs: true,
};
