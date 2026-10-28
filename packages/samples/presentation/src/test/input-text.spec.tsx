/**
 * Typing into KoliBri inputs: the native <input> lives in the shadow root,
 * so events are fired on it and arrive in the _on callbacks.
 */

import { KolInputText } from '@public-ui/react-v19';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

describe('kol-input-text', () => {
	test('renders the label and the initial value', async () => {
		render(<KolInputText _label="Name" _value="Ada" />);

		const input = (await screen.findByShadowLabelText('Name')) as HTMLInputElement;
		expect(input.value).toBe('Ada');
	});

	test('calls onInput with the typed value', async () => {
		const onInput = vi.fn();
		render(<KolInputText _label="Name" _on={{ onInput }} />);

		const input = (await screen.findByShadowLabelText('Name')) as HTMLInputElement;
		input.value = 'Grace';
		fireEvent.input(input);

		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBe('Grace');
	});

	test('calls onChange with the committed value', async () => {
		const onChange = vi.fn();
		render(<KolInputText _label="Name" _on={{ onChange }} />);

		const input = (await screen.findByShadowLabelText('Name')) as HTMLInputElement;
		input.value = 'Grace';
		fireEvent.change(input);

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBe('Grace');
	});

	test('disables the native input', async () => {
		render(<KolInputText _label="Name" _disabled />);

		const input = (await screen.findByShadowLabelText('Name')) as HTMLInputElement;
		expect(input).toBeDisabled();
	});
});
