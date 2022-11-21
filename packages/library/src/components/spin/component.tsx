import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/**
 * API
 */
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
		default: './spin.sass',
	},
	shadow: true,
})
export class KolSpin implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				{this.state._show ? (
					<span aria-busy="true" aria-label="Aktion wird ausgeführt ..." aria-live="polite" class="spin" role="alert">
						<span class="bg-spin-1"></span>
						<span class="bg-spin-2"></span>
						<span class="bg-spin-3"></span>
						<span class="bg-neutral"></span>
					</span>
				) : (
					this.showToggled && <span aria-label="Aktion abgeschlossen" aria-busy="false" aria-live="polite" role="alert"></span>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.
	 */
	@Prop({ reflect: true }) public _show?: boolean = false;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	private showToggled = false;

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_show')
	public validateShow(value?: boolean): void {
		this.showToggled = this.state._show === true && this._show === false;
		watchBoolean(this, '_show', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateShow(this._show);
	}
}
