import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../component';

const options: Option<StencilUnknown>[] = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
];

describe('kol-single-select props assigned before the first render (#11449)', () => {
	it('renders the options without an error when _options is assigned right after the element was attached', async () => {
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

	it('shows the label of the value when _options and _value are assigned before the first render', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			html: '<div></div>',
		});

		const select = page.doc.createElement('kol-single-select') as HTMLElement & {
			_label: string;
			_options: Option<StencilUnknown>[];
			_value: StencilUnknown;
		};
		select._label = 'Test';
		page.body.appendChild(select);
		select._options = options;
		select._value = '2';
		await page.waitForChanges();

		const input = select.shadowRoot?.querySelector('input');
		expect(input?.value).toBe('Option 2');
	});

	it('seeds the render props with their defaults and applies a watcher without componentWillLoad', () => {
		const instance = new KolSingleSelect();

		// The defaults exist before the element loads, and a watcher run before `componentWillLoad`
		// keeps its write in the store.
		expect(instance.getRenderProp('disabled')).toBe(false);
		instance.watchOptions(options);
		expect(instance.getRenderProp('options')).toEqual(options);
	});
});
