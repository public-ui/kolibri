/**
 * Keyboard operation and focus.
 *
 * `userEvent.keyboard` types into the element that has focus, also inside a shadow root.
 * `userEvent.tab()` does not enter shadow roots: it moves focus between light DOM elements only.
 * To focus a KoliBri component, call its `focus()` method or `user.click()` the inner element.
 */

import { KolButton, KolInputText } from '@public-ui/react-v19';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type FocusableElement = HTMLElement & { focus: () => Promise<void> };

describe('keyboard', () => {
	test('Enter and Space activate a focused button', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<KolButton _label="Save" _on={{ onClick }} />);

		(await screen.findByShadowRole('button', { name: 'Save' })).focus();
		await user.keyboard('{Enter}');
		await user.keyboard(' ');

		expect(onClick).toHaveBeenCalledTimes(2);
	});

	test('focus() on the host moves focus to the inner input', async () => {
		const user = userEvent.setup();
		const onInput = vi.fn();
		render(<KolInputText _label="Name" _on={{ onInput }} />);
		const input = await screen.findByShadowRole('textbox', { name: 'Name' });

		await (document.querySelector('kol-input-text') as FocusableElement).focus();
		await vi.waitFor(() => expect(input.getRootNode()).toHaveProperty('activeElement', input));
		await user.keyboard('Ada');

		expect(input).toHaveValue('Ada');
		expect(onInput.mock.lastCall?.[1]).toBe('Ada');
	});
});
