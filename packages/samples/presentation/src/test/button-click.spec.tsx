/**
 * Clicks on KoliBri buttons.
 *
 * The click targets the native <button> inside the shadow root. A click on the custom element itself
 * does not reach the `_on.onClick` callback.
 */

import { KolButton } from '@public-ui/react-v19';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type KolButtonElement = HTMLElement & { _on?: { onClick?: () => void } };

describe('kol-button click', () => {
	test('calls the onClick callback when the inner button is clicked', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<KolButton _label="Save" _on={{ onClick }} />);

		await user.click(await screen.findByShadowRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('does not call onClick on a disabled button', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<KolButton _label="Save" _disabled _on={{ onClick }} />);

		const button = await screen.findByShadowRole('button', { name: 'Save' });
		expect(button).toBeDisabled();
		await user.click(button);

		expect(onClick).not.toHaveBeenCalled();
	});

	test('reacts to a changed _on property', async () => {
		const user = userEvent.setup();
		const first = vi.fn();
		const second = vi.fn();
		render(<KolButton _label="Save" _on={{ onClick: first }} />);
		const button = await screen.findByShadowRole('button', { name: 'Save' });

		(document.querySelector('kol-button') as KolButtonElement)._on = { onClick: second };
		await user.click(button);

		expect(first).not.toHaveBeenCalled();
		expect(second).toHaveBeenCalledTimes(1);
	});

	test('works on the custom element tag without the React adapter', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		// React 19 passes the props of an unknown tag as element properties.
		render(React.createElement('kol-button', { _label: 'Save', _on: { onClick } }));

		await user.click(await screen.findByShadowRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
