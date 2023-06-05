import { Component, Fragment, Host, JSX, Prop, State, Watch, h } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { translate } from '../../i18n';
import { PropSpinVariant, SpinVariant, validateSpinVariant } from '../../types/props/variant/spin';
import { watchBoolean } from '../../utils/prop.validators';
import { PropShow } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropSpinVariant & PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropSpinVariant;
type OptionalStates = PropShow;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

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
export class KolSpin implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
	 * Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.
	 */
	@Prop({ reflect: true }) public _show?: boolean = false;

	/**
	 * Gibt an, welche Ladeanimation oder ob keine Animation verwendet werden soll.
	 */
	@Prop() public _variant?: SpinVariant = 'dot';

	@State() public state: States = {
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
