import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';
import { translate } from '../../i18n';

type RequiredProps = {
	ariaLabel: string;
	symbol: string;
};
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-symbol',
	shadow: false,
})
export class KolSymbol implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
	@Prop() public _label?: string;

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	@Prop() public _symbol!: string;

	@State() public state: States = {
		_label: translate('kol-warning'),
		_symbol: '…', // ⚠ required
	};

	/**
	 * @deprecated use _label
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		if (!this._label) {
			this.validateLabel(value);
		}
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabel(this, value);
	}

	@Watch('_symbol')
	public validateSymbol(value?: string): void {
		watchString(this, '_symbol', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateLabel(this._label);
		this.validateSymbol(this._symbol);
	}
}
