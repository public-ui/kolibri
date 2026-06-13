import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { KolAlertWcTag, KolHeadingTag, KolInputCheckboxTag, KolInputNumberTag, KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { ButtonController } from '../../internal/functional-components/button/controller';
import { renderButtonFC } from '../../internal/functional-components/button/render';
import type { KoliBriTableHeaderCell } from '../../schema';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { parseColumnWidth } from './controller';

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
	@State() editingHeaderCells: KoliBriTableHeaderCell[][] = [];
	@State() errorMessage: string | null = null;
	private readonly translateTableSettings = translate('kol-table-settings');
	private readonly translateTableSettingsCancel = translate('kol-table-settings-cancel');
	private readonly translateTableSettingsApply = translate('kol-table-settings-apply');
	private readonly cancelButtonCtrl = new ButtonController(BaseWebComponent.stateLess);
	private readonly applyButtonCtrl = new ButtonController(BaseWebComponent.stateLess);
	private readonly moveButtonCtrls = new Map<string, ButtonController>();

	private getMoveButtonCtrl(key: string): ButtonController {
		let ctrl = this.moveButtonCtrls.get(key);
		if (!ctrl) {
			ctrl = new ButtonController(BaseWebComponent.stateLess);
			this.moveButtonCtrls.set(key, ctrl);
		}
		return ctrl;
	}
	private readonly translateErrorAllInvisible = translate('kol-table-settings-error-all-invisible');
	private readonly translateColumnNotHidable = translate('kol-table-settings-column-not-hidable');

	/**
	 * The horizontal header cells configuration for the table.
	 */
	@Prop() _horizontalHeaderCells: KoliBriTableHeaderCell[][] = [];

	@Watch('_horizontalHeaderCells')
	handleHeaderCellsChange(newValue: KoliBriTableHeaderCell[][]) {
		this.headerCells = newValue.map((row) => [...row]);
		this.editingHeaderCells = newValue.map((row) => row.map((cell) => ({ ...cell })));
	}

	public componentWillLoad() {
		this.handleHeaderCellsChange(this._horizontalHeaderCells);
	}

	private popoverRef: HTMLKolPopoverButtonWcElement | undefined;

	private getPrimaryRow(): KoliBriTableHeaderCell[] {
		return this.editingHeaderCells[this.editingHeaderCells.length - 1] ?? [];
	}

	private updatePrimaryRow(newRow: KoliBriTableHeaderCell[]): void {
		this.editingHeaderCells = this.editingHeaderCells.map((row, index, arr) => (index === arr.length - 1 ? newRow : row));
	}

	private moveColumn(columnId: string, direction: 'up' | 'down'): void {
		const row = [...this.getPrimaryRow()];
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
		this.updatePrimaryRow(row);
	}

	private handleVisibilityChange(key: string, visible: unknown): void {
		const row = this.getPrimaryRow().map((col) => (col.key === key && col.hidable !== false ? { ...col, visible: Boolean(visible) } : col));
		this.updatePrimaryRow(row);
	}

	private handleWidthChange(key: string, width: unknown): void {
		const row = this.getPrimaryRow().map((col) => (col.key === key && col.resizable !== false ? { ...col, width: Number(width) } : col));
		this.updatePrimaryRow(row);
	}

	private handleCancel() {
		this.editingHeaderCells = this.headerCells.map((row) => [...row]);
		this.errorMessage = null;
		void this.popoverRef?.hidePopover();
	}

	private handleSubmit(event: Event): void {
		event.preventDefault();

		const primaryRow = this.getPrimaryRow();
		const hasVisibleColumn = primaryRow.some((column) => column.visible !== false);

		if (!hasVisibleColumn) {
			this.errorMessage = this.translateErrorAllInvisible;
			return;
		} else if (this.host) {
			this.errorMessage = null;
			// Update headerCells with the edited values
			this.headerCells = this.editingHeaderCells.map((row) => row.map((cell) => ({ ...cell })));

			// Type for sanitized cells where optional properties are truly omitted
			type SanitizedHeaderCell = Omit<KoliBriTableHeaderCell, 'hidable' | 'position' | 'resizable' | 'sortable' | 'visible' | 'width'> &
				Partial<Pick<KoliBriTableHeaderCell, 'hidable' | 'resizable' | 'sortable' | 'visible' | 'width'>>;

			const sanitizedHeaderCells = this.editingHeaderCells.map((row) =>
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
			dispatchDomEvent(this.host, KolEvent.changeHeaderCells, sanitizedHeaderCells);
			void this.popoverRef?.hidePopover();
		}
	}

	public render(): JSX.Element {
		const columns = this.getPrimaryRow();

		return (
			<KolPopoverButtonWcTag
				ref={(el) => (this.popoverRef = el)}
				class="kol-table-settings"
				_icons="kolicon-settings"
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
								{columns.map((column, index) => (
									<div key={column.key} class="kol-table-settings__column">
										<KolInputCheckboxTag
											_checked={column.visible !== false}
											_label={`${column.label}${column.hidable === false ? ` (${this.translateColumnNotHidable})` : ''}`}
											_value={true}
											_hideLabel
											_disabled={column.hidable === false}
											_on={{ onInput: (_, value: unknown) => this.handleVisibilityChange(column.key ?? '', value) }}
										/>
										<span class="kol-table-settings__column-label">{column.label}</span>
										<KolInputNumberTag
											_hideLabel
											_value={parseColumnWidth(column.width)}
											_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
											_min={1}
											_disabled={column.resizable === false}
											_on={{ onInput: (_, value: unknown) => this.handleWidthChange(column.key ?? '', value) }}
										/>
										{(() => {
											const upCtrl = this.getMoveButtonCtrl(`${column.key ?? ''}-up`);
											upCtrl.applyProps({
												icons: 'kolicon-chevron-up',
												label: translate('kol-table-settings-move-up', { placeholders: { column: column.label } }),
												hideLabel: true,
												variant: 'ghost',
												on: { onClick: () => this.moveColumn(column.key ?? '', 'up') },
												disabled: column.sortable === false || index === 0,
											});
											return renderButtonFC(upCtrl, { dataTestId: 'table-settings-move-up' });
										})()}
										{(() => {
											const downCtrl = this.getMoveButtonCtrl(`${column.key ?? ''}-down`);
											downCtrl.applyProps({
												icons: 'kolicon-chevron-down',
												label: translate('kol-table-settings-move-down', { placeholders: { column: column.label } }),
												hideLabel: true,
												variant: 'ghost',
												on: { onClick: () => this.moveColumn(column.key ?? '', 'down') },
												disabled: column.sortable === false || index === columns.length - 1,
											});
											return renderButtonFC(downCtrl, { dataTestId: 'table-settings-move-down' });
										})()}
									</div>
								))}
							</div>
						</div>

						<div class="kol-table-settings__actions">
							{(() => {
								this.cancelButtonCtrl.applyProps({
									label: this.translateTableSettingsCancel,
									variant: 'secondary',
									on: { onClick: () => this.handleCancel() },
								});
								return renderButtonFC(this.cancelButtonCtrl, { dataTestId: 'table-settings-cancel' });
							})()}
							{(() => {
								this.applyButtonCtrl.applyProps({
									label: this.translateTableSettingsApply,
									variant: 'primary',
									type: 'submit',
								});
								return renderButtonFC(this.applyButtonCtrl, { dataTestId: 'table-settings-apply' });
							})()}
						</div>
					</form>
				</div>
			</KolPopoverButtonWcTag>
		);
	}
}
