import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { RadioOption } from '../../../schema';
import type { InputRadioController } from '../controller';
import { KolInputRadio } from '../shadow';

describe('kol-input-radio option value types', () => {
	const options: RadioOption<boolean>[] = [
		{
			label: 'Yes',
			value: true,
		},
		{
			label: 'No',
			value: false,
		},
	];

	it('keeps boolean selections and emits them on change', async () => {
		const page = await newSpecPage({
			components: [KolInputRadio],
			template: () => <kol-input-radio _label="Label" _options={options} _value={false} />,
		});

		const host = page.root as HTMLElement;
		const component = page.rootInstance as KolInputRadio;
		const controller = (component as unknown as { controller: InputRadioController }).controller;

		expect(component._value).toBe(false);

		await page.waitForChanges();

		const inputListener = jest.fn();
		const changeListener = jest.fn();
		host.addEventListener('kolInput', inputListener);
		host.addEventListener('kolChange', changeListener);

		const inputs = host.shadowRoot?.querySelectorAll('input[type="radio"]');
		expect(inputs?.length).toBe(2);
		const firstInput = inputs?.[0];
		expect(firstInput?.value).toBe('-0');

		const option = controller.getOptionByKey(firstInput?.value as string);
		expect(option).toBeDefined();

		const optionValue = option?.value as boolean;

		component._value = optionValue;
		component.validateValue(optionValue);
		controller.onFacade.onInput(new Event('input'), true, optionValue);
		controller.onFacade.onChange(new Event('change'), optionValue);
		await page.waitForChanges();

		expect(inputListener).toHaveBeenCalled();
		expect(inputListener.mock.calls[0]?.[0]?.detail).toBe(true);
		expect(changeListener).toHaveBeenCalled();
		expect(changeListener.mock.calls[0]?.[0]?.detail).toBe(true);
	});
});
