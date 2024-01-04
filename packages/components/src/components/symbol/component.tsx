import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchString } from '../../utils/prop.validators';
import { API, States } from './types';

@Component({
	tag: 'kol-symbol',
	shadow: false,
})
export class KolSymbol implements API {
	public render(): JSX.Element {
		return (
			<Host>
				<span aria-label={this.state._label} role="term">
					{this.state._symbol}
				</span>
			</Host>
		);
	}

	/**
	 * Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	@Prop() public _symbol!: string;

	@State() public state: States = {
		_label: translate('kol-warning'),
		_symbol: '…', // ⚠ required
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			defaultValue: translate('kol-warning'),
		});
	}

	@Watch('_symbol')
	public validateSymbol(value?: string): void {
		watchString(this, '_symbol', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateSymbol(this._symbol);
	}
}
