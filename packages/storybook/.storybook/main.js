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
