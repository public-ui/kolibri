import type { Generic } from 'adopted-style-sheets';
import locale_de from '../locales/de';
import locale_en from '../locales/en';

export type ResourcePrefix = 'Kol';
export type ComponentKeys = keyof typeof locale_de;

const mapLocaleKeys = (locale: { [K in ComponentKeys]: string }) =>
	(Object.keys(locale) as ComponentKeys[]).reduce((a, c) => ((a[`${'kol'}-${c}`] = locale[c]), a), {} as Generic.I18n.Map<ResourcePrefix, ComponentKeys>);

const TRANSLATIONS = new Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, ResourcePrefix, ComponentKeys>>([
	(t: (language: 'en', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('en', mapLocaleKeys(locale_en)),
	(t: (language: 'de', translationMap: Generic.I18n.Map<ResourcePrefix, ComponentKeys>) => Generic.I18n.Locale.ISO_639_1) => t('de', mapLocaleKeys(locale_de)),
]);

interface ITranslationOptions {
	/**
	 * Placeholders to insert into the text. Replacing {{key}} with the specified value if the "key".
	 */
	placeholders?: { [K: string]: string };
}

// String.replaceAll should be used but is only available with ECMAScript 2021.
const replaceAll = function (text: string, search: string, replacement: string) {
	return text.split(search).join(replacement);
};

type Resources = Map<string, string>;

class I18nService {
	private resourceMap = new Map<Generic.I18n.Locale.ISO_639_1, Resources>();
	language: Generic.I18n.Locale.ISO_639_1;

	public constructor(initialLanguage?: Generic.I18n.Locale.ISO_639_1) {
		this.language = initialLanguage ?? 'de';
	}

	/**
	 * Adds a resource bundle for the specified language.
	 * @param lng the language the bundle is for
	 * @param translationMap the translations of the given language
	 */
	public addTranslations(
		translations?:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>>,
	) {
		if (Array.isArray(translations)) {
			translations = new Set(translations);
		} else if (typeof translations === 'function') {
			translations = new Set([translations]);
		}

		if (translations !== undefined) {
			translations.forEach((t) =>
				t((l, t) => {
					let resources = this.resourceMap.get(l);
					if (!resources) {
						resources = new Map<string, string>();
						this.resourceMap.set(l, resources);
					}

					Object.entries(t).forEach(([k, v]) => {
						if (v) {
							resources.set(k, v);
						}
					});
					return l;
				}),
			);
		}
	}

	/**
	 * Set the current language.
	 * @param lng the language the bundle is for
	 */
	public setLanguage(lng: Generic.I18n.Locale.ISO_639_1) {
		this.language = lng;
	}

	/**
	 * Determines a human-readable translated text for the given resource key.
	 * @param key the resource key
	 * @param options optional translation parameters
	 * @returns the translated text
	 */
	public translate(key: string, options?: ITranslationOptions) {
		let result = this.resourceMap.get(this.language)?.get(key);
		if (result) {
			if (options?.placeholders) {
				Object.entries(options.placeholders).forEach(([k, v]) => {
					result = replaceAll(result!, `{{${k}}}`, v);
				});
			}
		} else {
			result = key;
		}
		return result;
	}
}

/**
 * The runtime is bundled per output target: the lazy loader, the custom-elements build and the root
 * entry each carry their own copy of this module. The initialized service is mirrored through this
 * global slot so every bundle copy translates with the language and translations the application
 * registered through bootstrap.
 */
type I18nGlobals = { i18n?: I18nService };

const readSharedI18n = (): I18nService | undefined => (globalThis as { KoliBriGlobals?: I18nGlobals }).KoliBriGlobals?.i18n;

let i18n: I18nService;

export const getI18nInstance = () => {
	// The shared instance wins over the bundle-local one: a translate call that runs before bootstrap
	// seeds the bundle-local instance with the fallback language and would otherwise pin every later
	// translate call of this bundle copy to it.
	return readSharedI18n() ?? i18n;
};

export const initializeI18n = (
	lng: Generic.I18n.Locale.ISO_639_1,
	translations:
		| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>
		| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>[]
		| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>> = TRANSLATIONS,
) => {
	i18n = new I18nService(lng);
	i18n.addTranslations(translations);
	((globalThis as { KoliBriGlobals?: I18nGlobals }).KoliBriGlobals ??= {}).i18n = i18n;
	return i18n;
};
