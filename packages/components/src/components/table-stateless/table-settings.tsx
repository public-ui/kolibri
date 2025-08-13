import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { KolAlertWcTag, KolButtonWcTag, KolHeadingTag, KolInputCheckboxTag, KolInputNumberTag, KolPopoverButtonWcTag } from '../../core/component-names';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { TableSettingsPropType } from '../../schema/props/table-settings';
import type { ColumnSettings } from '../../schema';

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
	private readonly translateColumnNotHideable = translate('kol-table-settings-column-not-hideable');
	@Prop() _tableSettings: TableSettingsPropType = { columns: [] };

	@Watch('_tableSettings')
	handleTableSettingsChange(newValue: TableSettingsPropType) {
		this.tableSettings = {
			...newValue,
			columns: this.sortColumnsByPosition(
				newValue.columns.map((col) => ({
					...col, // Preserve all properties including hideable
					visible: col.hideable === false ? true : col.visible,
				})),
			),
		};
	}

	public componentWillLoad() {
		this.handleTableSettingsChange(this._tableSettings);
	}

	private popoverRef: HTMLKolPopoverButtonWcElement | undefined;

	private sortColumnsByPosition(columns: ColumnSettings[]): ColumnSettings[] {
		return [...columns].sort((colA, colB) => colA.position - colB.position);
	}

	private moveColumn(columnId: string, direction: 'up' | 'down'): void {
		const columnSettings = [...this.tableSettings.columns];

		const sourceIndex = columnSettings.findIndex((col) => col.key === columnId);
		const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;

		const source = columnSettings[sourceIndex];
		const target = columnSettings[targetIndex];

		const newCols = columnSettings.map((col) => {
			if (col.key === source.key) return { ...col, position: target.position };
			if (col.key === target.key) return { ...col, position: source.position };
			return col;
		});

		// re-sort by position and update
		this.tableSettings = {
			...this.tableSettings,
			columns: this.sortColumnsByPosition(newCols),
		};
	}

	private handleVisibilityChange(key: string, visible: unknown): void {
		this.tableSettings = {
			...this.tableSettings,
			columns: this.tableSettings.columns.map((col) => {
				// Only allow visibility changes for hideable columns
				if (col.key === key && col.hideable !== false) {
					return { ...col, visible: Boolean(visible) };
				}
				// For non-hideable columns, ensure they stay visible
				if (col.key === key && col.hideable === false) {
					return { ...col, visible: true };
				}
				return col;
			}),
		};
	}

	private handleWidthChange(key: string, width: unknown): void {
		this.tableSettings = {
			...this.tableSettings,
			columns: this.tableSettings.columns.map((col) => (col.key === key ? { ...col, width: Number(width) } : col)),
		};
	}

	private handleCancel() {
		void this.popoverRef?.hidePopover();
	}

	private handleSubmit(event: Event): void {
		event.preventDefault();

		// Enforce: non-hideable columns must always be visible
		const enforcedSettings = {
			...this.tableSettings,
			columns: this.tableSettings.columns.map((col) => (col.hideable === false ? { ...col, visible: true } : col)),
		};

		const hasVisibleColumn = enforcedSettings.columns.some((column) => column.visible);

		if (!hasVisibleColumn) {
			this.errorMessage = this.translateErrorAllInvisible;
			return;
		} else if (this.host) {
			this.errorMessage = null;
			dispatchDomEvent(this.host, KolEvent.settingsChange, enforcedSettings);
			void this.popoverRef?.hidePopover();
		}
	}

	public render(): JSX.Element {
		const sortedColumns = [...this.tableSettings.columns].sort((a, b) => a.position - b.position);

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
											_label={((): string => {
												const baseLabel = translate('kol-table-settings-show-column', { placeholders: { column: column.label } });
												return column.hideable === false ? `${baseLabel} (${this.translateColumnNotHideable})` : baseLabel;
											})()}
											_value={true}
											_hideLabel
											_disabled={column.hideable === false}
											_on={{
												onInput: (_, value: unknown) => {
													// Always use central method - it handles hideable validation internally
													this.handleVisibilityChange(column.key, value);
												},
											}}
										/>
										<span>{column.label}</span>
										<KolInputNumberTag
											_hideLabel
											_value={column.width}
											_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
											_min={1}
											_on={{ onInput: (_, value: unknown) => this.handleWidthChange(column.key, value) }}
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-up"
											_label={translate('kol-table-settings-move-up', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key, 'up') }}
											_disabled={index === 0}
											data-testid="table-settings-move-up"
										/>
										<KolButtonWcTag
											_icons="codicon codicon-arrow-down"
											_label={translate('kol-table-settings-move-down', { placeholders: { column: column.label } })}
											_hideLabel
											_buttonVariant="ghost"
											_on={{ onClick: () => this.moveColumn(column.key, 'down') }}
											_disabled={index === sortedColumns.length - 1}
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
