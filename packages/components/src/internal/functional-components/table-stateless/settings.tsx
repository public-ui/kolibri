import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { KolInputCheckboxTag, KolInputNumberTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import type { KoliBriTableHeaderCell } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { createUniqueId, nonce } from '../../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { AlertFC } from '../alert/component';
import { ButtonFC } from '../button/component';
import type { ButtonItem } from '../button/item';
import { createButtonItem } from '../button/item';
import { createDialogItem, DialogItemFC } from '../dialog/item';
import { createItemPool } from '../item-pool';

const BEM_CLASS_TABLE__SETTINGS = bem.forBlock('kol-table')('settings');

/**
 * The settings menu of the table: the toggle button and the dialog that hides, resizes and moves
 * the columns. It keeps the applied and the edited header cells and the error message; every change
 * renders the table again.
 */
export type TableSettings = {
	/** Starts a render pass of the table, also one that does not render the menu. */
	beginRender(): void;
	/** Renders the menu for the horizontal header cells. Call at most once per render pass. */
	render(horizontalHeaderCells: KoliBriTableHeaderCell[][]): JSX.Element;
	/** Syncs the embedded buttons and the dialog. Call from `componentDidRender`. */
	sync(): void;
	/** Tears down the embedded buttons and the dialog. Call from `disconnectedCallback`. */
	destroy(): void;
};

/**
 * Parses a column width and returns its numeric value.
 * Returns undefined if the width is not finite or not positive.
 */
const parseColumnWidth = (width: number | undefined): number | undefined => {
	return Number.isFinite(width) && width !== undefined && width > 0 ? width : undefined;
};

const NOOP = (): void => {};

/**
 * @param getHost - The table element: the feature flag host of the embedded buttons.
 * @param requestRender - Renders the table again after a change of the settings state.
 */
export const createTableSettings = (getHost: () => HTMLElement | undefined, requestRender: () => void): TableSettings => {
	const translateTableSettings = translate('kol-table-settings');
	const translateTableSettingsCancel = translate('kol-table-settings-cancel');
	const translateTableSettingsApply = translate('kol-table-settings-apply');
	const translateErrorAllInvisible = translate('kol-table-settings-error-all-invisible');

	let rootElement: HTMLElement | undefined;

	const buttons = createItemPool<ButtonItem>(
		() => createButtonItem(getHost),
		(item) => item.syncListeners(),
		(item) => item.destroy(),
	);
	const dialog = createDialogItem(getHost, requestRender, () => rootElement);
	const alertHeadingId = createUniqueId('alert-heading');
	const alertCloserAriaDescriptionId = nonce();

	let receivedHeaderCells: KoliBriTableHeaderCell[][] | undefined;
	let headerCells: KoliBriTableHeaderCell[][] = [];
	let editingHeaderCells: KoliBriTableHeaderCell[][] = [];
	let errorMessage: string | null = null;

	const applyHeaderCells = (value: KoliBriTableHeaderCell[][]): void => {
		headerCells = value.map((row) => [...row]);
		editingHeaderCells = value.map((row) => row.map((cell) => ({ ...cell })));
	};

	const getPrimaryRow = (): KoliBriTableHeaderCell[] => editingHeaderCells[editingHeaderCells.length - 1] ?? [];

	const updatePrimaryRow = (newRow: KoliBriTableHeaderCell[]): void => {
		editingHeaderCells = editingHeaderCells.map((row, index, arr) => (index === arr.length - 1 ? newRow : row));
		requestRender();
	};

	const moveColumn = (columnId: string, direction: 'up' | 'down'): void => {
		const row = [...getPrimaryRow()];
		const sourceIndex = row.findIndex((col) => col.key === columnId);
		if (sourceIndex === -1) return;

		let targetIndex: number;
		if (direction === 'up') {
			if (sourceIndex === 0) return; // Cannot move first column up
			targetIndex = sourceIndex - 1;
		} else {
			if (sourceIndex === row.length - 1) return; // Cannot move last column down
			targetIndex = sourceIndex + 1;
		}

		// Swap with target
		const [source] = row.splice(sourceIndex, 1);
		row.splice(targetIndex, 0, source);
		updatePrimaryRow(row);
	};

	const handleVisibilityChange = (key: string, visible: unknown): void => {
		const row = getPrimaryRow().map((col) => (col.key === key && col.hidable !== false ? { ...col, visible: Boolean(visible) } : col));
		updatePrimaryRow(row);
	};

	const handleWidthChange = (key: string, width: unknown): void => {
		// Clearing/invalid input must not collapse the column: parseColumnWidth maps
		// non-positive or non-finite values (e.g. an emptied field => 0) back to undefined,
		// which renders as an auto-width column instead of a 0px/1px sliver.
		const parsedWidth = parseColumnWidth(Number(width));
		const row = getPrimaryRow().map((col) => (col.key === key && col.resizable !== false ? { ...col, width: parsedWidth } : col));
		updatePrimaryRow(row);
	};

	const handleCancel = (): void => {
		editingHeaderCells = headerCells.map((row) => [...row]);
		errorMessage = null;
		requestRender();
		dialog.close();
	};

	const handleSubmit = (event: Event): void => {
		event.preventDefault();

		const primaryRow = getPrimaryRow();
		const hasVisibleColumn = primaryRow.some((column) => column.visible !== false);

		if (!hasVisibleColumn) {
			errorMessage = translateErrorAllInvisible;
			requestRender();
			return;
		} else if (rootElement) {
			errorMessage = null;
			// Update headerCells with the edited values
			headerCells = editingHeaderCells.map((row) => row.map((cell) => ({ ...cell })));
			requestRender();

			// Type for sanitized cells where optional properties are truly omitted
			type SanitizedHeaderCell = Omit<KoliBriTableHeaderCell, 'hidable' | 'position' | 'resizable' | 'sortable' | 'visible' | 'width'> &
				Partial<Pick<KoliBriTableHeaderCell, 'hidable' | 'resizable' | 'sortable' | 'visible' | 'width'>>;

			const sanitizedHeaderCells = editingHeaderCells.map((row) =>
				row.map((column): SanitizedHeaderCell => {
					const { hidable, resizable, sortable, visible, width, ...rest } = column as KoliBriTableHeaderCell & { position?: unknown };
					const cell: SanitizedHeaderCell = { ...rest };
					if (visible !== undefined) cell.visible = visible;
					if (hidable !== undefined) cell.hidable = hidable;
					if (sortable !== undefined) cell.sortable = sortable;
					if (resizable !== undefined) cell.resizable = resizable;
					if (width !== undefined && width !== null) cell.width = width;
					return cell;
				}),
			);

			dispatchDomEvent(rootElement, KolEvent.changeHeaderCells, sanitizedHeaderCells);
			dialog.close();
		}
	};

	const refRoot = (element?: HTMLElement): void => {
		if (element) {
			rootElement = element;
		}
	};

	const renderColumn = (column: KoliBriTableHeaderCell, index: number, columns: KoliBriTableHeaderCell[]): JSX.Element => (
		<div key={column.key} class="kol-table-settings__column">
			<KolInputCheckboxTag
				_checked={column.visible !== false}
				_label={
					column.hidable
						? translate('kol-table-settings-column-hidable', { placeholders: { column: column.label } })
						: translate('kol-table-settings-column-not-hidable', { placeholders: { column: column.label } })
				}
				_value={true}
				_hideLabel
				_disabled={column.hidable === false}
				_on={{ onInput: (_, value: unknown) => handleVisibilityChange(column.key ?? '', value) }}
			/>
			<span class="kol-table-settings__column-label">{column.label}</span>
			<KolInputNumberTag
				_hideLabel
				_value={parseColumnWidth(column.width)}
				_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
				_min={1}
				_disabled={column.resizable === false}
				_on={{ onInput: (_, value: unknown) => handleWidthChange(column.key ?? '', value) }}
			/>
			<ButtonFC
				{...buttons.get(`move-up-${column.key}`).getFcProps(
					{
						_icons: 'kolicon-chevron-up',
						_label:
							column.sortable === false || index === 0
								? translate('kol-table-settings-not-move', { placeholders: { column: column.label } })
								: translate('kol-table-settings-move-up', { placeholders: { column: column.label } }),
						_hideLabel: true,
						_variant: 'ghost',
						_on: { onClick: () => moveColumn(column.key ?? '', 'up') },
						_disabled: column.sortable === false || index === 0,
					},
					{ 'data-testid': 'table-settings-move-up' },
				)}
			/>
			<ButtonFC
				{...buttons.get(`move-down-${column.key}`).getFcProps(
					{
						_icons: 'kolicon-chevron-down',
						_label:
							column.sortable === false || index === columns.length - 1
								? translate('kol-table-settings-not-move', { placeholders: { column: column.label } })
								: translate('kol-table-settings-move-down', { placeholders: { column: column.label } }),
						_hideLabel: true,
						_variant: 'ghost',
						_on: { onClick: () => moveColumn(column.key ?? '', 'down') },
						_disabled: column.sortable === false || index === columns.length - 1,
					},
					{ 'data-testid': 'table-settings-move-down' },
				)}
			/>
		</div>
	);

	return {
		beginRender: (): void => {
			buttons.beginRender();
		},
		render: (horizontalHeaderCells: KoliBriTableHeaderCell[][]): JSX.Element => {
			if (horizontalHeaderCells !== receivedHeaderCells) {
				receivedHeaderCells = horizontalHeaderCells;
				applyHeaderCells(horizontalHeaderCells);
			}
			const columns = getPrimaryRow();

			return (
				<div class={BEM_CLASS_TABLE__SETTINGS} ref={refRoot}>
					{/* `.kol-table-settings` stays an ancestor of `.kol-button`: the themes style the toggle as `.kol-table-settings .kol-button`. */}
					<div class="kol-table-settings">
						<ButtonFC
							{...buttons.get('toggle').getFcProps({
								_icons: 'kolicon-settings',
								_label: translateTableSettings,
								_hideLabel: true,
								_on: { onClick: () => dialog.show(true) },
							})}
						/>
					</div>
					<DialogItemFC {...dialog.getFcProps({ label: translateTableSettings, variant: 'card', width: 'fit-content' })}>
						<div class="kol-table-settings__content">
							{errorMessage && (
								<div class="kol-table-settings__error-message">
									<AlertFC
										alert={false}
										closerAriaDescriptionId={alertCloserAriaDescriptionId}
										handleCloserClick={NOOP}
										hasCloser={false}
										headingId={alertHeadingId}
										label={errorMessage}
										level={0}
										refCloserButton={NOOP}
										refCloserTooltip={NOOP}
										type="error"
										variant="msg"
									/>
								</div>
							)}
							<form onSubmit={handleSubmit}>
								<div class="kol-table-settings__columns">{columns.map((column, index) => renderColumn(column, index, columns))}</div>
								<div class="kol-table-settings__actions">
									<ButtonFC
										{...buttons.get('cancel').getFcProps(
											{
												_label: translateTableSettingsCancel,
												_variant: 'secondary',
												_on: { onClick: () => handleCancel() },
											},
											{ 'data-testid': 'table-settings-cancel' },
										)}
									/>
									<ButtonFC
										{...buttons
											.get('apply')
											.getFcProps({ _label: translateTableSettingsApply, _variant: 'primary', _type: 'submit' }, { 'data-testid': 'table-settings-apply' })}
									/>
								</div>
							</form>
						</div>
					</DialogItemFC>
				</div>
			);
		},
		sync: (): void => {
			buttons.endRender();
			dialog.syncListeners();
		},
		destroy: (): void => {
			buttons.destroy();
			dialog.destroy();
		},
	};
};
