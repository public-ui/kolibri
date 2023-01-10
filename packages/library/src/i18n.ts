import { Generic } from '@a11y-ui/core';
import { getI18nService, ITranslationOptions } from '@public-ui/core';
import locale_de from './locales/de.json';
import locale_en from './locales/en.json';

type ResourcePrefix = 'Kol';
type ComponentKeys = keyof typeof locale_de;

const mapLocaleKeys = (locale: { [K in ComponentKeys]: string }) =>
	(Object.keys(locale) as ComponentKeys[]).reduce((a, c) => ((a[`${'kol'}-${c}`] = locale[c]), a), {} as Generic.I18n.Map<ResourcePrefix, ComponentKeys>);

export const translations = new Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, ResourcePrefix, ComponentKeys>>([
	(t: (language: 'en', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('en', mapLocaleKeys(locale_en)),
	(t: (language: 'de', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('de', mapLocaleKeys(locale_de)),
]);

export const translate = (key: `${Lowercase<ResourcePrefix>}-${Lowercase<ComponentKeys>}`, options?: ITranslationOptions) => {
	const i18n = getI18nService();
	if (i18n === undefined) {
		console.warn('I18nService not available! Please call the global register function.');
		return key;
	}

	const text = i18n.translate(key, options);
	if (text === key) {
		console.warn('Locales not initialized! Initialize default locales automatically.');

		translations.forEach((t) =>
			t((l, t) => {
				// i18n.addResourceBundle(l, t);
				return l;
			})
		);
	}
	return text;
};
