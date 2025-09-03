import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { KolAlertWcTag, KolButtonWcTag, KolHeadingTag, KolInputCheckboxTag, KolInputNumberTag, KolPopoverButtonWcTag } from '../../core/component-names';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { KoliBriTableHeaderCell } from '../../schema';

/**
 * @internal
 */
@Component({
	tag: 'kol-table-settings-wc',
	shadow: false,
})
export class KolTableSettings {
	@Element() private readonly host?: HTMLKolTableSettingsWcElement;
	@State() headerCells: KoliBriTableHeaderCell[][] = [];
	@State() errorMessage: string | null = null;
	private readonly translateTableSettings = translate('kol-table-settings');
	private readonly translateTableSettingsCancel = translate('kol-table-settings-cancel');
	private readonly translateTableSettingsApply = translate('kol-table-settings-apply');
	private readonly translateErrorAllInvisible = translate('kol-table-settings-error-all-invisible');
	private readonly translateColumnNotHidable = translate('kol-table-settings-column-not-hidable');
	@Prop() _headerCells: KoliBriTableHeaderCell[][] = [];

	@Watch('_headerCells')
	handleHeaderCellsChange(newValue: KoliBriTableHeaderCell[][]) {
		this.headerCells = [...newValue];
	}

	public componentWillLoad() {
		this.handleHeaderCellsChange(this._headerCells);
	}

	private popoverRef: HTMLKolPopoverButtonWcElement | undefined;

	private getColumnsFromHeaderCells(): KoliBriTableHeaderCell[] {
		// Get all headers with keys from the first level that are sortable
		return this.headerCells.flat().filter((header) => header.key);
	}

	private moveColumn(columnId: string, direction: 'up' | 'down'): void {
		// Find the header cell in the first horizontal row and move it within the array
		const firstRow = this.headerCells[0];
		if (!firstRow) return;

		const sourceIndex = firstRow.findIndex((col) => col.key === columnId);
		const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;

		if (targetIndex >= 0 && targetIndex < firstRow.length && sourceIndex >= 0) {
			// Create new array and swap elements
			const newRow = [...firstRow];
			[newRow[sourceIndex], newRow[targetIndex]] = [newRow[targetIndex], newRow[sourceIndex]];

			// Update headerCells with new order
			this.headerCells = [newRow, ...this.headerCells.slice(1)];
		}
	}
	private handleVisibilityChange(key: string, visible: unknown): void {
		this.headerCells = this.headerCells.map((row) =>
			row.map((header) => (header.key === key && header.hidable !== false ? { ...header, visible: Boolean(visible) } : header)),
		);
	}

	private handleWidthChange(key: string, width: unknown): void {
		this.headerCells = this.headerCells.map((row) => row.map((header) => (header.key === key ? { ...header, width: `${Number(width)}ch` } : header)));
	}

	private handleCancel() {
		void this.popoverRef?.hidePopover();
	}

	private handleSubmit(event: Event): void {
		event.preventDefault();

		const allColumns = this.getColumnsFromHeaderCells();
		const hasVisibleColumn = allColumns.some((column) => column.visible !== false);

		if (!hasVisibleColumn) {
			this.errorMessage = this.translateErrorAllInvisible;
			return;
		} else if (this.host) {
			this.errorMessage = null;
			dispatchDomEvent(this.host, KolEvent.headerCellsChange, this.headerCells);
			void this.popoverRef?.hidePopover();
		}
	}

	public render(): JSX.Element {
		const allColumns = this.getColumnsFromHeaderCells();
		// Columns are already in the correct order from the array

		return (
			<KolPopoverButtonWcTag
				ref={(el) => (this.popoverRef = el)}
				class="kol-table-settings"
				_icons="codicon codicon-settings-gear"
				_label={this.translateTableSettings}
				_popoverAlign="top"
				_hideLabel
			>
				<div class="kol-table-settings__content">
					<KolHeadingTag _label={this.translateTableSettings} _level={0} />

					{this.errorMessage && <KolAlertWcTag _type="error" _label={this.errorMessage} _variant="msg" class="kol-table-settings__error-message" />}

					<form onSubmit={this.handleSubmit.bind(this)}>
						<div class="kol-table-settings__columns-container">
							<div class="kol-table-settings__columns">
								{allColumns.map((column, index) => (
									<div key={column.key} class="kol-table-settings__column">
										<KolInputCheckboxTag
											_checked={column.visible !== false}
											_label={`${column.label}${column.hidable === false ? ` (${this.translateColumnNotHidable})` : ''}`}
											_value={true}
											_hideLabel
											_disabled={column.hidable === false}
											_on={{ onInput: (_, value: unknown) => this.handleVisibilityChange(column.key!, value) }}
										/>
										<span>{column.label}</span>
										<KolInputNumberTag
											_hideLabel
											_value={column.width ? parseInt(column.width, 10) : undefined}
											_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
											_min={1}
											_on={{ onInput: (_, value: unknown) => this.handleWidthChange(column.key!, value) }}
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-up"
											_label={translate('kol-table-settings-move-up', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key!, 'up') }}
											_disabled={index === 0}
											data-testid="table-settings-move-up"
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-down"
											_label={translate('kol-table-settings-move-down', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key!, 'down') }}
											_disabled={index === allColumns.length - 1}
											data-testid="table-settings-move-down"
										/>
									</div>
								))}
							</div>
						</div>

						<div class="kol-table-settings__actions">
							<KolButtonWcTag
								_label={this.translateTableSettingsCancel}
								_buttonVariant="secondary"
								_on={{ onClick: () => this.handleCancel() }}
								data-testid="table-settings-cancel"
							/>
							<KolButtonWcTag _label={this.translateTableSettingsApply} _buttonVariant="primary" _type="submit" data-testid="table-settings-apply" />
						</div>
					</form>
				</div>
			</KolPopoverButtonWcTag>
		);
	}
}
