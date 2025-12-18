import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SelectOption, W3CInputValue } from '../../../schema';
import type { SelectController } from '../controller';
import { KolSelect } from '../shadow';

describe('kol-select option value types', () => {
	const options: SelectOption<W3CInputValue>[] = [
		{
			label: 'Yes',
			value: true,
		},
		{
			label: 'No',
			value: false,
		},
	];

	it('keeps boolean selections after normalization', async () => {
		const page = await newSpecPage({
			components: [KolSelect],
			template: () => <kol-select _label="Label" _options={options} _value={false} />,
		});

		const component = page.rootInstance as KolSelect;

		expect(await component.getValue()).toBe(false);
		expect(component.state._value).toEqual([false]);
	});

	it('emits boolean values on change', async () => {
		const page = await newSpecPage({
			components: [KolSelect],
			template: () => <kol-select _label="Label" _options={options} _value={false} />,
		});

		await page.waitForChanges();

		const host = page.root as HTMLElement;
		const component = page.rootInstance as KolSelect;
		const controller = (component as unknown as { controller: SelectController }).controller;

		const inputListener = jest.fn();
		const changeListener = jest.fn();
		host.addEventListener('kolInput', inputListener);
		host.addEventListener('kolChange', changeListener);

		const option = controller.getOptionByKey('-0');
		expect(option?.value).toBe(true);

		controller.onFacade.onInput(new Event('input'), true, option?.value);
		component._value = option?.value as W3CInputValue;
		component.validateValue(option?.value as W3CInputValue);
		controller.onFacade.onChange(new Event('change'), option?.value);
		await page.waitForChanges();

		expect(inputListener).toHaveBeenCalled();
		expect(inputListener.mock.calls[0]?.[0]?.detail).toBe(true);
		expect(changeListener).toHaveBeenCalled();
		expect(changeListener.mock.calls[0]?.[0]?.detail).toBe(true);
		expect(await component.getValue()).toBe(true);
	});
});
