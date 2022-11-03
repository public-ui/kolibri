module.exports = (...args) => {
	const config = require('@leanup/stack-solid/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;
	config.plugins.push(UnoCSS());
	return config;
};
