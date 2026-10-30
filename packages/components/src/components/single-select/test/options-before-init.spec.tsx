import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../component';

const options: Option<StencilUnknown>[] = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
];

describe('kol-single-select _options watcher before initialization (#11449)', () => {
	it('does not throw when _options is set right after the element was attached', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			html: '<div></div>',
		});
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

		const select = page.doc.createElement('kol-single-select') as HTMLElement & { _label: string; _options: Option<StencilUnknown>[] };
		select._label = 'Test';
		page.body.appendChild(select);
		select._options = options;
		await page.waitForChanges();

		expect(errorSpy).not.toHaveBeenCalled();
		expect(select.shadowRoot?.querySelectorAll('[role="option"]')).toHaveLength(2);
		errorSpy.mockRestore();
	});

	it('ignores the _options watcher while the render props are not initialized yet', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
		const instance = new KolSingleSelect();

		expect(() => instance.watchOptions(options)).not.toThrow();
		warnSpy.mockRestore();
	});
});
