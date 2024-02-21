import type { Generic } from 'adopted-style-sheets';
import i18next from 'i18next';

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

export interface II18nService {
	/**
	 * Adds a resource bundle for the specified language.
	 * @param lng the language the bundle is for
	 * @param translationMap the translations of the given language
	 */
	addResourceBundle: (lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<string, string>) => void;
	/**
	 * Determines a human-readable translated text for the given resource key.
	 * @param key the resource key
	 * @param options optional translation parameters
	 * @returns the translated text
	 */
	translate: (key: string, options?: ITranslationOptions) => string;
}

export class I18nextService implements II18nService {
	private static instance: II18nService;
	private static namespace = 'KoliBri';

	private constructor() {}

	public static async createInstance(
		lng: Generic.I18n.Locale.ISO_639_1,
		translations?:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>>,
	): Promise<II18nService> {
		if (Array.isArray(translations)) {
			translations = new Set(translations);
		} else if (typeof translations === 'function') {
			translations = new Set([translations]);
		}

		I18nextService.instance = new I18nextService();

		if (!i18next.isInitialized) {
			await i18next.init({
				ns: [I18nextService.namespace],
				lng,
			});
		} else {
			await i18next.loadNamespaces(I18nextService.namespace);
		}

		if (translations !== undefined) {
			translations.forEach((t) =>
				t((l, t) => {
					I18nextService.instance.addResourceBundle(l, t);
					return l;
				}),
			);
		}

		return this.instance;
	}

	public static addResourceBundle(lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<string, string>) {
		i18next.addResourceBundle(lng, I18nextService.namespace, translationMap, true);
	}

	public addResourceBundle(lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<string, string>) {
		I18nextService.addResourceBundle(lng, translationMap);
	}

	public translate(key: string, options?: ITranslationOptions) {
		return i18next.t(key, {
			ns: I18nextService.namespace,
			count: options?.count,
			...options?.placeholders,
		});
	}
}
