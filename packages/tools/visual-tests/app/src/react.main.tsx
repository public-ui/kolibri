import { setTagNameTransformer } from '@public-ui/react-v19';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { bootstrap, getDefaultThemeName, KoliBriDevHelper } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { App, setCustomThemes } from '@public-ui/sample-react';

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

/* Visual regression testing host: the theme is always injected via the THEME_MODULE that the
   theme package provides (see the `kolibri-visual-test` invocation in each theme's `test` script).
   This app intentionally never imports a theme package itself – that is what breaks the former
   circular dependency between the themes, the visual-tests runner and the sample app. */
const getThemes = async (): Promise<Theme[]> => {
	if (!process.env.THEME_MODULE) {
		throw new Error('Environment variable THEME_MODULE not specified. The visual-tests app must be started via "kolibri-visual-test".');
	}
	if (process.env.PLATFORM === 'win32') {
		/* Add leading slash, required for ESBuild on Windows.
		   Note: process.env.THEME_MODULE must be used literally in the import(). Moving it to a constant breaks the import. */
		process.env.THEME_MODULE = `/${process.env.THEME_MODULE}`;
	}
	const { [(process.env.THEME_EXPORT as string) || 'default']: theme } = (await import(/* @vite-ignore */ process.env.THEME_MODULE)) as Record<string, Theme>;
	return [theme];
};

void (async () => {
	try {
		await bootstrap(
			await getThemes(),
			() => {
				// @see https://github.com/ionic-team/stencil/issues/2847
				defineCustomElements(window, {
					transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
				} as any);
			},
			{
				environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
				reflectInputValues: true,
				/* The theme is injected via THEME_MODULE, so auto-detection must stay disabled. */
				theme: undefined,
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
									// https://github.com/public-ui/kolibri/blob/develop/packages/components/src/locales/en.ts
									'kol-error': 'Tiny error!',
								}),
							(t) =>
								t('de', {
									// https://github.com/public-ui/kolibri/blob/develop/packages/components/src/locales/de.ts
									'kol-error': 'Kleiner Fehler!',
								}),
						])
					: undefined,
				transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
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

	/* Derive the theme key from the actually registered default theme name so it matches the
	   inject-variants JSON file exactly and the variant samples render the injected theme. */
	const defaultThemeName = getDefaultThemeName();
	const customThemes = defaultThemeName ? [{ key: defaultThemeName, name: defaultThemeName }] : undefined;
	setCustomThemes(customThemes);

	const htmlDivElement = document.querySelector('div#app');
	if (htmlDivElement instanceof HTMLDivElement) {
		const root = createRoot(htmlDivElement);
		root.render(
			<StrictMode>
				<Router>
					<App customThemes={customThemes} />
				</Router>
			</StrictMode>,
		);
	}
})();
