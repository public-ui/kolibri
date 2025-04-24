import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Prop, State, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { KolButtonWcTag, KolHeadingTag, KolInputCheckboxTag, KolInputNumberTag, KolPopoverButtonWcTag } from '../../core/component-names';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

interface ColumnSettings {
	key: string;
	label: string;
	visible: boolean;
	width: number;
	position: number;
}

/**
 * @internal
 */
@Component({
	tag: 'kol-table-settings-wc',
	shadow: false,
})
export class KolTableSettings {
	@Element() private readonly host?: HTMLKolTableSettingsWcElement;
	@State() columnSettings: ColumnSettings[] = [];
	@Prop() _columnSettings: ColumnSettings[] = [];

	@Watch('_columnSettings')
	handleColumnSettingsChange(newValue: ColumnSettings[]) {
		this.columnSettings = newValue;
	}

	public componentWillLoad() {
		this.columnSettings = this._columnSettings;
	}

	private popoverRef: HTMLKolPopoverButtonWcElement | undefined;

	private moveColumn(columnId: string, direction: 'up' | 'down'): void {
		const columnSettings = [...this.columnSettings];

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
		this.columnSettings = newCols.sort((colA, colB) => colA.position - colB.position);
	}

	private handleVisibilityChange(key: string, visible: unknown): void {
		this.columnSettings = this.columnSettings.map((col) => (col.key === key ? { ...col, visible: Boolean(visible) } : col));
	}

	private handleWidthChange(key: string, width: unknown): void {
		this.columnSettings = this.columnSettings.map((col) => (col.key === key ? { ...col, width: Number(width) } : col));
	}

	private handleCancel() {
		void this.popoverRef?.hidePopover();
	}

	private handleApply(): void {
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.tableSettingsChange, this.columnSettings);
			void this.popoverRef?.hidePopover();
		}
	}

	public render(): JSX.Element {
		const sortedColumns = [...this.columnSettings].sort((a, b) => a.position - b.position);

		return (
			<KolPopoverButtonWcTag
				ref={(el) => (this.popoverRef = el)}
				class="kol-table-settings"
				_icons="codicon codicon-settings-gear"
				_label={translate('kol-table-settings')}
				_popoverAlign="top"
				_hideLabel
			>
				<div class="kol-table-settings__content">
					<KolHeadingTag _label={translate('kol-table-settings')} _level={0} />

					<div class="kol-table-settings__columns-container">
						<div class="kol-table-settings__columns">
							{sortedColumns.map((column, index) => (
								<Fragment>
									<KolInputCheckboxTag
										_checked={column.visible}
										_label={translate('kol-table-settings-show-column', { placeholders: { column: column.label } })}
										_value={true}
										_hideLabel
										_on={{ onInput: (_, value: unknown) => this.handleVisibilityChange(column.key, value) }}
									/>
									<span>{column.label}</span>
									<KolInputNumberTag
										_hideLabel
										_value={column.width}
										_label={translate('kol-table-settings-column-width', { placeholders: { column: column.label } })}
										_min={0}
										_on={{ onInput: (_, value: unknown) => this.handleWidthChange(column.key, value) }}
									/>
									<KolButtonWcTag
										_icons="codicon codicon-arrow-up"
										_label={translate('kol-table-settings-move-up')}
										_hideLabel
										_variant="ghost"
										_on={{ onClick: () => this.moveColumn(column.key, 'up') }}
										_disabled={index === 0}
									/>
									<KolButtonWcTag
										_icons="codicon codicon-arrow-down"
										_label={translate('kol-table-settings-move-down')}
										_hideLabel
										_variant="ghost"
										_on={{ onClick: () => this.moveColumn(column.key, 'down') }}
										_disabled={index === sortedColumns.length - 1}
									/>
								</Fragment>
							))}
						</div>
					</div>

					<div class="kol-table-settings__actions">
						<KolButtonWcTag _label={translate('kol-table-settings-cancel')} _variant="secondary" _on={{ onClick: () => this.handleCancel() }} />
						<KolButtonWcTag _label={translate('kol-table-settings-apply')} _variant="primary" _on={{ onClick: () => this.handleApply() }} />
					</div>
				</div>
			</KolPopoverButtonWcTag>
		);
	}
}
