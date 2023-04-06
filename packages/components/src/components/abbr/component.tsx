import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchTooltipAlignment } from '../../types/button-link';
import { PropAlignment } from '../../types/props';
import { nonce } from '../../utils/dev.utils';
import { watchString } from '../../utils/prop.validators';
import { API, States } from './types';

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
				<abbr aria-labelledby={this.nonce} role="definition" title={this.state._title}>
					<span title="">
						<slot />
					</span>
				</abbr>
				<kol-tooltip _align={this.state._tooltipAlign} _id={this.nonce} _label={this.state._title}></kol-tooltip>
			</Host>
		);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: PropAlignment = 'top';

	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 */
	@Prop() public _title!: string;

	/**
	 * Die State-Parameter repräsentieren den inneren State
	 * einer Komponente.
	 *
	 * @see: https://stenciljs.com/docs/state
	 */
	@State() public state: States = {
		_title: '…', // ⚠ required
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
	@Watch('_title')
	public validateTitle(value?: string): void {
		watchString(this, '_title', value, {
			required: true,
		});
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: PropAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	public componentWillLoad(): void {
		this.validateTitle(this._title);
		this.validateTooltipAlign(this._tooltipAlign);
	}
}
