import { describe, expect, it } from '@jest/globals';

import locale_de from '../locales/de';
import locale_en from '../locales/en';
import { initializeI18n } from './i18n';

const defaultTexts = (locale: Record<string, string>) => Object.entries(locale).map(([key, text]) => [`kol-${key}`, text]);

describe('initializeI18n', () => {
	it('provides the default texts without translations', () => {
		const i18n = initializeI18n('de');

		for (const [key, text] of defaultTexts(locale_de)) {
			expect(i18n.translate(key)).toBe(text);
		}
	});

	it('overrides a single default text and keeps all other default texts', () => {
		const i18n = initializeI18n('de', new Set([(t) => t('de', { 'kol-filename-text': 'Datei auswählen' })]));

		for (const [key, text] of defaultTexts(locale_de)) {
			expect(i18n.translate(key)).toBe(key === 'kol-filename-text' ? 'Datei auswählen' : text);
		}

		i18n.setLanguage('en');
		for (const [key, text] of defaultTexts(locale_en)) {
			expect(i18n.translate(key)).toBe(text);
		}
	});
});
