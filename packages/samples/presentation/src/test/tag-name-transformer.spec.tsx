/**
 * Renders KoliBri components under a tag name transformer.
 *
 * The registration runs through one of the two entry points per test — the adapter bridge or
 * `bootstrap({ transformTagName })` — because each has to cover the React proxies and the root
 * entry on its own. Both resolve the host through the transformed tag, so the adapter components
 * and the elements the root entry creates (the toast container) share one tag scheme.
 */

import { bootstrap } from '@public-ui/components';
import { KolButton, setTagNameTransformer } from '@public-ui/react-v19';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { afterEach, describe, expect, test, vi } from 'vitest';

const transformTagName = (tagName: string) => `${tagName}-transformed`;

const renderTransformedButton = async (): Promise<void> => {
	render(<KolButton _label="Save" />);
	await screen.findByShadowRole('button', { name: 'Save' });
};

describe('kol-button under a tag name transformer', () => {
	afterEach(() => {
		cleanup();
	});

	test('renders under the transformed tag after registering through bootstrap', async () => {
		await bootstrap([], [], { transformTagName });
		await renderTransformedButton();

		expect(document.querySelector('kol-button-transformed')).not.toBeNull();
		expect(document.querySelector('kol-button')).toBeNull();
	});

	test('renders under the transformed tag after registering through the adapter', async () => {
		setTagNameTransformer(transformTagName);
		await renderTransformedButton();

		expect(document.querySelector('kol-button-transformed')).not.toBeNull();
		expect(document.querySelector('kol-button')).toBeNull();
	});

	test('keeps the click behaviour under the transformed tag', async () => {
		setTagNameTransformer(transformTagName);
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<KolButton _label="Save" _on={{ onClick }} />);

		await user.click(await screen.findByShadowRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
