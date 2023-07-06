import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchString } from '../../utils/prop.validators';
import { KoliBriSymbolAPI, KoliBriSymbolStates } from './types';

@Component({
	tag: 'kol-symbol',
	shadow: false,
})
export class KolSymbol implements KoliBriSymbolAPI {
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
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 * @deprecated use _label
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	// TODO v2: make required
	@Prop() public _label?: LabelPropType;

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	@Prop() public _symbol!: string;

	@State() public state: KoliBriSymbolStates = {
		_label: translate('kol-warning'),
		_symbol: '…', // ⚠ required
	};

	/**
	 * @deprecated use _label
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_symbol')
	public validateSymbol(value?: string): void {
		watchString(this, '_symbol', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._ariaLabel);
		this.validateSymbol(this._symbol);
	}
}
