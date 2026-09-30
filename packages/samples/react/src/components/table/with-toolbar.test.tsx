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
		expect(host?.shadowRoot, `Kein Shadow-Root für <${selector}>`).toBeTruthy();
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
		throw new Error('Schaltfläche wurde nicht gerendert');
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
	test('„Bearbeiten“ und „Löschen“ sind vor der Auswahl deaktiviert, „Hinzufügen“ ist verfügbar.', async () => {
		renderSample();
		await findHost('kol-toolbar');

		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Hinzufügen'))).toBe(false);
			expect(isDisabled(getToolbarButton('Bearbeiten'))).toBe(true);
			expect(isDisabled(getToolbarButton('Löschen'))).toBe(true);
		});
	});

	test('„Löschen“ entfernt die ausgewählte Zeile und ist danach wieder deaktiviert.', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');

		await selectSingleRow(table, 0);

		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Bearbeiten'))).toBe(false);
			expect(isDisabled(getToolbarButton('Löschen'))).toBe(false);
		});

		const rowsBefore = getBodyRowCount(table);
		const deletedName = table.shadowRoot?.querySelector('tbody tr')?.textContent ?? '';
		click(getToolbarButton('Löschen'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore - 1));
		expect(table.shadowRoot?.textContent).not.toContain(deletedName);
		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Bearbeiten'))).toBe(true);
			expect(isDisabled(getToolbarButton('Löschen'))).toBe(true);
		});
	});

	test('Mehrfachauswahl: „Löschen“ entfernt alle gewählten Zeilen, „Bearbeiten“ bleibt gesperrt.', async () => {
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

		await waitFor(() => expect(isDisabled(getToolbarButton('Löschen'))).toBe(false));
		expect(isDisabled(getToolbarButton('Bearbeiten'))).toBe(true);

		const rowsBefore = getBodyRowCount(table);
		click(getToolbarButton('Löschen'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore - 2));
		await waitFor(() => expect(isDisabled(getToolbarButton('Löschen'))).toBe(true));
	});

	test('„Hinzufügen“ öffnet das Formular mit einem generierten Dummy-Datensatz.', async () => {
		renderSample();
		await findHost('kol-toolbar');

		click(getToolbarButton('Hinzufügen'));

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

	test('„Bearbeiten“ öffnet die gewählte Zeile im Formular, „Speichern“ übernimmt die Änderung.', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		await selectSingleRow(table, 0);
		await waitFor(() => expect(isDisabled(getToolbarButton('Bearbeiten'))).toBe(false));

		click(getToolbarButton('Bearbeiten'));
		const drawer = await findHost('kol-drawer');

		const nameInput = await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		const oldName = nameInput.value;
		expect(oldName.length).toBeGreaterThan(0);

		fireEvent.input(nameInput, { target: { value: 'Neuer Name' } });
		await waitFor(() => expect(getDrawerInput(0)?.value).toBe('Neuer Name'));
		click(getDrawerButton('Speichern'));

		await waitFor(() => {
			expect(drawer._open).toBe(false);
			expect(getDrawerInput(0)).toBeNull();
		});
		expect(getBodyRowCount(table)).toBe(10);
		expect(table.shadowRoot?.textContent).toContain('Neuer Name');
		expect(table.shadowRoot?.textContent).not.toContain(oldName);
	});

	test('„Anlegen“ fügt den Datensatz in die Tabelle ein und schließt das Formular.', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		click(getToolbarButton('Hinzufügen'));
		const drawer = await findHost('kol-drawer');
		const nameInput = await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		const rowsBefore = getBodyRowCount(table);
		const createdName = nameInput.value;

		click(getDrawerButton('Anlegen'));

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

	test('„Abbrechen“ verwirft den Datensatz, ohne die Tabelle zu ändern.', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');
		await findHost('kol-toolbar');

		click(getToolbarButton('Hinzufügen'));
		const drawer = await findHost('kol-drawer');
		await waitFor(() => {
			const input = getDrawerInput(0);
			expect(input).toBeTruthy();
		});
		const rowsBefore = getBodyRowCount(table);

		click(getDrawerButton('Abbrechen'));

		await waitFor(() => {
			expect(drawer._open).toBe(false);
			expect(getDrawerInput(0)).toBeNull();
		});
		expect(getBodyRowCount(table)).toBe(rowsBefore);
	});
});
