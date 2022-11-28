module.exports = {
	addons: [
		'@etchteam/storybook-addon-status/register',
		'@geometricpanda/storybook-addon-badges',
		// '@storybook/addon-actions',
		'@storybook/addon-a11y',
		'@storybook/addon-backgrounds',

		// https://github.com/storybookjs/storybook/issues/11442
		'@storybook/addon-docs',
		'@storybook/addon-controls',

		'@storybook/addon-jest',
		// '@storybook/addon-links',
		'@storybook/addon-toolbars',
		'storybook-addon-turbo-build',
		'@storybook/addon-viewport',
		,
		'storybook-addon-themes',
	],
	core: {
		// 	builder: '@storybook/builder-vite',
		builder: 'webpack5',
		// https://storybook.js.org/docs/react/configure/telemetry
		disableTelemetry: true, // 👈 Disables telemetry
		enableCrashReports: false, // 👈 Disables crash reports
	},
	// https://storybook.js.org/docs/react/builders/webpack
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// PWA build
		if (configType === 'PRODUCTION') {
			const path = require('path');
			const WebpackPwaManifest = require('webpack-pwa-manifest');
			const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
			const { GenerateSW } = require('workbox-webpack-plugin');
			const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');
			config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
			config.plugins.push(new GenerateSW(require(workboxConfigPath)));
		}

		// Return the altered config
		return config;
	},
	staticDirs: ['../node_modules/@public-ui/themes/assets', '../src/assets'],
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

	// https://storybook.js.org/docs/react/configure/typescript
	// typescript: {
	//   check: false,
	//   checkOptions: {},
	//   reactDocgen: 'react-docgen-typescript',
	//   reactDocgenTypescriptOptions: {
	//     shouldExtractLiteralValuesFromEnum: true,
	//     propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
	//   },
	// },
};
