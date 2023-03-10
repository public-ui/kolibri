import { Generic } from '@a11y-ui/core';
import i18next, { i18n } from 'i18next';
import { KoliBriPrefix } from '../schema';
import { KeyEnum } from '../schema/i18n-keys';

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

export type ResourceKeys = `${Lowercase<KoliBriPrefix>}-${Lowercase<keyof typeof KeyEnum>}`;

export interface II18nService {
	/**
	 * Changes resources for the specified language.
	 * @param lng the language the changes are for
	 * @param translationMap the translations of the given language to change
	 */
	change: (lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<KoliBriPrefix, keyof typeof KeyEnum>) => void;
	/**
	 * Determines a human-readable translated text for the given resource key.
	 * @param key the resource key
	 * @param options optional translation parameters
	 * @returns the translated text
	 */
	translate: (key: ResourceKeys, options?: ITranslationOptions) => string;
}

export class I18nextService implements II18nService {
	private i18next: i18n;

	constructor(
		lng: Generic.I18n.Locale.ISO_639_1,
		translations?:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, KoliBriPrefix, keyof typeof KeyEnum>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, KoliBriPrefix, keyof typeof KeyEnum>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, KoliBriPrefix, keyof typeof KeyEnum>>
	) {
		this.i18next = i18next;

		if (Array.isArray(translations)) {
			translations = new Set(translations);
		} else if (typeof translations === 'function') {
			translations = new Set([translations]);
		}

		if (!this.i18next.isInitialized) {
			void this.i18next.init({
				lng,
			});
		}

		if (translations !== undefined) {
			translations.forEach((t) =>
				t((l, t) => {
					this.addResourceBundle(l, t);
					return l;
				})
			);
		}
	}

	public translate(key: ResourceKeys, options?: ITranslationOptions) {
		return this.i18next.t(key, {
			count: options?.count,
			ns: 'kol' satisfies KoliBriPrefix,
			...options?.placeholders,
		});
	}

	public change(lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<KoliBriPrefix, keyof typeof KeyEnum>) {
		this.i18next.addResources(lng, 'kol' satisfies KoliBriPrefix, translationMap);
	}

	private addResourceBundle(lng: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<KoliBriPrefix, keyof typeof KeyEnum>) {
		this.i18next.addResourceBundle(lng, 'kol' satisfies KoliBriPrefix, translationMap, true);
	}
}
