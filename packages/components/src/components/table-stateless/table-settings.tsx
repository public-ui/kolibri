import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { KolAlertWcTag, KolButtonWcTag, KolHeadingTag, KolInputCheckboxTag, KolInputNumberTag, KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type { ColumnSettings } from '../../schema';
import type { TableSettingsPropType } from '../../schema/props/table-settings';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * @internal
 */
@Component({
	tag: 'kol-table-settings-wc',
	shadow: false,
})
export class KolTableSettings {
	@Element() private readonly host?: HTMLKolTableSettingsWcElement;
	@State() tableSettings: TableSettingsPropType = { columns: [] };
	@State() errorMessage: string | null = null;
	private readonly translateTableSettings = translate('kol-table-settings');
	private readonly translateTableSettingsCancel = translate('kol-table-settings-cancel');
	private readonly translateTableSettingsApply = translate('kol-table-settings-apply');
	private readonly translateErrorAllInvisible = translate('kol-table-settings-error-all-invisible');
	private readonly translateColumnNotHidable = translate('kol-table-settings-column-not-hidable');
	@Prop() _tableSettings: TableSettingsPropType = { columns: [] };

	@Watch('_tableSettings')
	handleTableSettingsChange(newValue: TableSettingsPropType) {
		this.tableSettings = {
			...newValue,
			columns: this.normalizeColumns(Array.isArray(newValue.columns) ? newValue.columns : []),
		};
	}

	public componentWillLoad() {
		this.handleTableSettingsChange(this._tableSettings);
	}

	private popoverRef: HTMLKolPopoverButtonWcElement | undefined;

	private normalizeColumns(columns: ColumnSettings[]): ColumnSettings[] {
		return columns.map(({ hidable, resizable, sortable, visible, ...rest }) => ({
			...rest,
			hidable: hidable !== false,
			resizable: resizable !== false,
			sortable: sortable !== false,
			visible: visible !== false,
		}));
	}

	private moveColumn(columnId: string, direction: 'up' | 'down'): void {
		const columns = [...this.tableSettings.columns];
		const sourceIndex = columns.findIndex((col) => col.key === columnId);
		const sourceColumn = columns[sourceIndex];
		const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;
		const targetColumn = columns[targetIndex];

		if (sourceIndex < 0 || targetIndex < 0 || targetIndex >= columns.length || sourceColumn?.sortable === false || targetColumn?.sortable === false) {
			return;
		}

		const [movedColumn] = columns.splice(sourceIndex, 1);
		columns.splice(targetIndex, 0, movedColumn);

		this.tableSettings = {
			...this.tableSettings,
			columns,
		};
	}

	private handleVisibilityChange(key: string, visible: unknown): void {
		this.tableSettings = {
			...this.tableSettings,
			columns: this.tableSettings.columns.map((col) => (col.key === key && col.hidable !== false ? { ...col, visible: Boolean(visible) } : col)),
		};
	}

	private handleWidthChange(key: string, width: unknown): void {
		this.tableSettings = {
			...this.tableSettings,
			columns: this.tableSettings.columns.map((col) => (col.key === key ? (col.resizable === false ? col : { ...col, width: Number(width) }) : col)),
		};
	}

	private handleCancel() {
		void this.popoverRef?.hidePopover();
	}

	private handleSubmit(event: Event): void {
		event.preventDefault();

		const hasVisibleColumn = this.tableSettings.columns.some((column) => column.visible);

		if (!hasVisibleColumn) {
			this.errorMessage = this.translateErrorAllInvisible;
			return;
		} else if (this.host) {
			this.errorMessage = null;
			dispatchDomEvent(this.host, KolEvent.settingsChange, this.tableSettings);
			void this.popoverRef?.hidePopover();
		}
	}

	public render(): JSX.Element {
		const sortedColumns = this.tableSettings.columns;

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
								{sortedColumns.map((column, index) => (
									<div key={column.key} class="kol-table-settings__column">
										<KolInputCheckboxTag
											_checked={column.visible}
											_label={`${column.label}${column.hidable === false ? ` (${this.translateColumnNotHidable})` : ''}`}
											_value={true}
											_hideLabel
											_disabled={column.hidable === false}
											_on={{ onInput: (_, value: unknown) => this.handleVisibilityChange(column.key, value) }}
											data-testid={`table-settings-visible-${column.key}`}
										/>
										<span class="kol-table-settings__column-label">{column.label}</span>
										<KolInputNumberTag
											_hideLabel
											_value={column.width}
											_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
											_min={1}
											_disabled={column.resizable === false}
											_on={{ onInput: (_, value: unknown) => this.handleWidthChange(column.key, value) }}
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-up"
											_label={translate('kol-table-settings-move-up', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key, 'up') }}
											_disabled={index === 0 || column.sortable === false || sortedColumns[index - 1]?.sortable === false}
											data-testid="table-settings-move-up"
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-down"
											_label={translate('kol-table-settings-move-down', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key, 'down') }}
											_disabled={index === sortedColumns.length - 1 || column.sortable === false || sortedColumns[index + 1]?.sortable === false}
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
