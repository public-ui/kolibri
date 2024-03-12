import i18next from 'i18next';

import type { Generic } from 'adopted-style-sheets';

interface ITranslationOptions {
	/**
	 * The number of items to determine an counted text.
	 */
	count?: number;

	/**
	 * Placeholders to insert into the text. Replacing {{key}} with the specified value if the "key".
	 */
	placeholders?: { [K: string]: string };
}

export class I18nextService {
	private static instance: I18nextService;
	private static namespace = 'KoliBri';
	private _initialized = false;

	get initialized() {
		return this._initialized;
	}

	private constructor() {}

	public static async getInstance(lng?: Generic.I18n.Locale.ISO_639_1): Promise<I18nextService> {
		if (I18nextService.instance instanceof I18nextService) {
			return I18nextService.instance;
		}
		I18nextService.instance = new I18nextService();

		if (!i18next.isInitialized) {
			// https://www.i18next.com/overview/api#init
			await i18next.init({
				ns: [I18nextService.namespace],
				lng: lng ?? 'de',
			});
		} else {
			// https://www.i18next.com/overview/api#loadnamespaces
			await i18next.loadNamespaces(I18nextService.namespace);
		}

		return I18nextService.instance;
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
					i18next.addResourceBundle(l, I18nextService.namespace, t, true);
					return l;
				}),
			);
		}
	}

	/**
	 * Set the current language.
	 * @param lng the language the bundle is for
	 */
	public async setLanguage(lng: Generic.I18n.Locale.ISO_639_1) {
		await i18next.changeLanguage(lng);
	}

	/**
	 * Determines a human-readable translated text for the given resource key.
	 * @param key the resource key
	 * @param options optional translation parameters
	 * @returns the translated text
	 */
	public translate(key: string, options?: ITranslationOptions) {
		return i18next.t(key, {
			ns: I18nextService.namespace,
			count: options?.count,
			...options?.placeholders,
		});
	}
}

let i18n: I18nextService;

export const getI18nInstance = () => {
	if (!(i18n instanceof I18nextService)) {
		throw new Error('i18n not initialized yet');
	}
	return i18n;
};

export const initI18n = async (lng?: Generic.I18n.Locale.ISO_639_1): Promise<I18nextService> => {
	i18n = await I18nextService.getInstance(lng);
	return i18n;
};

export const configI18n = async (
	lng: Generic.I18n.Locale.ISO_639_1,
	translations?:
		| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>
		| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>[]
		| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>>,
) => {
	await initI18n(lng);
	i18n.addTranslations(translations);
};
