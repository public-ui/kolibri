import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../shadow';

const options: Option<StencilUnknown>[] = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W', disabled: true },
];

async function setupOpenListbox(focusedOptionIndex: number) {
	const page = await newSpecPage({
		components: [KolSingleSelect],
		template: () => <kol-single-select _label="Test" _options={options} />,
	});

	const instance = page.rootInstance as KolSingleSelect;
	instance['_isOpen'] = true;
	instance['_focusedOptionIndex'] = focusedOptionIndex;
	await page.waitForChanges();

	return { page, instance };
}

describe('kol-single-select keyboard selection (#10870)', () => {
	it.each(['Enter', 'NumpadEnter'])('selects the focused option and closes the listbox on %s', async (key) => {
		const { page, instance } = await setupOpenListbox(1);

		instance.handleKeyDown(new KeyboardEvent('keydown', { key }));
		await page.waitForChanges();

		expect(instance['_value']).toBe('S');
		expect(instance['_isOpen']).toBe(false);
	});

	it('handles Enter dispatched on an option exactly once and keeps the listbox closed', async () => {
		const { page, instance } = await setupOpenListbox(1);

		// Regression guard: a second handler on the option itself would select and close the
		// listbox before the host listener runs, which would then reopen it (see #10155).
		const option = page.root?.shadowRoot?.querySelectorAll('li[role="option"]')[1];
		expect(option).toBeDefined();
		option?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(instance['_value']).toBe('S');
		expect(instance['_isOpen']).toBe(false);
	});

	it('ignores Enter on a disabled option and keeps the listbox open', async () => {
		const { page, instance } = await setupOpenListbox(2);

		instance.handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
		await page.waitForChanges();

		expect(instance['_value']).toBeNull();
		expect(instance['_isOpen']).toBe(true);
	});
});
