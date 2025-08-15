import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { KolTableStatelessWcTag } from '../../core/component-names';
import {
	Log,
	type TableCallbacksPropType,
	type TableDataFootPropType,
	type TableDataPropType,
	type TableHeaderCellsPropType,
	type TableSelectionPropType,
	type TableStatelessProps,
} from '../../schema';
import type { MinWidthPropType } from '../../schema/props/min-width';
import type { TableSettingsPropType } from '../../schema/props/table-settings';

type HostInternals = {
	ariaLabelledByElements: HTMLElement[];
};

@Component({
	tag: 'kol-table-stateless',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTableStateless implements TableStatelessProps {
	@Element() private readonly host?: HTMLKolTableStatelessElement;

	private internals?: HostInternals;

	private resolveTargets(value?: string): HTMLElement[] {
		const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
		if (!ids.length) return [];
		const root = this.host?.getRootNode({ composed: true }) as Document | ShadowRoot | undefined;
		const getById = (id: string): HTMLElement | null => {
			return (root as Document)?.getElementById?.(id) || document.getElementById(id);
		};
		return ids.map(getById).filter((el): el is HTMLElement => !!el);
	}

	/**
	 * Allows labeling the table by referencing elements outside via `aria-labelledby`.
	 */
	@Prop() public ariaLabelledby?: string;

	@Watch('ariaLabelledBy')
	protected handleAriaLabelledBy(value?: string): void {
		if (this.internals && 'ariaLabelledByElements' in this.internals) {
			this.internals.ariaLabelledByElements = this.resolveTargets(value);
			if (this.internals.ariaLabelledByElements.length) {
				Log.info(['Experimental feature for linking aria-labelledby to an external caption.', this.host, this.internals.ariaLabelledByElements], {
					forceLog: true,
				});
			}
		}
	}

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: TableDataPropType;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: TableDataFootPropType;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headerCells!: TableHeaderCellsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the table min-width (CSS width values).
	 */
	@Prop() public _minWidth!: MinWidthPropType;

	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableCallbacksPropType;

	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;

	/**
	 * Defines the table settings including column visibility, order and width.
	 */
	@Prop() public _tableSettings?: TableSettingsPropType;

	public componentWillLoad(): void {
		if ((this.host as unknown as { attachInternals?: () => HostInternals }).attachInternals) {
			this.internals = (this.host as unknown as { attachInternals: () => HostInternals }).attachInternals();
			this.handleAriaLabelledBy(this.ariaLabelledby);
		}
	}

	public render(): JSX.Element {
		const showCaption = this.internals?.ariaLabelledByElements?.length;
		return (
			<KolTableStatelessWcTag
				aria-labelledby={showCaption ? this.ariaLabelledby : undefined}
				_data={this._data}
				_dataFoot={this._dataFoot}
				_headerCells={this._headerCells}
				_label={this._label}
				_minWidth={this._minWidth}
				_on={this._on}
				_selection={this._selection}
				_tableSettings={this._tableSettings}
			/>
		);
	}
}
