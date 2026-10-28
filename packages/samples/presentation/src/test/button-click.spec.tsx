/**
 * Clicks on KoliBri buttons.
 *
 * The click must hit the native element inside the shadow root. A click on the custom element
 * itself does not reach KoliBri's callbacks, which is the typical jsdom frustration.
 *
 * Role queries need `hidden: true`: happy-dom does not resolve the accessibility tree inside shadow roots,
 * so the button counts as inaccessible by default and its accessible name cannot be matched.
 */

import { KolButton } from '@public-ui/react-v19';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type KolButtonElement = HTMLElement & { _label?: string; _on?: { onClick?: () => void }; _disabled?: boolean };

describe('kol-button click', () => {
	test('calls the onClick callback when the inner button is clicked', async () => {
		const onClick = vi.fn();
		render(React.createElement('kol-button', { _label: 'Save', _on: { onClick } }));

		const button = (await screen.findByShadowRole('button', { hidden: true })) as HTMLButtonElement;
		fireEvent.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('renders the label into the shadow root', async () => {
		render(React.createElement('kol-button', { _label: 'Save' }));

		const button = (await screen.findByShadowRole('button', { hidden: true })) as HTMLButtonElement;
		expect(button).toHaveTextContent('Save');
	});

	test('does not call onClick on a disabled button', async () => {
		const onClick = vi.fn();
		render(React.createElement('kol-button', { _label: 'Save', _disabled: true, _on: { onClick } }));

		const button = (await screen.findByShadowRole('button', { hidden: true })) as HTMLButtonElement;
		fireEvent.click(button);

		expect(onClick).not.toHaveBeenCalled();
	});

	test('reacts to a changed _on property', async () => {
		const first = vi.fn();
		const second = vi.fn();
		render(React.createElement('kol-button', { _label: 'Save', _on: { onClick: first } }));
		const button = (await screen.findByShadowRole('button', { hidden: true })) as HTMLButtonElement;

		(document.querySelector('kol-button') as KolButtonElement)._on = { onClick: second };
		await Promise.resolve();
		fireEvent.click(button);

		expect(first).not.toHaveBeenCalled();
		expect(second).toHaveBeenCalledTimes(1);
	});
});

describe('KolButton React adapter', () => {
	test('forwards _on.onClick through the wrapper', async () => {
		const onClick = vi.fn();
		render(<KolButton _label="Wrapped" _on={{ onClick }} />);

		const button = (await screen.findByShadowRole('button', { hidden: true })) as HTMLButtonElement;
		fireEvent.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
