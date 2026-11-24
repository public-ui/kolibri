import { describe, expect, it } from '@jest/globals';
import locale_de from './de';
import locale_en from './en';

describe.each([
	['de', locale_de],
	['en', locale_en],
])('default texts (%s)', (_, locale: Record<string, string>) => {
	it('do not end with an ellipsis', () => {
		const truncatedLooking = Object.entries(locale).filter(([, text]) => /(\.\.\.|…)$/.test(text.trim()));

		expect(truncatedLooking).toEqual([]);
	});
});
