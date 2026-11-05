/**
 * Checkbox, select, single-select and textarea.
 *
 * KoliBri reports the selected value through the `_on` callbacks and `getValue()`. A native
 * <select> holds internal option indices, so its `value` property is no meaningful assertion target.
 */

import { KolInputCheckbox, KolSelect, KolSingleSelect, KolTextarea } from '@public-ui/react-v19';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type ValueElement = HTMLElement & { getValue: () => Promise<unknown> };

const cities = [
	{ label: 'Berlin', value: 'berlin' },
	{ label: 'Hamburg', value: 'hamburg' },
];

describe('kol-input-checkbox', () => {
	test('reports the value when checked and null when unchecked', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<KolInputCheckbox _label="Agree" _value="yes" _on={{ onChange }} />);

		const checkbox = await screen.findByShadowRole('checkbox', { name: 'Agree' });
		await user.click(checkbox);
		expect(checkbox).toBeChecked();
		await user.click(checkbox);

		expect(checkbox).not.toBeChecked();
		expect(onChange.mock.calls.map(([, value]) => value)).toEqual(['yes', null]);
	});
});

describe('kol-select', () => {
	test('reports the value of the selected option', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<KolSelect _label="City" _options={cities} _on={{ onChange }} />);

		await user.selectOptions(await screen.findByShadowLabelText('City'), 'Hamburg');

		expect(onChange.mock.lastCall?.[1]).toBe('hamburg');
		expect(await (document.querySelector('kol-select') as ValueElement).getValue()).toBe('hamburg');
	});
});

describe('kol-single-select', () => {
	test('filters by the typed text and selects the clicked option', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<KolSingleSelect _label="City" _options={cities} _on={{ onChange }} />);

		const combobox = await screen.findByShadowRole('combobox', { name: 'City' });
		await user.click(combobox);
		await user.type(combobox, 'Ham');
		const options = await screen.findAllByShadowRole('option');
		expect(options).toHaveLength(1);
		await user.click(options[0]);

		expect(onChange.mock.lastCall?.[1]).toBe('hamburg');
		expect(combobox).toHaveValue('Hamburg');
	});
});

describe('kol-textarea', () => {
	test('accepts line breaks typed with Enter', async () => {
		const user = userEvent.setup();
		const onInput = vi.fn();
		render(<KolTextarea _label="Comment" _on={{ onInput }} />);

		await user.type(await screen.findByShadowRole('textbox', { name: 'Comment' }), 'Hello{Enter}World');

		expect(onInput.mock.lastCall?.[1]).toBe('Hello\nWorld');
	});
});
