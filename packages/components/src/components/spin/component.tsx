import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { SpinVariant, validateSpinVariant } from '../../types/props/variant/spin';
import { watchBoolean } from '../../utils/prop.validators';
import { KoliBriSpinAPI, KoliBriSpinStates } from './types';

function renderSpin(variant: SpinVariant): JSX.Element {
	switch (variant) {
		case 'cycle':
			return <span class="loader"></span>;
		case 'none':
			return <slot name="expert"></slot>;
		default:
			return (
				<Fragment>
					<span class="bg-spin-1"></span>
					<span class="bg-spin-2"></span>
					<span class="bg-spin-3"></span>
					<span class="bg-neutral"></span>
				</Fragment>
			);
	}
}

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSpin implements KoliBriSpinAPI {
	private showToggled = false;

	public render(): JSX.Element {
		return (
			<Host>
				{this.state._show ? (
					<span
						aria-busy="true"
						aria-label={translate('kol-action-running')}
						aria-live="polite"
						class={{
							spin: true,
							[this.state._variant]: true,
							/* [`spin--${this.state._variant}`]: true, witch benefit have this notation? */
						}}
						role="alert"
					>
						{renderSpin(this.state._variant)}
					</span>
				) : (
					this.showToggled && <span aria-label={translate('kol-action-done')} aria-busy="false" aria-live="polite" role="alert"></span>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 */
	@Prop() public _show?: boolean = false;

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: SpinVariant = 'dot';

	@State() public state: KoliBriSpinStates = {
		_variant: 'dot',
	};

	@Watch('_show')
	public validateShow(value?: boolean): void {
		this.showToggled = this.state._show === true && this._show === false;
		watchBoolean(this, '_show', value);
	}

	@Watch('_variant')
	public validateVariant(value?: SpinVariant): void {
		validateSpinVariant(this, value);
	}

	public componentWillLoad(): void {
		this.validateShow(this._show);
		this.validateVariant(this._variant);
	}
}
