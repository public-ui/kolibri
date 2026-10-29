/**
 * Dialog lifecycle: open and close via the component methods.
 *
 * The methods are called on the custom element, the state is read from the native
 * <dialog> inside the shadow root (HTMLDialogElement is provided by happy-dom).
 */

import { KolDialog } from '@public-ui/react-v19';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

type KolDialogElement = HTMLElement & { close: () => Promise<void>; show: (modal?: boolean) => Promise<void>; showModal: () => Promise<void> };

const findDialog = () =>
	vi.waitFor(() => {
		const dialog = document.querySelector('kol-dialog')?.shadowRoot?.querySelector('dialog');
		expect(dialog).toBeTruthy();
		return dialog as HTMLDialogElement;
	});

const getDialogHost = () => document.querySelector('kol-dialog') as KolDialogElement;

describe('kol-dialog', () => {
	test('is closed initially', async () => {
		render(<KolDialog _label="Title">Content</KolDialog>);

		const dialog = await findDialog();
		expect(dialog.open).toBe(false);
	});

	test('opens as modal with showModal()', async () => {
		render(<KolDialog _label="Title">Content</KolDialog>);
		const dialog = await findDialog();

		await getDialogHost().showModal();

		await vi.waitFor(() => expect(dialog.open).toBe(true));
	});

	test('opens non-modal with show()', async () => {
		render(<KolDialog _label="Title">Content</KolDialog>);
		const dialog = await findDialog();

		await getDialogHost().show();

		await vi.waitFor(() => expect(dialog.open).toBe(true));
	});

	test('closes with close() and calls onClose', async () => {
		const onClose = vi.fn();
		render(
			<KolDialog _label="Title" _on={{ onClose }}>
				Content
			</KolDialog>,
		);
		const dialog = await findDialog();
		await getDialogHost().showModal();
		await vi.waitFor(() => expect(dialog.open).toBe(true));

		await getDialogHost().close();

		await vi.waitFor(() => expect(dialog.open).toBe(false));
		await vi.waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
	});

	test('renders slotted content in the light DOM', async () => {
		render(<KolDialog _label="Title">Dialog content</KolDialog>);
		await findDialog();

		expect(getDialogHost()).toHaveTextContent('Dialog content');
	});
});
