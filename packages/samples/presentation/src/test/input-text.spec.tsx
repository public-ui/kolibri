/**
 * Typing into KoliBri text inputs.
 *
 * `userEvent.type` dispatches one `input` event per character on the native <input> inside the shadow
 * root; `onChange` follows when the input loses focus. The callbacks receive `(event, value)`.
 */

import { KolInputText } from '@public-ui/react-v19';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type KolInputTextElement = HTMLElement & { getValue: () => Promise<string | undefined> };

describe('kol-input-text', () => {
	test('renders the label and the initial value', async () => {
		render(<KolInputText _label="Name" _value="Ada" />);

		expect(await screen.findByShadowRole('textbox', { name: 'Name' })).toHaveValue('Ada');
	});

	test('calls onInput for every typed character', async () => {
		const user = userEvent.setup();
		const onInput = vi.fn();
		render(<KolInputText _label="Name" _on={{ onInput }} />);

		await user.type(await screen.findByShadowLabelText('Name'), 'Grace');

		expect(onInput.mock.calls.map(([, value]) => value)).toEqual(['G', 'Gr', 'Gra', 'Grac', 'Grace']);
	});

	test('calls onChange with the committed value when the input loses focus', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<KolInputText _label="Name" _on={{ onChange }} />);

		await user.type(await screen.findByShadowLabelText('Name'), 'Grace');
		expect(onChange).not.toHaveBeenCalled();
		await user.tab();

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBe('Grace');
	});

	test('replaces the existing value by typing over the selected text', async () => {
		const user = userEvent.setup();
		render(<KolInputText _label="Name" _value="Ada" />);

		// `user.clear()` rejects elements in a shadow root, because its focus check reads `document.activeElement`.
		await user.type(await screen.findByShadowLabelText('Name'), 'Grace', { initialSelectionStart: 0, initialSelectionEnd: 3 });

		expect(await (document.querySelector('kol-input-text') as KolInputTextElement).getValue()).toBe('Grace');
	});

	test('disables the native input', async () => {
		render(<KolInputText _label="Name" _disabled />);

		expect(await screen.findByShadowLabelText('Name')).toBeDisabled();
	});

	test('fireEvent sets a complete value with a single input event', async () => {
		const onInput = vi.fn();
		render(<KolInputText _label="Name" _on={{ onInput }} />);

		const input = (await screen.findByShadowLabelText('Name')) as HTMLInputElement;
		input.value = 'Grace';
		fireEvent.input(input);

		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBe('Grace');
	});
});
