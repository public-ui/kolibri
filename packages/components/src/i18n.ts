import type { Generic } from 'adopted-style-sheets';
import { getI18nInstance } from './core/i18n';
import locale_de from './locales/de';
import locale_en from './locales/en';
import { processEnv } from './utils/reuse';

type ResourcePrefix = 'Kol';
type ComponentKeys = keyof typeof locale_de;

const mapLocaleKeys = (locale: { [K in ComponentKeys]: string }) =>
	(Object.keys(locale) as ComponentKeys[]).reduce((a, c) => ((a[`${'kol'}-${c}`] = locale[c]), a), {} as Generic.I18n.Map<ResourcePrefix, ComponentKeys>);

const translations = new Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, ResourcePrefix, ComponentKeys>>([
	(t: (language: 'en', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('en', mapLocaleKeys(locale_en)),
	(t: (language: 'de', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('de', mapLocaleKeys(locale_de)),
]);

type Options = {
	count?: number;
	placeholders?: { [K: string]: string };
};

export let translate = (key: `${Lowercase<ResourcePrefix>}-${Lowercase<ComponentKeys>}`, options?: Options) => {
	const i18n = getI18nInstance();
	let text = i18n.translate(key, options);
	if (text === key) {
		i18n.addTranslations(translations);
		text = i18n.translate(key, options);
	}
	return text;
};

if (processEnv === 'test') {
	translate = (key): string => key;
}
