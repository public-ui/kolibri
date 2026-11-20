import { Log } from '../../internals/src/schema/index';
import { getSharedState } from './shared-state';
import { getRegisteredTagNameTransformer, registerTagNameTransformer } from './tag-transformer';

describe('registerTagNameTransformer', () => {
	afterAll(() => {
		getSharedState('tag-transformer', (): { transformer?: (tagName: string) => string } => ({})).transformer = undefined;
	});

	it('limits the registered transformer to kol-* tags and stores the guarded wrapper', () => {
		const guarded = registerTagNameTransformer((tagName) => `app-${tagName}`);

		expect(guarded('div')).toBe('div');
		expect(guarded('kol-button')).toBe('app-kol-button');
		expect(getRegisteredTagNameTransformer()).toBe(guarded);
	});

	it('warns when it replaces an existing registration', () => {
		const warnSpy = jest.spyOn(Log, 'warn').mockImplementation(() => {});
		registerTagNameTransformer((tagName) => `a-${tagName}`);

		registerTagNameTransformer((tagName) => `b-${tagName}`);

		expect(warnSpy.mock.calls.map((call) => call[0])).toContainEqual(expect.stringContaining('already registered'));
	});

	it('warns when a KoliBri element is already defined under its untransformed tag', () => {
		customElements.define('kol-button', class extends HTMLElement {});
		const warnSpy = jest.spyOn(Log, 'warn').mockImplementation(() => {});

		registerTagNameTransformer((tagName) => `late-${tagName}`);

		expect(warnSpy.mock.calls.map((call) => call[0])).toContainEqual(expect.stringContaining('already defined'));
	});
});
