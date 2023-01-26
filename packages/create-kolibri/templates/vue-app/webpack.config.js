module.exports = (...args) => {
	const config = require('@leanup/stack-vue3/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;
	config.plugins.push(UnoCSS());
	return config;
};