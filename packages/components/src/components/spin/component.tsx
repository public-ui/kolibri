import type { JSX } from '@stencil/core';
import { validateShow, validateSpinVariant } from '@public-ui/schema';
import { Component, Fragment, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';

import type { ShowPropType, SpinAPI, SpinStates, SpinVariantPropType } from '@public-ui/schema';
function renderSpin(variant: SpinVariantPropType): JSX.Element {
	switch (variant) {
		case 'cycle':
			return <span class="loader"></span>;
		case 'none':
			return <slot name="expert"></slot>;
		default:
			return (
				<>
					<span class="bg-spin-1"></span>
					<span class="bg-spin-2"></span>
					<span class="bg-spin-3"></span>
					<span class="bg-neutral"></span>
				</>
			);
	}
}

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpin implements SpinAPI {
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
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: SpinVariantPropType = 'dot';

	@State() public state: SpinStates = {
		_variant: 'dot',
	};

	@Watch('_show')
	public validateShow(value?: ShowPropType): void {
		this.showToggled = this.state._show === true && this._show === false;
		validateShow(this, value);
	}

	@Watch('_variant')
	public validateVariant(value?: SpinVariantPropType): void {
		validateSpinVariant(this, value);
	}

	public componentWillLoad(): void {
		this.validateShow(this._show);
		this.validateVariant(this._variant);
	}
}
