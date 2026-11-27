import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { Log } from '../../schema/utils/dev.utils';
import { KolAbbr } from './component';

const SLOT_WARNING = '[KolAbbr] The slot accepts plain text only.';

const toText = (message: unknown): string => (Array.isArray(message) ? message.join(' ') : String(message));
const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const slotWarnings = (): string[] => warn.mock.calls.map(([message]) => toText(message)).filter((message) => message.includes(SLOT_WARNING));

beforeEach(() => {
	warn.mockClear();
});

afterAll(() => {
	warn.mockRestore();
});

describe('kol-abbr long form', () => {
	it('drops the focusability, the description and the tooltip when the label is removed at runtime', async () => {
		const page = await newSpecPage({
			components: [KolAbbr],
			template: () => <kol-abbr _label="for example">e.g.</kol-abbr>,
		});
		const abbr = page.root?.shadowRoot?.querySelector('abbr');

		expect(abbr?.getAttribute('tabindex')).toBe('0');
		expect(abbr?.getAttribute('aria-describedby')).toBeTruthy();
		expect(abbr?.classList.contains('kol-abbr--has-label')).toBe(true);
		expect(page.root?.shadowRoot?.querySelector('.kol-tooltip__floating')).not.toBeNull();

		(page.root as HTMLKolAbbrElement)._label = undefined;
		await page.waitForChanges();

		expect(abbr?.hasAttribute('tabindex')).toBe(false);
		expect(abbr?.hasAttribute('aria-describedby')).toBe(false);
		expect(abbr?.classList.contains('kol-abbr--has-label')).toBe(false);
		expect(page.root?.shadowRoot?.querySelector('.kol-tooltip__floating')).toBeNull();
	});
});

/* `devWarning` logs each distinct message once per test run, so the element case runs last. */
describe('kol-abbr slot content', () => {
	it('accepts plain text without a warning', async () => {
		await newSpecPage({
			components: [KolAbbr],
			template: () => <kol-abbr>e.g.</kol-abbr>,
		});

		expect(slotWarnings()).toEqual([]);
	});

	it('warns once an element is slotted, checked on slotchange', async () => {
		const page = await newSpecPage({
			components: [KolAbbr],
			template: () => <kol-abbr>e.g.</kol-abbr>,
		});
		expect(slotWarnings()).toEqual([]);

		page.root?.appendChild(page.doc.createElement('strong'));
		page.root?.shadowRoot?.querySelector('slot')?.dispatchEvent(new Event('slotchange'));

		expect(slotWarnings()).toHaveLength(1);
	});
});
