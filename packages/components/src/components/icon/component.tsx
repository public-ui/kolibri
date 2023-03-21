import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { watchString } from '../../utils/prop.validators';
import { devHint } from '../../utils/a11y.tipps';

/**
 * API
 */
type RequiredProps = AriaLabel & {
	icon: string;
};
type OptionalProps = {
	part: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolIcon implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host exportparts="icon">
				<i
					aria-hidden={this.state._ariaLabel.length > 0 ? undefined : 'true'}
					/**
					 * Die Auszeichnung `aria-hidden` ist eigentlich nicht erforderlich, da die aktuellen
					 * Screenreader, wie NVDA und JAWS, es auch ohne `aria-hidden` nicht vorlesen.
					 *
					 * Referenz: https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
					 */
					aria-label={this.state._ariaLabel.length > 0 ? this.state._ariaLabel : undefined}
					class={this.state._icon}
					part="icon"
					role="img"
				></i>
			</Host>
		);
	}

	/**
	 * Gibt das Aria-Label am Icon an.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt einen Identifier eines Icons aus den Icon's an.
	 */
	@Prop() public _icon!: string;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;

	@State() public state: States = {
		_ariaLabel: '…', // ⚠ required
		_icon: 'codicon codicon-home',
	};

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
	}

	@Watch('_icon')
	public validateIcon(value?: string): void {
		watchString(this, '_icon', value, {
			required: true,
		});
	}

	/**
	 * @deprecated
	 */
	@Watch('_part')
	public validatePart(_value?: string): void {
		devHint(`ICON: The usage of the part attribute is deprecated and has no effect.`);
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateIcon(this._icon);
		this.validatePart(this._part);
	}
}
