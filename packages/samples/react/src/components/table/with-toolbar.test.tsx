import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { FIRST_NAMES, LAST_NAMES, TableWithToolbar } from './with-toolbar';

const DUMMY_NAME_PATTERN = new RegExp(`^(${FIRST_NAMES.join('|')}) (${LAST_NAMES.join('|')})$`);

function renderSample(): void {
	render(
		<MemoryRouter initialEntries={['/table/with-toolbar']}>
			<TableWithToolbar />
		</MemoryRouter>,
	);
}

/** Stencil components upgrade asynchronously, so the shadow root must be awaited. */
async function findHost<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<HTMLElementTagNameMap[K]> {
	return waitFor(() => {
		const host = document.querySelector<K>(selector);
		expect(host?.shadowRoot, `No shadow root for <${selector}>`).toBeTruthy();
		return host as HTMLElementTagNameMap[K];
	});
}

/** The toolbar renders its items as native buttons inside its own shadow root. */
function getToolbarButton(label: string): HTMLButtonElement | undefined {
	const buttons = document.querySelector('kol-toolbar')?.shadowRoot?.querySelectorAll<HTMLButtonElement>('button') ?? [];
	return Array.from(buttons).find((button) => button.textContent?.includes(label));
}

/**
 * Disabled is signalled by the native `disabled` attribute; depending on the built dist state an
 * `aria-disabled="true"` is set instead, so both are accepted here.
 */
function isDisabled(button: HTMLButtonElement | undefined): boolean {
	return button?.disabled === true || button?.getAttribute('aria-disabled') === 'true';
}

/** The form fields are slotted into the drawer's light DOM, each with its own shadow root. */
function getDrawerInput(index: number): HTMLInputElement | null {
	const host = document.querySelectorAll('kol-drawer kol-input-text')[index];
	return host?.shadowRoot?.querySelector('input') ?? null;
}

function getDrawerButton(label: string): HTMLButtonElement | undefined {
	const hosts = document.querySelectorAll('kol-drawer kol-button');
	for (const host of Array.from(hosts)) {
		const button = host.shadowRoot?.querySelector('button');
		if (button?.textContent?.includes(label)) {
			return button;
		}
	}
	return undefined;
}

/** fireEvent.click with a clear error when the button was not rendered. */
function click(button: HTMLButtonElement | undefined): void {
	if (button === undefined) {
		throw new Error('Button was not rendered');
	}
	fireEvent.click(button);
}

/** The selection switch is the only checkbox outside the table. */
function getSwitchInput(): HTMLInputElement | null {
	return document.querySelector('kol-input-checkbox')?.shadowRoot?.querySelector('input') ?? null;
}

function getBodyRowCount(table: HTMLKolTableStatefulElement): number {
	return table.shadowRoot?.querySelectorAll('tbody tr').length ?? 0;
}

/** Selects the row at the given index in single mode (radio). */
async function selectSingleRow(table: HTMLKolTableStatefulElement, index: number): Promise<void> {
	const radio = await waitFor(() => {
		const inputs = table.shadowRoot?.querySelectorAll<HTMLInputElement>('tbody input.kol-table__selection-input--radio');
		const input = inputs?.[index];
		expect(input).toBeTruthy();
		return input as HTMLInputElement;
	});
	fireEvent.click(radio);
}

/** Checks the row at the given index in multiple mode. The inputs are re-queried after every render. */
async function checkRow(table: HTMLKolTableStatefulElement, index: number): Promise<void> {
	const checkbox = await waitFor(() => {
		const inputs = table.shadowRoot?.querySelectorAll<HTMLInputElement>('tbody input.kol-table__selection-input--checkbox');
		const input = inputs?.[index];
		expect(input).toBeTruthy();
		return input as HTMLInputElement;
	});
	fireEvent.click(checkbox);
}

describe('TableWithToolbar', () => {
	test('disables "Edit" and "Delete" before a selection and keeps "Add" available', async () => {
		renderSample();
		await findHost('kol-toolbar');

		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Add'))).toBe(false);
			expect(isDisabled(getToolbarButton('Edit'))).toBe(true);
			expect(isDisabled(getToolbarButton('Delete'))).toBe(true);
		});
	});

	test('"Delete" removes the selected row and is disabled again afterwards', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');

		await selectSingleRow(table, 0);

		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Edit'))).toBe(false);
			expect(isDisabled(getToolbarButton('Delete'))).toBe(false);
		});

		const rowsBefore = getBodyRowCount(table);
		const deletedName = table.shadowRoot?.querySelector('tbody tr')?.textContent ?? '';
		click(getToolbarButton('Delete'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore - 1));
		expect(table.shadowRoot?.textContent).not.toContain(deletedName);
		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Edit'))).toBe(true);
			expect(isDisabled(getToolbarButton('Delete'))).toBe(true);
		});
	});

	test('multiple selection: "Delete" removes all selected rows, "Edit" stays disabled', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		const switchInput = await waitFor(() => {
			const input = getSwitchInput();
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		fireEvent.click(switchInput);

		await checkRow(table, 0);
		await checkRow(table, 1);

		await waitFor(() => expect(isDisabled(getToolbarButton('Delete'))).toBe(false));
		expect(isDisabled(getToolbarButton('Edit'))).toBe(true);

		const rowsBefore = getBodyRowCount(table);
		click(getToolbarButton('Delete'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore - 2));
		await waitFor(() => expect(isDisabled(getToolbarButton('Delete'))).toBe(true));
	});

	test('"Add" opens the form with a generated dummy record', async () => {
		renderSample();
		await findHost('kol-toolbar');

		click(getToolbarButton('Add'));

		const drawer = await findHost('kol-drawer');
		await waitFor(() => {
			expect(drawer.shadowRoot?.querySelector('dialog')?.open).toBe(true);
		});

		const nameInput = await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		expect(nameInput.value).toMatch(DUMMY_NAME_PATTERN);

		const emailInput = getDrawerInput(1);
		expect(emailInput?.value).toBe(`${nameInput.value.toLowerCase().replace(' ', '.')}@example.com`);
	});

	test('"Edit" opens the selected row in the form, "Save" applies the change', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		await selectSingleRow(table, 0);
		await waitFor(() => expect(isDisabled(getToolbarButton('Edit'))).toBe(false));

		click(getToolbarButton('Edit'));
		const drawer = await findHost('kol-drawer');

		const nameInput = await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		const oldName = nameInput.value;
		expect(oldName.length).toBeGreaterThan(0);

		fireEvent.input(nameInput, { target: { value: 'New Name' } });
		await waitFor(() => expect(getDrawerInput(0)?.value).toBe('New Name'));
		click(getDrawerButton('Save'));

		await waitFor(() => {
			expect(drawer._open).toBe(false);
			expect(getDrawerInput(0)).toBeNull();
		});
		expect(getBodyRowCount(table)).toBe(10);
		expect(table.shadowRoot?.textContent).toContain('New Name');
		expect(table.shadowRoot?.textContent).not.toContain(oldName);
	});

	test('"Create" inserts the record into the table and closes the form', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		click(getToolbarButton('Add'));
		const drawer = await findHost('kol-drawer');
		const nameInput = await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		const rowsBefore = getBodyRowCount(table);
		const createdName = nameInput.value;

		click(getDrawerButton('Create'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore + 1));
		expect(table.shadowRoot?.textContent).toContain(createdName);
		await waitFor(() => {
			/*
			 * Without a theme the drawer wrapper has no slide-out animation and happy-dom reports an
			 * empty `animation-name` instead of `none`, so the closing animation end never fires.
			 * The controlled `_open` state and the unmounted form fields prove the close anyway.
			 */
			expect(drawer._open).toBe(false);
			expect(getDrawerInput(0)).toBeNull();
		});
	});

	test('"Cancel" discards the record without changing the table', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		click(getToolbarButton('Add'));
		const drawer = await findHost('kol-drawer');
		await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
		});
		const rowsBefore = getBodyRowCount(table);

		click(getDrawerButton('Cancel'));

		await waitFor(() => {
			expect(drawer._open).toBe(false);
			expect(getDrawerInput(0)).toBeNull();
		});
		expect(getBodyRowCount(table)).toBe(rowsBefore);
	});
});
