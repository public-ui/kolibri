import type { Generic } from 'adopted-style-sheets';

/**
 * Issue #2456: Don't use json files
 * - https://github.com/public-ui/kolibri/issues/2456
 * - use instead ts files
 */
import { devHint } from '@public-ui/schema';

import locale_de from './locales/de';
import locale_en from './locales/en';
import { getI18nService } from './core/i18n';

type ResourcePrefix = 'Kol';
type ComponentKeys = keyof typeof locale_de;

const mapLocaleKeys = (locale: { [K in ComponentKeys]: string }) =>
	(Object.keys(locale) as ComponentKeys[]).reduce((a, c) => ((a[`${'kol'}-${c}`] = locale[c]), a), {} as Generic.I18n.Map<ResourcePrefix, ComponentKeys>);

export const translations = new Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, ResourcePrefix, ComponentKeys>>([
	(t: (language: 'en', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('en', mapLocaleKeys(locale_en)),
	(t: (language: 'de', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('de', mapLocaleKeys(locale_de)),
]);

type Options = {
	count?: number;
	placeholders?: { [K: string]: string };
};

export const translate = (key: `${Lowercase<ResourcePrefix>}-${Lowercase<ComponentKeys>}`, options?: Options) => {
	const i18n = getI18nService();
	if (i18n === undefined) {
		devHint('[I18n] I18nService not available! Please call the global register function.');
		return key;
	}

	let text = i18n.translate(key, options);
	if (text === key) {
		devHint('[I18n] Locales not initialized! Initialize default locales automatically.');

		translations.forEach((t) =>
			t((l, t) => {
				i18n.addResourceBundle(l, t);
				return l;
			})
		);

		text = i18n.translate(key, options);
	}
	return text;
};
