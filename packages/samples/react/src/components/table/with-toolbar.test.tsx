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

/** Buttons signal their disabled state via `aria-disabled` instead of the native attribute. */
function isDisabled(button: HTMLButtonElement | undefined): boolean {
	return button?.getAttribute('aria-disabled') === 'true';
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

function getBodyRowCount(table: HTMLKolTableStatefulElement): number {
	return table.shadowRoot?.querySelectorAll('tbody tr').length ?? 0;
}

describe('TableWithToolbar', () => {
	test('„Löschen“ ist vor der Auswahl deaktiviert, „Hinzufügen“ ist verfügbar.', async () => {
		renderSample();
		await findHost('kol-toolbar');

		await waitFor(() => {
			expect(isDisabled(getToolbarButton('Hinzufügen'))).toBe(false);
			expect(isDisabled(getToolbarButton('Löschen'))).toBe(true);
		});
	});

	test('„Löschen“ entfernt die ausgewählte Zeile und ist danach wieder deaktiviert.', async () => {
		renderSample();
		const table = await findHost('kol-table-stateful');

		const radio = await waitFor(() => {
			const input = table.shadowRoot?.querySelector<HTMLInputElement>('input.kol-table__selection-input--radio');
			expect(input).toBeTruthy();
			return input as HTMLInputElement;
		});
		fireEvent.click(radio);

		await waitFor(() => expect(isDisabled(getToolbarButton('Löschen'))).toBe(false));

		const rowsBefore = getBodyRowCount(table);
		const deletedName = table.shadowRoot?.querySelector('tbody tr')?.textContent ?? '';
		click(getToolbarButton('Löschen'));

		await waitFor(() => expect(getBodyRowCount(table)).toBe(rowsBefore - 1));
		expect(table.shadowRoot?.textContent).not.toContain(deletedName);
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
