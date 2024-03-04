import type { JSX } from '@stencil/core';
import { validateLabel, validateTooltipAlign } from '@public-ui/schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';

import type { AbbrAPI, AbbrStates, LabelPropType, TooltipAlignPropType } from '@public-ui/schema';

/**
 * @slot - Der Begriff, der erläutert werden soll.
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr implements AbbrAPI {
	private readonly nonce = nonce();

	public render(): JSX.Element {
		return (
			<Host class="kol-abbr">
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
				<abbr aria-labelledby={this.nonce} role="definition" tabindex="0" title={this.state._label}>
					<span title="">
						<slot />
					</span>
				</abbr>
				<kol-tooltip-wc _align={this.state._tooltipAlign} _id={this.nonce} _label={this.state._label}></kol-tooltip-wc>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Die State-Parameter repräsentieren den inneren State
	 * einer Komponente.
	 *
	 * @see: https://stenciljs.com/docs/state
	 */
	@State() public state: AbbrStates = {
		_label: '', // ⚠ required
		_tooltipAlign: 'top',
	};

	/**
	 * Die Watch-Methoden dienen der Möglichkeit zur
	 * Validierung der Werte eines Properties und
	 * dem Mapping dessen auf einen anderen internen
	 * State-Typ.
	 *
	 * @see: https://stenciljs.com/docs/properties#prop-validation
	 */
	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		validateTooltipAlign(this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateTooltipAlign(this._tooltipAlign);
	}
}
