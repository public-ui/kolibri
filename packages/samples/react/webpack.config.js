const webpack = require('webpack');

module.exports = (...args) => {
	const config = require('@leanup/stack-react/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;
	const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
	config.plugins.push(UnoCSS());
	config.plugins.push(
		new webpack.EnvironmentPlugin({
			THEME_MODULE: '',
			THEME_EXPORT: '',
			ENABLE_TAG_NAME_TRANSFORMER: '',
			BUILD_DATE: new Date().toISOString(),
			COMMIT_HASH: commitHash,
		}),
	);
	delete config.devServer.proxy;
	return config;
};
