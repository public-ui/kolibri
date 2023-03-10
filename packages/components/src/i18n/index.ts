import { Generic } from '@a11y-ui/core';
import { getI18nService } from '../core';
import { KoliBri } from "../schema";
/**
 * Issue #2456: Don't use json files
 * - https://github.com/public-ui/kolibri/issues/2456
 * - use instead ts files
 */
import locale_de from './locales/de';
import locale_en from './locales/en';
import { devHint } from '../utils/a11y.tipps';
import { KeyEnum } from '../schema/i18n-keys';
import { ResourceKeys } from './service';

export const translations = new Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, "kol", keyof typeof KeyEnum>>([
	KoliBri.createTranslation("en", locale_en),
	KoliBri.createTranslation("de", locale_de)
]);

type Options = {
	count?: number;
	placeholders?: { [K: string]: string };
};

export const translate = (key: ResourceKeys, options?: Options) => {
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
