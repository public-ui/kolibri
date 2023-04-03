import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';
import { translate } from '../../i18n';

type RequiredProps = unknown;
type OptionalProps = {
	show: boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSpin implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				{this.state._show ? (
					<span aria-busy="true" aria-label={translate('kol-action-running')} aria-live="polite" class="spin" role="alert">
						<span class="bg-spin-1"></span>
						<span class="bg-spin-2"></span>
						<span class="bg-spin-3"></span>
						<span class="bg-neutral"></span>
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

	@State() public state: States = {};

	private showToggled = false;

	@Watch('_show')
	public validateShow(value?: boolean): void {
		this.showToggled = this.state._show === true && this._show === false;
		watchBoolean(this, '_show', value);
	}

	public componentWillLoad(): void {
		this.validateShow(this._show);
	}
}
