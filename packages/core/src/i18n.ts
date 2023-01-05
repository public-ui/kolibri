import { Generic } from '@a11y-ui/core';
import i18next from 'i18next';

interface IOptional {
	/**
	 * The number of items to determine an counted text.
	 */
	count?: number;
}

export interface II18nService {
	/**
	 * Determines a human-readable translated text for the given resource key.
	 * @param key the resource key
	 * @param optional optional parameters
	 * @returns the translated text
	 */
	translate: (key: string, optional?: IOptional) => string;
}

export class I18nextService implements II18nService {
	constructor(
		lng: Generic.I18n.Locale.ISO_639_1,
		translations?:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, string, string>>
	) {
		if (Array.isArray(translations)) {
			translations = new Set(translations);
		} else if (typeof translations === 'function') {
			translations = new Set([translations]);
		}

		if (!i18next.isInitialized) {
			void i18next.init({
				lng,
			});
		}

		const patchTranslation = (language: Generic.I18n.Locale.ISO_639_1, translationMap: Generic.I18n.Map<string, string>) => {
			i18next.addResources(language, 'base', translationMap);
			return language;
		};

		if (translations !== undefined) {
			translations.forEach((t) => t(patchTranslation));
		}
	}

	public translate(key: string, optional?: IOptional) {
		return i18next.t(key, {
			count: optional?.count,
		});
	}
}
