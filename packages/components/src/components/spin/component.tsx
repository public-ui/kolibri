import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchValidator } from '../../utils/prop.validators';
import { translate } from '../../i18n';

/**
 * Loadingspinner
 * - https://github.com/vineethtrv/css-loader
 */
type SpinAnimation = 'default' | 'none';

type RequiredProps = unknown;
type OptionalProps = {
	show: boolean;
	variant: SpinAnimation;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	variant: SpinAnimation;
};
type OptionalStates = {
	show: boolean;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

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
					<span aria-busy="true" aria-label={translate('kol-action-running')} aria-live="polite" class="spin" role="alert">
						{this.state._variant === 'default' ? (
							<Fragment>
								<span class="bg-spin-1"></span>
								<span class="bg-spin-2"></span>
								<span class="bg-spin-3"></span>
								<span class="bg-neutral"></span>
							</Fragment>
						) : (
							<slot name="expert"></slot>
						)}
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
	@Prop() public _variant?: SpinAnimation = 'default';

	@State() public state: States = {
		_variant: 'default',
	};

	@Watch('_show')
	public validateShow(value?: boolean): void {
		this.showToggled = this.state._show === true && this._show === false;
		watchBoolean(this, '_show', value);
	}

	@Watch('_variant')
	public validateVariant(value?: SpinAnimation): void {
		watchValidator(this, '_variant', (value) => value === 'default' || value === 'none', new Set(['default', 'none']), value);
	}

	public componentWillLoad(): void {
		this.validateShow(this._show);
		this.validateVariant(this._variant);
	}
}
