const webpack = require('webpack');

module.exports = (...args) => {
	const config = require('@leanup/stack-react/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;
	config.plugins.push(UnoCSS());
	config.plugins.push(
		new webpack.EnvironmentPlugin({
			THEME_MODULE: '',
			THEME_EXPORT: '',
		}),
	);
	return config;
};
