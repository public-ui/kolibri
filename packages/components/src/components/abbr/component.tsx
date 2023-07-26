import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchTooltipAlignment } from '../../types/button-link';
import { Align } from '../../types/props/align';
import { nonce } from '../../utils/dev.utils';
import { API, States } from './types';
import { LabelPropType, validateLabel } from '../../types/props/label';

/**
 * @slot - Der Begriff, der erläutert werden soll.
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAbbr implements API {
	private readonly nonce = nonce();

	public render(): JSX.Element {
		return (
			<Host>
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
				<abbr aria-labelledby={this.nonce} role="definition" tabindex="0" title={this.state._label}>
					<span title="">
						<slot />
					</span>
				</abbr>
				<kol-tooltip _align={this.state._tooltipAlign} _id={this.nonce} _label={this.state._label}></kol-tooltip>
			</Host>
		);
	}

	/**
	 * Defines the abbreviation title and tooltip content
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'top';

	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 * @deprecated Use _label.
	 */
	@Prop() public _title?: string;

	/**
	 * Die State-Parameter repräsentieren den inneren State
	 * einer Komponente.
	 *
	 * @see: https://stenciljs.com/docs/state
	 */
	@State() public state: States = {
		_label: '…', // ⚠ required
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
		validateLabel(this, value);
	}

	@Watch('_title')
	public validateTitle(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Align): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._title);
		this.validateTooltipAlign(this._tooltipAlign);
	}
}
