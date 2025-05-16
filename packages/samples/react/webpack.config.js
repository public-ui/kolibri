const webpack = require('webpack');

/**
 * @returns {null|string}
 */
function getGitCommitHash() {
	try {
		return require('child_process').execSync('git rev-parse --short HEAD 2>/dev/null').toString().trim();
	} catch (e) {
		return null;
	}
}

module.exports = (...args) => {
	const config = require('@leanup/stack-react/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;

	config.plugins.push(UnoCSS());
	config.plugins.push(
		new webpack.EnvironmentPlugin({
			THEME_MODULE: '',
			THEME_EXPORT: '',
			ENABLE_I18N_OVERWRITING: '',
			ENABLE_TAG_NAME_TRANSFORMER: '',
			ENABLE_THEME_PATCHING: '',
			BUILD_DATE: new Date().toISOString(),
			COMMIT_HASH: getGitCommitHash(),
		}),
	);
	delete config.devServer.proxy;
	return config;
};
