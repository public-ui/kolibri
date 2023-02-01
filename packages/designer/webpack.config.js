module.exports = (...args) => {
	const config = require('@leanup/stack-solid/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;
	const openBrowser = require('react-dev-utils/openBrowser');
	const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

	// if (args[0].WEBPACK_BUILD) {
	// 	const path = require('path');
	// 	const WebpackPwaManifest = require('webpack-pwa-manifest');
	// 	const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
	// 	const { GenerateSW } = require('workbox-webpack-plugin');
	// 	const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');
	// 	config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
	// 	config.plugins.push(new GenerateSW(require(workboxConfigPath)));
	// }

	config.plugins.push(UnoCSS());
	config.plugins.push(new MonacoWebpackPlugin());

	config.devServer = {
		...config.devServer,
		// onListening: (devServer) => {
		// 	if (devServer) {
		// 		const address = devServer.server.address();
		// 		openBrowser(`http://${config.devServer.host}:${address.port}`);
		// 	}
		// },
	};

	return config;
};
