import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchString } from '../../utils/prop.validators';
import { translate } from '../../i18n';
import { KoliBriSymbolAPI, KoliBriSymbolStates } from './types';

@Component({
	tag: 'kol-symbol',
	shadow: false,
})
export class KolSymbol implements KoliBriSymbolAPI {
	public render(): JSX.Element {
		return (
			<Host>
				<span aria-label={this.state._ariaLabel} role="term">
					{this.state._symbol}
				</span>
			</Host>
		);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	@Prop() public _symbol!: string;

	@State() public state: KoliBriSymbolStates = {
		_ariaLabel: translate('kol-warning'),
		_symbol: '…', // ⚠ required
	};

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
	}

	@Watch('_symbol')
	public validateSymbol(value?: string): void {
		watchString(this, '_symbol', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateSymbol(this._symbol);
	}
}
