/**
 * Typing into KoliBri inputs: the native <input> lives in the shadow root,
 * so events are fired on it and arrive in the _on callbacks.
 */

import { KolInputText } from '@public-ui/react-v19';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { findInShadow } from './kolibri-helpers';

describe('kol-input-text', () => {
	test('renders the label and the initial value', async () => {
		render(<KolInputText _label="Name" _value="Ada" />);

		const input = await findInShadow<HTMLInputElement>('kol-input-text', 'input');
		expect(input.value).toBe('Ada');
		expect(document.querySelector('kol-input-text')?.shadowRoot?.querySelector('label')).toHaveTextContent('Name');
	});

	test('calls onInput with the typed value', async () => {
		const onInput = vi.fn();
		render(<KolInputText _label="Name" _on={{ onInput }} />);

		const input = await findInShadow<HTMLInputElement>('kol-input-text', 'input');
		input.value = 'Grace';
		fireEvent.input(input);

		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBe('Grace');
	});

	test('calls onChange with the committed value', async () => {
		const onChange = vi.fn();
		render(<KolInputText _label="Name" _on={{ onChange }} />);

		const input = await findInShadow<HTMLInputElement>('kol-input-text', 'input');
		input.value = 'Grace';
		fireEvent.change(input);

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBe('Grace');
	});

	test('disables the native input', async () => {
		render(<KolInputText _label="Name" _disabled />);

		const input = await findInShadow<HTMLInputElement>('kol-input-text', 'input');
		expect(input).toBeDisabled();
	});
});
