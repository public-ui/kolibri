// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'KoliBri - Public UI',
	tagline: 'The accessible Web Component Library',
	url: 'https://public-ui.github.io',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'assets/favicon.ico',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'Informationstechnikzentrum Bund (ITZBund)', // Usually your GitHub org/user name.
	projectName: 'KoliBri (Public-UI)', // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'de',
		locales: ['de'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarCollapsible: true,
					sidebarCollapsed: true,
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
					// lastVersion: 'current',
					// versions: {
					// 	current: {
					// 		label: '1.1',
					// 		path: 'v1',
					// 	},
					// },
				},
				blog: {
					blogSidebarTitle: 'Neueste Posts',
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				sitemap: {
					changefreq: 'hourly',
					priority: 0.5,
					ignorePatterns: [],
					filename: 'sitemap.xml',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'KoliBri',
				logo: {
					alt: 'KoliBri Logo',
					src: 'assets/logo.kolibri.png',
				},
				items: [
					{
						label: 'Dokumentation',
						to: '/docs/willkommen',
						position: 'left',
					},
					{ to: '/blog', label: 'Blog', position: 'left' },
					// {
					// 	href: 'https://public-ui.github.io/designer',
					// 	label: 'Designer',
					// 	position: 'left',
					// },
					// {
					// 	type: 'docsVersionDropdown',
					// 	position: 'left',
					// },
					// {
					// 	type: 'localeDropdown',
					// 	position: 'left',
					// },
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Inhalte',
						items: [
							{
								label: 'Dokumentation',
								to: '/docs/willkommen',
							},
							{
								label: 'Blog',
								to: '/blog',
							},
							{
								label: 'Impressum',
								to: '/docs/impressum',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'FAQ',
								href: 'https://github.com/public-ui/kolibri/discussions',
							},
							{
								label: 'Discord',
								href: 'https://discord.gg/7ntYFPns6b',
							},
							{
								label: 'Mastodon',
								href: 'https://social.bund.de/kolibri',
							},
						],
					},
					{
						title: 'Mehr',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/public-ui',
							},
							{
								label: 'ITZBund',
								href: 'https://itzbund.de',
							},
							{
								label: 'Portal Barrierefreiheit',
								href: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/',
							},
						],
					},
				],
				copyright: `© Informationstechnikzentrum Bund (ITZBund) 2020 - ${new Date().getFullYear()}`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			mermaid: {
				theme: {
					light: 'neutral',
					dark: 'forest',
				},
			},
		}),
	markdown: {
		mermaid: true,
	},
	plugins: [
		async () => {
			return {
				name: 'docusaurus-tailwindcss',
				configurePostCss(postcssOptions) {
					// Appends TailwindCSS and AutoPrefixer.
					postcssOptions.plugins.push(require('tailwindcss'));
					postcssOptions.plugins.push(require('autoprefixer'));
					return postcssOptions;
				},
			};
		},
		// [
		// 	// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image
		// 	'@docusaurus/plugin-ideal-image',
		// 	{
		// 		quality: 70,
		// 		max: 1030, // max resized image's size.
		// 		min: 640, // min resized image's size. if original is lower, use that size.
		// 		steps: 2, // the max number of images generated between min and max (inclusive)
		// 		disableInDev: false,
		// 	},
		// ],
		[
			// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa
			'@docusaurus/plugin-pwa',
			{
				debug: true,
				offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/img/docusaurus.png',
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.json', // your PWA manifest
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: 'rgb(37, 194, 160)',
					},
				],
			},
		],
		// 'docusaurus-plugin-sass',
	],
	themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;
