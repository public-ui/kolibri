import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchTooltipAlignment } from '../../types/button-link';
import { Alignment, validateLabel } from '../../types/props';
import { nonce } from '../../utils/dev.utils';
import { API, States } from './types';

/**
 * @slot default Der Begriff, der erläutert werden soll.
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
				<abbr aria-labelledby={this.nonce} role="definition" title={this.state._label}>
					<span title="">
						<slot />
					</span>
				</abbr>
				<kol-tooltip _align={this.state._tooltipAlign} _id={this.nonce} _label={this.state._label}></kol-tooltip>
			</Host>
		);
	}

	/**
	 * Gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 */
	@Prop() public _label?: string;

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Alignment = 'top';

	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 * @deprecated use _label instead; will get removed in v2.
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
	public validateLabel(value?: string): void {
		validateLabel(this, value);
	}

	// @deprecated, remove in v2
	@Watch('_title')
	public validateTitle(value?: string): void {
		validateLabel(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Alignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateTitle(this._title);
		this.validateTooltipAlign(this._tooltipAlign);
	}
}
