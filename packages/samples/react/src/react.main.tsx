import { setTagNameTransformer } from '@public-ui/react-v19';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { bootstrap, KoliBriDevHelper } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BWSt, DEFAULT, ECL_EC, ECL_EU, ITZBund } from '@public-ui/themes';

import { App } from './App';

import type { Generic } from 'adopted-style-sheets';

type Theme = Generic.Theming.RegisterPatch<string, string, string>;

const ENABLE_I18N_OVERWRITING =
	process.env.ENABLE_I18N_OVERWRITING === 'true' || new URL('https://x' + location.hash.substring(1)).searchParams.has('enableI18nOverwriting');

const ENABLE_THEME_PATCHING =
	process.env.ENABLE_THEME_PATCHING === 'true' || new URL('https://x' + location.hash.substring(1)).searchParams.has('enableThemePatching');

const ENABLE_TAG_NAME_TRANSFORMER =
	process.env.ENABLE_TAG_NAME_TRANSFORMER === 'true' || new URL('https://x' + location.hash.substring(1)).searchParams.has('enableTagNameTransformer');

const tagNameTransformer = (tagName: string) => `${tagName}-sample`;
if (ENABLE_TAG_NAME_TRANSFORMER) {
	setTagNameTransformer(tagNameTransformer);
}

const getThemes = async () => {
	if (process.env.THEME_MODULE) {
		/* Visual regression testing mode: Themes are overridden with a certain theme module, that should be used instead. */
		if (process.env.PLATFORM === 'win32') {
			/* Add leading slash, required for ESBuild on Windows.
			   Note: process.env.THEME_MODULE must be used literally in the import(). Moving it to a constant breaks the import. */
			process.env.THEME_MODULE = `/${process.env.THEME_MODULE}`;
		}
		const { [(process.env.THEME_EXPORT as string) || 'default']: theme } = (await import(/* @vite-ignore */ process.env.THEME_MODULE)) as Record<string, Theme>;
		return [theme];
	}

	/* List of regular sample app themes */
	return [DEFAULT, ECL_EC, ECL_EU, ITZBund, BWSt] as Theme[];
};

void (async () => {
	try {
		await bootstrap(
			await getThemes(),
			() => {
				// @see https://github.com/ionic-team/stencil/issues/2847
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				defineCustomElements(window, {
					transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
				} as any);
			},
			{
				theme: process.env.THEME_MODULE
					? undefined
					: {
							detect: 'auto',
						},
				translation: {
					name: 'en',
				},
				/**
				 * You can add your own translations here.
				 */
				translations: ENABLE_I18N_OVERWRITING
					? new Set([
							(t) =>
								t('en', {
									// https://github.com/public-ui/kolibri/blob/release/2/packages/components/src/locales/en.ts
									'kol-error': 'Tiny error!',
								}),
							(t) =>
								t('de', {
									// https://github.com/public-ui/kolibri/blob/release/2/packages/components/src/locales/de.ts
									'kol-error': 'Kleiner Fehler!',
								}),
						])
					: undefined,
				transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
				environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
			},
		);

		/**
		 * You should patch the theme after the components and your default theme are registered.
		 */
		if (ENABLE_THEME_PATCHING) {
			KoliBriDevHelper.patchTheme(
				'default',
				{
					'KOL-BUTTON': `
						button {
							border: 1px solid red;
						}`,
					'KOL-SPIN': `
						.bg-spin-2 {
							background-color: red;
						}
						.bg-spin-3 {
							background-color: gold;
						}`,
				},
				{
					append: true,
				},
			);
		}
	} catch (error) {
		console.warn('Theme registration failed:', error);
	}

	/**
	 * You should patch the theme after the components and your default theme are registered.
	 **
	 * ↓ That is a tiny sample!
	 */
	// KoliBriDevHelper.patchTheme(
	// 	'default',
	// 	{
	// 		'KOL-BUTTON': 'button{border:2px solid red;}',
	// 	},
	// 	{
	// 		append: true,
	// 	},
	// );

	const htmlDivElement = document.querySelector('div#app');
	if (htmlDivElement instanceof HTMLDivElement) {
		const root = createRoot(htmlDivElement);
		root.render(
			<StrictMode>
				<Router>
					<App />
				</Router>
			</StrictMode>,
		);
	}
})();
